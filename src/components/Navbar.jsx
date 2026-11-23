import { useEffect, useRef, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { LAB, telHref, formatPhone } from '../data/lab';
import { PrimaryButton } from './ui';

const links = [
  { label: 'Packages', href: '/#packages' },
  { label: 'Full Body', href: '/packages/full-body-profile' },
  { label: 'Fever Panel', href: '/packages/monsoon-fever-panel' },
  { label: 'All Tests', href: '/tests' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar({ onBooking }) {
  const [open, setOpen] = useState(false);
  const bar = useRef(null);

  // Scroll progress: transform only (no width/layout), written straight to the element.
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const p = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div id="scroll-progress-bar" ref={bar} style={{ transform: 'scaleX(0)' }} aria-hidden="true" />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="/" className="shrink-0" aria-label={`${LAB.name} home`}>
          <img src="/images/logo.webp" alt={LAB.name} width="360" height="117" className="h-10 w-auto sm:h-11" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="press hover-soft rounded-xl px-3 py-2 text-[14px] font-semibold text-slate-700">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={telHref()} className="press hover-soft hidden items-center gap-2 rounded-xl px-3 py-2 text-[14px] font-semibold text-ink md:flex">
            <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
            {formatPhone(LAB.phones[0])}
          </a>
          <PrimaryButton onClick={() => onBooking('General Test Booking', 'home')} className="hidden sm:inline-flex">
            Book a Test
          </PrimaryButton>
          <button
            type="button"
            className="press hover-soft flex h-11 w-11 items-center justify-center rounded-xl text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu: no animation on toggle — it is opened often and should feel instant */}
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-slate-200 bg-white lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="hover-soft block rounded-xl px-3 py-3 text-[16px] font-semibold text-ink">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <PrimaryButton size="md" className="w-full" onClick={() => { setOpen(false); onBooking('General Test Booking', 'home'); }}>
                Book Home Collection
              </PrimaryButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
