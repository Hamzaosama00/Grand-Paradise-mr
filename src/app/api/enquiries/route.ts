import { NextRequest, NextResponse } from "next/server";
import { enquirySchema, type EnquiryData } from "@/lib/validation";
import { db } from "@/lib/db";
import { waLink } from "@/lib/site-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fieldErrors(zodError: { issues: { path: (string | number | symbol)[]; message: string }[] }) {
  const errors: Record<string, string> = {};
  for (const issue of zodError.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

/** Pre-filled WhatsApp message containing the full enquiry details. */
function whatsappFallbackLink(data: EnquiryData): string {
  return waLink(
    `Hi! New event enquiry from your website:\n\n` +
      `Name: ${data.name}\n` +
      `Phone: ${data.phone}\n` +
      `Event: ${data.eventType}\n` +
      `Guests: ${data.guests}\n` +
      `Preferred date: ${data.eventDate}` +
      (data.altDate ? `\nAlternate date: ${data.altDate}` : "") +
      (data.message ? `\nNotes: ${data.message}` : "")
  );
}

/**
 * Optional outbound webhook (ENQUIRY_WEBHOOK_URL) — delivers every enquiry as
 * JSON to services like Zapier / Make / n8n so leads can land in Google
 * Sheets, a CRM, email, etc. Never throws; returns success flag only.
 */
async function forwardToWebhook(payload: Record<string, unknown>): Promise<boolean> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5_000),
    });
    return res.ok;
  } catch (error) {
    console.error("[/api/enquiries] Webhook delivery failed:", error);
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request. Please try again." },
      { status: 400 }
    );
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please review the highlighted fields and try again.",
        errors: fieldErrors(parsed.error),
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // 1) Persist to the database (works locally / self-hosted).
  try {
    const enquiry = await db.enquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        eventType: data.eventType,
        guests: data.guests,
        eventDate: data.eventDate,
        altDate: data.altDate ? data.altDate : null,
        message: data.message ? data.message : null,
        source: "website",
        status: "NEW",
      },
    });

    // Fire-and-forget webhook so external tools stay in sync (never blocks).
    void forwardToWebhook({ ...data, id: enquiry.id, status: "NEW", source: "website" });

    return NextResponse.json(
      { ok: true, stored: true, id: enquiry.id },
      { status: 201 }
    );
  } catch (error) {
    // 2) Database unavailable (e.g. serverless hosting like Vercel where the
    //    filesystem is read-only/ephemeral). Fall back so the lead still
    //    reaches the venue: deliver to the webhook if configured and return a
    //    pre-filled WhatsApp link the visitor can tap to send the enquiry.
    console.error("[/api/enquiries] Database unavailable, using fallback:", error);

    const delivered = await forwardToWebhook({ ...data, status: "NEW", source: "website" });

    return NextResponse.json(
      {
        ok: true,
        stored: false,
        deliveredViaWebhook: delivered,
        waLink: whatsappFallbackLink(data),
      },
      { status: 200 }
    );
  }
}
