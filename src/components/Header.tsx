"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Menu, Close } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";

function Logo() {
  return (
    <Link href="/" className="group/logo flex items-center gap-3" aria-label={`${site.shortName}, home`}>
      <span className="flex size-9 items-center justify-center rounded-lg bg-brick text-[15px] font-bold text-white">{site.initials}</span>
      <span className="hidden font-display text-base font-semibold tracking-[-0.01em] transition-transform duration-200 sm:inline-block group-hover/logo:scale-105">{site.shortName}</span>
    </Link>
  );
}

/** Floating glass pill nav with scroll-spy (homepage). */
export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 300) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <>
      {/* Mobile: flat bar with a bottom rule. md+: floating glass pill */}
      <header className="fixed inset-x-0 top-0 z-50 md:px-6 md:pt-4">
        <div
          className={`mx-auto flex h-16 max-w-[1240px] items-center justify-between border-b border-line/90 bg-ivory/85 px-5 backdrop-blur-md transition-shadow duration-300 md:h-[72px] md:rounded-full md:border md:bg-white/70 md:pl-6 md:pr-3 ${
            scrolled ? "shadow-[0_10px_30px_rgba(27,27,25,.08)]" : ""
          }`}
        >
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                aria-current={active === n.id ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 font-display text-[15px] font-medium tracking-[-0.01em] transition-[color,transform] duration-200 hover:scale-105 hover:text-brick ${
                  active === n.id ? "bg-ink/[.06] text-brick" : ""
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Magnetic>
              <a
                href="#contact"
                className="shine hidden rounded-full bg-brick px-5 py-3 font-display text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-brick-dark sm:inline-block"
              >
                Book a call
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex size-11 items-center justify-center rounded-xl border border-line bg-white lg:hidden"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu, links stagger in */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ivory transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line/90 px-5 md:h-[88px] md:border-b-0">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex size-11 items-center justify-center rounded-xl border border-line bg-white"
          >
            <Close className="size-5" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-2 px-6">
          {[...nav, { id: "contact", label: "Contact" }].map((n, i) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              className="font-display text-5xl font-bold tracking-tight transition-[transform,opacity] duration-500 ease-out hover:text-brick"
              style={{
                transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                transform: open ? "none" : "translateY(24px)",
                opacity: open ? 1 : 0,
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 flex-wrap gap-3 px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-4">
          <a href={site.linkedin} className="rounded-full border border-line px-4 py-2 text-sm" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={site.github} className="rounded-full border border-line px-4 py-2 text-sm" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
    </>
  );
}
