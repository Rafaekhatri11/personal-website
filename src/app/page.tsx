import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Work } from "@/components/home/Work";
import { Results } from "@/components/home/Results";
import { Stack } from "@/components/home/Stack";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { About } from "@/components/home/About";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { Contact } from "@/components/home/Contact";
import { FloatingCta } from "@/components/home/FloatingCta";
import { faqs } from "@/content/site";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd).replace(/</g, "\\u003c") }} />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Work />
        <Results />
        <Stack /> 
        <Services />
        <Process />
        <About />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
