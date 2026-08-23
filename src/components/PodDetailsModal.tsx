import React from 'react';
import { X, ExternalLink, GitCommit, CheckCircle2, Cpu, ShieldCheck, Users, Clock, Terminal, Globe } from 'lucide-react';
import { PodData } from '../types';

interface PodDetailsModalProps {
  pod: PodData | null;
  onClose: () => void;
}

export const PodDetailsModal: React.FC<PodDetailsModalProps> = ({ pod, onClose }) => {
  if (!pod) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1b1b1f] border border-[#d0bcff]/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#958ea0] hover:text-white p-1 rounded-full hover:bg-[#2a292e] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-[#a078ff]/15 text-[#d0bcff] font-mono text-xs px-3 py-1 rounded-full font-bold border border-[#d0bcff]/30">
            {pod.name}
          </span>
          <span className="bg-[#10b981]/15 text-[#10b981] font-mono text-xs px-3 py-1 rounded-full border border-[#10b981]/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            Health: {pod.health} ({pod.latency})
          </span>
          <span className="bg-[#ffb869]/15 text-[#ffb869] font-mono text-xs px-3 py-1 rounded-full border border-[#ffb869]/30">
            Stage {pod.stage}: {pod.stageName}
          </span>
        </div>

        <h2 className="font-geist text-2xl sm:text-3xl font-bold text-white mb-1">
          {pod.title}
        </h2>
        <p className="text-sm text-[#ffb869] font-mono mb-6">
          SME Client: {pod.sme}
        </p>

        {/* Sprint Progress Gauge */}
        <div className="bg-[#131317] p-4 rounded-2xl border border-[#494454]/30 mb-6">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-[#cbc3d7]">Sprint Milestones Completed</span>
            <span className="text-[#d0bcff] font-bold">{pod.progress}%</span>
          </div>
          <div className="w-full bg-[#1f1f23] h-3 rounded-full overflow-hidden border border-[#494454]/30">
            <div
              className="bg-gradient-to-r from-[#8b5cf6] to-[#d0bcff] h-full rounded-full transition-all duration-700"
              style={{ width: `${pod.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Pod Roster & Mentor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#131317] p-4 rounded-2xl border border-[#494454]/30">
            <span className="font-mono text-xs uppercase tracking-widest text-[#d0bcff] block mb-2">
              Industry Mentor
            </span>
            <span className="text-sm text-white font-medium block">
              {pod.mentor}
            </span>
            <span className="text-xs text-[#10b981] font-mono mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Weekly Architectural Sign-off Active
            </span>
          </div>

          <div className="bg-[#131317] p-4 rounded-2xl border border-[#494454]/30">
            <span className="font-mono text-xs uppercase tracking-widest text-[#d0bcff] block mb-2">
              Student Builder Pod ({pod.students.length} Members)
            </span>
            <div className="space-y-1">
              {pod.students.map((student, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-white font-medium">{student.name}</span>
                  <span className="text-[#958ea0] font-mono">{student.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#958ea0] block mb-2">
            Engineered Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {pod.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-[#131317] text-[#d0bcff] text-xs font-mono px-3 py-1.5 rounded-lg border border-[#494454]/40"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Commit Log */}
        <div className="bg-[#131317] p-4 rounded-2xl border border-[#494454]/30 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#958ea0] flex items-center gap-1.5">
              <GitCommit className="w-4 h-4 text-[#d0bcff]" />
              Latest Mainline Commit
            </span>
            <span className="text-[10px] font-mono text-[#10b981]">CI/CD Passing</span>
          </div>
          <code className="text-xs text-white block bg-[#1b1b1f] p-3 rounded-lg border border-[#494454]/20 font-mono">
            {pod.lastCommit}
          </code>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#494454]/30">
          <div className="text-xs font-mono text-[#958ea0]">
            Last Synced: Just now
          </div>
          <div className="flex gap-3">
            {pod.demoUrl && (
              <a
                href={pod.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#d0bcff] text-[#3c0091] font-bold px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-1.5 glow-bloom cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Live Staging Demo</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="bg-[#2a292e] text-white px-5 py-2.5 rounded-full font-mono text-xs uppercase hover:bg-[#353439] transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
