import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main id="main" className="container-x flex min-h-dvh flex-col items-start justify-center gap-5 py-24">
      <div className="label !text-brick">404</div>
      <h1 className="max-w-[720px] text-[clamp(2rem,1.2rem+3.4vw,4.25rem)] font-bold leading-[1.1] tracking-[-0.02em]">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="max-w-[560px] text-base leading-normal text-body md:text-xl">
        The link may be outdated or mistyped. Head back to the homepage to see my work and services.
      </p>
      <Link
        href="/"
        className="shine rounded-full bg-brick px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brick-dark"
      >
        Back to home
      </Link>
    </main>
  );
}
