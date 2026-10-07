import type { CSSProperties } from "react";
import Link from "next/link";
import type { Block, Project } from "@/data/projects/types";
import { collectImages } from "@/lib/caseImages";
import CaseNav from "./CaseNav";
import { Doodle } from "./Doodles";
import ProductPicker from "./ProductPicker";
import Rich from "./Rich";
import ZoomImage from "./ZoomImage";
import type { LightboxItem } from "@/data/lightbox";

const tintVar = (index: number) =>
  ({ "--d": `${index * 90}ms` }) as CSSProperties;

function BlockView({ block, list }: { block: Block; list: LightboxItem[] }) {
  switch (block.type) {
    case "showcase":
      return (
        <div className={`blk story-showcase story-${block.tone}`}>
          <div className="story-caption" data-reveal>
            <p className="label">{block.label}</p>
            <h2>{block.title}</h2>
            <p>{block.text}</p>
          </div>
          <div
            className={`story-screens${block.screens.some((screen) => screen.device === "browser") ? " has-browser" : ""}`}
          >
            {block.screens.map((screen) => (
              <figure
                className={`story-screen story-${screen.device}`}
                key={screen.image.src}
                data-reveal
              >
                <div className="device-frame">
                  <div className="device-top" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <ZoomImage
                    id={screen.image.src}
                    list={list}
                    ratio={screen.image.ratio}
                  />
                </div>
                <figcaption>{screen.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      );

    case "journey":
      return (
        <div className="blk story-journey">
          <p className="label" data-reveal>
            {block.label}
          </p>
          <h2 className="blk-title" data-reveal>
            {block.title}
          </h2>
          <div className="story-steps">
            {block.items.map((item, index) => (
              <article key={item.title} data-reveal>
                <span className="step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      );

    case "palette":
      return (
        <div className="blk story-palette" data-reveal>
          <div>
            <p className="label">GÖRSEL DİL</p>
            <h2 className="blk-title">{block.title}</h2>
            <p>{block.text}</p>
          </div>
          <div className="palette-swatches">
            {block.colors.map((color) => (
              <div key={color.hex}>
                <span style={{ background: color.hex }} />
                <strong>{color.name}</strong>
                <small>{color.hex}</small>
              </div>
            ))}
          </div>
          <div className="story-type">
            <span>Aa</span>
            <div>
              <strong>Instrument Serif</strong>
              <p>
                Başlıklarda karakter, uzun metinlerde Inter ile rahat okuma.
              </p>
            </div>
          </div>
        </div>
      );

    case "intro":
      return (
        <div className="blk" data-reveal>
          <p className="label">{block.label}</p>
          <h2 className="blk-title">{block.title}</h2>
          <div className="intro-text">
            {block.paragraphs.map((paragraph, index) => (
              <p key={index}>
                <Rich text={paragraph} />
              </p>
            ))}
          </div>
        </div>
      );

    case "cards":
      return (
        <div className="blk">
          <div data-reveal>
            {block.label ? <p className="label">{block.label}</p> : null}
            <h2 className="blk-title">{block.title}</h2>
            {block.subtitle ? (
              <p className="blk-sub">{block.subtitle}</p>
            ) : null}
          </div>
          <div className="c-grid">
            {block.items.map((item, index) => (
              <article
                className="c-card"
                key={item.title}
                data-reveal
                style={tintVar(index)}
              >
                <ZoomImage
                  id={item.image.src}
                  list={list}
                  ratio={item.image.ratio}
                />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      );

    case "features":
      return (
        <div className="blk">
          <p className="label" data-reveal>
            {block.label}
          </p>
          <div className="f-grid">
            {block.items.map((item, index) => (
              <div
                className="f-item"
                key={item.title}
                data-reveal
                style={tintVar(index)}
              >
                <span className="f-icon">
                  <Doodle name={item.icon} width="1.9rem" float />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className="f-images">
            {block.images.map((image, index) => (
              <div key={image.src} data-reveal style={tintVar(index)}>
                <ZoomImage id={image.src} list={list} ratio={image.ratio} />
              </div>
            ))}
          </div>
        </div>
      );

    case "picker":
      return (
        <div className="blk">
          <div className="picker-head" data-reveal>
            <h2 className="blk-title">{block.title}</h2>
            <p className="blk-sub">{block.subtitle}</p>
          </div>
          <ProductPicker items={block.items} list={list} />
        </div>
      );

    case "split":
      return (
        <div className="blk split" data-reveal>
          <h3>{block.title}</h3>
          <p>
            <Rich text={block.text} />
          </p>
        </div>
      );

    case "figure":
      return (
        <figure className="blk figure" data-reveal>
          <ZoomImage
            id={block.image.src}
            list={list}
            ratio={block.image.ratio}
          />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );

    case "takeaways":
      return (
        <div className="blk">
          <div data-reveal>
            <p className="label">{block.label}</p>
            <h2 className="blk-title">{block.title}</h2>
          </div>
          <div className="t-grid">
            {block.items.map((item, index) => (
              <div
                className="t-item"
                key={item.title}
                data-reveal
                style={tintVar(index)}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function ProjectDetail({ project }: { project: Project }) {
  const list = collectImages(project);

  return (
    <main className={`case case-${project.slug}`} id="top">
      <div className="case-layout">
        <aside className="case-side">
          <CaseNav
            items={project.sections.map((section) => ({
              id: section.id,
              nav: section.nav,
            }))}
          />
        </aside>

        <div className="case-main">
          <header className="case-hero">
            <p className="label" data-reveal>
              {project.kicker}
            </p>
            <h1 className="case-title" data-reveal style={tintVar(1)}>
              {project.headline ?? project.title}
            </h1>
            <p className="case-lead" data-reveal style={tintVar(2)}>
              {project.summary}
            </p>

            <dl className="case-meta" data-reveal style={tintVar(3)}>
              <div>
                <dt>Rol</dt>
                <dd>{project.role}</dd>
              </div>
              {project.year ? (
                <div>
                  <dt>Yıl</dt>
                  <dd>{project.year}</dd>
                </div>
              ) : null}
              {project.duration ? (
                <div>
                  <dt>Süre</dt>
                  <dd>{project.duration}</dd>
                </div>
              ) : null}
              <div>
                <dt>Araçlar</dt>
                <dd>{project.tools.join(", ")}</dd>
              </div>
            </dl>

            {project.liveUrl ? (
              <a
                className="btn btn-dark case-live"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Canlı siteyi aç
              </a>
            ) : null}

            <div
              className="case-cover"
              data-reveal
              style={{ ...tintVar(4), "--tint": project.tint } as CSSProperties}
            >
              <ZoomImage
                id={project.cover.src}
                list={list}
                ratio={project.cover.ratio}
              />
            </div>
          </header>

          {project.sections.map((section) => (
            <section
              className="case-section"
              id={section.id}
              key={section.id}
              aria-label={section.nav}
            >
              {section.blocks.map((block, index) => (
                <BlockView key={index} block={block} list={list} />
              ))}
            </section>
          ))}

          <div className="case-end" data-reveal>
            <Doodle name="sparkle" width="2.4rem" float />
            <p>Bu kadar okuduğun için teşekkürler.</p>
            <Link className="btn btn-ghost" href="/beta#projeler">
              Tüm projelere dön
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
