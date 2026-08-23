import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Users,
  Layers,
  ShoppingBag,
  IndianRupee,
  Activity,
  Sliders,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  Key,
  RefreshCw,
  Download,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Database,
  Server,
  Zap,
  LogOut,
  ArrowUpRight,
  Check,
  X,
  FileCheck2,
  Building2,
  GraduationCap
} from 'lucide-react';
import { SkillPodsLogo } from './SkillPodsLogo';
import { UserRole } from '../types';

interface AdminDashboardProps {
  userEmail: string;
  onSwitchWorkspace: () => void;
  onBackToHome: () => void;
}

export type AdminTab = 
  | 'overview'
  | 'users'
  | 'pods'
  | 'marketplace'
  | 'security'
  | 'escrow'
  | 'settings';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  college?: string;
  status: 'Active' | 'Suspended' | 'Pending Verification';
  joinedDate: string;
  lastActive: string;
  reputationScore: number;
}

interface AdminPodItem {
  id: string;
  name: string;
  title: string;
  smeName: string;
  mentorName: string;
  studentCount: number;
  stage: number;
  stageName: string;
  progress: number;
  escrowBounty: string;
  health: 'Operational' | 'Warning' | 'Delayed';
  repoUrl: string;
}

interface ModerationProject {
  id: string;
  title: string;
  studentName: string;
  studentEmail: string;
  college: string;
  techStack: string[];
  category: string;
  valuation: string;
  status: 'Published' | 'Pending Review' | 'Verified IP' | 'Flagged';
  views: number;
  interests: number;
}

interface AuditLogEntry {
  id: string;
  timestamp: string;
  event: 'LOGIN_SUCCESS' | 'GOOGLE_AUTH' | 'REGISTER' | 'RATE_LIMIT' | 'ESCROW_RELEASE' | 'GATE_APPROVAL';
  userEmail: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARN' | 'BLOCKED';
  details: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  userEmail,
  onSwitchWorkspace,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. MANAGED USERS STATE
  const [users, setUsers] = useState<ManagedUser[]>([
    {
      id: 'u-1',
      name: 'Dev Patel',
      email: 'dev.patel@skillpods.io',
      role: 'student',
      college: 'National Institute of Technology',
      status: 'Active',
      joinedDate: 'Aug 10, 2026',
      lastActive: '2m ago',
      reputationScore: 96
    },
    {
      id: 'u-2',
      name: 'Sarah Chen',
      email: 'sarah.chen@cloudflare.com',
      role: 'mentor',
      organization: 'Staff Architect @ Cloudflare',
      status: 'Active',
      joinedDate: 'Aug 01, 2026',
      lastActive: '15m ago',
      reputationScore: 99
    },
    {
      id: 'u-3',
      name: 'Kestrel Freight & Logistics',
      email: 'kestrel@freight.com',
      role: 'sme',
      organization: 'Supply Chain & Freight Tech',
      status: 'Active',
      joinedDate: 'Jul 24, 2026',
      lastActive: '1h ago',
      reputationScore: 92
    },
    {
      id: 'u-4',
      name: 'Dr. Arvind Sharma (Dean)',
      email: 'dean@nit.edu',
      role: 'college',
      college: 'National Institute of Technology',
      status: 'Active',
      joinedDate: 'Jul 15, 2026',
      lastActive: '3h ago',
      reputationScore: 98
    },
    {
      id: 'u-5',
      name: 'Priya Nair',
      email: 'priya.nair@coep.edu',
      role: 'student',
      college: 'COEP Technological University',
      status: 'Active',
      joinedDate: 'Aug 14, 2026',
      lastActive: '4h ago',
      reputationScore: 91
    },
    {
      id: 'u-6',
      name: 'VyaparPay FinTech',
      email: 'enterprise@vyaparpay.in',
      role: 'sme',
      organization: 'FinTech & Micro-Escrow',
      status: 'Active',
      joinedDate: 'Aug 05, 2026',
      lastActive: 'Yesterday',
      reputationScore: 89
    }
  ]);

  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('student');

