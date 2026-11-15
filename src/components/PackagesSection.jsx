import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Award, Zap, Clock, Activity, Heart, Check, Calendar, ArrowRight, TestTube } from 'lucide-react';
import { StaggerReveal, RevealSection, fadeUp, scaleIn, EASE_OUT } from '../animations';

const packages = [
  {
    id: 'fullbody',
    category: ['preventive', 'popular'],
    badge: { label: 'Most Popular', icon: Award, color: 'bg-[#116e45]' },
    turnaround: 'Same-Day',
    paramText: '85+ Parameters Checked',
    paramColor: 'text-emerald-200',
    img: 'https://lh3.googleusercontent.com/aida/ALJJyrCoioA4luhQw9OzJJxbF2PsipYsT9vZLJcWtRWpo2ZpzsN5cdqVpIDWqOyctXuUsQQGxXgOXMRjjwA2y01CZN9earvxSeYzo4FTc2975SiBwnu3TtqogVB23KcEp9XrpbSIkTCPa2FSXPZpKKchaUp_0Fx1Om-gtP5uV999D783IgC_MxeRWU5zkom6vwZ0-lUcXSzrdYX600aY2PuuhehDpcXzqWkqimMv1faAmgv4',
    title: 'Full Body Master Health Checkup',
    fasting: '10–12 hrs Fasting',
    collection: 'Free Home Collection',
    tests: ['Complete Hemogram / CBC (24 Parameters)', 'Liver Function & Kidney Function Tests (LFT + KFT)', 'Lipid Profile (Total Cholesterol, HDL, LDL)', 'HbA1c Glycated Hemoglobin & Blood Sugar', 'Thyroid Profile (T3, T4, TSH) & Urine Routine'],
    price: '₹1,499',
    mrp: '₹2,999',
    discount: '50% Special Rebate',
    reportNote: 'Reports on WhatsApp',
  },
  {
    id: 'diabetes',
    category: ['diabetes', 'popular'],
    badge: { label: 'Critical Care', icon: Activity, color: 'bg-blue-700' },
    turnaround: 'Fast 6hr Result',
    paramText: 'Diabetes & Cardiac Risk',
    paramColor: 'text-blue-200',
    img: 'https://lh3.googleusercontent.com/aida/ALJJyrC88ZQZ0OjHHC9m7b07hmCL56dg_ZLze4jeFzAbkBPguKrgicpgH_nTsSpkXrr6KWD984_AWxWbIKu5UvZs48K8KTRSWSxEDnUORxnegTUWek9rIQ5z2lNmAAfL4_HKDpEG6tilwYSj2K_kyRfLHILZn5E0LGBlsIGl6v4nRz78IOrxlw7pbxRx61a3rurQU6mZlJ8eV9nrNNtMg73CyXnbd7KNZukiDOL8fBOErjtgXQ',
    title: 'Advanced Diabetes & Metabolic Profile',
    fasting: '8–10 hrs Fasting',
    collection: 'Home Phlebotomy Available',
    tests: ['HbA1c (Glycosylated Hemoglobin) with eAG', 'Fasting Blood Sugar (FBS) & Post-Prandial (PPBS)', 'Cardiac Lipid Profile (Cholesterol, HDL, LDL, VLDL)', 'Serum Creatinine & Urine Microalbumin Screen', 'Blood Pressure & Diabetic Risk Index Review'],
    price: '₹799',
    mrp: '₹1,650',
    discount: '52% Off Regular Lab Price',
    reportNote: 'Verified Cryptographic PDF',
  },
  {
    id: 'senior',
    category: ['senior', 'preventive'],
    badge: { label: 'Gentle Phlebotomy', icon: Heart, color: 'bg-emerald-700' },
    turnaround: 'Priority Home Visit',
    paramText: 'Bone, Joint & Organ Vitality',
    paramColor: 'text-emerald-200',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDdEvRu1W6VzulOuiv_dcndLN4clLeOXumu1Jq7iQJSsTkdss_UpsD2f5Mqv9Pvl63RYHTHCAyCQAZHCOIH8S8uXxw4lf0yTSvr4H0n-63zXoxfGLP28LGwTh0cWbZkFeeKf2q7WeZbCkYyX6fz3_WQG36txqyYiZ8RhXHkSgPAjhNYy_Nj-KU99EtVrim-kq5UPKjw-gA0lmT1ZPhKJLzn5aMLtkV3nI066pYzC-p1M29xfEIuqNq4Q',
    title: 'Senior Citizen Comprehensive Panel',
    fasting: '60+ Years Tailored',
    collection: 'Free Doorstep Service',
    tests: ['Calcium, Serum Electrolytes & Vitamin D3 Screen', 'Comprehensive Renal (KFT) & Hepatic (LFT) Profile', 'Uric Acid (Gout & Joint Pain Evaluation)', 'Complete Blood Count with ESR & Platelet Indices', 'Cardiac Risk & Thyroid Stimulating Hormone (TSH)'],
    price: '₹1,899',
    mrp: '₹3,800',
    discount: 'Special Senior Concession',
    reportNote: 'Hardcopy + WhatsApp',
  },
];

