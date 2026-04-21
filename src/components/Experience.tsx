"use client"

import experienceData from "@/data/experience.json"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const Experience = () => {
  const t = useTranslations()

  return (
    <section id="experience" className="flex items-center justify-center py-4">
      <div className="container flex flex-col items-center justify-center py-8 px-2 lg:pt-16 lg:pb-24">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl lg:text-5xl leading-tight font-semibold text-center lg:w-3/6 mb-10 lg:mb-16 tracking-tight"
        >
          {t("experience_title")}
        </motion.h2>

        <div className="relative w-full max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 -translate-x-1/2" />

          {experienceData.experience.map((item, index) => {
            const isRight = index % 2 === 0

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isRight ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`relative flex items-center mb-10 last:mb-0 ${isRight ? "lg:flex-row-reverse" : "lg:flex-row"} flex-row pl-12 lg:pl-0`}
              >
                {/* Dot on the line */}
                <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neutral-950 dark:bg-neutral-100 border-2 border-white dark:border-black ring-2 ring-neutral-200 dark:ring-neutral-800 z-10" />

                {/* Card */}
                <div className={`lg:w-[calc(50%-2rem)] ${isRight ? "lg:mr-auto" : "lg:ml-auto"} lg:pr-0 lg:pl-0`}>
                  <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 rounded-2xl px-5 py-4 hover:border-neutral-200 dark:hover:border-neutral-800 transition-colors duration-200">
                    <p className="text-xs font-medium text-neutral-400 dark:text-neutral-500 mb-1.5 tracking-wide uppercase">{item.date}</p>
                    <h3 className="text-lg lg:text-xl font-semibold text-neutral-950 dark:text-neutral-100">{item.company}</h3>
                    {(item as { company: string; date: string; role?: string }).role && (
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{(item as { company: string; date: string; role?: string }).role}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience