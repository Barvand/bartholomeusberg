"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { AccentLine, Reveal } from "./animation/reveal";

const facts = [
  ["Fullstack", "Webapplikasjon"],
  ["Bruk", "Mobil + PC"],
  ["Fokus", "Timeregistrering og prosjektstyring"],
];

export default function TotalTimingShowcase() {
  const section = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const visualY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [12, -12],
  );

  return (
    <section ref={section} className="total-timing-feature">
      <div className="total-timing-layout">
        <Reveal className="total-timing-copy">
          <p className="reference-number">Utvalgt prosjekt · 2026</p>
          <AccentLine className="mt-4 max-w-24" />
          <h3>TotalTiming</h3>
          <div className="total-timing-story">
            <div>
              <p>Utfordring</p>
              <span>
                Timer, prosjekter, bilder og fravær måtte håndteres på en mer
                samlet og oversiktlig måte.
              </span>
            </div>
            <div>
              <p>Løsning</p>
              <span>
                En webapplikasjon for ansatte og administrasjon med
                timeregistrering, prosjektstyring og et grensesnitt tilpasset
                både mobil og PC.
              </span>
            </div>
          </div>
          <div className="total-timing-tags">
            {["Timeregistrering", "Prosjektstyring", "Internt system"].map(
              (tag) => (
                <span key={tag}>{tag}</span>
              ),
            )}
          </div>
          <Link className="project-arrow-link" href="/prosjekter/total-timing">
            Les caset <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <Reveal delay={0.08} className="total-timing-visual">
          <motion.div style={{ y: visualY }} className="total-timing-image">
            <Image
              src="/showcase-totaltiming.svg"
              alt="TotalTiming tilpasset mobil og PC"
              width={1219}
              height={858}
              priority
              className="h-auto w-full"
            />
          </motion.div>
        </Reveal>
      </div>
      <div className="total-timing-facts">
        {facts.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
