import React, { useState } from 'react';
import { HERO_CHATBOT_IMAGE } from '../assets/branding.ts';
import { 
  Brain, 
  Cpu, 
  Sparkles, 
  Activity, 
  Network,
  Zap,
  TrendingDown,
  CheckCircle2
} from 'lucide-react';

interface ChatbotVisualProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ChatbotVisual: React.FC<ChatbotVisualProps> = ({ 
  size = 'lg',
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  const containerSizes = {
    sm: 'w-48 h-48 sm:w-56 sm:h-56',
    md: 'w-64 h-64 sm:w-72 sm:h-72',
    lg: 'w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96'
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${containerSizes[size]} ${className}`}>
      
      {/* Background Neural Lattice / Orbit Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Soft Ambient Radial Glow */}
        <div className="w-4/5 h-4/5 rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-cyan-400/20 blur-2xl animate-neural-pulse" />
        
        {/* SVG Neural Connections */}
        <svg className="absolute w-full h-full text-indigo-200/50" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: '60s' }} />
          <circle cx="200" cy="200" r="175" stroke="currentColor" strokeWidth="0.8" strokeDasharray="8 6" className="animate-spin" style={{ animationDuration: '90s', animationDirection: 'reverse' }} />
          
          {/* Neural Node Points */}
          <circle cx="60" cy="180" r="4" fill="#6366f1" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="340" cy="160" r="4" fill="#a855f7" className="animate-ping" style={{ animationDuration: '4s' }} />
          <circle cx="120" cy="70" r="3.5" fill="#38bdf8" />
          <circle cx="290" cy="320" r="3.5" fill="#818cf8" />
          <line x1="60" y1="180" x2="120" y2="70" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="340" y1="160" x2="290" y2="320" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.4" />
        </svg>
      </div>

      {/* Floating 3D Character Card */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-2 animate-chatbot-float">
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xs border border-indigo-100 shadow-xl animate-soft-glow transition-transform duration-300 hover:scale-[1.02]">
          
          {!imageError ? (
            <img
              src={HERO_CHATBOT_IMAGE}
              alt="ML Assistant 3D AI Chatbot"
              className="w-full h-full object-cover object-center"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Fallback Vector Illustration */
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-50 via-white to-purple-50 p-6 text-center">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg mb-3">
                <Brain size={48} />
              </div>
              <span className="font-bold text-slate-800 text-lg">ML Assistant</span>
              <span className="text-xs text-indigo-600 font-semibold mt-1">Domain-Specific AI</span>
            </div>
          )}

          {/* Inner Vignette Shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Floating Pill on image: Live AI Online */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs border border-slate-200/80 flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>AI Online</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
              <Cpu size={14} className="text-indigo-600" />
              <span>Neural Engine</span>
            </div>
            <span className="text-[11px] font-mono text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              ML Spec: 100%
            </span>
          </div>
        </div>

        {/* Floating Holographic Satellite Badge: Top Right */}
        <div className="hidden sm:flex absolute -top-2 -right-3 bg-white/95 backdrop-blur-md border border-indigo-100 rounded-2xl p-2.5 shadow-md items-center gap-2 text-xs text-slate-800 animate-chatbot-float" style={{ animationDelay: '1.2s' }}>
          <div className="w-7 h-7 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
            <Network size={15} />
          </div>
          <div className="pr-1">
            <div className="text-[10px] text-slate-400 font-medium">Model Architecture</div>
            <div className="font-bold text-purple-700 text-xs flex items-center gap-1">
              <span>Deep Neural Net</span>
            </div>
          </div>
        </div>

        {/* Floating Holographic Satellite Badge: Bottom Left */}
        <div className="hidden sm:flex absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-md border border-indigo-100 rounded-2xl p-2.5 shadow-md items-center gap-2 text-xs text-slate-800 animate-chatbot-float" style={{ animationDelay: '2.4s' }}>
          <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <TrendingDown size={15} />
          </div>
          <div className="pr-1">
            <div className="text-[10px] text-slate-400 font-medium">Training Loss</div>
            <div className="font-bold text-emerald-700 text-xs font-mono">
              0.012 (Converged)
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
