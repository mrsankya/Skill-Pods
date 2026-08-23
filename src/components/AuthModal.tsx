import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'student' | 'mentor' | 'sme'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#1b1b1f] border border-[#d0bcff]/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#958ea0] hover:text-white p-1 rounded-full hover:bg-[#2a292e] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#d0bcff] font-mono text-xs mb-3 uppercase tracking-wider">
          <Zap className="w-4 h-4 fill-[#d0bcff]" />
          <span>SKILL PODS PORTAL</span>
        </div>

        {/* Tab switch */}
        <div className="flex bg-[#131317] p-1 rounded-xl border border-[#494454]/40 mb-6">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
              tab === 'login'
                ? 'bg-[#d0bcff] text-[#3c0091] font-bold shadow'
                : 'text-[#cbc3d7] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
              tab === 'signup'
                ? 'bg-[#d0bcff] text-[#3c0091] font-bold shadow'
                : 'text-[#cbc3d7] hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Role pills */}
        <div className="flex justify-center gap-2 mb-6">
          {(['student', 'mentor', 'sme'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                role === r
                  ? 'bg-[#a078ff]/20 text-[#d0bcff] border border-[#d0bcff]/50 font-bold'
                  : 'bg-[#131317] text-[#958ea0] border border-[#494454]/30'
              }`}
            >
              {r === 'sme' ? 'SME Business' : r}
            </button>
          ))}
        </div>

        {submitted ? (
          <div className="bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] p-4 rounded-xl text-center text-sm font-mono">
            Authentication verified. Entering Skill Pods workstation...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div>
                <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Thorne"
                  required
                  className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Work / Academic Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@organization.com"
                required
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#d0bcff] text-[#3c0091] font-bold py-3 rounded-full font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-all glow-bloom cursor-pointer mt-4 flex items-center justify-center gap-2"
            >
              <span>{tab === 'login' ? 'Sign In to Workspace' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
