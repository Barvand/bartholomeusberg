import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // 1. Validate request body
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ugyldig forespørsel." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Ugyldig forespørsel." },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;

  const fields = [data.name, data.email, data.subject, data.textArea];

  if (
    !fields.every(
      (value) => typeof value === "string" && value.trim().length > 0,
    )
  ) {
    return NextResponse.json(
      { error: "Alle feltene må fylles ut." },
      { status: 400 },
    );
  }

  const name = (data.name as string).trim();
  const email = (data.email as string).trim();
  const subject = (data.subject as string).trim();
  const message = (data.textArea as string).trim();

  if (!emailRegex.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Skriv inn en gyldig e-postadresse." },
      { status: 400 },
    );
  }

  if (name.length > 100 || subject.length > 100 || message.length > 2000) {
    return NextResponse.json(
      { error: "Ett eller flere felt er for lange." },
      { status: 400 },
    );
  }

  if (typeof data.turnstileToken !== "string" || !data.turnstileToken) {
    return NextResponse.json(
      { error: "Fullfør botbeskyttelsen før du sender skjemaet." },
      { status: 400 },
    );
  }

  // 2. Check environment variables
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_EMAIL } =
    process.env;

  if (
    !turnstileSecret ||
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_PASSWORD ||
    !CONTACT_EMAIL
  ) {
    console.error("Missing contact form configuration");

    return NextResponse.json(
      { error: "Skjemaet er midlertidig utilgjengelig." },
      { status: 503 },
    );
  }

  try {
    // 3. Verify Cloudflare Turnstile
    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: data.turnstileToken,
        }),
        signal: AbortSignal.timeout(10000),
      },
    );

    if (!verification.ok) {
      throw new Error("Turnstile service unavailable");
    }

    const result = await verification.json();

    if (!result.success || result.action !== "contact_form") {
      return NextResponse.json(
        { error: "Botbeskyttelsen kunne ikke bekreftes." },
        { status: 400 },
      );
    }

    // 4. Create SMTP transport
    const port = Number(SMTP_PORT);

    if (![465, 587].includes(port)) {
      throw new Error("Invalid SMTP port");
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    // 5. Send email through one.com
    await transporter.sendMail({
      from: SMTP_USER,
      to: CONTACT_EMAIL,
      replyTo: {
        name,
        address: email,
      },
      subject: `[Portfolio] ${subject}`,
      text: `Ny melding fra kontaktskjemaet

Navn: ${name}
E-post: ${email}
Emne: ${subject}

Melding:
${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      "Contact form error:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return NextResponse.json(
      { error: "Kunne ikke sende meldingen." },
      { status: 502 },
    );
  }
}
