import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Users,
  CheckCircle2,
  Clock,
  Award,
  Trophy,
  ShieldCheck,
  Zap,
  MessageSquare,
  IndianRupee,
  Star,
  Sparkles,
  ChevronRight,
  Filter,
  Calendar,
  Video,
  FileText,
  GitPullRequest,
  ThumbsUp,
  Code,
  CheckSquare,
  ArrowRight,
  ExternalLink,
  LogOut,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  FolderGit2,
  Briefcase,
  Play,
  Share2,
  Terminal,
  Activity,
  Plus,
  Truck,
  Building2,
  FileCode,
  DollarSign,
  Send,
  HelpCircle,
  Eye,
  CheckCheck,
  Building,
  SlidersHorizontal,
  FileCheck2
} from 'lucide-react';
import { SkillPodsLogo } from './SkillPodsLogo';
import { SmeCharacter3D } from './SmeCharacter3D';
import { SmeAiPodRecommendation } from './SmeAiPodRecommendation';
import { SmeStudentMarketplace } from './SmeStudentMarketplace';
import { SmeAcceptanceGate } from './SmeAcceptanceGate';

interface SmeDashboardProps {
  userEmail: string;
  onSwitchWorkspace: () => void;
  onBackToHome: () => void;
}

export type SmeTab =
  | 'overview'
  | 'ai-recommend'
  | 'marketplace'
  | 'acceptance-gate'
  | 'problems'
  | 'pods'
  | 'applications'
  | 'mentors'
  | 'reviews'
  | 'appointments'
  | 'payments'
  | 'profile';

interface SmeProblem {
  id: string;
  title: string;
  category: string;
  budget: string;
  applicationsCount: number;
  status: 'Accepting Applications' | 'In Review' | 'Pod Assigned' | 'Completed';
  description: string;
  skillsRequired: string[];
  timeline: string;
  postedDate: string;
}

interface SmeActiveProject {
  id: string;
  title: string;
  podName: string;
  studentCount: number;
  mentorName: string;
  mentorRole: string;
  progress: number;
  stage: string;
  status: '🟢 On Track' | '🟡 Needs Attention' | '🟢 Ready for Approval';
  budget: string;
  escrowLocked: string;
  nextMilestone: string;
  repoUrl: string;
}

interface PodApplication {
  id: string;
  problemId: string;
  problemTitle: string;
  podName: string;
  studentCount: number;
  leadName: string;
  skills: string[];
  previousProjects: number;
  podScore: number;
  pitch: string;
  status: 'Pending' | 'Shortlisted' | 'Accepted' | 'Rejected';
  appliedTime: string;
}

interface MentorAssignment {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  skills: string[];
  status: '🟢 Assigned' | 'Available';
  assignedProject: string;
  nextReview: string;
  bio: string;
}

interface SmeReviewItem {
  id: string;
  title: string;
  podName: string;
  deliverableType: 'Sprint 3 Deliverable' | 'Prototype' | 'Architecture Proposal' | 'Final Release';
  mentorStatus: string;
  status: 'Awaiting SME Review' | 'Awaiting Company Approval' | 'Approved' | 'Changes Requested';
  submittedTime: string;
  demoUrl: string;
  notes: string;
  milestonePayment: string;
}

interface ShippedProduct {
  id: string;
  title: string;
  podName: string;
  mentorName: string;
  status: string;
  shippedDate: string;
  projectValue: string;
  demoUrl: string;
  techStack: string[];
  summary: string;
}

