import type { Metadata } from "next";
import Link from "next/link";
import CookieSettingsButton from "../components/cookie-settings-button";
import Navigation from "../components/navigation";

export const metadata: Metadata = { title: "Personvern og informasjonskapsler", description: "Informasjon om personvern og bruk av informasjonskapsler." };

export default function PrivacyPage() {
  return <>
    <Navigation />
    <main className="privacy-page"><div className="page-container privacy-page__content">
      <Link className="privacy-page__back" href="/">← Til forsiden</Link>
      <p className="eyebrow">Personvern</p><h1>Personvern og informasjonskapsler</h1>
      <section id="informasjonskapsler"><h2>Informasjonskapsler</h2>
        <p>Vi bruker nødvendige informasjonskapsler for at nettstedet skal fungere og for å huske valget ditt for informasjonskapsler.</p>
        <p>Hvis du samtykker, kan Google bruke informasjonskapsler til analyse av trafikk og måling av annonsering. Du kan når som helst endre eller trekke tilbake samtykket ditt nedenfor.</p>
        <CookieSettingsButton />
      </section>
    </div></main>
  </>;
}
