import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  if (
    ![body.name, body.email, body.subject, body.textArea].every(
      (value) => typeof value === "string" && value.trim(),
    )
  )
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 },
    );
  if (!/^\S+@\S+\.\S+$/.test(body.email))
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  try {
    const response = await fetch(
      "https://email-backend-d5o0.onrender.com/send-email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) throw new Error("Mail service rejected request");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send message." },
      { status: 502 },
    );
  }
}
