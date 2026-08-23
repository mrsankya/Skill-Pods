import React from 'react';
import { X, BookOpen, Shield, Code, CheckCircle2, FileText } from 'lucide-react';
import { ModalView } from '../types';

interface DocsModalProps {
  view: ModalView;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ view, onClose }) => {
  if (!view || (view !== 'docs' && view !== 'contact')) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1b1b1f] border border-[#d0bcff]/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#958ea0] hover:text-white p-1 rounded-full hover:bg-[#2a292e] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {view === 'contact' ? (
          <div>
            <div className="flex items-center gap-2 text-[#d0bcff] font-mono text-xs mb-2 uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>COMMUNICATIONS</span>
            </div>
            <h3 className="font-geist text-2xl font-bold text-white mb-2">
              Contact Skill Pods Engineering
            </h3>
            <p className="text-sm text-[#cbc3d7] mb-6">
              Have questions about partnering as an SME client, sponsoring cohorts, or becoming a mentor? Reach our engineering team directly.
            </p>

            <div className="space-y-4 bg-[#131317] p-5 rounded-2xl border border-[#494454]/30 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#958ea0] font-mono">SME Inquiries:</span>
                <span className="text-white font-mono font-medium">sme-partners@skillpods.io</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#958ea0] font-mono">University &amp; Campuses:</span>
                <span className="text-white font-mono font-medium">campus-cohorts@skillpods.io</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#958ea0] font-mono">Principal Mentors:</span>
                <span className="text-white font-mono font-medium">mentorship@skillpods.io</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-[#d0bcff] text-[#3c0091] font-bold py-3 rounded-full font-mono text-xs uppercase tracking-widest hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#d0bcff] font-mono text-xs mb-2 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>PLATFORM SPECIFICATIONS &amp; POLICIES</span>
            </div>
            <h3 className="font-geist text-2xl font-bold text-white mb-4">
              Skill Pods Architectural Standard &amp; IP Protection
            </h3>

            <div className="space-y-5 text-xs sm:text-sm text-[#cbc3d7] leading-relaxed">
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
                  3. Privacy &amp; Data Security
                </h4>
                <p>
                  No raw production PII is stored in development sandboxes. Synthetic fixture data is utilized during Sprints 1 through 4 with secure staging verification.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#494454]/30 flex justify-end">
              <button
                onClick={onClose}
                className="bg-[#2a292e] hover:bg-[#353439] text-white px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider"
              >
                Close Documentation
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
