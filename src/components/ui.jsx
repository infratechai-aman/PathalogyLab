import { useEffect } from 'react';
import { Phone } from 'lucide-react';
import { LAB, telHref, waHref } from '../data/lab';

export function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

const sizes = {
  sm: 'h-10 px-3.5 text-[13px] rounded-xl gap-1.5',
  md: 'h-12 px-5 text-[15px] rounded-2xl gap-2',
};

export function CallButton({ phone = LAB.phones[0], label = 'Call', size = 'sm', variant = 'outline', className = '' }) {
  const look =
    variant === 'solid'
      ? 'bg-white text-brand border border-white'
      : 'bg-white text-ink border border-slate-300 hover-soft';
  return (
    <a href={telHref(phone)} className={`press inline-flex items-center justify-center font-semibold ${sizes[size]} ${look} ${className}`}>
      <Phone className="w-4 h-4 text-brand" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

export function WhatsAppButton({ message, label = 'WhatsApp', size = 'sm', className = '' }) {
  return (
    <a
      href={waHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`press hover-wa inline-flex items-center justify-center font-semibold bg-wa text-white ${sizes[size]} ${className}`}
    >
      <WhatsAppIcon />
      <span>{label}</span>
    </a>
  );
}

export function PrimaryButton({ children, onClick, size = 'sm', className = '', ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`press hover-brand inline-flex items-center justify-center font-semibold bg-brand text-white shadow-[0_6px_16px_-6px_rgba(0,59,149,0.5)] ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SectionHeading({ eyebrow, title, intro, id, align = 'left' }) {
  return (
    <div className={`mb-6 sm:mb-8 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-mint mb-2">{eyebrow}</p>}
      <h2 id={id} className="text-[1.6rem] leading-[1.15] sm:text-4xl font-extrabold tracking-[-0.025em] text-ink text-balance">
        {title}
      </h2>
      {intro && <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-slate-600">{intro}</p>}
    </div>
  );
}

export const Container = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

/** One IntersectionObserver for every `.reveal` element on the page. */
export function useRevealOnScroll(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
