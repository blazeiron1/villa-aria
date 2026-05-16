import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Users, User, Mail, ArrowRight } from 'lucide-react'
import { SiViber, SiWhatsapp } from '@icons-pack/react-simple-icons'
import { useLanguage } from '../context/LanguageContext'
import { useForm, ValidationError } from '@formspree/react'

export default function Booking() {
  const { tx } = useLanguage()
  const tb = tx.booking
  const [form, setForm] = useState({ name: '', email: '', checkin: '', checkout: '', guests: '2' })
  const [state, handleFormspreeSubmit] = useForm('mzdonqrp')

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => { handleFormspreeSubmit(e) }

  return (
    <section id="booking" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(./aria/contact.jpg)' }} />
      <div className="absolute inset-0 bg-deep-espresso/80" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-stone-beige text-xs font-inter uppercase tracking-[0.3em] mb-4"
          >
            {tb.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-playfair text-soft-ivory leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {tb.heading1}{' '}
            <em className="italic font-normal">{tb.headingEm}</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-soft-ivory/60 font-inter font-light text-base"
          >
            {tb.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6"
          >
            <motion.a
              href="viber://chat?number=38971974069"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-soft-ivory/20 bg-soft-ivory/10 text-soft-ivory text-sm font-inter hover:bg-[#7360F2] hover:border-[#7360F2] transition-all duration-300"
            >
              <SiViber size={16} color="white" />
              {tb.viber}
            </motion.a>
            <motion.a
              href="https://wa.me/38971974069"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-soft-ivory/20 bg-soft-ivory/10 text-soft-ivory text-sm font-inter hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300"
            >
              <SiWhatsapp size={16} color="white" />
              {tb.whatsapp}
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
        >
          {state.succeeded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="bg-soft-ivory/10 backdrop-blur-sm border border-stone-beige/30 rounded-2xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 250, damping: 15 }}
                className="w-14 h-14 bg-stone-beige/20 rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <svg className="w-7 h-7 text-stone-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="font-playfair text-soft-ivory text-2xl mb-3">{tb.successTitle} {form.name}!</h3>
              <p className="text-soft-ivory/65 font-inter font-light">
                {tb.successMsg}{' '}
                <span className="text-stone-beige">{form.email}</span>{' '}
                {tb.successMsgEnd}
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-soft-ivory/10 backdrop-blur-sm border border-stone-beige/20 rounded-2xl p-8 lg:p-10 space-y-5"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                <label className="flex flex-col gap-2">
                  <span className="text-stone-beige/70 text-[11px] font-inter uppercase tracking-[0.2em]">{tb.nameLabel}</span>
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-beige/50" />
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder={tb.namePlaceholder} required className="w-full bg-soft-ivory/10 border border-stone-beige/25 hover:border-stone-beige/50 focus:border-stone-beige/70 rounded-xl pl-10 pr-4 py-3.5 text-soft-ivory placeholder-soft-ivory/30 font-inter text-sm outline-none transition-colors duration-200" />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-stone-beige/70 text-[11px] font-inter uppercase tracking-[0.2em]">{tb.emailLabel}</span>
                  <div className="relative">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-beige/50" />
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={tb.emailPlaceholder} required className="w-full bg-soft-ivory/10 border border-stone-beige/25 hover:border-stone-beige/50 focus:border-stone-beige/70 rounded-xl pl-10 pr-4 py-3.5 text-soft-ivory placeholder-soft-ivory/30 font-inter text-sm outline-none transition-colors duration-200" />
                  </div>
                </label>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                <label className="flex flex-col gap-2">
                  <span className="text-stone-beige/70 text-[11px] font-inter uppercase tracking-[0.2em]">{tb.checkinLabel}</span>
                  <div className="relative">
                    <CalendarDays size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-beige/50 pointer-events-none" />
                    <input type="date" name="checkin" value={form.checkin} onChange={handleChange} required className="w-full bg-soft-ivory/10 border border-stone-beige/25 hover:border-stone-beige/50 focus:border-stone-beige/70 rounded-xl pl-10 pr-4 py-3.5 text-soft-ivory font-inter text-sm outline-none transition-colors duration-200 [color-scheme:dark]" />
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-stone-beige/70 text-[11px] font-inter uppercase tracking-[0.2em]">{tb.checkoutLabel}</span>
                  <div className="relative">
                    <CalendarDays size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-beige/50 pointer-events-none" />
                    <input type="date" name="checkout" value={form.checkout} onChange={handleChange} required className="w-full bg-soft-ivory/10 border border-stone-beige/25 hover:border-stone-beige/50 focus:border-stone-beige/70 rounded-xl pl-10 pr-4 py-3.5 text-soft-ivory font-inter text-sm outline-none transition-colors duration-200 [color-scheme:dark]" />
                  </div>
                </label>
              </motion.div>

              <motion.label
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="flex flex-col gap-2"
              >
                <span className="text-stone-beige/70 text-[11px] font-inter uppercase tracking-[0.2em]">{tb.guestsLabel}</span>
                <div className="relative">
                  <Users size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-beige/50 pointer-events-none" />
                  <select name="guests" value={form.guests} onChange={handleChange} className="w-full bg-soft-ivory/10 border border-stone-beige/25 hover:border-stone-beige/50 focus:border-stone-beige/70 rounded-xl pl-10 pr-4 py-3.5 text-soft-ivory font-inter text-sm outline-none transition-colors duration-200 appearance-none cursor-pointer [color-scheme:dark]">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className="bg-deep-espresso">
                        {n} {n === 1 ? tb.guestSingular : tb.guestPlural}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.label>

              <motion.label
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="flex flex-col gap-2"
              >
                <span className="text-stone-beige/70 text-[11px] font-inter uppercase tracking-[0.2em]">{tb.roomLabel}</span>
                <select name="room" value={form.room || ''} onChange={handleChange} className="w-full bg-soft-ivory/10 border border-stone-beige/25 hover:border-stone-beige/50 focus:border-stone-beige/70 rounded-xl px-4 py-3.5 text-soft-ivory font-inter text-sm outline-none transition-colors duration-200 appearance-none cursor-pointer [color-scheme:dark]">
                  <option value="" className="bg-deep-espresso">{tb.roomPlaceholder}</option>
                  {tb.roomOptions.map((opt, i) => (
                    <option key={i} value={opt} className="bg-deep-espresso">{opt}</option>
                  ))}
                </select>
              </motion.label>

              <motion.label
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="flex flex-col gap-2"
              >
                <span className="text-stone-beige/70 text-[11px] font-inter uppercase tracking-[0.2em]">{tb.requestLabel}</span>
                <textarea name="request" value={form.request || ''} onChange={handleChange} placeholder={tb.requestPlaceholder} rows={3} className="w-full bg-soft-ivory/10 border border-stone-beige/25 hover:border-stone-beige/50 focus:border-stone-beige/70 rounded-xl px-4 py-3.5 text-soft-ivory placeholder-soft-ivory/30 font-inter text-sm outline-none transition-colors duration-200 resize-none" />
              </motion.label>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  disabled={state.submitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-stone-beige text-deep-espresso font-inter font-semibold text-sm uppercase tracking-widest rounded-xl hover:bg-warm-sand transition-colors duration-300 mt-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state.submitting ? '...' : tb.submit}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
