import React, { useState } from 'react';
import {
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  X,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Maximize2,
  Code2,
  UserCheck
} from 'lucide-react';

interface DeveloperPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioUrl?: string;
}

export const DeveloperPortfolioModal: React.FC<DeveloperPortfolioModalProps> = ({
  isOpen,
  onClose,
  portfolioUrl = 'https://sanket-portfolio-211.pages.dev/'
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(1);

  if (!isOpen) return null;

  const handleRefresh = () => {
    setIframeLoading(true);
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-[#0e0c1a] border border-purple-500/30 rounded-3xl w-full max-w-7xl h-[92vh] text-white shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Control Bar */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-950/70 via-[#18132b] to-[#0e0c1a] flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* Creator Badge & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-400/30 flex items-center justify-center text-purple-400 shadow-inner">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Developer Portfolio Showcase
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>Sanket Bhende • Lead Platform Architect</span>
                </span>
              </div>
              <p className="text-2xs sm:text-xs text-slate-400">
                Interactive live preview of the developer's projects, technical skills, and achievements.
              </p>
            </div>
          </div>

          {/* Viewport Device Switcher & Action Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Viewport Switcher */}
            <div className="hidden sm:flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-bold">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  deviceView === 'desktop' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>

              <button
                onClick={() => setDeviceView('tablet')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  deviceView === 'tablet' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>

              <button
                onClick={() => setDeviceView('mobile')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  deviceView === 'mobile' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>

            {/* Refresh Frame */}
            <button
              onClick={handleRefresh}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Reload Frame"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Open in New Tab */}
            <a
              href={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-900/40 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe Container */}
        <div className="flex-1 bg-[#07060c] overflow-hidden flex items-center justify-center relative p-1 sm:p-3">
          
          {/* Loading Skeleton */}
          {iframeLoading && (
            <div className="absolute inset-0 bg-[#0e0c1a]/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-white">Loading Sanket's Portfolio...</p>
                <p className="text-xs text-purple-300 font-mono">https://sanket-portfolio-211.pages.dev</p>
              </div>
            </div>
          )}

          {/* Iframe Viewport Frame */}
          <div
            className={`h-full transition-all duration-300 rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl bg-slate-900 flex flex-col ${
              deviceView === 'desktop' ? 'w-full' :
              deviceView === 'tablet' ? 'w-[768px] max-w-full' :
              'w-[390px] max-w-full'
            }`}
          >
            {/* Mockup Top Address Indicator */}
            <div className="h-7 bg-[#151224] border-b border-white/10 px-3 flex items-center justify-between text-2xs text-slate-400 select-none shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="px-3 py-0.5 rounded-full bg-black/40 text-purple-300 font-mono text-[10px] truncate max-w-xs border border-white/5">
                🔒 https://sanket-portfolio-211.pages.dev/
              </div>
              <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Live</span>
              </div>
            </div>

            {/* Embedded Live Iframe */}
            <iframe
              key={iframeKey}
              src={portfolioUrl}
              title="Sanket Bhende Developer Portfolio"
              className="w-full flex-1 border-none bg-white"
              onLoad={() => setIframeLoading(false)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-black/40 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-slate-400 px-6 shrink-0">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-purple-400" />
            <span>Sanket Bhende • Full-Stack Engineer, AI System Architect & Creator of SkillPods</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-purple-300 text-2xs">Cloudflare Edge Deployed</span>
            <a
              href="https://sanket-portfolio-211.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-bold underline text-2xs"
            >
              Direct Link &rarr;
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
