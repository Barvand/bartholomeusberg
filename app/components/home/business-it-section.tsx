import Link from "next/link";
import { Reveal } from "../animation/reveal";

export default function BusinessItSection() {
  return (
    <section className="business-it-section">
      <div className="page-container business-it-layout">
        <Reveal>
          <p className="eyebrow">IT for små bedrifter</p>
          <h2 className="section-heading service-dark-heading">
            IT-hjelp uten en <em>egen IT-avdeling.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>
            PC-er, e-post, nettverk, backup, lagring og nettsider. Én person å
            kontakte når noe skal settes opp, forbedres eller bare fungere igjen.
          </p>
          <p className="direct-line">Du snakker med personen som faktisk gjør jobben.</p>
          <Link className="text-link" href="/tjenester/bedrifts-it">
            Les om bedrifts-IT <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
