import type { CSSProperties } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Doodle } from "./Doodles";

export default function Projects() {
  return (
    <section
      className="projects"
      id="projeler"
      aria-labelledby="projects-title"
    >
      <header className="projects-head">
        <h2 id="projects-title" data-reveal>
          <span className="mark-wrap">
            Projelerim
            <Doodle name="underline" className="mark" stretch delay={500} />
          </span>
        </h2>
      </header>

      <div className="project-grid">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projeler/${project.slug}`}
            className="project-card"
            data-reveal
            style={
              {
                "--tint": project.tint,
                "--d": `${index * 90}ms`,
              } as CSSProperties
            }
          >
            <span className="pc-top">
              <span className="project-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="pc-mark" aria-hidden="true">
                {project.mark}
              </span>
              <span className="pc-name">{project.name}</span>
              <span className="pc-tags" aria-label="Proje durumu">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </span>
            </span>

            <span className="pc-cover">
              <img
                src={project.cover.src}
                alt={project.cover.alt}
                loading="lazy"
                decoding="async"
              />
            </span>

            <span className="pc-body">
              <h3>{project.cardTitle}</h3>
              <span className="pc-text">{project.summary}</span>
            </span>

            <span className="pc-meta">
              <span className="project-category">{project.meta}</span>
              <span className="project-read">Projeyi keşfet</span>
              <span className="pc-go" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
