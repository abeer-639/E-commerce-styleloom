"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/Pagination";
import { Hero } from "@/components/Hero";
import { TrendsSection } from "@/components/TrendsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProductsHeaderText } from "@/components/ProductsHeader";
import { ProductsFilterBar, type Audience } from "@/components/ProductsFilterBar";
import { useI18n } from "@/i18n/I18nContext";
import { useAppSelector } from "@/store/hooks";
import { CtaSection } from "@/components/CtaSection";
import { JourneySection } from "@/components/JourneySection";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

const PAGE_SIZE = 8;
const KNOWN_AUDIENCES: Audience[] = ["mens", "womens", "kids"];

export default function ProductsPage() {
  const { t } = useI18n();
  const products = useAppSelector((s) => s.products.items);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  

  const [mounted, setMounted] = useState(false);
  const [audience, setAudience] = useState<Audience>("all");

  useEffect(() => {
    setMounted(true);
    const requested = searchParams.get("audience");
    const next = KNOWN_AUDIENCES.includes(requested as Audience) ? (requested as Audience) : "all";
    setAudience(next);
    setPage(1);
  }, [searchParams]);

  const audienceOptions: Audience[] = useMemo(() => {

    if (!mounted || products.length === 0) {
      return ["all", "mens", "womens", "kids"];
    }
    return ["all", ...Array.from(new Set(products.map((p) => p.audience)))];
  }, [products, mounted]);

  const filtered = useMemo(
    () => (audience === "all" ? products : products.filter((p) => p.audience === audience)),
    [products, audience]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const handleAudienceChange = (next: Audience) => {
    setAudience(next);
    setPage(1);
    
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (next === "all") {
        params.delete("audience");
      } else {
        params.set("audience", next);
      }
      window.history.pushState({}, "", `?${params.toString()}`);
    }
  };

  const handlePageChange = (next: number) => {
    if (next < 1 || next > totalPages) return;
    setPage(next);
  };

  if (!mounted) {
    return (
      <>
        <Hero />
        <div className="mx-auto w-full px-10 py-10 text-center text-ink-500">
          جاري تحميل المنتجات...
        </div>
      </>
    );
  }

  return (
    <>
      <Hero />
      <Reveal>
        <TrendsSection />
      </Reveal>
      <Reveal>
        <JourneySection />
      </Reveal>
      <div id="catalog" className="mx-auto w-full px-10 scroll-mt-24 py-10">
        <div className="relative overflow-hidden rounded-t-[20px] border-2 border-dashed border-base-700 py-6 sm:py-7">
          <div className="mb-8 flex flex-col gap-6">
            <ProductsHeaderText title={t.products.title} subtitle={t.products.subtitle} />
            <Image
              src="/star-2.png"
              alt=""
              width={446}
              height={446}
              className="absolute top-[-100px] end-[-200px]"
            />
            <ProductsFilterBar
              active={audience}
              onChange={handleAudienceChange}
              labels={t.products.audiences}
              options={audienceOptions}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 overflow-hidden rounded-[16px] border-2 border-dashed border-base-700 sm:grid-cols-2 md:grid-cols-3">
          {pageItems.map((product, i) => (
            <ProductCard key={product.id} product={product} revealDelayMs={(i % PAGE_SIZE) * 60} />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-sm text-ink-500">
            {t.products.page} {page} {t.products.of} {totalPages}
          </span>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>

      <Reveal>
        <TestimonialsSection />
      </Reveal>

      <Reveal>
        <CtaSection />
      </Reveal>
    </>
  );
}
