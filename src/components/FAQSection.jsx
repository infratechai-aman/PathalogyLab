import { useState } from 'react';
import { motion } from 'framer-motion';
import { FAQS } from '../data/lab';
import { ChevronDown } from 'lucide-react';
import { StaggerReveal, fadeUp, EASE_OUT } from '../animations';

const faqs = FAQS;

function FAQItem({ faq, id }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      className="border border-slate-200/80 rounded-xl sm:rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
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
      {/* Answer stays in the DOM (collapsed) so search engines and AI crawlers can read it */}
      <div id={id} role="region" className="collapse" data-open={open}>
        <div>
          <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 text-slate-600 text-[12px] sm:text-sm leading-relaxed border-t border-slate-100 bg-[#fbfdfc]/70">
            {faq.a}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-white/70 backdrop-blur-md" id="faq">
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
            <FAQItem key={i} faq={faq} id={`faq-answer-${i}`} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
