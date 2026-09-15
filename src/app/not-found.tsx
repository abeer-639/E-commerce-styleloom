"use client";

import Link from "next/link";
import { PackageX } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-800">
        <PackageX size={24} className="text-brand" />
      </div>
      <p className="font-display text-lg font-medium text-ink-100">
        {t.productDetails.notFoundTitle}
      </p>
      <p className="text-sm text-ink-500">{t.productDetails.notFoundHint}</p>
      <Link href="/products">
        <Button variant="secondary">{t.productDetails.backToProducts}</Button>
      </Link>
    </div>
  );
}
