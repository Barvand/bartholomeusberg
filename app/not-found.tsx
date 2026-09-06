import Link from "next/link";
import Navigation from "./components/navigation";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="utility-page text-center">
        <div className="page-container utility-page__content">
          <p className="utility-page__number" aria-hidden="true">
            404
          </p>
          <p className="eyebrow eyebrow-light">Siden ble ikke funnet</p>
          <h1>
            Her var det <em>tomt.</em>
          </h1>
          <p>
            Siden du leter etter finnes ikke, eller kan ha fått en ny adresse.
            Du kan gå tilbake til forsiden og finne veien videre derfra.
          </p>
          <Link className="utility-page__button" href="/">
            Til forsiden
          </Link>
        </div>
      </main>
    </>
  );
}
