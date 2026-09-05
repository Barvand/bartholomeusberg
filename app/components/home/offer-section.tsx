import { Reveal } from "../animation/reveal";

export default function OfferSection() {
  return (
    <section id="offer" className="offer-section">
      <div className="page-container offer-layout">
        <Reveal>
          <p className="eyebrow">Aktuelt tilbud</p>
          <h2 className="section-heading offer-heading">
            Ny nettside til <em>9 999 kr.</em>
          </h2>
          <p className="section-intro offer-intro">
            Jeg åpner nå for fem enkle bedriftsnettsider til fast pris. Tilbudet
            passer for håndverkere og små bedrifter som trenger en profesjonell
            nettside uten unødvendig styr.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="offer-card">
          <p className="offer-price">9 999 kr</p>
          <p className="offer-price-description">Fast pris for en enkel nettside</p>
          <ul className="offer-inclusions">
            <li>Én tydelig og mobilvennlig nettside</li>
            <li>Presentasjon av tjenester og kontaktinfo</li>
            <li>Grunnleggende SEO</li>
            <li>Hjelp med publisering</li>
          </ul>
          <a className="button offer-button" href="#contact">
            Reserver en plass
          </a>
        </Reveal>
      </div>
    </section>
  );
}
