"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/I18nContext";
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { key: "products", value: "1,500+" },
  { key: "arrivals", value: "50+" },
  { key: "off", value: "30%" },
  { key: "satisfaction", value: "95%" },
] as const;


function StatValue({ value, start }: { value: string; start: boolean }) {
  const display = useCountUp(value, start);
  return <>{display}</>;
}

export function Hero() {
  const { t } = useI18n();
  const { ref: statsRef, inView: statsInView } = useInView<HTMLDivElement>();

  return (

    <div className="mx-auto w-full max-w-[1440px] px-10 sm:px-0 md:px-0 my-6 relative flex flex-col overflow-hidden">

      <div className="w-full p-0 m-0 relative flex flex-col overflow-hidden rounded-[20px] border-2 border-dashed border-base-700">

        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="relative h-[280px] w-full sm:h-[380px] md:h-[500px]">
            <Image
              src="/hero/hero-banner.png"
              alt={t.hero.title}
              fill
              priority
              className="object-cover"
            />
          </div>
          <a
            href="#catalog"
            className="flex items-center gap-1 rounded-[12px] border border-dashed border-[#404040] bg-[#1f1f1f] px-[24px] py-[14px] text-[16px] text-white transition-transform duration-200 hover:-translate-y-1 mt-4 mb-4"
          >
            {t.hero.shopNow}
            <span aria-hidden>↗</span>
          </a>
        </div>

  
        <div className="z-10 flex flex-col md:flex-row w-full p-0 m-0">
          <div className="flex flex-1 flex-col gap-[24px] border-b-2 border-dashed border-base-700 px-6 py-6 md:border-b-0 md:border-e-2 md:px-[30px] md:py-[40px]">
            <div className="flex flex-wrap items-center gap-[10px]">
              {t.hero.tabs.map((tab) => (
                <span
                  key={tab}
                  className="rounded-[12px] border border-dashed border-base-700 px-[14px] py-[8px] text-[14px] text-ink-500"
                >
                  {tab}
                </span>
              ))}
            </div>
            <h1 className="font-display text-[26px] font-medium uppercase leading-normal text-ink-100 sm:text-[30px] md:text-[32px]">
              {t.hero.title}
            </h1>
            <p className="text-[14px] leading-relaxed text-ink-500 md:text-[16px]">
              {t.hero.subtitle}
            </p>
          </div>

          <div ref={statsRef} className="grid flex-1 grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
            {stats.map((s, i) => (
              <div
                key={s.key}
                className={[
                  "flex flex-col gap-[8px] px-6 py-6 md:px-[40px] md:py-[30px]",
                  i < 2 ? "border-b-2 border-dashed border-base-700" : "",
                  i % 2 === 0 ? "border-e-2 border-dashed border-base-700" : "",
                ].join(" ")}
              >
                <span className="font-display text-[30px] font-medium text-ink-100 md:text-[38px] tabular-nums">
                  <StatValue value={s.value} start={statsInView} />
                </span>
                <span className="text-[13px] text-ink-500 md:text-[15px]">
                  {t.hero.stats[s.key]}
                </span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
