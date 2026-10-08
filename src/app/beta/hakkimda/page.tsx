import type { Metadata } from "next"
import AboutPage from "@/components/AboutPage"

export const metadata: Metadata = {
  title: "Hakkımda",
  description: "Melih Türkoğlu: İstanbul Gelişim Üniversitesi Görsel İletişim Tasarımı öğrencisi. Sosyal medya ve arayüz tasarımcısı."
}

export default function Page() {
  return <AboutPage />
}
