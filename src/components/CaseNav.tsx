"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type Item = { id: string, nav: string }

// Proje sayfasının solundaki yapışkan menü. Bulunduğun bölüm vurgulanır.
// Dar ekranlarda başlığın altında yatay kaydırılan bir şerit olur.
export default function CaseNav({ items }: { items: Item[] }) {
  const [ active, setActive ] = useState(items[0]?.id ?? "")

  // Ekranın üst kısmına en son ulaşan bölüm "aktif" sayılır; en üstteyken ilk bölüm aktiftir
  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let current = items[0]?.id ?? ""

      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element && element.getBoundingClientRect().top <= line) current = item.id
      })

      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ items ])

  return (
    <nav className="case-nav" aria-label="Proje bölümleri">
      <Link className="case-back" href="/beta#projeler">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
        Geri
      </Link>

      <ul>
        { items.map((item) => (
          <li key={ item.id }>
            <a href={ `#${ item.id }` } data-active={ active === item.id } aria-current={ active === item.id ? "true" : undefined }>{ item.nav }</a>
          </li>
        )) }
      </ul>
    </nav>
  )
}
