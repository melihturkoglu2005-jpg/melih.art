"use client"

import type { Work } from "@/data/works"
import { useLightbox } from "./Lightbox"

type Props = {
  work: Work
  // Kayan şeritteki kopya öğeler ekran okuyuculardan ve Tab'dan gizlenir
  hidden?: boolean
  eager?: boolean
  preview?: boolean
  priority?: boolean
  // Büyütme penceresinde gezinilecek liste (verilmezse tüm çalışmalar)
  list?: Work[]
}

export default function WorkButton({ work, hidden = false, eager = false, preview = false, priority = false, list }: Props) {
  const { open } = useLightbox()

  return (
    <button
      type="button"
      className="work-btn"
      aria-label={ `${ work.title }, büyüt` }
      tabIndex={ hidden ? -1 : 0 }
      onClick={ (event) => open(work.id, event.currentTarget, list) }
    >
      <img
        src={ preview ? `/images/works/previews/${ work.id }-640.webp` : work.image }
        srcSet={ preview ? `/images/works/previews/${ work.id }-360.webp 360w, /images/works/previews/${ work.id }-640.webp 640w` : undefined }
        sizes={ preview ? "(max-width: 812px) 208px, (max-width: 1250px) 26vw, 320px" : undefined }
        alt={ hidden ? "" : work.alt }
        width={ work.width }
        height={ work.height }
        loading={ eager ? "eager" : "lazy" }
        fetchPriority={ priority ? "high" : "auto" }
        decoding="async"
        draggable={ false }
        style={ { aspectRatio: `${ work.width } / ${ work.height }` } }
      />
    </button>
  )
}
