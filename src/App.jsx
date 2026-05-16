import { useScroll, useSpring, motion } from 'framer-motion'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Rooms from './components/Rooms'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Booking from './components/Booking'
import Footer from './components/Footer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <LanguageProvider>
    <div className="font-inter bg-soft-ivory text-charcoal">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-warm-taupe z-[100]"
      />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Services />
        <Gallery />
        <Reviews />
        <Booking />
      </main>
      <Footer />
      {/* Spacer so bottom tab bar never covers footer content on mobile */}
      <div className="h-24 lg:hidden" />
    </div>
    </LanguageProvider>
  )
}
