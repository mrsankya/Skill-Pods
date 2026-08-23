import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  ShieldCheck,
  Search,
  Filter,
  Download,
  QrCode,
  Share2,
  ExternalLink,
  Award,
  CheckCircle2,
  Building,
  Star,
  Users,
  Copy,
  Check
} from 'lucide-react';
import { VerifiedSkillPassport } from '../types';

interface CollegeSkillPassportViewProps {
  userEmail: string;
}

export const CollegeSkillPassportView: React.FC<CollegeSkillPassportViewProps> = ({
  userEmail
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedPassport, setSelectedPassport] = useState<VerifiedSkillPassport | null>(null);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const passports: VerifiedSkillPassport[] = [
    {
      id: "pass-01",
      studentName: "Dev Patel",
      studentEmail: "dev.patel@skillpods.io",
      rollNo: "CS21B042",
      department: "Computer Science & Engineering",
      college: "National Institute of Technology",
      placementReadinessScore: 94,
      totalContributionScore: 94,
      totalPullRequests: 42,
      totalLinesOfCode: 18450,
      codeQualityRating: 4.95,
      signatureHash: "0x8F4A9C2B1E7D03A4E5B8C1D2E3F4A5B6C7D8E9F0",
      issuedAt: "Aug 18, 2026",
      verifiedSkills: [
        {
          name: "FastAPI & Microservices",
          category: "Backend",
          level: "Expert",
          mentorName: "Sarah Chen",
          mentorCompany: "Staff Eng @ Cloudflare",
          projectAttribution: "DocuQuery AI (Pod Apex-2)",
          verifiedDate: "Aug 18, 2026",
          linesOfCode: 6840,
          evidenceNotes: "Idempotent webhook queue with 0 memory leaks in stress testing.",
          isVerified: true
        },
        {
          name: "React 19 & State Architecture",
          category: "Frontend",
          level: "Expert",
          mentorName: "Marcus Vance",
          mentorCompany: "Principal Architect @ Datadog",
          projectAttribution: "Fleet Telemetry Hub",
          verifiedDate: "Jul 29, 2026",
          linesOfCode: 5200,
          evidenceNotes: "Optimized React 19 concurrent render loop with sub-16ms frames.",
          isVerified: true
        }
      ],
      projectContributions: [
        {
          podName: "Pod Apex-2",
          projectTitle: "DocuQuery AI - Enterprise Multi-Modal RAG Document Search",
          role: "Full-Stack Pod Lead",
          contributionPercentage: 48,
          prsMerged: 28,
          peerReviewScore: 4.9,
          mentorEndorsement: "Dev demonstrated production-tier architecture rigor in handling asynchronous OCR queues with high idempotency."
        }
      ]
    },
    {
      id: "pass-02",
      studentName: "Elena Rostova",
      studentEmail: "elena.rostova@skillpods.io",
      rollNo: "IT21B012",
      department: "Information Technology",
      college: "National Institute of Technology",
      placementReadinessScore: 91,
      totalContributionScore: 91,
      totalPullRequests: 36,
      totalLinesOfCode: 14200,
      codeQualityRating: 4.88,
      signatureHash: "0x3D9B8C7A6E5F40123456789ABCDEF0123456789A",
      issuedAt: "Aug 14, 2026",
      verifiedSkills: [
        {
          name: "Go Concurrency & Channels",
          category: "Backend",
          level: "Expert",
          mentorName: "Marcus Vance",
          mentorCompany: "Principal Architect @ Datadog",
          projectAttribution: "EdgeSensor Mesh (Pod Nova-7)",
          verifiedDate: "Aug 14, 2026",
          linesOfCode: 7100,
          evidenceNotes: "High-throughput worker pool handling 40 cold storage streams.",
          isVerified: true
        }
      ],
      projectContributions: [
        {
          podName: "Pod Nova-7",
          projectTitle: "Cold Chain Telemetry & Sensor Mesh",
          role: "IoT Backend Lead",
          contributionPercentage: 52,
          prsMerged: 22,
          peerReviewScore: 4.85,
          mentorEndorsement: "Built resilient MQTT broker pooling and TimescaleDB compression policies that cut disk I/O by 64%."
        }
      ]
    },
    {
      id: "pass-03",
      studentName: "Samir Al-Mansoor",
      studentEmail: "samir.mansoor@skillpods.io",
      rollNo: "CS21B089",
      department: "Computer Science & Engineering",
      college: "National Institute of Technology",
      placementReadinessScore: 96,
      totalContributionScore: 96,
      totalPullRequests: 48,
      totalLinesOfCode: 21600,
      codeQualityRating: 4.98,
      signatureHash: "0x7C2E1F4A8B9D034567890123456789ABCDEF1234",
      issuedAt: "Aug 12, 2026",
      verifiedSkills: [
        {
          name: "Redis In-Memory Data Structures",
          category: "Backend",
          level: "Expert",
          mentorName: "David Kim",
          mentorCompany: "VP Eng @ Stripe",
          projectAttribution: "OmniRoute Dispatch (Pod Horizon-5)",
          verifiedDate: "Aug 12, 2026",
          linesOfCode: 8400,
          evidenceNotes: "Distributed lock manager preventing race conditions in dispatch queue.",
          isVerified: true
        }
      ],
      projectContributions: [
        {
          podName: "Pod Horizon-5",
          projectTitle: "OmniRoute - Dynamic Fleet Dispatch & Geo-Fencing Engine",
          role: "Systems Architect",
          contributionPercentage: 50,
          prsMerged: 34,
          peerReviewScore: 5.0,
          mentorEndorsement: "Mastered geospatial SQL with PostGIS, delivering 38ms routing calculation benchmarks."
        }
      ]
    }
  ];

  const departments = ['All', 'Computer Science & Engineering', 'Information Technology', 'AI & Data Science'];

  const filteredPassports = passports.filter(p => {
    const matchesDept = selectedDept === 'All' || p.department.includes(selectedDept);
    const matchesSearch = p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.verifiedSkills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200 shadow-2xs">
              <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
              <span>Institutional Student Skill Passport Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Verified Student Skill Passports & Accreditation
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              Inspect and verify cryptographically signed passports for university students. Every skill is stamped by a verified industry staff engineer and linked to real codebase commits.
            </p>
          </div>

          <button
            onClick={() => alert('Exporting full institutional skill accreditation report (PDF / CSV)...')}
            className="px-6 py-3.5 bg-[#3b226e] hover:bg-[#281549] text-white rounded-2xl font-bold text-xs shadow-md active:scale-98 transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <Download className="w-4 h-4 text-purple-300" />
            <span>Export Accreditation Roster &rarr;</span>
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-[#7c6a9b] mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Department:
          </span>
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedDept === dept
                  ? 'bg-[#3b226e] text-white shadow-xs'
                  : 'bg-white/70 hover:bg-white text-[#523d77] border border-white/80'
              }`}
            >
              {dept === 'All' ? 'All Departments' : dept.replace('B.Tech ', '')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student or roll no..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white/80 border border-purple-200/80 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Passports Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPassports.map(p => (
          <motion.div
            key={p.id}
            whileHover={{ y: -3 }}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-200/80 shadow-sm flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full font-mono">
                  {p.rollNo}
                </span>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{p.totalContributionScore}/100 Score</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-[#261543] leading-snug">{p.studentName}</h3>
                <p className="text-xs text-[#5c4780] font-medium mt-0.5">{p.department}</p>
                <p className="text-2xs text-purple-900 font-semibold mt-1">{p.college}</p>
              </div>

              {/* Stamped Skills */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#7c6a9b]">
                  Verified Skills ({p.verifiedSkills.length}):
                </span>
                <div className="space-y-1">
                  {p.verifiedSkills.map((sk, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-2xs flex items-center justify-between">
                      <span className="font-bold text-slate-800">{sk.name}</span>
                      <span className="text-emerald-700 font-semibold">✓ {sk.mentorName.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-2xs">
                <div className="bg-purple-50/70 p-2.5 rounded-xl border border-purple-200">
                  <span className="text-purple-900 font-bold block">Merged PRs</span>
                  <strong className="text-sm font-black text-slate-900 block mt-0.5">{p.totalPullRequests} PRs</strong>
                </div>
                <div className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-200">
                  <span className="text-indigo-900 font-bold block">Attributed LOC</span>
                  <strong className="text-sm font-black text-slate-900 block mt-0.5">{p.totalLinesOfCode.toLocaleString()} lines</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-purple-100 flex items-center justify-between gap-2">
              <span className="text-2xs font-mono text-slate-400 truncate max-w-[120px]">
                {p.signatureHash}
              </span>

              <button
                onClick={() => setSelectedPassport(p)}
                className="px-4 py-2 bg-[#3b226e] hover:bg-[#281549] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Inspect Passport &rarr;
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= MODAL: PASSPORT INSPECTOR ================= */}
      {selectedPassport && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-2xs font-extrabold uppercase text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  SkillPods Cryptographic Passport # {selectedPassport.rollNo}
                </span>
                <h3 className="font-black text-slate-900 text-2xl mt-1">{selectedPassport.studentName}</h3>
              </div>
              <button
                onClick={() => setSelectedPassport(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Passport Details */}
            <div className="space-y-4 text-xs">
              
              {/* Integrity Hash */}
              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-900 block">SHA-256 Verification Hash</span>
                  <span className="font-mono text-xs font-bold text-[#261543]">{selectedPassport.signatureHash}</span>
                </div>
                <button
                  onClick={() => handleCopyHash(selectedPassport.signatureHash)}
                  className="px-3 py-1 bg-white hover:bg-slate-50 border border-purple-200 rounded-lg text-2xs font-bold text-purple-900 cursor-pointer"
                >
                  {copiedHash ? 'Copied! ✓' : 'Copy Hash'}
                </button>
              </div>

              {/* Verified Skills */}
              <div className="space-y-2">
                <h4 className="font-black uppercase tracking-wider text-slate-500 text-[10px]">
                  Official Industry Mentor Stamps ({selectedPassport.verifiedSkills.length})
                </h4>
                <div className="space-y-2">
                  {selectedPassport.verifiedSkills.map((sk, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                      <div>
                        <strong className="text-sm font-bold text-slate-900 block">{sk.name}</strong>
                        <span className="text-2xs text-slate-600">Attributed to: {sk.projectAttribution}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md block">
                          Verified by {sk.mentorName}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{sk.mentorCompany}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commercial Industry Projects */}
              <div className="space-y-2">
                <h4 className="font-black uppercase tracking-wider text-slate-500 text-[10px]">
                  Commercial Industry Projects
                </h4>
                {selectedPassport.projectContributions.map((proj, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-bold text-slate-900">{proj.projectTitle}</strong>
                      <span className="text-2xs font-extrabold text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md">
                        {proj.contributionPercentage}% Share
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">Pod: <strong>{proj.podName}</strong> &bull; Role: {proj.role} &bull; {proj.prsMerged} PRs</p>
                    <p className="text-xs text-slate-700 italic">"{proj.mentorEndorsement}"</p>
                  </div>
                ))}
              </div>

            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setSelectedPassport(null)}
                className="px-5 py-2 font-bold bg-[#3b226e] text-white rounded-xl shadow-xs cursor-pointer text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
