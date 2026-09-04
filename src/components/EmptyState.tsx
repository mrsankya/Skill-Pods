import React from 'react';
import { LucideIcon, Inbox, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl bg-[#13111e]/60 border border-purple-500/20 backdrop-blur-md ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-4 text-purple-300 shadow-[0_0_20px_rgba(168,127,251,0.2)]">
        <Icon className="w-8 h-8" />
      </div>
      
      <h3 className="font-geist text-lg sm:text-xl font-bold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-xs sm:text-sm text-[#a19ba9] max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="glow-pill-primary text-[#3c0091] font-bold text-xs font-mono uppercase tracking-widest px-6 py-2.5 rounded-full flex items-center gap-2 cursor-pointer hover:opacity-95 transition-all shadow-lg"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
