import { useId, useState } from 'react';
import { Check, ChevronDown, Home, ArrowRight } from 'lucide-react';
import { formatPrice, includedList, testCount, waPackageMessage, packageImage } from '../data/lab';
import { CallButton, WhatsAppButton, PrimaryButton } from './ui';

const PREVIEW = 4;

export function Price({ pkg, large = false }) {
  if (!pkg.price) {
    return <p className={`font-extrabold text-ink ${large ? 'text-2xl' : 'text-lg'}`}>Call for price</p>;
  }
  return (
    <p className="flex items-baseline gap-2">
      <span className={`font-extrabold tracking-tight text-ink ${large ? 'text-4xl' : 'text-[1.75rem]'}`}>{formatPrice(pkg.price)}</span>
      {pkg.mrp && (
        <span className="text-[15px] text-slate-500 line-through" aria-label={`MRP ${formatPrice(pkg.mrp)}`}>
          {formatPrice(pkg.mrp)}
        </span>
      )}
    </p>
  );
}

export default function PackageCard({ pkg, onBooking, index = 0, headingLevel = 'h3' }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const items = includedList(pkg);
  const rest = items.slice(PREVIEW);
  const Heading = headingLevel;
  const img = packageImage(pkg);

  return (
    <article
      className="reveal lift relative flex flex-col rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
      style={{ '--i': index % 4 }}
    >
      <div className="-mx-5 -mt-5 mb-4 overflow-hidden rounded-t-3xl bg-slate-100 sm:-mx-6 sm:-mt-6">
        <img
          src={img.src}
          srcSet={img.srcSet}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, calc(100vw - 32px)"
          alt={img.alt}
          width="800"
          height="480"
          loading="lazy"
          decoding="async"
          className="aspect-[5/3] w-full object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Heading className="text-[17px] font-bold leading-snug tracking-tight text-ink">
            <a href={`/packages/${pkg.slug}`} className="hover:text-brand-600 after:absolute after:inset-0 after:content-[''] after:rounded-3xl focus-visible:outline-none">
              {pkg.name}
            </a>
          </Heading>
          <p className="mt-0.5 text-[13px] text-slate-600">{pkg.tagline}</p>
        </div>
        {pkg.badge && (
          <span className="shrink-0 rounded-full bg-mint-50 px-2.5 py-1 text-[11px] font-bold text-mint ring-1 ring-mint-500/25">
            {pkg.badge}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <Price pkg={pkg} />
        <span className="mb-1 text-[13px] font-semibold text-brand">{testCount(pkg)} {pkg.parameters ? 'parameters' : 'tests'}</span>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">What’s included</p>
        <ul className="space-y-1.5 text-[14px] text-slate-700">
          {items.slice(0, PREVIEW).map((it) => (
            <li key={it} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
        {rest.length > 0 && (
          <>
            <div id={id} className="collapse" data-open={open}>
              <div>
                <ul className="space-y-1.5 pt-1.5 text-[14px] text-slate-700" aria-hidden={!open}>
                  {rest.map((it) => (
                    <li key={it} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" aria-hidden="true" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={id}
              onClick={() => setOpen((o) => !o)}
              className="press relative z-10 mt-2 inline-flex items-center gap-1 rounded-lg py-1 text-[13px] font-semibold text-brand"
            >
              {open ? 'Show less' : `+${rest.length} more`}
              <ChevronDown className="chevron h-4 w-4" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-slate-600">
        <Home className="h-4 w-4 text-mint" aria-hidden="true" />
        {pkg.freeHomeCollection ? <><strong className="text-mint">FREE</strong> home collection</> : 'Home collection available'}
      </p>

      <div className="relative z-10 mt-auto grid grid-cols-[auto_1fr] gap-2 pt-5">
        <CallButton label="Call" className="px-3" />
        <WhatsAppButton message={waPackageMessage(pkg)} label="WhatsApp" />
        <PrimaryButton
          className="col-span-2"
          onClick={() => onBooking?.(pkg.name, 'home')}
          aria-label={`Book ${pkg.name}`}
        >
          Book {pkg.price ? 'Now' : 'a Callback'}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </PrimaryButton>
      </div>
    </article>
  );
}
