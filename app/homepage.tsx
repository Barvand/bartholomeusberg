import Image from "next/image";
import Link from "next/link";
import { milestones, projects } from "./content";
import ContactForm from "./components/contact-form";
import styles from "./homepage.module.css";
import themeSplit from "../totaltiming-mockups/assets/totaltiming-theme-split-approval.png";
import adminShifts from "../totaltiming-mockups/assets/totaltiming-browser-admin-shifts.png";
import phonesDark from "../totaltiming-mockups/assets/totaltiming-phones-dark.png";
import adminDashboard from "../totaltiming-mockups/assets/totaltiming-laptop-admin-dashboard.png";

const studyProjects = projects.filter((project) => project.category === "other");
const totalTiming = projects.find((project) => project.slug === "total-timing")!;
const totalEntreprenor = projects.find((project) => project.slug === "totalentreprenor-as");

// The workday really is a sequence, so the steps carry numbers.
const workday = [
  {
    title: "Vaktene legges ut.",
    text: "Administrasjonen publiserer vakter, ser hvem som har meldt seg på og registrerer oppmøte, uten lister på e-post og SMS.",
    image: adminShifts,
    alt: "TotalTiming i nettleseren: oversikt for å legge ut vakter, med kommende vakter og påmeldinger",
  },
  {
    title: "Timene føres på mobilen.",
    text: "Ansatte velger prosjekt, fører timer og melder seg på ledige vakter fra telefonen, rett fra byggeplassen.",
    image: phonesDark,
    alt: "Tre mobilskjermer fra TotalTiming i mørk modus: timeoversikt, registrering av arbeidstid og ledige vakter",
  },
  {
    title: "Alt samles på ett sted.",
    text: "Prosjekter, fravær og registreringer som venter på godkjenning ligger i én arbeidsoversikt for administrasjonen.",
    image: adminDashboard,
    alt: "TotalTiming på bærbar PC: arbeidsoversikt med prosjekter og registreringer som venter på godkjenning",
  },
];

