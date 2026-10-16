import React, { useState } from 'react';
import { 
  Play, 
  Save, 
  Wand2, 
  Layers, 
  Globe, 
  Share2, 
  LayoutGrid, 
  Columns, 
  Rows, 
  Smartphone,
  Sliders, 
  Moon, 
  Sun, 
  Info,
  Check,
  ChevronDown,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { LayoutMode, EditorSettings } from '../types';

interface NavbarProps {
  onRun: () => void;
  onSave: () => void;
  onTidy: () => void;
  onOpenBoilerplates: () => void;
  onOpenResources: () => void;
  onOpenShare: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  layoutMode: LayoutMode;
  onChangeLayout: (mode: LayoutMode) => void;
  settings: EditorSettings;
  onToggleTheme: () => void;
  resourceCount: number;
  isSaved: boolean;
  fiddleTitle: string;
  onTitleChange: (title: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRun,
  onSave,
  onTidy,
  onOpenBoilerplates,
  onOpenResources,
  onOpenShare,
  onOpenSettings,
  onOpenAbout,
  layoutMode,
  onChangeLayout,
  settings,
  onToggleTheme,
  resourceCount,
  isSaved,
  fiddleTitle,
  onTitleChange
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [layoutDropdownOpen, setLayoutDropdownOpen] = useState(false);

  return (
    <header className="h-12 bg-[#171b24] border-b border-slate-800 flex items-center justify-between px-3 md:px-4 select-none shrink-0 z-30">
      {/* Zone 1: Brand & Fiddle Title */}
      <div className="flex items-center gap-3 shrink-0">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); onOpenAbout(); }}
          className="flex items-center gap-2 group transition"
          title="About NexVora Playground"
        >
          {/* Logo Mark */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-sm font-bold font-mono text-sm group-hover:scale-105 transition-transform">
            N
          </div>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="font-bold text-slate-100 tracking-tight text-sm">NexVora</span>
            <span className="text-[11px] font-medium text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
              Playground
            </span>
          </div>
        </a>

        {/* Fiddle Title (Editable) */}
        <div className="hidden lg:flex items-center text-slate-400 text-xs pl-3 border-l border-slate-800">
          {isEditingTitle ? (
            <input
              type="text"
              value={fiddleTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingTitle(false); }}
              autoFocus
              className="bg-[#121620] border border-blue-500 rounded px-2 py-0.5 text-xs text-white outline-none w-44"
            />
          ) : (
            <span
              onClick={() => setIsEditingTitle(true)}
              className="cursor-pointer hover:text-white transition truncate max-w-[180px] font-medium"
              title="Click to rename fiddle"
            >
              {fiddleTitle || 'Untitled Fiddle'}
            </span>
          )}
        </div>
      </div>

      {/* Zone 2: Main Primary Action Buttons */}
      <div className="hidden md:flex items-center gap-1.5 shrink-0">
        {/* Run Button */}
        <button
          onClick={onRun}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-lg text-xs transition shadow-sm hover:shadow-blue-500/20 whitespace-nowrap"
          title="Run code (Ctrl + Enter)"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Run</span>
          <kbd className="hidden xl:inline text-[10px] bg-blue-700/60 px-1 py-0.2 rounded font-mono text-blue-200">
            ⌘↵
          </kbd>
        </button>

        {/* Save Button */}
        <button
          onClick={onSave}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
            isSaved
              ? 'bg-slate-800 text-emerald-400 border border-slate-700'
              : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600'
          }`}
          title="Save fiddle"
        >
          {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5 text-slate-400" />}
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>

        {/* Tidy Button */}
        <button
          onClick={onTidy}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-lg text-xs font-medium transition whitespace-nowrap"
          title="Format HTML, CSS and JS"
        >
          <Wand2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Tidy</span>
        </button>

        {/* Boilerplates Button */}
        <button
          onClick={onOpenBoilerplates}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-lg text-xs font-medium transition whitespace-nowrap"
          title="Load template boilerplates"
        >
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Boilerplates</span>
        </button>

        {/* External Resources */}
        <button
          onClick={onOpenResources}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-lg text-xs font-medium transition whitespace-nowrap"
          title="Manage external libraries & CDNs"
        >
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <span>Resources</span>
          {resourceCount > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-400 font-bold">
              {resourceCount}
            </span>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-lg text-xs font-medium transition whitespace-nowrap"
          title="Share or export fiddle"
        >
          <Share2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Share</span>
        </button>
      </div>

      {/* Zone 3: Utility Controls & About */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Layout Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLayoutDropdownOpen(!layoutDropdownOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-xs text-slate-300 font-medium transition whitespace-nowrap"
            title="Change editor quadrant layout"
          >
            {layoutMode === 'classic' && <LayoutGrid className="w-3.5 h-3.5 text-blue-400" />}
            {layoutMode === 'columns' && <Columns className="w-3.5 h-3.5 text-blue-400" />}
            {layoutMode === 'rows' && <Rows className="w-3.5 h-3.5 text-blue-400" />}
            {layoutMode === 'tabs' && <Smartphone className="w-3.5 h-3.5 text-blue-400" />}
            <span className="hidden sm:inline capitalize">{layoutMode}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {layoutDropdownOpen && (
            <div 
              className="absolute right-0 top-9 w-40 bg-[#1e2430] border border-slate-700 rounded-xl shadow-2xl p-1 z-40 text-xs"
              onClick={() => setLayoutDropdownOpen(false)}
            >
              <button
                onClick={() => onChangeLayout('classic')}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition ${
                  layoutMode === 'classic' ? 'bg-blue-600 text-white font-medium' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Classic (2x2)</span>
              </button>
              <button
                onClick={() => onChangeLayout('columns')}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition ${
                  layoutMode === 'columns' ? 'bg-blue-600 text-white font-medium' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Columns (3-col)</span>
              </button>
              <button
                onClick={() => onChangeLayout('rows')}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition ${
                  layoutMode === 'rows' ? 'bg-blue-600 text-white font-medium' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Rows className="w-3.5 h-3.5" />
                <span>Rows</span>
              </button>
              <button
                onClick={() => onChangeLayout('tabs')}
                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition ${
                  layoutMode === 'tabs' ? 'bg-blue-600 text-white font-medium' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Tabs / Mobile</span>
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-1.5 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition"
          title={`Switch to ${settings.theme === 'dark' ? 'Light' : 'Dark'} theme`}
        >
          {settings.theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-400" />}
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition"
          title="Editor Settings"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* About Developer & Company Button */}
        <button
          onClick={onOpenAbout}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 hover:from-blue-600/30 hover:to-cyan-500/30 text-blue-300 border border-blue-500/40 rounded-lg text-xs font-semibold transition whitespace-nowrap shadow-sm"
          title="About Prince AR Abdur Rahman & NexVora Lab's Ofc"
        >
          <Info className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">About</span>
          <span className="sm:hidden">Info</span>
        </button>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-slate-300 hover:text-white bg-slate-800 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-12 bg-[#171b24] border-b border-slate-800 p-4 space-y-2 z-40 shadow-2xl">
          <button
            onClick={() => { onRun(); setMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold"
          >
            <Play className="w-4 h-4 fill-current" />
            Run Code
          </button>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => { onSave(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-medium"
            >
              <Save className="w-3.5 h-3.5" />
              Save
            </button>
            <button
              onClick={() => { onTidy(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-medium"
            >
              <Wand2 className="w-3.5 h-3.5" />
              Tidy Code
            </button>
            <button
              onClick={() => { onOpenBoilerplates(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-medium"
            >
              <Layers className="w-3.5 h-3.5" />
              Boilerplates
            </button>
            <button
              onClick={() => { onOpenResources(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-medium"
            >
              <Globe className="w-3.5 h-3.5" />
              Resources ({resourceCount})
            </button>
            <button
              onClick={() => { onOpenShare(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-medium"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            <button
              onClick={() => { onOpenAbout(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2 bg-blue-600/20 text-blue-300 rounded-lg text-xs font-semibold border border-blue-500/30"
            >
              <Info className="w-3.5 h-3.5" />
              About Developer
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
