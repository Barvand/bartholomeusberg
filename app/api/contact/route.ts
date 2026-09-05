import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  if (
    ![body.name, body.email, body.subject, body.textArea].every(
      (value) => typeof value === "string" && value.trim(),
    )
  )
    return NextResponse.json(
      { error: "Alle feltene må fylles ut." },
      { status: 400 },
    );
  if (!/^\S+@\S+\.\S+$/.test(body.email))
    return NextResponse.json(
      { error: "Skriv inn en gyldig e-postadresse." },
      { status: 400 },
    );
  if (typeof body.turnstileToken !== "string" || !body.turnstileToken)
    return NextResponse.json(
      { error: "Fullfør botbeskyttelsen før du sender skjemaet." },
      { status: 400 },
    );

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret)
    return NextResponse.json(
      { error: "Botbeskyttelsen er ikke konfigurert." },
      { status: 503 },
    );

  try {
    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: turnstileSecret, response: body.turnstileToken }),
      },
    );
    const verificationResult = await verification.json();
    if (!verificationResult.success || verificationResult.action !== "contact_form")
      return NextResponse.json(
        { error: "Botbeskyttelsen kunne ikke bekreftes." },
        { status: 400 },
      );

    const response = await fetch(
      "https://email-backend-d5o0.onrender.com/send-email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) throw new Error("E-posttjenesten avviste forespørselen");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Kunne ikke sende meldingen." },
      { status: 502 },
    );
  }
}
