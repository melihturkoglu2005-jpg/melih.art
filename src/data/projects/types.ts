import type { DoodleName } from "@/components/Doodles"

// Bir görsel. ratio isteğe bağlıdır (ör. "16 / 10"); verirsen sayfa yüklenirken yer zıplamaz.
export type Img = {
  src: string
  alt: string
  ratio?: string
}

// Proje sayfası, alt alta dizilen "blok"lardan oluşur. Her bloğun türü `type` alanıyla belirlenir.
export type Block =
  | { type: "showcase", tone: "blue" | "sage" | "peach" | "lavender", label: string, title: string, text: string, screens: { image: Img, device: "phone" | "browser", caption: string }[] }
  | { type: "journey", label: string, title: string, items: { title: string, text: string }[] }
  | { type: "palette", title: string, text: string, colors: { hex: string, name: string }[] }

  // Küçük etiket + büyük başlık + paragraflar
  | { type: "intro", label: string, title: string, paragraphs: string[] }
  // Ortalı başlık + üç kart (görsel, başlık, açıklama)
  | { type: "cards", label?: string, title: string, subtitle?: string, items: { title: string, text: string, image: Img }[] }
  // Küçük etiket + üç ikonlu madde + altında üç görsel
  | { type: "features", label: string, items: { icon: DoodleName, title: string, text: string }[], images: Img[] }
  // Tıklanabilir kartlar: seçilen kartın büyük önizlemesi altta açılır
  | { type: "picker", title: string, subtitle: string, items: { title: string, text: string, thumb: Img, preview: Img }[] }
  // Solda kalın başlık, sağda açıklama. Metinde **kalın** yazabilirsin.
  | { type: "split", title: string, text: string }
  // Tam genişlikte görsel
  | { type: "figure", image: Img, caption?: string }
  // Numaralı kısa maddeler
  | { type: "takeaways", label: string, title: string, items: { title: string, text: string }[] }

export type Section = {
  // Sayfa içi bağlantı adı (adres çubuğunda #problem gibi görünür) — küçük harf, boşluksuz
  id: string
  // Soldaki menüde görünen ad
  nav: string
  blocks: Block[]
}

export type Project = {
  // Adres: /beta/projeler/<slug>
  slug: string
  // Sayfanın büyük başlığı
  title: string
  headline?: string
  // Ana sayfadaki kartın başlığı ve açıklaması
  cardTitle: string
  summary: string
  // Başlığın üstündeki küçük etiket
  kicker: string
  // Kartın sol üstündeki küçük kare işaret (1-2 harf), yanındaki ad ve sağ üstteki etiketler
  mark: string
  name: string
  tags: string[]
  // Kart altındaki satır, ör. "Ürün Tasarımcısı, 2026"
  meta: string
  // Üst bilgi tablosu
  role: string
  year?: string
  duration?: string
  tools: string[]
  // Kapak: hem kartta hem sayfanın üstünde görünür
  cover: Img
  // Kapağın arkasındaki pastel renk (kartta görsel boşluk bırakırsa görünür)
  tint: string
  liveUrl?: string
  sections: Section[]
}
