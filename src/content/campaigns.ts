export type Campaign = {
  id: "kinara" | "aman" | "pulse";
  brand: string;
  /** Channel pill shown on the creative */
  badge: string;
  niche: string;
  metrics: { value: string; label: string }[];
  stack: string[];
};

/** Sample brands for layout. Swap with real client work when ready. */
export const campaigns: Campaign[] = [
  {
    id: "kinara",
    brand: "Kinara Coffee Roasters",
    badge: "Meta · Instagram",
    niche: "D2C e-commerce",
    metrics: [
      { value: "4.2x", label: "return on ad spend" },
      { value: "-38%", label: "cost per purchase" },
    ],
    stack: ["Meta Ads", "GA4", "Pixel", "CAPI"],
  },
  {
    id: "aman",
    brand: "Aman Dental Care",
    badge: "Google Search",
    niche: "Healthcare · local leads",
    metrics: [
      { value: "-41%", label: "cost per lead" },
      { value: "180", label: "bookings / month" },
    ],
    stack: ["Google Ads", "Call extensions", "GA4"],
  },
  {
    id: "pulse",
    brand: "Pulse Fitness App",
    badge: "Meta · Reels & Stories",
    niche: "Mobile app",
    metrics: [
      { value: "-32%", label: "cost per install" },
      { value: "12k", label: "installs / month" },
    ],
    stack: ["Meta App Ads", "Reels", "MMP"],
  },
];
