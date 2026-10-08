"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { profile } from "@/data/profile"

export default function Header() {
  const pathname = usePathname()
  const [ scrolled, setScrolled ] = useState(false)
  const [ section, setSection ] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Ana sayfada ve her sayfanın altında, ekranın ortasındaki bölümü menüde vurgula
  useEffect(() => {
    setSection(null)
    if (!("IntersectionObserver" in window)) return

    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => !entry.isIntersecting && entry.boundingClientRect.top > 0)
        .forEach((entry) => setSection((current) => (current === entry.target.id ? null : current)))
      entries.filter((entry) => entry.isIntersecting)
        .forEach((entry) => setSection(entry.target.id))
    }, { rootMargin: "-45% 0px -50% 0px" })

    const ids = pathname === "/beta" ? [ "projeler", "iletisim" ] : [ "iletisim" ]
    ids.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [ pathname ])

  const onProjects = pathname.startsWith("/beta/projeler") || (pathname === "/beta" && section === "projeler")
  const onAbout = pathname.startsWith("/beta/hakkimda")
  const onContact = section === "iletisim"

  return (
    <header className={ `site-header${ scrolled ? " scrolled" : "" }` }>
      <nav className="bar nav" aria-label="Ana menü">
        <Link className="brand" href="/beta" aria-label={ `${ profile.name }, ana sayfa` }>melih</Link>
        <div className="nav-right">
          <Link href="/beta#projeler" data-active={ onProjects && !onContact }>Projelerim</Link>
          <Link href="/beta/hakkimda" data-active={ onAbout && !onContact }>Hakkımda</Link>
          <a href="#iletisim" data-active={ onContact }>İletişim</a>
        </div>
      </nav>
    </header>
  )
}
