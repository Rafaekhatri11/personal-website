"use client";

import { useEffect, useRef, type ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Delay before the first word, in ms. */
  delay?: number;
};

/**
 * Heading whose words rise out of a mask, one after another, the first time it scrolls into view.
 * Screen readers get the plain sentence; the animated words are aria-hidden.
 */
export function SplitText({ text, as: Tag = "h2", className = "", id, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.in = "true";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <Tag ref={ref} id={id} className={`split ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i}>
            <span className="rise-word">
              <span style={{ ["--d" as string]: `${delay + i * 55}ms` }}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}
