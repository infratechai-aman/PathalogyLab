import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, PhoneCall, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Sticky bottom bar shown ONLY on mobile (< sm).
 * Appears immediately — no scroll threshold needed for instant CTA.
 * Hides when BookingModal is open.
 */
export default function MobileBottomBar({ onBooking, isModalOpen }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show after tiny delay so hero loads first
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const waUrl = `https://wa.me/918840658081?text=${encodeURIComponent('Hello Accurate Pathology, I want to book a test.')}`;

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
          <div className="bg-white/95 backdrop-blur-2xl border-t border-slate-200/70 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] px-3 py-2.5 flex items-center gap-2">
            {/* Call button */}
            <a
              href="tel:+918840658081"
              className="flex-1 h-11 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white font-bold text-[13px] text-slate-800 active:scale-95 transition-transform"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#003b95]" />
              <span>Call</span>
            </a>

            {/* Book Test — primary CTA */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => onBooking('General Diagnostic Test', 'lab')}
              className="flex-[1.3] h-11 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#003b95] to-[#024ebb] text-white font-bold text-[13px] shadow-lg shadow-blue-900/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Test</span>
            </motion.button>

            {/* WhatsApp button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-11 flex items-center justify-center gap-1.5 rounded-xl bg-[#0e7a40] text-white font-bold text-[13px] shadow-md active:scale-95 transition-transform"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
