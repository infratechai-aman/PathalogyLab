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
          MOBILE HERO (< sm) — Full-screen immersive lab experience
          ════════════════════════════════════════════════════════ */}
      <div className="sm:hidden relative min-h-[calc(100svh-64px)] flex flex-col justify-end overflow-hidden pb-6 pt-16">
        {/* Full-screen hero image backdrop */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            src="/images/hero-lab.jpg"
            alt="Accurate Pathology Laboratory — modern diagnostic center in Hadapsar, Pune"
            className="w-full h-full object-cover object-[center_20%]"
          />
          {/* Seamless cinematic multi-tier gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-[#0a1120]/80 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
        </div>

        {/* Content — docked over the cinematic gradient backdrop */}
        <div className="px-5 relative z-10 space-y-4">
          {/* Headline — high contrast & impactful */}
          <motion.h1
            initial={{ opacity: 0, y: enterY }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
            className="text-[2rem] font-extrabold text-white tracking-[-0.035em] leading-[1.12]"
          >
            Accurate Diagnostics,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 45%, #4ade80 100%)',
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
            className="text-[13px] text-slate-200/90 leading-[1.55] tracking-[-0.01em] font-medium"
          >
            Free doorstep blood collection · 24/7 emergency service · Fast reports on WhatsApp across Hadapsar & Pune.
          </motion.p>

          {/* CTA Stack — large touch targets, 48px+ height */}
          <motion.div
            initial={{ opacity: 0, y: enterY * 0.6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 }}
            className="space-y-2.5 pt-1"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={EASE_SPRING}
              onClick={() => onBooking('General Test Booking')}
              className="w-full flex items-center justify-center gap-2.5 h-[52px] rounded-[16px] bg-gradient-to-r from-[#003b95] to-[#0256cc] text-white font-bold text-[15px] tracking-[-0.01em] shadow-[0_8px_24px_rgba(2,86,204,0.35)] active:scale-[0.98] transition-transform"
            >
              <Calendar className="w-[18px] h-[18px]" />
              <span>Book a Test</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={EASE_SPRING}
              onClick={() => onBooking('Home Sample Collection', 'home')}
              className="w-full flex items-center justify-center gap-2 h-[48px] rounded-[16px] bg-white/12 backdrop-blur-xl text-white font-semibold text-[14px] border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.15)] active:bg-white/20 transition-colors"
            >
              <Home className="w-4 h-4 text-emerald-400" />
              <span>Home Collection</span>
            </motion.button>
          </motion.div>

          {/* Trust strip — compact, evenly spaced */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.35 }}
            className="pt-3 border-t border-white/10 flex items-center justify-between text-slate-300"
          >
            {[
              { icon: Clock, label: '24×7 Service' },
              { icon: MessageCircle, label: 'WhatsApp Reports' },
              { icon: ShieldCheck, label: 'Reliable Results' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-[24px] h-[24px] rounded-full bg-white/10 flex items-center justify-center">
                  <Icon className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-[10.5px] font-semibold text-slate-200 tracking-tight">{label}</span>
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
            <ParallaxLayer speed={0.12} className="absolute top-10 left-[20%] w-[540px] h-[540px] bg-blue-100/35 rounded-full blur-[140px] pointer-events-none -z-10" />
            <ParallaxLayer speed={0.06} className="absolute -right-24 bottom-0 w-[440px] h-[440px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none -z-10" />
          </>
        )}

        <div className="max-w-[1480px] xl:max-w-[1600px] mx-auto px-6 lg:px-10 xl:px-14 relative py-6 lg:py-10 xl:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[calc(100vh-100px)] max-h-[860px]">

            {/* ── Left: Copy ── */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-6 lg:space-y-7 text-left z-10">
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
                className="text-[2.5rem] lg:text-[3.25rem] xl:text-[3.6rem] font-extrabold text-[#0a1120] tracking-[-0.035em] leading-[1.08]"
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
                className="text-[14.5px] lg:text-[15.5px] text-slate-500 max-w-md leading-[1.65] tracking-[-0.01em]"
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
                className="pt-5 border-t border-slate-100 flex items-center gap-6 text-slate-600"
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

            {/* ── Right: Hero image — Fluid fit on all screens ── */}
            <motion.div
              initial={{ opacity: 0, x: reduceMotion ? 0 : 32, scale: enterScale }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.08 }}
              className="lg:col-span-7 xl:col-span-7 relative flex justify-end items-center w-full"
            >
              {!reduceMotion && (
                <ParallaxLayer speed={0.08} className="absolute -right-16 top-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-gradient-to-br from-blue-100/40 via-emerald-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
              )}

              <div className="relative w-full max-w-[760px] 2xl:max-w-[820px]">
                {/* Image frame — fluid height clamp so it never overflows laptop and expands on desktop */}
                <div className="relative w-full h-[clamp(400px,56vh,620px)] rounded-[28px] lg:rounded-l-[220px] xl:rounded-l-[260px] lg:rounded-r-[32px] overflow-hidden bg-gradient-to-tr from-blue-50/80 via-white to-emerald-50/50 p-2 lg:p-2.5 border border-blue-200/50 shadow-[0_28px_72px_rgba(0,59,149,0.11)]">
                  <div className="relative w-full h-full rounded-[24px] lg:rounded-l-[212px] xl:rounded-l-[252px] lg:rounded-r-[26px] overflow-hidden bg-white shadow-inner">
                    <img
                      src="/images/hero-lab.jpg"
                      alt="Accurate Pathology — high-precision diagnostic laboratory in Hadapsar, Pune"
                      className="w-full h-full object-cover object-[center_28%]"
                    />
                    {/* Cinematic overlays */}
                    <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#003b95]/12 via-[#003b95]/4 to-transparent pointer-events-none hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120]/25 via-transparent to-transparent pointer-events-none" />

                    {/* Floating credential badge — bottom-left so it never overlaps WhatsApp FAB */}
                    <motion.div
                      animate={reduceMotion ? {} : { y: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute bottom-5 left-5 lg:bottom-6 lg:left-8 bg-white/95 backdrop-blur-2xl px-4 py-3 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-white/80 flex items-center gap-3.5 z-10"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003b95] flex items-center justify-center shadow-sm">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold text-[#0a1120] leading-tight tracking-tight">Reliable Results,</p>
                        <p className="text-[10px] font-semibold text-slate-500">Caring Service</p>
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
