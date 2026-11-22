import { results } from "@/content/site";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function Results() {
  return (
    <section aria-labelledby="results-title" className="container-x flex flex-col gap-6 pb-12 pt-6 md:gap-8 md:pb-[88px] md:pt-14">
      <h2 id="results-title" className="sr-only">
        Results
      </h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4 md:gap-5">
        {results.map((r, i) => (
          <Reveal key={r.label} delay={i * 90} className="flex flex-col gap-2 border-t-2 border-ink pt-3 md:pt-5">
            <CountUp value={r.value} className="font-display text-[clamp(2.125rem,1.4rem+3vw,3.5rem)] font-bold tracking-[-0.02em] text-brick" />
            <div className="text-[13px] text-body md:text-[15px]">{r.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
