import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Shield, FileText, CheckCircle2, Lock, Phone, MapPin, Building2, Clock } from 'lucide-react';
import { EASE_OUT } from '../animations';

export default function PolicyModal({ isOpen, onClose, initialTab = 'privacy' }) {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState(initialTab);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, initialTab, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Frosted backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-md"
          />

          {/* Modal / Sheet Container */}
          <div className="min-h-full flex items-end sm:items-center justify-center sm:p-4">
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full sm:max-w-2xl bg-white/95 backdrop-blur-2xl rounded-t-[30px] sm:rounded-[28px] shadow-[0_24px_70px_rgba(0,0,0,0.2)] border border-slate-200/70 sm:border-white/80 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile grab handle */}
              <div className="sm:hidden flex justify-center pt-2.5 pb-1">
                <div className="w-10 h-1.2 rounded-full bg-slate-300" />
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200/80 active:scale-90 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="px-6 pt-5 pb-3 border-b border-slate-100 pr-12">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200/80 text-[#003b95] flex items-center justify-center shrink-0 shadow-sm">
                    <Shield className="w-5 h-5 text-[#003b95]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0a1120] tracking-tight">
                      Trust &amp; Legal Policies
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Accurate Pathology Laboratory • Hadapsar, Pune
                    </p>
                  </div>
                </div>

                {/* Segmented control tabs */}
                <div className="bg-slate-100/90 p-1 rounded-2xl flex items-center relative border border-slate-200/60 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setTab('privacy')}
                    className={`flex-1 relative z-10 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                      tab === 'privacy' ? 'text-[#003b95]' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab === 'privacy' && (
                      <motion.div
                        layoutId="policyTabPill"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] -z-10"
                      />
                    )}
                    <Lock className="w-3.5 h-3.5" />
                    <span>Privacy Policy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTab('terms')}
                    className={`flex-1 relative z-10 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                      tab === 'terms' ? 'text-[#003b95]' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab === 'terms' && (
                      <motion.div
                        layoutId="policyTabPill"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className="absolute inset-0 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] -z-10"
                      />
                    )}
                    <FileText className="w-3.5 h-3.5" />
                    <span>Terms of Service</span>
                  </button>
                </div>
              </div>

              {/* Scrollable policy content */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 text-slate-600 text-[13px] leading-relaxed">
                {tab === 'privacy' ? (
                  <div className="space-y-5">
                    <div className="bg-blue-50/70 border border-blue-200/70 p-3.5 rounded-2xl flex items-start gap-3">
                      <Lock className="w-5 h-5 text-[#003b95] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-[#003b95]">Strict Patient Confidentiality</h4>
                        <p className="text-[12px] text-blue-900/80 mt-0.5 leading-normal">
                          All diagnostic test reports and medical data are treated as strictly confidential medical records. We never sell, lease, or share patient information with third-party advertisers or insurance brokers.
                        </p>
                      </div>
                    </div>

                    <section className="space-y-2">
                      <h4 className="text-sm font-bold text-[#0a1120]">1. Information We Collect</h4>
                      <p>
                        When you schedule a diagnostic test or home sample collection with Accurate Pathology Laboratory, we collect:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-slate-600">
                        <li><strong>Patient Details:</strong> Name, age, gender, contact number, and WhatsApp phone number.</li>
                        <li><strong>Collection Address:</strong> Doorstep address within Hadapsar, Mohammad Wadi, Handewadi, and Pune regions for phlebotomist dispatch.</li>
                        <li><strong>Medical Prescription:</strong> Doctor referral slips or requested health packages.</li>
                        <li><strong>Diagnostic Results:</strong> Clinical biochemical, haematological, and pathological sample data processed in our automated laboratory.</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h4 className="text-sm font-bold text-[#0a1120]">2. How Your Information is Used</h4>
                      <p>
                        Your personal and clinical data is utilized solely for:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Dispatching certified phlebotomists for punctual home sample collection.</li>
                        <li>Conducting laboratory testing on automated analyzers with barcoded sample tracking.</li>
                        <li>Delivering digital test reports directly to your authenticated WhatsApp number and SMS.</li>
                        <li>Contacting you for critical/panic test value alerts or pre-test fasting instructions.</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h4 className="text-sm font-bold text-[#0a1120]">3. WhatsApp &amp; Communications Consent</h4>
                      <p>
                        By booking a test online or over the telephone, you grant consent to receive your diagnostic PDF report, appointment updates, and transactional receipts via WhatsApp. You can opt out at any time by messaging &ldquo;STOP&rdquo; to our laboratory helpdesk at <a href="tel:+918840658081" className="text-[#003b95] font-semibold">+91 88406 58081</a>.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="text-sm font-bold text-[#0a1120]">4. Data Security &amp; Sample Integrity</h4>
                      <p>
                        We employ sterile vacuum vacutainer collection tubes with individualized barcode labels, eliminating specimen mix-up. Digital report records are stored on secure, encrypted servers compliant with medical data standards.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="text-sm font-bold text-[#0a1120]">5. Grievance &amp; Laboratory Address</h4>
                      <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-[12px] space-y-1">
                        <p className="font-bold text-[#0a1120]">Accurate Pathology Laboratory</p>
                        <p>Lane no 15/A, Mohammad Wadi Road, Autadwadi Handewadi, Sayyad Nagar, Hadapsar, Pune 411028</p>
                        <p>Helpline / WhatsApp: <a href="tel:+918840658081" className="text-[#003b95] font-semibold">+91 88406 58081</a></p>
                        <p>Operational Hours: 24 Hours × 7 Days a Week</p>
                      </div>
                    </section>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="bg-emerald-50/70 border border-emerald-200/70 p-3.5 rounded-2xl flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-emerald-800">Clear &amp; Fair Patient Terms</h4>
                        <p className="text-[12px] text-emerald-900/80 mt-0.5 leading-normal">
                          Transparent pricing with zero hidden charges. No mandatory advance payment is required for routine bookings — you pay comfortably upon sample collection.
                        </p>
                      </div>
                    </div>

                    <section className="space-y-2">
                      <h4 className="text-sm font-bold text-[#0a1120]">1. Diagnostic Services &amp; Medical Disclaimer</h4>
                      <p>
                        All tests performed at Accurate Pathology Laboratory are processed under standard internal quality control protocols. Laboratory test results are intended to aid licensed medical practitioners in clinical diagnosis. Diagnostic values must always be clinically correlated by your consulting physician.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="text-sm font-bold text-[#0a1120]">2. Home Sample Collection Terms</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Home collection is offered across Hadapsar, Mohammad Wadi, Handewadi, Sayyad Nagar, Autadwadi, Magarpatta, and nearby Pune suburbs.</li>
                        <li>While our phlebotomists strive for exact time slot punctuality, unexpected traffic delays of 15–30 minutes may occur during peak hours.</li>
                        <li>Patients are requested to adhere to pre-test fasting instructions (e.g. 10–12 hours for fasting blood glucose or lipid profile) for diagnostic accuracy.</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h4 className="text-sm font-bold text-[#0a1120]">3. Report Turnaround Commitment</h4>
                      <p>
                        Routine blood investigations (CBC, Blood Sugar, Urine Routine) are typically reported within 4 to 6 hours. Comprehensive health checkup packages and specialized cultures require 12 to 24 hours. In rare events of repeat testing or reflex verification, reports may take additional time for clinical accuracy.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h4 className="text-sm font-bold text-[#0a1120]">4. Payment &amp; Cancellation Policy</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Payment Mode:</strong> We accept UPI (Google Pay, PhonePe, Paytm), cash, and direct bank transfer after sample draw.</li>
                        <li><strong>Cancellations:</strong> You may cancel or reschedule your home visit at zero charge anytime before the phlebotomist arrives at your premises.</li>
                        <li><strong>Refunds:</strong> If a prepaid test cannot be performed due to sample inadequacy or technical issues, a free redraw or 100% refund is processed within 24 hours.</li>
                      </ul>
                    </section>

                    <section className="space-y-2">
                      <h4 className="text-sm font-bold text-[#0a1120]">5. Jurisdiction</h4>
                      <p>
                        Any disputes arising in connection with diagnostic testing shall be subject to the exclusive jurisdiction of the competent courts in Pune, Maharashtra, India.
                      </p>
                    </section>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3 text-xs">
                <span className="text-slate-400 text-[11px]">Last Updated: November 2026</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-[#003b95] text-white font-bold text-xs hover:bg-[#002f78] transition-colors"
                >
                  I Understand
                </button>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
