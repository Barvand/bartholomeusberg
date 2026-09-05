import Image from "next/image";
import { milestones } from "../../content";
import { Reveal } from "../animation/reveal";

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="page-container about-layout">
        <Reveal>
          <Image
            src="/bartpng.png"
            alt="Bart van den Berg"
            width={913}
            height={1369}
            className="about-image"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow">Hvem jeg er</p>
          <h2 className="section-heading about-heading">Jeg snakker <em>rett fram.</em></h2>
          <p className="section-intro about-intro">
            Jeg har bakgrunn fra både utvikling og bygg og anlegg. Det betyr at
            jeg forstår at teknologi må være nyttig i praksis og at en god
            løsning ikke trenger en lang teknisk forklaring.
          </p>
          <ol className="milestones">
            {milestones.map((milestone) => (
              <li key={milestone.title}>
                <b>{milestone.title}</b>
                <span>
                  {milestone.year} · {milestone.location}
                </span>
                <p>{milestone.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
