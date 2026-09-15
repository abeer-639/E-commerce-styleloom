import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "brand" | "neutral" | "success" | "warning" | "danger";
  className?: string;
}

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  brand: "bg-brand/15 text-brand",
  neutral: "bg-base-700 text-ink-300",
  success: "bg-emerald-500/15 text-emerald-400",
  warning: "bg-amber-500/15 text-amber-400",
  danger: "bg-accent-coral/15 text-accent-coral",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