  // 2. POD MONITOR STATE
  const [pods, setPods] = useState<AdminPodItem[]>([
    {
      id: 'pod-101',
      name: 'Pod Apex-2',
      title: 'AI Invoice & Ledger Auto-Reconciliation',
      smeName: 'Kestrel Logistics',
      mentorName: 'Sarah Chen (Cloudflare)',
      studentCount: 4,
      stage: 5,
      stageName: 'Launch & Scale',
      progress: 98,
      escrowBounty: '₹45,000',
      health: 'Operational',
      repoUrl: 'https://github.com/skillpods/pod-apex-2'
    },
    {
      id: 'pod-102',
      name: 'Vision-X',
      title: 'Real-Time Crop Disease Computer Vision',
      smeName: 'AgroNova Systems',
      mentorName: 'Priya Sharma (Razorpay)',
      studentCount: 5,
      stage: 3,
      stageName: 'Core Engine Build',
      progress: 64,
      escrowBounty: '₹35,000',
      health: 'Operational',
      repoUrl: 'https://github.com/skillpods/pod-vision-x'
    },
    {
      id: 'pod-103',
      name: 'Pod Nova',
      title: 'FinTech Micro-Escrow Razorpay Splitter',
      smeName: 'VyaparPay India',
      mentorName: 'Vikram Joshi (Google)',
      studentCount: 3,
      stage: 2,
      stageName: 'Architecture Proposal',
      progress: 38,
      escrowBounty: '₹50,000',
      health: 'Delayed',
      repoUrl: 'https://github.com/skillpods/pod-nova'
    }
  ]);

  // 3. MARKETPLACE MODERATION STATE
  const [moderationList, setModerationList] = useState<ModerationProject[]>([
    {
      id: 'sp-1',
      title: 'Smart Attendance System with Face Spoofing Defense',
      studentName: 'Dev Patel',
      studentEmail: 'dev.patel@skillpods.io',
      college: 'National Institute of Technology',
      techStack: ['React 19', 'FastAPI', 'OpenCV', 'PostgreSQL'],
      category: 'AI / Computer Vision',
      valuation: '₹25,000 - ₹40,000',
      status: 'Verified IP',
      views: 342,
      interests: 8
    },
    {
      id: 'sp-2',
      title: 'Zero-Knowledge Credential Issuer for Universities',
      studentName: 'Priya Nair',
      studentEmail: 'priya.nair@coep.edu',
      college: 'COEP Technological University',
      techStack: ['Solidity', 'Circom', 'TypeScript', 'Next.js'],
      category: 'Web3 / Security',
      valuation: '₹40,000 - ₹65,000',
      status: 'Published',
      views: 512,
      interests: 14
    },
    {
      id: 'sp-3',
      title: 'Automated GST E-Way Bill Reconciliation Parser',
      studentName: 'Rohan Gupta',
      studentEmail: 'rohan.g@nit.edu',
      college: 'National Institute of Technology',
      techStack: ['Python', 'Tesseract OCR', 'FastAPI', 'Redis'],
      category: 'FinTech / SaaS',
      valuation: '₹30,000 - ₹50,000',
      status: 'Pending Review',
      views: 180,
      interests: 5
    }
  ]);

