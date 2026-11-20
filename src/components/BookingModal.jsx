import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, CheckCircle, MessageCircle, AlertCircle } from 'lucide-react';
import { EASE_OUT, EASE_SPRING } from '../animations';

const testOptions = [
  { value: 'Full Body Master Health Checkup', label: 'Full Body Master Health Checkup (85+ Parameters - ₹1,499)' },
  { value: 'Advanced Diabetes & Metabolic Profile', label: 'Advanced Diabetes & Metabolic Profile (₹799)' },
  { value: 'Senior Citizen Comprehensive Panel', label: 'Senior Citizen Comprehensive Panel (₹1,899)' },
  { value: 'Complete Blood Count (CBC)', label: 'Complete Blood Count (CBC) (₹250)' },
  { value: 'HbA1c & Fasting Blood Sugar', label: 'HbA1c & Blood Sugar (₹350)' },
  { value: 'Thyroid Profile (T3, T4, TSH)', label: 'Thyroid Profile (T3, T4, TSH) (₹400)' },
  { value: 'Lipid Profile (Cholesterol)', label: 'Lipid Profile (Cholesterol) (₹450)' },
  { value: 'Liver Function Test (LFT)', label: 'Liver Function Test (LFT)' },
  { value: 'Kidney Function Test (KFT)', label: 'Kidney Function Test (KFT)' },
  { value: 'Urine Routine Analysis', label: 'Urine Routine Analysis' },
  { value: 'Doctor Recommended Prescription Test', label: 'Prescription Doctor Advised Test' },
];

const timeSlots = [
  'Morning (7:00 AM - 10:00 AM)',
  'Late Morning (10:00 AM - 1:00 PM)',
  'Afternoon (1:00 PM - 5:00 PM)',
  'Evening (5:00 PM - 9:00 PM)',
  '24x7 Emergency Urgent Slot',
];

