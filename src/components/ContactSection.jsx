import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, FlaskConical, ArrowUpRight } from 'lucide-react';
import { StaggerReveal, RevealSection, fadeUp } from '../animations';

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Tests & Packages', href: '#packages' },
  { label: 'Our Services', href: '#services' },
  { label: 'Home Collection', href: '#process' },
  { label: 'About Us', href: '#why-us' },
  { label: 'Frequently Asked', href: '#faq' },
];

export default function ContactSection() {
  return (
    <section className="py-16 lg:py-20 bg-slate-50/80 border-t border-slate-200/80" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Brand column */}
          <StaggerReveal className="lg:col-span-4 space-y-4">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#116e45] text-white flex items-center justify-center font-bold shadow-md shadow-green-800/20">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-[#0a1120] leading-none">ACCURATE</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#116e45] mt-0.5">Pathology Laboratory</span>
              </div>
            </motion.div>
            <motion.p variants={fadeUp} className="text-sm text-slate-600 leading-relaxed max-w-sm">
              A trusted pathology laboratory in Hadapsar, Pune offering accurate, reliable and convenient diagnostic services with automated medical quality.
            </motion.p>
            <motion.div variants={fadeUp} className="pt-2 flex items-center gap-3 text-slate-500">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Lab Open 24 Hours • Hadapsar
              </span>
            </motion.div>
          </StaggerReveal>

          {/* Quick links */}
          <StaggerReveal className="lg:col-span-2 space-y-3">
            <motion.h4 variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.15em] text-[#0a1120]">Quick Links</motion.h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-600">
              {quickLinks.map((l) => (
                <motion.li key={l.href} variants={fadeUp}>
                  <a href={l.href} className="hover:text-[#116e45] transition-colors">{l.label}</a>
                </motion.li>
              ))}
            </ul>
          </StaggerReveal>

          {/* Contact details */}
          <StaggerReveal className="lg:col-span-3 space-y-3">
            <motion.h4 variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.15em] text-[#0a1120]">Contact Us</motion.h4>
            <div className="space-y-3 text-xs text-slate-600">
              <motion.div variants={fadeUp} className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#116e45] mt-0.5 shrink-0" />
                <a href="tel:+918840658081" className="font-semibold text-slate-900 hover:text-[#116e45] transition-colors">+91 88406 58081</a>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#116e45] mt-0.5 shrink-0" />
                <span className="leading-relaxed">Lane no 15/A, Mohammad Wadi Road, Autadwadi Handewadi, Sayyad Nagar, Hadapsar, Pune 411028</span>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#116e45] shrink-0" />
                <span className="font-semibold text-slate-900">Open 24 Hours <span className="font-normal text-slate-500">(24 × 7 Service)</span></span>
              </motion.div>
            </div>
          </StaggerReveal>

          {/* Map card */}
          <RevealSection className="lg:col-span-3">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3">
              <div className="relative w-full h-32 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtJCtXA0XLNwTIKlgOcuVBxg10xkbhBF1WMvkD-P3CUt7qL_yfdwYLrQgB8rL_MAx5LhRKUzW5fFM1AOxSs5YAkvOJv18m2CHfrp4oEaVtCRtwls6Kw-gKssdJROMndAFmajAlQoSVV4h7QeZOZ8agpLGpywZQebe65oGjZgKMvuyhL0wJN33L_JYt4R2sBKAv0Uhszj6378htyH20Fx1hJ2623Avfq7gtEKObQbUp"
                  alt="Map"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md border border-slate-200 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#116e45] animate-ping" />
                    <span className="text-xs font-bold text-[#0a1120]">Accurate Lab, Hadapsar</span>
                  </div>
                </div>
              </div>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://maps.google.com/?q=Mohammad+Wadi+Road+Hadapsar+Pune+411028"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100/90 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
