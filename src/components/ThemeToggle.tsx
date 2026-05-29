'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('sdasms-theme')
    if (stored) {
      const isDark = stored === 'dark'
      setDark(isDark)
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    } else {
      // No saved preference — detect system preference (defaults to light if no preference)
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDark(prefersDark)
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  const toggle = () => {
    // Add transition class for smooth theme change
    document.documentElement.classList.add('theme-transition')
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition')
    }, 400)

    if (dark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('sdasms-theme', 'light')
      setDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('sdasms-theme', 'dark')
      setDark(true)
    }
  }

  // Avoid hydration mismatch — render a placeholder until mounted
  if (!mounted) {
    return (
      <button
        className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center"
        aria-label="Toggle theme"
      >
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white/70" />
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FF8340]/40"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className={`w-4 h-4 sm:w-5 sm:h-5 absolute transition-all duration-300 ${dark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'} text-[#FF8340]`} />
      <Moon className={`w-4 h-4 sm:w-5 sm:h-5 absolute transition-all duration-300 ${dark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'} text-gray-700 dark:text-white/70`} />
    </button>
  )
}
