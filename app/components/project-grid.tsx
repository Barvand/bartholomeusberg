"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { projects } from "../content";
import { Stagger, StaggerItem } from "./animation/reveal";

type Tone = "dark" | "light";
type Props = { projectList: typeof projects; tone: Tone; customer?: boolean };

function ProjectCard({
  project,
  tone,
  number,
}: {
  project: (typeof projects)[number];
  tone: Tone;
  number: number;
}) {
  const reduceMotion = useReducedMotion();
  const isDetailed = "intro" in project;
  const link = isDetailed ? (
    <Link className="project-arrow-link" href={`/prosjekter/${project.slug}`}>
      Les caset <span aria-hidden="true">→</span>
    </Link>
  ) : project.liveLink ? (
    <a
      className="project-arrow-link"
      href={project.liveLink}
      target="_blank"
      rel="noreferrer"
    >
      Se prosjektet <span aria-hidden="true">→</span>
    </a>
  ) : null;
  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={`project-card project-card-${tone}`}
    >
      <div className={`project-image project-image-${project.slug}`}>
        <motion.div
          className="h-full w-full"
          transition={{ duration: 0.26, ease: "easeOut" }}
        >
          <Image
            src={project.image}
            alt={`${project.name} – forhåndsvisning av prosjektet`}
            width={900}
            height={560}
            className="project-image-content"
          />
        </motion.div>
      </div>
      <div className="project-card-copy">
        <p className="project-card-meta">
          <span>{String(number).padStart(2, "0")}</span> {project.type}
          {project.year && ` · ${project.year}`}
        </p>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.stack.slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {link && <div className="project-card-link">{link}</div>}
      </div>
    </motion.article>
  );
}

export default function ProjectGrid({
  projectList,
  tone,
  customer = false,
}: Props) {
  return (
    <Stagger
      className={`project-grid project-grid-${tone}${customer ? " project-grid-customer" : ""}`}
    >
      {projectList.map((project, index) => (
        <StaggerItem key={project.name}>
          <ProjectCard
            project={project}
            tone={tone}
            number={customer ? index + 2 : index + 3}
          />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
