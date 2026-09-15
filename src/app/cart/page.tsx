"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2, LayoutDashboard, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { useAppDispatch, useAppSelector, useIsAdmin } from "@/store/hooks";
import { updateQuantity, removeFromCart, clearCart } from "@/store/slices/cartSlice";
import { placeOrder } from "@/store/slices/ordersSlice";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { getProductContent } from "@/lib/productContent";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function CartPage() {
  const { t , locale } = useI18n();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const items = useAppSelector((s) => s.cart.items);
  const allProducts = useAppSelector((s) => s.products.items);
  const { isAuthenticated, currentUser } = useAppSelector((s) => s.auth);
  const isAdmin = useIsAdmin();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const checkoutTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => clearTimeout(checkoutTimeoutRef.current);
  }, []);

  const rows = items
    .map((item) => {
      const product = allProducts.find((p) => p.id === item.productId);
      return product ? { item, product } : null;
    })
    .filter((r): r is { item: (typeof items)[number]; product: (typeof allProducts)[number] } => r !== null);

  const total = rows.reduce((sum, r) => sum + r.product.price * r.item.quantity, 0);

  if (isAdmin) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-800">
          <LayoutDashboard size={24} className="text-brand" />
        </div>
        <p className="text-ink-300">{t.cart.adminNotice}</p>
        <Link href="/dashboard">
          <Button>{t.nav.dashboard}</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    setError(null);
    try {
      if (!isAuthenticated || !currentUser) {
        router.push("/login");
        return;
      }
      if (rows.length === 0) return;

      dispatch(
        placeOrder({
          id: `o${Date.now()}`,
          userId: currentUser.id,
          items: rows.map((r) => ({
            productId: r.product.id,
            quantity: r.item.quantity,
            priceAtPurchase: r.product.price,
          })),
          total,
          status: "processing",
          createdAt: new Date().toISOString(),
        })
      );
      dispatch(clearCart());
      setPlacing(true);
      checkoutTimeoutRef.current = setTimeout(() => router.push("/orders"), 1200);
    } catch {
      setError(t.auth.errors.invalidCredentials);
    }
  };

  if (placing) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
        <CheckCircle2 size={40} className="text-brand" />
        <p className="text-ink-100">{t.cart.checkoutSuccess}</p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-800">
          <ShoppingBag size={24} className="text-brand" />
        </div>
        <div>
          <p className="font-display text-lg font-bold text-ink-100">{t.cart.empty}</p>
          <p className="mt-1 text-sm text-ink-500">{t.cart.emptyHint}</p>
        </div>
        <Link href="/products">
          <Button>{t.cart.browse}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
      <h1 className="font-display text-2xl font-extrabold text-ink-100 sm:text-3xl">
      {t.cart.title}
      </h1>
    <button
          type="button"
          onClick={() => setConfirmClearOpen(true)}
          className="flex items-center gap-1 text-sm text-ink-500 transition-colors hover:text-accent-coral"
        >
    <X size={14} />
    {t.cart.clearCart}
  </button>
  </div>
    <ConfirmDialog
        open={confirmClearOpen}
        title={t.cart.clearCartTitle}
        message={t.cart.clearCartConfirm}
        confirmLabel={t.cart.clearCartConfirmAction}
        cancelLabel={t.cart.cancel}
        onConfirm={() => {
          dispatch(clearCart());
          setConfirmClearOpen(false);
        }}
        onCancel={() => setConfirmClearOpen(false)}
      />
      <div className="flex flex-col gap-4">
        {rows.map(({ item, product }) => {
          const content = getProductContent(t, product , locale);
          return (
            <div
              key={product.id}
              className="flex flex-col gap-3 rounded-xl2 border border-dashed border-base-700 bg-base-900 p-4 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="flex items-center gap-4 sm:flex-1">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl2 bg-base-800">
                  <Image src={product.image} alt={content.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium text-ink-100">{content.name}</h3>
                  <p className="text-sm text-ink-500">{formatPrice(product.price, t.common.currency)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateQuantity({ productId: product.id, quantity: item.quantity - 1, stock: product.stock })
                      )
                    }
                    disabled={item.quantity <= 1}
                    className="flex size-11 items-center justify-center rounded-xl2 border border-dashed border-base-600 text-ink-100 hover:bg-base-800 disabled:opacity-30"
                    aria-label="decrease"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-ink-100">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateQuantity({ productId: product.id, quantity: item.quantity + 1, stock: product.stock })
                      )
                    }
                    disabled={item.quantity >= product.stock}
                    className="flex size-11 items-center justify-center rounded-xl2 border border-dashed border-base-600 text-ink-100 hover:bg-base-800 disabled:opacity-30"
                    aria-label="increase"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <span className="text-end font-semibold text-brand sm:w-20">
                  {formatPrice(product.price * item.quantity, t.common.currency)}
                </span>

                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="text-ink-500 hover:text-accent-coral"
                  aria-label={t.cart.remove}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-end gap-3 border-t border-base-700 pt-6">
        <div className="flex w-full max-w-xs justify-between text-ink-300">
          <span>{t.cart.subtotal}</span>
          <span>{formatPrice(total, t.common.currency)}</span>
        </div>
        <div className="flex w-full max-w-xs justify-between font-display text-lg font-extrabold text-ink-100">
          <span>{t.cart.total}</span>
          <span className="text-brand">{formatPrice(total, t.common.currency)}</span>
        </div>
        {error && <p className="text-sm text-accent-coral">{error}</p>}
        <Button size="lg" onClick={handleCheckout}>
          {t.cart.checkout}
        </Button>
      </div>
    </div>
  );
}