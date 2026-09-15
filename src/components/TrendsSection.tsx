"use client";

import { useI18n } from "@/i18n/I18nContext";

const icons = [
  "/icones/star.svg",
  "/icones/setting.svg",
  "/icones/mask.svg",
  "/icones/trophy.svg",
  "/icones/magic.svg",
  "/icones/clock.svg",
];

function IconBadge({ icon }: { icon: string }) {
  return (
    <div className="relative flex shrink-0 items-center gap-[10px] rounded-[100px] border-2 border-dashed border-[#262626] p-[10px]">
      {/* 4 corner tick marks */}
      <span className="absolute end-[-2px] top-1/2 h-[2px] w-[15px] -translate-y-1/2 bg-[#404040] " />
      <span className="absolute start-[-2px] top-1/2 h-[2px] w-[15px] -translate-y-1/2 bg-[#404040]" />
      <span className="absolute start-1/2 top-[-2px] h-[15px] w-[2px] -translate-x-1/2 bg-[#404040]" />
      <span className="absolute start-1/2 bottom-[-2px] h-[15px] w-[2px] -translate-x-1/2 bg-[#404040]" />

      <div className="flex shrink-0 items-center justify-center rounded-[64px]  p-[16px]">
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="size-[34px]"
        />
      </div>
    </div>
  );
}

function TrendCard({
  icon,
  title,
  desc,
  borderEnd,
  borderBottom,
}: {
  icon: string;
  title: string;
  desc: string;
  borderEnd: boolean;
  borderBottom: boolean;
}) {
  return (
    <div
      className={[
        "relative flex flex-1 flex-col items-start gap-[50px] overflow-hidden p-4 lg:py-[60] sm:py-[70px]",
        borderEnd
          ? "border-dashed border-[#262626] sm:border-e-2"
          : "",
        borderBottom
          ? "border-b-2 border-dashed border-[#262626] sm:border-b-0"
          : "",
      ].join(" ")}
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute end-[-40px] top-[-40px] size-[180px] opacity-[0.12] sm:end-[-60px] sm:top-[-50px] sm:size-[246px] "
      />

      <IconBadge icon={icon} />

      <div className="relative flex flex-col items-start gap-4 ">
        <p className="font-display text-xl font-medium text-ink-100 lg:text-[20px] sm:text-[18px]">
          {title}
        </p>

        <p className="text-lg leading-relaxed text-[#81807e]">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function TrendsSection() {
  const { t } = useI18n();
  const items = t.trends.items;

  return (
    <div id="why-us" className="mx-auto w-full px-10  py-10">
      <div className="overflow-hidden rounded-[20px] border-2 border-dashed border-[#262626]">
        <div className="flex flex-col gap-[30px] w-1000 border-b-2 border-dashed border-[#262626] sm:ps-[40px] sm:pe-[40px] sm:py-[60px] lg:pe-[30px]">
          <p className="font-display uppercase leading-tight text-ink-100 lg:text-[30px] sm:text-[20px] ">
            {t.trends.title}
          </p>

          <p className="text-lg text-[#676665] ">
            {t.trends.subtitle}
          </p>
        </div>

        <div className="flex flex-col border-b-2 border-dashed border-[#262626] sm:flex-row">
          {items.slice(0, 3).map((item, i) => (
            <TrendCard
              key={item.title}
              icon={icons[i]}
              title={item.title}
              desc={item.desc}
              borderEnd={i < 2}
              borderBottom={i < 2}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row">
          {items.slice(3, 6).map((item, i) => (
            <TrendCard
              key={item.title}
              icon={icons[i + 3]}
              title={item.title}
              desc={item.desc}
              borderEnd={i < 2}
              borderBottom={i < 2}
            />
          ))}
        </div>
      </div>
    </div>
  );
}