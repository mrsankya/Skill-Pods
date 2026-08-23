/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkflowSection } from './components/WorkflowSection';
import { InnovationCarousel } from './components/InnovationCarousel';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { BackgroundSparkles } from './components/BackgroundSparkles';

// Modals
import { SubmitProblemModal } from './components/SubmitProblemModal';
import { JoinCohortModal } from './components/JoinCohortModal';
import { PodDetailsModal } from './components/PodDetailsModal';
import { AuthModal } from './components/AuthModal';
import { DocsModal } from './components/DocsModal';
import { AppointmentModal } from './components/AppointmentModal';
import { CommunityNetworkModal } from './components/CommunityNetworkModal';
import { DirectMessagingModal } from './components/DirectMessagingModal';
import { DeveloperPortfolioModal } from './components/DeveloperPortfolioModal';

import { MetricsData, PodData, SmeProblem, LiveEvent, ModalView, PageType, UserRole, LoginIntent, CommunityMember } from './types';
import { LoginPage } from './components/LoginPage';
import { WorkspaceView } from './components/WorkspaceView';
import { StudentDashboard } from './components/StudentDashboard';
import { MentorDashboard } from './components/MentorDashboard';
import { SmeDashboard } from './components/SmeDashboard';
import { CollegeDashboard } from './components/CollegeDashboard';
import { AdminDashboard } from './components/AdminDashboard';

const initialMetrics: MetricsData = {

  uptimeSla: 99.9,
  avgLatencyMs: 50,
  projectsShipped: 4800,
  apiRequestsToday: 10000000,
  activePods: 24,
  activeStudents: 642,
  industryMentors: 118,
  liveSmeProblems: 37,
};

const initialPods: PodData[] = [
  {
    id: "pod-101",
    name: "Pod Apex-2",
    title: "AI Invoice & Ledger Auto-Reconciliation",
    sme: "Kestrel Logistics & Freight",
    stage: 5,
    stageName: "Launch & Scale",
    progress: 98,
    mentor: "Sarah Chen (Staff Eng @ Cloudflare)",
    students: [
      { name: "Dev Patel", role: "Full-Stack Lead" },
      { name: "Maya Lin", role: "Backend / Golang" },
      { name: "Rohan Gupta", role: "AI Pipeline" }
    ],
    techStack: ["React", "FastAPI", "PostgreSQL", "Docker", "Tailwind"],
    latency: "38ms",
    health: "Operational",
    lastCommit: "feat: implemented webhook deduplication and OCR confidence scores",
    updatedAt: new Date().toISOString(),
    demoUrl: "https://demo.kestrel-recon.skillpods.io"
  }
];

