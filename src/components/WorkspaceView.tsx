import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  Building2, 
  GraduationCap, 
  School, 
  Plus, 
  CheckCircle2, 
  ExternalLink,
  Code2,
  Terminal,
  Activity,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { UserRole } from '../types';
import { SkillPodsLogo } from './SkillPodsLogo';

interface WorkspaceViewProps {
  role: UserRole;
  userEmail: string;
  onSwitchWorkspace: () => void;
  onBackToHome: () => void;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  role,
  userEmail,
  onSwitchWorkspace,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'tasks'>('overview');

  const roleMeta = {
    student: {
      title: 'Student Builder Workspace',
      subtitle: 'Active Pod: Apex-2 · Stage 5: Launch & Scale',
      emoji: '🎓',
      accent: 'text-[#38bdf8]',
      border: 'border-[#38bdf8]/40',
      badge: 'STUDENT POD LEAD',
      stats: [
        { label: 'Active Pod', val: 'Pod Apex-2' },
        { label: 'Assigned SME', val: 'Kestrel Freight' },
        { label: 'Sprint Velocity', val: '98% On-Track' },
        { label: 'Mentor Review', val: 'Approved by Sarah Chen' }
      ]
    },
    sme: {
      title: 'SME Innovation Command Hub',
      subtitle: 'Track Your Shipped Business Software & Problem Bounties',
      emoji: '🏢',
      accent: 'text-[#a87ffb]',
      border: 'border-[#a87ffb]/40',
      badge: 'SME BUSINESS CLIENT',
      stats: [
        { label: 'Live Bounties', val: '3 Submitted' },
        { label: 'Active Pods', val: '2 Dedicated Teams' },
        { label: 'Time Saved', val: '320+ hrs/mo' },
        { label: 'Production Status', val: 'Ready for Staging' }
      ]
    },
    mentor: {
      title: 'Mentor & Validation Portal',
      subtitle: 'Code Quality Reviews, Architectural Gates & Pod Guidance',
      emoji: '👨‍🏫',
      accent: 'text-[#10b981]',
      border: 'border-[#10b981]/40',
      badge: 'INDUSTRY MENTOR',
      stats: [
        { label: 'Mentored Pods', val: '4 Skill Pods' },
        { label: 'PRs Reviewed', val: '48 Commits' },
        { label: 'Next Office Hours', val: 'Today, 5:30 PM' },
        { label: 'Architecture Gate', val: 'Passed (Docker/Go)' }
      ]
    },
    college: {
      title: 'Institutional SPOC & Placement Analytics',
      subtitle: 'Student Skill Pod Outcomes, Industry Tie-ups & Verified GitHub IP',
      emoji: '🏫',
      accent: 'text-[#f59e0b]',
      border: 'border-[#f59e0b]/40',
      badge: 'COLLEGE INSTITUTION',
      stats: [
        { label: 'Active Students', val: '128 Enrolled' },
        { label: 'Industry Projects', val: '16 Shipped' },
        { label: 'Placement Multiplier', val: '3.4x Interview Rate' },
        { label: 'Accreditation IP', val: '12 Repos Verified' }
      ]
    }
  }[role];

