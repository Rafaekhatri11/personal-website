"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { site } from "@/content/site";
import { Close } from "@/components/ui/Icons";

/** Returns to the homepage work grid, restoring the scroll spot when we came from there. */
export function useCloseProject() {
  const router = useRouter();
  return useCallback(() => {
    let fromHome = false;
    try {
      fromHome = sessionStorage.getItem("rk:fromHome") === "1";
      sessionStorage.removeItem("rk:fromHome");
    } catch {}
    if (fromHome && window.history.length > 1) router.back();
    else router.push("/#work");
  }, [router]);
}

/** Case-study header: reading-progress bar under the nav, ✕ / Esc returns to the work grid. */
export function ProjectHeader() {
  const close = useCloseProject();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector("[data-lightbox-open]")) close();
    };
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    onScroll();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [close]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.shortName}, home`}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-brick text-[15px] font-bold text-white">{site.initials}</span>
          <span className="hidden font-semibold sm:inline">{site.shortName}</span>
        </Link>
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            href="/#contact"
            className="shine hidden rounded-full bg-brick px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brick-dark sm:inline-block"
          >
            Book a call
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label="Close and return to homepage"
            title="Close (Esc)"
            className="flex size-11 items-center justify-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-ivory"
          >
            <Close className="size-[18px]" />
          </button>
        </div>
      </div>
      <div className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-brick" style={{ transform: `scaleX(${progress})` }} aria-hidden />
    </header>
  );
}

export function BackToWork({ className = "" }: { className?: string }) {
  const close = useCloseProject();
  return (
    <button type="button" onClick={close} className={`text-left text-sm text-muted transition-colors hover:text-brick ${className}`}>
      ← Back to all work
    </button>
  );
}
