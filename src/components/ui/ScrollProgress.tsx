"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Thin brick bar across the top of the page that fills as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const spring = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brick"
      style={{ scaleX: reduce ? scrollYProgress : spring }}
    />
  );
}