export const SmeDashboard: React.FC<SmeDashboardProps> = ({
  userEmail,
  onSwitchWorkspace,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = useState<SmeTab>('overview');

  // Dynamically resolve logged-in company profile
  const getSmeProfile = () => {
    try {
      const stored = localStorage.getItem('skillpods_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name || parsed.organization) {
          return {
            name: parsed.organization || parsed.name,
            email: parsed.email || userEmail,
            avatar: parsed.avatar
          };
        }
      }
    } catch {}

    if (userEmail) {
      const username = userEmail.split('@')[0];
      const formatted = username
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      return { name: formatted || 'Kestrel Freight', email: userEmail };
    }
    return { name: 'Kestrel Freight & Logistics', email: userEmail || 'kestrel@freight.com' };
  };

  const currentSmeProfile = getSmeProfile();
  const smeDisplayName = currentSmeProfile.name;
  const smeInitials = smeDisplayName
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Interactive Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Modals state
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<SmeReviewItem | null>(null);
  const [selectedPodApp, setSelectedPodApp] = useState<PodApplication | null>(null);
  const [selectedProject, setSelectedProject] = useState<SmeActiveProject | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<MentorAssignment | null>(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');

  const [pipelineTab, setPipelineTab] = useState<"problems" | "applications">("problems");
  // 1. New Problem Form State
  const [newProblem, setNewProblem] = useState({
    title: '',
    category: 'AI • Logistics • Web',
    budget: '₹40K–₹60K',
    timeline: '4–6 Weeks',
    skillsRequired: 'React, Node.js, WebSocket, AI',
    description: ''
  });

  // 2. Problem Statements Data
  const [problems, setProblems] = useState<SmeProblem[]>([
    {
      id: 'prob-1',
      title: 'Automated Fleet Routing & Dispatcher',
      category: 'AI • Logistics • Web',
      budget: '₹30K–₹50K',
      applicationsCount: 8,
      status: 'Accepting Applications',
      description: 'Dynamic route optimization for 100+ daily intra-city delivery vans with traffic telemetry and live fuel indexing.',
      skillsRequired: ['Python', 'FastAPI', 'React', 'OR-Tools', 'PostGIS'],
      timeline: '4 Weeks',
      postedDate: 'Aug 14, 2026'
    },
    {
      id: 'prob-2',
      title: 'Smart Inventory & Barcode SKU Pipeline',
      category: 'Enterprise SaaS • IoT',
      budget: '₹45K–₹70K',
      applicationsCount: 12,
      status: 'Pod Assigned',
      description: 'Sub-second SKU scan synchronization and automated warehouse low-stock replenishment notifications.',
      skillsRequired: ['React', 'TypeScript', 'Redis', 'PostgreSQL'],
      timeline: '6 Weeks',
      postedDate: 'Aug 02, 2026'
    },
    {
      id: 'prob-3',
      title: 'OCR Invoice Parser for Transport Bills',
      category: 'AI / Computer Vision',
      budget: '₹25K–₹40K',
      applicationsCount: 5,
      status: 'In Review',
      description: 'Extract multi-lingual GST tax tables and freight weighbridge receipts into structured accounting schemas.',
      skillsRequired: ['Python', 'PyTorch', 'YOLOv8', 'FastAPI'],
      timeline: '3 Weeks',
      postedDate: 'Aug 18, 2026'
    }
  ]);

  // 3. Active Projects Data
  const [projects, setProjects] = useState<SmeActiveProject[]>([
    {
      id: 'proj-1',
      title: 'Smart Inventory Management',
      podName: 'Apex-2',
      studentCount: 4,
      mentorName: 'Sarah Chen',
      mentorRole: 'Principal Architect @ Stripe',
      progress: 68,
      stage: 'Sprint 3 — Development',
      status: '🟢 On Track',
      budget: '₹50,000',
      escrowLocked: '₹20,000',
      nextMilestone: 'Sprint 3 Realtime WebSocket Telemetry',
      repoUrl: 'https://github.com/skillpods/kestrel-inventory-apex2'
    },
    {
      id: 'proj-2',
      title: 'GPS Fleet Telemetry Gateway',
      podName: 'Nova-X',
      studentCount: 4,
      mentorName: 'Priya Sharma',
      mentorRole: 'Staff Engineer @ CRED',
      progress: 42,
      stage: 'Sprint 2 — Ingestion Pipeline',
      status: '🟡 Needs Attention',
      budget: '₹35,000',
      escrowLocked: '₹15,000',
      nextMilestone: 'Kafka & PostGIS High-Throughput Buffering',
      repoUrl: 'https://github.com/skillpods/kestrel-fleet-nova'
    }
  ]);

  // 4. Student Pod Applications Data
  const [applications, setApplications] = useState<PodApplication[]>([
    {
      id: 'app-1',
      problemId: 'prob-1',
      problemTitle: 'Automated Fleet Routing',
      podName: 'Apex-2',
      studentCount: 4,
      leadName: 'Rahul Sharma',
      skills: ['React', 'Node.js', 'AI', 'WebSocket'],
      previousProjects: 6,
      podScore: 4.8,
      pitch: 'Our pod previously built an ultra-low latency real-time telemetry dashboard for logistics. We have pre-built PostGIS geo-routing algorithms ready to adapt.',
      status: 'Pending',
      appliedTime: '2h ago'
    },
    {
      id: 'app-2',
      problemId: 'prob-1',
      problemTitle: 'Automated Fleet Routing',
      podName: 'Pod Vision-X',
      studentCount: 5,
      leadName: 'Priya Nair',
      skills: ['Python', 'PyTorch', 'FastAPI', 'Docker'],
      previousProjects: 4,
      podScore: 4.9,
      pitch: 'Specialized in computer vision & ML path optimization models with production deployment experience on Google Cloud Run.',
      status: 'Shortlisted',
      appliedTime: 'Yesterday'
    },
    {
      id: 'app-3',
      problemId: 'prob-3',
      problemTitle: 'OCR Invoice Parser',
      podName: 'CodeCraft Alpha',
      studentCount: 4,
      leadName: 'Dev Patel',
      skills: ['Flutter', 'Python', 'OpenCV', 'FastAPI'],
      previousProjects: 5,
      podScore: 4.7,
      pitch: 'Built Indian multi-lingual OCR pipeline that handles noisy lorry receipt scans with 96% field extraction accuracy.',
      status: 'Pending',
      appliedTime: '1d ago'
    }
  ]);

  // 5. Mentor Directory / Assigned
  const [mentors, setMentors] = useState<MentorAssignment[]>([
    {
      id: 'm-1',
      name: 'Sarah Chen',
      role: 'Principal Architect @ Stripe',
      company: 'Stripe',
      rating: 4.9,
      skills: ['System Design', 'APIs', 'Cloud Architecture', 'Distributed Systems'],
      status: '🟢 Assigned',
      assignedProject: 'Smart Inventory Management (Apex-2)',
      nextReview: 'Aug 24 — 4:00 PM',
      bio: 'Ex-Amazon Principal with 9+ years scaling distributed transactional engines and guiding startup engineering teams.'
    },
    {
      id: 'm-2',
      name: 'Priya Sharma',
      role: 'Staff Engineer @ CRED',
      company: 'CRED',
      rating: 4.9,
      skills: ['PostgreSQL & PostGIS', 'High-Throughput Ingestion', 'Kafka'],
      status: '🟢 Assigned',
      assignedProject: 'GPS Fleet Telemetry (Nova-X)',
      nextReview: 'Tomorrow — 2:00 PM',
      bio: 'FinTech and event-driven architecture specialist passionate about unblocking student pods on performance bottlenecks.'
    },
    {
      id: 'm-3',
      name: 'Aarav Mehta',
      role: 'VP Engineering @ Razorpay',
      company: 'Razorpay',
      rating: 5.0,
      skills: ['Payment Rails', 'Security & Escrow', 'Compliance', 'Node.js'],
      status: 'Available',
      assignedProject: 'Available for New Projects',
      nextReview: 'Slots Open This Week',
      bio: 'Leading payment gateway infrastructure and developer platforms across South Asia.'
    }
  ]);

  // 6. Project Reviews Data
  const [reviews, setReviews] = useState<SmeReviewItem[]>([
    {
      id: 'rev-1',
      title: 'Smart Inventory — Sprint 3 Deliverable',
      podName: 'Apex-2',
      deliverableType: 'Sprint 3 Deliverable',
      mentorStatus: 'Sarah Chen Approved (Verified Architecture)',
      status: 'Awaiting SME Review',
      submittedTime: '3h ago',
      demoUrl: 'https://apex2-inventory-demo.skillpods.io',
      notes: 'Completed the live WebSocket SKU telemetry feed, barcode scanner bridge, and low-inventory auto-alert dispatcher. Benchmarked at 1,200 scans/sec.',
      milestonePayment: '₹15,000 Escrow Release'
    },
    {
      id: 'rev-2',
      title: 'GPS Fleet Telemetry — Ingestion Prototype',
      podName: 'Nova-X',
      deliverableType: 'Prototype',
      mentorStatus: 'Priya Sharma Approved (PostGIS Geofence Verified)',
      status: 'Awaiting Company Approval',
      submittedTime: 'Yesterday',
      demoUrl: 'https://novax-fleet-proto.skillpods.io',
      notes: 'Real-time vehicle map plotting with dynamic route deviation detection. Tested with 50 concurrent simulated delivery truck streams.',
      milestonePayment: '₹10,000 Escrow Release'
    }
  ]);

  // 7. Shipped Products Data
  const [shippedProducts, setShippedProducts] = useState<ShippedProduct[]>([
    {
      id: 'ship-1',
      title: 'Fleet Telemetry & Dispatch Dashboard',
      podName: 'Apex-2',
      mentorName: 'Sarah Chen (Principal Architect @ Stripe)',
      status: '✅ Production Ready',
      shippedDate: 'Aug 18, 2026',
      projectValue: '₹50,000',
      demoUrl: 'https://fleet-kestrel.live',
      techStack: ['React', 'FastAPI', 'Redis', 'PostgreSQL PostGIS'],
      summary: 'Live real-time driver tracking, automated ETA calculation, and instant customer SMS delivery alerts.'
    },
    {
      id: 'ship-2',
      title: 'Warehouse Low-Stock Auto-Reorder Engine',
      podName: 'Pod Nova',
      mentorName: 'Aarav Mehta (VP Engineering @ Razorpay)',
      status: '✅ Production Ready',
      shippedDate: 'Jul 29, 2026',
      projectValue: '₹30,000',
      demoUrl: 'https://warehouse-reorder.kestrel.internal',
      techStack: ['Node.js', 'Express', 'Tailwind', 'PostgreSQL'],
      summary: 'Automated Purchase Order generation triggered whenever SKU thresholds drop below 3-day buffer levels.'
    }
  ]);

  // 8. Financial Budget Data
  const budgetData = {
    totalBudget: 120000,
    paid: 60000,
    inEscrow: 40000,
    remaining: 20000,
    milestones: [
      { name: 'Milestone 1 — Architecture & Core Ingestion', status: 'Completed ✓', amount: '₹30,000', date: 'Jul 20, 2026' },
      { name: 'Milestone 2 — Live Telemetry & Real-Time Sync', status: 'Completed ✓', amount: '₹30,000', date: 'Aug 05, 2026' },
      { name: 'Milestone 3 — Production Deploy & Load Testing', status: 'In Progress ⏳', amount: '₹40,000 (In Escrow)', date: 'Aug 28, 2026' },
      { name: 'Milestone 4 — Final Maintenance & Handover', status: 'Upcoming', amount: '₹20,000', date: 'Sep 10, 2026' }
    ]
  };

  // Handlers
  const handleCreateProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProblem.title.trim()) return;

    const created: SmeProblem = {
      id: `prob-${Date.now()}`,
      title: newProblem.title,
      category: newProblem.category,
      budget: newProblem.budget,
      applicationsCount: 0,
      status: 'Accepting Applications',
      description: newProblem.description || 'Custom business problem posted by company.',
      skillsRequired: newProblem.skillsRequired.split(',').map(s => s.trim()),
      timeline: newProblem.timeline,
      postedDate: 'Just now'
    };

    setProblems([created, ...problems]);
    setShowSubmitModal(false);
    setNewProblem({
      title: '',
      category: 'AI • Logistics • Web',
      budget: '₹40K–₹60K',
      timeline: '4–6 Weeks',
      skillsRequired: 'React, Node.js, WebSocket, AI',
      description: ''
    });
    showToast('🚀 Problem statement published! Student Skill Pods will be notified.');
  };

  const handleApplicationAction = (appId: string, action: 'Accepted' | 'Shortlisted' | 'Rejected') => {
    setApplications(prev =>
      prev.map(app => (app.id === appId ? { ...app, status: action } : app))
    );
    setSelectedPodApp(null);
    showToast(
      action === 'Accepted'
        ? '🎉 Pod assigned! Project workspace initiated with student team.'
        : action === 'Shortlisted'
        ? '⭐ Pod shortlisted for final selection.'
        : 'Pod application rejected.'
    );
  };

  const handleReviewDecision = (reviewId: string, decision: 'Approved' | 'Changes Requested') => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, status: decision } : r))
    );
    setSelectedReview(null);
    showToast(
      decision === 'Approved'
        ? '✓ Sprint deliverable approved! Escrow payout released to student pod.'
        : '⚠️ Feedback & revision requests sent to the Skill Pod.'
    );
  };

  const pendingReviewsCount = reviews.filter(r => r.status.includes('Awaiting')).length;
  const pendingApplicationsCount = applications.filter(a => a.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#f4effc] text-[#261543] flex font-sans selection:bg-[#7c3aed]/20 selection:text-[#261543]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#261543] text-white px-5 py-3.5 rounded-2xl shadow-[0_10px_35px_rgba(38,21,67,0.4)] border border-purple-400/30 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ================= LEFT ICON SIDEBAR ================= */}
      <aside className="w-20 hidden xl:flex flex-col items-center justify-between py-6 border-r border-[#e3d8f7] bg-[#f9f7fd]/90 backdrop-blur-md sticky top-0 h-screen z-20">
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={onBackToHome}
            className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-xs border border-white/80 hover:scale-105 transition-transform cursor-pointer"
            title="SkillPods Home"
          >
            <Sparkles className="w-6 h-6 text-purple-600 animate-pulse" />
          </button>

          {/* Navigation Icon List */}
          <nav className="flex flex-col items-center gap-2.5">
            {[
              { id: 'overview', icon: Layers, label: 'Dashboard' },
              { id: 'ai-recommend', icon: Sparkles, label: 'AI Pod Recommendations' },
              { id: 'marketplace', icon: Building, label: 'Student Project Marketplace' },
              { id: 'acceptance-gate', icon: FileCheck2, label: 'Acceptance & Escrow Gate' },
              { id: 'problems', icon: Briefcase, label: 'My Problems', badge: problems.length },
              { id: 'pods', icon: Users, label: 'Skill Pods' },
              { id: 'applications', icon: FileCode, label: 'Applications', badge: pendingApplicationsCount },
              { id: 'mentors', icon: Award, label: 'Mentors' },
              { id: 'reviews', icon: CheckCircle2, label: 'Reviews', badge: pendingReviewsCount },
              { id: 'appointments', icon: Calendar, label: 'Appointments' },
              { id: 'payments', icon: IndianRupee, label: 'Payments' },
              { id: 'profile', icon: Building2, label: 'Profile' }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SmeTab)}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer relative group ${
                    isActive
                      ? 'bg-[#3b226e] text-white shadow-[0_8px_20px_rgba(59,34,110,0.3)] scale-105'
                      : 'bg-white/70 hover:bg-white text-[#523d77] hover:text-[#281549] shadow-2xs border border-white/80'
                  }`}
                  title={tab.label}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {tab.badge && tab.badge > 0 ? (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white font-black text-[9px] rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  ) : null}
                  {/* Tooltip */}
                  <span className="absolute left-14 px-2.5 py-1 bg-[#261543] text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Icons */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onSwitchWorkspace}
            className="w-10 h-10 rounded-2xl bg-white/70 hover:bg-white text-[#523d77] hover:text-[#281549] flex items-center justify-center transition-all cursor-pointer border border-white/80 shadow-2xs"
            title="Switch Workspace / Role"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 min-w-0 flex flex-col">
        
        {/* TOP NAVBAR HEADER */}
        <header className="px-4 sm:px-8 pt-6 pb-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToHome}
              className="xl:hidden flex items-center gap-2"
            >
              <SkillPodsLogo size={32} showText={true} theme="light" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
                  SkillPods
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-black text-2xs border border-blue-200 shadow-2xs flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-blue-700" />
                  <span>Company Workspace (SME)</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5d4a82] font-medium mt-0.5">
                AI Pod Matching &bull; Verified Student Marketplace &bull; Milestone Acceptance Gate
              </p>
            </div>
          </div>

          {/* Top Right Header CTA & Company Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white rounded-full font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Submit Problem</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 p-1 sm:pr-3 rounded-full bg-white/80 border border-white/90 shadow-2xs hover:bg-white transition-all cursor-pointer"
            >
              {currentSmeProfile.avatar ? (
                <img src={currentSmeProfile.avatar} alt={smeDisplayName} className="w-8 h-8 rounded-full object-cover border border-blue-300 shadow-xs" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {smeInitials || 'KF'}
                </div>
              )}
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-[#261543]">{smeDisplayName}</span>
                <span className="text-[10px] text-blue-700 font-semibold">Verified Enterprise</span>
              </div>
            </button>
          </div>
        </header>

        {/* Mobile/Tablet Horizontal Tab Bar */}
        <div className="xl:hidden px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard' },
            { id: 'ai-recommend', label: '🤖 AI Pods' },
            { id: 'marketplace', label: '🛒 Marketplace' },
            { id: 'acceptance-gate', label: '📦 Acceptance Gate' },
            { id: 'problems', label: `Problems (${problems.length})` },
            { id: 'pods', label: 'Pods' },
            { id: 'applications', label: `Applications (${pendingApplicationsCount})` },
            { id: 'mentors', label: 'Mentors' },
            { id: 'reviews', label: `Reviews (${pendingReviewsCount})` },
            { id: 'appointments', label: 'Appointments' },
            { id: 'payments', label: 'Payments' },
            { id: 'profile', label: 'Profile' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SmeTab)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#3b226e] text-white shadow-xs'
                    : 'bg-white/70 text-[#523d77] hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* MAIN BODY CONTAINER */}
        <main className="px-4 sm:px-8 py-4 sm:py-6 space-y-8 max-w-7xl w-full">
          
                                        {/* ================= TAB 1: OVERVIEW ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-12 pb-16">
              {/* 1. HERO */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#ebe4f3]/90 to-[#e4dcfe]/50 border border-white/80 shadow-[0_8px_30px_rgba(38,21,67,0.03)] p-8 sm:p-10 backdrop-blur-xl"
              >
                {/* Soft Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#c59fd9]/20 via-transparent to-transparent pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 border border-white/80 text-blue-900 text-xs font-extrabold mb-4 shadow-sm backdrop-blur-md"
                      >
                        <Truck className="w-3.5 h-3.5 text-blue-600" />
                        <span>Kestrel Freight & Logistics Pvt Ltd</span>
                      </motion.div>
                      <h2 className="text-4xl sm:text-5xl font-black text-[#261543] tracking-tight leading-[1.1]">
                        Welcome back,<br />Kestrel Freight 👋
                      </h2>
                      <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700 mt-2">
                        Turn your business problems into shipped products.
                      </p>
                    </div>
                    <p className="text-base sm:text-lg text-[#5c4780] leading-relaxed max-w-xl font-medium">
                      Post real problems, connect with skilled student pods and industry mentors, and track your product from idea to deployment.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={() => setShowSubmitModal(true)}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#6d4ec7] to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white text-sm font-black shadow-[0_8px_20px_rgba(109,78,199,0.25)] hover:shadow-[0_12px_25px_rgba(109,78,199,0.35)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Post New Problem Statement</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('applications')}
                        className="px-6 py-3 rounded-2xl bg-white/80 hover:bg-white border border-white text-[#261543] text-sm font-bold shadow-[0_4px_15px_rgba(38,21,67,0.05)] hover:shadow-[0_8px_20px_rgba(38,21,67,0.08)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer backdrop-blur-md"
                      >
                        <Users className="w-4 h-4 text-purple-600" />
                        <span>Review Pod Applications ({applications.length})</span>
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
                    {/* Glow behind 3D Character */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/20 blur-[80px] rounded-full -z-10 animate-pulse" />
                    <SmeCharacter3D />
                  </div>
                </div>
              </motion.section>

              {/* 2. QUICK ACTIONS */}
              <motion.section 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="px-2"
              >
                <h3 className="text-xs font-black text-[#705e94] mb-4 uppercase tracking-widest opacity-80">Quick Actions</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setShowSubmitModal(true)} className="flex-1 flex items-center justify-between p-5 bg-gradient-to-br from-[#ebe4f3]/80 to-[#b4c3ec]/20 hover:from-[#e4dcfe]/90 hover:to-[#b4c3ec]/40 border border-white/60 hover:border-[#c59fd9]/60 rounded-[1.5rem] transition-all duration-300 hover:-translate-y-[2px] shadow-[0_4px_15px_rgba(38,21,67,0.02)] hover:shadow-[0_8px_25px_rgba(109,78,199,0.15)] group cursor-pointer backdrop-blur-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/80 text-[#6d4ec7] flex items-center justify-center shrink-0 shadow-sm border border-white/60 group-hover:scale-[1.08] group-hover:shadow-md transition-all duration-300">
                        <Plus className="w-5 h-5 font-bold" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-[#261543]">Submit a Problem</h4>
                        <p className="text-xs text-[#5c4780] font-medium mt-0.5">Post a new business challenge.</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#6d4ec7] opacity-60 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 relative z-10" />
                  </button>
                  <button onClick={() => setActiveTab('pods')} className="flex-1 flex items-center justify-between p-5 bg-gradient-to-br from-[#ebe4f3]/80 to-[#b4c3ec]/20 hover:from-[#e4dcfe]/90 hover:to-[#b4c3ec]/40 border border-white/60 hover:border-[#c59fd9]/60 rounded-[1.5rem] transition-all duration-300 hover:-translate-y-[2px] shadow-[0_4px_15px_rgba(38,21,67,0.02)] hover:shadow-[0_8px_25px_rgba(109,78,199,0.15)] group cursor-pointer backdrop-blur-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/80 text-[#6d4ec7] flex items-center justify-center shrink-0 shadow-sm border border-white/60 group-hover:scale-[1.08] group-hover:shadow-md transition-all duration-300">
                        <Users className="w-5 h-5 font-bold" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-[#261543]">Find a Skill Pod</h4>
                        <p className="text-xs text-[#5c4780] font-medium mt-0.5">Browse verified student teams.</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#6d4ec7] opacity-60 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 relative z-10" />
                  </button>
                  <button onClick={() => setActiveTab('mentors')} className="flex-1 flex items-center justify-between p-5 bg-gradient-to-br from-[#ebe4f3]/80 to-[#b4c3ec]/20 hover:from-[#e4dcfe]/90 hover:to-[#b4c3ec]/40 border border-white/60 hover:border-[#c59fd9]/60 rounded-[1.5rem] transition-all duration-300 hover:-translate-y-[2px] shadow-[0_4px_15px_rgba(38,21,67,0.02)] hover:shadow-[0_8px_25px_rgba(109,78,199,0.15)] group cursor-pointer backdrop-blur-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/80 text-[#6d4ec7] flex items-center justify-center shrink-0 shadow-sm border border-white/60 group-hover:scale-[1.08] group-hover:shadow-md transition-all duration-300">
                        <Award className="w-5 h-5 font-bold" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-[#261543]">Find a Mentor</h4>
                        <p className="text-xs text-[#5c4780] font-medium mt-0.5">Select an industry expert.</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#6d4ec7] opacity-60 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300 relative z-10" />
                  </button>
                </div>
              </motion.section>

              {/* 3. COMPANY OVERVIEW METRICS STRIP */}
              <motion.section 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="px-2"
              >
                <div className="flex flex-col sm:flex-row bg-gradient-to-r from-transparent via-[#ebe4f3]/60 to-transparent border-y border-[#c0b1e4]/40 divide-y sm:divide-y-0 sm:divide-x divide-[#c0b1e4]/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                  
                  <div className="flex-1 py-8 px-6 text-center sm:text-left hover:bg-[#e4dcfe]/50 transition-colors duration-300 cursor-default group relative">
                    <h4 className="text-xs font-black text-[#705e94] uppercase tracking-widest mb-2 opacity-80 group-hover:text-[#5c4780] transition-colors">Active Problems</h4>
                    <strong className="text-5xl font-black text-[#261543] group-hover:text-[#6d4ec7] transition-colors inline-block group-hover:scale-105 transform origin-left">{problems.length}</strong>
                    <span className="block text-sm font-semibold text-[#5c4780] mt-2 group-hover:text-[#261543] transition-colors">8 applications received</span>
                  </div>
                  <div className="flex-1 py-8 px-6 text-center sm:text-left hover:bg-[#e4dcfe]/50 transition-colors duration-300 cursor-default group relative">
                    <h4 className="text-xs font-black text-[#705e94] uppercase tracking-widest mb-2 opacity-80 group-hover:text-[#5c4780] transition-colors">Active Pods</h4>
                    <strong className="text-5xl font-black text-[#261543] group-hover:text-[#6d4ec7] transition-colors inline-block group-hover:scale-105 transform origin-left">{projects.length}</strong>
                    <span className="block text-sm font-semibold text-[#5c4780] mt-2 group-hover:text-[#261543] transition-colors">8 students building</span>
                  </div>
                  <div className="flex-1 py-8 px-6 text-center sm:text-left hover:bg-[#e4dcfe]/50 transition-colors duration-300 cursor-default group relative">
                    <h4 className="text-xs font-black text-[#705e94] uppercase tracking-widest mb-2 opacity-80 group-hover:text-[#5c4780] transition-colors">Pending Reviews</h4>
                    <strong className="text-5xl font-black text-[#261543] group-hover:text-[#6d4ec7] transition-colors inline-block group-hover:scale-105 transform origin-left">{pendingReviewsCount}</strong>
                    <span className="block text-sm font-semibold text-[#5c4780] mt-2 group-hover:text-[#261543] transition-colors">Awaiting sign-off</span>
                  </div>
                  <div className="flex-1 py-8 px-6 text-center sm:text-left hover:bg-[#e4dcfe]/50 transition-colors duration-300 cursor-default group relative">
                    <h4 className="text-xs font-black text-[#705e94] uppercase tracking-widest mb-2 opacity-80 group-hover:text-[#5c4780] transition-colors">Products Shipped</h4>
                    <strong className="text-5xl font-black text-[#261543] group-hover:text-[#6d4ec7] transition-colors inline-block group-hover:scale-105 transform origin-left">4</strong>
                    <span className="block text-sm font-semibold text-[#5c4780] mt-2 group-hover:text-[#261543] transition-colors">Production software live</span>
                  </div>
                </div>
              </motion.section>

              {/* 4. MY ACTIVE PROJECTS */}
              <motion.section 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="px-2"
              >
                <div className="mb-5">
                  <h3 className="text-xs font-black text-[#705e94] tracking-widest uppercase opacity-80">My Active Projects</h3>
                  <p className="text-base font-bold text-[#261543] mt-1">Track real-time progress, mentorship and delivery status.</p>
                </div>
                
                <div className="bg-gradient-to-br from-white/70 to-[#ebe4f3]/40 border border-white/70 shadow-[0_8px_30px_rgba(38,21,67,0.03)] rounded-3xl overflow-hidden backdrop-blur-md">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                      <thead>
                        <tr className="border-b border-[#c0b1e4]/30">
                          <th className="px-6 py-4 text-[10px] font-extrabold text-[#705e94] tracking-widest uppercase">PROJECT</th>
                          <th className="px-6 py-4 text-[10px] font-extrabold text-[#705e94] tracking-widest uppercase">POD</th>
                          <th className="px-6 py-4 text-[10px] font-extrabold text-[#705e94] tracking-widest uppercase">MENTOR</th>
                          <th className="px-6 py-4 text-[10px] font-extrabold text-[#705e94] tracking-widest uppercase">CURRENT STAGE</th>
                          <th className="px-6 py-4 text-[10px] font-extrabold text-[#705e94] tracking-widest uppercase">PROGRESS</th>
                          <th className="px-6 py-4 text-[10px] font-extrabold text-[#705e94] tracking-widest uppercase">STATUS</th>
                          <th className="px-6 py-4 text-[10px] font-extrabold text-[#705e94] tracking-widest uppercase text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#c0b1e4]/20">
                        {projects.map((project) => (
                          <tr key={project.id} className="group hover:bg-gradient-to-r hover:from-[#ebe4f3]/60 hover:to-transparent transition-all duration-300">
                            <td className="px-6 py-5 text-sm font-bold text-[#261543] group-hover:font-black group-hover:text-black transition-all">{project.title}</td>
                            <td className="px-6 py-5">
                               <span className="px-3 py-1 rounded-full bg-[#f4effc] border border-[#e4dcfe] text-xs font-bold text-[#6d4ec7]">
                                 {project.podName}
                               </span>
                            </td>
                            <td className="px-6 py-5 text-xs font-semibold text-[#5c4780]">{project.mentorName}</td>
                            <td className="px-6 py-5 text-xs font-bold text-[#261543]">{project.stage}</td>
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 h-2 bg-[#d1c5ea]/40 rounded-full overflow-hidden min-w-[80px] relative shadow-inner">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${project.progress}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-[#6d4ec7] rounded-full shadow-[0_0_8px_rgba(109,78,199,0.4)]" 
                                  />
                                </div>
                                <span className="text-xs font-black text-[#6d4ec7] w-8 text-right">{project.progress}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wide whitespace-nowrap ${
                                project.status.includes('On Track') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm' : 
                                project.status.includes('Needs Attention') ? 'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm' : 
                                'bg-purple-50 text-purple-700 border border-purple-200 shadow-sm'
                              }`}>
                                {project.status.replace(/^[🟢🟡🔴]\s*/, '')}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-right">
                              <button onClick={() => setSelectedProject(project)} className="text-xs font-bold text-[#6d4ec7] hover:text-[#3b226e] transition-colors cursor-pointer inline-flex items-center gap-1.5 bg-white/50 hover:bg-white px-3 py-1.5 rounded-lg border border-[#c0b1e4]/30 group-hover:border-[#c0b1e4]/80 group-hover:shadow-sm">
                                View <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.section>

              {/* 5. PROJECT PIPELINE */}
              <motion.section 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="px-2"
              >
                <div className="mb-5">
                  <h3 className="text-xs font-black text-[#705e94] tracking-widest uppercase opacity-80">Project Pipeline</h3>
                </div>
                <div className="bg-gradient-to-br from-white/70 to-[#ebe4f3]/40 border border-white/70 shadow-[0_8px_30px_rgba(38,21,67,0.03)] rounded-3xl overflow-hidden backdrop-blur-md">
                  <div className="flex border-b border-[#c0b1e4]/30 px-4 pt-2 gap-4">
                    <button 
                      onClick={() => setPipelineTab('problems')} 
                      className={`px-6 py-4 text-sm font-bold transition-all duration-300 relative ${pipelineTab === 'problems' ? 'text-[#6d4ec7]' : 'text-[#705e94] hover:text-[#261543]'}`}
                    >
                      Problem Statements
                      {pipelineTab === 'problems' && (
                        <motion.div layoutId="pipelineTabUnderline" className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-[#6d4ec7] rounded-t-full shadow-[0_-2px_10px_rgba(109,78,199,0.3)]" />
                      )}
                    </button>
                    <button 
                      onClick={() => setPipelineTab('applications')} 
                      className={`px-6 py-4 text-sm font-bold transition-all duration-300 relative ${pipelineTab === 'applications' ? 'text-[#6d4ec7]' : 'text-[#705e94] hover:text-[#261543]'}`}
                    >
                      Pod Applications
                      {pipelineTab === 'applications' && (
                        <motion.div layoutId="pipelineTabUnderline" className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 to-[#6d4ec7] rounded-t-full shadow-[0_-2px_10px_rgba(109,78,199,0.3)]" />
                      )}
                    </button>
                  </div>
                  
                  <div className="divide-y divide-[#c0b1e4]/20 relative">
                    {/* Soft background animation on tab switch */}
                    <motion.div 
                      key={pipelineTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {pipelineTab === 'problems' && problems.map((prob) => (
                        <div key={prob.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-gradient-to-r hover:from-[#ebe4f3]/60 hover:to-transparent transition-all duration-300">
                          <div className="flex-1">
                            <h4 className="text-base font-bold text-[#261543] group-hover:text-black transition-colors">{prob.title}</h4>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                               <span className="text-xs font-semibold text-[#6d4ec7] bg-[#e4dcfe]/50 px-2.5 py-1 rounded-md">{prob.category}</span>
                               <span className="text-xs font-bold text-[#5c4780]">{prob.budget}</span>
                               <span className="text-xs font-medium text-[#705e94] flex items-center gap-1.5"><Users className="w-3 h-3" /> {prob.applicationsCount} Student Pods Applied</span>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end gap-3 shrink-0">
                            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wide uppercase ${
                              prob.status === 'Accepting Applications' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                              prob.status === 'In Review' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 
                              'bg-purple-50 text-purple-700 border border-purple-200'
                            }`}>
                              {prob.status}
                            </span>
                            <button onClick={() => setActiveTab('problems')} className="text-xs font-bold text-[#6d4ec7] hover:text-[#3b226e] transition-all cursor-pointer inline-flex items-center gap-1.5">
                              View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {pipelineTab === 'applications' && applications.map((app) => (
                        <div key={app.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-gradient-to-r hover:from-[#ebe4f3]/60 hover:to-transparent transition-all duration-300">
                          <div className="flex-1">
                            <h4 className="text-base font-bold text-[#261543] flex items-center gap-2 group-hover:text-black transition-colors">
                               {app.podName} 
                               <span className="flex items-center gap-1 text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200"><Star className="w-2.5 h-2.5 fill-amber-500" /> {app.podScore}</span>
                            </h4>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                               <span className="text-xs font-semibold text-[#5c4780]">{app.studentCount} Students</span>
                               <span className="text-[10px] text-[#c0b1e4]">&bull;</span>
                               <span className="text-xs font-medium text-[#705e94]">{app.skills.join(', ')}</span>
                               <span className="text-[10px] text-[#c0b1e4]">&bull;</span>
                               <span className="text-xs font-bold text-[#6d4ec7]">{app.previousProjects} Projects Shipped</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 shrink-0">
                            <button onClick={() => setActiveTab('applications')} className="text-xs font-bold text-[#5c4780] hover:text-[#261543] transition-colors cursor-pointer inline-flex items-center gap-1">
                              View Profile
                            </button>
                            <button onClick={() => setActiveTab('applications')} className="px-5 py-2 bg-gradient-to-r from-purple-600 to-[#6d4ec7] hover:from-[#5a3da8] hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-[0_4px_12px_rgba(109,78,199,0.3)] hover:shadow-[0_6px_15px_rgba(109,78,199,0.4)] transition-all hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5 group">
                              Review Application <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.section>

              {/* 6. PROJECT DELIVERY WORKFLOW */}
              <motion.section 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="px-2"
              >
                <div className="mb-5">
                  <h3 className="text-xs font-black text-[#705e94] tracking-widest uppercase opacity-80">Project Delivery Pipeline</h3>
                </div>
                <div className="bg-gradient-to-br from-white/70 to-[#ebe4f3]/40 border border-white/70 shadow-[0_8px_30px_rgba(38,21,67,0.03)] rounded-3xl p-8 sm:p-10 overflow-hidden overflow-x-auto backdrop-blur-md">
                  <div className="min-w-[800px]">
                    <div className="flex items-start justify-between relative">
                      {/* Timeline connecting line (background) */}
                      <div className="absolute left-[3.5rem] right-[3.5rem] top-[25px] h-1.5 bg-[#e4dcfe] rounded-full -z-10 shadow-inner" />
                      
                      {/* Timeline connecting line (filled progress) */}
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '42%' }} // Approx to Development node
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                        className="absolute left-[3.5rem] top-[25px] h-1.5 bg-gradient-to-r from-[#8b5cf6] via-[#6d4ec7] to-purple-500 rounded-full shadow-[0_0_12px_rgba(109,78,199,0.3)] -z-10" 
                      />
                      
                      {[
                        { step: 'Problem Submitted', active: true },
                        { step: 'Pod Selected', active: true },
                        { step: 'Mentor Assigned', active: true },
                        { step: 'Development', active: true, current: true },
                        { step: 'Mentor Review', active: false },
                        { step: 'SME Approval', active: false },
                        { step: 'QC', active: false },
                        { step: 'Shipped', active: false }
                      ].map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center relative w-28 group">
                          <div className="h-14 flex items-center justify-center relative w-full mb-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 shrink-0 ${
                              s.current ? 'bg-gradient-to-tr from-[#6d4ec7] to-purple-500 text-white shadow-[0_0_20px_rgba(109,78,199,0.4)] ring-4 ring-[#ebe4f3]' :
                              s.active ? 'bg-gradient-to-tr from-[#8b5cf6] to-[#6d4ec7] text-white shadow-md' : 
                              'bg-transparent border-2 border-[#d1c5ea] text-[#705e94]'
                            }`}>
                              {s.active && !s.current ? <Check className="w-5 h-5" /> : (s.current ? <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" /> : (idx + 1))}
                            </div>
                          </div>
                          <div className="h-10 flex items-start justify-center px-1">
                            <span className={`text-xs text-center leading-tight tracking-wide ${s.current ? 'font-black text-[#6d4ec7]' : s.active ? 'font-bold text-[#261543]' : 'font-semibold text-[#705e94]'}`}>
                              {s.step}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="mt-12 p-6 sm:px-8 bg-gradient-to-r from-[#ebe4f3]/90 to-transparent rounded-2xl border-l-4 border-[#6d4ec7] flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] pointer-events-none" />
                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 text-[10px] font-black text-[#6d4ec7] uppercase tracking-widest mb-2 bg-white/60 px-2 py-1 rounded shadow-sm">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#6d4ec7] animate-pulse" />
                           Current Stage: Development &mdash; Sprint 3
                        </div>
                        <p className="text-base font-black text-[#261543]">Sprint 3 Deliverable awaiting SME review</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="w-48 h-2.5 bg-white/80 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-gradient-to-r from-purple-500 to-[#6d4ec7] w-[68%]" />
                          </div>
                          <span className="text-xs font-bold text-[#5c4780]">68% Progress</span>
                        </div>
                      </div>
                      <button onClick={() => setActiveTab('reviews')} className="relative z-10 px-6 py-3 bg-gradient-to-r from-[#6d4ec7] to-purple-600 hover:from-[#5a3da8] hover:to-purple-700 text-white font-bold text-sm rounded-xl shadow-[0_6px_15px_rgba(109,78,199,0.3)] hover:shadow-[0_8px_20px_rgba(109,78,199,0.4)] transition-all hover:-translate-y-0.5 cursor-pointer shrink-0 inline-flex items-center gap-2">
                        Review & Approve <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.section>

              {/* 7. PEOPLE & MEETINGS */}
              <motion.section 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="px-2"
              >
                <div className="mb-5">
                  <h3 className="text-xs font-black text-[#705e94] tracking-widest uppercase opacity-80">People & Meetings</h3>
                </div>
                <div className="bg-gradient-to-br from-[#ebe4f3]/80 to-[#b4c3ec]/20 border border-white/60 shadow-[0_8px_30px_rgba(38,21,67,0.03)] rounded-3xl p-2 backdrop-blur-md">
                   <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#c0b1e4]/40">
                      {/* Assigned Mentor */}
                      <div className="p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[10px] font-extrabold text-[#705e94] uppercase tracking-widest mb-5 opacity-80">Assigned Mentor</h4>
                          <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6d4ec7] to-[#8b5cf6] flex items-center justify-center text-white font-black text-2xl shadow-[0_0_20px_rgba(109,78,199,0.5)] ring-4 ring-white/60 shrink-0">
                              PS
                            </div>
                            <div>
                              <h5 className="text-lg font-black text-[#261543]">Priya Sharma</h5>
                              <p className="text-sm font-semibold text-[#5c4780] mt-1 flex items-center gap-1.5">
                                Staff Engineer <span className="text-[#c0b1e4]">&bull;</span> <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> 4.9
                              </p>
                              <div className="mt-2 inline-flex text-xs font-bold text-[#6d4ec7] bg-white/60 border border-white px-2 py-0.5 rounded shadow-sm">
                                Assigned to: GPS Fleet Telemetry
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                          <button onClick={() => setActiveTab('mentors')} className="flex-1 py-3 text-center text-xs font-bold text-[#261543] bg-white/60 hover:bg-white border border-white shadow-sm hover:shadow-md rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer">
                            View Profile
                          </button>
                          <button onClick={() => setShowScheduleModal(true)} className="flex-1 py-3 text-center text-xs font-bold text-white bg-gradient-to-r from-[#6d4ec7] to-purple-600 hover:from-[#5a3da8] hover:to-purple-700 shadow-[0_4px_12px_rgba(109,78,199,0.25)] hover:shadow-[0_8px_20px_rgba(109,78,199,0.35)] rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer">
                            Book Session
                          </button>
                        </div>
                      </div>

                      {/* Next Meeting */}
                      <div className="p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          <h4 className="text-[10px] font-extrabold text-[#705e94] uppercase tracking-widest mb-5 opacity-80">Next Meeting</h4>
                          <div className="flex items-center justify-between mb-4 bg-white/60 hover:bg-white transition-colors p-5 rounded-2xl border border-white shadow-sm group">
                            <div>
                               <span className="block text-[10px] font-bold text-[#6d4ec7] uppercase tracking-wider mb-1">Sprint 3 Review</span>
                               <h5 className="text-xl font-black text-[#261543] group-hover:text-[#6d4ec7] transition-colors">Today, 4:00 PM</h5>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-[#e4dcfe]/80 flex items-center justify-center text-[#6d4ec7] group-hover:scale-110 transition-transform shadow-inner">
                               <Video className="w-6 h-6" />
                            </div>
                          </div>
                          <p className="text-[10px] font-bold text-[#705e94] uppercase tracking-widest mb-1.5">Attendees</p>
                          <p className="text-sm font-semibold text-[#261543]">Priya Sharma, Apex-2, Kestrel Freight</p>
                        </div>
                        <div className="mt-6">
                          <button className="w-full py-3 text-center text-sm font-bold text-[#261543] bg-white border border-white hover:border-[#c0b1e4]/50 shadow-[0_4px_12px_rgba(38,21,67,0.05)] hover:shadow-[0_6px_15px_rgba(38,21,67,0.08)] rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer inline-flex items-center justify-center gap-2 group">
                            Join Meeting <ArrowRight className="w-4 h-4 text-[#6d4ec7] group-hover:translate-x-1.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                   </div>
                </div>
              </motion.section>

              {/* 8. BUSINESS IMPACT */}
              <motion.section 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="px-2"
              >
                <div className="mb-5">
                  <h3 className="text-xs font-black text-[#705e94] tracking-widest uppercase opacity-80">Business Impact</h3>
                </div>
                <div className="bg-gradient-to-br from-[#ebe4f3]/80 to-[#b4c3ec]/20 border border-white/60 shadow-[0_8px_30px_rgba(38,21,67,0.03)] rounded-3xl p-2 backdrop-blur-md">
                   <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#c0b1e4]/40">
                      
                      {/* Project Spending */}
                      <div className="p-6 sm:p-8">
                        <h4 className="text-[10px] font-extrabold text-[#705e94] uppercase tracking-widest mb-6 opacity-80">Project Spending</h4>
                        
                        <div className="space-y-6">
                          <div className="flex items-end justify-between">
                            <span className="text-sm font-semibold text-[#5c4780]">Total Budget</span>
                            <span className="text-2xl font-black text-[#261543]">₹1,20,000</span>
                          </div>
                          
                          {/* Animated Segmented Bar */}
                          <div className="w-full h-4 bg-white/60 rounded-full overflow-hidden flex shadow-inner border border-white">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: '50%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full shadow-[0_0_10px_rgba(16,185,129,0.4)] relative z-20 rounded-r-full" 
                              title="Paid: ₹60,000" 
                            />
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: '33%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                              className="bg-gradient-to-r from-purple-500 to-[#6d4ec7] h-full shadow-[0_0_10px_rgba(109,78,199,0.4)] relative z-10 -ml-2 rounded-r-full" 
                              title="Active/In Escrow: ₹40,000" 
                            />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 pt-2">
                            <div className="bg-white/50 p-3 rounded-xl border border-white text-center shadow-sm">
                              <span className="block text-sm font-black text-emerald-600">₹60K</span>
                              <span className="block text-[10px] font-bold text-[#5c4780] uppercase tracking-wider mt-0.5">Paid</span>
                            </div>
                            <div className="bg-white/50 p-3 rounded-xl border border-white text-center shadow-sm">
                              <span className="block text-sm font-black text-[#6d4ec7]">₹40K</span>
                              <span className="block text-[10px] font-bold text-[#5c4780] uppercase tracking-wider mt-0.5">In Escrow</span>
                            </div>
                            <div className="bg-white/50 p-3 rounded-xl border border-white text-center shadow-sm">
                              <span className="block text-sm font-black text-[#705e94]">₹20K</span>
                              <span className="block text-[10px] font-bold text-[#5c4780] uppercase tracking-wider mt-0.5">Remaining</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recently Shipped */}
                      <div className="p-6 sm:p-8">
                        <h4 className="text-[10px] font-extrabold text-[#705e94] uppercase tracking-widest mb-6 opacity-80">Recently Shipped</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#e4dcfe]/60 transition-colors border border-transparent hover:border-white/60 cursor-default group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="text-sm font-black text-[#261543]">Fleet Telemetry Dashboard</h5>
                                <p className="text-[10px] font-bold text-[#705e94] mt-0.5">Shipped Oct 12</p>
                              </div>
                            </div>
                            <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded shadow-sm whitespace-nowrap group-hover:scale-105 transition-transform">₹50K Value</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[#e4dcfe]/60 transition-colors border border-transparent hover:border-white/60 cursor-default group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <div>
                                <h5 className="text-sm font-black text-[#261543]">Warehouse Auto-Route</h5>
                                <p className="text-[10px] font-bold text-[#705e94] mt-0.5">Shipped Sep 28</p>
                              </div>
                            </div>
                            <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded shadow-sm whitespace-nowrap group-hover:scale-105 transition-transform">₹30K Value</span>
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              </motion.section>
            </div>
          )}

        {/* ================= TAB: AI POD RECOMMENDATIONS & COMPARISON ================= */}
        {activeTab === 'ai-recommend' && (
          <SmeAiPodRecommendation userEmail={userEmail} />
        )}

        {/* ================= TAB: STUDENT PROJECT MARKETPLACE (BUYER VIEW) ================= */}
        {activeTab === 'marketplace' && (
          <SmeStudentMarketplace userEmail={userEmail} />
        )}

        {/* ================= TAB: PROJECT ACCEPTANCE & ESCROW GATE ================= */}
        {activeTab === 'acceptance-gate' && (
          <SmeAcceptanceGate userEmail={userEmail} />
        )}

        {/* ================= TAB 2: MY PROBLEMS ================= */}
        {activeTab === 'problems' && (
          <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-[#261543]">My Problem Statements</h2>
                  <p className="text-sm text-slate-600 font-medium">Manage and review incoming bids from student Skill Pods</p>
                </div>
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Post New Problem</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {problems.map(p => (
                  <div key={p.id} className="uiverse-inset-card flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-xs">
                          {p.category}
                        </span>
                        <span className="text-xs font-black text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                          {p.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-slate-900">{p.title}</h3>
                      <p className="text-xs text-slate-700 font-normal leading-relaxed">{p.description}</p>

                      <div className="p-3 bg-white/70 rounded-xl border border-slate-300/60 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-2xs text-slate-500 font-semibold block">Budget Range</span>
                          <strong className="text-slate-900">{p.budget}</strong>
                        </div>
                        <div>
                          <span className="text-2xs text-slate-500 font-semibold block">Estimated Delivery</span>
                          <strong className="text-slate-900">{p.timeline}</strong>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {p.skillsRequired.map(sk => (
                          <span key={sk} className="px-2 py-0.5 bg-white/80 border border-slate-300 rounded text-2xs font-bold text-slate-800">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-400/25 flex items-center justify-between">
                      <span className="text-xs font-black text-purple-900">
                        {p.applicationsCount} Pod Applications
                      </span>
                      <button
                        onClick={() => setActiveTab('applications')}
                        className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                      >
                        View Applications →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 3: APPLICATIONS ================= */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#261543]">Student Pod Applications</h2>
                <p className="text-sm text-slate-600 font-medium">Select and assign the right student pod to execute your problem statement</p>
              </div>

              <div className="space-y-4">
                {applications.map(app => (
                  <div key={app.id} className="uiverse-inset-card flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-purple-700 text-white font-mono text-sm font-black rounded-xl">
                            {app.podName}
                          </span>
                          <span className="text-xs font-bold text-slate-700">
                            {app.studentCount} Team Members • Lead: {app.leadName}
                          </span>
                        </div>
                        <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                          ⭐ {app.podScore} Rating
                        </span>
                      </div>

                      <h3 className="text-base font-black text-slate-900">
                        Applying for: {app.problemTitle}
                      </h3>

                      <p className="text-xs text-slate-700 bg-white/70 p-3 rounded-xl border border-slate-300/60 leading-relaxed italic">
                        "{app.pitch}"
                      </p>

                      <div className="flex flex-wrap items-center gap-2">
                        {app.skills.map(s => (
                          <span key={s} className="px-2.5 py-1 bg-white/90 border border-slate-300 rounded-lg text-xs font-bold text-slate-900">
                            {s}
                          </span>
                        ))}
                        <span className="text-xs font-bold text-purple-950 ml-auto">
                          {app.previousProjects} Previously Shipped Commercial Products
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-400/25 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">Applied {app.appliedTime}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApplicationAction(app.id, 'Rejected')}
                          className="px-3.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-900 font-bold text-xs rounded-xl border border-red-300 cursor-pointer"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApplicationAction(app.id, 'Shortlisted')}
                          className="px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl border border-amber-300 cursor-pointer"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={() => handleApplicationAction(app.id, 'Accepted')}
                          className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>Accept & Assign Pod</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: MENTORS ================= */}
          {activeTab === 'mentors' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#261543]">Industry Mentors</h2>
                <p className="text-sm text-slate-600 font-medium">Verify software architecture and sprint deliverables with top engineers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mentors.map(m => (
                  <div key={m.id} className="uiverse-inset-card flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-700 text-white flex items-center justify-center font-black text-base shadow-sm">
                        {m.name.charAt(0)}
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-black text-slate-900">{m.name}</h3>
                          <span className="text-xs font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                            ⭐ {m.rating}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-purple-900">{m.role}</p>
                      </div>

                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{m.bio}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {m.skills.map(sk => (
                          <span key={sk} className="px-2 py-0.5 bg-white/80 border border-slate-300 rounded text-2xs font-bold text-slate-800">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-400/25 flex items-center justify-between">
                      <span className="text-2xs font-bold text-emerald-800">{m.status}</span>
                      <button
                        onClick={() => {
                          setSelectedMentor(m);
                          setShowScheduleModal(true);
                        }}
                        className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: REVIEWS ================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#261543]">Deliverable Reviews & Approvals</h2>
                <p className="text-sm text-slate-600 font-medium">Review submitted student code & release milestone escrow payments</p>
              </div>

              <div className="space-y-4">
                {reviews.map(r => (
                  <div key={r.id} className="uiverse-inset-card flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-xl bg-[#261543] text-white text-xs font-black">
                          {r.deliverableType}
                        </span>
                        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-300">
                          {r.status}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-slate-900">
                        {r.title}
                      </h3>

                      <p className="text-xs text-emerald-900 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                        ✓ Mentor Validation: {r.mentorStatus}
                      </p>

                      <p className="text-xs text-slate-700 font-normal leading-relaxed">
                        {r.notes}
                      </p>

                      <div className="p-3 bg-white/70 rounded-xl border border-slate-300/60 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">Milestone Payout:</span>
                        <span className="font-black text-emerald-900">{r.milestonePayment}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-400/25 flex items-center justify-between">
                      <a
                        href={r.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-purple-800 hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Prototype Demo</span>
                      </a>
                      
                      <button
                        onClick={() => setSelectedReview(r)}
                        className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                      >
                        Review & Approve Deliverable →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 6: PAYMENTS & PROFILE ================= */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#261543]">Project Spending & Financial Ledger</h2>
                <p className="text-sm text-slate-600 font-medium">Safe milestone payments protected with micro-escrow releases</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="uiverse-inset-card-compact text-center">
                  <span className="text-2xs font-extrabold text-slate-600 uppercase">Total Budget</span>
                  <strong className="text-2xl font-black text-slate-900 block my-1">₹{budgetData.totalBudget.toLocaleString()}</strong>
                  <span className="text-2xs text-slate-500 font-medium">4 Allocated Milestones</span>
                </div>
                <div className="uiverse-inset-card-compact text-center">
                  <span className="text-2xs font-extrabold text-emerald-800 uppercase">Paid Out</span>
                  <strong className="text-2xl font-black text-emerald-950 block my-1">₹{budgetData.paid.toLocaleString()}</strong>
                  <span className="text-2xs text-emerald-800 font-bold">2 Sprints Shipped</span>
                </div>
                <div className="uiverse-inset-card-compact text-center">
                  <span className="text-2xs font-extrabold text-amber-800 uppercase">In Escrow</span>
                  <strong className="text-2xl font-black text-amber-950 block my-1">₹{budgetData.inEscrow.toLocaleString()}</strong>
                  <span className="text-2xs text-amber-800 font-bold">Sprint 3 Pending Approval</span>
                </div>
                <div className="uiverse-inset-card-compact text-center">
                  <span className="text-2xs font-extrabold text-purple-800 uppercase">Remaining</span>
                  <strong className="text-2xl font-black text-purple-950 block my-1">₹{budgetData.remaining.toLocaleString()}</strong>
                  <span className="text-2xs text-purple-800 font-bold">Final Handover</span>
                </div>
              </div>

              <div className="uiverse-inset-card space-y-4">
                <h3 className="text-base font-black text-slate-900">Milestone Payment Breakdown</h3>
                <div className="space-y-3">
                  {budgetData.milestones.map(m => (
                    <div key={m.name} className="p-3.5 rounded-xl bg-white/70 border border-slate-300/60 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{m.name}</h4>
                        <span className="text-2xs text-slate-500 font-semibold">{m.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-slate-900">{m.amount}</span>
                        <span className={`text-2xs font-bold block ${
                          m.status.includes('Completed') ? 'text-emerald-700' :
                          m.status.includes('In Progress') ? 'text-amber-700' :
                          'text-slate-500'
                        }`}>{m.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 7: PROFILE ================= */}
          {activeTab === 'profile' && (
            <div className="uiverse-inset-card max-w-2xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-800 text-white flex items-center justify-center font-black text-xl shadow-md">
                  KF
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Kestrel Freight & Logistics</h2>
                  <p className="text-xs font-bold text-purple-900">Verified Corporate Enterprise • GSTIN Verified</p>
                  <span className="text-2xs text-slate-600">Member since May 2026</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-300 text-xs">
                <div className="flex justify-between py-2 border-b border-slate-300/60">
                  <span className="font-semibold text-slate-600">Company Domain</span>
                  <strong className="text-slate-900">Intra-City Logistics & Warehousing</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-300/60">
                  <span className="font-semibold text-slate-600">Primary Contact Email</span>
                  <strong className="text-slate-900">{userEmail || 'engineering@kestrellogistics.com'}</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-300/60">
                  <span className="font-semibold text-slate-600">Active Shipped Software</span>
                  <strong className="text-emerald-800">4 Commercial Products Live</strong>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-300/60">
                  <span className="font-semibold text-slate-600">Total Student Bounties Awarded</span>
                  <strong className="text-purple-900">₹1,80,000 Total</strong>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => showToast('Company profile changes saved.')}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Edit Company Profile
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ================= MODAL 1: SUBMIT A PROBLEM ================= */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#f7f4fc] rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-purple-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Submit Business Problem</h3>
              </div>
              <button 
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProblem} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Problem Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Automated Cold-Chain Logistics Hub"
                  value={newProblem.title}
                  onChange={e => setNewProblem({ ...newProblem, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 font-medium text-slate-900 focus:outline-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Category</label>
                  <select
                    value={newProblem.category}
                    onChange={e => setNewProblem({ ...newProblem, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 font-medium text-slate-900"
                  >
                    <option value="AI • Logistics • Web">AI • Logistics • Web</option>
                    <option value="Enterprise SaaS • IoT">Enterprise SaaS • IoT</option>
                    <option value="FinTech & Escrow">FinTech & Escrow</option>
                    <option value="Computer Vision & OCR">Computer Vision & OCR</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Budget Range</label>
                  <input
                    type="text"
                    placeholder="e.g., ₹40,000 - ₹60,000"
                    value={newProblem.budget}
                    onChange={e => setNewProblem({ ...newProblem, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Skills Required (Comma separated)</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, FastAPI, Redis"
                  value={newProblem.skillsRequired}
                  onChange={e => setNewProblem({ ...newProblem, skillsRequired: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Detailed Technical & Business Scope</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your workflows, expected deliverables, API integration requirements, and success criteria..."
                  value={newProblem.description}
                  onChange={e => setNewProblem({ ...newProblem, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 font-medium text-slate-900 focus:outline-purple-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-300 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold shadow-xs cursor-pointer"
                >
                  Post Problem Statement 🚀
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ================= MODAL 2: REVIEW & APPROVAL ================= */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#f7f4fc] rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-purple-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-purple-700 text-white text-xs font-black rounded-lg">
                  {selectedReview.deliverableType}
                </span>
                <h3 className="text-base font-black text-slate-900">{selectedReview.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedReview(null)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-bold">
                ✓ Mentor Sign-Off: {selectedReview.mentorStatus}
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700">Sprint Scope Summary:</span>
                <p className="p-3 bg-white rounded-xl border border-slate-300 text-slate-800 leading-relaxed font-medium">
                  {selectedReview.notes}
                </p>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-purple-950 block">Milestone Escrow Release:</span>
                  <span className="text-2xs text-purple-800">Protected in Smart Contract</span>
                </div>
                <strong className="text-base font-black text-purple-950">{selectedReview.milestonePayment}</strong>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Company Feedback / Notes for Pod</label>
                <textarea
                  rows={2}
                  placeholder="e.g., Looks great! Telemetry tested cleanly on staging."
                  value={reviewNotes}
                  onChange={e => setReviewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-300 flex items-center justify-end gap-2">
                <button
                  onClick={() => handleReviewDecision(selectedReview.id, 'Changes Requested')}
                  className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-xl border border-amber-300 cursor-pointer"
                >
                  Request Changes
                </button>
                <button
                  onClick={() => handleReviewDecision(selectedReview.id, 'Approved')}
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span>Approve & Release Payout</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ================= MODAL 3: PROJECT CHAT ================= */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#f7f4fc] rounded-3xl p-6 max-w-lg w-full border border-purple-200 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">Project Pod Chat</h3>
                <p className="text-xs text-purple-900 font-bold">Apex-2 + Sarah Chen (Mentor) + Kestrel Freight</p>
              </div>
              <button 
                onClick={() => setShowChatModal(false)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-60 bg-white rounded-2xl border border-slate-300 p-3 overflow-y-auto space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 max-w-[85%]">
                <strong className="text-purple-900 block font-bold text-2xs">Rahul Sharma (Pod Lead)</strong>
                We have deployed the WebSocket telemetry dispatcher to staging! Testing at 1,000 simulated SKU events.
              </div>
              <div className="p-2.5 rounded-xl bg-purple-100 text-purple-950 max-w-[85%]">
                <strong className="text-purple-950 block font-bold text-2xs">Sarah Chen (Mentor)</strong>
                Verified the Redis key expiration TTL. Code architecture meets production SLA!
              </div>
              <div className="p-2.5 rounded-xl bg-blue-100 text-blue-950 ml-auto max-w-[85%] text-right">
                <strong className="text-blue-900 block font-bold text-2xs">You (Kestrel Freight)</strong>
                Awesome progress. Reviewing the sprint milestone now.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message to the pod & mentor..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-purple-600"
              />
              <button
                onClick={() => showToast('Message sent to project workspace!')}
                className="px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ================= MODAL 4: SCHEDULE MEETING ================= */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#f7f4fc] rounded-3xl p-6 max-w-md w-full border border-purple-200 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900">Schedule Sprint Session</h3>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Select Student Pod / Mentor</label>
                <select className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 font-medium">
                  <option>Apex-2 + Sarah Chen (Principal Architect)</option>
                  <option>Nova-X + Priya Sharma (Staff Engineer)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Date</label>
                  <input type="date" defaultValue="2026-08-25" className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900" />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Time Slot</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900">
                    <option>4:00 PM - 4:45 PM</option>
                    <option>11:30 AM - 12:15 PM</option>
                    <option>2:00 PM - 2:45 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Session Agenda</label>
                <input type="text" placeholder="Sprint demo, requirement clarification..." className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowScheduleModal(false);
                    showToast('📅 Meeting scheduled with Google Meet video link generated!');
                  }}
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Confirm Meeting
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