export default function BookingModal({ isOpen, onClose, preset, mode: initialMode }) {
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
    if (!form.phone || !/^\d{10}$/.test(form.phone)) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!form.date) newErrors.date = 'Please select a date';
    if (mode === 'home' && !form.address.trim()) newErrors.address = 'Address is required for home collection';
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
    msg += `\nPlease confirm my laboratory slot. Thank you!`;
    const waUrl = `https://wa.me/918840658081?text=${encodeURIComponent(msg)}`;
    setReceipt({ id: bookingRef, name: form.name, test: selectedTest, type: mode === 'home' ? 'Home Collection' : 'Lab Visit', waUrl });
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-md"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Full-screen on mobile, centered card on desktop */}
          <div className="min-h-screen sm:px-4 sm:py-8 flex items-end sm:items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="relative w-full sm:max-w-lg bg-white sm:bg-white/97 sm:backdrop-blur-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl sm:border sm:border-white/80 overflow-hidden max-h-[92vh] sm:max-h-none flex flex-col"
            >
              {/* Mobile drag handle */}
              <div className="sm:hidden flex justify-center pt-2 pb-1">
                <div className="w-10 h-1 rounded-full bg-slate-300" />
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-8 pb-5 sm:pb-8 pt-3 sm:pt-6">
                {/* Close button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center transition-colors z-10"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Modal header */}
                      <div className="flex items-center gap-3 mb-5 sm:mb-6">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-blue-50 border border-blue-200/80 text-[#003b95] flex items-center justify-center shadow-sm">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-extrabold text-[#0a1120] tracking-tight">Book Diagnostic Test</h3>
                          <p className="text-[11px] text-slate-500">Accurate Pathology • Hadapsar, Pune</p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                        {/* Name */}
                        <div>
                          <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Patient Name *</label>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }}
                            placeholder="Enter patient's full name"
                            className={`w-full px-3.5 py-3 sm:py-2.5 rounded-xl border text-[14px] sm:text-sm outline-none transition-all ${errors.name ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-200 focus:border-[#003b95] focus:ring-2 focus:ring-[#003b95]/20'}`}
                          />
                          {errors.name && <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">WhatsApp / Phone Number *</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[12px] sm:text-xs font-semibold text-slate-400">+91</span>
                            <input
                              required
                              type="tel"
                              maxLength={10}
                              inputMode="numeric"
                              value={form.phone}
                              onChange={e => { setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') })); setErrors(er => ({ ...er, phone: '' })); }}
                              placeholder="9876543210"
                              className={`w-full pl-12 pr-3.5 py-3 sm:py-2.5 rounded-xl border text-[14px] sm:text-sm outline-none transition-all ${errors.phone ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-200 focus:border-[#003b95] focus:ring-2 focus:ring-[#003b95]/20'}`}
                            />
                          </div>
                          {errors.phone && <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                        </div>

                        {/* Test select */}
                        <div>
                          <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Selected Test / Package *</label>
                          <select
                            required
                            value={selectedTest}
                            onChange={e => setSelectedTest(e.target.value)}
                            className="w-full px-3.5 py-3 sm:py-2.5 rounded-xl border border-slate-200 focus:border-[#003b95] focus:ring-2 focus:ring-[#003b95]/20 text-[14px] sm:text-sm outline-none transition-all bg-white"
                          >
                            {testOptions.map(o => (
                              <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* Collection mode */}
                        <div>
                          <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Sample Collection Mode *</label>
                          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                            {['lab', 'home'].map((m) => (
                              <label
                                key={m}
                                className={`flex items-center justify-center gap-2 p-3 sm:p-2.5 rounded-xl border cursor-pointer transition-all text-[13px] sm:text-xs font-semibold ${
                                  mode === m
                                    ? 'bg-blue-50 border-[#003b95] text-[#003b95]'
                                    : 'border-slate-200 text-slate-700'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="collection-mode"
                                  value={m}
                                  checked={mode === m}
                                  onChange={() => setMode(m)}
                                  className="sr-only"
                                />
                                {m === 'lab' ? 'Visit Hadapsar Lab' : 'Home Collection'}
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Address (home only) */}
                        <AnimatePresence>
                          {mode === 'home' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                              className="overflow-hidden"
                            >
                              <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Home Address in Pune *</label>
                              <textarea
                                required={mode === 'home'}
                                value={form.address}
                                onChange={e => { setForm(f => ({ ...f, address: e.target.value })); setErrors(er => ({ ...er, address: '' })); }}
                                rows={2}
                                placeholder="Flat no, society name, Hadapsar / Mohammad Wadi..."
                                className={`w-full px-3.5 py-3 sm:py-2.5 rounded-xl border text-[14px] sm:text-sm outline-none transition-all resize-none ${errors.address ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-slate-200 focus:border-[#003b95] focus:ring-2 focus:ring-[#003b95]/20'}`}
                              />
                              {errors.address && <p className="mt-1 text-[11px] text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.address}</p>}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Date & time */}
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                          <div>
                            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Preferred Date *</label>
                            <input
                              required
                              type="date"
                              value={form.date}
                              min={new Date().toISOString().split('T')[0]}
                              onChange={e => { setForm(f => ({ ...f, date: e.target.value })); setErrors(er => ({ ...er, date: '' })); }}
                              className={`w-full px-3 py-3 sm:py-2 rounded-xl border text-[13px] sm:text-sm outline-none transition-all ${errors.date ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-[#003b95] focus:ring-2 focus:ring-[#003b95]/20'}`}
                            />
                            {errors.date && <p className="mt-1 text-[11px] text-red-500">{errors.date}</p>}
                          </div>
                          <div>
                            <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Time Slot *</label>
                            <select
                              value={form.time}
                              onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                              className="w-full px-3 py-3 sm:py-2 rounded-xl border border-slate-200 focus:border-[#003b95] focus:ring-2 focus:ring-[#003b95]/20 text-[13px] sm:text-sm outline-none transition-all bg-white"
                            >
                              {timeSlots.map(t => <option key={t} value={t}>{t.split(' (')[0]}</option>)}
                            </select>
                          </div>
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full py-3.5 sm:py-3.5 mt-1 sm:mt-2 bg-gradient-to-r from-[#003b95] to-[#024ebb] text-white font-bold rounded-2xl shadow-lg shadow-blue-900/15 transition-all duration-200 text-[13px] sm:text-xs tracking-wide"
                        >
                          Confirm & Schedule Test
                        </motion.button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className="text-center py-4 space-y-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5, bounce: 0.4, delay: 0.1 }}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-50 text-[#003b95] mx-auto flex items-center justify-center border border-blue-200"
                      >
                        <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                      </motion.div>
                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0a1120] tracking-tight">Booking Confirmed!</h3>
                        <p className="text-[11px] text-slate-500">Your appointment has been registered.</p>
                      </div>
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-left space-y-2 text-[12px] sm:text-xs">
                        {[
                          { label: 'Booking ID', value: receipt?.id },
                          { label: 'Patient', value: receipt?.name },
                          { label: 'Selected Test', value: receipt?.test },
                          { label: 'Mode', value: receipt?.type },
                        ].map(({ label, value }) => (
                          <div key={label} className="flex justify-between">
                            <span className="text-slate-500">{label}:</span>
                            <span className={`font-bold ${label === 'Mode' ? 'text-[#003b95]' : 'text-[#0a1120]'}`}>{value}</span>
                          </div>
                        ))}
                      </div>
                      <a
                        href={receipt?.waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-2xl bg-[#25D366] text-white font-bold text-[13px] sm:text-xs tracking-wide flex items-center justify-center gap-2 shadow-md transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send Details to WhatsApp</span>
                      </a>
                      <button onClick={onClose} className="text-[12px] sm:text-xs text-slate-500 underline transition-colors">
                        Done & Return to Homepage
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
