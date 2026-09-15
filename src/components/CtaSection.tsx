"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import Image from "next/image";




export function CtaSection() {
const { t } = useI18n();
  return (
    <div className="w-full px-10 py-10 lg:mx-auto ">
      <div className="relative overflow-hidden rounded-[20px] bg-brand px-6 py-10 sm:px-10 md:py-[50px]">
        <Image
        src="/Vector.png"
        alt=""
        width={450}
        height={450}
        className="absolute top-[-200px] end-[-100px]"
        ></Image>

        <div className="relative flex flex-col items-start gap-8 max-w-[80%] sm:max-w-[70%] md:max-w-[70%]">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-3xl font-bold uppercase leading-tight text-[#1a1a1a] sm:text-[40px]">
              {t.copy.title}
            </h2>
            <p className="max-w-md text-[15px] leading-relaxed text-[#3a332b]">
              {t.copy.subtitle}
            </p>
          </div>
        </div>


        <a
          href="#catalog"
          className="relative mt-6 flex items-center gap-2 whitespace-nowrap rounded-[12px] bg-[#1a1a1a] px-5 py-3 text-[15px] text-white sm:absolute sm:end-10 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2 transition-transform duration-200 hover:-translate-x-1" 
        >
          {t.copy.cta}
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}
