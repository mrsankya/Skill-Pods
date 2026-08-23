import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  Download,
  FlaskConical,
  Award
} from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({
  isOpen,
  onClose,
  projectTitle = "AI Invoice & Ledger Auto-Reconciliation (DocuQuery AI)"
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      slideNo: 1,
      title: "DocuQuery AI &bull; Smart Ledger",
      tagline: "Autonomous Multi-Warehouse Invoice Telemetry for Indian Retail",
      body: "Replacing manual ledger entries with sub-second OCR verification and cryptographic tamper-proof hashing.",
      highlights: ["Built by Pod Apex-2", "Mentored by Cloudflare Architect", "Verified 18,450 LOC"]
    },
    {
      slideNo: 2,
      title: "The Problem",
      tagline: "₹1.4 Lakh Crore Lost Annually in Manual Retail Discrepancies",
      body: "Medium businesses lose 3-5% margin on misplaced invoices, duplicate billing, and slow end-of-month reconciliations.",
      highlights: ["34 manual hours/week wasted", "Duplicate billing fraud risk", "Lack of real-time multi-store telemetry"]
    },
    {
      slideNo: 3,
      title: "The Solution & Architecture",
      tagline: "Sub-Second Microservice Processing over WebSockets",
      body: "FastAPI microservices extract data using ONNX-quantized OCR, verified against PostgreSQL pgvector and signed with HMAC-SHA256.",
      highlights: ["99.4% OCR Extraction Accuracy", "<40ms Telemetry Round-Trip", "Offline Caching via IndexedDB"]
    },
    {
      slideNo: 4,
      title: "Market Opportunity (TAM)",
      tagline: "6.3 Crore Indian MSMEs Digitizing Post-GST",
      body: "Targeting 250,000 mid-sized retailers and distributor networks across Tier 1 & Tier 2 cities in India.",
      highlights: ["₹12,000 / store / year SaaS model", "$4.8B Total Addressable Market in India", "Zero hardware setup required"]
    },
    {
      slideNo: 5,
      title: "Traction & SME Feedback",
      tagline: "Validated with 3 Active Commercial Warehouses",
      body: "Pilot deployed across ABC Retail and Kestrel Freight with 100% mentor sign-off.",
      highlights: ["₹25,000 initial escrow milestone earned", "98.4% uptime in pilot testing", "Commercial licensing IP filed on SkillPods"]
    }
  ];

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
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-base">GURU AI Investor Pitch Deck</h3>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-amber-400" />
                    <span>🧪 IN TESTING</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">Autonomous Startup Pitch Deck & Commercialization Teaser</p>
              </div>
            </div>

            <button onClick={onClose} className="text-slate-400 hover:text-white text-xl p-1 cursor-pointer">
              ✕
            </button>
          </div>

          {/* Slide Stage */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1 flex flex-col justify-between">
            <div className="bg-gradient-to-br from-[#1c1433] to-[#100b21] border border-purple-500/30 rounded-3xl p-8 text-white min-h-[280px] flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-purple-300">
                  <span className="bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-500/30">
                    SLIDE {slides[currentSlide].slideNo} OF {slides.length}
                  </span>
                  <span>SKILLPODS VENTURE MEMO</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-2">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-sm font-semibold text-emerald-400 font-mono">
                  {slides[currentSlide].tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                  {slides[currentSlide].body}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-6">
                {slides[currentSlide].highlights.map((h, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl text-[11px] font-mono text-purple-200 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <button
                  disabled={currentSlide === 0}
                  onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  disabled={currentSlide === slides.length - 1}
                  onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Next Slide</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Pitch Deck</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
