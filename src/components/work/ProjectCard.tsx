"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { ProjectCover } from "./ProjectCover";

/** Card with hover tilt, image zoom and a “View case study” cursor that follows the pointer. */
export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = `perspective(1000px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`;
    }
    setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
    setCursor(null);
  };

  return (
    <Link
      ref={ref}
      href={`/work/${project.slug}`}
      data-cursor="hide"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={() => {
        try {
          sessionStorage.setItem("rk:fromHome", "1");
        } catch {}
      }}
      className="group spotlight relative flex h-full flex-col gap-4 rounded-[20px] border border-line bg-white p-3 transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:shadow-[0_24px_50px_rgba(27,27,25,.10)] md:p-4 md:hover:cursor-none"
    >
      <div className="relative">
        <ProjectCover
          project={project}
          sizes="(min-width: 768px) 50vw, 300px"
          className="h-[190px] rounded-xl md:h-[232px]"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs">{project.badge}</span>
      </div>
      <div className="flex flex-col gap-2.5 px-1.5 pb-1.5 md:px-2 md:pb-2">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
          <h3 className="text-xl font-semibold md:text-2xl">{project.title}</h3>
          <span className="text-sm font-semibold text-brick md:text-ink">{project.highlight}</span>
        </div>
        <p className="hidden text-[15px] leading-normal text-body md:block">{project.summary}</p>
        <div className="font-mono text-[11px] leading-relaxed text-muted md:text-xs">{project.cardStack.join(" · ")}</div>
      </div>

      {cursor && (
        <span
          aria-hidden
          className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-brick px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg md:block"
          style={{ left: cursor.x, top: cursor.y }}
        >
          View case study →
        </span>
      )}
    </Link>
  );
}
