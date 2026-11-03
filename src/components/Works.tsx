"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react"
import { filters, works, type WorkType } from "@/data/works"
import { Doodle } from "./Doodles"
import { useLightbox } from "./Lightbox"

// Her kategori tek bir sıra: aynı yükseklikte, kendi formatında (dikey ya da yatay) ve elle kaydırılır.
export default function Works() {
  const { open } = useLightbox()
  const railRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ on: false, x: 0, left: 0, moved: false })

  const categories = useMemo(
    () => filters
      .map((item) => ({ ...item, items: works.filter((work) => work.type === item.type) }))
      .filter((item) => item.items.length > 0),
    []
  )

  const [ active, setActive ] = useState<WorkType>(categories[0].type)
  const [ pos, setPos ] = useState({ p: 0, thumb: 1, start: true, end: false })

  const current = categories.find((item) => item.type === active) ?? categories[0]
  const landscape = current.items.every((work) => work.width > work.height)

  const measure = useCallback(() => {
    const el = railRef.current
    if (!el) return

    const max = el.scrollWidth - el.clientWidth
    setPos({
      p: max > 0 ? el.scrollLeft / max : 0,
      thumb: Math.min(1, el.clientWidth / el.scrollWidth),
      start: el.scrollLeft < 4,
      end: el.scrollLeft > max - 4
    })
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [ active, measure ])

  const step = (direction: number) => {
    const el = railRef.current
    const tile = el?.querySelector("figure")
    if (!el || !tile) return

    const width = tile.getBoundingClientRect().width + 16
    const visible = Math.max(1, Math.floor(el.clientWidth / width))
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({ left: direction * width * visible, behavior: smooth ? "smooth" : "auto" })
  }

  // Fareyle tutup sürükleme (dokunmatik ve izleme yüzeyi zaten kendi kayar)
  const onDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = railRef.current
    if (!el || event.pointerType !== "mouse" || event.button !== 0) return
    drag.current = { on: true, x: event.clientX, left: el.scrollLeft, moved: false }
  }

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = railRef.current
    if (!el || !drag.current.on) return

    const delta = event.clientX - drag.current.x
    if (!drag.current.moved && Math.abs(delta) > 5) {
      drag.current.moved = true
      el.classList.add("dragging")
    }
    if (drag.current.moved) el.scrollLeft = drag.current.left - delta
  }

  const onUp = () => {
    drag.current.on = false
    railRef.current?.classList.remove("dragging")
  }

  const hasOverflow = pos.thumb < 1

  return (
    <section className="work-shelf works" id="calismalar" aria-labelledby="selected-title">
      <h2 className="selected-title" id="selected-title">
        <span className="mark-wrap">
          Seçili Çalışmalarım
          <Doodle name="underline" className="mark" stretch delay={ 500 } />
        </span>
      </h2>

      <div className="works-stage">
        <div className="works-toolbar">
          <div className="cats" role="group" aria-label="Çalışma kategorileri">
            { categories.map((item) => (
              <button
                key={ item.type }
                type="button"
                className="cat"
                aria-pressed={ active === item.type }
                onClick={ () => setActive(item.type) }
              >
                <span className="cat-name">{ item.label }<sup>{ item.items.length }</sup></span>
              </button>
            )) }
          </div>
          <p className="works-description">{ current.blurb }</p>
        </div>

        <div className="rail-wrap">
          <div
            key={ active }
            ref={ railRef }
            className={ `rail${ landscape ? " land" : "" }` }
            data-end={ pos.end ? "" : undefined }
            tabIndex={ 0 }
            role="region"
            aria-label={ `${ current.label } çalışmaları, yatay kaydırılır` }
            onScroll={ measure }
            onPointerDown={ onDown }
            onPointerMove={ onMove }
            onPointerUp={ onUp }
            onPointerLeave={ onUp }
            onPointerCancel={ onUp }
            onClickCapture={ (event) => {
              if (drag.current.moved) {
                event.preventDefault()
                event.stopPropagation()
              }
            } }
          >
            { current.items.map((work) => (
              <figure key={ work.id } className="tile" style={ { "--r": work.width / work.height } as CSSProperties }>
                <button
                  type="button"
                  className="tile-btn"
                  aria-label={ `${ work.title }, büyüt` }
                  onClick={ (event) => open(work.id, event.currentTarget, current.items) }
                >
                  <img
                    src={ `/images/works/previews/${ work.id }-640.webp` }
                    srcSet={ `/images/works/previews/${ work.id }-360.webp 360w, /images/works/previews/${ work.id }-640.webp 640w, ${ work.image } ${ work.width }w` }
                    sizes={ landscape ? "(max-width: 700px) 86vw, 600px" : "(max-width: 700px) 76vw, 340px" }
                    alt={ work.alt }
                    width={ work.width }
                    height={ work.height }
                    loading="lazy"
                    decoding="async"
                    draggable={ false }
                  />
                </button>
                <figcaption>{ work.title }</figcaption>
              </figure>
            )) }
          </div>

          <div className="rail-ctrl" hidden={ !hasOverflow }>
            <div className="rail-bar" aria-hidden="true">
              <span style={ { width: `${ pos.thumb * 100 }%`, left: `${ pos.p * (1 - pos.thumb) * 100 }%` } } />
            </div>
            <button type="button" className="step" onClick={ () => step(-1) } disabled={ pos.start } aria-label="Önceki çalışmalar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button type="button" className="step" onClick={ () => step(1) } disabled={ pos.end } aria-label="Sonraki çalışmalar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
