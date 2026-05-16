import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''))
    const suffix = target.replace(/[0-9.]/g, '')
    if (!numeric) return
    let start = 0
    const step = numeric / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= numeric) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start) + suffix)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return { ref, count: count || '0' }
}

const statNumbers = ['12+', 'UNESCO', '800+']

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

function AnimatedStat({ number, label }) {
  const { ref, count } = useCounter(number)
  const isUNESCO = isNaN(parseFloat(number))
  return (
    <div ref={ref}>
      <p className="font-playfair text-3xl text-deep-espresso font-semibold">
        {isUNESCO ? number : count}
      </p>
      <p className="text-xs font-inter text-warm-taupe uppercase tracking-wider mt-1">{label}</p>
    </div>
  )
}

export default function About() {
  const { tx } = useLanguage()
  const ta = tx.about

  return (
    <section id="about" className="py-28 lg:py-36 bg-soft-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={fadeUp} className="text-warm-taupe text-xs font-inter uppercase tracking-[0.3em] mb-5">
              {ta.eyebrow}
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-playfair text-deep-espresso leading-tight mb-8"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
            >
              {ta.heading1}
              <br />
              <em className="italic font-normal">{ta.headingEm}</em>
            </motion.h2>

            <motion.div variants={fadeUp} className="w-12 h-px bg-stone-beige mb-8" />

            <motion.p variants={fadeUp} className="text-charcoal/75 font-inter font-light text-lg leading-relaxed text-justify mb-6">
              {ta.para1}
            </motion.p>

            <motion.p variants={fadeUp} className="text-charcoal/75 font-inter font-light text-lg leading-relaxed text-justify mb-10">
              {ta.para2}
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-12">
              {statNumbers.map((num, i) => (
                <AnimatedStat key={num} number={num} label={ta.stats[i]} />
              ))}
            </motion.div>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl"
            >
              <img
                src="./aria/about.jpg"
                alt="Villa Aria — warm Macedonian hospitality"
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-espresso/20 to-transparent" />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 200 }}
              className="absolute -bottom-6 -left-6 bg-soft-ivory rounded-2xl px-6 py-5 shadow-xl border border-stone-beige/30"
            >
              <p className="text-xs font-inter uppercase tracking-[0.2em] text-warm-taupe mb-1">{ta.badgeLabel}</p>
              <p className="font-playfair text-deep-espresso font-medium text-lg">{ta.badgePlace}</p>
              <p className="text-xs font-inter text-charcoal/60 mt-0.5">{ta.badgeHeritage}</p>
            </motion.div>

            {/* Decorative frame */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 w-32 h-32 border border-stone-beige/40 rounded-2xl -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
