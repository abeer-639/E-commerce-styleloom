"use client";



import Link from "next/link";
import { Instagram, Dribbble, Twitter, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import Image from "next/image";


function Ticker({ items }: { items: string[] }) {

  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-t-2 border-dashed border-base-700 py-[50px]">
      <div className="flex w-max animate-[footer-ticker_40s_linear_infinite] items-center gap-4">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-4">
            <span className="whitespace-nowrap font-display text-md uppercase text-[#333333]">
              {item}
            </span>
                 <Image
                    src="/Abstract Design.png"
                    alt=""
                    width={60}
                    height={60}
                    ></Image>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes footer-ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

function LinkRow({ items }: { items: { label: string; href: string | null }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {items.map(({ label, href }, i) => (
        <span key={label} className="flex items-center gap-4">
          {href ? (
            <Link
              href={href}
              className="font-display text-lg text-ink-500 transition-colors hover:text-ink-100"
            >
              {label}
            </Link>
          ) : (
            <span className="font-display text-lg text-ink-500 opacity-60">{label}</span>
          )}
          {i < items.length - 1 && <span className="size-[6px] shrink-0 rounded-full bg-base-700" />}
        </span>
      ))}
    </div>
  );
}

const SOCIAL_LINKS = [
  { Icon: Instagram, href: "https://www.instagram.com", label: "Instagram" },
  { Icon: Dribbble, href: "https://dribbble.com", label: "Dribbble" },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export function Footer() {
  const { t } = useI18n();

  const homeItems = [
    { label: t.footer.homeLinks[0], href: "/products#why-us" }, // Why Us → TrendsSection
    { label: t.footer.homeLinks[1], href: "/products#about" },// About Us → JourneySection
    { label: t.footer.homeLinks[2], href: "/products#testimonials" }, // Testimonials
    { label: t.footer.homeLinks[3], href: "/faq" },//FAQ
  ];
  const productsItems = [
    { label: t.footer.productsLinks[0], href: "/products#catalog" },
    { label: t.footer.productsLinks[1], href: "/products#catalog" },
    { label: t.footer.productsLinks[2], href: "/products#catalog" },
  ];

  return (
    <footer className="mt-10">
      <Ticker items={t.footer.tickerItems} />

      <div className="flex flex-col items-center gap-6 border-y-2 border-dashed border-base-700 px-4 py-10 sm:flex-row sm:justify-between sm:px-10 md:px-[80px] md:py-[60px]">
        <p className="font-display text-4xl font-medium text-ink-100 sm:text-5xl">
          Style<span className="text-brand-600">.</span>Loom
        </p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-[66px] items-center justify-center rounded-[12px] bg-[#D6CDC2] text-[#0F0F0F] transition-opacity hover:opacity-90 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Icon size={28} strokeWidth={1.75} />
            </a>
          ))}
         
          <a
            href="https://www.behance.net"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
            className="flex size-[66px] items-center justify-center rounded-[12px] bg-[#D6CDC2] font-display text-lg font-semibold text-[#0F0F0F] transition-opacity hover:opacity-90 transition-transform duration-200 hover:-translate-y-0.5"
          >
            Bē
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 border-b-2 border-dashed border-base-700 px-4 py-10 sm:grid-cols-3 sm:px-10 md:px-[80px] md:py-[60px]">
        <div className="flex flex-col gap-[30px]">
          <p className="text-[22px] font-medium text-ink-100">{t.footer.homeHeading}</p>
          <LinkRow items={homeItems} />
        </div>

        <div className="flex flex-col gap-[30px]">
          <p className="text-[22px] font-medium text-ink-100">{t.footer.productsHeading}</p>
          <LinkRow items={productsItems} />
        </div>

        <div className="flex flex-col gap-[30px]">
          <p className="text-[22px] font-medium text-ink-100">{t.footer.newsletterHeading}</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center justify-between gap-4 rounded-[12px] bg-base-800 px-6 py-[18px] focus-within:ring-2 focus-within:ring-brand"
          >
            <input
              type="email"
              required
              placeholder={t.footer.emailPlaceholder}
              className="w-full bg-transparent font-display text-lg text-ink-500 placeholder:text-ink-500 outline-none"
            />
            <button
              type="submit"
              aria-label="subscribe"
              className="flex size-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand text-brand"
            >
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 px-4 py-[50px] sm:flex-row sm:px-10 md:px-[80px]">
        <p className="font-display text-lg text-ink-500">{t.footer.copyright}</p>
        <div className="flex items-center gap-[11px]">
          <Link href="/terms" className="font-display text-lg text-ink-500 hover:text-ink-100">
            {t.footer.terms}
          </Link>
          <span className="h-[18px] w-px bg-base-700" />
          <Link href="/privacy" className="font-display text-lg text-ink-500 hover:text-ink-100">
            {t.footer.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
