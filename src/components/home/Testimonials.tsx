import { linkedinRecommendationsUrl, testimonials } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Tiles } from "@/components/ui/Tiles";
import { ArrowUpRight, Quote, Star } from "@/components/ui/Icons";
import { TestimonialsGrid } from "./TestimonialsGrid";
import { SplitText } from "@/components/ui/SplitText";

/** Reviews, LinkedIn recommendations and video testimonials. Renders only once entries exist in src/content/site.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  const reviews = testimonials.flatMap((t) => (t.kind === "review" ? [t] : []));
  const ratings = reviews.flatMap((r) => (r.rating ? [r.rating] : []));
  const average = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
  const sources = [...new Set(reviews.map((r) => r.source))];
  const reviewsLabel = sources.length === 1 ? `${sources[0]} reviews` : "Client reviews";
  const recommendations = testimonials.filter((t) => t.kind === "linkedin").length;

  return (
    <div className="px-3 md:px-[60px]">
      <section
        id="testimonials"
        aria-labelledby="testimonials-title"
        className="relative isolate mx-auto flex max-w-[1320px] flex-col gap-8 overflow-hidden rounded-[22px] bg-ink px-5 py-10 text-ivory md:gap-10 md:rounded-[28px] md:px-[60px] md:py-[72px]"
      >
        <Tiles
          corner="top-left"
          dark
          strength={0.35}
          tiles={[
            { left: 0, top: 0, delay: 0.6 },
            { left: 112, top: 112, delay: 3 },
          ]}
        />
        <Quote aria-hidden className="pointer-events-none absolute -right-6 -top-8 -z-10 size-[200px] text-ivory/[.04] md:-right-4 md:size-[340px]" />

        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex max-w-[620px] flex-col gap-4">
            <div className="font-mono text-xs uppercase tracking-[.08em] text-coral">Testimonials</div>
            <SplitText
              id="testimonials-title"
              className="text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em]"
              text="Don’t just take my word for it."
            />
            <p className="text-[15px] leading-relaxed text-mist md:text-[17px]">
              Reviews from clients, recommendations from people I’ve worked with, and one on camera.
            </p>
          </div>

          {(reviews.length > 0 || recommendations > 0) && (
            <dl className="flex shrink-0 gap-8 border-t border-ink-3 pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              {ratings.length > 0 ? (
                <div className="flex flex-col gap-1">
                  <dt className="label !text-mist">Client rating</dt>
                  <dd className="flex items-center gap-2 font-display text-[clamp(2rem,1.5rem+1.8vw,2.75rem)] font-bold tracking-[-0.02em]">
                    {average.toFixed(1)}
                    <Star className="size-6 text-coral md:size-7" />
                  </dd>
                  <dd className="text-sm text-mist">
                    from {ratings.length} review{ratings.length === 1 ? "" : "s"}
                  </dd>
                </div>
              ) : (
                reviews.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <dt className="label !text-mist">{reviewsLabel}</dt>
                    <dd className="font-display text-[clamp(2rem,1.5rem+1.8vw,2.75rem)] font-bold tracking-[-0.02em]">{reviews.length}</dd>
                    <dd className="text-sm text-mist">from past clients</dd>
                  </div>
                )
              )}
              {recommendations > 0 && (
                <div className="flex flex-col gap-1">
                  <dt className="label !text-mist">LinkedIn</dt>
                  <dd className="font-display text-[clamp(2rem,1.5rem+1.8vw,2.75rem)] font-bold tracking-[-0.02em]">{recommendations}</dd>
                  <dd>
                    <a
                      href={linkedinRecommendationsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1 text-sm text-mist underline decoration-ink-3 underline-offset-4 transition-colors hover:text-ivory hover:decoration-ivory"
                    >
                      recommendation{recommendations === 1 ? "" : "s"}
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          )}
        </Reveal>

        <TestimonialsGrid />
      </section>
    </div>
  );
}
