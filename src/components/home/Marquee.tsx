"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { marquee } from "@/content/site";

/** Keeps v inside [min, max) by wrapping around, so the loop never jumps. */
const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

const BASE = 2.5; // % of one row per second

/** Highlights strip. Drifts on its own, speeds up with scroll velocity, flips direction with scroll direction and skews slightly. */
export function Marquee() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const dir = useRef(1);
  const hovered = useRef(false);

  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2500, 0, 2500], [-5, 0, 5], { clamp: false });
  const skew = useTransform(velocity, [-2500, 0, 2500], reduce ? [0, 0, 0] : [4, 0, -4]);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    const speed = hovered.current ? 0.25 : 1;
    const move = dir.current * BASE * speed * (delta / 1000) * (1 + Math.abs(b));
    x.set(wrap(-50, 0, x.get() - move));
  });

  const translate = useTransform(x, (v) => `${v}%`);

  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center gap-9 pr-9" aria-hidden={hidden || undefined}>
      {marquee.map((m) => (
        <span key={m} className="flex items-center gap-9">
          <span>{m}</span>
          <span className="text-brick/60">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Highlights"
      className="overflow-hidden border-y border-line bg-white"
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <motion.div
        className="flex h-16 w-max items-center whitespace-nowrap text-[15px] md:h-[72px]"
        style={{ x: translate, skewX: skew }}
      >
        {row(false)}
        {row(true)}
      </motion.div>
    </section>
  );
}
