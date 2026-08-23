import React, { useState } from 'react';
import { Briefcase, Plus, Filter, CheckCircle2, DollarSign, ArrowUpRight, Sparkles, Building2 } from 'lucide-react';
import { SmeProblem, ModalView } from '../types';

interface SmeProblemHubProps {
  problems: SmeProblem[];
  onOpenSubmitModal: () => void;
}

export const SmeProblemHub: React.FC<SmeProblemHubProps> = ({ problems, onOpenSubmitModal }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const industries = ['all', 'Logistics & Supply Chain', 'Food Safety & Agriculture', 'Precision Manufacturing'];

  const filtered = selectedIndustry === 'all'
    ? problems
    : problems.filter(p => p.industry.toLowerCase().includes(selectedIndustry.toLowerCase()));

  return (
    <section className="py-20 md:py-24 px-4 md:px-10 relative z-10" id="problems-section">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#ffb869]/10 text-[#ffb869] px-3.5 py-1 rounded-full text-xs font-mono mb-3 border border-[#ffb869]/25">
              <Briefcase className="w-3.5 h-3.5" />
              DEMAND-FIRST REPOSITORY
            </div>
            <h2 className="font-geist text-3xl sm:text-4xl font-bold tracking-tight text-white">
              SME Problem Statement Hub
            </h2>
            <p className="text-sm sm:text-base text-[#cbc3d7] mt-1 font-normal max-w-xl">
              Authentic business problems with funded pilot grants waiting for student skill pods to prototype and ship.
            </p>
          </div>

          <button
            onClick={onOpenSubmitModal}
            className="bg-[#d0bcff] text-[#3c0091] font-bold px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-all glow-bloom flex items-center gap-2 cursor-pointer shadow-lg"
            id="sme-hub-btn-submit"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Your SME Problem</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs font-mono text-[#958ea0] self-center mr-2 uppercase">Industry:</span>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                selectedIndustry === ind
                  ? 'bg-[#d0bcff] text-[#3c0091] font-bold shadow-md'
                  : 'bg-[#1b1b1f] text-[#cbc3d7] hover:text-white border border-[#494454]/30'
              }`}
            >
              {ind === 'all' ? 'All Industries' : ind}
            </button>
          ))}
        </div>

        {/* Problems Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prob) => (
            <div
              key={prob.id}
              className="glass-card rounded-2xl p-6 border border-[#494454]/40 flex flex-col justify-between hover:border-[#ffb869]/50 transition-all glass-card-hover"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-[#ffb869] bg-[#ffb869]/10 px-2.5 py-0.5 rounded-full border border-[#ffb869]/20 flex items-center gap-1 font-semibold">
                    <Building2 className="w-3 h-3" />
                    {prob.smeName}
                  </span>
                  <span className="text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/25">
                    {prob.bounty}
                  </span>
                </div>

                <h3 className="font-geist text-lg font-bold text-white mb-2 leading-snug">
                  {prob.title}
                </h3>
                
                <p className="text-xs text-[#cbc3d7] leading-relaxed mb-4 line-clamp-3">
                  {prob.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {prob.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#1f1f23] text-[#d0bcff] text-[10px] font-mono px-2 py-0.5 rounded border border-[#494454]/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#494454]/25 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#958ea0]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>{prob.status}</span>
                </div>
                <button
                  onClick={onOpenSubmitModal}
                  className="text-xs font-mono text-[#d0bcff] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Claim Problem</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
