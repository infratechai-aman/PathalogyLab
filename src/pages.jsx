import { useMemo, useState } from 'react';
import { Check, ChevronRight, Clock, Home, Search, Utensils, Users, ClipboardList } from 'lucide-react';
import { LAB, PACKAGES, TESTS_DIRECTORY, getPackage, includedList, testCount, waPackageMessage, formatPrice, packageImage } from './data/lab';
import { packageFaqs } from './seo';
import HeroSection from './components/HeroSection';
import {
  PackagesGrid, FullBodyHighlight, MonsoonBanner, HormonalSection, ComparisonTable, HowItWorks,
  TrustBadges, HomeCollectionAreas, FAQSection, FAQList, Disclaimer,
} from './components/HomeSections';
import ContactSection from './components/ContactSection';
import PackageCard, { Price } from './components/PackageCard';
import { Container, CallButton, WhatsAppButton, PrimaryButton } from './components/ui';

export function HomePage({ onBooking }) {
  return (
    <>
      <HeroSection onBooking={onBooking} />
      <PackagesGrid onBooking={onBooking} />
      <FullBodyHighlight onBooking={onBooking} />
      <MonsoonBanner onBooking={onBooking} />
      <HormonalSection onBooking={onBooking} />
      <ComparisonTable />
      <HowItWorks />
      <TrustBadges />
      <HomeCollectionAreas />
      <FAQSection />
      <Container className="pb-4"><Disclaimer /></Container>
      <ContactSection />
    </>
  );
}

function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-slate-600">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />}
            {it.href ? <a href={it.href} className="hover:text-brand">{it.name}</a> : <span aria-current="page" className="font-semibold text-ink">{it.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

const InfoBlock = ({ icon: Icon, title, children }) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
    <h2 className="flex items-center gap-2 text-[18px] font-bold text-ink">
      <Icon className="h-5 w-5 text-brand" aria-hidden="true" /> {title}
    </h2>
    <div className="mt-3 text-[15px] leading-relaxed text-slate-700">{children}</div>
  </section>
);

export function PackagePage({ pkg, onBooking }) {
  const items = includedList(pkg);
  const others = PACKAGES.filter((p) => p.slug !== pkg.slug && p.categories.some((c) => pkg.categories.includes(c))).slice(0, 3);
  const related = others.length ? others : PACKAGES.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <>
      <section className="bg-gradient-to-b from-white to-[#f2f6fc] pb-10 pt-5 sm:pt-8">
        <Container>
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Packages', href: '/#packages' }, { name: pkg.name }]} />
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              {pkg.badge && (
                <span className="inline-flex rounded-full bg-mint-50 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-mint ring-1 ring-mint-500/25">{pkg.badge}</span>
              )}
              <h1 className="mt-3 text-[2rem] leading-[1.1] sm:text-5xl font-extrabold tracking-[-0.03em] text-ink text-balance">
                {pkg.name}
                {pkg.parameters ? <span className="text-brand"> ({pkg.parameters} {pkg.parameters > 20 ? 'parameters' : 'tests'})</span> : null}
              </h1>
              <p className="mt-3 text-[16px] leading-relaxed text-slate-600">{pkg.about}</p>
              <ul className="mt-5 flex flex-wrap gap-2 text-[13.5px] font-semibold text-slate-700">
                <li className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  <Home className="h-4 w-4 text-mint" aria-hidden="true" /> {pkg.freeHomeCollection ? 'FREE home collection' : 'Home collection available'}
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                  <Utensils className="h-4 w-4 text-brand" aria-hidden="true" /> {pkg.fasting.startsWith('No fasting') || pkg.fasting.startsWith('Fasting is usually not') ? 'No fasting needed' : pkg.slug === 'full-body-profile' ? '10–12 hrs fasting' : '8–12 hrs fasting'}
                </li>
                {pkg.reportTime && (
                  <li className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5">
                    <Clock className="h-4 w-4 text-brand" aria-hidden="true" /> Report in 4 hours
                  </li>
                )}
              </ul>
            </div>

            <aside aria-label="Price and booking" className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_-20px_rgba(0,59,149,0.25)] sm:p-6 lg:sticky lg:top-24">
              <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-3xl bg-slate-100 sm:-mx-6 sm:-mt-6">
                <img
                  {...packageImage(pkg)}
                  sizes="(min-width: 1024px) 420px, calc(100vw - 32px)"
                  width="800"
                  height="480"
                  decoding="async"
                  className="aspect-[5/3] w-full object-cover"
                />
              </div>
              <p className="text-[13px] font-semibold text-slate-500">{testCount(pkg)} {pkg.parameters ? 'parameters' : 'tests'}</p>
              <Price pkg={pkg} large />
              {pkg.mrp && <p className="mt-1 text-[14px] font-semibold text-mint">You save {formatPrice(pkg.mrp - pkg.price)}</p>}
              <div className="mt-5 grid gap-2.5">
                <PrimaryButton size="md" onClick={() => onBooking(pkg.name, 'home')}>Book Home Collection</PrimaryButton>
                <div className="grid grid-cols-2 gap-2.5">
                  <CallButton size="md" label={pkg.price ? 'Call' : 'Call for price'} />
                  <WhatsAppButton size="md" message={waPackageMessage(pkg)} />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <Container className="grid gap-4 py-10 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 lg:row-span-2">
          <h2 className="flex items-center gap-2 text-[18px] font-bold text-ink">
            <ClipboardList className="h-5 w-5 text-brand" aria-hidden="true" /> What’s included
          </h2>
          {pkg.groups ? (
            <ul className="mt-3 divide-y divide-slate-100 text-[15px]">
              {pkg.groups.map((g) => (
                <li key={g.name} className="flex items-baseline justify-between gap-3 py-2.5">
                  <span className="text-slate-800">
                    {g.name}
                    {g.tests && <span className="block text-[13.5px] text-slate-500">{g.tests.join(', ')}</span>}
                  </span>
                  <span className="font-bold tabular-nums text-ink">{g.count}</span>
                </li>
              ))}
              <li className="flex justify-between py-2.5 font-bold text-ink"><span>Total</span><span>{testCount(pkg)}</span></li>
            </ul>
          ) : (
            <ul className="mt-3 grid gap-2 text-[15px] text-slate-800">
              {items.map((it) => (
                <li key={it} className="flex gap-2"><Check className="mt-0.5 h-5 w-5 shrink-0 text-mint" aria-hidden="true" />{it}</li>
              ))}
            </ul>
          )}
        </section>

        <InfoBlock icon={Users} title={`Who should take the ${pkg.shortName}?`}>
          <ul className="list-disc space-y-1.5 pl-5">{pkg.whoShouldTake.map((w) => <li key={w}>{w}</li>)}</ul>
        </InfoBlock>

        <InfoBlock icon={Utensils} title="Preparation & fasting">
          <p>{pkg.fasting}</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">{pkg.preparation.map((w) => <li key={w}>{w}</li>)}</ul>
        </InfoBlock>
      </Container>

      <Container className="max-w-3xl pb-6">
        <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-ink">{pkg.shortName}: common questions</h2>
        <FAQList faqs={packageFaqs(pkg)} idPrefix={`faq-${pkg.slug}`} />
        <Disclaimer className="mt-5" />
      </Container>

      <section aria-labelledby="related-title" className="py-10">
        <Container>
          <h2 id="related-title" className="mb-5 text-2xl font-extrabold tracking-tight text-ink">Other packages</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => <PackageCard key={p.slug} pkg={p} index={i} onBooking={onBooking} />)}
          </div>
        </Container>
      </section>
    </>
  );
}

