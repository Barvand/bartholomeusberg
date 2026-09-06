import Link from "next/link";

const services = [
  {
    title: "Nettsider og utvikling",
    description:
      "Bedriftsnettsider, webapplikasjoner, SEO og Google-optimalisering, publisering og vedlikehold.",
    href: "/tjenester/nettsider",
  },
  {
    title: "PC & IT for privatpersoner",
    description:
      "Hjelp med PC, programvare, oppgraderinger, dataflytting, backup og enkel Wi-Fi-hjelp hjemme.",
    href: "/tjenester/pc-it",
  },
  {
    title: "IT for små bedrifter",
    description:
      "PC-er og brukere, e-post og Microsoft 365, programvare, arbeidsstasjoner og generell IT-hjelp.",
    href: "/tjenester/bedrifts-it",
  },
];

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
          hjelper med nettsider, PC-problemer og praktiske IT-løsninger for
          privatpersoner og små bedrifter.
        </p>
        <div className="service-editorial-list home-service-list">
          {services.map((service) => (
            <article className="service-editorial-row" key={service.title}>
              <span className="editorial-mark" aria-hidden="true" />
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link href={service.href}>
                  Les mer <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <Link className="button home-services-cta" href="/tjenester">
          Se alle tjenester <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
