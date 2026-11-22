"use client";

import { useState, type ReactNode } from "react";
import { Plus } from "@/components/ui/Icons";

/** A stack group card. On mobile it collapses to its title (tap to expand); always open from md up. */
export function StackGroup({ title, count, defaultOpen, children }: { title: string; count: number; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="spotlight flex h-full flex-col rounded-2xl border border-line bg-ivory p-5 md:gap-4 md:p-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center justify-between text-left md:pointer-events-none"
      >
        <h3 className="text-[19px] font-semibold">{title}</h3>
        <span className="flex items-center gap-2 md:hidden">
          <span className="font-mono text-xs text-muted">{count}</span>
          <Plus className={`size-5 transition-transform duration-300 ${open ? "rotate-45 text-brick" : ""}`} />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden md:overflow-visible">
          <div className="flex flex-wrap gap-2 pt-4 md:pt-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
