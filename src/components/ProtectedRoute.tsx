"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { LogIn, ShieldAlert } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useI18n } from "@/i18n/I18nContext";
import { Button } from "@/components/ui/Button";
import { UserRole } from "@/data/types";


export function ProtectedRoute({
  children,
  requireRole,
}: {
  children: ReactNode;
  requireRole?: UserRole;
}) {
  const { isAuthenticated, currentUser, hydrated } = useAppSelector((s) => s.auth);
  const { t } = useI18n();

  if (!hydrated) return null;

  if (!isAuthenticated) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-800">
          <LogIn size={24} className="text-brand" />
        </div>
        <p className="text-ink-300">{t.orders.protectedMessage}</p>
        <Link href="/login">
          <Button>{t.orders.goLogin}</Button>
        </Link>
      </div>
    );
  }

  if (requireRole && currentUser?.role !== requireRole) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-800">
          <ShieldAlert size={24} className="text-brand" />
        </div>
        <p className="text-ink-300">{t.common.notAuthorized}</p>
        <Link href="/products">
          <Button>{t.productDetails.backToProducts}</Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
