"use client";


export function ProductsHeaderText({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className=" flex flex-col gap-3 p-5 z-10">
             
      <p className="relative max-w-3xl font-display text-xl font-semibold uppercase leading-normal text-ink-100 sm:text-[23px] ">
        {title}
      </p>
      <p className="relative text-ink-500">{subtitle}</p>
    </div>
  );
}
