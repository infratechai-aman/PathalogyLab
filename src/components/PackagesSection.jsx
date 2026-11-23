import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Zap, Clock, Activity, Heart, Check, Calendar, ArrowRight, TestTube } from 'lucide-react';
import { StaggerReveal, RevealSection, fadeUp, scaleIn, EASE_OUT } from '../animations';
import { PACKAGES, CATEGORIES, formatPrice, includedList, testCount, packageImage } from '../data/lab';

const BADGE = {
  fullbody: { icon: Award, color: 'bg-[#003b95]' },
  fever: { icon: Zap, color: 'bg-sky-700' },
  hormones: { icon: Heart, color: 'bg-rose-700' },
  fitness: { icon: Activity, color: 'bg-emerald-700' },
  daily: { icon: TestTube, color: 'bg-blue-700' },
};
const CAT_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));

const fastingLabel = (p) =>
  p.fasting.startsWith('No fasting') ? 'No Fasting Needed'
  : p.fasting.startsWith('Fasting is usually not') ? 'Usually No Fasting'
  : p.slug === 'full-body-profile' ? '10–12 hrs Fasting (Compulsory)'
  : '8–12 hrs Fasting';

// Old card design, fed from the single data file (src/data/lab.js).
const packages = PACKAGES.map((p) => {
  const main = p.slug === 'full-body-profile' ? 'fullbody' : p.categories[0];
  const img = packageImage(p);
  return {
    id: p.slug,
    slug: p.slug,
    category: p.categories,
    badge: { label: p.badge || CAT_LABEL[main], ...BADGE[main] },
    turnaround: p.reportTime ? 'Report in 4 hrs' : 'Reports on WhatsApp',
    paramText: `${testCount(p)} ${p.parameters ? 'Parameters' : 'Tests'} Included`,
    paramColor: 'text-blue-100',
    img: img.src,
    srcSet: img.srcSet,
    alt: img.alt,
    title: p.name,
    fasting: fastingLabel(p),
    collection: p.freeHomeCollection ? 'FREE Home Collection' : 'Home Collection Available',
    tests: includedList(p),
    price: p.price ? formatPrice(p.price) : 'Call for price',
    mrp: p.mrp ? formatPrice(p.mrp) : '',
    discount: p.mrp ? `Save ${formatPrice(p.mrp - p.price)}` : '',
    reportNote: p.reportTime ? '4-hr Reports' : 'Reports on WhatsApp',
  };
});

const filters = CATEGORIES.map((c) => ({ label: c.id === 'all' ? 'All Packages' : c.label, value: c.id }));

const quickTests = ['complete-mini-1', 'complete-mini-2', 'complete-mini-3', 'monsoon-fever-panel'].map((slug) => {
  const p = PACKAGES.find((x) => x.slug === slug);
  return { name: p.shortName, price: p.price ? formatPrice(p.price) : 'Call', key: p.name };
});

