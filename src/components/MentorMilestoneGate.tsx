import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Lock,
  Unlock,
  GitPullRequest,
  Check,
  X,
  FileCode,
  Terminal,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  Flame,
  Zap,
  Building
} from 'lucide-react';
import { MilestoneGateItem } from '../types';

interface MentorMilestoneGateProps {
  userEmail: string;
}

export const MentorMilestoneGate: React.FC<MentorMilestoneGateProps> = ({
  userEmail
}) => {
  const [gates, setGates] = useState<MilestoneGateItem[]>([
    {
      id: 'gate-101',
      podId: 'pod-101',
      podName: 'Pod Apex-2',
      projectTitle: 'AI Invoice & Ledger Auto-Reconciliation',
      sprintNumber: 3,
      milestoneTitle: 'Stage 3 -> Stage 4 Gate: OCR Accuracy & Idempotency Sign-off',
      currentStage: 'Stage 3: Prototype & MVP',
      nextStage: 'Stage 4: Testing & Iteration',
      status: 'APPROVED',
      deliverables: [
        'OCR Extraction pipeline with 99.2% confidence on logistics manifests',
        'PostgreSQL schema migration with pgvector ledger balancing tables',
        'Cypress E2E stress test suite with 94.2% test coverage'
      ],
      testCoverage: '94.2%',
      ciCdPassing: true,
      mentorNotes: 'Architecture review passed. Webhook deduplication validated under network partition tests. Approved for Stage 4 live testing.',
      submittedAt: 'Yesterday at 4:30 PM',
      unlockedAt: 'Today at 10:15 AM'
    },
    {
      id: 'gate-102',
      podId: 'pod-102',
      podName: 'Pod Nova-7',
      projectTitle: 'Cold Chain Telemetry & Sensor Mesh',
      sprintNumber: 4,
      milestoneTitle: 'Stage 4 -> Stage 5 Gate: Production Load Testing & Failover Sign-off',
      currentStage: 'Stage 4: Testing & Iteration',
      nextStage: 'Stage 5: Launch & Scale',
      status: 'PENDING_REVIEW',
      deliverables: [
        'TimescaleDB data retention policy and compression benchmarks (sub-40ms queries)',
        'SMS escalation gateway with Twilio LTE failover when primary link drops',
        'Security audit for MQTT broker TLS certificates'
      ],
      testCoverage: '91.8%',
      ciCdPassing: true,
      mentorNotes: 'Awaiting final 12,000 req/sec stress test report before unlocking Production Launch.',
      submittedAt: 'Today at 9:00 AM'
    },
    {
      id: 'gate-103',
      podId: 'pod-104',
      podName: 'Pod Forge-3',
      projectTitle: 'Eco Retail Packaging & Carbon Footprint Audit',
      sprintNumber: 2,
      milestoneTitle: 'Stage 2 -> Stage 3 Gate: Scope 3 Emission Calculation Verification',
      currentStage: 'Stage 2: Concept & Design',
      nextStage: 'Stage 3: Prototype & MVP',
      status: 'CHANGES_REQUESTED',
      deliverables: [
        'GHG Protocol aligned emission calculation formula documentation',
        'Supabase entity-relationship diagram with Row Level Security (RLS) rules',
        'Figma wireframe clickthrough approval from SME client'
      ],
      testCoverage: '82.0%',
      ciCdPassing: false,
      mentorNotes: 'Scope 3 freight emission factor constants need update to IPCC 2024 standards before MVP build.',
      changeRequests: [
        'Update diesel truck emission factor to 2.68 kg CO2/liter',
        'Add unit test suite for multi-tier corrugated box weights'
      ],
      submittedAt: '2 days ago'
    }
  ]);

  const [selectedGateId, setSelectedGateId] = useState<string>('gate-102');
  const [showNotesModal, setShowNotesModal] = useState<boolean>(false);
  const [notesAction, setNotesAction] = useState<'Approve' | 'Changes'>('Approve');
  const [mentorInputNotes, setMentorInputNotes] = useState<string>('');

  const selectedGate = gates.find(g => g.id === selectedGateId) || gates[0];

  const handleApproveGate = (gateId: string) => {
    setGates(prev => prev.map(g => {
      if (g.id === gateId) {
        return {
          ...g,
          status: 'APPROVED',
          mentorNotes: mentorInputNotes || 'Mentor approved all deliverables and test results. Next sprint stage unlocked.',
          unlockedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return g;
    }));
    setShowNotesModal(false);
    setMentorInputNotes('');
  };

  const handleRequestChanges = (gateId: string) => {
    setGates(prev => prev.map(g => {
      if (g.id === gateId) {
        return {
          ...g,
          status: 'CHANGES_REQUESTED',
          mentorNotes: mentorInputNotes || 'Revisions required before proceeding to next sprint stage.',
          changeRequests: [mentorInputNotes || 'Resolve test coverage blockers.']
        };
      }
      return g;
    }));
    setShowNotesModal(false);
    setMentorInputNotes('');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-purple-700" />
              <span>Mentor Stage Gating & Quality Control Gate</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Sprint Milestone Gates & Architecture Approval
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              Skill Pods cannot advance to the next delivery stage without explicit mentor sign-off. Enforce production-level engineering standards, code coverage, and security rigor.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-purple-200/80 shadow-xs flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#261543]">Enforce Sprint Gating</div>
              <div className="text-2xs text-[#5c4780]">Pods blocked from deploying without mentor sign-off</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Gate Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Gate List (4 cols) */}
        <div className="lg:col-span-4 space-y-3.5">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#5c4780]">
            Active Sprint Gates ({gates.length})
          </h3>

          {gates.map(gate => {
            const isSelected = gate.id === selectedGate.id;
            return (
              <motion.div
                key={gate.id}
                onClick={() => setSelectedGateId(gate.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-5 rounded-3xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-white border-purple-600 shadow-md ring-2 ring-purple-600/20'
                    : 'bg-white/70 hover:bg-white border-purple-100 shadow-2xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-extrabold uppercase text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                      {gate.podName}
                    </span>
                    <span className={`text-2xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      gate.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : gate.status === 'CHANGES_REQUESTED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-purple-100 text-purple-950 font-black'
                    }`}>
                      {gate.status === 'APPROVED' ? <Unlock className="w-3 h-3 text-emerald-600" /> : <Lock className="w-3 h-3 text-purple-700" />}
                      <span>{gate.status === 'APPROVED' ? 'Stage Unlocked ✓' : gate.status === 'CHANGES_REQUESTED' ? 'Blocked' : 'Review Required'}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-[#261543] leading-snug">{gate.projectTitle}</h4>
                  <p className="text-xs text-[#5c4780] font-medium">{gate.milestoneTitle}</p>

                  <div className="pt-2 border-t border-purple-100 flex items-center justify-between text-2xs text-[#5c4780]">
                    <span className="font-bold text-slate-900">Sprint {gate.sprintNumber}</span>
                    <span>Test Coverage: <strong className="text-purple-900">{gate.testCoverage}</strong></span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Inspection & Sign-off Panel (8 cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-sm space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-purple-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-2xs uppercase tracking-wider">
                    {selectedGate.podName}
                  </span>
                  <span className="text-2xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    Sprint {selectedGate.sprintNumber}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#261543] mt-2 leading-tight">
                  {selectedGate.milestoneTitle}
                </h3>
                <p className="text-xs text-[#5c4780] font-semibold mt-1">
                  Transition: <span className="font-bold text-slate-900">{selectedGate.currentStage}</span> &rarr; <span className="font-bold text-purple-900">{selectedGate.nextStage}</span>
                </p>
              </div>

              <div className={`px-4 py-2 rounded-2xl text-xs font-black shrink-0 flex items-center gap-1.5 ${
                selectedGate.status === 'APPROVED'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : selectedGate.status === 'CHANGES_REQUESTED'
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-purple-100 text-purple-950 border border-purple-300'
              }`}>
                {selectedGate.status === 'APPROVED' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span>{selectedGate.status === 'APPROVED' ? 'Stage 4 Unlocked' : 'Gating Active (Locked)'}</span>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#5c4780]">
                Submitted Milestone Deliverables ({selectedGate.deliverables.length})
              </h4>
              <div className="space-y-2">
                {selectedGate.deliverables.map((del, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-[#261543]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Test Coverage & CI/CD Telemetry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="text-2xs font-extrabold uppercase text-purple-900">Automated Test Coverage</span>
                <strong className="text-base font-black text-[#261543] block">{selectedGate.testCoverage}</strong>
                <span className="text-[10px] text-emerald-700 font-bold">Exceeds 90% Mentor Minimum Threshold ✓</span>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                <span className="text-2xs font-extrabold uppercase text-indigo-900">CI/CD Pipeline Status</span>
                <strong className="text-base font-black text-emerald-700 block flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> All 12 Checks Passing
                </strong>
                <span className="text-[10px] text-[#5c4780]">Lint, TypeScript typecheck, Docker build passed</span>
              </div>
            </div>

            {/* Mentor Notes / Evaluation Log */}
            {selectedGate.mentorNotes && (
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-1.5 text-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-900 block">Mentor Evaluation Note:</span>
                <p className="text-[#261543] italic leading-relaxed">
                  "{selectedGate.mentorNotes}"
                </p>
                {selectedGate.unlockedAt && (
                  <span className="text-[10px] text-emerald-700 font-bold block pt-1">
                    Unlocked at {selectedGate.unlockedAt}
                  </span>
                )}
              </div>
            )}

            {/* Change Requests List (if applicable) */}
            {selectedGate.changeRequests && selectedGate.changeRequests.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">Active Revision Blockers:</span>
                {selectedGate.changeRequests.map((cr, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{cr}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Sign-off Actions */}
            <div className="pt-5 border-t border-purple-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  setNotesAction('Changes');
                  setShowNotesModal(true);
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
              >
                Request Sprint Revisions
              </button>

              <button
                onClick={() => {
                  setNotesAction('Approve');
                  setShowNotesModal(true);
                }}
                disabled={selectedGate.status === 'APPROVED'}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                  selectedGate.status === 'APPROVED'
                    ? 'bg-emerald-700 text-white cursor-default'
                    : 'bg-[#3b226e] hover:bg-[#281549] text-white active:scale-98'
                }`}
              >
                <Unlock className="w-4 h-4" />
                <span>{selectedGate.status === 'APPROVED' ? 'Sprint Gate Unlocked ✓' : 'Approve & Unlock Next Sprint Stage'}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ================= MODAL: MENTOR EVALUATION NOTES ================= */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg">
                {notesAction === 'Approve' ? 'Approve & Unlock Milestone Gate' : 'Request Milestone Changes'}
              </h3>
              <button onClick={() => setShowNotesModal(false)} className="text-slate-400 hover:text-slate-600 text-base font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Mentor Evaluation Notes & Sign-off Signature *</label>
                <textarea
                  rows={4}
                  required
                  placeholder={notesAction === 'Approve' ? "Explain why this milestone meets production architecture standards..." : "List the exact technical blockers to resolve before unlock..."}
                  value={mentorInputNotes}
                  onChange={e => setMentorInputNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => notesAction === 'Approve' ? handleApproveGate(selectedGate.id) : handleRequestChanges(selectedGate.id)}
                  className={`px-5 py-2 font-bold text-white rounded-xl shadow-xs cursor-pointer ${
                    notesAction === 'Approve' ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {notesAction === 'Approve' ? 'Sign & Unlock Next Stage' : 'Submit Revisions'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
