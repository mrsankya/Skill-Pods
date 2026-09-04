import React from 'react';
import { Home, Compass, ArrowLeft, Terminal, ShieldAlert } from 'lucide-react';
import { SkillPodsLogo } from './SkillPodsLogo';

interface NotFoundPageProps {
  onBackToHome: () => void;
  onGoToLogin?: () => void;
  onGoToCommunity?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onBackToHome,
  onGoToLogin,
  onGoToCommunity
}) => {
  return (
    <div className="min-h-screen bg-[#08070d] text-[#e4e1e7] flex flex-col justify-between selection:bg-[#a078ff]/30 selection:text-[#d0bcff] relative overflow-hidden font-sans">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/15 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="w-full border-b border-white/5 bg-[#08070d]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between z-10">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <SkillPodsLogo size={36} showText={true} />
        </button>

        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#a19ba9] hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </button>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="max-w-2xl w-full text-center">
          
          {/* Glowing Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(168,127,251,0.25)] animate-pulse">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>ERROR CODE 404 &bull; ROUTE_NOT_FOUND</span>
          </div>

          {/* Huge Cyberpunk 404 Header */}
          <h1 className="font-geist text-7xl sm:text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d0bcff] to-[#a078ff] mb-4 drop-shadow-[0_0_40px_rgba(160,120,255,0.4)]">
            404
          </h1>

          <h2 className="font-geist text-2xl sm:text-3xl font-bold text-white mb-4">
            Skill Pod Node Not Found
          </h2>

          <p className="text-sm sm:text-base text-[#a19ba9] max-w-lg mx-auto mb-8 leading-relaxed">
            The page, telemetry matrix, or pod workspace you are requesting does not exist, was relocated, or you reached an unverified gateway route.
          </p>

          {/* Action Button Grid */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={onBackToHome}
              className="glow-pill-primary text-[#3c0091] font-bold text-xs font-mono uppercase tracking-widest px-7 py-3.5 rounded-full flex items-center gap-2 cursor-pointer hover:scale-105 transition-all shadow-xl"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            {onGoToLogin && (
              <button
                onClick={onGoToLogin}
                className="glow-pill-secondary text-white text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full border border-purple-500/40 hover:border-purple-400 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>Launch Workspace</span>
              </button>
            )}

            {onGoToCommunity && (
              <button
                onClick={onGoToCommunity}
                className="bg-white/5 hover:bg-white/10 text-[#d0bcff] text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full border border-white/10 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Compass className="w-4 h-4 text-purple-400" />
                <span>Browse Community</span>
              </button>
            )}
          </div>

          {/* Diagnostic Console Box */}
          <div className="p-4 rounded-2xl bg-[#13111e]/80 border border-white/10 text-left font-mono text-[11px] text-[#767082] max-w-lg mx-auto">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-[#a19ba9]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                Telemetry Diagnostic
              </span>
              <span className="text-[10px] text-purple-400">STATUS: RECOVERY_READY</span>
            </div>
            <p className="text-[#cbc3d7]">
              &gt; path: <span className="text-amber-300">{typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '/unknown'}</span>
            </p>
            <p className="text-[#cbc3d7]">
              &gt; cluster: <span className="text-emerald-400">skillpods-in-mumbai-01</span>
            </p>
            <p className="text-[#cbc3d7]">
              &gt; auto_redirect: <span className="text-purple-300">Click &quot;Back to Home&quot; to restore session.</span>
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-4 px-6 text-center text-xs font-mono text-[#767082] z-10">
        &copy; 2026 SKILL PODS &bull; Demand-First SME Innovation Engine &bull; Support: <a href="mailto:support@skillpods.io" className="text-purple-400 hover:underline">support@skillpods.io</a>
      </footer>

    </div>
  );
};
