import { clientIp, deliverContact, parseContact } from "@/lib/contact";

/**
 * POST /api/contact
 * Body (JSON): { name, email, message, topic?, budget?, company? }
 * `company` is a honeypot — real visitors leave it empty.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const json = await request.json();
    if (!json || typeof json !== "object" || Array.isArray(json)) throw new Error("Body must be an object");
    body = json;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (String(body.company ?? "").trim()) return Response.json({ ok: true });

  const result = await deliverContact(parseContact(body), clientIp(request.headers));
  if (result.ok) return Response.json({ ok: true });

  switch (result.reason) {
    case "invalid":
      return Response.json({ ok: false, error: "Validation failed.", errors: result.errors }, { status: 422 });
    case "rate_limited":
      return Response.json({ ok: false, error: "Too many messages. Please try again later." }, { status: 429 });
    case "not_configured":
      return Response.json({ ok: false, error: "Email delivery is not configured." }, { status: 503 });
    default:
      return Response.json({ ok: false, error: "Could not send your message." }, { status: 502 });
  }
}
