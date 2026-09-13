import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { getWriteClient, isWriteConfigured } from "@/sanity/lib/write-client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(payload.company, 120)) {
    return NextResponse.json({ received: true }, { status: 201 });
  }

  const websiteInput = clean(payload.website, 240);
  const website = /^https?:\/\//i.test(websiteInput) ? websiteInput : `https://${websiteInput}`;
  const industry = clean(payload.industry, 160);
  const market = clean(payload.market, 200);
  const questions = clean(payload.questions, 2000)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5);
  const objective = clean(payload.objective, 2000);
  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const competitors = Array.isArray(payload.competitors)
    ? payload.competitors.map((item) => clean(item, 200)).filter(Boolean).slice(0, 3)
    : [];

  let validWebsite = false;
  try {
    const parsedWebsite = new URL(website);
    validWebsite = Boolean(parsedWebsite.hostname.includes("."));
  } catch {
    validWebsite = false;
  }

  if (!validWebsite || !industry || !market || !questions.length || !objective || !name || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Complete the required audit fields and use a valid email address." }, { status: 400 });
  }

  if (!isWriteConfigured()) {
    return NextResponse.json({ error: "The audit service is temporarily unavailable. Please email connect@gaioengine.com." }, { status: 503 });
  }

  const client = getWriteClient();
  if (!client) {
    return NextResponse.json({ error: "The audit service is temporarily unavailable. Please email connect@gaioengine.com." }, { status: 503 });
  }

  const submittedAt = new Date().toISOString();
  const id = `assessment-${createHash("sha256").update(`${email}:${website}:${submittedAt}`).digest("hex")}`;

  try {
    await client.create({
      _id: id,
      _type: "assessmentLead",
      website,
      industry,
      market,
      competitors,
      questions,
      objective,
      name,
      email,
      status: "new",
      submittedAt,
    });
  } catch {
    return NextResponse.json(
      { error: "We could not record the audit request. Please email connect@gaioengine.com." },
      { status: 503 },
    );
  }

  return NextResponse.json({ received: true }, { status: 201 });
}
