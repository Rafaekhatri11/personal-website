"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Drifts its children up (and optionally fades them) as the element scrolls out of the top of the viewport.
 * `distance` is how far it travels in px by the time it has left the screen.
 */
export function Parallax({
  children,
  distance = 80,
  fade = false,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  fade?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Always hand motion the same style shape (server and client must match); reduced motion just flattens the ranges.
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -distance]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, fade && !reduce ? 0.25 : 1]);

  return (
    <motion.div ref={ref} className={className} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}
