import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  GitPullRequest,
  Check,
  Star,
  Plus,
  Clock,
  ExternalLink,
  FolderGit2,
  FileCheck2,
  Sparkles,
  BarChart3
} from 'lucide-react';

interface MentorSkillVerificationProps {
  userEmail: string;
}

interface StudentSkillAudit {
  id: string;
  studentName: string;
  rollNo: string;
  podName: string;
  projectTitle: string;
  role: string;
  contributionScore: number;
  prsMerged: number;
  linesOfCode: number;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Intermediate';
    status: 'Verified ✓' | 'Pending Audit' | 'Needs Evidence';
    evidence: string;
  }[];
}

export const MentorSkillVerification: React.FC<MentorSkillVerificationProps> = ({
  userEmail
}) => {
  const [students, setStudents] = useState<StudentSkillAudit[]>([
    {
      id: 'stud-01',
      studentName: 'Dev Patel',
      rollNo: 'CS21B042',
      podName: 'Pod Apex-2',
      projectTitle: 'AI Invoice & Ledger Auto-Reconciliation',
      role: 'Full-Stack Lead',
      contributionScore: 48,
      prsMerged: 28,
      linesOfCode: 6840,
      skills: [
        { name: 'FastAPI & Async Microservices', level: 'Expert', status: 'Verified ✓', evidence: 'Idempotent webhook queue with 0 memory leaks.' },
        { name: 'React 19 & Telemetry State', level: 'Expert', status: 'Verified ✓', evidence: 'High-performance glassmorphism render loop.' },
        { name: 'PostgreSQL Vector Search', level: 'Advanced', status: 'Verified ✓', evidence: 'pgvector hybrid BM25 full-text indexing.' },
        { name: 'Distributed Caching (Redis)', level: 'Advanced', status: 'Pending Audit', evidence: 'PR #42 implements session token caching.' }
      ]
    },
    {
      id: 'stud-02',
      studentName: 'Maya Lin',
      rollNo: 'CS21B058',
      podName: 'Pod Apex-2',
      projectTitle: 'AI Invoice & Ledger Auto-Reconciliation',
      role: 'Backend / Golang',
      contributionScore: 30,
      prsMerged: 18,
      linesOfCode: 4200,
      skills: [
        { name: 'Go Concurrency & Channels', level: 'Expert', status: 'Verified ✓', evidence: 'Worker pool processing 1,200 PDF scans per minute.' },
        { name: 'PostgreSQL Relational Design', level: 'Advanced', status: 'Verified ✓', evidence: 'Optimized multi-tenant foreign key constraints.' },
        { name: 'Docker Multi-Stage Builds', level: 'Intermediate', status: 'Pending Audit', evidence: 'Alpine container image reduction to 28MB.' }
      ]
    },
    {
      id: 'stud-03',
      studentName: 'Elena Rostova',
      rollNo: 'IT21B012',
      podName: 'Pod Nova-7',
      projectTitle: 'Cold Chain Telemetry & Sensor Mesh',
      role: 'IoT Firmware & Ingest',
      contributionScore: 52,
      prsMerged: 32,
      linesOfCode: 7100,
      skills: [
        { name: 'MQTT Protocol Architecture', level: 'Expert', status: 'Verified ✓', evidence: 'Broker clustering with exponential backoff retry logic.' },
        { name: 'TimescaleDB Hypertables', level: 'Advanced', status: 'Verified ✓', evidence: 'Streaming data compression reducing disk I/O by 64%.' },
        { name: 'WebSockets Realtime Gateway', level: 'Advanced', status: 'Pending Audit', evidence: 'Sub-35ms broadcast to 40 connected cold-room displays.' }
      ]
    }
  ]);

  const [selectedStudentId, setSelectedStudentId] = useState<string>('stud-01');
  const [showVerifyModal, setShowVerifyModal] = useState<boolean>(false);
  const [selectedSkillToVerify, setSelectedSkillToVerify] = useState<string>('');
  const [mentorEvidenceNote, setMentorEvidenceNote] = useState<string>('');
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false);

  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handleVerifySkill = (e: React.FormEvent) => {
    e.preventDefault();
    setStudents(prev => prev.map(s => {
      if (s.id === selectedStudent.id) {
        return {
          ...s,
          skills: s.skills.map(sk => {
            if (sk.name === selectedSkillToVerify) {
              return {
                ...sk,
                status: 'Verified ✓',
                evidence: mentorEvidenceNote || sk.evidence
              };
            }
            return sk;
          })
        };
      }
      return s;
    }));

    setVerificationSuccess(true);
    setTimeout(() => {
      setShowVerifyModal(false);
      setVerificationSuccess(false);
      setMentorEvidenceNote('');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-purple-700" />
              <span>Cryptographic Skill Verification & Contribution Audit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Verify Student Skills & Audit Pod Contributions
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              As an industry mentor, your digital verification stamp mints into the student’s Skill Passport and institutional records, validating production competence.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-purple-200/80 shadow-xs flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#261543]">Official Mentor Sign-off</div>
              <div className="text-2xs text-[#5c4780]">Validates real GitHub PRs & lines of code</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Student Roster (4 cols) */}
        <div className="lg:col-span-4 space-y-3.5">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#5c4780]">
            Pod Students ({students.length})
          </h3>

          {students.map(stud => {
            const isSelected = stud.id === selectedStudent.id;
            return (
              <motion.div
                key={stud.id}
                onClick={() => setSelectedStudentId(stud.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-5 rounded-3xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-white border-purple-600 shadow-md ring-2 ring-purple-600/20'
                    : 'bg-white/70 hover:bg-white border-purple-100 shadow-2xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-extrabold uppercase text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                      {stud.podName}
                    </span>
                    <span className="text-2xs font-bold text-slate-500 font-mono">
                      {stud.rollNo}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-[#261543] leading-snug">{stud.studentName}</h4>
                  <p className="text-xs text-[#5c4780] font-medium">{stud.role}</p>

                  <div className="pt-2 border-t border-purple-100 flex items-center justify-between text-2xs text-[#5c4780]">
                    <span className="font-bold text-purple-900">{stud.contributionScore}% Contribution</span>
                    <span>{stud.prsMerged} PRs &bull; {stud.linesOfCode} LOC</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Audit & Verification Room (8 cols) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-sm space-y-6">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-purple-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-2xs uppercase tracking-wider">
                    {selectedStudent.podName}
                  </span>
                  <span className="text-2xs font-bold text-purple-900 font-mono bg-purple-50 px-2 py-0.5 rounded-md">
                    {selectedStudent.rollNo}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#261543] mt-2 leading-tight">
                  {selectedStudent.studentName} &mdash; {selectedStudent.role}
                </h3>
                <p className="text-xs text-[#5c4780] font-semibold mt-1">
                  Active Project: <strong className="text-slate-900">{selectedStudent.projectTitle}</strong>
                </p>
              </div>

              {/* Contribution Metric */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-3.5 rounded-2xl border border-purple-200 shrink-0 text-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-900 block">Contribution Share</span>
                <strong className="text-xl font-black text-[#261543] block mt-0.5">{selectedStudent.contributionScore}%</strong>
                <span className="text-2xs text-emerald-700 font-bold block">{selectedStudent.prsMerged} Merged PRs</span>
              </div>
            </div>

            {/* Skills Verification List */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#5c4780]">
                Technical Competencies Under Audit ({selectedStudent.skills.length})
              </h4>

              <div className="space-y-3">
                {selectedStudent.skills.map((sk, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{sk.name}</span>
                        <span className="text-2xs font-extrabold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md">
                          {sk.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">Evidence: <span className="italic text-slate-800">"{sk.evidence}"</span></p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-2xs font-bold ${
                        sk.status.includes('Verified')
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {sk.status}
                      </span>

                      {sk.status.includes('Pending') && (
                        <button
                          onClick={() => {
                            setSelectedSkillToVerify(sk.name);
                            setShowVerifyModal(true);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-[#3b226e] hover:bg-[#281549] text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
                        >
                          Verify ✓
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review History Audit Trail */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#5c4780]">
                Permanent Mentor Audit Trail
              </h4>
              <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs text-[#261543] space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span>Sprint 3 Code & Architecture Pass</span>
                  <span className="text-2xs text-[#7c6a9b]">Aug 18, 2026</span>
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">
                  "Verified async task queue and error backpressure handling in FastAPI. 0 memory leaks in partition tests." &mdash; Sarah Chen (Staff Eng @ Cloudflare)
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ================= MODAL: GRANT SKILL VERIFICATION ================= */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-2xs font-extrabold uppercase text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  Skill Verification Stamp
                </span>
                <h3 className="font-black text-slate-900 text-lg mt-1">Verify: {selectedSkillToVerify}</h3>
              </div>
              <button onClick={() => setShowVerifyModal(false)} className="text-slate-400 hover:text-slate-600 text-base font-bold">✕</button>
            </div>

            <form onSubmit={handleVerifySkill} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Target Student:</label>
                <div className="p-2.5 bg-slate-50 rounded-xl font-bold text-slate-800 border border-slate-200">
                  {selectedStudent.studentName} ({selectedStudent.rollNo}) &bull; {selectedStudent.podName}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Mentor Evaluation Note (Mints into Passport) *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail why this student demonstrated production competence in this skill..."
                  value={mentorEvidenceNote}
                  onChange={e => setMentorEvidenceNote(e.target.value)}
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
                  {verificationSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : null}
                  <span>{verificationSuccess ? 'Verified & Signed! ✓' : 'Sign & Verify Skill ✓'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
