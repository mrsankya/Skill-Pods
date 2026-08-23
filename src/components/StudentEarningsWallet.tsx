import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  IndianRupee,
  DollarSign,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Filter,
  ArrowRight,
  ShieldCheck,
  Building,
  Check,
  Zap,
  CreditCard
} from 'lucide-react';

interface StudentEarningsWalletProps {
  userEmail: string;
}

export const StudentEarningsWallet: React.FC<StudentEarningsWalletProps> = ({
  userEmail
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Licensing' | 'Bounties' | 'Grants'>('All');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('45000');
  const [withdrawMethod, setWithdrawMethod] = useState<'UPI' | 'Bank Transfer' | 'Stripe'>('UPI');
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  const walletStats = {
    totalLifetime: '₹1,45,000',
    availableBalance: '₹45,000',
    escrowLocked: '₹65,000',
    royaltyEarnings: '₹35,000',
    nextReleaseDate: 'Aug 28, 2026 (Sprint 4 Gate Sign-off)'
  };

  const transactions = [
    {
      id: 'tx-101',
      title: 'DocuQuery AI Commercial License Fee',
      source: 'Kestrel Logistics & Freight',
      category: 'Licensing',
      amount: '₹1,15,000 ($1,450)',
      date: 'Aug 21, 2026',
      status: 'Paid Out ✓',
      reference: 'Licensing Contract #KESTREL-RAG-01'
    },
    {
      id: 'tx-102',
      title: 'Pod Apex-2 Sprint 3 Milestone Sign-off Bounty',
      source: 'SkillPods Escrow (ABC Retail Pilot)',
      category: 'Bounties',
      amount: '₹12,500',
      date: 'Aug 18, 2026',
      status: 'Paid Out ✓',
      reference: 'Mentor Sarah Chen Approval Gate #101'
    },
    {
      id: 'tx-103',
      title: 'Pod Nova-7 Stage 4 Field Testing Escrow Lock',
      source: 'Verdant Cold Stores',
      category: 'Grants',
      amount: '₹40,000',
      date: 'Aug 14, 2026',
      status: 'Escrow Locked ⏳',
      reference: 'Releases upon Load Test Sign-off'
    },
    {
      id: 'tx-104',
      title: 'Crop AI Prototype Non-Exclusive License',
      source: 'AgroFarm Global',
      category: 'Licensing',
      amount: '₹6,000',
      date: 'Jul 28, 2026',
      status: 'Paid Out ✓',
      reference: 'Marketplace Buyout #AGRO-CROP-04'
    },
    {
      id: 'tx-105',
      title: 'Pod Apex-2 Sprint 2 Database & Auth Release',
      source: 'SkillPods Escrow',
      category: 'Bounties',
      amount: '₹12,500',
      date: 'Aug 07, 2026',
      status: 'Paid Out ✓',
      reference: 'Sprint 2 Milestone Sign-off'
    }
  ];

  const filteredTxs = transactions.filter(t => {
    if (activeFilter === 'All') return true;
    return t.category === activeFilter;
  });

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutSuccess(true);
    setTimeout(() => {
      setShowWithdrawModal(false);
      setPayoutSuccess(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Verified Student Escrow & Earnings Wallet</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Student Earnings & Project Monetization Wallet
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              Track your guaranteed pod sprint stipends, commercial software licensing royalties, and SME pilot bounties with transparent escrow management.
            </p>
          </div>

          <button
            onClick={() => setShowWithdrawModal(true)}
            className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-xs shadow-md active:scale-98 transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <CreditCard className="w-4 h-4" />
            <span>Withdraw Available Balance ({walletStats.availableBalance})</span>
          </button>
        </div>

        {/* Balances 4-Card Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-purple-200/50">
          <div className="bg-white/80 p-4 rounded-2xl border border-purple-100 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-[#7c6a9b] block">Total Lifetime Earnings</span>
            <strong className="text-2xl font-black text-[#261543] block mt-0.5">{walletStats.totalLifetime}</strong>
            <span className="text-2xs text-emerald-700 font-bold block mt-1">Across 3 Pods & 2 Licenses</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-emerald-800 font-bold block">Available for Payout</span>
            <strong className="text-2xl font-black text-emerald-700 block mt-0.5">{walletStats.availableBalance}</strong>
            <span className="text-2xs text-slate-600 font-medium block mt-1">Instant Transfer to UPI/Bank</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-amber-800 font-bold block">Escrow Locked Pool</span>
            <strong className="text-2xl font-black text-amber-900 block mt-0.5">{walletStats.escrowLocked}</strong>
            <span className="text-2xs text-[#7c6a9b] font-medium block mt-1">Releasing at Stage Gate Sign-off</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-purple-200 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-purple-900 font-bold block">Passive Royalties</span>
            <strong className="text-2xl font-black text-purple-900 block mt-0.5">{walletStats.royaltyEarnings}</strong>
            <span className="text-2xs text-purple-700 font-bold block mt-1">From Listed Student Code</span>
          </div>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-sm space-y-6">
        
        {/* Header & Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
          <div>
            <h3 className="text-xl font-black text-[#261543]">
              Milestone Payout & Royalty Ledger
            </h3>
            <p className="text-xs text-[#5c4780] font-medium mt-0.5">
              Transparent log of all milestone approvals, corporate licensing, and escrow releases.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(['All', 'Licensing', 'Bounties', 'Grants'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-[#3b226e] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Items */}
        <div className="space-y-3.5">
          {filteredTxs.map(tx => (
            <div
              key={tx.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white hover:border-purple-300 transition-all shadow-2xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-extrabold uppercase text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md">
                    {tx.category}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{tx.title}</h4>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Source: <strong>{tx.source}</strong> &bull; Ref: <span className="font-mono text-2xs">{tx.reference}</span>
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 sm:text-right">
                <div>
                  <strong className="text-base font-black text-slate-900 block">{tx.amount}</strong>
                  <span className="text-2xs text-slate-500 font-medium block">{tx.date}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-2xs font-bold border shadow-2xs shrink-0 ${
                  tx.status.includes('Paid')
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ================= MODAL: WITHDRAW EARNINGS ================= */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Withdraw to Account</h3>
                <p className="text-xs text-slate-500">Available: {walletStats.availableBalance}</p>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-slate-400 hover:text-slate-600 text-base font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  required
                  max={45000}
                  value={withdrawAmount}
                  onChange={e => setWithdrawAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-bold border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Payout Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['UPI', 'Bank Transfer', 'Stripe'] as const).map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setWithdrawMethod(method)}
                      className={`py-2 px-3 rounded-xl font-bold text-2xs border transition-all cursor-pointer ${
                        withdrawMethod === method
                          ? 'bg-[#3b226e] text-white border-[#3b226e]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">
                  {withdrawMethod === 'UPI' ? 'UPI VPA Address (e.g. dev@okhdfcbank)' : 'Account Number / IFSC'}
                </label>
                <input
                  type="text"
                  required
                  defaultValue="dev.patel@okhdfcbank"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-2xs">
                Zero withdrawal fees. Payout processed via Razorpay Escrow Highway within 15 minutes.
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
                >
                  {payoutSuccess ? <Check className="w-4 h-4" /> : null}
                  <span>{payoutSuccess ? 'Payout Initiated! ✓' : `Confirm Withdraw ₹${Number(withdrawAmount).toLocaleString()}`}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
