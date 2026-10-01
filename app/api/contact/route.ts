import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import {
  contactLimits,
  contactSubject,
  contactSummary,
  validateContact,
  type ContactPayload,
} from "@/lib/contact";

/**
 * Fallback contact endpoint, used only when site.web3formsKey is empty (the
 * form normally posts straight to Web3Forms). Delivers by e-mail through Resend
 * (https://resend.com). Configure with environment variables:
 *   RESEND_API_KEY      — required, otherwise the endpoint answers 503 and the
 *                         form offers a mailto fallback instead
 *   CONTACT_TO_EMAIL    — recipient (default: site.email)
 *   CONTACT_FROM_EMAIL  — sender on a domain verified in Resend
 *                         (default: "Zagroda.io <formularz@zagroda.io>")
 */

type Body = Record<string, unknown>;

function field(body: Body, key: keyof typeof contactLimits, multiline = false) {
  const v = body[key];
  if (typeof v !== "string") return "";
  const t = v.trim().slice(0, contactLimits[key]);
  // single-line fields end up in the subject — no line breaks there
  return multiline ? t : t.replace(/\s+/g, " ");
}

const reply = (status: number, error?: string) =>
  NextResponse.json(error ? { ok: false, error } : { ok: true }, { status });

export async function POST(req: Request) {
  let body: Body;
  try {
    const json: unknown = await req.json();
    if (!json || typeof json !== "object") return reply(400, "invalid");
    body = json as Body;
  } catch {
    return reply(400, "invalid");
  }

  // Honeypot: bots fill every field. Pretend success, deliver nothing.
  if (typeof body.website === "string" && body.website.trim()) {
    return reply(200);
  }

  const p: ContactPayload = {
    name: field(body, "name"),
    email: field(body, "email"),
    phone: field(body, "phone"),
    farm: field(body, "farm"),
    herd: field(body, "herd"),
    topic: field(body, "topic"),
    message: field(body, "message", true),
    consent: body.consent === true,
  };

  if (Object.keys(validateContact(p)).length > 0) {
    return reply(400, "invalid");
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — submission not delivered",
    );
    return reply(503, "not_configured");
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ??
          `Zagroda.io <formularz@${site.domain}>`,
        to: [process.env.CONTACT_TO_EMAIL ?? site.email],
        reply_to: p.email || undefined,
        subject: contactSubject(p),
        text: contactSummary(p),
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return reply(502, "send_failed");
    }
  } catch (err) {
    console.error("[contact] Resend request failed", err);
    return reply(502, "send_failed");
  }

  return reply(200);
}
