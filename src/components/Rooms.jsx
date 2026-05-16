import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, BedDouble } from 'lucide-react'
import RoomModal from './RoomModal'
import { useLanguage } from '../context/LanguageContext'

const roomsData = [
  {
    id: 1,
    size: '25 m²',
    price: '€120',
    image: '/aria/104.jpg',
    images: ['/aria/104.jpg', '/aria/104-1.jpg', '/aria/104-2.jpg', '/aria/104-3.jpg', '/aria/104-5.jpg', '/aria/104-6.jpg', '/aria/104-7.jpg'],
    amenities: [
      { icon: 'Ruler', label: '25 m²' },
      { icon: 'Flower2', label: 'Balcony' },
      { icon: 'Trees', label: 'Inner courtyard view' },
      { icon: 'Wind', label: 'Air conditioning' },
      { icon: 'Bath', label: 'Private bathroom' },
      { icon: 'Tv', label: 'Flat-screen TV' },
      { icon: 'Wifi', label: 'Free WiFi' },
    ],
  },
  {
    id: 2,
    price: '€140',
    image: '/aria/101.jpg',
    images: ['/aria/101.jpg', '/aria/101-1.jpg', '/aria/101-2.jpg', '/aria/101-3.jpg', '/aria/101-4.jpg', '/aria/101-5.jpg', '/aria/101-6.jpg'],
  },
  {
    id: 3,
    size: '25 m²',
    price: '€165',
    image: '/aria/103.jpg',
    images: ['/aria/103.jpg', '/aria/103-1.jpg', '/aria/103-2.jpg', '/aria/103-3.jpg', '/aria/103-4.jpg', '/aria/103-5.jpg', '/aria/103-6.jpg', '/aria/103-7.jpg'],
    amenities: [
      { icon: 'Ruler', label: '25 m²' },
      { icon: 'Flower2', label: 'Balcony' },
      { icon: 'Trees', label: 'Inner courtyard view' },
      { icon: 'Wind', label: 'Air conditioning' },
      { icon: 'Bath', label: 'Private bathroom' },
      { icon: 'Tv', label: 'Flat-screen TV' },
      { icon: 'Wifi', label: 'Free WiFi' },
    ],
  },
  {
    id: 4,
    size: '25 m²',
    price: '€185',
    image: '/aria/102.jpg',
    images: ['/aria/102.jpg', '/aria/102-1.jpg', '/aria/102-3.jpg', '/aria/102-4.jpg', '/aria/102-5.jpg', '/aria/102-6.jpg', '/aria/102-7.jpg'],
    amenities: [
      { icon: 'Ruler', label: '25 m²' },
      { icon: 'Flower2', label: 'Balcony' },
      { icon: 'Wind', label: 'Air conditioning' },
      { icon: 'Bath', label: 'Private bathroom' },
      { icon: 'Tv', label: 'Flat-screen TV' },
      { icon: 'Wifi', label: 'Free WiFi' },
    ],
  },
]

export default function Rooms() {
  const { tx } = useLanguage()
  const tr = tx.rooms
  const [selectedRoom, setSelectedRoom] = useState(null)

  const rooms = roomsData.map((data, i) => ({ ...data, ...tr.list[i] }))

  return (
    <>
      <section id="rooms" className="py-28 lg:py-36 bg-warm-sand/30">
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
              {tr.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-playfair text-deep-espresso leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {tr.heading1}{' '}
              <em className="italic font-normal">{tr.headingEm}</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-charcoal/60 font-inter font-light text-lg max-w-xl mx-auto"
            >
              {tr.subtitle}
            </motion.p>
          </div>

          {/* Room Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                variants={{ hidden: { opacity: 0, y: 50, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } } }}
                whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(75,58,47,0.12)' }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="group bg-soft-ivory rounded-2xl overflow-hidden shadow-md"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-64 lg:h-72">
                  <motion.img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="absolute bottom-4 right-4 bg-charcoal/50 backdrop-blur-sm text-soft-ivory text-[10px] font-inter px-2.5 py-1 rounded-full flex items-center gap-1.5"
                  >
                    <Eye size={10} />
                    {room.images.length} {tx.gallery ? 'photos' : 'photos'}
                  </motion.span>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="font-playfair text-deep-espresso text-xl font-semibold mb-3">
                    {room.title}
                  </h3>

                  {/* Bed configuration */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
                    {room.beds.map((bed, idx) =>
                      bed === 'or' ? (
                        <span key={idx} className="text-[10px] font-inter uppercase tracking-[0.15em] text-warm-taupe px-1">
                          {tr.orText}
                        </span>
                      ) : (
                        <span key={idx} className="inline-flex items-center gap-1.5 bg-warm-sand/60 text-deep-espresso text-[11px] font-inter px-2.5 py-1 rounded-full">
                          <BedDouble size={11} className="text-warm-taupe" />
                          {bed}
                        </span>
                      )
                    )}
                  </div>

                  <p className="text-charcoal/65 font-inter font-light text-sm leading-relaxed mb-6">
                    {room.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-beige/50">
                    <div>
                      <span className="text-xs font-inter text-warm-taupe uppercase tracking-wider">{tr.from}</span>
                      <p className="font-playfair text-2xl text-deep-espresso font-semibold">
                        {room.price}
                        <span className="text-sm font-inter font-normal text-charcoal/50 ml-1">{tr.night}</span>
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setSelectedRoom(room)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex items-center gap-2 px-5 py-2.5 bg-deep-espresso text-soft-ivory text-xs font-inter font-medium uppercase tracking-wider rounded-full hover:bg-warm-taupe transition-colors duration-300 group/btn"
                    >
                      {tr.viewRoom}
                      <Eye size={13} className="transition-transform duration-300 group-hover/btn:scale-110" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedRoom && (
          <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
