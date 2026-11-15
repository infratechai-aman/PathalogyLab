import { motion } from 'framer-motion';
import { Calendar, Home, ArrowRight } from 'lucide-react';
import { RevealSection, ParallaxLayer } from '../animations';

export default function CTABanner({ onBooking }) {
  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealSection>
          <div className="relative rounded-3xl bg-gradient-to-r from-[#0a492e] via-[#0d5f3a] to-[#116e45] overflow-hidden shadow-2xl px-6 sm:px-12 py-10 sm:py-14 text-white">
            {/* Parallax glow blobs inside */}
            <ParallaxLayer speed={0.08} className="absolute -right-20 -bottom-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl pointer-events-none" />
            <ParallaxLayer speed={0.12} className="absolute -left-10 -top-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
              <div className="lg:col-span-7 space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] text-white">
                  Book Your Test Today
                </h3>
                <p className="text-green-100 text-sm sm:text-base max-w-xl font-normal">
                  Visit our Hadapsar lab or schedule home sample collection. We are available 24×7 for your medical convenience.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3.5">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', duration: 0.2, bounce: 0.3 }}
                  onClick={() => onBooking('CTA Banner Quick Book')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-[#0a492e] hover:bg-green-50 font-bold text-xs tracking-wide shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#116e45]" />
                  <span>Book a Test</span>
                  <ArrowRight className="w-4 h-4 text-[#116e45]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', duration: 0.2, bounce: 0.3 }}
                  onClick={() => onBooking('CTA Home Collection', 'home')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm font-semibold text-xs tracking-wide transition-all"
                >
                  <Home className="w-4 h-4" />
                  <span>Request Home Collection</span>
                </motion.button>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
