"use client";

import { useState } from "react";
import { faqs, testimonials } from "@/content/site";
import { Plus } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const num = testimonials.length ? "08" : "07";
  return (
    <section id="faq" className="container-x grid gap-6 pb-14 pt-6 md:pb-[72px] lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-[72px]">
      <Reveal className="flex flex-col gap-4">
    
        <SplitText className="text-[clamp(1.75rem,1.4rem+1.6vw,2.5rem)] font-bold tracking-[-0.02em]" text="Before you ask." />
      </Reveal>
      <div className="flex flex-col border-t border-line">
        {faqs.map((f, i) => {
          const on = open === i;
          return (
            <div key={f.q} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  aria-expanded={on}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(on ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left font-sans text-base font-semibold transition-colors hover:text-brick md:py-[22px] md:text-lg"
                >
                  {f.q}
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      on ? "rotate-45 border-brick bg-brick text-white" : "border-line"
                    }`}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
              </h3>
              <div
                id={`faq-a-${i}`}
                role="region"
                aria-labelledby={`faq-q-${i}`}
                className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[720px] pb-5 text-[15px] leading-relaxed text-body">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
