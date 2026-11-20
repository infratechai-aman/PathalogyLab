import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Home, Clock, MessageCircle, ShieldCheck, ArrowRight, Microscope } from 'lucide-react';
import { EASE_OUT, EASE_SPRING, ParallaxLayer } from '../animations';

/* ── Hero Section — premium, unslop, Apple-design principles ── */
export default function HeroSection({ onBooking }) {
  const reduceMotion = useReducedMotion();
  const enterY = reduceMotion ? 0 : 18;
  const enterScale = reduceMotion ? 1 : 0.97;

  return (
    <section className="relative overflow-hidden" id="hero">

      {/* ════════════════════════════════════════════════════════
          MOBILE HERO (< sm) — Native app-grade experience
          ════════════════════════════════════════════════════════ */}
      <div className="sm:hidden relative">
        {/* Full-bleed hero image with cinematic gradient overlay */}
        <div className="relative w-full h-[220px] overflow-hidden">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            src="/images/hero-lab.jpg"
            alt="Accurate Pathology Laboratory — modern diagnostic center in Hadapsar, Pune"
            className="w-full h-full object-cover object-center"
          />
          {/* Three-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1120]/30 via-transparent to-[#fcfdfd]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1120]/20 via-transparent to-transparent" />

          {/* Location pill — frosted glass */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.2 }}
            className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-[6px] rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          >
            <span className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-[#0a1120] tracking-wide">Hadapsar, Pune • 24×7 Open</span>
          </motion.div>
        </div>

        {/* Content — taut spacing, no fluff */}
        <div className="px-5 -mt-3 relative z-10 pb-4">
          {/* Headline — tight, impactful */}
          <motion.h1
            initial={{ opacity: 0, y: enterY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
            className="text-[1.6rem] font-extrabold text-[#0a1120] tracking-[-0.035em] leading-[1.12]"
          >
            Accurate Diagnostics,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #003b95 0%, #024ebb 50%, #16a34a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Healthier You.
            </span>
          </motion.h1>

          {/* Subtitle — real value, no fake claims */}
          <motion.p
            initial={{ opacity: 0, y: enterY * 0.7 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.14 }}
            className="mt-3 text-[13px] text-slate-500 leading-[1.55] tracking-[-0.01em]"
          >
            Free doorstep blood collection · 24/7 emergency service · Fast reports on WhatsApp across Hadapsar & Pune.
          </motion.p>

          {/* CTA Stack — large touch targets, 48px+ height */}
          <motion.div
            initial={{ opacity: 0, y: enterY * 0.6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 }}
            className="mt-5 space-y-2.5"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={EASE_SPRING}
              onClick={() => onBooking('General Test Booking')}
              className="w-full flex items-center justify-center gap-2.5 h-[52px] rounded-[14px] bg-[#003b95] text-white font-bold text-[15px] tracking-[-0.01em] shadow-[0_4px_16px_rgba(0,59,149,0.25)] active:shadow-[0_2px_8px_rgba(0,59,149,0.2)] transition-shadow duration-150"
            >
              <Calendar className="w-[18px] h-[18px]" />
              <span>Book a Test</span>
              <ArrowRight className="w-4 h-4 opacity-60" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={EASE_SPRING}
              onClick={() => onBooking('Home Sample Collection', 'home')}
              className="w-full flex items-center justify-center gap-2 h-[48px] rounded-[14px] bg-white text-[#0a1120] font-semibold text-[14px] border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.04)] active:bg-slate-50 transition-colors duration-150"
            >
              <Home className="w-4 h-4 text-[#003b95]" />
              <span>Home Collection</span>
            </motion.button>
          </motion.div>

          {/* Trust strip — compact, evenly spaced */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.35 }}
            className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between"
          >
            {[
              { icon: Clock, label: '24×7 Service' },
              { icon: MessageCircle, label: 'WhatsApp Reports' },
              { icon: ShieldCheck, label: 'Reliable Results' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-[26px] h-[26px] rounded-[8px] bg-blue-50 flex items-center justify-center">
                  <Icon className="w-[13px] h-[13px] text-[#003b95]" />
                </div>
                <span className="text-[10px] font-semibold text-slate-600 tracking-tight">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          DESKTOP / TABLET HERO (≥ sm) — Premium layout
          ════════════════════════════════════════════════════════ */}
      <div className="hidden sm:block">
        {/* Soft ambient blobs — hidden on reduced-motion */}
        {!reduceMotion && (
          <>
            <ParallaxLayer speed={0.12} className="absolute top-10 left-[20%] w-[500px] h-[500px] bg-[#edf9f3]/50 rounded-full blur-[140px] pointer-events-none -z-10" />
            <ParallaxLayer speed={0.06} className="absolute -right-24 bottom-0 w-[400px] h-[400px] bg-[#d7f2e4]/30 rounded-full blur-[120px] pointer-events-none -z-10" />
          </>
        )}

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative pt-12 pb-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[500px]">

            {/* ── Left: Copy ── */}
            <div className="lg:col-span-5 space-y-7 text-left z-10">
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: enterY }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="inline-flex items-center gap-2 px-3.5 py-[7px] rounded-full bg-blue-50/80 border border-blue-200/60 text-[#003b95] text-[11px] font-bold tracking-wide"
              >
                <span className="w-[7px] h-[7px] rounded-full bg-emerald-500 animate-pulse" />
                <span>Hadapsar, Pune • Open 24×7</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: enterY * 1.4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.06 }}
                className="text-[2.75rem] lg:text-[3.5rem] font-extrabold text-[#0a1120] tracking-[-0.035em] leading-[1.08]"
              >
                Accurate Diagnostics,{' '}
                <span className="block mt-1">
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #003b95 0%, #024ebb 45%, #16a34a 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Healthier You.
                  </span>
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: enterY }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.12 }}
                className="text-[15px] lg:text-base text-slate-500 max-w-md leading-[1.65] tracking-[-0.01em]"
              >
                Trusted pathology services with free home sample collection, 24/7 emergency availability, and fast reports delivered directly to WhatsApp.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: enterY }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.18 }}
                className="flex items-center gap-3"
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  transition={EASE_SPRING}
                  onClick={() => onBooking('General Test Booking')}
                  className="flex items-center gap-2.5 px-7 py-3.5 rounded-[14px] bg-[#003b95] hover:bg-[#002f78] text-white font-bold text-sm tracking-[-0.01em] shadow-[0_4px_16px_rgba(0,59,149,0.25)] hover:shadow-[0_8px_24px_rgba(0,59,149,0.3)] transition-all duration-200"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Test</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  transition={EASE_SPRING}
                  onClick={() => onBooking('Home Sample Collection', 'home')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-[14px] bg-white text-[#0a1120] font-semibold text-sm border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200"
                >
                  <Home className="w-4 h-4 text-[#003b95]" />
                  <span>Home Collection</span>
                </motion.button>
              </motion.div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
                className="pt-6 border-t border-slate-100 flex items-center gap-7 text-slate-600"
              >
                {[
                  { icon: Clock, text: '24×7 Service' },
                  { icon: MessageCircle, text: 'Reports on WhatsApp' },
                  { icon: ShieldCheck, text: 'Reliable & Accurate' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs font-semibold tracking-tight">
                    <Icon className="w-3.5 h-3.5 text-[#003b95]" />
                    <span>{text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Hero image ── */}
            <motion.div
              initial={{ opacity: 0, x: reduceMotion ? 0 : 32, scale: enterScale }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.08 }}
              className="lg:col-span-7 relative flex justify-end items-center"
            >
              {!reduceMotion && (
                <ParallaxLayer speed={0.08} className="absolute -right-16 top-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-br from-blue-100/40 via-emerald-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
              )}

              <div className="relative w-full max-w-[640px]">
                {/* Image frame with organic shape */}
                <div className="relative w-full h-[400px] lg:h-[520px] rounded-[24px] lg:rounded-l-[240px] lg:rounded-r-[24px] overflow-hidden bg-gradient-to-tr from-blue-50 via-white to-emerald-50/40 p-[6px] lg:p-2 border border-blue-200/40 shadow-[0_24px_64px_rgba(0,59,149,0.08)]">
                  <div className="relative w-full h-full rounded-[20px] lg:rounded-l-[232px] lg:rounded-r-[20px] overflow-hidden bg-white shadow-inner">
                    <img
                      src="/images/hero-lab.jpg"
                      alt="Accurate Pathology — high-precision diagnostic laboratory in Hadapsar, Pune"
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Cinematic overlays */}
                    <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#003b95]/10 via-[#003b95]/4 to-transparent pointer-events-none hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120]/20 via-transparent to-transparent pointer-events-none" />

                    {/* Floating credential badge */}
                    <motion.div
                      animate={reduceMotion ? {} : { y: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute bottom-5 right-5 bg-white/92 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-white/70 flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#003b95] flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#0a1120] leading-tight tracking-tight">Reliable Results,</p>
                        <p className="text-[10px] font-semibold text-slate-400">Caring Service</p>
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
