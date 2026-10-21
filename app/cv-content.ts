// Content for /cv. Technical claims are taken from the TotalTiming source code;
// anything that could not be verified is marked [PLACEHOLDER] and must be
// filled in or removed before publishing.

export const cvProfile = {
  name: "Bart van den Berg",
  title: "Systemutvikler",
  intro: [
    "Jeg er fullstack-utvikler i Bergen med frontend-utdanning fra Noroff og praktisk erfaring med å utvikle, drifte og videreutvikle en webapplikasjon som er i daglig bruk.",
    "Hos Total Entreprenør AS har jeg bygget TotalTiming fra bunnen av: React-klient, Express-API, MySQL-database, tilgangsstyring og drift på egen server. Nå ser jeg etter en fast stilling som systemutvikler, der jeg kan jobbe i team og lære av erfarne utviklere. Resten av dette nettstedet hører til enkeltpersonforetaket mitt, men det er en fast stilling jeg er ute etter.",
  ],
  cvHref: "/bart-van-den-berg-cv.pdf",
  email: "bartberg11@gmail.com",
  github: "https://github.com/Barvand",
  linkedin: "https://www.linkedin.com/in/bart-van-den-berg-b90219155/",
};

export const caseStudy = {
  background:
    "Før TotalTiming førte vi timene på papir. Mange glemte å notere timene sine og måtte spørre sjefen om han husket når de hadde jobbet, og i en travel hverdag var det lett at også han glemte å skrive det ned. Ved månedsslutt sendte hver ansatt timelisten sin, og sjefen måtte kontrollere alle for hånd. Det var dette jeg bygget TotalTiming for å løse: nå føres timene fortløpende på mobil eller PC, godkjennes direkte i systemet, og regnskap henter de godkjente timene rett fra appen i stedet for fra innsendte timelister.",
  summary:
    "TotalTiming er et arbeidsstyringssystem for byggebransjen. Ansatte fører timer og fravær, tar ledige vakter og laster opp bilder, filer og notater til prosjektene. Prosjektledere godkjenner eller avviser timer, regnskap gjennomgår timer og rapporter, og administratorer styrer brukere, prosjekter og vakter.",
  users:
    "Systemet er utviklet i jobben min hos Total Entreprenør AS og brukes daglig av 10 aktive brukere, både ansatte og administrasjon. Til sammen føres det over 400 timer i systemet hver måned, og daglig leder har flere ganger sagt at systemet er til stor hjelp i hverdagen.",
  sourceNote:
    "Kildekoden er privat fordi den tilhører Total Entreprenør AS. Jeg går gjerne gjennom løsningen i et intervju.",
  nextStep:
    "Vaktsystemet «Ledige timer» ble lansert i oktober 2026. Neste steg er e-postvarsler, slik at ansatte får beskjed om ledige vakter uten at noen må følge opp manuelt.",
  stack: [
    {
      label: "Klient",
      items: [
        "React 19",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "TanStack Query",
        "React Router",
        "Zod",
      ],
    },
    {
      label: "API",
      items: [
        "Node.js 20",
        "Express 5",
        "mysql2",
        "Zod",
        "JSON Web Tokens",
        "bcrypt",
        "Multer",
        "sharp",
      ],
    },
    { label: "Data og drift", items: ["MySQL 8.4", "Docker", "VPS", "Cloudflare Tunnel"] },
  ],
  security: [
    "Passord lagres som bcrypt-hasher. Tilgangstokens varer i 15 minutter, og fornyelsestokenet ligger i en httpOnly-cookie som bare sendes til /api/auth.",
    "Hver forespørsel sjekker brukeren mot databasen. Deaktiverte brukere og utloggede økter blir derfor avvist med en gang, ikke først når tokenet utløper.",
    "Rollene ansatt, regnskap og administrator sjekkes på serveren. Tilgang til prosjekter avgjøres av prosjektmedlemskap direkte i SQL-spørringene, så klienten kan aldri se mer enn brukeren har rett til.",
    "All input valideres med Zod, og alle databasekall bruker parametriserte spørringer.",
    "Opplastede filer lagres utenfor offentlig mappe med tilfeldige filnavn og kan bare hentes gjennom en innlogget, tilgangskontrollert rute. Filtyper og størrelser er begrenset.",
    "Bilder konverteres til WebP med sharp. Da forsvinner også metadata som GPS-posisjon fra mobilkameraet.",
    "Slettede prosjektnotater beholdes i 90 dager for gjenoppretting og revisjon, og skal deretter slettes permanent.",
    "Klienten sendes med sikkerhetsheadere, blant annet HSTS og en streng Content-Security-Policy, og API-et tillater bare kjente domener via CORS.",
  ],
  testing: [
    "Backend-tester skrevet med Node.js sin innebygde testløper. Databasen stubbes, og testoppsettet nekter å koble til en ekte database.",
    "Testene dekker blant annet øktsikkerhet og tilgangsstyring, prosjektmedlemskap, interne prosjekter, notater, filer, vakter, oppmøtepoeng og aktivitetslogg.",
    "Klienten har enhetstester for tidsberegning rundt vakter, i tillegg til TypeScript-bygg og ESLint.",
    "Tester, lint og bygg kjører automatisk med GitHub Actions på hver pull request og hver endring på main.",
  ],
  deployment: [
    "Først driftet jeg TotalTiming selv fra en maskin hjemme, med Nginx foran. Maskinen var ikke energieffektiv, så det ble billigere å flytte løsningen til en VPS.",
    "Klient, API og MySQL kjører i Docker på én VPS. Jeg valgte det fremfor tre separate tjenester for å holde hostingkostnadene nede, fordi Docker er enkelt å jobbe med, og fordi jeg ville lære det. Ulempen er at alt står på én server, og derfor tas det også kopier utenfor serveren.",
    "Trafikken går gjennom Cloudflare Tunnel (cloudflared). Serveren åpner selv en utgående forbindelse til Cloudflare, så appen trenger ingen åpne porter mot internett, og Cloudflare håndterer HTTPS.",
    "Databaseendringer leveres som versjonerte SQL-migreringer med dokumentert fremgangsmåte, verifisering og rollback.",
    "Databasen sikkerhetskopieres hver dag både på serveren og til en egen maskin, med mysqldump over SSH. Kopiene på den egne maskinen slettes automatisk etter 30 dager.",
    "[PLACEHOLDER: hvor ofte gjenoppretting fra backup testes]",
  ],
  decisions: [
    {
      title: "Utlogging som faktisk stenger tilgangen",
      problem:
        "Rene JWT-er er raske, men kan ikke trekkes tilbake før de utløper. En ansatt som slutter, eller en mistet telefon, skulle ikke beholde tilgang.",
      choice:
        "Hver bruker har et sessionVersion-felt som bakes inn i tokenene. Utlogging øker versjonen, og alle tokens med gammel versjon blir ugyldige på alle enheter.",
      tradeoff:
        "Det koster ett enkelt databaseoppslag per forespørsel, men gir umiddelbar tilbaketrekking uten å måtte drifte en egen øktlagring.",
    },
    {
      title: "Samme person, ulik rolle på ulike prosjekter",
      problem:
        "I byggebransjen kan samme person lede ett prosjekt og jobbe som vanlig ansatt på et annet. En global prosjektleder-rolle ville gitt for mye eller for lite tilgang.",
      choice:
        "Prosjektledelse og medlemskap lagres per prosjekt. Én felles funksjon lager SQL-betingelsen som avgjør hvilke prosjekter en bruker får se, og den brukes på tvers av API-et.",
      tradeoff:
        "Spørringene blir litt mer komplekse, men tilgangsregelen ligger ett sted og er dekket av tester.",
    },
    {
      title: "Poeng som ikke kan telles dobbelt",
      problem:
        "Oppmøte på vakter gir poeng, og registreringer kan bli korrigert i ettertid. Doble klikk eller nye forsøk etter nettverksfeil skulle ikke gi doble poeng.",
      choice:
        "Hver endring i oppmøte skrives som en ny rad i en poenglogg som bare tillater nye rader. Unike nøkler på bookingversjon og operasjons-ID gjør gjentatte forespørsler trygge, og databasetriggere hindrer sletting av historikk.",
      tradeoff:
        "Det krever transaksjoner og mer omhyggelig API-kode, men poengsummen kan alltid regnes ut og forklares fra historikken.",
    },
  ],
};

