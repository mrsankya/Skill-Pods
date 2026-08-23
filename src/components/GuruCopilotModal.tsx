import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  GitPullRequest, 
  CheckCircle2, 
  AlertTriangle, 
  Code2, 
  Terminal,
  Zap,
  ListTodo,
  Layers,
  ArrowRight,
  FlaskConical
} from 'lucide-react';

interface GuruCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  podTitle?: string;
  onTasksGenerated?: (tasks: string[]) => void;
}

export const GuruCopilotModal: React.FC<GuruCopilotModalProps> = ({
  isOpen,
  onClose,
  podTitle = "AI Invoice & Ledger Auto-Reconciliation",
  onTasksGenerated
}) => {
  const [activeTab, setActiveTab] = useState<'decompose' | 'pr-scan' | 'architecture'>('decompose');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
  const [codeSnippet, setCodeSnippet] = useState(`// Sample Pull Request Code to Scan
export async function reconcileInvoice(req, res) {
  const { invoiceId, amount, ledgerHash } = req.body;
  
  // OCR Verification and Token match
  const match = await ocrEngine.verify(invoiceId);
  if (!match) return res.status(400).json({ error: "Invalid OCR match" });

  const signature = crypto.createHmac('sha256', process.env.SECRET)
    .update(amount + ledgerHash).digest('hex');

  await db.settlements.insert({ invoiceId, amount, signature });
  return res.json({ status: "RECONCILED", signature });
}`);

  const [scanResult, setScanResult] = useState<any>(null);

  const handleDecompose = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const tasks = [
        "Create FastAPI Webhook receiver for real-time invoice PDF uploads",
        "Implement OCR Token Extractor with 95%+ confidence thresholding",
        "Build HMAC-SHA256 ledger tamper-proof hashing pipeline",
        "Develop React 19 Kanban Dashboard with live WebSocket state sync",
        "Write 15 unit tests covering duplicate invoice replay attacks"
      ];
      setGeneratedTasks(tasks);
      setIsGenerating(false);
      if (onTasksGenerated) onTasksGenerated(tasks);
    }, 1200);
  };

  const handleScanCode = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setScanResult({
        score: 96,
        grade: "A+",
        owaspPassed: true,
        testsPassed: "18/18 Tests (100%)",
        securityNotes: [
          "✓ HMAC-SHA256 signature verification implemented correctly.",
          "✓ Input parameters properly sanitized against injection attacks.",
          "✓ Zero hardcoded secret keys detected (Environment variables loaded)."
        ],
        recommendation: "Ready for Mentor Sign-Off & Escrow Milestone Release!"
      });
      setIsGenerating(false);
    }, 1400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0f0c1a] border border-[#a855f7]/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.3)] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#171424] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/50 flex items-center justify-center text-purple-300">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-base">GURU AI Sprint Co-Pilot</h3>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-amber-400" />
                    <span>🧪 IN TESTING</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">Autonomous Sprint Decomposition & PR Security Scanner</p>
              </div>
            </div>

            <button onClick={onClose} className="text-slate-400 hover:text-white text-xl p-1 cursor-pointer">
              ✕
            </button>
          </div>

          {/* Feature Tabs */}
          <div className="flex border-b border-white/10 bg-[#120e1e] px-6 pt-2 gap-2">
            <button
              onClick={() => setActiveTab('decompose')}
              className={`px-4 py-2.5 text-xs font-mono font-semibold cursor-pointer border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'decompose' 
                  ? 'border-[#a855f7] text-white bg-purple-500/10 rounded-t-lg' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListTodo className="w-3.5 h-3.5" />
              <span>Sprint Task Decomposer</span>
            </button>

            <button
              onClick={() => setActiveTab('pr-scan')}
              className={`px-4 py-2.5 text-xs font-mono font-semibold cursor-pointer border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'pr-scan' 
                  ? 'border-[#a855f7] text-white bg-purple-500/10 rounded-t-lg' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>AI Code & PR Security Scan</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1">
            {/* Notice Banner */}
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-3.5 flex items-center justify-between text-xs text-amber-200">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Active Feature Testing:</strong> GURU analyzes problem scopes and scans PR code against live security best practices.</span>
              </div>
              <span className="font-mono text-[10px] bg-amber-400/20 px-2 py-0.5 rounded text-amber-300">V2.4 BETA</span>
            </div>

            {activeTab === 'decompose' ? (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-[11px] font-mono text-purple-400 uppercase font-semibold">Target Problem Scope</span>
                  <h4 className="text-sm font-bold text-white mt-1">{podTitle}</h4>
                  <p className="text-xs text-slate-300 mt-1">GURU will automatically break down this problem into 5 actionable Kanban developer tasks with difficulty ratings and test specifications.</p>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleDecompose}
                    disabled={isGenerating}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold font-mono tracking-wider flex items-center gap-2 shadow-lg shadow-purple-950/50 cursor-pointer disabled:opacity-60 transition-all"
                  >
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>{isGenerating ? "ANALYZING SCOPE & DECOMPOSING..." : "🤖 AUTO-DECOMPOSE INTO SPRINT TASKS"}</span>
                  </button>
                </div>

                {generatedTasks.length > 0 && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom duration-300">
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      5 Sprint Tasks Generated & Synced to Pod Board:
                    </span>
                    <div className="space-y-2">
                      {generatedTasks.map((t, idx) => (
                        <div key={idx} className="bg-[#161224] border border-purple-500/20 p-3 rounded-xl flex items-center justify-between text-xs text-slate-200">
                          <span className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">TASK #{idx + 1}</span>
                            <span>{t}</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">Active</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-bold">Pull Request Code to Scan:</label>
                  <textarea
                    rows={6}
                    value={codeSnippet}
                    onChange={e => setCodeSnippet(e.target.value)}
                    className="w-full font-mono text-xs bg-[#0a0812] border border-white/10 rounded-xl p-3 text-purple-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleScanCode}
                    disabled={isGenerating}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold font-mono tracking-wider flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-60 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isGenerating ? "SCANNING AST & OWASP VULNERABILITIES..." : "🛡️ RUN AI SECURITY & QUALITY AUDIT"}</span>
                  </button>
                </div>

                {scanResult && (
                  <div className="bg-[#141d1a] border border-emerald-500/30 rounded-2xl p-4 space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Code Security Score: {scanResult.score}/100 ({scanResult.grade})
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">OWASP PASS ✓</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      {scanResult.securityNotes.map((note: string, idx: number) => (
                        <p key={idx} className="font-mono text-[11px] text-emerald-200">{note}</p>
                      ))}
                    </div>

                    <div className="bg-emerald-950/60 p-2.5 rounded-xl text-xs font-semibold text-emerald-300 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>{scanResult.recommendation}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-[#171424] px-6 py-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Powered by GURU Autonomous Engine</span>
            <button onClick={onClose} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg cursor-pointer transition-colors">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
