import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { Outfit, Playfair_Display } from "next/font/google"
import ThemeProvider from "../components/ThemeProvider"
import "../styles/globals.css"

const sansFont = Outfit({
  subsets: [ "latin" ],
  variable: "--font-sans"
})

const serifFont = Playfair_Display({
  subsets: [ "latin" ],
  variable: "--font-serif"
})

export const metadata: Metadata = {
  title: "Melih Türkoğlu | Grafik Tasarımcı",
  description: "Fikirleri estetik ve akıcı dijital deneyimlere dönüştürüyorum."
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${sansFont.variable} ${serifFont.variable} font-sans antialiased bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen overflow-x-hidden selection:bg-neutral-900/10 dark:selection:bg-neutral-100/10`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}