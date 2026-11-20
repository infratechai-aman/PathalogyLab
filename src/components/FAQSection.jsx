import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StaggerReveal, fadeUp, EASE_OUT } from '../animations';

const faqs = [
  {
    q: 'Do you provide home sample collection in Hadapsar?',
    a: 'Yes! Our certified phlebotomists provide sterile, safe home sample collection across Hadapsar, Mohammad Wadi, Sayyad Nagar, Handewadi, Autadwadi, Magarpatta, and surrounding Pune suburbs 24×7.',
  },
  {
    q: 'How quickly will I receive my reports on WhatsApp?',
    a: 'Routine blood investigations such as CBC, Blood Sugar, and Urine Routine are delivered within 4 to 6 hours directly to your WhatsApp as a cryptographically signed PDF. Specialized packages are delivered within 12–24 hours.',
  },
  {
    q: 'Are you genuinely open 24 Hours for emergency tests?',
    a: 'Yes, our laboratory in Mohammad Wadi Road, Hadapsar operates 24 Hours × 7 Days a week to handle all emergency diagnostic and routine inquiries without interruption.',
  },
  {
    q: 'Is fasting required before taking a blood test?',
    a: 'Fasting of 8–12 hours is recommended for Fasting Blood Sugar, Lipid Profile, and Full Body Health Checkups. For routine tests like CBC, Dengue NS1, or Thyroid profile, fasting is generally not mandatory. When you book, our phlebotomy team informs you of pre-test instructions.',
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="border border-slate-200/80 rounded-xl sm:rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 sm:px-6 py-3.5 sm:py-4 text-left font-bold text-[#0a1120] flex items-center justify-between gap-3 active:bg-slate-50/80 sm:hover:bg-slate-50/80 transition-colors"
      >
        <span className="text-[13px] sm:text-base lg:text-lg tracking-tight">{faq.q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#003b95] shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 text-slate-600 text-[12px] sm:text-sm leading-relaxed border-t border-slate-100 bg-[#fbfdfc]/70">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-white/70 backdrop-blur-md border-t border-slate-200/60" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerReveal className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-12">
          <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl font-extrabold text-[#0a1120] tracking-tight">
            Frequently Asked Questions
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-600 text-[12px] sm:text-sm lg:text-base">
            Everything you need to know about diagnostic tests and home sample collection in Hadapsar, Pune.
          </motion.p>
        </StaggerReveal>

        <StaggerReveal className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
