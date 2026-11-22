import type { Campaign } from "@/content/campaigns";

function Creative({ id }: { id: Campaign["id"] }) {
  if (id === "kinara") {
    return (
      <div className="flex h-full w-[58%] max-w-[190px] flex-col justify-between rounded-lg bg-brick p-3 text-white shadow-lg">
        <div className="flex items-center justify-between text-[9px]">
          <span className="font-semibold">kinara.coffee</span>
          <span className="opacity-70">Sponsored</span>
        </div>
        <div className="mx-auto h-9 w-9 rounded-lg bg-ink" />
        <div className="flex flex-col gap-2">
          <p className="font-display text-sm font-bold leading-tight">
            Fresh roasted.
            <br />
            Delivered in 48h.
          </p>
          <span className="self-start rounded-full bg-white px-3 py-1 text-[9px] font-semibold text-ink">Shop now</span>
        </div>
      </div>
    );
  }
  if (id === "aman") {
    return (
      <div className="flex w-[72%] max-w-[230px] flex-col gap-1 rounded-lg bg-white p-3 text-[9px] leading-snug shadow-lg">
        <span className="font-bold">Sponsored</span>
        <span className="flex items-center gap-1.5 text-muted">
          <span className="size-2.5 rounded-full bg-go" />
          amandental.pk
        </span>
        <span className="text-[11px] font-medium text-[#1a0dab]">Aman Dental Care | Book a Check-up Today</span>
        <span className="text-muted">Family dentistry near you. Same-week appointments. Free first consultation.</span>
        <span className="mt-1 flex flex-wrap gap-x-2 text-[8px] text-[#1a0dab]">
          <span>Whitening</span>
          <span>Braces</span>
          <span>Emergency</span>
        </span>
      </div>
    );
  }
  return (
    <div className="flex h-full w-[46%] max-w-[150px] flex-col justify-between rounded-xl bg-ink p-3 text-white shadow-lg">
      <div className="flex items-center justify-between font-mono text-[8px]">
        <span className="text-[#6ee7b7]">REEL · 9:16</span>
        <span className="rounded-full bg-brick px-1.5 py-0.5 text-[7px] font-bold text-white">7 DAYS FREE</span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-display text-xs font-bold leading-tight">
          Your workout.
          <br />
          Zero excuses.
        </p>
        <p className="text-[8px] opacity-60">Plans that fit your week.</p>
      </div>
      <span className="rounded-full bg-white px-3 py-1 text-center text-[9px] font-semibold text-ink">Install now</span>
    </div>
  );
}

export function CampaignCard({ campaign: c }: { campaign: Campaign }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-3 md:p-4">
      <div className="hatch relative flex h-[190px] items-center justify-center overflow-hidden rounded-xl py-3">
        <Creative id={c.id} />
        <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs">{c.badge}</span>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-1 pb-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display text-lg font-bold leading-snug">{c.brand}</h4>
          <span className="shrink-0 pt-1 text-right text-xs text-muted">{c.niche}</span>
        </div>

        <dl className="mt-auto grid grid-cols-2 gap-x-4">
          {c.metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-1 border-t-2 border-ink pt-3">
              <dd className="font-display text-[clamp(1.5rem,1.3rem+0.8vw,1.875rem)] font-bold leading-none text-brick">{m.value}</dd>
              <dt className="text-xs text-muted">{m.label}</dt>
            </div>
          ))}
        </dl>

        <div className="font-mono text-[11px] leading-relaxed text-muted md:text-xs">{c.stack.join(" · ")}</div>
      </div>
    </article>
  );
}
