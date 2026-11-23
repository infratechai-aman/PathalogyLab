export default function Footer({ onOpenPolicy }) {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-5 sm:py-6 pb-20 sm:pb-6 text-xs text-slate-500">
      <div className="max-w-[1480px] xl:max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div className="text-center sm:text-left text-[11px] sm:text-xs space-y-1">
          <p>© 2026 Accurate Pathology Laboratory. All Rights Reserved.</p>
          <address className="not-italic">
            Lane No 15/A, Mohammad Wadi Road, Autadwadi Handewadi, Sayyad Nagar, Hadapsar, Pune 411028 ·{' '}
            <a href="tel:+918840658081" className="hover:text-[#003b95] transition-colors">+91 88406 58081</a>
          </address>
          <p>Tests are for diagnostic purposes. Consult your doctor for interpretation.</p>
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] sm:text-xs">
          <a
            href="/privacy-policy"
            onClick={(e) => {
              if (onOpenPolicy) {
                e.preventDefault();
                onOpenPolicy('privacy');
              }
            }}
            className="hover:text-[#003b95] transition-colors"
          >
            Privacy Policy
          </a>
          <span>|</span>
          <a
            href="/terms-of-service"
            onClick={(e) => {
              if (onOpenPolicy) {
                e.preventDefault();
                onOpenPolicy('terms');
              }
            }}
            className="hover:text-[#003b95] transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
