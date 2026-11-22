"use client";

import { useState } from "react";
import { devopsServices, growServices, services, showCreativeAndAds } from "@/content/site";
import { prefillContact } from "@/lib/prefill";
import { scrollToTarget } from "@/lib/scroll";
import { Reveal } from "@/components/ui/Reveal";
import { Tiles } from "@/components/ui/Tiles";
import { ArrowRight, ImageIcon, Megaphone, Plus, ServiceIcon } from "@/components/ui/Icons";
import { SplitText } from "@/components/ui/SplitText";

const growIcons = { image: ImageIcon, ads: Megaphone };

function GroupHeading({ title, label, isNew }: { title: string; label: string; isNew?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <h3 className="font-display text-xl font-bold md:text-[22px]">{title}</h3>
      <span className="label text-[11px] md:text-xs">{label}</span>
      {isNew && <span className="rounded-full bg-brick px-2 py-0.5 text-[11px] font-semibold text-white">New</span>}
      <span aria-hidden className="hidden h-px min-w-6 flex-1 bg-line sm:block" />
    </div>
  );
}

export function Services() {
  const [open, setOpen] = useState<number | null>(0);
  const go = (i: number) => {
    const s = services[i];
    prefillContact({ topic: s.topic, message: s.message });
    scrollToTarget("#contact");
  };
  const goGrow = (i: number) => {
    const s = growServices[i];
    prefillContact({ topic: s.topic, message: s.message });
    scrollToTarget("#contact");
  };
  const goDevops = (i: number) => {
    const s = devopsServices[i];
    prefillContact({ topic: s.topic, message: s.message });
    scrollToTarget("#contact");
  };

  return (
    <section id="services" className="relative isolate overflow-hidden py-14 md:py-[72px]">
      <Tiles corner="bottom-left" strength={0.1} tiles={[{ left: 0, bottom: 0, delay: 0.3 }, { left: 112, bottom: 112, delay: 2.8 }]} />
      <div className="container-x flex flex-col gap-10 md:gap-12">
        <Reveal className="flex flex-col gap-3">
          <SplitText className="text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-tight tracking-[-0.02em]" text="Ways to work together." />
        </Reveal>

        {/* Build */}
        <div id="service-build" className="flex flex-col gap-5 md:gap-6">
          <Reveal>
            <GroupHeading title="Build" label="Development & cloud" />
          </Reveal>

          {/* Tablet / desktop: cards */}
          <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 90}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  className={`group spotlight flex h-full min-h-[230px] w-full flex-col gap-3.5 rounded-2xl bg-white p-6 text-left transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(27,27,25,.08)] lg:p-7 ${
                    s.featured ? "border-2 border-ink" : "border border-line"
                  }`}
                >
                  {s.featured ? (
                    <span className="self-start rounded-full bg-brick px-2.5 py-1 text-xs font-semibold text-white">Free · 30 min</span>
                  ) : (
                    <span className="flex size-11 items-center justify-center rounded-[10px] bg-brick/10 text-brick transition-colors group-hover:bg-brick group-hover:text-white">
                      <ServiceIcon name={s.icon} className="size-6" />
                    </span>
                  )}
                  <h4 className="text-xl font-semibold">{s.title}</h4>
                  <p className="text-[15px] leading-normal text-body">{s.body}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold group-hover:text-brick">
                    {s.cta}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Mobile: accordion list */}
          <div className="-mx-5 border-y border-line bg-white px-5 md:hidden">
            {services.map((s, i) => {
              const on = open === i;
              return (
                <div key={s.title} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex w-full items-center justify-between gap-3 py-4 text-left text-[17px] font-semibold"
                  >
                    {s.short}
                    <Plus className={`size-5 shrink-0 transition-transform duration-300 ${on ? "rotate-45 text-brick" : ""}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="pb-3 text-[15px] leading-normal text-body">{s.body}</p>
                      <button type="button" onClick={() => go(i)} className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brick">
                        {s.cta} <ArrowRight className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ship: DevOps offers, one set of cards at every size so the hero scroll target exists once */}
        <div id="service-devops" className="flex flex-col gap-5 md:gap-6">
          <Reveal>
            <GroupHeading title="Ship" label="DevOps & infrastructure" />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {devopsServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <article className="group spotlight relative flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out focus-within:border-ink hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(27,27,25,.08)] md:p-7">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brick/10 text-brick transition-colors group-hover:bg-brick group-hover:text-white">
                    <ServiceIcon name={s.icon} className="size-6" />
                  </span>
                  <h4 className="font-display text-[clamp(1.375rem,1.15rem+0.9vw,1.75rem)] font-bold leading-tight">{s.title}</h4>
                  <p className="max-w-[520px] text-[15px] leading-relaxed text-body md:text-base">{s.body}</p>
                  <ul className="flex flex-wrap gap-2">
                    {s.chips.map((c) => (
                      <li key={c} className="rounded-full border border-line px-3 py-1.5 text-xs">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => goDevops(i)}
                    className="mt-auto inline-flex items-center gap-1.5 self-start pt-1 text-sm font-semibold after:absolute after:inset-0 after:content-[''] group-hover:text-brick"
                  >
                    {s.cta}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Grow: one set of cards at every size, so each hero scroll target exists exactly once */}
        {showCreativeAndAds && (
        <div className="flex flex-col gap-5 md:gap-6">
          <Reveal>
            <GroupHeading title="Grow" label="Creative & advertising" isNew />
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {growServices.map((s, i) => {
              const Icon = growIcons[s.icon];
              return (
                <Reveal key={s.id} delay={i * 90}>
                  <article
                    id={s.id}
                    className="group spotlight relative flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out focus-within:border-ink hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(27,27,25,.08)] md:p-7"
                  >
                    <span className="flex size-12 items-center justify-center rounded-xl bg-brick/10 text-brick transition-colors group-hover:bg-brick group-hover:text-white">
                      <Icon className="size-6" />
                    </span>
                    <h4 className="font-display text-[clamp(1.375rem,1.15rem+0.9vw,1.75rem)] font-bold leading-tight">{s.title}</h4>
                    <p className="max-w-[520px] text-[15px] leading-relaxed text-body md:text-base">{s.body}</p>
                    <ul className="flex flex-wrap gap-2">
                      {s.chips.map((c) => (
                        <li key={c} className="rounded-full border border-line px-3 py-1.5 text-xs">
                          {c}
                        </li>
                      ))}
                    </ul>
                    {/* The ::after stretches this button over the whole card, so the card is clickable while the markup stays valid */}
                    <button
                      type="button"
                      onClick={() => goGrow(i)}
                      className="mt-auto inline-flex items-center gap-1.5 self-start pt-1 text-sm font-semibold after:absolute after:inset-0 after:content-[''] group-hover:text-brick"
                    >
                      {s.cta}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </button>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
