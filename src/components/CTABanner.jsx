import { motion } from 'framer-motion';
import { Calendar, Home, ArrowRight } from 'lucide-react';
import { RevealSection, ParallaxLayer } from '../animations';

export default function CTABanner({ onBooking }) {
  return (
    <section className="py-8 sm:py-12 bg-transparent">
      <div className="max-w-[1480px] xl:max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        <RevealSection>
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#003b95] via-[#024ebb] to-[#002866] overflow-hidden shadow-2xl px-5 sm:px-12 py-8 sm:py-14 text-white">
            {/* Parallax glow blobs inside */}
            <ParallaxLayer speed={0.08} className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none hidden sm:block" />
            <ParallaxLayer speed={0.12} className="absolute -left-10 -top-10 w-72 h-72 bg-blue-300/15 rounded-full blur-3xl pointer-events-none hidden sm:block" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center justify-between">
              <div className="lg:col-span-7 space-y-1.5 sm:space-y-2 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl lg:text-4xl font-extrabold tracking-[-0.02em] text-white">
                  Book Your Test Today
                </h3>
                <p className="text-blue-100 text-[12px] sm:text-sm lg:text-base max-w-xl font-normal mx-auto sm:mx-0">
                  Visit our Hadapsar lab or schedule home sample collection. Available 24×7.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3.5">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', duration: 0.2, bounce: 0.3 }}
                  onClick={() => onBooking('CTA Banner Quick Book')}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white text-[#003b95] font-bold text-[13px] sm:text-xs tracking-wide shadow-md transition-all hover:bg-slate-50"
                >
                  <Calendar className="w-4 h-4 text-[#003b95]" />
                  <span>Book a Test</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#003b95]" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', duration: 0.2, bounce: 0.3 }}
                  onClick={() => onBooking('CTA Home Collection', 'home')}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/10 text-white border border-white/30 backdrop-blur-sm font-semibold text-[13px] sm:text-xs tracking-wide transition-all hover:bg-white/15"
                >
                  <Home className="w-4 h-4" />
                  <span>Home Collection</span>
                </motion.button>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
