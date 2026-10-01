import React, { useState } from 'react';
import { Message } from '../types.ts';
import { MarkdownRenderer } from './MarkdownRenderer.tsx';
import { ChatbotAvatar } from './ChatbotAvatar.tsx';
import { 
  User, 
  Copy, 
  Check, 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown, 
  ShieldAlert, 
  Sparkles,
  Clock,
  Tag
} from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onRegenerate?: () => void;
  onFeedback?: (messageId: string, feedback: 'like' | 'dislike') => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onRegenerate,
  onFeedback,
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  if (isUser) {
    return (
      <div className="flex justify-end my-4 px-2 sm:px-4">
        <div className="flex items-start max-w-[85%] sm:max-w-[75%] gap-2.5 flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm border border-slate-700">
            <User size={16} />
          </div>
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl rounded-tr-none shadow-sm">
            <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{message.content}</p>
            <div className="text-[11px] text-slate-300 mt-1.5 text-right font-mono">
              {formattedTime}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Assistant Message
  return (
    <div className="flex justify-start my-4 px-2 sm:px-4">
      <div className="flex items-start max-w-[92%] sm:max-w-[85%] gap-3">
        {/* Consistent AI Chatbot Avatar */}
        <ChatbotAvatar 
          size="md" 
          isOutOfScope={message.isOutOfScope}
          showStatus={!message.isOutOfScope}
        />

        {/* Bubble */}
        <div className={`flex-1 bg-white border rounded-2xl rounded-tl-none p-4 sm:p-5 shadow-sm transition-all ${
          message.isOutOfScope ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200'
        }`}>
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-3 border-b border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Sparkles size={13} className="text-indigo-600" />
                ML Assistant
              </span>
              
              {/* Domain Tag */}
              {message.isOutOfScope ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800 border border-amber-200">
                  <ShieldAlert size={11} />
                  Out of Scope Refusal
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Tag size={10} />
                  {message.category || 'Machine Learning'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
              {message.executionTimeMs && (
                <span className="inline-flex items-center gap-1">
                  <Clock size={11} />
                  {message.executionTimeMs}ms
                </span>
              )}
              <span>{formattedTime}</span>
            </div>
          </div>

          {/* Message Content */}
          <div className="text-slate-800">
            <MarkdownRenderer content={message.content} />
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
                title="Copy response"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span className="text-[12px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
                  title="Regenerate answer"
                >
                  <RotateCcw size={13} />
                  <span className="text-[12px]">Regenerate</span>
                </button>
              )}
            </div>

            {/* Like/Dislike */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onFeedback?.(message.id, 'like')}
                className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors ${
                  message.feedback === 'like' ? 'text-indigo-600 bg-indigo-50 font-medium' : 'text-slate-400'
                }`}
                title="Helpful ML answer"
              >
                <ThumbsUp size={13} />
              </button>
              <button
                onClick={() => onFeedback?.(message.id, 'dislike')}
                className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors ${
                  message.feedback === 'dislike' ? 'text-rose-600 bg-rose-50 font-medium' : 'text-slate-400'
                }`}
                title="Not helpful"
              >
                <ThumbsDown size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
