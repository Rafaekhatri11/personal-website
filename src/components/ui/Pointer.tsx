"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/**
 * Desktop-only pointer layer, mounted once in the root layout:
 * 1. A ring that trails the cursor and grows over anything clickable.
 *    Elements with [data-cursor="hide"] (e.g. project cards, which draw their own label) hide it.
 * 2. Feeds --mx / --my to the nearest `.spotlight` element so its glow follows the pointer.
 * The native cursor stays visible; the ring is decoration only.
 */
export function Pointer() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ring.current;
    if (!fine || !el) return;

    let x = -100,
      y = -100,
      rx = x,
      ry = y,
      raf = 0,
      seen = false;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      el.style.translate = `${rx}px ${ry}px`;
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.1 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      const t = e.target as Element | null;

      // Spotlight glow on cards
      const spot = t?.closest<HTMLElement>(".spotlight");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${x - r.left}px`);
        spot.style.setProperty("--my", `${y - r.top}px`);
      }

      if (reduce) return;
      if (!seen) {
        seen = true;
        rx = x;
        ry = y;
      }
      el.dataset.state = t?.closest("[data-cursor='hide']") ? "hidden" : t?.closest(INTERACTIVE) ? "hover" : "idle";
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => (el.dataset.state = "hidden");
    const onDown = () => el.setAttribute("data-down", "");
    const onUp = () => el.removeAttribute("data-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return <div ref={ring} aria-hidden data-state="hidden" className="cursor-ring" />;
}
