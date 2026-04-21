"use client"

import skillsData from "@/data/skills.json"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

const skillCardColors = [
  {
    header: "bg-gradient-to-r from-lime-300 to-lime-200 dark:from-lime-500 dark:to-lime-400",
    headerText: "text-lime-900",
    border: "border-lime-200 dark:border-lime-700",
    dot: "bg-lime-400 dark:bg-lime-500",
  },
  {
    header: "bg-gradient-to-r from-purple-300 to-purple-200 dark:from-purple-500 dark:to-purple-400",
    headerText: "text-purple-900",
    border: "border-purple-200 dark:border-purple-700",
    dot: "bg-purple-400 dark:bg-purple-500",
  },
  {
    header: "bg-gradient-to-r from-sky-300 to-sky-200 dark:from-sky-500 dark:to-sky-400",
    headerText: "text-sky-900",
    border: "border-sky-200 dark:border-sky-700",
    dot: "bg-sky-400 dark:bg-sky-500",
  },
]

const Skills = () => {
  const t = useTranslations()

  return (
    <section id="skills" className="flex items-center justify-center py-4">
      <div className="container flex flex-col items-center justify-center py-12 px-2 lg:pt-24 lg:pb-32">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl lg:text-5xl lg:leading-[1] font-semibold text-center w-5/6 lg:w-3/6 mb-12 lg:mb-16 tracking-tight"
        >
          {t("skills_title")}
        </motion.h2>

        {/* Grid layout — no overlapping */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full max-w-4xl">
          {skillsData.skills.map((category, index) => {
            const colors = skillCardColors[index] ?? skillCardColors[0]

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
                className={`rounded-2xl border overflow-hidden bg-white dark:bg-neutral-950 shadow-sm ${colors.border}`}
              >
                {/* Card header */}
                <div className={`flex items-center gap-2 px-5 py-3.5 ${colors.header}`}>
                  <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  <p className={`font-semibold text-sm tracking-wide ${colors.headerText}`}>{category.title}</p>
                </div>
                {/* Skill list */}
                <ul className="divide-y divide-neutral-100 dark:divide-neutral-900">
                  {category.skills.map((skill, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 px-5 py-3 text-sm lg:text-base text-neutral-700 dark:text-neutral-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills