import Image from "next/image";
import type { StaticImageData } from "next/image";
import styles from "./total-timing-roles.module.css";
import employeeTime from "../../../totaltiming-mockups/assets/totaltiming-laptop-employee-time.png";
import phonesDark from "../../../totaltiming-mockups/assets/totaltiming-phones-dark.png";
import adminDashboard from "../../../totaltiming-mockups/assets/totaltiming-laptop-admin-dashboard.png";
import adminProject from "../../../totaltiming-mockups/assets/totaltiming-browser-project.png";
import adminShifts from "../../../totaltiming-mockups/assets/totaltiming-browser-admin-shifts.png";
import adminActivity from "../../../totaltiming-mockups/assets/totaltiming-browser-activity-dark.png";
import phonesLight from "../../../totaltiming-mockups/assets/totaltiming-phones-light.png";
import themeSplit from "../../../totaltiming-mockups/assets/totaltiming-theme-split-approval.png";

type Feature = {
  title: string;
  text: string;
  image?: StaticImageData;
  alt?: string;
};

type Role = {
  id: string;
  title: string;
  intro: string;
  menu: string[];
  features: Feature[];
};

// Every function described here is visible in the mockups, and each menu
// lists the app's own navigation for that role.
const roles: Role[] = [
  {
    id: "ansatt",
    title: "For ansatte",
    intro:
      "Den ansatte ser bare det som trengs for å føre timer og ta vakter, på mobil eller PC.",
    menu: ["Mine timer", "Bilder og filer", "Last opp notater", "Ledige timer"],
    features: [
      {
        title: "Alle timene samlet på ett sted.",
        text: "Velg prosjekt for vanlig arbeid, eller internt arbeid og fravær når det passer. Siste registrering kan gjentas med ett klikk. Hvis prosjektlederen avviser en time, står begrunnelsen øverst, og den ansatte registrerer en korrigert time.",
        image: employeeTime,
        alt: "TotalTiming på bærbar PC i mørk modus: siden Mine timer med en avvist registrering og skjemaet for å registrere arbeidstid",
      },
      {
        title: "Oversikt og vakter i lomma.",
        text: "Timeoversikten viser uke eller måned, med status på hver registrering. Timer som venter på godkjenning kan fortsatt redigeres eller slettes. Under Ledige timer ser den ansatte åpne vakter, ledige plasser og egne påmeldinger, og melder seg på direkte.",
        image: phonesDark,
        alt: "Tre mobilskjermer fra TotalTiming i mørk modus: timeoversikt, registrering av arbeidstid og ledige vakter",
      },
      {
        title: "Bilder, filer og notater fra jobben.",
        text: "Bilder, filer og notater lastes opp på prosjektet, så beskjeder fra byggeplassen havner der administrasjonen ser dem.",
      },
    ],
  },
  {
    id: "administrasjon",
    title: "For administrasjonen",
    intro:
      "Administrasjonen styrer prosjekter, brukere og vakter, og prosjektlederen godkjenner timene.",
    menu: ["Prosjekter", "Timer", "Aktivitet", "Legg ut timer", "Godkjenning"],
    features: [
      {
        title: "Arbeidsoversikten.",
        text: "Alle prosjekter med status, oppstart og ferdigstillelse, sammen med annet arbeid, fravær og godkjenninger. Nye prosjekter og brukere opprettes herfra, og et varsel viser hvor mange registreringer som venter.",
        image: adminDashboard,
        alt: "TotalTiming på bærbar PC: arbeidsoversikt med prosjektliste, status og varsel om registreringer som venter på godkjenning",
      },
      {
        title: "Ett sted per prosjekt.",
        text: "Hvert prosjekt har informasjon, arbeidstimer og bilder og filer. Status, datoer, prosjektinformasjon og kostnader redigeres direkte, og notatene fra de ansatte samles på prosjektet.",
        image: adminProject,
        alt: "TotalTiming i nettleseren: prosjektside med status, datoer, kostnader og notater fra ansatte",
      },
      {
        title: "Legg ut vakter.",
        text: "Publiser vakter, følg med på påmeldinger og registrer oppmøte. Kommende, tidligere og avlyste vakter ligger hver for seg.",
        image: adminShifts,
        alt: "TotalTiming i nettleseren: siden Legg ut timer med neste vakt og listen over kommende vakter",
      },
      {
        title: "Aktivitet, dag for dag.",
        text: "Se hvem som har registrert timer, på hvilket prosjekt og hvor mye, med sum per dag. Velg i dag, denne uka eller de siste 7 eller 30 dagene.",
        image: adminActivity,
        alt: "TotalTiming i nettleseren i mørk modus: aktivitetsoversikt over registrerte timer per dag",
      },
      {
        title: "Godkjenning, også på mobil.",
        text: "Prosjektlederen får registreringene sortert per prosjekt og godkjenner eller avviser dem. En avvist time går tilbake til den ansatte med begrunnelse.",
        image: phonesLight,
        alt: "Tre mobilskjermer fra TotalTiming i lys modus: ledige vakter, registrering av arbeidstid og prosjektgodkjenning",
      },
    ],
  },
];

export default function TotalTimingRoles() {
  return (
    <section className={styles.section} aria-labelledby="how-title">
      <header className={styles.intro}>
        <h2 id="how-title">Slik fungerer TotalTiming</h2>
        <p>
          TotalTiming har to arbeidsflater: én for ansatte som fører timer og
          tar vakter, og én for administrasjonen som styrer prosjekter, vakter
          og godkjenning. Skjermbildene viser fiktive eksempeldata.
        </p>
      </header>

      {roles.map((role) => (
        <section
          className={styles.role}
          key={role.id}
          aria-labelledby={`role-${role.id}`}
        >
          <header className={styles.roleHead}>
            <h3 id={`role-${role.id}`}>{role.title}</h3>
            <p>{role.intro}</p>
            <p className={styles.menuLabel} id={`menu-${role.id}`}>
              Menyen
            </p>
            <ul className={styles.menu} aria-labelledby={`menu-${role.id}`}>
              {role.menu.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </header>
          <ul className={styles.features}>
            {role.features.map((feature) => (
              <li
                className={feature.image ? undefined : styles.textOnly}
                key={feature.title}
              >
                {feature.image && (
                  <figure className={styles.figure}>
                    <Image
                      src={feature.image}
                      alt={feature.alt ?? ""}
                      quality={78}
                      sizes="(max-width: 767px) 100vw, (max-width: 1300px) 64vw, 800px"
                    />
                  </figure>
                )}
                <h4>{feature.title}</h4>
                <p>{feature.text}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <figure className={styles.closing}>
        <Image
          src={themeSplit}
          alt="TotalTiming: prosjektgodkjenning vist i lys og mørk modus side om side"
          quality={80}
          sizes="(max-width: 1300px) 100vw, 1240px"
        />
        <figcaption>
          <strong>Lys og mørk modus.</strong> Alle brukere kan bytte mellom lys
          og mørk modus fra menyen.
        </figcaption>
      </figure>
    </section>
  );
}
