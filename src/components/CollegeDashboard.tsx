import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Users,
  CheckCircle2,
  Award,
  GraduationCap,
  Building2,
  FileText,
  BarChart3,
  Calendar,
  Sparkles,
  ArrowRight,
  Plus,
  Search,
  Filter,
  Check,
  X,
  TrendingUp,
  Briefcase,
  ExternalLink,
  LogOut,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  IndianRupee,
  Star,
  Download,
  FolderGit2,
  Code2,
  FileCheck2,
  BookOpen,
  Cpu,
  Target,
  Clock,
  MessageSquare,
  Eye,
  CheckCheck,
  HelpCircle,
  Zap,
  Printer
} from 'lucide-react';
import { SkillPodsLogo } from './SkillPodsLogo';
import { CollegeCharacter3D } from './CollegeCharacter3D';
import { CollegeSkillPassportView } from './CollegeSkillPassportView';
import { CollegeIpRegistry } from './CollegeIpRegistry';
import { CollegeDepartmentComparison } from './CollegeDepartmentComparison';

interface CollegeDashboardProps {
  userEmail: string;
  onSwitchWorkspace: () => void;
  onBackToHome: () => void;
}

export type CollegeTab =
  | 'overview'
  | 'skill-passports'
  | 'ip-registry'
  | 'department-analytics'
  | 'students'
  | 'pods'
  | 'projects'
  | 'industry'
  | 'mentors'
  | 'placements'
  | 'reports'
  | 'profile';

interface StudentData {
  id: string;
  name: string;
  rollNo: string;
  dept: 'CSE' | 'IT' | 'ECE' | 'Mechanical';
  year: '3rd Year' | '4th Year';
  podName: string;
  skills: string[];
  readinessScore: number;
  readinessCategory: 'Industry Ready' | 'Almost Ready' | 'Needs Development';
  verifiedProjectsCount: number;
  industryBadges: string[];
  githubUser: string;
}

interface CollegePod {
  id: string;
  name: string;
  projectTitle: string;
  studentsCount: number;
  department: string;
  mentorName: string;
  industryPartner: string;
  progress: number;
  status: '🟢 On Track' | '🟡 Needs Attention' | '🚀 Shipped';
  techStack: string[];
}

interface ProjectIPItem {
  id: string;
  title: string;
  podName: string;
  studentsCount: number;
  department: string;
  status: '✅ Verified' | '🔄 Building' | '🚀 Shipped' | '⏳ Awaiting Review';
  industryInterest: 'High' | 'Medium' | 'Low';
  industryPartner: string;
  mentor: string;
  valuation: string;
  ipStatus: 'College Protected' | 'Open Source' | 'Enterprise Licensed';
  description: string;
  repoUrl: string;
}

interface IndustryPartnerItem {
  id: string;
  companyName: string;
  activeProjects: number;
  studentParticipants: number;
  mentorsAssigned: number;
  hiringIntent: string;
  logoText: string;
  category: string;
}

