import { Resend } from "resend";
import { site, topics, budgets } from "@/content/site";

export type ContactField = "name" | "email" | "message";

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  topic: string;
  budget: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; errors: Partial<Record<ContactField, string>> }
  | { ok: false; reason: "rate_limited" | "not_configured" | "send_failed" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Normalises raw form/JSON values. Unknown topics/budgets are dropped rather than trusted. */
export function parseContact(raw: Record<string, unknown>): ContactInput {
  const str = (k: string, max: number) => String(raw[k] ?? "").trim().slice(0, max);
  const topic = str("topic", 60);
  const budget = str("budget", 60);
  return {
    name: str("name", 120),
    email: str("email", 200),
    message: str("message", 5000),
    topic: (topics as string[]).includes(topic) ? topic : "",
    budget: budgets.includes(budget) ? budget : "",
  };
}

export function validateContact(input: ContactInput) {
  const errors: Partial<Record<ContactField, string>> = {};
  if (!input.name) errors.name = "Please add your name.";
  if (!EMAIL.test(input.email)) errors.email = "Please add a valid email.";
  if (input.message.length < 10) errors.message = "A sentence or two about the project, please.";
  return errors;
}

// Best-effort in-memory limiter: 5 submissions per IP per 10 minutes. On serverless each
// instance has its own map, so this slows down abuse rather than strictly preventing it.
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_HITS;
}

export function clientIp(h: Headers) {
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function contactSubject({ name, topic }: ContactInput) {
  return `New enquiry from ${name}${topic ? ` · ${topic}` : ""}`;
}

export function contactText({ name, email, topic, budget, message }: ContactInput) {
  const meta = [`Name: ${name}`, `Email: ${email}`, topic && `Topic: ${topic}`, budget && `Budget: ${budget}`].filter(Boolean);
  return [...meta, "", message].join("\n");
}

function contactHtml({ name, email, topic, budget, message }: ContactInput) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6a64;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;font-size:15px;color:#1b1b19">${value}</td></tr>`
      : "";
  return `<!doctype html><html><body style="margin:0;background:#f4f1ea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
  <div style="background:#fff;border-radius:16px;padding:28px;border-top:3px solid #c22e22">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#c22e22">New enquiry · ${escape(site.domain)}</p>
    <h1 style="margin:0 0 20px;font-size:22px;color:#1b1b19">${escape(name)}</h1>
    <table style="border-collapse:collapse;margin-bottom:20px">
      ${row("Email", `<a href="mailto:${escape(email)}" style="color:#c22e22">${escape(email)}</a>`)}
      ${row("Topic", escape(topic))}
      ${row("Budget", escape(budget))}
    </table>
    <div style="font-size:15px;line-height:1.6;color:#1b1b19;white-space:pre-wrap;border-top:1px solid #eee;padding-top:20px">${escape(message)}</div>
  </div>
  <p style="text-align:center;font-size:12px;color:#8a887f;margin-top:16px">Reply to this email to respond directly to ${escape(name)}.</p>
</div></body></html>`;
}


export async function deliverContact(input: ContactInput, ip: string): Promise<ContactResult> {
  const errors = validateContact(input);
  if (Object.keys(errors).length) return { ok: false, reason: "invalid", errors };
  if (rateLimited(ip)) return { ok: false, reason: "rate_limited" };

  const key = process.env.NEXT_PUBLIC_RESEND_API_KEY;
  if (!key) return { ok: false, reason: "not_configured" };

  try {
    const { error } = await new Resend(key).emails.send({
      from: process.env.NEXT_PUBLIC_CONTACT_FROM_EMAIL || `${site.domain} <${site.email}>`,
      to: [process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL || site.email],
      replyTo: input.email,
      subject: contactSubject(input),
      text: contactText(input),
      html: contactHtml(input),
    });
    if (error) throw error;
    return { ok: true };
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return { ok: false, reason: "send_failed" };
  }
}