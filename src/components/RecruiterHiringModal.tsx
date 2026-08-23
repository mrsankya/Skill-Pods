import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Search, 
  ShieldCheck, 
  Star, 
  Award, 
  CheckCircle2, 
  Send, 
  Building2, 
  ArrowRight,
  Filter,
  Sparkles,
  FlaskConical,
  Mail,
  ExternalLink
} from 'lucide-react';

interface RecruiterHiringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterHiringModal: React.FC<RecruiterHiringModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [offerSent, setOfferSent] = useState<string | null>(null);

  const candidates = [
    {
      id: "cand-1",
      name: "Dev Patel",
      role: "Full-Stack & Distributed Systems Lead",
      college: "National Institute of Technology",
      placementScore: 96,
      verifiedLOC: "18,450 LOC",
      prsMerged: 42,
      mentor: "Sarah Chen (Staff Architect @ Cloudflare)",
      topSkills: ["React 19", "FastAPI", "PostgreSQL", "Docker", "WebSockets"],
      badge: "Apex-2 Pod Lead",
      hourlyOffer: "₹65,000 / mo Internship or ₹18 LPA Full-Time"
    },
    {
      id: "cand-2",
      name: "Maya Lin",
      role: "Backend & Golang Systems Engineer",
      college: "Indian Institute of Information Technology",
      placementScore: 94,
      verifiedLOC: "14,200 LOC",
      prsMerged: 36,
      mentor: "Marcus Vance (Datadog)",
      topSkills: ["Go", "Kubernetes", "Redis", "gRPC", "Kafka"],
      badge: "High-QPS Specialist",
      hourlyOffer: "₹55,000 / mo Internship or ₹16 LPA Full-Time"
    },
    {
      id: "cand-3",
      name: "Priya Nair",
      role: "AI & Computer Vision ML Lead",
      college: "BITS Pilani",
      placementScore: 97,
      verifiedLOC: "21,800 LOC",
      prsMerged: 48,
      mentor: "Devendra Rao (Swiggy)",
      topSkills: ["PyTorch", "YOLOv8", "ONNX", "FastAPI", "CUDA"],
      badge: "Vision-X Pod Lead",
      hourlyOffer: "₹75,000 / mo Internship or ₹22 LPA Full-Time"
    }
  ];

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.topSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = selectedRole === 'All' || c.role.includes(selectedRole);
    return matchesSearch && matchesRole;
  });

  const handleSendOffer = (candidateName: string) => {
    setOfferSent(candidateName);
    setTimeout(() => {
      setOfferSent(null);
      setSelectedCandidate(null);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-4xl bg-[#0e0c18] border border-purple-500/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.3)] flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#171326] px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-base">Corporate Recruiter & Talent Access</h3>
                  <span className="text-[10px] font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-amber-400" />
                    <span>🧪 IN TESTING</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400">Hire Verified Top 1% Student Engineers with Cryptographic Proof of Work</p>
              </div>
            </div>

            <button onClick={onClose} className="text-slate-400 hover:text-white text-xl p-1 cursor-pointer">
              ✕
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 sm:p-6 border-b border-white/10 bg-[#120f20] flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by verified skill (e.g. PyTorch, React 19, Go) or student name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-[#1b172a] text-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto">
              {['All', 'Full-Stack', 'Backend', 'AI'].map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold cursor-pointer transition-all ${
                    selectedRole === r ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Candidate Roster */}
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {filteredCandidates.map(cand => (
              <div 
                key={cand.id}
                className="bg-[#151222] border border-white/10 rounded-2xl p-5 hover:border-purple-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-white font-bold text-base">{cand.name}</h4>
                    <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-500/30">
                      {cand.badge}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      Score: {cand.placementScore}/100
                    </span>
                  </div>

                  <p className="text-xs text-purple-200">{cand.role} &bull; <span className="text-slate-400">{cand.college}</span></p>

                  <div className="flex items-center gap-2 flex-wrap text-xs text-slate-300">
                    <span className="font-mono text-[11px] text-emerald-300">📊 {cand.verifiedLOC} written</span>
                    <span className="text-white/20">&bull;</span>
                    <span className="font-mono text-[11px] text-blue-300">🔀 {cand.prsMerged} PRs merged</span>
                    <span className="text-white/20">&bull;</span>
                    <span className="text-[11px] text-slate-400">Mentor: {cand.mentor}</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {cand.topSkills.map((s, i) => (
                      <span key={i} className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
                  <span className="text-xs font-mono text-emerald-400 font-bold">{cand.hourlyOffer}</span>
                  <button
                    onClick={() => handleSendOffer(cand.name)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send 1-Click Offer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Success Toast */}
          {offerSent && (
            <div className="absolute bottom-16 inset-x-6 bg-emerald-950 border border-emerald-500 text-emerald-200 p-4 rounded-2xl text-xs font-mono flex items-center gap-2 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>🎉 Direct Interview Invitation & Offer Sent to {offerSent}! Fast-track hiring link active.</span>
            </div>
          )}

          {/* Footer */}
          <div className="bg-[#171326] px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Verified Industry Hiring Pipeline &bull; SkillPods Talent Network</span>
            <button onClick={onClose} className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg cursor-pointer">
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
