import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import MobileBottomBar from './components/MobileBottomBar';
import { useRevealOnScroll } from './components/ui';
import { HomePage, PackagePage, TestsPage, NotFoundPage } from './pages';
import { resolveRoute, getHead } from './seo';
import { initTracking, trackLead } from './tracking';

// Modals are not needed for first paint — load their code on first open.
const BookingModal = lazy(() => import('./components/BookingModal'));
const PolicyModal = lazy(() => import('./components/PolicyModal'));

export default function App({ url }) {
  const route = resolveRoute(url ?? (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const [modal, setModal] = useState({ open: false, preset: '', mode: 'home', loaded: false });
  const [policy, setPolicy] = useState({ open: false, tab: 'privacy', loaded: false });

  const openBooking = useCallback((preset = '', mode = 'home') => setModal({ open: true, preset, mode, loaded: true }), []);
  const closeBooking = useCallback(() => setModal((m) => ({ ...m, open: false })), []);
  const openPolicy = useCallback((tab = 'privacy') => setPolicy({ open: true, tab, loaded: true }), []);
  const closePolicy = useCallback(() => setPolicy((p) => ({ ...p, open: false })), []);

  const openWhatsApp = useCallback(() => {
    trackLead('whatsapp', { link_text: 'Get Your Report' });
    const msg = encodeURIComponent('Hello Accurate Pathology, I want to receive my lab report or check report status.');
    window.open(`https://wa.me/918840658081?text=${msg}`, '_blank');
  }, []);

  useRevealOnScroll(route.path);
  useEffect(() => initTracking(), []);

  // Dev server has no prerendered <head>; keep the title right there too.
  useEffect(() => {
    document.title = getHead(route).title;
  }, [route]);

  let page;
  if (route.type === 'home') page = <HomePage onBooking={openBooking} onWhatsApp={openWhatsApp} onOpenPolicy={openPolicy} />;
  else if (route.type === 'package') page = <PackagePage pkg={route.pkg} onBooking={openBooking} />;
  else if (route.type === 'tests') page = <TestsPage />;
  else page = <NotFoundPage />;

  return (
    <div className="ambient-bg min-h-screen">
      <Navbar onBooking={openBooking} />
      {/* pb-24 on mobile so content is not hidden behind the sticky bottom bar */}
      <main id="main" className="pb-24 sm:pb-0">{page}</main>
      <Footer onOpenPolicy={openPolicy} />
      <WhatsAppFAB />
      <MobileBottomBar onBooking={openBooking} isModalOpen={modal.open} />

      <Suspense fallback={null}>
        {modal.loaded && <BookingModal isOpen={modal.open} onClose={closeBooking} preset={modal.preset} mode={modal.mode} />}
        {policy.loaded && <PolicyModal isOpen={policy.open} onClose={closePolicy} initialTab={policy.tab} />}
      </Suspense>
    </div>
  );
}
