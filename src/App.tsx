/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { SplitWorkspace } from './components/SplitWorkspace';
import { Footer } from './components/Footer';
import { AboutModal } from './components/AboutModal';
import { ExternalResourcesModal } from './components/ExternalResourcesModal';
import { SettingsModal } from './components/SettingsModal';
import { ShareModal } from './components/ShareModal';
import { BoilerplatesModal } from './components/BoilerplatesModal';
import { FiddleState, LayoutMode, EditorSettings, ConsoleMessage, ExternalResource, BoilerplateTemplate } from './types';
import { BOILERPLATES } from './data/boilerplates';
import { buildPreviewDoc } from './utils/previewBuilder';
import { formatHTML, formatCSS, formatJS } from './utils/codeFormatter';

const INITIAL_FIDDLE: FiddleState = {
  id: 'fiddle-default',
  title: 'NexVora Interactive Playground',
  description: 'Modern web code editor and preview sandbox created by Prince AR Abdur Rahman · NexVora Lab\'s Ofc',
  html: BOILERPLATES[0].html,
  css: BOILERPLATES[0].css,
  javascript: BOILERPLATES[0].javascript,
  externalResources: BOILERPLATES[0].externalResources,
  htmlSettings: { preprocessor: 'html' },
  cssSettings: { preprocessor: 'css', normalize: false },
  jsSettings: { framework: 'vanilla', loadType: 'onLoad' },
  updatedAt: Date.now()
};

const DEFAULT_SETTINGS: EditorSettings = {
  tabSize: 2,
  lineNumbers: true,
  autoRun: true,
  autoRunDelay: 1000,
  clearConsoleOnRun: true,
  wordWrap: false,
  theme: 'dark',
  fontSize: 12
};

