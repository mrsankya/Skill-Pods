import React, { useState } from 'react';
import { 
  Activity, 
  RefreshCw, 
  GitCommit, 
  ExternalLink, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Radio, 
  CheckCircle2, 
  Layers, 
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { PodData, LiveEvent, MetricsData } from '../types';

interface LiveTelemetrySectionProps {
  pods: PodData[];
  events: LiveEvent[];
  metrics: MetricsData;
  isPolling: boolean;
  onRefresh: () => void;
  onSelectPod: (pod: PodData) => void;
  pingMs: number | null;
  onPing: () => void;
}

export const LiveTelemetrySection: React.FC<LiveTelemetrySectionProps> = ({
  pods,
  events,
  metrics,
  isPolling,
  onRefresh,
  onSelectPod,
  pingMs,
  onPing
}) => {
  const [filterStage, setFilterStage] = useState<number | 'all'>('all');

  const filteredPods = filterStage === 'all' 
    ? pods 
    : pods.filter(p => p.stage === filterStage);

  return (
    <section className="py-20 md:py-24 px-4 md:px-10 bg-[#0e0e12]/80 border-t border-b border-[#494454]/20 relative z-10" id="telemetry-section">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header with live status & controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10b981]"></span>
              </span>
              <span className="font-mono text-xs text-[#10b981] uppercase tracking-widest font-semibold">
                REAL-TIME TELEMETRY FEED (ACTIVE)
              </span>
            </div>
            <h2 className="font-geist text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Live Skill Pods Network
            </h2>
            <p className="text-sm sm:text-base text-[#cbc3d7] mt-1 font-normal">
              Monitor live sprints, production builds, and mentor reviews across global pod clusters.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Ping Button */}
            <button
              onClick={onPing}
              className="bg-[#1f1f23] hover:bg-[#2a292e] text-[#cbc3d7] hover:text-white px-3.5 py-2 rounded-xl border border-[#494454]/40 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
              title="Ping API Server for real-time latency check"
            >
              <Cpu className="w-3.5 h-3.5 text-[#d0bcff]" />
              <span>Ping Server:</span>
              <span className="text-[#10b981] font-bold">
                {pingMs !== null ? `${pingMs}ms` : `${metrics.avgLatencyMs}ms`}
              </span>
            </button>

            {/* Refresh Live State */}
            <button
              onClick={onRefresh}
              className="bg-[#d0bcff]/15 hover:bg-[#d0bcff]/25 text-[#d0bcff] px-3.5 py-2 rounded-xl border border-[#d0bcff]/30 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer"
              title="Poll latest updates from backend API"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPolling ? 'animate-spin' : ''}`} />
              <span>Sync Telemetry</span>
            </button>
          </div>
        </div>

        {/* Real-Time Live Activity Event Ticker */}
        <div className="mb-10 bg-[#131317] rounded-2xl p-4 border border-[#494454]/30 shadow-inner">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#494454]/20 text-xs font-mono">
            <span className="text-[#d0bcff] flex items-center gap-1.5 uppercase tracking-wider font-semibold">
              <Radio className="w-3.5 h-3.5 text-[#d0bcff] animate-pulse" />
              Live Network Event Log
            </span>
            <span className="text-[#958ea0]">Auto-refreshing every 3s</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="bg-[#1b1b1f] p-3 rounded-xl border border-[#494454]/20 flex items-start gap-2.5 text-xs text-[#cbc3d7]"
              >
                <div className="w-2 h-2 rounded-full bg-[#d0bcff] mt-1.5 shrink-0"></div>
                <div className="flex flex-col flex-grow min-w-0">
                  <span className="text-white line-clamp-2 leading-relaxed">{event.text}</span>
                  <span className="text-[10px] font-mono text-[#958ea0] mt-1">{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs for Stages */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-mono text-[#958ea0] mr-2 uppercase tracking-wider">
            Filter Stage:
          </span>
          {[
            { id: 'all', label: 'All Pods' },
            { id: 1, label: '01 Research' },
            { id: 2, label: '02 Concept' },
            { id: 3, label: '03 Prototype' },
            { id: 4, label: '04 Testing' },
            { id: 5, label: '05 Launch' }
          ].map(tab => (
            <button
              key={String(tab.id)}
              onClick={() => setFilterStage(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                filterStage === tab.id
                  ? 'bg-[#d0bcff] text-[#3c0091] font-bold shadow-md'
                  : 'bg-[#1f1f23] text-[#cbc3d7] hover:text-white border border-[#494454]/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPods.map((pod) => (
            <div
              key={pod.id}
              className="glass-card rounded-2xl p-5 sm:p-6 border border-[#494454]/40 flex flex-col justify-between hover:border-[#d0bcff]/60 transition-all group glass-card-hover"
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-[#a078ff]/15 text-[#d0bcff] font-mono text-xs px-2.5 py-0.5 rounded-md font-semibold border border-[#d0bcff]/20">
                    {pod.name}
                  </span>
                  <span className="text-[11px] font-mono bg-[#10b981]/15 text-[#10b981] px-2 py-0.5 rounded-md border border-[#10b981]/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                    {pod.latency}
                  </span>
                </div>

                {/* Title and SME */}
                <h3 className="font-geist text-lg font-bold text-white group-hover:text-[#d0bcff] transition-colors leading-snug mb-1">
                  {pod.title}
                </h3>
                <p className="text-xs text-[#ffb869] font-mono mb-4 flex items-center gap-1">
                  <span>SME:</span> {pod.sme}
                </p>

                {/* Sprint Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#cbc3d7]">{pod.stageName}</span>
                    <span className="text-[#d0bcff] font-bold">{pod.progress}%</span>
                  </div>
                  <div className="w-full bg-[#131317] h-2 rounded-full overflow-hidden border border-[#494454]/30">
                    <div
                      className="bg-gradient-to-r from-[#8b5cf6] to-[#d0bcff] h-full rounded-full transition-all duration-500"
                      style={{ width: `${pod.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Mentor info */}
                <div className="bg-[#131317]/70 p-2.5 rounded-xl border border-[#494454]/20 mb-3 text-xs flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#d0bcff] shrink-0" />
                  <div className="truncate">
                    <span className="text-[#958ea0] block text-[10px] uppercase font-mono">Mentor Assigned</span>
                    <span className="text-[#e4e1e7] font-medium truncate">{pod.mentor}</span>
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pod.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#1f1f23] text-[#cbc3d7] text-[10px] font-mono px-2 py-0.5 rounded border border-[#494454]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Recent Commit Activity */}
                <div className="text-[11px] font-mono text-[#958ea0] bg-[#131317] p-2.5 rounded-lg border border-[#494454]/20 flex items-start gap-2 mb-4">
                  <GitCommit className="w-3.5 h-3.5 text-[#d0bcff] mt-0.5 shrink-0" />
                  <span className="line-clamp-1 text-[#cbc3d7]">{pod.lastCommit}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPod(pod)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1f1f23] hover:bg-[#a078ff]/20 text-[#d0bcff] hover:text-white font-mono text-xs uppercase tracking-wider border border-[#494454]/40 hover:border-[#d0bcff]/60 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Full Pod Specs</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
