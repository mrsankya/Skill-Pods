import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { ModalView } from '../types';

interface FinalCtaSectionProps {
  onOpenModal: (modal: ModalView) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-10 overflow-hidden" id="final-cta-section">
      
      {/* Ambient background bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#8b5cf6]/15 blur-[120px] pointer-events-none rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        {/* Main Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-geist text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-4"
        >
          Your project shouldn't end after the viva.
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-lg text-[#cbc3d7] font-normal mb-10"
        >
          Build it. Validate it. Ship it.
        </motion.p>

        {/* Glowing Pill CTA Button: START BUILDING FREE > */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          whileHover={{ scale: 1.06, boxShadow: "0 0 45px rgba(168,127,251,0.6)" }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onOpenModal('join-cohort')}
          className="glow-pill-secondary text-white font-mono text-xs sm:text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full border border-[#a87ffb]/70 hover:border-[#d0bcff] hover:text-[#d0bcff] transition-all cursor-pointer shadow-[0_0_35px_rgba(168,127,251,0.4)] inline-flex items-center gap-3"
          id="btn-start-building-free"
        >
          <span>START BUILDING FREE</span>
          <ChevronRight className="w-4 h-4 text-[#d0bcff]" />
        </motion.button>

      </motion.div>

    </section>
  );
};
