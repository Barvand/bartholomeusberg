import { projects } from "../content";

type SecondaryProject = (typeof projects)[number];

function SecondaryProjectRow({
  project,
}: {
  project: SecondaryProject;
}) {
  return (
    <article className="secondary-project">
      <span className="secondary-project-mark" aria-hidden="true" />
      <div className="secondary-project-content">
        <p className="secondary-project-meta">
          {project.type}
          {project.year && ` · ${project.year}`}
        </p>
        <h3>{project.name}</h3>
        <p className="secondary-project-description">{project.description}</p>
        <p className="secondary-project-tags">{project.stack.join(" · ")}</p>
      </div>
      {(project.liveLink || project.repoLink) && (
        <div className="secondary-project-links">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer">
              Se nettsted <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.repoLink && (
            <a href={project.repoLink} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function SecondaryProjectGrid({
  projectList,
}: {
  projectList: SecondaryProject[];
}) {
  return (
    <div className="secondary-project-grid">
      {projectList.map((project) => (
        <SecondaryProjectRow
          key={project.slug}
          project={project}
        />
      ))}
    </div>
  );
}
