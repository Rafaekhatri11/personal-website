import type { SVGProps } from "react";

const base = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ArrowUp = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={2.4} {...base} {...p}>
    <path d="M12 20V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);
export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);
export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);
export const Close = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const Menu = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);
export const Plus = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const User = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.8} {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c1.5-3.5 4.4-5 8-5s6.5 1.5 8 5" />
  </svg>
);
export const Star =(p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95z" />
  </svg>
);
export const Play = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" />
  </svg>
);
export const Quote = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M9.6 5C5.9 6.3 3.5 9.3 3.5 13.4V19h6.4v-6.3H6.7c.1-2.6 1.6-4.5 3.9-5.5zm10.4 0c-3.7 1.3-6.1 4.3-6.1 8.4V19h6.4v-6.3h-3.2c.1-2.6 1.6-4.5 3.9-5.5z" />
  </svg>
);
export const LinkedIn =(p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
export const GitHub = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
  </svg>
);

export function ServiceIcon({
  name,
  className,
}: {
  name: "app" | "web" | "cloud" | "ai" | "pipeline" | "audit" | "extension" | "server";
  className?: string;
}) {
  const common = { className, viewBox: "0 0 24 24", strokeWidth: 1.8, ...base };
  switch (name) {
    case "app":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 14l-2 2 2 2M16 14l2 2-2 2" />
        </svg>
      );
    case "web":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M7 18a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7z" />
          <path d="M12 12v4M10 14h4" />
        </svg>
      );
    case "ai":
      return (
        <svg {...common}>
          <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
          <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" />
        </svg>
      );
    case "pipeline":
      return (
        <svg {...common}>
          <circle cx="5" cy="12" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M7 12h4l6-6M11 12l6 6" />
        </svg>
      );
    case "extension":
      return (
        <svg {...common}>
          <path d="M10 4.5a2 2 0 1 1 4 0V6h4a1 1 0 0 1 1 1v4h-1.5a2 2 0 1 0 0 4H19v4a1 1 0 0 1-1 1h-4v-1.5a2 2 0 1 0-4 0V20H6a1 1 0 0 1-1-1v-4h1.5a2 2 0 1 0 0-4H5V7a1 1 0 0 1 1-1h4V4.5z" />
        </svg>
      );
    case "server":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="6" rx="1.5" />
          <rect x="3" y="14" width="18" height="6" rx="1.5" />
          <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
        </svg>
      );
    case "audit":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5M8 11l2 2 4-4" />
        </svg>
      );
  }
}
export const Code = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}>
    <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
  </svg>
);
export const ImageIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="9" cy="9" r="2" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);
export const Megaphone = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}>
    <path d="M3 11v3a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z" />
    <path d="M7 15l1.5 5h2.5L10 16.5M17 9.5a3.5 3.5 0 0 1 0 5M19.5 7a7 7 0 0 1 0 10" />
  </svg>
);
export const CloudIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}>
    <path d="M7 18a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9H7z" />
  </svg>
);
/** Infinity loop: the usual DevOps (build → release → operate) mark. */
export const Loop = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}>
    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4z" />
  </svg>
);
export const WhatsApp = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.28l5.68-1.49a11.3 11.3 0 0 0 5.77 1.47h.01c6.25 0 11.34-5.09 11.35-11.34 0-3.03-1.18-5.88-3.33-8.03z" />
  </svg>
);
