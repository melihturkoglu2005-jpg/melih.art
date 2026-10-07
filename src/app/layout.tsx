import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./refresh.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.melih.work"),
  title: {
    default: "Melih Türkoğlu, sosyal medya ve arayüz tasarımcısı",
    template: "%s | Melih Türkoğlu",
  },
  description:
    "Melih Türkoğlu: markalara hayat veren sosyal medya ve arayüz tasarımları. İstanbul. İşe alıma uygun.",
  openGraph: {
    title: "Melih Türkoğlu, sosyal medya ve arayüz tasarımcısı",
    description:
      "Sosyal medya görselleri ve mobil arayüzler. Seçili çalışmalar.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "tr_TR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Belirme animasyonlarını sayfa çizilmeden önce hazırla.
const initScript =
  '(function(){var d=document.documentElement;d.classList.add("js");setTimeout(function(){if(!d.hasAttribute("data-ready"))d.classList.add("no-reveal")},3000)})()';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Caveat+Brush&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
