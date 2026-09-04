import Image from "next/image";
import ContactForm from "./components/contact-form";
import Navigation from "./components/navigation";
import { projects, services, milestones } from "./content";

const container =
  "mx-auto w-[min(1140px,calc(100%-2rem))] md:w-[min(1140px,calc(100%-3rem))]";
const heading =
  "mb-5 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-7xl";
const eyebrow =
  "mb-4 text-xs font-bold uppercase tracking-[0.18em] text-fjord-600";
const lightEyebrow =
  "mb-4 text-xs font-bold uppercase tracking-[0.18em] text-fjord-200";
const lightLead = "max-w-[640px] text-[1.06rem] leading-7 text-fjord-100/75";
const button =
  "inline-flex items-center justify-center rounded px-5 py-3 text-sm font-bold transition";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bart van den Berg",
    jobTitle: "Web Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bergen",
      addressCountry: "NO",
    },
    url: "https://bartvandenberg.no",
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navigation />
      <main>
        <section
          id="home"
          className="relative flex h-screen max-h-[960px] min-h-[670px] items-center overflow-hidden text-white md:min-h-[740px]"
        >
          <Image
            src="/newhero.jpg"
            alt="Bart van den Berg, web developer"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[42%_center] md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-fjord-950/90 via-fjord-900/55 to-fjord-900/15" />
          <div className={`${container} relative z-10 pt-16 md:pt-[76px]`}>
            <p className={lightEyebrow}>Web developer · Bergen, Norway</p>
            <h1 className="my-4 max-w-[830px] font-display text-5xl font-semibold leading-[0.96] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.7rem]">
              Websites built
              <br />
              <em className="not-italic text-fjord-200">
                to move business forward.
              </em>
            </h1>
            <p className="max-w-[560px] text-[1.06rem] leading-7 text-fjord-50/90">
              I build fast, scalable websites and applications for companies
              ready to grow—engineered for performance, structured for scale,
              and made to last.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className={`${button} bg-white text-fjord-950 hover:bg-fjord-100`}
                href="#projects"
              >
                See my work
              </a>
              <a
                className={`${button} border border-white/70 text-white hover:bg-white/10`}
                href="#contact"
              >
                Let&apos;s talk
              </a>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="bg-fjord-950 py-20 text-white md:py-28"
        >
          <div className={container}>
            <p className={lightEyebrow}>What I offer</p>
            <h2 className={heading}>
              Services that{" "}
              <em className="not-italic text-fjord-200">get results.</em>
            </h2>
            <p className={lightLead}>
              From infrastructure to design, everything you need to build,
              launch, and grow your digital presence.
            </p>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {services.map((service) => (
                <article
                  className="border border-fjord-100/20 bg-fjord-900/70 p-7 transition duration-300 hover:-translate-y-1 hover:border-fjord-200/80"
                  key={service.title}
                >
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-fjord-200">
                    {service.tag}
                  </span>
                  <h3 className="mb-3 mt-5 font-display text-2xl">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-6 text-fjord-100/75">
                    {service.description}
                  </p>
                  <ul className="mt-5 border-t border-white/10 pt-4 text-sm leading-7 text-fjord-50/90">
                    {service.features.map((feature) => (
                      <li
                        className="before:mr-2 before:text-fjord-200 before:content-['•']"
                        key={feature}
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-fjord-50 py-20 md:py-28">
          <div className={container}>
            <p className={eyebrow}>Featured project</p>
            <h2 className={`${heading} text-fjord-950`}>
              TotalTiming{" "}
              <em className="not-italic text-fjord-600">
                workforce management.
              </em>
            </h2>
            <p className="max-w-[640px] text-[1.06rem] leading-7 text-slate-600">
              A production full-stack application for a Norwegian construction
              firm. Employees log project hours and absences daily while
              accountants and admins manage the whole workforce in one place.
            </p>
            <div className="my-9 grid max-w-[720px] grid-cols-2 border border-fjord-200 bg-white sm:flex">
              {[
                ["60%", "Reduction in manual tracking"],
                ["10+", "Projects managed"],
                ["10+", "Active team members"],
              ].map(([value, label], index) => (
                <div
                  className={`flex-1 p-5 ${index === 1 ? "border-l border-fjord-200 sm:border-r" : index === 2 ? "col-span-2 border-t border-fjord-200 sm:col-auto sm:border-l-0 sm:border-t-0" : "sm:border-r sm:border-fjord-200"}`}
                  key={label}
                >
                  <b className="block font-display text-2xl text-fjord-950">
                    {value}
                  </b>
                  <span className="text-xs text-slate-500">{label}</span>
                </div>
              ))}
            </div>
            <Image
              src="/showcase-totaltiming.svg"
              alt="TotalTiming workforce management application"
              width={1200}
              height={760}
              className="mt-12 h-auto w-full rounded"
            />
          </div>
        </section>

        <section
          id="projects"
          className="bg-fjord-900 py-20 text-white md:py-28"
        >
          <div className={container}>
            <p className={lightEyebrow}>Selected work</p>
            <h2 className={heading}>
              Projects made{" "}
              <em className="not-italic text-fjord-200">to perform.</em>
            </h2>
            <div className="mt-14">
              {projects.map((project) => (
                <article
                  className="grid items-center gap-7 border-t border-white/15 py-10 md:grid-cols-[1fr_1.05fr] md:gap-12 md:py-14"
                  key={project.name}
                >
                  <div>
                    <p className={lightEyebrow}>Project</p>
                    <h3 className="mb-4 font-display text-3xl">
                      {project.name}
                    </h3>
                    <p className="leading-7 text-fjord-100/75">
                      {project.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          className="rounded-full border border-white/20 px-2.5 py-1 text-xs text-fjord-50"
                          key={item}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        className={`${button} bg-fjord-200 text-fjord-950 hover:bg-white`}
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit site
                      </a>
                      {project.repoLink && (
                        <a
                          className={`${button} border border-white/60 text-white hover:bg-white/10`}
                          href={project.repoLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Source code
                        </a>
                      )}
                    </div>
                  </div>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="order-first block overflow-hidden border border-white/15 bg-fjord-800 md:order-none"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.name} website preview`}
                      width={900}
                      height={560}
                      className="h-auto w-full transition duration-300 hover:scale-[1.03]"
                    />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-20 md:py-28">
          <div
            className={`${container} grid gap-10 md:grid-cols-[minmax(250px,.75fr)_1.25fr] md:gap-20`}
          >
            <Image
              src="/bartpng.png"
              alt="Bart van den Berg"
              width={913}
              height={1369}
              className="h-auto w-full bg-fjord-100"
            />
            <div>
              <p className={eyebrow}>The person behind the work</p>
              <h2 className={`${heading} text-fjord-950`}>
                Not your average{" "}
                <em className="not-italic text-fjord-600">web developer.</em>
              </h2>
              <p className="max-w-[640px] text-[1.06rem] leading-7 text-slate-600">
                With an Associate degree in Front-End Development from Noroff
                and 15 years working with people, I bring clarity, care, and
                follow-through to every project.
              </p>
              <ol className="mt-10 border-l-2 border-fjord-200 pl-6">
                {milestones.map((milestone) => (
                  <li
                    className="relative pb-5 before:absolute before:-left-[1.86rem] before:top-1 before:h-2.5 before:w-2.5 before:rounded-full before:bg-fjord-600"
                    key={milestone.title}
                  >
                    <b className="block font-display">{milestone.title}</b>
                    <span className="text-xs text-slate-400">
                      {milestone.year} · {milestone.location}
                    </span>
                    <p className="mb-0 mt-1 text-sm leading-6 text-slate-500">
                      {milestone.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="bg-fjord-950 py-20 text-white md:py-28"
        >
          <div className={container}>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="bg-fjord-950 px-6 py-6 text-center text-sm text-fjord-100/70">
        © {new Date().getFullYear()} Bart van den Berg
      </footer>
    </>
  );
}
