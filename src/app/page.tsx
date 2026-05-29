'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  Shield,
  Zap,
  Sparkles,
  MessageSquare,
  Bell,
  Megaphone,
  Heart,
  Users,
  Church,
  BookOpen,
  TrendingUp,
  Music,
  Stethoscope,
  GraduationCap,
  HandHeart,
  CalendarCheck,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

/* ─── Hero Slide Data ─────────────────────────────────────── */

const HERO_SLIDES = [
  {
    id: 'sabbath',
    badge: 'Church Announcements',
    badgeIcon: Church,
    heading: ['Reach your people', 'in an instant'],
    subtitle: 'Keep your congregation informed with instant Sabbath reminders, service updates, and important church notices delivered straight to their phones.',
    ctaPrimary: 'Send SMS',
    ctaPrimaryHref: '/get-started',
    ctaSecondary: 'Use Cases',
    ctaSecondaryHref: '/use-cases',
    phone: {
      senderId: 'ARUSHA SDA',
      color: '#D72444',
      time: '9:41 AM',
      messages: [
        'Happy Sabbath! 🕊️',
        '"Remember the Sabbath day, to keep it holy."',
        '— Exodus 20:8',
        'May God bless you with peace and joy today. 🙏',
      ],
      highlightIdx: 1,
    },
  },
  {
    id: 'hospital',
    badge: 'Healthcare & Appointments',
    badgeIcon: Stethoscope,
    heading: ['Healing starts', 'with a reminder'],
    subtitle: 'Send appointment reminders, health tips, and follow-up messages to patients — keeping your community healthy and informed through SMS.',
    ctaPrimary: 'Setup SMS',
    ctaPrimaryHref: '/get-started',
    ctaSecondary: 'Features',
    ctaSecondaryHref: '/features',
    phone: {
      senderId: 'QW HOSPITAL',
      color: '#0EA5E9',
      time: '8:00 AM',
      messages: [
        'Appointment Reminder 🏥',
        'Your check-up is tomorrow at 10:30 AM.',
        'Dr. Mwangi — Room 4B.',
        'Reply 1 to confirm or 2 to reschedule.',
      ],
      highlightIdx: 1,
    },
  },
  {
    id: 'youth-gospel',
    badge: 'Youth Gospel Ministry',
    badgeIcon: Music,
    heading: ['Awaken young hearts', 'with gospel fire'],
    subtitle: 'Inspire young hearts with gospel event invites, worship night reminders, and ministry updates that ignite faith and fellowship.',
    ctaPrimary: 'Engage Youth',
    ctaPrimaryHref: '/get-started',
    ctaSecondary: 'Pricing',
    ctaSecondaryHref: '/pricing',
    phone: {
      senderId: 'ALABASTER',
      color: '#A855F7',
      time: '5:30 PM',
      messages: [
        'Worship Night This Friday! 🎶🔥',
        '"Arise, shine, for your light has come!"',
        '— Isaiah 60:1',
        'Bring a friend. God is moving! ✨',
      ],
      highlightIdx: 1,
    },
  },
  {
    id: 'professionals',
    badge: 'Professional Community',
    badgeIcon: TrendingUp,
    heading: ['Lead with purpose', 'grow with faith'],
    subtitle: 'Connect Adventist professionals and entrepreneurs with networking events, business forums, and community updates that empower growth.',
    ctaPrimary: 'Connect',
    ctaPrimaryHref: '/get-started',
    ctaSecondary: 'Learn More',
    ctaSecondaryHref: '/features',
    phone: {
      senderId: 'ATAPE DAR',
      color: '#F59E0B',
      time: '11:15 AM',
      messages: [
        'Business Forum This Saturday! 💼',
        'Topic: Faith-Driven Entrepreneurship.',
        'Venue: KICC Hall, 2:00 PM.',
        'Network. Grow. Glorify God. 🙏',
      ],
      highlightIdx: 2,
    },
  },
  {
    id: 'students',
    badge: 'Student Fellowship',
    badgeIcon: GraduationCap,
    heading: ['No student walks', 'this path alone'],
    subtitle: 'Keep Adventist students connected with campus fellowship updates, study groups, and spiritual events that strengthen faith on campus.',
    ctaPrimary: 'Reach Students',
    ctaPrimaryHref: '/get-started',
    ctaSecondary: 'How It Works',
    ctaSecondaryHref: '/why-sdasms',
    phone: {
      senderId: 'TUCASA',
      color: '#10B981',
      time: '7:30 PM',
      messages: [
        'Campus Fellowship Tonight! 📖',
        'Bible Study: "Faith on Campus"',
        'Venue: Student Center, 8:00 PM.',
        'Come as you are — you belong here! 💚',
      ],
      highlightIdx: 2,
    },
  },
  {
    id: 'alert',
    badge: 'Emergency Alerts',
    badgeIcon: Bell,
    heading: ['Send urgent alerts', 'in mere seconds'],
    subtitle: 'Send time-sensitive alerts for emergencies, cancellations, or critical updates to ensure your community stays safe and informed.',
    ctaPrimary: 'Setup Alerts',
    ctaPrimaryHref: '/get-started',
    ctaSecondary: 'Features',
    ctaSecondaryHref: '/features',
    phone: {
      senderId: 'SDA ALERT',
      color: '#EF4444',
      time: '7:05 AM',
      messages: [
        '⚠️ URGENT NOTICE',
        'Sunday service moved to 10:00 AM due to road works on Moshi Rd.',
        'Please share with your family groups.',
        'Stay safe. God is our refuge. 🙏',
      ],
      highlightIdx: 1,
    },
  },
  {
    id: 'followup',
    badge: 'Member Follow-Ups',
    badgeIcon: HandHeart,
    heading: ['Every member', 'truly matters'],
    subtitle: 'Reach out to new visitors, follow up with absent members, and maintain meaningful connections through personalized SMS care.',
    ctaPrimary: 'Engage Members',
    ctaPrimaryHref: '/get-started',
    ctaSecondary: 'How It Works',
    ctaSecondaryHref: '/why-sdasms',
    phone: {
      senderId: 'PASTOR JAMES',
      color: '#EC4899',
      time: '4:30 PM',
      messages: [
        'Hi Sarah, we missed you today! 💛',
        '"Walking in Faith" — Hebrews 11:1.',
        'We\'re praying for you. See you next Sabbath!',
        'Need anything? Reply anytime.',
      ],
      highlightIdx: 1,
    },
  },
]

