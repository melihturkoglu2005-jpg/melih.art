"use client"

import type { LightboxItem } from "@/data/lightbox"
import { useLightbox } from "./Lightbox"

type Props = {
  // Bu görselin galerideki kimliği
  id: string
  // Sayfadaki tüm görseller: büyütme penceresinde ok tuşlarıyla bunlar arasında gezilir
  list: LightboxItem[]
  className?: string
  ratio?: string
}

export default function ZoomImage({ id, list, className = "", ratio }: Props) {
  const { open } = useLightbox()
  const work = list.find((item) => item.id === id)

  if (!work) return null

  return (
    <button
      type="button"
      className={ `zoom ${ className }` }
      aria-label={ `${ work.alt }, büyüt` }
      onClick={ (event) => open(id, event.currentTarget, list) }
    >
      <img src={ work.image } alt={ work.alt } loading="lazy" decoding="async" draggable={ false } style={ ratio ? { aspectRatio: ratio } : undefined } />
    </button>
  )
}
