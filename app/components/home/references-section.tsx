import ProjectGrid from "../project-grid";
import SecondaryProjectGrid from "../secondary-project-grid";
import TotalTimingShowcase from "../total-timing-showcase";
import { Reveal } from "../animation/reveal";
import { projects } from "../../content";

export default function ReferencesSection() {
  const customerProjects = projects.filter(
    (project) => project.category === "customer",
  );
  const otherProjects = projects.filter((project) => project.category === "other");

  return (
    <>
      <section id="projects" className="references-intro-section">
        <div className="page-container">
          <Reveal>
            <p className="eyebrow eyebrow-light">Referanser</p>
            <h2 className="section-heading">
              Fra nettsider til <em>interne systemer.</em>
            </h2>
            <p className="section-intro">
              Et utvalg løsninger utviklet for kunder, arbeid og studier.
            </p>
          </Reveal>
          <TotalTimingShowcase />
        </div>
      </section>
      <section className="customer-projects-section">
        <div className="page-container">
          <Reveal>
            <p className="eyebrow">Kundeprosjekter</p>
            <h2 className="section-heading service-dark-heading">
              Arbeid levert <em>i praksis.</em>
            </h2>
          </Reveal>
          <ProjectGrid projectList={customerProjects} tone="light" customer />
        </div>
      </section>
      <section className="other-projects-section">
        <div className="page-container">
          <Reveal>
            <p className="eyebrow eyebrow-light">Andre prosjekter</p>
            <h2 className="section-heading">Fra studier og egen utvikling.</h2>
            <p className="section-intro secondary-projects-intro">
              Studiearbeid og tidligere frontendprosjekter.
            </p>
          </Reveal>
          <SecondaryProjectGrid projectList={otherProjects} />
        </div>
      </section>
      <section className="references-cta-section">
        <div className="page-container references-cta-layout">
          <Reveal>
            <p className="eyebrow">Har du noe som skal bygges?</p>
            <h2 className="section-heading service-dark-heading">
              Nettside, internt system <em>eller IT-løsning?</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p>Fortell meg hva du trenger, så finner vi ut av resten.</p>
            <a className="button references-cta-button" href="#contact">
              Ta kontakt
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
