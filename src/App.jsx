import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import MobileBottomBar from './components/MobileBottomBar';
import { useRevealOnScroll } from './components/ui';
import { HomePage, PackagePage, TestsPage, NotFoundPage } from './pages';
import { resolveRoute, getHead } from './seo';
import { waPackageMessage } from './data/lab';
import { initTracking } from './tracking';

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

  useRevealOnScroll(route.path);
  useEffect(() => initTracking(), []);

  // Dev server has no prerendered <head>; keep the title right there too.
  useEffect(() => {
    document.title = getHead(route).title;
  }, [route]);

  let page;
  if (route.type === 'home') page = <HomePage onBooking={openBooking} />;
  else if (route.type === 'package') page = <PackagePage pkg={route.pkg} onBooking={openBooking} />;
  else if (route.type === 'tests') page = <TestsPage />;
  else page = <NotFoundPage />;

  return (
    <>
      <Navbar onBooking={openBooking} />
      <main id="main">{page}</main>
      <Footer onOpenPolicy={openPolicy} />
      <WhatsAppFAB />
      <MobileBottomBar hidden={modal.open} waMessage={route.pkg ? waPackageMessage(route.pkg) : undefined} />

      <Suspense fallback={null}>
        {modal.loaded && <BookingModal isOpen={modal.open} onClose={closeBooking} preset={modal.preset} mode={modal.mode} />}
        {policy.loaded && <PolicyModal isOpen={policy.open} onClose={closePolicy} initialTab={policy.tab} />}
      </Suspense>
    </>
  );
}
