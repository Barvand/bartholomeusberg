import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../components/navigation";
import {
  caseStudy,
  cvProfile,
  education,
  experience,
  personal,
  skills,
} from "../cv-content";

const description =
  "Bart van den Berg, systemutvikler i Bergen. CV, erfaring og en teknisk gjennomgang av TotalTiming: React, Express, MySQL og Docker.";

export const metadata: Metadata = {
  title: "CV – systemutvikler",
  description,
  alternates: { canonical: "/cv" },
  openGraph: {
    url: "/cv",
    type: "profile",
    title: "Bart van den Berg – systemutvikler",
    description,
    images: [{ url: "/github-image.jpg", alt: "Bart van den Berg" }],
    locale: "nb_NO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bart van den Berg – systemutvikler",
    description,
    images: ["/github-image.jpg"],
  },
};

const focus =
  "focus-visible:outline-fjord-200 focus-visible:outline-3 focus-visible:outline-offset-3";
const sectionTitle =
  "font-display text-4xl font-semibold tracking-[-.04em] text-white md:text-5xl";
const subTitle = "font-display text-2xl text-white";

// Highlights unverified content so it is easy to spot before publishing.
function Text({ children }: { children: string }) {
  return children.split(/(\[PLACEHOLDER[^\]]*\])/).map((part, index) =>
    part.startsWith("[PLACEHOLDER") ? (
      <mark className="bg-amber-200 px-1 text-fjord-950" key={index}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function DashList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-4">
      {items.map((item) => (
        <li className="grid grid-cols-[2rem_1fr] gap-3 leading-7" key={item}>
          <span className="mt-3 h-px w-5 bg-fjord-200" aria-hidden="true" />
          <span>
            <Text>{item}</Text>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Node({ name, detail }: { name: string; detail: string }) {
  return (
    <li className="border border-white/20 bg-fjord-900 px-4 py-3">
      <span className="block font-bold text-white">{name}</span>
      <span className="block text-sm text-fjord-100/70">{detail}</span>
    </li>
  );
}

function Arrow() {
  return (
    <li
      aria-hidden="true"
      className="flex items-center justify-center py-1 text-sm text-fjord-200 md:px-1 md:py-0"
    >
      <span className="md:hidden">↓</span>
      <span className="hidden md:inline">→</span>
    </li>
  );
}

function ArchitectureDiagram() {
  return (
    <figure className="mt-6">
      <div className="grid gap-3 md:grid-cols-[auto_auto_1fr] md:items-center">
        <ol className="grid gap-0 md:grid-cols-[1fr_auto_1fr] md:items-center" aria-label="Klientsiden">
          <Node name="Nettleser" detail="Mobil og PC" />
          <Arrow />
          <Node name="Cloudflare" detail="HTTPS og tunnel (cloudflared)" />
        </ol>
        <p
          aria-hidden="true"
          className="text-center text-sm text-fjord-200"
        >
          <span className="md:hidden">↓ HTTPS · JSON</span>
          <span className="hidden md:inline">→</span>
        </p>
        <div className="border border-dashed border-fjord-300/60 p-3">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-fjord-200">
            VPS · Docker
          </p>
          <ol className="grid gap-0 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center" aria-label="Serversiden">
            <Node name="React-klient" detail="Statisk Vite-bygg" />
            <li aria-hidden="true" className="h-3 md:h-auto md:w-4" />
            <Node name="Express API" detail="Node.js-container" />
            <Arrow />
            <Node name="MySQL 8.4" detail="Container + private filer" />
          </ol>
        </div>
      </div>
      <p className="mt-3 border-l-2 border-fjord-200 pl-3 text-sm text-fjord-100/80">
        Daglige sikkerhetskopier på serveren og på en egen maskin via SSH.
      </p>
      <figcaption className="mt-4 text-sm leading-6 text-fjord-100/70">
        Arkitektur: Nettleseren går via Cloudflare, som sender trafikken
        gjennom en tunnel (cloudflared) til en VPS uten åpne webporter. Der
        kjører
        React-klienten, Express-API-et og MySQL-databasen i Docker. Klienten
        lastes ned som statiske filer og snakker deretter med API-et over
        HTTPS. Opplastede filer ligger i et privat Docker-volum.
      </figcaption>
    </figure>
  );
}

function Timeline({ items }: { items: typeof experience }) {
  return (
    <ol className="mt-6 space-y-6">
      {items.map((item) => (
        <li className="border-t border-white/15 pt-5" key={item.role + item.place}>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-fjord-200">
            <Text>{item.period}</Text>
          </p>
          <h4 className="mt-2 font-bold text-white">
            {item.role}
            {item.place && (
              <span className="font-normal text-fjord-100/80">
                {" "}
                · {item.place}
              </span>
            )}
          </h4>
          {item.text && (
            <p className="mt-2 leading-7">
              <Text>{item.text}</Text>
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function CvPage() {
  const contactLinks = [
    {
      label: "Last ned CV (PDF)",
      href: cvProfile.cvHref,
      primary: true,
      download: true,
    },
    { label: "LinkedIn", href: cvProfile.linkedin, external: true },
    { label: "GitHub", href: cvProfile.github, external: true },
    { label: cvProfile.email, href: `mailto:${cvProfile.email}` },
  ];

  return (
    <>
      <Navigation />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-fjord-950 text-white"
      >
        <div className="mx-auto w-[min(1080px,calc(100%-2rem))] pb-8 pt-28 md:w-[min(1080px,calc(100%-3rem))] md:pb-12 md:pt-32">
          <header className="grid gap-10 pb-16 pt-10 md:grid-cols-[1.2fr_.8fr] md:items-end md:gap-14 md:pb-24 md:pt-16">
            <div className="md:order-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-fjord-200">
                For arbeidsgivere
              </p>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl md:text-7xl">
                {cvProfile.name}
              </h1>
              <p className="mt-4 font-display text-2xl text-fjord-200 md:text-3xl">
                {cvProfile.title}
              </p>
              <div className="mt-7 max-w-2xl space-y-4 text-lg leading-8 text-fjord-100/80">
                {cvProfile.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-8 flex flex-wrap gap-3" aria-label="CV og kontakt">
                {contactLinks.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={link.href}
                        download={link.download || undefined}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noreferrer" : undefined}
                        className={`inline-flex rounded px-5 py-3 text-sm font-bold transition ${focus} ${
                          link.primary
                            ? "bg-fjord-200 text-fjord-950 hover:bg-white"
                            : "border border-white/30 text-white hover:bg-white/10"
                        }`}
                      >
                        {link.label}
                        {link.external && (
                          <span className="sr-only"> (åpnes i ny fane)</span>
                        )}
                      </a>
                    ) : (
                      <Text>{`[PLACEHOLDER: ${link.label}-URL]`}</Text>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border border-white/10 md:max-w-none">
              <Image
                src="/github-image.jpg"
                alt="Portrett av Bart van den Berg utendørs, med fjell i bakgrunnen"
                fill
                priority
                sizes="(max-width: 767px) 384px, 40vw"
                className="object-cover object-[50%_35%]"
              />
            </figure>
          </header>

          <section
            aria-labelledby="totaltiming-title"
            className="border-t border-white/15 py-14 md:py-20"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-fjord-200">
              Teknisk case
            </p>
            <h2 id="totaltiming-title" className={`mt-4 ${sectionTitle}`}>
              TotalTiming
            </h2>
            <div className="mt-8 grid gap-12 text-fjord-100/80 md:grid-cols-[1.1fr_.9fr]">
              <section aria-labelledby="tt-what">
                <h3 id="tt-what" className={subTitle}>
                  Utgangspunkt og bruk
                </h3>
                <p className="mt-4 leading-8">{caseStudy.background}</p>
                <p className="mt-4 leading-8">{caseStudy.summary}</p>
                <p className="mt-4 leading-8">
                  <Text>{caseStudy.users}</Text>
                </p>
                <p className="mt-4 leading-8">{caseStudy.nextStep}</p>
                <Link
                  href="/prosjekter/total-timing"
                  className={`mt-6 inline-flex font-bold text-fjord-200 underline underline-offset-4 hover:text-white ${focus}`}
                >
                  Se skjermbilder av TotalTiming →
                </Link>
                <p className="mt-3 text-sm leading-6 text-fjord-100/70">
                  {caseStudy.sourceNote}
                </p>
              </section>
              <section aria-labelledby="tt-stack">
                <h3 id="tt-stack" className={subTitle}>
                  Stack
                </h3>
                <dl className="mt-5 space-y-5">
                  {caseStudy.stack.map((group) => (
                    <div key={group.label}>
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-fjord-200">
                        {group.label}
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            className="rounded-full border border-white/20 px-3 py-1 text-sm text-fjord-50"
                            key={item}
                          >
                            {item}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            <section aria-labelledby="tt-architecture" className="mt-16 text-fjord-100/80">
              <h3 id="tt-architecture" className={subTitle}>
                Arkitektur
              </h3>
              <ArchitectureDiagram />
            </section>

            <div className="mt-16 grid gap-12 text-fjord-100/80 md:grid-cols-2">
              <section aria-labelledby="tt-security" className="md:row-span-2">
                <h3 id="tt-security" className={subTitle}>
                  Sikkerhet og personvern
                </h3>
                <DashList items={caseStudy.security} />
              </section>
              <section aria-labelledby="tt-testing">
                <h3 id="tt-testing" className={subTitle}>
                  Testing
                </h3>
                <DashList items={caseStudy.testing} />
              </section>
              <section aria-labelledby="tt-deploy">
                <h3 id="tt-deploy" className={subTitle}>
                  Drift og sikkerhetskopier
                </h3>
                <DashList items={caseStudy.deployment} />
              </section>
            </div>

            <section aria-labelledby="tt-decisions" className="mt-16">
              <h3 id="tt-decisions" className={subTitle}>
                Tre problemer jeg måtte løse
              </h3>
              <ol className="mt-6 grid gap-10 md:grid-cols-3 md:gap-8">
                {caseStudy.decisions.map((decision, index) => (
                  <li
                    className="border-t-2 border-fjord-200 pt-5 text-fjord-100/80"
                    key={decision.title}
                  >
                    <p className="font-display text-sm text-fjord-200" aria-hidden="true">
                      0{index + 1}
                    </p>
                    <h4 className="mt-2 text-lg font-bold leading-7 text-white">
                      {decision.title}
                    </h4>
                    <dl className="mt-4 space-y-3 text-[0.95rem] leading-7">
                      <div>
                        <dt className="font-bold text-fjord-50">Problemet</dt>
                        <dd>{decision.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-fjord-50">Slik løste jeg det</dt>
                        <dd>{decision.choice}</dd>
                      </div>
                      <div>
                        <dt className="font-bold text-fjord-50">Hva det koster</dt>
                        <dd>{decision.tradeoff}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ol>
            </section>
          </section>

          <section
            aria-labelledby="experience-title"
            className="border-t border-white/15 py-14 md:py-20"
          >
            <h2 id="experience-title" className={sectionTitle}>
              Erfaring og utdanning
            </h2>
            <div className="mt-8 grid gap-12 text-fjord-100/80 md:grid-cols-2">
              <section aria-labelledby="work-title">
                <h3 id="work-title" className={subTitle}>
                  Arbeid
                </h3>
                <Timeline items={experience} />
              </section>
              <section aria-labelledby="education-title">
                <h3 id="education-title" className={subTitle}>
                  Utdanning
                </h3>
                <Timeline items={education} />
              </section>
            </div>
          </section>

          <section
            aria-labelledby="skills-title"
            className="border-t border-white/15 py-14 md:py-20"
          >
            <h2 id="skills-title" className={sectionTitle}>
              Ferdigheter
            </h2>
            <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <div className="border-t border-white/15 pt-4" key={skill.group}>
                  <dt className="font-display text-xl text-white">{skill.group}</dt>
                  <dd>
                    <ul className="mt-3 space-y-1.5 text-fjord-100/80">
                      {skill.items.map((item) => (
                        <li key={item}>
                          <Text>{item}</Text>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            aria-labelledby="personal-title"
            className="border-t border-white/15 py-14 md:py-20"
          >
            <h2 id="personal-title" className={sectionTitle}>
              Litt om meg
            </h2>
            <div className="mt-8 max-w-2xl space-y-4 text-lg leading-8 text-fjord-100/80">
              {personal.text.map((paragraph) => (
                <p key={paragraph}>
                  <Text>{paragraph}</Text>
                </p>
              ))}
              <p>
                <span className="font-bold text-white">Språk: </span>
                {personal.languages}
              </p>
            </div>
            <a
              href={`mailto:${cvProfile.email}`}
              className={`mt-10 inline-flex rounded bg-fjord-200 px-5 py-3 text-sm font-bold text-fjord-950 transition hover:bg-white ${focus}`}
            >
              Send meg en e-post
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
