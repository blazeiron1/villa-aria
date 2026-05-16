import { motion } from 'framer-motion'
import {
  Wifi, Car, Wind, Bath, Tv, Flower2, Key, Coffee,
  ShieldCheck, Globe, Sparkles, Flame, BedDouble,
  Thermometer, MapPin, Utensils, Waves,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const categoryIcons = [
  [Car, Wifi, ShieldCheck, Flower2, Bath, Wind],
  [Tv, BedDouble, Sparkles, Coffee, Flame, Key],
  [MapPin, Utensils, Globe, Thermometer, ShieldCheck, Waves],
]

export default function Services() {
  const { tx } = useLanguage()
  const ts = tx.services

  return (
    <section id="services" className="py-28 lg:py-36 bg-soft-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-warm-taupe text-xs font-inter uppercase tracking-[0.3em] mb-4"
          >
            {ts.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-playfair text-deep-espresso leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {ts.heading1}{' '}
            <em className="italic font-normal">{ts.headingEm}</em>
          </motion.h2>
        </div>

        {/* Categories */}
        <div className="space-y-14">
          {ts.categories.map((cat, ci) => (
            <div key={ci}>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-deep-espresso text-xs font-inter uppercase tracking-[0.25em] font-medium mb-6 flex items-center gap-3"
              >
                <span className="w-6 h-px bg-stone-beige" />
                {cat.label}
              </motion.p>

              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
              >
                {cat.items.map((service, si) => {
                  const Icon = categoryIcons[ci][si]
                  return (
                    <motion.div
                      key={si}
                      variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } } }}
                      whileHover={{ y: -6, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      title={service.description}
                      className="group bg-warm-sand/40 hover:bg-warm-sand/70 border border-stone-beige/30 hover:border-stone-beige/60 rounded-xl p-4 flex flex-col items-center text-center gap-3 transition-all duration-300 cursor-default"
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.4 }}
                        className="w-10 h-10 bg-stone-beige/50 group-hover:bg-deep-espresso rounded-lg flex items-center justify-center transition-colors duration-300"
                      >
                        {Icon && <Icon size={18} className="text-deep-espresso group-hover:text-soft-ivory transition-colors duration-300" />}
                      </motion.div>
                      <p className="font-inter text-xs text-charcoal/70 font-medium leading-tight">
                        {service.title}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
