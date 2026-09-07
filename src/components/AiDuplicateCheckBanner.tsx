import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Sparkles, CheckCircle2, ArrowRight, Layers, ThumbsUp } from 'lucide-react';

export interface DuplicateMatchResult {
  similarityScore: number;
  existingTicketNo: string;
  existingTitle: string;
  district: string;
  assignedPod?: string;
  existingId: string;
}

interface AiDuplicateCheckBannerProps {
  match: DuplicateMatchResult | null;
  onCorroborateExisting: (existingId: string, ticketNo: string) => void;
  onProceedAnyway: () => void;
}

export const AiDuplicateCheckBanner: React.FC<AiDuplicateCheckBannerProps> = ({
  match,
  onCorroborateExisting,
  onProceedAnyway
}) => {
  if (!match || match.similarityScore < 60) return null;

  const isHighMatch = match.similarityScore >= 80;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`p-3.5 sm:p-4 rounded-2xl border transition-all space-y-2.5 ${
        isHighMatch
          ? 'bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-indigo-500/15 border-amber-500/40 text-amber-200'
          : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5 flex-wrap">
              <span>AI Semantic Deduplication Engine:</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-[#1e1b4b] font-black text-[10px] font-mono">
                {match.similarityScore}% Overlap
              </span>
            </div>
            <p className="text-[11px] text-[#cbc3d7] mt-0.5">
              Similar problem already active in {match.district}. Merging corroborates community urgency.
            </p>
          </div>
        </div>
      </div>

      <div className="p-2.5 rounded-xl bg-[#0f0d18]/80 border border-white/10 text-xs space-y-1">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-indigo-300 font-bold">{match.existingTicketNo}</span>
          <span className="text-emerald-400">{match.assignedPod || 'Pod In Formation'}</span>
        </div>
        <div className="text-white font-medium line-clamp-1">{match.existingTitle}</div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={() => onCorroborateExisting(match.existingId, match.existingTicketNo)}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-[#08070d] font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>Corroborate &amp; Upvote This Issue</span>
        </button>

        <button
          type="button"
          onClick={onProceedAnyway}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white font-mono text-xs transition-colors cursor-pointer text-center"
        >
          Submit as Distinct Issue &rarr;
        </button>
      </div>
    </motion.div>
  );
};