/* ─── Hero Section with Animated Slideshow ─── */

const SLIDE_DURATION = 5000

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slide = HERO_SLIDES[currentSlide]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative min-h-screen overflow-hidden bg-white dark:bg-[#0B0518]">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-[-200px] right-[-100px] w-[800px] h-[800px] bg-[#D72444]/[0.06] dark:bg-[#D72444]/6 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-150px] left-[-100px] w-[600px] h-[600px] bg-[#7C3AED]/[0.05] dark:bg-[#7C3AED]/6 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF8340]/[0.04] dark:bg-[#FF8340]/3 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(215,36,68,0.05)_0%,_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,_rgba(215,36,68,0.06)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.05)_0%,_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,58,237,0.06)_0%,_transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-0 sm:min-h-screen flex items-start sm:items-center pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_320px] gap-6 sm:gap-8 lg:gap-14 items-center w-full">
          {/* Left - Text Content */}
          <div className="flex flex-col items-start max-w-2xl">
            {/* Badge - animated per slide */}
            <div className="mb-5 sm:mb-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={slide.id + '-badge'}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="inline-flex items-center gap-2.5 text-gray-800 dark:text-white/90 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full"
                  style={{
                    background: `${slide.phone.color}15`,
                    borderColor: `${slide.phone.color}30`,
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}
                >
                  <slide.badgeIcon className="w-3.5 h-3.5" style={{ color: slide.phone.color }} />
                  {slide.badge}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Hero Heading - animated per slide */}
            <div className="mb-6 sm:mb-7">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={slide.id + '-heading'}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[28px] xs:text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-[-0.02em]"
                >
                  {slide.heading.map((line, i) => (
                    <span key={i}>
                      {i === slide.heading.length - 1 ? (
                        <span
                          className="bg-clip-text text-transparent"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${slide.phone.color}, ${slide.phone.color}BB)`,
                          }}
                        >
                          {line}
                        </span>
                      ) : (
                        line
                      )}
                      {i < slide.heading.length - 1 && <br />}
                    </span>
                  ))}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Subtitle - animated per slide */}
            <div className="mb-8 sm:mb-10 max-w-lg">
              <AnimatePresence mode="wait">
                <motion.p
                  key={slide.id + '-sub'}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="text-base sm:text-lg text-gray-600 dark:text-white/60 leading-relaxed"
                >
                  {slide.subtitle}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA Buttons - animated per slide */}
            <div className="mb-10 sm:mb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id + '-cta'}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-2 sm:gap-4"
                  style={{ flexDirection: 'row', flexWrap: 'nowrap' }}
                >
                  <a
                    href={slide.ctaPrimaryHref}
                    className="group inline-flex items-center gap-1.5 text-white font-bold text-xs sm:text-sm px-3 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: slide.phone.color,
                      boxShadow: `0 8px 30px ${slide.phone.color}40`,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {slide.ctaPrimary}
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href={slide.ctaSecondaryHref}
                    className="group inline-flex items-center gap-1.5 bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-white/80 hover:bg-gray-200 dark:hover:bg-white/[0.08] hover:text-gray-900 dark:hover:text-white font-semibold text-xs sm:text-sm px-3 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-300"
                    style={{
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {slide.ctaSecondary}
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex items-center gap-4 sm:gap-8 md:gap-10 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap no-scrollbar"
              >
                {[
                  { value: '10M+', label: 'Messages Delivered', icon: MessageSquare },
                  { value: '99.2%', label: 'Delivery Rate', icon: Shield },
                  { value: '5K+', label: 'Active Users', icon: Users },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06] flex items-center justify-center shrink-0">
                      <stat.icon className="w-4.5 h-4.5 text-[#FF8340]" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-extrabold text-lg leading-none">{stat.value}</p>
                      <p className="text-gray-500 dark:text-white/40 text-[11px] font-medium mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
          </div>

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end mt-4 sm:mt-0"
          >
            <div className="relative">
              {/* Glow behind phone - dynamic per slide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id + '-glow1'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -inset-8 rounded-[50px] blur-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${slide.phone.color}18, ${slide.phone.color}0A, ${slide.phone.color}18)`,
                  }}
                />
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id + '-glow2'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -inset-3 rounded-[40px] blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${slide.phone.color}12, ${slide.phone.color}0A)`,
                  }}
                />
              </AnimatePresence>

              {/* Phone Frame */}
              <div className="relative w-[280px] sm:w-[300px] bg-[#1A1A2E] rounded-[36px] border-[3px] border-[#2A2A3E] shadow-2xl shadow-black/40 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[26px] bg-[#1A1A2E] rounded-b-2xl z-20 flex items-center justify-center gap-2">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#2A2A3E]" />
                  <div className="w-[40px] h-[4px] rounded-full bg-[#2A2A3E]" />
                </div>

                {/* Screen */}
                <div className="relative bg-[#0D0B1A] pt-[36px] pb-[16px] px-4 min-h-[460px] sm:min-h-[500px] flex flex-col">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-1 mb-3">
                    <span className="text-white/40 text-[10px] font-medium">{slide.phone.time}</span>
                    <div className="flex items-center gap-1">
                      {/* Signal bars - small to big left to right */}
                      <div className="flex items-end gap-[2px]">
                        <div className="w-[3px] h-[4px] bg-white/40 rounded-[1px]" />
                        <div className="w-[3px] h-[6px] bg-white/40 rounded-[1px]" />
                        <div className="w-[3px] h-[9px] bg-white/40 rounded-[1px]" />
                        <div className="w-[3px] h-[12px] bg-white/40 rounded-[1px]" />
                      </div>
                      <span className="text-white/40 text-[9px] font-medium ml-1">5G</span>
                      <div className="w-[18px] h-[9px] border border-white/40 rounded-[2px] ml-1 relative">
                        <div className="absolute inset-[1.5px] right-[3px] bg-green-400 rounded-[1px]" />
                        <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-white/30 rounded-r-[1px]" />
                      </div>
                    </div>
                  </div>

                  {/* SMS App Header - SENDER ID NAME only */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id + '-header'}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-center gap-3 mb-4 px-1"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${slide.phone.color}, ${slide.phone.color}88)` }}
                      >
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-bold leading-none">{slide.phone.senderId}</h4>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
                        </svg>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Date Divider */}
                  <div className="flex items-center gap-3 mb-3 px-1">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-white/20 text-[8px] font-semibold uppercase tracking-wider">Today</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>

                  {/* SMS Message Bubble - animated per slide */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id + '-bubble'}
                      initial={{ opacity: 0, y: 15, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mx-1"
                    >
                      <div className="bg-[#1E1033] border border-white/[0.06] rounded-2xl rounded-tl-md p-3.5 shadow-lg">
                        {slide.phone.messages.map((msg, i) => (
                          <p
                            key={i}
                            className={`text-[12px] leading-[1.6] font-medium mt-1 first:mt-0 ${
                              i === slide.phone.highlightIdx
                                ? `font-semibold`
                                : ''
                            }`}
                            style={{
                              color: i === slide.phone.highlightIdx
                                ? `${slide.phone.color}CC`
                                : 'rgba(255,255,255,0.85)',
                            }}
                          >
                            {msg}
                          </p>
                        ))}
                        {/* Timestamp + read receipt */}
                        <div className="flex items-center justify-end gap-1.5 mt-2.5 pt-2 border-t border-white/[0.04]">
                          <span className="text-white/20 text-[9px] font-medium">{slide.phone.time}</span>
                          <svg className="w-3.5 h-3.5 text-blue-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Bottom reply bar */}
                  <div className="flex items-center gap-2 mt-4 px-1">
                    <div className="flex-1 bg-white/[0.04] border border-white/[0.06] rounded-full px-3.5 py-2 flex items-center">
                      <span className="text-white/15 text-[10px]">Text Message</span>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${slide.phone.color}, ${slide.phone.color}88)`,
                        boxShadow: `0 4px 14px ${slide.phone.color}33`,
                      }}
                    >
                      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom home indicator */}
                <div className="flex justify-center py-2 bg-[#0D0B1A]">
                  <div className="w-[100px] h-[4px] rounded-full bg-white/10" />
                </div>
              </div>

              {/* Floating notification badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute -top-2 -right-2 bg-[#D72444] text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-[#D72444]/40 ring-2 ring-white dark:ring-[#1A1A2E]"
              >
                1
              </motion.div>

              {/* Floating "New" badge below phone */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id + '-float'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 hidden sm:block"
                >
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white px-3 py-1.5 rounded-full shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${slide.phone.color}, ${slide.phone.color}BB)`,
                    }}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    {slide.badge}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Lazy-loaded below-fold sections ───────────────────────── */

