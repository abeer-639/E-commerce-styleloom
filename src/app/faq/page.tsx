"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-dashed border-base-700 py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-start"
      >
        <span className="font-medium text-ink-100">{question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-ink-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-ink-500">{answer}</p>}
    </div>
  );
}

export default function FaqPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-2xl font-bold text-ink-100 sm:text-3xl">{t.faq.title}</h1>
      <p className="mt-2 text-ink-500">{t.faq.subtitle}</p>

      <div className="mt-8 rounded-[20px] border-2 border-dashed border-base-700 px-6 sm:px-8">
        {t.faq.items.map((item) => (
          <FaqItem key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
}