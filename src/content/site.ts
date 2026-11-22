export const site = {
  name: "Muhammad Rafae Khatri",
  shortName: "Rafae Khatri",
  initials: "RK",
  domain: "rafaek.com",
  url: "https://www.rafaek.com",
  email: "hello@rafaek.com",
  /** WhatsApp number in international format, digits only (used for the wa.me link). */
  whatsapp: "15128420997",
  location: "Remote",
  /** Shown after the location in About and Contact. */
  hours: "US & UK hours",
  linkedin: "https://www.linkedin.com/in/muhammad-rafae-04125a142/",
  github: "https://github.com/rafaekhatri11",
  /** The PDF is parked in /private (not served). Move it back to /public before linking it again. */
  resumeUrl: "/resume.pdf",
  /** Add a Cal.com / Calendly link to show “Pick a time on my calendar”. */
  calendarUrl: "",
  title: "Muhammad Rafae Khatri · Full Stack & AWS Developer",
  description:
    "Full-stack developer & architect with 5+ years and 50+ projects. I build fast web apps with React, Next.js and TypeScript, and serverless AWS backends that scale for less.",
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

/**
 * Social media creatives + Meta/Google Ads are switched off for now.
 * Set to true to bring back the hero cards, the “Grow” services, the Advertising work card,
 * the marquee items and the contact-form topics in one go.
 */
export const showCreativeAndAds = false;

type HeroService = {
  num: string;
  kicker: string;
  title: string;
  body: string;
  icon: "code" | "cloud" | "devops" | "image" | "ads";
  /** Element id to scroll to (falls back to #services). */
  target: string;
};

const heroServicesDev: HeroService[] = [
  { num: "01", kicker: "Build", title: "Web apps & websites", body: "Next.js, React, Node.js and Python", icon: "code", target: "service-build" },
  { num: "02", kicker: "Cloud", title: "AWS serverless backends", body: "Lambda, AppSync, DynamoDB and Cognito", icon: "cloud", target: "service-build" },
  { num: "03", kicker: "DevOps", title: "CI/CD & infrastructure", body: "Docker, ECS, AWS CDK and GitHub Actions", icon: "devops", target: "service-devops" },
];

const heroServicesGrowth: HeroService[] = [
  { num: "01", kicker: "Build", title: "Web apps, websites & cloud", body: "Next.js, Node.js, Python and AWS", icon: "code", target: "service-build" },
  { num: "02", kicker: "Create", title: "Social media creatives", body: "Posts, carousels, stories and reel covers", icon: "image", target: "service-create" },
  { num: "03", kicker: "Advertise", title: "Digital advertising", body: "Meta and Google Ads, set up and managed", icon: "ads", target: "service-advertise" },
];

/** "What I do" cards in the hero. */
export const heroServices = showCreativeAndAds ? heroServicesGrowth : heroServicesDev;

export const marquee = [
  "5+ years",
  "50+ projects delivered",
  "React · Next.js · Node.js · AWS",
  ...(showCreativeAndAds
    ? ["Social media creatives", "Meta & Google Ads"]
    : ["CI/CD · Docker · AWS CDK", "Deploys cut from 2+ hours to 15 min"]),
  "Serverless & multi-tenant SaaS",
  "Working with US, UK & EU teams",
  "Replies within 24h",
];
export const results = [
  { value: "50+", label: "projects delivered in 5+ years" },
  { value: "90%", label: "less manual data entry with LedgerIQ" },
  { value: "~35%", label: "lower infrastructure cost on a 500+ user SaaS" },
  { value: "15 min", label: "deploys, down from 2+ hours" },
];

export const stackGroups = [
  {
    title: "Frontend & CMS",
    items: ["React", "Next.js", "TypeScript", "Angular", "Vue", "Tailwind CSS", "HTML + CSS", "GSAP", "Webflow", "Shopify apps", "WordPress", "Stripe"],
  },
  { title: "Backend & APIs", items: ["Node.js", "NestJS", "Express", "Python", "FastAPI", "Java", "GraphQL", "REST", "WebSockets"] },
  {
    title: "AWS",
    items: ["Lambda", "API Gateway", "AppSync", "Cognito", "S3", "CloudFront", "EC2", "ECS", "SQS / SNS", "Step Functions", "EventBridge", "Bedrock"],
  },
  { title: "Data", items: ["PostgreSQL", "Amazon RDS", "DynamoDB", "MongoDB", "Redis", "Supabase"] },
  {
    title: "DevOps & CI/CD",
    items: ["Docker", "Amazon ECS", "AWS CDK", "Serverless Framework", "SAM", "GitHub Actions", "CodePipeline", "CodeDeploy", "Amplify", "Blue-green deploys"],
  },
  { title: "AI & automation", items: ["LangChain", "OpenAI", "Claude", "n8n"] },
];

export type ServiceTopic = "SaaS / web app" | "Website" | "AWS backend" | "DevOps" | "Social media" | "Advertising" | "Hiring";

const allTopics: ServiceTopic[] = ["SaaS / web app", "Website", "AWS backend", "DevOps", "Social media", "Advertising", "Hiring"];

export const topics: ServiceTopic[] = showCreativeAndAds
  ? allTopics
  : allTopics.filter((t) => t !== "Social media" && t !== "Advertising");

/** DevOps offers, shown as the “Ship” group under the build services. */
export const devopsServices: {
  title: string;
  body: string;
  chips: string[];
  cta: string;
  topic: ServiceTopic;
  message: string;
  icon: "pipeline" | "server";
}[] = [
  {
    title: "CI/CD pipelines",
    body: "Every push built, tested and deployed automatically with GitHub Actions or CodePipeline. Releases go from a 2-hour chore to a 15-minute non-event.",
    chips: ["GitHub Actions", "AWS CodePipeline", "CodeDeploy", "Amplify"],
    cta: "Discuss",
    topic: "DevOps",
    message: "I'm interested in setting up or fixing a CI/CD pipeline.",
    icon: "pipeline",
  },
  {
    title: "Infrastructure as code & containers",
    body: "Your AWS setup written as code with AWS CDK or the Serverless Framework, apps in Docker on ECS, and blue-green releases for zero-downtime deploys.",
    chips: ["AWS CDK", "Serverless Framework", "Docker", "Amazon ECS"],
    cta: "Discuss",
    topic: "DevOps",
    message: "I'm interested in infrastructure as code / containerising my app on AWS.",
    icon: "server",
  },
];

/** Creative & advertising offers, shown as the “Grow” group under the build services. `id` is the hero scroll target. */
export const growServices: {
  id: "service-create" | "service-advertise";
  title: string;
  body: string;
  chips: string[];
  cta: string;
  topic: ServiceTopic;
  message: string;
  icon: "image" | "ads";
}[] = [
  {
    id: "service-create",
    title: "Social media creatives",
    body: "On-brand posts, carousels, stories and reel covers, designed as a system so your feed looks like one company, not ten.",
    chips: ["Posts & carousels", "Stories & reel covers", "Reusable templates", "Monthly content packs"],
    cta: "Discuss",
    topic: "Social media",
    message: "I'm interested in social media creatives (posts, carousels, stories and reel covers).",
    icon: "image",
  },
  {
    id: "service-advertise",
    title: "Digital advertising",
    body: "Paid campaigns on Meta and Google, from ad creative and targeting to conversion tracking, with a plain-language report every month.",
    chips: ["Meta Ads", "Google Ads", "Ad creatives", "Tracking & reporting"],
    cta: "Discuss",
    topic: "Advertising",
    message: "I'm interested in Meta / Google ad campaigns set up and managed.",
    icon: "ads",
  },
];

export const services: {
  title: string;
  short: string;
  body: string;
  cta: string;
  topic: ServiceTopic;
  message?: string;
  featured?: boolean;
  icon: "app" | "web" | "cloud" | "ai" | "pipeline" | "audit" | "extension";
}[] = [
  {
    title: "Full-stack SaaS & web apps",
    short: "Full-stack SaaS & web apps",
    body: "MVP to production: Next.js front end, Node.js or Python APIs, auth and payments.",
    cta: "Discuss",
    topic: "SaaS / web app",
    icon: "app",
  },
  {
    title: "Websites that convert",
    short: "Websites that convert",
    body: "Fast, animated marketing sites in Next.js or Webflow + GSAP, built for leads and SEO.",
    cta: "Discuss",
    topic: "Website",
    icon: "web",
  },
  {
    title: "Serverless & multi-tenant backends",
    short: "Serverless backends",
    body: "Lambda, API Gateway, AppSync, Cognito and DynamoDB, with tenant isolation from day one.",
    cta: "Discuss",
    topic: "AWS backend",
    icon: "cloud",
  },
  {
    title: "AI features & automation",
    short: "AI features & automation",
    body: "AI-assisted workflows like LedgerIQ’s mapping engine, plus LangChain, Bedrock and n8n automations.",
    cta: "Discuss",
    topic: "SaaS / web app",
    message: "I'm interested in AI features / automation for my product.",
    icon: "ai",
  },
  {
    title: "Browser & app extensions",
    short: "Browser & app extensions",
    body: "Chrome and Firefox extensions, built to ship and pass store review.",
    cta: "Discuss",
    topic: "SaaS / web app",
    message: "I'm interested in building an extension (browser or platform add-on).",
    icon: "extension",
  },
  {
    title: "AWS cost & performance audit",
    short: "Free AWS cost audit",
    body: "I review your setup and show where money and latency leak.",
    cta: "Claim audit",
    topic: "AWS backend",
    message: "I'd like the free 30-minute AWS cost & performance audit.",
    featured: true,
    icon: "audit",
  },
];

export const process = [
  { title: "Discovery call", body: "30 minutes on goals, users, constraints and budget." },
  { title: "Architecture & estimate", body: "A written plan, cost forecast and fixed scope." },
  { title: "Build in weekly sprints", body: "A demo every week, code in your repo from day one." },
  { title: "Launch & support", body: "Monitoring, handover docs and optional retainer." },
];

export const experience = [
  { period: "Jan 2023 — now", org: "GeeksVisor", role: "Senior Full Stack / Lead Developer" },
  { period: "Nov 2021 — Jan 2023", org: "ElkTech", role: "AWS Backend Developer" },
  { period: "Aug 2019 — May 2020", org: "CodeBustersPro", role: "MERN Stack Developer" },
  { period: "Education", org: "BS Computer Science", role: "" },
];

export const experience_y = [
  { period: "Jan 2023 - Present", org: "Expedey ", role: "Senior Software Engineer" },
  { period: "Nov 2021 - Dec 2022", org: "8loop", role: "Full Stack Engineer" },
  { period: "Jan 2020 - Oct 2021", org: "GRTECH", role: "Senior Software Engineer" },
  { period: "Mar 2019 - Jan 2020", org: "SimpleDeploy", role: "Frontend Web Developer" }


];
export type TeamMember = {
  id: string;
  /** Full name on the profile card. */
  name: string;
  /** Shorter name for the tab. Falls back to `name`. */
  tabName?: string;
  /** Small line under the tab name, e.g. "Founder · Build". */
  kicker: string;
  /** Which service they own; shown as the red pill. */
  service: "Build" | "Create" | "Advertise";
  role: string;
  /** Image in /public. Leave out to show a placeholder. */
  avatar?: string;
  location: string;
  headline: string;
  bio: string;
  timeline: { period: string; org: string; role: string }[];
  tools: string[];
  resumeUrl?: string;
};

/** The About section shows one profile at a time, in this order. */
export const team: TeamMember[] = [
  {
    id: "rafae",
    name: site.name,
    tabName: site.shortName,
    kicker: "Founder · Build",
    service: "Build",
    role: "Full stack & AWS developer · Web apps & cloud",
    avatar: "/images/rafae.png",
    location: `${site.location} · ${site.hours}`,
    headline: "I handle everything from the interface to the infrastructure, so products ship faster and scale cleanly.",
    bio: "I help startups and small businesses build full-stack web applications that scale efficiently: frontends, backend APIs, databases and AWS infrastructure. I care about clean architecture (DDD, SOLID), observability, and systems that are as simple as possible but no simpler.",
    // Hidden for now; restore `experience` and `site.resumeUrl` to show them again.
    timeline: [],
    tools: ["React", "Next.js", "Node.js", "AWS"],
  },
  {
    id: "yousuf",
    name: "Muhammad Yousuf",
    kicker: "Teammate · Build",
    service: "Build",
    role: "Full stack & AI engineer",
    avatar: "/images/yousuf.png",
    location: `${site.location} · ${site.hours}`,
    headline: "I build full-stack products and the AI features inside them, from the API and database to the LLM agent that talks to users.",
    bio: " I am a Full Stack Developer with 8+ years of industry experience, specializing in building scalable, high-performance web and mobile applications. My expertise spans backend development, full-stack engineering, cloud technologies, and modern AI-powered solutions.",
    // Hidden for now; restore `experience_y` to show it again.
    timeline: [],
    tools: ["MERN", "Python", "Agent", "AWS", "LLM", "RAG", "Vector Database"],
  },
  // {
  //   id: "advertise",
  //   name: "[Teammate name]",
  //   kicker: "Advertise",
  //   service: "Advertise",
  //   role: "Performance marketer · Meta & Google Ads",
  //   location: "[City, Country] · [timezone]",
  //   headline: "[One-line positioning, e.g. “I turn ad budgets into measurable sales and leads.”]",
  //   bio: "[2–3 lines: which platforms and industries they run ads for, typical budgets managed, and the results they are proudest of.]",
  //   timeline: [
  //     { period: "[Year] — now", org: "[Company / Agency]", role: "[Role]" },
  //     { period: "[Year] — [Year]", org: "[Company]", role: "[Role]" },
  //     { period: "[Year] — [Year]", org: "[Company]", role: "[Role]" },
  //     { period: "Certifications", org: "[Certification]", role: "[Issuer]" },
  //   ],
  //   tools: ["[Meta Ads Manager]", "[Google Ads]", "[GA4]", "[Looker Studio]"],
  // },
];

type Person = {
  name: string;
  role: string;
  company?: string;
  /** Square image in /public, e.g. "/images/people/jane.jpg". Falls back to initials. */
  avatar?: string;
};

export type Testimonial =
  /** Platforms like Upwork often hide the client's name, so the person fields are optional here. */
  | (Partial<Person> & {
      kind: "review";
      quote: string;
      /** Leave out if you don't want to show stars. Only rated reviews count toward the average. */
      rating?: 1 | 2 | 3 | 4 | 5;
      /** Where the review lives, e.g. "Upwork", "Clutch", "Google". */
      source: string;
      url?: string;
    })
  | (Person & {
      kind: "linkedin";
      quote: string;
      /** LinkedIn's relationship line, e.g. "Managed Rafae directly at GeeksVisor". */
      relationship?: string;
      date?: string;
      url?: string;
    })
  | (Person & {
      kind: "video";
      /** Short pull quote from the video, shown beside the player. */
      quote?: string;
      /** A YouTube video id, or a self-hosted file in /public (add a .vtt for captions). */
      video: { youtubeId: string } | { src: string; captions?: string };
      /** Local poster image. YouTube videos fall back to their own thumbnail. */
      poster?: string;
      duration?: string;
    });

/** Public page listing all your LinkedIn recommendations. */
export const linkedinRecommendationsUrl = `${site.linkedin}details/recommendations/`;

/**
 * Client reviews, LinkedIn recommendations and video testimonials, quoted verbatim.
 * The section hides itself when this list is empty.
 */
export const testimonials: Testimonial[] = [
  {
    kind: "video",
    name: "Matthew Stratman",
    role: "Tax & Finance Professional, Entrepreneur",
    video: { youtubeId: "8-MSe2aC7aQ" },
  },
  {
    kind: "linkedin",
    name: "Matthew Stratman",
    role: "Tax & Finance Professional, Entrepreneur",
    url: linkedinRecommendationsUrl,
    quote:
      "Muhammad Rafae has been a terrific developer for multiple financial applications that I have worked with him on. He has always delivered what I expected and has taken feedback to ensure the app meets my requirements. I would recommend him to anyone who is considering his services.",
  },
  {
    kind: "review",
    source: "Upwork",
    quote:
      "Rafae has done an exceptional job helping me implement many features in my app including ai chat that uses my proprietary information for responses. He has impressed me with his knowledge of the subject and ability to perform the job.",
  },
  {
    kind: "review",
    source: "Upwork",
    quote:
      "Rafae has done a great job on a not usual WordPress/Elementor gallery. The communication and work was excellent from the beginning. He is guiding you through the steps and process of developing or solving problems on your projects. Also Fair conditions and high quality speed of work",
  },
  {
    kind: "review",
    source: "Upwork",
    quote: "Rafae was reactive and did a very good work ! I'm super happy with the result. Thank you",
  },
  {
    kind: "review",
    source: "Upwork",
    quote:
      "Working with Muhammad was an absolute pleasure. They consistently delivered high-quality work and demonstrated exceptional professionalism throughout the project. Their expertise and proactive approach made the collaboration smooth and efficient. I highly recommend Muhammad to anyone seeking a dedicated and skilled freelancer.",
  },
];

export const faqs = [
  {
    q: "Do you overlap with US / UK time zones?",
    a: "Yes. I work remotely and keep a daily overlap window with US and UK working hours for calls, reviews and quick decisions. Everything else moves async with written updates.",
  },
  {
    q: "Freelance, contract or full-time?",
    a: "All three. I take on freelance projects and longer contracts, and I’m open to the right full-time role.",
  },
  {
    q: "Fixed price or hourly?",
    a: "Either. Well-scoped projects get a fixed price after the architecture & estimate step. Ongoing or open-ended work is billed hourly or as a monthly retainer.",
  },
  {
    q: "Can you join an existing team and codebase?",
    a: "Yes. I regularly work inside existing teams, repos and pipelines, follow your conventions, and leave the codebase better documented than I found it.",
  },
  {
    q: "What does the free AWS audit include?",
    a: "A 30-minute review of your AWS setup. I show where money and latency leak and hand you a short list of fixes ranked by impact.",
  },
];

export const budgets = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure yet"];
