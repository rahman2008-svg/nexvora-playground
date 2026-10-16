import React from 'react';
import { 
  Heart, 
  ExternalLink, 
  Phone, 
  Info,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout }) => {
  return (
    <footer className="h-7 bg-[#141822] border-t border-slate-800/80 px-3 md:px-4 flex items-center justify-between text-[11px] text-slate-400 select-none shrink-0 z-20">
      {/* Left: App & Developer Credits */}
      <div className="flex items-center gap-2 truncate">
        <span className="font-semibold text-slate-200">NexVora Playground</span>
        <span className="text-slate-600">·</span>
        <span className="hidden sm:inline text-slate-400">Developed by <span className="text-slate-200 font-medium">Prince AR Abdur Rahman</span></span>
        <span className="hidden md:inline text-slate-600">·</span>
        <span className="hidden md:inline text-slate-400">Published by <span className="text-slate-200 font-medium">NexVora Lab&apos;s Ofc</span></span>
      </div>

      {/* Right: Copyright, Contact & About Links */}
      <div className="flex items-center gap-3 shrink-0">
        <a 
          href="https://wa.me/8801707424006" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition"
          title="WhatsApp Contact: 01707424006"
        >
          <Phone className="w-3 h-3 text-emerald-400" />
          <span>01707424006</span>
        </a>

        <span className="hidden lg:inline text-slate-700">|</span>

        <button
          onClick={onOpenAbout}
          className="hover:text-blue-400 text-slate-300 font-medium flex items-center gap-1 transition"
        >
          <Info className="w-3 h-3 text-blue-400" />
          <span>Credits & Info</span>
        </button>

        <span className="text-slate-700">|</span>

        <span className="text-slate-400">
          © 2026 NexVora Lab&apos;s Ofc
        </span>
      </div>
    </footer>
  );
};
