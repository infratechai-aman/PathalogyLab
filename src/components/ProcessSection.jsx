import { motion } from 'framer-motion';
import { CalendarCheck, Home, FlaskConical, FileCheck, ChevronRight } from 'lucide-react';
import { StaggerReveal, RevealSection, fadeUp, scaleIn, slideRight } from '../animations';

const steps = [
  { icon: CalendarCheck, title: 'Book Online', desc: 'Choose a test & schedule', num: '1' },
  { icon: Home, title: 'Sample Pick', desc: 'Lab visit or home collection', num: '2' },
  { icon: FlaskConical, title: 'Precision Lab', desc: 'Automated biomedical analysis', num: '3' },
  { icon: FileCheck, title: 'WhatsApp PDF', desc: 'Instant report delivery', num: '4' },
];

export default function ProcessSection() {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-white/60 backdrop-blur-md" id="process">
      <div className="max-w-[1480px] xl:max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center mb-6 sm:mb-10">
          <RevealSection variants={slideRight} className="lg:col-span-4 space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1120] tracking-[-0.02em] leading-tight">
              Get Tested in{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #003b95 0%, #024ebb 50%, #16a34a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                4 Simple Steps
              </span>
            </h2>
            <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed">
              Fast, stress-free diagnostics from booking to report.
            </p>
          </RevealSection>

          {/* Mobile: 2x2 compact grid */}
          <div className="sm:hidden grid grid-cols-2 gap-3">
            {steps.map((step) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-[#003b95] flex items-center justify-center mb-2 relative">
                  <step.icon className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#003b95] text-white text-[8px] font-bold flex items-center justify-center">{step.num}</span>
                </div>
                <h3 className="font-bold text-[#0a1120] text-[12px] mb-0.5 tracking-tight">{step.title}</h3>
                <p className="text-[10px] text-slate-500 leading-snug">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Desktop/Tablet steps */}
          <StaggerReveal className="hidden sm:grid lg:col-span-8 grid-cols-2 lg:grid-cols-4 gap-5 relative" stagger={0.1}>
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={scaleIn}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -8px rgba(0,59,149,0.12)' }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center text-center relative group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#003b95] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0a1120] text-sm mb-1 tracking-tight">{step.num}. {step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-slate-300">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
