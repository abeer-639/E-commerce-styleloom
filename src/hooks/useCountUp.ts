"use client";

import { useEffect, useMemo, useState } from "react";

function parseStatValue(raw: string) {
  const match = raw.match(/^([\d,]+)(.*)$/);
  if (!match) return { target: 0, suffix: raw };
  return { target: Number(match[1].replace(/,/g, "")), suffix: match[2] };
}


export function useCountUp(value: string, start: boolean, durationMs = 3000) {
  const { target, suffix } = useMemo(() => parseStatValue(value), [value]);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    let frameId: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); 
      setDisplay(Math.round(eased * target));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, target, durationMs]);

  return `${display.toLocaleString("en-US")}${suffix}`;
}