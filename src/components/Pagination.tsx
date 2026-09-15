"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { t, dir } = useI18n();
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 pt-8" aria-label="pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex size-11 items-center justify-center rounded-xl2 border border-dashed border-base-600 text-ink-100 disabled:opacity-30"
        aria-label={t.products.prev}
      >
        <PrevIcon size={16} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`h-11 min-w-11 rounded-xl2 px-3 text-sm transition-colors ${
            page === currentPage
              ? "bg-brand text-base-950 font-semibold"
              : "border border-dashed border-base-600 text-ink-300 hover:bg-base-800"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex size-11 items-center justify-center rounded-xl2 border border-dashed border-base-600 text-ink-100 disabled:opacity-30"
        aria-label={t.products.next}
      >
        <NextIcon size={16} />
      </button>
    </nav>
  );
}
