import { Dictionary } from "@/i18n/dictionary";
import { Product } from "@/data/types";

export function getProductContent(
  t: Dictionary,
  product: Product,
  locale: "ar" | "en"
) {
  const entry = t.catalog[product.nameKey as keyof typeof t.catalog];

  if (entry) return entry;

  return {
  name: product.name?.[locale] ?? product.nameKey,
  desc: product.description?.[locale] ?? "",
  fit: product.fit?.[locale] ?? "-",
};
}