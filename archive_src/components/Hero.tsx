"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useProfileStore } from "../stores/useProfileStore"
import { Link as ScrollLink } from "react-scroll"

const Hero = () => {
  const { avatar } = useProfileStore()

  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full pt-20 overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-6 max-w-5xl z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [ 0.16, 1, 0.3, 1 ] }}
          className="relative w-24 h-24 md:w-32 md:h-32 mb-8 rounded-full overflow-hidden border border-neutral-200 dark:border-white/10 shadow-xl"
        >
          <Image
            src={avatar}
            alt="Melih Türkoğlu"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [ 0.16, 1, 0.3, 1 ] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">Açık İş Fırsatlarına Uygun</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [ 0.16, 1, 0.3, 1 ] }}
          className="font-serif text-6xl md:text-8xl lg:text-[100px] leading-tight tracking-tight text-neutral-900 dark:text-white mb-6"
        >
          Melih Türkoğlu.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [ 0.16, 1, 0.3, 1 ] }}
          className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl text-balance mb-12 font-light"
        >
          <span className="font-medium text-neutral-900 dark:text-white">Grafik Tasarımcı.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [ 0.16, 1, 0.3, 1 ] }}
          className="flex items-center gap-4"
        >
          <ScrollLink to="contact" smooth={true} duration={500} offset={-50}>
            <button className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-base font-medium rounded-full hover:scale-105 transition-transform duration-300">
              İletişime Geç
            </button>
          </ScrollLink>
        </motion.div>

      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">Aşağı Kaydır</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-300 dark:from-neutral-500 to-transparent" />
      </motion.div>
    </section>
  )
}

export default Hero