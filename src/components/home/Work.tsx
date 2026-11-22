"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { categories, projects, type ProjectCategory } from "@/content/projects";
import { campaigns } from "@/content/campaigns";
import { showCreativeAndAds } from "@/content/site";
import { ProjectCard } from "@/components/work/ProjectCard";
import { CampaignCard } from "@/components/work/CampaignCard";
import { Reveal } from "@/components/ui/Reveal";
import { Tiles } from "@/components/ui/Tiles";
import { SplitText } from "@/components/ui/SplitText";

export function Work() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [slide, setSlide] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const shown = projects.filter((p) => filter === "all" || p.category === filter);

  const showAds = showCreativeAndAds && (filter === "all" || filter === "ads");
  const filters = showCreativeAndAds ? categories : categories.filter((c) => c.id !== "ads");

  const count = (id: ProjectCategory | "all") => {
    if (id === "all") return projects.length + (showCreativeAndAds ? campaigns.length : 0);
    if (id === "ads") return campaigns.length;
    return projects.filter((p) => p.category === id).length;
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    setSlide(0);
  }, [filter]);

  const onScroll = () => {
    const el = track.current;
    if (!el || !el.firstElementChild) return;
    const w = (el.firstElementChild as HTMLElement).offsetWidth + 16;
    setSlide(Math.round(el.scrollLeft / w));
  };

  return (
    <section id="work" className="relative isolate overflow-hidden pb-10 pt-16 md:pb-12 md:pt-[88px]">
      <Tiles
        corner="top-left"
        tiles={[
          { left: -56, top: 60, delay: 0.5 },
          { left: 56, top: 172, delay: 2.5 },
          { right: -56, top: 300, delay: 4 },
        ]}
      />
      <div className="container-x flex flex-col gap-6 md:gap-8">
        <Reveal className="flex flex-col gap-3">
          <SplitText
            className="text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-tight tracking-[-0.02em]"
            text={showCreativeAndAds ? "Products that ship. Campaigns that perform." : "Products that ship. Systems that scale."}
          />
        </Reveal>

        <Reveal delay={100}>
          <div role="group" aria-label="Filter projects" className="no-scrollbar -mx-5 flex gap-2.5 overflow-x-auto px-5 md:mx-0 md:px-0">
            {filters.map((c) => {
              const on = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(c.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                    on ? "bg-brick text-white" : "border border-line bg-white hover:border-ink"
                  }`}
                >
                  {c.label}
                  {c.id === "all" ? ` · ${count(c.id)}` : ""}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div
          ref={track}
          onScroll={onScroll}
          layout={!reduce}
          className={`${shown.length === 0 ? "hidden" : "flex md:grid"} no-scrollbar -mx-5 snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p) => (
              <motion.div
                key={p.slug}
                layout={!reduce}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-[300px] shrink-0 snap-start md:w-auto"
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Carousel dots (mobile) */}
        <div className="flex justify-center gap-1.5 md:hidden" aria-hidden>
          {shown.map((p, i) => (
            <span key={p.slug} className={`h-1.5 rounded-full transition-all ${i === slide ? "w-[18px] bg-ink" : "w-1.5 bg-line"}`} />
          ))}
        </div>

        {showAds && (
          <Reveal className="flex flex-col gap-5 rounded-[20px] border border-brick p-4 md:gap-6 md:p-6">
            <div className="flex flex-col gap-2">
              <p className="label text-brick">Advertising · Campaign work</p>
              <h3 className="text-[clamp(1.375rem,1.1rem+1.2vw,1.875rem)] font-bold leading-tight tracking-[-0.01em]">
                Paid growth for three very different brands.
              </h3>
            </div>

            <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:-mx-6 md:scroll-px-6 md:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
              {campaigns.map((c) => (
                <div key={c.id} className="w-[min(300px,82%)] shrink-0 snap-start md:w-[340px] lg:w-auto">
                  <CampaignCard campaign={c} />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-t border-line pt-4 text-[13px] leading-relaxed text-body sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:text-sm">
              <p className="max-w-[760px]">
                Strategy, creatives and ad management in one place: audience research, scroll-stopping creatives, Meta &amp; Google campaigns and
                weekly creative testing.
              </p>
              <a
                href="#contact"
                className="group shrink-0 self-start font-semibold underline decoration-line underline-offset-4 transition-colors hover:text-brick hover:decoration-brick sm:self-auto"
              >
                View all campaigns<span className="inline-block transition-transform group-hover:translate-x-1">&nbsp;→</span>
              </a>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
