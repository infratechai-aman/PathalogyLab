import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Calendar,
  X,
  CheckCircle,
  MessageCircle,
  AlertCircle,
  User,
  Phone,
  FlaskConical,
  Building2,
  Home,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { EASE_OUT } from '../animations';

const testOptions = [
  { value: 'Full Body Master Health Checkup', label: 'Full Body Master Health Checkup (85+ Tests • ₹1,499)' },
  { value: 'Advanced Diabetes & Metabolic Profile', label: 'Advanced Diabetes & Metabolic Profile (₹799)' },
  { value: 'Senior Citizen Comprehensive Panel', label: 'Senior Citizen Comprehensive Panel (₹1,899)' },
  { value: 'Complete Blood Count (CBC)', label: 'Complete Blood Count (CBC) (₹250)' },
  { value: 'HbA1c & Fasting Blood Sugar', label: 'HbA1c & Fasting Blood Sugar (₹350)' },
  { value: 'Thyroid Profile (T3, T4, TSH)', label: 'Thyroid Profile (T3, T4, TSH) (₹400)' },
  { value: 'Lipid Profile (Cholesterol)', label: 'Lipid Profile (Cholesterol) (₹450)' },
  { value: 'Liver Function Test (LFT)', label: 'Liver Function Test (LFT)' },
  { value: 'Kidney Function Test (KFT)', label: 'Kidney Function Test (KFT)' },
  { value: 'Urine Routine Analysis', label: 'Urine Routine Analysis' },
  { value: 'Doctor Recommended Prescription Test', label: 'Doctor Advised Prescription Test' },
];

const timeSlots = [
  'Morning (7:00 AM – 10:00 AM)',
  'Late Morning (10:00 AM – 1:00 PM)',
  'Afternoon (1:00 PM – 5:00 PM)',
  'Evening (5:00 PM – 9:00 PM)',
  '24×7 Emergency Urgent Slot',
];