export default function App() {
  // Load state from localStorage or URL hash
  const [fiddle, setFiddle] = useState<FiddleState>(() => {
    try {
      // Check URL hash first
      if (window.location.hash && window.location.hash.length > 1) {
        const raw = decodeURIComponent(window.location.hash.slice(1));
        const parsed = JSON.parse(decodeURIComponent(escape(atob(raw))));
        if (parsed.html !== undefined) {
          return {
            ...INITIAL_FIDDLE,
            ...parsed,
            id: 'fiddle-' + Date.now()
          };
        }
      }

      // Check localStorage
      const saved = localStorage.getItem('nexvora_fiddle_current');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse saved fiddle, using default');
    }
    return INITIAL_FIDDLE;
  });

  const [settings, setSettings] = useState<EditorSettings>(() => {
    try {
      const saved = localStorage.getItem('nexvora_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_SETTINGS;
  });

  const [layoutMode, setLayoutMode] = useState<LayoutMode>('classic');
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // Modals
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isBoilerplatesOpen, setIsBoilerplatesOpen] = useState(false);

  const autoRunTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Rebuild preview document
  const compilePreview = useCallback((currentFiddle: FiddleState) => {
    if (settings.clearConsoleOnRun) {
      setConsoleMessages([]);
    }
    const fullHtml = buildPreviewDoc(currentFiddle);
    setPreviewHtml(fullHtml);
  }, [settings.clearConsoleOnRun]);

  // Initial compilation
  useEffect(() => {
    compilePreview(fiddle);
  }, []);

  // Update theme on html root
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('nexvora_settings', JSON.stringify(settings));
  }, [settings]);

  // Listen to postMessage from sandboxed iframe console
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.source === 'NEXVORA_PREVIEW') {
        const { type, content, timestamp } = event.data;
        setConsoleMessages(prev => [
          ...prev,
          {
            id: 'msg-' + Date.now() + '-' + Math.random(),
            type,
            content,
            timestamp: timestamp || new Date().toLocaleTimeString()
          }
        ]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-run on code changes with debounce
  const triggerAutoRun = (updated: FiddleState) => {
    if (settings.autoRun) {
      if (autoRunTimerRef.current) clearTimeout(autoRunTimerRef.current);
      autoRunTimerRef.current = setTimeout(() => {
        compilePreview(updated);
      }, settings.autoRunDelay);
    }
  };

  // Code update handler
  const handleUpdateCode = (field: 'html' | 'css' | 'javascript', value: string) => {
    const updated = {
      ...fiddle,
      [field]: value,
      updatedAt: Date.now()
    };
    setFiddle(updated);
    setIsSaved(false);
    triggerAutoRun(updated);
  };

  // Run manually
  const handleRun = () => {
    if (autoRunTimerRef.current) clearTimeout(autoRunTimerRef.current);
    compilePreview(fiddle);
  };

  // Save to localStorage
  const handleSave = () => {
    try {
      localStorage.setItem('nexvora_fiddle_current', JSON.stringify(fiddle));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch (e) {
      console.error('Failed to save fiddle:', e);
    }
  };

  // Tidy all code
  const handleTidyAll = () => {
    const formattedHtml = formatHTML(fiddle.html, settings.tabSize);
    const formattedCss = formatCSS(fiddle.css, settings.tabSize);
    const formattedJs = formatJS(fiddle.javascript, settings.tabSize);

    const updated = {
      ...fiddle,
      html: formattedHtml,
      css: formattedCss,
      javascript: formattedJs
    };
    setFiddle(updated);
    triggerAutoRun(updated);
  };

  // Tidy single panel
  const handleTidyPanel = (panel: 'html' | 'css' | 'javascript') => {
    let formatted = fiddle[panel];
    if (panel === 'html') formatted = formatHTML(fiddle.html, settings.tabSize);
    if (panel === 'css') formatted = formatCSS(fiddle.css, settings.tabSize);
    if (panel === 'javascript') formatted = formatJS(fiddle.javascript, settings.tabSize);

    const updated = {
      ...fiddle,
      [panel]: formatted
    };
    setFiddle(updated);
    triggerAutoRun(updated);
  };

  // Load a boilerplate template
  const handleSelectBoilerplate = (template: BoilerplateTemplate) => {
    const updated: FiddleState = {
      ...fiddle,
      title: template.name,
      html: template.html,
      css: template.css,
      javascript: template.javascript,
      externalResources: template.externalResources,
      jsSettings: template.jsSettings ? { ...fiddle.jsSettings, ...template.jsSettings } : fiddle.jsSettings,
      updatedAt: Date.now()
    };
    setFiddle(updated);
    compilePreview(updated);
  };

  // External resources handlers
  const handleAddResource = (resource: Omit<ExternalResource, 'id'>) => {
    const updatedResources = [
      ...fiddle.externalResources,
      { ...resource, id: 'res-' + Date.now() }
    ];
    const updated = { ...fiddle, externalResources: updatedResources };
    setFiddle(updated);
    compilePreview(updated);
  };

  const handleRemoveResource = (id: string) => {
    const updatedResources = fiddle.externalResources.filter(r => r.id !== id);
    const updated = { ...fiddle, externalResources: updatedResources };
    setFiddle(updated);
    compilePreview(updated);
  };

  const handleToggleResource = (id: string) => {
    const updatedResources = fiddle.externalResources.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    const updated = { ...fiddle, externalResources: updatedResources };
    setFiddle(updated);
    compilePreview(updated);
  };

  // Keyboard Shortcuts (Ctrl+Enter to Run, Ctrl+S to Save, Esc to close modals)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      } else if (e.key === 'Escape') {
        setIsAboutOpen(false);
        setIsResourcesOpen(false);
        setIsSettingsOpen(false);
        setIsShareOpen(false);
        setIsBoilerplatesOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [fiddle, settings]);

  const handleSendConsoleCommand = (cmd: string) => {
    setConsoleMessages(prev => [
      ...prev,
      {
        id: 'cmd-' + Date.now(),
        type: 'log',
        content: `> ${cmd}`,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  return (
    <div className={`h-screen w-screen flex flex-col overflow-hidden ${
      settings.theme === 'dark' ? 'bg-[#1a1e27] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Top Navbar matching JSFiddle */}
      <Navbar
        onRun={handleRun}
        onSave={handleSave}
        onTidy={handleTidyAll}
        onOpenBoilerplates={() => setIsBoilerplatesOpen(true)}
        onOpenResources={() => setIsResourcesOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        layoutMode={layoutMode}
        onChangeLayout={setLayoutMode}
        settings={settings}
        onToggleTheme={() => setSettings(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))}
        resourceCount={fiddle.externalResources.filter(r => r.enabled).length}
        isSaved={isSaved}
        fiddleTitle={fiddle.title}
        onTitleChange={(title) => setFiddle(f => ({ ...f, title }))}
      />

      {/* Main Quadrants / Split View */}
      <SplitWorkspace
        fiddle={fiddle}
        onUpdateCode={handleUpdateCode}
        onTidyPanel={handleTidyPanel}
        onRefreshPreview={handleRun}
        previewHtml={previewHtml}
        settings={settings}
        layoutMode={layoutMode}
        consoleMessages={consoleMessages}
        onClearConsole={() => setConsoleMessages([])}
        onSendConsoleCommand={handleSendConsoleCommand}
      />

      {/* Footer with Developer & Publisher Info */}
      <Footer onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Modals */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <ExternalResourcesModal
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
        resources={fiddle.externalResources}
        onAddResource={handleAddResource}
        onRemoveResource={handleRemoveResource}
        onToggleResource={handleToggleResource}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newVals) => setSettings(s => ({ ...s, ...newVals }))}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        fiddle={fiddle}
      />

      <BoilerplatesModal
        isOpen={isBoilerplatesOpen}
        onClose={() => setIsBoilerplatesOpen(false)}
        onSelectBoilerplate={handleSelectBoilerplate}
      />
    </div>
  );
}
