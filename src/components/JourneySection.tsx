"use client";

import { useI18n } from "@/i18n/I18nContext";

import Image from "next/image";

export function JourneySection() {
  const { t } = useI18n();

  return (
    <div id="about" className="mx-auto w-full px-10  py-10">
      <div className="overflow-hidden rounded-[20px] border-2 border-dashed border-base-700">
        <div className="relative flex flex-col gap-[30px] overflow-hidden border-b-2 border-dashed border-base-700 px-6 py-10 sm:ps-[60px] sm:pe-[100px] sm:py-[80px] lg:pe-[200px]">
          <Image
          src="/star-1.png"
          alt=""
          width={446}
          height={446}
          className="absolute top-[-100px] end-[-200px]"
          ></Image>
          <p className="relative font-display text-xl font-medium uppercase leading-tight text-ink-100 sm:text-[25px]">
            {t.journey.title}
          </p>
          <p className="relative text-lg text-ink-500">{t.journey.subtitle}</p>
        </div>

        {/* Steps row */}
        <div className="flex flex-col sm:flex-row">
          {t.journey.steps.map((s, i) => (
            <div
              key={s.step}
              className={[
                "flex flex-1 flex-col items-start gap-[30px] py-8 px-2 sm:py-[25px]",
                i < t.journey.steps.length - 1
                  ? "border-b-2 border-dashed border-base-700 sm:border-b-0 sm:border-e-2"
                  : "",
              ].join(" ")}
            >
              <p className="font-display text-xl text-ink-500">{s.step}</p>
              <div className="flex flex-col items-start gap-4">
                <p className="font-display text-[20px] font-medium text-ink-100">{s.title}</p>
                <p className="text-lg leading-relaxed text-ink-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
