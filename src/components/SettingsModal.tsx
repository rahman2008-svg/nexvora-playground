import React from 'react';
import { X, Sliders, Moon, Sun, Code2, Play, Terminal } from 'lucide-react';
import { EditorSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: EditorSettings;
  onUpdateSettings: (newSettings: Partial<EditorSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#1e2430] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#161a23] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Editor Preferences</h2>
              <p className="text-xs text-slate-400">Configure playground environment, layout & code execution</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-sm text-slate-200">
          {/* Tab size */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white text-xs">Indentation Size</div>
              <div className="text-[11px] text-slate-400">Number of spaces inserted for tab key</div>
            </div>
            <div className="flex bg-[#121620] p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => onUpdateSettings({ tabSize: 2 })}
                className={`px-3 py-1 rounded text-xs transition ${
                  settings.tabSize === 2 ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                2 spaces
              </button>
              <button
                onClick={() => onUpdateSettings({ tabSize: 4 })}
                className={`px-3 py-1 rounded text-xs transition ${
                  settings.tabSize === 4 ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                4 spaces
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white text-xs">Editor Font Size</div>
              <div className="text-[11px] text-slate-400">Monospace typography scale in code editor</div>
            </div>
            <select
              value={settings.fontSize}
              onChange={(e) => onUpdateSettings({ fontSize: Number(e.target.value) })}
              className="bg-[#121620] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
            >
              <option value={12}>12 px (Default)</option>
              <option value={13}>13 px</option>
              <option value={14}>14 px (Medium)</option>
              <option value={16}>16 px (Large)</option>
            </select>
          </div>

          {/* Line Numbers Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white text-xs">Display Line Numbers</div>
              <div className="text-[11px] text-slate-400">Show line count gutter along editor margins</div>
            </div>
            <input
              type="checkbox"
              checked={settings.lineNumbers}
              onChange={(e) => onUpdateSettings({ lineNumbers: e.target.checked })}
              className="w-4 h-4 accent-blue-600 cursor-pointer rounded"
            />
          </div>

          {/* Word Wrap */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white text-xs">Soft Word Wrap</div>
              <div className="text-[11px] text-slate-400">Wrap long lines to fit editor viewport</div>
            </div>
            <input
              type="checkbox"
              checked={settings.wordWrap}
              onChange={(e) => onUpdateSettings({ wordWrap: e.target.checked })}
              className="w-4 h-4 accent-blue-600 cursor-pointer rounded"
            />
          </div>

          {/* Auto-run Code */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white text-xs">Auto-run on code changes</div>
              <div className="text-[11px] text-slate-400">Automatically recompile preview after 1 second of typing</div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoRun}
              onChange={(e) => onUpdateSettings({ autoRun: e.target.checked })}
              className="w-4 h-4 accent-blue-600 cursor-pointer rounded"
            />
          </div>

          {/* Clear console on run */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white text-xs">Clear Console on Execution</div>
              <div className="text-[11px] text-slate-400">Purge previous console logs whenever code runs</div>
            </div>
            <input
              type="checkbox"
              checked={settings.clearConsoleOnRun}
              onChange={(e) => onUpdateSettings({ clearConsoleOnRun: e.target.checked })}
              className="w-4 h-4 accent-blue-600 cursor-pointer rounded"
            />
          </div>

          {/* Color Theme */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div>
              <div className="font-medium text-white text-xs">Color Scheme</div>
              <div className="text-[11px] text-slate-400">Playground interface theme</div>
            </div>
            <div className="flex bg-[#121620] p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => onUpdateSettings({ theme: 'dark' })}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition ${
                  settings.theme === 'dark' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                Dark
              </button>
              <button
                onClick={() => onUpdateSettings({ theme: 'light' })}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition ${
                  settings.theme === 'light' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                Light
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
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};
