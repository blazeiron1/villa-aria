import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SiBookingdotcom, SiWhatsapp, SiViber } from '@icons-pack/react-simple-icons'
import { useLanguage } from '../context/LanguageContext'

const quickLinkHrefs = ['#about', '#rooms', '#services', '#gallery', '#booking']

const contactItems = [
  { icon: MapPin, text: 'Spas Bandzov numb.21, Ohrid 6000', href: null },
  { icon: Phone, text: '+389 71 974 069', href: 'tel:+38971974069' },
  { icon: Mail, text: 'pgilevski@gmail.com', href: 'mailto:pgilevski@gmail.com' },
]

export default function Footer() {
  const { tx } = useLanguage()
  const tf = tx.footer

  return (
    <footer className="bg-warm-sand/40 border-t border-stone-beige/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10"
        >
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex flex-col leading-none mb-5">
              <span className="font-playfair text-deep-espresso text-2xl font-semibold tracking-wide">Villa Aria</span>
              <span className="text-[10px] font-inter uppercase tracking-[0.25em] text-warm-taupe mt-1">Ohrid, Macedonia</span>
            </a>
            <p className="text-charcoal/60 font-inter font-light text-sm leading-relaxed max-w-xs mb-6">
              {tf.tagline}
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.booking.com/hotel/mk/villa-aria.html?aid=356980&label=gog235jc-10CAsokwFCCnZpbGxhLWFyaWFIM1gDaJMBiAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuALf0JzQBsACAdICJDk0YzFlMGIwLWU0MDktNDkxOC05ZmRmLTJmZWU1ODMwOTRiYdgCAeACAQ&sid=3c3f05e152a6fb602264fd250e8146c5"
                target="_blank" rel="noopener noreferrer" aria-label="Book on Booking.com"
                className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-white hover:scale-110 transition-transform duration-200"
              >
                <SiBookingdotcom color="#003580" size={40} />
              </a>
              <a
                href="https://wa.me/38971974069"
                target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: '#25D366' }}
              >
                <SiWhatsapp color="white" size={20} />
              </a>
              <a
                href="viber://chat?number=38971974069" aria-label="Chat on Viber"
                className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: '#7360F2' }}
              >
                <SiViber color="white" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-deep-espresso text-xs font-inter uppercase tracking-[0.25em] mb-6 font-medium">
              {tf.quickLinks}
            </p>
            <ul className="space-y-3">
              {tf.links.map((label, i) => (
                <li key={i}>
                  <a
                    href={quickLinkHrefs[i]}
                    className="group flex items-center gap-2 text-charcoal/60 hover:text-deep-espresso font-inter text-sm transition-colors duration-200"
                  >
                    <span className="w-4 h-px bg-stone-beige group-hover:w-6 group-hover:bg-warm-taupe transition-all duration-300" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-deep-espresso text-xs font-inter uppercase tracking-[0.25em] mb-6 font-medium">
              {tf.contact}
            </p>
            <ul className="space-y-3.5">
              {contactItems.map((item, i) => {
                const Icon = item.icon
                const content = (
                  <li key={i} className="flex items-start gap-3">
                    <Icon size={14} className="text-warm-taupe mt-0.5 flex-shrink-0" />
                    <span className="text-charcoal/60 font-inter text-sm leading-relaxed">{item.text}</span>
                  </li>
                )
                return item.href ? (
                  <a key={i} href={item.href} className="block hover:text-deep-espresso transition-colors duration-200">{content}</a>
                ) : content
              })}
              {/* Check-in / Check-out from translations */}
              {[
                { text: tf.checkIn },
                { text: tf.checkOut },
              ].map((item, i) => (
                <li key={`time-${i}`} className="flex items-start gap-3">
                  <Clock size={14} className="text-warm-taupe mt-0.5 flex-shrink-0" />
                  <span className="text-charcoal/60 font-inter text-sm leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <p className="text-deep-espresso text-xs font-inter uppercase tracking-[0.25em] mb-6 font-medium">
              {tf.findUs}
            </p>
            <div className="rounded-xl overflow-hidden border border-stone-beige/50 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.1415911130903!2d20.8045000260456!3d41.109598671336556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350dde9f3c6b007%3A0xaec0060fe0f0a2c3!2sVilla%20Aria!5e0!3m2!1sen!2smk!4v1778923059512!5m2!1sen!2smk"
                width="100%" height="200"
                style={{ border: 0, display: 'block' }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Villa Aria on Google Maps"
              />
            </div>
          </div>
        </motion.div>

        <div className="mt-14 pt-8 border-t border-stone-beige/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-charcoal/40 font-inter text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Villa Aria. {tf.copyright}
          </p>
          <p className="text-charcoal/40 font-inter text-xs">{tf.location}</p>
        </div>
      </div>
    </footer>
  )
}
