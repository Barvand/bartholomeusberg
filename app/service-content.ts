export type Service = {
  slug: "nettsider" | "pc-it" | "bedrifts-it" | "it-sikkerhet";
  tag: string;
  title: string;
  description: string;
  features: string[];
  intro: string;
  details: string[];
};

export const serviceAreas: Service[] = [
  {
    slug: "nettsider",
    tag: "Nettsider",
    title: "Nettsider som gjør jobben",
    description:
      "Profesjonelle nettsider og digitale løsninger som er raske, tydelige og enkle å bruke.",
    features: [
      "Bedriftsnettsider",
      "Webapplikasjoner",
      "SEO og ytelse",
      "Drift og vedlikehold",
    ],
    intro:
      "En nettside skal forklare hva dere tilbyr, skape tillit og gjøre det enkelt å ta kontakt. Jeg bygger løsninger som fungerer godt på mobil, er enkle å vedlikeholde og passer måten bedriften faktisk jobber på.",
    details: [
      "Bedriftsnettsider, landingssider og redesign",
      "Skreddersydde webapplikasjoner og interne systemer",
      "Ytelse, grunnleggende SEO og tilgjengelighet",
      "Domene, hosting, publisering og vedlikehold",
    ],
  },
  {
    slug: "pc-it",
    tag: "PC & IT",
    title: "Når teknologien ikke spiller på lag",
    description:
      "Hjelp med PC, programvare og utstyr – uten unødvendig teknisk språk.",
    features: [
      "PC- og laptophjelp",
      "SSD- og RAM-oppgraderinger",
      "Windows og programvare",
      "Feilsøking og dataflytting",
    ],
    intro:
      "Når PC-en er treg, noe ikke virker eller nytt utstyr skal på plass, er det godt å ha én person å ringe. Jeg hjelper privatpersoner og små virksomheter med praktiske problemer og ryddige løsninger.",
    details: [
      "Feilsøking på PC og laptop",
      "SSD- og RAM-oppgraderinger",
      "Windows-installasjon, programvare og skadevareopprydding",
      "Dataflytting, backup og oppsett av ny datamaskin",
    ],
  },
  {
    slug: "bedrifts-it",
    tag: "Bedrifts-IT",
    title: "IT for små bedrifter",
    description:
      "Praktisk IT-hjelp for bedrifter som ikke trenger en egen IT-avdeling.",
    features: [
      "PC-er og brukere",
      "Wi-Fi og nettverk",
      "Backup og lagring",
      "E-post og Microsoft 365",
    ],
    intro:
      "For små bedrifter skal IT støtte arbeidet, ikke ta tid fra det. Jeg hjelper med oppsett, forbedringer og løpende teknisk støtte, fra arbeidsstasjoner til nettverk og lagring.",
    details: [
      "Oppsett av ansatte, PC-er og arbeidsstasjoner",
      "E-post og Microsoft 365",
      "Wi-Fi, rutere og enkel nettverksfeilsøking",
    ],
  },
  {
    slug: "it-sikkerhet",
    tag: "Sikkerhet",
    title: "Enklere og tryggere IT",
    description:
      "Praktiske sikkerhetstiltak som reduserer risiko uten å gjøre arbeidshverdagen vanskeligere.",
    features: [
      "MFA og passord",
      "Backup",
      "Sikring av PC-er",
      "Nettverk og router",
    ],
    intro:
      "God IT-sikkerhet i en liten bedrift handler ofte om å få på plass det grunnleggende. Jeg hjelper med tiltak som gir bedre kontroll og mindre risiko, uten å gjøre hverdagen unødvendig komplisert.",
    details: [
      "MFA, passordadministratorer og kontosikkerhet",
      "Backupstrategi og kontroll av gjenoppretting",
      "Enkel sikring og oppdatering av PC-er",
      "Router-, nettverks- og sikker tilgang på avstand",
    ],
  },
];

export function getService(slug: string) {
  return serviceAreas.find((service) => service.slug === slug);
}
