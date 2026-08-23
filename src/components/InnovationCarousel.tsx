import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Sparkles, 
  MessageSquareText, 
  Users, 
  UserCheck, 
  Rocket, 
  CheckCircle2, 
  Zap, 
  Shield, 
  Flame, 
  Cpu, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';

// Local uploaded images & curated assets
import studentTeamImg from '../assets/images/regenerated_image_1787295383504.jpg';
import founderImg from '../assets/images/regenerated_image_1787295382394.jpg';

const studentCelebrationImg = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80';
const mentorTechImg = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80';
const hardwareLabImg = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80';
const deepCodeImg = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80';

interface InnovationCarouselProps {
  onOpenAppointmentModal: () => void;
}

export const InnovationCarousel: React.FC<InnovationCarouselProps> = ({ onOpenAppointmentModal }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [flowOffset, setFlowOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Continuous orbital conveyor-belt animation loop
  React.useEffect(() => {
    const animateFlow = (time: number) => {
      if (lastTimeRef.current !== null && !isPaused && hoveredCard === null) {
        const delta = time - lastTimeRef.current;
        // Complete full orbit every ~32 seconds for a calm, premium gliding effect
        const speed = 1 / 32000;
        setFlowOffset(prev => (prev + delta * speed) % 1);
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animateFlow);
    };

    animFrameRef.current = requestAnimationFrame(animateFlow);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, hoveredCard]);

  // Smooth scroll tracking for parabolic expansion effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const arcScale = useTransform(smoothProgress, [0, 1], [0.85, 1]);
  const arcOpacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  // Base list of innovation items along the conveyor arc
  const arcCards = [
    {
      id: 0,
      type: 'image',
      src: deepCodeImg,
      label: 'Deep Code'
    },
    {
      id: 1,
      type: 'image',
      src: studentCelebrationImg,
      label: 'Student Builder'
    },
    {
      id: 2,
      type: 'image',
      src: mentorTechImg,
      label: 'Tech Lead'
    },
    {
      id: 3,
      type: 'image',
      src: founderImg,
      label: 'SME Founder'
    },
    {
      id: 4,
      type: 'icon',
      icon: MessageSquareText,
      label: 'SME Problem',
      color: '#d0bcff'
    },
    {
      id: 5,
      type: 'portrait',
      src: studentTeamImg,
      label: 'Student Pod',
      color: '#a87ffb'
    },
    {
      id: 6,
      type: 'icon',
      icon: UserCheck,
      label: 'Mentor',
      color: '#d0bcff'
    },
    {
      id: 7,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&auto=format&fit=crop&q=80',
      label: 'Solar & IoT'
    },
    {
      id: 8,
      type: 'image',
      src: hardwareLabImg,
      label: 'Hardware Lab'
    },
    {
      id: 9,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&auto=format&fit=crop&q=80',
      label: 'Product Live'
    },
    {
      id: 10,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      label: 'Fast Delivery'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 px-4 sm:px-6 md:px-10 relative overflow-hidden" 
      id="innovation-section"
    >
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#7c3aed]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1240px] mx-auto relative">
        
        {/* Desktop Curved Arc View (Continuous Semi-Arc Orbital Animation) */}
        <motion.div 
          style={{ scale: arcScale, opacity: arcOpacity }}
          className="relative h-[250px] md:h-[290px] w-full mb-10 hidden sm:block select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Arc Guideline SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 240" fill="none">
            <motion.path 
              d="M 50 160 Q 500 -20 950 160" 
              stroke="rgba(168, 127, 251, 0.3)" 
              strokeWidth="1.5" 
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>

          {arcCards.map((card, index) => {
            const isHovered = hoveredCard === card.id;
            const total = arcCards.length;
            
            // Normalized parameter t along the curve [0, 1] with continuous gliding offset
            const t = ((index / total) + flowOffset) % 1;

            // Parabolic curve formulas:
            // x: horizontal placement from 5% to 95%
            const posX = 5 + t * 90;
            // y: parabolic vertical trajectory peaking at t = 0.5 (y = -5px) and descending at edges (y = 135px)
            const posY = 135 * 4 * Math.pow(t - 0.5, 2) - 5;
            // rotate: tangent tilt along the arch curve (-28 deg to +28 deg)
            const rotDeg = (t - 0.5) * 56;

            // Edge opacity fade in / out for smooth entrance & exit
            let edgeOpacity = 1;
            if (t < 0.05) edgeOpacity = Math.max(0, t / 0.05);
            else if (t > 0.95) edgeOpacity = Math.max(0, (1 - t) / 0.05);

            // Is near center peak (top apex)
            const isNearPeak = Math.abs(t - 0.5) < 0.08;

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  left: `${posX}%`,
                  position: 'absolute',
                  zIndex: isHovered ? 60 : isNearPeak ? 35 : 20,
                  opacity: edgeOpacity,
                  transform: `translate3d(-50%, ${posY}px, 0) rotate(${rotDeg}deg) scale(${isHovered ? 1.25 : isNearPeak ? 1.12 : 1})`,
                  transition: isHovered 
                    ? 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), z-index 0s' 
                    : 'opacity 0.15s ease-out'
                }}
                className="cursor-pointer will-change-transform"
              >
                {/* Icon Card (SME Problem / Mentor) */}
                {card.type === 'icon' && card.icon && (
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#171422] border transition-all flex flex-col items-center justify-center p-2 group ${
                    isNearPeak 
                      ? 'border-[#c084fc] shadow-[0_0_30px_rgba(192,132,252,0.5)]' 
                      : 'border-[#a87ffb]/40 shadow-[0_0_20px_rgba(168,127,251,0.25)] hover:border-[#a87ffb] hover:shadow-[0_0_30px_rgba(168,127,251,0.6)]'
                  }`}>
                    <div className="text-[#d0bcff] mb-1 group-hover:rotate-12 transition-transform duration-300">
                      <card.icon className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="font-mono text-[9px] text-[#cbc3d7] tracking-tight text-center leading-none">
                      {card.label}
                    </span>
                  </div>
                )}

                {/* Featured Portrait Card (Student Pod) */}
                {card.type === 'portrait' && (
                  <div className={`w-18 h-18 md:w-22 md:h-22 rounded-2xl bg-[#1b172a] border-2 transition-all flex flex-col items-center justify-between p-1.5 overflow-hidden group ${
                    isNearPeak 
                      ? 'border-[#d0bcff] shadow-[0_0_40px_rgba(208,188,255,0.65)] ring-2 ring-purple-400/30' 
                      : 'border-[#a87ffb]/60 shadow-[0_0_25px_rgba(168,127,251,0.35)]'
                  }`}>
                    <img 
                      src={card.src} 
                      alt={card.label}
                      className="w-full h-12 md:h-14 object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-mono text-[10px] text-white font-bold tracking-tight text-center leading-none mt-1">
                      {card.label}
                    </span>
                  </div>
                )}

                {/* Image Card Vignette */}
                {card.type === 'image' && (
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#151220] border transition-all overflow-hidden p-1 ${
                    isNearPeak
                      ? 'border-[#d0bcff] shadow-[0_0_25px_rgba(208,188,255,0.5)]'
                      : 'border-white/10 shadow-lg hover:border-[#d0bcff]/60 hover:shadow-[0_0_25px_rgba(208,188,255,0.4)]'
                  }`}>
                    <img 
                      src={card.src} 
                      alt={card.label}
                      className="w-full h-full object-cover rounded-xl grayscale-[15%] hover:grayscale-0 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile Horizontal Carousel (Visible on small screens) */}
        <div className="flex sm:hidden overflow-x-auto gap-3 pb-6 px-2 scrollbar-none mb-8">
          {arcCards.map((card, idx) => (
            <motion.div 
              key={card.id} 
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
            >
              {card.type === 'icon' && card.icon && (
                <div className="w-16 h-16 rounded-2xl bg-[#171422] border border-[#a87ffb]/40 flex flex-col items-center justify-center p-2">
                  <card.icon className="w-5 h-5 text-[#d0bcff] mb-1" />
                  <span className="font-mono text-[9px] text-[#cbc3d7]">{card.label}</span>
                </div>
              )}
              {card.type === 'portrait' && (
                <div className="w-18 h-18 rounded-2xl bg-[#1b172a] border border-[#d0bcff] flex flex-col items-center justify-center p-1">
                  <img src={card.src} alt={card.label} className="w-12 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                  <span className="font-mono text-[9px] text-white mt-1">{card.label}</span>
                </div>
              )}
              {card.type === 'image' && (
                <div className="w-14 h-14 rounded-2xl bg-[#151220] border border-white/10 overflow-hidden">
                  <img src={card.src} alt={card.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Centered Content Below The Curved Arc with Scroll Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-center max-w-xl mx-auto flex flex-col items-center relative z-20"
        >
          {/* Features Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="inline-flex items-center gap-1.5 bg-[#1f1a30] text-[#d0bcff] px-3.5 py-1 rounded-full border border-[#a87ffb]/40 text-xs font-mono mb-4 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#a87ffb] animate-ping" />
            <span>Features</span>
          </motion.div>

          {/* Headline: Packed with Innovation. */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="font-geist text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3"
          >
            Packed with Innovation.
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="text-sm sm:text-base text-[#a19ba9] leading-relaxed mb-8"
          >
            We unite an entire problem to nurture products.<br />
            Build your superpowers.
          </motion.p>

          {/* Refined Glowing Button: Book an appointment */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.65, duration: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(168,127,251,0.5)" }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenAppointmentModal}
            className="glow-pill-secondary text-white font-mono text-xs uppercase tracking-widest px-7 py-3.5 rounded-full border border-[#a87ffb]/60 hover:border-[#d0bcff] hover:text-[#d0bcff] transition-all cursor-pointer shadow-[0_0_25px_rgba(168,127,251,0.3)]"
            id="btn-book-appointment"
          >
            Book an appointment
          </motion.button>

        </motion.div>

      </div>

    </section>
  );
};