  // 4. LIVE AUDIT LOGS STATE
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'log-1',
      timestamp: 'Just now',
      event: 'LOGIN_SUCCESS',
      userEmail: userEmail || 'admin.root@skillpods.io',
      ipAddress: '127.0.0.1 (Localhost)',
      status: 'SUCCESS',
      details: 'SuperAdmin session authenticated via SHA-512 cryptographic token.'
    },
    {
      id: 'log-2',
      timestamp: '3m ago',
      event: 'GOOGLE_AUTH',
      userEmail: 'dev.patel@gmail.com',
      ipAddress: '103.21.244.12',
      status: 'SUCCESS',
      details: 'Google OAuth 2.0 Identity verification passed. Issued signed JWT.'
    },
    {
      id: 'log-3',
      timestamp: '12m ago',
      event: 'GATE_APPROVAL',
      userEmail: 'sarah.chen@cloudflare.com',
      ipAddress: '172.68.22.8',
      status: 'SUCCESS',
      details: 'Sprint 3 Milestone Gate unlocked for Pod Apex-2 (Invoice Recon).'
    },
    {
      id: 'log-4',
      timestamp: '25m ago',
      event: 'ESCROW_RELEASE',
      userEmail: 'kestrel@freight.com',
      ipAddress: '49.36.128.91',
      status: 'SUCCESS',
      details: 'Milestone 3 stipend of ₹15,000 released from escrow to student wallets.'
    },
    {
      id: 'log-5',
      timestamp: '1h ago',
      event: 'RATE_LIMIT',
      userEmail: 'unknown_crawler@botnet.ru',
      ipAddress: '185.220.101.5',
      status: 'BLOCKED',
      details: 'Exceeded sliding-window auth limit (100 req/min). Connection dropped.'
    }
  ]);

  // Fetch fresh audit logs from backend if available
  useEffect(() => {
    fetch('/api/admin/security-audit')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.logs) && data.logs.length > 0) {
          const formatted: AuditLogEntry[] = data.logs.map((l: any) => ({
            id: l.id || `log-${Date.now()}`,
            timestamp: new Date(l.timestamp).toLocaleTimeString(),
            event: l.action || 'LOGIN_SUCCESS',
            userEmail: l.email || 'system@skillpods.io',
            ipAddress: l.ip || '127.0.0.1',
            status: l.action.includes('FAIL') ? 'WARN' : 'SUCCESS',
            details: JSON.stringify(l.details || {})
          }));
          setAuditLogs(prev => [...formatted, ...prev]);
        }
      })
      .catch(() => {});
  }, []);

  // 5. PLATFORM ENGINE SETTINGS STATE
  const [aiEngineVersion, setAiEngineVersion] = useState('Gemini 2.5 Flash (Ultra-Low Latency)');
  const [enforceTwoFactor, setEnforceTwoFactor] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [rateLimitThreshold, setRateLimitThreshold] = useState(120);

  // User Actions
  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        showToast(`User ${u.name} status changed to ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: ManagedUser = {
      id: `u-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Active',
      joinedDate: 'Today',
      lastActive: 'Just now',
      reputationScore: 90
    };
    setUsers([newUser, ...users]);
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
    showToast(`Account for ${newUserName} (${newUserRole}) provisioned successfully!`);
  };

  // Pod Actions
  const handleForceReleaseEscrow = (podId: string) => {
    setPods(prev => prev.map(p => {
      if (p.id === podId) {
        showToast(`SuperAdmin Override: Milestone stipend for ${p.name} released!`);
        return { ...p, stage: Math.min(6, p.stage + 1), progress: 100, health: 'Operational' };
      }
      return p;
    }));
  };

  // Moderation Actions
  const handleVerifyProject = (projId: string) => {
    setModerationList(prev => prev.map(p => {
      if (p.id === projId) {
        showToast(`Project "${p.title}" verified and stamped with Verified IP badge!`);
        return { ...p, status: 'Verified IP' };
      }
      return p;
    }));
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                          u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
                          (u.college && u.college.toLowerCase().includes(userSearch.toLowerCase())) ||
                          (u.organization && u.organization.toLowerCase().includes(userSearch.toLowerCase()));
    const matchesRole = roleFilter === 'All' || u.role === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#08070d] text-[#e4e1e7] flex flex-col font-sans selection:bg-[#a855f7]/30 selection:text-[#d0bcff]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#171422] border border-[#a855f7] text-white px-5 py-3 rounded-2xl shadow-[0_10px_30px_rgba(168,85,247,0.3)] flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-5 h-5 text-[#c084fc]" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOP NAVBAR */}
      <header className="px-6 py-4 border-b border-white/10 bg-[#120f1d]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBackToHome} className="flex items-center gap-2 cursor-pointer focus:outline-none">
            <SkillPodsLogo size={32} showText={true} theme="dark" />
          </button>
          <div className="h-6 w-px bg-white/15 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>SUPERADMIN & PLATFORM GOVERNANCE</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1c172b] border border-white/10 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Security Shield Active</span>
          </div>

          <button
            onClick={onSwitchWorkspace}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all cursor-pointer border border-white/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Role</span>
          </button>
        </div>
      </header>

      {/* ADMIN SUB-NAV TABS */}
      <div className="bg-[#100c1c] border-b border-white/10 px-6 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', icon: Activity, label: 'Macro Overview' },
          { id: 'users', icon: Users, label: `Users & Roles (${users.length})` },
          { id: 'pods', icon: Layers, label: `Pods Pipeline (${pods.length})` },
          { id: 'marketplace', icon: ShoppingBag, label: `IP Moderation (${moderationList.length})` },
          { id: 'security', icon: Lock, label: 'Security & Audit Logs' },
          { id: 'escrow', icon: IndianRupee, label: 'Escrow Treasury' },
          { id: 'settings', icon: Sliders, label: 'Engine Settings' }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#a855f7] text-white shadow-[0_4px_15px_rgba(168,85,247,0.4)]'
                  : 'text-[#9b93a8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN ADMIN CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">

        {/* ================= TAB 1: MACRO OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#171422] border border-white/10 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#9b93a8]">
                  <span>TOTAL PLATFORM USERS</span>
                  <Users className="w-4 h-4 text-[#c084fc]" />
                </div>
                <div className="text-3xl font-black text-white">{users.length * 107}</div>
                <div className="text-2xs font-semibold text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+18% growth this cohort</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#171422] border border-white/10 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#9b93a8]">
                  <span>ESCROW TREASURY POOL</span>
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400">₹34.50 L</div>
                <div className="text-2xs font-semibold text-[#9b93a8]">
                  100% backed by Smart India Escrow
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#171422] border border-white/10 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#9b93a8]">
                  <span>ACTIVE PODS IN-FLIGHT</span>
                  <Layers className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-white">{pods.length} Pods (42 Builders)</div>
                <div className="text-2xs font-semibold text-blue-300">
                  94.2% Sprint On-Time Delivery
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#171422] border border-white/10 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#9b93a8]">
                  <span>PLATFORM HEALTH SLA</span>
                  <Activity className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-black text-white">99.98%</div>
                <div className="text-2xs font-semibold text-emerald-400">
                  Zero DDoS incidents reported
                </div>
              </div>
            </div>

            {/* Quick Overview Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Pod Sprint Health */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-[#171422] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-lg">Active Skill Pod Pipelines</h3>
                  <button onClick={() => setActiveTab('pods')} className="text-xs text-[#c084fc] hover:underline">
                    View All Pods &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  {pods.map(pod => (
                    <div key={pod.id} className="p-4 rounded-2xl bg-[#1e192f] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{pod.name}</span>
                          <span className="text-2xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                            Stage {pod.stage}: {pod.stageName}
                          </span>
                        </div>
                        <p className="text-xs text-[#a9a2b5] mt-0.5">{pod.title} • SME: {pod.smeName}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs font-bold text-emerald-400">{pod.escrowBounty}</div>
                          <div className="text-2xs text-[#8c8599]">{pod.progress}% Done</div>
                        </div>
                        <button
                          onClick={() => handleForceReleaseEscrow(pod.id)}
                          className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer"
                        >
                          Approve Stage
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Health Box */}
              <div className="p-6 rounded-3xl bg-[#171422] border border-white/10 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold mb-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span>DEFENSE POSTURE</span>
                  </div>
                  <h3 className="font-bold text-white text-lg">Cryptographic Defense</h3>
                  <p className="text-xs text-[#a9a2b5] mt-1">
                    Node.js PBKDF2 SHA-512 encryption, sliding-window rate limiters, and live HMAC-SHA256 JWT validation are actively guarding all endpoints.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#1e192f] border border-white/5 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#8c8599]">Password Hash:</span>
                    <span className="text-emerald-400">PBKDF2 SHA-512 (10k)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8c8599]">Token Standard:</span>
                    <span className="text-purple-300">HMAC-SHA256 JWT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8c8599]">OAuth 2.0 Provider:</span>
                    <span className="text-blue-400">Google GSI Verified</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('security')}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Inspect Live Audit Logs &rarr;
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 2: USERS & ROLES ================= */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-[#8c8599] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search users by name, email, org..."
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[#171422] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#a855f7]"
                  />
                </div>

                <select
                  value={roleFilter}
                  onChange={e => setRoleFilter(e.target.value)}
                  className="px-3 py-2 bg-[#171422] border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="All">All Roles</option>
                  <option value="student">Students</option>
                  <option value="mentor">Mentors</option>
                  <option value="sme">SMEs</option>
                  <option value="college">Colleges</option>
                </select>
              </div>

              <button
                onClick={() => setShowAddUserModal(true)}
                className="w-full sm:w-auto px-4 py-2 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>+ Provision User Account</span>
              </button>
            </div>

            {/* Users Table */}
            <div className="bg-[#171422] border border-white/10 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#120f1d] border-b border-white/10 text-[#9b93a8] font-mono uppercase text-2xs">
                    <tr>
                      <th className="p-4">User Name & Email</th>
                      <th className="p-4">Assigned Role</th>
                      <th className="p-4">Institution / Organization</th>
                      <th className="p-4">Reputation Score</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{u.name}</div>
                          <div className="text-2xs text-[#8c8599] font-mono">{u.email}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-2xs font-bold uppercase tracking-wider ${
                            u.role === 'student' ? 'bg-purple-500/20 text-purple-300' :
                            u.role === 'mentor' ? 'bg-blue-500/20 text-blue-300' :
                            u.role === 'sme' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-emerald-500/20 text-emerald-300'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 text-[#a9a2b5]">
                          {u.college || u.organization || 'Independent'}
                        </td>
                        <td className="p-4">
                          <span className="font-mono font-bold text-purple-400">{u.reputationScore} XP</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-2xs font-bold ${
                            u.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className={`px-3 py-1 rounded-lg font-bold text-2xs cursor-pointer transition-colors ${
                              u.status === 'Active' 
                                ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30' 
                                : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                            }`}
                          >
                            {u.status === 'Active' ? 'Suspend' : 'Reactivate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: PODS PIPELINE ================= */}
        {activeTab === 'pods' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-[#171422] border border-white/10 space-y-4">
              <h3 className="font-bold text-white text-lg">Pod Delivery & Milestone Control</h3>
              <p className="text-xs text-[#a9a2b5]">
                Monitor sprint progress, review test coverage rates, and execute SuperAdmin milestone approvals.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pods.map(pod => (
                  <div key={pod.id} className="p-5 rounded-2xl bg-[#1c172b] border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-base">{pod.name}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-2xs font-bold ${
                        pod.health === 'Operational' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {pod.health}
                      </span>
                    </div>

                    <p className="text-xs text-[#c5bed2]">{pod.title}</p>
                    
                    <div className="text-2xs text-[#8c8599] space-y-1 font-mono">
                      <div>SME Sponsor: <span className="text-white">{pod.smeName}</span></div>
                      <div>Assigned Mentor: <span className="text-purple-300">{pod.mentorName}</span></div>
                      <div>Escrow Value: <span className="text-emerald-400 font-bold">{pod.escrowBounty}</span></div>
                    </div>

                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-2xs text-[#9b93a8]">
                        <span>Stage {pod.stage} Progress</span>
                        <span>{pod.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#a855f7] h-full rounded-full" style={{ width: `${pod.progress}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <a href={pod.repoUrl} target="_blank" rel="noreferrer" className="text-2xs text-purple-400 hover:underline flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>Inspect Repo</span>
                      </a>
                      <button
                        onClick={() => handleForceReleaseEscrow(pod.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
                      >
                        Force Gate Approval ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: MARKETPLACE IP MODERATION ================= */}
        {activeTab === 'marketplace' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-[#171422] border border-white/10 space-y-4">
              <h3 className="font-bold text-white text-lg">Student Project IP & Marketplace Moderation</h3>
              <p className="text-xs text-[#a9a2b5]">
                Review projects submitted by students, verify source code validity, and stamp Verified IP badges.
              </p>

              <div className="space-y-3">
                {moderationList.map(proj => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-[#1c172b] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-white text-sm">{proj.title}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-2xs font-mono font-bold">
                          {proj.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-2xs font-mono">
                          {proj.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#a9a2b5]">
                        Author: <span className="text-white font-semibold">{proj.studentName}</span> ({proj.studentEmail}) • {proj.college}
                      </p>
                      <div className="flex gap-1.5 flex-wrap">
                        {proj.techStack.map((tech, i) => (
                          <span key={i} className="text-2xs px-2 py-0.5 rounded bg-white/5 text-[#c5bed2]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-400">{proj.valuation}</div>
                        <div className="text-2xs text-[#8c8599]">{proj.interests} Company inquiries</div>
                      </div>
                      <button
                        onClick={() => handleVerifyProject(proj.id)}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer"
                      >
                        Stamp Verified IP ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: SECURITY AUDIT LOGS ================= */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-[#171422] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg">Cryptographic Security & Identity Audit Log</h3>
                  <p className="text-xs text-[#a9a2b5]">
                    Immutable stream of authentication, authorization, and cryptographic signature events.
                  </p>
                </div>
                <button
                  onClick={() => showToast('Audit logs exported to security_audit.json')}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export JSON</span>
                </button>
              </div>

              <div className="bg-[#120f1d] border border-white/5 rounded-2xl overflow-hidden">
                <div className="divide-y divide-white/5 font-mono text-xs">
                  {auditLogs.map(log => (
                    <div key={log.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/[0.02]">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-2xs font-bold ${
                          log.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' :
                          log.status === 'WARN' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-rose-500/20 text-rose-400'
                        }`}>
                          {log.event}
                        </span>
                        <div>
                          <span className="text-white">{log.userEmail}</span>
                          <span className="text-[#8c8599] text-2xs ml-2">({log.ipAddress})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-[#a9a2b5] text-2xs">
                        <span>{log.details}</span>
                        <span className="text-[#6d667c] shrink-0">{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: ESCROW TREASURY ================= */}
        {activeTab === 'escrow' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#171422] border border-white/10 space-y-1">
                <div className="text-xs font-mono text-[#9b93a8]">LOCKED IN ACTIVE ESCROW</div>
                <div className="text-2xl font-black text-emerald-400">₹34,50,000</div>
                <div className="text-2xs text-[#8c8599]">2-Phase cryptographic multi-sig</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#171422] border border-white/10 space-y-1">
                <div className="text-xs font-mono text-[#9b93a8]">DISBURSED TO STUDENTS</div>
                <div className="text-2xl font-black text-purple-400">₹18,20,000</div>
                <div className="text-2xs text-[#8c8599]">Direct UPI / Bank auto-transfers</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#171422] border border-white/10 space-y-1">
                <div className="text-xs font-mono text-[#9b93a8]">COLLEGE IP ROYALTY POOL</div>
                <div className="text-2xl font-black text-blue-400">₹6,80,000</div>
                <div className="text-2xs text-[#8c8599]">Institutional innovation splits</div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#171422] border border-white/10 space-y-4">
              <h3 className="font-bold text-white text-lg">Escrow Settlement Ledger</h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { tx: 'TX-8921', from: 'Kestrel Freight', to: 'Pod Apex-2 Students', amount: '₹15,000', status: 'Settled', date: 'Aug 23, 2026' },
                  { tx: 'TX-8920', from: 'AgroNova Systems', to: 'Vision-X Escrow Vault', amount: '₹35,000', status: 'Locked', date: 'Aug 22, 2026' },
                  { tx: 'TX-8919', from: 'VyaparPay India', to: 'Pod Nova Students', amount: '₹20,000', status: 'Settled', date: 'Aug 20, 2026' }
                ].map(t => (
                  <div key={t.tx} className="p-3 rounded-xl bg-[#1c172b] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[#a855f7] font-bold">{t.tx}</span>
                      <span className="text-[#a9a2b5] ml-3">{t.from} &rarr; {t.to}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-emerald-400 font-bold">{t.amount}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-2xs">{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 7: ENGINE SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="p-6 rounded-3xl bg-[#171422] border border-white/10 space-y-6 max-w-2xl">
            <h3 className="font-bold text-white text-lg">SkillPods Platform Engine Settings</h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#9b93a8] font-semibold">AI Matchmaker Model</label>
                <select
                  value={aiEngineVersion}
                  onChange={e => setAiEngineVersion(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#120f1d] border border-white/10 text-white focus:outline-none"
                >
                  <option value="Gemini 2.5 Flash (Ultra-Low Latency)">Gemini 2.5 Flash (Ultra-Low Latency)</option>
                  <option value="Gemini 2.5 Pro (Deep Semantic Scoring)">Gemini 2.5 Pro (Deep Semantic Scoring)</option>
                  <option value="Custom Cosine Embedding v4">Custom Cosine Embedding v4</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#120f1d] border border-white/5">
                <div>
                  <div className="text-white font-bold">Enforce Two-Factor Authentication</div>
                  <div className="text-2xs text-[#8c8599]">Mandatory for SME payment approvals and Mentor gate unlocks.</div>
                </div>
                <input
                  type="checkbox"
                  checked={enforceTwoFactor}
                  onChange={e => setEnforceTwoFactor(e.target.checked)}
                  className="w-4 h-4 accent-[#a855f7] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#120f1d] border border-white/5">
                <div>
                  <div className="text-white font-bold">Maintenance Mode</div>
                  <div className="text-2xs text-[#8c8599]">Temporarily disable public registrations for cohort maintenance.</div>
                </div>
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={e => setMaintenanceMode(e.target.checked)}
                  className="w-4 h-4 accent-[#a855f7] cursor-pointer"
                />
              </div>

              <div className="space-y-1 pt-2">
                <div className="flex justify-between">
                  <label className="text-[#9b93a8] font-semibold">Sliding-Window Rate Limit Threshold</label>
                  <span className="font-mono text-purple-400 font-bold">{rateLimitThreshold} req / min</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={300}
                  value={rateLimitThreshold}
                  onChange={e => setRateLimitThreshold(Number(e.target.value))}
                  className="w-full accent-[#a855f7] cursor-pointer"
                />
              </div>

              <button
                onClick={() => showToast('Platform engine settings saved successfully!')}
                className="w-full py-3 rounded-xl bg-[#a855f7] hover:bg-[#9333ea] text-white font-bold text-xs cursor-pointer shadow-md transition-colors"
              >
                Save Engine Configuration ✓
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ================= MODAL: PROVISION USER ================= */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#171422] border border-white/15 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-white text-base">Provision New Account</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-[#8c8599] hover:text-white cursor-pointer font-bold">✕</button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#9b93a8] mb-1 font-semibold">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3.5 py-2.5 bg-[#120f1d] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>

              <div>
                <label className="block text-[#9b93a8] mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  placeholder="user@organization.com"
                  className="w-full px-3.5 py-2.5 bg-[#120f1d] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#a855f7]"
                />
              </div>

              <div>
                <label className="block text-[#9b93a8] mb-1 font-semibold">Role</label>
                <select
                  value={newUserRole}
                  onChange={e => setNewUserRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2.5 bg-[#120f1d] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#a855f7]"
                >
                  <option value="student">Student Builder</option>
                  <option value="mentor">Industry Mentor</option>
                  <option value="sme">SME Business</option>
                  <option value="college">College / Institution</option>
                  <option value="admin">Super Administrator</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#8c8599] hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Create User ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