export const CollegeDashboard: React.FC<CollegeDashboardProps> = ({
  userEmail,
  onSwitchWorkspace,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = useState<CollegeTab>('overview');

  // Dynamically resolve logged-in college profile
  const getCollegeProfile = () => {
    try {
      const stored = localStorage.getItem('skillpods_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name || parsed.college) {
          return {
            name: parsed.college || parsed.name,
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
      return { name: formatted || 'National Institute of Technology', email: userEmail };
    }
    return { name: 'National Institute of Technology', email: userEmail || 'dean@nit.edu' };
  };

  const currentCollegeProfile = getCollegeProfile();
  const collegeDisplayName = currentCollegeProfile.name;
  const collegeInitials = collegeDisplayName
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
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectIPItem | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showIndustryConnectModal, setShowIndustryConnectModal] = useState(false);
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Student Skill & Placement Readiness Data
  const readinessMetrics = {
    technicalSkills: 82,
    industryProjects: 74,
    mentorship: 80,
    problemSolving: 71,
    communication: 64,
    industryReadyCount: 420,
    almostReadyCount: 510,
    needsDevelopmentCount: 318
  };

  // 2. Active Skill Pods Data
  const [pods, setPods] = useState<CollegePod[]>([
    {
      id: 'pod-1',
      name: 'Apex-2',
      projectTitle: 'Smart Inventory Management',
      studentsCount: 4,
      department: 'CSE',
      mentorName: 'Sarah Chen (Stripe)',
      industryPartner: 'ABC Retail',
      progress: 68,
      status: '🟢 On Track',
      techStack: ['React', 'Node.js', 'Redis', 'PostgreSQL']
    },
    {
      id: 'pod-2',
      name: 'Vision-X',
      projectTitle: 'AI Crop Detection',
      studentsCount: 5,
      department: 'CSE',
      mentorName: 'Rahul Mehta (AgriAI)',
      industryPartner: 'AgriTech Pvt Ltd',
      progress: 42,
      status: '🟡 Needs Attention',
      techStack: ['Python', 'PyTorch', 'YOLOv8', 'FastAPI']
    },
    {
      id: 'pod-3',
      name: 'Pod Nova',
      projectTitle: 'Campus Autonomous EV Shuttle Routing',
      studentsCount: 4,
      department: 'ECE / IT',
      mentorName: 'Priya Sharma (CRED)',
      industryPartner: 'Kestrel Freight & Logistics',
      progress: 90,
      status: '🚀 Shipped',
      techStack: ['ROS2', 'PostGIS', 'Flutter', 'FastAPI']
    },
    {
      id: 'pod-4',
      name: 'AeroLink-4',
      projectTitle: 'Drone Swarm Mesh Telemetry',
      studentsCount: 4,
      department: 'Mechanical / CSE',
      mentorName: 'Vikram Singh (AeroDynamics)',
      industryPartner: 'DefTech Robotics',
      progress: 55,
      status: '🟢 On Track',
      techStack: ['C++', 'MQTT', 'React', 'Three.js']
    }
  ]);

  // 3. Centralized Student Project / IP Portfolio Data
  const [projects, setProjects] = useState<ProjectIPItem[]>([
    {
      id: 'proj-1',
      title: 'Smart Inventory Management',
      podName: 'Apex-2',
      studentsCount: 4,
      department: 'Computer Science & Engineering',
      status: '✅ Verified',
      industryInterest: 'High',
      industryPartner: 'ABC Retail',
      mentor: 'Sarah Chen (Principal Architect @ Stripe)',
      valuation: '₹4.5L',
      ipStatus: 'Enterprise Licensed',
      description: 'Sub-second SKU scan sync and automated low-stock predictive replenishment engine.',
      repoUrl: 'https://github.com/abhinav-institute/apex2-inventory'
    },
    {
      id: 'proj-2',
      title: 'AI Crop Disease Detection',
      podName: 'Vision-X',
      studentsCount: 5,
      department: 'Computer Science & Engineering',
      status: '🔄 Building',
      industryInterest: 'Medium',
      industryPartner: 'AgriTech Pvt Ltd',
      mentor: 'Rahul Mehta (Staff AI Eng @ AgriTech)',
      valuation: '₹3.2L',
      ipStatus: 'College Protected',
      description: 'Computer vision mobile pipeline identifying 32 leaf blights with on-device quantized models.',
      repoUrl: 'https://github.com/abhinav-institute/visionx-crop-ai'
    },
    {
      id: 'proj-3',
      title: 'Campus Mobility & Micro-Transit Routing',
      podName: 'Pod Nova',
      studentsCount: 3,
      department: 'Information Technology',
      status: '🚀 Shipped',
      industryInterest: 'High',
      industryPartner: 'Kestrel Freight & Logistics',
      mentor: 'Priya Sharma (Staff Engineer @ CRED)',
      valuation: '₹6.8L',
      ipStatus: 'Enterprise Licensed',
      description: 'Dynamic campus transit scheduler deployed across 14 electric campus vans serving 12K trips.',
      repoUrl: 'https://github.com/abhinav-institute/campus-mobility'
    },
    {
      id: 'proj-4',
      title: 'OCR Freight Bill & Weighbridge Parser',
      podName: 'ByteCraft-3',
      studentsCount: 4,
      department: 'Information Technology',
      status: '⏳ Awaiting Review',
      industryInterest: 'High',
      industryPartner: 'Mahindra Logistics',
      mentor: 'Aarav Mehta (VP Eng @ Razorpay)',
      valuation: '₹3.9L',
      ipStatus: 'College Protected',
      description: 'Zero-shot table detection parsing Indian multi-lingual lorry receipt scans with 96% accuracy.',
      repoUrl: 'https://github.com/abhinav-institute/bytecraft-ocr'
    }
  ]);

  // 4. Industry Collaboration Partners
  const industryPartners: IndustryPartnerItem[] = [
    {
      id: 'ind-1',
      companyName: 'ABC Retail',
      activeProjects: 3,
      studentParticipants: 7,
      mentorsAssigned: 2,
      hiringIntent: '6 Pre-Placement Offers (PPOs)',
      logoText: 'ABC',
      category: 'Enterprise SaaS & Commerce'
    },
    {
      id: 'ind-2',
      companyName: 'Razorpay',
      activeProjects: 1,
      studentParticipants: 4,
      mentorsAssigned: 2,
      hiringIntent: '4 Final Round Shortlists',
      logoText: 'RP',
      category: 'FinTech & Payments Infrastructure'
    },
    {
      id: 'ind-3',
      companyName: 'CRED',
      activeProjects: 2,
      studentParticipants: 6,
      mentorsAssigned: 4,
      hiringIntent: 'Direct Fast-Track Hiring',
      logoText: 'CR',
      category: 'High-Scale Consumer Backend'
    },
    {
      id: 'ind-4',
      companyName: 'Kestrel Freight',
      activeProjects: 2,
      studentParticipants: 8,
      mentorsAssigned: 3,
      hiringIntent: '3 Engineering Internship Offers',
      logoText: 'KF',
      category: 'Logistics Telemetry'
    }
  ];

  // 5. Students Roster Data
  const [studentsList, setStudentsList] = useState<StudentData[]>([
    {
      id: 'std-1',
      name: 'Rahul Sharma',
      rollNo: '23CSE104',
      dept: 'CSE',
      year: '4th Year',
      podName: 'Apex-2 (Lead)',
      skills: ['React', 'TypeScript', 'Node.js', 'System Design'],
      readinessScore: 92,
      readinessCategory: 'Industry Ready',
      verifiedProjectsCount: 3,
      industryBadges: ['Stripe Verified Lead', 'Razorpay FinTech Fellow'],
      githubUser: 'rahul-sharma-dev'
    },
    {
      id: 'std-2',
      name: 'Priya Nair',
      rollNo: '23CSE118',
      dept: 'CSE',
      year: '4th Year',
      podName: 'Vision-X (AI Lead)',
      skills: ['Python', 'PyTorch', 'FastAPI', 'YOLOv8', 'Docker'],
      readinessScore: 88,
      readinessCategory: 'Industry Ready',
      verifiedProjectsCount: 2,
      industryBadges: ['AgriTech Vision Fellow'],
      githubUser: 'priya-nair-ai'
    },
    {
      id: 'std-3',
      name: 'Aman Varma',
      rollNo: '24IT205',
      dept: 'IT',
      year: '3rd Year',
      podName: 'Pod Nova (Backend)',
      skills: ['PostgreSQL', 'PostGIS', 'Node.js', 'REST APIs'],
      readinessScore: 78,
      readinessCategory: 'Almost Ready',
      verifiedProjectsCount: 1,
      industryBadges: ['Kestrel Telemetry Fellow'],
      githubUser: 'aman-v-code'
    },
    {
      id: 'std-4',
      name: 'Sofia Khan',
      rollNo: '24ECE082',
      dept: 'ECE',
      year: '3rd Year',
      podName: 'AeroLink-4 (Embedded)',
      skills: ['C++', 'MQTT', 'ROS2', 'Three.js'],
      readinessScore: 84,
      readinessCategory: 'Industry Ready',
      verifiedProjectsCount: 2,
      industryBadges: ['DefTech Robotics Fellow'],
      githubUser: 'sofia-embedded'
    },
    {
      id: 'std-5',
      name: 'Karan Joshi',
      rollNo: '25MECH014',
      dept: 'Mechanical',
      year: '3rd Year',
      podName: 'AeroLink-4 (Chassis CAD)',
      skills: ['SolidWorks', 'CFD Simulation', 'Python Basics'],
      readinessScore: 58,
      readinessCategory: 'Needs Development',
      verifiedProjectsCount: 1,
      industryBadges: [],
      githubUser: 'karan-j-cad'
    }
  ]);

  // 6. Action Alerts / Approvals
  const [alerts, setAlerts] = useState([
    { id: 'al-1', title: '12 student projects awaiting IP & Dean verification', type: 'verification', action: 'Verify Projects', count: 12 },
    { id: 'al-2', title: '5 students requesting verified Skill Pod graduation certificates', type: 'cert', action: 'Issue Badges', count: 5 },
    { id: 'al-3', title: '3 new corporate problem statements submitted by Flipkart & Zepto', type: 'industry', action: 'Review Requests', count: 3 },
    { id: 'al-4', title: '8 final-year students qualified for Tier-1 Placement Fast-Track', type: 'placement', action: 'Endorse Candidates', count: 8 }
  ]);

  // Handlers
  const handleVerifyProject = (projectId: string) => {
    setProjects(prev =>
      prev.map(p => (p.id === projectId ? { ...p, status: '✅ Verified' } : p))
    );
    setShowVerifyModal(false);
    showToast('✓ Project officially verified & recorded in College IP Portfolio!');
  };

  const handleGenerateReport = (reportType: string) => {
    setShowReportModal(false);
    showToast(`📄 ${reportType} generated successfully & downloaded.`);
  };

  const filteredStudents = studentsList.filter(std => {
    const matchesDept = selectedDeptFilter === 'All' || std.dept === selectedDeptFilter;
    const matchesSearch = std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          std.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          std.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f4effc] text-[#261543] flex font-sans selection:bg-[#7c3aed]/20 selection:text-[#261543]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e1b4b] text-white px-5 py-3.5 rounded-2xl shadow-[0_10px_35px_rgba(30,27,75,0.45)] border border-indigo-400/30 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
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
            <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
          </button>

          {/* Navigation Icon List */}
          <nav className="flex flex-col items-center gap-2.5">
            {[
              { id: 'overview', icon: Layers, label: 'Dashboard' },
              { id: 'skill-passports', icon: GraduationCap, label: 'Student Skill Passports' },
              { id: 'ip-registry', icon: Award, label: 'Innovation & IP Registry' },
              { id: 'department-analytics', icon: BarChart3, label: 'Department Analytics & Placement' },
              { id: 'students', icon: Users, label: 'Students', badge: 1248 },
              { id: 'pods', icon: Target, label: 'Skill Pods', badge: 42 },
              { id: 'projects', icon: FolderGit2, label: 'Projects & IP', badge: 86 },
              { id: 'industry', icon: Building2, label: 'Industry Connect', badge: 24 },
              { id: 'mentors', icon: ShieldCheck, label: 'Mentors', badge: 38 },
              { id: 'placements', icon: Cpu, label: 'Placements' },
              { id: 'reports', icon: BookOpen, label: 'Reports' },
              { id: 'profile', icon: FileCheck2, label: 'Profile' }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as CollegeTab)}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer relative group ${
                    isActive
                      ? 'bg-[#312e81] text-white shadow-[0_8px_20px_rgba(49,46,129,0.3)] scale-105'
                      : 'bg-white/70 hover:bg-white text-[#523d77] hover:text-[#281549] shadow-2xs border border-white/80'
                  }`}
                  title={tab.label}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {/* Tooltip */}
                  <span className="absolute left-14 px-2.5 py-1 bg-[#1e1b4b] text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
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
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-950 font-black text-2xs border border-indigo-200 shadow-2xs flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-700" />
                  <span>College Workspace 🏫</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5d4a82] font-medium mt-0.5">
                Verified Skill Passports &bull; Innovation & IP Registry &bull; Placement Readiness Index
              </p>
            </div>
          </div>

          {/* Top Right Header CTA & College Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReportModal(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800 text-white rounded-full font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>📊 Generate NAAC/Placement Report</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 p-1 sm:pr-3 rounded-full bg-white/80 border border-white/90 shadow-2xs hover:bg-white transition-all cursor-pointer"
            >
              {currentCollegeProfile.avatar ? (
                <img src={currentCollegeProfile.avatar} alt={collegeDisplayName} className="w-8 h-8 rounded-full object-cover border border-indigo-300 shadow-xs" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-700 to-purple-800 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {collegeInitials || 'NIT'}
                </div>
              )}
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-[#261543]">{collegeDisplayName}</span>
                <span className="text-[10px] text-indigo-700 font-semibold">Autonomous COE • Tier 1</span>
              </div>
            </button>
          </div>
        </header>

        {/* Mobile/Tablet Horizontal Tab Bar */}
        <div className="xl:hidden px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard' },
            { id: 'skill-passports', label: '🪪 Skill Passports' },
            { id: 'ip-registry', label: '💡 IP Registry' },
            { id: 'department-analytics', label: '📊 Dept Analytics' },
            { id: 'students', label: 'Students (1,248)' },
            { id: 'pods', label: 'Skill Pods (42)' },
            { id: 'projects', label: 'Projects & IP (86)' },
            { id: 'industry', label: 'Industry (24)' },
            { id: 'mentors', label: 'Mentors (38)' },
            { id: 'placements', label: 'Placements' },
            { id: 'reports', label: 'Reports' },
            { id: 'profile', label: 'Profile' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CollegeTab)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#312e81] text-white shadow-xs'
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
              {/* 1. HERO / WELCOME SECTION */}
              <motion.section 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gradient-to-br from-[rgba(180,195,236,0.72)] via-[rgba(235,228,243,0.96)] to-[rgba(197,159,217,0.65)] border border-white/60 shadow-[0_8px_30px_rgba(109,78,199,0.12)] rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl"
              >
                {/* Subtle radial background glow */}
                <div className="absolute -left-20 -top-20 w-[400px] h-[400px] bg-gradient-to-br from-[#c59fd9]/30 to-[#b4c3ec]/30 rounded-full blur-[80px] -z-10 pointer-events-none" />
                <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-gradient-to-tl from-white/40 to-transparent blur-[60px] pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 border border-white/80 text-[#5c4780] text-[10px] font-black tracking-widest uppercase mb-4 shadow-[0_2px_10px_rgba(38,21,67,0.05)] backdrop-blur-md">
                        <GraduationCap className="w-3.5 h-3.5 text-[#6d4ec7]" />
                        <span>Abhinav Institute of Technology & Management</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-black text-[#261543] tracking-tight leading-tight">
                        Welcome back, Abhinav Institute 👋
                      </h2>
                      <p className="text-lg sm:text-xl font-bold text-[#6d4ec7] mt-2 drop-shadow-sm">
                        Turn student projects into industry-ready careers.
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-[#5c4780]/90 leading-relaxed max-w-lg font-medium">
                      Track student participation, verified projects, industry collaboration, mentor engagement and placement readiness — all from one workspace.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setActiveTab('students')}
                        className="px-5 py-2.5 rounded-2xl bg-[#6d4ec7] hover:bg-[#5a3da8] text-white text-xs font-black shadow-[0_4px_15px_rgba(109,78,199,0.3)] transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>Explore 1,248 Students</span>
                      </button>
                      <button
                        onClick={() => setShowVerifyModal(true)}
                        className="px-5 py-2.5 rounded-2xl bg-white/80 hover:bg-white border border-white/60 text-[#261543] text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#6d4ec7]" />
                        <span>Verify Pending Projects (12)</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex justify-center lg:justify-end relative min-h-[300px]">
                    <div className="relative w-full max-w-[480px] mx-auto lg:mx-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#c59fd9]/20 blur-[50px] rounded-full" />
                      <CollegeCharacter3D />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* 2. QUICK ACTIONS */}
              <section className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Explore Students */}
                  <button onClick={() => setActiveTab('students')} className="flex flex-col gap-3 p-6 rounded-[2rem] bg-gradient-to-br from-[#b4c3ec]/50 to-[#ebe4f3]/60 border border-[#ebe4f3] shadow-[0_8px_20px_rgba(109,78,199,0.06)] hover:shadow-[0_12px_30px_rgba(109,78,199,0.12)] transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden text-left backdrop-blur-md cursor-pointer">
                    <div className="w-10 h-10 rounded-2xl bg-[#ebe4f3]/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5 text-[#4f46e5]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#261543] mb-1 group-hover:text-[#4f46e5] transition-colors">Explore Students</h4>
                      <p className="text-[11px] font-medium text-[#5c4780]">View verified skills, projects & live activity</p>
                    </div>
                    <div className="mt-2 flex justify-end w-full">
                      <ArrowRight className="w-4 h-4 text-[#4f46e5] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                  
                  {/* Verify Project */}
                  <button onClick={() => setShowVerifyModal(true)} className="flex flex-col gap-3 p-6 rounded-[2rem] bg-gradient-to-br from-[#ebe4f3]/90 to-[#c59fd9]/30 border border-[#ebe4f3] shadow-[0_8px_20px_rgba(109,78,199,0.06)] hover:shadow-[0_12px_30px_rgba(109,78,199,0.12)] transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden text-left backdrop-blur-md cursor-pointer">
                    <div className="w-10 h-10 rounded-2xl bg-[#ebe4f3]/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-5 h-5 text-[#6d4ec7]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#261543] mb-1 group-hover:text-[#6d4ec7] transition-colors">Verify Project</h4>
                      <p className="text-[11px] font-medium text-[#5c4780]">Review academic & IP deliverables</p>
                    </div>
                    <div className="mt-2 flex justify-end w-full">
                      <ArrowRight className="w-4 h-4 text-[#6d4ec7] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                  
                  {/* Connect Industry */}
                  <button onClick={() => setShowIndustryConnectModal(true)} className="flex flex-col gap-3 p-6 rounded-[2rem] bg-gradient-to-br from-emerald-50/80 to-[#b4c3ec]/30 border border-[#ebe4f3] shadow-[0_8px_20px_rgba(109,78,199,0.06)] hover:shadow-[0_12px_30px_rgba(109,78,199,0.12)] transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden text-left backdrop-blur-md cursor-pointer">
                    <div className="w-10 h-10 rounded-2xl bg-[#ebe4f3]/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Building2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#261543] mb-1 group-hover:text-emerald-600 transition-colors">Connect Industry</h4>
                      <p className="text-[11px] font-medium text-[#5c4780]">Engage partner companies & mentors</p>
                    </div>
                    <div className="mt-2 flex justify-end w-full">
                      <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>

                  {/* Generate Report */}
                  <button onClick={() => showToast("Exporting NIRF/Placement Report...")} className="flex flex-col gap-3 p-6 rounded-[2rem] bg-gradient-to-br from-amber-50/80 to-[#ebe4f3]/60 border border-[#ebe4f3] shadow-[0_8px_20px_rgba(109,78,199,0.06)] hover:shadow-[0_12px_30px_rgba(109,78,199,0.12)] transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden text-left backdrop-blur-md cursor-pointer">
                    <div className="w-10 h-10 rounded-2xl bg-[#ebe4f3]/80 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#261543] mb-1 group-hover:text-amber-600 transition-colors">Generate Report</h4>
                      <p className="text-[11px] font-medium text-[#5c4780]">Export NIRF/NISP/placement reports</p>
                    </div>
                    <div className="mt-2 flex justify-end w-full">
                      <ArrowRight className="w-4 h-4 text-amber-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                </div>
              </section>

              {/* 3. COLLEGE OVERVIEW (Metric Strip) */}
              <section className="bg-gradient-to-r from-[#b4c3ec]/20 via-[#ebe4f3]/60 to-[#b4c3ec]/20 border-y border-[#ebe4f3] py-6 px-8 rounded-[2rem] backdrop-blur-sm shadow-[0_4px_15px_rgba(109,78,199,0.04)] hover:shadow-[0_4px_25px_rgba(109,78,199,0.12)] transition-shadow duration-300">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#c0b1e4]/40">
                  <div className="flex-1 py-4 md:py-0 md:pr-6 text-center sm:text-left group cursor-default">
                    <strong className="block text-4xl font-black text-[#261543] group-hover:text-[#6d4ec7] transition-colors">1,248</strong>
                    <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-widest mt-1.5 block">Total Students</span>
                    <span className="text-[11px] font-bold text-[#6d4ec7] mt-2 block">CSE, IT, ECE & Mech</span>
                    <span className="text-[10px] font-medium text-[#5c4780]">100% Onboarded</span>
                  </div>
                  <div className="flex-1 py-4 md:py-0 md:px-6 text-center sm:text-left group cursor-default">
                    <strong className="block text-4xl font-black text-[#261543] group-hover:text-[#6d4ec7] transition-colors">42</strong>
                    <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-widest mt-1.5 block">Active Skill Pods</span>
                    <span className="text-[11px] font-bold text-[#6d4ec7] mt-2 block">168 students active</span>
                    <span className="text-[10px] font-medium text-[#5c4780]">4 students / pod avg</span>
                  </div>
                  <div className="flex-1 py-4 md:py-0 md:px-6 text-center sm:text-left group cursor-default">
                    <strong className="block text-4xl font-black text-[#261543] group-hover:text-[#6d4ec7] transition-colors">86</strong>
                    <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-widest mt-1.5 block">Verified Projects</span>
                    <span className="text-[11px] font-bold text-[#6d4ec7] mt-2 block">Campus IP Protected</span>
                    <span className="text-[10px] font-medium text-[#5c4780]">₹18.4L Total Value</span>
                  </div>
                  <div className="flex-1 py-4 md:py-0 md:px-6 text-center sm:text-left group cursor-default">
                    <strong className="block text-4xl font-black text-[#261543] group-hover:text-[#6d4ec7] transition-colors">24</strong>
                    <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-widest mt-1.5 block">Industry Collabs</span>
                    <span className="text-[11px] font-bold text-[#6d4ec7] mt-2 block">Stripe, Razorpay, CRED</span>
                    <span className="text-[10px] font-medium text-[#5c4780]">17 Live problem sets</span>
                  </div>
                  <div className="flex-1 py-4 md:py-0 md:pl-6 text-center sm:text-left group cursor-default">
                    <strong className="block text-4xl font-black text-[#261543] group-hover:text-[#6d4ec7] transition-colors">68%</strong>
                    <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-widest mt-1.5 block">Placement Ready</span>
                    <span className="text-[11px] font-bold text-[#6d4ec7] mt-2 block">420 Industry Ready</span>
                    <span className="text-[10px] font-medium text-[#5c4780]">Tier-1 Qualified 🚀</span>
                  </div>
                </div>
              </section>

              {/* 4. STUDENT SKILL & PLACEMENT READINESS */}
              <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-[#261543] tracking-tight">
                      Student Skill & Placement Readiness
                    </h3>
                    <p className="text-xs text-[#5c4780] font-medium mt-1">Real-time competency insights based on production code commits and mentor evaluations.</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-[#ebe4f3]/80 to-[#c59fd9]/20 border border-[#ebe4f3] shadow-[0_8px_20px_rgba(109,78,199,0.05)] rounded-[2rem] p-8 backdrop-blur-md">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Left: Core Industry Competency Benchmark */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-black text-[#261543] uppercase tracking-widest border-b border-[#c0b1e4]/40 pb-2">
                        Core Industry Competency Benchmark
                      </h4>
                      <div className="space-y-5">
                        {[
                          { label: 'Technical Skills', val: 82, color: 'from-[#8b5cf6] to-[#6d4ec7]' },
                          { label: 'Industry Projects', val: 74, color: 'from-[#6d4ec7] to-[#4f46e5]' },
                          { label: 'Mentorship', val: 80, color: 'from-[#d946ef] to-[#8b5cf6]' },
                          { label: 'Problem Solving', val: 71, color: 'from-emerald-500 to-teal-600' },
                          { label: 'Communication', val: 64, color: 'from-amber-400 to-orange-500' }
                        ].map(item => (
                          <div key={item.label} className="group">
                            <div className="flex justify-between text-[10px] font-bold text-[#705e94] uppercase tracking-wider mb-2">
                              <span>{item.label}</span>
                              <span className="text-[#261543]">{item.val}%</span>
                            </div>
                            <div className="w-full bg-[#ebe4f3] rounded-full h-2 overflow-hidden shadow-inner">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.val}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`bg-gradient-to-r ${item.color} h-full rounded-full group-hover:opacity-80 transition-opacity`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Student Placement Cohort Distribution */}
                    <div className="space-y-6">
                      <h4 className="text-sm font-black text-[#261543] uppercase tracking-widest border-b border-[#c0b1e4]/40 pb-2">
                        Student Placement Cohort Distribution
                      </h4>
                      <div className="space-y-4">
                        {/* Industry Ready */}
                        <div className="flex items-center justify-between p-4 rounded-[1.25rem] bg-emerald-50/80 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow group">
                          <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                            <div>
                              <strong className="text-sm font-black text-emerald-950 block">Industry Ready</strong>
                              <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Tier-1 product & enterprise ready</span>
                            </div>
                          </div>
                          <strong className="text-2xl font-black text-emerald-700">420</strong>
                        </div>
                        {/* Almost Ready */}
                        <div className="flex items-center justify-between p-4 rounded-[1.25rem] bg-amber-50/80 border border-amber-200 shadow-sm hover:shadow-md transition-shadow group">
                          <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                            <div>
                              <strong className="text-sm font-black text-amber-950 block">Almost Ready</strong>
                              <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Needs 1-2 project completions</span>
                            </div>
                          </div>
                          <strong className="text-2xl font-black text-amber-700">510</strong>
                        </div>
                        {/* Needs Development */}
                        <div className="flex items-center justify-between p-4 rounded-[1.25rem] bg-rose-50/80 border border-rose-200 shadow-sm hover:shadow-md transition-shadow group">
                          <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                            <div>
                              <strong className="text-sm font-black text-rose-950 block">Needs Development</strong>
                              <span className="text-[10px] text-rose-800 font-bold uppercase tracking-wider">Early stage foundational skills</span>
                            </div>
                          </div>
                          <strong className="text-2xl font-black text-rose-700">318</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. ACTIVE SKILL PODS + COLLEGE ACTIONS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Active Skill Pods */}
                <section className="lg:col-span-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-[#261543] tracking-tight">Active Skill Pods</h3>
                    <span className="px-3 py-1 rounded-full bg-[#ebe4f3] text-[#6d4ec7] font-black text-[10px] uppercase tracking-wider">42 Live</span>
                  </div>
                  <div className="space-y-4">
                    {pods.map(pod => (
                      <div key={pod.id} className="bg-gradient-to-br from-[#ebe4f3]/90 to-[#c59fd9]/20 border border-[#ebe4f3] rounded-[1.5rem] p-6 shadow-[0_4px_15px_rgba(109,78,199,0.04)] hover:shadow-[0_8px_25px_rgba(109,78,199,0.1)] transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-xl bg-[#261543] text-white font-mono text-[10px] font-black tracking-widest uppercase shadow-sm">
                              Pod {pod.name}
                            </span>
                            <span className="text-[11px] text-[#705e94] font-bold">
                              {pod.studentsCount} Students • {pod.department}
                            </span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                            pod.status.includes('Shipped') ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                            pod.status.includes('On Track') ? 'bg-[#ebe4f3] text-[#6d4ec7] border-[#c0b1e4]' :
                            'bg-amber-100 text-amber-900 border-amber-300'
                          }`}>
                            {pod.status}
                          </span>
                        </div>
                        
                        <h4 className="text-base font-black text-[#261543] mb-4 group-hover:text-[#6d4ec7] transition-colors">
                          Project: {pod.projectTitle}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-4 text-[11px] text-[#5c4780] font-medium py-3 border-y border-[#c0b1e4]/30">
                          <div>Mentor: <strong className="text-[#261543] font-bold">{pod.mentorName}</strong></div>
                          <div>Industry Partner: <strong className="text-[#261543] font-bold">{pod.industryPartner}</strong></div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-[10px] font-bold text-[#705e94] uppercase tracking-wider">
                            <span>Sprint Velocity</span>
                            <span className="text-[#261543]">{pod.progress}%</span>
                          </div>
                          <div className="w-full bg-[#ebe4f3] rounded-full h-1.5 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pod.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1 }}
                              className="bg-gradient-to-r from-[#8b5cf6] to-[#6d4ec7] h-full rounded-full"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {pod.techStack.map(ts => (
                              <span key={ts} className="px-2 py-1 bg-[#ebe4f3]/50 border border-[#c0b1e4]/40 rounded-lg text-[9px] font-bold text-[#5c4780] uppercase tracking-wider">
                                {ts}
                              </span>
                            ))}
                          </div>
                          <button onClick={() => setActiveTab('pods')} className="text-[11px] font-black text-[#6d4ec7] hover:text-[#4f46e5] flex items-center gap-1 transition-colors cursor-pointer">
                            View Pod <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* College Actions */}
                <section className="lg:col-span-5 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-[#261543] tracking-tight">College Actions</h3>
                  </div>
                  <div className="space-y-4">
                    {alerts.map(al => (
                      <div key={al.id} onClick={() => {
                        if (al.type === 'verification') setShowVerifyModal(true);
                        else if (al.type === 'industry') setShowIndustryConnectModal(true);
                        else showToast(`Action "${al.action}" opened for ${al.count} items.`);
                      }} className="group flex items-start gap-4 p-4 rounded-[1.25rem] hover:bg-[#ebe4f3]/50 border border-transparent hover:border-[#ebe4f3]/80 transition-all cursor-pointer">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        <div className="flex-1">
                          <h4 className="text-[13px] font-bold text-[#261543] leading-snug group-hover:text-[#6d4ec7] transition-colors">
                            {al.title}
                          </h4>
                          <div className="mt-2 flex items-center justify-between pt-2 border-t border-[#c0b1e4]/20">
                            <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-wider">Priority Review</span>
                            <span className="text-[11px] font-black text-[#6d4ec7] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                              Review <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* 6. STUDENT PROJECT / IP PORTFOLIO */}
              <section className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-[#261543] tracking-tight">Student Project / IP Portfolio</h3>
                  <p className="text-xs text-[#5c4780] font-medium mt-1">Centralized repository of student-built software, commercial valuations, and corporate licensing interest.</p>
                </div>
                <div className="bg-gradient-to-br from-[#ebe4f3]/80 to-[#c59fd9]/20 border border-[#ebe4f3] shadow-[0_8px_20px_rgba(109,78,199,0.05)] rounded-[2rem] overflow-hidden backdrop-blur-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                      <thead>
                        <tr className="bg-[#b4c3ec]/20 border-b border-[#c0b1e4]/40 text-[10px] font-bold text-[#705e94] uppercase tracking-widest">
                          <th className="p-5 font-black whitespace-nowrap">Project Title</th>
                          <th className="p-5 font-black whitespace-nowrap">Pod / Students</th>
                          <th className="p-5 font-black whitespace-nowrap">Department</th>
                          <th className="p-5 font-black whitespace-nowrap">Status</th>
                          <th className="p-5 font-black whitespace-nowrap">Industry Partner</th>
                          <th className="p-5 font-black text-right whitespace-nowrap">Valuation</th>
                          <th className="p-5 font-black whitespace-nowrap">Industry Interest</th>
                          <th className="p-5 font-black text-right whitespace-nowrap">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#c0b1e4]/20 text-[12px] font-medium text-[#261543]">
                        <tr className="hover:bg-[#ebe4f3]/60 transition-colors group cursor-pointer" onClick={() => setActiveTab('pods')}>
                          <td className="p-5 font-bold group-hover:text-[#6d4ec7] transition-colors">Smart Inventory Management</td>
                          <td className="p-5 text-[#5c4780]">Apex-2 <span className="text-[10px] opacity-70 ml-1">(4)</span></td>
                          <td className="p-5 text-[#5c4780]">Computer Science & Engineering</td>
                          <td className="p-5"><span className="px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-900 border border-emerald-300/50 text-[10px] font-black uppercase tracking-wider">Verified</span></td>
                          <td className="p-5 text-[#5c4780]"><div className="font-bold text-[#261543]">ABC Retail</div><div className="text-[10px] opacity-80 mt-0.5">Mentor: Sarah Chen</div></td>
                          <td className="p-5 text-right font-black text-[#261543]">₹4.5L</td>
                          <td className="p-5"><span className="px-3 py-1 rounded-full bg-[#ebe4f3] text-[#6d4ec7] border border-[#c0b1e4]/50 text-[10px] font-black uppercase tracking-wider">High</span></td>
                          <td className="p-5 text-right"><span className="text-[11px] font-bold text-[#6d4ec7] hover:text-[#4f46e5]">View IP Dossier</span></td>
                        </tr>
                        <tr className="hover:bg-[#ebe4f3]/60 transition-colors group cursor-pointer" onClick={() => setActiveTab('pods')}>
                          <td className="p-5 font-bold group-hover:text-[#6d4ec7] transition-colors">AI Crop Disease Detection</td>
                          <td className="p-5 text-[#5c4780]">Vision-X <span className="text-[10px] opacity-70 ml-1">(5)</span></td>
                          <td className="p-5 text-[#5c4780]">Computer Science & Engineering</td>
                          <td className="p-5"><span className="px-3 py-1 rounded-full bg-blue-100/70 text-blue-900 border border-blue-300/50 text-[10px] font-black uppercase tracking-wider">Building</span></td>
                          <td className="p-5 text-[#5c4780]"><div className="font-bold text-[#261543]">AgriTech Pvt Ltd</div><div className="text-[10px] opacity-80 mt-0.5">Mentor: Rahul Mehta</div></td>
                          <td className="p-5 text-right font-black text-[#261543]">₹3.2L</td>
                          <td className="p-5"><span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-300/50 text-[10px] font-black uppercase tracking-wider">Medium</span></td>
                          <td className="p-5 text-right"><span className="text-[11px] font-bold text-[#6d4ec7] hover:text-[#4f46e5]">View IP Dossier</span></td>
                        </tr>
                        <tr className="hover:bg-[#ebe4f3]/60 transition-colors group cursor-pointer" onClick={() => setActiveTab('pods')}>
                          <td className="p-5 font-bold group-hover:text-[#6d4ec7] transition-colors">Campus Mobility & Micro-Transit Routing</td>
                          <td className="p-5 text-[#5c4780]">Pod Nova <span className="text-[10px] opacity-70 ml-1">(3)</span></td>
                          <td className="p-5 text-[#5c4780]">Information Technology</td>
                          <td className="p-5"><span className="px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-900 border border-emerald-300/50 text-[10px] font-black uppercase tracking-wider">Shipped</span></td>
                          <td className="p-5 text-[#5c4780]"><div className="font-bold text-[#261543]">Kestrel Freight & Logistics</div><div className="text-[10px] opacity-80 mt-0.5">Mentor: Priya Sharma</div></td>
                          <td className="p-5 text-right font-black text-[#261543]">₹6.8L</td>
                          <td className="p-5"><span className="px-3 py-1 rounded-full bg-[#ebe4f3] text-[#6d4ec7] border border-[#c0b1e4]/50 text-[10px] font-black uppercase tracking-wider">High</span></td>
                          <td className="p-5 text-right"><span className="text-[11px] font-bold text-[#6d4ec7] hover:text-[#4f46e5]">View IP Dossier</span></td>
                        </tr>
                        <tr className="hover:bg-[#ebe4f3]/60 transition-colors group cursor-pointer" onClick={() => setActiveTab('pods')}>
                          <td className="p-5 font-bold group-hover:text-[#6d4ec7] transition-colors">OCR Freight Bill & Weightbridge Parser</td>
                          <td className="p-5 text-[#5c4780]">ByteCraft-3 <span className="text-[10px] opacity-70 ml-1">(4)</span></td>
                          <td className="p-5 text-[#5c4780]">Information Technology</td>
                          <td className="p-5"><span className="px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 border border-amber-300/50 text-[10px] font-black uppercase tracking-wider">Awaiting Review</span></td>
                          <td className="p-5 text-[#5c4780]"><div className="font-bold text-[#261543]">Mahindra Logistics</div><div className="text-[10px] opacity-80 mt-0.5">Mentor: Aarav Mehta</div></td>
                          <td className="p-5 text-right font-black text-[#261543]">₹3.9L</td>
                          <td className="p-5"><span className="px-3 py-1 rounded-full bg-[#ebe4f3] text-[#6d4ec7] border border-[#c0b1e4]/50 text-[10px] font-black uppercase tracking-wider">High</span></td>
                          <td className="p-5 text-right"><span className="text-[11px] font-bold text-[#6d4ec7] hover:text-[#4f46e5]">View IP Dossier</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
              
              {/* 7. INDUSTRY CONNECT / MENTOR NETWORK / DEPARTMENT ACTIVITY */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#ebe4f3]/30 p-8 rounded-[2rem] border border-[#ebe4f3] shadow-sm">
                {/* Industry Connect */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-[#261543] uppercase tracking-widest border-b border-[#c0b1e4]/40 pb-2">Industry Connect</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[11px] font-bold text-[#5c4780] hover:text-[#6d4ec7] cursor-pointer transition-colors">
                      <span>ABC Retail</span><span className="text-[10px] px-2 py-0.5 bg-[#ebe4f3] rounded-md text-[#6d4ec7]">3 Active</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold text-[#5c4780] hover:text-[#6d4ec7] cursor-pointer transition-colors">
                      <span>Razorpay</span><span className="text-[10px] px-2 py-0.5 bg-[#ebe4f3] rounded-md text-[#6d4ec7]">2 Active</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold text-[#5c4780] hover:text-[#6d4ec7] cursor-pointer transition-colors">
                      <span>CRED</span><span className="text-[10px] px-2 py-0.5 bg-[#ebe4f3] rounded-md text-[#6d4ec7]">1 Active</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold text-[#5c4780] hover:text-[#6d4ec7] cursor-pointer transition-colors">
                      <span>Kestrel Freight</span><span className="text-[10px] px-2 py-0.5 bg-[#ebe4f3] rounded-md text-[#6d4ec7]">4 Active</span>
                    </div>
                  </div>
                  <button onClick={() => setShowIndustryConnectModal(true)} className="text-[11px] font-black text-[#6d4ec7] hover:text-[#4f46e5] flex items-center gap-1 transition-colors mt-2 cursor-pointer">
                    Explore 24 Industry Partners <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                
                {/* Mentor Network */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-[#261543] uppercase tracking-widest border-b border-[#c0b1e4]/40 pb-2">Mentor Network</h4>
                  <div className="flex gap-6 mb-4">
                    <div>
                      <strong className="block text-2xl font-black text-[#261543]">38</strong>
                      <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-wider">Verified Mentors</span>
                    </div>
                    <div>
                      <strong className="block text-2xl font-black text-[#261543]">84</strong>
                      <span className="text-[10px] font-bold text-[#705e94] uppercase tracking-wider">Sessions / mo</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['AI/ML', 'Full Stack', 'Cloud', 'Cybersecurity', 'System Design'].map(d => (
                      <span key={d} className="px-2 py-1 bg-[#ebe4f3]/50 border border-[#c0b1e4]/40 rounded-lg text-[9px] font-bold text-[#5c4780] uppercase tracking-wider">{d}</span>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab('mentors')} className="text-[11px] font-black text-[#6d4ec7] hover:text-[#4f46e5] flex items-center gap-1 transition-colors mt-2 cursor-pointer">
                    View All Mentors & Schedules <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Department Activity */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-[#261543] uppercase tracking-widest border-b border-[#c0b1e4]/40 pb-2">Department Activity</h4>
                  <div className="space-y-3">
                    {[
                      { dept: 'Computer Science (CSE)', pct: 85 },
                      { dept: 'Information Tech (IT)', pct: 72 },
                      { dept: 'Electronics (ECE)', pct: 60 },
                      { dept: 'Mechanical Engineering', pct: 45 }
                    ].map(dp => (
                      <div key={dp.dept} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-[#5c4780] uppercase tracking-wider">
                          <span>{dp.dept}</span>
                          <span className="text-[#261543]">{dp.pct}%</span>
                        </div>
                        <div className="w-full bg-[#ebe4f3] rounded-full h-1.5 overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${dp.pct}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="bg-gradient-to-r from-[#8b5cf6] to-[#6d4ec7] h-full rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setShowDeptModal(true)} className="text-[11px] font-black text-[#6d4ec7] hover:text-[#4f46e5] flex items-center gap-1 transition-colors mt-2 cursor-pointer">
                    View Department Analytics <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </section>

              {/* 8. PLACEMENT INTELLIGENCE */}
              <section className="space-y-6">
                <div>
                  <h3 className="text-lg font-black text-[#261543] tracking-tight">Placement Intelligence</h3>
                  <p className="text-xs text-[#5c4780] font-medium mt-1">Talent Scouting Feed & Upskilling Focus.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-[#ebe4f3]/70 to-[#c59fd9]/20 border border-[#ebe4f3] shadow-[0_8px_20px_rgba(109,78,199,0.05)] rounded-[2rem] p-8 backdrop-blur-sm">
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-[#261543] uppercase tracking-widest mb-4">Top Industry-Ready Skills</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[12px] font-medium text-[#5c4780] border-b border-[#c0b1e4]/20 pb-2">
                        <span>React / Frontend</span><span className="font-black text-[#6d4ec7]">184 students</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] font-medium text-[#5c4780] border-b border-[#c0b1e4]/20 pb-2">
                        <span>Python / Backend</span><span className="font-black text-[#6d4ec7]">162 students</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] font-medium text-[#5c4780] border-b border-[#c0b1e4]/20 pb-2">
                        <span>AI / ML Models</span><span className="font-black text-[#6d4ec7]">143 students</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] font-medium text-[#5c4780] border-b border-[#c0b1e4]/20 pb-2">
                        <span>Node.js / Express</span><span className="font-black text-[#6d4ec7]">121 students</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] font-medium text-[#5c4780] border-b border-[#c0b1e4]/20 pb-2">
                        <span>Cloud / Docker</span><span className="font-black text-[#6d4ec7]">98 students</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-[#261543] uppercase tracking-widest mb-4">Targeted Upskilling Focus</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[12px] font-medium text-[#5c4780] border-b border-[#c0b1e4]/20 pb-2">
                        <span>AI/ML Core Math</span><span className="font-black text-amber-600">82 students</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] font-medium text-[#5c4780] border-b border-[#c0b1e4]/20 pb-2">
                        <span>Tech Communication</span><span className="font-black text-amber-600">124 students</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] font-medium text-[#5c4780] border-b border-[#c0b1e4]/20 pb-2">
                        <span>System Design</span><span className="font-black text-amber-600">67 students</span>
                      </div>
                      <div className="flex justify-between items-center text-[12px] font-medium text-[#5c4780] border-b border-[#c0b1e4]/20 pb-2">
                        <span>Testing & QA</span><span className="font-black text-amber-600">54 students</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 9. INSTITUTION IMPACT */}
              <section className="bg-gradient-to-br from-[#261543] to-[#422673] rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_12px_40px_rgba(38,21,67,0.3)]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
                  <h3 className="text-sm font-black text-[#c59fd9] uppercase tracking-widest">Institution Impact</h3>
                  <strong className="text-5xl sm:text-7xl font-black text-white tracking-tighter drop-shadow-md">₹18.4 <span className="text-3xl sm:text-4xl text-[#ebe4f3]">Lakhs</span></strong>
                  <p className="text-[13px] font-bold text-[#b4c3ec] uppercase tracking-widest">Total Student Project Commercial Valuation</p>
                  
                  <div className="flex flex-wrap justify-center gap-6 sm:gap-12 pt-8">
                    <div>
                      <strong className="block text-2xl font-black text-white">86</strong>
                      <span className="text-[10px] font-bold text-[#c59fd9] uppercase tracking-wider mt-1">Verified Projects</span>
                    </div>
                    <div>
                      <strong className="block text-2xl font-black text-white">24</strong>
                      <span className="text-[10px] font-bold text-[#c59fd9] uppercase tracking-wider mt-1">Industry Partners</span>
                    </div>
                    <div>
                      <strong className="block text-2xl font-black text-white">38</strong>
                      <span className="text-[10px] font-bold text-[#c59fd9] uppercase tracking-wider mt-1">Industry Mentors</span>
                    </div>
                    <div>
                      <strong className="block text-2xl font-black text-white">12 🚀</strong>
                      <span className="text-[10px] font-bold text-[#c59fd9] uppercase tracking-wider mt-1">Products Shipped</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

        {/* ================= TAB: STUDENT SKILL PASSPORTS DIRECTORY ================= */}
        {activeTab === 'skill-passports' && (
          <CollegeSkillPassportView userEmail={userEmail} />
        )}

        {/* ================= TAB: INNOVATION & IP REGISTRY ================= */}
        {activeTab === 'ip-registry' && (
          <CollegeIpRegistry userEmail={userEmail} />
        )}

        {/* ================= TAB: DEPARTMENT COMPARISON & PLACEMENT ================= */}
        {activeTab === 'department-analytics' && (
          <CollegeDepartmentComparison userEmail={userEmail} />
        )}

        {/* ================= TAB 2: STUDENTS ================= */}
        {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-[#261543]">
                    🎓 Student Directory & Readiness Index
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    1,248 students enrolled across 4 Engineering departments
                  </p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search name, skill, roll..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <select
                    value={selectedDeptFilter}
                    onChange={e => setSelectedDeptFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="All">All Departments</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="Mechanical">Mechanical</option>
                  </select>
                </div>
              </div>

              {/* Student Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredStudents.map(std => (
                  <div
                    key={std.id}
                    className="bg-gradient-to-br from-white/80 to-[#ebe4f3]/50 border border-white/80 rounded-[1.5rem] p-5 shadow-[0_4px_15px_rgba(109,78,199,0.05)] hover:shadow-[0_8px_25px_rgba(109,78,199,0.1)] transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-950 font-mono text-2xs font-bold">
                          {std.rollNo} • {std.dept}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-2xs font-black ${
                          std.readinessCategory === 'Industry Ready' ? 'bg-emerald-100 text-emerald-900' :
                          std.readinessCategory === 'Almost Ready' ? 'bg-amber-100 text-amber-900' :
                          'bg-rose-100 text-rose-900'
                        }`}>
                          {std.readinessCategory}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-slate-900">{std.name}</h3>
                        <span className="text-xs text-purple-900 font-bold">{std.podName}</span>
                      </div>

                      {/* Readiness Score Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-2xs font-bold text-slate-700">
                          <span>Placement Readiness Score</span>
                          <span className="font-black text-indigo-950">{std.readinessScore}/100</span>
                        </div>
                        <div className="w-full bg-white/80 rounded-full h-2 overflow-hidden border border-slate-300">
                          <div 
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full"
                            style={{ width: `${std.readinessScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {std.skills.map(sk => (
                          <span key={sk} className="px-2 py-0.5 bg-white/80 border border-slate-300 rounded text-[10px] font-bold text-slate-800">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-300/50 flex items-center justify-between">
                      <span className="text-2xs font-bold text-slate-600">{std.verifiedProjectsCount} Verified Projects</span>
                      <button
                        onClick={() => setSelectedStudent(std)}
                        className="px-3 py-1 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        View Full Profile →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 3: PROJECTS & IP ================= */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#261543]">
                    🚀 Student Project / IP Portfolio
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    86 projects built on real corporate problem statements with mentor technical sign-off
                  </p>
                </div>
                <button
                  onClick={() => setShowVerifyModal(true)}
                  className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Verify Student Projects (12)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(p => (
                  <div key={p.id} className="bg-gradient-to-br from-white/80 to-[#ebe4f3]/50 border border-white/80 rounded-[1.5rem] p-5 shadow-[0_4px_15px_rgba(109,78,199,0.05)] hover:shadow-[0_8px_25px_rgba(109,78,199,0.1)] transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-xl bg-[#1e1b4b] text-white font-mono text-2xs font-bold">
                          {p.podName} • {p.department}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-2xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                          {p.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-slate-900">{p.title}</h3>
                        <p className="text-xs text-slate-600 font-medium mt-1">{p.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-2xs text-slate-700 bg-white/70 p-2.5 rounded-xl border border-slate-300/60 font-semibold">
                        <div>Industry Partner: <strong className="text-indigo-950 font-bold block">{p.industryPartner}</strong></div>
                        <div>Mentor: <strong className="text-purple-950 font-bold block">{p.mentor.split('(')[0]}</strong></div>
                        <div>IP Status: <strong className="text-slate-900 font-bold block">{p.ipStatus}</strong></div>
                        <div>Commercial Valuation: <strong className="text-purple-900 font-mono font-black block">{p.valuation}</strong></div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-300/50 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedProject(p)}
                        className="flex-1 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl text-center cursor-pointer shadow-xs"
                      >
                        Inspect IP & Code Dossier →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: INDUSTRY CONNECT ================= */}
          {activeTab === 'industry' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#261543]">
                    🏢 Industry Collaboration & Corporate Partners
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    24 active enterprise partnerships providing problem statements, code mentorship & pre-placement fast-tracks
                  </p>
                </div>
                <button
                  onClick={() => setShowIndustryConnectModal(true)}
                  className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  + Add Industry Partner
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {industryPartners.map(ind => (
                  <div key={ind.id} className="bg-gradient-to-br from-white/80 to-[#ebe4f3]/50 border border-white/80 rounded-[1.5rem] p-5 shadow-[0_4px_15px_rgba(109,78,199,0.05)] hover:shadow-[0_8px_25px_rgba(109,78,199,0.1)] transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-[#1e1b4b] text-white flex items-center justify-center font-black text-sm">
                          {ind.logoText}
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                          Active Partner
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-slate-900">{ind.companyName}</h3>
                        <span className="text-2xs text-slate-600 font-semibold">{ind.category}</span>
                      </div>

                      <div className="space-y-1 text-2xs text-slate-700 bg-white/60 p-2.5 rounded-xl border border-slate-300/50">
                        <div className="flex justify-between"><span>Active Projects:</span><strong className="text-slate-900">{ind.activeProjects}</strong></div>
                        <div className="flex justify-between"><span>Students Mentored:</span><strong className="text-slate-900">{ind.studentParticipants}</strong></div>
                        <div className="flex justify-between"><span>Mentors Assigned:</span><strong className="text-slate-900">{ind.mentorsAssigned}</strong></div>
                        <div className="flex justify-between pt-1 border-t border-slate-300/40 font-bold text-emerald-800">
                          <span>Hiring Intent:</span><span>{ind.hiringIntent}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast(`Opened corporate portal for ${ind.companyName}.`)}
                      className="w-full py-2 bg-white/90 hover:bg-white border border-slate-300 text-slate-900 font-bold text-xs rounded-xl shadow-2xs cursor-pointer"
                    >
                      View Live Pods & Sprints →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 5: REPORTS & ACCREDITATION ================= */}
          {(activeTab === 'reports' || activeTab === 'placements') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#261543]">
                    📊 NAAC, NIRF & Placement Accreditation Reports
                  </h2>
                  <p className="text-xs text-slate-600 font-medium">
                    Generate auditable compliance documents backed by verified GitHub commits and industry mentor sign-offs
                  </p>
                </div>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Generate Report Dossier</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { title: 'Student Skill & Readiness Report', desc: 'Breakdown of 1,248 students by industry competencies and placement readiness cohorts.', type: 'Student Skill Report' },
                  { title: 'Project IP Portfolio Dossier', desc: '86 verified student software projects with licensing statuses and corporate valuations.', type: 'Project Portfolio Report' },
                  { title: 'Industry Collaboration Report', desc: '24 enterprise partners, problem sets, and pre-placement offer conversion data.', type: 'Industry Collaboration Report' },
                  { title: 'Mentor Network & Session Logs', desc: '38 industry mentors from Stripe, CRED, Razorpay with 84 monthly session hours.', type: 'Mentor Engagement Report' },
                  { title: 'Placement Readiness & Fast-Track', desc: '420 Tier-1 industry-ready candidates with verified GitHub repositories.', type: 'Placement Readiness Report' },
                  { title: 'Department-wise Performance Matrix', desc: 'CSE, IT, ECE, Mechanical Skill Pod velocity for NAAC Criterion 2 & 3.', type: 'Department Performance Report' }
                ].map(rep => (
                  <div key={rep.title} className="bg-gradient-to-br from-white/80 to-[#ebe4f3]/50 border border-white/80 rounded-[1.5rem] p-5 shadow-[0_4px_15px_rgba(109,78,199,0.05)] hover:shadow-[0_8px_25px_rgba(109,78,199,0.1)] transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center mb-3">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-black text-slate-900">{rep.title}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{rep.desc}</p>
                    </div>

                    <button
                      onClick={() => handleGenerateReport(rep.type)}
                      className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Generate & Export PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 6: PROFILE ================= */}
          {activeTab === 'profile' && (
            <div className="max-w-3xl space-y-6">
              <div className="bg-gradient-to-br from-white/80 to-[#ebe4f3]/50 border border-white/80 rounded-[1.5rem] p-5 shadow-[0_4px_15px_rgba(109,78,199,0.05)] hover:shadow-[0_8px_25px_rgba(109,78,199,0.1)] transition-all space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-700 to-purple-800 text-white flex items-center justify-center font-black text-2xl shadow-md">
                    AI
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Abhinav Institute of Technology</h2>
                    <p className="text-xs text-indigo-800 font-bold">Autonomous Center of Excellence • NAAC A++ Accredited</p>
                    <p className="text-2xs text-slate-600 mt-0.5">Established 1998 • Affiliated to State Technological University</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-white/80 rounded-xl border border-slate-300 text-center">
                    <strong className="text-lg font-black text-indigo-950">1,248</strong>
                    <span className="text-2xs text-slate-600 block">Enrolled Engineers</span>
                  </div>
                  <div className="p-3 bg-white/80 rounded-xl border border-slate-300 text-center">
                    <strong className="text-lg font-black text-purple-950">42</strong>
                    <span className="text-2xs text-slate-600 block">Active Skill Pods</span>
                  </div>
                  <div className="p-3 bg-white/80 rounded-xl border border-slate-300 text-center">
                    <strong className="text-lg font-black text-emerald-950">86</strong>
                    <span className="text-2xs text-slate-600 block">Verified Projects</span>
                  </div>
                  <div className="p-3 bg-white/80 rounded-xl border border-slate-300 text-center">
                    <strong className="text-lg font-black text-amber-950">68%</strong>
                    <span className="text-2xs text-slate-600 block">Placement Ready</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-300/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Dean Portal Authenticated: {userEmail}</span>
                  <button
                    onClick={onSwitchWorkspace}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Switch Workspace
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ================= MODAL 1: VERIFY PROJECT ================= */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 border border-purple-200"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-6 h-6 text-indigo-700" />
                <h3 className="text-lg font-black text-slate-900">
                  Verify Student Project & Protect IP
                </h3>
              </div>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Review deliverables submitted by student Skill Pods with mentor verification notes before official institutional sign-off.
            </p>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {projects.filter(p => p.status !== '✅ Verified').concat(projects.slice(0, 2)).map(proj => (
                <div key={proj.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div>
                    <strong className="text-xs font-black text-slate-900 block">{proj.title}</strong>
                    <span className="text-2xs text-purple-900 font-semibold">{proj.podName} • Mentor: {proj.mentor.split('(')[0]}</span>
                    <span className="text-2xs text-slate-600 block mt-0.5">Industry Partner: {proj.industryPartner}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVerifyProject(proj.id)}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-2xs font-bold shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Verify IP</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                onClick={() => setShowVerifyModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ================= MODAL 2: STUDENT PROFILE DRILL-DOWN ================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 border border-indigo-200"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-950 font-mono text-2xs font-bold">
                  {selectedStudent.rollNo} • {selectedStudent.dept}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">{selectedStudent.name}</h3>
                <span className="text-xs text-purple-900 font-bold">{selectedStudent.podName}</span>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200 flex justify-between items-center">
                <div>
                  <span className="text-2xs font-bold text-indigo-900 uppercase">Placement Readiness Score</span>
                  <strong className="text-2xl font-black text-indigo-950 block">{selectedStudent.readinessScore} / 100</strong>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-black text-xs rounded-full border border-emerald-300">
                  {selectedStudent.readinessCategory}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">Verified Technical Stack:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.skills.map(sk => (
                    <span key={sk} className="px-2.5 py-1 bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-slate-800">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">Industry Mentor Credentials & Badges:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.industryBadges.map(b => (
                    <span key={b} className="px-2.5 py-1 bg-purple-100 text-purple-950 border border-purple-300 rounded-lg text-xs font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-purple-700" />
                      <span>{b}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t flex items-center justify-between">
              <span className="text-xs text-slate-600 font-mono">github.com/{selectedStudent.githubUser}</span>
              <button
                onClick={() => {
                  showToast(`Placement fast-track endorsement sent for ${selectedStudent.name}!`);
                  setSelectedStudent(null);
                }}
                className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Endorse for Placement
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ================= MODAL 3: PROJECT IP DOSSIER ================= */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 border border-purple-200"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-950 font-mono text-2xs font-bold">
                  {selectedProject.podName} • {selectedProject.department}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div><span className="text-slate-500 font-semibold block">Industry Partner</span><strong className="text-slate-900">{selectedProject.industryPartner}</strong></div>
              <div><span className="text-slate-500 font-semibold block">Mentor</span><strong className="text-purple-950">{selectedProject.mentor}</strong></div>
              <div><span className="text-slate-500 font-semibold block">IP Licensing Status</span><strong className="text-emerald-800">{selectedProject.ipStatus}</strong></div>
              <div><span className="text-slate-500 font-semibold block">Commercial Valuation</span><strong className="text-purple-900 font-mono font-black">{selectedProject.valuation}</strong></div>
            </div>

            <div className="pt-3 border-t flex items-center justify-between">
              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-700 font-bold hover:underline flex items-center gap-1"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => {
                  handleVerifyProject(selectedProject.id);
                  setSelectedProject(null);
                }}
                className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Verify & Stamp Institutional IP
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ================= MODAL 4: GENERATE REPORT DOSSIER ================= */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 border border-indigo-200"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-indigo-700" />
                <h3 className="text-lg font-black text-slate-900">
                  Generate Official College Report
                </h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select the accreditation or placement report format required for NAAC, NIRF, or Board of Governors review.
            </p>

            <div className="space-y-2">
              {[
                'Student Skill & Competency Dossier (1,248 Students)',
                'Project Portfolio & IP Valuation Summary (86 Projects)',
                'Industry Collaboration & Corporate Engagement (24 Partners)',
                'Mentor Network & Session Logs (38 Mentors)',
                'Placement Readiness & Fast-Track Cohorts (420 Tier-1 Candidates)',
                'Department-wise Engineering Velocity Matrix'
              ].map(rep => (
                <button
                  key={rep}
                  onClick={() => handleGenerateReport(rep)}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-xs font-bold text-slate-800 transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>{rep}</span>
                  <Download className="w-4 h-4 text-indigo-700" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ================= MODAL 5: CONNECT INDUSTRY ================= */}
      {showIndustryConnectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 border border-indigo-200"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-indigo-700" />
                <h3 className="text-lg font-black text-slate-900">
                  Connect New Industry Partner
                </h3>
              </div>
              <button
                onClick={() => setShowIndustryConnectModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                setShowIndustryConnectModal(false);
                showToast('🚀 Corporate partnership invitation dispatched to company engineering lead!');
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swiggy, Zerodha, Infosys"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Primary Problem Domain</label>
                <select className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800">
                  <option>FinTech & Distributed Systems</option>
                  <option>AI / Computer Vision & Robotics</option>
                  <option>Enterprise SaaS & Cloud Infrastructure</option>
                  <option>Logistics & Geo-Telemetry</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Assigned Student Pod Capacity</label>
                <input
                  type="number"
                  defaultValue={2}
                  min={1}
                  max={10}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowIndustryConnectModal(false)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Send Corporate Partnership Invite
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ================= MODAL 6: DEPARTMENT PERFORMANCE ================= */}
      {showDeptModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 border border-indigo-200"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-emerald-700" />
                <h3 className="text-lg font-black text-slate-900">
                  Department-Wise Engineering Matrix
                </h3>
              </div>
              <button
                onClick={() => setShowDeptModal(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Computer Science (CSE)', students: 580, pods: 23, projs: 54, ready: '85%' },
                { name: 'Information Technology (IT)', students: 340, pods: 11, projs: 28, ready: '72%' },
                { name: 'Electronics (ECE)', students: 210, pods: 5, projs: 12, ready: '60%' },
                { name: 'Mechanical Engineering', students: 118, pods: 3, projs: 8, ready: '45%' }
              ].map(d => (
                <div key={d.name} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <strong className="text-xs font-black text-slate-900">{d.name}</strong>
                    <span className="text-xs font-mono font-black text-indigo-900">{d.ready} Placement Ready</span>
                  </div>
                  <div className="flex justify-between text-2xs text-slate-600 font-semibold">
                    <span>{d.students} Students</span>
                    <span>{d.pods} Skill Pods</span>
                    <span>{d.projs} Verified Projects</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                onClick={() => setShowDeptModal(false)}
                className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Close Matrix
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
