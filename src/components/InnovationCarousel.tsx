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
  const sectionRef = useRef<HTMLDivElement>(null);

  // Smooth scroll tracking for parabolic expansion effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  const arcScale = useTransform(smoothProgress, [0, 1], [0.85, 1]);
  const arcOpacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  // Cards positioned along the parabolic / semi-circular arc
  // Coordinates (x in %, y in px) to form a true parabolic arch
  const arcCards = [
    {
      id: 0,
      type: 'image',
      src: deepCodeImg,
      label: 'Deep Code',
      x: 6,
      y: 130,
      rotate: -28
    },
    {
      id: 1,
      type: 'image',
      // Happy celebrating female coder with glasses and laptop
      src: studentCelebrationImg,
      label: 'Student Builder',
      x: 14,
      y: 80,
      rotate: -20
    },
    {
      id: 2,
      type: 'image',
      src: mentorTechImg,
      label: 'Tech Lead',
      x: 23,
      y: 40,
      rotate: -12
    },
    {
      id: 3,
      type: 'image',
      src: founderImg,
      label: 'SME Founder',
      x: 32,
      y: 15,
      rotate: -6
    },
    {
      id: 4,
      type: 'icon',
      icon: MessageSquareText,
      label: 'SME Problem',
      color: '#d0bcff',
      x: 41,
      y: 0,
      rotate: -2
    },
    {
      id: 5,
      type: 'portrait',
      src: studentTeamImg,
      label: 'Student Pod',
      color: '#a87ffb',
      x: 50,
      y: -5,
      rotate: 0,
      featured: true
    },
    {
      id: 6,
      type: 'icon',
      icon: UserCheck,
      label: 'Mentor',
      color: '#d0bcff',
      x: 59,
      y: 0,
      rotate: 2
    },
    {
      id: 7,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&auto=format&fit=crop&q=80',
      label: 'Solar & IoT',
      x: 68,
      y: 15,
      rotate: 6
    },
    {
      id: 8,
      type: 'image',
      src: hardwareLabImg,
      label: 'Hardware Lab',
      x: 77,
      y: 40,
      rotate: 12
    },
    {
      id: 9,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&auto=format&fit=crop&q=80',
      label: 'Product Live',
      x: 86,
      y: 80,
      rotate: 20
    },
    {
      id: 10,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      label: 'Fast Delivery',
      x: 94,
      y: 130,
      rotate: 28
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
        
        {/* Desktop Curved Arc View (Visible on md and up) */}
        <motion.div 
          style={{ scale: arcScale, opacity: arcOpacity }}
          className="relative h-[240px] md:h-[280px] w-full mb-10 hidden sm:block"
        >
          {/* Subtle Arc Guideline SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 240" fill="none">
            <motion.path 
              d="M 50 160 Q 500 -20 950 160" 
              stroke="rgba(168, 127, 251, 0.25)" 
              strokeWidth="1.5" 
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>

          {arcCards.map((card, index) => {
            const isHovered = hoveredCard === card.id;
            // Calculate delay for staggered wave from left to right
            const staggerDelay = 0.08 * index;

            return (
              <motion.div
                key={card.id}
                initial={{ 
                  opacity: 0, 
                  scale: 0.3, 
                  y: card.y + 70,
                  rotate: card.rotate - 20
                }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: card.y,
                  rotate: card.rotate
                }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ 
                  duration: 0.65, 
                  delay: staggerDelay, 
                  type: 'spring', 
                  bounce: 0.35 
                }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  left: `${card.x}%`,
                  position: 'absolute',
                  zIndex: card.featured ? 30 : isHovered ? 50 : 20,
                }}
                whileHover={{
                  scale: 1.25,
                  y: card.y - 12,
                  rotate: 0,
                  transition: { duration: 0.25 }
                }}
                className="cursor-pointer -translate-x-1/2"
              >
                {/* Icon Card (SME Problem / Mentor) */}
                {card.type === 'icon' && card.icon && (
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#171422] border border-[#a87ffb]/40 shadow-[0_0_20px_rgba(168,127,251,0.25)] flex flex-col items-center justify-center p-2 group hover:border-[#a87ffb] hover:shadow-[0_0_30px_rgba(168,127,251,0.6)] transition-all">
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
                  <div className="w-18 h-18 md:w-22 md:h-22 rounded-2xl bg-[#1b172a] border-2 border-[#d0bcff] shadow-[0_0_35px_rgba(208,188,255,0.45)] flex flex-col items-center justify-between p-1.5 overflow-hidden group-hover:shadow-[0_0_45px_rgba(208,188,255,0.7)] transition-all">
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
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#151220] border border-white/10 shadow-lg overflow-hidden p-1 hover:border-[#d0bcff]/60 hover:shadow-[0_0_25px_rgba(208,188,255,0.4)] transition-all">
                    <img 
                      src={card.src} 
                      alt={card.label}
                      className="w-full h-full object-cover rounded-xl grayscale-[20%] hover:grayscale-0 transition-all"
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
