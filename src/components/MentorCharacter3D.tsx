import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface MentorCharacter3DProps {
  className?: string;
}

export const MentorCharacter3D: React.FC<MentorCharacter3DProps> = ({ className = '' }) => {
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
      className={`relative select-none flex items-center justify-center pointer-events-none perspective-[1200px] w-full max-w-[420px] h-[380px] sm:h-[420px] ${className}`}
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 -top-6 bg-gradient-to-tr from-purple-600/25 via-indigo-500/20 to-emerald-400/15 rounded-full blur-3xl -z-10" />

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
        {/* Mentor Avatar Centerpiece */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr from-[#2d1b54] via-[#462b80] to-[#7c3aed] p-1.5 shadow-[0_20px_50px_rgba(76,29,149,0.35)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#181126] overflow-hidden flex items-center justify-center relative border-2 border-white/20">
            {/* Ambient inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 via-transparent to-black/60" />
            
            {/* Tech Architect Illustration SVG */}
            <svg viewBox="0 0 200 200" className="w-full h-full object-cover">
              <defs>
                <linearGradient id="mentorSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd8bd" />
                  <stop offset="100%" stopColor="#f5ba93" />
                </linearGradient>
                <linearGradient id="mentorHair" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e1829" />
                  <stop offset="100%" stopColor="#3d2763" />
                </linearGradient>
                <linearGradient id="mentorJacket" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b206e" />
                  <stop offset="100%" stopColor="#211044" />
                </linearGradient>
              </defs>
              
              {/* Background Matrix lines */}
              <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(168,127,251,0.2)" strokeWidth="1.5" strokeDasharray="4 6" />
              
              {/* Hair Back */}
              <path d="M 50 110 Q 40 50 100 35 Q 160 50 150 110 Z" fill="url(#mentorHair)" />

              {/* Shoulders & Blazer */}
              <path d="M 25 200 C 35 150 70 140 100 140 C 130 140 165 150 175 200 Z" fill="url(#mentorJacket)" />
              {/* Inner shirt */}
              <polygon points="85,140 115,140 100,175" fill="#f3e8ff" />
              <polygon points="100,140 100,185" stroke="#7e22ce" strokeWidth="2" />

              {/* Neck */}
              <rect x="88" y="115" width="24" height="30" rx="6" fill="url(#mentorSkin)" />

              {/* Head / Face */}
              <ellipse cx="100" cy="92" rx="38" ry="44" fill="url(#mentorSkin)" />

              {/* Stylish Glasses */}
              <rect x="70" y="78" width="25" height="18" rx="6" fill="none" stroke="#7e22ce" strokeWidth="3" />
              <rect x="105" y="78" width="25" height="18" rx="6" fill="none" stroke="#7e22ce" strokeWidth="3" />
              <line x1="95" y1="87" x2="105" y2="87" stroke="#7e22ce" strokeWidth="3" />

              {/* Eyes */}
              <ellipse cx="82" cy="87" rx="3" ry="3.5" fill="#1e1829" />
              <ellipse cx="117" cy="87" rx="3" ry="3.5" fill="#1e1829" />
              <circle cx="83" cy="85.5" r="1" fill="#fff" />
              <circle cx="118" cy="85.5" r="1" fill="#fff" />

              {/* Friendly Confident Smile */}
              <path d="M 88 112 Q 100 122 112 112" fill="none" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />

              {/* Hair Front Styling */}
              <path d="M 60 70 Q 100 35 140 65 Q 125 50 100 48 Q 75 52 60 70 Z" fill="url(#mentorHair)" />
              <path d="M 62 70 Q 55 95 62 110 Q 66 85 75 75 Z" fill="url(#mentorHair)" />
            </svg>

            {/* Glowing verified badge */}
            <div className="absolute bottom-2 right-2 bg-emerald-500 text-white rounded-full p-1 border-2 border-[#181126] shadow-sm">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Floating Stat Badge 1: 3 ACTIVE PODS */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-2 left-2 sm:-left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-purple-200 flex items-center gap-2 pointer-events-auto"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping" />
          <span className="text-2xs font-extrabold tracking-wider text-[#261543] uppercase">
            3 ACTIVE PODS
          </span>
        </motion.div>

        {/* Floating Stat Badge 2: 2 REVIEWS PENDING */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute -bottom-2 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-amber-200 flex items-center gap-2 pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-2xs font-extrabold tracking-wider text-amber-900 uppercase">
            2 REVIEWS PENDING
          </span>
        </motion.div>

        {/* Floating Stat Badge 3: NEXT SESSION • 4:00 PM */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          className="absolute top-6 -right-2 sm:-right-6 bg-[#261543] text-white px-3.5 py-1.5 rounded-2xl shadow-[0_12px_28px_rgba(38,21,67,0.35)] border border-purple-400/40 flex items-center gap-2 pointer-events-auto"
        >
          <span className="text-2xs font-mono text-purple-300 font-extrabold">⚡ NEXT SESSION</span>
          <span className="text-2xs font-bold text-white bg-purple-700/80 px-2 py-0.5 rounded-full">4:00 PM</span>
        </motion.div>

        {/* Floating Stat Badge 4: 12 PROJECTS SHIPPED 🚀 */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 2.1 }}
          className="absolute -bottom-3 -right-2 sm:-right-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3.5 py-1.5 rounded-2xl shadow-[0_10px_25px_rgba(16,185,129,0.3)] border border-emerald-300/40 flex items-center gap-1.5 pointer-events-auto"
        >
          <span className="text-2xs font-black tracking-wider uppercase">
            12 PROJECTS SHIPPED 🚀
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};
