import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical, PhoneCall, Calendar, Menu, X, MapPin, Home
} from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Tests & Packages', href: '#packages' },
  { label: 'Services', href: '#services' },
  { label: 'Home Collection', href: '#process' },
  { label: 'About', href: '#why-us' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('#hero');

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress((winScroll / height) * 100);
      setScrolled(winScroll > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        id="scroll-progress-bar"
        style={{ width: `${progress}%` }}
      />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-slate-200/60'
            : 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/50'
        }`}
        id="main-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3.5 group" onClick={() => handleNav('#hero')}>
            <div className="relative flex items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#116e45] via-[#0d5f3a] to-[#0a1120] flex items-center justify-center text-white shadow-md shadow-green-800/20 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
                <FlaskConical className="w-6 h-6" />
                <span className="absolute -bottom-1 -right-1 bg-[#239c71] text-white p-0.5 rounded-full ring-2 ring-white shadow-sm">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="18.5" cy="17.5" r="3.5"/>
                    <circle cx="5.5" cy="17.5" r="3.5"/>
                    <path d="M15 6h-5a2 2 0 0 0-2 2v7h11.5"/>
                    <path d="M9 18h6"/>
                    <path d="M19 17a1 1 0 0 0 1-1v-4l-3-4h-2"/>
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0a1120] leading-none">ACCURATE</span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#116e45] mt-1">Pathology Laboratory</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1.5 p-1 rounded-full bg-slate-100/70 border border-slate-200/50 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNav(link.href)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  active === link.href
                    ? 'text-[#116e45] bg-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0a1120] hover:bg-white/60'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:+918840658081"
              className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-[#116e45] transition-colors py-2 px-3 rounded-full hover:bg-slate-100/80"
            >
              <div className="w-7 h-7 rounded-full bg-green-50 border border-green-200/60 flex items-center justify-center text-[#116e45]">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-tight">+91 88406 58081</span>
            </a>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', duration: 0.2, bounce: 0.3 }}
              onClick={() => onBooking('General Diagnostic Test')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#0d5f3a] to-[#116e45] hover:from-[#116e45] hover:to-[#157e5b] text-white font-semibold text-xs tracking-wide shadow-md shadow-green-900/15 hover:shadow-lg hover:shadow-green-800/25 transition-all duration-200"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Test</span>
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-6 h-6" /></motion.div>
                : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-6 h-6" /></motion.div>
              }
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="lg:hidden overflow-hidden border-t border-slate-100 bg-white/97 backdrop-blur-2xl"
            >
              <div className="px-5 pt-4 pb-7 space-y-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    onClick={() => handleNav(link.href)}
                    className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active === link.href
                        ? 'font-semibold text-[#116e45] bg-green-50'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <a href="tel:+918840658081" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 font-semibold text-sm text-slate-900">
                    <PhoneCall className="w-4 h-4 text-[#116e45]" />
                    <span>+91 88406 58081</span>
                  </a>
                  <button
                    onClick={() => { setMobileOpen(false); onBooking('Mobile Menu Booking'); }}
                    className="w-full py-3 bg-[#0d5f3a] hover:bg-[#116e45] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book a Test Now</span>
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
