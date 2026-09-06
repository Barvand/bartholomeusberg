"use client";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}
const fieldStyle =
  "w-full rounded border border-white/20 bg-fjord-900 px-3 py-3 text-white outline-none transition focus:border-fjord-200 focus:ring-2 focus:ring-fjord-200/30";
const labelStyle = "grid gap-2 text-xs tracking-[0.05em] text-fjord-100";
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  function renderTurnstile() {
    if (!siteKey || !window.turnstile || !container.current || widget.current)
      return;
    widget.current = window.turnstile.render(container.current, {
      sitekey: siteKey,
      theme: "dark",
      size: "flexible",
      action: "contact_form",
      callback: (value: string) => setToken(value),
      "expired-callback": () => setToken(null),
      "error-callback": () => setToken(null),
    });
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    const form = event.currentTarget;
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...Object.fromEntries(new FormData(form)),
        turnstileToken: token,
      }),
    });
    if (response.ok) {
      form.reset();
      router.push("/takk");
    } else setStatus("error");
    setToken(null);
    window.turnstile?.reset(widget.current);
  }
  return (
    <div className="mx-auto max-w-[760px]">
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={renderTurnstile}
        />
      )}
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-fjord-200">
        Ta kontakt
      </p>
      <h2 className="mb-5 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl">
        Hva trenger du <em className="not-italic text-fjord-200">hjelp med?</em>
      </h2>
      <p className="max-w-[640px] text-[1.06rem] leading-7 text-fjord-100/75">
        Fortell kort hva det gjelder. Jeg svarer normalt innen én arbeidsdag.
      </p>
      <form className="mt-10 grid gap-4" onSubmit={submit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className={labelStyle}>
            Navn
            <input
              className={fieldStyle}
              required
              name="name"
              autoComplete="name"
            />
          </label>
          <label className={labelStyle}>
            E-post
            <input
              className={fieldStyle}
              required
              name="email"
              type="email"
              autoComplete="email"
            />
          </label>
        </div>
        <label className={labelStyle}>
          Hva gjelder det?
          <input className={fieldStyle} required name="subject" />
        </label>
        <label className={labelStyle}>
          Fortell litt om hva du trenger
          <textarea
            className={`${fieldStyle} resize-y`}
            required
            name="textArea"
            rows={6}
            maxLength={1000}
          />
        </label>
        {siteKey ? (
          <div ref={container} aria-label="Botbeskyttelse" />
        ) : (
          <p className="text-sm text-amber-200">
            Skjemaet er midlertidig utilgjengelig. Prøv igjen senere.
          </p>
        )}
        <button
          className="inline-flex w-fit items-center justify-center rounded bg-fjord-200 px-5 py-3 text-sm font-bold text-fjord-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          disabled={status === "sending" || !token}
        >
          {status === "sending" ? "Sender…" : "Send forespørsel"}
        </button>
        {status === "success" && (
          <p className="m-0 text-emerald-300">Takk! Jeg tar kontakt så snart jeg kan.</p>
        )}
        {status === "error" && (
          <p className="m-0 text-red-300">
            Fullfør botbeskyttelsen og prøv igjen. Hvis feilen fortsetter, ta
            kontakt direkte.
          </p>
        )}
      </form>
    </div>
  );
}