const businessServices = [
  {
    title: "Nettsider og webutvikling",
    description:
      "Bedriftsnettsider og digitale verktøy med et tydelig formål og en enkel vei videre.",
    href: "/tjenester/nettsider",
    link: "Les om nettsider",
  },
  {
    title: "Skreddersydd programvare",
    description:
      "Interne løsninger bygget rundt konkrete oppgaver og måten bedriften jobber på.",
    href: "/prosjekter/total-timing",
    link: "Se et eksempel",
  },
  {
    title: "IT uten egen IT-avdeling",
    description:
      "PC-er, e-post, programvare, brukeroppsett og nettsider. Én person å kontakte når noe skal settes opp, forbedres eller bare fungere igjen.",
    href: "/tjenester/bedrifts-it",
    link: "Les om bedrifts-IT",
  },
];

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.homepage}>
      {/* 1. Hero: white, ending on the light/dark mockup that bridges into the dark chapter. */}
      <section id="home" className={styles.hero} aria-labelledby="home-title">
        <div className={styles.wrap}>
          <h1 id="home-title" className={styles.heroTitle}>
            Nettsider, programvare og IT-løsninger.
          </h1>
          <div className={styles.heroMeta}>
            <p className={styles.heroLead}>
              Jeg utvikler nettsider og digitale løsninger som gjør
              arbeidshverdagen enklere. Jeg hjelper små bedrifter med
              utvikling, teknologi og praktiske IT-utfordringer i Bergen og
              Arna.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#contact">
                Fortell meg om prosjektet ditt
              </a>
              <a className={styles.textAction} href="#projects">
                Se hvordan TotalTiming fungerer
              </a>
            </div>
          </div>
          <figure className={styles.heroFigure}>
            <Image
              src={themeSplit}
              alt="TotalTiming: prosjektgodkjenning vist i lys og mørk modus side om side, med fiktive eksempeldata"
              priority
              quality={82}
              placeholder="blur"
              sizes="(max-width: 767px) 100vw, (max-width: 1400px) 92vw, 1320px"
            />
          </figure>
        </div>
      </section>

      {/* 2. TotalTiming: the case told as one workday. */}
      <section id="projects" className={styles.case} aria-labelledby="case-title">
        <div className={styles.wrap}>
          <div className={styles.caseIntro}>
            <h2 id="case-title" className={styles.caseTitle}>
              TotalTiming samler arbeidsdagen.
            </h2>
            <div className={styles.caseSummary}>
              <p>
                En webapplikasjon for byggebransjen, med timeregistrering,
                vaktplanlegging og prosjektoversikt på ett sted. Ansatte og
                administrasjon får hver sin arbeidsflate, på mobil og PC, i lys
                og mørk modus.
              </p>
              <dl className={styles.caseFacts}>
                <div>
                  <dt>Type</dt>
                  <dd>{totalTiming.type}</dd>
                </div>
                <div>
                  <dt>År</dt>
                  <dd>{totalTiming.year}</dd>
                </div>
                <div>
                  <dt>Bruk</dt>
                  <dd>Mobil og PC</dd>
                </div>
              </dl>
            </div>
          </div>

          <ol className={styles.workday} aria-label="En arbeidsdag i TotalTiming">
            {workday.map((step, index) => (
              <li className={styles.step} key={step.title}>
                <figure className={styles.stepFigure}>
                  <Image
                    src={step.image}
                    alt={step.alt}
                    quality={78}
                    sizes="(max-width: 767px) 100vw, (max-width: 1400px) 70vw, 940px"
                  />
                </figure>
                <div className={styles.stepText}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className={styles.caseNote}>
            Alle skjermbilder viser fiktive eksempeldata.{" "}
            <Link href="/prosjekter/total-timing">Les hele prosjektet om TotalTiming</Link>
          </p>
        </div>
      </section>

      {/* 3. The case becomes the offer. */}
      <section className={styles.excel} aria-labelledby="excel-title">
        <div className={`${styles.wrap} ${styles.excelGrid}`}>
          <h2 id="excel-title" className={styles.excelTitle}>
            Har bedriften vokst fra Excel?
          </h2>
          <div className={styles.excelBody}>
            <p>
              Jeg kan bygge enkle interne systemer rundt måten bedriften
              faktisk jobber på, fra timeregistrering og prosjektoversikt til
              oppgavestyring og dokumentorganisering.
            </p>
            <ul>
              <li>Timeregistrering og prosjektoversikt</li>
              <li>Interne oversikter og administrative verktøy</li>
              <li>Oppgaver, bilder og dokumenter på ett sted</li>
            </ul>
            <div className={styles.excelActions}>
              <a className={styles.lightAction} href="#contact">
                Fortell meg hvordan dere jobber
              </a>
              <Link className={styles.textActionLight} href="/tjenester/nettsider">
                Les om digitale løsninger
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services, split by who they are for. */}
      <section id="services" className={styles.services} aria-labelledby="services-title">
        <div className={styles.wrap}>
          <h2 id="services-title" className={styles.sectionTitle}>
            Praktisk teknologi for små bedrifter.
          </h2>
          <div className={styles.servicesGrid}>
            <ul className={styles.serviceList}>
              {businessServices.map((service) => (
                <li key={service.href}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href={service.href}>{service.link}</Link>
                </li>
              ))}
            </ul>
            <aside className={styles.homeHelp} aria-labelledby="home-help-title">
              <h3 id="home-help-title">PC-hjelp hjemme</h3>
              <p>
                Også for privatpersoner: hjelp med PC, programmer og vanlige
                IT-problemer, uten unødvendig teknisk språk.
              </p>
              <Link href="/tjenester/pc-it">Les om PC-hjelp</Link>
            </aside>
          </div>
          <Link href="/tjenester" className={styles.textAction}>
            Se alle tjenester
          </Link>
        </div>
      </section>

      {/* 5. Client work, then study work, clearly labelled. */}
      {totalEntreprenor && (
        <section className={styles.work} aria-labelledby="client-title">
          <div className={styles.wrap}>
            <div className={styles.clientGrid}>
              <Link
                href="/prosjekter/totalentreprenor-as"
                className={styles.clientImage}
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src="/totalentreprenorProject.jpg"
                  alt=""
                  width={2040}
                  height={1118}
                  sizes="(max-width: 767px) 100vw, 60vw"
                />
              </Link>
              <div className={styles.clientCopy}>
                <p className={styles.kind}>Kundeprosjekt, {totalEntreprenor.year}</p>
                <h2 id="client-title">Totalentreprenør AS</h2>
                <p>{totalEntreprenor.description}</p>
                <Link href="/prosjekter/totalentreprenor-as" className={styles.textAction}>
                  Se prosjektet Totalentreprenør AS
                </Link>
              </div>
            </div>

            <div className={styles.study}>
              <div className={styles.studyHead}>
                <h2 id="study-title">Andre digitale prosjekter.</h2>
                <p>
                  Kundeprosjektene står først. Disse prosjektene viser også
                  erfaring med frontend, brukerflyt og digitale tjenester.
                </p>
              </div>
              <ul className={styles.studyList} aria-labelledby="study-title">
                {studyProjects.map((project) => (
                  <li key={project.slug}>
                    <div className={styles.studyThumb}>
                      <Image
                        src={project.image}
                        alt={`Skjermbilde fra ${project.name}`}
                        fill
                        sizes="(max-width: 767px) 100vw, 30vw"
                      />
                    </div>
                    <p className={styles.kind}>
                      {project.year ? `${project.type}, ${project.year}` : project.type}
                    </p>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className={styles.studyLinks}>
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer">
                          Se {project.name}
                        </a>
                      )}
                      {project.repoLink && (
                        <a href={project.repoLink} target="_blank" rel="noreferrer">
                          Kildekode på GitHub
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 6. Offer as one price strip. */}
      <section id="offer" className={styles.offer} aria-labelledby="offer-title">
        <div className={`${styles.wrap} ${styles.offerStrip}`}>
          <div className={styles.offerPrice}>
            <h2 id="offer-title">
              Ny nettside til <span>9 999 kr.</span>
            </h2>
            <p>Fast pris for en enkel nettside.</p>
          </div>
          <p className={styles.offerText}>
            Jeg åpner nå for fem enkle bedriftsnettsider til fast pris.
            Tilbudet passer for håndverkere og små bedrifter som trenger en
            profesjonell nettside uten unødvendig styr.
          </p>
          <ul className={styles.offerList}>
            <li>Én tydelig og mobilvennlig nettside</li>
            <li>Presentasjon av tjenester og kontaktinfo</li>
            <li>Grunnleggende SEO</li>
            <li>Hjelp med publisering</li>
          </ul>
          <a className={`${styles.primaryAction} ${styles.offerAction}`} href="#contact">
            Reserver en plass
          </a>
        </div>
      </section>

      {/* 7. The person behind the work. */}
      <section id="about" className={styles.about} aria-labelledby="about-title">
        <div className={`${styles.wrap} ${styles.aboutGrid}`}>
          <figure className={styles.portrait}>
            <Image
              src="/github-image.jpg"
              alt="Bartholomeus Berg utendørs med landskap i bakgrunnen"
              fill
              sizes="(max-width: 767px) 100vw, 40vw"
            />
          </figure>
          <div className={styles.aboutCopy}>
            <h2 id="about-title" className={styles.sectionTitle}>
              Bak arbeidet står jeg.
            </h2>
            <p className={styles.aboutLead}>
              Jeg heter Bartholomeus Berg. Jeg liker å bygge ting, forstå
              hvorfor noe ikke virker og finne løsninger som er lette å bruke.
              Derfor samler jeg utvikling og praktisk IT-hjelp på ett sted.
            </p>
            <p>
              Jeg har bakgrunn fra både utvikling og bygg- og anleggsbransjen.
              Det betyr at jeg forstår at teknologi må være nyttig i praksis, og
              at en god løsning ikke trenger en lang teknisk forklaring.
            </p>
            <ul className={styles.milestones}>
              {milestones.map((milestone) => (
                <li key={milestone.title}>
                  <h3>{milestone.title}</h3>
                  <p className={styles.kind}>{milestone.year}</p>
                  <p>{milestone.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Contact. */}
      <section id="contact" className={styles.contact} aria-labelledby="contact-title">
        <div className={`${styles.wrap} ${styles.contactGrid}`}>
          <div className={styles.contactIntro}>
            <h2 id="contact-title">Hva skal vi få til?</h2>
            <p>
              Fortell kort om nettsiden, systemet eller IT-problemet du trenger
              hjelp med, så tar jeg kontakt.
            </p>
          </div>
          <div className={styles.contactForm}>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
