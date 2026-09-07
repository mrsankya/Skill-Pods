import React from 'react';
import { Mail, Phone, ShieldCheck, Heart } from 'lucide-react';
import { ModalView } from '../types';
import { SkillPodsLogo } from './SkillPodsLogo';

interface FooterProps {
  onOpenModal: (modal: ModalView) => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <footer className="w-full bg-[#08070d] border-t border-white/5 py-10 sm:py-14 px-5 sm:px-8 md:px-12 text-[#958ea0]">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <SkillPodsLogo size={32} showText={true} />
            <span className="text-[10px] font-mono text-[#767082] tracking-wider uppercase sm:border-l sm:border-white/10 sm:pl-4">
              © 2026 SKILL PODS · DEMAND-FIRST SME ENGINE
            </span>
          </div>

          {/* Legal & Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[11px] font-mono tracking-widest uppercase">
            <button
              onClick={() => onOpenModal('privacy')}
              className="text-[#958ea0] hover:text-white transition-colors cursor-pointer"
            >
              PRIVACY POLICY
            </button>
            <button
              onClick={() => onOpenModal('terms')}
              className="text-[#958ea0] hover:text-white transition-colors cursor-pointer"
            >
              TERMS OF SERVICE
            </button>
            <button
              onClick={() => onOpenModal('contact')}
              className="text-[#958ea0] hover:text-white transition-colors cursor-pointer"
            >
              CONTACT &amp; HOTLINE
            </button>
            <button
              onClick={() => onOpenModal('docs')}
              className="text-[#958ea0] hover:text-white transition-colors cursor-pointer"
            >
              DOCUMENTATION
            </button>
          </div>

        </div>

        {/* Quick Contact & Hotline Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 text-[#767082]">
            <a
              href="mailto:sanketbhende0@gmail.com"
              className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>sanketbhende0@gmail.com</span>
            </a>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <a
              href="tel:+919822725265"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 9822725265</span>
            </a>
            <span className="hidden sm:inline text-white/20">&bull;</span>
            <a
              href="https://wa.me/919822725265?text=Hello%20SkillPods%20Team"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366] hover:text-[#25D366]/80 transition-colors"
            >
              <span>💬 WhatsApp: +91 9822725265</span>
            </a>
          </div>

          <div className="text-[10px] text-[#767082] flex items-center gap-1">
            <span>Built with precision for SIH 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
