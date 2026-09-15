"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nContext";
import { Button } from "@/components/ui/Button";

export default function PrivacyPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-16">
      <h1 className="font-display text-2xl font-bold text-ink-100 sm:text-3xl">
        {t.legal.privacyTitle}
      </h1>
      <p className="leading-relaxed text-ink-500">{t.legal.privacyBody}</p>
      <Link href="/products" className="w-fit">
        <Button variant="secondary">{t.legal.backHome}</Button>
      </Link>
    </div>
  );
}
