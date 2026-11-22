import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { BackToTop } from "@/components/ui/BackToTop";
import { Pointer } from "@/components/ui/Pointer";
import "./globals.css";

const sora = localFont({ src: "../fonts/sora-latin-wght-normal.woff2", variable: "--font-sora", weight: "100 800", display: "swap" });
const manrope = localFont({
  src: "../fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});
const jetbrains = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.shortName}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.domain,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#F6F5F1" };

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/images/rafae.png`,
  email: `mailto:${site.email}`,
  jobTitle: "Senior Full Stack & AWS Developer",
  sameAs: [site.linkedin, site.github],
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Serverless", "DevOps"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <noscript>
          <style>{`.reveal,.fade-in,.portrait-rise{opacity:1!important;transform:none!important}.rise-word>span{transform:none!important}.reveal .clip-reveal{clip-path:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Pointer />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
