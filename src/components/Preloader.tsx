'use client'

import { useState, useEffect } from 'react'

export default function Preloader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Detect theme on mount
    const checkDark = () => document.documentElement.classList.contains('dark')
    setIsDark(checkDark())

    const observer = new MutationObserver(() => setIsDark(checkDark()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const dismiss = () => {
      setFading(true)
      setTimeout(() => setVisible(false), 500)
    }

    if (document.readyState === 'complete') {
      const t = setTimeout(dismiss, 600)
      return () => {
        clearTimeout(t)
        observer.disconnect()
      }
    }

    window.addEventListener('load', dismiss, { once: true })
    const safety = setTimeout(dismiss, 4000)
    return () => {
      clearTimeout(safety)
      window.removeEventListener('load', dismiss)
      observer.disconnect()
    }
  }, [])

  if (!visible) return null

  const bgColor = isDark ? '#0B0518' : '#FFFFFF'
  const iconColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)'
  const labelColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'
  const dotColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'

  return (
    <div
      id="sdasms-preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor,
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ position: 'relative', width: 56, height: 56 }}>
          <div className="preloader-ring" style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#D72444',
            borderRightColor: '#FF8340',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle className="preloader-dot1" cx="8" cy="10" r="1" fill={dotColor} stroke="none" />
              <circle className="preloader-dot2" cx="12" cy="10" r="1" fill={dotColor} stroke="none" />
              <circle className="preloader-dot3" cx="16" cy="10" r="1" fill={dotColor} stroke="none" />
            </svg>
          </div>
        </div>
        <span style={{
          color: labelColor,
          fontSize: '10px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
        }}>
          Loading
        </span>
      </div>
    </div>
  )
}
