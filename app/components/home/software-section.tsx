import Link from "next/link";
import { Reveal } from "../animation/reveal";

export default function SoftwareSection() {
  return (
    <section className="software-section">
      <div className="page-container software-layout">
        <Reveal>
          <p className="eyebrow eyebrow-light">Skreddersydd utvikling</p>
          <h2 className="section-heading">Har bedriften vokst <em>fra Excel?</em></h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="section-intro">
            Jeg kan bygge enkle interne systemer rundt måten bedriften faktisk
            jobber på – fra timeregistrering og prosjektoversikt til oppgavestyring
            og dokumentorganisering.
          </p>
          <ul className="software-list">
            <li>Timeregistrering og prosjektoversikt</li>
            <li>Interne dashboards og administrative verktøy</li>
            <li>Oppgaver, bilder og dokumenter på ett sted</li>
          </ul>
          <Link className="text-link light-link" href="/tjenester/nettsider">
            Les om digitale løsninger <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
