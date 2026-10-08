import Link from "next/link"
import { projects } from "@/data/projects"
import { Doodle } from "./Doodles"

export default function Projects() {
  return (
    <section className="projects" id="projeler" aria-labelledby="projects-title">
      <header className="projects-head">
        <h2 id="projects-title" data-reveal>
          <span className="mark-wrap">
            Projelerim
            <Doodle name="underline" className="mark" stretch delay={ 500 } />
          </span>
        </h2>
      </header>

      <div className="project-grid">
        { projects.map((project) => (
          <article
            key={ project.slug }
            className="project-card"
            data-reveal
          >
            <div className="pc-info">
              <div>
                <h3>{ project.name }</h3>
                <p>{ project.summary }</p>
              </div>
              <Link className="pc-open" href={ `/beta/projeler/${ project.slug }` }>
                Projeyi aç
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>

            <Link className="pc-cover" href={ `/beta/projeler/${ project.slug }` } aria-label={ `${ project.name } projesini aç` }>
              <img src={ project.cover.src } alt={ project.cover.alt } loading="lazy" decoding="async" />
            </Link>
          </article>
        )) }

      </div>
    </section>
  )
}
