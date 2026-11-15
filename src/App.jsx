import { useState, useCallback } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import PackagesSection from './components/PackagesSection';
import ProcessSection from './components/ProcessSection';
import WhyUsSection from './components/WhyUsSection';
import CTABanner from './components/CTABanner';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import BookingModal from './components/BookingModal';
import MobileBottomBar from './components/MobileBottomBar';

export default function App() {
  const [modal, setModal] = useState({ open: false, preset: '', mode: 'lab' });

  const openBooking = useCallback((preset = '', mode = 'lab') => {
    setModal({ open: true, preset, mode });
  }, []);

  const closeBooking = useCallback(() => {
    setModal(m => ({ ...m, open: false }));
  }, []);

  const openWhatsApp = useCallback(() => {
    const msg = encodeURIComponent("Hello Accurate Pathology Hadapsar, I want to receive my lab report or check report status.");
    window.open(`https://wa.me/918840658081?text=${msg}`, '_blank');
  }, []);

  return (
    <div className="ambient-bg min-h-screen">
      <Navbar onBooking={openBooking} />

      {/* pb-24 on mobile so content not hidden behind sticky bottom bar */}
      <main className="pb-24 sm:pb-0">
        <HeroSection onBooking={openBooking} />
        <ServicesSection onBooking={openBooking} onWhatsApp={openWhatsApp} />
        <PackagesSection onBooking={openBooking} />
        <ProcessSection />
        <WhyUsSection onBooking={openBooking} />
        <CTABanner onBooking={openBooking} />
        <FAQSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFAB />
      <MobileBottomBar onBooking={openBooking} isModalOpen={modal.open} />

      <BookingModal
        isOpen={modal.open}
        onClose={closeBooking}
        preset={modal.preset}
        mode={modal.mode}
      />
    </div>
  );
}