export default function App() {
  // Synchronously restore session from localStorage so refresh never logs out
  const getInitialSession = () => {
    try {
      const savedPage = localStorage.getItem('skillpods_page') as PageType | null;
      const savedToken = localStorage.getItem('skillpods_token');
      const savedUserStr = localStorage.getItem('skillpods_user');
      
      let userEmail = 'builder@skillpods.io';
      let userRole: UserRole = 'student';
      
      if (savedUserStr) {
        const parsed = JSON.parse(savedUserStr);
        if (parsed.email) userEmail = parsed.email;
        if (parsed.role) userRole = parsed.role;
      }
      
      if (userEmail.toLowerCase() === 'sanketbhende0@gmail.com') {
        userRole = 'admin';
      }

      // Check direct URL deep links (#profile, #marketplace, #passport, #tasks, #mentors, etc.)
      const currentHash = typeof window !== 'undefined' ? window.location.hash.toLowerCase() : '';
      const isDashboardHash = [
        '#dashboard', '#profile', '#marketplace', '#passport', '#tasks',
        '#mentors', '#earnings', '#guru', '#explore', '#my-projects', '#admin'
      ].includes(currentHash);

      // If user had an active session or opened a dashboard deep link, go to dashboard
      const page: PageType = (isDashboardHash || savedPage === 'dashboard' || (savedToken && savedPage !== 'landing' && savedPage !== 'login')) 
        ? 'dashboard' 
        : (savedPage === 'login' ? 'login' : 'landing');

      return { page, userRole, userEmail };
    } catch {
      return { page: 'landing' as PageType, userRole: 'student' as UserRole, userEmail: 'builder@skillpods.io' };
    }
  };

  const initialSession = getInitialSession();

  const [currentPage, setCurrentPage] = useState<PageType>(initialSession.page);
  const [loginIntent, setLoginIntent] = useState<LoginIntent>('general');
  const [currentRole, setCurrentRole] = useState<UserRole>(initialSession.userRole);
  const [authenticatedUser, setAuthenticatedUser] = useState<string>(initialSession.userEmail);

  const [metrics, setMetrics] = useState<MetricsData>(initialMetrics);
  const [pods, setPods] = useState<PodData[]>(initialPods);
  const [activeModal, setActiveModal] = useState<ModalView>(null);
  const [selectedPod, setSelectedPod] = useState<PodData | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [notification, setNotification] = useState<string | null>(null);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [showMessagingModal, setShowMessagingModal] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [selectedChatRecipient, setSelectedChatRecipient] = useState<CommunityMember | null>(null);

  // Synchronize browser history / URL hash and resume authenticated session
  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.toLowerCase();
      const p = window.location.pathname.toLowerCase();
      if (h === '#login' || p === '/login') {
        setCurrentPage('login');
      } else if (
        h === '#dashboard' || 
        h === '#profile' || 
        h === '#marketplace' || 
        h === '#passport' || 
        h === '#tasks' || 
        h === '#mentors' || 
        h === '#earnings' || 
        h === '#guru' || 
        h === '#explore' || 
        h === '#my-projects' ||
        h === '#admin'
      ) {
        setCurrentPage('dashboard');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);

    // Auto-resume authenticated session from database
    const token = localStorage.getItem('skillpods_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data?.success && data?.user) {
            let roleToUse: UserRole = data.user.role;
            if (data.user.email.toLowerCase() === 'sanketbhende0@gmail.com') roleToUse = 'admin';
            setAuthenticatedUser(data.user.email);
            setCurrentRole(roleToUse);
            localStorage.setItem('skillpods_user', JSON.stringify({ ...data.user, role: roleToUse }));
          }
        })
        .catch(() => {});
    }

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Fetch live metrics from Express backend
  const fetchLiveTelemetry = useCallback(async () => {
    try {
      const metricsRes = await fetch('/api/metrics').then(r => r.ok ? r.json() : null).catch(() => null);
      if (metricsRes?.data) {
        setMetrics(metricsRes.data);
      }
    } catch {
      // fallback
    }
  }, []);

  useEffect(() => {
    fetchLiveTelemetry();
    const interval = setInterval(fetchLiveTelemetry, 5000);
    return () => clearInterval(interval);
  }, [fetchLiveTelemetry]);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'dashboard') {
      localStorage.setItem('skillpods_page', 'dashboard');
      setCurrentPage('dashboard');
      return;
    }
    if (currentPage !== 'landing') {
      localStorage.setItem('skillpods_page', 'landing');
      setCurrentPage('landing');
      setTimeout(() => {
        handleNavigate(sectionId);
      }, 50);
      return;
    }
    setActiveSection(sectionId);
    if (sectionId === 'hero' || sectionId === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'workflow') {
      const el = document.getElementById('workflow-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'pricing') {
      const el = document.getElementById('final-cta-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open the Full-Screen Login Page with intentional context
  const handleOpenLogin = (intent: LoginIntent = 'general') => {
    setLoginIntent(intent);
    localStorage.setItem('skillpods_page', 'login');
    setCurrentPage('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (role: UserRole, email: string) => {
    let finalRole = role;
    if (email.toLowerCase() === 'sanketbhende0@gmail.com') {
      finalRole = 'admin';
    }
    setCurrentRole(finalRole);
    setAuthenticatedUser(email);
    setCurrentPage('dashboard');
    localStorage.setItem('skillpods_page', 'dashboard');
    localStorage.setItem('skillpods_token', localStorage.getItem('skillpods_token') || 'active_token');
    localStorage.setItem('skillpods_user', JSON.stringify({
      email,
      role: finalRole,
      name: email.toLowerCase() === 'sanketbhende0@gmail.com' ? 'Sanket Bhende (SuperAdmin)' : email.split('@')[0]
    }));
    setNotification(`Authenticated as ${email} (${finalRole.toUpperCase()})`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenPodDetails = (pod: PodData) => {
    setSelectedPod(pod);
    setActiveModal('pod-details');
  };

  const handleProblemSubmitted = (newProblem: SmeProblem) => {
    setNotification(`New problem statement submitted: "${newProblem.title}"`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleApplicationSuccess = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Intercept modal actions from landing page that should route to the full-screen Login Page
  const handleModalOrLoginRoute = (modal: ModalView) => {
    if (modal === 'login') {
      handleOpenLogin('general');
    } else if (modal === 'submit-problem') {
      handleOpenLogin('submit-problem');
    } else if (modal === 'join-cohort') {
      handleOpenLogin('join-student');
    } else if (modal === 'appointment') {
      handleOpenLogin('appointment');
    } else {
      setActiveModal(modal);
    }
  };

  const handleBackToHome = () => {
    localStorage.setItem('skillpods_page', 'landing');
    setCurrentPage('landing');
  };

  const handleSwitchWorkspace = () => {
    localStorage.setItem('skillpods_page', 'login');
    setCurrentPage('login');
  };

  // 1. Full-Screen Login Page View
  if (currentPage === 'login') {
    return (
      <LoginPage
        initialIntent={loginIntent}
        onBackToHome={handleBackToHome}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // 2. Full-Screen Workspace Dashboard View
  if (currentPage === 'dashboard') {
    if (currentRole === 'student') {
      return (
        <StudentDashboard
          userEmail={authenticatedUser}
          onSwitchWorkspace={handleSwitchWorkspace}
          onBackToHome={handleBackToHome}
        />
      );
    }
    if (currentRole === 'mentor') {
      return (
        <MentorDashboard
          userEmail={authenticatedUser}
          onSwitchWorkspace={handleSwitchWorkspace}
          onBackToHome={handleBackToHome}
        />
      );
    }
    if (currentRole === 'sme') {
      return (
        <SmeDashboard
          userEmail={authenticatedUser}
          onSwitchWorkspace={handleSwitchWorkspace}
          onBackToHome={handleBackToHome}
        />
      );
    }
    if (currentRole === 'college') {
      return (
        <CollegeDashboard
          userEmail={authenticatedUser}
          onSwitchWorkspace={handleSwitchWorkspace}
          onBackToHome={handleBackToHome}
        />
      );
    }
    if (currentRole === 'admin') {
      return (
        <AdminDashboard
          userEmail={authenticatedUser}
          onSwitchWorkspace={handleSwitchWorkspace}
          onBackToHome={handleBackToHome}
        />
      );
    }
    return (
      <WorkspaceView
        role={currentRole}
        userEmail={authenticatedUser}
        onSwitchWorkspace={handleSwitchWorkspace}
        onBackToHome={handleBackToHome}
      />
    );
  }

  // 3. Primary Landing Page View
  return (
    <div className="min-h-screen bg-[#08070d] text-[#e4e1e7] flex flex-col relative font-sans selection:bg-[#a87ffb]/30 selection:text-[#d0bcff]">
      
      {/* Ambient Light Purple Background Sparkles and Shines */}
      <BackgroundSparkles />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171422] border border-[#a87ffb] text-white px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(168,127,251,0.4)] flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
          <span className="font-mono text-xs">{notification}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onOpenModal={handleModalOrLoginRoute}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCommunity={() => setShowCommunityModal(true)}
        onOpenChat={() => {
          setSelectedChatRecipient(null);
          setShowMessagingModal(true);
        }}
        onOpenPortfolio={() => setShowPortfolioModal(true)}
      />

      {/* Main Long-Form Landing Page */}
      <main className="flex-grow pt-20">
        
        {/* Hero Section with Glowing Purple Arc & Curved Metrics Grid */}
        <HeroSection
          metrics={metrics}
          onOpenModal={handleModalOrLoginRoute}
          onExplorePods={() => handleNavigate('workflow')}
        />

        {/* Workflow Section: From Problem to Product */}
        <WorkflowSection
          pods={pods}
          onSelectPod={handleOpenPodDetails}
        />

        {/* Curved Innovation Carousel: Packed with Innovation */}
        <InnovationCarousel
          onOpenAppointmentModal={() => handleOpenLogin('appointment')}
        />

        {/* Bottom CTA: Your project shouldn't end after the viva */}
        <FinalCtaSection
          onOpenModal={handleModalOrLoginRoute}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenModal={handleModalOrLoginRoute}
        onNavigate={handleNavigate}
        onOpenPortfolio={() => setShowPortfolioModal(true)}
      />

      {/* Interactive Modals (Auxiliary) */}
      <SubmitProblemModal
        isOpen={activeModal === 'submit-problem'}
        onClose={() => setActiveModal(null)}
        onProblemSubmitted={handleProblemSubmitted}
      />

      <JoinCohortModal
        isOpen={activeModal === 'join-cohort'}
        onClose={() => setActiveModal(null)}
        onApplicationSuccess={handleApplicationSuccess}
      />

      <AppointmentModal
        isOpen={activeModal === 'appointment'}
        onClose={() => setActiveModal(null)}
      />

      <PodDetailsModal
        pod={selectedPod}
        onClose={() => {
          setSelectedPod(null);
          if (activeModal === 'pod-details') setActiveModal(null);
        }}
      />

      <DocsModal
        view={activeModal}
        onClose={() => setActiveModal(null)}
      />

      {/* Community Network Directory Modal */}
      <CommunityNetworkModal
        isOpen={showCommunityModal}
        onClose={() => setShowCommunityModal(false)}
        currentUserEmail={authenticatedUser}
        currentUserName={authenticatedUser.split('@')[0]}
        currentUserRole={currentRole}
        onOpenChatWithMember={(member) => {
          setSelectedChatRecipient(member);
          setShowCommunityModal(false);
          setShowMessagingModal(true);
        }}
        onOpenPortfolio={() => setShowPortfolioModal(true)}
      />

      {/* Direct Messaging System Modal */}
      <DirectMessagingModal
        isOpen={showMessagingModal}
        onClose={() => setShowMessagingModal(false)}
        currentUserEmail={authenticatedUser}
        currentUserName={authenticatedUser.split('@')[0]}
        currentUserRole={currentRole}
        initialRecipient={selectedChatRecipient}
      />

      {/* Developer Portfolio Showcase Modal */}
      <DeveloperPortfolioModal
        isOpen={showPortfolioModal}
        onClose={() => setShowPortfolioModal(false)}
        portfolioUrl="https://sanket-portfolio-211.pages.dev/"
      />

    </div>
  );
}

