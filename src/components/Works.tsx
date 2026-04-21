"use client"

import worksData from "@/data/works.json"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useState } from "react"
import ImageLightbox from "./ImageLightbox"

type ProjectType = "UI/UX" | "SOCIAL_MEDIA"

const Works = () => {
  const t = useTranslations()
  // Default to UI/UX since this is a UI/UX designer portfolio
  const [ activeFilter, setActiveFilter ] = useState<ProjectType>("UI/UX")
  const [ isTransitioning, setIsTransitioning ] = useState(false)
  const [ isMounted, setIsMounted ] = useState(false)
  const [ lightboxImage, setLightboxImage ] = useState<{ src: string; alt: string; title?: string; description?: string } | null>(null)

  const filteredWorks = worksData.works.filter((work) => work.type === activeFilter)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 250)
    return () => clearTimeout(timer)
  }, [ activeFilter, isMounted ])

  const filters: { label: string; value: ProjectType }[] = [
    { label: "UI/UX", value: "UI/UX" },
    { label: "Sosyal Medya", value: "SOCIAL_MEDIA" },
  ]

  return (
    <section id="works" className="flex items-center justify-center py-4">
      <div className="container flex flex-col items-center justify-center py-8 lg:pt-16 lg:pb-32 px-2">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl lg:text-5xl lg:leading-[1] font-semibold tracking-tight text-center lg:w-3/6 mb-5 lg:mb-10"
        >
          {t("works_title")}
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 mb-8 lg:mb-12 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-full"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ease-out ${
                activeFilter === f.value
                  ? "bg-white dark:bg-neutral-950 text-neutral-950 dark:text-neutral-100 shadow-sm"
                  : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
          {filteredWorks.map((work, index) => {
            const aspectRatio = work.type === "SOCIAL_MEDIA" ? "aspect-[4/5]" : "aspect-[4/3]"

            return (
              <motion.div
                key={`${work.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className={`group flex flex-col rounded-2xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 overflow-hidden transition-all duration-300 ease-out hover:border-neutral-200 dark:hover:border-neutral-800 hover:shadow-xl hover:shadow-neutral-200/40 dark:hover:shadow-neutral-900/50 ${
                  isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
                }`}
                style={{ transitionDelay: isTransitioning ? `${index * 30}ms` : "0ms" }}
              >
                {/* Image */}
                <div
                  className={`relative w-full ${aspectRatio} overflow-hidden cursor-pointer`}
                  onClick={() => setLightboxImage({
                    src: work.image,
                    alt: work.title,
                    title: work.title,
                    description: work.description
                  })}
                >
                  <Image
                    src={work.image}
                    alt={work.title}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    fill
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-neutral-900 dark:text-neutral-100">
                      Büyüt
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col p-4 lg:p-5">
                  <h3 className="text-base lg:text-lg font-semibold mb-1.5 text-neutral-900 dark:text-neutral-100">
                    {work.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {work.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
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