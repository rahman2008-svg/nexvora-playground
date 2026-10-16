import React, { useRef, useEffect, useState } from 'react';
import { 
  RotateCw, 
  ExternalLink, 
  Terminal, 
  Maximize2, 
  Minimize2,
  AlertCircle,
  AlertTriangle,
  Play
} from 'lucide-react';
import { ConsoleDrawer } from './ConsoleDrawer';
import { ConsoleMessage } from '../types';

interface PreviewPaneProps {
  previewHtml: string;
  onRefresh: () => void;
  consoleMessages: ConsoleMessage[];
  onClearConsole: () => void;
  onSendConsoleCommand: (cmd: string) => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({
  previewHtml,
  onRefresh,
  consoleMessages,
  onClearConsole,
  onSendConsoleCommand,
  isMaximized,
  onToggleMaximize
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const errorCount = consoleMessages.filter(m => m.type === 'error').length;
  const warnCount = consoleMessages.filter(m => m.type === 'warn').length;

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleOpenInNewWindow = () => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.open();
      win.document.write(previewHtml);
      win.document.close();
    }
  };

  // Pass command to iframe
  const handleSendCommand = (cmd: string) => {
    onSendConsoleCommand(cmd);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ action: 'NEXVORA_EVAL', code: cmd }, '*');
    }
  };

  return (
    <div className={`flex flex-col h-full w-full bg-[#1e2430] border border-slate-800/80 overflow-hidden relative ${
      isMaximized ? 'fixed inset-4 z-50 rounded-xl shadow-2xl border-slate-700' : ''
    }`}>
      {/* Result Header */}
      <div className="h-9 px-3 bg-[#171b24] border-b border-slate-800 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-200 tracking-tight flex items-center gap-1.5">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
              Result
            </span>
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          {/* Console Toggle Button */}
          <button
            onClick={() => setConsoleOpen(!consoleOpen)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition ${
              consoleOpen 
                ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Toggle Console Drawer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Console</span>
            {errorCount > 0 && (
              <span className="ml-0.5 px-1 py-0.2 rounded text-[10px] bg-rose-500 text-white font-mono font-bold">
                {errorCount}
              </span>
            )}
            {errorCount === 0 && warnCount > 0 && (
              <span className="ml-0.5 px-1 py-0.2 rounded text-[10px] bg-amber-500 text-slate-900 font-mono font-bold">
                {warnCount}
              </span>
            )}
          </button>

          {/* Refresh button */}
          <button
            onClick={handleRefreshClick}
            className={`p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition ${isRefreshing ? 'animate-spin text-blue-400' : ''}`}
            title="Reload preview"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Open in new tab */}
          <button
            onClick={handleOpenInNewWindow}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Maximize toggle */}
          {onToggleMaximize && (
            <button
              onClick={onToggleMaximize}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
              title={isMaximized ? "Restore panel" : "Maximize panel"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Sandboxed Iframe Display */}
      <div className="flex-1 w-full bg-white relative overflow-hidden">
        <iframe
          ref={iframeRef}
          srcDoc={previewHtml}
          title="NexVora Result Preview"
          sandbox="allow-scripts allow-modals allow-forms allow-same-origin allow-popups"
          className="w-full h-full border-none block"
        />
      </div>

      {/* Bottom Console Drawer */}
      <ConsoleDrawer
        messages={consoleMessages}
        onClear={onClearConsole}
        isOpen={consoleOpen}
        onToggle={() => setConsoleOpen(!consoleOpen)}
        onSendCommand={handleSendCommand}
      />
    </div>
  );
};
