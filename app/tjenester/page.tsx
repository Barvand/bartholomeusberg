import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "../components/navigation";

export const metadata: Metadata = {
  title: "Tjenester i Arna og Bergen",
  description:
    "Nettsider, PC-hjelp og praktisk IT-hjelp for små bedrifter og privatpersoner i Arna og Bergen.",
  alternates: { canonical: "/tjenester" },
  openGraph: {
    title: "Tjenester i Arna og Bergen | Bartholomeus Berg",
    description:
      "Nettsider, PC-hjelp og praktisk IT-hjelp for små bedrifter og privatpersoner i Arna og Bergen.",
    url: "/tjenester",
  },
  twitter: {
    title: "Tjenester i Arna og Bergen | Bartholomeus Berg",
    description:
      "Nettsider, PC-hjelp og praktisk IT-hjelp for små bedrifter og privatpersoner i Arna og Bergen.",
  },
};

const websiteServices = [
  {
    title: "Bedriftsnettsider og landingssider",
    description:
      "Tydelige nettsider som forklarer hva dere tilbyr og gjør det enkelt å ta kontakt.",
  },
  {
    title: "Webapplikasjoner og interne systemer",
    description:
      "Enkle digitale verktøy for oppgaver, oversikter, timeregistrering og arbeid i hverdagen.",
  },
  {
    title: "SEO og Google-optimalisering",
    description:
      "Grunnleggende teknisk SEO og et godt utgangspunkt for å bli funnet i Google.",
  },
  {
    title: "Publisering, hosting og vedlikehold",
    description:
      "Hjelp med å få siden på nett og holde den oppdatert over tid.",
  },
];

const itServices = [
  {
    title: "PC & IT for privatpersoner",
    description:
      "PC- og laptophjelp, oppgraderinger, Windows og programvare, dataflytting, backup, ny PC og enkel Wi-Fi-hjelp hjemme.",
    href: "/tjenester/pc-it",
  },
  {
    title: "IT for små bedrifter",
    description:
      "Oppsett av PC-er og brukere, e-post og Microsoft 365, programvare, arbeidsstasjoner og generell IT-hjelp.",
    href: "/tjenester/bedrifts-it",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="service-page">
        <header className="service-page-hero">
          <div className="page-container">
            <p className="eyebrow eyebrow-light">
              IT · NETTSIDER · ARNA · BERGEN
            </p>
            <h1 className="section-heading">
              Tjenester som <em>gjør jobben.</em>
            </h1>
            <p className="section-intro">
              Nettsider, utvikling og praktisk IT-hjelp for privatpersoner og
              små bedrifter i Arna og Bergen.
            </p>
          </div>
        </header>
        <section className="service-overview service-overview-web">
          <div className="page-container">
            <p className="eyebrow">Nettsider og utvikling</p>
            <h2 className="section-heading service-dark-heading">
              Det digitale, <em>gjort ordentlig.</em>
            </h2>
            <p className="service-overview-intro">
              Fra den første nettsiden til interne verktøy som gjør arbeidsdagen
              enklere.
            </p>
            <div className="service-editorial-list">
              {websiteServices.map((service) => (
                <article className="service-editorial-row" key={service.title}>
                  <span className="editorial-mark" aria-hidden="true" />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <Link className="service-overview-link" href="/tjenester/nettsider">
              Les mer om nettsider <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
        <section className="service-overview service-overview-it">
          <div className="page-container">
            <p className="eyebrow eyebrow-light">PC og IT</p>
            <h2 className="section-heading">
              Praktisk hjelp <em>når du trenger det.</em>
            </h2>
            <p className="service-overview-intro">
              Ingen supportkø eller unødvendig teknisk språk. Bare hjelp med
              det som faktisk skal fungere.
            </p>
            <div className="service-editorial-list">
              {itServices.map((service) => (
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
          </div>
        </section>
        <section className="service-cta">
          <div className="page-container service-cta-layout">
            <div>
              <p className="eyebrow eyebrow-light">Direkte kontakt</p>
              <h2 className="section-heading">
                Ingen supportkø. <em>Bare direkte hjelp.</em>
              </h2>
            </div>
            <Link className="button service-cta-button" href="/#contact">
              Ta kontakt
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