export default function BookingModal({ isOpen, onClose, preset, mode: initialMode }) {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState('lab');
  const [selectedTest, setSelectedTest] = useState(testOptions[0].value);
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: timeSlots[0], address: '' });
  const [submitted, setSubmitted] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [errors, setErrors] = useState({});

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setSubmitted(false);
      setErrors({});
      setMode(initialMode === 'home' ? 'home' : 'lab');

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setForm(f => ({ ...f, date: tomorrow.toISOString().split('T')[0] }));

      if (preset) {
        const match = testOptions.find(t =>
          t.value.toLowerCase().includes(preset.toLowerCase()) ||
          t.label.toLowerCase().includes(preset.toLowerCase())
        );
        setSelectedTest(match ? match.value : testOptions[0].value);
      }

      document.body.style.overflow = 'hidden';
    } else {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, preset, initialMode, handleKeyDown]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Patient name is required';
    if (!form.phone || !/^\d{10}$/.test(form.phone)) newErrors.phone = 'Enter a valid 10-digit mobile number';
    if (!form.date) newErrors.date = 'Select date';
    if (mode === 'home' && !form.address.trim()) newErrors.address = 'Doorstep address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const bookingRef = 'APL-' + Math.floor(1000 + Math.random() * 9000);
    let msg = `*Accurate Pathology Booking Request*\n`;
    msg += `Booking ID: ${bookingRef}\n`;
    msg += `Patient Name: ${form.name}\n`;
    msg += `Phone: +91 ${form.phone}\n`;
    msg += `Test / Package: ${selectedTest}\n`;
    msg += `Collection Mode: ${mode === 'home' ? 'Home Collection' : 'Lab Visit'}\n`;
    msg += `Date & Slot: ${form.date} (${form.time})\n`;
    if (mode === 'home' && form.address) msg += `Address: ${form.address}\n`;
    msg += `\nPlease confirm my slot. Thank you!`;
    const waUrl = `https://wa.me/918840658081?text=${encodeURIComponent(msg)}`;
    setReceipt({ id: bookingRef, name: form.name, test: selectedTest, type: mode === 'home' ? 'Home Collection' : 'Lab Visit', waUrl });
    setSubmitted(true);
  };

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
          <div className="min-h-full flex items-end sm:items-center justify-center sm:p-4 text-center sm:text-left">
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full sm:max-w-[480px] bg-white/95 backdrop-blur-2xl rounded-t-[30px] sm:rounded-[28px] shadow-[0_24px_70px_rgba(0,0,0,0.2)] border border-slate-200/60 sm:border-white/80 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile grab handle */}
              <div className="sm:hidden flex justify-center pt-2.5 pb-1">
                <div className="w-10 h-1.2 rounded-full bg-slate-300" />
              </div>

              {/* Close button — Apple circular pill */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200/80 active:scale-90 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 pt-3 sm:pt-5 space-y-4">

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Header — Apple SF Pro hierarchy */}
                      <div className="flex items-center gap-3 pr-8">
                        <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200/60 text-[#003b95] flex items-center justify-center shrink-0 shadow-sm">
                          <FlaskConical className="w-5 h-5 text-[#003b95]" />
                        </div>
                        <div>
                          <h3 className="text-[17px] sm:text-lg font-extrabold text-[#0a1120] tracking-[-0.02em]">
                            Book Diagnostic Test
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[11.5px] font-medium text-slate-500">
                              Direct confirmation • Open 24×7
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* iOS Segmented Control: Lab Visit vs Home Collection */}
                      <div className="bg-slate-100/90 p-1 rounded-2xl flex items-center relative border border-slate-200/60">
                        <button
                          type="button"
                          onClick={() => setMode('lab')}
                          className={`flex-1 relative z-10 py-2.5 rounded-[12px] text-[12px] font-bold transition-colors flex items-center justify-center gap-1.5 ${
                            mode === 'lab' ? 'text-[#003b95]' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {mode === 'lab' && (
                            <motion.div
                              layoutId="activeSegmentedPill"
                              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                              className="absolute inset-0 bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] -z-10"
                            />
                          )}
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Visit Hadapsar Lab</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setMode('home')}
                          className={`flex-1 relative z-10 py-2.5 rounded-[12px] text-[12px] font-bold transition-colors flex items-center justify-center gap-1.5 ${
                            mode === 'home' ? 'text-[#003b95]' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {mode === 'home' && (
                            <motion.div
                              layoutId="activeSegmentedPill"
                              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                              className="absolute inset-0 bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] -z-10"
                            />
                          )}
                          <Home className="w-3.5 h-3.5" />
                          <span>Home Collection</span>
                          <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-extrabold uppercase tracking-tight">Free</span>
                        </button>
                      </div>

                      {/* Apple Form Grouped Cells */}
                      <form onSubmit={handleSubmit} className="space-y-3">

                        {/* Cell 1: Patient Name */}
                        <div
                          className={`group rounded-2xl p-2.5 px-3.5 transition-all border ${
                            errors.name
                              ? 'bg-red-50/60 border-red-300'
                              : 'bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white border-slate-200/80 focus-within:border-[#003b95] focus-within:ring-4 focus-within:ring-[#003b95]/10'
                          }`}
                        >
                          <label className="block text-[11px] font-semibold text-slate-500 tracking-tight mb-0.5">
                            Patient Name
                          </label>
                          <div className="flex items-center gap-2.5">
                            <User className="w-4 h-4 text-slate-400 group-focus-within:text-[#003b95] transition-colors shrink-0" />
                            <input
                              required
                              type="text"
                              value={form.name}
                              onChange={e => {
                                setForm(f => ({ ...f, name: e.target.value }));
                                setErrors(er => ({ ...er, name: '' }));
                              }}
                              placeholder="e.g. Ramesh Kulkarni"
                              className="w-full bg-transparent text-[16px] sm:text-[14px] font-medium text-[#0a1120] placeholder-slate-400 outline-none"
                            />
                          </div>
                          {errors.name && (
                            <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Cell 2: WhatsApp Number */}
                        <div
                          className={`group rounded-2xl p-2.5 px-3.5 transition-all border ${
                            errors.phone
                              ? 'bg-red-50/60 border-red-300'
                              : 'bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white border-slate-200/80 focus-within:border-[#003b95] focus-within:ring-4 focus-within:ring-[#003b95]/10'
                          }`}
                        >
                          <label className="block text-[11px] font-semibold text-slate-500 tracking-tight mb-0.5">
                            WhatsApp / Phone Number
                          </label>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-400 group-focus-within:text-[#003b95] transition-colors shrink-0" />
                            <span className="text-[13px] font-bold text-slate-400 select-none">+91</span>
                            <input
                              required
                              type="tel"
                              maxLength={10}
                              inputMode="numeric"
                              value={form.phone}
                              onChange={e => {
                                setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') }));
                                setErrors(er => ({ ...er, phone: '' }));
                              }}
                              placeholder="98765 43210"
                              className="w-full bg-transparent text-[16px] sm:text-[14px] font-semibold text-[#0a1120] placeholder-slate-400 outline-none tracking-wide"
                            />
                          </div>
                          {errors.phone && (
                            <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3" />
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        {/* Cell 3: Selected Test */}
                        <div className="group rounded-2xl p-2.5 px-3.5 bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white border border-slate-200/80 focus-within:border-[#003b95] focus-within:ring-4 focus-within:ring-[#003b95]/10 transition-all relative">
                          <label className="block text-[11px] font-semibold text-slate-500 tracking-tight mb-0.5">
                            Selected Test or Package
                          </label>
                          <div className="flex items-center gap-2.5">
                            <FlaskConical className="w-4 h-4 text-slate-400 group-focus-within:text-[#003b95] transition-colors shrink-0" />
                            <select
                              required
                              value={selectedTest}
                              onChange={e => setSelectedTest(e.target.value)}
                              className="w-full bg-transparent text-[14px] sm:text-[13.5px] font-semibold text-[#0a1120] outline-none cursor-pointer pr-7 appearance-none truncate"
                            >
                              {testOptions.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-[30px]" />
                          </div>
                        </div>

                        {/* Cell 4: Address (when Home Collection active) */}
                        <AnimatePresence>
                          {mode === 'home' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                              className="overflow-hidden"
                            >
                              <div
                                className={`group rounded-2xl p-2.5 px-3.5 transition-all border ${
                                  errors.address
                                    ? 'bg-red-50/60 border-red-300'
                                    : 'bg-emerald-50/30 hover:bg-emerald-50/50 focus-within:bg-white border-emerald-200/70 focus-within:border-[#16a34a] focus-within:ring-4 focus-within:ring-emerald-500/10'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-0.5">
                                  <label className="block text-[11px] font-semibold text-emerald-800 tracking-tight">
                                    Doorstep Address in Pune
                                  </label>
                                  <span className="text-[10px] text-emerald-600 font-bold">Free Home Visit</span>
                                </div>
                                <div className="flex items-start gap-2.5 pt-0.5">
                                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                  <textarea
                                    required={mode === 'home'}
                                    value={form.address}
                                    onChange={e => {
                                      setForm(f => ({ ...f, address: e.target.value }));
                                      setErrors(er => ({ ...er, address: '' }));
                                    }}
                                    rows={2}
                                    placeholder="Flat / House no, Society, Landmark, Hadapsar / Pune..."
                                    className="w-full bg-transparent text-[14px] text-[#0a1120] placeholder-slate-400 outline-none resize-none leading-snug"
                                  />
                                </div>
                                {errors.address && (
                                  <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1 font-medium">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.address}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Cell 5 & 6: Date & Time in 2 columns */}
                        <div className="grid grid-cols-2 gap-2.5">
                          {/* Preferred Date */}
                          <div
                            className={`group rounded-2xl p-2.5 px-3.5 transition-all border ${
                              errors.date
                                ? 'bg-red-50/60 border-red-300'
                                : 'bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white border-slate-200/80 focus-within:border-[#003b95] focus-within:ring-4 focus-within:ring-[#003b95]/10'
                            }`}
                          >
                            <label className="block text-[11px] font-semibold text-slate-500 tracking-tight mb-0.5">
                              Preferred Date
                            </label>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400 group-focus-within:text-[#003b95] transition-colors shrink-0" />
                              <input
                                required
                                type="date"
                                value={form.date}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={e => {
                                  setForm(f => ({ ...f, date: e.target.value }));
                                  setErrors(er => ({ ...er, date: '' }));
                                }}
                                className="w-full bg-transparent text-[13px] sm:text-[13px] font-semibold text-[#0a1120] outline-none cursor-pointer"
                              />
                            </div>
                            {errors.date && (
                              <p className="mt-0.5 text-[10px] text-red-500 font-medium">{errors.date}</p>
                            )}
                          </div>

                          {/* Time Slot */}
                          <div className="group rounded-2xl p-2.5 px-3.5 bg-slate-50/70 hover:bg-slate-50 focus-within:bg-white border border-slate-200/80 focus-within:border-[#003b95] focus-within:ring-4 focus-within:ring-[#003b95]/10 transition-all relative">
                            <label className="block text-[11px] font-semibold text-slate-500 tracking-tight mb-0.5">
                              Time Slot
                            </label>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-slate-400 group-focus-within:text-[#003b95] transition-colors shrink-0" />
                              <select
                                value={form.time}
                                onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                                className="w-full bg-transparent text-[13px] sm:text-[13px] font-semibold text-[#0a1120] outline-none cursor-pointer pr-5 appearance-none truncate"
                              >
                                {timeSlots.map(t => (
                                  <option key={t} value={t}>{t.split(' (')[0]}</option>
                                ))}
                              </select>
                              <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-3 top-[30px]" />
                            </div>
                          </div>
                        </div>

                        {/* Submit Button — Tactile Apple Spring */}
                        <div className="pt-2 space-y-2">
                          <motion.button
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            type="submit"
                            className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#003b95] via-[#024ebb] to-[#003b95] text-white font-bold text-[14px] tracking-tight shadow-[0_6px_20px_rgba(0,59,149,0.28)] hover:shadow-[0_8px_26px_rgba(0,59,149,0.36)] transition-all flex items-center justify-center gap-2"
                          >
                            <span>Confirm &amp; Schedule Test</span>
                            <ArrowRight className="w-4 h-4 opacity-75" />
                          </motion.button>

                          <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-slate-500 text-center">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>No pre-payment required • Pay safely after sample collection</span>
                          </div>
                        </div>

                      </form>
                    </motion.div>
                  ) : (
                    /* ════════════════════════════════════════════════════════
                       CONFIRMATION SCREEN — Apple Wallet Receipt Style
                       ════════════════════════════════════════════════════════ */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className="text-center py-2 space-y-4"
                    >
                      {/* Bouncy check badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.08 }}
                        className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-200/80 shadow-sm"
                      >
                        <CheckCircle className="w-9 h-9" />
                      </motion.div>

                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a1120] tracking-tight">
                          Appointment Scheduled!
                        </h3>
                        <p className="text-[12px] sm:text-[13px] text-slate-500">
                          Your diagnostic booking request has been created.
                        </p>
                      </div>

                      {/* Receipt Pass */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2.5 text-[12.5px]">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                          <span className="text-slate-500 font-medium">Booking ID</span>
                          <span className="font-mono font-bold text-[#003b95] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                            {receipt?.id}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Patient</span>
                          <span className="font-bold text-[#0a1120]">{receipt?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Test / Package</span>
                          <span className="font-semibold text-[#0a1120] max-w-[220px] text-right truncate">
                            {receipt?.test}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Mode</span>
                          <span className="font-bold text-[#16a34a]">{receipt?.type}</span>
                        </div>
                      </div>

                      {/* Instant WhatsApp Action */}
                      <div className="space-y-2 pt-1">
                        <a
                          href={receipt?.waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-12 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-bold text-sm tracking-tight shadow-[0_6px_20px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2 transition-all"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Send Booking to WhatsApp</span>
                        </a>

                        <button
                          type="button"
                          onClick={onClose}
                          className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-semibold transition-colors"
                        >
                          Done &amp; Return to Lab
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
