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

  return (
    <section id="works" className="flex items-center justify-center py-4">
      <div className="container flex flex-col items-center justify-center py-8 lg:pt-16 lg:pb-32 px-2">
        <h2 className="text-3xl lg:text-5xl lg:leading-[1] font-medium text-center lg:w-3/6 mb-5 lg:mb-10">
          {t("works_title")}
        </h2>

        {/* Filter Buttons */}
        <div className="flex items-center gap-3 mb-8 lg:mb-12">
          <button
            onClick={() => setActiveFilter("SOCIAL_MEDIA")}
            className={`px-6 py-3 rounded-full text-sm lg:text-base font-medium transition-all duration-200 ease-out ${activeFilter === "SOCIAL_MEDIA"
              ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 shadow-md"
              : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
            }`}
          >
            Sosyal Medya
          </button>
          <button
            onClick={() => setActiveFilter("UI/UX")}
            className={`px-6 py-3 rounded-full text-sm lg:text-base font-medium transition-all duration-200 ease-out ${activeFilter === "UI/UX"
              ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 shadow-md"
              : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800"
            }`}
          >
            UI/UX
          </button>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {filteredWorks.map((work, index) => {
            const aspectRatio = work.type === "SOCIAL_MEDIA" ? "aspect-[4/5]" : "aspect-[4/3]"

            return (
              <div
                key={`${work.title}-${index}`}
                className={`flex flex-col rounded-3xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 overflow-hidden transition-opacity duration-300 ease-out hover:shadow-lg hover:shadow-neutral-200/30 dark:hover:shadow-neutral-900/30 ${isTransitioning ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  transitionDelay: isTransitioning ? `${index * 30}ms` : "0ms"
                }}
              >
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
                    className="object-cover transition-transform duration-300 ease-out hover:scale-[1.03]"
                    fill
                  />
                </div>
                <div className="flex flex-col p-5 lg:p-6">
                  <h3 className="text-xl lg:text-2xl mb-2 font-medium transition-colors duration-200 ease-out hover:text-neutral-900 dark:hover:text-neutral-100">
                    {work.title}
                  </h3>
                  <p className="text-sm lg:text-base text-neutral-500 dark:text-neutral-400 line-clamp-3">
                    {work.description}
                  </p>
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
        projectTitle={lightboxImage?.title}
        projectDescription={lightboxImage?.description}
        onClose={() => setLightboxImage(null)}
      />
    </section>
  )
}

export default Works