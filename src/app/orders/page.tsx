"use client";

import { useMemo, useState } from "react";
import { Package } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Pagination } from "@/components/Pagination";
import { Badge } from "@/components/ui/Badge";
import { useI18n } from "@/i18n/I18nContext";
import { useAppDispatch, useAppSelector, useIsAdmin } from "@/store/hooks";
import { updateOrderStatus } from "@/store/slices/ordersSlice";
import { getOrdersByUserId } from "@/data/orders";
import { getUserById } from "@/data/users";
import { formatPrice } from "@/lib/utils";
import { Order, OrderStatus } from "@/data/types";

const PAGE_SIZE = 5;

const statusTone: Record<OrderStatus, "success" | "brand" | "warning" | "danger"> = {
  delivered: "success",
  shipped: "brand",
  processing: "warning",
  cancelled: "danger",
};

const ALL_STATUSES: OrderStatus[] = ["processing", "shipped", "delivered", "cancelled"];

function OrderCard({
  order,
  customerName,
  onStatusChange,
}: {
  order: Order;
  customerName?: string;
  onStatusChange?: (status: OrderStatus) => void;
}) {
  const { t, locale } = useI18n();

  return (
    <div className="rounded-xl2 border border-dashed border-base-700 bg-base-900 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-medium text-ink-100">
          {t.orders.orderNumber} #{order.id}
        </span>
        {onStatusChange ? (
          <select
            value={order.status}
            onChange={(e) => onStatusChange(e.target.value as OrderStatus)}
            className="rounded-[10px] border border-dashed border-base-700 bg-base-800 px-3 py-1.5 text-sm text-ink-100"
          >
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {t.orders.statuses[s]}
              </option>
            ))}
          </select>
        ) : (
          <Badge tone={statusTone[order.status]}>{t.orders.statuses[order.status]}</Badge>
        )}
      </div>
      <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm text-ink-500">
        {customerName && (
          <span>
            {t.orders.customer}: {customerName}
          </span>
        )}
        <span>
          {t.orders.date}: {new Date(order.createdAt).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US")}
        </span>
        <span>
          {order.items.length} × products
        </span>
        <span className="font-semibold text-brand">
          {t.orders.total}: {formatPrice(order.total, t.common.currency)}
        </span>
      </div>
    </div>
  );
}

function EmptyOrders() {
  const { t } = useI18n();
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-800">
        <Package size={24} className="text-brand" />
      </div>
      <p className="text-ink-300">{t.orders.empty}</p>
    </div>
  );
}

function MyOrders() {
  const { t } = useI18n();
  const { currentUser } = useAppSelector((s) => s.auth);
  const storeOrders = useAppSelector((s) => s.orders.orders);
  const [page, setPage] = useState(1);

  const myOrders = useMemo(() => {
    if (!currentUser) return [];

    const fromStore = storeOrders.filter((o) => o.userId === currentUser.id);
    const fromMock = getOrdersByUserId(currentUser.id).filter(
      (o) => !fromStore.some((s2) => s2.id === o.id)
    );
    return [...fromStore, ...fromMock].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [storeOrders, currentUser]);

  const totalPages = Math.max(1, Math.ceil(myOrders.length / PAGE_SIZE));
  const pageItems = myOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (myOrders.length === 0) return <EmptyOrders />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 font-display text-2xl font-extrabold text-ink-100 sm:text-3xl">
        {t.orders.title}
      </h1>
      <div className="flex flex-col gap-4">
        {pageItems.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

function AllOrders() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const storeOrders = useAppSelector((s) => s.orders.orders);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(storeOrders.length / PAGE_SIZE));
  const pageItems = storeOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (storeOrders.length === 0) return <EmptyOrders />;

  return (
    <div className="mx-auto w-full px-10 py-10">
      <h1 className="mb-8 font-display text-2xl font-extrabold text-ink-100 sm:text-3xl">
        {t.orders.allOrdersTitle}
      </h1>
      <div className="flex flex-col gap-4">
        {pageItems.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            customerName={getUserById(order.userId)?.name}
            onStatusChange={(status) => dispatch(updateOrderStatus({ id: order.id, status }))}
          />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

function OrdersContent() {
  const isAdmin = useIsAdmin();
  return isAdmin ? <AllOrders /> : <MyOrders />;
}

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}
