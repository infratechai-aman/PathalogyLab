import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-6 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 Accurate Pathology Laboratory. All Rights Reserved. Hadapsar, Pune.</p>
        <div className="flex items-center space-x-6">
          <a href="#hero" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="#hero" className="hover:text-slate-800 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
