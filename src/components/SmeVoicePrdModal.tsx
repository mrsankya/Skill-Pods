import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  IndianRupee, 
  Calendar,
  Layers,
  FlaskConical
} from 'lucide-react';

interface SmeVoicePrdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProblemCreated?: (problem: any) => void;
}

export const SmeVoicePrdModal: React.FC<SmeVoicePrdModalProps> = ({
  isOpen,
  onClose,
  onProblemCreated
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedPrd, setGeneratedPrd] = useState<any>(null);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setGeneratedPrd(null);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsProcessing(true);

    setTimeout(() => {
      setGeneratedPrd({
        title: "Multi-Store Barcode Inventory & Realtime Telemetry POS",
        rawTranscript: "We have 3 retail warehouses across Pune and Mumbai. When items sell at the counter, our stock count in the central warehouse gets out of sync. We need a barcode scanner web POS with instant WebSocket updates and offline sync.",
        problemScope: "Warehouse stock desynchronization causing backorders and inventory discrepancies during peak sales hours.",
        recommendedStack: ["React 19", "FastAPI", "PostgreSQL", "WebSockets", "Docker"],
        estimatedBudget: "₹35,000",
        sprintTimeline: "3 Weeks (Sprint 1: Schema & Scanner, Sprint 2: WebSockets, Sprint 3: SME Acceptance)",
        podRecommendation: "Pod Apex-2 (96% Match)",
        deliverables: [
          "Camera & USB Barcode Scanner Input Handler",
          "FastAPI Realtime Inventory Telemetry WebSocket Server",
          "Automated Low-Stock Email & SMS Alert Trigger",
          "Offline IndexedDB Caching for network disconnects"
        ]
      });
      setIsProcessing(false);
    }, 1800);
  };

  const handlePostToMarketplace = () => {
    if (onProblemCreated && generatedPrd) {
      onProblemCreated(generatedPrd);
    }
    alert("🎉 Problem Statement successfully converted to PRD and published to Student Skill Pods!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0e0c18] border border-purple-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.3)] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#171326] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-rose-600 flex items-center justify-center text-white shadow-md">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-base">SME Voice Problem-to-PRD AI</h3>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-amber-400" />
                    <span>🧪 IN TESTING</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">Speak your business pain point & GURU AI generates the technical scope</p>
              </div>
            </div>

            <button onClick={onClose} className="text-slate-400 hover:text-white text-xl p-1 cursor-pointer">
              ✕
            </button>
          </div>

          <div className="p-6 space-y-5 overflow-y-auto flex-1">
            {/* Audio Recording Controller */}
            <div className="bg-[#151222] border border-white/10 rounded-2xl p-6 text-center space-y-4">
              {!isRecording && !isProcessing && !generatedPrd && (
                <div className="space-y-3">
                  <button
                    onClick={handleStartRecording}
                    className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-rose-600 hover:scale-105 text-white flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(168,85,247,0.4)] cursor-pointer transition-all"
                  >
                    <Mic className="w-8 h-8" />
                  </button>
                  <p className="text-sm font-bold text-white">Click Microphone & Speak in Any Language</p>
                  <p className="text-xs text-slate-400">Describe your company's operational bottlenecks or software needs.</p>
                </div>
              )}

              {isRecording && (
                <div className="space-y-3">
                  <div className="w-20 h-20 rounded-full bg-rose-600/30 border-2 border-rose-500 text-rose-400 flex items-center justify-center mx-auto animate-pulse">
                    <Mic className="w-8 h-8" />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-xs font-mono font-bold text-rose-300">RECORDING AUDIO ({recordingTime}s)...</span>
                  </div>
                  <p className="text-xs text-slate-300 italic">"We have 3 retail warehouses across Pune and Mumbai..."</p>
                  <button
                    onClick={handleStopRecording}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold font-mono uppercase cursor-pointer transition-all shadow-lg"
                  >
                    Stop & Generate PRD
                  </button>
                </div>
              )}

              {isProcessing && (
                <div className="space-y-3 py-4">
                  <Bot className="w-10 h-10 text-purple-400 mx-auto animate-bounce" />
                  <p className="text-xs font-mono text-purple-300">GURU AI Speech-to-Spec Engine Analyzing Audio & Structuring PRD...</p>
                </div>
              )}
            </div>

            {/* Generated PRD Result */}
            {generatedPrd && (
              <div className="bg-[#141122] border border-purple-500/30 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    AI Structured Technical PRD
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    Ready to Post
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Project Title</span>
                    <h4 className="text-white font-bold text-sm mt-0.5">{generatedPrd.title}</h4>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Voice Transcript</span>
                    <p className="text-slate-300 italic mt-0.5 bg-black/30 p-2.5 rounded-xl border border-white/5">{generatedPrd.rawTranscript}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-white/5 p-2.5 rounded-xl">
                      <span className="text-[10px] font-mono text-slate-400 block">Estimated Escrow Budget</span>
                      <span className="text-base font-bold text-emerald-400">{generatedPrd.estimatedBudget}</span>
                    </div>
                    <div className="bg-white/5 p-2.5 rounded-xl">
                      <span className="text-[10px] font-mono text-slate-400 block">Sprint Timeline</span>
                      <span className="text-xs font-bold text-purple-300">{generatedPrd.sprintTimeline}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Key Deliverables:</span>
                    <ul className="space-y-1 text-slate-300">
                      {generatedPrd.deliverables.map((d: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={handlePostToMarketplace}
                  className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Publish Problem to Student Skill Pods</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
