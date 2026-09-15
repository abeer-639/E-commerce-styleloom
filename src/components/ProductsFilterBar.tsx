"use client";


export type Audience = "all" | "mens" | "womens" | "kids";

export function ProductsFilterBar({
  active,
  onChange,
  labels,
  options,
}: {
  active: Audience;
  onChange: (a: Audience) => void;
  labels: Record<Audience, string>;
  options: Audience[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-5 z-10">
      {options.map((opt) => {
        const isActive = opt === active;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={[
              "rounded-[100px] border border-dashed px-5 py-2 text-sm transition-colors transition-transform duration-200 hover:-translate-y-1",
              isActive
                ? "border-transparent bg-brand text-[#1a1a1a] "
                : "border-base-700 bg-transparent text-ink-500 hover:border-base-600 ",
            ].join(" ")}
          >
            {labels[opt]}
          </button>
        );
      })}
    </div>
  );
};
