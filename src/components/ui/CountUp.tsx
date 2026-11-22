"use client";

import { useEffect, useRef } from "react";

const PATTERN = /^(\D*?)(\d+(?:\.\d+)?)(.*)$/;

/**
 * Counts a value like "50+", "~35%" or "15 min" up from zero when half in view (once).
 * Server-renders the final value, so it reads correctly without JS. Text values render as-is.
 */
export function CountUp({ value, className = "", duration = 1400 }: { value: string; className?: string; duration?: number }) {
  const match = value.match(PATTERN);
  const outer = useRef<HTMLSpanElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const m = value.match(PATTERN);
    const el = outer.current;
    const out = num.current;
    if (!m || !el || !out) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = parseFloat(m[2]);
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.5 && r.bottom > 0) return; // already on screen at load
    out.textContent = "0";
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          out.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      out.textContent = m[2];
    };
  }, [value, duration]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={outer} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden>
        {match[1]}
        <span ref={num}>{match[2]}</span>
        {match[3]}
      </span>
    </span>
  );
}
