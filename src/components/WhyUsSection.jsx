import { motion } from 'framer-motion';
import { Check, ChevronRight, ShieldCheck } from 'lucide-react';
import { RevealSection, StaggerReveal, fadeUp, scaleIn, AnimatedCounter } from '../animations';

const stats = [
  { to: 24, suffix: '×7', label: 'Hours Service' },
  { to: 5000, suffix: '+', label: 'Happy Patients' },
  { to: 100, suffix: '+', label: 'Tests Available' },
  { to: 4, suffix: ' Hrs', prefix: '<', label: 'Report Turnaround' },
];

const values = [
  '24×7 Diagnostic Service',
  'Home Collection Facility Across Hadapsar',
  'Timely, Accurate & Barcoded Reports',
  'Trusted by Doctors and Pune Community',
];

export default function WhyUsSection({ onBooking }) {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white/70 backdrop-blur-md border-t border-slate-200/60" id="why-us">
      {/* Stats marquee strip */}
      <div className="bg-gradient-to-r from-[#0a492e] via-[#116e45] to-[#0a492e] py-3.5 sm:py-5 overflow-hidden mb-10 sm:mb-16">
        <div className="flex gap-8 sm:gap-16 animate-marquee whitespace-nowrap">
          {[...stats, ...stats].map((s, i) => (
            <div key={i} className="inline-flex items-center gap-2 sm:gap-3 text-white">
              <span className="text-lg sm:text-2xl font-extrabold tabular-nums">
                {s.prefix && <span>{s.prefix}</span>}
                <AnimatedCounter to={s.to} suffix={s.suffix} duration={1.5} />
              </span>
              <span className="text-green-200 text-[11px] sm:text-sm font-medium">{s.label}</span>
              <span className="text-green-500/50 text-lg sm:text-2xl">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left content */}
          <StaggerReveal className="lg:col-span-5 space-y-4 sm:space-y-6" stagger={0.1}>
            <motion.p variants={fadeUp} className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#116e45]">
              WHY CHOOSE ACCURATE?
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1120] tracking-[-0.02em] leading-tight">
              More Than Just a{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #116e45 0%, #0d9488 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Pathology Lab
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-[13px] sm:text-sm lg:text-base leading-relaxed">
              We combine clinical accuracy, doorstep convenience, and sincere care to make testing seamless for you and your family.
            </motion.p>

            <motion.ul variants={fadeUp} className="space-y-2.5 sm:space-y-3.5 pt-1 sm:pt-2">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-3 font-semibold text-slate-800 text-[13px] sm:text-sm lg:text-base">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#116e45] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                  </div>
                  <span>{v}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="pt-3 sm:pt-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', duration: 0.2, bounce: 0.3 }}
                onClick={() => onBooking('Doctor Consultation & Pathology')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-2xl bg-[#0d5f3a] text-white font-semibold text-xs tracking-wide shadow-lg shadow-green-900/15 active:scale-95 transition-transform"
              >
                <span>Experience Our Quality</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </StaggerReveal>

          {/* Right image — hidden on mobile, shown on sm+ */}
          <RevealSection className="hidden sm:block lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[16/10] group">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDdEvRu1W6VzulOuiv_dcndLN4clLeOXumu1Jq7iQJSsTkdss_UpsD2f5Mqv9Pvl63RYHTHCAyCQAZHCOIH8S8uXxw4lf0yTSvr4H0n-63zXoxfGLP28LGwTh0cWbZkFeeKf2q7WeZbCkYyX6fz3_WQG36txqyYiZ8RhXHkSgPAjhNYy_Nj-KU99EtVrim-kq5UPKjw-gA0lmT1ZPhKJLzn5aMLtkV3nI066pYzC-p1M29xfEIuqNq4Q"
                alt="Lab technician"
                className="w-full h-full object-cover"
              />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/80 flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 text-[#116e45] flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0a1120] leading-tight">Reliable Results,</p>
                  <p className="text-xs font-semibold text-slate-500">Caring Service</p>
                </div>
              </motion.div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
