import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronLeft, ChevronRight, BedDouble,
  Wifi, Coffee, Tv, Wind, Bath, ArrowRight, Flower2, Trees, Ruler,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const iconMap = { Wifi, Coffee, Tv, Wind, Bath, BedDouble, Flower2, Trees, Ruler }

const defaultAmenityIcons = [
  { icon: 'Wifi', key: 'Free WiFi' },
  { icon: 'Coffee', key: 'Breakfast' },
  { icon: 'Tv', key: 'Smart TV' },
  { icon: 'Wind', key: 'Air Conditioning' },
  { icon: 'Bath', key: 'En-suite Bathroom' },
  { icon: 'BedDouble', key: 'Premium Bedding' },
]

export default function RoomModal({ room, onClose }) {
  const { tx } = useLanguage()
  const tm = tx.modal
  const [activeImg, setActiveImg] = useState(0)

  const amenities = room.amenities
    ? room.amenities.map(({ icon, label }) => ({ icon, label: tm.amenities[label] || label }))
    : defaultAmenityIcons.map(({ icon, key }) => ({ icon, label: tm.amenities[key] || key }))

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setActiveImg((p) => (p + 1) % room.images.length)
      if (e.key === 'ArrowLeft') setActiveImg((p) => (p - 1 + room.images.length) % room.images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [room, onClose])

  const prev = () => setActiveImg((p) => (p - 1 + room.images.length) % room.images.length)
  const next = () => setActiveImg((p) => (p + 1) % room.images.length)

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-sm"
      />

      <motion.div
        key="modal"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="fixed inset-x-4 top-[4%] bottom-[4%] z-50 max-w-5xl mx-auto bg-soft-ivory rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 bg-soft-ivory/90 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal hover:text-deep-espresso hover:bg-soft-ivory transition-all duration-200 shadow-md"
        >
          <X size={17} />
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* Image Gallery */}
          <div className="relative h-[55vw] max-h-[420px] min-h-[240px] bg-warm-sand/30 flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={room.images[activeImg]}
                alt={`${room.title} — ${activeImg + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-soft-ivory/90 backdrop-blur-sm text-deep-espresso text-[10px] font-inter uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                {room.tag}
              </span>
              {room.size && (
                <span className="bg-charcoal/50 backdrop-blur-sm text-soft-ivory text-[10px] font-inter px-3 py-1.5 rounded-full">
                  {room.size}
                </span>
              )}
            </div>

            <span className="absolute top-4 right-12 bg-charcoal/50 backdrop-blur-sm text-soft-ivory text-[10px] font-inter px-3 py-1.5 rounded-full">
              {activeImg + 1} / {room.images.length}
            </span>

            {room.images.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-soft-ivory/80 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal hover:bg-soft-ivory transition-all duration-200 shadow-md">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-soft-ivory/80 backdrop-blur-sm rounded-full flex items-center justify-center text-charcoal hover:bg-soft-ivory transition-all duration-200 shadow-md">
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {room.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`rounded-full transition-all duration-300 ${i === activeImg ? 'w-5 h-1.5 bg-soft-ivory' : 'w-1.5 h-1.5 bg-soft-ivory/50 hover:bg-soft-ivory/80'}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          {room.images.length > 1 && (
            <div className="flex gap-2 px-6 pt-4 pb-1 overflow-x-auto">
              {room.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 ${i === activeImg ? 'ring-2 ring-deep-espresso ring-offset-1' : 'opacity-55 hover:opacity-90'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Room Details */}
          <div className="px-6 lg:px-8 pt-6 pb-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Left — Info */}
              <div className="flex-1">
                <p className="text-warm-taupe text-[10px] font-inter uppercase tracking-[0.25em] mb-2">
                  Villa Aria · Ohrid
                </p>
                <h2 className="font-playfair text-deep-espresso text-2xl lg:text-3xl font-semibold mb-4">
                  {room.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-5">
                  {room.beds.map((bed, idx) =>
                    bed === 'or' ? (
                      <span key={idx} className="text-[10px] font-inter uppercase tracking-[0.15em] text-warm-taupe px-1">
                        {tm.orText}
                      </span>
                    ) : (
                      <span key={idx} className="inline-flex items-center gap-1.5 bg-warm-sand/70 text-deep-espresso text-[11px] font-inter px-3 py-1.5 rounded-full">
                        <BedDouble size={11} className="text-warm-taupe" />
                        {bed}
                      </span>
                    )
                  )}
                </div>

                <div className="w-10 h-px bg-stone-beige mb-5" />

                <p className="text-charcoal/70 font-inter font-light text-sm leading-relaxed mb-4">
                  {room.description}
                </p>
                {room.longDescription && (
                  <p className="text-charcoal/60 font-inter font-light text-sm leading-relaxed">
                    {room.longDescription}
                  </p>
                )}

                <div className="mt-7">
                  <p className="text-deep-espresso text-[10px] font-inter uppercase tracking-[0.25em] mb-4">
                    {tm.roomFeatures}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {amenities.map(({ icon, label }) => {
                      const Icon = iconMap[icon]
                      return (
                        <div key={label} className="flex items-center gap-2.5 bg-warm-sand/40 rounded-xl px-3 py-2.5">
                          {Icon && <Icon size={14} className="text-warm-taupe flex-shrink-0" />}
                          <span className="text-charcoal/70 font-inter text-xs">{label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Right — Booking sidebar */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="sticky top-4 bg-warm-sand/40 border border-stone-beige/50 rounded-2xl p-6">
                  <p className="text-warm-taupe text-[10px] font-inter uppercase tracking-[0.2em] mb-1">
                    {tm.startingFrom}
                  </p>
                  <p className="font-playfair text-deep-espresso text-3xl font-semibold">
                    {room.price}
                    <span className="text-sm font-inter font-normal text-charcoal/45 ml-1">{tm.night}</span>
                  </p>

                  <div className="h-px bg-stone-beige/60 my-5" />

                  <a
                    href="#booking"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-deep-espresso text-soft-ivory text-xs font-inter font-medium uppercase tracking-wider rounded-xl hover:bg-warm-taupe transition-colors duration-300 group"
                  >
                    {tm.book}
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>

                  <p className="text-center text-charcoal/35 font-inter text-[10px] mt-3">
                    {tm.noPayment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
