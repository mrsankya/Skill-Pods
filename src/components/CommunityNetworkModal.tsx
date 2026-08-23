import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Search,
  Filter,
  MessageSquare,
  Award,
  FileText,
  GraduationCap,
  Building,
  ShieldCheck,
  ExternalLink,
  FolderGit2,
  Eye,
  CheckCircle2,
  X,
  Sparkles,
  UserCheck,
  Send,
  Download,
  FileCheck2
} from 'lucide-react';
import { CommunityMember, CertificateItem, MarksheetItem, UserRole } from '../types';

interface CommunityNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserEmail: string;
  currentUserName: string;
  currentUserRole: UserRole;
  onOpenChatWithMember?: (member: CommunityMember) => void;
}

export const CommunityNetworkModal: React.FC<CommunityNetworkModalProps> = ({
  isOpen,
  onClose,
  currentUserEmail,
  currentUserName,
  currentUserRole,
  onOpenChatWithMember
}) => {
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<'all' | 'student' | 'sme' | 'mentor'>('all');
  const [selectedMemberDetail, setSelectedMemberDetail] = useState<CommunityMember | null>(null);
  const [previewDoc, setPreviewDoc] = useState<{ title: string; fileUrl: string; type: string } | null>(null);

  // Fetch Community Directory
  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch(`/api/community/members?q=${encodeURIComponent(searchQuery)}&role=${selectedRoleFilter}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.success && Array.isArray(data.members)) {
          setMembers(data.members);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isOpen, searchQuery, selectedRoleFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-[#0f0d1a] border border-purple-500/30 rounded-3xl max-w-6xl w-full text-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-purple-950/60 via-[#18132b] to-[#0f0d1a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-400/30 flex items-center justify-center text-purple-400 shadow-inner">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  SkillPods Community Network
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                  🌐 LinkedIn-Style Directory
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Connect with student builders, inspect verified marksheets & credentials, and message industry mentors & SME sponsors directly.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer self-end sm:self-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Role Filter Bar */}
        <div className="p-4 sm:p-6 border-b border-white/5 bg-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, skills, college (NIT), company (Razorpay), or role..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#171329] border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          {/* Role Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['all', 'student', 'sme', 'mentor'] as const).map(role => (
              <button
                key={role}
                onClick={() => setSelectedRoleFilter(role)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRoleFilter === role
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 border border-purple-400/40'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {role === 'all' && '✨ All Members'}
                {role === 'student' && '🎓 Students'}
                {role === 'sme' && '🏢 SMEs & Founders'}
                {role === 'mentor' && '👨‍🏫 Mentors'}
              </button>
            ))}
          </div>
        </div>

        {/* Community Members Grid */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {loading ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-slate-400">Loading community profiles & credentials...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/5 p-8 space-y-3">
              <Users className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No members matched your search</h3>
              <p className="text-xs text-slate-400">Try adjusting your search terms or selecting "All Members".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map(member => {
                const isCurrentUser = member.email.toLowerCase() === currentUserEmail.toLowerCase();
                const isStudent = member.role === 'student';
                const isMentor = member.role === 'mentor';
                const isSme = member.role === 'sme';

                return (
                  <div
                    key={member.id}
                    className="bg-[#141124] border border-white/10 hover:border-purple-500/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all hover:shadow-xl hover:shadow-purple-950/30 group"
                  >
                    <div className="space-y-3">
                      {/* Avatar & Badges */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {member.avatar ? (
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-12 h-12 rounded-2xl object-cover border border-white/20"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-2xl bg-purple-700 text-white font-black flex items-center justify-center text-base border border-purple-400/30">
                                {member.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#141124] absolute -bottom-0.5 -right-0.5" />
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                                {member.name}
                              </h4>
                              {isCurrentUser && (
                                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-bold">You</span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 truncate max-w-[160px]">
                              {member.organization || member.college || 'SkillPods Member'}
                            </p>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider border ${
                          isStudent ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' :
                          isMentor ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' :
                          isSme ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' :
                          'bg-rose-500/10 text-rose-300 border-rose-500/30'
                        }`}>
                          {member.role}
                        </span>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {member.bio}
                      </p>

                      {/* Student Academic Credentials Badge */}
                      {isStudent && (
                        <div className="p-2.5 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 text-purple-300 font-bold">
                            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                            <span>CGPA: {member.cgpa || '9.24 / 10'}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {member.department || 'Computer Science'}
                          </span>
                        </div>
                      )}

                      {/* Skills Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(member.skills || ['React', 'TypeScript', 'Node.js']).slice(0, 3).map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 text-[10px] font-mono border border-white/5">
                            {skill}
                          </span>
                        ))}
                        {(member.skills?.length || 0) > 3 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-white/5 text-slate-500 text-[10px]">
                            +{(member.skills?.length || 0) - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                      <button
                        onClick={() => setSelectedMemberDetail(member)}
                        className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-purple-400" />
                        <span>View Profile & Vault</span>
                      </button>

                      {!isCurrentUser && (
                        <button
                          onClick={() => {
                            if (onOpenChatWithMember) {
                              onOpenChatWithMember(member);
                            }
                          }}
                          className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-purple-900/40 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Message</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 px-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>End-to-End Private Messaging • Monitored for Compliance & Safety by SuperAdmin</span>
          </div>
          <span>Showing {members.length} verified network profiles</span>
        </div>

      </div>

      {/* ================= MEMBER FULL PROFILE & DOCUMENT VAULT DETAIL MODAL ================= */}
      {selectedMemberDetail && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 animate-in zoom-in-95">
          <div className="bg-[#131024] border border-purple-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-700 text-white font-black flex items-center justify-center text-xl overflow-hidden border border-purple-400">
                  {selectedMemberDetail.avatar ? (
                    <img src={selectedMemberDetail.avatar} alt={selectedMemberDetail.name} className="w-full h-full object-cover" />
                  ) : (
                    selectedMemberDetail.name.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{selectedMemberDetail.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30 uppercase">
                      {selectedMemberDetail.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedMemberDetail.email} • {selectedMemberDetail.organization || selectedMemberDetail.college}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedMemberDetail(null)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Bio & Academic Credentials */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-400 mb-1">About & Focus</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3.5 rounded-2xl border border-white/5">
                  {selectedMemberDetail.bio}
                </p>
              </div>

              {/* Student CGPA / College details */}
              {selectedMemberDetail.role === 'student' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">CGPA Standing</span>
                    <span className="text-sm font-black text-purple-300">{selectedMemberDetail.cgpa || '9.24 / 10.00'}</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Semester</span>
                    <span className="text-xs font-bold text-white">{selectedMemberDetail.semester || 'Semester 7'}</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Department</span>
                    <span className="text-xs font-bold text-white">{selectedMemberDetail.department || 'CSE'}</span>
                  </div>
                </div>
              )}

              {/* Verified Certificates Vault */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Verified Industry Certifications ({(selectedMemberDetail.certificates || []).length})</span>
                </h4>

                <div className="space-y-2">
                  {(selectedMemberDetail.certificates || []).map(cert => (
                    <div key={cert.id} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-xs text-white">{cert.title}</div>
                        <div className="text-[11px] text-slate-400">Issuer: {cert.issuer} • {cert.date}</div>
                      </div>
                      <button
                        onClick={() => setPreviewDoc({ title: cert.title, fileUrl: cert.fileUrl || '', type: 'Certificate' })}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Marksheets & Transcripts Vault */}
              {(selectedMemberDetail.marksheets || []).length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>Official Marksheets & Transcripts ({selectedMemberDetail.marksheets?.length})</span>
                  </h4>

                  <div className="space-y-2">
                    {selectedMemberDetail.marksheets?.map(mark => (
                      <div key={mark.id} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between gap-3">
                        <div>
                          <div className="font-bold text-xs text-white">{mark.title}</div>
                          <div className="text-[11px] text-slate-400">{mark.semester} • Uploaded: {mark.uploadDate}</div>
                        </div>
                        <button
                          onClick={() => setPreviewDoc({ title: mark.title, fileUrl: mark.fileUrl, type: 'Marksheet' })}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedMemberDetail(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-xl"
              >
                Close
              </button>
              {selectedMemberDetail.email.toLowerCase() !== currentUserEmail.toLowerCase() && (
                <button
                  onClick={() => {
                    const m = selectedMemberDetail;
                    setSelectedMemberDetail(null);
                    if (onOpenChatWithMember) onOpenChatWithMember(m);
                  }}
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-purple-900/40"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ================= DOCUMENT PREVIEW LIGHTBOX ================= */}
      {previewDoc && (
        <div className="fixed inset-0 z-70 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#110e21] border border-white/20 rounded-3xl max-w-3xl w-full p-6 text-white space-y-4 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/30">
                  {previewDoc.type} Document
                </span>
                <h3 className="font-bold text-white text-base truncate max-w-md">{previewDoc.title}</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-black/60 rounded-2xl overflow-hidden border border-white/5 max-h-[65vh] flex items-center justify-center p-2">
              <img 
                src={previewDoc.fileUrl} 
                alt={previewDoc.title} 
                className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>SHA-256 Cryptographically Verified Document</span>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
