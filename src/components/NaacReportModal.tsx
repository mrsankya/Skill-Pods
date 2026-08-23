import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Award, 
  Download, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Layers, 
  TrendingUp, 
  IndianRupee,
  FlaskConical
} from 'lucide-react';

interface NaacReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeName?: string;
}

export const NaacReportModal: React.FC<NaacReportModalProps> = ({
  isOpen,
  onClose,
  collegeName = "National Institute of Technology"
}) => {
  const [academicYear, setAcademicYear] = useState("2025-2026");

  const reportMetrics = {
    totalPods: 42,
    totalStudents: 126,
    totalSmePartners: 28,
    totalStipendsDisbursed: "₹34,50,000",
    totalIpsCommercialized: 14,
    avgPlacementScore: "92.4 / 100",
    mentorOrganizations: ["Cloudflare", "Datadog", "Razorpay", "Stripe", "Swiggy", "Google"]
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0e0c18] border border-purple-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.3)] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#171326] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-base">NAAC & NIRF Accreditation Exporter</h3>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-amber-400" />
                    <span>🧪 IN TESTING</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">Official Criterion 3.5 & 5.2 Industry Collaboration Compliance Exporter</p>
              </div>
            </div>

            <button onClick={onClose} className="text-slate-400 hover:text-white text-xl p-1 cursor-pointer">
              ✕
            </button>
          </div>

          <div className="p-6 space-y-5 overflow-y-auto flex-1">
            {/* College Audit Card */}
            <div className="bg-white text-slate-900 p-6 rounded-2xl border-4 border-purple-900/30 shadow-inner space-y-4 font-serif">
              <div className="text-center border-b-2 border-slate-900 pb-3">
                <span className="text-[10px] font-mono tracking-widest text-purple-800 uppercase font-bold">INSTITUTIONAL ACCREDITATION REPORT</span>
                <h2 className="text-xl font-black tracking-tight text-slate-900 mt-0.5">{collegeName.toUpperCase()}</h2>
                <p className="text-xs text-slate-600 font-sans mt-0.5">Industry-Academia Collaborative Skill Pods &bull; Academic Session {academicYear}</p>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-sans">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Active Pods</span>
                  <span className="text-xl font-black text-purple-900">{reportMetrics.totalPods}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">SME Collaborations</span>
                  <span className="text-xl font-black text-purple-900">{reportMetrics.totalSmePartners}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Stipends Disbursed</span>
                  <span className="text-xl font-black text-emerald-700">{reportMetrics.totalStipendsDisbursed}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Avg Placement Score</span>
                  <span className="text-xl font-black text-indigo-900">{reportMetrics.avgPlacementScore}</span>
                </div>
              </div>

              {/* Compliance Section */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs font-sans space-y-1.5">
                <span className="font-bold text-slate-900 block text-[11px]">Accreditation Criterion Alignment:</span>
                <p className="text-[11px] text-slate-700">✓ <strong>NAAC Criterion 3.5.1:</strong> Number of functional MoUs with industry institutions.</p>
                <p className="text-[11px] text-slate-700">✓ <strong>NAAC Criterion 5.2.1:</strong> Verified placement and internship readiness of graduating students.</p>
                <p className="text-[11px] text-slate-700">✓ <strong>NIRF Parameter (RP):</strong> Research & Professional Practice - Collaborative industry software prototypes & IP transfer.</p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>DIGITAL VERIFICATION HASH: 0x9b4e...2a1c</span>
                <span className="text-purple-800 font-bold">SKILL PODS AUDIT COMPLIANCE SEAL ✓</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <span className="text-xs text-slate-400 font-mono">Compatible with NAAC/NBA portal upload formats</span>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg cursor-pointer transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Official Report</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
