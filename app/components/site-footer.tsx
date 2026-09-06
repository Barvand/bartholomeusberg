import { organisationNumber } from "../content";

const copyrightYear = 2026;

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-content">
        <div>
          <a href="#home" className="footer-logo">
            <img src="/BartBergLogo.svg" alt="Bart Berg" />
            <span className="site-logo__tagline">Nettsider · PC &amp; IT</span>
          </a>
          <p>Nettsider, PC-hjelp og praktisk IT-hjelp i Arna og Bergen.</p>
        </div>
        <div className="footer-details">
          <p>© {copyrightYear} Bart van den Berg</p>
          <p>Org.nr. {organisationNumber}</p>
          <a href="#contact">Ta kontakt</a>
          <a href="/personvern#informasjonskapsler">Personvern og informasjonskapsler</a>
        </div>
      </div>
    </footer>
  );
}
