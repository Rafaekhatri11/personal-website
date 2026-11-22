"use client";

import { heroServices } from "@/content/site";
import { scrollToTarget } from "@/lib/scroll";
import { ArrowRight, CloudIcon, Code, ImageIcon, Loop, Megaphone } from "@/components/ui/Icons";

const icons = { code: Code, cloud: CloudIcon, devops: Loop, image: ImageIcon, ads: Megaphone };

/** "What I do": stacked rows in one card on mobile, three staggered cards on desktop. Click scrolls to that service. */
export function HeroServices() {
  const go = (target: string) => scrollToTarget(document.getElementById(target) ?? "#services");

  // Cards drift toward the pointer at different depths (desktop only; CSS turns it off for reduced motion).
  const onMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    e.currentTarget.style.setProperty("--py", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };
  const onLeave = (e: React.PointerEvent<HTMLUListElement>) => {
    e.currentTarget.style.setProperty("--px", "0");
    e.currentTarget.style.setProperty("--py", "0");
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="label hidden lg:block text-brick">What I do</p>
      <ul onPointerMove={onMove} onPointerLeave={onLeave} className="flex flex-col rounded-3xl border border-line bg-white px-5 lg:gap-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0">
        {heroServices.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <li
              key={s.num}
              className={`slide-in lg:depth border-b border-line last:border-b-0 lg:border-b-0 ${i === 1 ? "lg:-ml-12 lg:mr-12" : ""}`}
              style={{ ["--d" as string]: `${700 + i * 140}ms`, ["--depth" as string]: `${[10, 18, 13][i] ?? 12}px` }}
            >
              <a
                href={`#${s.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(s.target);
                }}
                className="group spotlight flex items-center gap-4 py-4 transition-[translate,box-shadow,border-color] duration-300 ease-out lg:gap-6 lg:rounded-3xl lg:border lg:border-line lg:bg-white lg:px-7 lg:py-7 lg:hover:-translate-y-1.5 lg:hover:border-brick/30 lg:hover:shadow-[0_20px_40px_rgba(27,27,25,.08)]"
              >
                <span className="flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-brick/10 text-brick transition-colors group-hover:bg-brick group-hover:text-white lg:size-14 lg:rounded-2xl">
                  <Icon className="size-5 lg:size-6" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="label text-brick text-[11px] font-semibold tracking-[0.14em] lg:text-xs">
                     {s.kicker}
                  </span>
                  <span className="font-display text-[17px] font-semibold leading-snug tracking-[-0.01em] group-hover:text-brick lg:text-[22px]">
                    {s.title}
                  </span>
                  <span className="hidden text-[15px] text-muted lg:block">{s.body}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
