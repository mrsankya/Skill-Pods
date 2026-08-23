import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  QrCode,
  ShieldCheck,
  Award,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  Download,
  GitPullRequest,
  Code2,
  Star,
  ExternalLink,
  Sparkles,
  Layers,
  FolderGit2,
  TrendingUp,
  Clock,
  Plus,
  FlaskConical,
  Printer
} from 'lucide-react';
import { VerifiedSkillPassport } from '../types';

interface StudentSkillPassportProps {
  userEmail: string;
}

export const StudentSkillPassport: React.FC<StudentSkillPassportProps> = ({
  userEmail
}) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillNotes, setNewSkillNotes] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  // Dynamically resolve student name
  const getStudentDisplayName = () => {
    try {
      const stored = localStorage.getItem('skillpods_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name && (!userEmail || parsed.email === userEmail)) return parsed.name;
      }
    } catch {}
    if (userEmail) {
      if (userEmail.toLowerCase() === 'sanketbhende0@gmail.com') return "Sanket Bhende";
      const username = userEmail.split('@')[0];
      return username
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    }
    return "Dev Patel";
  };

  const studentDisplayName = getStudentDisplayName();

  const passportData: VerifiedSkillPassport = {
    id: "pass-dev-01",
    studentName: studentDisplayName,
    studentEmail: userEmail || "dev.patel@skillpods.io",
    rollNo: "CS21B042",
    department: "Computer Science & Engineering",
    college: "National Institute of Technology",
    placementReadinessScore: 96,
    totalContributionScore: 94,
    totalLinesOfCode: 18450,
    totalPullRequests: 42,
    codeQualityRating: 4.9,
    signatureHash: "sha256:7f9a2b8e3c1d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
    issuedAt: "Aug 15, 2026",
    verifiedSkills: [
      {
        name: "FastAPI & Async Microservices",
        category: "Backend Architecture",
        level: "Expert",
        mentorName: "Sarah Chen",
        mentorCompany: "Staff Eng @ Cloudflare",
        mentorAvatar: "SC",
        verifiedDate: "Aug 18, 2026",
        projectAttribution: "Pod Apex-2 (Invoice Recon API)",
        linesOfCode: 6840,
        evidenceNotes: "Designed async background workers with idempotent webhook deduplication. 0 memory leaks observed in 50k RPS partition tests.",
        isVerified: true
      },
      {
        name: "React 19 & State Architecture",
        category: "Frontend Engineering",
        level: "Expert",
        mentorName: "Sarah Chen",
        mentorCompany: "Staff Eng @ Cloudflare",
        mentorAvatar: "SC",
        verifiedDate: "Aug 14, 2026",
        projectAttribution: "Pod Apex-2 (Telemetry Visualizer)",
        linesOfCode: 5210,
        evidenceNotes: "Built high-performance glassmorphism telemetry UI with sub-16ms render loops and optimistic UI updates.",
        isVerified: true
      },
      {
        name: "PostgreSQL & Vector Embeddings",
        category: "Database & Storage",
        level: "Advanced",
        mentorName: "Sarah Chen",
        mentorCompany: "Staff Eng @ Cloudflare",
        mentorAvatar: "SC",
        verifiedDate: "Aug 10, 2026",
        projectAttribution: "DocuQuery AI & Pod Apex-2",
        linesOfCode: 3400,
        evidenceNotes: "Implemented pgvector indexing with hybrid BM25 full text matching and sub-40ms query execution.",
        isVerified: true
      },
      {
        name: "Docker Containerization & CI/CD",
        category: "DevOps & Cloud",
        level: "Advanced",
        mentorName: "Marcus Vance",
        mentorCompany: "Principal Architect @ Datadog",
        mentorAvatar: "MV",
        verifiedDate: "Aug 02, 2026",
        projectAttribution: "Pod Apex-2 Deployment",
        linesOfCode: 1200,
        evidenceNotes: "Configured multi-stage lightweight Alpine containers with automated GitHub Actions lint and test stages.",
        isVerified: true
      },
      {
        name: "WebSockets & Streaming Networking",
        category: "Realtime Systems",
        level: "Advanced",
        mentorName: "Priya Sharma",
        mentorCompany: "Staff Eng @ Razorpay",
        mentorAvatar: "PS",
        verifiedDate: "Jul 28, 2026",
        projectAttribution: "EdgeSensor Mesh & Pod Nova-7",
        linesOfCode: 1800,
        evidenceNotes: "Engineered automatic reconnect backoff protocol with payload compression over WebSockets.",
        isVerified: true
      }
    ],
    projectContributions: [
      {
        podName: "Pod Apex-2",
        projectTitle: "AI Invoice & Ledger Auto-Reconciliation",
        role: "Full-Stack Pod Lead",
        contributionPercentage: 48,
        prsMerged: 28,
        peerReviewScore: 4.9,
        mentorEndorsement: "Dev shows exceptional technical leadership and production-grade engineering rigor."
      },
      {
        podName: "DocuQuery AI",
        projectTitle: "Enterprise RAG Document Search",
        role: "Lead Creator",
        contributionPercentage: 72,
        prsMerged: 14,
        peerReviewScore: 4.8,
        mentorEndorsement: "Architected a commercially viable product licensed by enterprise logistics companies."
      }
    ]
  };

  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(passportData.signatureHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleDownloadPdf = () => {
    setShowPdfModal(true);
  };

  const handleRequestVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setShowVerifyModal(false);
      setRequestSent(false);
      setNewSkillName('');
      setNewSkillNotes('');
    }, 1800);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Holographic Passport Card */}
      <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#1b1430] via-[#241a42] to-[#120d24] text-white shadow-2xl border border-purple-500/30 overflow-hidden">
        
        {/* Ambient Glow Arc behind */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Top Header of Passport */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-400/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center text-white shadow-lg">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    Verified Skill Passport &trade;
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-2xs">
                    Cryptographically Signed ✓
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] flex items-center gap-1">
                    <FlaskConical className="w-3 h-3 text-amber-400" />
                    <span>🧪 IN TESTING</span>
                  </span>
                </div>
                <p className="text-xs text-purple-300 font-mono mt-0.5">
                  ID: {passportData.id.toUpperCase()} &bull; Issued {passportData.issuedAt}
                </p>
              </div>
            </div>

            {/* Actions: Download PDF, Copy Hash & QR */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                title="Download Verified PDF Certificate"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF (Beta)</span>
              </button>

              <button
                onClick={() => setShowQrModal(true)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="Scan QR Code"
              >
                <QrCode className="w-3.5 h-3.5 text-purple-300" />
                <span>QR Verify</span>
              </button>

              <button
                onClick={handleCopyHash}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="Copy Signature Hash"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? 'Hash Copied!' : 'Verify Hash'}</span>
              </button>
            </div>
          </div>

          {/* Student Info & QR Code Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Student Meta (8 cols) */}
            <div className="md:col-span-8 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-purple-400 text-[10px] uppercase tracking-wider block">Student Builder</span>
                  <strong className="text-sm font-black text-white">{passportData.studentName}</strong>
                </div>
                <div>
                  <span className="text-purple-400 text-[10px] uppercase tracking-wider block">Roll Number</span>
                  <strong className="text-sm font-black text-white font-mono">{passportData.rollNo}</strong>
                </div>
                <div>
                  <span className="text-purple-400 text-[10px] uppercase tracking-wider block">Institution</span>
                  <strong className="text-sm font-black text-white">{passportData.college}</strong>
                </div>
              </div>

              {/* Hash Display */}
              <div className="p-3 rounded-xl bg-black/40 border border-purple-500/20 font-mono text-2xs text-purple-300 break-all flex items-center justify-between gap-2">
                <span>{passportData.signatureHash}</span>
                <span className="text-emerald-400 font-bold shrink-0">SHA-256 Valid</span>
              </div>
            </div>

            {/* QR & Integrity Badge (4 cols) */}
            <div className="md:col-span-4 flex items-center justify-center md:justify-end gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="w-20 h-20 bg-white p-2 rounded-xl flex items-center justify-center shadow-inner shrink-0">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
              <div className="space-y-1 text-2xs">
                <div className="font-bold text-white">Tamper-Proof Proof of Work</div>
                <p className="text-purple-300">Each skill links directly to verified GitHub commits and mentor signed reviews.</p>
              </div>
            </div>

          </div>

          {/* 🏆 Contribution Score & Placement Readiness Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-purple-400/20">
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] uppercase tracking-wider text-purple-300 font-bold block">Contribution Score</span>
              <strong className="text-2xl font-black text-white">{passportData.totalContributionScore} / 100</strong>
              <span className="text-[9px] text-emerald-400 font-bold block mt-0.5">Top 3% Platform Rank</span>
            </div>
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] uppercase tracking-wider text-purple-300 font-bold block">Placement Readiness</span>
              <strong className="text-2xl font-black text-purple-200">{passportData.placementReadinessScore}%</strong>
              <span className="text-[9px] text-emerald-400 font-bold block mt-0.5">Industry Ready ✓</span>
            </div>
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] uppercase tracking-wider text-purple-300 font-bold block">Production Code</span>
              <strong className="text-2xl font-black text-white">{passportData.totalLinesOfCode.toLocaleString()}</strong>
              <span className="text-[9px] text-purple-300 font-bold block mt-0.5">Lines of Tested Code</span>
            </div>
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] uppercase tracking-wider text-purple-300 font-bold block">PRs Merged</span>
              <strong className="text-2xl font-black text-white">{passportData.totalPullRequests} PRs</strong>
              <span className="text-[9px] text-purple-300 font-bold block mt-0.5">Across 3 Skill Pods</span>
            </div>
          </div>

        </div>
      </div>

      {/* Verified Skills Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-[#261543]">
            Mentor-Verified Skill Badges ({passportData.verifiedSkills.length})
          </h3>
          <p className="text-xs text-[#5c4780] font-medium mt-0.5">
            Directly evaluated and signed off by Staff Engineers & Architects from top tech companies.
          </p>
        </div>

        <button
          onClick={() => setShowVerifyModal(true)}
          className="px-4 py-2.5 bg-[#3b226e] hover:bg-[#281549] text-white text-xs font-bold rounded-2xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Request Skill Verification from Mentor</span>
        </button>
      </div>

      {/* Verified Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {passportData.verifiedSkills.map((sk, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -2 }}
            className="bg-white rounded-3xl p-6 border border-purple-200/80 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase tracking-wider text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  {sk.category}
                </span>
                <span className="text-2xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified {sk.level}
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-[#261543]">{sk.name}</h4>
                <p className="text-xs text-purple-900 font-semibold mt-0.5">
                  Applied in: <strong>{sk.projectAttribution}</strong>
                </p>
              </div>

              {/* Evidence Notes */}
              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/60 text-xs text-[#261543] leading-relaxed">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#5c4780] block mb-1">Mentor Evaluation & Proof:</span>
                "{sk.evidenceNotes}"
              </div>
            </div>

            {/* Mentor Signature Footer */}
            <div className="pt-3 border-t border-purple-100 flex items-center justify-between text-2xs text-[#5c4780]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-700 text-white font-bold text-xs flex items-center justify-center">
                  {sk.mentorAvatar || sk.mentorName.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-[#261543] block">{sk.mentorName}</span>
                  <span className="text-[10px] text-[#7c6a9b]">{sk.mentorCompany}</span>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="font-bold text-slate-900 block">{sk.linesOfCode} LOC</span>
                <span className="text-[10px]">{sk.verifiedDate}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Contribution Score Detail Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-sm space-y-6">
        <h3 className="text-lg font-black text-[#261543]">
          Pod Contribution & Peer Review Audit
        </h3>

        <div className="space-y-4">
          {passportData.projectContributions.map((contrib, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md">
                      {contrib.podName}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{contrib.projectTitle}</h4>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold mt-1">Role: <strong>{contrib.role}</strong></p>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="text-purple-900 bg-purple-50 px-2.5 py-1 rounded-xl border border-purple-200">
                    Contribution: {contrib.contributionPercentage}%
                  </span>
                  <span className="text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                    Peer Score: {contrib.peerReviewScore} ★
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                Mentor Endorsement: <span className="italic">"{contrib.mentorEndorsement}"</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= MODAL: REQUEST SKILL VERIFICATION ================= */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-lg">Request Skill Verification</h3>
              <button onClick={() => setShowVerifyModal(false)} className="text-slate-400 hover:text-slate-600 text-base font-bold">✕</button>
            </div>

            <form onSubmit={handleRequestVerification} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Select Skill to Verify *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Caching with Redis"
                  value={newSkillName}
                  onChange={e => setNewSkillName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Assigned Mentor</label>
                <select className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500">
                  <option>Sarah Chen (Staff Eng @ Cloudflare)</option>
                  <option>Marcus Vance (Principal Architect @ Datadog)</option>
                  <option>Priya Sharma (Staff Eng @ Razorpay)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Pull Request / Evidence Link</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain where this skill was implemented with PR links and benchmark results."
                  value={newSkillNotes}
                  onChange={e => setNewSkillNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowVerifyModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-[#3b226e] hover:bg-[#281549] text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  {requestSent ? <Check className="w-3.5 h-3.5" /> : null}
                  <span>{requestSent ? 'Request Queued!' : 'Submit for Mentor Review'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: PDF DOWNLOAD & PRINT PREVIEW ================= */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151221] border border-purple-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-white space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-lg">Skill Passport &trade; PDF Certificate</h3>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">🧪 IN TESTING</span>
              </div>
              <button onClick={() => setShowPdfModal(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            {/* Certificate Preview Card */}
            <div className="bg-white text-slate-900 p-6 rounded-2xl border-4 border-purple-900/40 shadow-inner space-y-4 font-serif">
              <div className="text-center border-b-2 border-slate-900 pb-3">
                <span className="text-[10px] font-mono tracking-widest text-purple-800 uppercase font-bold">OFFICIAL CRYPTOGRAPHIC PROOF OF WORK</span>
                <h2 className="text-xl font-black tracking-tight text-slate-900 mt-0.5">SKILL PODS VERIFIED PASSPORT</h2>
                <p className="text-xs text-slate-600 font-sans mt-0.5">National Institute of Technology &bull; Academic Year 2025-2026</p>
              </div>

              <div className="flex items-center justify-between text-xs font-sans">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Certified Builder</span>
                  <span className="text-base font-bold text-slate-900">{passportData.studentName}</span>
                  <span className="text-xs text-purple-700 block">{passportData.studentEmail} &bull; {passportData.rollNo}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase block font-bold">Placement Score</span>
                  <span className="text-2xl font-black text-emerald-600">{passportData.placementReadinessScore}/100</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-sans space-y-1">
                <span className="font-bold text-slate-900 block text-[11px]">Verified Industry Skills:</span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-700">
                  {passportData.verifiedSkills.map((s, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="text-emerald-600 font-bold">✓</span> {s.name} ({s.linesOfCode} LOC)
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>HASH: {passportData.signatureHash.slice(0, 32)}...</span>
                <span className="text-purple-800 font-bold">MENTOR SIGNATURE: SARAH CHEN (CLOUDFLARE) ✓</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-mono">Generates print-ready high-resolution PDF</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: QR CODE VERIFICATION ================= */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151221] border border-purple-500/40 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-white space-y-4 text-center">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-bold text-sm">QR Code Passport Verification</h3>
              <button onClick={() => setShowQrModal(false)} className="text-slate-400 hover:text-white text-base">✕</button>
            </div>

            <div className="bg-white p-6 rounded-2xl inline-block mx-auto border-2 border-purple-500 shadow-lg">
              <QrCode className="w-36 h-36 text-slate-900 mx-auto" />
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-mono text-purple-300">ID: {passportData.id.toUpperCase()}</p>
              <p className="text-slate-400 text-[11px]">Scan with any smartphone camera to verify student credentials & cryptographic mentor signature.</p>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold font-mono cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
