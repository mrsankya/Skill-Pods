import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  theme?: 'dark' | 'light';
}

export const SkillPodsLogo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 44,
  showText = true,
  theme = 'dark'
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official SkillPods 'S' Ribbon Crest */}
      <div 
        className="relative flex-shrink-0 flex items-center justify-center"
        style={{ 
          width: typeof size === 'number' ? `${size}px` : size, 
          height: typeof size === 'number' ? `${size * 1.15}px` : size 
        }}
      >
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Main 'S' Ribbon Top Arch Gradient (Purple/Violet to Electric Blue) */}
            <linearGradient id="sRibbonTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="40%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Middle Cross Ribbon (Electric Blue to Bright Cyan) */}
            <linearGradient id="sRibbonMid" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#00d2ff" />
            </linearGradient>

            {/* Bottom Outer Loop Ribbon (Vibrant Cyan to Deep Blue/Purple) */}
            <linearGradient id="sRibbonBottom" x1="100%" y1="50%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="45%" stopColor="#0284c7" />
              <stop offset="75%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            {/* Ribbon Inner Shadow & Depth */}
            <linearGradient id="ribbonDepthDark" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
            </linearGradient>

            {/* Rocket Exhaust Trail Gradient */}
            <linearGradient id="rocketTrailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0088ff" />
              <stop offset="50%" stopColor="#00d2ff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>

            {/* Rocket Body Gradient */}
            <linearGradient id="rocketBodyGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="60%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Graduate Mortarboard Gradient */}
            <linearGradient id="mortarboardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#4338ca" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>

            {/* Student Glow Fill */}
            <linearGradient id="studentGlow" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#00a6ff" />
              <stop offset="100%" stopColor="#022f6a" />
            </linearGradient>
          </defs>

          {/* 1. TOP GRADUATE HEAD & MORTARBOARD CAP */}
          <g className="graduate-group">
            {/* Student Head (Silhouette) */}
            <circle cx="35" cy="31" r="9" fill="#0f172a" stroke="#1e3a8a" strokeWidth="1.2" />
            <path
              d="M 28 35 C 28 31 42 31 42 35 Z"
              fill="#1e3a8a"
              opacity="0.6"
            />

            {/* Mortarboard / Graduation Cap Diamond */}
            <polygon
              points="35,12 51,19 35,26 19,19"
              fill="url(#mortarboardGrad)"
              stroke="#60a5fa"
              strokeWidth="0.8"
            />
            {/* Mortarboard Cap Skull Skullcap under diamond */}
            <path
              d="M 27 22.5 L 27 27 C 27 30 43 30 43 27 L 43 22.5 Z"
              fill="#1e293b"
              stroke="#60a5fa"
              strokeWidth="0.6"
            />
            {/* Tassel Button & Hanging Tassel */}
            <circle cx="35" cy="19" r="1.2" fill="#93c5fd" />
            <path
              d="M 35 19 Q 47 20 48 27 L 49 32"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="49" cy="32" r="1.2" fill="#38bdf8" />
          </g>

          {/* 2. BACKGROUND RIBBON LAYER (Back curve of top loop & launch sweep) */}
          <path
            d="M 32 40 C 48 40 70 32 87 20"
            stroke="url(#rocketTrailGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Inner shade on top loop transition */}
          <path
            d="M 35 38 C 50 38 68 31 82 22 L 85 24 C 69 36 49 43 32 43 Z"
            fill="url(#ribbonDepthDark)"
          />

          {/* 3. MAIN "S" 3D FLOWING RIBBON */}
          {/* Top-Left Curve of 'S' sweeping around graduate */}
          <path
            d="M 23 26 C 9 32 5 44 8 52 C 11 60 22 61 35 60 C 52 58 80 50 87 70 C 94 88 84 105 55 110 C 22 115 2 98 2 83 C 2 74 8 68 18 64"
            fill="none"
            stroke="url(#sRibbonMid)"
            strokeWidth="8.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]"
          />

          {/* Outer Layer with vibrant gradient highlights & bevel */}
          {/* Top Loop Highlight (Purple to Violet to Cyan) */}
          <path
            d="M 23 26 C 9 32 5 44 8 52 C 12 59 25 61 40 59"
            fill="none"
            stroke="url(#sRibbonTop)"
            strokeWidth="7.5"
            strokeLinecap="round"
          />

          {/* Bottom Loop 3D Curved Ribbon (Sweeping around team) */}
          <path
            d="M 35 59 C 55 57 82 48 90 70 C 97 88 85 106 55 111 C 24 115 3 99 3 83 C 3 75 9 69 17 65"
            fill="none"
            stroke="url(#sRibbonBottom)"
            strokeWidth="7.8"
            strokeLinecap="round"
          />

          {/* Bottom Loop Inner 3D Edge Line (Cyan glow highlight) */}
          <path
            d="M 52 61 C 70 54 85 58 87 74 C 90 89 80 104 54 107 C 29 110 10 98 9 84"
            fill="none"
            stroke="#00f2fe"
            strokeWidth="1.6"
            strokeOpacity="0.75"
          />

          {/* 4. CODING POD TEAM IN THE BOTTOM LOOP */}
          <g className="team-pod-group">
            {/* Ambient Backlight inside Bottom Pod */}
            <circle cx="41" cy="85" r="28" fill="#0284c7" opacity="0.15" filter="blur(6px)" />

            {/* Left Teammate */}
            <circle cx="21" cy="74" r="6" fill="url(#studentGlow)" stroke="#38bdf8" strokeWidth="0.8" />
            <path
              d="M 12 90 C 12 80 17 79 21 79 C 25 79 30 80 30 90 Z"
              fill="#0a192f"
              stroke="#0284c7"
              strokeWidth="0.8"
            />

            {/* Right Teammate */}
            <circle cx="63" cy="74" r="6" fill="url(#studentGlow)" stroke="#38bdf8" strokeWidth="0.8" />
            <path
              d="M 54 90 C 54 80 59 79 63 79 C 67 79 72 80 72 90 Z"
              fill="#0a192f"
              stroke="#0284c7"
              strokeWidth="0.8"
            />

            {/* Center Lead Student (Coding on Laptop) */}
            <circle cx="41" cy="67" r="8" fill="url(#studentGlow)" stroke="#38bdf8" strokeWidth="1" />
            {/* Center Student Torso */}
            <path
              d="M 27 91 C 27 78 34 76 41 76 C 48 76 55 78 55 91 Z"
              fill="#031d44"
              stroke="#38bdf8"
              strokeWidth="1.2"
            />
            {/* Laptop Screen with Code Glyph </ > */}
            <path
              d="M 32 82 L 50 82 L 48 91 L 34 91 Z"
              fill="#0b2347"
              stroke="#38bdf8"
              strokeWidth="1.2"
            />
            <text
              x="41"
              y="88.5"
              fill="#ffffff"
              fontSize="5.5"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
              filter="drop-shadow(0 0 2px #00d2ff)"
            >
              &lt;/&gt;
            </text>
          </g>

          {/* 5. TOP RIGHT ROCKET & STARS */}
          <g className="rocket-launch-group">
            {/* 4-Point Star 1 (Top Left of Rocket) */}
            <path
              d="M 75 14 Q 75 18 71 18 Q 75 18 75 22 Q 75 18 79 18 Q 75 18 75 14 Z"
              fill="#38bdf8"
              filter="drop-shadow(0 0 4px #00d2ff)"
            />

            {/* 4-Point Star 2 (Far Right) */}
            <path
              d="M 80 8 Q 80 10.5 77.5 10.5 Q 80 10.5 80 13 Q 80 10.5 82.5 10.5 Q 80 10.5 80 8 Z"
              fill="#93c5fd"
            />

            {/* Launching Rocket Body */}
            <g transform="translate(86, 17) rotate(42)">
              {/* Rocket Left Wing */}
              <path d="M -3 6 L -8 13 L -3 11 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.6" />
              {/* Rocket Right Wing */}
              <path d="M 3 6 L 8 13 L 3 11 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.6" />
              {/* Rocket Fuselage */}
              <path
                d="M 0 -10 C -5 -2 -5 6 -3 10 L 3 10 C 5 6 5 -2 0 -10 Z"
                fill="url(#rocketBodyGrad)"
                stroke="#e0f2fe"
                strokeWidth="0.8"
                filter="drop-shadow(0 0 4px #00d2ff)"
              />
              {/* Porthole Window */}
              <circle cx="0" cy="-1" r="2.2" fill="#0b192c" stroke="#38bdf8" strokeWidth="0.8" />
              <circle cx="-0.6" cy="-1.8" r="0.7" fill="#ffffff" />
            </g>
          </g>
        </svg>
      </div>

      {/* High-Definition Brand Typography 'SKILL PODS' */}
      {showText && (
        <div className="flex items-center tracking-tight font-black text-lg sm:text-xl leading-none">
          {/* 'SKILL' */}
          <span className={`tracking-wider font-extrabold mr-1.5 ${
            theme === 'light' 
              ? 'text-slate-950' 
              : 'text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]'
          }`}>
            SKILL
          </span>

          {/* 'PODS' inside illuminated glowing badge */}
          <div className={`relative inline-flex items-center justify-center px-2 py-0.5 rounded-lg bg-gradient-to-r from-[#00d2ff] via-[#3b82f6] to-[#8b5cf6] p-[1.5px] ${
            theme === 'light' ? 'shadow-xs' : 'shadow-[0_0_14px_rgba(56,189,248,0.5)]'
          }`}>
            <div className={`${theme === 'light' ? 'bg-purple-950' : 'bg-[#08070d]'} px-2 py-0.5 rounded-[6px] flex items-center`}>
              <span className="font-mono font-black text-xs sm:text-sm tracking-wider bg-gradient-to-r from-[#00d2ff] via-[#93c5fd] to-[#c084fc] bg-clip-text text-transparent">
                PODS
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
