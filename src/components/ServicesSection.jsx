import { motion } from 'framer-motion';
import { Home, FlaskConical, FileText, ArrowRight } from 'lucide-react';
import { StaggerReveal, fadeUp, scaleIn } from '../animations';

const services = [
  {
    icon: Home,
    title: 'Home Sample Collection',
    shortTitle: 'Home Collection',
    desc: 'Get your sample collected from the comfort of your home by verified, certified phlebotomists across Hadapsar.',
    shortDesc: 'Certified phlebotomists at your doorstep across Hadapsar.',
    action: 'Book Home Visit',
    mode: 'home',
  },
  {
    icon: FlaskConical,
    title: 'Laboratory Testing',
    shortTitle: 'Lab Testing',
    desc: 'Accurate, high-precision diagnostic testing utilizing automated multi-parameter clinical analyzers.',
    shortDesc: 'High-precision automated diagnostic analyzers.',
    action: 'Book Lab Visit',
    mode: 'lab',
  },
  {
    icon: FileText,
    title: 'Reports on WhatsApp',
    shortTitle: 'WhatsApp Reports',
    desc: 'Receive certified PDF test reports directly on WhatsApp with authenticated digital signatures and QR verification.',
    shortDesc: 'Certified PDF reports sent directly to your WhatsApp.',
    action: 'Get Your Report',
    mode: 'whatsapp',
  },
];

export default function ServicesSection({ onBooking, onWhatsApp }) {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-white/70 backdrop-blur-md" id="services">
      <div className="max-w-[1480px] xl:max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Header */}
        <StaggerReveal className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 mb-8 sm:mb-14">
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0a1120] tracking-[-0.02em]">
            Diagnostic Services Designed for Your Comfort
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600 text-[13px] sm:text-sm lg:text-base leading-relaxed">
            Convenient, reliable, and patient-focused diagnostic care across Hadapsar, Pune.
          </motion.p>
        </StaggerReveal>

        {/* Mobile Cards — compact list style */}
        <div className="sm:hidden space-y-3">
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              whileTap={{ scale: 0.98 }}
              onClick={() => svc.mode === 'whatsapp' ? onWhatsApp() : onBooking(svc.title, svc.mode)}
              className="glass-card rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-white/90 flex items-center gap-4 cursor-pointer active:bg-blue-50/50 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-[#003b95] flex items-center justify-center shrink-0">
                <svc.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-bold text-[#0a1120] tracking-tight">{svc.shortTitle}</h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">{svc.shortDesc}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Cards */}
        <StaggerReveal className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" stagger={0.1}>
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              variants={scaleIn}
              whileHover={{ y: -8, boxShadow: '0 20px 48px -8px rgba(0,59,149,0.14), 0 8px 16px -4px rgba(0,0,0,0.05)' }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => svc.mode === 'whatsapp' ? onWhatsApp() : onBooking(svc.title, svc.mode)}
              className="glass-card relative rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-white/90 flex flex-col justify-between group cursor-pointer hover:border-blue-200/80 transition-colors duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-[#003b95] flex items-center justify-center group-hover:bg-[#003b95] group-hover:text-white transition-all duration-300 shadow-sm">
                  <svc.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1120] tracking-tight group-hover:text-[#003b95] transition-colors">
                  {svc.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{svc.desc}</p>
              </div>
              <div className="pt-6 mt-6 flex justify-between items-center border-t border-slate-100">
                <span className="text-xs font-semibold text-[#003b95] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {svc.action}
                </span>
                <span className="w-9 h-9 rounded-full bg-slate-100/90 text-slate-700 flex items-center justify-center group-hover:bg-[#003b95] group-hover:text-white transition-all duration-300">
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
