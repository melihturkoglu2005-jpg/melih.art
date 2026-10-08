import { Fragment, type CSSProperties } from "react"
import Link from "next/link"
import { profile } from "@/data/profile"
import { heroWorks } from "@/data/works"
import { HeroArtNarrow, HeroArtWide } from "./HeroArt"
import { Doodle } from "./Doodles"
import WorkButton from "./WorkButton"

const delay = (ms: number) => ({ "--d": `${ ms }ms` }) as CSSProperties

// Kelimeleri tek tek maskeden yukarı kayacak şekilde böler
function Words({ text, start }: { text: string, start: number }) {
  return (
    <>
      { text.split(" ").map((word, index) => (
        <Fragment key={ index }>
          { index > 0 ? " " : null }
          <span className="w" aria-hidden="true">
            <span style={ { "--i": start + index } as CSSProperties }>{ word }</span>
          </span>
        </Fragment>
      )) }
    </>
  )
}

export default function Hero() {
  const greetingWords = profile.greeting.split(" ").length

  return (
    <section className="hero" aria-label="Tanıtım">
      <div className="hero-stage">
        <HeroArtWide />

        <div className="hero-copy" id="hero-inner">
          <p className="badge" data-reveal style={ delay(0) }>
            <span className="dot" aria-hidden="true" />
            { profile.status }
          </p>

          <h1 className="hero-title" aria-label={ `${ profile.greeting } ${ profile.tagline }` }>
            <span className="hl-name"><Words text={ profile.greeting } start={ 0 } /></span>
            { " " }
            <span className="hl-rest"><Words text={ profile.tagline } start={ greetingWords } /></span>
          </h1>

          <div className="hero-actions" data-reveal style={ delay(700) }>
            <a className="btn btn-dark" href="#iletisim">İletişime Geç</a>
            <Link className="btn btn-ghost" href="/beta/hakkimda">Hakkımda</Link>
          </div>

        </div>

        { /* İGÜ ikonunun üzerine gelince açılan kart (konumunu ScrollEffects ayarlar) */ }
        <div className="igu-card" aria-hidden="true" data-open="false">
          <strong>{ profile.school.name }</strong>
          <span>{ profile.school.detail }</span>
        </div>

        <HeroArtNarrow />
      </div>

      <div className="work-shelf">
        <h2 className="selected-title" id="selected-title">
          <span className="mark-wrap">
            Seçili Çalışmalarım
            <Doodle name="underline" className="mark" stretch delay={ 500 } />
          </span>
        </h2>
        <div className="marquee" role="region" aria-labelledby="selected-title">
          <div className="marquee-track">
            { [ ...heroWorks, ...heroWorks ].map((work, index) => {
              const copy = index >= heroWorks.length

              return (
                <figure key={ `${ work.id }-${ copy ? "b" : "a" }` } aria-hidden={ copy || undefined }>
                  <WorkButton work={ work } hidden={ copy } eager preview priority={ index < 2 } />
                </figure>
              )
            }) }
          </div>
        </div>
        <p className="shelf-note">Yakından bakmak için bir çalışmaya dokun.</p>
      </div>
    </section>
  )
}
