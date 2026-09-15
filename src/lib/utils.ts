import clsx, { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(amount: number, currencySymbol: string) {
  return `${currencySymbol}${amount.toFixed(2)}`;
}
