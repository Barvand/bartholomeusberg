export type Service = {
  slug: "nettsider" | "pc-it" | "bedrifts-it";
  tag: string;
  title: string;
  description: string;
  features: string[];
  intro: string;
  details: string[];
  group: "web" | "it";
};

export const serviceAreas: Service[] = [
  {
    slug: "nettsider",
    tag: "Nettsider",
    title: "Nettsider som gjør jobben",
    group: "web",
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
    group: "it",
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
      "Windows, programvare og fjerning av skadevare",
      "Dataflytting, backup og oppsett av ny datamaskin",
    ],
  },
  {
    slug: "bedrifts-it",
    tag: "Bedrifts-IT",
    group: "it",
    title: "IT for små bedrifter",
    description:
      "Praktisk IT-hjelp for bedrifter som ikke trenger en egen IT-avdeling.",
    features: [
      "PC-er og brukeroppsett",
      "E-post og Microsoft 365",
      "Programvare og arbeidsstasjoner",
      "Generell IT-hjelp",
    ],
    intro:
      "For små bedrifter skal IT støtte arbeidet, ikke ta tid fra det. Jeg hjelper med oppsett av PC-er og brukere, e-post, programvare og generell teknisk støtte.",
    details: [
      "Oppsett av PC-er og brukere",
      "E-post og Microsoft 365",
      "Programvare og brukeroppsett",
      "Generell IT-hjelp og feilsøking",
    ],
  },
];

export function getService(slug: string) {
  return serviceAreas.find((service) => service.slug === slug);
}
