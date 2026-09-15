import { Star } from "lucide-react";

export function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i < rounded ? "fill-[#F2C94C] text-[#F2C94C]" : "text-base-600"}
        />
      ))}
    </div>
  );
}
