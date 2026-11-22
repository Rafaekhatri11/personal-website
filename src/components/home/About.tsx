"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { team, type TeamMember } from "@/content/site";
import { ArrowRight, ArrowUpRight, User } from "@/components/ui/Icons";

/** How long each profile stays up before the next one. */
const SLIDE_MS = 3000;

const pad = (n: number) => String(n).padStart(2, "0");

/** Striped fill used where a teammate has no photo yet. */
const placeholderBg = {
  backgroundColor: "var(--color-sand)",
  backgroundImage: "repeating-linear-gradient(135deg, transparent 0 9px, rgba(27,27,25,.05) 9px 10px)",
};

/**
 * One profile at a time. Autoplay starts when the section is in view, moves on every SLIDE_MS,
 * pauses on hover (mouse only) and keyboard focus. Tabs and arrows jump and restart the timer.
 */
export function About() {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0); // bumps to restart the progress animation
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = team.length;
  const paused = !inView || hovered || focused;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the active tab visible in the scrollable tab row (mobile) without scrolling the page.
  useEffect(() => {
    const row = tabsRef.current;
    const tab = tabRefs.current[active];
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  const go = (i: number) => {
    setActive(((i % count) + count) % count);
    setRun((r) => r + 1);
  };

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: count - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = ((next % count) + count) % count;
    go(i);
    tabRefs.current[i]?.focus();
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="About the team"
      className="container-x py-14 md:py-[72px]"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-5 [grid-template-areas:'tabs_tabs'_'card_card'_'prog_ctrl'] md:gap-y-6 md:[grid-template-areas:'tabs_ctrl'_'card_card'_'prog_prog']">
        {/* Tabs */}
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Team members"
          onKeyDown={onTabKey}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 py-1 [grid-area:tabs] [scrollbar-width:none] md:mx-0 md:gap-3 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {team.map((m, i) => {
            const on = i === active;
            return (
              <button
                key={m.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`team-tab-${m.id}`}
                aria-selected={on}
                aria-controls={`team-panel-${m.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => go(i)}
                className={`flex shrink-0 items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-5 text-left transition-colors duration-300 md:pr-6 ${
                  on ? "border-ink bg-paper" : "border-line bg-paper/60 hover:border-ink/40 hover:bg-paper"
                }`}
              >
                <Avatar member={m} className="size-9 md:size-11" />
                <span className="flex flex-col leading-tight">
                  <span className={`font-display text-[14px] font-medium md:text-[15px] ${on ? "text-ink" : "text-ink-3"}`}>
                    {m.tabName ?? m.name}
                  </span>
                  <span className="font-mono text-[11px] text-muted md:text-xs">{m.kicker}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Counter + arrows */}
        <div className="flex items-center gap-3 [grid-area:ctrl] md:gap-4">
          <p className="font-mono text-[13px] tabular-nums text-muted md:text-sm" aria-live="polite">
            <span key={active} className="inline-block font-semibold text-ink motion-safe:animate-[rk-count_.5s_var(--ease-out-expo)]">
              {pad(active + 1)}
            </span>{" "}
            / {pad(count)}
          </p>
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous profile"
            className="flex size-11 items-center justify-center rounded-full border border-line bg-paper/60 transition-colors hover:border-ink md:size-14"
          >
            <ArrowRight className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next profile"
            className="flex size-11 items-center justify-center rounded-full bg-brick text-white transition-colors hover:bg-brick-dark md:size-14"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>

        {/* Profiles, stacked in one cell so the card keeps the height of the tallest */}
        <div className="grid rounded-[24px] border border-ink bg-paper [grid-area:card] md:rounded-[28px]">
          {team.map((m, i) => (
            <Profile key={m.id} member={m} active={i === active} />
          ))}
        </div>

        {/* Progress */}
        <div className="flex gap-2 [grid-area:prog]" aria-hidden>
          {team.map((m, i) => (
            <span key={m.id} className="h-1 w-10 overflow-hidden rounded-full bg-mist sm:w-14 md:w-[76px]">
              {i < active && <span className="block size-full bg-ink-3" />}
              {i === active && (
                <span
                  key={run}
                  className="team-progress block size-full bg-brick"
                  data-paused={paused}
                  style={{ ["--dur" as string]: `${SLIDE_MS}ms` }}
                  onAnimationEnd={() => go(active + 1)}
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Avatar({ member, className = "" }: { member: TeamMember; className?: string }) {
  return (
    <span className={`relative shrink-0 overflow-hidden rounded-full ${className}`} style={member.avatar ? undefined : placeholderBg}>
      {member.avatar && <Image src={member.avatar} alt="" fill sizes="44px" className="object-cover object-top" />}
    </span>
  );
}

function Profile({ member: m, active }: { member: TeamMember; active: boolean }) {
  return (
    <div
      role="tabpanel"
      id={`team-panel-${m.id}`}
      aria-labelledby={`team-tab-${m.id}`}
      aria-hidden={!active}
      inert={!active}
      data-on={active}
      className={`group grid grid-cols-[minmax(0,1fr)] gap-8 p-5 transition-[opacity,visibility] duration-500 [grid-area:1/1] sm:p-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:p-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14 lg:p-12 xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-20 xl:p-14 ${
        active ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Portrait */}
      <figure className="mx-auto flex w-full max-w-[240px] flex-col gap-4 md:mx-0 md:max-w-none md:pt-14">
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-b-2xl rounded-t-[999px] border border-line bg-ivory"
          style={m.avatar ? undefined : placeholderBg}
        >
          {m.avatar ? (
            <Image
              src={m.avatar}
              alt={`Portrait of ${m.name}`}
              fill
              sizes="(min-width: 1280px) 340px, (min-width: 1024px) 280px, (min-width: 768px) 200px, 240px"
              className="translate-y-[8%] object-cover object-top transition-transform duration-[1200ms] ease-out-expo group-data-[on=true]:translate-y-0"
            />
          ) : (
            <User className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 text-faint/60" aria-hidden />
          )}
        </div>
        <figcaption className="flex flex-col gap-1 text-center md:text-left">
          <span className="font-display text-lg font-semibold leading-snug lg:text-[22px]">{m.name}</span>
          <span className="text-[13px] text-muted md:text-sm">{m.location}</span>
        </figcaption>
      </figure>

      {/* Story */}
      <div className="flex min-w-0 flex-col gap-5 transition-[translate] duration-700 ease-out-expo group-data-[on=false]:translate-y-3 md:gap-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full border border-brick px-3 py-1 font-mono text-xs text-brick md:px-4 md:text-[13px]">{m.service}</span>
          <span className="text-[14px] font-medium text-ink-2 md:text-[15px]">{m.role}</span>
        </div>
        <h2 className="text-[clamp(1.5rem,1.15rem+1.6vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.02em]">{m.headline}</h2>
        <p className="text-base leading-relaxed text-body md:text-[17px]">{m.bio}</p>
        {m.timeline.length > 0 && (
          <ol className="flex flex-col border-t border-line">
            {m.timeline.map((e) => (
              <li key={e.period + e.org} className="flex flex-col gap-1 border-b border-line py-4 lg:flex-row lg:gap-6 lg:py-[18px]">
                <div className="font-mono text-[13px] text-muted lg:w-[200px] lg:shrink-0 lg:text-sm xl:w-[240px]">{e.period}</div>
                <div className="min-w-0 text-ink-3">
                  <b className="font-semibold text-ink-2">{e.org}</b> · {e.role}
                </div>
              </li>
            ))}
          </ol>
        )}
        <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
          {m.tools.map((t) => (
            <span key={t} className="rounded-md border border-line bg-ivory px-3 py-1 font-mono text-xs text-ink-3 md:text-[13px]">
              {t}
            </span>
          ))}
          {m.resumeUrl && (
            <a
              href={m.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="group/cv ml-auto inline-flex items-center gap-1.5 text-[15px] font-semibold underline decoration-line underline-offset-4 transition-colors hover:text-brick hover:decoration-brick max-sm:ml-0 max-sm:mt-2 max-sm:w-full"
            >
              Download résumé (PDF)
              <ArrowUpRight className="size-4 transition-transform group-hover/cv:-translate-y-0.5 group-hover/cv:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
