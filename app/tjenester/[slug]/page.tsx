import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "../../components/navigation";
import { getService, serviceAreas } from "../../service-content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return serviceAreas.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};

  const title = `${service.tag} i Arna og Bergen`;
  const description = `${service.description} Bartholomeus Berg hjelper små bedrifter og privatpersoner i Arna og Bergen.`;

  return {
    title,
    description,
    alternates: { canonical: `/tjenester/${service.slug}` },
    openGraph: { title: `${title} | Bartholomeus Berg`, description },
    twitter: { title: `${title} | Bartholomeus Berg`, description },
  };
}
export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return (
    <>
      <Navigation />
      <main className="service-page">
        <header className="service-page-hero">
          <div className="page-container">
            <Link href="/tjenester" className="back-link">
              ← Alle tjenester
            </Link>
            <p className="eyebrow eyebrow-light">{service.tag} · Arna og Bergen</p>
            <h1 className="section-heading">{service.title}</h1>
            <p className="section-intro">{service.intro}</p>
          </div>
        </header>
        <section className="service-detail">
          <div className="page-container service-detail-layout">
            <div>
              <p className="eyebrow">Dette kan jeg hjelpe med</p>
              <h2 className="section-heading service-dark-heading">
                Praktisk hjelp, <em>tilpasset behovet.</em>
              </h2>
            </div>
            <ul className="detail-list">
              {service.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="service-cta">
          <div className="page-container service-cta-layout">
            <p className="service-cta-copy">
              Pris avtales etter oppdrag. Ta kontakt, så finner vi ut hva som
              passer.
            </p>
            <Link className="button service-cta-button" href="/#contact">
              Ta kontakt
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
