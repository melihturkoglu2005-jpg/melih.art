"use client"

import clsx from "clsx"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link as ScrollLink } from "react-scroll"
import navbarItemsData from "../data/navbar-items.json"
import IconMoonStar from "../assets/icons/moon-star.svg"
import IconSun from "../assets/icons/sun.svg"
import { useThemeStore } from "../stores/useThemeStore"

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useThemeStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
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

  return (
    <div className="fixed top-0 flex justify-center w-full z-50 px-4 mt-6">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "flex items-center gap-1 md:gap-2 p-1.5 rounded-full transition-all duration-500",
          isScrolled ? "glass-card" : "bg-transparent"
        )}
      >
        {navbarItemsData.navbar_items.map((item, index) => {
          const isActive = activeSection === item.href.replace("#", "")
          return (
            <ScrollLink
              key={index}
              to={item.href.replace("#", "")}
              smooth={true}
              duration={500}
              offset={-50}
            >
              <div className="relative px-4 md:px-5 py-2.5 rounded-full cursor-pointer group">
                {isActive && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 bg-neutral-200 dark:bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={clsx(
                  "relative z-10 text-sm font-medium transition-colors duration-300",
                  isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                )}>
                  {item.label}
                </span>
              </div>
            </ScrollLink>
          )
        })}
        
        {/* Theme Toggle in Navbar */}
        <div className="ml-2 pl-2 border-l border-neutral-200 dark:border-white/10">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors"
          >
            {theme === "dark" ? <IconSun className="w-5 h-5" /> : <IconMoonStar className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>
    </div>
  )
}

export default Navbar