import { Phone } from 'lucide-react';
import { LAB, telHref, waHref } from '../data/lab';
import { WhatsAppIcon } from './ui';

/**
 * Sticky mobile action bar: two equal, full-size targets (Call + WhatsApp).
 * Same height, same radius, same type size — the old three-button bar mixed
 * an outline chip, a gradient pill and a small green chip at different widths.
 */
export default function MobileBottomBar({ hidden = false, waMessage }) {
  if (hidden) return null;
  return (
    <div className="bar-in fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-3 pt-2.5 backdrop-blur-xl safe-bottom sm:hidden">
      <div className="grid grid-cols-2 gap-2.5">
        <a
          href={telHref()}
          className="press flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-brand text-[16px] font-bold text-white"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          Call Now
        </a>
        <a
          href={waHref(waMessage || 'Hello Accurate Pathology, I want to book a blood test.')}
          target="_blank"
          rel="noopener noreferrer"
          className="press flex h-[52px] items-center justify-center gap-2 rounded-2xl bg-wa text-[16px] font-bold text-white"
          aria-label={`WhatsApp ${LAB.shortName}`}
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
