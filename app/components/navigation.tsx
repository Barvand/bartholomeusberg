"use client";
import Link from "next/link";
import { useState } from "react";
const links = [
  ["Tjenester", "/tjenester"],
  ["Tilbud", "/#offer"],
  ["Referanser", "/#projects"],
  ["Om meg", "/#about"],
  ["Kontakt", "/#contact"],
] as const;
export default function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex h-16 items-center justify-between border-b border-white/15 bg-fjord-950/90 px-5 text-white backdrop-blur-xl md:h-[76px] md:px-[max(1.5rem,calc((100vw-1140px)/2))]">
      <Link
        href="/"
        className="site-logo"
      >
        <img
          src="/BartBergLogo.svg"
          alt="Bart Berg"
          className="site-logo__mark"
        />
        <span className="site-logo__tagline">Nettsider · PC &amp; IT</span>
      </Link>
      <button
        className="border-0 bg-transparent text-sm font-medium text-white md:hidden"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="primary-nav"
      >
        Meny
      </button>
      <nav
        id="primary-nav"
        className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-16 flex-col border-b border-white/15 bg-fjord-950 px-5 pb-5 pt-3 md:static md:flex md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0`}
      >
        {links.map(([label, href]) => (
          <Link
            className="relative py-2 text-sm text-fjord-100 transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-fjord-200 after:transition-transform after:duration-200 hover:after:scale-x-100 md:p-0"
            onClick={() => setOpen(false)}
            href={href}
            key={href}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
