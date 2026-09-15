"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Product } from "@/data/types";
import { useI18n } from "@/i18n/I18nContext";
import { useAppDispatch, useAppSelector, useIsAdmin } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { formatPrice } from "@/lib/utils";
import { getProductContent } from "@/lib/productContent";
import { useInView } from "@/hooks/useInView";

export function ProductCard({
  product,
  revealDelayMs = 0,
}: {
  product: Product;
  revealDelayMs?: number;
}) {
  const { t , locale} = useI18n();
  const dispatch = useAppDispatch();
  const [justAdded, setJustAdded] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>();
  const inCartQty = useAppSelector(
    (s) => s.cart.items.find((i) => i.productId === product.id)?.quantity ?? 0
  );
const isAdmin = useIsAdmin();

  const content = getProductContent(t, product , locale);
  const isOut = product.stock <= 0;
  const isMaxed = inCartQty >= product.stock;
  const disabled = isOut || isMaxed;

  const justAddedTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => clearTimeout(justAddedTimeoutRef.current);
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, stock: product.stock }));
    setJustAdded(true);
    clearTimeout(justAddedTimeoutRef.current);
    justAddedTimeoutRef.current = setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
         ref={ref}
         style={{ transitionDelay: inView ? `${revealDelayMs}ms` : "0ms" }}
         className={`flex w-full flex-col items-start gap-[24px] border-dashed border-base-700 p-[20px] md:gap-[30px] md:p-[30px] 
        border-b-2 last:border-b-0
        sm:border-e-2
       sm:max-md:[&:nth-child(2n)]:border-e-0 sm:max-md:[&:nth-last-child(-n+2)]:border-b-0
        md:[&:nth-child(3n)]:border-e-0 md:[&:nth-last-child(-n+3)]:border-b-0 group
        overflow-hidden
        border
        border-base-700
        bg-base-900
        transition-all
        duration-300
        hover:-translate-2
        hover:border-brand
        hover:shadow-[0_20px_50px_rgba(0,0,0,.4)]
        ${inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
    >
      <Link
        href={`/products/${product.id}`}
        className="relative block h-[220px] w-full shrink-0 overflow-hidden rounded-t-[30px] bg-base-800 sm:h-[280px] md:rounded-t-[50px]"
      >
        <Image
          src={product.image}
          alt={content.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover object-cover
          transition-transform
          duration-500
          group-hover:scale-105"
        />
      </Link>

      <div className="flex w-full flex-col sm:flex-wrap sm:w-auto items-start gap-[20px] ">

        <div className="flex w-full flex-wrap items-center justify-between gap-2 px-5 ">
          <span className="whitespace-nowrap  rounded-[100px] border border-dashed border-base-700 bg-base-800 px-[16px] py-[10px] text-[14px] text-ink-500 md:text-[16px]">
            {t.products.categories[product.category]}
          </span>
          {!isAdmin && (
            <button
              type="button"
              disabled={disabled}
              onClick={handleAddToCart}
              className={`whitespace-nowrap rounded-[12px] border border-dashed border-base-600 bg-base-800 px-[16px] py-[12px] text-[14px] text-ink-100 transition-all duration-300 hover:bg-base-700 disabled:cursor-not-allowed disabled:opacity-40 md:px-[24px] md:py-[18px] md:text-[16px] transition-transform duration-200 hover:-translate-y-1 hover:bg-[#ae9b84] ${
                justAdded ? "scale-110 border-brand" : "scale-100"
              }`}
            >
              {justAdded ? (
                <span className="flex items-center gap-1 text-brand">
                  <Check size={14} /> {t.products.added}
                </span>
              ) :  disabled ? (
                t.products.outOfStock
              ) : (
                t.products.addToCart
              )}
            </button>
          )}
        </div>

        <Link
          href={`/products/${product.id}`}
          className="font-display text-[18px] font-medium leading-normal text-ink-100 hover:text-brand md:text-[22px]"
        >
          {content.name}
        </Link>

        <div className="flex flex-wrap items-center gap-[20px]">
          <div className="flex items-center gap-[8px]">
            <span className="text-[14px] text-ink-500 md:text-[16px]">{t.products.fit}</span>
            <span className="h-[4px] w-[4px] rounded-full bg-base-600" />
            <span className="text-[15px] font-medium text-ink-300 md:text-[18px]">{content.fit}</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <span className="text-[14px] text-ink-500 md:text-[16px]">{t.products.price}</span>
            <span className="h-[4px] w-[4px] rounded-full bg-base-600" />
            <span className="text-[15px] font-medium text-[#ae9b84] md:text-[18px]">
              {formatPrice(product.price, t.common.currency)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}