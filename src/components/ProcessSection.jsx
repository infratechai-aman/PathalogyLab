import { motion } from 'framer-motion';
import { CalendarCheck, Home, FlaskConical, FileCheck, ChevronRight } from 'lucide-react';
import { StaggerReveal, RevealSection, fadeUp, scaleIn, slideRight } from '../animations';

const steps = [
  { icon: CalendarCheck, title: '1. Book Online', desc: 'Choose a test and schedule your slot' },
  { icon: Home, title: '2. Sample Pick', desc: 'Visit our lab or opt for home phlebotomy' },
  { icon: FlaskConical, title: '3. Precision Lab', desc: 'Analyzed with automated biomedical care' },
  { icon: FileCheck, title: '4. WhatsApp PDF', desc: 'Instant report on WhatsApp & paper copy' },
];

export default function ProcessSection() {
  return (
    <section className="py-16 lg:py-24 bg-white/60 backdrop-blur-md border-t border-slate-200/60" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Left heading */}
          <RevealSection variants={slideRight} className="lg:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#116e45]">SIMPLE PROCESS</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1120] tracking-[-0.02em] leading-tight">
              Get Tested in{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #116e45 0%, #0d9488 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                4 Easy Steps
              </span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fast, stress-free diagnostics from slot booking to encrypted WhatsApp report.
            </p>
          </RevealSection>

          {/* Steps */}
          <StaggerReveal className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative" stagger={0.1}>
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={scaleIn}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -8px rgba(17,110,69,0.12)' }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center text-center relative group"
              >
                <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-100 text-[#116e45] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0a1120] text-sm mb-1 tracking-tight">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                {/* Arrow between steps */}
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
