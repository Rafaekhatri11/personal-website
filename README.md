# rafaek.com

Personal portfolio for **Muhammad Rafae Khatri**, Senior Full Stack & AWS Developer.

Built with **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript** and **Tailwind CSS v4**.
Motion uses CSS, [`motion`](https://motion.dev) (layout + scroll-linked animations), [`lenis`](https://lenis.darkroom.engineering) (smooth scroll) and React `<ViewTransition>` (card → case-study morph).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Copy `.env.example` to `.env.local` to enable contact-form email delivery via Resend.

## Where to edit content

| What | File |
| --- | --- |
| Name, email, links, calendar link, résumé | `src/content/site.ts` (`site`) |
| Marquee strip, results, stack, services, process, experience, FAQ, budgets | `src/content/site.ts` |
| Testimonials (section is hidden until you add quotes) | `src/content/site.ts` (`testimonials`) |
| Projects & case studies | `src/content/projects.ts` |
| Screenshots | `public/images/work/` |
| Portrait | `public/images/rafae.png` |
| Résumé | `public/resume.pdf` |
| Social share image | `src/app/opengraph-image.jpg` |

Project `meta` only renders the fields you fill, so add `Role` / `Year` when ready.

## Structure

```
src/
  app/
    page.tsx               one-page homepage
    work/[slug]/page.tsx   project detail pages (statically generated)
    actions.ts             contact form server action
    sitemap.ts, robots.ts, opengraph-image.jpg, icon.png
  components/
    home/                  homepage sections
    work/                  project cards, cover, gallery/lightbox, case-study header
    ui/                    Reveal, CountUp, Magnetic, Tiles, BackToTop, SmoothScroll, icons
  content/                 all site copy and project data
  fonts/                   self-hosted Sora, Manrope, JetBrains Mono (OFL)
```

## Motion implemented from the designs

- Floating glass pill nav, sticky, scroll-spy active link; full-screen mobile menu with staggered links
- Hero: availability pulse dot, headline rises word-by-word, portrait rises into the arch, metric cards bob, magnetic buttons
- Infinite marquee that pauses on hover
- Work: filter chips with layout re-flow, card tilt + image zoom + "View case study" cursor, card image morphs into the case-study hero (View Transitions), ✕ / Esc returns to the same scroll spot; swipe carousel with dots on mobile
- Count-up numbers (once, at 50% in view)
- Stack: hover/focus a tool to see which projects used it; groups collapse on mobile
- Services: hover lift + arrow slide; click pre-fills the contact form (topic + message); accordion on mobile
- Process progress line fills on scroll (vertical on mobile)
- Staggered reveals for timeline rows, features and cards
- FAQ accordion with smooth height and rotating plus
- Contact: copy-email toast, availability line, pulsing red squares + wash
- Back-to-top button: appears after 400px, progress ring, smooth-scrolls up
- Case study: reading-progress bar, screenshot lightbox (←/→/Esc), mobile sticky bar that hides on scroll-down
- Everything respects `prefers-reduced-motion`

## Deploy

Works on Vercel out of the box: import the repo, set the env vars from `.env.example`, and point `rafaek.com` at it.
