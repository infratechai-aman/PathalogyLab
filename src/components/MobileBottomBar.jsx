import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, PhoneCall, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Sticky bottom bar shown ONLY on mobile (< sm).
 * Appears after user scrolls 80px.
 * Hides when BookingModal is open.
 */
export default function MobileBottomBar({ onBooking, isModalOpen }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openWA = () => {
    const msg = encodeURIComponent('Hello Accurate Pathology Hadapsar, I want to book a test.');
    window.open(`https://wa.me/918840658081?text=${msg}`, '_blank');
  };

  return (
    <AnimatePresence>
      {visible && !isModalOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="sm:hidden fixed bottom-0 inset-x-0 z-50 safe-area-bottom"
        >
          {/* Frosted glass bar */}
          <div className="bg-white/95 backdrop-blur-2xl border-t border-slate-200/70 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center gap-2">
            {/* Call button */}
            <a
              href="tel:+918840658081"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200 font-bold text-sm text-slate-800 active:scale-95 transition-transform"
            >
              <PhoneCall className="w-4 h-4 text-[#116e45]" />
              <span>Call</span>
            </a>

            {/* Book Test — primary CTA */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onBooking('General Diagnostic Test', 'lab')}
              className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#0d5f3a] to-[#116e45] text-white font-bold text-sm shadow-lg shadow-green-900/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Test</span>
            </motion.button>

            {/* WhatsApp button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={openWA}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#25D366] text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
