"use client"

import worksData from "@/data/works.json"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useState } from "react"
import ImageLightbox from "./ImageLightbox"

type ProjectType = "UI/UX" | "SOCIAL_MEDIA"

const Works = () => {
  const t = useTranslations()
  const [activeFilter, setActiveFilter] = useState<ProjectType>("SOCIAL_MEDIA")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const filteredWorks = worksData.works.filter((work) => work.type === activeFilter)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 250)
    return () => clearTimeout(timer)
  }, [activeFilter, isMounted])

  return (
    <section id="works" className="flex items-center justify-center py-4">
      <div className="container flex flex-col items-center justify-center py-8 lg:pt-16 lg:pb-32 px-2">
        <h2 className="text-3xl lg:text-5xl lg:leading-[1] font-medium text-center lg:w-3/6 mb-5 lg:mb-10">
          {t("works_title")}
        </h2>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3 mb-8 lg:mb-12">
          {(["SOCIAL_MEDIA", "UI/UX"] as ProjectType[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full text-sm lg:text-base font-medium transition-all duration-200 ease-out ${activeFilter === filter
                  ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 shadow-md"
                  : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
            >
              {filter === "SOCIAL_MEDIA" ? "Sosyal Medya" : "UI/UX"}
            </button>
          ))}
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {filteredWorks.map((work, index) => {
            const aspectRatio = work.type === "SOCIAL_MEDIA" ? "aspect-[4/5]" : "aspect-[4/3]"

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
                <div className={`relative w-full ${aspectRatio} overflow-hidden`}>
                  <Image
                    src={work.image}
                    alt={work.title}
                    className={`object-cover transition-transform duration-500 ease-out ${hoveredIndex === index ? "scale-[1.05]" : "scale-100"
                      }`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Title overlay - only visible on hover */}
                  <div
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out flex items-end ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <div className="p-5 lg:p-6 w-full">
                      <h3 className="text-base lg:text-lg font-medium text-white leading-snug">
                        {work.title}
                      </h3>
                    </div>
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