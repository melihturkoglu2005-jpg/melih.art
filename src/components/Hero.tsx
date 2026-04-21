"use client"

import clsx from "clsx"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import IconGlobe from "../assets/icons/globe.svg"
import IconMonitorSmartPhone from "../assets/icons/monitor-smartphone.svg"
import IconMoveRight from "../assets/icons/move-right.svg"
import IconType from "../assets/icons/type.svg"
import IconVariable from "../assets/icons/variable.svg"
import { useProfileStore } from "../stores/useProfileStore"

const Hero = () => {
  const t = useTranslations()
  const { email, cvLink } = useProfileStore()
  const { scrollYProgress } = useScroll()

  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: "-50% 0px" })

  const terms = [
    {
      icon: <IconType className="size-6" />,
      label: t("hero_term_1"),
      className: "rotate-2 right-12 top-0 from-lime-200 to-lime-300 text-lime-700 dark:from-lime-300 dark:to-lime-500 dark:text-lime-900",
      moveX: useTransform(scrollYProgress, [ 0, 0.2 ], [ 0, 120 ]),
      moveY: useTransform(scrollYProgress, [ 0, 0.2 ], [ 0, -80 ])
    },
    {
      icon: <IconMonitorSmartPhone className="size-6" />,
      label: t("hero_term_2"),
      className: "rotate-3 right-28 top-16 from-sky-200 to-sky-300 text-sky-700 dark:from-sky-300 dark:to-sky-500 dark:text-sky-900",
      moveX: useTransform(scrollYProgress, [ 0, 0.2 ], [ 0, -100 ]),
      moveY: useTransform(scrollYProgress, [ 0, 0.2 ], [ 0, 60 ])
    },
    {
      icon: <IconGlobe className="size-6" />,
      label: t("hero_term_3"),
      className: "-rotate-6 right-0 top-14 from-yellow-200 to-yellow-300 text-yellow-700 dark:from-yellow-300 dark:to-yellow-500 dark:text-yellow-900",
      moveX: useTransform(scrollYProgress, [ 0, 0.2 ], [ 0, 80 ]),
      moveY: useTransform(scrollYProgress, [ 0, 0.2 ], [ 0, 100 ])
    },
    {
      icon: <IconVariable className="size-6" />,
      label: t("hero_term_4"),
      className: "rotate-6 right-28 top-8 from-purple-200 to-purple-300 text-purple-700 dark:from-purple-300 dark:to-purple-500 dark:text-purple-900",
      moveX: useTransform(scrollYProgress, [ 0, 0.2 ], [ 0, -90 ]),
      moveY: useTransform(scrollYProgress, [ 0, 0.2 ], [ 0, -70 ])
    }
  ]

  // Mobile terms for horizontal display
  const mobileTerms = [
    { icon: <IconType className="size-4" />, label: t("hero_term_1"), className: "from-lime-200 to-lime-300 text-lime-700 dark:from-lime-300 dark:to-lime-500 dark:text-lime-900" },
    { icon: <IconMonitorSmartPhone className="size-4" />, label: t("hero_term_2"), className: "from-sky-200 to-sky-300 text-sky-700 dark:from-sky-300 dark:to-sky-500 dark:text-sky-900" },
    { icon: <IconGlobe className="size-4" />, label: t("hero_term_3"), className: "from-yellow-200 to-yellow-300 text-yellow-700 dark:from-yellow-300 dark:to-yellow-500 dark:text-yellow-900" },
    { icon: <IconVariable className="size-4" />, label: t("hero_term_4"), className: "from-purple-200 to-purple-300 text-purple-700 dark:from-purple-300 dark:to-purple-500 dark:text-purple-900" }
  ]

  return (
    <section id="hero" className="relative flex items-center justify-center py-4 px-2 overflow-hidden">
      <div className="container flex items-center justify-center lg:h-[calc(100vh-2rem)] pt-28 pb-12 lg:pt-0 lg:pb-0 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 rounded-3xl dark:border-neutral-900">
        <div className="relative flex flex-col px-4 lg:px-20 w-full lg:w-3/4">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-neutral-500 dark:text-neutral-400 text-base lg:text-xl mb-2 lg:mb-4 font-medium tracking-wide uppercase"
          >
            {t("hero_hello")}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl lg:text-6xl lg:leading-[1.1] font-semibold tracking-tight"
          >
            {t("hero_description")}
          </motion.h1>

          {/* Mobile skill tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mt-5 lg:hidden"
          >
            {mobileTerms.map((item, i) => (
              <div key={i} className={clsx("flex items-center gap-1.5 bg-gradient-to-b font-medium py-2 px-4 rounded-xl text-sm select-none", item.className)}>
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-3 mt-6 lg:mt-10"
          >
            <Link
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 px-5 py-3 lg:px-7 lg:py-4 bg-neutral-950 dark:bg-neutral-50 text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-full transition-colors duration-200 ease-out font-medium"
            >
              <span className="text-sm lg:text-base">{t("hero_btn_email")}</span>
              <IconMoveRight className="size-4 lg:size-5" />
            </Link>
            {cvLink && (
              <Link
                href={cvLink}
                target="_blank"
                className="flex items-center justify-center gap-2 px-5 py-3 lg:px-7 lg:py-4 hover:bg-neutral-100 hover:dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full transition-colors duration-200 ease-out font-medium"
              >
                <span className="text-sm lg:text-base">{t("hero_btn_cv")}</span>
              </Link>
            )}
          </motion.div>

          {/* Desktop floating tags */}
          <div ref={containerRef} className="hidden lg:flex relative top-20 -right-20 items-center justify-center">
            {terms.map((item, index) => (
              <motion.div
                key={index}
                style={{ x: item.moveX, y: item.moveY }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                className={clsx("absolute flex items-center gap-2 bg-gradient-to-b font-medium py-3 px-6 rounded-2xl select-none shadow-sm", item.className)}
              >
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero