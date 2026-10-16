import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CodeEditor } from './CodeEditor';
import { PreviewPane } from './PreviewPane';
import { FiddleState, LayoutMode, EditorSettings, ConsoleMessage } from '../types';

interface SplitWorkspaceProps {
  fiddle: FiddleState;
  onUpdateCode: (field: 'html' | 'css' | 'javascript', value: string) => void;
  onTidyPanel: (panel: 'html' | 'css' | 'javascript') => void;
  onRefreshPreview: () => void;
  previewHtml: string;
  settings: EditorSettings;
  layoutMode: LayoutMode;
  consoleMessages: ConsoleMessage[];
  onClearConsole: () => void;
  onSendConsoleCommand: (cmd: string) => void;
}

export const SplitWorkspace: React.FC<SplitWorkspaceProps> = ({
  fiddle,
  onUpdateCode,
  onTidyPanel,
  onRefreshPreview,
  previewHtml,
  settings,
  layoutMode,
  consoleMessages,
  onClearConsole,
  onSendConsoleCommand
}) => {
  // Mobile / Tab mode active tab
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript' | 'result'>('result');
  
  // Resizable split percentages
  const [splitX, setSplitX] = useState(50); // Left vs Right width %
  const [splitYLeft, setSplitYLeft] = useState(50); // HTML vs CSS height %
  const [splitYRight, setSplitYRight] = useState(50); // JS vs Result height %
  
  const [maximizedPanel, setMaximizedPanel] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingX = useRef(false);
  const isDraggingYLeft = useRef(false);
  const isDraggingYRight = useRef(false);

  // Drag listeners
  const handleMouseDownX = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingX.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const handleMouseDownYLeft = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingYLeft.current = true;
    document.body.style.cursor = 'row-resize';
  };

  const handleMouseDownYRight = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingYRight.current = true;
    document.body.style.cursor = 'row-resize';
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    if (isDraggingX.current) {
      const newSplitX = ((e.clientX - rect.left) / rect.width) * 100;
      if (newSplitX >= 20 && newSplitX <= 80) {
        setSplitX(newSplitX);
      }
    }

    if (isDraggingYLeft.current) {
      const newSplitY = ((e.clientY - rect.top) / rect.height) * 100;
      if (newSplitY >= 15 && newSplitY <= 85) {
        setSplitYLeft(newSplitY);
      }
    }

    if (isDraggingYRight.current) {
      const newSplitY = ((e.clientY - rect.top) / rect.height) * 100;
      if (newSplitY >= 15 && newSplitY <= 85) {
        setSplitYRight(newSplitY);
      }
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isDraggingX.current || isDraggingYLeft.current || isDraggingYRight.current) {
      isDraggingX.current = false;
      isDraggingYLeft.current = false;
      isDraggingYRight.current = false;
      document.body.style.cursor = '';
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Touch handlers for mobile/tablet splitters
  const handleTouchStart = (type: 'x' | 'yLeft' | 'yRight') => (e: React.TouchEvent) => {
    if (type === 'x') isDraggingX.current = true;
    if (type === 'yLeft') isDraggingYLeft.current = true;
    if (type === 'yRight') isDraggingYRight.current = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();

    if (isDraggingX.current) {
      const newSplitX = ((touch.clientX - rect.left) / rect.width) * 100;
      if (newSplitX >= 20 && newSplitX <= 80) setSplitX(newSplitX);
    }
    if (isDraggingYLeft.current) {
      const newSplitY = ((touch.clientY - rect.top) / rect.height) * 100;
      if (newSplitY >= 15 && newSplitY <= 85) setSplitYLeft(newSplitY);
    }
    if (isDraggingYRight.current) {
      const newSplitY = ((touch.clientY - rect.top) / rect.height) * 100;
      if (newSplitY >= 15 && newSplitY <= 85) setSplitYRight(newSplitY);
    }
  };

  useEffect(() => {
    const onTouchEnd = () => {
      isDraggingX.current = false;
      isDraggingYLeft.current = false;
      isDraggingYRight.current = false;
    };
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const toggleMaximize = (panelId: string) => {
    setMaximizedPanel(prev => prev === panelId ? null : panelId);
  };

  // Mobile / Tab rendering
  if (layoutMode === 'tabs') {
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#161a23]">
        {/* Mobile Tab bar */}
        <div className="h-10 px-2 bg-[#171b24] border-b border-slate-800 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-1 p-1 bg-[#121620] rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1 rounded font-medium transition ${
                activeTab === 'html' ? 'bg-amber-500/20 text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HTML
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1 rounded font-medium transition ${
                activeTab === 'css' ? 'bg-sky-500/20 text-sky-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CSS
            </button>
            <button
              onClick={() => setActiveTab('javascript')}
              className={`px-3 py-1 rounded font-medium transition ${
                activeTab === 'javascript' ? 'bg-yellow-500/20 text-yellow-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              JavaScript
            </button>
            <button
              onClick={() => setActiveTab('result')}
              className={`px-3 py-1 rounded font-medium transition ${
                activeTab === 'result' ? 'bg-emerald-500/20 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Result
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'html' && (
            <CodeEditor
              title="HTML"
              language="html"
              code={fiddle.html}
              onChange={(val) => onUpdateCode('html', val)}
              onTidy={() => onTidyPanel('html')}
              settings={settings}
            />
          )}
          {activeTab === 'css' && (
            <CodeEditor
              title="CSS"
              language="css"
              code={fiddle.css}
              onChange={(val) => onUpdateCode('css', val)}
              onTidy={() => onTidyPanel('css')}
              settings={settings}
            />
          )}
          {activeTab === 'javascript' && (
            <CodeEditor
              title="JavaScript"
              language="javascript"
              code={fiddle.javascript}
              onChange={(val) => onUpdateCode('javascript', val)}
              onTidy={() => onTidyPanel('javascript')}
              settings={settings}
            />
          )}
          {activeTab === 'result' && (
            <PreviewPane
              previewHtml={previewHtml}
              onRefresh={onRefreshPreview}
              consoleMessages={consoleMessages}
              onClearConsole={onClearConsole}
              onSendConsoleCommand={onSendConsoleCommand}
            />
          )}
        </div>
      </div>
    );
  }

  // Columns Layout (3 editor columns + 1 result)
  if (layoutMode === 'columns') {
    return (
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 h-full overflow-hidden bg-[#161a23] gap-1 p-1">
        <CodeEditor
          title="HTML"
          language="html"
          code={fiddle.html}
          onChange={(val) => onUpdateCode('html', val)}
          onTidy={() => onTidyPanel('html')}
          settings={settings}
          isMaximized={maximizedPanel === 'html'}
          onToggleMaximize={() => toggleMaximize('html')}
        />
        <CodeEditor
          title="CSS"
          language="css"
          code={fiddle.css}
          onChange={(val) => onUpdateCode('css', val)}
          onTidy={() => onTidyPanel('css')}
          settings={settings}
          isMaximized={maximizedPanel === 'css'}
          onToggleMaximize={() => toggleMaximize('css')}
        />
        <CodeEditor
          title="JavaScript"
          language="javascript"
          code={fiddle.javascript}
          onChange={(val) => onUpdateCode('javascript', val)}
          onTidy={() => onTidyPanel('javascript')}
          settings={settings}
          isMaximized={maximizedPanel === 'javascript'}
          onToggleMaximize={() => toggleMaximize('javascript')}
        />
        <PreviewPane
          previewHtml={previewHtml}
          onRefresh={onRefreshPreview}
          consoleMessages={consoleMessages}
          onClearConsole={onClearConsole}
          onSendConsoleCommand={onSendConsoleCommand}
          isMaximized={maximizedPanel === 'result'}
          onToggleMaximize={() => toggleMaximize('result')}
        />
      </div>
    );
  }

  // Rows Layout (horizontal stacked)
  if (layoutMode === 'rows') {
    return (
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-full overflow-hidden bg-[#161a23] gap-1 p-1">
        <div className="flex flex-col h-full gap-1">
          <div className="h-1/3">
            <CodeEditor
              title="HTML"
              language="html"
              code={fiddle.html}
              onChange={(val) => onUpdateCode('html', val)}
              onTidy={() => onTidyPanel('html')}
              settings={settings}
            />
          </div>
          <div className="h-1/3">
            <CodeEditor
              title="CSS"
              language="css"
              code={fiddle.css}
              onChange={(val) => onUpdateCode('css', val)}
              onTidy={() => onTidyPanel('css')}
              settings={settings}
            />
          </div>
          <div className="h-1/3">
            <CodeEditor
              title="JavaScript"
              language="javascript"
              code={fiddle.javascript}
              onChange={(val) => onUpdateCode('javascript', val)}
              onTidy={() => onTidyPanel('javascript')}
              settings={settings}
            />
          </div>
        </div>
        <div className="h-full">
          <PreviewPane
            previewHtml={previewHtml}
            onRefresh={onRefreshPreview}
            consoleMessages={consoleMessages}
            onClearConsole={onClearConsole}
            onSendConsoleCommand={onSendConsoleCommand}
            isMaximized={maximizedPanel === 'result'}
            onToggleMaximize={() => toggleMaximize('result')}
          />
        </div>
      </div>
    );
  }

  // Default: Classic 2x2 Grid with Draggable Resizer Gutters
  return (
    <div 
      ref={containerRef}
      className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-[#13161f] relative select-none"
    >
      {/* Left Column (HTML on Top, CSS on Bottom) */}
      <div 
        className="flex flex-col h-1/2 md:h-full relative overflow-hidden"
        style={{ width: `${splitX}%` }}
      >
        {/* Top-Left: HTML */}
        <div 
          className="w-full relative overflow-hidden p-0.5"
          style={{ height: `${splitYLeft}%` }}
        >
          <CodeEditor
            title="HTML"
            language="html"
            code={fiddle.html}
            onChange={(val) => onUpdateCode('html', val)}
            onTidy={() => onTidyPanel('html')}
            settings={settings}
            isMaximized={maximizedPanel === 'html'}
            onToggleMaximize={() => toggleMaximize('html')}
          />
        </div>

        {/* Horizontal Gutter between HTML & CSS */}
        <div
          onMouseDown={handleMouseDownYLeft}
          onTouchStart={handleTouchStart('yLeft')}
          className="h-2 w-full bg-[#161a23] hover:bg-blue-600 active:bg-blue-600 transition-colors cursor-row-resize flex items-center justify-center shrink-0 z-20 group"
        >
          <div className="w-8 h-0.5 bg-slate-600 rounded-full group-hover:bg-white" />
        </div>

        {/* Bottom-Left: CSS */}
        <div 
          className="w-full relative overflow-hidden p-0.5"
          style={{ height: `${100 - splitYLeft}%` }}
        >
          <CodeEditor
            title="CSS"
            language="css"
            code={fiddle.css}
            onChange={(val) => onUpdateCode('css', val)}
            onTidy={() => onTidyPanel('css')}
            settings={settings}
            isMaximized={maximizedPanel === 'css'}
            onToggleMaximize={() => toggleMaximize('css')}
          />
        </div>
      </div>

      {/* Vertical Gutter between Left and Right columns */}
      <div
        onMouseDown={handleMouseDownX}
        onTouchStart={handleTouchStart('x')}
        className="hidden md:flex w-2 h-full bg-[#161a23] hover:bg-blue-600 active:bg-blue-600 transition-colors cursor-col-resize items-center justify-center shrink-0 z-20 group"
      >
        <div className="h-8 w-0.5 bg-slate-600 rounded-full group-hover:bg-white" />
      </div>

      {/* Right Column (JavaScript on Top, Result on Bottom) */}
      <div 
        className="flex flex-col h-1/2 md:h-full relative overflow-hidden"
        style={{ width: `${100 - splitX}%` }}
      >
        {/* Top-Right: JavaScript */}
        <div 
          className="w-full relative overflow-hidden p-0.5"
          style={{ height: `${splitYRight}%` }}
        >
          <CodeEditor
            title="JavaScript"
            language="javascript"
            code={fiddle.javascript}
            onChange={(val) => onUpdateCode('javascript', val)}
            onTidy={() => onTidyPanel('javascript')}
            settings={settings}
            isMaximized={maximizedPanel === 'javascript'}
            onToggleMaximize={() => toggleMaximize('javascript')}
          />
        </div>

        {/* Horizontal Gutter between JS & Result */}
        <div
          onMouseDown={handleMouseDownYRight}
          onTouchStart={handleTouchStart('yRight')}
          className="h-2 w-full bg-[#161a23] hover:bg-blue-600 active:bg-blue-600 transition-colors cursor-row-resize flex items-center justify-center shrink-0 z-20 group"
        >
          <div className="w-8 h-0.5 bg-slate-600 rounded-full group-hover:bg-white" />
        </div>

        {/* Bottom-Right: Result */}
        <div 
          className="w-full relative overflow-hidden p-0.5"
          style={{ height: `${100 - splitYRight}%` }}
        >
          <PreviewPane
            previewHtml={previewHtml}
            onRefresh={onRefreshPreview}
            consoleMessages={consoleMessages}
            onClearConsole={onClearConsole}
            onSendConsoleCommand={onSendConsoleCommand}
            isMaximized={maximizedPanel === 'result'}
            onToggleMaximize={() => toggleMaximize('result')}
          />
        </div>
      </div>
    </div>
  );
};
