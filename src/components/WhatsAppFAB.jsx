import { waHref } from '../data/lab';
import { WhatsAppIcon } from './ui';

/* Desktop/tablet only — on phones the sticky bottom bar already has WhatsApp. */
export default function WhatsAppFAB() {
  return (
    <a
      href={waHref('Hi Accurate Pathology, I would like to ask about blood tests and home collection.')}
      target="_blank"
      rel="noopener noreferrer"
      className="press hover-wa enter fixed bottom-6 right-6 z-30 hidden items-center gap-2.5 rounded-full bg-wa px-5 py-3.5 text-[14px] font-bold text-white shadow-[0_12px_32px_-8px_rgba(14,122,64,0.5)] sm:flex"
      style={{ '--i': 6 }}
    >
      <WhatsAppIcon className="h-5 w-5" />
      WhatsApp us
    </a>
  );
}
