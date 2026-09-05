import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "../components/navigation";
import { ServiceCards } from "../components/service-cards";

export const metadata: Metadata = {
  title: "Tjenester",
  description:
    "IT-hjelp, PC-hjelp, nettsider og praktiske sikkerhetstiltak for små bedrifter og privatpersoner i Bergen.",
  alternates: { canonical: "/tjenester" },
};

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="service-page">
        <header className="service-page-hero">
          <div className="page-container">
            <p className="eyebrow eyebrow-light">
              IT · WEB · SECURITY · BERGEN
            </p>
            <h1 className="section-heading">
              Teknologi som <em>bare fungerer.</em>
            </h1>
            <p className="section-intro">
              Praktisk hjelp med nettsider, PC-er, IT og sikkerhet for små
              bedrifter og privatpersoner i Bergen.
            </p>
          </div>
        </header>
        <section className="service-overview">
          <div className="page-container">
            <p className="eyebrow">Tjenester</p>
            <h2 className="section-heading service-dark-heading">
              Én kontakt for det <em>tekniske.</em>
            </h2>
            <ServiceCards detailed />
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
