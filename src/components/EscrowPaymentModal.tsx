import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Building2, 
  ArrowRight,
  FlaskConical,
  QrCode
} from 'lucide-react';

interface EscrowPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  podTitle?: string;
  milestoneAmount?: string;
  onPaymentSuccess?: (amount: string, txId: string) => void;
}

export const EscrowPaymentModal: React.FC<EscrowPaymentModalProps> = ({
  isOpen,
  onClose,
  podTitle = "Pod Apex-2 Sprint 3 Milestone",
  milestoneAmount = "₹25,000",
  onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('enterprise.sme@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txDetails, setTxDetails] = useState<any>(null);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedTx = {
        txId: `escrow_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        amount: milestoneAmount,
        date: new Date().toLocaleString(),
        status: "LOCKED_IN_ESCROW_VAULT",
        hash: "0x7f9a2b8e3c1d4a5b6c7d8e9f0a1b2c3d4e5f6a7b"
      };
      setTxDetails(generatedTx);
      setIsProcessing(false);
      setIsSuccess(true);
      if (onPaymentSuccess) onPaymentSuccess(milestoneAmount, generatedTx.txId);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-lg bg-[#0e0c18] border border-purple-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.3)] flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#171326] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-base">Escrow Vault Gateway</h3>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-amber-400" />
                    <span>🧪 IN TESTING</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">Automated Smart Milestone Disbursement</p>
              </div>
            </div>

            <button onClick={onClose} className="text-slate-400 hover:text-white text-xl p-1 cursor-pointer">
              ✕
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Testing Badge */}
            <div className="bg-purple-950/30 border border-purple-500/20 rounded-2xl p-3 text-xs text-purple-300 flex items-center justify-between">
              <span><strong>Sandbox Mode:</strong> Real-time escrow lock & milestone auto-settlement simulator.</span>
              <span className="font-mono text-[10px] bg-purple-500/20 px-2 py-0.5 rounded text-purple-300">TESTNET</span>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleDeposit} className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase">Milestone Lock Amount</span>
                    <h4 className="text-2xl font-bold text-emerald-400 mt-0.5">{milestoneAmount}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{podTitle}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-bold mb-2">Select Funding Method:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'upi' ? 'bg-purple-600/30 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Instant UPI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'card' ? 'bg-purple-600/30 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Card / Wire</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'netbanking' ? 'bg-purple-600/30 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Corporate</span>
                    </button>
                  </div>
                </div>

                {/* Method Input */}
                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate / Enterprise VPA / UPI ID:</label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="company@upi"
                      className="w-full bg-[#161224] text-white text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40 disabled:opacity-60 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? "LOCKING FUNDS INTO ESCROW..." : `LOCK ${milestoneAmount} IN ESCROW VAULT`}</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-5 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-white font-bold text-base">Escrow Funded & Locked Successfully!</h4>
                  <p className="text-xs text-slate-300">{milestoneAmount} is secured in SkillPods Smart Escrow. Funds will disburse to the 3 students upon Mentor Sarah Chen's sign-off.</p>
                </div>

                <div className="bg-[#141122] border border-white/10 rounded-xl p-3 space-y-1.5 text-[11px] font-mono text-slate-300">
                  <div className="flex justify-between"><span className="text-slate-400">Transaction ID:</span><span className="text-purple-300">{txDetails?.txId}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Cryptographic Hash:</span><span className="text-emerald-400 truncate max-w-[200px]">{txDetails?.hash}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Status:</span><span className="text-emerald-400">LOCKED (Awaiting Sign-off)</span></div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold font-mono uppercase cursor-pointer transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
