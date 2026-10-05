"use client"

import Link from "next/link"
import IconBehance from "../assets/icons/behance.svg"
import IconGithub from "../assets/icons/github.svg"
import IconLinkedIn from "../assets/icons/linkedin.svg"
import IconMoveRight from "../assets/icons/move-right.svg"
import { useProfileStore } from "../stores/useProfileStore"
import { motion } from "framer-motion"

const Footer = () => {
  const { email, social } = useProfileStore()

  return (
    <footer id="contact" className="relative pt-32 pb-8 overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 md:p-24 flex flex-col items-center text-center mb-12 relative overflow-hidden bg-white/50 dark:bg-neutral-900/50"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-neutral-900 dark:text-white mb-6 leading-tight">
            Yeni bir proje mi?<br/>
            <span className="text-neutral-500">Birlikte tasarlayalım.</span>
          </h2>
          
          <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-xl mb-12">
            Fikirlerinizi hayata geçirmek ve kullanıcı odaklı harika dijital deneyimler yaratmak için iletişime geçin.
          </p>
          
          <Link 
            href={`mailto:${email}`} 
            className="group relative inline-flex items-center justify-center gap-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full px-10 py-5 text-lg font-medium overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10">Bana Ulaşın</span>
            <IconMoveRight className="w-6 h-6 relative z-10 transition-transform group-hover:translate-x-2" />
          </Link>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-neutral-200 dark:border-white/10">
          <p className="text-sm text-neutral-500">
            © 2024 Melih Türkoğlu. Tüm hakları saklıdır.
          </p>
          
          <div className="flex items-center gap-4">
            {social.map((item, index) => {
              const icon = {
                github: <IconGithub className="w-5 h-5" />,
                behance: <IconBehance className="w-5 h-5" />,
                linkedin: <IconLinkedIn className="w-5 h-5" />
              }[item.platform.toLocaleLowerCase()]

              return (
                <Link 
                  key={index} 
                  href={item.link} 
                  target="_blank" 
                  title={item.platform} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-all"
                >
                  {icon}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer