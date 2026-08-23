import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  GraduationCap, 
  Building2, 
  Sparkles, 
  School, 
  ArrowRight, 
  X,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { UserRole } from '../types';

interface RoleSelectionModalProps {
  isOpen: boolean;
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
  onConfirmRole: (role: UserRole) => void;
  onClose: () => void;
  userEmail?: string;
}

interface RoleOption {
  id: UserRole;
  title: string;
  badge: string;
  emoji: string;
  icon: React.ElementType;
  description: string;
  tagline: string;
  glowColor: string;
  borderActive: string;
}

const roleOptions: RoleOption[] = [
  {
    id: 'student',
    title: 'STUDENT',
    badge: 'Builder & Innovator',
    emoji: '🎓',
    icon: GraduationCap,
    description: 'Build real products, manage your pod and grow your skills.',
    tagline: 'Get assigned to active SME projects with industry mentors.',
    glowColor: 'from-[#38bdf8]/20 via-[#6366f1]/20 to-transparent',
    borderActive: 'border-[#38bdf8] shadow-[0_0_30px_rgba(56,189,248,0.35)]'
  },
  {
    id: 'sme',
    title: 'SME',
    badge: 'Business Problem Owner',
    emoji: '🏢',
    icon: Building2,
    description: 'Submit real business problems and track your product.',
    tagline: 'Get high-velocity AI/SaaS products shipped by mentored student pods.',
    glowColor: 'from-[#a87ffb]/20 via-[#ec4899]/20 to-transparent',
    borderActive: 'border-[#a87ffb] shadow-[0_0_30px_rgba(168,127,251,0.35)]'
  },
  {
    id: 'mentor',
    title: 'MENTOR',
    badge: 'Tech & Product Lead',
    emoji: '👨‍🏫',
    icon: Sparkles,
    description: 'Guide student pods, review and validate products.',
    tagline: 'Review architectures, code quality, and lead pods to production.',
    glowColor: 'from-[#10b981]/20 via-[#3b82f6]/20 to-transparent',
    borderActive: 'border-[#10b981] shadow-[0_0_30px_rgba(16,185,129,0.35)]'
  },
  {
    id: 'college',
    title: 'COLLEGE',
    badge: 'Institutional SPOC',
    emoji: '🏫',
    icon: School,
    description: 'Track students, projects and institutional outcomes.',
    tagline: 'Measure student placement velocity, hackathon pods and IP creation.',
    glowColor: 'from-[#f59e0b]/20 via-[#ef4444]/20 to-transparent',
    borderActive: 'border-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.35)]'
  }
];

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  selectedRole,
  onSelectRole,
  onConfirmRole,
  onClose,
  userEmail
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#06050b]/85 backdrop-blur-xl transition-opacity"
        />

        {/* Ambient background bloom */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b5cf6]/15 blur-[140px] pointer-events-none rounded-full" />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#120e24]/90 backdrop-blur-2xl border border-[#a855f7]/50 rounded-[28px] p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.35)] z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#958ea0] hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#a855f7]/20 border border-[#a855f7]/40 text-[#d8b4fe] text-xs font-mono mb-3 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-[#c084fc]" />
              <span>Authentication Verified</span>
            </div>
            
            <h3 className="font-geist text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 flex items-center justify-center gap-2">
              <span>Welcome to Skill Pods</span>
              <span className="inline-block animate-bounce text-2xl">👋</span>
            </h3>
            
            <p className="text-sm sm:text-base text-[#b2abc0]">
              How do you want to enter? <span className="text-[#d8b4fe] font-medium">Choose your workspace</span>
            </p>
            {userEmail && (
              <p className="text-xs font-mono text-[#827a8f] mt-1">
                Signed in as: <span className="text-white/90">{userEmail}</span>
              </p>
            )}
          </div>

          {/* 4 Role Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
            {roleOptions.map((role) => {
              const isSelected = selectedRole === role.id;

              return (
                <motion.div
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectRole(role.id)}
                  className={`relative rounded-2xl p-5 cursor-pointer text-left transition-all duration-300 flex flex-col justify-between min-h-[140px] backdrop-blur-xl ${
                    isSelected 
                      ? 'bg-[#221844]/80 border-2 border-[#c084fc] shadow-[0_0_30px_rgba(168,85,247,0.45)]' 
                      : 'bg-[#18132e]/70 border border-[#a855f7]/30 hover:border-[#c084fc]/60 hover:bg-[#20183d]/80 shadow-md'
                  }`}
                >
                  {/* Subtle top corner gradient highlight */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${role.glowColor} rounded-tr-2xl pointer-events-none opacity-40`} />

                  {/* Header with Title and Emoji/Icon */}
                  <div className="flex items-start justify-between gap-3 mb-2 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{role.emoji}</span>
                      <div>
                        <div className="font-geist font-bold text-sm text-white tracking-wide flex items-center gap-1.5">
                          <span>{role.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#a19ba9] tracking-wider uppercase">
                          {role.badge}
                        </span>
                      </div>
                    </div>

                    {/* Radio/Check Indicator */}
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected 
                        ? 'bg-[#c084fc] border-[#c084fc] text-[#0f0c1b]' 
                        : 'border-white/20 bg-black/30 text-transparent'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3] fill-current" />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#cbc3d7] leading-relaxed relative z-10 mb-1">
                    {role.description}
                  </p>

                  <p className="text-[10px] text-[#7a7486] italic relative z-10">
                    {role.tagline}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
            <div className="text-xs text-[#8c8599] flex items-center gap-1.5 text-center sm:text-left">
              <ShieldCheck className="w-4 h-4 text-[#a87ffb]" />
              <span>You can switch workspaces at any time from your profile.</span>
            </div>

            <motion.button
              whileHover={selectedRole ? { scale: 1.04 } : {}}
              whileTap={selectedRole ? { scale: 0.97 } : {}}
              disabled={!selectedRole}
              onClick={() => selectedRole && onConfirmRole(selectedRole)}
              className={`w-full sm:w-auto px-7 py-3 rounded-full font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                selectedRole
                  ? 'bg-gradient-to-r from-[#d0bcff] via-[#a87ffb] to-[#c084fc] text-[#1c004d] shadow-[0_0_30px_rgba(168,127,251,0.5)]'
                  : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/5'
              }`}
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
