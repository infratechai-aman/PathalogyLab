import { useState } from 'react';
import {
  Clock, CloudRain, FlaskConical, Home, ShieldCheck, Microscope, HeartHandshake,
  UserCheck, BadgeCheck, CalendarCheck, Droplet, FileText, ChevronDown, ArrowRight, MapPin, Info,
} from 'lucide-react';
import {
  CATEGORIES, PACKAGES, COMPARISON_ROWS, TRUST_BADGES, STEPS, FAQS, LAB, FLAGS, SCALE_CLAIMS,
  getPackage, formatPrice, waPackageMessage, formatPhone,
} from '../data/lab';
import PackageCard, { Price } from './PackageCard';
import { Container, SectionHeading, CallButton, WhatsAppButton, PrimaryButton } from './ui';

/* ─────────── Popular packages with filter tabs ─────────── */
export function PackagesGrid({ onBooking }) {
  const [cat, setCat] = useState('all');
  const list = cat === 'all' ? PACKAGES : PACKAGES.filter((p) => p.categories.includes(cat));

  return (
    <section id="packages" aria-labelledby="packages-title" className="py-12 sm:py-20">
      <Container>
        <SectionHeading
          id="packages-title"
          eyebrow="Health checkup packages"
          title="Popular packages, honest prices"
          intro="Every package includes home sample collection. Tap a package to see everything it covers."
        />

        <div className="-mx-4 mb-6 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
          <div role="group" aria-label="Filter packages" className="inline-flex gap-1.5 rounded-2xl bg-slate-100 p-1.5">
            {CATEGORIES.map((c) => {
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCat(c.id)}
                  className={`tab-pill press whitespace-nowrap rounded-xl px-4 py-2 text-[14px] font-semibold ${
                    active ? 'bg-white text-brand shadow-sm' : 'text-slate-600'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((pkg, i) => (
            <PackageCard key={pkg.slug} pkg={pkg} index={i} onBooking={onBooking} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─────────── Full Body Profile highlight ─────────── */
export function FullBodyHighlight({ onBooking }) {
  const pkg = getPackage('full-body-profile');
  return (
    <section id="full-body" aria-labelledby="fullbody-title" className="py-12 sm:py-20 bg-white">
      <Container>
        <div className="reveal grid overflow-hidden rounded-[28px] bg-brand text-white lg:grid-cols-[1.1fr_1fr]">
          <div className="p-6 sm:p-10">
            <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em]">
              Special offer · Save {formatPrice(pkg.mrp - pkg.price)}
            </span>
            <h2 id="fullbody-title" className="mt-4 text-[1.75rem] sm:text-4xl font-extrabold leading-tight tracking-[-0.025em]">
              Full Body Profile: {pkg.parameters} parameters
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-blue-100">{pkg.about}</p>
            <p className="mt-5 flex items-baseline gap-3">
              <span className="text-4xl font-extrabold">{formatPrice(pkg.price)}</span>
              <span className="text-lg text-blue-200 line-through">MRP {formatPrice(pkg.mrp)}</span>
            </p>
            <p className="mt-2 flex items-center gap-2 text-[14px] font-semibold text-amber-200">
              <Info className="h-4 w-4" aria-hidden="true" /> {pkg.fasting.split('.')[0]}.
            </p>
            <div className="mt-6 grid gap-2.5 sm:flex">
              <button
                type="button"
                onClick={() => onBooking(pkg.name, 'home')}
                className="press inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-[15px] font-bold text-brand"
              >
                Book Full Body Checkup <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <WhatsAppButton size="md" message={waPackageMessage(pkg)} label="Ask on WhatsApp" />
            </div>
          </div>
          <div className="bg-[#002f78] p-6 sm:p-10">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-blue-200">Parameter breakdown</p>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-[14px]">
              {pkg.groups.map((g) => (
                <li key={g.name} className="flex items-baseline justify-between gap-2 border-b border-white/10 pb-2">
                  <span className="text-blue-50">{g.name}</span>
                  <span className="font-bold tabular-nums">{g.count}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-right text-[14px] font-bold">Total = {pkg.parameters}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────── Monsoon Fever Panel banner ─────────── */
export function MonsoonBanner({ onBooking }) {
  const pkg = getPackage('monsoon-fever-panel');
  return (
    <section id="fever-panel" aria-labelledby="fever-title" className="py-12 sm:py-16">
      <Container>
        <div className="reveal rounded-[28px] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-sky-900">
                <CloudRain className="h-4 w-4" aria-hidden="true" /> Seasonal · {pkg.badge}
              </span>
              <h2 id="fever-title" className="mt-4 text-[1.6rem] sm:text-4xl font-extrabold leading-tight tracking-[-0.025em] text-ink">
                Monsoon Fever Panel Advanced ({pkg.parameters} parameters)
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                Dengue, malaria, typhoid and CBC checked together when fever won’t go away.
              </p>
              <ul className="mt-4 space-y-2 text-[14.5px] font-semibold text-slate-800">
                <li className="flex items-center gap-2"><Clock className="h-[18px] w-[18px] text-brand" aria-hidden="true" /> {pkg.reportTime}</li>
                <li className="flex items-center gap-2"><Home className="h-[18px] w-[18px] text-mint" aria-hidden="true" /> <span><strong className="text-mint">FREE</strong> home collection</span></li>
              </ul>
              <p className="mt-5 text-2xl font-extrabold text-ink">Call for price</p>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:flex">
                <CallButton size="md" label="Call for price" className="col-span-2 sm:col-span-1" />
                <WhatsAppButton size="md" message={waPackageMessage(pkg)} label="WhatsApp" />
                <PrimaryButton size="md" onClick={() => onBooking(pkg.name, 'home')}>Book</PrimaryButton>
              </div>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {pkg.groups.map((g) => (
                <li key={g.name} className="rounded-2xl border border-sky-100 bg-white px-4 py-3">
                  <p className="flex items-baseline justify-between gap-2 text-[14.5px] font-bold text-ink">
                    {g.name}
                    {g.count > 1 && <span className="text-[13px] font-semibold text-slate-500">{g.count}</span>}
                  </p>
                  {g.tests && <p className="mt-0.5 text-[13px] text-slate-600">{g.tests.join(', ')}</p>}
                </li>
              ))}
              <li className="rounded-2xl bg-ink px-4 py-3 text-[14.5px] font-bold text-white sm:col-span-2">
                Total = {pkg.parameters} parameters
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────── Hormonal Evaluation ─────────── */
export function HormonalSection({ onBooking }) {
  const pkg = getPackage('hormonal-evaluation');
  return (
    <section id="hormonal" aria-labelledby="hormonal-title" className="py-12 sm:py-16 bg-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="reveal">
            <SectionHeading id="hormonal-title" eyebrow="Hormones & fertility" title={`Hormonal Evaluation (${pkg.parameters} tests)`} intro={pkg.about} />
            <Price pkg={pkg} large />
            <p className="mt-2 text-[14px] text-slate-600">{pkg.fasting}</p>
            <div className="mt-5 grid grid-cols-[auto_1fr] gap-2.5 sm:flex">
              <CallButton size="md" />
              <WhatsAppButton size="md" message={waPackageMessage(pkg)} label="WhatsApp" />
              <PrimaryButton size="md" className="col-span-2" onClick={() => onBooking(pkg.name, 'home')}>Book Hormonal Evaluation</PrimaryButton>
            </div>
          </div>
          <ul className="reveal grid grid-cols-2 gap-2 sm:grid-cols-3" style={{ '--i': 1 }}>
            {pkg.groups.flatMap((g) => (g.tests ? g.tests.map((x) => ({ name: x, group: g.name })) : [{ name: g.name }])).map((x) => (
              <li key={x.name} className="rounded-2xl border border-slate-200 bg-[#fbfcfe] px-3.5 py-3 text-[14px] font-semibold text-ink">
                {x.name}
                {x.group && <span className="block text-[12px] font-medium text-slate-500">{x.group}</span>}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ─────────── Comparison table: Mini 1 → Gym Pro ─────────── */
export function ComparisonTable() {
  const cols = ['complete-mini-1', 'complete-mini-2', 'complete-mini-3', 'complete-advance', 'complete-gym-pro'].map(getPackage);
  return (
    <section id="compare" aria-labelledby="compare-title" className="py-12 sm:py-20">
      <Container>
        <SectionHeading id="compare-title" eyebrow="Compare" title="Which checkup is right for you?" intro="Swipe sideways on mobile to see every package." />
        <div className="reveal -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-slate-200 bg-white text-[14px]">
            <caption className="sr-only">Tests included in each Complete health checkup package</caption>
            <thead>
              <tr>
                <th scope="col" className="sticky left-0 z-10 bg-white px-4 py-3 text-left text-[13px] font-bold text-slate-500">Test</th>
                {cols.map((p) => (
                  <th key={p.slug} scope="col" className="bg-white px-3 py-3 text-center align-bottom">
                    <a href={`/packages/${p.slug}`} className="block font-bold text-ink hover:text-brand-600">{p.shortName}</a>
                    <span className="block text-[15px] font-extrabold text-brand">{formatPrice(p.price)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, r) => (
                <tr key={row.key} className={r % 2 ? 'bg-white' : 'bg-slate-50'}>
                  <th scope="row" className={`sticky left-0 z-10 px-4 py-2.5 text-left font-medium text-slate-700 ${r % 2 ? 'bg-white' : 'bg-slate-50'}`}>
                    {row.label}
                  </th>
                  {cols.map((p) => {
                    const has = p.includes.some((i) => i.key === row.key);
                    return (
                      <td key={p.slug} className="px-3 py-2.5 text-center">
                        {has ? (
                          <span className="text-[17px] font-bold text-mint" aria-label="Included">✓</span>
                        ) : (
                          <span className="text-slate-300" aria-label="Not included">–</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <th scope="row" className="sticky left-0 z-10 bg-white px-4 py-3 text-left font-bold text-ink">Total tests</th>
                {cols.map((p) => (
                  <td key={p.slug} className="px-3 py-3 text-center font-bold text-ink">{p.includes.length}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

/* ─────────── How it works ─────────── */
const stepIcons = [CalendarCheck, Droplet, FileText];
export function HowItWorks() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-12 sm:py-20 bg-white">
      <Container>
        <SectionHeading id="process-title" eyebrow="How it works" title="Book → Sample Collection → Report" align="center" />
        <ol className="grid gap-3 sm:grid-cols-3 sm:gap-5">
          {STEPS.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <li key={s.title} className="reveal flex gap-4 rounded-3xl border border-slate-200 bg-[#fbfcfe] p-5 sm:flex-col sm:p-6" style={{ '--i': i }}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-mint">Step {i + 1}</span>
                  <h3 className="mt-0.5 text-[17px] font-bold text-ink">{s.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{s.desc}</p>
                </span>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/* ─────────── Trust badges ─────────── */
const badgeIcons = { accurate: BadgeCheck, tech: Microscope, care: HeartHandshake, skilled: UserCheck, hygienic: ShieldCheck, free: Home };
export function TrustBadges() {
  return (
    <section id="why-us" aria-labelledby="trust-title" className="py-12 sm:py-20">
      <Container>
        <SectionHeading id="trust-title" eyebrow={LAB.taglines[1]} title="Why patients in Hadapsar choose us" align="center" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {TRUST_BADGES.map((b, i) => {
            const Icon = badgeIcons[b.id];
            return (
              <li key={b.id} className="reveal flex flex-col items-center gap-2.5 rounded-3xl border border-slate-200 bg-white px-3 py-5 text-center" style={{ '--i': i % 3 }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint-50 text-mint">
                  <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                </span>
                <span className="text-[14px] font-bold leading-snug text-ink">{b.label}</span>
              </li>
            );
          })}
        </ul>
        {FLAGS.showScaleClaims && (
          <p className="mt-5 text-center text-[14px] font-semibold text-slate-600">{SCALE_CLAIMS.join(' · ')}</p>
        )}
        <p className="mt-6 text-center text-[15px] font-semibold text-slate-700">
          <FlaskConical className="mr-1.5 inline h-[18px] w-[18px] text-brand" aria-hidden="true" />
          {LAB.allTestsLine}. <a href="/tests" className="text-brand underline underline-offset-4">Browse the tests directory</a>
        </p>
      </Container>
    </section>
  );
}

/* ─────────── Home collection areas (local SEO) ─────────── */
export function HomeCollectionAreas() {
  return (
    <section id="home-collection" aria-labelledby="areas-title" className="py-12 sm:py-16 bg-white">
      <Container>
        <div className="reveal grid gap-6 rounded-[28px] border border-slate-200 bg-[#fbfcfe] p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 id="areas-title" className="text-[1.5rem] sm:text-3xl font-extrabold tracking-[-0.02em] text-ink">
              Pathology lab near you in Mohammadwadi &amp; Sayyad Nagar
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Our lab is on Mohammad Wadi Road (Lane No 15/A, Sayyad Nagar), so homes in Mohammadwadi, Sayyad Nagar, Autadwadi and Handewadi are just a few minutes away. Walk in any time, day or night, or book home collection: our phlebotomists come to your home with sealed, single-use kits, so you do not need to travel or wait in a queue.
              Home collection is available on all packages, and it is free for the Monsoon Fever Panel. Book a morning slot for
              tests that need fasting.
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-2">
            {LAB.homeCollectionAreas.map((a) => (
              <li key={a} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[14px] font-semibold text-slate-700">
                <MapPin className="h-4 w-4 text-mint" aria-hidden="true" /> {a}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* ─────────── FAQ accordion ─────────── */
export function FAQList({ faqs, idPrefix = 'faq' }) {
  const [open, setOpen] = useState(-1);
  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        const id = `${idPrefix}-${i}`;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15.5px] font-bold text-ink hover-soft"
              >
                {f.q}
                <ChevronDown className="chevron h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
              </button>
            </h3>
            {/* Answer stays in the DOM so crawlers and AI search can read it */}
            <div id={id} role="region" className="collapse" data-open={isOpen}>
              <div>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-slate-600">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-12 sm:py-20">
      <Container className="max-w-3xl">
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions before your test" align="center" />
        <FAQList faqs={FAQS} />
        <p className="mt-5 text-center text-[14px] text-slate-600">
          Still have a question? Call <a className="font-semibold text-brand" href={`tel:+91${LAB.phones[0]}`}>{formatPhone(LAB.phones[0])}</a>.
        </p>
      </Container>
    </section>
  );
}

export function Disclaimer({ className = '' }) {
  return (
    <p className={`flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13.5px] leading-relaxed text-amber-950 ${className}`}>
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      {LAB.disclaimer}
    </p>
  );
}
