export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-5 sm:py-6 pb-20 sm:pb-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <p className="text-center sm:text-left text-[11px] sm:text-xs">© 2026 Accurate Pathology Laboratory. All Rights Reserved. Hadapsar, Pune.</p>
        <div className="flex items-center space-x-4 sm:space-x-6 text-[11px] sm:text-xs">
          <a href="#hero" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="#hero" className="hover:text-slate-800 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
