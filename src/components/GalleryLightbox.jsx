import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const allImages = [
  { src: '/aria/g-6.jpg',  alt: 'Villa Aria' },
  { src: '/aria/g-13.jpg', alt: 'Villa Aria' },
  { src: '/aria/g-1.jpg',  alt: 'Villa Aria' },
  { src: '/aria/g-19.jpg', alt: 'Villa Aria' },
  { src: '/aria/g-4.jpg',  alt: 'Villa Aria' },
  { src: '/aria/g-16.jpg', alt: 'Villa Aria' },
  { src: '/aria/g-2.jpg',  alt: 'Villa Aria' },
  { src: '/aria/g-11.jpg', alt: 'Villa Aria' },
  { src: '/aria/g-14.jpg', alt: 'Villa Aria' },
  { src: '/aria/g-9.jpg',  alt: 'Villa Aria' },
  { src: '/aria/g-5.jpg',  alt: 'Villa Aria' },
  { src: '/aria/g-18.jpg', alt: 'Villa Aria' },
  { src: '/aria/g-3.jpg',  alt: 'Villa Aria' },
  { src: '/aria/g-15.jpg', alt: 'Villa Aria' },
  { src: '/aria/g-8.jpg',  alt: 'Villa Aria' },
  { src: '/aria/g-17.jpg', alt: 'Villa Aria' },
  { src: '/aria/g-12.jpg', alt: 'Villa Aria' },
]

export default function GalleryLightbox({ onClose }) {
  const { tx } = useLanguage()
  const tg = tx.gallery
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (activeIndex !== null) setActiveIndex(null)
        else onClose()
      }
      if (activeIndex !== null) {
        if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % allImages.length)
        if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, onClose])

  const prev = () => setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length)
  const next = () => setActiveIndex((i) => (i + 1) % allImages.length)

  return (
    <>
      <AnimatePresence>
        {activeIndex === null && (
          <>
            <motion.div
              key="grid-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm"
            />
            <motion.div
              key="grid-panel"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-x-4 top-[4%] bottom-[4%] z-50 max-w-6xl mx-auto bg-soft-ivory rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-7 py-5 border-b border-stone-beige/40 flex-shrink-0">
                <div>
                  <p className="text-warm-taupe text-[10px] font-inter uppercase tracking-[0.25em] mb-0.5">Villa Aria</p>
                  <h3 className="font-playfair text-deep-espresso text-xl font-semibold">
                    {tg.allPhotos} <span className="text-warm-taupe font-inter font-normal text-sm ml-2">({allImages.length})</span>
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-warm-sand/60 hover:bg-warm-sand flex items-center justify-center text-charcoal hover:text-deep-espresso transition-all duration-200"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {allImages.map((img, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.02 }}
                      onClick={() => setActiveIndex(i)}
                      className="group relative aspect-square overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-deep-espresso"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeIndex !== null && (
          <>
            <motion.div
              key="lb-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-charcoal/95"
              onClick={() => setActiveIndex(null)}
            />
            <motion.div
              key="lb-image"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={allImages[activeIndex].src}
                  alt={allImages[activeIndex].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl pointer-events-none select-none"
                  style={{ maxHeight: '88vh', maxWidth: '90vw' }}
                />
              </AnimatePresence>
            </motion.div>

            <button onClick={() => setActiveIndex(null)} className="fixed top-5 right-5 z-[70] w-10 h-10 rounded-full bg-soft-ivory/10 hover:bg-soft-ivory/20 border border-soft-ivory/20 flex items-center justify-center text-soft-ivory transition-all duration-200">
              <X size={18} />
            </button>
            <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[70] bg-soft-ivory/10 border border-soft-ivory/20 rounded-full px-4 py-1.5">
              <span className="text-soft-ivory font-inter text-xs">{activeIndex + 1} / {allImages.length}</span>
            </div>
            <button onClick={prev} className="fixed left-4 top-1/2 -translate-y-1/2 z-[70] w-11 h-11 rounded-full bg-soft-ivory/10 hover:bg-soft-ivory/20 border border-soft-ivory/20 flex items-center justify-center text-soft-ivory transition-all duration-200">
              <ChevronLeft size={22} />
            </button>
            <button onClick={next} className="fixed right-4 top-1/2 -translate-y-1/2 z-[70] w-11 h-11 rounded-full bg-soft-ivory/10 hover:bg-soft-ivory/20 border border-soft-ivory/20 flex items-center justify-center text-soft-ivory transition-all duration-200">
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
