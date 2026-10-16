"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const links = [
  ["Tjenester", "/tjenester"],
  ["Tilbud", "/#offer"],
  ["Referanser", "/#projects"],
  ["Om meg", "/#about"],
] as const;

type Tone = "light" | "dark";

// Resolves any CSS colour (rgb, hex, oklch, …) to RGBA through a 1×1 canvas.
function toRgba(color: string, context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, 1, 1);
  context.fillStyle = color;
  context.fillRect(0, 0, 1, 1);
  return context.getImageData(0, 0, 1, 1).data;
}

// Images and mockups are content, not surfaces; the header should follow the
// section they sit on (e.g. the hero mockup that overlaps the dark chapter).
function isMedia(element: Element) {
  return (
    element.matches("img, picture, video, svg, canvas") ||
    element.closest("figure") !== null
  );
}

// Finds the topmost opaque section background under the header's centre line.
// elementsFromPoint lists everything at that point in paint order, top first.
function backgroundBehind(header: HTMLElement, context: CanvasRenderingContext2D) {
  const stack = document.elementsFromPoint(
    window.innerWidth / 2,
    header.offsetHeight / 2,
  );
  for (const element of stack) {
    if (header.contains(element) || isMedia(element)) continue;
    const color = getComputedStyle(element).backgroundColor;
    const [r, g, b, a] = toRgba(color, context);
    if (a > 200) {
      // Relative luminance, so text flips to white over dark backgrounds.
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      return { color, tone: (luminance < 0.5 ? "dark" : "light") as Tone };
    }
  }
  return null;
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [surface, setSurface] = useState<{ color: string; tone: Tone } | null>(null);
  // Colour changes animate only after the first match, so dark pages don't flash.
  const [ready, setReady] = useState(false);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  // Match the header to whatever section is scrolling underneath it.
  useEffect(() => {
    const context = document
      .createElement("canvas")
      .getContext("2d", { willReadFrequently: true });
    if (!context) return;
    let frame = 0;
    function sample() {
      frame = 0;
      if (!header.current) return;
      const next = backgroundBehind(header.current, context!);
      if (next) {
        setSurface((current) =>
          current?.color === next.color && current.tone === next.tone ? current : next,
        );
      }
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(sample);
    }
    sample();
    const settle = requestAnimationFrame(() => setReady(true));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <header
      ref={header}
      className="site-header"
      data-tone={surface?.tone}
      data-ready={ready || undefined}
      style={surface ? ({ "--nav-bg": surface.color } as React.CSSProperties) : undefined}
    >
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-logo"
          aria-label="Bartholomeus Berg, forsiden"
        >
          <span className="site-logo__name">Bartholomeus Berg</span>
          <span className="site-logo__divider" aria-hidden="true" />
          <span className="site-logo__tagline">
            Nettsider · programvare · IT
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={
            open ? "Lukk navigasjonsmenyen" : "Åpne navigasjonsmenyen"
          }
        >
          <span aria-hidden="true">{open ? "Lukk" : "Meny"}</span>
        </button>
        <nav
          id="primary-nav"
          className={`primary-nav${open ? " is-open" : ""}`}
          aria-label="Hovedmeny"
        >
          <div className="primary-nav__links">
            {links.map(([label, href]) => (
              <Link
                className="primary-nav__link"
                onClick={() => setOpen(false)}
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </div>
          <Link
            className="primary-nav__contact"
            onClick={() => setOpen(false)}
            href="/#contact"
          >
            Ta kontakt
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
