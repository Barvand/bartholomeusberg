import Link from "next/link";
import Image from "next/image";
import { organisationNumber } from "../content";

const copyrightYear = 2026;

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-content">
        <div>
          <Link href="/#home" className="footer-logo">
            <Image
              src="/BartBergLogo.svg"
              alt="Bart Berg"
              width={155}
              height={44}
            />
            <span className="site-logo__tagline">
              Nettsider · programvare · IT
            </span>
          </Link>
          <p>
            Nettsider, programvare og praktisk IT for små bedrifter i Bergen og
            Arna. Også PC-hjelp for privatkunder.
          </p>
        </div>
        <div className="footer-details">
          <p>© {copyrightYear} Bart van den Berg</p>
          <p>Org.nr. {organisationNumber}</p>
          <Link href="/#contact">Ta kontakt</Link>
          <a href="/personvern#informasjonskapsler">
            Personvern og informasjonskapsler
          </a>
        </div>
      </div>
    </footer>
  );
}
