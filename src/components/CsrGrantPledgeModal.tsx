import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Building2,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Download,
  Lock,
  FileCheck2
} from 'lucide-react';

interface CsrGrantPledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeTitle: string;
  ticketNo: string;
  district: string;
  currentBounty: string;
  onPledgeSuccess: (pledge: {
    companyName: string;
    amount: number;
    formattedAmount: string;
    certificateId: string;
  }) => void;
}

export const CsrGrantPledgeModal: React.FC<CsrGrantPledgeModalProps> = ({
  isOpen,
  onClose,
  challengeTitle,
  ticketNo,
  district,
  currentBounty,
  onPledgeSuccess
}) => {
  const [selectedTier, setSelectedTier] = useState<number>(50000);
  const [companyName, setCompanyName] = useState('Tata Steel CSR Division');
  const [contactPerson, setContactPerson] = useState('Rajesh Verma (Head - Sustainability & CSR)');
  const [corporateEmail, setCorporateEmail] = useState('csr.jharkhand@tatasteel.com');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pledgeComplete, setPledgeComplete] = useState(false);
  const [certId, setCertId] = useState('');

  if (!isOpen) return null;

  const tiers = [
    {
      amount: 25000,
      label: 'Seed IoT Kit Grant',
      grantTitle: '₹25,000 Prototype Hardware Kit',
      benefits: ['Sponsors student sensors & microcontrollers', 'Corporate CSR Badge on public portal', 'Quarterly telemetry report']
    },
    {
      amount: 50000,
      label: 'Field Pilot Grant (Recommended)',
      grantTitle: '₹50,000 Village Field Pilot',
      benefits: ['Full village deployment & installation', 'Co-branding on hardware unit & PRI report', 'Section 80G Tax Exemption Receipt']
    },
    {
      amount: 100000,
      label: 'Commercialization Grant',
      grantTitle: '₹1,00,000 Full Scale Deployment',
      benefits: ['Pan-district village replication', 'First right of refusal for enterprise tech transfer', 'Official Govt of Jharkhand CSR Honors']
    }
  ];

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedCertId = `CSR-JH-${district.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setCertId(generatedCertId);
      setIsProcessing(false);
      setPledgeComplete(true);

      onPledgeSuccess({
        companyName,
        amount: selectedTier,
        formattedAmount: `₹${selectedTier.toLocaleString('en-IN')}`,
        certificateId: generatedCertId
      });
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-[#13101f] border border-[#3d3356] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#1a152b] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Pledge Industry CSR Grant</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                  Escrow Protected
                </span>
              </h3>
              <p className="text-xs text-[#a78bfa] font-mono">
                Govt of Jharkhand &bull; Corporate Social Responsibility (CSR) Gateway
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
          {pledgeComplete ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-black text-white">CSR Grant Pledged &amp; Escrow Locked!</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                  ₹{selectedTier.toLocaleString('en-IN')} has been committed by <strong>{companyName}</strong> for <strong>{ticketNo}</strong> in {district}.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0e0c17] border border-white/10 text-left font-mono text-xs space-y-1.5 max-w-md mx-auto">
                <div className="text-slate-400 flex justify-between">
                  <span>Receipt Ref:</span>
                  <span className="text-indigo-300 font-bold">{certId}</span>
                </div>
                <div className="text-slate-400 flex justify-between">
                  <span>Escrow Vault Status:</span>
                  <span className="text-emerald-400 font-bold">LOCKED (Milestone Gated)</span>
                </div>
                <div className="text-slate-400 flex justify-between">
                  <span>Tax Deduction:</span>
                  <span className="text-[#d0bcff]">Eligible under Sec 80G</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#d0bcff] hover:bg-[#c4a9ff] text-[#1e1b4b] font-mono text-xs font-bold uppercase transition-all cursor-pointer shadow-md"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePledgeSubmit} className="space-y-4">
              {/* Target Challenge Info Card */}
              <div className="p-3.5 rounded-2xl bg-[#1a152b] border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-indigo-300 font-bold">{ticketNo}</span>
                  <span className="text-slate-400">Target: {district} District</span>
                </div>
                <div className="text-xs font-bold text-white leading-snug line-clamp-2">
                  {challengeTitle}
                </div>
              </div>

              {/* Grant Tier Selection Cards */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-[#cbc3d7] uppercase block">
                  Select Corporate CSR Tier:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {tiers.map((t) => {
                    const isSelected = selectedTier === t.amount;
                    return (
                      <div
                        key={t.amount}
                        onClick={() => setSelectedTier(t.amount)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#d0bcff]/15 border-[#d0bcff] ring-1 ring-[#d0bcff] shadow-md shadow-[#d0bcff]/20'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div>
                          <div className="text-[10px] font-mono text-[#a78bfa]">{t.label}</div>
                          <div className="text-base font-black text-white mt-0.5">
                            ₹{t.amount.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <ul className="mt-2 space-y-1 text-[10px] text-slate-300">
                          {t.benefits.slice(0, 2).map((b, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <span className="text-emerald-400">&bull;</span>
                              <span className="truncate">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Corporate Details Input Fields */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Company / PSU Name:</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Tata Steel Ltd / Coal India Ltd"
                    className="w-full px-3.5 py-2 bg-[#0f0d18] border border-[#352c4e] rounded-xl text-xs text-white focus:outline-none focus:border-[#d0bcff]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">CSR Officer / Signatory:</label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. CSR Director"
                      className="w-full px-3.5 py-2 bg-[#0f0d18] border border-[#352c4e] rounded-xl text-xs text-white focus:outline-none focus:border-[#d0bcff]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">Official CSR Email:</label>
                    <input
                      type="email"
                      required
                      value={corporateEmail}
                      onChange={(e) => setCorporateEmail(e.target.value)}
                      placeholder="csr@company.com"
                      className="w-full px-3.5 py-2 bg-[#0f0d18] border border-[#352c4e] rounded-xl text-xs text-white focus:outline-none focus:border-[#d0bcff]"
                    />
                  </div>
                </div>
              </div>

              {/* Escrow Disclaimer Notice */}
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300 flex items-center gap-2.5">
                <Lock className="w-4 h-4 shrink-0 text-amber-400" />
                <span>
                  <strong>Escrow Security:</strong> Pledged funds are held in state escrow and released to student pods in tranches only upon verified faculty mentor milestone approval.
                </span>
              </div>

              {/* Submit CTA */}
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
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-xl bg-[#d0bcff] hover:bg-[#c4a9ff] text-[#1e1b4b] font-mono text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-[#d0bcff]/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isProcessing ? 'Locking Escrow...' : `Pledge ₹${selectedTier.toLocaleString('en-IN')}`}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
