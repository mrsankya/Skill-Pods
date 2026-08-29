import React from 'react';
import { ModalView } from '../types';
import { SkillPodsLogo } from './SkillPodsLogo';

interface FooterProps {
  onOpenModal: (modal: ModalView) => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <footer className="w-full bg-[#08070d] border-t border-white/5 py-10 sm:py-14 px-5 sm:px-8 md:px-12 text-[#958ea0]">
      <div className="max-w-[1340px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <SkillPodsLogo size={32} showText={true} />
          <span className="text-[10px] font-mono text-[#767082] tracking-wider uppercase sm:border-l sm:border-white/10 sm:pl-4">
            © 2026 SKILL PODS · SME INNOVATION ENGINE
          </span>
        </div>

        {/* Legal & Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[11px] font-mono tracking-widest uppercase">
          <button
            onClick={() => onOpenModal('docs')}
            className="text-[#958ea0] hover:text-white transition-colors cursor-pointer"
          >
            PRIVACY POLICY
          </button>
          <button
            onClick={() => onOpenModal('docs')}
            className="text-[#958ea0] hover:text-white transition-colors cursor-pointer"
          >
            TERMS OF SERVICE
          </button>
          <button
            onClick={() => onOpenModal('contact')}
            className="text-[#958ea0] hover:text-white transition-colors cursor-pointer"
          >
            CONTACT
          </button>
          <button
            onClick={() => onOpenModal('docs')}
            className="text-[#958ea0] hover:text-white transition-colors cursor-pointer"
          >
            DOCUMENTATION
          </button>
        </div>

      </div>
    </footer>
  );
};
