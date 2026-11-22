import { Magnetic } from "@/components/ui/Magnetic";
import { HeroServices } from "@/components/home/HeroServices";
import { Parallax } from "@/components/ui/Parallax";
import { showCreativeAndAds } from "@/content/site";

const HEADLINE = showCreativeAndAds
  ? "I build your product, then help the right people find it."
  : "I build your product, then ship it to production.";

export function Hero() {
  const words = HEADLINE.split(" ");
  return (
    <section className="container-x grid grid-cols-[minmax(0,1fr)] items-center gap-10 pb-14 pt-24 md:pt-40 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14 lg:pb-[72px] lg:pt-44 xl:grid-cols-[minmax(0,1fr)_470px] xl:gap-20">
      <Parallax distance={90} fade className="flex flex-col gap-6 md:gap-7">
        <span className="fade-in inline-flex items-center gap-2 max-w-full self-start rounded-full border border-line bg-white px-3.5 py-2 text-xs min-[380px]:text-[13px]">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping-soft rounded-full bg-go/60" />
            <span className="relative inline-flex size-2 rounded-full bg-go" />
          </span>
          Open to freelance, contract &amp; full-time
        </span>

        <h1 className="text-[clamp(2.25rem,1.5rem+3.6vw,4.275rem)] font-bold leading-[1.06] tracking-[-0.02em] lg:leading-[1.04]">
          <span className="sr-only">{HEADLINE}</span>
          <span aria-hidden>
            {words.map((w, i) => (
              <span key={i}>
                <span className="rise-word">
                  <span style={{ ["--d" as string]: `${80 + i * 45}ms` }}>{w}</span>
                </span>
                {i < words.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        </h1>

        <p className="fade-in max-w-[620px] text-[clamp(0.9375rem,0.88rem+0.25vw,1.0625rem)] leading-relaxed text-body md:leading-[1.55]" style={{ ["--d" as string]: "500ms" }}>
          {showCreativeAndAds ? "Web apps and websites, social media creatives and paid ad campaigns." : "Web apps, AWS backends and the DevOps that ships them."}{" "}
          <span className="md:hidden">5+ years, 50+ projects delivered.</span>
          <span className="max-md:hidden">
            {showCreativeAndAds
              ? "One point of contact from the first line of code to the first click on your ad, backed by 5+ years and 50+ delivered projects."
              : "One point of contact from the first line of code to a zero-downtime release, backed by 5+ years and 50+ delivered projects."}
          </span>
        </p>

        <div className="fade-in flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3.5" style={{ ["--d" as string]: "650ms" }}>
          <Magnetic className="max-sm:w-full">
            <a
              href="#contact"
              className="shine w-full rounded-full bg-brick px-[26px] py-4 text-center text-base font-semibold text-white transition-colors hover:bg-brick-dark"
            >
              Book a 30-min call
            </a>
          </Magnetic>
          <Magnetic className="max-sm:w-full">
            <a
              href="#work"
              className="group w-full rounded-full border border-ink px-6 py-[15px] text-center text-base font-medium transition-colors hover:bg-ink hover:text-ivory"
            >
              See my work<span className="inline-block transition-transform group-hover:translate-x-1 max-sm:hidden">&nbsp;→</span>
            </a>
          </Magnetic>
        </div>
      </Parallax>

      <HeroServices />
    </section>
  );
}
