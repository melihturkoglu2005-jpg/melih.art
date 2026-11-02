"use client"

import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { filters, works, type Work, type WorkType } from "@/data/works"
import { Doodle } from "./Doodles"
import { useLightbox } from "./Lightbox"

type Filter = "ALL" | WorkType

const labelOf = (type: WorkType) => filters.find((item) => item.type === type)?.label ?? ""

// Görsellerin oranı bilindiği için sütunlara ölçmeden dağıtılır: her iş, o an en kısa sütuna gider.
// Böylece sıra soldan sağa okunur ve filtre değişince sütunlar dengeli kalır.
function distribute(list: Work[], count: number): Work[][] {
  const columns: Work[][] = Array.from({ length: count }, () => [])
  const heights = new Array<number>(count).fill(0)

  list.forEach((work) => {
    const target = heights.indexOf(Math.min(...heights))
    columns[target].push(work)
    heights[target] += work.height / work.width
  })

  return columns
}

function useColumnCount(landscapeOnly: boolean) {
  const [ count, setCount ] = useState<number | null>(null)

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 960px)")
    const mid = window.matchMedia("(min-width: 600px)")

    const update = () => {
      if (landscapeOnly) setCount(mid.matches ? 2 : 1)
      else setCount(wide.matches ? 3 : 2)
    }

    update()
    wide.addEventListener("change", update)
    mid.addEventListener("change", update)
    return () => {
      wide.removeEventListener("change", update)
      mid.removeEventListener("change", update)
    }
  }, [ landscapeOnly ])

  return count
}

export default function Works() {
  const { open } = useLightbox()
  const [ filter, setFilter ] = useState<Filter>("ALL")

  const available = useMemo(
    () => filters.filter((item) => works.some((work) => work.type === item.type)),
    []
  )

  const visible = useMemo(
    () => (filter === "ALL" ? works : works.filter((work) => work.type === filter)),
    [ filter ]
  )

  const landscapeOnly = visible.every((work) => work.width > work.height)
  const count = useColumnCount(landscapeOnly)
  const columns = useMemo(() => distribute(visible, count ?? 3), [ visible, count ])

  const countOf = (type: Filter) => (type === "ALL" ? works.length : works.filter((work) => work.type === type).length)

  return (
    <section className="work-shelf works" id="calismalar" aria-labelledby="selected-title">
      <h2 className="selected-title" id="selected-title">
        <span className="mark-wrap">
          Seçili Çalışmalarım
          <Doodle name="underline" className="mark" stretch delay={ 500 } />
        </span>
      </h2>

      <div className="works-bar">
        <div className="works-filters" role="group" aria-label="Çalışmaları filtrele">
          { [ { type: "ALL" as Filter, label: "Tümü" }, ...available ].map((item) => (
            <button
              key={ item.type }
              type="button"
              className="chip"
              aria-pressed={ filter === item.type }
              onClick={ () => setFilter(item.type) }
            >
              { item.label }
              <small>{ countOf(item.type) }</small>
            </button>
          )) }
        </div>
      </div>

      <p className="vh" aria-live="polite">{ visible.length } çalışma gösteriliyor</p>

      <div className="works-grid" data-ready={ count !== null ? "" : undefined }>
        { columns.map((column, columnIndex) => (
          <div className="works-col" key={ columnIndex }>
            { column.map((work) => (
              <button
                key={ `${ filter }-${ work.id }` }
                type="button"
                className="tile"
                aria-label={ `${ work.title }, büyüt` }
                style={ { "--n": Math.min(visible.indexOf(work), 10) } as CSSProperties }
                onClick={ (event) => open(work.id, event.currentTarget, visible) }
              >
                <img
                  src={ `/images/works/previews/${ work.id }-640.webp` }
                  srcSet={ `/images/works/previews/${ work.id }-360.webp 360w, /images/works/previews/${ work.id }-640.webp 640w, ${ work.image } ${ work.width }w` }
                  sizes={ landscapeOnly ? "(max-width: 599px) 92vw, (max-width: 1240px) 46vw, 560px" : "(max-width: 959px) 46vw, 380px" }
                  alt={ work.alt }
                  width={ work.width }
                  height={ work.height }
                  loading="lazy"
                  decoding="async"
                  draggable={ false }
                />
                <span className="tile-cap">
                  <strong>{ work.title }</strong>
                  <span>{ labelOf(work.type) }</span>
                </span>
              </button>
            )) }
          </div>
        )) }
      </div>
    </section>
  )
}
