import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { tx } = useLanguage()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ backgroundImage: 'url(/aria/home.jpg)', y: bgY }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/20 via-transparent to-charcoal/20" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-stone-beige text-xs font-inter uppercase tracking-[0.3em] mb-6"
        >
          {tx.hero.eyebrow}
        </motion.p>

        {/* Heading */}
        <div className="font-playfair text-soft-ivory leading-[1.1] mb-0" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
          <div className="flex flex-wrap justify-center gap-x-5">
            {tx.hero.words1.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 italic font-light">
            {tx.hero.words2.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 + i * 0.15, ease: 'easeOut' }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="w-16 h-px bg-stone-beige mx-auto my-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-soft-ivory/80 font-inter font-light text-lg leading-relaxed max-w-xl mx-auto"
        >
          {tx.hero.subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
        >
          {[
            { label: tx.hero.btn1, href: '#booking', primary: true },
            { label: tx.hero.btn2, href: '#rooms', primary: false },
          ].map(({ label, href, primary }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`inline-block px-8 py-4 font-inter font-medium text-sm tracking-widest uppercase rounded-full transition-all duration-300 ${
                primary
                  ? 'bg-deep-espresso text-soft-ivory hover:bg-warm-taupe hover:shadow-lg'
                  : 'border border-soft-ivory/60 text-soft-ivory hover:bg-soft-ivory/10'
              }`}
            >
              {label}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
