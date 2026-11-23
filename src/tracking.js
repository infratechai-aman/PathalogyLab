/**
 * Lead tracking: Call clicks, WhatsApp clicks and booking-form submissions.
 *
 * HOW TO TURN IT ON — fill in the IDs below and redeploy:
 *  - ga4Id:  Google Analytics 4 Measurement ID, e.g. 'G-ABC123XYZ'
 *  - adsId:  Google Ads Conversion ID, e.g. 'AW-123456789'
 *  - adsLabels: the "conversion label" of each Google Ads conversion action
 *    (Google Ads → Goals → Conversions → your action → Tag setup → "send_to": 'AW-…/LABEL')
 *
 * While all IDs are empty, no Google script is loaded (no speed cost); events
 * are still pushed to window.dataLayer, so Google Tag Manager can use them too.
 */
export const TRACKING = {
  ga4Id: '',
  adsId: '',
  adsLabels: {
    call: '',
    whatsapp: '',
    booking: '',
  },
};

let loaded = false;

function gtag() {
  window.dataLayer = window.dataLayer || [];
  // gtag.js expects the arguments object itself, not an array.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function loadGtag() {
  const primary = TRACKING.ga4Id || TRACKING.adsId;
  if (loaded || !primary) return;
  loaded = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${primary}`;
  document.head.appendChild(s);
  gtag('js', new Date());
  if (TRACKING.ga4Id) gtag('config', TRACKING.ga4Id);
  if (TRACKING.adsId) gtag('config', TRACKING.adsId);
}

/**
 * Record a lead. type: 'call' | 'whatsapp' | 'booking'.
 * Sent as a GA4 `generate_lead` event and, if configured, a Google Ads conversion.
 */
export function trackLead(type, detail = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'lead', lead_type: type, page_path: location.pathname, ...detail });
  gtag('event', 'generate_lead', { method: type, page_path: location.pathname, ...detail });
  const label = TRACKING.adsLabels[type];
  if (TRACKING.adsId && label) {
    gtag('event', 'conversion', { send_to: `${TRACKING.adsId}/${label}` });
  }
}

/** One delegated listener catches every tel: and WhatsApp link on every page. */
export function initTracking() {
  if (typeof window === 'undefined' || window.__leadTracking) return;
  window.__leadTracking = true;

  document.addEventListener(
    'click',
    (e) => {
      const a = e.target.closest?.('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      const label = (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 60);
      if (href.startsWith('tel:')) trackLead('call', { phone: href.slice(4), link_text: label });
      else if (href.includes('wa.me/')) trackLead('whatsapp', { link_text: label });
    },
    { capture: true },
  );

  // Load Google's script after the page has finished loading, so it never delays first paint.
  const start = () => ('requestIdleCallback' in window ? requestIdleCallback(loadGtag) : setTimeout(loadGtag, 1500));
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}
