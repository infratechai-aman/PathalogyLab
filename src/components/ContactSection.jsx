import { useEffect, useRef, useState } from 'react';
import { Phone, MapPin, Clock, Navigation, Mail } from 'lucide-react';
import { LAB, fullAddress, formatPhone, telHref } from '../data/lab';
import { Container, SectionHeading, WhatsAppButton } from './ui';

/* Google Maps' embed ships ~1 MB of JS. Mount it only when the visitor scrolls
   near it; until then show a skeleton of the same size (no layout shift). */
function LazyMap() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setShow(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShow(true), io.disconnect()), { rootMargin: '300px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="h-72 w-full sm:h-[360px]">
      {show ? (
        <iframe
          title="Map: Accurate Pathology Laboratory, Mohammad Wadi Road, Hadapsar, Pune"
          src={LAB.mapsEmbed}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="skeleton h-full w-full rounded-none" role="img" aria-label="Map loading" />
      )}
    </div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-12 sm:py-20 bg-white">
      <Container>
        <SectionHeading id="contact-title" eyebrow="Visit or call" title="Contact Accurate Pathology Laboratory" />
        <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
          <div className="reveal space-y-4">
            <address className="not-italic rounded-3xl border border-slate-200 bg-[#fbfcfe] p-5 sm:p-6">
              <p className="text-[17px] font-bold text-ink">{LAB.name}</p>
              <p className="mt-3 flex gap-2.5 text-[15px] leading-relaxed text-slate-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                {fullAddress}
              </p>
              <p className="mt-3 flex items-center gap-2.5 text-[15px] font-semibold text-ink">
                <Clock className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                {LAB.hours}
              </p>
              <p className="mt-3 flex items-center gap-2.5 text-[15px] text-slate-700">
                <Mail className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <a href={`mailto:${LAB.email}`} className="break-all hover:text-brand">{LAB.email}</a>
              </p>
            </address>

            <ul className="grid grid-cols-2 gap-2.5" aria-label="Phone numbers">
              {LAB.phones.map((p) => (
                <li key={p}>
                  <a href={telHref(p)} className="press hover-soft flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white text-[15px] font-semibold text-ink">
                    <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                    {formatPhone(p).replace('+91 ', '')}
                  </a>
                </li>
              ))}
            </ul>
            <WhatsAppButton size="md" className="w-full" label={`WhatsApp ${formatPhone(LAB.whatsapp)}`} message="Hello Accurate Pathology, I have a question about a blood test." />
          </div>

          <div className="reveal overflow-hidden rounded-3xl border border-slate-200 bg-slate-100" style={{ '--i': 1 }}>
            <LazyMap />
            <a
              href={LAB.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="press flex h-12 items-center justify-center gap-2 bg-white text-[15px] font-semibold text-brand"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" /> Get directions
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