export const experience = [
  {
    role: "Utvikler",
    place: "Total Entreprenør AS",
    period: "Apr 2025 – nå",
    text: "Utvikler og drifter TotalTiming, og har laget og vedlikeholder bedriftens nettside.",
  },
  {
    role: "Nattevakt og resepsjonist",
    place: "Citybox Bergen",
    period: "Jun 2019 – sep 2023",
    text: "Gjestehenvendelser, bookinger og daglig drift, og opplæring av nye ansatte.",
  },
  {
    role: "Kundeservice",
    place: "Sellbytel, Barcelona",
    period: "Mar 2016 – nov 2018",
    text: "Kundeservice for internasjonale merkevarer som Salomon, Arc'teryx og Atomic.",
  },
  {
    role: "Personlig trener og instruktør",
    place: "",
    period: "2013 – 2016",
    text: "",
  },
  {
    role: "Soldat",
    place: "11 Luchtmobiele Brigade, Den nederlandske hæren",
    period: "Des 2009 – mai 2012",
    text: "",
  },
];

export const education = [
  {
    role: "Cybersikkerhet, høyere fagskole (2 år)",
    place: "Gokstad Akademiet",
    period: "Aug 2026 – jun 2028",
    text: "Pågår. Informasjonssikkerhet, etisk hacking, penetrasjonstesting og cyberforsvar.",
  },
  {
    role: "Networking Basics (22 timer)",
    place: "Cisco Networking Academy via Gokstad Akademiet",
    period: "Sep 2026",
    text: "Grunnleggende nettverk og nettverksprotokoller.",
  },
  {
    role: "Linux Essentials",
    place: "Cisco Networking Academy",
    period: "Sep 2026",
    text: "Grunnleggende Linux og kommandolinjen.",
  },
  {
    role: "Frontend-utvikling (2 år)",
    place: "Noroff School of Technology and Digital Media",
    period: "Mar 2023 – mar 2025",
    text: "React, TypeScript, REST API-er og universell utforming. Scrum Master i et teamprosjekt.",
  },
];

