"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { testimonials, type Testimonial } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight, LinkedIn, Play, Quote, Star, User } from "@/components/ui/Icons";

type Kind = Testimonial["kind"];
type Filter = "all" | Kind;
type Video = Extract<Testimonial, { kind: "video" }>;
type Review = Extract<Testimonial, { kind: "review" }>;
type Recommendation = Extract<Testimonial, { kind: "linkedin" }>;

const FILTER_LABELS: Record<Kind, string> = { review: "Reviews", linkedin: "LinkedIn", video: "Video" };

/** Filter chips, the featured video and a masonry of review / recommendation cards. */
export function TestimonialsGrid() {
  const [filter, setFilter] = useState<Filter>("all");

  const videos = testimonials.filter((t): t is Video => t.kind === "video");
  const cards = testimonials.filter((t): t is Review | Recommendation => t.kind !== "video");
  const kinds = (["review", "linkedin", "video"] as const).filter((k) => testimonials.some((t) => t.kind === k));

  // "All" leads with one video; the Video filter shows every video.
  const shownVideos = filter === "video" ? videos : filter === "all" ? videos.slice(0, 1) : [];
  const shownCards = filter === "all" ? cards : cards.filter((t) => t.kind === filter);

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {kinds.length > 1 && (
        <div role="group" aria-label="Filter testimonials" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          {(["all", ...kinds] as Filter[]).map((f) => {
            const on = filter === f;
            const count = f === "all" ? testimonials.length : testimonials.filter((t) => t.kind === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  on ? "border-ivory bg-ivory text-ink" : "border-ink-3 text-mist hover:border-mist hover:text-ivory"
                }`}
              >
                {f === "all" ? "All" : FILTER_LABELS[f]}
                <span className={`font-mono text-xs ${on ? "text-brick" : "text-faint"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {shownVideos.map((v) => (
        <VideoFeature key={v.name + v.quote} t={v} />
      ))}

      {shownCards.length > 0 && (
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {shownCards.map((t, i) => (
            <Reveal key={`${filter}-${t.name}-${i}`} delay={(i % 3) * 90} className="mb-5 break-inside-avoid">
              {t.kind === "review" ? <ReviewCard t={t} /> : <RecommendationCard t={t} />}
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

function VideoFeature({ t }: { t: Video }) {
  const [playing, setPlaying] = useState(false);
  const yt = "youtubeId" in t.video ? t.video.youtubeId : null;
  const poster = t.poster ?? (yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : undefined);

  return (
    <Reveal
      as="figure"
      className="grid overflow-hidden rounded-2xl border border-ink-3 bg-ink-2 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]"
    >
      <div className="relative aspect-video bg-ink-3">
        {playing ? (
          yt ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`}
              title={`Video testimonial from ${t.name}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          ) : (
            <video controls autoPlay playsInline poster={t.poster} className="absolute inset-0 size-full bg-black object-contain">
              <source src={(t.video as { src: string }).src} type="video/mp4" />
              {"captions" in t.video && t.video.captions && (
                <track kind="captions" src={t.video.captions} srcLang="en" label="English" default />
              )}
              Your browser does not support the video tag.
            </video>
          )
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video testimonial from ${t.name}`}
            className="group absolute inset-0 flex items-center justify-center overflow-hidden"
          >
            {poster ? (
              <Image
                src={poster}
                alt=""
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <span
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_30%_40%,rgba(194,46,34,.45),transparent_70%)]"
              />
            )}
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <span className="relative flex size-16 items-center justify-center rounded-full bg-brick text-white shadow-[0_12px_40px_rgba(194,46,34,.45)] transition-transform duration-300 ease-out group-hover:scale-110 md:size-20">
              <span aria-hidden className="absolute inset-0 rounded-full bg-brick opacity-50 animate-ping-soft" />
              <Play className="relative size-7 translate-x-0.5 md:size-8" />
            </span>
            {t.duration && (
              <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-xs text-ivory backdrop-blur-sm">
                {t.duration}
              </span>
            )}
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center gap-5 p-6 md:p-8 lg:p-10">
        <div className="font-mono text-xs uppercase tracking-[.08em] text-coral">Video testimonial</div>
        <Quote aria-hidden className="size-8 text-brick" />
        {t.quote ? (
          <blockquote className="font-display text-[clamp(1.375rem,1.1rem+1vw,1.75rem)] font-semibold leading-snug tracking-[-0.01em]">{t.quote}</blockquote>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="font-display text-[clamp(1.375rem,1.1rem+1vw,1.75rem)] font-semibold leading-snug tracking-[-0.01em]">
              Hear it from {t.name.split(" ")[0]}.
            </p>
            <p className="text-[15px] leading-relaxed text-mist">A client’s own words on what it’s like to work together.</p>
          </div>
        )}
        <figcaption>
          <PersonLine t={t} />
        </figcaption>
      </div>
    </Reveal>
  );
}

function ReviewCard({ t }: { t: Review }) {
  const rating = t.rating;
  return (
    <figure className="flex flex-col gap-5 rounded-2xl border border-ink-3 bg-ink-2 p-6 transition-colors duration-300 hover:border-faint md:p-7">
      <div className="flex items-center justify-between gap-3">
        {rating ? (
          <div className="flex gap-0.5 text-coral" role="img" aria-label={`Rated ${rating} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={`size-4 ${i < rating ? "" : "opacity-25"}`} />
            ))}
          </div>
        ) : (
          <Quote aria-hidden className="size-6 text-brick" />
        )}
        <SourceTag href={t.url}>{t.source}</SourceTag>
      </div>
      <blockquote className="text-base leading-relaxed text-ivory/90 md:text-[17px]">“{t.quote}”</blockquote>
      <figcaption className="mt-1">
        <PersonLine t={t} />
      </figcaption>
    </figure>
  );
}

function RecommendationCard({ t }: { t: Recommendation }) {
  const [open, setOpen] = useState(false);
  const long = t.quote.length > 280;
  return (
    <figure className="flex flex-col gap-5 rounded-2xl border border-ink-3 bg-ink-2 p-6 transition-colors duration-300 hover:border-faint md:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex size-7 items-center justify-center rounded-md bg-[#0a66c2] text-white">
            <LinkedIn className="size-3.5" />
          </span>
          Recommendation
        </span>
        {(t.date || t.url) && <SourceTag href={t.url}>{t.date ?? "View"}</SourceTag>}
      </div>
      <div className="flex flex-col items-start gap-2">
        <blockquote className={`text-base leading-relaxed text-ivory/90 md:text-[17px] ${long && !open ? "line-clamp-6" : ""}`}>
          “{t.quote}”
        </blockquote>
        {long && (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="text-sm font-semibold text-coral underline decoration-coral/40 underline-offset-4 hover:decoration-coral"
          >
            {open ? "Show less" : "Read more"}
          </button>
        )}
      </div>
      <figcaption className="mt-1 flex flex-col gap-2">
        <PersonLine t={t} />
        {t.relationship && <span className="text-xs text-mist">{t.relationship}</span>}
      </figcaption>
    </figure>
  );
}

function SourceTag({ href, children }: { href?: string; children: ReactNode }) {
  const cls = "label !text-mist";
  if (!href) return <span className={cls}>{children}</span>;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${cls} group inline-flex items-center gap-1 transition-colors hover:!text-ivory`}>
      {children}
      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

function PersonLine({ t }: { t: Testimonial }) {
  // Review platforms often hide who left the review; attribute it to the platform instead.
  const name = t.name ?? (t.kind === "review" ? `Client on ${t.source}` : "Client");
  const initials = t.name
    ?.split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="flex items-center gap-3">
      {t.avatar ? (
        <Image src={t.avatar} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full object-cover" />
      ) : (
        <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brick/20 font-mono text-xs font-semibold text-coral">
          {initials ?? <User className="size-5" />}
        </span>
      )}
      <div className="text-sm leading-snug">
        <b className="block font-semibold text-ivory">{name}</b>
        {t.role && (
          <span className="text-mist">
            {t.role}
            {t.company && `, ${t.company}`}
          </span>
        )}
      </div>
    </div>
  );
}