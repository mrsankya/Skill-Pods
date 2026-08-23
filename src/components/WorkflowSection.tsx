import React from 'react';
import { motion } from 'motion/react';
import { 
  FileSearch, 
  Users, 
  ShieldCheck, 
  Rocket,
  ChevronRight
} from 'lucide-react';
import { PodData } from '../types';

interface WorkflowSectionProps {
  pods?: PodData[];
  onSelectPod?: (pod: PodData) => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = () => {
  const steps = [
    {
      id: "01",
      numberColor: "text-[#38bdf8]",
      title: "REAL BUSINESS PROBLEM",
      description: "A company or startup posts a real-world software challenge that needs solving.",
      icon: FileSearch,
      iconColor: "text-[#38bdf8]",
      borderColor: "border-[#38bdf8]/30",
      glowColor: "shadow-[0_0_20px_rgba(56,189,248,0.2)]",
      bgGlow: "bg-[#0b192c]/80",
    },
    {
      id: "02",
      numberColor: "text-[#a855f7]",
      title: "STUDENT BUILD TEAM",
      description: "A team of 3 complementary students is assembled to build the application.",
      icon: Users,
      iconColor: "text-[#c084fc]",
      borderColor: "border-[#a855f7]/30",
      glowColor: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
      bgGlow: "bg-[#1c122c]/80",
    },
    {
      id: "03",
      numberColor: "text-[#10b981]",
      title: "EXPERT MENTORSHIP",
      description: "An experienced tech engineer reviews code quality, architecture, and tests.",
      icon: ShieldCheck,
      iconColor: "text-[#10b981]",
      borderColor: "border-[#10b981]/30",
      glowColor: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
      bgGlow: "bg-[#0a231b]/80",
    },
    {
      id: "04",
      numberColor: "text-[#f97316]",
      title: "WORKING PRODUCT & STIPEND",
      description: "The solution goes live in production, students get hired and receive verified proof of work.",
      icon: Rocket,
      iconColor: "text-[#fb923c]",
      borderColor: "border-[#f97316]/30",
      glowColor: "shadow-[0_0_20px_rgba(249,115,22,0.2)]",
      bgGlow: "bg-[#28150c]/80",
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-10 relative overflow-hidden" id="workflow-section">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] bg-[#7c3aed]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* Section Heading matching image: How Skill Pods Works */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="font-geist text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            How Skill Pods Works
          </h2>
          <p className="text-sm sm:text-base text-[#a19ba9] font-normal">
            From real-world problem to real-world product.
          </p>
        </motion.div>

        {/* 4 Connected Process Cards Row with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3 items-stretch relative">
          
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <motion.div 
                key={step.id} 
                className="relative flex items-center"
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ 
                  duration: 0.55, 
                  delay: index * 0.12, 
                  type: 'spring', 
                  bounce: 0.25 
                }}
              >
                {/* Process Card */}
                <motion.div 
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full h-full rounded-2xl bg-[#0f0c1b]/90 border ${step.borderColor} p-5 sm:p-6 flex items-center justify-between gap-4 transition-all duration-300 ${step.glowColor} group`}
                >
                  
                  {/* Left info column */}
                  <div className="flex-1 pr-1">
                    {/* Number: 01, 02, 03, 04 */}
                    <div className={`font-mono text-base sm:text-lg font-bold ${step.numberColor} mb-1 tracking-wider`}>
                      {step.id}
                    </div>

                    {/* Title */}
                    <h3 className="font-geist text-xs sm:text-sm font-bold text-white tracking-wide uppercase mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] sm:text-xs text-[#a19ba9] leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Right circular glowing icon container */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${step.bgGlow} border ${step.borderColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${step.glowColor}`}>
                    <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${step.iconColor}`} />
                  </div>

                </motion.div>

                {/* Connecting Arrow between cards (hidden on mobile, visible on desktop) */}
                {!isLast && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 0.8, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: index * 0.12 + 0.2, duration: 0.4 }}
                    className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 items-center pointer-events-none text-[#7c3aed]/70"
                  >
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="overflow-visible">
                      <path 
                        d="M0 6 H14 M11 2 L16 6 L11 10" 
                        stroke="#a87ffb" 
                        strokeWidth="1.5" 
                        strokeDasharray="2 2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.8"
                      />
                    </svg>
                  </motion.div>
                )}

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
};
