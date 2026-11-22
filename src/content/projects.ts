export type ProjectCategory = "saas" | "cloud" | "web" | "ads";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Small pill shown on the card cover */
  badge: string;
  /** Short result shown on the card, next to the title */
  highlight: string;
  /** One-line summary for the homepage card */
  summary: string;
  /** Short stack line on the homepage card */
  cardStack: string[];
  /** Case study page */
  tag: string;
  headline: string;
  subhead: string;
  links?: { label: string; url: string }[];
  /** Only filled values are rendered. Add Role / Year when ready. */
  meta: { label: string; value: string }[];
  stack: string[];
  cover: { src: string; alt: string; width: number; height: number };
  overview: string;
  features: string[];
  results: { value: string; label: string }[];
  gallery?: { src: string; alt: string; caption: string; width: number; height: number }[];
};

export const categories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "saas", label: "Full-stack SaaS" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "web", label: "Web & frontend" },
  { id: "ads", label: "Advertising" }
];

export const projects: Project[] = [
  {
    slug: "ledgeriq",
    title: "LedgerIQ",
    category: "saas",
    badge: "FinTech · AI",
    highlight: "90% less manual entry",
    summary:
      "Trial-balance automation for tax prep: AI-suggested tax-line mapping, Excel/CSV import and export to Lacerte, UltraTax & Drake.",
    cardStack: ["Next.js", "Tailwind", "Python", "FastAPI", "PostgreSQL", "AWS"],
    tag: "Case study · FinTech",
    headline: "From client trial balance to tax-ready import in minutes.",
    subhead: "Trial balance automation for faster tax prep.",
    links: [
      { label: "Website", url: "https://ledgeriq.ai" },
      { label: "Portal", url: "https://portal.ledgeriq.ai" },
    ],
    meta: [
      { label: "Industry", value: "Accounting & tax" },
      { label: "Status", value: "Live" },
    ],
    stack: ["Next.js", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL", "AWS"],
    cover: {
      src: "/images/work/ledgeriq-hero.jpg",
      alt: "LedgerIQ homepage: From client trial balance to tax-ready import in minutes",
      width: 1979,
      height: 947,
    },
    overview:
      "LedgerIQ removes the most tedious bottleneck in professional tax prep: manually turning client trial balances into tax-ready formats. An AI-driven mapping engine and a React-based working trial balance cut processing from hours to minutes, with real-time validation of debits and credits and direct exports to major tax software.",
    features: [
      "Automated trial balance import via Excel/CSV parsing",
      "AI-suggested tax-line mappings with human-in-the-loop review",
      "Built-in working trial balance for post-import adjustments",
      "Direct export to Lacerte, UltraTax and Drake",
      "Multi-company dashboard for firm-wide management",
      "Real-time debit/credit validation",
    ],
    results: [
      { value: "90%", label: "reduction in manual data entry for standard trial balances" },
      { value: "Zero", label: "mathematical errors, thanks to integrated debit/credit verification" },
      { value: "Firm-wide", label: "consistency across disparate client data sources" },
    ],
    gallery: [
      { src: "/images/work/ledgeriq-1.jpg", alt: "LedgerIQ working trial balance view", caption: "Working trial balance view", width: 900, height: 428 },
      { src: "/images/work/ledgeriq-2.jpg", alt: "LedgerIQ three-step workflow", caption: "Step-by-step workflow", width: 900, height: 432 },
      { src: "/images/work/ledgeriq-3.jpg", alt: "LedgerIQ mapping interface", caption: "Mapping interface · trial balance review", width: 900, height: 497 },
    ],
  },
  {
    slug: "saddlefit",
    title: "SaddleFit.io",
    category: "saas",
    badge: "Marketplace · 3D data",
    highlight: "0–100 fit score",
    summary:
      "3D equine scanning & saddle marketplace with real-time saddle-tree analysis and colour-coded fit heat maps.",
    cardStack: ["Next.js", "Tailwind", "Lambda", "GraphQL", "DynamoDB", "Cognito", "Stripe", "Shopify App"],
    tag: "Case study · Marketplace",
    headline: "Scan. Fit. Perform. A data-driven saddle marketplace.",
    subhead: "3D equine scanning & performance marketplace.",
    links: [{ label: "Website", url: "https://saddlefit.io" }],
    meta: [
      { label: "Industry", value: "Equestrian e-commerce" },
      { label: "Status", value: "Live" },
    ],
    stack: ["Next.js", "Tailwind CSS", "AWS Lambda", "GraphQL", "DynamoDB", "Cognito", "Stripe", "Shopify App"],
    cover: {
      src: "/images/work/saddlefit-hero.jpg",
      alt: "SaddleFit.io homepage: Scan. Fit. Perform.",
      width: 1979,
      height: 699,
    },
    overview:
      "SaddleFit.io uses 3D scanning and data-driven analysis to find the right saddle for any horse. Each rider gets a SaddleFit Score from 0 to 100 that quantifies fit accuracy, then shops with confidence on the integrated marketplace, guided by real-time heat mapping and saddle-tree analysis.",
    features: [
      "3D horse scanning at scheduled events",
      "SaddleFit Score: a 0–100 fit rating",
      "Real-time saddle tree analysis",
      "Colour-coded fit visualisation",
      "Integrated saddle marketplace",
      "Profile and multi-horse management",
    ],
    results: [
      { value: "0–100", label: "SaddleFit Score turns complex biomechanical data into one clear number" },
      { value: "Performance", label: "a properly fitted saddle gives horse and rider a measurable edge" },
      { value: "Health", label: "better fit reduces the risk of lameness and long-term injury" },
    ],
    gallery: [
      { src: "/images/work/saddlefit-1.jpg", alt: "Why use SaddleFit section", caption: "Why use SaddleFit", width: 871, height: 375 },
      { src: "/images/work/saddlefit-2.jpg", alt: "SaddleFit five-step fitting process", caption: "Fitting process, step by step", width: 777, height: 375 },
      { src: "/images/work/saddlefit-3.jpg", alt: "SaddleFit customer reviews", caption: "Customer reviews", width: 1029, height: 277 },
    ],
  },
  {
    slug: "saas-platform",
    title: "SaaS Platform (Serverless)",
    category: "cloud",
    badge: "Cloud · Multi-tenant",
    highlight: "Strict tenant isolation",
    summary:
      "Multi-tenant SaaS management platform: onboarding, tenant & user management and business microservices on pooled and siloed tenants.",
    cardStack: ["Angular", "AWS CDK", "SAM", "API Gateway", "Lambda", "Cognito", "DynamoDB", "CodePipeline"],
    tag: "Case study · Cloud & multi-tenant",
    headline: "A serverless, multi-tenant SaaS management platform.",
    subhead: "Cloud infrastructure & backend services.",
    meta: [
      { label: "Type", value: "Cloud-native SaaS" },
      { label: "Tenancy", value: "Pooled + siloed" },
    ],
    stack: ["Angular", "AWS SAM", "AWS CDK", "Amazon API Gateway", "Amazon Cognito", "AWS Lambda", "AWS CodePipeline", "Amazon DynamoDB"],
    cover: {
      src: "/images/work/saas-hero.jpg",
      alt: "Multi-tenant serverless SaaS architecture overview",
      width: 1839,
      height: 1030,
    },
    overview:
      "A SaaS management platform that brings web apps, shared services and application services together into one robust multi-tenant environment. It covers onboarding, tenant management, user management and business-specific microservices, with scalability and security built on serverless building blocks.",
    features: [
      "Self-service sign-up and tenant onboarding",
      "Admin console for tenant and user management",
      "Pooled and siloed tenant deployment models",
      "Lambda authorizer with STS, API keys and usage plans",
      "Shared services: registration, provisioning, user management",
      "Web apps served via CloudFront and S3",
    ],
    results: [
      { value: "CDK / SAM", label: "repeatable, environment-agnostic deployments across regions" },
      { value: "Isolated", label: "IAM policy injection and partition keys keep every tenant’s data apart" },
      { value: "Observable", label: "central logging and metrics with CloudWatch Insights" },
    ],
  },
  {
    slug: "trip-management",
    title: "Trip Management System",
    category: "cloud",
    badge: "DevOps",
    highlight: "Zero-downtime releases",
    summary:
      "Legacy Java monolith containerised onto Amazon ECS with blue-green deployments, Multi-AZ RDS and commit-to-production automation.",
    cardStack: ["Java", "Docker", "ECS", "RDS", "ALB", "Auto Scaling", "CodePipeline"],
    tag: "Case study · DevOps",
    headline: "Zero-downtime releases for a legacy Java monolith.",
    subhead: "CI/CD pipeline & blue-green deployment strategy.",
    meta: [
      { label: "Industry", value: "Travel" },
      { label: "Pattern", value: "Blue-green" },
    ],
    stack: ["Java", "Docker", "Amazon ECS", "Amazon RDS", "AWS CodePipeline", "ALB", "Auto Scaling"],
    cover: {
      src: "/images/work/trip-hero.jpg",
      alt: "Trip Management System AWS deployment architecture",
      width: 1332,
      height: 943,
    },
    overview:
      "A CI/CD pipeline built on a blue-green deployment pattern on Amazon ECS for zero-downtime releases. The legacy Java monolith was fully containerised, its database moved to high-availability Amazon RDS, and the whole delivery lifecycle automated from commit to production.",
    features: [
      "Legacy Java monolith containerised with Docker",
      "Blue-green deployments on Amazon ECS",
      "Multi-AZ Amazon RDS for persistence",
      "Auto Scaling behind an Application Load Balancer",
      "CodeCommit → CodePipeline → CodeDeploy automation",
      "Rapid rollback and safe canary testing",
    ],
    results: [
      { value: "Zero", label: "downtime per release with blue-green switching" },
      { value: "Multi-AZ", label: "RDS for enterprise-grade reliability" },
      { value: "Commit → prod", label: "fully automated delivery pipeline" },
    ],
  },
  {
    slug: "wmt-energy",
    title: "WMT Energy Solutions",
    category: "web",
    badge: "Web · Conversion",
    highlight: "More qualified leads",
    summary:
      "High-performance, conversion-focused platform for a UK renewable-energy provider: solar, battery and heat pumps.",
    cardStack: ["Next.js", "Tailwind CSS", "Loop Email"],
    tag: "Case study · Web & conversion",
    headline: "A high-converting website for a UK renewable-energy provider.",
    subhead: "Solar, battery storage and heat pumps.",
    links: [{ label: "Website", url: "https://wmtenergy.co.uk" }],
    meta: [
      { label: "Industry", value: "Renewable energy · UK" },
      { label: "Status", value: "Live" },
    ],
    stack: ["Next.js", "Tailwind CSS", "Loop Email"],
    cover: {
      src: "/images/work/wmt-hero.jpg",
      alt: "WMT Energy homepage: Cut your energy bills up to 70%",
      width: 1983,
      height: 986,
    },
    overview:
      "A high-performance web platform for a UK renewable-energy provider, built to drive conversions for sustainable home heating. It presents solar panels, battery storage and air-source heat pumps clearly and steers visitors to a free energy assessment.",
    features: [
      "Complex solar + battery information made easy to follow",
      "Clear pathways to a free energy assessment",
      "Trust signals and accreditations placed at decision points",
      "Cost-saving metrics surfaced in the UI",
      "Lead capture connected to Loop Email",
      "Fast, responsive Next.js build",
    ],
    results: [
      { value: "More leads", label: "a significant increase in qualified heat-pump leads" },
      { value: "Up to 70%", label: "energy-bill savings message made the centrepiece of the page" },
      { value: "Next.js", label: "fast, responsive build on a modern stack" },
    ],
  },
  {
    slug: "the-point-hotel",
    title: "The Point Hotel & Suites",
    category: "web",
    badge: "Hospitality · Webflow",
    highlight: "Best Hospitality Design",
    summary:
      "Luxury resort website in Orlando with custom GSAP transitions and immersive animations from booking to arrival.",
    cardStack: ["Webflow", "GSAP", "Custom CSS", "JSON-LD"],
    tag: "Case study · Hospitality",
    headline: "Resort luxury, told through motion.",
    subhead: "Luxury resort & apartment-style living web experience in Orlando.",
    links: [{ label: "Website", url: "https://thepointorlando.com" }],
    meta: [
      { label: "Client", value: "Hospitality Group" },
      { label: "Location", value: "Orlando, FL" },
      { label: "Recognition", value: "Best Hospitality Design" },
    ],
    stack: ["Webflow", "GSAP", "Custom CSS", "JSON-LD"],
    cover: {
      src: "/images/work/pointhotel-hero.jpg",
      alt: "The Point Hotel & Suites Orlando homepage hero over the pool",
      width: 1292,
      height: 720,
    },
    overview:
      "A high-performance hospitality website on Webflow for a resort on Universal Blvd, minutes from Universal Studios, Epic Universe and SeaWorld. Custom GSAP transitions and immersive animations bridge the gap between booking and arrival.",
    features: [
      "Custom GSAP page transitions and scroll animations",
      "Oversized suites, full kitchens and balconies showcased",
      "Tropical poolside terrace and fitness studio galleries",
      "JSON-LD structured data for hotel search results",
      "Custom CSS layered on Webflow",
      "Booking-focused calls to action",
    ],
    results: [
      { value: "Award", label: "Best Hospitality Design recognition" },
      { value: "GSAP", label: "immersive motion from first scroll to booking" },
      { value: "SEO", label: "JSON-LD structured data for rich results" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/^(aws|amazon)\s+/, "")
    .replace(/\s+css$/, "")
    .replace(/s$/, "")
    .trim();

/** Projects whose stack includes the given tool (used by the stack hover). */
export function projectsUsing(tool: string) {
  const t = norm(tool);
  return projects.filter((p) => p.stack.some((s) => norm(s) === t)).map((p) => p.title);
}
