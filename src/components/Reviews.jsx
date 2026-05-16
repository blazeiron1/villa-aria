import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const reviews = [
  { name: 'Ajla Hakalo', initials: 'AH', rating: 5, text: "What an amazing place! The rooms were spotless and spacious, and it's so close to the lake. The hostesses are some of the kindest people I have ever met. Absolutely recommend!" },
  { name: 'Dani', initials: 'DA', rating: 5, text: "Our stay at Villa Aria was absolutely perfect! The villa is modern, beautifully designed, and spotlessly clean, with everything you need for a comfortable and relaxing holiday. The rooms are spacious, cozy, and well-equipped, offering both comfort and style." },
  { name: 'Παντελής - Αλέξης Μαρκόπουλος', initials: 'ΠΑ', rating: 5, text: "Unbeatable value for money! New rooms, perfectly clean, central. Also owner very friendly and helpful!" },
  { name: 'Marianna Saxioni', initials: 'MS', rating: 5, text: "The cleanest and biggest rooms in the area!! The land lady is just wonderful!! Thank you and will see you next time!!" },
  { name: 'Νικόλαος Τοκατλίδης', initials: 'ΝΤ', rating: 5, text: "Very clean, quiet and beautiful place to stay. The girl at the desk was very helpful and helped us to park the bikes in a safe place. I would totally recommend to everybody!" },
  { name: 'Krste Nikoloski', initials: 'KN', rating: 5, text: "Highly recommended for groups! I organised a stay for a group of 20 people, most of them from Italy, and everything went perfectly!" },
  { name: 'Gligi', initials: 'GL', rating: 5, text: "Would recommend! Basically in the center. The housekeepers are really nice and give you tips. It is not a tourist scam or expensive! You have a parking spot. The rooms are clean and treated with care." },
  { name: 'Brenda Stojanoski', initials: 'BS', rating: 5, text: "Villa Aria is a beautiful villa, located in a perfect location — just a small walk to Lake Ohrid and the centre. Far enough that the area is peaceful and quiet. The room was super clean with lots of lovely touches." },
  { name: 'Maya Sekuloska', initials: 'MY', rating: 5, text: "I booked Villa Aria for my special friend and everything was super clean, the air conditioning was on point and my client felt like home. 100% recommend." },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-warm-taupe text-warm-taupe" />
      ))}
    </div>
  )
}

const VISIBLE = 3

export default function Reviews() {
  const { tx } = useLanguage()
  const tr = tx.reviews
  const [index, setIndex] = useState(0)
  const maxIndex = reviews.length - VISIBLE

  const prev = () => setIndex((i) => Math.max(i - 1, 0))
  const next = () => setIndex((i) => Math.min(i + 1, maxIndex))
  const visible = reviews.slice(index, index + VISIBLE)

  return (
    <section className="py-28 lg:py-36 bg-soft-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
            className="mt-4 text-charcoal/55 font-inter font-light text-lg"
          >
            {tr.subtitle}
          </motion.p>
        </div>

        <div className="relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-7 overflow-hidden"
            initial="hidden"
            animate="visible"
            key={index}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            {visible.map((review) => (
              <motion.div
                key={review.name}
                variants={{ hidden: { opacity: 0, y: 30, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } } }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(75,58,47,0.10)' }}
                className="bg-warm-sand/40 border border-stone-beige/40 hover:border-stone-beige/70 rounded-2xl p-8 flex flex-col gap-5 transition-colors duration-300"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.12, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="font-playfair text-7xl text-deep-espresso leading-none -mb-6 -mt-2 select-none"
                >
                  "
                </motion.span>

                <StarRating count={review.rating} />

                <blockquote className="text-charcoal/70 font-inter font-light text-sm leading-relaxed italic flex-1">
                  "{review.text}"
                </blockquote>

                <div className="h-px bg-stone-beige/50" />

                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-deep-espresso flex items-center justify-center text-soft-ivory text-xs font-playfair font-semibold flex-shrink-0"
                  >
                    {review.initials}
                  </motion.div>
                  <p className="font-playfair text-deep-espresso text-sm font-semibold">{review.name}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              disabled={index === 0}
              className="w-10 h-10 rounded-full border border-stone-beige hover:border-deep-espresso flex items-center justify-center text-charcoal hover:text-deep-espresso transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`rounded-full transition-all duration-300 ${i === index ? 'w-5 h-1.5 bg-deep-espresso' : 'w-1.5 h-1.5 bg-stone-beige hover:bg-warm-taupe'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={index === maxIndex}
              className="w-10 h-10 rounded-full border border-stone-beige hover:border-deep-espresso flex items-center justify-center text-charcoal hover:text-deep-espresso transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
