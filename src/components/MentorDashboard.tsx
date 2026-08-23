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
  Lock,
  Flame,
  FileCheck2
} from 'lucide-react';
import { SkillPodsLogo } from './SkillPodsLogo';
import { MentorCharacter3D } from './MentorCharacter3D';
import { MentorMilestoneGate } from './MentorMilestoneGate';
import { MentorSkillVerification } from './MentorSkillVerification';
import { MentorPodHealthAlerts } from './MentorPodHealthAlerts';

interface MentorDashboardProps {
  userEmail: string;
  onSwitchWorkspace: () => void;
  onBackToHome: () => void;
}

export type MentorTab =
  | 'overview'
  | 'milestone-gates'
  | 'skill-verification'
  | 'health-alerts'
  | 'pods'
  | 'projects'
  | 'reviews'
  | 'students'
  | 'sessions'
  | 'earnings'
  | 'profile';

interface PodReviewItem {
  id: string;
  type: 'Architecture Review' | 'Code Review' | 'Sprint Review';
  podName: string;
  projectTitle: string;
  submittedBy: string;
  priority: 'High' | 'Medium' | 'Normal';
  submittedTime: string;
  description: string;
  techDetails: string;
  codeSnippet?: string;
  status: 'Pending' | 'Approved' | 'Changes Requested';
  mentorNotes?: string;
}

interface MentorPod {
  id: string;
  name: string;
  title: string;
  smeName: string;
  studentCount: number;
  currentSprint: number;
  totalSprints: number;
  progress: number;
  status: 'Needs Review' | 'In Progress' | 'Ready to Validate' | 'Completed';
  techStack: string[];
  healthScore: number;
  sprintGoal: string;
  githubUrl: string;
}

interface StudentProgressData {
  id: string;
  name: string;
  podName: string;
  role: string;
  progress: number;
  status: 'green' | 'yellow' | 'red';
  statusLabel: string;
  skills: { name: string; level: number }[];
  focus: string;
  commitsThisWeek: number;
  feedbackGiven?: string;
}

interface UpcomingSession {
  id: string;
  dateLabel: string;
  time: string;
  title: string;
  podName: string;
  type: 'Architecture Review' | 'Office Hours' | 'Sprint Review' | '1-on-1 Mentoring';
  link: string;
  status: 'Scheduled' | 'Live Soon' | 'Completed';
}

