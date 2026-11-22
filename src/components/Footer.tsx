import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="container-x flex flex-col gap-6 pb-28 pt-12 md:gap-10 md:pb-14 md:pt-[72px]">
      <div className="font-display text-[clamp(2.5rem,0.5rem+10vw,8.25rem)] font-bold leading-[0.9] tracking-[-0.04em]">{site.domain}</div>
      <div className="flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between md:pr-24">
        <span>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </span>
        <span className="flex gap-5">
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="hover:text-brick">
            LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noreferrer" className="hover:text-brick">
            GitHub
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-brick">
            Email
          </a>
        </span>
      </div>
    </footer>
  );
}
