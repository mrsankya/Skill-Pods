import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Clock,
  Users,
  Activity,
  Zap,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Calendar
} from 'lucide-react';

interface MentorPodHealthAlertsProps {
  userEmail: string;
}

interface PodHealthItem {
  id: string;
  podName: string;
  projectTitle: string;
  healthScore: number;
  status: 'Critical' | 'Warning' | 'Healthy';
  primaryIssue: string;
  metrics: {
    velocityChange: string;
    blockedPRs: number;
    workloadImbalance: string;
    lastCommitTime: string;
  };
  recommendedAction: string;
}

export const MentorPodHealthAlerts: React.FC<MentorPodHealthAlertsProps> = ({
  userEmail
}) => {
  const [alerts, setAlerts] = useState<PodHealthItem[]>([
    {
      id: 'h-102',
      podName: 'Pod Nova-7',
      projectTitle: 'Cold Chain Telemetry & Sensor Mesh',
      healthScore: 68,
      status: 'Warning',
      primaryIssue: 'Velocity dropped 22% this sprint &mdash; 3 PRs blocked on TimescaleDB hypertables migration.',
      metrics: {
        velocityChange: '-22% vs last sprint',
        blockedPRs: 3,
        workloadImbalance: 'Elena Rostova (74% of PRs)',
        lastCommitTime: '18 hours ago'
      },
      recommendedAction: 'Schedule an unblocker sync on TimescaleDB schema compression before Sprint 4 Gate.'
    },
    {
      id: 'h-104',
      podName: 'Pod Forge-3',
      projectTitle: 'Eco Retail Packaging & Carbon Footprint Audit',
      healthScore: 54,
      status: 'Critical',
      primaryIssue: 'Stage 2 Gate rejected due to Scope 3 emission calculation discrepancy. Team blocked on formulas.',
      metrics: {
        velocityChange: '-35% stall',
        blockedPRs: 2,
        workloadImbalance: 'Jordan Brooks (85% of commits)',
        lastCommitTime: '2 days ago'
      },
      recommendedAction: 'Provide IPCC 2024 emission factor formula reference and host 15-min model review.'
    },
    {
      id: 'h-101',
      podName: 'Pod Apex-2',
      projectTitle: 'AI Invoice & Ledger Auto-Reconciliation',
      healthScore: 96,
      status: 'Healthy',
      primaryIssue: 'Pod running 2 days ahead of schedule with 94.2% test coverage. Ready for Stage 4 Live Beta.',
      metrics: {
        velocityChange: '+14% surge',
        blockedPRs: 0,
        workloadImbalance: 'Even distribution (48% / 30% / 22%)',
        lastCommitTime: '25 min ago'
      },
      recommendedAction: 'Sign off Stage 3 -> Stage 4 Milestone Gate and notify Kestrel Freight SME.'
    }
  ]);

  const [nudgedPods, setNudgedPods] = useState<Record<string, boolean>>({});

  const handleNudgePod = (podId: string, podName: string) => {
    setNudgedPods(prev => ({ ...prev, [podId]: true }));
    alert(`Unblocker notification & mentor sync invite dispatched to all members of ${podName}!`);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 shadow-2xs">
              <Activity className="w-3.5 h-3.5 text-amber-700" />
              <span>Real-Time Pod Telemetry & Workload Diagnostics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Pod Health Alerts & Bottleneck Radar
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              Automated telemetry signals flag slowing sprint velocity, blocked PR dependencies, and uneven workload distribution before milestones slip.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-purple-200/80 shadow-xs flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#261543]">Telemetry Sentinel Active</div>
              <div className="text-2xs text-[#5c4780]">Sub-1min anomaly detection on GitHub commits</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pod Health Cards Grid */}
      <div className="space-y-4">
        {alerts.map(item => {
          const isNudged = nudgedPods[item.id];
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              className={`bg-white rounded-3xl p-6 sm:p-7 border shadow-sm space-y-5 transition-all ${
                item.status === 'Critical'
                  ? 'border-red-200'
                  : item.status === 'Warning'
                  ? 'border-amber-200'
                  : 'border-emerald-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-2xs uppercase tracking-wider">
                      {item.podName}
                    </span>
                    <span className={`text-2xs font-bold px-2.5 py-0.5 rounded-full border ${
                      item.status === 'Critical'
                        ? 'bg-red-100 text-red-900 border-red-300'
                        : item.status === 'Warning'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    }`}>
                      {item.status === 'Critical' ? '🚨 Critical Health' : item.status === 'Warning' ? '⚠️ Attention Needed' : '🟢 Optimal Health'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#261543]">{item.projectTitle}</h3>
                </div>

                <div className="text-right shrink-0 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#7c6a9b] block">Health Score</span>
                  <strong className={`text-xl font-black block mt-0.5 ${
                    item.healthScore >= 90 ? 'text-emerald-700' : item.healthScore >= 65 ? 'text-amber-700' : 'text-red-700'
                  }`}>
                    {item.healthScore} / 100
                  </strong>
                </div>
              </div>

              {/* Anomaly Signal Box */}
              <div className={`p-4 rounded-2xl text-xs font-semibold leading-relaxed border ${
                item.status === 'Critical'
                  ? 'bg-red-50/70 border-red-200 text-red-950'
                  : item.status === 'Warning'
                  ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                  : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              }`}>
                {item.primaryIssue}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-2xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold block">Velocity Delta</span>
                  <strong className={`text-xs font-black block mt-0.5 ${
                    item.metrics.velocityChange.includes('-') ? 'text-red-700' : 'text-emerald-700'
                  }`}>
                    {item.metrics.velocityChange}
                  </strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold block">Blocked PRs</span>
                  <strong className="text-xs font-black text-slate-900 block mt-0.5">{item.metrics.blockedPRs} Blocked</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold block">Workload Distribution</span>
                  <strong className="text-xs font-bold text-purple-900 block mt-0.5 truncate">{item.metrics.workloadImbalance}</strong>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold block">Latest Commit</span>
                  <strong className="text-xs font-bold text-slate-800 block mt-0.5">{item.metrics.lastCommitTime}</strong>
                </div>
              </div>

              {/* Recommended Action & Trigger */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-[#5c4780] font-medium">
                  <strong>Recommended Mentor Action:</strong> {item.recommendedAction}
                </p>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleNudgePod(item.id, item.podName)}
                    className="px-4 py-2 bg-[#3b226e] hover:bg-[#281549] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{isNudged ? 'Unblocker Call Booked ✓' : 'Schedule 1-on-1 Unblocker'}</span>
                  </button>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
