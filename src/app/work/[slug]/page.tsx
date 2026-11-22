import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { ProjectHeader, BackToWork } from "@/components/work/ProjectHeader";
import { ProjectCover } from "@/components/work/ProjectCover";
import { Gallery } from "@/components/work/Gallery";
import { StickyBar } from "@/components/work/StickyBar";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Footer } from "@/components/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const description = `${p.subhead} ${p.summary}`;
  return {
    title: `${p.title}: ${p.headline}`,
    description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: {
      type: "article",
      url: `${site.url}/work/${p.slug}`,
      title: `${p.title} · Case study`,
      description,
      images: [{ url: p.cover.src, width: p.cover.width, height: p.cover.height, alt: p.cover.alt }],
    },
    twitter: { card: "summary_large_image", title: `${p.title} · Case study`, description, images: [p.cover.src] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = getNextProject(slug);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/#work` },
      { "@type": "ListItem", position: 3, name: p.title, item: `${site.url}/work/${p.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c") }} />
      <ProjectHeader />
      <main id="main">
        {/* Hero */}
        <section className="container-x flex flex-col gap-3.5 pb-6 pt-5 md:gap-[22px] md:pb-12 md:pt-14">
          <BackToWork className="self-start" />
          <div className="label fade-in">{p.tag}</div>
          <div className="fade-in text-base font-semibold text-muted md:text-xl" style={{ ["--d" as string]: "80ms" }}>
            {p.title}
          </div>
          <h1
            className="fade-in max-w-[1060px] text-[clamp(2rem,1.2rem+3.4vw,4.25rem)] font-bold leading-[1.1] tracking-[-0.02em] md:leading-[1.03] md:tracking-[-0.03em]"
            style={{ ["--d" as string]: "140ms" }}
          >
            {p.headline}
          </h1>
          <p className="fade-in max-w-[820px] text-base leading-normal text-body md:text-xl" style={{ ["--d" as string]: "220ms" }}>
            {p.subhead}
          </p>
          {p.links && (
            <div className="fade-in flex flex-col gap-1.5 md:flex-row md:gap-7" style={{ ["--d" as string]: "280ms" }}>
              {p.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1 text-sm font-semibold underline decoration-line underline-offset-4 hover:text-brick hover:decoration-brick md:text-[15px]"
                >
                  <span className="hidden md:inline">{l.label}:&nbsp;</span>
                  {l.url.replace(/^https?:\/\//, "")}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          )}
          <dl
            className="fade-in mt-2 grid grid-cols-2 gap-3.5 border-t border-line pt-3.5 md:grid-cols-4 md:gap-6 md:pt-6"
            style={{ ["--d" as string]: "340ms" }}
          >
            {p.meta.map((m) => (
              <div key={m.label}>
                <dt className="label">{m.label}</dt>
                <dd className="mt-1 text-sm md:mt-1.5 md:text-base">{m.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="fade-in flex flex-wrap gap-1.5 md:gap-2" style={{ ["--d" as string]: "400ms" }} aria-label="Tech stack">
            {p.stack.map((t) => (
              <li key={t} className="rounded-full border border-line bg-white px-2.5 py-1 text-xs md:px-3.5 md:py-1.5 md:text-sm">
                {t}
              </li>
            ))}
          </ul>
        </section>

        <div className="mx-auto max-w-[1440px] px-3 md:px-[60px]">
          <ProjectCover
            project={p}
            priority
            sizes="(min-width: 1440px) 1320px, 100vw"
            className="aspect-[16/10] max-h-[600px] w-full rounded-[18px] border border-line md:aspect-auto md:h-[600px] md:rounded-3xl"
          />
        </div>

        {/* Overview */}
        <section className="container-x grid gap-3 pb-2 pt-9 md:gap-[72px] md:pb-14 md:pt-24 lg:grid-cols-[300px_minmax(0,1fr)]">
          <h2 className="label !text-brick">Overview</h2>
          <Reveal as="p" className="text-[clamp(1.0625rem,0.95rem+0.5vw,1.375rem)] leading-relaxed md:leading-[1.6]">
            {p.overview}
          </Reveal>
        </section>

        {/* Features */}
        <section className="container-x grid gap-2 pb-2 pt-8 md:gap-[72px] md:pb-24 md:pt-10 lg:grid-cols-[300px_minmax(0,1fr)]">
          <h2 className="label mb-1 !text-brick">Key features</h2>
          <ol className="grid md:grid-cols-2 md:gap-x-10">
            {p.features.map((f, i) => (
              <Reveal as="li" key={f} delay={(i % 2) * 80 + Math.floor(i / 2) * 60} className="flex gap-3 border-t border-line py-3.5 md:gap-4 md:py-5">
                <span className="w-[22px] shrink-0 pt-0.5 font-mono text-xs text-muted md:w-7 md:text-sm">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] leading-normal md:text-[17px]">{f}</span>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Results */}
        <section className="container-x flex flex-col gap-3 pb-2 pt-8 md:gap-7 md:pb-[72px] md:pt-24">
          <h2 className="label !text-brick">Results &amp; value</h2>
          <div className="grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {p.results.map((r, i) => (
              <Reveal
                key={r.label}
                delay={i * 100}
                className={`@container flex min-w-0 flex-col gap-1.5 rounded-2xl p-5 md:gap-2.5 md:rounded-[20px] md:p-7 lg:p-8 ${
                  i === 0 ? "bg-ink text-ivory" : "border border-line bg-white"
                } ${i === p.results.length - 1 && p.results.length % 2 === 1 ? "md:max-lg:col-span-2" : ""}`}
              >
                <CountUp
                  value={r.value}
                  className={`font-display text-[clamp(1.75rem,14cqw,3.25rem)] font-bold leading-[1.05] tracking-[-0.02em] [overflow-wrap:anywhere] md:tracking-[-0.03em] ${
                    i === 0 ? "text-coral" : ""
                  }`}
                />
                <div className={`text-sm leading-normal md:text-base ${i === 0 ? "text-mist" : "text-body"}`}>{r.label}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Gallery */}
        {p.gallery && (
          <section className="container-x flex flex-col gap-3 pb-2 pt-8 md:gap-6 md:pb-24 md:pt-6">
            <h2 className="label !text-brick">Interface</h2>
            <Gallery items={p.gallery} />
          </section>
        )}

        {/* Next project + CTA */}
        <section className="container-x flex flex-col gap-3.5 pb-10 pt-8 md:flex-row md:gap-6 md:border-t md:border-line md:pb-24 md:pt-[72px]">
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-1 items-center gap-3.5 rounded-2xl border border-line bg-white p-3 transition-shadow hover:shadow-[0_20px_40px_rgba(27,27,25,.08)] md:gap-5 md:rounded-[20px] md:p-4"
          >
            <div className="relative h-[72px] w-24 shrink-0 overflow-hidden rounded-[10px] bg-sand md:h-[140px] md:w-[200px] md:rounded-xl">
              <Image
                src={next.cover.src}
                alt=""
                fill
                sizes="200px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div>
              <div className="label">Next project</div>
              <div className="mt-1 font-display text-lg font-bold md:mt-1.5 md:text-[28px]">
                {next.title} <span className="inline-block transition-transform group-hover:translate-x-1.5">→</span>
              </div>
            </div>
          </Link>
          <div className="flex flex-col gap-3.5 rounded-[18px] bg-ink p-6 text-ivory md:w-[440px] md:gap-4 md:rounded-[20px] md:p-8">
            <div className="font-display text-[22px] font-bold leading-tight md:text-[26px]">Need something like this?</div>
            <Link
              href="/#contact"
              className="shine rounded-full bg-brick p-3.5 text-center font-semibold text-white transition-colors hover:bg-brick-dark"
            >
              Book a 30-min call
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
