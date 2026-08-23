export interface MetricsData {
  uptimeSla: number;
  avgLatencyMs: number;
  projectsShipped: number;
  apiRequestsToday: number;
  activePods: number;
  activeStudents: number;
  industryMentors: number;
  liveSmeProblems: number;
}

export interface StudentMember {
  name: string;
  role: string;
}

export interface PodData {
  id: string;
  name: string;
  title: string;
  sme: string;
  stage: number;
  stageName: string;
  progress: number;
  mentor: string;
  students: StudentMember[];
  techStack: string[];
  latency: string;
  health: string;
  lastCommit: string;
  updatedAt: string;
  demoUrl?: string;
  matchScore?: number;
  matchReasons?: string[];
  healthAlert?: string;
  milestoneGateStatus?: 'LOCKED' | 'PENDING_REVIEW' | 'APPROVED' | 'CHANGES_REQUESTED';
}

export interface SmeProblem {
  id: string;
  smeName: string;
  industry: string;
  title: string;
  description: string;
  bounty: string;
  status: string;
  skills: string[];
  submittedAt: string;
  recommendedPodId?: string;
  recommendedPodScore?: number;
}

export interface MarketplaceProject {
  id: string;
  title: string;
  creatorStudent: string;
  studentEmail: string;
  college: string;
  category: 'AI' | 'FinTech' | 'Healthcare' | 'Logistics' | 'IoT' | 'Web3' | 'SaaS';
  description: string;
  techStack: string[];
  monetizationModel: 'Commercial License' | 'Full IP Buyout' | 'SME Pilot Upgrade';
  licensePrice: string;
  buyoutPrice: string;
  views: number;
  inquiriesCount: number;
  shortlistedCount: number;
  offersReceived: number;
  mentorVerified: boolean;
  mentorName: string;
  mentorCompany: string;
  verifiedSkills: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  rating: number;
  commercialReadinessScore: number;
  status: 'Available' | 'Inquiry Received' | 'Licensed' | 'Under Upgrade';
  upgradeSuggestions: string[];
  inquiries?: {
    id: string;
    companyName: string;
    contactPerson: string;
    type: 'License' | 'Buyout' | 'Upgrade';
    message: string;
    offeredAmount: string;
    date: string;
  }[];
}

export interface VerifiedSkillPassport {
  id: string;
  studentName: string;
  studentEmail: string;
  rollNo: string;
  department: string;
  college: string;
  placementReadinessScore: number;
  totalContributionScore: number;
  totalLinesOfCode: number;
  totalPullRequests: number;
  codeQualityRating: number;
  signatureHash: string;
  issuedAt: string;
  verifiedSkills: {
    name: string;
    category: string;
    level: 'Expert' | 'Advanced' | 'Intermediate';
    mentorName: string;
    mentorCompany: string;
    mentorAvatar?: string;
    verifiedDate: string;
    projectAttribution: string;
    linesOfCode: number;
    evidenceNotes: string;
    isVerified: boolean;
  }[];
  projectContributions: {
    podName: string;
    projectTitle: string;
    role: string;
    contributionPercentage: number;
    prsMerged: number;
    peerReviewScore: number;
    mentorEndorsement: string;
  }[];
}

export interface MilestoneGateItem {
  id: string;
  podId: string;
  podName: string;
  projectTitle: string;
  sprintNumber: number;
  milestoneTitle: string;
  currentStage: string;
  nextStage: string;
  status: 'LOCKED' | 'PENDING_REVIEW' | 'APPROVED' | 'CHANGES_REQUESTED';
  deliverables: string[];
  testCoverage: string;
  ciCdPassing: boolean;
  mentorNotes?: string;
  changeRequests?: string[];
  submittedAt: string;
  unlockedAt?: string;
}

export interface CollegeIPRegistryItem {
  id: string;
  title: string;
  department: 'CSE' | 'IT' | 'AI & DS' | 'ECE' | 'Mechanical';
  leadStudent: string;
  teamSize: number;
  mentor: string;
  industryPartner?: string;
  status: '✅ Verified' | '💼 Listed on Marketplace' | '📜 Licensed' | '🚀 Commercialized';
  ipCategory: 'Software Copyright' | 'AI Model Architecture' | 'IoT Patent Pending' | 'Open Core SaaS';
  valuationOrGrant: string;
  commercialStatusNote: string;
  lastUpdated: string;
}

export interface DepartmentAnalytics {
  department: string;
  studentCount: number;
  activeInPods: number;
  verifiedProjectsCount: number;
  industryEngagementScore: number;
  placementReadinessScore: number;
  topSkills: string[];
  avgBountyEarned: string;
}

export interface LiveEvent {
  id: number | string;
  text: string;
  time: string;
  type: 'deploy' | 'mentor' | 'perf' | 'sme' | 'pod' | 'marketplace' | 'milestone';
}

export type PageType = 'landing' | 'login' | 'dashboard';

export type UserRole = 'student' | 'sme' | 'mentor' | 'college';

export type LoginIntent = 
  | 'general' 
  | 'submit-problem' 
  | 'join-student' 
  | 'join-mentor' 
  | 'appointment' 
  | 'start-building' 
  | null;

export type ModalView = 
  | null 
  | 'submit-problem' 
  | 'join-cohort' 
  | 'login' 
  | 'pod-details' 
  | 'pricing'
  | 'appointment'
  | 'docs' 
  | 'contact';


