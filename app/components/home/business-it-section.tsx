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
          <p className="mb-5">
            PC-er, e-post, programvare, brukeroppsett og nettsider. Én person å
            kontakte når noe skal settes opp, forbedres eller bare fungere
            igjen.
          </p>
          <Link
            className="text-fjord-100 bg-fjord-600 p-3"
            href="/tjenester/bedrifts-it"
          >
            Les om bedrifts-IT <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
