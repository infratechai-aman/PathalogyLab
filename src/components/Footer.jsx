import { LAB, PACKAGES, fullAddress, formatPhone, telHref } from '../data/lab';
import { Container } from './ui';

export default function Footer({ onOpenPolicy }) {
  const policyLink = (href, tab, label) => (
    <a
      href={href}
      onClick={(e) => {
        if (onOpenPolicy) {
          e.preventDefault();
          onOpenPolicy(tab);
        }
      }}
      className="hover:text-white"
    >
      {label}
    </a>
  );

  return (
    <footer className="bg-ink pb-28 pt-12 text-[14px] text-slate-300 sm:pb-10">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-lg font-extrabold text-white">{LAB.name}</p>
            <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-emerald-300">{LAB.taglines.join(' · ')}</p>
            <address className="mt-4 not-italic leading-relaxed">
              {fullAddress}
              <br />
              {LAB.hours}
              <br />
              {LAB.phones.map((p, i) => (
                <span key={p}>
                  <a href={telHref(p)} className="font-semibold text-white hover:underline">{formatPhone(p)}</a>
                  {i < LAB.phones.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </address>
          </div>

          <nav aria-label="Health packages">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.14em] text-slate-400">Packages</p>
            <ul className="space-y-2">
              {PACKAGES.map((p) => (
                <li key={p.slug}><a href={`/packages/${p.slug}`} className="hover:text-white">{p.name}</a></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Useful links">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.14em] text-slate-400">Useful links</p>
            <ul className="space-y-2">
              <li><a href="/tests" className="hover:text-white">All tests directory</a></li>
              <li><a href="/#faq" className="hover:text-white">FAQs</a></li>
              <li><a href="/#contact" className="hover:text-white">Contact & map</a></li>
              <li>{policyLink('/privacy-policy', 'privacy', 'Privacy Policy')}</li>
              <li>{policyLink('/terms-of-service', 'terms', 'Terms of Service')}</li>
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-[13px] leading-relaxed text-slate-400">
          {LAB.disclaimer} © {new Date().getFullYear()} {LAB.name}, Hadapsar, Pune.
        </p>
      </Container>
    </footer>
  );
}