export const skills = [
  { group: "Språk", items: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
  {
    group: "Backend",
    items: ["Node.js", "Express", "REST API-er", "MySQL", "JWT-autentisering", "Zod"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "TanStack Query", "React Router", "Universell utforming (WCAG)"],
  },
  {
    group: "Drift og verktøy",
    items: ["Docker", "Nginx", "Linux (Ubuntu)", "Fail2Ban", "Git og GitHub", "Netlify", "Figma"],
  },
  {
    group: "Testing og CI",
    items: ["Node.js test runner", "ESLint", "TypeScript", "GitHub Actions"],
  },
  { group: "Metodikk", items: ["Scrum (Scrum Master i studieprosjekt)", "Versjonerte databasemigreringer", "SEO"] },
];

export const personal = {
  text: [
    "Jeg er oppvokst i Nederland og har bodd og jobbet i Barcelona før jeg slo meg ned i Arna. Bakgrunnen fra militæret, kundeservice og byggebransjen har lært meg å jobbe strukturert og å forstå hva brukerne faktisk trenger.",
    "På fritiden trener jeg, går på tur og er mye sammen med barna mine. Jeg liker å utvikle nye idéer og leke med ny teknologi, for eksempel å sette opp ti AI-agenter samtidig bare for å se hva som skjer. Jeg løser også oppgaver på Hack The Box, som henger godt sammen med cybersikkerhetsstudiet. Ellers slapper jeg av med serier og spill.",
  ],
  languages: "Nederlandsk (morsmål), engelsk (flytende) og norsk (B1/B2, brukes daglig på jobb).",
};
