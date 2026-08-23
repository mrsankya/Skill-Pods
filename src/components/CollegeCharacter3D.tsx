import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface CollegeCharacter3DProps {
  className?: string;
}

export const CollegeCharacter3D: React.FC<CollegeCharacter3DProps> = ({ className = '' }) => {
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
      <div className="absolute inset-0 -top-6 bg-gradient-to-tr from-indigo-600/25 via-purple-500/20 to-teal-400/20 rounded-full blur-3xl -z-10" />

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
        {/* Campus & Research Dome Centerpiece */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-[#161b33] via-[#241a4a] to-[#4338ca] p-1.5 shadow-[0_20px_50px_rgba(26,19,64,0.4)] flex items-center justify-center border border-white/20">
          <div className="w-full h-full rounded-[22px] bg-[#0f1123] overflow-hidden flex items-center justify-center relative border border-indigo-400/20">
            {/* Ambient Background Graphics */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-600/35 via-transparent to-black/80" />
            
            {/* College Campus & Graduation Innovation Graphic SVG */}
            <svg viewBox="0 0 200 200" className="w-full h-full object-cover">
              <defs>
                <linearGradient id="collegeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#3730a3" />
                </linearGradient>
                <linearGradient id="pillarGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
              </defs>
              {/* Orbital telemetry rings */}
              <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(129,140,248,0.2)" strokeWidth="1.5" strokeDasharray="5 7" />
              <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />

              {/* Greek/Institute Pediment Roof */}
              <polygon points="100,45 160,72 40,72" fill="url(#collegeGrad)" />
              <rect x="36" y="72" width="128" height="8" rx="2" fill="#c7d2fe" />

              {/* Campus Pillars */}
              <rect x="48" y="80" width="14" height="52" rx="3" fill="#e0e7ff" />
              <rect x="74" y="80" width="14" height="52" rx="3" fill="#e0e7ff" />
              <rect x="112" y="80" width="14" height="52" rx="3" fill="#e0e7ff" />
              <rect x="138" y="80" width="14" height="52" rx="3" fill="#e0e7ff" />

              {/* Base plinth */}
              <rect x="30" y="132" width="140" height="12" rx="3" fill="#4338ca" />
              <rect x="22" y="144" width="156" height="10" rx="3" fill="#312e81" />

              {/* Center Floating Graduation & Atom Emblem */}
              <circle cx="100" cy="105" r="16" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
              <path d="M92 105 L100 98 L108 105 L100 112 Z" fill="#fbbf24" />
              <line x1="108" y1="105" x2="114" y2="112" stroke="#fbbf24" strokeWidth="1.5" />

              {/* Floating Sparks */}
              <circle cx="65" cy="55" r="2.5" fill="#38bdf8" />
              <circle cx="135" cy="55" r="2.5" fill="#a855f7" />
              <circle cx="100" cy="30" r="3.5" fill="#fbbf24" />
            </svg>

            {/* University Accreditation Emblem Badge */}
            <div className="absolute bottom-2.5 right-2.5 bg-gradient-to-tr from-indigo-700 to-purple-700 text-white rounded-xl p-1.5 border border-indigo-300/40 shadow-md">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Floating Card 1: 1,248 STUDENTS */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 left-0 sm:-left-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-indigo-200 flex items-center gap-2 pointer-events-auto"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
          <span className="text-[10px] font-extrabold tracking-wider text-[#1e1b4b] uppercase whitespace-nowrap">
            1,248 STUDENTS
          </span>
        </motion.div>

        {/* Floating Card 2: 42 ACTIVE PODS */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          className="absolute -bottom-2 -left-2 sm:-left-8 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-purple-200 flex items-center gap-2 pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-purple-600" />
          <span className="text-[10px] font-extrabold tracking-wider text-purple-950 uppercase whitespace-nowrap">
            42 ACTIVE PODS
          </span>
        </motion.div>

        {/* Floating Card 3: 86 VERIFIED PROJECTS */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
          className="absolute top-4 -right-2 sm:-right-8 bg-[#1e1b4b] text-white px-3.5 py-1.5 rounded-2xl shadow-[0_12px_28px_rgba(30,27,75,0.35)] border border-indigo-300/40 flex items-center gap-2 pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold text-indigo-200 font-mono whitespace-nowrap">86 VERIFIED PROJECTS</span>
        </motion.div>

        {/* Floating Card 4: 24 INDUSTRY PARTNERS */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.9 }}
          className="absolute bottom-10 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-blue-200 flex items-center gap-1.5 pointer-events-auto"
        >
          <span className="text-xs font-black text-blue-700">🏢</span>
          <span className="text-[10px] font-extrabold tracking-wider text-blue-950 whitespace-nowrap">
            24 INDUSTRY PARTNERS
          </span>
        </motion.div>

        {/* Floating Card 5: 🚀 68% PLACEMENT READY */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
          className="absolute -bottom-4 right-4 sm:right-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3.5 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(16,185,129,0.3)] border border-emerald-300/40 flex items-center gap-1.5 pointer-events-auto"
        >
          <span className="text-[10px] font-black tracking-wider uppercase whitespace-nowrap">
            🚀 68% PLACEMENT READY
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};
