import { stackGroups } from "@/content/site";
import { projectsUsing } from "@/content/projects";
import { Reveal } from "@/components/ui/Reveal";
import { Tiles } from "@/components/ui/Tiles";
import { StackGroup } from "./StackGroup";
import { SplitText } from "@/components/ui/SplitText";

function Tool({ name }: { name: string }) {
  const used = projectsUsing(name);
  return (
    <span
      tabIndex={used.length ? 0 : undefined}
      className={`group/tool relative rounded-lg border border-line bg-white px-3 py-[7px] text-sm transition-colors ${
        used.length ? "cursor-default hover:border-brick hover:text-brick focus:border-brick focus:text-brick focus:outline-none" : ""
      }`}
    >
      {name}
      {used.length > 0 && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-20 w-max max-w-[240px] -translate-x-1/2 translate-y-1 rounded-lg bg-ink px-3 py-2 text-xs leading-snug text-ivory opacity-0 shadow-lg transition-all duration-200 group-hover/tool:translate-y-0 group-hover/tool:opacity-100 group-focus/tool:translate-y-0 group-focus/tool:opacity-100"
        >
          <span className="block font-mono text-[10px] uppercase tracking-wider text-coral">Used in</span>
          {used.join(" · ")}
        </span>
      )}
    </span>
  );
}

export function Stack() {
  return (
    <section id="stack" className="relative isolate border-y border-line bg-white py-14 md:py-[72px]">
      <Tiles corner="top-right" strength={0.1} tiles={[{ right: 0, top: 0, delay: 1.2 }, { right: 112, top: 112, delay: 3.4 }]} />
      <div className="container-x flex flex-col gap-8 md:gap-10">
        <Reveal className="flex flex-col gap-3">
          <SplitText className="text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] font-bold leading-tight tracking-[-0.02em]" text="Front end to cloud, one person." />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {stackGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 90}>
              <StackGroup title={g.title} count={g.items.length} defaultOpen={i === 0}>
                {g.items.map((t) => (
                  <Tool key={t} name={t} />
                ))}
              </StackGroup>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
