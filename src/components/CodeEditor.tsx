import React, { useRef, useEffect, useState } from 'react';
import { 
  ChevronDown, 
  Wand2, 
  RotateCcw, 
  Maximize2, 
  Minimize2, 
  Settings2,
  FileCode2,
  Copy,
  Check
} from 'lucide-react';
import { EditorSettings } from '../types';

interface CodeEditorProps {
  title: string;
  language: 'html' | 'css' | 'javascript';
  code: string;
  onChange: (value: string) => void;
  onTidy?: () => void;
  settings: EditorSettings;
  preprocessor?: string;
  onPreprocessorChange?: (val: string) => void;
  extraOptions?: React.ReactNode;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  title,
  language,
  code,
  onChange,
  onTidy,
  settings,
  preprocessor,
  onPreprocessorChange,
  extraOptions,
  isMaximized,
  onToggleMaximize
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const lines = code.split('\n');
  const lineCount = Math.max(lines.length, 1);

  // Sync scroll between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Keyboard handler for Tab, Shift+Tab, and brackets
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;

    // Handle Tab
    if (e.key === 'Tab') {
      e.preventDefault();
      const tab = ' '.repeat(settings.tabSize);

      if (e.shiftKey) {
        // Outdent line
        const before = value.substring(0, selectionStart);
        const lineStart = before.lastIndexOf('\n') + 1;
        if (value.substring(lineStart, lineStart + settings.tabSize) === tab) {
          const newValue = value.substring(0, lineStart) + value.substring(lineStart + settings.tabSize);
          onChange(newValue);
          setTimeout(() => {
            textarea.selectionStart = Math.max(lineStart, selectionStart - settings.tabSize);
            textarea.selectionEnd = Math.max(lineStart, selectionEnd - settings.tabSize);
          }, 0);
        }
      } else {
        // Indent
        const newValue = value.substring(0, selectionStart) + tab + value.substring(selectionEnd);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + settings.tabSize;
        }, 0);
      }
    }

    // Auto-close brackets and quotes
    const pairs: Record<string, string> = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'",
      '`': '`'
    };

    if (pairs[e.key] && selectionStart === selectionEnd) {
      const char = e.key;
      const closing = pairs[char];
      e.preventDefault();
      const newValue = value.substring(0, selectionStart) + char + closing + value.substring(selectionEnd);
      onChange(newValue);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getLanguageColor = () => {
    switch (language) {
      case 'html': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'css': return 'text-sky-400 border-sky-500/30 bg-sky-500/10';
      case 'javascript': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
    }
  };

  return (
    <div className={`flex flex-col h-full w-full dark:bg-[#1e2430] bg-white border dark:border-slate-800/80 border-slate-200 overflow-hidden select-text ${
      isMaximized ? 'fixed inset-4 z-50 rounded-xl shadow-2xl dark:border-slate-700 border-slate-300' : ''
    }`}>
      {/* Editor Header */}
      <div className="h-9 px-3 dark:bg-[#171b24] bg-slate-100/90 border-b dark:border-slate-800 border-slate-200 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <span className="font-bold dark:text-slate-200 text-slate-700 tracking-tight flex items-center gap-1.5">
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase ${getLanguageColor()}`}>
              {title}
            </span>
          </span>

          {preprocessor && (
            <span className="text-[11px] dark:text-slate-400 text-slate-500 font-mono">
              ({preprocessor})
            </span>
          )}
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center gap-1">
          {onTidy && (
            <button
              onClick={onTidy}
              className="p-1.5 dark:text-slate-400 text-slate-500 hover:dark:text-white hover:text-slate-900 rounded hover:dark:bg-slate-800 hover:bg-slate-200 transition"
              title={`Tidy ${title} code`}
            >
              <Wand2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 dark:text-slate-400 text-slate-500 hover:dark:text-white hover:text-slate-900 rounded hover:dark:bg-slate-800 hover:bg-slate-200 transition"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {extraOptions && (
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="p-1.5 dark:text-slate-400 text-slate-500 hover:dark:text-white hover:text-slate-900 rounded hover:dark:bg-slate-800 hover:bg-slate-200 transition"
                title="Editor options"
              >
                <Settings2 className="w-3.5 h-3.5" />
              </button>
              {showOptions && (
                <div 
                  className="absolute right-0 top-8 z-30 w-56 dark:bg-[#1a202c] bg-white border dark:border-slate-700 border-slate-200 rounded-lg shadow-xl p-3 text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="text-[11px] font-semibold dark:text-slate-400 text-slate-500 uppercase tracking-wider mb-2">
                    {title} Settings
                  </div>
                  {extraOptions}
                </div>
              )}
            </div>
          )}

          {onToggleMaximize && (
            <button
              onClick={onToggleMaximize}
              className="p-1.5 dark:text-slate-400 text-slate-500 hover:dark:text-white hover:text-slate-900 rounded hover:dark:bg-slate-800 hover:bg-slate-200 transition"
              title={isMaximized ? "Restore panel" : "Maximize panel"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Editor Main Surface with Line Numbers */}
      <div className="relative flex-1 flex overflow-hidden dark:bg-[#161a23] bg-white">
        {/* Line Numbers Gutter */}
        {settings.lineNumbers && (
          <div
            ref={lineNumbersRef}
            className="w-11 py-2 dark:bg-[#13161d] bg-slate-50/80 border-r dark:border-slate-800/80 border-slate-200 font-mono text-[12px] dark:text-slate-600 text-slate-400 select-none text-right pr-2 overflow-hidden shrink-0"
            style={{ lineHeight: '20px' }}
          >
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i} className="tabular-nums">
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Code Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          wrap={settings.wordWrap ? 'on' : 'off'}
          className="flex-1 w-full h-full p-2 bg-transparent dark:text-slate-200 text-slate-800 font-mono text-[12px] leading-[20px] outline-none resize-none border-none selection:bg-blue-600/30 selection:text-white"
          style={{
            tabSize: settings.tabSize,
            fontSize: `${settings.fontSize}px`,
            lineHeight: `${settings.fontSize * 1.6}px`
          }}
          placeholder={`Enter ${title} code here...`}
        />
      </div>

      {/* Footer Status Bar */}
      <div className="h-6 px-3 dark:bg-[#13161e] bg-slate-50 border-t dark:border-slate-800/80 border-slate-200 flex items-center justify-between text-[11px] dark:text-slate-500 text-slate-400 font-mono select-none">
        <div className="flex items-center gap-3">
          <span>{lines.length} lines</span>
          <span>{code.length} chars</span>
        </div>
        <div className="flex items-center gap-2">
          <span>UTF-8</span>
          <span>Tab: {settings.tabSize}</span>
        </div>
      </div>
    </div>
  );
};
