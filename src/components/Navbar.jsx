import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, PhoneCall, Calendar, Menu, X } from 'lucide-react';

// Condensed nav — 5 links max so pill never overflows
const navLinks = [
  { label: 'Home',      href: '#hero' },
  { label: 'Packages',  href: '#packages' },
  { label: 'Services',  href: '#services' },
  { label: 'About',     href: '#why-us' },
  { label: 'FAQs',      href: '#faq' },
  { label: 'Contact',   href: '#contact' },
];

// Full list shown in mobile drawer
const mobileLinks = [
  { label: 'Home',             href: '#hero' },
  { label: 'Tests & Packages', href: '#packages' },
  { label: 'Services',         href: '#services' },
  { label: 'Home Collection',  href: '#process' },
  { label: 'About Us',         href: '#why-us' },
  { label: 'FAQs',             href: '#faq' },
  { label: 'Contact',          href: '#contact' },
];

export default function Navbar({ onBooking }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [active,      setActive]      = useState('#hero');

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress((winScroll / height) * 100);
      setScrolled(winScroll > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => { setActive(href); setMobileOpen(false); };

  return (
    <>
      {/* Scroll progress */}
      <div id="scroll-progress-bar" style={{ width: `${progress}%` }} />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/92 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.07)] border-b border-slate-200/70'
            : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50'
        }`}
      >
        {/* ── DESKTOP / TABLET BAR ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[70px] flex items-center justify-between gap-4">

          {/* Logo — Actual Brand Logo */}
          <a
            href="#hero"
            onClick={() => handleNav('#hero')}
            className="flex items-center gap-2 shrink-0 group py-1"
          >
            <img
              src="/images/logo.png"
              alt="Accurate Pathology Laboratory"
              className="h-8 sm:h-10 w-auto object-contain group-hover:opacity-95 transition-opacity"
            />
          </a>

          {/* Desktop nav pill — only shown ≥ lg */}
          <nav className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-slate-100/80 border border-slate-200/60">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNav(link.href)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-200 ${
                  active === link.href
                    ? 'bg-white text-[#003b95] shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: phone + CTA (hidden on small mobile) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="tel:+918840658081"
              className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 hover:text-[#003b95] transition-colors whitespace-nowrap"
            >
              <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200/70 flex items-center justify-center text-[#003b95]">
                <PhoneCall className="w-3 h-3" />
              </div>
              <span>88406 58081</span>
            </a>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => onBooking('General Diagnostic Test')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#003b95] to-[#024ebb] text-white font-bold text-[11px] tracking-wide shadow-md shadow-blue-900/15 hover:shadow-blue-800/25 transition-shadow duration-200 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book a Test
            </motion.button>
          </div>

          {/* Mobile: compact CTA + hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onBooking('General Diagnostic Test')}
              className="px-3.5 py-2 rounded-full bg-[#003b95] text-white font-bold text-[11px] shadow-md"
            >
              Book Test
            </motion.button>
            <button
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.div>
                  : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.div>
                }
              </AnimatePresence>
            </button>
          </div>

          {/* Desktop hamburger (md range: tablet) */}
          <button
            className="hidden sm:flex lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>

        {/* ── MOBILE / TABLET DRAWER ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="lg:hidden overflow-hidden border-t border-slate-100 bg-white/98 backdrop-blur-2xl"
            >
              <div className="px-4 pt-3 pb-6 space-y-1">
                {mobileLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    onClick={() => handleNav(link.href)}
                    className={`flex items-center gap-2 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active === link.href
                        ? 'font-semibold text-[#003b95] bg-blue-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <div className="pt-3 border-t border-slate-100 mt-2 grid grid-cols-2 gap-2.5">
                  <a
                    href="tel:+918840658081"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 font-semibold text-sm text-slate-900"
                  >
                    <PhoneCall className="w-4 h-4 text-[#003b95]" />
                    <span>Call Now</span>
                  </a>
                  <button
                    onClick={() => { setMobileOpen(false); onBooking('Mobile Menu Booking'); }}
                    className="w-full py-3 bg-[#003b95] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Test
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
