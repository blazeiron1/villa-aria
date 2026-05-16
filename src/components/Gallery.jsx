import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Images } from 'lucide-react'
import GalleryLightbox from './GalleryLightbox'
import { useLanguage } from '../context/LanguageContext'

const images = [
  { src: './aria/g-14.jpg',  alt: 'Villa Aria', span: 'md:row-span-2' },
  { src: './aria/g-3.jpg',   alt: 'Villa Aria', span: '' },
  { src: './aria/g-17.jpg',  alt: 'Villa Aria', span: '' },
  { src: './aria/g-8.jpg',   alt: 'Villa Aria', span: 'md:col-span-2' },
  { src: './aria/g-11.jpg',  alt: 'Villa Aria', span: '' },
  { src: './aria/g-5.jpg',   alt: 'Villa Aria', span: '' },
  { src: './aria/g-18.jpg',  alt: 'Villa Aria', span: '' },
]

export default function Gallery() {
  const { tx } = useLanguage()
  const tg = tx.gallery
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <>
      <section id="gallery" className="py-28 lg:py-36 bg-warm-sand/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-warm-taupe text-xs font-inter uppercase tracking-[0.3em] mb-4"
            >
              {tg.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-playfair text-deep-espresso leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {tg.heading1}{' '}
              <em className="italic font-normal">{tg.headingEm}</em>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[260px]"
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-xl ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-deep-espresso/0 group-hover:bg-deep-espresso/20 transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <button
              onClick={() => setLightboxOpen(true)}
              className="group flex items-center gap-3 px-8 py-4 border border-deep-espresso/40 text-deep-espresso font-inter font-medium text-sm uppercase tracking-widest rounded-full hover:bg-deep-espresso hover:text-soft-ivory transition-all duration-300"
            >
              <Images size={16} className="transition-transform duration-300 group-hover:scale-110" />
              {tg.seeMore}
            </button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && <GalleryLightbox onClose={() => setLightboxOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
