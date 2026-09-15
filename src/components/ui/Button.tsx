"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl2 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-base-950";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-brand text-base-950 hover:bg-brand-600 font-medium",
  secondary: "bg-base-800 text-ink-100 border border-dashed border-base-700 hover:bg-base-700",
  ghost: "bg-transparent text-ink-300 border border-dashed border-base-700 hover:text-ink-100 hover:bg-base-800",
  danger: "bg-accent-coral text-base-950 hover:brightness-95",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  )
);
Button.displayName = "Button";