export function TestsPage() {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? TESTS_DIRECTORY.filter((t) => t.name.toLowerCase().includes(s)) : TESTS_DIRECTORY;
  }, [q]);

  return (
    <Container className="py-8 sm:py-12">
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Tests Directory' }]} />
      <h1 className="mt-4 text-[2rem] sm:text-5xl font-extrabold tracking-[-0.03em] text-ink">All Blood Tests</h1>
      <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-slate-600">
        {LAB.allTestsLine}. Search a test to see which package includes it. If a test is not listed, call or WhatsApp us and we will
        tell you the price and report time.
      </p>

      <label className="relative mt-6 block max-w-xl">
        <span className="sr-only">Search tests</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search e.g. thyroid, dengue, vitamin D"
          className="h-13 w-full rounded-2xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-[16px] text-ink placeholder:text-slate-500 focus-visible:border-brand"
        />
      </label>
      <p className="mt-3 text-[14px] text-slate-600" aria-live="polite">{results.length} tests</p>

      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((t) => (
          <li key={t.name} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-[15px] font-bold text-ink">{t.name}</p>
            <p className="mt-1 text-[13.5px] text-slate-600">
              In:{' '}
              {t.packages.map((slug, i) => (
                <span key={slug}>
                  <a href={`/packages/${slug}`} className="font-medium text-brand hover:underline">{getPackage(slug).shortName}</a>
                  {i < t.packages.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
      {results.length === 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
          <p className="font-semibold text-ink">No match for “{q}”</p>
          <p className="mt-1 text-[14px] text-slate-600">We likely still do this test. Ask us:</p>
          <div className="mt-3 flex justify-center gap-2">
            <CallButton />
            <WhatsAppButton message={`Hello Accurate Pathology, do you do the ${q} test? What is the price?`} />
          </div>
        </div>
      )}
      <Disclaimer className="mt-8" />
    </Container>
  );
}

export function NotFoundPage() {
  return (
    <Container className="py-20 text-center">
      <h1 className="text-4xl font-extrabold text-ink">Page not found</h1>
      <p className="mt-3 text-slate-600">The page you are looking for does not exist.</p>
      <a href="/" className="press mt-6 inline-flex h-12 items-center rounded-2xl bg-brand px-5 font-semibold text-white">Go to home page</a>
    </Container>
  );
}
