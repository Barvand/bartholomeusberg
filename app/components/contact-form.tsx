"use client";
import { FormEvent, useState } from "react";

const fieldStyle = "w-full rounded border border-white/20 bg-fjord-900 px-3 py-3 text-white outline-none transition focus:border-fjord-200 focus:ring-2 focus:ring-fjord-200/30";
const labelStyle = "grid gap-2 text-xs tracking-[0.05em] text-fjord-100";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); const form = event.currentTarget;
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    if (response.ok) { form.reset(); setStatus("success"); } else setStatus("error");
  }
  return <div className="mx-auto max-w-[760px]">
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-fjord-200">Get in touch</p>
    <h2 className="mb-5 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl">Let&apos;s build something <em className="not-italic text-fjord-200">together.</em></h2>
    <p className="max-w-[640px] text-[1.06rem] leading-7 text-fjord-100/75">Tell me a little about your project and I&apos;ll get back to you within a day.</p>
    <form className="mt-10 grid gap-4" onSubmit={submit}>
      <div className="grid gap-4 md:grid-cols-2"><label className={labelStyle}>Name<input className={fieldStyle} required name="name" autoComplete="name" /></label><label className={labelStyle}>Email<input className={fieldStyle} required name="email" type="email" autoComplete="email" /></label></div>
      <label className={labelStyle}>Subject<input className={fieldStyle} required name="subject" /></label>
      <label className={labelStyle}>Message<textarea className={`${fieldStyle} resize-y`} required name="textArea" rows={6} maxLength={1000} /></label>
      <button className="inline-flex w-fit items-center justify-center rounded bg-fjord-200 px-5 py-3 text-sm font-bold text-fjord-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
      {status === "success" && <p className="m-0 text-emerald-300">Thanks — I&apos;ll be in touch soon.</p>}
      {status === "error" && <p className="m-0 text-red-300">Unable to send your message. Please try again or email directly.</p>}
    </form>
  </div>;
}
