import Link from "next/link";
import { ServiceCards } from "../service-cards";

export default function ServicesSection() {
  return (
    <section id="services" className="services-section">
      <div className="page-container">
        <p className="eyebrow eyebrow-light">Dette kan jeg hjelpe med</p>
        <h2 className="section-heading">
          Det viktigste først.
          <br />
          <em>Ingen teknisk tåkeprat.</em>
        </h2>
        <p className="section-intro">
          Teknologi skal gjøre hverdagen enklere, ikke mer komplisert. Jeg
          hjelper med alt fra nettsider og PC-problemer til IT-løsninger for
          alle.
        </p>
        <ServiceCards />
        <Link className="section-link" href="/tjenester">
          Se alle tjenester <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
