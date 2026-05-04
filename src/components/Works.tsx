"use client"

import worksData from "@/data/works.json"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useState } from "react"
import ImageLightbox from "./ImageLightbox"

type ProjectType = "UI/UX" | "SOCIAL_MEDIA"

const Works = () => {
  const t = useTranslations()
  const [ activeFilter, setActiveFilter ] = useState<ProjectType>("SOCIAL_MEDIA")
  const [ isTransitioning, setIsTransitioning ] = useState(false)
  const [ isMounted, setIsMounted ] = useState(false)
  const [ lightboxImage, setLightboxImage ] = useState<{ src: string; alt: string } | null>(null)
  const [ hoveredIndex, setHoveredIndex ] = useState<number | null>(null)

  const filteredWorks = worksData.works.filter((work) => work.type === activeFilter)

  useEffect(() => {
    setIsMounted(true)
  }, [ ])

  useEffect(() => {
    if (!isMounted) return
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [ activeFilter, isMounted ])

  return (
    <section id="works" className="flex items-center justify-center py-4">
      <div className="container flex flex-col items-center justify-center py-8 lg:pt-16 lg:pb-32 px-2">

        <h2 className="text-3xl lg:text-5xl lg:leading-[ 1 ] font-medium text-center lg:w-3/6 mb-5 lg:mb-12">
          {t("works_title")}
        </h2>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 mb-10 lg:mb-14 p-1 rounded-full bg-neutral-100 dark:bg-neutral-900">
          {([ "SOCIAL_MEDIA", "UI/UX" ] as ProjectType[ ]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm lg:text-base font-medium transition-all duration-250 ease-out ${activeFilter === filter
                ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 shadow-sm"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
              }`}
            >
              {filter === "SOCIAL_MEDIA" ? "Sosyal Medya" : "UI/UX"}
            </button>
          ))}
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 w-full">
          {filteredWorks.map((work, index) => {
            const aspectRatio = work.type === "SOCIAL_MEDIA" ? "aspect-[ 4/5 ]" : "aspect-[ 4/3 ]"
            const isHovered = hoveredIndex === index

            return (
              <div
                key={`${work.title}-${index}`}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out ${isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
                style={{ transitionDelay: isTransitioning ? `${index * 40}ms` : `${index * 20}ms` }}
                onClick={() => setLightboxImage({ src: work.image, alt: work.title })}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                <div className={`relative w-full ${aspectRatio} overflow-hidden bg-neutral-100 dark:bg-neutral-900`}>
                  <Image
                    src={work.image}
                    alt={work.title}
                    className={`object-cover transition-transform duration-500 ease-out ${isHovered ? "scale-[ 1.06 ]" : "scale-100"}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Gradient overlay - only show on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ease-out ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Title - only show on hover */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-5 lg:p-6 transition-all duration-300 ease-out ${isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
                    }`}
                  >
                    <h3 className="text-base lg:text-lg font-medium text-white leading-snug drop-shadow-sm">
                      {work.title}
                    </h3>
                  </div>

                  {/* Expand icon */}
                  <div
                    className={`absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 ease-out ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      <ImageLightbox
        isOpen={lightboxImage !== null}
        imageSrc={lightboxImage?.src || ""}
        imageAlt={lightboxImage?.alt || ""}
        onClose={() => setLightboxImage(null)}
      />
    </section>
  )
}

export default Works