const TrustedByStrip = dynamic(() => import('@/components/HomeSections').then(m => ({ default: m.TrustedByStrip })), { ssr: false })
const FeaturesSection = dynamic(() => import('@/components/HomeSections').then(m => ({ default: m.FeaturesSection })), { ssr: false })
const CoverageSection = dynamic(() => import('@/components/HomeSections').then(m => ({ default: m.CoverageSection })), { ssr: false })
const PowerfulGatewaySection = dynamic(() => import('@/components/HomeSections').then(m => ({ default: m.PowerfulGatewaySection })), { ssr: false })
const DigitalDiscipleshipSection = dynamic(() => import('@/components/HomeSections').then(m => ({ default: m.DigitalDiscipleshipSection })), { ssr: false })
const UseCasesSection = dynamic(() => import('@/components/HomeSections').then(m => ({ default: m.UseCasesSection })), { ssr: false })
const PricingSection = dynamic(() => import('@/components/HomeSections').then(m => ({ default: m.PricingSection })), { ssr: false })
const WhyChooseSection = dynamic(() => import('@/components/HomeSections').then(m => ({ default: m.WhyChooseSection })), { ssr: false })
const TestimonialsSection = dynamic(() => import('@/components/HomeSections').then(m => ({ default: m.TestimonialsSection })), { ssr: false })
const FAQSection = dynamic(() => import('@/components/HomeSections').then(m => ({ default: m.FAQSection })), { ssr: false })
const CTASection = dynamic(() => import('@/components/HomeSections').then(m => ({ default: m.CTASection })), { ssr: false })

/* ─── Page Component ───────────────────────────────────────── */

export default function SDASMSLandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustedByStrip />
        <FeaturesSection />
        <CoverageSection />
        <PowerfulGatewaySection />
        <DigitalDiscipleshipSection />
        <UseCasesSection />
        <PricingSection />
        <WhyChooseSection />
        <FAQSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