export default function PackagesSection({ onBooking }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = packages.filter(p =>
    activeFilter === 'all' || p.category.includes(activeFilter)
  );

  return (
    <section className="py-10 sm:py-20 lg:py-28 relative overflow-hidden" id="packages">
      {/* Ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-green-200/25 via-emerald-100/20 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1480px] xl:max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Header — clean, authoritative, unslop */}
        <StaggerReveal className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3 mb-6 sm:mb-10">
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-[#0a1120] tracking-[-0.03em]">
            Popular Tests &amp; Health Packages
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600 text-[12px] sm:text-sm lg:text-base leading-relaxed">
            Health checkup packages from ₹299 with home sample collection across Mohammadwadi, Sayyad Nagar and Hadapsar.
          </motion.p>
        </StaggerReveal>

        {/* Filter Tabs */}
        <RevealSection className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 flex-nowrap sm:flex-wrap overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-12 mobile-cards-scroll">
          {filters.map((f) => (
            <motion.button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', duration: 0.2, bounce: 0.3 }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 whitespace-nowrap shrink-0 ${
                activeFilter === f.value
                  ? 'bg-[#003b95] text-white shadow-md shadow-blue-900/15'
                  : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 hover:border-blue-300'
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </RevealSection>

        {/* Package Cards — horizontal scroll on mobile, grid on md+ */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 flex gap-5 snap-x snap-proximity">
          <AnimatePresence>
            {filtered.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="snap-start shrink-0 w-[82vw] max-w-sm bg-white/90 rounded-3xl overflow-hidden border border-slate-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col"
              >
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img src={pkg.img} srcSet={pkg.srcSet} sizes="82vw" alt={pkg.alt} width="800" height="480" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2.5 py-1 rounded-full ${pkg.badge.color} text-white text-[10px] font-bold flex items-center gap-1`}>
                      <pkg.badge.icon className="w-2.5 h-2.5" />
                      {pkg.badge.label}
                    </span>
                  </div>
                </div>
                {/* Body */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-[#0a1120] leading-snug"><a href={`/packages/${pkg.slug}`}>{pkg.title}</a></h3>
                    <p className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold mt-1.5 inline-block">{pkg.fasting}</p>
                    <div className="mt-3 space-y-1.5">
                      {pkg.tests.slice(0, 3).map(t => (
                        <div key={t} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                          <Check className="w-3 h-3 text-[#16a34a] shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </div>
                      ))}
                      {pkg.tests.length > 3 && (
                        <p className="text-[11px] text-[#003b95] font-semibold pl-4">+{pkg.tests.length - 3} more tests</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 py-2.5 border-t border-slate-100 mb-3">
                      <span className="text-xl font-extrabold text-[#0a1120]">{pkg.price}</span>
                      {pkg.mrp && <span className="text-xs text-slate-400 line-through">{pkg.mrp}</span>}
                      <span className="text-[10px] font-bold text-emerald-600 ml-auto">{pkg.discount}</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onBooking(pkg.title, 'home')}
                      className="w-full py-3 rounded-2xl bg-[#003b95] text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Book This Package
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Grid layout for md+ */}
        <motion.div layout className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((pkg) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/85 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-blue-300 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    src={pkg.img}
                    srcSet={pkg.srcSet}
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    alt={pkg.alt}
                    width="800"
                    height="480"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Top badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full ${pkg.badge.color} text-white text-[11px] font-bold tracking-wide shadow-md flex items-center gap-1.5`}>
                      <pkg.badge.icon className="w-3 h-3" />
                      {pkg.badge.label}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-700 text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                      <Zap className="w-3 h-3 text-[#003b95]" />
                      {pkg.turnaround}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <p className={`text-xs font-medium ${pkg.paramColor}`}>{pkg.paramText}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#0a1120] tracking-tight group-hover:text-[#003b95] transition-colors">
                      <a href={`/packages/${pkg.slug}`}>{pkg.title}</a>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                        {pkg.fasting}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600 font-medium">{pkg.collection}</span>
                    </p>
                  </div>
                  <div className="space-y-2 pt-1 border-t border-slate-100 text-xs text-slate-600">
                    {pkg.tests.map((t) => (
                      <div key={t} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0">
                  <div className="flex items-baseline justify-between py-3 border-t border-slate-100 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-extrabold text-[#0a1120]">{pkg.price}</span>
                        {pkg.mrp && <span className="text-xs text-slate-400 line-through">{pkg.mrp}</span>}
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600">{pkg.discount}</span>
                    </div>
                    <div className="text-right text-[11px] text-slate-500 font-medium">{pkg.reportNote}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', duration: 0.2, bounce: 0.2 }}
                    onClick={() => onBooking(pkg.title, 'home')}
                    className="w-full py-3 rounded-2xl bg-[#003b95] hover:bg-[#002f78] text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-900/10 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book This Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Quick tests strip */}
        <RevealSection delay={0.1} className="mt-6 sm:mt-10 p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-[#003b95] flex items-center justify-center shrink-0">
                <TestTube className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0a1120]">Individual blood tests</p>
                <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">Pick any test with home visit across Hadapsar:</p>
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto mobile-cards-scroll -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap pb-1 sm:pb-0">
              {quickTests.map((t) => (
                <motion.button
                  key={t.name}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onBooking(t.key)}
                  className="px-3 sm:px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold text-slate-700 transition-all active:scale-95 whitespace-nowrap shrink-0 hover:border-blue-300"
                >
                  {t.name} ({t.price})
                </motion.button>
              ))}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onBooking('General Diagnostic Test')}
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#003b95] text-white text-[11px] sm:text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5 active:scale-95 whitespace-nowrap shrink-0"
              >
                <span>+ All Tests</span>
              </motion.button>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
