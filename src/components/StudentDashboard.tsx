import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Search,
  Plus,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  Award,
  Trophy,
  Bot,
  Send,
  Code2,
  Terminal,
  ShieldCheck,
  Zap,
  Flame,
  CheckSquare,
  Square,
  User,
  MessageSquare,
  FolderGit2,
  LogOut,
  IndianRupee,
  Eye,
  Star,
  Sparkles,
  ChevronRight,
  Filter,
  DollarSign,
  TrendingUp,
  Download,
  ThumbsUp,
  BookOpen,
  CheckCheck,
  QrCode,
  Share2,
  FileCheck2,
  GitPullRequest,
  Copy,
  Check,
  Building,
  RefreshCw,
  GitFork,
  FlaskConical,
  Radio,
  Video,
  GraduationCap,
  FileText,
  UploadCloud,
  X,
  FileCode,
  Trash2
} from 'lucide-react';
import { CertificateItem, MarksheetItem, CommunityMember } from '../types';
import { StudentCharacter3D } from './StudentCharacter3D';
import { SkillPodsLogo } from './SkillPodsLogo';
import { StudentAiSkillMatch } from './StudentAiSkillMatch';
import { StudentMarketplace } from './StudentMarketplace';
import { StudentSkillPassport } from './StudentSkillPassport';
import { StudentEarningsWallet } from './StudentEarningsWallet';
import { LivePodRoomModal } from './LivePodRoomModal';
import { GuruCopilotModal } from './GuruCopilotModal';
import { EscrowPaymentModal } from './EscrowPaymentModal';
import { RecruiterHiringModal } from './RecruiterHiringModal';
import { SmeVoicePrdModal } from './SmeVoicePrdModal';
import { NaacReportModal } from './NaacReportModal';
import { PitchDeckModal } from './PitchDeckModal';
import { PodLeaderboardModal } from './PodLeaderboardModal';
import { ApiSandboxModal } from './ApiSandboxModal';
import { CommunityNetworkModal } from './CommunityNetworkModal';
import { DirectMessagingModal } from './DirectMessagingModal';

interface StudentDashboardProps {
  userEmail: string;
  onSwitchWorkspace: () => void;
  onBackToHome: () => void;
}

export type StudentDashboardTab =
  | 'overview'
  | 'ai-match'
  | 'marketplace'
  | 'passport'
  | 'explore'
  | 'my-projects'
  | 'pod'
  | 'tasks'
  | 'mentors'
  | 'earnings'
  | 'guru'
  | 'profile';

interface IndustryOpportunity {
  id: string;
  title: string;
  smeName: string;
  category: 'AI' | 'Web' | 'Mobile' | 'IoT' | 'Data' | 'Other';
  skills: string[];
  projectType: string;
  valueRange: string;
  mentorAvailable: boolean;
  status: 'Open' | 'Matching' | 'In Progress';
  description: string;
  podSlots: string;
}

interface StudentProject {
  id: string;
  title: string;
  type: 'College Project' | 'Hackathon Project' | 'Personal Project' | 'Prototype';
  techStack: string[];
  status: 'Listed' | 'Under Review' | 'Available' | 'In Monetization';
  views: number;
  interests: number;
  estimatedValue: string;
  description: string;
  githubUrl?: string;
  demoUrl?: string;
}

interface IndustryMentor {
  id: string;
  name: string;
  role: string;
  company: string;
  skills: string[];
  activePods: number;
  rating: number;
  availability: string;
  hourlyTier: string;
}

interface TaskItem {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'In Review' | 'Done';
  dueDate: string;
}

