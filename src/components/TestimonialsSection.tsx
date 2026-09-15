"use client";

import { Twitter } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { StarRating } from "@/components/ui/StarRating";
import Image from "next/image";

function TestimonialCard({
  name,
  location,
  rating,
  quote,
  avatarSrc,
}: {
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatarSrc: string;
}) {
  return (
    <div
      className="flex w-full flex-col items-start gap-5 border-dashed border-base-700 p-[24px] md:p-[40px]
        border-b-2 last:border-b-0
        sm:border-e-2
        sm:max-md:[&:nth-child(2n)]:border-e-0 sm:max-md:[&:nth-last-child(-n+2)]:border-b-0
        md:[&:nth-child(3n)]:border-e-0 md:[&:nth-last-child(-n+3)]:border-b-0"
    >
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-3">

          <img
            src={avatarSrc}
            alt={name}
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full bg-base-800 object-cover"
          />
          <div className="flex flex-col">
            <p className="font-display text-base font-medium text-ink-100">{name}</p>
            <p className="text-sm text-ink-500">{location}</p>
          </div>
        </div>
        <Twitter className="size-5 shrink-0 text-ink-500" />
      </div>

      <StarRating rating={rating} />

      <p className="text-[15px] leading-relaxed text-ink-500">{quote}</p>
    </div>
  );
}

export function TestimonialsSection() {
  const { t } = useI18n();

  return (
    <div id="testimonials" className="mx-auto w-full px-10 scroll-mt-24 py-10">
      <div className="overflow-hidden rounded-[20px] border-2 border-dashed border-base-700">
        <div className="relative flex flex-col gap-[30px] overflow-hidden border-b-2 border-dashed border-base-700 px-6 py-10 sm:ps-[80px] sm:pe-[120px] sm:py-[60px] lg:pe-[300px]">
          <Image
          src="/star-3.png"
          alt=""
          width={446}
          height={446}
           className="absolute top-[-100px] end-[-200px] z-5"
          ></Image>
          <p className="relative font-display text-2xl font-medium uppercase leading-tight text-ink-100 sm:text-[40px]">
            {t.testimonials.title}
          </p>
          <p className="relative text-lg text-ink-500">{t.testimonials.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <TestimonialCard
              key={item.name}
              name={item.name}
              location={item.location}
              rating={item.rating}
              quote={item.quote}
              avatarSrc={`/testimonials/avatar-${i + 1}.png`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