const filters = [
  { label: 'All Packages', value: 'all' },
  { label: 'Popular Blood Tests', value: 'popular' },
  { label: 'Preventive Health', value: 'preventive' },
  { label: 'Diabetes & Metabolic', value: 'diabetes' },
  { label: 'Senior Citizen', value: 'senior' },
];

const quickTests = [
  { name: 'CBC Blood Count', price: '₹250', key: 'Complete Blood Count (CBC)' },
  { name: 'HbA1c', price: '₹350', key: 'HbA1c & Blood Glucose' },
  { name: 'Thyroid Profile', price: '₹400', key: 'Thyroid Profile (T3, T4, TSH)' },
  { name: 'Lipid Profile', price: '₹450', key: 'Lipid Profile' },
];

export default function PackagesSection({ onBooking }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = packages.filter(p =>
    activeFilter === 'all' || p.category.includes(activeFilter)
  );

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" id="packages">
      {/* Ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-green-200/25 via-emerald-100/20 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <StaggerReveal className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100/60 border border-green-200 text-green-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#116e45]" />
            <span>Health Checkup Packages</span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a1120] tracking-[-0.03em]">
            Popular Tests &amp; Wellness Panels
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Curated by senior pathologists for comprehensive preventative care, quick home collection, and fast turnaround.
          </motion.p>
        </StaggerReveal>

        {/* Filter Tabs */}
        <RevealSection className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {filters.map((f) => (
            <motion.button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', duration: 0.2, bounce: 0.3 }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                activeFilter === f.value
                  ? 'bg-[#0d5f3a] text-white shadow-md shadow-green-900/10'
                  : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/80 hover:border-green-300'
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </RevealSection>

        {/* Package Cards — horizontal scroll on mobile, grid on md+ */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 flex gap-5 snap-x snap-mandatory scroll-smooth">
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
                  <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover" />
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
                    <h3 className="text-base font-bold text-[#0a1120] leading-snug">{pkg.title}</h3>
                    <p className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold mt-1.5 inline-block">{pkg.fasting}</p>
                    <div className="mt-3 space-y-1.5">
                      {pkg.tests.slice(0, 3).map(t => (
                        <div key={t} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                          <Check className="w-3 h-3 text-[#116e45] shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </div>
                      ))}
                      {pkg.tests.length > 3 && (
                        <p className="text-[11px] text-[#116e45] font-semibold pl-4">+{pkg.tests.length - 3} more tests</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 py-2.5 border-t border-slate-100 mb-3">
                      <span className="text-xl font-extrabold text-[#0a1120]">{pkg.price}</span>
                      <span className="text-xs text-slate-400 line-through">{pkg.mrp}</span>
                      <span className="text-[10px] font-bold text-emerald-600 ml-auto">{pkg.discount}</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onBooking(pkg.title, 'home')}
                      className="w-full py-3 rounded-2xl bg-[#0d5f3a] text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2"
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
                className="group relative bg-white/85 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200/70 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:border-green-300 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    src={pkg.img}
                    alt={pkg.title}
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
                      <Zap className="w-3 h-3 text-[#116e45]" />
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
                    <h3 className="text-xl font-bold text-[#0a1120] tracking-tight group-hover:text-[#116e45] transition-colors">
                      {pkg.title}
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
                        <Check className="w-3.5 h-3.5 text-[#116e45] shrink-0" />
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
                        <span className="text-xs text-slate-400 line-through">{pkg.mrp}</span>
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
                    className="w-full py-3 rounded-2xl bg-[#0d5f3a] hover:bg-[#116e45] text-white font-semibold text-xs tracking-wide shadow-md shadow-green-900/10 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
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
        <RevealSection delay={0.1} className="mt-10 p-5 sm:p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center shrink-0">
                <TestTube className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0a1120]">Looking for individual blood tests?</p>
                <p className="text-xs text-slate-500">Pick any test with home visit across Hadapsar:</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {quickTests.map((t) => (
                <motion.button
                  key={t.name}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onBooking(t.key)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-green-600 hover:text-[#116e45] transition-all active:scale-95"
                >
                  {t.name} ({t.price})
                </motion.button>
              ))}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onBooking('General Diagnostic Test')}
                className="px-4 py-2 rounded-xl bg-[#116e45] text-white text-xs font-semibold hover:bg-[#0d5f3a] transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
              >
                <span>+ View All Tests</span>
              </motion.button>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
