import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ModalView } from '../types';
import { SkillPodsLogo } from './SkillPodsLogo';

interface NavbarProps {
  onOpenModal: (modal: ModalView) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal, activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#08070d]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-center px-5 sm:px-8 md:px-12 h-20 max-w-[1340px] mx-auto">
        
        {/* Brand Logo & Typography (Selected Element) */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2 text-white hover:opacity-90 transition-all cursor-pointer group text-left focus:outline-none"
          id="nav-brand-logo"
        >
          <SkillPodsLogo size={42} showText={true} />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => onNavigate('about')}
            className={`text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${
              activeSection === 'about'
                ? 'text-white font-bold'
                : 'text-[#a19ba9] hover:text-white'
            }`}
            id="nav-link-about"
          >
            ABOUT
          </button>
          <button
            onClick={() => onNavigate('workflow')}
            className={`text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${
              activeSection === 'workflow'
                ? 'text-white font-bold'
                : 'text-[#a19ba9] hover:text-white'
            }`}
            id="nav-link-how-it-works"
          >
            HOW IT WORKS
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className={`text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${
              activeSection === 'pricing'
                ? 'text-white font-bold'
                : 'text-[#a19ba9] hover:text-white'
            }`}
            id="nav-link-pricing"
          >
            PRICING
          </button>
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onOpenModal('login')}
            className="text-[#a19ba9] hover:text-white transition-colors text-xs font-mono tracking-widest uppercase cursor-pointer"
            id="nav-btn-login"
          >
            LOGIN
          </button>
          
          <button
            onClick={() => onOpenModal('join-cohort')}
            className="glow-pill-secondary text-white text-xs font-mono uppercase tracking-widest px-5 py-2.5 rounded-full font-semibold border border-[#d0bcff]/40 hover:border-[#d0bcff] hover:text-[#d0bcff] transition-all cursor-pointer shadow-[0_0_20px_rgba(160,120,255,0.25)]"
            id="nav-btn-get-started"
          >
            GET STARTED
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => onOpenModal('join-cohort')}
            className="glow-pill-secondary text-white text-[11px] font-mono uppercase px-3.5 py-1.5 rounded-full border border-[#d0bcff]/40"
          >
            START
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#a19ba9] hover:text-white p-1.5 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e0c16] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-widest">
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="text-left text-[#cbc3d7] hover:text-white py-2"
            >
              ABOUT
            </button>
            <button
              onClick={() => { onNavigate('workflow'); setMobileMenuOpen(false); }}
              className="text-left text-[#cbc3d7] hover:text-white py-2"
            >
              HOW IT WORKS
            </button>
            <button
              onClick={() => { onNavigate('pricing'); setMobileMenuOpen(false); }}
              className="text-left text-[#cbc3d7] hover:text-white py-2"
            >
              PRICING
            </button>
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => { onOpenModal('login'); setMobileMenuOpen(false); }}
              className="w-full text-center text-xs font-mono text-white py-2.5 rounded-xl border border-white/10"
            >
              LOGIN
            </button>
            <button
              onClick={() => { onOpenModal('join-cohort'); setMobileMenuOpen(false); }}
              className="w-full text-center text-xs font-mono font-bold text-[#3c0091] bg-[#d0bcff] py-3 rounded-xl shadow-lg"
            >
              GET STARTED
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
