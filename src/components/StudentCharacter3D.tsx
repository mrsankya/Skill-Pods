import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface StudentCharacter3DProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const StudentCharacter3D: React.FC<StudentCharacter3DProps> = ({
  className = '',
  size = 'hero'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for organic cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 125, mass: 0.55 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transforms for subtle 3D body lean & tilt
  const bodyRotateY = useTransform(smoothX, [-300, 300], [-8, 8]);
  const bodyRotateX = useTransform(smoothY, [-300, 300], [5, -5]);
  const bodyTranslateX = useTransform(smoothX, [-300, 300], [-10, 10]);
  const bodyTranslateY = useTransform(smoothY, [-300, 300], [-5, 5]);

  // Head and face tracking
  const headRotateY = useTransform(smoothX, [-300, 300], [-14, 14]);
  const headRotateX = useTransform(smoothY, [-300, 300], [9, -9]);
  const headTranslateX = useTransform(smoothX, [-300, 300], [-15, 15]);
  const headTranslateY = useTransform(smoothY, [-300, 300], [-7, 7]);

  // Pupil eye-tracking
  const pupilX = useTransform(smoothX, [-300, 300], [-4.5, 4.5]);
  const pupilY = useTransform(smoothY, [-300, 300], [-3.5, 3.5]);

  // Laptop tilt
  const laptopRotateY = useTransform(smoothX, [-300, 300], [-4, 4]);
  const laptopTranslateX = useTransform(smoothX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const diffX = Math.max(-350, Math.min(350, e.clientX - centerX));
      const diffY = Math.max(-350, Math.min(350, e.clientY - centerY));

      mouseX.set(diffX);
      mouseY.set(diffY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const sizeClasses = {
    sm: 'w-48 h-56',
    md: 'w-72 h-80',
    lg: 'w-96 h-[420px]',
    hero: 'w-full max-w-[460px] h-[480px] sm:h-[530px]'
  }[size];

  return (
    <div 
      ref={containerRef}
      id="student-character-3d-canvas"
      className={`relative select-none flex items-center justify-center pointer-events-none perspective-[1200px] ${sizeClasses} ${className}`}
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 -top-6 bg-gradient-to-tr from-purple-500/20 via-violet-400/15 to-amber-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute w-64 h-64 top-12 left-1/2 -translate-x-1/2 bg-purple-600/15 rounded-full blur-2xl -z-10" />

      {/* Main 3D Character Animated Container */}
      <motion.div
        style={{
          rotateY: bodyRotateY,
          rotateX: bodyRotateX,
          x: bodyTranslateX,
          y: bodyTranslateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-full h-full flex items-end justify-center"
      >
        <svg
          viewBox="0 0 500 580"
          className="w-full h-full drop-shadow-2xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 3D Skin Shaders */}
            <radialGradient id="boySkin3D" cx="45%" cy="38%" r="60%">
              <stop offset="0%" stopColor="#fff3e8" />
              <stop offset="40%" stopColor="#fcd3b6" />
              <stop offset="75%" stopColor="#f5b38e" />
              <stop offset="100%" stopColor="#de8d63" />
            </radialGradient>

            <linearGradient id="boySkinShadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f7bf9a" />
              <stop offset="100%" stopColor="#c87749" />
            </linearGradient>

            {/* Tousled Brown Hair 3D Shaders */}
            <linearGradient id="hairDarkBrown" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#4a2817" />
              <stop offset="30%" stopColor="#361a0c" />
              <stop offset="70%" stopColor="#230e05" />
              <stop offset="100%" stopColor="#120602" />
            </linearGradient>

            <linearGradient id="hairLockHighlight" x1="0" y1="0" x2="1" y2="0.7">
              <stop offset="0%" stopColor="#784427" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#4a2817" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#230e05" stopOpacity="0" />
            </linearGradient>

            {/* Purple Headphones (Vibrant Purple with Silver Ear Cup) */}
            <linearGradient id="headphonePurpleBand" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="40%" stopColor="#6d28d9" />
              <stop offset="85%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>

            <linearGradient id="headphonePurpleCup" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="40%" stopColor="#7c3aed" />
              <stop offset="85%" stopColor="#581c87" />
              <stop offset="100%" stopColor="#3b0764" />
            </linearGradient>

            <linearGradient id="earCupSilver" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="35%" stopColor="#cbd5e1" />
              <stop offset="75%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            {/* Purple Outer Hoodie */}
            <linearGradient id="boyPurpleHoodie" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#7e22ce" />
              <stop offset="35%" stopColor="#6b21a8" />
              <stop offset="75%" stopColor="#581c87" />
              <stop offset="100%" stopColor="#3b0764" />
            </linearGradient>

            {/* Yellow / Mustard Inner Shirt & Hood */}
            <linearGradient id="yellowInnerHood" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="35%" stopColor="#eab308" />
              <stop offset="80%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>

            {/* Laptop Metallic Finish (Space-Grey / Silver) */}
            <linearGradient id="macbookChassis" x1="0" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="35%" stopColor="#64748b" />
              <stop offset="75%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <linearGradient id="macbookBevel" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#cbd5e1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.8" />
            </linearGradient>

            {/* 3D Hazel-Brown Eyes */}
            <radialGradient id="boyEyeIris" cx="42%" cy="40%" r="52%">
              <stop offset="0%" stopColor="#854d0e" />
              <stop offset="40%" stopColor="#542b08" />
              <stop offset="85%" stopColor="#291203" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
          </defs>

          {/* ================= 1. PURPLE HEADPHONE ARCH ================= */}
          <g id="headphone-arch">
            <path
              d="M165 200 C 165 80, 335 80, 335 200"
              stroke="url(#headphonePurpleBand)"
              strokeWidth="24"
              strokeLinecap="round"
              className="filter drop-shadow-md"
            />
            {/* Top Highlight Ridge */}
            <path
              d="M185 170 C 185 95, 315 95, 315 170"
              stroke="#c084fc"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.65"
            />
          </g>

          {/* ================= 2. TORSO: PURPLE HOODIE & YELLOW INNER HOOD ================= */}
          <g id="boy-body">
            {/* Main Purple Hoodie Body */}
            <path
              d="M90 580 L95 440 C 95 385, 155 355, 250 355 C 345 355, 405 385, 405 440 L410 580 Z"
              fill="url(#boyPurpleHoodie)"
            />

            {/* Arm & Shoulder Folds */}
            <path
              d="M95 440 C 120 475, 140 525, 140 580"
              stroke="#2e1065"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path
              d="M405 440 C 380 475, 360 525, 360 580"
              stroke="#2e1065"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* Yellow Inner Hood Fold (wraps around neck) */}
            <path
              d="M165 375 C 160 425, 195 450, 250 450 C 305 450, 340 425, 335 375 C 360 405, 375 425, 370 450 C 360 480, 310 495, 250 495 C 190 495, 140 480, 130 450 C 125 425, 140 405, 165 375 Z"
              fill="url(#yellowInnerHood)"
            />
            {/* Yellow Inner Hood Rim */}
            <path
              d="M145 400 C 140 435, 185 465, 250 465 C 315 465, 360 435, 355 400"
              stroke="#ca8a04"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Inner Yellow Polo / Henly Placket */}
            <path
              d="M220 370 L220 465 C 220 475, 280 475, 280 465 L280 370 Z"
              fill="url(#yellowInnerHood)"
            />
            {/* Polo Placket Center Seam */}
            <path
              d="M250 375 L250 465"
              stroke="#a16207"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            {/* Placket Button */}
            <circle cx="250" cy="415" r="4.5" fill="#fef08a" stroke="#a16207" strokeWidth="1.5" />
            <circle cx="250" cy="415" r="1.5" fill="#a16207" />

            {/* Purple Hoodie Outer Lapels / Collar */}
            <path
              d="M175 365 C 175 425, 210 470, 225 470 L210 490 C 185 475, 160 420, 160 365 Z"
              fill="#581c87"
            />
            <path
              d="M325 365 C 325 425, 290 470, 275 470 L290 490 C 315 475, 340 420, 340 365 Z"
              fill="#581c87"
            />

            {/* Cream Drawstrings */}
            <path
              d="M205 425 C 200 460, 202 490, 208 520"
              stroke="#fef08a"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <circle cx="208" cy="522" r="3.5" fill="#ca8a04" />

            <path
              d="M295 425 C 300 460, 298 490, 292 520"
              stroke="#fef08a"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <circle cx="292" cy="522" r="3.5" fill="#ca8a04" />
          </g>

          {/* ================= 3. ANIMATED HEAD, EYES, SMILE & TOUSLED HAIR ================= */}
          <motion.g
            id="character-head-group"
            style={{
              rotateY: headRotateY,
              rotateX: headRotateX,
              x: headTranslateX,
              y: headTranslateY
            }}
          >
            {/* Neck */}
            <path
              d="M222 315 L222 380 C 235 390, 265 390, 278 380 L278 315 Z"
              fill="url(#boySkinShadow)"
            />

            {/* Head / Face Oval */}
            <path
              d="M185 235 C 185 155, 315 155, 315 235 C 315 310, 280 345, 250 345 C 220 345, 185 310, 185 235 Z"
              fill="url(#boySkin3D)"
              className="filter drop-shadow-md"
            />

            {/* Warm Cheeks Blush */}
            <ellipse cx="205" cy="265" rx="16" ry="11" fill="#f43f5e" opacity="0.18" />
            <ellipse cx="295" cy="265" rx="16" ry="11" fill="#f43f5e" opacity="0.18" />

            {/* Cute 3D Boy Nose */}
            <path
              d="M246 242 C 246 264, 238 270, 250 272 C 262 270, 254 264, 254 242"
              fill="url(#boySkinShadow)"
              opacity="0.55"
            />
            <ellipse cx="250" cy="270" rx="7" ry="4" fill="#fb7185" opacity="0.35" />
            <circle cx="250" cy="268" r="2" fill="#ffffff" opacity="0.4" />

            {/* Charming Subtle Asymmetric Smile matching reference */}
            <g id="boy-smile">
              <path
                d="M228 296 C 240 306, 265 304, 276 293"
                stroke="#6b260b"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Dimple / Corner accent */}
              <path
                d="M275 292 C 278 295, 279 298, 278 301"
                stroke="#a0441d"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M234 298 C 246 304, 264 302, 272 295"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
            </g>

            {/* ================= EYES (Large, Hazel-Brown & Cursor-Tracking) ================= */}
            {/* Left Eyebrow (Arching Boy Brow) */}
            <path
              d="M194 212 C 206 200, 226 204, 234 212"
              stroke="#2e1408"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Right Eyebrow */}
            <path
              d="M266 212 C 274 204, 294 200, 306 212"
              stroke="#2e1408"
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Left Eye */}
            <g id="left-eye">
              <ellipse cx="214" cy="232" rx="17" ry="15" fill="#ffffff" stroke="#f1f5f9" strokeWidth="1" />
              {/* Hazel Pupil & Iris with cursor physics */}
              <motion.g style={{ x: pupilX, y: pupilY }}>
                <circle cx="214" cy="232" r="10.5" fill="url(#boyEyeIris)" />
                <circle cx="214" cy="232" r="5.5" fill="#000000" />
                {/* Specular Catchlights */}
                <circle cx="210" cy="228" r="3.5" fill="#ffffff" />
                <circle cx="217" cy="235" r="1.8" fill="#ffffff" opacity="0.85" />
              </motion.g>
              {/* Eyelid Crease */}
              <path
                d="M197 228 C 206 216, 222 216, 231 228"
                stroke="#2b1409"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Right Eye */}
            <g id="right-eye">
              <ellipse cx="286" cy="232" rx="17" ry="15" fill="#ffffff" stroke="#f1f5f9" strokeWidth="1" />
              {/* Hazel Pupil & Iris with cursor physics */}
              <motion.g style={{ x: pupilX, y: pupilY }}>
                <circle cx="286" cy="232" r="10.5" fill="url(#boyEyeIris)" />
                <circle cx="286" cy="232" r="5.5" fill="#000000" />
                {/* Specular Catchlights */}
                <circle cx="282" cy="228" r="3.5" fill="#ffffff" />
                <circle cx="289" cy="235" r="1.8" fill="#ffffff" opacity="0.85" />
              </motion.g>
              {/* Eyelid Crease */}
              <path
                d="M269 228 C 278 216, 294 216, 303 228"
                stroke="#2b1409"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* ================= 4. 3D TOUSLED BROWN BOY HAIR (Layered Tufts matching photo) ================= */}
            <g id="boy-hair">
              {/* Base Hair Mass */}
              <path
                d="M175 220 C 155 135, 215 90, 260 90 C 320 90, 345 140, 325 220 C 315 195, 290 170, 255 170 C 220 170, 195 195, 175 220 Z"
                fill="url(#hairDarkBrown)"
              />

              {/* Front Tousled Hair Locks / Bangs (Layered strands) */}
              <path
                d="M175 195 C 190 145, 230 135, 250 175 C 265 140, 305 145, 320 195 C 310 160, 275 155, 255 185 C 240 155, 200 160, 175 195 Z"
                fill="url(#hairDarkBrown)"
              />
              {/* Forehead Tuft 1 (Left) */}
              <path
                d="M190 175 C 210 175, 225 195, 215 210 C 205 195, 195 190, 190 175 Z"
                fill="url(#hairDarkBrown)"
              />
              {/* Forehead Tuft 2 (Center Left) */}
              <path
                d="M220 165 C 240 170, 250 198, 242 215 C 235 195, 225 185, 220 165 Z"
                fill="url(#hairDarkBrown)"
              />
              {/* Forehead Tuft 3 (Center Right) */}
              <path
                d="M250 165 C 268 170, 280 195, 272 212 C 265 195, 255 185, 250 165 Z"
                fill="url(#hairDarkBrown)"
              />
              {/* Forehead Tuft 4 (Right) */}
              <path
                d="M280 175 C 298 178, 310 198, 305 212 C 298 195, 288 188, 280 175 Z"
                fill="url(#hairDarkBrown)"
              />

              {/* Top Hair Volume Highlights */}
              <path
                d="M205 125 C 235 105, 275 105, 295 128 C 270 120, 235 118, 205 125 Z"
                fill="url(#hairLockHighlight)"
              />
              <path
                d="M185 155 C 210 138, 240 140, 255 158 C 235 150, 205 150, 185 155 Z"
                fill="url(#hairLockHighlight)"
              />
              <path
                d="M255 140 C 280 132, 310 138, 320 160 C 305 148, 280 145, 255 140 Z"
                fill="url(#hairLockHighlight)"
              />
            </g>

            {/* ================= 5. PURPLE OVER-EAR HEADPHONES (With Silver Inner Disc) ================= */}
            {/* Left Ear Cup */}
            <g id="headphone-left">
              {/* Outer Purple Ring */}
              <ellipse
                cx="168"
                cy="235"
                rx="20"
                ry="35"
                fill="url(#headphonePurpleCup)"
                stroke="#4c1d95"
                strokeWidth="2.5"
                className="filter drop-shadow-lg"
              />
              {/* Silver Center Disc (Matching reference photo) */}
              <ellipse cx="168" cy="235" rx="12" ry="20" fill="url(#earCupSilver)" stroke="#475569" strokeWidth="1.5" />
              {/* Metallic Specular Highlight */}
              <ellipse cx="166" cy="230" rx="6" ry="10" fill="#ffffff" opacity="0.6" />
            </g>

            {/* Right Ear Cup */}
            <g id="headphone-right">
              {/* Outer Purple Ring */}
              <ellipse
                cx="332"
                cy="235"
                rx="20"
                ry="35"
                fill="url(#headphonePurpleCup)"
                stroke="#4c1d95"
                strokeWidth="2.5"
                className="filter drop-shadow-lg"
              />
              {/* Silver Center Disc */}
              <ellipse cx="332" cy="235" rx="12" ry="20" fill="url(#earCupSilver)" stroke="#475569" strokeWidth="1.5" />
              {/* Metallic Specular Highlight */}
              <ellipse cx="330" cy="230" rx="6" ry="10" fill="#ffffff" opacity="0.6" />
            </g>
          </motion.g>

          {/* ================= 6. LAPTOP & HANDS (Foreground 3D Layer) ================= */}
          <motion.g
            id="laptop-group"
            style={{
              rotateY: laptopRotateY,
              x: laptopTranslateX
            }}
          >
            {/* Hands typing on keyboard */}
            <path
              d="M130 500 C 145 470, 175 475, 185 510 L170 540 Z"
              fill="url(#boySkin3D)"
            />
            <path
              d="M370 500 C 355 470, 325 475, 315 510 L330 540 Z"
              fill="url(#boySkin3D)"
            />

            {/* Laptop Back Lid (Space-Grey / Silver Macbook) */}
            <path
              d="M135 415 L365 415 C 378 415, 386 423, 384 436 L370 575 L130 575 L116 436 C 114 423, 122 415, 135 415 Z"
              fill="url(#macbookChassis)"
              stroke="#334155"
              strokeWidth="2"
              className="filter drop-shadow-2xl"
            />
            {/* Top Beveled Specular Highlight */}
            <path
              d="M135 417 L365 417"
              stroke="url(#macbookBevel)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Apple Logo on Laptop Lid (Exact match to reference photo) */}
            <g transform="translate(250, 495) scale(0.95)">
              {/* Apple Body */}
              <path
                d="M-9 -10 C -14 -5, -14 7, -9 12 C -5 16, 5 16, 9 12 C 14 7, 14 -5, 9 -10 C 5 -14, -5 -14, -9 -10 Z"
                fill="#e2e8f0"
                opacity="0.9"
              />
              {/* Apple Leaf */}
              <path
                d="M1 -16 C 6 -18, 6 -13, 3 -11 Z"
                fill="#e2e8f0"
                opacity="0.9"
              />
            </g>

            {/* Desk / Base Bar */}
            <rect x="105" y="570" width="290" height="15" rx="4" fill="#1e293b" />
          </motion.g>
        </svg>

        {/* ================= 7. FLOATING STATUS BADGES ================= */}
        {/* Beside his head: ✓ SKILL POD MATCHED ✓ */}
        <motion.div
          animate={{ y: [4, -6, 4] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 -right-6 sm:-right-8 flex items-center gap-2 bg-purple-950/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-purple-400/40 text-xs font-extrabold text-white tracking-wide"
        >
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-500 text-white text-2xs font-black shadow-xs">
            ✓
          </span>
          <span className="text-purple-100 font-bold">SKILL POD MATCHED</span>
          <span className="text-purple-400 font-bold">✓</span>
        </motion.div>

        {/* Top Left: Real Industry Opportunity */}
        <motion.div
          animate={{ y: [-4, 5, -4] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute -top-3 -left-4 sm:-left-6 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-purple-100 text-xs font-semibold text-purple-950"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>NEW SME OPPORTUNITY</span>
        </motion.div>

        {/* Bottom Left: Mentor Review */}
        <motion.div
          animate={{ y: [-5, 4, -5] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute bottom-28 -left-6 sm:-left-8 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-indigo-100 text-xs font-semibold text-slate-800"
        >
          <span className="text-purple-600 font-bold">✓</span>
          <span>MENTOR REVIEW ✓</span>
        </motion.div>

        {/* Bottom Right: Project Shipped */}
        <motion.div
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute bottom-8 -right-4 sm:-right-6 hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-purple-100 text-xs font-semibold text-purple-900"
        >
          <span className="text-indigo-600 font-bold">🚀</span>
          <span>PROJECT SHIPPED 🚀</span>
        </motion.div>

        {/* Bottom Center-Left: Payout Realization */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          className="absolute -bottom-2 left-8 hidden sm:flex items-center gap-1.5 bg-emerald-50/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-emerald-200 text-xs font-bold text-emerald-800"
        >
          <span className="text-emerald-600">₹</span>
          <span>₹ EARNED</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
