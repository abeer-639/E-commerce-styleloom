"use client";

import { useI18n } from "@/i18n/I18nContext";

export default function Loading() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4">
      <div className="relative flex size-16 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-base-700" />
        <div className="size-16 animate-spin rounded-full border-2 border-transparent border-t-brand" />
      </div>
      <p className="font-display text-sm text-ink-500">{t.common.loading}</p>
    </div>
  );
}