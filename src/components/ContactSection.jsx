import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, FlaskConical, ArrowUpRight, Navigation } from 'lucide-react';
import { StaggerReveal, RevealSection, fadeUp } from '../animations';

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Tests & Packages', href: '#packages' },
  { label: 'Our Services', href: '#services' },
  { label: 'Home Collection', href: '#process' },
  { label: 'About Us', href: '#why-us' },
  { label: 'Frequently Asked', href: '#faq' },
  { label: 'Privacy Policy', href: '/privacy-policy.html', action: 'privacy' },
  { label: 'Terms of Service', href: '/terms-of-service.html', action: 'terms' },
];

export default function ContactSection({ onOpenPolicy }) {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-slate-50/80" id="contact">
      <div className="max-w-[1480px] xl:max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">

        {/* ═══ MOBILE LAYOUT ═══ */}
        <div className="sm:hidden space-y-5">
          {/* Call CTA — most important on mobile */}
          <motion.a
            href="tel:+918840658081"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm active:scale-[0.98] transition-transform"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-[#003b95] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-[#0a1120]">+91 88406 58081</p>
              <p className="text-[11px] text-slate-500">Tap to call now</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0" />
          </motion.a>

          {/* Map + Address card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
            className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="relative w-full h-44 overflow-hidden bg-slate-100">
              <iframe
                title="Accurate Pathology Laboratory Hadapsar"
                src="https://maps.google.com/maps?q=Mohammad+Wadi+Road+Hadapsar+Pune+411028&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#003b95] mt-0.5 shrink-0" />
                <span className="text-[12px] text-slate-600 leading-relaxed">Lane no 15/A, Mohammad Wadi Road, Autadwadi Handewadi, Sayyad Nagar, Hadapsar, Pune 411028</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#003b95] shrink-0" />
                <span className="text-[12px] font-semibold text-slate-900">Open 24 Hours <span className="font-normal text-slate-500">(24 × 7)</span></span>
              </div>
              <a
                href="https://maps.google.com/?q=Mohammad+Wadi+Road+Hadapsar+Pune+411028"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#003b95] text-white text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>
          </motion.div>

          {/* Open status badge */}
          <div className="flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Lab Open 24 Hours • Hadapsar
            </span>
          </div>
        </div>

        {/* ═══ DESKTOP/TABLET LAYOUT ═══ */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Brand column */}
          <StaggerReveal className="lg:col-span-4 space-y-4">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Accurate Pathology Laboratory"
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </motion.div>
            <motion.p variants={fadeUp} className="text-sm text-slate-600 leading-relaxed max-w-sm">
              A trusted pathology laboratory in Hadapsar, Pune offering accurate, reliable and convenient diagnostic services with automated medical quality.
            </motion.p>
            <motion.div variants={fadeUp} className="pt-2 flex items-center gap-3 text-slate-500">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
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
                <motion.li key={l.label} variants={fadeUp}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      if (l.action && onOpenPolicy) {
                        e.preventDefault();
                        onOpenPolicy(l.action);
                      }
                    }}
                    className="hover:text-[#003b95] transition-colors"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </StaggerReveal>

          {/* Contact details */}
          <StaggerReveal className="lg:col-span-3 space-y-3">
            <motion.h4 variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.15em] text-[#0a1120]">Contact Us</motion.h4>
            <div className="space-y-3 text-xs text-slate-600">
              <motion.div variants={fadeUp} className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#003b95] mt-0.5 shrink-0" />
                <a href="tel:+918840658081" className="font-semibold text-slate-900 hover:text-[#003b95] transition-colors">+91 88406 58081</a>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#003b95] mt-0.5 shrink-0" />
                <span className="leading-relaxed">Lane no 15/A, Mohammad Wadi Road, Autadwadi Handewadi, Sayyad Nagar, Hadapsar, Pune 411028</span>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#003b95] shrink-0" />
                <span className="font-semibold text-slate-900">Open 24 Hours <span className="font-normal text-slate-500">(24 × 7 Service)</span></span>
              </motion.div>
            </div>
          </StaggerReveal>

          {/* Map card */}
          <RevealSection className="lg:col-span-3">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-3">
              <div className="relative w-full h-36 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
                <iframe
                  title="Accurate Pathology Laboratory Location Hadapsar"
                  src="https://maps.google.com/maps?q=Mohammad+Wadi+Road+Hadapsar+Pune+411028&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 rounded-2xl"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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
