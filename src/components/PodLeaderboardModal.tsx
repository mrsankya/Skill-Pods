import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Award, 
  Users, 
  TrendingUp,
  FlaskConical,
  CheckCircle2
} from 'lucide-react';

interface PodLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PodLeaderboardModal: React.FC<PodLeaderboardModalProps> = ({
  isOpen,
  onClose
}) => {
  const leaderboard = [
    {
      rank: 1,
      podName: "Pod Apex-2",
      college: "National Institute of Technology",
      project: "AI Invoice & Ledger Auto-Reconciliation",
      mentor: "Sarah Chen (Cloudflare)",
      xp: "12,450 XP",
      streak: "14 Days",
      badge: "🥇 National #1 Rank",
      milestonesPassed: "3/3 Sprints",
      stipendEarned: "₹25,000"
    },
    {
      rank: 2,
      podName: "Vision-X",
      college: "BITS Pilani",
      project: "Mobile Camera Crop Disease Inference",
      mentor: "Devendra Rao (Swiggy)",
      xp: "11,200 XP",
      streak: "11 Days",
      badge: "🥈 Top AI Sprint",
      milestonesPassed: "2/3 Sprints",
      stipendEarned: "₹20,000"
    },
    {
      rank: 3,
      podName: "Pod Nova-7",
      college: "IIIT Hyderabad",
      project: "FinTech Micro-Escrow Payments",
      mentor: "Priya Sharma (Razorpay)",
      xp: "9,850 XP",
      streak: "9 Days",
      badge: "🥉 Zero Bug Deploy",
      milestonesPassed: "2/2 Sprints",
      stipendEarned: "₹18,000"
    },
    {
      rank: 4,
      podName: "Kestrel Fleet",
      college: "IIT Bombay",
      project: "Driver Spatial Telemetry & GeoJSON Buffer",
      mentor: "Marcus Vance (Datadog)",
      xp: "8,900 XP",
      streak: "7 Days",
      badge: "⭐ Rising Star",
      milestonesPassed: "2/4 Sprints",
      stipendEarned: "₹15,000"
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0e0c18] border border-purple-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.3)] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#171326] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-base">National Skill Pods Leaderboard</h3>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-amber-400" />
                    <span>🧪 IN TESTING</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">Live National XP Ranking & Sprint Velocity across 40+ Universities</p>
              </div>
            </div>

            <button onClick={onClose} className="text-slate-400 hover:text-white text-xl p-1 cursor-pointer">
              ✕
            </button>
          </div>

          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            {leaderboard.map(pod => (
              <div 
                key={pod.rank}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  pod.rank === 1 
                    ? 'bg-gradient-to-r from-purple-950/60 to-amber-950/40 border-amber-500/50 shadow-lg' 
                    : 'bg-[#151222] border-white/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm font-mono ${
                    pod.rank === 1 ? 'bg-amber-500 text-slate-900 shadow-md' :
                    pod.rank === 2 ? 'bg-slate-300 text-slate-900' :
                    pod.rank === 3 ? 'bg-amber-800 text-white' : 'bg-white/10 text-slate-300'
                  }`}>
                    #{pod.rank}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-white font-bold text-sm sm:text-base">{pod.podName}</h4>
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
                        {pod.badge}
                      </span>
                    </div>
                    <p className="text-xs text-purple-200">{pod.project} &bull; <span className="text-slate-400">{pod.college}</span></p>
                    <p className="text-[11px] text-slate-400 font-mono">Mentor: {pod.mentor}</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-1 shrink-0">
                  <span className="text-base font-black text-amber-400 font-mono flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                    {pod.xp}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">Earned: {pod.stipendEarned}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#171326] px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Rankings calculated weekly from GitHub Commits, Mentor Reviews & Escrow Sign-offs</span>
            <button onClick={onClose} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg cursor-pointer">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
