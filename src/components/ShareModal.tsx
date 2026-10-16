import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Code, 
  FileCode, 
  ExternalLink 
} from 'lucide-react';
import { FiddleState } from '../types';
import { buildPreviewDoc } from '../utils/previewBuilder';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  fiddle: FiddleState;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  fiddle
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentUrl = window.location.href.split('#')[0];
  const shareableUrl = `${currentUrl}#${encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify({
    title: fiddle.title,
    html: fiddle.html,
    css: fiddle.css,
    javascript: fiddle.javascript,
    externalResources: fiddle.externalResources
  })))))}`;

  const embedSnippet = `<iframe width="100%" height="500" src="${currentUrl}" allow="fullscreen; accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi" frameborder="0"></iframe>`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadHTML = () => {
    const fullHtml = buildPreviewDoc(fiddle);
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(fiddle.title || 'nexvora-fiddle').toLowerCase().replace(/\s+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const jsonStr = JSON.stringify(fiddle, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(fiddle.title || 'nexvora-fiddle').toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#1e2430] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#161a23] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Share2 className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Share & Export Fiddle</h2>
              <p className="text-xs text-slate-400">Share your playground with others or download standalone files</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-slate-300">
          {/* Share Link */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Shareable Direct Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 bg-[#121620] border border-slate-700 rounded-lg px-3 py-2 text-slate-300 font-mono text-xs select-all outline-none"
              />
              <button
                onClick={() => handleCopy(shareableUrl, 'link')}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center gap-1.5 transition shrink-0 shadow-sm"
              >
                {copiedType === 'link' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Link
              </button>
            </div>
          </div>

          {/* Embed Code */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              Embed in Website (Iframe Snippet)
            </label>
            <div className="relative">
              <textarea
                readOnly
                rows={2}
                value={embedSnippet}
                className="w-full bg-[#121620] border border-slate-700 rounded-lg p-2.5 font-mono text-xs text-slate-300 select-all outline-none resize-none"
              />
              <button
                onClick={() => handleCopy(embedSnippet, 'embed')}
                className="absolute right-2 top-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition"
                title="Copy snippet"
              >
                {copiedType === 'embed' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Export / Download Buttons */}
          <div className="pt-2 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Export Standalone Code
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownloadHTML}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#161a24] border border-slate-700/80 hover:border-blue-500 hover:bg-blue-500/10 transition text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                  <FileCode className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Download HTML</div>
                  <div className="text-[11px] text-slate-400">Single self-contained bundle</div>
                </div>
              </button>

              <button
                onClick={handleDownloadJSON}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#161a24] border border-slate-700/80 hover:border-blue-500 hover:bg-blue-500/10 transition text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Export JSON</div>
                  <div className="text-[11px] text-slate-400">Playground data snapshot</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#161a23] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
