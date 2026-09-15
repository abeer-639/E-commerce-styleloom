"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm text-ink-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-xl2 border border-dashed bg-base-800 px-4 py-2.5 text-ink-100 placeholder:text-ink-500 outline-none transition-colors focus:border-brand",
          error ? "border-accent-coral" : "border-base-600",
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-accent-coral">{error}</span>}
    </div>
  )
);
Input.displayName = "Input";
