"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/content/projects";
import { Close } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

/** Screenshot grid (swipe carousel on mobile). Click → full-screen lightbox, ←/→ to move, Esc to close. */
export function Gallery({ items }: { items: NonNullable<Project["gallery"]> }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, items.length]);

  const current = open === null ? null : items[open];

  return (
    <>
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0">
        {items.map((g, i) => (
          <Reveal as="figure" key={g.src} delay={i * 100} className="flex w-[280px] shrink-0 snap-start flex-col gap-2.5 md:w-auto">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open screenshot: ${g.caption}`}
              className="group clip-reveal relative h-[180px] overflow-hidden rounded-xl border border-line bg-sand md:h-[240px] md:rounded-[14px]"
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 768px) 33vw, 280px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all group-hover:bg-ink/25 group-hover:opacity-100">
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold">View full size</span>
              </span>
            </button>
            <figcaption className="label">{g.caption}</figcaption>
          </Reveal>
        ))}
      </div>

      {current && (
        <div
          data-lightbox-open
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setOpen(null)}
          className="fade-in fixed inset-0 z-[80] flex flex-col items-center justify-center gap-4 bg-ink/90 p-4 backdrop-blur-sm md:p-10"
          style={{ ["--d" as string]: "0ms", animationDuration: "250ms" }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white text-ink"
          >
            <Close className="size-5" />
          </button>
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="90vw"
            className="max-h-[80vh] w-auto rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="font-mono text-xs uppercase tracking-wider text-mist">
            {current.caption} · {open! + 1}/{items.length}
          </p>
        </div>
      )}
    </>
  );
}
