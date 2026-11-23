import { Clock, FileText, Home, ShieldCheck, ArrowRight } from 'lucide-react';
import { LAB, getPackage, formatPrice } from '../data/lab';
import { Container, PrimaryButton, WhatsAppButton } from './ui';

const fullBody = getPackage('full-body-profile');

/* Mobile-first hero. The H1 paints from the prerendered HTML with no JS-driven
   opacity, so it can be the LCP element without waiting for hydration. */
export default function HeroSection({ onBooking }) {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden bg-gradient-to-b from-white to-[#f2f6fc]">
      <Container className="grid items-center gap-8 pt-6 pb-10 sm:pt-12 sm:pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-16 lg:pb-20">
        <div>
          <p className="enter inline-flex items-center gap-2 rounded-full border border-mint-500/25 bg-mint-50 px-3 py-1.5 text-[12px] font-semibold text-mint">
            <span className="h-2 w-2 rounded-full bg-mint-500" aria-hidden="true" />
            Open 24×7 · Mohammad Wadi Road, Sayyad Nagar
          </p>

          <h1 id="hero-title" className="mt-4 text-[2.15rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-[-0.035em] text-ink text-balance">
            Pathology Lab &amp; Blood Test at Home in <span className="text-brand">Mohammadwadi, Pune</span>
          </h1>

          <p className="enter mt-3 text-[13px] font-bold uppercase tracking-[0.14em] text-mint" style={{ '--i': 1 }}>
            {LAB.taglines[0]}
          </p>

          <p className="enter mt-3 max-w-xl text-[15.5px] sm:text-lg leading-relaxed text-slate-600" style={{ '--i': 2 }}>
            Your neighbourhood lab in Sayyad Nagar, Hadapsar. Health checkup packages from ₹299, a full body checkup with 85 tests and a monsoon fever panel, with
            sample collection at your doorstep and reports on WhatsApp. {LAB.allTestsLine}.
          </p>

          <div className="enter mt-6 grid gap-2.5 sm:flex sm:flex-wrap" style={{ '--i': 3 }}>
            <PrimaryButton size="md" onClick={() => onBooking('Home Sample Collection', 'home')} className="w-full sm:w-auto">
              <Home className="h-[18px] w-[18px]" aria-hidden="true" />
              Book Home Collection
            </PrimaryButton>
            <WhatsAppButton
              size="md"
              label="WhatsApp Us"
              message="Hello Accurate Pathology, I want to book a blood test at home."
              className="w-full sm:w-auto"
            />
          </div>

          <ul className="enter mt-6 grid grid-cols-3 gap-2 text-[12.5px] font-semibold text-slate-700 sm:max-w-md" style={{ '--i': 4 }}>
            {[
              { icon: Clock, label: 'Open 24×7' },
              { icon: FileText, label: 'Reports on WhatsApp' },
              { icon: ShieldCheck, label: 'Hygienic collection' },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-2 py-3 text-center">
                <Icon className="h-[18px] w-[18px] text-brand" aria-hidden="true" />
                <span className="leading-tight">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Photo: a contained card on mobile instead of a dark full-bleed backdrop */}
        <div className="relative">
          <div className="overflow-hidden rounded-[28px] border border-white bg-slate-100 shadow-[0_24px_60px_-24px_rgba(0,59,149,0.35)] ring-1 ring-slate-200">
            <img
              src="/images/hero-lab-960.webp"
              srcSet="/images/hero-lab-640.webp 640w, /images/hero-lab-960.webp 960w, /images/hero-lab.webp 1376w"
              sizes="(min-width: 1024px) 560px, calc(100vw - 32px)"
              width="1376"
              height="768"
              fetchPriority="high"
              alt="Lab technician at Accurate Pathology Laboratory, Hadapsar, holding blood sample tubes"
              className="aspect-[4/3] w-full object-cover object-[45%_30%] lg:aspect-[5/4]"
            />
          </div>

          <a
            href={`/packages/${fullBody.slug}`}
            className="press absolute -bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.3)] backdrop-blur sm:left-auto sm:right-6 sm:w-80"
          >
            <span className="min-w-0">
              <span className="block text-[12px] font-bold uppercase tracking-[0.1em] text-mint">Special offer</span>
              <span className="block truncate text-[15px] font-bold text-ink">Full Body · {fullBody.parameters} tests</span>
            </span>
            <span className="flex shrink-0 items-center gap-2">
              <span className="text-right leading-tight">
                <span className="block text-lg font-extrabold text-ink">{formatPrice(fullBody.price)}</span>
                <span className="block text-[12px] text-slate-500 line-through">{formatPrice(fullBody.mrp)}</span>
              </span>
              <ArrowRight className="h-4 w-4 text-brand" aria-hidden="true" />
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
