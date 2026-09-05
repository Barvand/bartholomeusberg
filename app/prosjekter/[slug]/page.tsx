import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../content";

type ProjectPageProps = { params: Promise<{ slug: string }> };
type DetailedProject = (typeof projects)[number] & {
  intro: string;
  challenge: string;
  approach: string[];
  outcome: string;
};

function isDetailedProject(
  project: (typeof projects)[number],
): project is DetailedProject {
  return (
    "intro" in project &&
    "challenge" in project &&
    "approach" in project &&
    "outcome" in project
  );
}

export function generateStaticParams() {
  return projects.filter(isDetailedProject).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project || !isDetailedProject(project)) return {};
  return { title: project.name, description: project.intro };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project || !isDetailedProject(project)) notFound();

  return (
    <main className="min-h-screen bg-fjord-950 text-white">
      <div className="mx-auto w-[min(980px,calc(100%-2rem))] py-8 md:w-[min(980px,calc(100%-3rem))] md:py-12">
        <Link
          href="/#projects"
          className="text-sm font-bold text-fjord-200 hover:text-white"
        >
          ← Tilbake til prosjekter
        </Link>
        <header className="pb-12 pt-16 md:pb-16 md:pt-24">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-fjord-200">
            {project.type} · {project.year}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-fjord-100/80">
            {project.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.stack.map((item) => (
              <span
                className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-fjord-50"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </header>
        <Image
          src={project.image}
          alt={`${project.name} – forhåndsvisning av prosjektet`}
          width={1200}
          height={750}
          priority
          className="w-full border"
        />
        <div className="gap-12 py-14 md:grid-cols-[.78fr_1.22fr] md:py-20">
          <div className="space-y-12 text-fjord-100/80">
            <section>
              <h2 className="font-display text-3xl text-white">
                Utgangspunktet
              </h2>
              <p className="mt-4 leading-8">{project.challenge}</p>
            </section>
            <section>
              <h2 className="font-display text-3xl text-white">
                Slik løste jeg det
              </h2>
              <ol className="mt-5 space-y-4">
                {project.approach.map((item, index) => (
                  <li
                    className="grid grid-cols-[2rem_1fr] gap-3 leading-7"
                    key={item}
                  >
                    <span className="font-display text-xl text-fjord-200">
                      0{index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <h2 className="font-display text-3xl text-white">Resultatet</h2>
              <p className="mt-4 leading-8">{project.outcome}</p>
            </section>
            {(project.liveLink || project.repoLink) && (
              <div className="flex flex-wrap gap-4 border-t border-white/15 pt-10">
                {project.liveLink && (
                  <a
                    className="rounded bg-fjord-200 px-5 py-3 text-sm font-bold text-fjord-950 transition hover:bg-white"
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Se prosjektet live
                  </a>
                )}
                {project.repoLink && (
                  <a
                    className="rounded border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                    href={project.repoLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Se kildekoden
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
