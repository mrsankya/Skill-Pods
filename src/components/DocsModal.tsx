import React, { useState, useEffect } from 'react';
import { X, BookOpen, Shield, Phone, Mail, CheckCircle2, FileText, Lock, MessageCircle } from 'lucide-react';
import { ModalView } from '../types';

interface DocsModalProps {
  view: ModalView;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ view, onClose }) => {
  const [activeTab, setActiveTab] = useState<'docs' | 'contact' | 'privacy' | 'terms'>('docs');

  useEffect(() => {
    if (view === 'contact') setActiveTab('contact');
    else if (view === 'privacy') setActiveTab('privacy');
    else if (view === 'terms') setActiveTab('terms');
    else if (view === 'docs') setActiveTab('docs');
  }, [view]);

  if (!view || (view !== 'docs' && view !== 'contact' && view !== 'privacy' && view !== 'terms')) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1b1b1f] border border-[#d0bcff]/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#958ea0] hover:text-white p-2 rounded-full hover:bg-[#2a292e] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'docs'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'text-[#958ea0] hover:text-white'
            }`}
          >
            Documentation
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'contact'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'text-[#958ea0] hover:text-white'
            }`}
          >
            Contact &amp; Hotlines
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'text-[#958ea0] hover:text-white'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'terms'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                : 'text-[#958ea0] hover:text-white'
            }`}
          >
            Terms of Service
          </button>
        </div>

        {/* 1. Contact Tab */}
        {activeTab === 'contact' && (
          <div>
            <div className="flex items-center gap-2 text-[#d0bcff] font-mono text-xs mb-2 uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>DIRECT COMMUNICATIONS &amp; DISPATCH</span>
            </div>
            <h3 className="font-geist text-2xl font-bold text-white mb-2">
              Contact Skill Pods Engineering &amp; Support
            </h3>
            <p className="text-sm text-[#cbc3d7] mb-6">
              Connect directly with our engineering team, enterprise SME onboarding specialists, and campus partnership coordinators.
            </p>

            {/* Clickable Email Directory */}
            <div className="space-y-3 bg-[#131317] p-5 rounded-2xl border border-[#494454]/30 mb-6">
              <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-white/5">
                <span className="text-[#958ea0] font-mono flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  SME &amp; Industry Partners:
                </span>
                <a
                  href="mailto:sme-partners@skillpods.io"
                  className="text-[#d0bcff] hover:text-white font-mono font-medium hover:underline transition-colors"
                >
                  sme-partners@skillpods.io
                </a>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-white/5">
                <span className="text-[#958ea0] font-mono flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  University &amp; Campuses:
                </span>
                <a
                  href="mailto:campus-cohorts@skillpods.io"
                  className="text-[#d0bcff] hover:text-white font-mono font-medium hover:underline transition-colors"
                >
                  campus-cohorts@skillpods.io
                </a>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-white/5">
                <span className="text-[#958ea0] font-mono flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  Principal Mentorship:
                </span>
                <a
                  href="mailto:mentorship@skillpods.io"
                  className="text-[#d0bcff] hover:text-white font-mono font-medium hover:underline transition-colors"
                >
                  mentorship@skillpods.io
                </a>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm py-1">
                <span className="text-[#958ea0] font-mono flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-purple-400" />
                  General Support &amp; Helpdesk:
                </span>
                <a
                  href="mailto:support@skillpods.io"
                  className="text-[#d0bcff] hover:text-white font-mono font-medium hover:underline transition-colors"
                >
                  support@skillpods.io
                </a>
              </div>
            </div>

            {/* Clickable Phone Number Hotlines */}
            <div className="bg-[#131317] p-5 rounded-2xl border border-[#494454]/30 mb-6 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span>Instant Call Hotlines (Mon-Sat, 9AM-8PM IST)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href="tel:+918005557788"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 transition-all text-xs font-mono text-white group"
                >
                  <span className="text-[#958ea0] group-hover:text-white">Toll-Free Support:</span>
                  <span className="text-emerald-400 font-bold">+91 800 555 7788</span>
                </a>
                <a
                  href="tel:+912067890123"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/40 transition-all text-xs font-mono text-white group"
                >
                  <span className="text-[#958ea0] group-hover:text-white">Pune HQ Office:</span>
                  <span className="text-emerald-400 font-bold">+91 20 6789 0123</span>
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://wa.me/918005557788?text=Hello%20SkillPods%20Team%2C%20I%20would%20like%20to%20inquire%20about%20a%20cohort."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 p-2.5 rounded-xl font-mono text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Coordinator on WhatsApp</span>
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#d0bcff] text-[#3c0091] font-bold py-3 rounded-full font-mono text-xs uppercase tracking-widest hover:opacity-90 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

        {/* 2. Documentation Tab */}
        {activeTab === 'docs' && (
          <div>
            <div className="flex items-center gap-2 text-[#d0bcff] font-mono text-xs mb-2 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>PLATFORM SPECIFICATIONS &amp; ARCHITECTURE</span>
            </div>
            <h3 className="font-geist text-2xl font-bold text-white mb-4">
              Skill Pods Architectural Standard &amp; IP Protection
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#cbc3d7] leading-relaxed">
              <div className="bg-[#131317] p-4 rounded-xl border border-[#494454]/30">
                <h4 className="text-white font-bold font-geist mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  1. Production Zero-Downtime Guarantee
                </h4>
                <p>
                  Every Skill Pod delivers containerized Docker builds orchestrated with automated GitHub Actions CI/CD pipelines, sub-50ms latency SLAs, and automated health checks.
                </p>
              </div>

              <div className="bg-[#131317] p-4 rounded-xl border border-[#494454]/30">
                <h4 className="text-white font-bold font-geist mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  2. Intellectual Property (IP) Framework
                </h4>
                <p>
                  SME sponsors receive 100% commercial ownership of custom business logic and proprietary data schemas. Students retain open-source portfolio demonstration and academic viva defense rights.
                </p>
              </div>

              <div className="bg-[#131317] p-4 rounded-xl border border-[#494454]/30">
                <h4 className="text-white font-bold font-geist mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  3. Verifiable Skill Passport Protocol
                </h4>
                <p>
                  Student achievements, merged PRs, lines of code, and mentor verification stamps are cryptographically hashed using SHA-256 for instantaneous verification by recruiters and institutions.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#494454]/30 flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#2a292e] hover:bg-[#353439] text-white px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider cursor-pointer"
              >
                Close Documentation
              </button>
            </div>
          </div>
        )}

        {/* 3. Privacy Policy Tab */}
        {activeTab === 'privacy' && (
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs mb-2 uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>DATA GOVERNANCE &amp; PRIVACY</span>
            </div>
            <h3 className="font-geist text-2xl font-bold text-white mb-4">
              Privacy &amp; Data Security Policy
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#cbc3d7] leading-relaxed">
              <div className="bg-[#131317] p-4 rounded-xl border border-[#494454]/30">
                <h4 className="text-white font-bold mb-1">1. Student Academic Data Protection</h4>
                <p>
                  Marksheets, roll numbers, and academic certificates uploaded to the document vault are encrypted at rest using AES-256 and accessible only to verified campus coordinators and recruiters.
                </p>
              </div>

              <div className="bg-[#131317] p-4 rounded-xl border border-[#494454]/30">
                <h4 className="text-white font-bold mb-1">2. Synthetic SME Sandbox Fixtures</h4>
                <p>
                  No raw production PII is stored in development sandboxes. Synthetic fixture data is utilized during Sprints 1 through 4 with secure staging verification.
                </p>
              </div>

              <div className="bg-[#131317] p-4 rounded-xl border border-[#494454]/30">
                <h4 className="text-white font-bold mb-1">3. Direct Messaging Privacy</h4>
                <p>
                  Direct 1-on-1 chats between members are private. Message logs are retained strictly for anti-fraud escrow dispute resolution and academic safety audits.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#494454]/30 flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#2a292e] hover:bg-[#353439] text-white px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider cursor-pointer"
              >
                Close Policy
              </button>
            </div>
          </div>
        )}

        {/* 4. Terms of Service Tab */}
        {activeTab === 'terms' && (
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs mb-2 uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>COHORT CONTRACT &amp; ESCROW TERMS</span>
            </div>
            <h3 className="font-geist text-2xl font-bold text-white mb-4">
              Platform Terms &amp; Escrow Guarantee
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#cbc3d7] leading-relaxed">
              <div className="bg-[#131317] p-4 rounded-xl border border-[#494454]/30">
                <h4 className="text-white font-bold mb-1">1. Milestone Escrow Disbursement</h4>
                <p>
                  SME bounties are locked in escrow upon cohort initiation. Funds are disbursed automatically to student wallets upon formal milestone sign-off by assigned industry mentors.
                </p>
              </div>

              <div className="bg-[#131317] p-4 rounded-xl border border-[#494454]/30">
                <h4 className="text-white font-bold mb-1">2. Academic Viva &amp; Code Ownership</h4>
                <p>
                  Students retain perpetual, non-exclusive rights to demonstrate their source code contributions for university examination, viva voce defense, and personal career portfolios.
                </p>
              </div>

              <div className="bg-[#131317] p-4 rounded-xl border border-[#494454]/30">
                <h4 className="text-white font-bold mb-1">3. Code of Conduct &amp; Verification Stamping</h4>
                <p>
                  Plagiarism or AI hallucinations without human audit will result in forfeiture of skill passport endorsement and cohort expulsion.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#494454]/30 flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#2a292e] hover:bg-[#353439] text-white px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider cursor-pointer"
              >
                Close Terms
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
