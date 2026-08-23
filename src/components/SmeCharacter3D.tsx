import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface SmeCharacter3DProps {
  className?: string;
}

export const SmeCharacter3D: React.FC<SmeCharacter3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 125, mass: 0.55 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-300, 300], [-10, 10]);
  const rotateX = useTransform(smoothY, [-300, 300], [8, -8]);
  const translateX = useTransform(smoothX, [-300, 300], [-12, 12]);
  const translateY = useTransform(smoothY, [-300, 300], [-6, 6]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const diffX = Math.max(-300, Math.min(300, e.clientX - centerX));
      const diffY = Math.max(-300, Math.min(300, e.clientY - centerY));

      mouseX.set(diffX);
      mouseY.set(diffY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className={`relative select-none flex items-center justify-center pointer-events-none perspective-[1200px] w-full max-w-[440px] h-[390px] sm:h-[430px] ${className}`}
    >
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 -top-6 bg-gradient-to-tr from-purple-600/25 via-blue-500/20 to-emerald-400/20 rounded-full blur-3xl -z-10" />

      {/* Main 3D Card Graphic */}
      <motion.div
        style={{
          rotateY,
          rotateX,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Company Product & Tech Centerpiece */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-[#1e1438] via-[#371f65] to-[#6d28d9] p-1.5 shadow-[0_20px_50px_rgba(45,21,80,0.4)] flex items-center justify-center border border-white/20">
          <div className="w-full h-full rounded-[22px] bg-[#150d26] overflow-hidden flex items-center justify-center relative border border-purple-400/20">
            {/* Ambient Background Graphics */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/30 via-transparent to-black/80" />
            
            {/* Tech Architecture & Fleet Telemetry SVG */}
            <svg viewBox="0 0 200 200" className="w-full h-full object-cover">
              <defs>
                <linearGradient id="smeGrid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="smeCube" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#4338ca" />
                </linearGradient>
                <linearGradient id="smeGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>

              {/* Concentric telemetry circles */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(168,127,251,0.2)" strokeWidth="1.5" strokeDasharray="4 6" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              
              {/* Isometric 3D Enterprise Server / Box Stack */}
              {/* Bottom Layer */}
              <polygon points="100,125 150,100 100,75 50,100" fill="url(#smeCube)" opacity="0.9" />
              <polygon points="50,100 100,125 100,145 50,120" fill="#2e1065" />
              <polygon points="150,100 100,125 100,145 150,120" fill="#1e1b4b" />

              {/* Floating Middle Layer */}
              <polygon points="100,105 140,85 100,65 60,85" fill="#a855f7" />
              <polygon points="60,85 100,105 100,118 60,98" fill="#4c1d95" />
              <polygon points="140,85 100,105 100,118 140,98" fill="#312e81" />

              {/* Top Tech Core */}
              <polygon points="100,80 130,65 100,50 70,65" fill="#e9d5ff" />
              <polygon points="70,65 100,80 100,90 70,75" fill="#7e22ce" />
              <polygon points="130,65 100,80 100,90 130,75" fill="#4338ca" />

              {/* Data packet beams */}
              <line x1="100" y1="50" x2="100" y2="25" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 3" />
              <circle cx="100" cy="25" r="4" fill="#38bdf8" />

              <line x1="150" y1="100" x2="175" y2="100" stroke="#a855f7" strokeWidth="2" />
              <circle cx="175" cy="100" r="3" fill="#a855f7" />

              <line x1="50" y1="100" x2="25" y2="100" stroke="#34d399" strokeWidth="2" />
              <circle cx="25" cy="100" r="3" fill="#34d399" />
            </svg>

            {/* Enterprise Verified Shield Badge */}
            <div className="absolute bottom-2.5 right-2.5 bg-gradient-to-tr from-purple-700 to-indigo-600 text-white rounded-xl p-1.5 border border-purple-300/40 shadow-md">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Floating Card 1: 3 ACTIVE PROJECTS */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 left-0 sm:-left-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-purple-200 flex items-center gap-2 pointer-events-auto"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping" />
          <span className="text-2xs font-extrabold tracking-wider text-[#261543] uppercase">
            3 ACTIVE PROJECTS
          </span>
        </motion.div>

        {/* Floating Card 2: 2 PODS BUILDING */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          className="absolute -bottom-2 -left-2 sm:-left-8 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-blue-200 flex items-center gap-2 pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span className="text-2xs font-extrabold tracking-wider text-blue-950 uppercase">
            2 PODS BUILDING
          </span>
        </motion.div>

        {/* Floating Card 3: 1 REVIEW PENDING */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
          className="absolute top-4 -right-2 sm:-right-8 bg-[#261543] text-white px-3.5 py-1.5 rounded-2xl shadow-[0_12px_28px_rgba(38,21,67,0.35)] border border-amber-400/40 flex items-center gap-2 pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-2xs font-bold text-amber-300 font-mono">1 REVIEW PENDING</span>
        </motion.div>

        {/* Floating Card 4: ₹80K PROJECT VALUE */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.9 }}
          className="absolute bottom-10 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-purple-200 flex items-center gap-1.5 pointer-events-auto"
        >
          <span className="text-xs font-black text-purple-700">₹</span>
          <span className="text-2xs font-extrabold tracking-wider text-purple-950">
            ₹80K PROJECT VALUE
          </span>
        </motion.div>

        {/* Floating Card 5: 🚀 4 PRODUCTS SHIPPED */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
          className="absolute -bottom-4 right-4 sm:right-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3.5 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(16,185,129,0.3)] border border-emerald-300/40 flex items-center gap-1.5 pointer-events-auto"
        >
          <span className="text-2xs font-black tracking-wider uppercase">
            🚀 4 PRODUCTS SHIPPED
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};
