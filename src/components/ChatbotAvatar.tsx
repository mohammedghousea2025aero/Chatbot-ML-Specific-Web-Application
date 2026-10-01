import React, { useState } from 'react';
import { CHATBOT_AVATAR_IMAGE } from '../assets/branding.ts';
import { Bot, Sparkles } from 'lucide-react';

interface ChatbotAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
  isOutOfScope?: boolean;
}

export const ChatbotAvatar: React.FC<ChatbotAvatarProps> = ({
  size = 'md',
  showStatus = false,
  className = '',
  isOutOfScope = false
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };

  const iconSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}>
      {/* Glow aura */}
      <div className={`absolute inset-0 rounded-full blur-[2px] opacity-70 ${
        isOutOfScope ? 'bg-amber-400' : 'bg-indigo-400'
      }`} />

      {/* Main Avatar Circle */}
      <div className={`relative w-full h-full rounded-full overflow-hidden border shadow-sm flex items-center justify-center ${
        isOutOfScope 
          ? 'bg-amber-500 border-amber-300 text-white' 
          : 'bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 border-indigo-200/50 text-white'
      }`}>
        {!imageError && !isOutOfScope ? (
          <img
            src={CHATBOT_AVATAR_IMAGE}
            alt="ML Assistant AI"
            className="w-full h-full object-cover rounded-full"
            onError={() => setImageError(true)}
          />
        ) : (
          <Bot size={iconSizes[size]} className="text-white drop-shadow-xs" />
        )}
      </div>

      {/* Online / Active Pulse Dot */}
      {showStatus && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white" />
        </span>
      )}
    </div>
  );
};
