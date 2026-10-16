import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle2,
  Send,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { ConsoleMessage } from '../types';

interface ConsoleDrawerProps {
  messages: ConsoleMessage[];
  onClear: () => void;
  isOpen: boolean;
  onToggle: () => void;
  onSendCommand: (command: string) => void;
}

export const ConsoleDrawer: React.FC<ConsoleDrawerProps> = ({
  messages,
  onClear,
  isOpen,
  onToggle,
  onSendCommand
}) => {
  const [filter, setFilter] = useState<'all' | 'log' | 'info' | 'warn' | 'error'>('all');
  const [commandInput, setCommandInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const errorCount = messages.filter(m => m.type === 'error').length;
  const warnCount = messages.filter(m => m.type === 'warn').length;
  const infoCount = messages.filter(m => m.type === 'info').length;

  const filteredMessages = messages.filter(m => {
    if (filter === 'all') return true;
    return m.type === filter;
  });

  const handleSubmitCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    onSendCommand(commandInput.trim());
    setHistory(prev => [...prev, commandInput.trim()]);
    setHistoryIndex(-1);
    setCommandInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setCommandInput(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setCommandInput('');
      } else {
        setHistoryIndex(nextIndex);
        setCommandInput(history[nextIndex]);
      }
    }
  };

  return (
    <div className={`flex flex-col border-t border-slate-700/80 bg-[#161a23] transition-all duration-200 z-10 ${
      isOpen ? 'h-52 md:h-64' : 'h-8'
    }`}>
      {/* Console Tab Bar */}
      <div className="h-8 px-3 bg-[#131720] border-b border-slate-800 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggle}
            className="flex items-center gap-1.5 font-semibold text-slate-300 hover:text-white transition"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Console</span>
            {isOpen ? <ChevronDown className="w-3 h-3 text-slate-400" /> : <ChevronUp className="w-3 h-3 text-slate-400" />}
          </button>

          {/* Counts */}
          {errorCount > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
              <AlertCircle className="w-3 h-3" />
              {errorCount}
            </span>
          )}
          {warnCount > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              <AlertTriangle className="w-3 h-3" />
              {warnCount}
            </span>
          )}
        </div>

        {isOpen && (
          <div className="flex items-center gap-2">
            {/* Filter buttons */}
            <div className="flex items-center bg-[#1a202c] rounded p-0.5 border border-slate-800 text-[11px]">
              <button
                onClick={() => setFilter('all')}
                className={`px-2 py-0.5 rounded transition ${filter === 'all' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
              >
                All ({messages.length})
              </button>
              <button
                onClick={() => setFilter('error')}
                className={`px-2 py-0.5 rounded transition ${filter === 'error' ? 'bg-rose-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Errors ({errorCount})
              </button>
              <button
                onClick={() => setFilter('warn')}
                className={`px-2 py-0.5 rounded transition ${filter === 'warn' ? 'bg-amber-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Warnings ({warnCount})
              </button>
              <button
                onClick={() => setFilter('log')}
                className={`px-2 py-0.5 rounded transition ${filter === 'log' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Logs
              </button>
            </div>

            {/* Clear button */}
            <button
              onClick={onClear}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
              title="Clear console"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Console Body */}
      {isOpen && (
        <div className="flex-1 flex flex-col min-h-0 bg-[#0e121a]">
          {/* Messages list */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-1">
            {filteredMessages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500 italic text-[11px]">
                Console is empty. Run your code or evaluate expressions below.
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-2 px-2 py-1 rounded border ${
                    msg.type === 'error' 
                      ? 'bg-rose-950/20 text-rose-300 border-rose-900/40' 
                      : msg.type === 'warn'
                      ? 'bg-amber-950/20 text-amber-300 border-amber-900/40'
                      : msg.type === 'info'
                      ? 'bg-blue-950/20 text-blue-300 border-blue-900/40'
                      : 'bg-transparent text-slate-300 border-transparent hover:bg-slate-800/30'
                  }`}
                >
                  <span className="shrink-0 mt-0.5 opacity-70">
                    {msg.type === 'error' && <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
                    {msg.type === 'warn' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                    {msg.type === 'info' && <Info className="w-3.5 h-3.5 text-blue-400" />}
                    {msg.type === 'log' && <ChevronUp className="w-3.5 h-3.5 text-slate-500 rotate-90" />}
                  </span>
                  <div className="flex-1 whitespace-pre-wrap break-words leading-relaxed">
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0 select-none">
                    {msg.timestamp}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Console Input Bar */}
          <form 
            onSubmit={handleSubmitCommand}
            className="flex items-center gap-2 px-3 py-1.5 border-t border-slate-800/80 bg-[#121620]"
          >
            <span className="text-blue-400 font-mono text-xs select-none">&gt;</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type JavaScript command to execute in preview sandbox..."
              className="flex-1 bg-transparent text-xs font-mono text-slate-200 outline-none placeholder:text-slate-600"
            />
            <button
              type="submit"
              disabled={!commandInput.trim()}
              className="p-1 text-slate-400 hover:text-blue-400 disabled:opacity-40 transition"
              title="Evaluate command"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
