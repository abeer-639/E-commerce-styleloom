"use client";



import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { ShoppingBag, ChevronLeft, ChevronRight, Star, Check } from "lucide-react";
import { Product } from "@/data/types";
import { useI18n } from "@/i18n/I18nContext";
import { useAppDispatch, useAppSelector, useIsAdmin } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { formatPrice } from "@/lib/utils";
import { getProductContent } from "@/lib/productContent";
import { getRatingBreakdown } from "@/lib/ratings";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { TestimonialsSection } from "@/components/TestimonialsSection";

const SIZES = ["S", "M", "L", "XL"];
const STAR_LEVELS = [5, 4, 3, 2, 1];

function FabricSwatch({ className = "" }: { className?: string }) {
  return (
    <div
      className={`min-h-[140px] w-full rounded-[12px] border border-dashed border-base-700 ${className}`}
      style={{
        backgroundColor: "#D9CBB8",
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(15,15,15,0.06) 0px, rgba(15,15,15,0.06) 2px, transparent 2px, transparent 6px)," +
          "repeating-linear-gradient(-45deg, rgba(15,15,15,0.04) 0px, rgba(15,15,15,0.04) 2px, transparent 2px, transparent 6px)",
      }}
      aria-hidden
    />
  );
}




export default function ProductDetailsPage() {
  const params = useParams<{ id: string }>();
  const product = useAppSelector((s) => s.products.items.find((p) => p.id === params.id));

  if (!product) {
    notFound();
  }

  return <ProductDetailsContent product={product} />;
}

function ProductDetailsContent({ product }: { product: Product }) {
  const { t, locale } = useI18n();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [size, setSize] = useState(SIZES[1]);
  const [justAdded, setJustAdded] = useState(false);

  const inCartQty = useAppSelector(
    (s) => s.cart.items.find((i) => i.productId === product.id)?.quantity ?? 0
  );
  const isAdmin = useIsAdmin();
  const content = getProductContent(t, product, locale);
  const isOut = product.stock <= 0;
  const disabled = isOut || inCartQty >= product.stock;
  const { total, percentages } = getRatingBreakdown(product.id, product.rating);

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

  const handleShopNow = () => {
    dispatch(addToCart({ productId: product.id, stock: product.stock }));
    router.push("/cart");
  };

  const AddToCartButton = ({ className = "" }: { className?: string }) => (
    <Button variant="secondary" className={className} onClick={handleAddToCart} disabled={disabled}>
      {justAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
      {justAdded ? t.products.added : t.products.addToCart}
    </Button>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1 text-sm text-ink-500 transition-colors hover:text-ink-100"
      >
        <ChevronRight size={16} className="rtl:hidden" />
        <ChevronLeft size={16} className="hidden rtl:block" />
        {t.productDetails.backToProducts}
      </Link>

      <div className="rounded-[20px] border-2 border-dashed border-base-700 p-6 sm:p-10">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-2xl font-semibold uppercase leading-tight text-ink-100 sm:text-[32px]">
              {content.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-ink-500">{content.desc}</span>
              <Badge tone={ disabled ? "danger" : "success"}>
                { disabled ? t.products.outOfStock : t.products.inStock}
              </Badge>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {!isAdmin && (
              <>
                <AddToCartButton />
                <Button variant="primary" onClick={handleShopNow} disabled={disabled}>
                  <ShoppingBag size={16} />
                  {t.productDetails.shopNow}
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr]">
          <div className="relative h-[280px] w-full overflow-hidden rounded-[16px] bg-base-800 sm:h-[380px]">
            <Image src={product.image} alt={content.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <div className="relative h-[130px] w-full overflow-hidden rounded-[16px] bg-base-800 sm:h-[178px]">
              <Image
                src={product.image}
                alt={content.name}
                fill
                className="object-cover"
                style={{ objectPosition: "top" }}
                sizes="30vw"
              />
            </div>
            <div className="relative h-[130px] w-full overflow-hidden rounded-[16px] bg-base-800 sm:h-[178px]">
              <Image
                src={product.image}
                alt={content.name}
                fill
                className="object-cover"
                style={{ objectPosition: "bottom" }}
                sizes="30vw"
              />
            </div>
          </div>
        </div>

        {/* Materials stands alone and stretches full height; Features/Price/Sizes/Ratings stack in the other column */}
        <div className="grid grid-cols-1 items-stretch gap-10 border-t border-dashed border-base-700 pt-10 md:grid-cols-2">
          <div className="flex h-full flex-col gap-6">
            <h2 className="font-display text-lg font-medium text-ink-100">
              {t.productDetails.materialsHeading}
            </h2>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-ink-100">{t.productDetails.joinLifeHeading}</p>
              <p className="text-sm leading-relaxed text-ink-500">{t.productDetails.joinLifeText}</p>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <p className="text-sm font-medium text-ink-100">
                {t.productDetails.materialsSubheading}
              </p>
              <p className="text-sm leading-relaxed text-ink-500">{t.productDetails.materialsText}</p>
              <FabricSwatch className="flex-1" />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-lg font-medium text-ink-100">
                {t.productDetails.featuresHeading}
              </h2>
              <ul className="flex flex-col gap-3">
                {t.productDetails.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-ink-500">
                    <span className="mt-2 h-[4px] w-[4px] shrink-0 rounded-full bg-base-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 border-t border-dashed border-base-700 pt-6">
              <span className="text-sm text-ink-500">{t.products.price}</span>
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-display text-3xl font-semibold text-[#ae9b84]">
                  {formatPrice(product.price, t.common.currency)}
                </span>
                <span className="text-xs text-ink-500">({t.productDetails.mrpNote})</span>
              </div>
              {!isAdmin && <AddToCartButton className="w-fit" />}
            </div>

            <div className="flex flex-col gap-3 border-t border-dashed border-base-700 pt-6">
              <span className="text-sm text-ink-500">{t.productDetails.sizesHeading}</span>
              <div className="flex flex-wrap gap-3">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={[
                      "rounded-[12px] border border-dashed px-4 py-2 text-sm transition-colors",
                      s === size
                        ? "border-transparent bg-brand text-[#1a1a1a]"
                        : "border-base-700 bg-transparent text-ink-500 hover:border-base-600",
                    ].join(" ")}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-dashed border-base-700 pt-6">
              <h2 className="font-display text-lg font-medium text-ink-100">
                {t.productDetails.ratingsHeading}
              </h2>
              <div className="flex flex-col gap-2">
                <span className="font-display text-4xl font-semibold text-ink-100">
                  {product.rating.toFixed(1)}
                </span>
                <StarRating rating={product.rating} />
                <span className="text-sm text-ink-500">
                  {total} {t.productDetails.ratingsLabel}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {STAR_LEVELS.map((level, i) => (
                  <div key={level} className="flex items-center gap-3">
                    <Star className="size-4 shrink-0 fill-[#F2C94C] text-[#F2C94C]" />
                    <span className="w-6 shrink-0 text-sm text-ink-500">0{level}</span>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-base-800">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${percentages[i]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <TestimonialsSection />
      </div>
    </div>
  );
}
