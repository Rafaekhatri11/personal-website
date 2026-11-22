"use client";

import { useEffect, useState } from "react";

/** Mobile: “Let’s talk” pill appears once the hero scrolls away, hides while the contact section is on screen. */
export function FloatingCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let pastHero = false;
    let atContact = false;
    const sync = () => setShow(pastHero && !atContact);
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.9;
      sync();
    };
    const contact = document.getElementById("contact");
    const io = new IntersectionObserver(([e]) => {
      atContact = e.isIntersecting;
      sync();
    });
    if (contact) io.observe(contact);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);
  return (
    <a
      href="#contact"
      tabIndex={show ? 0 : -1}
      className={`shine fixed bottom-7 left-4 z-40 rounded-full bg-brick px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,.2)] transition-all duration-500 ease-out md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      Let’s talk →
    </a>
  );
}
