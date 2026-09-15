"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface SuccessToastProps {
  show: boolean;
  message: string;
  onDismiss: () => void;
  durationMs?: number;
}

/**
 * A fixed, top-of-screen toast that auto-dismisses — lighter-weight than a
 * modal, since a successful add doesn't need to block the user or demand
 * an explicit "OK" click. Positioned at the top (not near the submit
 * button) so it's visible even if the user has scrolled the form out of
 * view by the time the action completes.
 */
export function SuccessToast({ show, message, onDismiss, durationMs = 3000 }: SuccessToastProps) {
  useEffect(() => {
    if (!show) return;
    const id = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(id);
  }, [show, durationMs, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-x-0 top-4 z-50 flex justify-center px-4 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
      }`}
    >
      <Badge tone="success" className="flex items-center gap-1.5 px-4 py-2 text-sm shadow-lg shadow-black/20">
        <CheckCircle2 size={14} />
        {message}
      </Badge>
    </div>
  );
}