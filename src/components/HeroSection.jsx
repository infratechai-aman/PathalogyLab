import { motion } from 'framer-motion';
import { Calendar, Home, Clock, MessageCircle, ShieldCheck, ArrowRight, MapPin, Phone } from 'lucide-react';
import { EASE_OUT, EASE_SPRING, ParallaxLayer } from '../animations';

export default function HeroSection({ onBooking }) {
  return (
    <section className="relative overflow-hidden" id="hero">
      {/* ═══ MOBILE HERO (< sm) — App-native full-screen feel ═══ */}
      <div className="sm:hidden">
        {/* Compact hero image banner with gradient overlay */}
        <div className="relative w-full h-[200px] overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDdEvRu1W6VzulOuiv_dcndLN4clLeOXumu1Jq7iQJSsTkdss_UpsD2f5Mqv9Pvl63RYHTHCAyCQAZHCOIH8S8uXxw4lf0yTSvr4H0n-63zXoxfGLP28LGwTh0cWbZkFeeKf2q7WeZbCkYyX6fz3_WQG36txqyYiZ8RhXHkSgPAjhNYy_Nj-KU99EtVrim-kq5UPKjw-gA0lmT1ZPhKJLzn5aMLtkV3nI066pYzC-p1M29xfEIuqNq4Q"
            alt="Accurate Pathology Laboratory"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#fcfdfd]" />
          {/* Floating location pill on image */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-800 tracking-wide">Hadapsar, Pune • Open 24×7</span>
          </motion.div>
        </div>

        {/* Content area — tight, app-like */}
        <div className="px-5 -mt-4 relative z-10 space-y-5 pb-6">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.05 }}
            className="text-[1.65rem] font-extrabold text-[#0a1120] tracking-[-0.03em] leading-[1.15]"
          >
            Accurate Testing{' '}
            <span className="block">
              for a{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #116e45 0%, #239c71 60%, #34d399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Healthier You
              </span>
            </span>
          </motion.h1>

          {/* Subtitle — shorter for mobile */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.1 }}
            className="text-[13px] text-slate-600 leading-relaxed"
          >
            Home sample collection, 24×7 service & reports on WhatsApp — trusted by Hadapsar families.
          </motion.p>

          {/* CTA Buttons — full-width, tall, prominent */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.15 }}
            className="space-y-2.5"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={EASE_SPRING}
              onClick={() => onBooking('General Test Booking')}
              className="w-full flex items-center justify-center gap-2.5 py-[14px] rounded-2xl bg-[#0a492e] text-white font-bold text-[14px] shadow-lg shadow-green-900/20 active:scale-[0.98] transition-transform"
            >
              <Calendar className="w-[18px] h-[18px]" />
              <span>Book a Test</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={EASE_SPRING}
              onClick={() => onBooking('Home Sample Collection', 'home')}
              className="w-full flex items-center justify-center gap-2 py-[13px] rounded-2xl bg-white text-slate-800 font-semibold text-[13px] border border-slate-200 shadow-sm active:scale-[0.98] transition-transform"
            >
              <Home className="w-4 h-4 text-[#116e45]" />
              <span>Home Collection</span>
            </motion.button>
          </motion.div>

          {/* Trust badges — horizontal row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.25 }}
            className="flex items-center justify-between pt-4 border-t border-slate-200/60"
          >
            {[
              { icon: Clock, text: '24×7 Service' },
              { icon: MessageCircle, text: 'WhatsApp Reports' },
              { icon: ShieldCheck, text: 'Reliable & Accurate' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center">
                  <Icon className="w-3 h-3 text-[#116e45]" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 leading-tight">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ═══ DESKTOP/TABLET HERO (≥ sm) — Original layout ═══ */}
      <div className="hidden sm:block">
        {/* Ambient parallax glow blobs */}
        <ParallaxLayer speed={0.15} className="absolute top-6 left-1/4 w-96 h-96 bg-green-100/40 rounded-full blur-[120px] pointer-events-none -z-10" />
        <ParallaxLayer speed={0.08} className="absolute -right-20 bottom-10 w-72 h-72 bg-teal-100/30 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative pt-10 pb-10 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[480px]">

            {/* Left content */}
            <div className="lg:col-span-5 space-y-6 text-left z-10 py-2">
              {/* Location Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200/80 text-green-800 text-[11px] font-semibold tracking-wide"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Hadapsar, Pune • Open 24×7</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.08 }}
                className="text-5xl lg:text-6xl font-extrabold text-[#0a1120] tracking-[-0.03em] leading-[1.1]"
              >
                Accurate Testing{' '}
                <span className="block">
                  for a{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #116e45 0%, #239c71 60%, #34d399 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Healthier You
                  </span>
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.15 }}
                className="text-base text-slate-600 max-w-lg font-normal leading-relaxed"
              >
                Trusted pathology services with home sample collection, 24×7 availability, and timely reports — delivered straight to your WhatsApp.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.22 }}
                className="pt-1 flex flex-row items-center gap-3"
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  transition={EASE_SPRING}
                  onClick={() => onBooking('General Test Booking')}
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#0a492e] text-white font-bold text-sm shadow-lg shadow-green-900/20 active:scale-95 transition-transform duration-150"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Test</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  transition={EASE_SPRING}
                  onClick={() => onBooking('Home Sample Collection', 'home')}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-800 font-semibold text-sm border border-slate-200 shadow-sm active:scale-95 transition-transform duration-150"
                >
                  <Home className="w-4 h-4 text-[#116e45]" />
                  <span>Home Collection</span>
                </motion.button>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.35 }}
                className="pt-5 border-t border-slate-200/70 flex flex-wrap items-center gap-8 text-slate-700"
              >
                {[
                  { icon: Clock, text: '24×7 Service' },
                  { icon: MessageCircle, text: 'Reports on WhatsApp' },
                  { icon: ShieldCheck, text: 'Reliable & Accurate' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-xs font-semibold tracking-tight">
                    <Icon className="w-3.5 h-3.5 text-[#116e45]" />
                    <span>{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
              className="lg:col-span-7 relative flex justify-end items-center"
            >
              <ParallaxLayer speed={0.1} className="absolute -right-20 top-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-gradient-to-br from-green-100/60 via-emerald-50/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

              <div className="relative w-full flex justify-end items-center py-2">
                <div className="relative w-full max-w-[620px] h-[420px] lg:h-[560px] rounded-3xl lg:rounded-l-[280px] lg:rounded-r-3xl overflow-hidden p-2 lg:p-3 bg-gradient-to-tr from-green-100/80 via-white/90 to-green-50/60 border border-green-200/60 shadow-[0_20px_50px_rgba(17,110,69,0.08)] group">
                  <div className="relative w-full h-full rounded-2xl lg:rounded-l-[260px] lg:rounded-r-2xl overflow-hidden bg-white shadow-inner">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDdEvRu1W6VzulOuiv_dcndLN4clLeOXumu1Jq7iQJSsTkdss_UpsD2f5Mqv9Pvl63RYHTHCAyCQAZHCOIH8S8uXxw4lf0yTSvr4H0n-63zXoxfGLP28LGwTh0cWbZkFeeKf2q7WeZbCkYyX6fz3_WQG36txqyYiZ8RhXHkSgPAjhNYy_Nj-KU99EtVrim-kq5UPKjw-gA0lmT1ZPhKJLzn5aMLtkV3nI066pYzC-p1M29xfEIuqNq4Q"
                      alt="Accurate Pathology high-precision clinical laboratory"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-green-900/10 via-green-500/5 to-transparent pointer-events-none hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                    {/* Floating badge */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex absolute bottom-5 right-5 bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/90 items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-xl bg-green-50 text-[#116e45] flex items-center justify-center shadow-inner">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0a1120] leading-tight">Reliable Results,</p>
                        <p className="text-[11px] font-semibold text-slate-500">Caring Service</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