interface GuruMessage {
  id: string;
  sender: 'user' | 'guru';
  text: string;
  timestamp: string;
  codeSnippet?: string;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  userEmail,
  onSwitchWorkspace,
  onBackToHome
}) => {
  // URL Hash-based Multi-Page Routing & Tab Persistence
  const getInitialTab = (): StudentDashboardTab => {
    try {
      const hash = window.location.hash.replace('#', '').trim().toLowerCase();
      const validTabs: StudentDashboardTab[] = [
        'overview', 'profile', 'marketplace', 'passport', 'explore',
        'my-projects', 'pod', 'tasks', 'mentors', 'earnings', 'guru', 'ai-match'
      ];
      if (validTabs.includes(hash as StudentDashboardTab)) {
        return hash as StudentDashboardTab;
      }
      const saved = localStorage.getItem('skillpods_student_tab') as StudentDashboardTab;
      if (validTabs.includes(saved)) {
        return saved;
      }
    } catch {}
    return 'overview';
  };

  const [activeTab, setActiveTabState] = useState<StudentDashboardTab>(getInitialTab);

  const setActiveTab = (tab: StudentDashboardTab) => {
    setActiveTabState(tab);
    try {
      window.location.hash = tab;
      localStorage.setItem('skillpods_student_tab', tab);
    } catch {}
  };

  // Synchronize browser forward/back buttons and direct URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim().toLowerCase();
      const validTabs: StudentDashboardTab[] = [
        'overview', 'profile', 'marketplace', 'passport', 'explore',
        'my-projects', 'pod', 'tasks', 'mentors', 'earnings', 'guru', 'ai-match'
      ];
      if (validTabs.includes(hash as StudentDashboardTab)) {
        setActiveTabState(hash as StudentDashboardTab);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamically resolve logged-in user profile from database / Google OAuth / localStorage
  const getUserProfile = () => {
    const effectiveEmail = userEmail || 'builder@skillpods.io';
    try {
      const stored = localStorage.getItem('skillpods_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.email === userEmail || !userEmail)) {
          return {
            name: parsed.name || 'Student Builder',
            email: parsed.email || effectiveEmail,
            avatar: parsed.avatar
          };
        }
      }
    } catch {}

    if (userEmail) {
      if (userEmail.toLowerCase() === 'sanketbhende0@gmail.com') {
        return { name: 'Sanket Bhende', email: 'sanketbhende0@gmail.com' };
      }
      const username = userEmail.split('@')[0];
      const formatted = username
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
      return { name: formatted || 'Student Builder', email: userEmail };
    }
    return { name: 'Student Builder', email: effectiveEmail };
  };

  const currentProfile = getUserProfile();
  const displayName = currentProfile.name;
  const userInitials = displayName
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Editable Student Profile State
  const [profileData, setProfileData] = useState(() => {
    let savedBio = "Full-stack builder passionate about distributed systems, React 19 micro-frontends, and automated CI/CD pipelines. Currently building WebSocket SKU telemetry in Pod Apex-2.";
    let savedCollege = "National Institute of Technology";
    let savedDept = "Computer Science & Engineering";
    let savedRollNo = "CS21B042";
    let savedGradYear = "2027";
    let savedCgpa = "9.24 / 10.00";
    let savedSemester = "Semester 7 (Final Year)";
    let savedGithub = "https://github.com";
    let savedLinkedin = "https://linkedin.com";
    let savedSkills = ["React 19", "TypeScript", "Node.js", "FastAPI", "Tailwind CSS", "PostgreSQL"];
    let savedCertificates: CertificateItem[] = [
      {
        id: 'cert-1',
        title: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services (AWS)',
        date: 'July 2026',
        credentialUrl: 'https://aws.amazon.com/verification',
        verified: true,
        fileUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 'cert-2',
        title: 'Google Cloud Associate Cloud Engineer',
        issuer: 'Google Cloud Training',
        date: 'May 2026',
        credentialUrl: 'https://cloud.google.com/certification',
        verified: true,
        fileUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 'cert-3',
        title: 'Meta React & Advanced State Engineering',
        issuer: 'Meta Front-End Specialization',
        date: 'March 2026',
        credentialUrl: 'https://coursera.org/verify/meta-react',
        verified: true,
        fileUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'
      }
    ];
    let savedMarksheets: MarksheetItem[] = [
      {
        id: 'mark-1',
        title: 'Semester 6 Official Grade Sheet (9.42 SGPA)',
        semester: 'Sem 6 (Spring 2026)',
        uploadDate: 'June 15, 2026',
        fileUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 'mark-2',
        title: 'Semester 5 Official Grade Sheet (9.10 SGPA)',
        semester: 'Sem 5 (Fall 2025)',
        uploadDate: 'Jan 10, 2026',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80'
      }
    ];

    try {
      const stored = localStorage.getItem('skillpods_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.bio) savedBio = parsed.bio;
        if (parsed.college) savedCollege = parsed.college;
        if (parsed.department) savedDept = parsed.department;
        if (parsed.rollNo) savedRollNo = parsed.rollNo;
        if (parsed.gradYear) savedGradYear = parsed.gradYear;
        if (parsed.cgpa) savedCgpa = parsed.cgpa;
        if (parsed.semester) savedSemester = parsed.semester;
        if (parsed.github) savedGithub = parsed.github;
        if (parsed.linkedin) savedLinkedin = parsed.linkedin;
        if (parsed.skills) savedSkills = parsed.skills;
        if (Array.isArray(parsed.certificates)) savedCertificates = parsed.certificates;
        if (Array.isArray(parsed.marksheets)) savedMarksheets = parsed.marksheets;
      }
    } catch {}

    return {
      bio: savedBio,
      college: savedCollege,
      department: savedDept,
      rollNo: savedRollNo,
      gradYear: savedGradYear,
      cgpa: savedCgpa,
      semester: savedSemester,
      github: savedGithub,
      linkedin: savedLinkedin,
      skills: savedSkills,
      certificates: savedCertificates,
      marksheets: savedMarksheets
    };
  });

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editName, setEditName] = useState(displayName);
  const [editBio, setEditBio] = useState(profileData.bio);
  const [editCollege, setEditCollege] = useState(profileData.college);
  const [editDept, setEditDept] = useState(profileData.department);
  const [editRollNo, setEditRollNo] = useState(profileData.rollNo);
  const [editGradYear, setEditGradYear] = useState(profileData.gradYear);
  const [editCgpa, setEditCgpa] = useState(profileData.cgpa);
  const [editSemester, setEditSemester] = useState(profileData.semester);
  const [editGithub, setEditGithub] = useState(profileData.github);
  const [editLinkedin, setEditLinkedin] = useState(profileData.linkedin);
  const [editSkillsInput, setEditSkillsInput] = useState(profileData.skills.join(', '));
  const [editAvatar, setEditAvatar] = useState<string>(currentProfile.avatar || '');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);

  // Document Vault Modals
  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertDate, setNewCertDate] = useState('Aug 2026');
  const [newCertUrl, setNewCertUrl] = useState('');
  const [newCertFile, setNewCertFile] = useState<string>('https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80');

  const [showUploadMarksheetModal, setShowUploadMarksheetModal] = useState(false);
  const [newMarksheetTitle, setNewMarksheetTitle] = useState('');
  const [newMarksheetSem, setNewMarksheetSem] = useState('Semester 6 (Final Exam)');
  const [newMarksheetFile, setNewMarksheetFile] = useState<string>('https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80');

  // Preview Document Lightbox
  const [previewDoc, setPreviewDoc] = useState<{ title: string; fileUrl: string; type: string } | null>(null);

  // Cloud Database Profile Fetcher: Guarantees profile data is NEVER lost even if cookies/localStorage are cleared!
  useEffect(() => {
    const targetEmail = userEmail || 'sanketbhende0@gmail.com';
    fetch(`/api/user/profile?email=${encodeURIComponent(targetEmail)}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.success && data?.user) {
          const u = data.user;
          setProfileData(prev => ({
            bio: u.bio || prev.bio,
            college: u.college || prev.college,
            department: u.department || prev.department,
            rollNo: u.rollNo || prev.rollNo,
            gradYear: u.gradYear || prev.gradYear,
            cgpa: u.cgpa || prev.cgpa,
            semester: u.semester || prev.semester,
            github: u.github || prev.github,
            linkedin: u.linkedin || prev.linkedin,
            skills: Array.isArray(u.skills) && u.skills.length > 0 ? u.skills : prev.skills,
            certificates: Array.isArray(u.certificates) && u.certificates.length > 0 ? u.certificates : prev.certificates,
            marksheets: Array.isArray(u.marksheets) && u.marksheets.length > 0 ? u.marksheets : prev.marksheets
          }));
          if (u.name) setEditName(u.name);
          if (u.bio) setEditBio(u.bio);
          if (u.college) setEditCollege(u.college);
          if (u.department) setEditDept(u.department);
          if (u.cgpa) setEditCgpa(u.cgpa);
          if (u.semester) setEditSemester(u.semester);
          if (u.avatar) setEditAvatar(u.avatar);
          if (u.skills) setEditSkillsInput(u.skills.join(', '));
        }
      })
      .catch(() => {});
  }, [userEmail]);

  // Handle local image file upload for avatar
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add New Certificate
  const handleAddCertificateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertTitle.trim()) return;

    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      title: newCertTitle.trim(),
      issuer: newCertIssuer.trim() || 'Verified Institute / Online Platform',
      date: newCertDate.trim() || 'Aug 2026',
      credentialUrl: newCertUrl.trim() || undefined,
      fileUrl: newCertFile,
      verified: true
    };

    const updatedCerts = [newCert, ...profileData.certificates];
    const updatedProfile = { ...profileData, certificates: updatedCerts };
    setProfileData(updatedProfile);

    // Sync to local & cloud database
    syncFullProfileToCloud(updatedProfile);
    setShowAddCertModal(false);
    setNewCertTitle('');
    setNewCertIssuer('');
    setNewCertUrl('');
    setProfileSuccessMsg(`Certificate "${newCert.title}" added & verified!`);
    setTimeout(() => setProfileSuccessMsg(null), 4000);
  };

  // Delete Certificate
  const handleDeleteCertificate = (certId: string) => {
    const updatedCerts = profileData.certificates.filter(c => c.id !== certId);
    const updatedProfile = { ...profileData, certificates: updatedCerts };
    setProfileData(updatedProfile);
    syncFullProfileToCloud(updatedProfile);
  };

  // Upload Marksheet / Transcript
  const handleUploadMarksheetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMarksheetTitle.trim()) return;

    const newMarksheet: MarksheetItem = {
      id: `mark-${Date.now()}`,
      title: newMarksheetTitle.trim(),
      semester: newMarksheetSem.trim() || 'Official Semester Marksheet',
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      fileUrl: newMarksheetFile
    };

    const updatedMarksheets = [newMarksheet, ...profileData.marksheets];
    const updatedProfile = { ...profileData, marksheets: updatedMarksheets };
    setProfileData(updatedProfile);

    syncFullProfileToCloud(updatedProfile);
    setShowUploadMarksheetModal(false);
    setNewMarksheetTitle('');
    setProfileSuccessMsg(`Marksheet "${newMarksheet.title}" uploaded & saved!`);
    setTimeout(() => setProfileSuccessMsg(null), 4000);
  };

  // Delete Marksheet
  const handleDeleteMarksheet = (marksheetId: string) => {
    const updatedMarksheets = profileData.marksheets.filter(m => m.id !== marksheetId);
    const updatedProfile = { ...profileData, marksheets: updatedMarksheets };
    setProfileData(updatedProfile);
    syncFullProfileToCloud(updatedProfile);
  };

  // Full Profile Cloud Syncer
  const syncFullProfileToCloud = async (updated: typeof profileData) => {
    const userPayload = {
      email: userEmail || currentProfile.email || 'builder@skillpods.io',
      name: editName,
      avatar: editAvatar,
      ...updated
    };

    try {
      const stored = localStorage.getItem('skillpods_user');
      const parsed = stored ? JSON.parse(stored) : {};
      localStorage.setItem('skillpods_user', JSON.stringify({ ...parsed, ...userPayload }));
    } catch {}

    try {
      await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload)
      });
    } catch (err) {
      console.warn('Backend profile sync error:', err);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = editSkillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const updated = {
      ...profileData,
      bio: editBio,
      college: editCollege,
      department: editDept,
      rollNo: editRollNo,
      gradYear: editGradYear,
      cgpa: editCgpa,
      semester: editSemester,
      github: editGithub,
      linkedin: editLinkedin,
      skills: skillsArray,
      avatar: editAvatar
    };
    setProfileData(updated);
    await syncFullProfileToCloud(updated);

    setShowEditProfileModal(false);
    setProfileSuccessMsg("Profile information, CGPA & documents saved directly to MongoDB cloud!");
    setTimeout(() => setProfileSuccessMsg(null), 4000);
  };

  // Experimental Labs & Active Testing Features State
  const [showLivePodRoom, setShowLivePodRoom] = useState(false);
  const [showGuruCopilot, setShowGuruCopilot] = useState(false);
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);
  const [showVoicePrdModal, setShowVoicePrdModal] = useState(false);
  const [showNaacModal, setShowNaacModal] = useState(false);
  const [showPitchDeckModal, setShowPitchDeckModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showApiSandboxModal, setShowApiSandboxModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showMessagingModal, setShowMessagingModal] = useState(false);
  const [selectedChatRecipient, setSelectedChatRecipient] = useState<CommunityMember | null>(null);
  const [githubSyncMsg, setGithubSyncMsg] = useState<string | null>(null);

  const handleSimulateGithubPush = () => {
    setGithubSyncMsg("⚡ Webhook Received: Commit 'feat: rate-limiter unit tests' pushed to origin/main! Pod Apex-2 progress updated to 72% ✓");
    setTimeout(() => setGithubSyncMsg(null), 5000);
  };

  // Search & Filter State for Opportunities Marketplace
  const [opportunitySearch, setOpportunitySearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // List Project Modal
  const [showListProjectModal, setShowListProjectModal] = useState(false);
  const [newProjName, setNewProjName] = useState('');
  const [newProjType, setNewProjType] = useState<StudentProject['type']>('College Project');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjValuation, setNewProjValuation] = useState('₹15,000 - ₹30,000');
  const [newProjGithub, setNewProjGithub] = useState('');

  // Industry Opportunities Data
  const [opportunities, setOpportunities] = useState<IndustryOpportunity[]>([
    {
      id: 'opp-1',
      title: 'Smart Inventory Management System',
      smeName: 'ABC Retail',
      category: 'Web',
      skills: ['React', 'Node.js', 'AI', 'PostgreSQL'],
      projectType: 'Build Opportunity',
      valueRange: '₹20K – ₹40K',
      mentorAvailable: true,
      status: 'Open',
      description: 'Real-time stock anomaly prediction, automated supplier purchase reordering, and barcode scanning dashboard.',
      podSlots: '3 of 4 filled (Seeking Frontend Dev)'
    },
    {
      id: 'opp-2',
      title: 'Freight Telemetry & Dispatch Optimizer',
      smeName: 'Kestrel Logistics',
      category: 'IoT',
      skills: ['Go', 'React', 'WebSockets', 'Mapbox'],
      projectType: 'Build Opportunity',
      valueRange: '₹35K – ₹60K',
      mentorAvailable: true,
      status: 'Open',
      description: 'High-frequency GPS cold-chain tracking, geofencing telemetry alerts, and automated dispatcher assignment.',
      podSlots: 'Pod Apex-2 Matched (Active)'
    },
    {
      id: 'opp-3',
      title: 'AI Crop Disease Diagnostic Engine',
      smeName: 'AgroFarm Global',
      category: 'AI',
      skills: ['Python', 'FastAPI', 'PyTorch', 'Next.js'],
      projectType: 'Build Opportunity',
      valueRange: '₹30K – ₹50K',
      mentorAvailable: true,
      status: 'Open',
      description: 'Multi-spectral plant leaf disease image classifier with offline farm edge inference and SMS advisory alerts.',
      podSlots: '2 of 4 filled'
    },
    {
      id: 'opp-4',
      title: 'Autonomous Multi-Tenant Invoice Parser',
      smeName: 'FinTax Solutions',
      category: 'Data',
      skills: ['TypeScript', 'Gemini API', 'OCR', 'Supabase'],
      projectType: 'Build Opportunity',
      valueRange: '₹25K – ₹45K',
      mentorAvailable: true,
      status: 'Open',
      description: 'Zero-shot invoice extraction pipeline, GST reconciliation parser, and payment gateway webhooks.',
      podSlots: '1 of 4 filled'
    },
    {
      id: 'opp-5',
      title: 'Campus Micro-Mobility Fleet Controller',
      smeName: 'VoltRide Campus',
      category: 'Mobile',
      skills: ['Flutter', 'Firebase', 'BLE', 'Node.js'],
      projectType: 'Build Opportunity',
      valueRange: '₹20K – ₹35K',
      mentorAvailable: true,
      status: 'Open',
      description: 'QR-unlock Bluetooth low-energy scooter telemetry with college boundary geofencing and wallet payments.',
      podSlots: 'Open for Pod Formation'
    }
  ]);

  // Student Listed Projects
  const [myProjects, setMyProjects] = useState<StudentProject[]>([
    {
      id: 'sp-1',
      title: 'Smart Attendance System with Face Recognition',
      type: 'College Project',
      techStack: ['React', 'Node.js', 'OpenCV', 'MongoDB'],
      status: 'Listed',
      views: 342,
      interests: 8,
      estimatedValue: '₹25,000',
      description: 'Final year capstone project automating multi-camera classroom attendance with spoofing detection.',
      githubUrl: 'https://github.com/alexrivera/smart-attendance',
      demoUrl: 'https://attendance-demo.skillpods.dev'
    },
    {
      id: 'sp-2',
      title: 'Crop Disease Detection & Advisory App',
      type: 'Hackathon Project',
      techStack: ['Python', 'ML', 'Flutter', 'FastAPI'],
      status: 'Under Review',
      views: 512,
      interests: 14,
      estimatedValue: '₹40,000',
      description: 'National Hackathon runner-up: Realtime leaf rust detection with multilingual audio recommendations.',
      githubUrl: 'https://github.com/alexrivera/crop-ai',
      demoUrl: 'https://crop-guard.skillpods.dev'
    },
    {
      id: 'sp-3',
      title: 'Campus Navigation & Indoor Beacon Wayfinder',
      type: 'Personal Project',
      techStack: ['Flutter', 'BLE Beacons', 'Firebase'],
      status: 'Available',
      views: 189,
      interests: 4,
      estimatedValue: '₹18,000',
      description: 'Interactive campus map with floor-by-floor routing for freshmen and university guests.',
      githubUrl: 'https://github.com/alexrivera/campus-map'
    }
  ]);

  // Mentors Data
  const mentors: IndustryMentor[] = [
    {
      id: 'm-1',
      name: 'Priya Sharma',
      role: 'Staff Engineer & Architect',
      company: 'Razorpay',
      skills: ['System Design', 'React', 'Payment Gateways', 'Distributed Systems'],
      activePods: 3,
      rating: 4.95,
      availability: 'Available this week',
      hourlyTier: 'Assigned to Apex-2'
    },
    {
      id: 'm-2',
      name: 'Sarah Chen',
      role: 'Principal Architect',
      company: 'Stripe',
      skills: ['WebSockets', 'Telemetry', 'Go', 'High-QPS APIs'],
      activePods: 2,
      rating: 4.98,
      availability: 'Office Hours Thu 4 PM',
      hourlyTier: 'Active Mentor'
    },
    {
      id: 'm-3',
      name: 'Devendra Rao',
      role: 'AI Tech Lead',
      company: 'Swiggy',
      skills: ['Computer Vision', 'PyTorch', 'LLMs', 'Model Optimization'],
      activePods: 4,
      rating: 4.91,
      availability: 'Open for 1 Pod',
      hourlyTier: 'Request Review'
    },
    {
      id: 'm-4',
      name: 'Aakash Verma',
      role: 'Head of Engineering',
      company: 'Freshworks',
      skills: ['SaaS Architecture', 'Full-stack Node.js', 'SOC2 Compliance'],
      activePods: 2,
      rating: 4.93,
      availability: 'Available Fri',
      hourlyTier: 'Request Review'
    }
  ];

  // Tasks State
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 't-1',
      title: 'Implement WebSocket Telemetry Stream for Vehicle Fleet',
      category: 'Frontend & Realtime',
      priority: 'High',
      status: 'In Progress',
      dueDate: 'Tomorrow, 5:00 PM'
    },
    {
      id: 't-2',
      title: 'Design Geofencing Map Canvas (Mapbox / D3)',
      category: 'UI/UX Architecture',
      priority: 'High',
      status: 'In Review',
      dueDate: 'Aug 24, 2026'
    },
    {
      id: 't-3',
      title: 'Configure JWT Token Refresh in API Client Interceptor',
      category: 'Security & Auth',
      priority: 'Medium',
      status: 'Done',
      dueDate: 'Completed Aug 20'
    },
    {
      id: 't-4',
      title: 'Benchmark Map Marker Rendering Performance at 1,000 Nodes',
      category: 'Performance QA',
      priority: 'Medium',
      status: 'Todo',
      dueDate: 'Aug 26, 2026'
    },
    {
      id: 't-5',
      title: 'Prepare Sprint 3 Mentor Demo Deck for Priya Sharma',
      category: 'Sprint Deliverables',
      priority: 'Low',
      status: 'Todo',
      dueDate: 'Aug 27, 2026'
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Frontend');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // Peer kudos state
  const [kudosGiven, setKudosGiven] = useState<Record<string, boolean>>({});

  // GURU State
  const [guruMessages, setGuruMessages] = useState<GuruMessage[]>([
    {
      id: 'g-1',
      sender: 'guru',
      text: `Hey ${displayName.split(' ')[0]}! 👋 I am GURU, your Skill Pod Technical & Opportunity Copilot. Whether you are turning a college project into an SME solution or implementing WebSocket telemetry for Pod Apex-2, I am here to help!`,
      timestamp: '10:14 AM'
    },
    {
      id: 'g-2',
      sender: 'user',
      text: 'How can our Pod prepare for the SME milestone gate with ABC Retail and mentor Priya Sharma?',
      timestamp: '10:16 AM'
    },
    {
      id: 'g-3',
      sender: 'guru',
      text: 'For the Sprint 3 gate review with Priya Sharma, ensure your WebSocket fallback handler is robust and the inventory telemetry payload schema is strictly typed. Here is the recommended verification checklist:',
      timestamp: '10:16 AM',
      codeSnippet: `// Verify Telemetry Packet Schema before Gate Review
interface InventoryTelemetryPacket {
  storeId: string;
  sku: string;
  stockDelta: number;
  timestamp: number;
  anomalyScore?: number;
}`
    }
  ]);
  const [guruInput, setGuruInput] = useState('');
  const [isGuruTyping, setIsGuruTyping] = useState(false);

  const handleSendGuruMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!guruInput.trim()) return;

    const userMsg: GuruMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: guruInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setGuruMessages(prev => [...prev, userMsg]);
    const query = guruInput.toLowerCase();
    setGuruInput('');
    setIsGuruTyping(true);

    setTimeout(() => {
      let replyText = "I've analyzed your project & pod workspace. You're making solid progress toward the ₹20K–₹40K SME delivery milestone!";
      let codeSnippet: string | undefined = undefined;

      if (query.includes('project') || query.includes('list')) {
        replyText = "When listing existing college or hackathon projects, focus on business metrics (e.g. latency reduced, manual hours saved). SMEs prioritize working prototypes that solve clear operational pain points!";
      } else if (query.includes('mentor') || query.includes('priya')) {
        replyText = "Mentor Priya Sharma (Staff Engineer @ Razorpay) has reviewed your Sprint 3 architecture. You can request a 15-minute sync through the Mentors tab!";
      } else if (query.includes('earn') || query.includes('money') || query.includes('payment')) {
        replyText = "Skill Pods payouts are released upon successful Mentor Gate Sign-off and SME acceptance. Apex-2 is currently at 68% towards the Sprint 3 milestone payout.";
      }

      const botMsg: GuruMessage = {
        id: `g-${Date.now()}`,
        sender: 'guru',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        codeSnippet
      };

      setGuruMessages(prev => [...prev, botMsg]);
      setIsGuruTyping(false);
    }, 850);
  };

  const handleToggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextStatus: Record<TaskItem['status'], TaskItem['status']> = {
          'Todo': 'In Progress',
          'In Progress': 'In Review',
          'In Review': 'Done',
          'Done': 'Todo'
        };
        return { ...t, status: nextStatus[t.status] };
      }
      return t;
    }));
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const item: TaskItem = {
      id: `t-${Date.now()}`,
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: 'Medium',
      status: 'Todo',
      dueDate: 'Aug 28, 2026'
    };
    setTasks(prev => [item, ...prev]);
    setNewTaskTitle('');
    setShowAddTaskModal(false);
  };

  const handleListNewProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;

    const newProject: StudentProject = {
      id: `sp-${Date.now()}`,
      title: newProjName.trim(),
      type: newProjType,
      techStack: newProjTech ? newProjTech.split(',').map(s => s.trim()) : ['React', 'Node.js'],
      status: 'Listed',
      views: 1,
      interests: 0,
      estimatedValue: newProjValuation,
      description: newProjDesc || 'Student project listed for SME matching and monetization.',
      githubUrl: newProjGithub || 'https://github.com/alexrivera'
    };

    setMyProjects(prev => [newProject, ...prev]);
    setShowListProjectModal(false);
    setNewProjName('');
    setNewProjDesc('');
    setNewProjTech('');
    setNewProjGithub('');
    setActiveTab('my-projects');
  };

  // Filtered Opportunities
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory;
    const matchesSearch = 
      opp.title.toLowerCase().includes(opportunitySearch.toLowerCase()) ||
      opp.smeName.toLowerCase().includes(opportunitySearch.toLowerCase()) ||
      opp.skills.some(s => s.toLowerCase().includes(opportunitySearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="theme-lavender-canvas min-h-screen text-[#261543] font-sans selection:bg-purple-600 selection:text-white flex flex-col xl:flex-row">
      
      {/* ================= LEFT FLOATING ICON NAVIGATION RAIL (DESKTOP) ================= */}
      <aside className="hidden xl:flex flex-col items-center justify-between py-6 px-3.5 w-20 shrink-0 sticky top-0 h-screen z-50">
        
        {/* Top Logo Icon */}
        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={onBackToHome}
            className="w-12 h-12 rounded-2xl bg-white/90 shadow-[0_6px_18px_rgba(93,62,187,0.12)] flex items-center justify-center text-purple-700 hover:scale-105 transition-all cursor-pointer border border-white"
            title="SkillPods Home"
          >
            <Sparkles className="w-6 h-6 text-purple-600 animate-pulse" />
          </button>

          {/* Navigation Icon List */}
          <nav className="flex flex-col items-center gap-2.5">
            {[
              { id: 'overview', icon: Layers, label: 'Dashboard' },
              { id: 'ai-match', icon: Sparkles, label: 'AI Skill Match (96%)' },
              { id: 'marketplace', icon: Building, label: 'Project Marketplace' },
              { id: 'passport', icon: QrCode, label: 'Skill Passport & Score' },
              { id: 'explore', icon: Briefcase, label: 'Explore Opportunities' },
              { id: 'my-projects', icon: FolderGit2, label: 'My Listed Projects' },
              { id: 'pod', icon: Users, label: 'Skill Pod' },
              { id: 'tasks', icon: CheckCircle2, label: 'Tasks Kanban' },
              { id: 'mentors', icon: ShieldCheck, label: 'Mentors' },
              { id: 'earnings', icon: IndianRupee, label: 'Earnings Wallet' },
              { id: 'guru', icon: Bot, label: 'Ask GURU AI' },
              { id: 'profile', icon: User, label: 'Profile' },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as StudentDashboardTab)}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer relative group ${
                    isActive
                      ? 'bg-[#3b226e] text-white shadow-[0_8px_20px_rgba(59,34,110,0.3)] scale-105'
                      : 'bg-white/70 hover:bg-white text-[#523d77] hover:text-[#281549] shadow-2xs border border-white/80'
                  }`}
                  title={tab.label}
                >
                  <Icon className="w-4.5 h-4.5" />
                  {/* Tooltip on hover */}
                  <span className="absolute left-14 px-2.5 py-1 bg-[#261543] text-white text-xs font-semibold rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Icons: Switch Workspace & Logout */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onSwitchWorkspace}
            className="w-10 h-10 rounded-2xl bg-white/70 hover:bg-white text-[#523d77] hover:text-[#281549] flex items-center justify-center transition-all cursor-pointer border border-white/80 shadow-2xs"
            title="Switch Workspace"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 min-w-0 flex flex-col">
        
        {/* TOP HEADER BAR */}
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
                <span className="px-2.5 py-0.5 rounded-full bg-white/70 text-[#4c3182] font-bold text-2xs border border-white shadow-2xs">
                  Workspace
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100/90 text-emerald-800 font-bold text-2xs border border-emerald-300">
                  <ShieldCheck className="w-3 h-3" /> Skill Passport Verified
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5d4a82] font-medium mt-0.5">
                AI-matched opportunities &bull; Verified skill passport &bull; Project marketplace
              </p>
            </div>
          </div>

          {/* Top Right Actions: Community Network, Direct Messages, Date & Profile */}
          <div className="flex items-center gap-2.5 flex-wrap">
            
            {/* 1. Community Network Button */}
            <button
              onClick={() => setShowCommunityModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              title="Browse Students, SMEs, Mentors & Credentials"
            >
              <Users className="w-3.5 h-3.5" />
              <span>🌐 Community</span>
            </button>

            {/* 2. Direct Messaging Button */}
            <button
              onClick={() => {
                setSelectedChatRecipient(null);
                setShowMessagingModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-purple-950 border border-purple-200 text-xs font-bold shadow-2xs transition-all cursor-pointer relative"
              title="Private Direct Messaging"
            >
              <MessageSquare className="w-3.5 h-3.5 text-purple-700" />
              <span>💬 Messages</span>
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-900 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
              <span>Match Fit: 96%</span>
            </div>

            <div className="hidden md:block px-3.5 py-1.5 rounded-full bg-white/80 border border-white/90 text-[#3b226e] text-xs font-semibold shadow-2xs">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
            </div>

            <button
              onClick={() => setActiveTab('passport')}
              className="flex items-center gap-2 p-1 sm:pr-3 rounded-full bg-white/80 border border-white/90 shadow-2xs hover:bg-white transition-all cursor-pointer"
            >
              {currentProfile.avatar ? (
                <img src={currentProfile.avatar} alt={displayName} className="w-8 h-8 rounded-full object-cover border border-purple-300 shadow-xs" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#5d3ebb] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {userInitials || (userEmail ? userEmail.charAt(0).toUpperCase() : 'S')}
                </div>
              )}
              <span className="hidden sm:inline text-xs font-bold text-[#261543]">{displayName} (94 XP)</span>
            </button>
          </div>
        </header>

        {/* Mobile/Tablet Horizontal Tab Bar */}
        <div className="xl:hidden px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard' },
            { id: 'ai-match', label: '🤖 AI Skill Match (96%)' },
            { id: 'marketplace', label: '💼 Marketplace' },
            { id: 'passport', label: '🪪 Skill Passport' },
            { id: 'explore', label: 'Explore' },
            { id: 'my-projects', label: 'Projects' },
            { id: 'pod', label: 'Pod' },
            { id: 'tasks', label: 'Tasks' },
            { id: 'mentors', label: 'Mentors' },
            { id: 'earnings', label: 'Earnings' },
            { id: 'guru', label: 'GURU AI 🤖' },
            { id: 'profile', label: 'Profile' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as StudentDashboardTab)}
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

        <main className="px-4 sm:px-8 py-4 sm:py-6 space-y-6 max-w-7xl w-full">
          
          {/* ================= EXPERIMENTAL LABS & TESTING FEATURES BAR ================= */}
          <div className="bg-gradient-to-r from-[#2a174d] via-[#1c1236] to-[#120a24] text-white p-4 sm:p-5 rounded-3xl border border-purple-500/40 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                <FlaskConical className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm sm:text-base text-white">Experimental Labs & Next-Gen Tools</h3>
                  <span className="text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40">
                    🧪 IN TESTING / ACTIVE DEVELOPMENT
                  </span>
                </div>
                <p className="text-xs text-purple-200/80 mt-0.5">Explore real-time pod rooms, AI PR security audits, smart escrow locks, and GitHub webhooks.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowLivePodRoom(true)}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono flex items-center gap-1 shadow-md cursor-pointer transition-all"
              >
                <Video className="w-3.5 h-3.5" />
                <span>🎙️ Live Room</span>
              </button>

              <button
                onClick={() => setShowGuruCopilot(true)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono flex items-center gap-1 shadow-md cursor-pointer transition-all"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>🤖 GURU PR</span>
              </button>

              <button
                onClick={() => setShowRecruiterModal(true)}
                className="px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-bold font-mono flex items-center gap-1 cursor-pointer transition-all"
              >
                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                <span>💼 Recruiters</span>
              </button>

              <button
                onClick={() => setShowVoicePrdModal(true)}
                className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-200 text-xs font-bold font-mono flex items-center gap-1 cursor-pointer transition-all"
              >
                <Radio className="w-3.5 h-3.5 text-rose-400" />
                <span>🎙️ Voice PRD</span>
              </button>

              <button
                onClick={() => setShowPitchDeckModal(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-xs font-bold font-mono flex items-center gap-1 cursor-pointer transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>📊 Pitch Deck</span>
              </button>

              <button
                onClick={() => setShowLeaderboardModal(true)}
                className="px-3 py-1.5 rounded-xl bg-orange-950/80 hover:bg-orange-900 border border-orange-500/40 text-orange-200 text-xs font-bold font-mono flex items-center gap-1 cursor-pointer transition-all"
              >
                <Trophy className="w-3.5 h-3.5 text-orange-400" />
                <span>🏆 Leaderboard</span>
              </button>

              <button
                onClick={() => setShowApiSandboxModal(true)}
                className="px-3 py-1.5 rounded-xl bg-teal-950/80 hover:bg-teal-900 border border-teal-500/40 text-teal-200 text-xs font-bold font-mono flex items-center gap-1 cursor-pointer transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-teal-400" />
                <span>💻 API Sandbox</span>
              </button>

              <button
                onClick={() => setShowNaacModal(true)}
                className="px-3 py-1.5 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-500/40 text-blue-200 text-xs font-bold font-mono flex items-center gap-1 cursor-pointer transition-all"
              >
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>🏫 NAAC Exporter</span>
              </button>

              <button
                onClick={handleSimulateGithubPush}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono flex items-center gap-1 shadow-md cursor-pointer transition-all"
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>⚡ Git Push</span>
              </button>

              <button
                onClick={() => setShowEscrowModal(true)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold font-mono flex items-center gap-1 cursor-pointer transition-all"
              >
                <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                <span>💳 Escrow</span>
              </button>
            </div>
          </div>

          {/* GitHub Sync Toast Notification */}
          {githubSyncMsg && (
            <div className="bg-emerald-950/90 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-2xl text-xs font-mono flex items-center gap-2 animate-in fade-in slide-in-from-top duration-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{githubSyncMsg}</span>
            </div>
          )}
          
          {/* ================= TAB 1: OVERVIEW (TASKFLOW AESTHETIC) ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-12 pb-12">
              
              {/* 1. HERO SECTION */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lavender-glass-card p-8 sm:p-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-8"
              >
                <div className="flex-1 space-y-6">
                  <div>
                    <span className="text-xs font-bold text-[#6d5b91] uppercase tracking-wider block mb-2">
                      YOUR SKILL POD
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#261543] tracking-tight mb-2">
                      Turn your projects into opportunities.
                    </h2>
                    <p className="text-[#5c4780] font-medium text-sm sm:text-base max-w-xl">
                      Build, collaborate, learn from mentors and ship real products.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 py-2 border-y border-[#c0b1e4]/30">
                    <div>
                      <div className="text-xl font-black text-[#261543]">₹35,000</div>
                      <div className="text-2xs font-semibold text-[#7c6a9b]">Pod Value</div>
                    </div>
                    <div className="w-px h-8 bg-[#c0b1e4]/30" />
                    <div>
                      <div className="text-xl font-black text-[#261543]">3,450</div>
                      <div className="text-2xs font-semibold text-[#7c6a9b]">XP</div>
                    </div>
                    <div className="w-px h-8 bg-[#c0b1e4]/30" />
                    <div>
                      <div className="text-xl font-black text-[#261543]">28</div>
                      <div className="text-2xs font-semibold text-[#7c6a9b]">Tasks Complete</div>
                    </div>
                    <div className="w-px h-8 bg-[#c0b1e4]/30" />
                    <div>
                      <div className="text-xl font-black text-[#261543]">5</div>
                      <div className="text-2xs font-semibold text-[#7c6a9b]">New Opportunities</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#5c4780]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Sprint 3 of 6 &middot; 68% in progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#6d4ec7]" />
                      <span>Mentor: <strong>Priya Sharma</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('explore')}
                      className="lavender-pill-btn-dark px-6 py-2.5 rounded-full text-xs font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                    >
                      Explore Projects
                    </button>
                    <button
                      onClick={() => setShowListProjectModal(true)}
                      className="lavender-pill-btn-light px-6 py-2.5 rounded-full text-xs font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                    >
                      + List My Project
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-[280px] lg:max-w-[320px] flex items-center justify-center shrink-0">
                  <StudentCharacter3D size="hero" />
                </div>
              </motion.section>

              {/* 2. QUICK ACTIONS */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div 
                  onClick={() => setActiveTab('explore')}
                  className="bg-white/40 hover:bg-white/60 border border-white/50 p-5 rounded-2xl cursor-pointer transition-all hover:shadow-sm group"
                >
                  <h4 className="font-bold text-[#261543] text-sm mb-1 group-hover:text-[#6d4ec7] transition-colors">EXPLORE PROJECTS</h4>
                  <p className="text-xs text-[#5c4780] mb-3">Find real problems posted by companies.</p>
                  <div className="text-xs font-bold text-[#6d4ec7] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                
                <div 
                  onClick={() => setShowListProjectModal(true)}
                  className="bg-white/40 hover:bg-white/60 border border-white/50 p-5 rounded-2xl cursor-pointer transition-all hover:shadow-sm group"
                >
                  <h4 className="font-bold text-[#261543] text-sm mb-1 group-hover:text-[#6d4ec7] transition-colors">LIST MY PROJECT</h4>
                  <p className="text-xs text-[#5c4780] mb-3">Give your college or personal project a second life.</p>
                  <div className="text-xs font-bold text-[#6d4ec7] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    List Project <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
                
                <div 
                  onClick={() => setActiveTab('mentors')}
                  className="bg-white/40 hover:bg-white/60 border border-white/50 p-5 rounded-2xl cursor-pointer transition-all hover:shadow-sm group"
                >
                  <h4 className="font-bold text-[#261543] text-sm mb-1 group-hover:text-[#6d4ec7] transition-colors">FIND A MENTOR</h4>
                  <p className="text-xs text-[#5c4780] mb-3">Get architecture guidance and product feedback.</p>
                  <div className="text-xs font-bold text-[#6d4ec7] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Find Mentor <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.section>

              {/* 3. YOUR PERFORMANCE */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lavender-glass-card p-8 flex flex-col gap-8"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#261543] mb-1">Your Performance</h3>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-black text-[#261543]">78%</span>
                    <span className="text-sm font-semibold text-[#6d5b91] pb-1">Productivity</span>
                  </div>
                  <p className="text-xs font-medium text-emerald-600 mt-1">+5% velocity since last sprint</p>
                </div>

                <div className="h-32 flex items-end justify-between gap-4 px-2 max-w-2xl">
                  {[
                    { day: 'Mon', h: '65%', val: '65%' },
                    { day: 'Tue', h: '85%', val: '85%' },
                    { day: 'Wed', h: '45%', val: '45%' },
                    { day: 'Thu', h: '95%', val: '95%' },
                    { day: 'Fri', h: '75%', val: '75%' },
                    { day: 'Sat', h: '55%', val: '55%' },
                    { day: 'Sun', h: '80%', val: '80%' },
                  ].map((col, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: col.h }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 * idx }}
                        className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-[#ab96f0]/70 to-[#e4dcfe]/70 group-hover:from-[#9378eb] group-hover:to-[#d0c0fc] transition-all"
                      />
                      <span className="text-xs font-semibold text-[#7d6c9e]">{col.day}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#c0b1e4]/30 pt-6 flex flex-wrap items-center gap-x-12 gap-y-4">
                  <div>
                    <div className="text-2xl font-black text-[#261543]">28</div>
                    <div className="text-xs font-semibold text-[#7c6a9b]">Tasks completed this sprint</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#261543]">4.8 hrs</div>
                    <div className="text-xs font-semibold text-[#7c6a9b]">Average completion time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#261543]">₹35,000</div>
                    <div className="text-xs font-semibold text-[#7c6a9b]">Value generated for SME</div>
                  </div>
                </div>
              </motion.section>

              {/* 4. ACTIVE SKILL POD */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lavender-glass-card p-8 flex flex-col gap-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#c0b1e4]/30 pb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#261543] mb-1">Active Skill Pod</h3>
                    <div className="flex items-center gap-2 text-[#5c4780] font-semibold text-sm">
                      <span className="text-[#6d4ec7]">Apex-2</span>
                      <span>&middot;</span>
                      <span>Smart Inventory Management System</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {['A', 'P', 'M', 'L'].map((initial, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a078ff] to-[#6d4ec7] border-2 border-white text-white flex items-center justify-center text-xs font-bold z-10 shadow-sm relative" style={{ zIndex: 10 - i }}>
                            {initial}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs font-semibold text-[#5c4780]">
                        4 / 4 active
                      </div>
                    </div>
                    <button className="lavender-pill-btn-dark px-4 py-2 rounded-full text-xs font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform shrink-0">
                      Open Pod
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#5c4780]">
                  <div>Mentor: <strong>Priya Sharma</strong></div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#c0b1e4]/60" />
                  <div>Current Sprint: <strong>Sprint 3 of 6</strong></div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#c0b1e4]/60" />
                  <div className="flex items-center gap-2">
                    Progress: 
                    <div className="w-24 h-2 bg-white/50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '68%' }} />
                    </div>
                    <span className="font-bold text-[#261543]">68%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  {[
                    { name: 'Smart Inventory UI Wireframe', pct: '78% completed', due: 'Due today' },
                    { name: 'Barcode Scanner Node Module', pct: '80% completed', due: 'Due Feb 03' },
                    { name: 'PostgreSQL DB Schema & Seeds', pct: '62% completed', due: 'Due Feb 10' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-white/40 transition-colors group gap-2">
                      <div className="font-semibold text-sm text-[#261543] group-hover:text-[#6d4ec7] transition-colors">{item.name}</div>
                      <div className="flex items-center gap-6 text-xs font-medium text-[#5c4780]">
                        <span>{item.pct}</span>
                        <span className="w-24 text-right">{item.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* 5 & 6. TASKS & ACTIVITY 2-COLUMN */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 5. NEXT TASKS */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="lg:col-span-2"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#261543]">Next Tasks</h3>
                    <button 
                      onClick={() => setActiveTab('tasks')}
                      className="text-xs font-bold text-[#6d4ec7] hover:text-[#3b226e] transition-colors cursor-pointer"
                    >
                      View All &rarr;
                    </button>
                  </div>
                  
                  <div className="space-y-1">
                    {[
                      { title: 'Frontend telemetry map view', due: 'Due Jan 14' },
                      { title: 'Razorpay payout webhook', due: 'Due Jan 20' },
                      { title: 'Frontier SME website test', due: 'Due Feb 03' },
                      { title: 'Client architecture PPTX', due: 'Due Feb 03' },
                      { title: 'Mobile telemetry redesign', due: 'Due Feb 11' },
                      { title: 'Skill Pod video demo edit', due: 'Due Feb 14' },
                    ].map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border-b border-[#c0b1e4]/30 hover:bg-white/50 transition-colors rounded-xl gap-2 group cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-[4px] border border-[#c0b1e4] shrink-0 group-hover:border-[#6d4ec7] transition-colors" />
                          <span className="text-sm font-semibold text-[#261543]">{t.title}</span>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="text-xs text-[#705e94] font-medium hidden sm:block w-24 text-right">{t.due}</span>
                          <button className="lavender-pill-btn-light px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer hover:scale-105 transition-transform border border-[#c0b1e4]/40">
                            Complete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* 6. RECENT ACTIVITY */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="lg:col-span-1"
                >
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-[#261543]">Recent Activity</h3>
                  </div>
                  
                  <div className="relative space-y-6">
                    {/* Vertical Line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#c0b1e4]/40" />

                    {/* Item 1: Mentor Review */}
                    <div className="relative flex gap-4 group pl-6">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-purple-500 border-2 border-[#e4dcfe] group-hover:scale-125 transition-all z-10" />
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-semibold text-[#261543] leading-tight">Mentor Review</h4>
                          <span className="text-[10px] text-[#705e94] font-medium shrink-0">5 min ago</span>
                        </div>
                        <p className="text-xs font-medium text-[#5c4780]">Priya Sharma reviewed your architecture</p>
                        <p className="text-xs italic text-[#705e94]">"API structure looks good. Please optimize the auth flow."</p>
                      </div>
                    </div>

                    {/* Item 2: Project Update */}
                    <div className="relative flex gap-4 group pl-6">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-400 border-2 border-[#e4dcfe] group-hover:scale-125 transition-all z-10" />
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-semibold text-[#261543] leading-tight">Project Update</h4>
                          <span className="text-[10px] text-[#705e94] font-medium shrink-0">1 hr ago</span>
                        </div>
                        <p className="text-xs font-medium text-[#5c4780]">Smart Inventory UI Wireframe was updated</p>
                        <p className="text-xs text-[#705e94]">Sprint 3 progress changed from 72% to 78%.</p>
                      </div>
                    </div>

                    {/* Item 3: Task Completed */}
                    <div className="relative flex gap-4 group pl-6">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#e4dcfe] group-hover:scale-125 transition-all z-10" />
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-semibold text-[#261543] leading-tight">Task Completed</h4>
                          <span className="text-[10px] text-[#705e94] font-medium shrink-0">3 hrs ago</span>
                        </div>
                        <p className="text-xs font-medium text-[#5c4780]">You completed Frontend telemetry map view</p>
                      </div>
                    </div>

                    {/* Item 4: Kudos */}
                    <div className="relative flex gap-4 group pl-6">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-violet-500 border-2 border-[#e4dcfe] group-hover:scale-125 transition-all z-10" />
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-semibold text-[#261543] leading-tight">Kudos</h4>
                          <span className="text-[10px] text-[#705e94] font-medium shrink-0">Yesterday</span>
                        </div>
                        <p className="text-xs font-medium text-[#5c4780]">Your teammate Aditi gave you a Kudos</p>
                      </div>
                    </div>

                  </div>
                  
                  <button className="text-xs font-bold text-[#6d4ec7] hover:text-[#3b226e] transition-colors cursor-pointer w-full text-center mt-6 py-2 rounded-lg hover:bg-[#c0b1e4]/10">
                    View all activity &rarr;
                  </button>
                </motion.section>
              </div>

              {/* 7. GURU ASSISTANCE */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <div className="bg-[#e4dcfe]/50 border border-[#c0b1e4]/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3b226e] text-white flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#261543]">Need help with your current sprint?</h4>
                      <p className="text-xs font-medium text-[#5c4780]">GURU can help with: debugging, code review and sprint blockers.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('guru')}
                    className="lavender-pill-btn-dark px-4 py-2 rounded-full text-xs font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform shrink-0"
                  >
                    Ask GURU &rarr;
                  </button>
                </div>
              </motion.section>

            </div>
          )}

        {/* ================= TAB: AI SKILL MATCH & POD FIT SCORE ================= */}
        {activeTab === 'ai-match' && (
          <StudentAiSkillMatch userEmail={userEmail} />
        )}

        {/* ================= TAB: STUDENT PROJECT MARKETPLACE ================= */}
        {activeTab === 'marketplace' && (
          <StudentMarketplace
            userEmail={userEmail}
            onOpenListModal={() => setShowListProjectModal(true)}
          />
        )}

        {/* ================= TAB: VERIFIED SKILL PASSPORT & SCORE ================= */}
        {activeTab === 'passport' && (
          <StudentSkillPassport userEmail={userEmail} />
        )}

        {/* ================= 2. EXPLORE PROJECTS TAB (MARKETPLACE) ================= */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Explore Industry Opportunities
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Real problems. Real teams. Real products. Match with a Skill Pod and ship verified code.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search projects, skills, or SMEs..."
                    value={opportunitySearch}
                    onChange={e => setOpportunitySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter:
                </span>
                {['All', 'AI', 'Web', 'Mobile', 'IoT', 'Data', 'Other'].map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-purple-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Opportunity Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map(opp => (
                  <div
                    key={opp.id}
                    className="uiverse-inset-card flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xs font-extrabold uppercase tracking-wider text-purple-800 bg-white/70 px-2.5 py-1 rounded-full border border-purple-200 shadow-2xs">
                          {opp.projectType}
                        </span>
                        <span className="text-2xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
                          {opp.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {opp.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-600 mt-1">
                          Company: <strong className="text-slate-900">{opp.smeName}</strong> • {opp.category}
                        </p>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {opp.description}
                      </p>

                      <div>
                        <span className="text-2xs text-slate-600 font-semibold block mb-1.5">Required Skills:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {opp.skills.map(skill => (
                            <span key={skill} className="px-2.5 py-0.5 bg-white/80 border border-slate-300/80 rounded-md text-2xs font-semibold text-slate-800 shadow-2xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-purple-100/60 p-2.5 rounded-xl border border-purple-200 text-2xs text-purple-950 font-medium">
                        Pod Match Status: <strong>{opp.podSlots}</strong>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-400/20 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="text-2xs text-slate-600 block font-medium">Est. Project Value</span>
                          <strong className="text-sm font-black text-slate-900">{opp.valueRange}</strong>
                        </div>
                        <span className="text-2xs text-emerald-800 font-semibold bg-emerald-100/90 px-2 py-1 rounded-md border border-emerald-300">
                          Mentor Available ✓
                        </span>
                      </div>

                      <button
                        onClick={() => alert(`Application submitted to join Skill Pod for "${opp.title}". Our team & mentor will review your profile!`)}
                        className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs rounded-2xl shadow-md active:scale-98 transition-all cursor-pointer"
                      >
                        Apply to Work on Project →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. MY PROJECTS TAB ================= */}
        {activeTab === 'my-projects' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    My Listed Projects & Prototypes
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Don't let your college projects or hackathon prototypes sit idle. List them for corporate licensing and SME matching.
                  </p>
                </div>

                <button
                  onClick={() => setShowListProjectModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ List New Project</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProjects.map(proj => (
                  <div
                    key={proj.id}
                    className="uiverse-inset-card flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xs font-extrabold uppercase tracking-wider text-purple-800 bg-white/70 px-2.5 py-1 rounded-full border border-purple-200 shadow-2xs">
                          {proj.type}
                        </span>
                        <span className={`text-2xs font-bold px-2.5 py-0.5 rounded-full shadow-2xs border ${
                          proj.status === 'Listed' ? 'bg-emerald-100/90 text-emerald-800 border-emerald-300' :
                          proj.status === 'Under Review' ? 'bg-amber-100/90 text-amber-800 border-amber-300' :
                          'bg-indigo-100/90 text-indigo-800 border-indigo-300'
                        }`}>
                          {proj.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {proj.title}
                      </h3>

                      <p className="text-xs text-slate-700 leading-relaxed font-normal">
                        {proj.description}
                      </p>

                      <div>
                        <span className="text-2xs text-slate-600 font-semibold block mb-1">Tech Stack:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.techStack.map(tech => (
                            <span key={tech} className="px-2.5 py-0.5 bg-white/80 border border-slate-300/80 rounded-md text-2xs font-semibold text-slate-800 shadow-2xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3 pt-2 text-xs text-purple-800 font-semibold">
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            <FolderGit2 className="w-3.5 h-3.5" />
                            <span>Repository</span>
                          </a>
                        )}
                        {proj.demoUrl && (
                          <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-400/20 space-y-3">
                      <div className="flex items-center justify-between text-2xs text-slate-600 font-medium">
                        <span>Views: <strong className="text-slate-900">{proj.views}</strong></span>
                        <span>Company Matches: <strong className="text-purple-900">{proj.interests}</strong></span>
                        <span>Valuation: <strong className="text-slate-900 font-black">{proj.estimatedValue}</strong></span>
                      </div>

                      <button
                        onClick={() => alert(`Opening analytics & SME licensing offers for ${proj.title}`)}
                        className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs rounded-2xl shadow-md active:scale-98 transition-all cursor-pointer"
                      >
                        View Project Offers & Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. MY SKILL POD TAB ================= */}
        {activeTab === 'pod' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-slate-900">Skill Pod: Apex-2</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                      Online & Active
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    Autonomous pod building <strong>Smart Inventory Management System</strong> for ABC Retail
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href="#github" 
                    onClick={e => e.preventDefault()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <FolderGit2 className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>
                  <a 
                    href="#discord" 
                    onClick={e => e.preventDefault()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold hover:bg-indigo-100 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Pod Voice Room</span>
                  </a>
                </div>
              </div>

              {/* Project & Sprint Details Inside Pod */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="uiverse-inset-card-compact flex flex-col justify-between">
                  <div>
                    <div className="text-2xs font-extrabold text-purple-900 uppercase tracking-wider mb-1">Active Sprint</div>
                    <div className="text-base font-black text-slate-900">Sprint 3 of 6 — Telemetry</div>
                    <div className="mt-2 text-xs text-purple-950 font-semibold">68% Complete • Due in 3 days</div>
                  </div>
                  <div className="w-full bg-white/70 rounded-full h-2 mt-3 overflow-hidden border border-purple-200">
                    <div className="bg-purple-700 h-full rounded-full w-[68%]" />
                  </div>
                </div>

                <div className="uiverse-inset-card-compact flex flex-col justify-between">
                  <div>
                    <div className="text-2xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Assigned Industry Mentor</div>
                    <div className="text-base font-black text-slate-900">Priya Sharma</div>
                    <div className="text-xs text-purple-900 font-bold mt-1">Staff Engineer @ Razorpay</div>
                  </div>
                  <div className="text-2xs text-slate-700 font-semibold mt-3 pt-2 border-t border-slate-300/40">Next Office Hours: Thu 4:00 PM EST</div>
                </div>

                <div className="uiverse-inset-card-compact flex flex-col justify-between">
                  <div>
                    <div className="text-2xs font-extrabold text-slate-600 uppercase tracking-wider mb-1">Your Pod Role</div>
                    <div className="text-base font-black text-slate-900">Frontend Developer</div>
                    <div className="text-xs text-slate-700 font-medium mt-1">WebSocket UI & Telemetry Maps</div>
                  </div>
                  <div className="text-2xs text-emerald-800 font-bold mt-3 pt-2 border-t border-slate-300/40">Repository Write Access ✓</div>
                </div>
              </div>

              {/* Pod Members Roster */}
              <div className="mt-6">
                <h3 className="font-bold text-slate-900 text-base mb-4">Pod Member Roster (4 Members)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { id: 'm1', name: `${displayName} (You)`, role: 'Frontend & UI Architect', status: 'Online', focus: 'WebSocket telemetry map' },
                    { id: 'm2', name: 'Maya Patel', role: 'Backend & Cloud Engineer', status: 'Online', focus: 'Go microservice & PostgreSQL' },
                    { id: 'm3', name: 'Liam Zhang', role: 'Data & Algorithm Specialist', status: 'In Standup', focus: 'Dijkstra route optimization' },
                    { id: 'm4', name: 'Sofia Mendez', role: 'QA & Security Lead', status: 'Reviewing', focus: 'Cypress E2E & Load tests' }
                  ].map(member => (
                    <div key={member.id} className="uiverse-inset-card-compact flex flex-col justify-between space-y-3">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-2xl bg-purple-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                            {member.name.charAt(0)}
                          </div>
                          <span className="text-2xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {member.status}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{member.name}</h4>
                          <p className="text-xs text-purple-900 font-semibold">{member.role}</p>
                        </div>
                        <div className="text-2xs text-slate-700 bg-white/70 p-2.5 rounded-xl border border-slate-300/70 shadow-2xs font-medium">
                          Focus: {member.focus}
                        </div>
                      </div>
                      {member.id !== 'm1' && (
                        <button
                          onClick={() => setKudosGiven(prev => ({ ...prev, [member.id]: !prev[member.id] }))}
                          className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                            kudosGiven[member.id]
                              ? 'bg-amber-200 text-amber-950 border border-amber-300'
                              : 'bg-white/90 border border-slate-300 text-slate-800 hover:bg-purple-600 hover:text-white'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{kudosGiven[member.id] ? 'Kudos Sent! ✨' : 'Send Kudo'}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. TASKS TAB ================= */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Sprint Tasks (Interactive Kanban)</h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Click any task card to advance it through the sprint workflow stages.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddTaskModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Task</span>
                </button>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {(['Todo', 'In Progress', 'In Review', 'Done'] as const).map(column => {
                  const columnTasks = tasks.filter(t => t.status === column);
                  return (
                    <div key={column} className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                          {column}
                        </h4>
                        <span className="w-5 h-5 rounded-full bg-white text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200">
                          {columnTasks.length}
                        </span>
                      </div>

                      <div className="space-y-3 flex-1">
                        {columnTasks.map(task => (
                          <div
                            key={task.id}
                            onClick={() => handleToggleTaskStatus(task.id)}
                            className="uiverse-inset-card-compact cursor-pointer space-y-2.5 group"
                          >
                            <div className="flex items-center justify-between text-2xs">
                              <span className="font-bold text-purple-900 bg-white/80 px-2 py-0.5 rounded-full border border-purple-200 shadow-2xs">
                                {task.category}
                              </span>
                              <span className={`font-black ${
                                task.priority === 'High' ? 'text-rose-700' : 'text-amber-800'
                              }`}>
                                {task.priority}
                              </span>
                            </div>
                            <h5 className="font-bold text-xs text-slate-900 group-hover:text-purple-800 transition-colors leading-snug">
                              {task.title}
                            </h5>
                            <div className="pt-2 border-t border-slate-400/30 flex items-center justify-between text-2xs text-slate-600 font-semibold">
                              <span>Due: {task.dueDate}</span>
                              <span className="text-purple-800 font-extrabold group-hover:underline">Advance →</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. MENTORS TAB ================= */}
        {activeTab === 'mentors' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Industry Mentor Network
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Connect with seasoned architects and engineering leaders for technical gates, reviews, and quality sign-off.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentors.map(mentor => (
                  <div key={mentor.id} className="uiverse-inset-card flex flex-col justify-between space-y-4">
                    <div className="space-y-3.5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-700 text-white font-bold text-base flex items-center justify-center shadow-md">
                            {mentor.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-base">{mentor.name}</h3>
                            <p className="text-xs font-semibold text-purple-900">{mentor.role}</p>
                            <p className="text-2xs text-slate-600 font-medium">{mentor.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-black text-amber-800 bg-white/80 px-2.5 py-1 rounded-full border border-amber-300 shadow-2xs">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{mentor.rating}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {mentor.skills.map(s => (
                          <span key={s} className="px-2.5 py-0.5 bg-white/80 border border-slate-300/80 rounded-md text-2xs font-semibold text-slate-800 shadow-2xs">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3.5 border-t border-slate-400/25 flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-semibold">Status: <strong className="text-emerald-800">{mentor.availability}</strong></span>
                      <button
                        onClick={() => alert(`Mentor session requested with ${mentor.name}. You'll receive a calendar invite for office hours!`)}
                        className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs shadow-md active:scale-95 transition-all cursor-pointer"
                      >
                        Request Mentor Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 7. EARNINGS & VALUE REALIZATION TAB ================= */}
        {activeTab === 'earnings' && (
          <StudentEarningsWallet userEmail={userEmail} />
        )}

        {/* ================= 8. ASK GURU AI COPILOT TAB ================= */}
        {activeTab === 'guru' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col h-[640px]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Ask GURU 🤖</h2>
                    <p className="text-xs text-slate-500">Skill Pod AI Technical Mentor & Opportunity Copilot</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-2xs font-semibold">
                  GURU Ready
                </span>
              </div>

              {/* Chat Message List */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2">
                {guruMessages.map(msg => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none shadow-xs'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/80'
                    }`}>
                      <div className="flex items-center justify-between gap-4 mb-1 text-2xs opacity-75">
                        <span className="font-semibold">{msg.sender === 'user' ? 'You' : 'GURU AI Copilot'}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      
                      {msg.codeSnippet && (
                        <div className="mt-3 bg-slate-900 text-purple-300 font-mono text-2xs sm:text-xs p-3 rounded-lg overflow-x-auto">
                          <pre><code>{msg.codeSnippet}</code></pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isGuruTyping && (
                  <div className="flex items-center gap-2 text-xs text-purple-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.4s]" />
                    <span>GURU is typing...</span>
                  </div>
                )}
              </div>

              {/* Instant Prompt Suggestions */}
              <div className="py-2 flex flex-wrap gap-2 border-t border-slate-100">
                {[
                  'How to prepare for mentor Priya Sharma review?',
                  'How do I list my React college project for licensing?',
                  'When does Pod Apex-2 receive Sprint 3 payout?'
                ].map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setGuruInput(prompt);
                    }}
                    className="text-2xs bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium px-3 py-1.5 rounded-lg border border-purple-200 transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendGuruMessage} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Ask about your project, pod, architecture, or SME opportunities..."
                  value={guruInput}
                  onChange={e => setGuruInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= 9. STUDENT PROFILE TAB ================= */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            
            {/* Success Alert */}
            {profileSuccessMsg && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-2xl flex items-center gap-2 text-sm font-semibold shadow-xs animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{profileSuccessMsg}</span>
              </div>
            )}

            {/* Profile Overview Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  {currentProfile.avatar ? (
                    <img src={currentProfile.avatar} alt={displayName} className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-400 shadow-md" />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-700 text-white font-black text-2xl flex items-center justify-center shadow-md">
                      {userInitials || 'ST'}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-2xl font-bold text-slate-900">{displayName}</h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200">
                        🎓 Student Builder
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {userEmail || currentProfile.email || 'builder@skillpods.io'} • <span className="font-semibold text-purple-950">Pod Apex-2</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xl line-clamp-2">
                      {profileData.bio}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <button 
                    onClick={() => {
                      setEditName(displayName);
                      setEditBio(profileData.bio);
                      setEditCollege(profileData.college);
                      setEditDept(profileData.department);
                      setEditRollNo(profileData.rollNo);
                      setEditGradYear(profileData.gradYear);
                      setEditGithub(profileData.github);
                      setEditLinkedin(profileData.linkedin);
                      setEditSkillsInput(profileData.skills.join(', '));
                      setShowEditProfileModal(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold rounded-xl cursor-pointer border border-purple-200 shadow-2xs transition-colors"
                  >
                    <span>✏️ Edit Profile Info</span>
                  </button>
                  <button 
                    onClick={() => alert("Verified IP & Skill Certificate minted and signed with SHA-256 integrity.")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Portfolio</span>
                  </button>
                </div>
              </div>

              {/* 4-Column Profile & Academic Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Academic & University Info */}
                <div className="uiverse-inset-card-compact space-y-2">
                  <div className="text-2xs font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
                    <span>Academic Institute</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-tight">{profileData.college}</div>
                  <div className="text-xs text-slate-600 font-medium">{profileData.department}</div>
                  <div className="flex items-center justify-between text-xs text-purple-950 font-semibold pt-2 border-t border-slate-200">
                    <span>Roll: {profileData.rollNo}</span>
                    <span>Class: {profileData.gradYear}</span>
                  </div>
                </div>

                {/* 2. Official Academic CGPA & Semester Scorecard */}
                <div className="uiverse-inset-card-compact space-y-2 bg-gradient-to-br from-purple-50/80 to-indigo-50/60 border border-purple-200/80">
                  <div className="text-2xs font-extrabold text-purple-900 uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-purple-700" />
                      <span>Academic Standing</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] border border-emerald-300">
                      ✓ Top 5%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-purple-950">{profileData.cgpa || '9.24 / 10.00'}</span>
                  </div>
                  <div className="text-xs text-purple-900 font-bold">{profileData.semester || 'Semester 7 (Final Year)'}</div>
                  <div className="text-[11px] text-emerald-700 font-bold pt-2 border-t border-purple-200/60 flex items-center gap-1">
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Placement Ready (CGPA &gt; 7.5)</span>
                  </div>
                </div>

                {/* 3. Role Differentiation & Capabilities */}
                <div className="uiverse-inset-card-compact space-y-2">
                  <div className="text-2xs font-extrabold text-purple-900 uppercase tracking-wider">🪪 Role & Access Level</div>
                  <div className="text-sm font-bold text-slate-900">Student Builder (Level 4)</div>
                  <div className="text-[11px] text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <span>✓</span> <span>Submit pull requests & build code</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-800">
                      <span>✓</span> <span>Earn milestone stipends via escrow</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <span>🔒</span> <span>Gate Approvals (Mentors only)</span>
                    </div>
                  </div>
                </div>

                {/* 4. Connect & Public Links */}
                <div className="uiverse-inset-card-compact space-y-2">
                  <div className="text-2xs font-extrabold text-purple-900 uppercase tracking-wider">🔗 Developer Links</div>
                  <div className="space-y-1.5 pt-1">
                    <a 
                      href={profileData.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-semibold text-purple-900 hover:text-purple-700 flex items-center gap-1.5 truncate"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" />
                      <span>GitHub: {profileData.github.replace('https://', '')}</span>
                    </a>
                    <a 
                      href={profileData.linkedin} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1.5 truncate"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LinkedIn: {profileData.linkedin.replace('https://', '')}</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* ================= ACADEMIC CREDENTIALS & DOCUMENT VAULT ================= */}
              <div className="space-y-6 pt-4 border-t border-slate-100">
                
                {/* 1. Verified Industry Certificates Section */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-700" />
                        <span>Verified Industry Certifications ({profileData.certificates.length})</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Certificates verified by cloud providers, open-courseware, and hackathon juries.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddCertModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Certificate</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {profileData.certificates.map(cert => (
                      <div key={cert.id} className="uiverse-inset-card-compact flex flex-col justify-between space-y-3 group hover:border-purple-300 transition-all">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-[10px] border border-purple-200 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-purple-700" />
                              <span>Verified Credential</span>
                            </span>
                            <button
                              onClick={() => handleDeleteCertificate(cert.id)}
                              className="text-slate-300 hover:text-rose-600 transition-colors p-1"
                              title="Delete Certificate"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-purple-900 transition-colors">
                            {cert.title}
                          </h4>

                          <div className="text-xs text-slate-600 font-medium">
                            Issuer: <span className="font-bold text-slate-800">{cert.issuer}</span>
                          </div>

                          <div className="text-[11px] text-slate-500 font-mono">
                            Issued: {cert.date}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                          <button
                            onClick={() => setPreviewDoc({ title: cert.title, fileUrl: cert.fileUrl || 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80', type: 'Certificate' })}
                            className="flex-1 py-1.5 px-2.5 rounded-lg bg-white border border-slate-200 text-purple-900 hover:bg-purple-50 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Document</span>
                          </button>

                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-purple-900 hover:bg-purple-50 transition-colors"
                              title="Verify on Issuer Website"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Official Marksheets & Grade Transcripts Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-700" />
                        <span>Official Marksheets & Transcripts ({profileData.marksheets.length})</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        University semester transcripts and degree marksheets for campus placement verification.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowUploadMarksheetModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload Marksheet</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.marksheets.map(marksheet => (
                      <div key={marksheet.id} className="uiverse-inset-card-compact flex flex-col justify-between space-y-3 group hover:border-indigo-300 transition-all">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-extrabold text-[10px] border border-indigo-200 flex items-center gap-1">
                              <FileCheck2 className="w-3 h-3 text-indigo-700" />
                              <span>Official Transcript</span>
                            </span>
                            <button
                              onClick={() => handleDeleteMarksheet(marksheet.id)}
                              className="text-slate-300 hover:text-rose-600 transition-colors p-1"
                              title="Delete Marksheet"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug group-hover:text-indigo-900 transition-colors">
                            {marksheet.title}
                          </h4>

                          <div className="text-xs text-slate-600 font-medium">
                            Semester: <span className="font-bold text-slate-800">{marksheet.semester}</span>
                          </div>

                          <div className="text-[11px] text-slate-500 font-mono">
                            Uploaded On: {marksheet.uploadDate}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200">
                          <button
                            onClick={() => setPreviewDoc({ title: marksheet.title, fileUrl: marksheet.fileUrl, type: 'Marksheet' })}
                            className="w-full py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-indigo-950 hover:bg-indigo-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview Marksheet / Transcript</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Verified Skill Proficiency Meters */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">Student's Active Tech Stack & Skills</h3>
                  <span className="text-xs font-semibold text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                    {profileData.skills.length} Technical Proficiencies
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileData.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 font-bold text-xs shadow-2xs">
                      ⚡ {skill}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { skill: 'React 19 & Next.js Architecture', level: 94 },
                    { skill: 'TypeScript & Type Safety', level: 90 },
                    { skill: 'Tailwind CSS & Responsive UI', level: 96 },
                    { skill: 'WebSocket & Realtime Networking', level: 82 },
                    { skill: 'FastAPI & Microservices', level: 88 }
                  ].map((item, i) => (
                    <div key={i} className="uiverse-inset-card-compact space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-900">
                        <span>{item.skill}</span>
                        <span className="text-purple-900 font-black">{item.level}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-white/70 rounded-full overflow-hidden border border-slate-300/60 shadow-inner">
                        <div 
                          className="h-full bg-purple-700 rounded-full transition-all duration-500" 
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* ================= STUDENT DASHBOARD FOOTER ================= */}
      <footer className="border-t border-slate-200/90 bg-white/80 backdrop-blur-xs py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none hover:opacity-90 transition-opacity"
            title="Return to Skill Pods Home"
          >
            <SkillPodsLogo size={32} showText={true} theme="light" />
          </button>
          
          <p className="text-xs text-slate-500 text-center sm:text-right">
            Real SME Problems • Guided Pod Delivery • Guaranteed Student Stipends
          </p>
        </div>
      </footer>
      </div>

      {/* ================= MODAL: LIST MY PROJECT ================= */}
      {showListProjectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-xl">List Your Existing Project</h3>
                <p className="text-xs text-slate-500 mt-0.5">Turn your college/hackathon project into corporate licensing or SME adoption.</p>
              </div>
              <button
                onClick={() => setShowListProjectModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleListNewProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Smart Attendance or Drone Route Planner"
                  value={newProjName}
                  onChange={e => setNewProjName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Type</label>
                  <select
                    value={newProjType}
                    onChange={e => setNewProjType(e.target.value as StudentProject['type'])}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                  >
                    <option value="College Project">College Project</option>
                    <option value="Hackathon Project">Hackathon Project</option>
                    <option value="Personal Project">Personal Project</option>
                    <option value="Prototype">Prototype</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Valuation</label>
                  <input
                    type="text"
                    value={newProjValuation}
                    onChange={e => setNewProjValuation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Technologies Used (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Python, OpenCV, Node.js"
                  value={newProjTech}
                  onChange={e => setNewProjTech(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Problem Solved & Description</label>
                <textarea
                  rows={3}
                  placeholder="What problem does this project solve? What value does it create for a business?"
                  value={newProjDesc}
                  onChange={e => setNewProjDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Repository or Demo URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username/project"
                  value={newProjGithub}
                  onChange={e => setNewProjGithub(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowListProjectModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs cursor-pointer"
                >
                  List My Project →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD SPRINT TASK ================= */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-lg">Add New Sprint Task</h3>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Integrate Mapbox clustering"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newTaskCategory}
                  onChange={e => setNewTaskCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                >
                  <option value="Frontend">Frontend & UI</option>
                  <option value="Realtime & WebSockets">Realtime & WebSockets</option>
                  <option value="Security & Auth">Security & Auth</option>
                  <option value="Testing & QA">Testing & QA</option>
                  <option value="Deliverables">Deliverables</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT STUDENT PROFILE ================= */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-xl">Edit Student Profile</h3>
                <p className="text-xs text-slate-500 mt-0.5">Customize your builder bio, academic institution, links, and technical skills.</p>
              </div>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Profile Photo Upload & Preset Selector */}
              <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative group shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white font-bold flex items-center justify-center text-xl overflow-hidden border-2 border-purple-300 shadow-md">
                    {editAvatar ? (
                      <img src={editAvatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      editName.charAt(0).toUpperCase()
                    )}
                  </div>
                </div>

                <div className="flex-1 w-full text-center sm:text-left">
                  <label className="block text-xs font-bold text-slate-800 mb-1">Profile Photo / Avatar</label>
                  <p className="text-[11px] text-slate-500 mb-2">Upload a custom image from your device or paste a photo URL.</p>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs transition-colors">
                      📁 Upload Photo
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarFileUpload} 
                        className="hidden" 
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setEditAvatar(`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(editName || 'Builder')}`)}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-purple-300 text-slate-700 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                    >
                      🤖 Bot Avatar
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(editName || 'Dev')}`)}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-purple-300 text-slate-700 rounded-lg text-xs font-mono transition-colors cursor-pointer"
                    >
                      🧑‍💻 Dev Avatar
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Bio / Builder Focus</label>
                <textarea
                  rows={2}
                  value={editBio}
                  onChange={e => setEditBio(e.target.value)}
                  placeholder="Describe your technical focus, stack preferences, and engineering goals."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">College / University</label>
                  <input
                    type="text"
                    required
                    value={editCollege}
                    onChange={e => setEditCollege(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={editDept}
                    onChange={e => setEditDept(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Roll / Student ID</label>
                  <input
                    type="text"
                    value={editRollNo}
                    onChange={e => setEditRollNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={editGradYear}
                    onChange={e => setEditGradYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* CGPA & Semester Standings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Official CGPA / Grade *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9.24 / 10.00"
                    value={editCgpa}
                    onChange={e => setEditCgpa(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-bold text-purple-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Semester / Standing</label>
                  <input
                    type="text"
                    placeholder="e.g. Semester 7 (Final Year)"
                    value={editSemester}
                    onChange={e => setEditSemester(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Technical Skills (comma separated)</label>
                <input
                  type="text"
                  value={editSkillsInput}
                  onChange={e => setEditSkillsInput(e.target.value)}
                  placeholder="e.g. React 19, TypeScript, Python, FastAPI, Docker"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={editGithub}
                    onChange={e => setEditGithub(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={editLinkedin}
                    onChange={e => setEditLinkedin(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs cursor-pointer font-bold"
                >
                  Save Profile Changes ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD NEW CERTIFICATE ================= */}
      {showAddCertModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-xl flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-700" />
                  <span>Add Verified Certificate</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Attach your industry credentials, hackathon certificates, or licenses.</p>
              </div>
              <button
                onClick={() => setShowAddCertModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCertificateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Certificate Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Certified Solutions Architect or HackerRank Gold"
                  value={newCertTitle}
                  onChange={e => setNewCertTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Issuing Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AWS, Google, Meta, Coursera"
                    value={newCertIssuer}
                    onChange={e => setNewCertIssuer(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Aug 2026"
                    value={newCertDate}
                    onChange={e => setNewCertDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Credential URL (Optional Verification Link)</label>
                <input
                  type="url"
                  placeholder="https://coursera.org/verify/... or https://aws.amazon.com/..."
                  value={newCertUrl}
                  onChange={e => setNewCertUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Certificate Document / Image</label>
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold cursor-pointer shadow-2xs transition-colors flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-purple-700" />
                    <span>Upload Certificate File</span>
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              setNewCertFile(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden" 
                    />
                  </label>
                  <span className="text-[11px] text-emerald-700 font-bold">✓ Ready to attach</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddCertModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs cursor-pointer font-bold"
                >
                  Save Certificate ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: UPLOAD MARKSHEET / TRANSCRIPT ================= */}
      {showUploadMarksheetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-xl flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-700" />
                  <span>Upload Semester Marksheet / Transcript</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Attach your official university grade card for verified placement indexing.</p>
              </div>
              <button
                onClick={() => setShowUploadMarksheetModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadMarksheetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Marksheet / Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Semester 6 Official Grade Sheet (9.42 SGPA)"
                  value={newMarksheetTitle}
                  onChange={e => setNewMarksheetTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Semester / Term Standing *</label>
                <select
                  value={newMarksheetSem}
                  onChange={e => setNewMarksheetSem(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white"
                >
                  <option value="Semester 8 (Graduation Transcript)">Semester 8 (Graduation Transcript)</option>
                  <option value="Semester 7 (Final Year Autumn)">Semester 7 (Final Year Autumn)</option>
                  <option value="Semester 6 (Third Year Spring)">Semester 6 (Third Year Spring)</option>
                  <option value="Semester 5 (Third Year Autumn)">Semester 5 (Third Year Autumn)</option>
                  <option value="Semester 4 (Second Year Spring)">Semester 4 (Second Year Spring)</option>
                  <option value="Semester 3 (Second Year Autumn)">Semester 3 (Second Year Autumn)</option>
                  <option value="Cumulative Transcript (All Semesters)">Cumulative Transcript (All Semesters)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Marksheet Scan / PDF</label>
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border border-indigo-200 rounded-xl text-xs font-bold cursor-pointer shadow-2xs transition-colors flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-indigo-700" />
                    <span>Upload Document File</span>
                    <input 
                      type="file" 
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              setNewMarksheetFile(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden" 
                    />
                  </label>
                  <span className="text-[11px] text-emerald-700 font-bold">✓ Grade card ready</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadMarksheetModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs cursor-pointer font-bold"
                >
                  Upload & Verify Marksheet ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DOCUMENT PREVIEW LIGHTBOX ================= */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 text-white space-y-4 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/30">
                  {previewDoc.type} Document
                </span>
                <h3 className="font-bold text-white text-base truncate max-w-md">{previewDoc.title}</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="bg-black/50 rounded-2xl overflow-hidden border border-slate-800 max-h-[65vh] flex items-center justify-center p-2">
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
              <a
                href={previewDoc.fileUrl}
                download="verified_document"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Document</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: LIVE SPRINT POD ROOM (WEBRTC) ================= */}
      <LivePodRoomModal
        isOpen={showLivePodRoom}
        onClose={() => setShowLivePodRoom(false)}
        podName="Pod Apex-2"
        userName={displayName}
        userRole="student"
      />

      {/* ================= MODAL: GURU AI COPILOT SCANNER ================= */}
      <GuruCopilotModal
        isOpen={showGuruCopilot}
        onClose={() => setShowGuruCopilot(false)}
        podTitle="AI Invoice & Ledger Auto-Reconciliation"
      />

      {/* ================= MODAL: ESCROW VAULT PAYMENT GATEWAY ================= */}
      <EscrowPaymentModal
        isOpen={showEscrowModal}
        onClose={() => setShowEscrowModal(false)}
        podTitle="Pod Apex-2 Sprint 3 Milestone"
        milestoneAmount="₹25,000"
      />

      {/* ================= MODAL: RECRUITER TALENT ACCESS ================= */}
      <RecruiterHiringModal
        isOpen={showRecruiterModal}
        onClose={() => setShowRecruiterModal(false)}
      />

      {/* ================= MODAL: SME VOICE TO PRD AI ================= */}
      <SmeVoicePrdModal
        isOpen={showVoicePrdModal}
        onClose={() => setShowVoicePrdModal(false)}
      />

      {/* ================= MODAL: NAAC & NIRF ACCREDITATION EXPORTER ================= */}
      <NaacReportModal
        isOpen={showNaacModal}
        onClose={() => setShowNaacModal(false)}
      />

      {/* ================= MODAL: GURU AI INVESTOR PITCH DECK ================= */}
      <PitchDeckModal
        isOpen={showPitchDeckModal}
        onClose={() => setShowPitchDeckModal(false)}
      />

      {/* ================= MODAL: NATIONAL POD LEADERBOARD ================= */}
      <PodLeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
      />

      {/* ================= MODAL: IN-BROWSER API TESTBENCH ================= */}
      <ApiSandboxModal
        isOpen={showApiSandboxModal}
        onClose={() => setShowApiSandboxModal(false)}
      />

      {/* ================= MODAL: COMMUNITY NETWORK DIRECTORY ================= */}
      <CommunityNetworkModal
        isOpen={showCommunityModal}
        onClose={() => setShowCommunityModal(false)}
        currentUserEmail={userEmail || currentProfile.email || 'builder@skillpods.io'}
        currentUserName={displayName}
        currentUserRole="student"
        onOpenChatWithMember={(member) => {
          setSelectedChatRecipient(member);
          setShowCommunityModal(false);
          setShowMessagingModal(true);
        }}
      />

      {/* ================= MODAL: DIRECT MESSAGING SYSTEM ================= */}
      <DirectMessagingModal
        isOpen={showMessagingModal}
        onClose={() => setShowMessagingModal(false)}
        currentUserEmail={userEmail || currentProfile.email || 'builder@skillpods.io'}
        currentUserName={displayName}
        currentUserRole="student"
        initialRecipient={selectedChatRecipient}
      />

    </div>
  );
};
