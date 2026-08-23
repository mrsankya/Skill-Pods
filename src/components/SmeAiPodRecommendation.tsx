import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Bot,
  Users,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  GitPullRequest,
  Star,
  Zap,
  Check,
  Layers,
  ChevronRight,
  BarChart3,
  SlidersHorizontal,
  Award
} from 'lucide-react';
import { PodData } from '../types';

interface SmeAiPodRecommendationProps {
  userEmail: string;
  onAssignPod?: (podId: string) => void;
}

export const SmeAiPodRecommendation: React.FC<SmeAiPodRecommendationProps> = ({
  userEmail,
  onAssignPod
}) => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>('prob-01');
  const [assignedPods, setAssignedPods] = useState<Record<string, boolean>>({});
  const [comparePodIds, setComparePodIds] = useState<string[]>(['pod-101', 'pod-102']);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  const smeProblemsList = [
    {
      id: 'prob-01',
      title: 'Automated OCR & Discrepancy Flagging for Paper Invoices',
      industry: 'Logistics & Supply Chain',
      budget: '₹2,80,000 ($3,500)',
      timeline: '6 Weeks',
      requiredStack: ['FastAPI', 'PostgreSQL', 'React 19', 'Docker', 'OCR'],
      description: 'We process 1,200 PDF and paper manifests daily with manual entry bottlenecks. Need automated ledger discrepancy flagging.'
    },
    {
      id: 'prob-02',
      title: 'Real-time Multi-zone Temperature Telemetry & SMS Escalation',
      industry: 'Food Safety & IoT',
      budget: '₹3,20,000 ($4,000)',
      timeline: '8 Weeks',
      requiredStack: ['MQTT', 'TimescaleDB', 'Go', 'WebSockets', 'React'],
      description: 'Real-time sensor telemetry from 40+ cold rooms feeding live dashboard with SMS failover escalation.'
    }
  ];

  const recommendedPods = [
    {
      id: 'pod-101',
      name: 'Pod Apex-2',
      title: 'AI Invoice & Ledger Auto-Reconciliation',
      matchScore: 96,
      matchGrade: 'Exceptional Fit',
      studentCount: 3,
      leadStudent: 'Dev Patel (Full-Stack Lead)',
      mentorName: 'Sarah Chen',
      mentorRole: 'Staff Eng @ Cloudflare',
      techStack: ['FastAPI', 'Python', 'PostgreSQL', 'React 19', 'Docker'],
      velocity: '94 / 100 Velocity Score (2 days ahead of schedule)',
      testCoverage: '94.2% Cypress E2E',
      latency: '38ms API response',
      completedProjects: 4,
      mentorRating: 4.98,
      synergyReason: '100% stack match. Lead Dev Patel already built DocuQuery AI RAG pipeline with high OCR extraction confidence.',
      eta: '4 Weeks (Ready for Stage 4 Live Beta)'
    },
    {
      id: 'pod-102',
      name: 'Pod Nova-7',
      title: 'Cold Chain Telemetry & Sensor Mesh',
      matchScore: 92,
      matchGrade: 'High Fit',
      studentCount: 3,
      leadStudent: 'Elena Rostova (IoT Lead)',
      mentorName: 'Marcus Vance',
      mentorRole: 'Principal Architect @ Datadog',
      techStack: ['Go', 'TimescaleDB', 'MQTT', 'WebSockets', 'React 19'],
      velocity: '88 / 100 Velocity Score',
      testCoverage: '91.8% Test Pass Rate',
      latency: '35ms WebSocket latency',
      completedProjects: 3,
      mentorRating: 4.92,
      synergyReason: 'Deep expertise in high-frequency timeseries data and fault-tolerant network partitions with MQTT.',
      eta: '5 Weeks'
    },
    {
      id: 'pod-103',
      name: 'Pod Horizon-5',
      title: 'Local Delivery Dispatch & Route Optimization',
      matchScore: 89,
      matchGrade: 'Strong Fit',
      studentCount: 3,
      leadStudent: 'Samir Al-Mansoor (Systems Lead)',
      mentorName: 'David Kim',
      mentorRole: 'VP Eng @ Stripe',
      techStack: ['Next.js', 'Express', 'Redis', 'PostGIS', 'Docker'],
      velocity: '96 / 100 Velocity Score',
      testCoverage: '95.0% Load Tested',
      latency: '51ms at 12k req/sec',
      completedProjects: 5,
      mentorRating: 5.0,
      synergyReason: 'High throughput distributed caching and geo-routing with automated CI/CD release pipeline.',
      eta: '4.5 Weeks'
    }
  ];

  const handleAssign = (podId: string) => {
    setAssignedPods(prev => ({ ...prev, [podId]: true }));
    if (onAssignPod) onAssignPod(podId);
  };

  const handleToggleCompare = (podId: string) => {
    if (comparePodIds.includes(podId)) {
      if (comparePodIds.length > 1) {
        setComparePodIds(comparePodIds.filter(id => id !== podId));
      }
    } else {
      if (comparePodIds.length < 3) {
        setComparePodIds([...comparePodIds, podId]);
      } else {
        setComparePodIds([comparePodIds[1], comparePodIds[2], podId]);
      }
    }
  };

  const comparedPodsData = recommendedPods.filter(p => comparePodIds.includes(p.id));

  return (
    <div className="space-y-8">
      {/* Top AI Match Header Banner */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 text-purple-900 text-xs font-bold border border-purple-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
              <span>AI Pod Recommendation & Match Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Top-Ranked Skill Pods for Your SME Problem
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              Our automated matching algorithm benchmarks student verified competencies, past sprint velocity, and mentor availability against your technical requirements.
            </p>
          </div>

          <button
            onClick={() => setShowComparisonModal(true)}
            className="px-6 py-3.5 bg-[#3b226e] hover:bg-[#281549] text-white rounded-2xl font-bold text-xs shadow-md active:scale-98 transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-purple-300" />
            <span>Compare Selected Pods ({comparePodIds.length}) &rarr;</span>
          </button>
        </div>

        {/* Selected Problem Selector Strip */}
        <div className="mt-6 pt-6 border-t border-purple-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#7c6a9b] uppercase tracking-wider">Active Problem:</span>
            <select
              value={selectedProblemId}
              onChange={e => setSelectedProblemId(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white border border-purple-200 text-xs font-bold text-[#261543] focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-2xs cursor-pointer"
            >
              {smeProblemsList.map(prob => (
                <option key={prob.id} value={prob.id}>
                  {prob.title} ({prob.budget})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-2xs font-bold text-[#5c4780]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>3 High-Synergy Pods Matched</span>
          </div>
        </div>
      </div>

      {/* Recommended Pods Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recommendedPods.map((pod, idx) => {
          const isAssigned = assignedPods[pod.id];
          const isComparing = comparePodIds.includes(pod.id);
          return (
            <motion.div
              key={pod.id}
              whileHover={{ y: -3 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-200/80 shadow-sm flex flex-col justify-between space-y-5 relative overflow-hidden"
            >
              <div className="space-y-4">
                
                {/* Header: Match Score & Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-2xs font-extrabold uppercase tracking-wider text-purple-900 bg-purple-100 px-3 py-1 rounded-full">
                    Rank #{idx + 1} Best Match
                  </span>

                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-100 to-indigo-100 px-3 py-1 rounded-full border border-purple-200 font-black text-xs text-purple-950">
                    <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                    <span>{pod.matchScore}% Match</span>
                  </div>
                </div>

                {/* Pod Title & Lead */}
                <div>
                  <h3 className="text-lg font-black text-[#261543] leading-snug">{pod.name}</h3>
                  <p className="text-xs text-purple-900 font-bold mt-0.5">{pod.title}</p>
                  <p className="text-xs text-[#5c4780] font-medium mt-1">Lead: <strong>{pod.leadStudent}</strong></p>
                </div>

                {/* Mentor Endorsement Box */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50/70 border border-purple-200/80 space-y-1 text-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#261543] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                      Mentor: {pod.mentorName}
                    </span>
                    <span className="font-black text-purple-900">{pod.mentorRating} ★</span>
                  </div>
                  <p className="text-[#5c4780] font-medium">{pod.mentorRole}</p>
                </div>

                {/* Why AI Recommends */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#7c6a9b]">Why AI Recommends This Pod:</span>
                  <p className="text-xs text-[#261543] font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {pod.synergyReason}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#7c6a9b]">Tech Stack Synergy:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {pod.techStack.map(t => (
                      <span key={t} className="px-2.5 py-0.5 bg-purple-50 border border-purple-200/70 rounded-md text-2xs font-bold text-purple-900">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Velocity & Quality Stats */}
                <div className="grid grid-cols-2 gap-2 text-2xs pt-1">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-semibold block">Velocity Rating</span>
                    <strong className="text-slate-900 font-bold block mt-0.5">{pod.velocity.split(' ')[0]} / 100</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-semibold block">Est. Completion</span>
                    <strong className="text-purple-900 font-bold block mt-0.5">{pod.eta.split(' ')[0]} {pod.eta.split(' ')[1]}</strong>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-purple-100 space-y-2">
                <button
                  onClick={() => handleAssign(pod.id)}
                  disabled={isAssigned}
                  className={`w-full py-3 rounded-2xl font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    isAssigned
                      ? 'bg-emerald-700 text-white cursor-default'
                      : 'bg-[#3b226e] hover:bg-[#281549] text-white active:scale-98'
                  }`}
                >
                  {isAssigned ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Pod Assigned & Funded ✓</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-purple-300" />
                      <span>Assign {pod.name} to Problem &rarr;</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleToggleCompare(pod.id)}
                  className={`w-full py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    isComparing
                      ? 'bg-purple-100 border-purple-300 text-purple-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {isComparing ? 'Selected for Comparison ✓' : '+ Add to Pod Comparison'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= MODAL: SIDE-BY-SIDE POD COMPARISON ================= */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-2xs font-extrabold uppercase text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  SkillPods Comparison Tool 🎯
                </span>
                <h3 className="font-black text-slate-900 text-xl mt-1">Side-by-Side Pod Comparison</h3>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 px-4 font-bold text-slate-500 uppercase text-[10px] w-1/4">Metric / Dimension</th>
                    {comparedPodsData.map(p => (
                      <th key={p.id} className="py-3 px-4 font-black text-[#261543] text-sm">
                        {p.name} ({p.matchScore}% Match)
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-700 bg-slate-50/70">Project Title</td>
                    {comparedPodsData.map(p => (
                      <td key={p.id} className="py-3 px-4 font-semibold text-slate-900">{p.title}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-700 bg-slate-50/70">Assigned Mentor</td>
                    {comparedPodsData.map(p => (
                      <td key={p.id} className="py-3 px-4">
                        <strong className="text-[#261543] block">{p.mentorName}</strong>
                        <span className="text-2xs text-[#7c6a9b]">{p.mentorRole} ({p.mentorRating} ★)</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-700 bg-slate-50/70">Tech Stack</td>
                    {comparedPodsData.map(p => (
                      <td key={p.id} className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.techStack.map(t => (
                            <span key={t} className="px-2 py-0.5 bg-purple-50 text-purple-900 rounded text-2xs font-bold">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-700 bg-slate-50/70">Sprint Velocity</td>
                    {comparedPodsData.map(p => (
                      <td key={p.id} className="py-3 px-4 font-bold text-emerald-800">{p.velocity}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-700 bg-slate-50/70">Test Coverage</td>
                    {comparedPodsData.map(p => (
                      <td key={p.id} className="py-3 px-4 font-bold text-purple-900">{p.testCoverage}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-700 bg-slate-50/70">API Latency SLA</td>
                    {comparedPodsData.map(p => (
                      <td key={p.id} className="py-3 px-4 font-mono font-bold text-slate-900">{p.latency}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-700 bg-slate-50/70">Est. Delivery Timeline</td>
                    {comparedPodsData.map(p => (
                      <td key={p.id} className="py-3 px-4 font-bold text-slate-900">{p.eta}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-700 bg-slate-50/70">Action</td>
                    {comparedPodsData.map(p => (
                      <td key={p.id} className="py-3 px-4">
                        <button
                          onClick={() => {
                            handleAssign(p.id);
                            setShowComparisonModal(false);
                          }}
                          className="px-4 py-2 bg-[#3b226e] hover:bg-[#281549] text-white font-bold rounded-xl text-xs cursor-pointer shadow-2xs"
                        >
                          Select & Assign {p.name}
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
