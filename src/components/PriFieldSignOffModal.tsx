import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Award,
  CheckCircle2,
  FileCheck2,
  Download,
  Landmark,
  ShieldCheck,
  Star,
  Printer,
  Sparkles
} from 'lucide-react';

interface PriFieldSignOffModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketNo: string;
  challengeTitle: string;
  district: string;
  assignedPod: string;
  university: string;
  facultyMentor: string;
  onValidationSuccess: (result: {
    ticketNo: string;
    sarpanchName: string;
    panchayatName: string;
    certificateNumber: string;
  }) => void;
}

export const PriFieldSignOffModal: React.FC<PriFieldSignOffModalProps> = ({
  isOpen,
  onClose,
  ticketNo,
  challengeTitle,
  district,
  assignedPod,
  university,
  facultyMentor,
  onValidationSuccess
}) => {
  const [sarpanchName, setSarpanchName] = useState('Ramesh Munda (Gram Pradhan)');
  const [panchayatName, setPanchayatName] = useState('Torpa Gram Panchayat (Khunti)');
  const [bdoOfficer, setBdoOfficer] = useState('Anil Kumar Toppo (Block Development Officer)');
  const [rating, setRating] = useState(5);
  const [remarks, setRemarks] = useState(
    'Hardware sensor lag gaya hai aur handpump ka pani test report me peene yogya paya gaya hai. Gram sabha dwara pramanit kiya jata hai.'
  );
  const [isGenerated, setIsGenerated] = useState(false);
  const [certNumber, setCertNumber] = useState('');

  if (!isOpen) return null;

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const cert = `GOV-JH-PRI-${district.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
    setCertNumber(cert);
    setIsGenerated(true);

    onValidationSuccess({
      ticketNo,
      sarpanchName,
      panchayatName,
      certificateNumber: cert
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#13101f] border border-[#3d3356] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#1a152b] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Gram Panchayat (PRI) Validation &amp; Closure</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                  Stage 5 Seal
                </span>
              </h3>
              <p className="text-xs text-[#a78bfa] font-mono">
                Government of Jharkhand &bull; Official Community Field Certification
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {isGenerated ? (
            <div className="space-y-4">
              {/* Official Certificate Container */}
              <div
                id="printable-pri-certificate"
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1b152d] via-[#141021] to-[#0c0a14] border-2 border-[#d0bcff]/50 shadow-2xl relative overflow-hidden space-y-5"
              >
                {/* Background Watermark */}
                <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none text-9xl font-black">
                  JHARKHAND
                </div>

                {/* Seal Header */}
                <div className="text-center space-y-1 border-b border-white/10 pb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                    <ShieldCheck className="w-4 h-4" />
                    <span>OFFICIAL GOVERNMENT OF JHARKHAND &amp; MIC SEAL</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase mt-2">
                    Community Field Validation Certificate
                  </h2>
                  <p className="text-xs text-[#cbc3d7] font-mono">
                    Under Panchayati Raj Institutions (PRI) Validation Framework (SIH26043)
                  </p>
                  <div className="text-[11px] font-mono text-[#a78bfa] pt-1">
                    Certificate No: <strong className="text-white">{certNumber}</strong>
                  </div>
                </div>

                {/* Certificate Text */}
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3">
                  <p>
                    This is to officially certify that the engineering solution for problem statement{' '}
                    <strong className="text-[#d0bcff] font-mono">{ticketNo}</strong> —{' '}
                    <strong className="text-white">"{challengeTitle}"</strong> has been successfully field-tested, installed, and validated on ground at{' '}
                    <strong className="text-emerald-300">{panchayatName}</strong> ({district} District).
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Assigned Student Pod:</span>
                      <strong className="text-white">{assignedPod}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Higher Education Institution:</span>
                      <strong className="text-indigo-300">{university}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Faculty Mentor:</span>
                      <strong className="text-slate-200">{facultyMentor}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Panchayat Rating:</span>
                      <strong className="text-amber-400">{'★'.repeat(rating)} (5/5 Excellence)</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 italic">
                    "{remarks}"
                  </div>
                </div>

                {/* Signatories Row */}
                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-center font-mono text-xs">
                  <div className="space-y-1">
                    <div className="text-emerald-400 font-bold text-sm">✓ SIGNED DIGITALLY</div>
                    <div className="text-white font-bold">{sarpanchName}</div>
                    <div className="text-[10px] text-slate-400">Gram Pradhan / Panchayat Secretary</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-emerald-400 font-bold text-sm">✓ COUNTERSIGNED</div>
                    <div className="text-white font-bold">{bdoOfficer}</div>
                    <div className="text-[10px] text-slate-400">District Technical Advisor / BDO</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Status updated to Stage 5: Deployed &amp; Validated!</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Certificate</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#d0bcff] hover:bg-[#c4a9ff] text-[#1e1b4b] font-mono text-xs font-bold uppercase transition-all cursor-pointer shadow-md"
                  >
                    Done &amp; Return
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGenerateCertificate} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-[11px] font-mono text-indigo-300">
                  Target Ticket: {ticketNo} &bull; {district} District
                </div>
                <div className="text-xs font-bold text-white leading-snug">{challengeTitle}</div>
                <div className="text-[11px] text-slate-400 pt-1">
                  Builder Pod: {assignedPod} ({university})
                </div>
              </div>

              {/* Field Verification Checklist */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#cbc3d7] uppercase block">
                  PRI Field Verification Checklist:
                </label>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10">
                    <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                    <span>Hardware telemetry sensor installed and transmitting live data on-site</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10">
                    <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                    <span>Tested with local beneficiaries and Gram Sabha members</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10">
                    <input type="checkbox" defaultChecked className="accent-emerald-500 rounded" />
                    <span>Maintenance manual &amp; spare contacts handed over to village youth</span>
                  </label>
                </div>
              </div>

              {/* Signatory Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">
                    Gram Pradhan / Sarpanch Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={sarpanchName}
                    onChange={(e) => setSarpanchName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0f0d18] border border-[#352c4e] rounded-xl text-xs text-white focus:outline-none focus:border-[#d0bcff]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">
                    Panchayat / Ward Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={panchayatName}
                    onChange={(e) => setPanchayatName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#0f0d18] border border-[#352c4e] rounded-xl text-xs text-white focus:outline-none focus:border-[#d0bcff]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">
                  BDO / Technical Officer Counter-Signatory:
                </label>
                <input
                  type="text"
                  required
                  value={bdoOfficer}
                  onChange={(e) => setBdoOfficer(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0d18] border border-[#352c4e] rounded-xl text-xs text-white focus:outline-none focus:border-[#d0bcff]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">
                  Panchayat Field Remarks &amp; Quality Assessment:
                </label>
                <textarea
                  rows={3}
                  required
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#0f0d18] border border-[#352c4e] rounded-xl text-xs text-white focus:outline-none focus:border-[#d0bcff]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-[#08070d] font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <Award className="w-4 h-4" />
                  <span>Issue Official PRI Certificate</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
