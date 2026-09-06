import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "../components/navigation";

export const metadata: Metadata = { title: "Takk for henvendelsen", robots: { index: false, follow: false } };

export default function ThankYouPage() {
  return (
    <>
      <Navigation />
      <main className="utility-page utility-page--thank-you">
        <div className="page-container utility-page__content">
          <p className="utility-page__check" aria-hidden="true">✓</p>
          <p className="eyebrow eyebrow-light">Forespørsel sendt</p>
          <h1>Takk for at du <em>tok kontakt.</em></h1>
          <p>Jeg har mottatt henvendelsen din og svarer normalt innen én arbeidsdag.</p>
          <Link className="utility-page__button" href="/">Til forsiden</Link>
        </div>
      </main>
    </>
  );
}
