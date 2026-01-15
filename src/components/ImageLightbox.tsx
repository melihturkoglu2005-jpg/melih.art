"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect } from "react"

interface ImageLightboxProps {
  isOpen: boolean
  imageSrc: string
  imageAlt: string
  projectTitle?: string
  projectDescription?: string
  onClose: () => void
}

const ImageLightbox = ({ isOpen, imageSrc, imageAlt, projectTitle, projectDescription, onClose }: ImageLightboxProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
            className="relative w-full h-full p-4 md:p-8 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-neutral-900/80 dark:bg-neutral-100/80 text-neutral-100 dark:text-neutral-900 hover:bg-neutral-900 dark:hover:bg-neutral-100 transition-all duration-200 ease-out backdrop-blur-sm"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full h-full max-w-7xl max-h-[85vh] flex flex-col">
              {/* Image Container */}
              <div className="flex-1 relative min-h-0">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-900/20 dark:bg-neutral-100/5">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                </div>
              </div>

              {/* Project Info */}
              {(projectTitle || projectDescription) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                  className="w-full pt-6 lg:pt-8 px-2 lg:px-0"
                >
                  <div className="max-w-3xl mx-auto space-y-3">
                    {projectTitle && (
                      <h2 className="text-xl lg:text-2xl font-medium text-neutral-100 dark:text-neutral-900 leading-tight">
                        {projectTitle}
                      </h2>
                    )}
                    {projectDescription && (
                      <p className="text-sm lg:text-base text-neutral-400 dark:text-neutral-600 leading-relaxed">
                        {projectDescription}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ImageLightbox
