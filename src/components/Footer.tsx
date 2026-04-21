"use client"

import IconSparkles from "@/assets/icons/sparkles.svg"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import Link from "next/link"
import IconBehance from "../assets/icons/behance.svg"
import IconGithub from "../assets/icons/github.svg"
import IconLinkedIn from "../assets/icons/linkedin.svg"
import IconMoveRight from "../assets/icons/move-right.svg"
import { useProfileStore } from "../stores/useProfileStore"

const Footer = () => {
  const t = useTranslations()
  const { email, social, cvLink } = useProfileStore()

  return (
    <footer id="connect" className="flex items-center justify-center lg:py-4 p-2 pb-4">
      <div className="container flex flex-col p-6 lg:px-20 lg:py-24 border border-neutral-100 rounded-3xl dark:border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start"
        >
          <h2 className="flex flex-col gap-4 lg:gap-6 text-2xl lg:text-5xl font-semibold tracking-tight lg:leading-[1.1] lg:w-4/6 mb-8 lg:mb-12">
            <span>{t("footer_ready_title")}</span>
            <span className="flex items-center gap-2">
              {t("footer_build_title")}
              <IconSparkles className="fill-yellow-400 stroke-yellow-400 dark:fill-yellow-500 dark:stroke-yellow-500 size-8 hidden lg:inline-block" />
            </span>
          </h2>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-2 px-6 py-3.5 lg:px-8 lg:py-4 bg-neutral-950 dark:bg-neutral-50 text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-full transition-colors duration-200 ease-out font-medium"
            >
              <span className="text-sm lg:text-base">{t("footer_btn_email")}</span>
              <IconMoveRight className="size-5" />
            </Link>
          </div>
        </motion.div>

        <hr className="my-10 lg:my-14 border-neutral-100 dark:border-neutral-900" />

        <div className="flex lg:flex-row flex-col lg:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-2">{t("footer_connect")}</p>
            <Link href={`mailto:${email}`} className="text-base lg:text-lg hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-150">
              {email}
            </Link>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3">{t("footer_social")}</p>
            <div className="flex flex-wrap gap-2">
              {social.map((item, index) => {
                const icon = {
                  github: <IconGithub className="size-4 lg:size-5" />,
                  behance: <IconBehance className="size-4 lg:size-5" />,
                  linkedin: <IconLinkedIn className="size-4 lg:size-5" />
                }[item.platform.toLocaleLowerCase()]

                return (
                  <Link
                    key={index}
                    href={item.link}
                    target="_blank"
                    title={item.platform}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 ease-out text-sm font-medium"
                  >
                    {icon}
                    <span>{item.platform}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-10 lg:mt-14">
          © {new Date().getFullYear()} Melih Türkoğlu. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  )
}

export default Footer