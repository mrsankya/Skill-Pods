import React from 'react';
import { motion } from 'motion/react';
import { 
  FileEdit, 
  User, 
  Users,
  ChevronRight, 
  Clock, 
  Layers, 
  Sparkles, 
  Star, 
  Gauge, 
  Zap, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { MetricsData, ModalView } from '../types';
import { HeroImageShowcase } from './HeroImageShowcase';

interface HeroSectionProps {
  metrics: MetricsData;
  onOpenModal: (modal: ModalView) => void;
  onExplorePods: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ metrics, onOpenModal, onExplorePods }) => {
  return (
    <section className="relative pt-8 sm:pt-14 pb-20 md:pb-28 px-4 sm:px-6 md:px-10 overflow-hidden" id="hero-section">
      
      {/* Background Nebulae */}
      <div className="nebula-cloud-1" />
      <div className="nebula-cloud-2" />
      <div className="nebula-cloud-3" />

      {/* Hero Header Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-geist text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.12] mb-6"
        >
          Don't submit the<br />
          project. <span className="text-[#a87ffb] drop-shadow-[0_0_35px_rgba(168,127,251,0.65)]">Ship it.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg text-[#b2abc0] max-w-2xl mx-auto leading-relaxed mb-9 font-normal"
        >
          Turn real business problems into production-ready software.<br className="hidden sm:inline" />
          Powered by student <span className="text-white font-semibold">Skill Pods</span> and industry mentorship.
        </motion.p>

        {/* Dual Action Glowing Pill Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto justify-center mb-16 md:mb-20"
        >
          
          {/* Button 1: POST A BUSINESS PROBLEM */}
          <button
            onClick={() => onOpenModal('submit-problem')}
            className="w-full sm:w-auto glow-pill-primary text-[#240356] font-bold text-xs sm:text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full flex items-center justify-between sm:justify-center gap-3 cursor-pointer group hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(168,127,251,0.4)]"
            id="hero-btn-submit-sme"
          >
            <div className="w-4 h-4 text-[#240356] group-hover:rotate-12 transition-transform duration-300">
              <FileEdit className="w-4 h-4" />
            </div>
            <span>POST A BUSINESS PROBLEM</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Button 2: JOIN A SKILL POD */}
          <button
            onClick={() => onOpenModal('join-cohort')}
            className="w-full sm:w-auto glow-pill-secondary text-white font-medium text-xs sm:text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-full flex items-center justify-between sm:justify-center gap-3 cursor-pointer group hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(168,127,251,0.25)]"
            id="hero-btn-join-pod"
          >
            <div className="w-4 h-4 text-[#d0bcff] group-hover:scale-110 transition-transform">
              <User className="w-4 h-4" />
            </div>
            <span>JOIN A SKILL POD</span>
            <ChevronRight className="w-4 h-4 text-[#a19ba9] group-hover:text-white group-hover:translate-x-1 transition-transform" />
          </button>

        </motion.div>

      </div>

      {/* Real-World SME Field Discovery & Pod Cohort Sprints Sliding Strip (Left-to-Right) */}
      <HeroImageShowcase />

      {/* Dramatic Purple Curved Light Arc & Integrated Feature Grid */}
      <div className="relative max-w-[1240px] mx-auto mt-4 sm:mt-8">
        
        {/* Glowing Planet Dome Light Arc */}
        <div className="absolute top-[-30px] sm:top-[-60px] left-0 right-0 w-full flex justify-center items-center pointer-events-none z-0">
          <svg 
            viewBox="0 0 1200 320" 
            className="w-full h-auto max-h-[220px] sm:max-h-[300px] overflow-visible arc-pulse opacity-90"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="arcGlowGradient2" x1="0%" y1="100%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4c1d95" stopOpacity="0" />
                <stop offset="15%" stopColor="#7c3aed" stopOpacity="0.4" />
                <stop offset="35%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="1" />
                <stop offset="65%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#7c3aed" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="arcCoreWhite2" x1="0%" y1="100%" x2="100%" y2="100%">
                <stop offset="15%" stopColor="#c084fc" stopOpacity="0" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="85%" stopColor="#c084fc" stopOpacity="0" />
              </linearGradient>
              <filter id="superBloom2" x="-30%" y="-50%" width="160%" height="240%">
                <feGaussianBlur stdDeviation="24" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Atmosphere Deep Glow */}
            <path
              d="M 40 310 Q 600 -40 1160 310"
              stroke="url(#arcGlowGradient2)"
              strokeWidth="50"
              opacity="0.4"
              filter="url(#superBloom2)"
            />
            {/* Primary Neon Arc Line */}
            <path
              d="M 40 310 Q 600 -40 1160 310"
              stroke="url(#arcGlowGradient2)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Inner Core Highlight Beam */}
            <path
              d="M 180 260 Q 600 -20 1020 260"
              stroke="url(#arcCoreWhite2)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Integrated Curved Metrics & Feature Grid with Staggered Scroll Animation */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 sm:p-4">
          
          {/* Card 1: 99.9% UPTIME */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group hover:border-[#a87ffb]/50 transition-all duration-300 glass-card-hover border-t-white/15 min-h-[170px]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#1d172e] border border-[#a87ffb]/30 flex items-center justify-center text-[#c084fc] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,127,251,0.2)]">
                <Gauge className="w-4 h-4 animate-spin-very-slow" />
              </div>
            </div>
            <div>
              <div className="font-geist text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1.5">
                {metrics.uptimeSla.toFixed(1)}%
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[#958ea0]">
                UPTIME
              </div>
            </div>
          </motion.div>

          {/* Card 2: 50ms LATENCY */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group hover:border-[#a87ffb]/50 transition-all duration-300 glass-card-hover border-t-white/15 min-h-[170px]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#1d172e] border border-[#a87ffb]/30 flex items-center justify-center text-[#c084fc] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,127,251,0.2)]">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-geist text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1.5">
                {metrics.avgLatencyMs}ms
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[#958ea0]">
                LATENCY
              </div>
            </div>
          </motion.div>

          {/* Card 3: 4,800+ PROJECTS */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group hover:border-[#a87ffb]/50 transition-all duration-300 glass-card-hover border-t-white/15 min-h-[170px]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#1d172e] border border-[#a87ffb]/30 flex items-center justify-center text-[#c084fc] group-hover:rotate-45 transition-transform duration-500 shadow-[0_0_15px_rgba(168,127,251,0.2)]">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="font-geist text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1.5">
                4,800+
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[#958ea0]">
                PROJECTS
              </div>
            </div>
          </motion.div>

          {/* Card 4: 10M+ REQUESTS / DAY */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group hover:border-[#a87ffb]/50 transition-all duration-300 glass-card-hover border-t-white/15 min-h-[170px]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#1d172e] border border-[#a87ffb]/30 flex items-center justify-center text-[#c084fc] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,127,251,0.2)]">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="font-geist text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1.5">
                10M+
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[#958ea0]">
                REQUESTS / DAY
              </div>
            </div>
          </motion.div>

          {/* Wide Card: Problem to Product flow (Spans full 4 columns on lg) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="sm:col-span-2 lg:col-span-4 glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative group hover:border-[#a87ffb]/50 transition-all duration-300 glass-card-hover"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Left text column */}
              <div className="max-w-md">
                <div className="flex items-center gap-2 mb-2.5 text-[#d0bcff]">
                  <Sparkles className="w-4 h-4 text-[#c084fc] animate-spin-reverse-slow" />
                  <h3 className="font-geist text-lg sm:text-xl font-bold text-white tracking-tight">
                    Problem to Product flow
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-[#a19ba9] leading-relaxed">
                  Go from concept to customer-ready product with our optimized, structured process.
                </p>
              </div>

              {/* Right Mini Process Flow Diagram */}
              <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 self-center md:self-auto">
                
                {/* Step 1: SME Problem */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#191426] border border-[#a87ffb]/30 flex items-center justify-center text-[#c084fc] shadow-sm mb-1.5">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-[#958ea0] text-center whitespace-nowrap">
                    SME<br />Problem
                  </span>
                </div>

                {/* Arrow */}
                <div className="text-[#686075] text-xs font-mono mb-4">→</div>

                {/* Step 2: Student Skill Pod */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#191426] border border-[#a87ffb]/30 flex items-center justify-center text-[#c084fc] shadow-sm mb-1.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-[#958ea0] text-center whitespace-nowrap">
                    Student<br />Skill Pod
                  </span>
                </div>

                {/* Arrow */}
                <div className="text-[#686075] text-xs font-mono mb-4">→</div>

                {/* Step 3: Shipped Product */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#191426] border border-[#a87ffb]/30 flex items-center justify-center text-[#c084fc] shadow-sm mb-1.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-[9px] text-[#958ea0] text-center whitespace-nowrap">
                    Shipped<br />Product
                  </span>
                </div>

              </div>

            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
};
