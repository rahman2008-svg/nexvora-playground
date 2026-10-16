import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Code2, 
  Building2, 
  User, 
  Phone, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Heart
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#1e2430] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#161a23] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                NexVora Playground
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  v1.0.0
                </span>
              </h2>
              <p className="text-xs text-slate-400">About Developer & Company Information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Developer Card */}
          <div className="bg-[#181d28] border border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2.5 mb-3 text-blue-400 font-semibold text-xs uppercase tracking-wider">
              <User className="w-4 h-4 text-blue-400" />
              About Developer
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Prince AR Abdur Rahman</h3>
            <p className="text-slate-300 leading-relaxed text-sm mb-4">
              Independent App Developer passionate about building modern Android applications, productivity tools, AI-powered experiences, media players, educational apps, and next-generation digital products.
            </p>

            {/* Contact & Socials */}
            <div className="space-y-2.5 pt-3 border-t border-slate-800/80">
              <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Direct Contact & Channels
              </div>
              
              {/* WhatsApp 1 */}
              <div className="flex items-center justify-between bg-[#12161f] px-3.5 py-2.5 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-400 font-medium">WhatsApp 1:</span>
                  <a 
                    href="https://wa.me/8801707424006" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    01707424006
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
                <button
                  onClick={() => handleCopy('01707424006', 'wa1')}
                  className="p-1 text-slate-400 hover:text-white transition rounded hover:bg-slate-800"
                  title="Copy number"
                >
                  {copiedText === 'wa1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* WhatsApp 2 */}
              <div className="flex items-center justify-between bg-[#12161f] px-3.5 py-2.5 rounded-lg border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-400 font-medium">WhatsApp 2:</span>
                  <a 
                    href="https://wa.me/8801796951709" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    01796951709
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
                <button
                  onClick={() => handleCopy('01796951709', 'wa2')}
                  className="p-1 text-slate-400 hover:text-white transition rounded hover:bg-slate-800"
                  title="Copy number"
                >
                  {copiedText === 'wa2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Facebook */}
              <div className="flex items-center justify-between bg-[#12161f] px-3.5 py-2.5 rounded-lg border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Facebook Profile:</span>
                <a
                  href="https://www.facebook.com/share/1BNn32qoJo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1 font-mono truncate max-w-[280px]"
                >
                  facebook.com/share/1BNn32qoJo/
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-80" />
                </a>
              </div>

              {/* Instagram */}
              <div className="flex items-center justify-between bg-[#12161f] px-3.5 py-2.5 rounded-lg border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Instagram Profile:</span>
                <a
                  href="https://www.instagram.com/ur___abdur____rahman__2008"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-pink-400 hover:underline inline-flex items-center gap-1 font-mono truncate max-w-[280px]"
                >
                  @ur___abdur____rahman__2008
                  <ExternalLink className="w-3 h-3 shrink-0 opacity-80" />
                </a>
              </div>
            </div>
          </div>

          {/* Company Card */}
          <div className="bg-[#181d28] border border-slate-700/60 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-cyan-400" />
              About Company
            </div>
            <h3 className="text-lg font-bold text-white mb-2">NexVora Lab&apos;s Ofc</h3>
            <p className="text-slate-300 leading-relaxed text-sm mb-3">
              NexVora Lab&apos;s Ofc focuses on creating innovative Android applications designed to improve productivity, entertainment, learning, and digital experiences.
            </p>
            <div className="bg-[#12161f] rounded-lg p-3.5 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Mission: </span>
                Build fast, beautiful, privacy-friendly, and user-focused applications accessible to everyone.
              </div>
            </div>
          </div>

          {/* Technical Info & Credits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#181d28] border border-slate-700/60 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                Technical Information
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Version:</span>
                  <span className="font-mono text-white font-semibold">1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Architecture:</span>
                  <span>React 19 + TypeScript + Vite</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Runtime:</span>
                  <span>Sandboxed Preview Engine</span>
                </div>
              </div>
            </div>

            <div className="bg-[#181d28] border border-slate-700/60 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Credits & Copyright
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Developed by:</span>
                  <span className="text-white font-medium">Prince AR Abdur Rahman</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Published by:</span>
                  <span className="text-white font-medium">NexVora Lab&apos;s Ofc</span>
                </div>
                <div className="pt-1 text-[11px] text-slate-400">
                  © 2026 NexVora Lab&apos;s Ofc. All Rights Reserved
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#161a23] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400/20" />
            <span>for developers worldwide</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition text-xs shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
