import React from 'react';
import { Check, Zap, Sparkles, Shield, Building, GraduationCap } from 'lucide-react';
import { ModalView } from '../types';

interface PricingSectionProps {
  onOpenModal: (modal: ModalView) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenModal }) => {
  const tiers = [
    {
      name: "Student Builder",
      badge: "FELLOWSHIP",
      price: "Free",
      period: "Forever",
      desc: "For computer science & engineering students seeking authentic industry problem-solving experience.",
      icon: GraduationCap,
      features: [
        "Direct matching into verified SME Skill Pods",
        "Weekly 1:1 code reviews from Staff/Principal mentors",
        "Free cloud staging & containerized development environments",
        "Production-grade Viva thesis portfolio credential",
        "Direct recruitment pipeline with hiring partners"
      ],
      cta: "Apply as Student Builder",
      modal: 'join-cohort' as ModalView,
      popular: false
    },
    {
      name: "SME Problem Pilot",
      badge: "MOST POPULAR",
      price: "$990",
      period: "per 12-week pod sprint",
      desc: "For small-to-medium businesses wanting real software solutions delivered by mentored engineering pods.",
      icon: Zap,
      features: [
        "Dedicated 4-person multidisciplinary student pod",
        "Senior Industry Mentor oversight & architecture sign-off",
        "Full 5-phase engineering lifecycle (Discovery to Launch)",
        "Zero-downtime containerized production deployment",
        "100% IP ownership & complete source code transfer",
        "30-day post-launch warranty & SLA support"
      ],
      cta: "Submit an SME Problem",
      modal: 'submit-problem' as ModalView,
      popular: true
    },
    {
      name: "Enterprise & University",
      badge: "CAMPUS & CLUSTER",
      price: "Custom",
      period: "Institutional",
      desc: "For universities, incubators, and enterprise accelerators scaling experiential engineering cohorts.",
      icon: Building,
      features: [
        "Multi-pod cohorts (5 to 25 simultaneous pods)",
        "Academic syllabus integration & capstone gradebook",
        "Private cloud telemetry & automated CI/CD grader",
        "Dedicated Principal Mentor management pool",
        "Custom IP licensing and enterprise SLA"
      ],
      cta: "Contact Institutional Team",
      modal: 'contact' as ModalView,
      popular: false
    }
  ];

  return (
    <section className="py-20 md:py-28 px-4 md:px-10 bg-[#0e0e12]/60 border-t border-[#494454]/20 relative z-10" id="pricing-section">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#a078ff]/10 text-[#d0bcff] px-3.5 py-1 rounded-full text-xs font-mono mb-4 border border-[#d0bcff]/20">
            <Sparkles className="w-3.5 h-3.5" />
            TRANSPARENT COHORT MODEL
          </div>
          <h2 className="font-geist text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Predictable Value for Students &amp; SMEs
          </h2>
          <p className="text-base sm:text-lg text-[#cbc3d7] max-w-xl mx-auto font-normal">
            Aligning practical education with real economic problem solving.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`glass-card rounded-2xl p-7 sm:p-8 flex flex-col justify-between relative transition-all ${
                  tier.popular
                    ? 'border-[#d0bcff] bg-[#1f1f23]/70 glow-bloom scale-105 z-20'
                    : 'border-[#494454]/30 hover:border-[#d0bcff]/40'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#d0bcff] text-[#3c0091] font-mono text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2a292e] border border-[#494454]/40 flex items-center justify-center text-[#d0bcff]">
                      <Icon className="w-5 h-5" />
                    </div>
                    {!tier.popular && (
                      <span className="text-[10px] font-mono text-[#958ea0] uppercase tracking-widest bg-[#131317] px-2.5 py-1 rounded-md border border-[#494454]/20">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-geist text-xl font-bold text-white mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#cbc3d7] mb-6 min-h-[36px]">
                    {tier.desc}
                  </p>

                  <div className="flex items-baseline gap-1.5 mb-6 pb-6 border-b border-[#494454]/30">
                    <span className="font-geist text-4xl font-extrabold text-white tracking-tight">
                      {tier.price}
                    </span>
                    <span className="font-mono text-xs text-[#958ea0]">
                      / {tier.period}
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#958ea0] block">
                      What's Included:
                    </span>
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#e4e1e7]">
                        <div className="w-4 h-4 rounded-full bg-[#d0bcff]/20 text-[#d0bcff] flex items-center justify-center mt-0.5 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenModal(tier.modal)}
                  className={`w-full py-3.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all cursor-pointer font-bold ${
                    tier.popular
                      ? 'bg-[#d0bcff] text-[#3c0091] hover:opacity-90 glow-bloom shadow-lg hover:scale-105'
                      : 'bg-[#1f1f23] text-white hover:bg-[#2a292e] border border-[#494454]/40 hover:border-[#d0bcff]/50'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
