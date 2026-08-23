import React, { useMemo } from 'react';

interface Sparkle {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number; // px
  opacity: number;
  duration: number; // seconds
  delay: number; // seconds
  type: 'star' | 'dot' | 'cross';
  color: string;
  glow: string;
}

export const BackgroundSparkles: React.FC = () => {
  // Generate deterministic randomized background sparkles across the entire viewport/page
  const sparkles: Sparkle[] = useMemo(() => {
    const list: Sparkle[] = [];
    const colors = [
      { color: '#d0bcff', glow: 'rgba(208, 188, 255, 0.8)' },
      { color: '#c084fc', glow: 'rgba(192, 132, 252, 0.75)' },
      { color: '#a855f7', glow: 'rgba(168, 85, 247, 0.7)' },
      { color: '#e9d5ff', glow: 'rgba(233, 213, 255, 0.85)' },
      { color: '#bbf7d0', glow: 'rgba(168, 127, 251, 0.6)' },
      { color: '#e0e7ff', glow: 'rgba(224, 231, 255, 0.75)' },
    ];

    // Create 45 subtle sparkles distributed nicely
    for (let i = 0; i < 48; i++) {
      const palette = colors[i % colors.length];
      const typeChoice = i % 4 === 0 ? 'star' : i % 4 === 1 ? 'cross' : 'dot';
      const size = typeChoice === 'star' ? (i % 3 === 0 ? 10 : 7) : typeChoice === 'cross' ? 8 : (i % 2 === 0 ? 3 : 2);

      list.push({
        id: i,
        x: (i * 2.1 + (i % 7) * 9.3 + 3) % 96 + 2, // 2% to 98%
        y: (i * 3.7 + (i % 5) * 17.1 + 4) % 96 + 2, // 2% to 98%
        size,
        opacity: 0.25 + ((i % 5) * 0.12),
        duration: 3 + ((i * 1.3) % 4.5), // 3s to 7.5s
        delay: ((i * 0.7) % 5), // 0s to 5s
        type: typeChoice,
        color: palette.color,
        glow: palette.glow,
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep ambient purple background blobs */}
      <div className="absolute top-[8%] left-[15%] w-[450px] h-[450px] bg-[#9333ea]/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute top-[45%] right-[10%] w-[550px] h-[550px] bg-[#7c3aed]/10 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[75%] left-[25%] w-[500px] h-[500px] bg-[#a855f7]/8 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '4s' }} />

      {/* Sparkles list */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            opacity: s.opacity,
          }}
        >
          {s.type === 'star' && (
            <svg
              viewBox="0 0 24 24"
              width={s.size}
              height={s.size}
              style={{
                filter: `drop-shadow(0 0 ${s.size * 0.8}px ${s.glow})`,
                fill: s.color,
              }}
            >
              <path d="M 12 0 Q 12 12 0 12 Q 12 12 12 24 Q 12 12 24 12 Q 12 12 12 0 Z" />
            </svg>
          )}

          {s.type === 'cross' && (
            <svg
              viewBox="0 0 20 20"
              width={s.size}
              height={s.size}
              style={{
                filter: `drop-shadow(0 0 ${s.size * 0.7}px ${s.glow})`,
              }}
            >
              <line x1="10" y1="2" x2="10" y2="18" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="2" y1="10" x2="18" y2="10" stroke={s.color} strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="10" cy="10" r="1.5" fill={s.color} />
            </svg>
          )}

          {s.type === 'dot' && (
            <div
              className="rounded-full"
              style={{
                width: `${s.size}px`,
                height: `${s.size}px`,
                backgroundColor: s.color,
                boxShadow: `0 0 ${s.size * 2.5}px ${s.glow}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
