"use client";

import { useEffect, useState } from "react";
import { scrollToTarget } from "@/lib/scroll";
import { ArrowUp } from "./Icons";

const R = 36;
const C = 2 * Math.PI * R;

/**
 * Brick-red round button, fixed bottom-right.
 * Hidden at the top; fades + slides in after ~400px of scroll (or at the footer).
 * A progress ring fills as you scroll. Click → smooth-scroll to top.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
      setVisible(y > 400 || (max > 0 && y >= max - 40));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => scrollToTarget(0)}
      className={`group fixed bottom-5 right-4 z-40 size-16 rounded-full transition-all duration-500 ease-out in-data-[stickybar=true]:bottom-[84px] md:bottom-8 md:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-brick shadow-[0_8px_20px_rgba(194,46,34,.32),0_0_0_6px_rgba(194,46,34,.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_26px_rgba(194,46,34,.4),0_0_0_9px_rgba(194,46,34,.16)]" />
      <svg viewBox="0 0 80 80" className="absolute -inset-2 size-20 -rotate-90 transition-transform duration-300 group-hover:-translate-y-1" aria-hidden>
        <circle cx="40" cy="40" r={R} fill="none" stroke="rgba(194,46,34,.15)" strokeWidth="2.5" />
        <circle
          cx="40"
          cy="40"
          r={R}
          fill="none"
          stroke="#C22E22"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - progress)}
        />
      </svg>
      <span className="relative flex size-full items-center justify-center text-ivory transition-transform duration-300 group-hover:-translate-y-1">
        <ArrowUp className="size-[26px] animate-nudge-up" />
      </span>
    </button>
  );
}
