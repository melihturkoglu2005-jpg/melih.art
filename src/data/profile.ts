export type Fact = {
  label: string
  items?: { strong?: string, text: string }[]
  chips?: string[]
}

export const profile = {
  name: "Melih Türkoğlu",
  email: "turkoglumelih@outlook.com",
  city: "İstanbul",
  greeting: "Merhaba! Ben Melih,",
  tagline: "bilgi ve yeteneklerimle markalara hayat veren bir tasarımcıyım.",
  status: "İşe alıma uygun",
  leadStrong: "Teorik bilgiyi kullanıcı odaklı, uygulanabilir çözümlere dönüştürmeyi seviyorum.",
  leadRest: "Figma ve Adobe araçlarıyla marka görselleri, kampanya gönderileri ve mobil arayüzler tasarlıyorum; yapay zekâ destekli iş akışlarını fikirleri hızlıca taslağa dönüştürmek için kullanıyorum.",
  school: { name: "İstanbul Gelişim Üniversitesi", detail: "Görsel İletişim Tasarımı · 3. sınıf" },
  avatar: "/images/avatar.webp",
  social: [
    { label: "Behance", href: "https://www.behance.net/meliht" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/melih-t%C3%BCrko%C4%9Flu-79253a2b3/" }
  ],
  facts: [
    { label: "Eğitim", items: [ { text: "İstanbul Gelişim Üniversitesi, Görsel İletişim Tasarımı. Devam ediyor." } ] },
    {
      label: "Deneyim",
      items: [
        { strong: "Freelance grafik tasarımcı, Mayıs 2024 – şimdi.", text: "Markalar için sosyal medya görselleri ve arayüz tasarımları ürettim." },
        { strong: "Future Scope Uluslararası Film Festivali, video kurgu, 5–6 Aralık 2025.", text: "Etkinlik sırasında gelen ham görüntüleri sosyal medya için hızla videolara dönüştürdüm." }
      ]
    },
    { label: "Araçlar", chips: [ "Figma", "Photoshop", "Illustrator (başlangıç)", "Final Cut Pro", "CapCut" ] },
    {
      label: "Yetkinlikler",
      chips: [ "Sosyal medya içerik tasarımı", "UI/UX tasarımı", "Prototipleme", "Tipografi", "Marka kimliği", "Video kurgu", "Yapay zekâ destekli tasarım" ]
    },
    { label: "Diller", items: [ { text: "Türkçe (ana dil), İngilizce (A2+)" } ] }
  ] as Fact[]
}
