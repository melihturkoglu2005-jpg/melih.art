import type { ReactNode } from "react"
import Contact from "./Contact"
import Footer from "./Footer"
import Header from "./Header"
import { LightboxProvider } from "./Lightbox"
import ScrollEffects from "./ScrollEffects"

// Her sayfada ortak olan çerçeve: üst menü, iletişim bölümü, alt bilgi ve büyütme penceresi.
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <LightboxProvider>
      <ScrollEffects />
      <Header />
      { children }
      <Contact />
      <Footer />
    </LightboxProvider>
  )
}