export const MentorDashboard: React.FC<MentorDashboardProps> = ({
  userEmail,
  onSwitchWorkspace,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = useState<MentorTab>('overview');

  // Dynamically resolve logged-in mentor profile from database / Google OAuth / localStorage
  const getMentorProfile = () => {
    try {
      const stored = localStorage.getItem('skillpods_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) {
          return {
            name: parsed.name,
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
      return { name: formatted || 'Sarah Chen', email: userEmail };
    }
    return { name: 'Sarah Chen', email: userEmail || 'sarah.chen@cloudflare.com' };
  };

  const currentMentorProfile = getMentorProfile();
  const mentorDisplayName = currentMentorProfile.name;
  const mentorInitials = mentorDisplayName
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Interactive Reviews State
  const [reviews, setReviews] = useState<PodReviewItem[]>([
    {
      id: 'rev-1',
      type: 'Architecture Review',
      podName: 'Apex-2',
      projectTitle: 'Smart Inventory System',
      submittedBy: 'Rahul Sharma',
      priority: 'High',
      submittedTime: '15m ago',
      description: 'Reviewing the WebSocket event dispatcher and Redis cache invalidation layer for 10k real-time SKU updates.',
      techDetails: 'FastAPI + Redis Pub/Sub + PostgreSQL + WebSocket Client',
      codeSnippet: `// WebSocket telemetry dispatcher
async function broadcastStockUpdate(skuId: string, delta: number) {
  const updatedStock = await redis.hincrby('sku_inventory', skuId, delta);
  wsClients.forEach(client => {
    if (client.subscriptions.has(skuId)) {
      client.send(JSON.stringify({ skuId, count: updatedStock, ts: Date.now() }));
    }
  });
}`,
      status: 'Pending'
    },
    {
      id: 'rev-2',
      type: 'Code Review',
      podName: 'Vision-X',
      projectTitle: 'AI Detection API',
      submittedBy: 'Priya Nair',
      priority: 'High',
      submittedTime: '2h ago',
      description: 'PR #42: Added asynchronous batch image inference with PyTorch & YOLOv8 model quantization.',
      techDetails: 'Python 3.11, ONNX Runtime, CUDA 12.1',
      codeSnippet: `@app.post("/api/v1/detect-crop-disease")
async def infer_batch(files: list[UploadFile] = File(...)):
    images = [await read_image(f) for f in files]
    results = await model_pool.infer_async(images)
    return {"predictions": results, "inference_ms": results.latency}`,
      status: 'Pending'
    },
    {
      id: 'rev-3',
      type: 'Sprint Review',
      podName: 'Pod Nova',
      projectTitle: 'Micro-Escrow Payments',
      submittedBy: 'Sofia Mendez',
      priority: 'Medium',
      submittedTime: 'Yesterday',
      description: 'Sprint 2 Milestone: Razorpay Route split payment logic and automated escrow release webhook.',
      techDetails: 'Node.js, Express, Webhook Signature Verification',
      status: 'Pending'
    },
    {
      id: 'rev-4',
      type: 'Architecture Review',
      podName: 'Kestrel-Fleet',
      projectTitle: 'Driver Telemetry Gateway',
      submittedBy: 'Dev Patel',
      priority: 'Normal',
      submittedTime: '1d ago',
      description: 'Proposed GeoJSON buffering pipeline using PostGIS & spatial indexing for 5,000 active trucks.',
      techDetails: 'PostgreSQL PostGIS, Go Goroutines',
      status: 'Pending'
    }
  ]);

  // Active Pods
  const [pods] = useState<MentorPod[]>([
    {
      id: 'pod-apex-2',
      name: 'Apex-2',
      title: 'Smart Inventory Management',
      smeName: 'Kestrel Logistics',
      studentCount: 4,
      currentSprint: 3,
      totalSprints: 6,
      progress: 68,
      status: 'Needs Review',
      techStack: ['React', 'FastAPI', 'Redis', 'PostgreSQL'],
      healthScore: 92,
      sprintGoal: 'Live SKU Telemetry & Barcode Scanning Gateway',
      githubUrl: 'https://github.com/skillpods/pod-apex-2-inventory'
    },
    {
      id: 'pod-vision-x',
      name: 'Vision-X',
      title: 'AI Crop Detection',
      smeName: 'AgroNova Systems',
      studentCount: 5,
      currentSprint: 2,
      totalSprints: 5,
      progress: 42,
      status: 'In Progress',
      techStack: ['PyTorch', 'FastAPI', 'React', 'Docker'],
      healthScore: 88,
      sprintGoal: 'Mobile camera feed inference pipeline with sub-100ms latency',
      githubUrl: 'https://github.com/skillpods/pod-vision-x-crops'
    },
    {
      id: 'pod-nova',
      name: 'Pod Nova',
      title: 'FinTech Micro-Escrow Payments',
      smeName: 'VyaparPay India',
      studentCount: 4,
      currentSprint: 2,
      totalSprints: 4,
      progress: 75,
      status: 'Ready to Validate',
      techStack: ['Node.js', 'Express', 'Razorpay API', 'PostgreSQL'],
      healthScore: 96,
      sprintGoal: 'Milestone escrow payout release & automated audit trail',
      githubUrl: 'https://github.com/skillpods/pod-nova-escrow'
    }
  ]);

  // Students Directory
  const [students, setStudents] = useState<StudentProgressData[]>([
    {
      id: 'st-1',
      name: 'Rahul Sharma',
      podName: 'Apex-2',
      role: 'Frontend Lead',
      progress: 82,
      status: 'green',
      statusLabel: '🟢 On Track',
      focus: 'WebSocket UI & Realtime SKU Canvas',
      commitsThisWeek: 18,
      skills: [
        { name: 'React / Next.js', level: 88 },
        { name: 'TypeScript', level: 85 },
        { name: 'WebSocket Telemetry', level: 78 }
      ]
    },
    {
      id: 'st-2',
      name: 'Priya Nair',
      podName: 'Vision-X',
      role: 'Backend / AI Lead',
      progress: 70,
      status: 'green',
      statusLabel: '🟢 On Track',
      focus: 'PyTorch YOLOv8 ONNX Quantization',
      commitsThisWeek: 14,
      skills: [
        { name: 'Python & FastAPI', level: 90 },
        { name: 'PyTorch / YOLO', level: 82 },
        { name: 'Docker / CI', level: 74 }
      ]
    },
    {
      id: 'st-3',
      name: 'Aman Verma',
      podName: 'Apex-2',
      role: 'QA & Security',
      progress: 45,
      status: 'yellow',
      statusLabel: '🟡 Needs Mentoring',
      focus: 'Cypress E2E & Redis load tests',
      commitsThisWeek: 6,
      skills: [
        { name: 'Cypress / Jest', level: 65 },
        { name: 'Load Testing', level: 50 },
        { name: 'Security Auditing', level: 60 }
      ]
    },
    {
      id: 'st-4',
      name: 'Sofia Mendez',
      podName: 'Pod Nova',
      role: 'Fullstack Escrow Dev',
      progress: 90,
      status: 'green',
      statusLabel: '🟢 Shipped Sprint',
      focus: 'Razorpay Webhook Verification',
      commitsThisWeek: 22,
      skills: [
        { name: 'Node.js & Express', level: 92 },
        { name: 'PostgreSQL DB', level: 86 },
        { name: 'FinTech Compliance', level: 80 }
      ]
    }
  ]);

  // Upcoming Sessions
  const [sessions, setSessions] = useState<UpcomingSession[]>([
    {
      id: 'sess-1',
      dateLabel: 'Today',
      time: '4:00 PM',
      title: 'Apex-2 Architecture Review',
      podName: 'Apex-2',
      type: 'Architecture Review',
      link: 'https://meet.google.com/skp-apex-arch',
      status: 'Live Soon'
    },
    {
      id: 'sess-2',
      dateLabel: 'Tomorrow',
      time: '11:30 AM',
      title: 'Student Office Hours (Open Q&A)',
      podName: 'All Mentored Pods',
      type: 'Office Hours',
      link: 'https://meet.google.com/skp-office-hours',
      status: 'Scheduled'
    },
    {
      id: 'sess-3',
      dateLabel: 'Aug 25',
      time: '2:00 PM',
      title: 'Vision-X Sprint 2 Milestone Review',
      podName: 'Vision-X',
      type: 'Sprint Review',
      link: 'https://meet.google.com/skp-vision-sprint',
      status: 'Scheduled'
    }
  ]);

  // Modals state
  const [selectedReview, setSelectedReview] = useState<PodReviewItem | null>(null);
  const [selectedPod, setSelectedPod] = useState<MentorPod | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentProgressData | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Data
  const [profile, setProfile] = useState({
    name: 'Sarah Chen',
    title: 'Principal Architect @ Stripe',
    company: 'Stripe',
    experience: '9+ Years Industry Experience',
    rating: 4.9,
    studentsMentored: '120+',
    projectsShipped: 12,
    bio: 'Specializing in high-throughput distributed systems, event-driven microservices, and helping student teams build commercial-grade SaaS products.',
    skills: ['System Design', 'Web Architecture', 'Distributed Systems', 'APIs', 'Product Engineering', 'Redis & Caching']
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle Review action (Approve or Request Changes)
  const handleReviewDecision = (reviewId: string, decision: 'Approved' | 'Changes Requested', notes: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, status: decision, mentorNotes: notes } : r))
    );
    setSelectedReview(null);
    showToast(
      decision === 'Approved'
        ? `✓ Review Approved! Pod notified and sprint milestone validated.`
        : `⚠️ Change request sent back to the student pod with your notes.`
    );
  };

  const handleSendStudentFeedback = (studentId: string) => {
    if (!feedbackText.trim()) return;
    setStudents(prev =>
      prev.map(st => (st.id === studentId ? { ...st, feedbackGiven: feedbackText } : st))
    );
    showToast(`Direct feedback sent to ${selectedStudent?.name}!`);
    setFeedbackText('');
  };

  const pendingReviewsCount = reviews.filter(r => r.status === 'Pending').length;

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
              { id: 'milestone-gates', icon: Lock, label: 'Sprint Milestone Gates' },
              { id: 'skill-verification', icon: Award, label: 'Skill & Contribution Verification' },
              { id: 'health-alerts', icon: Activity, label: 'Pod Health Alerts' },
              { id: 'pods', icon: Users, label: 'My Pods' },
              { id: 'projects', icon: FolderGit2, label: 'Projects' },
              { id: 'reviews', icon: CheckCircle2, label: 'Reviews', badge: pendingReviewsCount },
              { id: 'students', icon: ShieldCheck, label: 'Students' },
              { id: 'sessions', icon: Calendar, label: 'Sessions' },
              { id: 'earnings', icon: IndianRupee, label: 'Earnings' },
              { id: 'profile', icon: Flame, label: 'Profile' }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as MentorTab)}
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
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#4c3182] font-black text-2xs border border-purple-200 shadow-2xs">
                  Mentor Workspace 👨‍🏫
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5d4a82] font-medium mt-0.5">
                Sprint Milestone Gating &bull; Skill Verification Stamps &bull; Pod Health Radar
              </p>
            </div>
          </div>

          {/* Top Right Date & Profile Card */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex px-3.5 py-1.5 rounded-full bg-white/80 border border-white/80 text-[#3b226e] text-xs font-semibold shadow-2xs">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
            </div>

            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 p-1 sm:pr-3 rounded-full bg-white/80 border border-white/80 shadow-2xs hover:bg-white transition-all cursor-pointer"
            >
              {currentMentorProfile.avatar ? (
                <img src={currentMentorProfile.avatar} alt={mentorDisplayName} className="w-8 h-8 rounded-full object-cover border border-purple-300 shadow-xs" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {mentorInitials || 'SC'}
                </div>
              )}
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-[#261543]">{mentorDisplayName}</span>
                <span className="text-[10px] text-purple-700 font-semibold">Staff Architect</span>
              </div>
            </button>
          </div>
        </header>

        {/* Mobile/Tablet Horizontal Tab Bar */}
        <div className="xl:hidden px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard' },
            { id: 'milestone-gates', label: '🚦 Milestone Gates' },
            { id: 'skill-verification', label: '🧠 Skill Verification' },
            { id: 'health-alerts', label: '⚠️ Health Alerts' },
            { id: 'pods', label: 'My Pods' },
            { id: 'projects', label: 'Projects' },
            { id: 'reviews', label: `Reviews (${pendingReviewsCount})` },
            { id: 'students', label: 'Students' },
            { id: 'sessions', label: 'Sessions' },
            { id: 'earnings', label: 'Earnings' },
            { id: 'profile', label: 'Profile' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as MentorTab)}
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
            <div className="space-y-12">
              {/* 1. MENTOR HERO */}
              <motion.section 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-br from-[rgba(180,195,236,0.72)] via-[rgba(235,228,243,0.96)] to-[rgba(197,159,217,0.65)] border border-white/80 shadow-[0_8px_30px_rgba(109,78,199,0.12)] rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden backdrop-blur-xl"
              >
                {/* Subtle radial background glow */}
                <div className="absolute -right-20 -top-20 w-[500px] h-[500px] bg-gradient-to-tr from-[#c59fd9]/40 to-[#b4c3ec]/40 rounded-full blur-[100px] -z-10 pointer-events-none" />
                <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 border border-white/80 text-[#5c4780] text-[10px] font-black tracking-widest uppercase mb-6 shadow-[0_2px_10px_rgba(38,21,67,0.05)] backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5 text-[#6d4ec7]" />
                        <span>Industry Mentorship Command</span>
                      </div>
                      <h2 className="text-4xl sm:text-5xl font-black text-[#261543] tracking-tight leading-tight">
                        Good morning, Sarah 👋
                      </h2>
                      <p className="text-xl sm:text-2xl font-bold text-[#6d4ec7] mt-3 drop-shadow-sm">
                        Help teams turn ideas into products.
                      </p>
                    </div>

                    <p className="text-base sm:text-lg text-[#5c4780] leading-relaxed max-w-xl font-medium">
                      Guide student Skill Pods, review their work, solve technical roadblocks, and help them ship production-ready products.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mt-8">
                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[10px] font-black text-[#261543] shadow-[0_4px_15px_rgba(109,78,199,0.08)] uppercase tracking-wider">3 ACTIVE PODS</motion.span>
                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.2 }} className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[10px] font-black text-[#261543] shadow-[0_4px_15px_rgba(109,78,199,0.08)] uppercase tracking-wider">NEXT SESSION 4:00 PM</motion.span>
                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.5 }} className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[10px] font-black text-[#261543] shadow-[0_4px_15px_rgba(109,78,199,0.08)] uppercase tracking-wider">2 REVIEWS PENDING</motion.span>
                        <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.8 }} className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[10px] font-black text-[#261543] shadow-[0_4px_15px_rgba(109,78,199,0.08)] uppercase tracking-wider">12 PROJECTS SHIPPED</motion.span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#c59fd9]/20 blur-[60px] rounded-full" />
                      <MentorCharacter3D />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* 2. QUICK ACTIONS */}
              <section className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button onClick={() => setActiveTab('reviews')} className="flex flex-col gap-3 p-6 rounded-[2rem] bg-white/40 border border-white/50 shadow-[0_8px_20px_rgba(109,78,199,0.06)] hover:shadow-[0_12px_30px_rgba(109,78,199,0.15)] transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden text-left backdrop-blur-md">
                    <div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-6 h-6 text-[#6d4ec7]" />
                    </div>
                    <div className="mt-2">
                      <h4 className="text-base font-black text-[#261543] mb-1 group-hover:text-[#6d4ec7] transition-colors">Review Projects</h4>
                      <p className="text-[11px] font-medium text-[#5c4780]">Architecture & pull requests</p>
                    </div>
                    <div className="flex items-center justify-between w-full mt-4">
                      <span className="text-[10px] font-bold text-[#705e94] bg-white/50 px-2 py-1 rounded-md uppercase tracking-wider">{pendingReviewsCount} reviews pending</span>
                      <ArrowRight className="w-4 h-4 text-[#6d4ec7] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                  
                  <button onClick={() => setActiveTab('pods')} className="flex flex-col gap-3 p-6 rounded-[2rem] bg-white/40 border border-white/50 shadow-[0_8px_20px_rgba(109,78,199,0.06)] hover:shadow-[0_12px_30px_rgba(109,78,199,0.15)] transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden text-left backdrop-blur-md">
                    <div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-[#4f46e5]" />
                    </div>
                    <div className="mt-2">
                      <h4 className="text-base font-black text-[#261543] mb-1 group-hover:text-[#4f46e5] transition-colors">My Skill Pods</h4>
                      <p className="text-[11px] font-medium text-[#5c4780]">Monitor active teams & velocity</p>
                    </div>
                    <div className="flex items-center justify-between w-full mt-4">
                      <span className="text-[10px] font-bold text-[#705e94] bg-white/50 px-2 py-1 rounded-md uppercase tracking-wider">3 teams building</span>
                      <ArrowRight className="w-4 h-4 text-[#4f46e5] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                  
                  <button onClick={() => setShowScheduleModal(true)} className="flex flex-col gap-3 p-6 rounded-[2rem] bg-white/40 border border-white/50 shadow-[0_8px_20px_rgba(109,78,199,0.06)] hover:shadow-[0_12px_30px_rgba(109,78,199,0.15)] transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden text-left backdrop-blur-md">
                    <div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Calendar className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="mt-2">
                      <h4 className="text-base font-black text-[#261543] mb-1 group-hover:text-teal-600 transition-colors">Book a Session</h4>
                      <p className="text-[11px] font-medium text-[#5c4780]">Office hours & 1-on-1s</p>
                    </div>
                    <div className="flex items-center justify-between w-full mt-4">
                      <span className="text-[10px] font-bold text-[#705e94] bg-white/50 px-2 py-1 rounded-md uppercase tracking-wider">Today · 4:00 PM</span>
                      <ArrowRight className="w-4 h-4 text-teal-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                </div>
              </section>

              {/* 3. MENTOR OVERVIEW */}
              <section className="bg-gradient-to-r from-white/40 via-[#ebe4f3]/60 to-white/40 border-y border-white/60 py-6 px-8 rounded-[2rem] backdrop-blur-sm shadow-[0_4px_15px_rgba(109,78,199,0.04)] hover:shadow-[0_4px_25px_rgba(109,78,199,0.12)] transition-shadow duration-300">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#c0b1e4]/40">
                  <div className="flex-1 py-4 md:py-0 md:pr-8 text-center sm:text-left">
                    <strong className="block text-4xl font-black text-[#261543]">3</strong>
                    <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-widest mt-1.5 block">Active Pods</span>
                    <span className="text-[11px] font-medium text-[#6d4ec7] mt-2 block">Apex-2 · Vision-X · Nova</span>
                  </div>
                  <div className="flex-1 py-4 md:py-0 md:px-8 text-center sm:text-left">
                    <strong className="block text-4xl font-black text-[#261543]">18</strong>
                    <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-widest mt-1.5 block">Students Mentored</span>
                    <span className="text-[11px] font-medium text-[#6d4ec7] mt-2 block">120+ all-time alumni</span>
                  </div>
                  <div className="flex-1 py-4 md:py-0 md:px-8 text-center sm:text-left">
                    <strong className="block text-4xl font-black text-[#261543]">{pendingReviewsCount}</strong>
                    <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-widest mt-1.5 block">Pending Reviews</span>
                    <span className="text-[11px] font-medium text-[#6d4ec7] mt-2 block">2 high priority</span>
                  </div>
                  <div className="flex-1 py-4 md:py-0 md:pl-8 text-center sm:text-left">
                    <strong className="block text-4xl font-black text-[#261543]">12</strong>
                    <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-widest mt-1.5 block">Projects Shipped</span>
                    <span className="text-[11px] font-medium text-[#6d4ec7] mt-2 block">Commercial SaaS & IP</span>
                  </div>
                </div>
              </section>

              {/* 4. PRIMARY WORKSPACE */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* My Active Pods */}
                <section className="xl:col-span-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-[#705e94] tracking-widest uppercase bg-white/40 px-3 py-1.5 rounded-full border border-white/60">
                      My Active Pods
                    </h3>
                  </div>
                  
                  <div className="space-y-5">
                    {pods.map((pod) => (
                      <div key={pod.id} className="p-6 rounded-[2rem] bg-white/40 border border-white/50 shadow-[0_8px_20px_rgba(109,78,199,0.05)] hover:shadow-[0_12px_30px_rgba(109,78,199,0.12)] hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-md relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c59fd9]/20 to-transparent rounded-bl-full opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-mono text-sm font-black text-[#261543]">
                            {pod.name}
                          </span>
                          <span className="text-[#c0b1e4]">•</span>
                          <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-wider">
                            {pod.studentCount} Students
                          </span>
                          <span className="text-[#c0b1e4]">•</span>
                          <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-wider">
                            Sprint {pod.currentSprint} of {pod.totalSprints}
                          </span>
                        </div>
                        
                        <h4 className="text-xl font-black text-[#6d4ec7] mb-4">
                          {pod.title}
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 p-4 rounded-[1.25rem] bg-white/40 border border-white/50">
                          <div>
                            <span className="text-[9px] font-bold text-[#705e94] uppercase tracking-widest block mb-1">SME</span>
                            <span className="text-sm font-black text-[#261543]">{pod.smeName}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-[#705e94] uppercase tracking-widest block mb-1">Sprint Goal</span>
                            <span className="text-sm font-medium text-[#261543] leading-snug block line-clamp-2">{pod.sprintGoal}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                          <div>
                            <div className="flex items-center justify-between mb-1.5 text-[10px] font-bold text-[#705e94] uppercase tracking-widest">
                              <span>Progress</span>
                              <span className="text-[#261543]">{pod.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-white rounded-full overflow-hidden shadow-inner">
                              <div className="bg-gradient-to-r from-[#8b5cf6] to-[#6d4ec7] h-full rounded-full" style={{ width: `${pod.progress}%` }} />
                            </div>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-[#705e94] uppercase tracking-widest block mb-1">Health</span>
                            <span className="text-sm font-bold text-emerald-700">{pod.healthScore}% Healthy</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#c0b1e4]/30">
                          <div className="flex flex-wrap gap-1.5 items-center">
                            <span className="text-[9px] font-bold text-[#705e94] uppercase tracking-widest mr-1">Tech:</span>
                            {pod.techStack.map(tech => (
                              <span key={tech} className="text-[10px] font-bold text-[#5c4780] bg-white/80 border border-[#c0b1e4]/50 px-2 py-0.5 rounded shadow-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm border ${
                                pod.status === 'Needs Review' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                pod.status === 'Ready to Validate' ? 'bg-[#e4dcfe] text-[#6d4ec7] border-[#c0b1e4]' :
                                'bg-emerald-100 text-emerald-800 border-emerald-200'
                              }`}>
                              {pod.status}
                            </span>
                            
                            <button
                              onClick={() => setSelectedPod(pod)}
                              className="text-[11px] font-bold text-white bg-[#6d4ec7] hover:bg-[#5a3da8] px-3 py-1.5 rounded-lg shadow-[0_2px_10px_rgba(109,78,199,0.3)] flex items-center gap-1.5 transition-all"
                            >
                              Open Pod <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Pending Reviews */}
                <section className="xl:col-span-5 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-[#705e94] tracking-widest uppercase bg-white/40 px-3 py-1.5 rounded-full border border-white/60">
                      Pending Reviews
                    </h3>
                  </div>
                  
                  <div className="p-6 rounded-[2rem] bg-gradient-to-br from-white/70 to-[#ebe4f3]/50 border border-white/80 shadow-[0_8px_25px_rgba(109,78,199,0.06)] backdrop-blur-md">
                    <div className="relative pl-6 space-y-8">
                      {/* Timeline vertical line */}
                      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-[#c0b1e4] via-[#c0b1e4] to-transparent" />
                      
                      {reviews.filter(r => r.status === 'Pending').slice(0, 3).map((rev) => (
                        <div key={rev.id} className="relative group">
                          {/* Dot */}
                          <div className="absolute -left-[29px] top-1.5 flex h-3 w-3 items-center justify-center">
                            {rev.priority === 'High' && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
                            )}
                            <div className={`relative inline-flex rounded-full h-2.5 w-2.5 border border-white ${
                              rev.priority === 'High' ? 'bg-amber-500' : 'bg-[#6d4ec7]'
                            }`} />
                          </div>
                          
                          <div className="mb-1.5">
                            <span className="font-black text-[10px] text-[#705e94] uppercase tracking-widest">{rev.type}</span>
                          </div>
                          
                          <h4 className="text-sm font-black text-[#261543] mb-1 leading-tight group-hover:text-[#6d4ec7] transition-colors">
                            {rev.podName} <span className="font-normal text-[#705e94]">—</span> {rev.projectTitle}
                          </h4>
                          
                          <div className="text-[11px] font-medium text-[#5c4780] mb-3">
                            Submitted by <strong className="text-[#261543]">{rev.submittedBy}</strong> <span className="text-[#c0b1e4] px-1">•</span> {rev.submittedTime}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm border ${
                              rev.priority === 'High' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-[#e4dcfe] text-[#6d4ec7] border-[#c0b1e4]'
                            }`}>
                              {rev.priority} Priority
                            </span>
                            <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-wider">Ready for decision</span>
                          </div>
                          
                          <button
                            onClick={() => setSelectedReview(rev)}
                            className="mt-4 text-[10px] font-bold text-[#261543] hover:text-[#6d4ec7] flex items-center gap-1.5 group-hover:underline"
                          >
                            Review Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      ))}
                      
                      {pendingReviewsCount === 0 && (
                        <div className="py-6 text-center">
                          <CheckCircle2 className="w-8 h-8 text-[#c0b1e4] mx-auto mb-2" />
                          <span className="text-sm font-bold text-[#261543]">All Caught Up!</span>
                          <p className="text-[11px] text-[#705e94] mt-1">No pending reviews right now.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>

              {/* 5. STUDENT PROGRESS & 6. UPCOMING SESSIONS */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Student Progress */}
                <section className="xl:col-span-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-[#705e94] tracking-widest uppercase bg-white/40 px-3 py-1.5 rounded-full border border-white/60">
                      Student Progress & Mastery
                    </h3>
                  </div>
                  
                  <div className="bg-gradient-to-br from-white/70 to-[#ebe4f3]/50 border border-white/80 shadow-[0_8px_20px_rgba(109,78,199,0.04)] rounded-[2rem] overflow-hidden backdrop-blur-md">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="border-b border-[#c0b1e4]/50 bg-white/30">
                            <th className="px-6 py-4 text-[9px] font-black text-[#705e94] uppercase tracking-widest">Student</th>
                            <th className="px-6 py-4 text-[9px] font-black text-[#705e94] uppercase tracking-widest">Pod & Role</th>
                            <th className="px-6 py-4 text-[9px] font-black text-[#705e94] uppercase tracking-widest">Progress</th>
                            <th className="px-6 py-4 text-[9px] font-black text-[#705e94] uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[9px] font-black text-[#705e94] uppercase tracking-widest text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#c0b1e4]/30">
                          {students.map(st => (
                            <tr 
                              key={st.id}
                              onClick={() => setSelectedStudent(st)}
                              className="hover:bg-white/70 transition-colors cursor-pointer group"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6d4ec7] to-[#8b5cf6] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm border border-white/80">
                                    {st.name.charAt(0)}
                                  </div>
                                  <div>
                                    <span className="font-black text-sm text-[#261543] block">{st.name}</span>
                                    <span className="text-[10px] font-medium text-[#705e94]">{st.commitsThisWeek} commits this week</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-bold text-xs text-[#261543] block mb-0.5">{st.role}</span>
                                <span className="text-[9px] font-bold text-[#6d4ec7] uppercase tracking-wider">{st.podName}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center justify-between text-[10px] font-bold">
                                    <span className="text-[#261543]">{st.progress}%</span>
                                  </div>
                                  <div className="w-20 h-1.5 bg-[#e4dcfe] rounded-full overflow-hidden shadow-inner">
                                    <div className="bg-gradient-to-r from-[#8b5cf6] to-[#6d4ec7] h-full rounded-full" style={{ width: `${st.progress}%` }} />
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm border inline-block ${
                                  st.status === 'red' ? 'bg-rose-100 text-rose-800 border-rose-200' :
                                  st.status === 'yellow' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                }`}>
                                  {st.statusLabel.replace(/🟢 |🟡 |🔴 /, '')}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span className="text-[10px] font-bold text-[#6d4ec7] uppercase tracking-wider group-hover:underline flex items-center justify-end gap-1">
                                  Profile <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Upcoming Sessions */}
                <section className="xl:col-span-5 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-[#705e94] tracking-widest uppercase bg-white/40 px-3 py-1.5 rounded-full border border-white/60">
                      Upcoming Sessions
                    </h3>
                  </div>
                  
                  <div className="p-6 rounded-[2rem] bg-gradient-to-br from-white/70 to-[#ebe4f3]/50 border border-white/80 shadow-[0_8px_20px_rgba(109,78,199,0.04)] backdrop-blur-md">
                    <div className="space-y-6">
                      {sessions.map((sess, idx) => (
                        <div key={sess.id} className={`flex items-start gap-4 ${idx !== sessions.length - 1 ? 'pb-6 border-b border-[#c0b1e4]/40' : ''}`}>
                          <div className="w-16 shrink-0 bg-white/60 p-2 rounded-xl border border-white/80 text-center shadow-sm">
                            <span className="text-[10px] font-black text-[#705e94] uppercase tracking-widest block">{sess.dateLabel.split(' ')[0] || 'TBA'}</span>
                            <span className="text-[11px] font-black text-[#261543] block mt-1">{sess.time.split(' ')[0]} {sess.time.split(' ')[1]}</span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[8px] font-bold text-[#6d4ec7] bg-[#e4dcfe] border border-[#c0b1e4] px-1.5 py-0.5 rounded shadow-sm uppercase tracking-wider">
                                {sess.type}
                              </span>
                            </div>
                            <h4 className="text-sm font-black text-[#261543] mb-1">
                              {sess.title}
                            </h4>
                            <div className="text-[10px] font-bold text-[#705e94] uppercase tracking-wider mb-3">
                              Target: {sess.podName}
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              <a
                                href={sess.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white bg-[#6d4ec7] hover:bg-[#5a3da8] px-3 py-1.5 rounded-lg shadow-[0_2px_10px_rgba(109,78,199,0.3)] transition-all"
                              >
                                <Video className="w-3 h-3" />
                                Join Video Bridge
                              </a>
                              {sess.type !== 'Sprint Review' && (
                                <span className="text-[9px] font-bold text-[#705e94] uppercase tracking-widest flex items-center gap-1">
                                  <Video className="w-3 h-3 opacity-60" /> Google Meet
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              {/* 7. MENTOR INSIGHTS & 8. MENTORSHIP IMPACT */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {/* Mentor Insights */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-[#705e94] tracking-widest uppercase bg-white/40 px-3 py-1.5 rounded-full border border-white/60">
                      Mentor Insights & Pod Health
                    </h3>
                  </div>
                  
                  <div className="bg-gradient-to-br from-white/70 to-[#ebe4f3]/50 border border-white/80 shadow-[0_8px_20px_rgba(109,78,199,0.06)] rounded-[2.5rem] p-8 backdrop-blur-md h-[calc(100%-2.5rem)]">
                    <div className="flex items-center gap-2 mb-8">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">All Pods Healthy</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-12 gap-x-8">
                      <div>
                        <strong className="text-4xl font-black text-[#261543] block mb-1">92%</strong>
                        <span className="text-xs font-bold text-[#261543] block">Pod Health Average</span>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mt-2 block flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Zero blocker tickets</span>
                      </div>
                      <div>
                        <strong className="text-4xl font-black text-[#261543] block mb-1">32 <span className="text-lg font-medium text-[#705e94]">pts/sprint</span></strong>
                        <span className="text-xs font-bold text-[#261543] block">Sprint Velocity</span>
                        <span className="text-[10px] font-bold text-[#6d4ec7] uppercase tracking-widest mt-2 block flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +14% above cohort</span>
                      </div>
                      <div className="border-t border-[#c0b1e4]/40 pt-6">
                        <strong className="text-4xl font-black text-[#261543] block mb-1">4.2 <span className="text-lg font-medium text-[#705e94]">hrs</span></strong>
                        <span className="text-xs font-bold text-[#261543] block">Review Turnaround</span>
                        <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-widest mt-2 block flex items-center gap-1"><Zap className="w-3 h-3" /> Fastest mentor responsiveness tier</span>
                      </div>
                      <div className="border-t border-[#c0b1e4]/40 pt-6">
                        <strong className="text-4xl font-black text-[#261543] block mb-1">87%</strong>
                        <span className="text-xs font-bold text-[#261543] block">Student Engagement</span>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mt-2 block flex items-center gap-1"><Activity className="w-3 h-3" /> Active daily commits & standups</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Mentorship Impact */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black text-[#705e94] tracking-widest uppercase bg-white/40 px-3 py-1.5 rounded-full border border-white/60">
                      Mentorship Impact
                    </h3>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[rgba(197,159,217,0.3)] to-[rgba(180,195,236,0.5)] border border-white/80 shadow-[0_8px_25px_rgba(109,78,199,0.08)] rounded-[2.5rem] p-8 backdrop-blur-xl h-[calc(100%-2.5rem)] flex flex-col">
                    <div className="flex-1">
                      <strong className="text-6xl font-black text-[#261543] tracking-tighter drop-shadow-sm block mb-2">₹24,500</strong>
                      <span className="text-sm font-black text-[#6d4ec7] uppercase tracking-widest block">Total Earned</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#261543]/10 mt-10">
                      <div className="flex-1 py-4 sm:py-0 sm:pr-6">
                        <strong className="text-2xl font-black text-[#261543] block mb-1">₹6,000</strong>
                        <span className="text-[11px] font-bold text-[#261543] uppercase tracking-wider block leading-tight">Pending Milestone Escrow</span>
                        <span className="text-[10px] font-medium text-[#5c4780] mt-1.5 block">Upon Sprint 3 Approval</span>
                      </div>
                      <div className="flex-1 py-4 sm:py-0 sm:px-6">
                        <strong className="text-2xl font-black text-[#261543] block mb-1">32</strong>
                        <span className="text-[11px] font-bold text-[#261543] uppercase tracking-wider block leading-tight">Completed Sessions</span>
                        <span className="text-[10px] font-medium text-[#5c4780] mt-1.5 block">Office hours & 1-on-1s</span>
                      </div>
                      <div className="flex-1 py-4 sm:py-0 sm:pl-6">
                        <strong className="text-2xl font-black text-[#261543] block mb-1">12</strong>
                        <span className="text-[11px] font-bold text-[#261543] uppercase tracking-wider block leading-tight">Projects Guided</span>
                        <span className="text-[10px] font-medium text-[#5c4780] mt-1.5 block">Commercial prototypes</span>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-[#261543]/10">
                      <p className="text-[11px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Paid Out to Bank
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

        {/* ================= TAB: SPRINT MILESTONE GATES ================= */}
        {activeTab === 'milestone-gates' && (
          <MentorMilestoneGate userEmail={userEmail} />
        )}

        {/* ================= TAB: SKILL & CONTRIBUTION VERIFICATION ================= */}
        {activeTab === 'skill-verification' && (
          <MentorSkillVerification userEmail={userEmail} />
        )}

        {/* ================= TAB: POD HEALTH ALERTS & RADAR ================= */}
        {activeTab === 'health-alerts' && (
          <MentorPodHealthAlerts userEmail={userEmail} />
        )}

        {/* ================= TAB 2: MY PODS ================= */}
        {activeTab === 'pods' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-[#261543]">Assigned Student Skill Pods</h2>
                  <p className="text-xs text-slate-600 font-medium">Monitor sprint progress, architecture gates, and team member health.</p>
                </div>
                <button 
                  onClick={() => showToast('Pod request submitted to AI matching pool!')}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  + Take on Another Pod
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pods.map(pod => (
                  <div key={pod.id} className="uiverse-inset-card flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 bg-purple-700 text-white font-mono text-xs font-bold rounded-xl">
                          {pod.name}
                        </span>
                        <span className="text-2xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                          {pod.healthScore}% Healthy
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-slate-900">{pod.title}</h3>
                        <p className="text-xs text-slate-600 font-semibold">Company: {pod.smeName}</p>
                      </div>

                      <div>
                        <div className="flex justify-between text-2xs font-bold text-slate-700 mb-1">
                          <span>Sprint {pod.currentSprint} / {pod.totalSprints}</span>
                          <span className="text-purple-900">{pod.progress}%</span>
                        </div>
                        <div className="w-full bg-white/80 rounded-full h-2.5 overflow-hidden border border-slate-300">
                          <div className="bg-purple-700 h-full rounded-full" style={{ width: `${pod.progress}%` }} />
                        </div>
                      </div>

                      <div className="text-2xs text-slate-700 bg-white/80 p-2.5 rounded-xl border border-slate-300 font-medium">
                        <strong>Current Goal:</strong> {pod.sprintGoal}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-400/25 flex items-center justify-between gap-2">
                      <a 
                        href={pod.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-purple-800 hover:underline flex items-center gap-1"
                      >
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                      <button
                        onClick={() => setSelectedPod(pod)}
                        className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                      >
                        Open Workspace →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 3: PROJECTS ================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#261543]">Mentored Projects & Software IP</h2>
                <p className="text-xs text-slate-600 font-medium">Track commercial readiness, SME client approvals, and deployment pipelines.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Smart Inventory & SKU Automation',
                    pod: 'Apex-2',
                    client: 'Kestrel Logistics',
                    stage: 'Stage 5: Production Deployment',
                    val: '₹35,000',
                    mentorApproval: 'Sprint 3 In Review'
                  },
                  {
                    title: 'Crop Disease AI Vision Model',
                    pod: 'Vision-X',
                    client: 'AgroNova',
                    stage: 'Stage 3: Model Quantization',
                    val: '₹40,000',
                    mentorApproval: 'Sprint 2 In Progress'
                  },
                  {
                    title: 'B2B Micro-Escrow Milestone Settlement',
                    pod: 'Pod Nova',
                    client: 'VyaparPay India',
                    stage: 'Stage 4: Security & Audit',
                    val: '₹28,000',
                    mentorApproval: 'Sprint 2 Ready to Validate'
                  }
                ].map((proj, idx) => (
                  <div key={idx} className="uiverse-inset-card flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 text-2xs font-extrabold border border-purple-200">
                          {proj.pod}
                        </span>
                        <span className="text-2xs font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded-full border border-slate-300">
                          Valuation: {proj.val}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 leading-snug">{proj.title}</h3>
                      <p className="text-xs text-slate-600 font-medium">SME Client: <strong className="text-slate-900">{proj.client}</strong></p>
                      <div className="p-2.5 bg-white/80 rounded-xl border border-slate-300 text-2xs text-slate-700 font-semibold">
                        Pipeline Status: {proj.stage}
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-400/25 flex items-center justify-between">
                      <span className="text-2xs font-bold text-purple-900">{proj.mentorApproval}</span>
                      <button 
                        onClick={() => showToast(`Inspection report downloaded for ${proj.title}`)}
                        className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                      >
                        Inspect IP →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: REVIEWS ================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-[#261543]">Pending Architecture & Code Reviews</h2>
                  <p className="text-xs text-slate-600 font-medium">Validate student PRs, approve sprint gates, or request architectural adjustments.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Filter:</span>
                  <span className="px-3 py-1 bg-purple-700 text-white text-xs font-bold rounded-full">All ({reviews.length})</span>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map(rev => (
                  <div key={rev.id} className="uiverse-inset-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-2xs border border-purple-200">
                          {rev.type}
                        </span>
                        <span className="font-mono text-xs font-black text-slate-900 bg-white/80 px-2 py-0.5 rounded-md border border-slate-300">
                          {rev.podName}
                        </span>
                        <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${
                          rev.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          rev.status === 'Changes Requested' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                          'bg-purple-200/90 text-purple-950 border border-purple-300'
                        }`}>
                          {rev.status}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-slate-900">{rev.projectTitle}</h3>
                      <p className="text-xs text-slate-700">{rev.description}</p>
                      <p className="text-2xs text-slate-500 font-medium">
                        Submitted by: <strong className="text-slate-800">{rev.submittedBy}</strong> • Tech: {rev.techDetails}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      <button
                        onClick={() => setSelectedReview(rev)}
                        className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
                      >
                        {rev.status === 'Pending' ? 'Review & Validate →' : 'View Decision & Notes'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: STUDENTS ================= */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#261543]">Student Performance & Mastery Tracker</h2>
                <p className="text-xs text-slate-600 font-medium">Track individual skill progression, commit volume, and deliver 1-on-1 mentorship feedback.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {students.map(st => (
                  <div key={st.id} className="uiverse-inset-card flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-700 text-white font-black text-base flex items-center justify-center shadow-md">
                            {st.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-base font-black text-slate-900">{st.name}</h3>
                            <p className="text-xs text-purple-900 font-bold">{st.role} • {st.podName}</p>
                          </div>
                        </div>
                        <span className="text-2xs font-bold bg-white/80 text-slate-800 px-2.5 py-1 rounded-full border border-slate-300 shadow-2xs">
                          {st.statusLabel}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/80 border border-slate-300 text-2xs text-slate-700 font-medium">
                        <strong>Current Focus:</strong> {st.focus}
                      </div>

                      {/* Skill Proficiency bars */}
                      <div className="space-y-2 pt-1">
                        <span className="text-2xs font-extrabold text-slate-600 uppercase tracking-wider block">Skill Proficiency</span>
                        {st.skills.map((sk, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-2xs font-bold text-slate-800">
                              <span>{sk.name}</span>
                              <span className="text-purple-900">{sk.level}%</span>
                            </div>
                            <div className="w-full bg-white/80 rounded-full h-1.5 overflow-hidden border border-slate-300">
                              <div className="bg-purple-700 h-full rounded-full" style={{ width: `${sk.level}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-400/25 flex items-center justify-between">
                      <span className="text-2xs text-slate-600 font-semibold">{st.commitsThisWeek} weekly commits</span>
                      <button
                        onClick={() => setSelectedStudent(st)}
                        className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                      >
                        Mentor 1-on-1 →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 6: SESSIONS ================= */}
          {activeTab === 'sessions' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-[#261543]">Office Hours & Mentorship Sessions</h2>
                  <p className="text-xs text-slate-600 font-medium">Host live Google Meet sessions, sprint demo rooms, and technical code walkthroughs.</p>
                </div>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>+ Create Office Hours Slot</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sessions.map(sess => (
                  <div key={sess.id} className="uiverse-inset-card flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 bg-white/80 font-black text-2xs text-purple-950 border border-purple-200 rounded-full">
                          {sess.dateLabel} • {sess.time}
                        </span>
                        <span className="text-2xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                          {sess.status}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 leading-snug">{sess.title}</h3>
                      <p className="text-xs text-slate-600 font-semibold">Pod: <strong className="text-slate-900">{sess.podName}</strong></p>
                      <p className="text-2xs text-purple-900 font-bold bg-purple-100/80 p-2 rounded-lg border border-purple-200">
                        Session Type: {sess.type}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-400/25 flex items-center justify-between">
                      <a
                        href={sess.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Launch Video Room</span>
                      </a>
                      <span className="text-2xs text-slate-500 font-medium">HD Audio/Video</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 7: EARNINGS ================= */}
          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-[#261543]">Mentorship Compensation & Milestone Ledger</h2>
                <p className="text-xs text-slate-600 font-medium">Transparent payouts from verified pod sprint milestones, architecture gate certifications, and SME bounties.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="uiverse-inset-card-compact">
                  <span className="text-2xs font-extrabold text-slate-600 uppercase tracking-wider block">Total Disbursed to Date</span>
                  <strong className="text-3xl font-black text-slate-900 block mt-1">₹24,500</strong>
                  <span className="text-2xs text-emerald-800 font-bold mt-1 block">Deposited to HDFC Account **4812</span>
                </div>
                <div className="uiverse-inset-card-compact">
                  <span className="text-2xs font-extrabold text-purple-950 uppercase tracking-wider block">In-Escrow Pending Payout</span>
                  <strong className="text-3xl font-black text-purple-950 block mt-1">₹6,000</strong>
                  <span className="text-2xs text-purple-900 font-bold mt-1 block">Sprint 3 Milestone Release (Aug 24)</span>
                </div>
                <div className="uiverse-inset-card-compact">
                  <span className="text-2xs font-extrabold text-slate-600 uppercase tracking-wider block">Hourly Tier Valuation</span>
                  <strong className="text-3xl font-black text-slate-900 block mt-1">₹2,000 / hr</strong>
                  <span className="text-2xs text-slate-700 font-bold mt-1 block">Staff Architect Level Tier</span>
                </div>
              </div>

              <div className="uiverse-inset-card space-y-4">
                <h3 className="text-base font-black text-slate-900">Recent Milestone Transactions</h3>
                <div className="space-y-3">
                  {[
                    { desc: 'Sprint 2 Architecture Sign-off (Apex-2)', pod: 'Apex-2', date: 'Aug 18, 2026', amt: '₹5,000', status: 'Paid Out ✓' },
                    { desc: 'Model Optimization Architecture Gate (Vision-X)', pod: 'Vision-X', date: 'Aug 10, 2026', amt: '₹7,500', status: 'Paid Out ✓' },
                    { desc: 'Sprint 1 Inception & Tech Stack Audit (Nova)', pod: 'Pod Nova', date: 'Jul 28, 2026', amt: '₹6,000', status: 'Paid Out ✓' },
                    { desc: 'Sprint 3 Live Telemetry Verification (Upcoming)', pod: 'Apex-2', date: 'Aug 24, 2026', amt: '₹6,000', status: 'Pending Approval' }
                  ].map((tx, idx) => (
                    <div key={idx} className="uiverse-inset-card-compact flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-3">
                      <div>
                        <strong className="text-slate-900 font-bold block text-sm">{tx.desc}</strong>
                        <span className="text-slate-600 text-2xs font-medium">{tx.pod} • {tx.date}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-black text-slate-900 text-sm">{tx.amt}</span>
                        <span className={`px-2.5 py-1 rounded-full text-2xs font-bold border shadow-2xs ${
                          tx.status.includes('Paid') ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 8: PROFILE ================= */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-black text-[#261543]">Mentor Profile & Domain Expertise</h2>
                <p className="text-xs text-slate-600 font-medium">Manage your verified credentials, technical proficiencies, and office hours availability.</p>
              </div>

              <div className="uiverse-inset-card space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-700 via-indigo-700 to-purple-900 text-white font-black text-2xl flex items-center justify-center shadow-lg border-2 border-white">
                      SC
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{profile.name}</h3>
                      <p className="text-xs font-bold text-purple-900">{profile.title}</p>
                      <p className="text-2xs text-slate-600 font-medium">{profile.experience}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/80 border border-amber-300 text-amber-900 text-xs font-black shadow-2xs">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{profile.rating} Rating</span>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black border border-purple-200">
                      {profile.studentsMentored} Students
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Bio & Architecture Philosophy</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal bg-white/70 p-3.5 rounded-2xl border border-slate-300">
                    {profile.bio}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Core Technical Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map(sk => (
                      <span key={sk} className="px-3 py-1 bg-white/90 border border-purple-200 text-purple-950 font-bold text-xs rounded-xl shadow-2xs">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-400/25 flex items-center justify-between">
                  <span className="text-xs text-emerald-800 font-bold">Verified Industry Mentor ✓</span>
                  <button
                    onClick={() => showToast('Profile settings saved!')}
                    className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Edit Profile →
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ================= MODAL 1: INTERACTIVE REVIEW MODAL ================= */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#f9f7fd] w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200 space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-300">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-xl bg-purple-700 text-white font-bold text-xs">
                    {selectedReview.type}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-700">
                    Pod: {selectedReview.podName}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 leading-tight">
                  {selectedReview.projectTitle}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Author: <strong className="text-slate-900">{selectedReview.submittedBy}</strong> • Priority: <span className="text-amber-800 font-bold">{selectedReview.priority}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <span className="text-2xs font-extrabold text-slate-500 uppercase tracking-wider block">Submission Description</span>
                <p className="text-xs text-slate-800 leading-relaxed">{selectedReview.description}</p>
                <div className="text-2xs text-purple-900 font-semibold pt-1">
                  Tech Stack: {selectedReview.techDetails}
                </div>
              </div>

              {selectedReview.codeSnippet && (
                <div className="space-y-1.5">
                  <span className="text-2xs font-extrabold text-slate-500 uppercase tracking-wider block">Code / Implementation Snippet</span>
                  <pre className="p-4 rounded-2xl bg-[#1e152d] text-purple-200 text-2xs font-mono overflow-x-auto leading-relaxed border border-purple-900/40">
                    <code>{selectedReview.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Mentor Feedback Input */}
              <div className="space-y-1.5">
                <label className="text-2xs font-extrabold text-slate-700 uppercase tracking-wider block">
                  Mentor Architecture Feedback & Notes:
                </label>
                <textarea
                  id="mentor-review-notes"
                  rows={3}
                  defaultValue={selectedReview.mentorNotes || ''}
                  placeholder="E.g., Great redis key hashing. Add error boundary fallback for socket reconnects."
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-purple-600"
                />
              </div>

              {/* Decision Action Buttons */}
              <div className="pt-3 border-t border-slate-300 flex flex-wrap items-center justify-end gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('mentor-review-notes') as HTMLTextAreaElement;
                    handleReviewDecision(selectedReview.id, 'Changes Requested', el?.value || 'Please revise architecture');
                  }}
                  className="px-4 py-2.5 rounded-xl border border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs transition-colors cursor-pointer"
                >
                  ⚠️ Request Changes
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('mentor-review-notes') as HTMLTextAreaElement;
                    handleReviewDecision(selectedReview.id, 'Approved', el?.value || 'Approved! Excellent implementation.');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve & Validate Sprint Milestone</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL 2: POD DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedPod && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#f9f7fd] w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200 space-y-5 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-300">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-purple-700 text-white font-black text-xs">
                    {selectedPod.name}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {selectedPod.healthScore}% Pod Health
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPod(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">{selectedPod.title}</h3>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Client: <strong className="text-slate-900">{selectedPod.smeName}</strong> • {selectedPod.studentCount} Students
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <span className="text-2xs font-extrabold text-purple-900 uppercase tracking-wider block">Sprint Goal</span>
                <p className="text-xs text-slate-800 font-medium">{selectedPod.sprintGoal}</p>
                <div className="flex justify-between text-2xs font-bold text-slate-600 pt-2">
                  <span>Sprint {selectedPod.currentSprint} of {selectedPod.totalSprints}</span>
                  <span className="text-purple-900 font-black">{selectedPod.progress}% Complete</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-2xs font-extrabold text-slate-600 uppercase tracking-wider block">Repository & Pipeline</span>
                <a
                  href={selectedPod.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-300 hover:border-purple-400 text-xs font-bold text-purple-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4" />
                    <span>{selectedPod.githubUrl}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-3 border-t border-slate-300 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedPod(null);
                    setShowScheduleModal(true);
                  }}
                  className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Schedule Pod Call
                </button>
                <button
                  onClick={() => {
                    setSelectedPod(null);
                    showToast(`Sprint milestone validated for ${selectedPod.name}!`);
                  }}
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Validate Sprint Milestone
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL 3: STUDENT 1-ON-1 MODAL ================= */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#f9f7fd] w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-700 text-white font-black text-sm flex items-center justify-center">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{selectedStudent.name}</h3>
                    <span className="text-2xs text-purple-900 font-bold">{selectedStudent.role} • {selectedStudent.podName}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                  <strong>Current Focus:</strong> {selectedStudent.focus}
                </div>

                <div className="space-y-1.5">
                  <span className="text-2xs font-extrabold text-slate-600 uppercase tracking-wider block">Skill Progress</span>
                  {selectedStudent.skills.map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-2xs font-bold text-slate-800">
                        <span>{s.name}</span>
                        <span className="text-purple-900">{s.level}%</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-1.5 overflow-hidden border border-slate-300">
                        <div className="bg-purple-700 h-full rounded-full" style={{ width: `${s.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-2xs font-extrabold text-slate-700 uppercase tracking-wider block">
                    Direct Mentor Encouragement / Feedback:
                  </label>
                  <textarea
                    rows={3}
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                    placeholder={`E.g., Great progress on the WebSocket gateway! Keep test coverage above 80%.`}
                    className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-300 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    showToast(`Kudos given to ${selectedStudent.name}! 🌟`);
                    setSelectedStudent(null);
                  }}
                  className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Give Kudos</span>
                </button>
                <button
                  onClick={() => {
                    handleSendStudentFeedback(selectedStudent.id);
                    setSelectedStudent(null);
                  }}
                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Send Feedback →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL 4: SCHEDULE OFFICE HOURS MODAL ================= */}
      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#f9f7fd] w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-300">
                <h3 className="text-lg font-black text-slate-900">Schedule Mentor Session</h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">Session Title</label>
                  <input
                    type="text"
                    id="new-session-title"
                    defaultValue="Apex-2 Architecture & Redis Deep-Dive"
                    className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-extrabold text-slate-700 block mb-1">Date</label>
                    <input
                      type="text"
                      defaultValue="Today"
                      className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="font-extrabold text-slate-700 block mb-1">Time</label>
                    <input
                      type="text"
                      defaultValue="5:30 PM EST"
                      className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">Target Pod</label>
                  <select className="w-full p-2.5 bg-white rounded-xl border border-slate-300 text-slate-800 font-semibold">
                    <option>Apex-2 (Smart Inventory)</option>
                    <option>Vision-X (Crop AI)</option>
                    <option>Pod Nova (Micro-Escrow)</option>
                    <option>All Mentored Pods (Open Office Hours)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-300 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const titleEl = document.getElementById('new-session-title') as HTMLInputElement;
                    const newSess: UpcomingSession = {
                      id: `sess-${Date.now()}`,
                      dateLabel: 'Upcoming',
                      time: '5:30 PM',
                      title: titleEl?.value || 'Office Hours',
                      podName: 'Apex-2',
                      type: 'Architecture Review',
                      link: 'https://meet.google.com/skp-mentor-room',
                      status: 'Scheduled'
                    };
                    setSessions(prev => [newSess, ...prev]);
                    setShowScheduleModal(false);
                    showToast('Session slot added & Google Meet room created!');
                  }}
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Confirm & Send Invites
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
