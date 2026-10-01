import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, CornerDownLeft } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  placeholder?: string;
  onSelectSuggestion?: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  placeholder = 'Ask me anything about Machine Learning…',
  onSelectSuggestion
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on input
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const suggestions = [
    'Explain Supervised vs Unsupervised',
    'What is Overfitting?',
    'Explain Random Forest',
    'How does Gradient Descent work?',
    'What is a Confusion Matrix?'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 pb-4">
      {/* Quick Prompt Pills */}
      {onSelectSuggestion && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-1 scrollbar-none no-scrollbar text-xs">
          <span className="text-slate-400 flex items-center gap-1 text-[11px] font-medium shrink-0 mr-1">
            <Sparkles size={12} className="text-indigo-500" />
            Quick ML:
          </span>
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSuggestion(s)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-100/90 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 border border-slate-200/80 text-slate-600 transition-colors text-[11px]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Main Input Box */}
      <form 
        onSubmit={handleSubmit}
        className="relative bg-white border border-slate-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 rounded-2xl shadow-sm transition-all p-2 sm:p-2.5"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={isLoading}
          maxLength={1500}
          className="w-full resize-none bg-transparent outline-none text-slate-800 text-[15px] placeholder:text-slate-400 px-2 pt-1 max-h-40 min-h-[44px]"
        />

        <div className="flex items-center justify-between pt-1 px-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-[11px] hidden sm:inline text-slate-400">
              Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono text-slate-600">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono text-slate-600">Shift+Enter</kbd> for new line
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono">
              {input.length}/1500
            </span>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                !input.trim() || isLoading
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
              }`}
              title="Send message"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </form>

      <div className="text-center mt-2 text-[11px] text-slate-400">
        ML Assistant is strictly restricted to the Machine Learning domain.
      </div>
    </div>
  );
};
