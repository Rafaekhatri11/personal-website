"use server";

import { headers } from "next/headers";
import { site } from "@/content/site";
import { clientIp, contactSubject, contactText, deliverContact, parseContact, type ContactField } from "@/lib/contact";

export type ContactState = {
  status: "idle" | "ok" | "error" | "fallback";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** When email sending isn't configured, the client opens this mailto: link instead. */
  mailto?: string;
};

const THANKS = "Thanks! Your message is on its way. I’ll reply within 24 hours.";

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill every field.
  if (String(formData.get("company") ?? "").trim()) return { status: "ok", message: THANKS };

  const input = parseContact(Object.fromEntries(formData));
  const result = await deliverContact(input, clientIp(await headers()));
  if (result.ok) return { status: "ok", message: THANKS };

  switch (result.reason) {
    case "invalid":
      return { status: "error", errors: result.errors, message: "Please check the highlighted fields." };
    case "rate_limited":
      return { status: "error", message: `You’ve sent a few messages already. Please try again later or email ${site.email}.` };
    case "not_configured": {
      const mailto = `mailto:${site.email}?subject=${encodeURIComponent(contactSubject(input))}&body=${encodeURIComponent(contactText(input))}`;
      return { status: "fallback", mailto, message: "Opening your email app to send this…" };
    }
    default:
      return { status: "error", message: `Something went wrong. Please email me directly at ${site.email}.` };
  }
}
