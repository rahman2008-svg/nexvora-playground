import React from 'react';
import { 
  X, 
  Sparkles, 
  Layout, 
  Activity, 
  CheckSquare, 
  Layers, 
  ArrowRight,
  Code2
} from 'lucide-react';
import { BoilerplateTemplate } from '../types';
import { BOILERPLATES } from '../data/boilerplates';

interface BoilerplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBoilerplate: (template: BoilerplateTemplate) => void;
}

export const BoilerplatesModal: React.FC<BoilerplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectBoilerplate
}) => {
  if (!isOpen) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5 text-blue-400" />;
      default: return <Code2 className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#1e2430] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#161a23] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Starter Boilerplates</h2>
              <p className="text-xs text-slate-400">Choose a production-ready template to jumpstart your build</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {BOILERPLATES.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectBoilerplate(item);
                onClose();
              }}
              className="group cursor-pointer bg-[#161a24] border border-slate-800 hover:border-blue-500/80 rounded-xl p-4 transition duration-200 flex flex-col justify-between hover:bg-[#1a202e] hover:shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#121620] border border-slate-800 flex items-center justify-center">
                    {getIcon(item.iconName)}
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-blue-400 group-hover:translate-x-0.5 transition">
                <span>Load Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#161a23] flex justify-between items-center text-xs text-slate-400">
          <span>Loading a template will replace current editor contents.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
