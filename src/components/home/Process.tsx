"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { process } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section className="border-y border-line bg-white py-14 md:py-[72px]">
      <div ref={ref} className="container-x flex flex-col gap-8 md:gap-10">
        <Reveal className="flex flex-col gap-3">
   
          <SplitText className="text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-tight tracking-[-0.02em]" text="What working with me looks like." />
        </Reveal>
        <div className="relative grid gap-8 pl-7 md:grid-cols-4 md:pl-0 md:pt-10">
          {/* Progress line: vertical on mobile, horizontal on desktop */}
          <div className="absolute bottom-2 left-[5px] top-2 w-0.5 bg-line md:inset-x-0 md:bottom-auto md:top-0 md:h-0.5 md:w-auto" />
          <motion.div
            className="absolute left-[5px] top-2 hidden h-0.5 w-full origin-left bg-brick md:left-0 md:top-0 md:block"
            style={{ scaleX: progress }}
          />
          <motion.div className="absolute bottom-2 left-[5px] top-2 w-0.5 origin-top bg-brick md:hidden" style={{ scaleY: progress }} />
          {process.map((s, i) => (
            <Reveal key={s.title} delay={i * 120} className="relative flex flex-col gap-2.5">
              <span className="absolute -left-7 top-1 size-3 rounded-full border-2 border-brick bg-white md:hidden" />
              <div className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-[15px] leading-normal text-body">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
