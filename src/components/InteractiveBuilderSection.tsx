import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Code2, 
  CheckCircle2, 
  Rocket, 
  Briefcase, 
  Users, 
  Bot, 
  Trophy, 
  Layers,
  Terminal,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { ModalView } from '../types';

interface InteractiveBuilderSectionProps {
  onOpenModal: (modal: ModalView) => void;
  onExplorePods?: () => void;
  onStartBuilding?: () => void;
}

export const InteractiveBuilderSection: React.FC<InteractiveBuilderSectionProps> = ({
  onOpenModal,
  onExplorePods,
  onStartBuilding
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check user accessibility preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Smooth mouse coordinates normalized to [-1, 1]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for lag-free, organic character tracking
  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Character body movement (12-18px)
  const bodyX = useTransform(smoothX, [-1, 1], [-16, 16]);
  const bodyY = useTransform(smoothY, [-1, 1], [-12, 12]);
  const bodyRotate = useTransform(smoothX, [-1, 1], [-3.5, 3.5]);

  // Head and eye tracking (subtle independent motion)
  const headX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const headY = useTransform(smoothY, [-1, 1], [-8, 8]);
  const headRotate = useTransform(smoothX, [-1, 1], [-4, 4]);

  // Eye pupil movement (-6px to +6px)
  const eyeX = useTransform(smoothX, [-1, 1], [-5.5, 5.5]);
  const eyeY = useTransform(smoothY, [-1, 1], [-4.5, 4.5]);

  // Laptop tilt with 3D feel
  const laptopRotateX = useTransform(smoothY, [-1, 1], [4, -4]);
  const laptopRotateY = useTransform(smoothX, [-1, 1], [-6, 6]);

  // Floating badge parallax transforms
  const badge1X = useTransform(smoothX, [-1, 1], [14, -14]);
  const badge1Y = useTransform(smoothY, [-1, 1], [10, -10]);
  const badge2X = useTransform(smoothX, [-1, 1], [-12, 12]);
  const badge2Y = useTransform(smoothY, [-1, 1], [14, -14]);
  const badge3X = useTransform(smoothX, [-1, 1], [18, -18]);
  const badge3Y = useTransform(smoothY, [-1, 1], [-12, 12]);
  const badge4X = useTransform(smoothX, [-1, 1], [-16, 16]);
  const badge4Y = useTransform(smoothY, [-1, 1], [-14, 14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(Math.max(-1, Math.min(1, x)));
    mouseY.set(Math.max(-1, Math.min(1, y)));
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id="interactive-builder-section"
      className="relative w-full py-20 md:py-28 px-4 sm:px-6 md:px-10 overflow-hidden bg-[#07060d] text-[#e4e1e7] border-t border-b border-white/5 selection:bg-[#a87ffb]/30"
    >
      {/* Background Ambience & Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft violet radial glow behind character */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[550px] h-[550px] bg-[#9333ea]/15 blur-[120px] rounded-full" />
        {/* Secondary cyan fill */}
        <div className="absolute bottom-10 left-[5%] w-[420px] h-[420px] bg-[#38bdf8]/10 blur-[100px] rounded-full" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: HEADLINE, COPY & DUAL CTAS                                   */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* Small Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1538] border border-[#a855f7]/40 text-[#d8b4fe] text-xs font-mono tracking-widest uppercase mb-5 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
            <span className="font-bold">BUILD. LEARN. SHIP.</span>
          </motion.div>

          {/* Main Heading with Skill Pods Accent Color */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-geist text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.14] mb-6"
          >
            Build <span className="text-[#a87ffb] drop-shadow-[0_0_35px_rgba(168,127,251,0.6)]">real products.</span>
            <br />
            Not just projects.
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#b2abc0] leading-relaxed max-w-xl mb-9"
          >
            Work on real business problems, collaborate with a skill pod, learn from mentors, and ship products that actually matter.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
          >
            {/* Primary CTA */}
            <button
              onClick={() => {
                if (onStartBuilding) onStartBuilding();
                else onOpenModal('join-cohort');
              }}
              className="glow-pill-primary text-[#240356] font-bold text-xs sm:text-sm font-mono uppercase tracking-wider px-7 py-4 rounded-full flex items-center justify-center gap-3 cursor-pointer group hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(168,127,251,0.4)]"
            >
              <span>Start Building Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => {
                if (onExplorePods) onExplorePods();
                else {
                  const el = document.getElementById('workflow-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-4 rounded-full bg-[#151124] hover:bg-[#1f1a35] border border-white/10 hover:border-[#a87ffb]/50 text-[#e4e1e7] hover:text-white font-mono text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#a87ffb]" />
              <span>Explore Skill Pods</span>
            </button>
          </motion.div>

          {/* Live Micro Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10 w-full text-xs text-[#a19ba9] font-mono"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span>100% Industry Verified IP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a87ffb]" />
              <span>1-on-1 Mentor Code Gate</span>
            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: INTERACTIVE 3D STUDENT BUILDER CHARACTER & FLOATING BADGES  */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
          
          {/* Subtle Ambient Radial Platform Base */}
          <div className="absolute bottom-6 w-[340px] sm:w-[440px] h-[70px] bg-gradient-to-t from-[#a855f7]/25 to-transparent blur-[40px] rounded-full pointer-events-none" />
          <div className="absolute bottom-10 w-[260px] sm:w-[320px] h-[30px] border border-[#a855f7]/30 rounded-full opacity-40 pointer-events-none" />

          {/* ===================================================================== */}
          {/* FLOATING PRODUCT STATUS ELEMENTS (PARALLAX ON CURSOR)                 */}
          {/* ===================================================================== */}

          {/* Badge 1: Top Left - REAL SME PROBLEM */}
          <motion.div
            style={{ x: badge1X, y: badge1Y }}
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            animate={{ y: [0, -6, 0] }}
            className="absolute top-6 -left-2 sm:left-4 z-20 px-3.5 py-2 rounded-2xl bg-[#140f28]/90 backdrop-blur-md border border-[#38bdf8]/40 shadow-[0_0_20px_rgba(56,189,248,0.25)] flex items-center gap-2.5"
          >
            <div className="w-6 h-6 rounded-lg bg-[#38bdf8]/20 flex items-center justify-center text-xs text-[#38bdf8]">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] font-mono uppercase text-[#7dd3fc]">Source Verified</div>
              <div className="text-xs font-bold text-white tracking-wide">REAL SME PROBLEM</div>
            </div>
          </motion.div>

          {/* Badge 2: Top Right - SKILL POD */}
          <motion.div
            style={{ x: badge2X, y: badge2Y }}
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            animate={{ y: [0, 7, 0] }}
            className="absolute top-12 -right-2 sm:right-6 z-20 px-3.5 py-2 rounded-2xl bg-[#140f28]/90 backdrop-blur-md border border-[#a855f7]/50 shadow-[0_0_25px_rgba(168,85,247,0.3)] flex items-center gap-2.5"
          >
            <div className="w-6 h-6 rounded-lg bg-[#a855f7]/20 flex items-center justify-center text-xs text-[#d8b4fe]">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] font-mono uppercase text-[#c084fc]">Team Agile Pod</div>
              <div className="text-xs font-bold text-white tracking-wide">SKILL POD</div>
            </div>
          </motion.div>

          {/* Badge 3: Middle Left - BUILDING 78% */}
          <motion.div
            style={{ x: badge3X, y: badge3Y }}
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            animate={{ y: [0, -8, 0] }}
            className="absolute bottom-28 -left-4 sm:left-2 z-20 px-3.5 py-2 rounded-2xl bg-[#140f28]/90 backdrop-blur-md border border-[#f59e0b]/40 shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center gap-2.5"
          >
            <div className="w-6 h-6 rounded-lg bg-[#f59e0b]/20 flex items-center justify-center text-xs text-[#fbbf24]">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] font-mono uppercase text-[#fde68a]">Sprint 3 Progress</div>
              <div className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
                <span>BUILDING 78%</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-ping" />
              </div>
            </div>
          </motion.div>

          {/* Badge 4: Middle Right - MENTOR REVIEW ✓ */}
          <motion.div
            style={{ x: badge4X, y: badge4Y }}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            animate={{ y: [0, 6, 0] }}
            className="absolute bottom-32 -right-3 sm:right-2 z-20 px-3.5 py-2 rounded-2xl bg-[#140f28]/90 backdrop-blur-md border border-[#10b981]/50 shadow-[0_0_25px_rgba(16,185,129,0.25)] flex items-center gap-2.5"
          >
            <div className="w-6 h-6 rounded-lg bg-[#10b981]/20 flex items-center justify-center text-xs text-[#34d399]">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] font-mono uppercase text-[#6ee7b7]">Architecture Gate</div>
              <div className="text-xs font-bold text-white tracking-wide text-[#a7f3d0]">MENTOR REVIEW ✓</div>
            </div>
          </motion.div>

          {/* Badge 5: Bottom Center - 🚀 SHIPPED */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute -bottom-2 right-12 sm:right-20 z-20 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#9333ea]/90 to-[#6366f1]/90 backdrop-blur-md border border-[#c084fc] shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center gap-2"
          >
            <Rocket className="w-4 h-4 text-[#fde047] animate-bounce" />
            <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">🚀 SHIPPED TO PROD</span>
          </motion.div>


          {/* ===================================================================== */}
          {/* MAIN 3D / ILLUSTRATED STUDENT BUILDER CHARACTER                       */}
          {/* Responsive to Mouse Cursor (Smooth Leaning, Eye & Head Tracking)      */}
          {/* ===================================================================== */}
          <motion.div
            style={{ 
              x: bodyX, 
              y: bodyY, 
              rotateZ: bodyRotate,
              transformOrigin: 'bottom center'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[320px] sm:w-[380px] md:w-[420px] h-[400px] sm:h-[480px] flex items-center justify-center select-none"
          >
            
            {/* SVG Interactive Multi-Layered 3D Student Character */}
            <svg 
              viewBox="0 0 400 480" 
              className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Hoodie Violet Gradient */}
                <linearGradient id="hoodieGrad" x1="100" y1="200" x2="300" y2="480" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="45%" stopColor="#6d28d9" />
                  <stop offset="100%" stopColor="#4c1d95" />
                </linearGradient>

                {/* Inner Yellow/Amber T-Shirt Collar Gradient */}
                <linearGradient id="innerShirtGrad" x1="180" y1="230" x2="220" y2="280" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>

                {/* Face & Skin Tone 3D Lighting */}
                <linearGradient id="skinGrad" x1="150" y1="90" x2="250" y2="210" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fed7aa" />
                  <stop offset="60%" stopColor="#fdba74" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>

                {/* Rich Hair Gradient */}
                <linearGradient id="hairGrad" x1="140" y1="40" x2="260" y2="150" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#451a03" />
                  <stop offset="40%" stopColor="#291002" />
                  <stop offset="100%" stopColor="#1a0700" />
                </linearGradient>

                {/* Headphones Gradient */}
                <linearGradient id="headphoneGrad" x1="110" y1="80" x2="290" y2="180" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>

                {/* Laptop Body Metal Gradient */}
                <linearGradient id="laptopGrad" x1="120" y1="330" x2="280" y2="440" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="50%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>

                {/* Laptop Screen Glow */}
                <linearGradient id="screenGlow" x1="150" y1="300" x2="250" y2="380" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                </linearGradient>

                {/* Ambient Soft Drop Shadows */}
                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* ------------------------------------------------------------- */}
              {/* TORSO & HOODIE BODY                                          */}
              {/* ------------------------------------------------------------- */}
              <g id="character-torso">
                {/* Main Purple Zip-Up Hoodie Body */}
                <path 
                  d="M110 250 C110 215 150 205 200 205 C250 205 290 215 290 250 L320 480 L80 480 Z" 
                  fill="url(#hoodieGrad)" 
                />

                {/* Left Shoulder & Arm */}
                <path 
                  d="M110 250 C85 270 70 330 85 410 C90 435 120 435 125 410 L140 280 Z" 
                  fill="#581c87" 
                />

                {/* Right Shoulder & Arm */}
                <path 
                  d="M290 250 C315 270 330 330 315 410 C310 435 280 435 275 410 L260 280 Z" 
                  fill="#581c87" 
                />

                {/* Inner Shirt V-Collar */}
                <path 
                  d="M175 210 L200 265 L225 210 Z" 
                  fill="url(#innerShirtGrad)" 
                />

                {/* Hoodie Drawstrings */}
                <path d="M170 230 Q168 280 172 310" stroke="#fde047" strokeWidth="4" strokeLinecap="round" />
                <circle cx="172" cy="312" r="3.5" fill="#f59e0b" />

                <path d="M230 230 Q232 280 228 310" stroke="#fde047" strokeWidth="4" strokeLinecap="round" />
                <circle cx="228" cy="312" r="3.5" fill="#f59e0b" />

                {/* Center Zip Line */}
                <line x1="200" y1="265" x2="200" y2="480" stroke="#4c1d95" strokeWidth="3" />
              </g>

              {/* ------------------------------------------------------------- */}
              {/* HEAD, FACE, EYES & HEADPHONES (INTERACTIVE EYE & HEAD TRACK)  */}
              {/* ------------------------------------------------------------- */}
              <motion.g 
                id="character-head"
                style={{ 
                  x: headX, 
                  y: headY, 
                  rotate: headRotate,
                  transformOrigin: '200px 150px' 
                }}
              >
                {/* Neck */}
                <path d="M182 170 L182 225 C182 232 218 232 218 225 L218 170 Z" fill="#ea580c" opacity="0.6" />
                <path d="M185 170 L185 220 C185 228 215 228 215 220 L215 170 Z" fill="url(#skinGrad)" />

                {/* Headphone Arch Behind Hair */}
                <path 
                  d="M130 140 C130 70 270 70 270 140" 
                  stroke="url(#headphoneGrad)" 
                  strokeWidth="14" 
                  strokeLinecap="round" 
                />

                {/* Head Base Silhouette */}
                <ellipse cx="200" cy="148" rx="55" ry="62" fill="url(#skinGrad)" />

                {/* Ears */}
                <ellipse cx="145" cy="150" rx="9" ry="12" fill="#fb923c" />
                <ellipse cx="146" cy="150" rx="6" ry="8" fill="#fdba74" />
                <ellipse cx="255" cy="150" rx="9" ry="12" fill="#fb923c" />
                <ellipse cx="254" cy="150" rx="6" ry="8" fill="#fdba74" />

                {/* Headphone Ear Cushions */}
                <rect x="126" y="125" width="16" height="42" rx="8" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />
                <rect x="258" y="125" width="16" height="42" rx="8" fill="#7c3aed" stroke="#c084fc" strokeWidth="2" />

                {/* Volumetric Textured Hair */}
                <path 
                  d="M142 135 C138 85 165 48 200 48 C235 48 262 85 258 135 C250 120 235 110 215 115 C195 105 175 110 160 125 C150 130 145 132 142 135 Z" 
                  fill="url(#hairGrad)" 
                />
                {/* Hair Bangs & Tufts */}
                <path d="M165 80 Q180 115 195 102 Q215 120 235 90 Q220 70 200 72 Z" fill="#291002" />
                <path d="M145 105 Q160 125 175 118" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />
                <path d="M225 118 Q240 125 255 105" stroke="#451a03" strokeWidth="4" strokeLinecap="round" />

                {/* Friendly Eyebrows */}
                <path d="M166 128 Q178 122 188 127" stroke="#371b05" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M212 127 Q222 122 234 128" stroke="#371b05" strokeWidth="3.5" strokeLinecap="round" />

                {/* Large Anime/3D Stylized Friendly Eyes */}
                {/* Left Eye White */}
                <ellipse cx="178" cy="142" rx="13" ry="15" fill="#ffffff" />
                {/* Right Eye White */}
                <ellipse cx="222" cy="142" rx="13" ry="15" fill="#ffffff" />

                {/* Interactive Dynamic Pupils (Track Cursor) */}
                <motion.g style={{ x: eyeX, y: eyeY }}>
                  {/* Left Pupil Iris (Warm Amber / Brown 3D) */}
                  <circle cx="178" cy="143" r="8.5" fill="#5c2908" />
                  <circle cx="178" cy="143" r="6" fill="#1e0b02" />
                  <circle cx="176" cy="140" r="3" fill="#ffffff" />
                  <circle cx="180" cy="145" r="1.5" fill="#ffffff" opacity="0.8" />

                  {/* Right Pupil Iris */}
                  <circle cx="222" cy="143" r="8.5" fill="#5c2908" />
                  <circle cx="222" cy="143" r="6" fill="#1e0b02" />
                  <circle cx="220" cy="140" r="3" fill="#ffffff" />
                  <circle cx="224" cy="145" r="1.5" fill="#ffffff" opacity="0.8" />
                </motion.g>

                {/* Eyelash & Creases */}
                <path d="M164 135 Q178 128 191 135" stroke="#291002" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M209 135 Q222 128 236 135" stroke="#291002" strokeWidth="2.5" strokeLinecap="round" />

                {/* Cute Nose */}
                <path d="M197 150 Q200 157 203 150" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />

                {/* Warm Confident Smile */}
                <path d="M188 168 Q200 178 212 168" stroke="#9a3412" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M189 168 Q200 174 211 168" fill="#ffffff" opacity="0.9" />

                {/* Cheerful Cheek Blush */}
                <circle cx="162" cy="154" r="8" fill="#f87171" opacity="0.3" filter="url(#glowFilter)" />
                <circle cx="238" cy="154" r="8" fill="#f87171" opacity="0.3" filter="url(#glowFilter)" />
              </motion.g>

              {/* ------------------------------------------------------------- */}
              {/* LAPTOP WITH 3D ILLUMINATION & APPLE / SKILL POD LOGO          */}
              {/* ------------------------------------------------------------- */}
              <motion.g 
                id="character-laptop"
                style={{ 
                  rotateX: laptopRotateX, 
                  rotateY: laptopRotateY,
                  transformOrigin: '200px 390px' 
                }}
              >
                {/* Laptop Back Lid */}
                <path 
                  d="M130 330 L270 330 C276 330 280 334 278 340 L260 440 C258 446 254 450 248 450 L152 450 C146 450 142 446 140 440 L122 340 C120 334 124 330 130 330 Z" 
                  fill="url(#laptopGrad)" 
                  stroke="#cbd5e1" 
                  strokeWidth="2" 
                />

                {/* Metallic Bevel Edge */}
                <path 
                  d="M135 336 L265 336 L248 444 L152 444 Z" 
                  fill="#475569" 
                  opacity="0.3" 
                />

                {/* Glowing Skill Pods / Builder Logo on Laptop Lid */}
                <g transform="translate(186, 375)">
                  {/* Apple / Pod Shape Glow */}
                  <circle cx="14" cy="14" r="14" fill="#ffffff" opacity="0.95" />
                  <path d="M14 0 C16 4 15 7 12 8 C11 5 12 2 14 0 Z" fill="#ffffff" />
                  {/* Skill Pod Inner Code Icon </> */}
                  <text x="5" y="18" fill="#1e1b4b" fontSize="10" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
                </g>

                {/* Hands Gripping the Sides of the Laptop */}
                {/* Left Hand */}
                <ellipse cx="126" cy="385" rx="14" ry="18" fill="#fdba74" stroke="#fb923c" strokeWidth="2" />
                {/* Right Hand */}
                <ellipse cx="274" cy="385" rx="14" ry="18" fill="#fdba74" stroke="#fb923c" strokeWidth="2" />
              </motion.g>

            </svg>

            {/* Glowing Screen Light Reflection on Face and Hands */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-to-t from-[#38bdf8]/20 via-[#a855f7]/15 to-transparent blur-[30px] pointer-events-none" />

          </motion.div>

        </div>

      </div>

    </section>
  );
};
