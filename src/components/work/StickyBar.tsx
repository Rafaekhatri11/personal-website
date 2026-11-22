"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCloseProject } from "./ProjectHeader";

/** Mobile: bar slides up after the hero, hides while scrolling down, returns on scroll-up. */
export function StickyBar() {
  const close = useCloseProject();
  const [show, setShow] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const past = y > window.innerHeight * 0.8;
      const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 200;
      const next = past && !nearEnd && y < last;
      setShow(next);
      document.body.dataset.stickybar = String(next);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      delete document.body.dataset.stickybar;
    };
  }, []);
  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 flex gap-2.5 rounded-full border border-line bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,.15)] transition-all duration-500 ease-out md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"
      }`}
    >
      <button type="button" onClick={close} className="flex-1 p-3 text-center text-sm font-semibold">
        ← All work
      </button>
      <Link href="/#contact" className="flex-1 rounded-full bg-brick p-3 text-center text-sm font-semibold text-white">
        Book a call
      </Link>
    </div>
  );
}
