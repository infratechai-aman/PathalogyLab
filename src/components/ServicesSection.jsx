import { motion } from 'framer-motion';
import { Home, FlaskConical, FileText, ArrowRight } from 'lucide-react';
import { StaggerReveal, fadeUp, scaleIn } from '../animations';

const services = [
  {
    icon: Home,
    title: 'Home Sample Collection',
    desc: 'Get your sample collected from the comfort of your home by verified, certified phlebotomists across Hadapsar.',
    action: 'Book Home Visit',
    mode: 'home',
  },
  {
    icon: FlaskConical,
    title: 'Laboratory Testing',
    desc: 'Accurate, high-precision diagnostic testing utilizing automated multi-parameter clinical analyzers.',
    action: 'Book Lab Visit',
    mode: 'lab',
  },
  {
    icon: FileText,
    title: 'Reports on WhatsApp',
    desc: 'Receive certified PDF test reports directly on WhatsApp with authenticated digital signatures and QR verification.',
    action: 'Get Your Report',
    mode: 'whatsapp',
  },
];

export default function ServicesSection({ onBooking, onWhatsApp }) {
  return (
    <section className="py-16 lg:py-20 bg-white/70 backdrop-blur-md border-y border-slate-200/60" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <StaggerReveal className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#116e45]">
            OUR SERVICES
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-[#0a1120] tracking-[-0.02em]">
            Convenient, Reliable &amp; Patient-Focused
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Comprehensive diagnostic services designed for clinical accuracy and personal comfort.
          </motion.p>
        </StaggerReveal>

        {/* Cards */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" stagger={0.1}>
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              variants={scaleIn}
              whileHover={{ y: -8, boxShadow: '0 20px 48px -8px rgba(17,110,69,0.14), 0 8px 16px -4px rgba(0,0,0,0.05)' }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => svc.mode === 'whatsapp' ? onWhatsApp() : onBooking(svc.title, svc.mode)}
              className="glass-card relative rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-white/90 flex flex-col justify-between group cursor-pointer hover:border-green-200/80 transition-colors duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-100 text-[#116e45] flex items-center justify-center group-hover:bg-[#116e45] group-hover:text-white transition-all duration-300 shadow-sm">
                  <svc.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1120] tracking-tight group-hover:text-[#116e45] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{svc.desc}</p>
              </div>
              <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-100">
                <span className="text-xs font-semibold text-[#116e45] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {svc.action}
                </span>
                <span className="w-9 h-9 rounded-full bg-slate-100/90 text-slate-700 flex items-center justify-center group-hover:bg-[#116e45] group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