  return (
    <div className="min-h-screen bg-[#06050b] text-[#e4e1e7] flex flex-col font-sans selection:bg-[#a87ffb]/30">
      
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#08070d]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-mono text-[#a19ba9] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Landing Page</span>
          </button>

          <div className="h-5 w-[1px] bg-white/10" />

          <SkillPodsLogo size={32} showText={true} />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-mono text-white font-semibold">{userEmail}</span>
            <span className="text-[10px] font-mono text-[#a87ffb] uppercase">{roleMeta.badge}</span>
          </div>

          <button
            onClick={onSwitchWorkspace}
            className="px-3.5 py-1.5 rounded-xl bg-[#171422] border border-[#a87ffb]/40 text-[#d0bcff] hover:bg-[#221c33] text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Switch Role</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onBackToHome}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#a19ba9] hover:text-white transition-all cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto p-6 md:p-10">
        
        {/* Workspace Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-[#17122a] via-[#120f20] to-[#0d0a17] border border-[#a87ffb]/30 p-6 sm:p-8 mb-8 relative overflow-hidden shadow-[0_0_40px_rgba(168,127,251,0.15)]"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#a87ffb]/10 blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{roleMeta.emoji}</span>
                <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#a87ffb]/20 text-[#d0bcff] border border-[#a87ffb]/40">
                  {roleMeta.badge}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold font-geist text-white tracking-tight mb-1">
                {roleMeta.title}
              </h1>
              <p className="text-sm text-[#b2abc0]">
                {roleMeta.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={onBackToHome}
                className="glow-pill-primary text-[#240356] font-mono text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full cursor-pointer flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(168,127,251,0.4)]"
              >
                <Plus className="w-4 h-4" />
                <span>New Action</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {roleMeta.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-2xl bg-[#0f0c1b]/80 border border-white/10 p-5 flex flex-col justify-between hover:border-[#a87ffb]/40 transition-all"
            >
              <span className="text-[11px] font-mono text-[#8e879b] uppercase tracking-wider mb-2">
                {stat.label}
              </span>
              <span className="text-lg font-bold text-white font-geist">
                {stat.val}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Live Active Pipeline Pod Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-[#110d21] border border-[#a87ffb]/30 p-6 mb-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#38bdf8] animate-pulse" />
              <h2 className="font-geist font-bold text-lg text-white">
                Live Pod Pipeline Telemetry
              </h2>
            </div>
            <span className="text-xs font-mono text-[#10b981] bg-[#10b981]/15 px-3 py-1 rounded-full border border-[#10b981]/30">
              ● Pipeline Operational
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#17132a] border border-white/5">
              <span className="text-[10px] font-mono text-[#a87ffb] block mb-1">01 SME Problem</span>
              <h4 className="font-bold text-sm text-white mb-1">AI Invoice Reconciliation</h4>
              <p className="text-xs text-[#958ea0]">Kestrel Logistics</p>
            </div>

            <div className="p-4 rounded-xl bg-[#17132a] border border-white/5">
              <span className="text-[10px] font-mono text-[#38bdf8] block mb-1">02 Student Skill Pod</span>
              <h4 className="font-bold text-sm text-white mb-1">Pod Apex-2 (3 Devs)</h4>
              <p className="text-xs text-[#958ea0]">React + FastAPI + OCR</p>
            </div>

            <div className="p-4 rounded-xl bg-[#17132a] border border-white/5">
              <span className="text-[10px] font-mono text-[#10b981] block mb-1">03 Mentor Review</span>
              <h4 className="font-bold text-sm text-white mb-1">Sarah Chen</h4>
              <p className="text-xs text-[#958ea0]">Staff Eng @ Cloudflare</p>
            </div>

            <div className="p-4 rounded-xl bg-[#17132a] border border-[#a87ffb]/40 bg-[#1e1735]">
              <span className="text-[10px] font-mono text-[#c084fc] block mb-1">04 Shipped Product</span>
              <h4 className="font-bold text-sm text-white mb-1">Deployed Staging</h4>
              <p className="text-xs text-[#38bdf8]">38ms Avg Latency</p>
            </div>
          </div>
        </motion.div>

        {/* Quick action notice */}
        <div className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <p className="text-xs text-[#8c8599] font-mono mb-3">
            Connected to Skill Pods Cloud Infrastructure · Ready for hackathon demonstrations
          </p>
          <button
            onClick={onBackToHome}
            className="text-xs font-mono text-[#d0bcff] hover:underline cursor-pointer"
          >
            ← Return to Skill Pods Landing Page
          </button>
        </div>

      </main>

    </div>
  );
};
