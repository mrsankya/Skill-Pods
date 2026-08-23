import React from 'react';
import { Terminal, Shield, Layers, Cloud, Server, Database, GitBranch, Cpu } from 'lucide-react';

export const LogosStrip: React.FC = () => {
  const partners = [
    { name: "Google Cloud", icon: Cloud, desc: "Cloud Partner" },
    { name: "Vercel", icon: Layers, desc: "Edge Deployment" },
    { name: "PostgreSQL", icon: Database, desc: "Relational DB" },
    { name: "Stripe", icon: Shield, desc: "Payments SME" },
    { name: "Docker", icon: Server, desc: "Containerized Pods" },
    { name: "Datadog", icon: Cpu, desc: "Telemetry" },
  ];

  return (
    <section className="py-10 border-b border-t border-[#494454]/15 bg-[#0e0e12]/60 relative z-10" id="about-section">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <p className="text-center text-xs font-mono text-[#958ea0] uppercase tracking-[0.2em] mb-6">
          ENGINEERED IN COLLABORATION WITH INDUSTRY LEADERS &amp; ACCELERATORS
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-60 hover:opacity-100 transition-opacity duration-300">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.name}
                className="flex items-center gap-2.5 text-[#cbc3d7] hover:text-[#d0bcff] transition-all hover:scale-105 cursor-pointer group"
                title={`${partner.name} - ${partner.desc}`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#1f1f23] border border-[#494454]/30 flex items-center justify-center text-[#d0bcff] group-hover:border-[#d0bcff]/50 group-hover:shadow-[0_0_15px_rgba(208,188,255,0.2)]">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-geist font-semibold text-sm tracking-tight text-white group-hover:text-[#d0bcff]">
                    {partner.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#958ea0] uppercase">
                    {partner.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
