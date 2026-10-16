import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Globe, 
  ExternalLink, 
  Code, 
  Check, 
  Sparkles,
  Link2
} from 'lucide-react';
import { ExternalResource } from '../types';
import { POPULAR_RESOURCES } from '../data/cdnPresets';

interface ExternalResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: ExternalResource[];
  onAddResource: (resource: Omit<ExternalResource, 'id'>) => void;
  onRemoveResource: (id: string) => void;
  onToggleResource: (id: string) => void;
}

export const ExternalResourcesModal: React.FC<ExternalResourcesModalProps> = ({
  isOpen,
  onClose,
  resources,
  onAddResource,
  onRemoveResource,
  onToggleResource
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [typeInput, setTypeInput] = useState<'js' | 'css'>('js');

  if (!isOpen) return null;

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const detectedType = urlInput.endsWith('.css') ? 'css' : typeInput;
    const name = nameInput.trim() || urlInput.split('/').pop() || 'Resource';

    onAddResource({
      name,
      url: urlInput.trim(),
      type: detectedType,
      enabled: true
    });

    setUrlInput('');
    setNameInput('');
  };

  const handleAddPreset = (preset: typeof POPULAR_RESOURCES[0]) => {
    // Check if already added
    if (resources.some(r => r.url === preset.url)) return;

    onAddResource({
      name: preset.name,
      url: preset.url,
      type: preset.type,
      enabled: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#1e2430] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#161a23] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">External Resources</h2>
              <p className="text-xs text-slate-400">Add CSS stylesheets and JavaScript CDNs to your Fiddle</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Add Custom Input */}
          <form onSubmit={handleAddCustom} className="space-y-3 bg-[#161a24] p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-blue-400" />
              Add URL or CDN Package
            </div>
            
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (e.target.value.endsWith('.css')) setTypeInput('css');
                  else if (e.target.value.endsWith('.js')) setTypeInput('js');
                }}
                placeholder="https://cdn.example.com/library.min.js or .css"
                required
                className="flex-1 bg-[#121620] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500 font-mono"
              />

              <select
                value={typeInput}
                onChange={(e) => setTypeInput(e.target.value as 'js' | 'css')}
                className="bg-[#121620] border border-slate-700 rounded-lg px-2 text-xs text-slate-200 outline-none focus:border-blue-500"
              >
                <option value="js">JavaScript (.js)</option>
                <option value="css">Stylesheet (.css)</option>
              </select>

              <button
                type="submit"
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 shrink-0 transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
          </form>

          {/* Current Loaded Resources */}
          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Loaded in Playground ({resources.length})</span>
            </div>

            {resources.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
                No external resources added yet. Choose from the quick library presets below or paste any CDN link.
              </div>
            ) : (
              <div className="space-y-2">
                {resources.map((res) => (
                  <div
                    key={res.id}
                    className="flex items-center justify-between bg-[#161a24] border border-slate-800 rounded-lg p-2.5 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                      <input
                        type="checkbox"
                        checked={res.enabled}
                        onChange={() => onToggleResource(res.id)}
                        className="rounded accent-blue-600 cursor-pointer"
                      />
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                        res.type === 'css' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {res.type}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-white truncate">{res.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono truncate">{res.url}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveResource(res.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded hover:bg-rose-500/10 transition"
                      title="Remove resource"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick CDN Presets */}
          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Popular CDN Quick-Add
            </div>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_RESOURCES.map((preset) => {
                const isAdded = resources.some(r => r.url === preset.url);
                return (
                  <button
                    key={preset.url}
                    onClick={() => handleAddPreset(preset)}
                    disabled={isAdded}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs transition ${
                      isAdded 
                        ? 'bg-blue-600/10 border-blue-500/30 text-blue-300 opacity-60 cursor-default' 
                        : 'bg-[#161a24] border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-[#1a202c]'
                    }`}
                  >
                    <div className="truncate mr-2">
                      <div className="font-medium truncate">{preset.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono uppercase">{preset.type}</div>
                    </div>
                    {isAdded ? (
                      <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#161a23] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
