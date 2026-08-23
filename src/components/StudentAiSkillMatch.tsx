import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Zap,
  TrendingUp,
  Award,
  Layers,
  ChevronRight,
  Search,
  Filter,
  Check,
  Building,
  DollarSign,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { SmeProblem } from '../types';

interface StudentAiSkillMatchProps {
  userEmail: string;
  onSelectProblem?: (problem: SmeProblem) => void;
}

interface MatchOpportunity {
  id: string;
  smeName: string;
  industry: string;
  title: string;
  description: string;
  bounty: string;
  matchScore: number;
  matchedSkills: { skill: string; studentLevel: 'Expert' | 'Advanced' | 'Intermediate'; requiredLevel: string }[];
  missingSkills: { skill: string; learningEta: string; recommendedResource: string }[];
  synergyReason: string;
  mentorName: string;
  mentorCompany: string;
  podSlots: string;
  status: string;
}

export const StudentAiSkillMatch: React.FC<StudentAiSkillMatchProps> = ({
  userEmail,
  onSelectProblem
}) => {
  const [selectedOppId, setSelectedOppId] = useState<string | null>('opp-match-1');
  const [appliedOpps, setAppliedOpps] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterThreshold, setFilterThreshold] = useState<number>(85);

  const studentProfileSkills = [
    { name: 'FastAPI & Async Microservices', level: 'Expert (95%)', verified: true, mentor: 'Sarah Chen (Cloudflare)' },
    { name: 'React 19 & State Architecture', level: 'Expert (94%)', verified: true, mentor: 'Sarah Chen (Cloudflare)' },
    { name: 'PostgreSQL & Vector Embeddings', level: 'Advanced (90%)', verified: true, mentor: 'Sarah Chen (Cloudflare)' },
    { name: 'Docker & CI/CD Pipelines', level: 'Advanced (88%)', verified: true, mentor: 'Sarah Chen (Cloudflare)' },
    { name: 'TypeScript & Type Systems', level: 'Expert (92%)', verified: true, mentor: 'Priya Sharma (Razorpay)' },
    { name: 'WebSockets & Streaming', level: 'Advanced (85%)', verified: true, mentor: 'Marcus Vance (Datadog)' },
  ];

  const matchOpportunities: MatchOpportunity[] = [
    {
      id: 'opp-match-1',
      smeName: 'Kestrel Logistics & Freight',
      industry: 'Logistics & Supply Chain',
      title: 'AI Invoice & Ledger Auto-Reconciliation Pipeline',
      description: 'Zero-shot OCR ingestion of 1,200 daily PDF and scan manifests with automated PostgreSQL ledger balancing and dispute flagging.',
      bounty: '₹2,80,000 ($3,500) SME Pilot Grant',
      matchScore: 96,
      matchedSkills: [
        { skill: 'FastAPI', studentLevel: 'Expert', requiredLevel: 'Expert' },
        { skill: 'PostgreSQL & Vector Embeddings', studentLevel: 'Advanced', requiredLevel: 'Advanced' },
        { skill: 'React 19', studentLevel: 'Expert', requiredLevel: 'Expert' },
        { skill: 'Docker Containerization', studentLevel: 'Advanced', requiredLevel: 'Intermediate' }
      ],
      missingSkills: [
        { skill: 'Tesseract / Cloud Vision OCR Tuning', learningEta: '1-2 days', recommendedResource: 'SkillPods Fast-Track OCR Primer' }
      ],
      synergyReason: '100% stack synergy with your verified FastAPI & PostgreSQL background workers. Your DocuQuery AI project already has 80% of the underlying schema built!',
      mentorName: 'Sarah Chen',
      mentorCompany: 'Staff Eng @ Cloudflare',
      podSlots: 'Pod Apex-2 (1 Frontend Lead Slot Available)',
      status: 'High Match Priority 🔥'
    },
    {
      id: 'opp-match-2',
      smeName: 'Verdant Organics Cold Storage',
      industry: 'Food Safety & IoT',
      title: 'Real-time Cold Chain Sensor Mesh & Telemetry Alerting',
      description: 'Distributed MQTT temperature ingest from 40+ cold rooms streaming to live WebSocket visualizer with SMS escalation.',
      bounty: '₹3,20,000 ($4,000) SME Pilot Grant',
      matchScore: 91,
      matchedSkills: [
        { skill: 'React 19 & Telemetry UI', studentLevel: 'Expert', requiredLevel: 'Expert' },
        { skill: 'WebSockets Streaming', studentLevel: 'Advanced', requiredLevel: 'Advanced' },
        { skill: 'TypeScript', studentLevel: 'Expert', requiredLevel: 'Expert' }
      ],
      missingSkills: [
        { skill: 'MQTT Broker Clustering', learningEta: '2-3 days', recommendedResource: 'Mosquitto Go Bridge Workshop' },
        { skill: 'TimescaleDB Hypertables', learningEta: '1 day', recommendedResource: 'Timeseries SQL Cheatsheet' }
      ],
      synergyReason: 'Your WebSocket UI expertise perfectly addresses Verdant’s latency bottleneck. Mentor Marcus Vance from Datadog provides direct telemetry guidance.',
      mentorName: 'Marcus Vance',
      mentorCompany: 'Principal Architect @ Datadog',
      podSlots: 'Pod Nova-7 (Seeking UI/Telemetry Lead)',
      status: 'Active Matching 🟢'
    },
    {
      id: 'opp-match-3',
      smeName: 'AeroPrecision CNC Manufacturing',
      industry: 'Precision Engineering',
      title: 'Predictive Spindle Wear & Vibration Telemetry Engine',
      description: 'Lightweight timeseries vibration ingest from 8 Haas CNC machines with remaining cutter lifespan estimation and auto-maintenance booking.',
      bounty: '₹4,00,000 ($5,000) Pilot Grant',
      matchScore: 88,
      matchedSkills: [
        { skill: 'FastAPI Backend', studentLevel: 'Expert', requiredLevel: 'Expert' },
        { skill: 'React 19 Dashboard', studentLevel: 'Expert', requiredLevel: 'Advanced' },
        { skill: 'PostgreSQL Time Queries', studentLevel: 'Advanced', requiredLevel: 'Advanced' }
      ],
      missingSkills: [
        { skill: 'Fast Fourier Transform (FFT) Filtering', learningEta: '3-4 days', recommendedResource: 'Signal Processing for Edge AI' }
      ],
      synergyReason: 'Strong algorithmic foundation. Excellent opportunity to expand your portfolio into industrial edge AI with a top tier ₹4.0L grant.',
      mentorName: 'Dr. Arvind Rao',
      mentorCompany: 'IIT Bombay / GE Aerospace',
      podSlots: 'Pod Forming (2 of 4 Filled)',
      status: 'Open Formation 🟣'
    }
  ];

  const filteredOpps = matchOpportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.smeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && opp.matchScore >= filterThreshold;
  });

  const selectedOpp = matchOpportunities.find(o => o.id === selectedOppId) || matchOpportunities[0];

  const handleApply = (oppId: string, title: string) => {
    setAppliedOpps(prev => ({ ...prev, [oppId]: true }));
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 text-purple-900 text-xs font-bold border border-purple-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
              <span>SkillPods AI Match Engine v3.2</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Personalized AI Project & Pod Recommendations
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              We dynamically analyze your verified GitHub commits, mentor sign-offs, and skill passports against live SME problem statements to find your exact match.
            </p>
          </div>

          {/* Quick Fit Badge */}
          <div className="bg-white/80 p-5 rounded-2xl border border-purple-200/80 shadow-xs flex items-center gap-5 shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex flex-col items-center justify-center font-black shadow-md">
              <span className="text-xl leading-none">96%</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase opacity-90">Max Fit</span>
            </div>
            <div>
              <div className="text-xs font-bold text-[#261543]">Top Matching Domain</div>
              <div className="text-sm font-black text-purple-900">Enterprise AI & Logistics</div>
              <div className="text-2xs text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> 6 Verified Skills Synchronized
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Skills Strip */}
      <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-[#5c4780] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-600" /> Active Student Skill Profile (Auto-Matched)
          </span>
          <span className="text-2xs font-bold text-purple-900 bg-purple-100/70 px-2.5 py-0.5 rounded-full">
            Passport ID: CS21B042
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {studentProfileSkills.map((sk, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-white border border-purple-200/70 text-xs font-bold text-[#261543] shadow-2xs flex items-center gap-2 group hover:border-purple-400 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{sk.name}</span>
              <span className="text-2xs text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded-md font-semibold">
                {sk.level.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main 2-Column Match Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left List of Matched Opportunities (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between gap-3 pb-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search AI recommendations..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white/80 border border-purple-200/70 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>
            <div className="flex items-center gap-1 bg-white/80 border border-purple-200/70 px-2.5 py-1.5 rounded-xl text-2xs font-bold text-[#261543]">
              <span>Min Fit:</span>
              <select
                value={filterThreshold}
                onChange={e => setFilterThreshold(Number(e.target.value))}
                className="bg-transparent font-black text-purple-900 focus:outline-none cursor-pointer"
              >
                <option value={80}>80%+</option>
                <option value={85}>85%+</option>
                <option value={90}>90%+</option>
                <option value={95}>95%+</option>
              </select>
            </div>
          </div>

          <div className="space-y-3.5">
            {filteredOpps.map(opp => {
              const isSelected = selectedOpp.id === opp.id;
              const isApplied = appliedOpps[opp.id];
              return (
                <motion.div
                  key={opp.id}
                  onClick={() => setSelectedOppId(opp.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-white border-purple-600 shadow-[0_8px_25px_rgba(109,78,199,0.18)] ring-2 ring-purple-600/20'
                      : 'bg-white/70 hover:bg-white border-purple-100 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-2xs font-extrabold uppercase tracking-wider text-purple-800 bg-purple-100/70 px-2.5 py-0.5 rounded-full inline-block mb-1">
                        {opp.industry}
                      </div>
                      <h4 className="text-sm font-black text-[#261543] leading-snug">{opp.title}</h4>
                      <p className="text-xs text-[#5c4780] font-medium mt-0.5">SME: <strong>{opp.smeName}</strong></p>
                    </div>

                    {/* Match Score Badge */}
                    <div className={`px-2.5 py-1.5 rounded-xl flex flex-col items-center justify-center shrink-0 font-black text-xs ${
                      opp.matchScore >= 95
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : opp.matchScore >= 90
                        ? 'bg-purple-100 text-purple-950 border border-purple-300'
                        : 'bg-indigo-100 text-indigo-950 border border-indigo-300'
                    }`}>
                      <span className="text-sm font-black leading-none">{opp.matchScore}%</span>
                      <span className="text-[9px] uppercase tracking-wider font-bold">Fit</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-purple-100/70 flex items-center justify-between text-2xs text-[#5c4780]">
                    <span className="font-bold text-slate-900">{opp.bounty.split(' ')[0]}</span>
                    <span className="font-semibold">{opp.matchedSkills.length} Matched Skills ✓</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Deep-Dive Fit Card (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-md space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-purple-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-2xs uppercase tracking-wider">
                    {selectedOpp.industry}
                  </span>
                  <span className="text-2xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    {selectedOpp.status}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#261543] mt-2 leading-tight">
                  {selectedOpp.title}
                </h3>
                <p className="text-xs text-[#5c4780] font-semibold mt-1">
                  Enterprise Client: <strong className="text-slate-900">{selectedOpp.smeName}</strong> &bull; Mentor: <strong className="text-purple-900">{selectedOpp.mentorName} ({selectedOpp.mentorCompany})</strong>
                </p>
              </div>

              {/* Large Match Dial */}
              <div className="flex items-center gap-3 bg-gradient-to-br from-purple-50 to-indigo-50/70 p-3.5 rounded-2xl border border-purple-200 shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-purple-700 text-white flex flex-col items-center justify-center font-black shadow-xs">
                  <span className="text-lg leading-none">{selectedOpp.matchScore}%</span>
                  <span className="text-[8px] uppercase tracking-wider font-bold">MATCH</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#261543]">AI Fit Rating</div>
                  <div className="text-2xs text-purple-900 font-semibold">Exceptional Match</div>
                </div>
              </div>
            </div>

            {/* Problem Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#5c4780]">Problem Statement</h4>
              <p className="text-xs sm:text-sm text-[#261543] leading-relaxed">
                {selectedOpp.description}
              </p>
            </div>

            {/* AI Synergy Explanation Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-950">
                <Bot className="w-4 h-4 text-purple-700" />
                <span>Why You Fit This SME Problem:</span>
              </div>
              <p className="text-xs text-purple-900 font-medium leading-relaxed">
                {selectedOpp.synergyReason}
              </p>
            </div>

            {/* Matched Skills Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#5c4780] flex items-center justify-between">
                <span>Matched Skills ({selectedOpp.matchedSkills.length})</span>
                <span className="text-emerald-700 font-bold normal-case text-2xs">All Verified by Industry Mentors ✓</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedOpp.matchedSkills.map((ms, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-slate-900">{ms.skill}</span>
                    </div>
                    <span className="text-2xs font-extrabold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-md">
                      {ms.studentLevel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Skills & Quick Learning Action */}
            {selectedOpp.missingSkills.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#5c4780]">
                  Recommended Fast-Track Prep ({selectedOpp.missingSkills.length})
                </h4>
                <div className="space-y-2">
                  {selectedOpp.missingSkills.map((sk, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900">{sk.skill}</span>
                          <span className="text-2xs text-amber-800 block font-medium">Resource: {sk.recommendedResource}</span>
                        </div>
                      </div>
                      <span className="text-2xs font-extrabold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md shrink-0">
                        ETA: {sk.learningEta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Action Footer */}
            <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-2xs text-[#5c4780] block font-semibold">Total SME Pilot Bounty</span>
                <strong className="text-lg font-black text-[#261543]">{selectedOpp.bounty}</strong>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    handleApply(selectedOpp.id, selectedOpp.title);
                  }}
                  disabled={appliedOpps[selectedOpp.id]}
                  className={`px-6 py-3 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2 ${
                    appliedOpps[selectedOpp.id]
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-[#3b226e] hover:bg-[#281549] text-white active:scale-98'
                  }`}
                >
                  {appliedOpps[selectedOpp.id] ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Applied with {selectedOpp.matchScore}% Score ✓</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-purple-300" />
                      <span>Apply with AI Match Score ({selectedOpp.matchScore}%) &rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
