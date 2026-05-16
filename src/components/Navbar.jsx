import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Home, BedDouble, Phone, Images, Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const mobileIcons = [Home, BedDouble, Phone, Images, Mail]
const mobileHrefs = ['#home', '#rooms', 'tel:+38971974069', '#gallery', '#booking']
const mobileSections = ['home', 'rooms', null, 'gallery', 'booking']

export default function Navbar() {
  const { lang, toggle, tx } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [bottomVisible, setBottomVisible] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setScrolled(current > 60)

      if (current < 60) {
        setBottomVisible(true)
      } else if (current > lastScrollY.current + 6) {
        setBottomVisible(false)
      } else if (current < lastScrollY.current - 6) {
        setBottomVisible(true)
      }
      lastScrollY.current = current

      const ids = ['booking', 'gallery', 'services', 'rooms', 'about', 'home']
      const threshold = window.innerHeight * 0.4
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= threshold) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const LangToggle = () => (
    <div className="flex items-center gap-1 text-xs font-inter font-medium">
      <button
        onClick={() => toggle('en')}
        className={`px-1.5 py-0.5 rounded transition-colors duration-200 ${
          lang === 'en'
            ? scrolled ? 'text-deep-espresso font-bold' : 'text-soft-ivory font-bold'
            : scrolled ? 'text-charcoal/40 hover:text-charcoal' : 'text-soft-ivory/40 hover:text-soft-ivory'
        }`}
      >
        EN
      </button>
      <span className={scrolled ? 'text-stone-beige' : 'text-soft-ivory/30'}>|</span>
      <button
        onClick={() => toggle('mk')}
        className={`px-1.5 py-0.5 rounded transition-colors duration-200 ${
          lang === 'mk'
            ? scrolled ? 'text-deep-espresso font-bold' : 'text-soft-ivory font-bold'
            : scrolled ? 'text-charcoal/40 hover:text-charcoal' : 'text-soft-ivory/40 hover:text-soft-ivory'
        }`}
      >
        МК
      </button>
    </div>
  )

  return (
    <>
      {/* ── Top Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-soft-ivory/95 backdrop-blur-md shadow-sm border-b border-stone-beige/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex flex-col leading-none group">
              <span className={`font-playfair text-2xl font-semibold tracking-wide transition-colors duration-500 ${scrolled ? 'text-deep-espresso' : 'text-soft-ivory'}`}>
                Villa Aria
              </span>
              <span className={`text-[10px] font-inter uppercase tracking-[0.2em] transition-colors duration-500 ${scrolled ? 'text-warm-taupe' : 'text-stone-beige'}`}>
                Ohrid, Macedonia
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {tx.nav.links.map((label, i) => (
                <a
                  key={label}
                  href={tx.nav.hrefs[i]}
                  className={`relative text-sm font-inter font-medium tracking-wide group transition-colors duration-300 ${
                    scrolled ? 'text-charcoal hover:text-deep-espresso' : 'text-soft-ivory/90 hover:text-white'
                  }`}
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-warm-taupe transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Desktop right: lang toggle + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <LangToggle />
              <a
                href="#booking"
                className={`inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium tracking-wide rounded-full border transition-all duration-300 ${
                  scrolled
                    ? 'border-deep-espresso text-deep-espresso hover:bg-deep-espresso hover:text-soft-ivory'
                    : 'border-soft-ivory/70 text-soft-ivory hover:bg-soft-ivory hover:text-deep-espresso'
                }`}
              >
                {tx.nav.cta}
              </a>
            </div>

            {/* Mobile: lang toggle on top bar */}
            <div className="lg:hidden">
              <LangToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Bottom Tab Bar ── */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        animate={{ y: bottomVisible ? 0 : 70 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      >
        <div className="bg-soft-ivory rounded-t-2xl shadow-2xl border-t border-x border-stone-beige/50 flex items-center justify-around px-2 pt-3 pb-2">
          {tx.nav.mobile.labels.map((label, i) => {
            const Icon = mobileIcons[i]
            const isCenter = i === 2
            const section = mobileSections[i]
            const isActive = section && activeSection === section

            if (isCenter) {
              return (
                <a key={label} href={mobileHrefs[i]} className="flex flex-col items-center gap-1.5 -mt-7">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-full bg-deep-espresso flex items-center justify-center shadow-xl border-4 border-soft-ivory"
                  >
                    <Icon size={22} className="text-soft-ivory" />
                  </motion.div>
                  <span className="text-[10px] font-inter font-medium text-charcoal/60">{label}</span>
                </a>
              )
            }

            return (
              <a key={label} href={mobileHrefs[i]} className="flex flex-col items-center gap-1 px-2 py-1 min-w-[56px]">
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors duration-200 ${isActive ? 'bg-deep-espresso' : 'bg-transparent'}`}
                >
                  <Icon size={20} className={isActive ? 'text-soft-ivory' : 'text-charcoal/50'} />
                  <span className={`text-[10px] font-inter font-medium leading-none ${isActive ? 'text-soft-ivory' : 'text-charcoal/50'}`}>
                    {label}
                  </span>
                </motion.div>
              </a>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}
