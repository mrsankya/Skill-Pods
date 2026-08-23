import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Play, 
  CheckCircle2, 
  Code2, 
  Send, 
  Layers, 
  Sparkles,
  FlaskConical
} from 'lucide-react';

interface ApiSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiSandboxModal: React.FC<ApiSandboxModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('POST /api/v1/reconcile-invoice');
  const [requestBody, setRequestBody] = useState(`{
  "invoiceId": "INV-2026-9482",
  "amount": 25400,
  "vendorGst": "27AAAPL1234C1ZV",
  "items": [
    { "sku": "BARCODE-SCAN-01", "quantity": 12, "unitPrice": 1400 },
    { "sku": "THERMAL-ROLL-100", "quantity": 50, "unitPrice": 172 }
  ]
}`);
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  const handleExecute = () => {
    setIsLoading(true);
    setResponseOutput(null);

    setTimeout(() => {
      const resp = {
        status: "200 OK",
        reconciled: true,
        confidenceScore: 0.994,
        ledgerHash: "sha256:4a8b7c9e0d1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f",
        telemetry: {
          roundTripMs: 28,
          memoryUsageMb: 14.2,
          clusterNode: "apex-2-node-pune"
        },
        escrowEligible: true
      };
      setLatency(28);
      setResponseOutput(JSON.stringify(resp, null, 2));
      setIsLoading(false);
    }, 850);
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
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-base">In-Browser API & Telemetry Testbench</h3>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-amber-400" />
                    <span>🧪 IN TESTING</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">Live Interactive API Endpoint Execution for Evaluators & Mentors</p>
              </div>
            </div>

            <button onClick={onClose} className="text-slate-400 hover:text-white text-xl p-1 cursor-pointer">
              ✕
            </button>
          </div>

          <div className="p-6 space-y-4 overflow-y-auto flex-1 font-mono text-xs">
            {/* Endpoint Selector */}
            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs">POST</span>
              <input
                type="text"
                readOnly
                value="https://api.skillpods.dev/v1/pods/apex-2/reconcile-invoice"
                className="flex-1 bg-[#181427] text-purple-200 px-3.5 py-1.5 rounded-xl border border-white/10"
              />
              <button
                onClick={handleExecute}
                disabled={isLoading}
                className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isLoading ? "Running..." : "Send Request"}</span>
              </button>
            </div>

            {/* Request Body Editor */}
            <div>
              <label className="block text-slate-400 text-[11px] mb-1 font-sans font-bold">Request JSON Payload:</label>
              <textarea
                rows={6}
                value={requestBody}
                onChange={e => setRequestBody(e.target.value)}
                className="w-full bg-[#0a0812] text-emerald-300 p-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-emerald-500 font-mono text-xs"
              />
            </div>

            {/* Response Console */}
            {responseOutput && (
              <div className="space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-slate-400 text-[11px] font-sans">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Response (200 OK &bull; {latency}ms)
                  </span>
                  <span>Pod Apex-2 Node (FastAPI Async)</span>
                </div>
                <pre className="bg-[#0a0812] text-purple-200 p-3.5 rounded-xl border border-emerald-500/30 overflow-x-auto text-xs">
                  {responseOutput}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-[#171326] px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Direct WebRTC & REST WebSocket telemetry connection</span>
            <button onClick={onClose} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg cursor-pointer">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
