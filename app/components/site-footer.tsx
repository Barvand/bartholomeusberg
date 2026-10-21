import Link from "next/link";
import { organisationNumber } from "../content";
import { navLinks } from "./nav-links";

const copyrightYear = 2026;

// Mirrors the header: same wordmark, links and contact action, on the dark tone.
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__main">
          <Link
            href="/"
            className="site-footer__logo"
            aria-label="Bartholomeus Berg, forsiden"
          >
            <span className="site-logo__name">Bartholomeus Berg</span>
            <span className="site-logo__divider" aria-hidden="true" />
            <span className="site-logo__tagline">
              Nettsider · programvare · IT
            </span>
          </Link>
          <nav className="site-footer__nav" aria-label="Bunnmeny">
            {navLinks.map(([label, href]) => (
              <Link className="primary-nav__link" href={href} key={href}>
                {label}
              </Link>
            ))}
          </nav>
          <Link className="primary-nav__contact" href="/#contact">
            Ta kontakt
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="site-footer__meta">
          <p>
            Nettsider, programvare og praktisk IT for små bedrifter i Bergen og
            Arna. Også PC-hjelp for privatkunder.
          </p>
          <p>
            © {copyrightYear} Bart van den Berg · Org.nr. {organisationNumber}
          </p>
          <a href="/personvern#informasjonskapsler">
            Personvern og informasjonskapsler
          </a>
          <Link href="/cv">For arbeidsgivere</Link>
        </div>
      </div>
    </footer>
  );
}
