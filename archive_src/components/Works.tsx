"use client"

import worksData from "@/data/works.json"
import Image from "next/image"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ImageLightbox from "./ImageLightbox"

type ProjectType = "UI/UX" | "SOCIAL_MEDIA"

const Works = () => {
  const [ activeFilter, setActiveFilter ] = useState<ProjectType>("UI/UX")
  const [ lightboxImage, setLightboxImage ] = useState<{
    src: string
    alt: string
    title?: string
    description?: string
  } | null>(null)

  const filteredWorks = worksData.works.filter(
    (work) => work.type === activeFilter
  )

  const filters: { label: string; value: ProjectType }[] = [
    { label: "Kullanıcı Arayüzü (UI/UX)", value: "UI/UX" },
    { label: "Sosyal Medya", value: "SOCIAL_MEDIA" }
  ]

  return (
    <section id="works" className="py-24 md:py-32 relative bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1"
          >
            <h2 className="font-serif text-4xl md:text-6xl text-neutral-900 dark:text-white mb-4">
              Seçili Çalışmalar
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-lg max-w-md">
              Estetik ve işlevsel grafik tasarım çözümleri.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center gap-2 p-1.5 glass-card shrink-0"
          >
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`relative px-6 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 ${
                  activeFilter === filter.value
                    ? "text-neutral-900 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                {activeFilter === filter.value && (
                  <motion.div
                    layoutId="worksFilterBg"
                    className="absolute inset-0 bg-neutral-200 dark:bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Works Horizontal Scroll */}
        <motion.div layout className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work, index) => (
              <motion.div
                layout
                key={`${work.title}-${index}`}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative shrink-0 w-[85vw] md:w-[50vw] lg:w-[600px] aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer glass-card snap-center"
                onClick={() =>
                  setLightboxImage({
                    src: work.image,
                    alt: work.title,
                    title: work.title,
                    description: work.description
                  })
                }
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <h3 className="text-2xl font-serif text-white mb-2">
                      {work.title}
                    </h3>
                    <p className="text-neutral-300 text-sm line-clamp-2">
                      {work.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ImageLightbox
        isOpen={lightboxImage !== null}
        imageSrc={lightboxImage?.src || ""}
        imageAlt={lightboxImage?.alt || ""}
        projectTitle={lightboxImage?.title}
        projectDescription={lightboxImage?.description}
        onClose={() => setLightboxImage(null)}
      />
    </section>
  )
}

export default Works