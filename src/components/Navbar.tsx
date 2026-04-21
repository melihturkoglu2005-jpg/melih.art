"use client"

import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Link as ScrollLink } from "react-scroll"
import IconMoonStar from "../assets/icons/moon-star.svg"
import IconSun from "../assets/icons/sun.svg"
import navbarItemsData from "../data/navbar-items.json"
import { useProfileStore } from "../stores/useProfileStore"
import { useThemeStore } from "../stores/useThemeStore"

const Navbar = () => {
  const { theme, toggleTheme } = useThemeStore()
  const { fullName, avatar } = useProfileStore()

  const [ activeSection, setActiveSection ] = useState<string | null>(null)
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    navbarItemsData.navbar_items.forEach((item) => {
      const section = document.getElementById(item.href.replace("#", ""))
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // Close mobile menu on scroll
  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleScroll = () => setMobileMenuOpen(false)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [ mobileMenuOpen ])

  return (
    <div className="fixed top-0 flex justify-center w-full z-50">
      <div className="container">
        <nav className="flex items-center justify-between my-4 lg:my-6 mx-4 px-4 py-3 bg-white/95 backdrop-blur-sm border border-neutral-100 rounded-full dark:bg-black/95 dark:border-neutral-900">
          <div className="flex items-center gap-2">
            <Image
              src={avatar}
              alt={fullName}
              width={36}
              height={36}
              quality={100}
              className="shrink-0 rounded-full bg-neutral-200 dark:bg-neutral-900"
            />
            <span className="font-semibold text-sm lg:text-base">{fullName}</span>
          </div>
          <ul className="flex items-center gap-1">
            {/* Desktop nav links */}
            <div className="items-center gap-1 lg:flex hidden">
              {navbarItemsData.navbar_items.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "")
                return (
                  <li key={index}>
                    <ScrollLink
                      to={item.href.replace("#", "")}
                      smooth={true}
                      duration={300}
                      offset={-120}
                    >
                      <div className="relative px-3.5 py-1.5 rounded-full cursor-pointer">
                        {isActive && (
                          <motion.div
                            layoutId="activeNavBackground"
                            className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full"
                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                          />
                        )}
                        <span className={clsx(
                          "relative z-10 text-[0.875rem] font-medium transition-colors duration-200 ease-out",
                          isActive
                            ? "text-neutral-950 dark:text-neutral-100"
                            : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                        )}>
                          {item.label}
                        </span>
                      </div>
                    </ScrollLink>
                  </li>
                )
              })}
            </div>

            <li className="mx-1 hidden lg:block" />

            {/* Theme toggle */}
            <li>
              <button
                onClick={toggleTheme}
                className="relative w-12 h-6 flex items-center bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-full transition-colors duration-200 ease-out"
                aria-label="Toggle theme"
              >
                <div
                  className={clsx(
                    "absolute left-px flex items-center justify-center size-5 bg-white dark:bg-neutral-950 rounded-full shadow-sm transition-transform duration-200 ease-out",
                    { "translate-x-6": theme === "dark" }
                  )}
                >
                  {theme === "dark"
                    ? <IconMoonStar className="size-3 text-neutral-300" />
                    : <IconSun className="size-3 text-neutral-600" />
                  }
                </div>
              </button>
            </li>

            {/* Mobile hamburger */}
            <li className="lg:hidden ml-2">
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="flex flex-col items-center justify-center w-8 h-8 gap-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-neutral-800 dark:bg-neutral-200 origin-center"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-5 h-px bg-neutral-800 dark:bg-neutral-200"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-neutral-800 dark:bg-neutral-200 origin-center"
                />
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="lg:hidden mx-4 mb-2 bg-white/95 backdrop-blur-sm border border-neutral-100 dark:bg-black/95 dark:border-neutral-900 rounded-2xl overflow-hidden shadow-lg"
            >
              {navbarItemsData.navbar_items.map((item, index) => {
                const isActive = activeSection === item.href.replace("#", "")
                return (
                  <ScrollLink
                    key={index}
                    to={item.href.replace("#", "")}
                    smooth={true}
                    duration={300}
                    offset={-120}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={clsx(
                      "flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors duration-150",
                      isActive
                        ? "bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-neutral-100 font-medium"
                        : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-950"
                    )}>
                      <span className="text-sm">{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 dark:bg-neutral-100" />}
                    </div>
                  </ScrollLink>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Navbar