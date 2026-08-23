import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Check,
  X,
  ExternalLink,
  FolderGit2,
  FileCheck2,
  GitPullRequest,
  Clock,
  Terminal,
  Zap,
  Building,
  DollarSign,
  Award,
  Sparkles,
  MessageSquare
} from 'lucide-react';

interface SmeAcceptanceGateProps {
  userEmail: string;
}

interface AcceptanceDeliverable {
  id: string;
  podName: string;
  projectTitle: string;
  sprintMilestone: string;
  stageName: string;
  bountyToRelease: string;
  mentorName: string;
  mentorCompany: string;
  testPassRate: string;
  latencyBenchmark: string;
  deliverablesList: string[];
  pullRequests: { prNumber: number; title: string; author: string; diffStat: string }[];
  status: 'PENDING_ACCEPTANCE' | 'ACCEPTED' | 'CHANGES_REQUESTED';
  submittedDate: string;
}

export const SmeAcceptanceGate: React.FC<SmeAcceptanceGateProps> = ({
  userEmail
}) => {
  const [deliverables, setDeliverables] = useState<AcceptanceDeliverable[]>([
    {
      id: 'gate-apex-s3',
      podName: 'Pod Apex-2',
      projectTitle: 'AI Invoice & Ledger Auto-Reconciliation',
      sprintMilestone: 'Sprint 3 MVP Gate: OCR Accuracy & Idempotency Sign-off',
      stageName: 'Stage 3: Prototype & MVP',
      bountyToRelease: '₹1,20,000 ($1,500) Escrow Release',
      mentorName: 'Sarah Chen',
      mentorCompany: 'Staff Eng @ Cloudflare',
      testPassRate: '94.2% (48/51 Cypress E2E Tests Passing)',
      latencyBenchmark: '38ms avg API latency under 5k RPS load',
      deliverablesList: [
        'OCR Extraction pipeline with 99.2% confidence on logistics paper manifests',
        'PostgreSQL schema migration with pgvector indexing for invoice similarity matching',
        'Webhook deduplication layer preventing double ledger reconciliations',
        'Interactive telemetry dashboard with live discrepancy resolution UI'
      ],
      pullRequests: [
        { prNumber: 42, title: 'feat(ocr): implemented asynchronous OCR worker queue', author: 'Dev Patel', diffStat: '+1,450 / -120 lines' },
        { prNumber: 43, title: 'feat(ledger): PostgreSQL pgvector semantic search & indexing', author: 'Maya Lin', diffStat: '+890 / -45 lines' },
        { prNumber: 44, title: 'test(e2e): Cypress stress test suite with network partition simulation', author: 'Rohan Gupta', diffStat: '+620 / -10 lines' }
      ],
      status: 'PENDING_ACCEPTANCE',
      submittedDate: 'Today at 11:30 AM'
    },
    {
      id: 'gate-nova-s4',
      podName: 'Pod Nova-7',
      projectTitle: 'Cold Chain Telemetry & Sensor Mesh',
      sprintMilestone: 'Sprint 4 Testing Gate: MQTT Gateway & Multi-Zone Alerting',
      stageName: 'Stage 4: Testing & Iteration',
      bountyToRelease: '₹1,60,000 ($2,000) Escrow Release',
      mentorName: 'Marcus Vance',
      mentorCompany: 'Principal Architect @ Datadog',
      testPassRate: '91.8% (38/41 Tests Passing)',
      latencyBenchmark: '35ms WebSocket latency across 40 nodes',
      deliverablesList: [
        'TimescaleDB data retention compression policy benchmarks',
        'SMS escalation gateway with Twilio fallback when LTE drops',
        'Multi-facility sensor visualizer with temperature threshold alerting'
      ],
      pullRequests: [
        { prNumber: 29, title: 'feat(mqtt): broker connection pool with exponential backoff', author: 'Elena Rostova', diffStat: '+1,120 / -90 lines' }
      ],
      status: 'PENDING_ACCEPTANCE',
      submittedDate: 'Yesterday at 4:15 PM'
    }
  ]);

  const [selectedGateId, setSelectedGateId] = useState<string>('gate-apex-s3');
  const [feedbackNotes, setFeedbackNotes] = useState<string>('');
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [auditRequested, setAuditRequested] = useState<boolean>(false);

  const selectedGate = deliverables.find(d => d.id === selectedGateId) || deliverables[0];

  const handleAcceptAndRelease = (gateId: string) => {
    setDeliverables(prev => prev.map(d => {
      if (d.id === gateId) {
        return { ...d, status: 'ACCEPTED' };
      }
      return d;
    }));
    alert(`Milestone Accepted! Escrow payout of ${selectedGate.bountyToRelease} has been authorized and disbursed to ${selectedGate.podName}.`);
  };

  const handleRequestChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setDeliverables(prev => prev.map(d => {
      if (d.id === selectedGateId) {
        return { ...d, status: 'CHANGES_REQUESTED' };
      }
      return d;
    }));
    setShowFeedbackModal(false);
    alert(`Change request transmitted to ${selectedGate.podName} and Mentor ${selectedGate.mentorName}.`);
  };

  const handleTriggerAudit = () => {
    setAuditRequested(true);
    setTimeout(() => {
      alert(`Mentor Architecture Audit dispatched! ${selectedGate.mentorName} (${selectedGate.mentorCompany}) has been notified to execute deep-dive verification.`);
      setAuditRequested(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Top Header Banner */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 text-purple-900 text-xs font-bold border border-purple-200 shadow-2xs">
              <FileCheck2 className="w-3.5 h-3.5 text-purple-700" />
              <span>SME Project Acceptance & Escrow Sign-off Gate</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Review Sprint Deliverables & Release Escrow
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              Inspect test pass rates, live pull requests, and mentor architectural approvals before releasing milestone bounty funds.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200 shadow-xs flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#261543]">100% Milestone Protection</div>
              <div className="text-2xs text-emerald-800 font-semibold">Funds stay in escrow until your sign-off</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Gate Review Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List of Pending Gates (4 cols) */}
        <div className="lg:col-span-4 space-y-3.5">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#5c4780]">
            Awaiting Acceptance ({deliverables.length})
          </h3>

          {deliverables.map(del => {
            const isSelected = del.id === selectedGate.id;
            return (
              <motion.div
                key={del.id}
                onClick={() => setSelectedGateId(del.id)}
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
                      {del.podName}
                    </span>
                    <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${
                      del.status === 'ACCEPTED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : del.status === 'CHANGES_REQUESTED'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {del.status === 'ACCEPTED' ? 'Released ✓' : del.status === 'CHANGES_REQUESTED' ? 'Revision Needed' : 'Review Required'}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-[#261543] leading-snug">{del.projectTitle}</h4>
                  <p className="text-xs text-[#5c4780] font-medium">{del.sprintMilestone}</p>

                  <div className="pt-2 border-t border-purple-100 flex items-center justify-between text-2xs text-[#5c4780]">
                    <span className="font-bold text-slate-900">{del.bountyToRelease.split(' ')[0]}</span>
                    <span>{del.testPassRate.split(' ')[0]}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Inspection Room (8 cols) */}
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
                    {selectedGate.stageName}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#261543] mt-2 leading-tight">
                  {selectedGate.sprintMilestone}
                </h3>
                <p className="text-xs text-[#5c4780] font-semibold mt-1">
                  Submitted {selectedGate.submittedDate} &bull; Mentor: <strong className="text-purple-900">{selectedGate.mentorName} ({selectedGate.mentorCompany})</strong>
                </p>
              </div>

              <div className="text-right shrink-0 bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200">
                <span className="text-2xs font-extrabold uppercase text-emerald-800 block">Milestone Escrow Value</span>
                <strong className="text-lg font-black text-emerald-900 block mt-0.5">{selectedGate.bountyToRelease}</strong>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#5c4780] flex items-center justify-between">
                <span>Completed Deliverables Checklist</span>
                <span className="text-emerald-700 font-bold normal-case text-2xs">Mentor Architecture Sign-off Active ✓</span>
              </h4>
              <div className="space-y-2">
                {selectedGate.deliverablesList.map((del, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-[#261543]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* QA & Telemetry Metrics Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
                <span className="text-2xs font-extrabold uppercase text-purple-900">Automated E2E Test Suite</span>
                <strong className="text-base font-black text-[#261543] block">{selectedGate.testPassRate}</strong>
                <span className="text-[10px] text-[#5c4780]">0 regression defects detected in CI/CD pipeline</span>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
                <span className="text-2xs font-extrabold uppercase text-indigo-900">Performance & Latency Benchmark</span>
                <strong className="text-base font-black text-[#261543] block">{selectedGate.latencyBenchmark}</strong>
                <span className="text-[10px] text-[#5c4780]">Meets production sub-50ms SLA requirement</span>
              </div>
            </div>

            {/* Code Pull Requests Audit */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#5c4780]">
                Verified Code Pull Requests ({selectedGate.pullRequests.length})
              </h4>
              <div className="space-y-2">
                {selectedGate.pullRequests.map(pr => (
                  <div key={pr.prNumber} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <GitPullRequest className="w-4 h-4 text-purple-700 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900">PR #{pr.prNumber}: {pr.title}</span>
                        <span className="text-2xs text-slate-500 block">Author: {pr.author}</span>
                      </div>
                    </div>
                    <span className="font-mono text-2xs font-bold text-purple-900 bg-white px-2 py-1 rounded-md border border-slate-200">
                      {pr.diffStat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-5 border-t border-purple-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleTriggerAudit}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                <span>{auditRequested ? 'Audit Triggered! 🛡️' : 'Request Mentor Audit'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all cursor-pointer"
                >
                  Request Changes
                </button>

                <button
                  onClick={() => handleAcceptAndRelease(selectedGate.id)}
                  disabled={selectedGate.status === 'ACCEPTED'}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                    selectedGate.status === 'ACCEPTED'
                      ? 'bg-emerald-700 text-white cursor-default'
                      : 'bg-[#3b226e] hover:bg-[#281549] text-white active:scale-98'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{selectedGate.status === 'ACCEPTED' ? 'Milestone Accepted ✓' : 'Accept & Release Escrow'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ================= MODAL: REQUEST CHANGES WITH FEEDBACK ================= */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg">Request Milestone Revisions</h3>
              <button onClick={() => setShowFeedbackModal(false)} className="text-slate-400 hover:text-slate-600 text-base font-bold">✕</button>
            </div>

            <form onSubmit={handleRequestChanges} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Feedback & Blocking Items *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail the specific UI defects, latency benchmarks, or missing edge cases required before releasing bounty funds..."
                  value={feedbackNotes}
                  onChange={e => setFeedbackNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs cursor-pointer"
                >
                  Send Change Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
