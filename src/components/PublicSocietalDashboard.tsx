import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Landmark,
  MapPin,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Search,
  Filter,
  ArrowRight,
  ArrowLeft,
  Download,
  Building2,
  ExternalLink,
  ThumbsUp,
  Heart,
  Eye,
  Clock,
  Plus,
  HelpCircle,
  AlertCircle,
  Layers,
  FileCheck2,
  Sparkle,
  Bot,
  Mic,
  Camera,
  Video,
  Copy,
  Check,
  Code,
  Cpu,
  FileText,
  Trophy
} from 'lucide-react';
import { ThematicDomain, JharkhandDistrict, SmeProblem } from '../types';
import { SkillPodsLogo } from './SkillPodsLogo';
import { CitizenEasySubmitModal, EasyProblemSubmission } from './CitizenEasySubmitModal';
import { JharkhandDistrictHeatmap } from './JharkhandDistrictHeatmap';
import { CitizenWhatsAppSimulatorModal } from './CitizenWhatsAppSimulatorModal';
import { CsrGrantPledgeModal } from './CsrGrantPledgeModal';
import { PriFieldSignOffModal } from './PriFieldSignOffModal';
import { translations, Language } from '../data/translations';
import sihDataset from '../data/sih_problem_statements.json';

interface PublicSocietalDashboardProps {
  onBackToHome: () => void;
  onOpenSubmitModal: () => void;
  onOpenLogin: () => void;
}

interface PublicChallenge {
  id: string;
  ticketNo: string;
  title: string;
  thematicDomain: ThematicDomain | string;
  district: JharkhandDistrict | string;
  blockVillage: string;
  submitterType: string;
  submitterName: string;
  description: string;
  bounty: string;
  csrPartner: string;
  upvotes: number;
  stage: 1 | 2 | 3 | 4 | 5;
  stageName: 'Submitted' | 'AI Triaged' | 'Pod Assigned' | 'Field Pilot' | 'Deployed & Validated';
  assignedPod?: string;
  university?: string;
  facultyMentor?: string;
  beneficiaries: string;
  evidenceSummary: string;
  submittedDate: string;
  mediaType?: 'voice' | 'video' | 'photo' | 'text' | 'chatbot';
  photos?: string[];
  isNationalSih?: boolean;
  categoryType?: 'Software' | 'Hardware';
  submittedCount?: string;
}

export const PublicSocietalDashboard: React.FC<PublicSocietalDashboardProps> = ({
  onBackToHome,
  onOpenSubmitModal,
  onOpenLogin
}) => {
  // Multi-lingual Language State
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const t = translations[currentLang];

  // Filters & Tabs
  const [activeTabMode, setActiveTabMode] = useState<'ALL' | 'LOCAL_JHARKHAND' | 'SIH_HACKATHON'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'Software' | 'Hardware'>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});
  const [trackTicketInput, setTrackTicketInput] = useState('');
  const [trackedChallenge, setTrackedChallenge] = useState<PublicChallenge | null>(null);
  const [visibleLimit, setVisibleLimit] = useState(24);
  const [isEasySubmitModalOpen, setIsEasySubmitModalOpen] = useState(false);
  const [isHeatmapOpen, setIsHeatmapOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [pledgeTargetChallenge, setPledgeTargetChallenge] = useState<PublicChallenge | null>(null);
  const [priTargetChallenge, setPriTargetChallenge] = useState<PublicChallenge | null>(null);
  const [csrOverrideBounties, setCsrOverrideBounties] = useState<Record<string, { bounty: string; partner: string }>>({});
  const [priValidatedIds, setPriValidatedIds] = useState<Record<string, boolean>>({});
  const [userCreatedChallenges, setUserCreatedChallenges] = useState<PublicChallenge[]>([]);
  const [copiedPsId, setCopiedPsId] = useState<string | null>(null);

  const challengesList: PublicChallenge[] = [
    {
      id: "ch-01",
      ticketNo: "JH-WATER-2026-081",
      title: "Solar IoT Fluoride & Water Contaminant Alert Network",
      thematicDomain: "Water Resources & Sanitation",
      district: "Khunti",
      blockVillage: "Torpa Block (14 Tribal Villages)",
      submitterType: "Gram Panchayat (PRI)",
      submitterName: "Ramesh Munda (Gram Pradhan)",
      description: "Excessive fluoride & heavy metal concentration in hand-pumps causing skeletal fluorosis in children. Solar-powered telemetry sensor with SMS alert to PHC and public village display.",
      bounty: "₹50,000 Pilot Grant",
      csrPartner: "Tata Steel CSR & District Water Mission",
      upvotes: 42,
      stage: 5,
      stageName: "Deployed & Validated",
      assignedPod: "Jal-Rakshak Pod (3 Students)",
      university: "IIT (ISM) Dhanbad / Env Eng",
      facultyMentor: "Dr. Rajeshwar Soren",
      beneficiaries: "6,200+ villagers across 14 hamlets",
      evidenceSummary: "14 water test lab reports & GPS coordinates",
      submittedDate: "Aug 12, 2026"
    },
    {
      id: "ch-02",
      ticketNo: "JH-AGRI-2026-114",
      title: "Minor Forest Produce (Lac & Millets) Traceability & Fair Price Portal",
      thematicDomain: "Rural Livelihoods & Tribal Development",
      district: "Dumka",
      blockVillage: "Santhal Pargana Forest Belt",
      submitterType: "Tribal Cooperative / SHG",
      submitterName: "Kavita Marandi (SHG Coordinator)",
      description: "Middlemen underpay tribal collectors by 45% for raw lac and finger millets. Decentralized ledger with digital Bluetooth weigh-scale API and instant direct bank transfer.",
      bounty: "₹65,000 Govt Grant",
      csrPartner: "JSLPS & Ministry of Tribal Affairs",
      upvotes: 68,
      stage: 4,
      stageName: "Field Pilot",
      assignedPod: "Aranya Livelihoods Pod (3 Students)",
      university: "Birsa Agricultural University",
      facultyMentor: "Prof. Sunil Besra",
      beneficiaries: "850+ tribal women collectors",
      evidenceSummary: "Mandi price receipts & cooperative roster",
      submittedDate: "Aug 20, 2026"
    },
    {
      id: "ch-03",
      ticketNo: "JH-HEALTH-2026-049",
      title: "Rural Mobile Telemedicine & Vaccine Cold-Chain LoRa Tracker",
      thematicDomain: "Healthcare & Telemedicine",
      district: "Palamu",
      blockVillage: "Daltonganj Sub-Divisional PHCs",
      submitterType: "Govt Department",
      submitterName: "District Health Officer (DHO)",
      description: "Vaccine spoilage in remote health sub-centers during frequent monsoon power outages. IoT temperature sensor pack with automated emergency SMS dispatch and telemedicine triage.",
      bounty: "₹55,000 Pilot Grant",
      csrPartner: "Coal India CSR & National Health Mission",
      upvotes: 35,
      stage: 4,
      stageName: "Field Pilot",
      assignedPod: "Swasthya Tech Pod (3 Students)",
      university: "AIIMS Deoghar / BIT Mesra",
      facultyMentor: "Dr. Arvind Sinha",
      beneficiaries: "22 remote Sub-Health Centers",
      evidenceSummary: "Temperature logs & immunization schedules",
      submittedDate: "Aug 24, 2026"
    },
    {
      id: "ch-04",
      ticketNo: "JH-ENERGY-2026-092",
      title: "Decentralized Solar Micro-Grid Battery Telemetry & Load Balancer",
      thematicDomain: "Renewable Energy & Rural Electrification",
      district: "Latehar",
      blockVillage: "Mahuadanr Forest Settlements",
      submitterType: "Individual Citizen",
      submitterName: "Sunita Oram (Community Youth)",
      description: "Off-grid village solar systems frequently experience inverter failure due to uncontrolled peak load during agricultural water pumping. Micro-controller based automatic load shedder.",
      bounty: "₹45,000 Pilot Grant",
      csrPartner: "NTPC CSR & JREDA",
      upvotes: 29,
      stage: 3,
      stageName: "Pod Assigned",
      assignedPod: "Urja Pod (3 Students)",
      university: "BIT Mesra / Electrical Eng",
      facultyMentor: "Dr. S. K. Mahato",
      beneficiaries: "350 off-grid households",
      evidenceSummary: "Photos of burned inverters & power logs",
      submittedDate: "Aug 28, 2026"
    },
    {
      id: "ch-05",
      ticketNo: "JH-ENV-2026-103",
      title: "Drone Edge-AI Forest Fire Early Warning in Sal Tree Canopy",
      thematicDomain: "Environment & Forestry",
      district: "Hazaribagh",
      blockVillage: "National Park Buffer Corridor",
      submitterType: "Forest Committee",
      submitterName: "Hazaribagh Joint Forest Management",
      description: "Summer forest fires destroy thousands of hectares of flora and medicinal plants before rangers detect them. Autonomous lightweight thermal UAV sensor mesh sending real-time coordinates.",
      bounty: "₹70,000 Govt Grant",
      csrPartner: "BCCL Environmental Fund",
      upvotes: 54,
      stage: 3,
      stageName: "Pod Assigned",
      assignedPod: "Eco-Aero Pod (3 Students)",
      university: "NIT Jamshedpur / Drone Lab",
      facultyMentor: "Dr. R. P. Singh",
      beneficiaries: "12,000 hectares of dense sal forest",
      evidenceSummary: "Satellite burn scar data & ranger reports",
      submittedDate: "Sep 01, 2026"
    },
    {
      id: "ch-06",
      ticketNo: "JH-URBAN-2026-067",
      title: "Automated Municipal Solid Waste Segregation & Plastic Buyback Hub",
      thematicDomain: "Urban Infrastructure & Waste Management",
      district: "Ranchi",
      blockVillage: "Ranchi Municipal Corporation (Ward 18)",
      submitterType: "Urban Local Body (ULB)",
      submitterName: "Ranchi Smart City Council",
      description: "Over 60 tonnes of unsegregated plastic ends up in local landfills daily. Computer-vision optical sorting conveyor unit for dry waste recycling with UPI cashback for sanitation workers.",
      bounty: "₹80,000 CSR Grant",
      csrPartner: "Tata Motors CSR & RMC",
      upvotes: 76,
      stage: 2,
      stageName: "AI Triaged",
      assignedPod: "Forming Student Pod (2/3 Slots Filled)",
      university: "Ranchi University / CS Dept",
      facultyMentor: "Dr. Anita Tirkey",
      beneficiaries: "45,000 urban ward residents",
      evidenceSummary: "Waste audit data & municipal photos",
      submittedDate: "Sep 03, 2026"
    }
  ];

  const handleUpvote = (id: string) => {
    setUpvotedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEasySubmitSuccess = (sub: EasyProblemSubmission) => {
    const newChallenge: PublicChallenge = {
      id: sub.id,
      ticketNo: sub.ticketNo,
      title: sub.title,
      thematicDomain: sub.thematicDomain,
      district: sub.district,
      blockVillage: sub.blockVillage,
      submitterType: sub.submitterType,
      submitterName: sub.submitterName,
      description: sub.description,
      bounty: '₹50,000 Govt/CSR Pilot Grant',
      csrPartner: 'Jharkhand State Innovation Fund',
      upvotes: 1,
      stage: 1,
      stageName: 'Submitted',
      assignedPod: 'AI Triaging for University Pod Match...',
      university: 'State HEI Consortium',
      facultyMentor: 'District Technical Advisor',
      beneficiaries: 'Under Field Survey',
      evidenceSummary: sub.mediaType === 'voice' ? '1 Voice Audio Note (Transcribed)' : sub.mediaType === 'photo' ? `${sub.photoFiles.length} Photos Attached` : sub.mediaType === 'video' ? '1 Video Clip Attached' : 'AI Chatbot Transcript',
      submittedDate: 'Just now',
      mediaType: sub.mediaType,
      photos: sub.photoFiles
    };

    setUserCreatedChallenges(prev => [newChallenge, ...prev]);
    setTrackTicketInput(sub.ticketNo);
    setTrackedChallenge(newChallenge);
  };

  // Convert 231 SIH dataset items into PublicChallenge schema
  const formattedSihList: PublicChallenge[] = sihDataset.map((s: any) => ({
    id: s.id,
    ticketNo: s.ticketNo,
    title: s.title,
    thematicDomain: s.theme || 'Open Innovation',
    district: 'National / All States',
    blockVillage: s.category === 'Software' ? 'Digital Cloud & Web Architecture' : 'Hardware & Embedded IoT Lab',
    submitterType: 'Central Govt / Ministry',
    submitterName: s.title.split(' ')[0] ? s.title.split(' ').slice(0, 4).join(' ') : 'Govt Department',
    description: s.title,
    bounty: '₹1,00,000 SIH Hackathon Prize',
    csrPartner: 'Ministry of Education Innovation Cell (MIC)',
    upvotes: Math.floor(Math.random() * 80) + 12,
    stage: 2,
    stageName: 'AI Triaged',
    assignedPod: 'Open for Student Pods (Hackathon Adoptable)',
    university: 'Any AICTE / UGC Approved HEI',
    facultyMentor: 'Faculty Guide Required',
    beneficiaries: 'Pan-India Societal & Industrial Scale',
    evidenceSummary: `Official Ministry Problem Statement #${s.sno} (${s.submittedCount} submissions nationwide)`,
    submittedDate: 'SIH 2026 Season',
    isNationalSih: true,
    categoryType: s.category as 'Software' | 'Hardware',
    submittedCount: s.submittedCount
  }));

  const allChallenges = [...userCreatedChallenges, ...challengesList, ...formattedSihList].map(c => {
    const csr = csrOverrideBounties[c.id];
    const isPri = priValidatedIds[c.id];
    return {
      ...c,
      bounty: csr ? `${c.bounty} + ${csr.bounty}` : c.bounty,
      csrPartner: csr ? `${csr.partner}` : c.csrPartner,
      stage: isPri ? (5 as 1 | 2 | 3 | 4 | 5) : c.stage,
      stageName: isPri ? ('Deployed & Validated' as const) : c.stageName
    };
  });

  const handleWhatsAppTicketCreated = (ticket: any) => {
    const newChallenge: PublicChallenge = {
      id: ticket.id,
      ticketNo: ticket.ticketNo,
      title: ticket.title,
      thematicDomain: ticket.thematicDomain,
      district: ticket.district,
      blockVillage: ticket.blockVillage,
      submitterType: ticket.submitterType,
      submitterName: ticket.submitterName,
      description: ticket.description,
      bounty: '₹50,000 Govt/CSR Pilot Grant',
      csrPartner: 'Jharkhand State Civic Fund',
      upvotes: 1,
      stage: 1,
      stageName: 'Submitted',
      assignedPod: 'AI Triaging for University Pod Match...',
      university: 'State HEI Consortium',
      facultyMentor: 'District Technical Advisor',
      beneficiaries: 'Panchayat Hamlet',
      evidenceSummary: ticket.mediaType === 'voice' ? 'WhatsApp Voice Audio Transcribed' : 'WhatsApp Text Helpline Message',
      submittedDate: 'Just now'
    };

    setUserCreatedChallenges(prev => [newChallenge, ...prev]);
    setTrackTicketInput(ticket.ticketNo);
    setTrackedChallenge(newChallenge);
    setActiveTabMode('ALL');
  };

  const handlePledgeSuccess = (pledge: {
    companyName: string;
    amount: number;
    formattedAmount: string;
    certificateId: string;
  }) => {
    if (pledgeTargetChallenge) {
      setCsrOverrideBounties(prev => ({
        ...prev,
        [pledgeTargetChallenge.id]: {
          bounty: pledge.formattedAmount,
          partner: `${pledge.companyName} (Escrow Sealed)`
        }
      }));
    }
  };

  const handlePriValidationSuccess = (result: {
    ticketNo: string;
    sarpanchName: string;
    panchayatName: string;
    certificateNumber: string;
  }) => {
    if (priTargetChallenge) {
      setPriValidatedIds(prev => ({
        ...prev,
        [priTargetChallenge.id]: true
      }));
    }
  };

  const handleTrackTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackTicketInput.trim()) return;
    const found = allChallenges.find(c => 
      c.ticketNo.toLowerCase().includes(trackTicketInput.toLowerCase()) ||
      c.district.toLowerCase().includes(trackTicketInput.toLowerCase()) ||
      c.blockVillage.toLowerCase().includes(trackTicketInput.toLowerCase()) ||
      c.title.toLowerCase().includes(trackTicketInput.toLowerCase())
    );
    setTrackedChallenge(found || null);
  };

  const handleCopyPsForHackathon = (ch: PublicChallenge) => {
    const textToCopy = `[Smart India Hackathon 2026 Problem Statement]\nPS Code: ${ch.ticketNo}\nCategory: ${ch.categoryType || 'Software'}\nTheme: ${ch.thematicDomain}\nTitle: ${ch.title}\nAdopted via: SkillPods Open Innovation Portal (http://localhost:3000/#public)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedPsId(ch.id);
    setTimeout(() => setCopiedPsId(null), 2500);
  };

  const handleExportAllHackathonPs = () => {
    const content = allChallenges
      .filter(c => c.isNationalSih)
      .map(c => `PS Code: ${c.ticketNo} | Category: ${c.categoryType} | Theme: ${c.thematicDomain}\nTitle: ${c.title}\n----------------------------------------\n`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SIH2026_Complete_Problem_Statements_Bank_231.txt`;
    a.click();
  };

  const filteredChallenges = allChallenges.filter(item => {
    // Tab Filter
    if (activeTabMode === 'LOCAL_JHARKHAND' && item.isNationalSih) return false;
    if (activeTabMode === 'SIH_HACKATHON' && !item.isNationalSih) return false;

    // Software/Hardware Filter
    if (categoryFilter !== 'ALL' && item.categoryType && item.categoryType !== categoryFilter) {
      return false;
    }

    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.blockVillage.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ticketNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.thematicDomain && item.thematicDomain.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDomain = selectedDomain === 'All' || item.thematicDomain === selectedDomain;
    const matchesDistrict = selectedDistrict === 'All' || item.district === selectedDistrict || item.district === 'National / All States';
    return matchesSearch && matchesDomain && matchesDistrict;
  });

  return (
    <div className="min-h-screen bg-[#08070d] text-white selection:bg-[#d0bcff] selection:text-[#1e1b4b]">
      
      {/* Non-Tech Easy Submit Modal (AI Chatbot, Voice, Photo, Video) */}
      <CitizenEasySubmitModal
        isOpen={isEasySubmitModalOpen}
        onClose={() => setIsEasySubmitModalOpen(false)}
        onSubmitSuccess={handleEasySubmitSuccess}
      />

      {/* WhatsApp & SMS Citizen Simulator Modal */}
      <CitizenWhatsAppSimulatorModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        onTicketCreated={handleWhatsAppTicketCreated}
      />

      {/* CSR Grant Pledge Modal */}
      {pledgeTargetChallenge && (
        <CsrGrantPledgeModal
          isOpen={!!pledgeTargetChallenge}
          onClose={() => setPledgeTargetChallenge(null)}
          challengeTitle={pledgeTargetChallenge.title}
          ticketNo={pledgeTargetChallenge.ticketNo}
          district={pledgeTargetChallenge.district}
          currentBounty={pledgeTargetChallenge.bounty}
          onPledgeSuccess={handlePledgeSuccess}
        />
      )}

      {/* Gram Panchayat (PRI) Validation Modal */}
      {priTargetChallenge && (
        <PriFieldSignOffModal
          isOpen={!!priTargetChallenge}
          onClose={() => setPriTargetChallenge(null)}
          ticketNo={priTargetChallenge.ticketNo}
          challengeTitle={priTargetChallenge.title}
          district={priTargetChallenge.district}
          assignedPod={priTargetChallenge.assignedPod || 'Engineering Student Pod'}
          university={priTargetChallenge.university || 'State University'}
          facultyMentor={priTargetChallenge.facultyMentor || 'District Technical Advisor'}
          onValidationSuccess={handlePriValidationSuccess}
        />
      )}

      {/* Top Navigation Bar - Fully Responsive */}
      <header className="sticky top-0 z-50 bg-[#13111c]/95 backdrop-blur-md border-b border-[#312a45]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-20 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 sm:gap-2 text-[#cbc3d7] hover:text-white p-1.5 sm:p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              title="Back to SkillPods Landing Page"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#d0bcff]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider hidden xs:inline sm:inline">Back</span>
            </button>

            <div className="h-5 sm:h-6 w-px bg-[#312a45]" />

            <div className="flex items-center gap-2 sm:gap-3">
              <SkillPodsLogo size={32} showText={false} />
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-bold text-white text-xs sm:text-base leading-tight">SkillPods Public Portal</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] sm:text-[10px] font-mono font-black">
                    SIH26043
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#a78bfa] font-mono line-clamp-1">
                  Govt of Jharkhand &bull; MIC Open Innovation
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* 24-District GIS Map Button */}
            <button
              onClick={() => setIsHeatmapOpen(prev => !prev)}
              className={`font-mono text-[11px] sm:text-xs font-bold px-3 py-2 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                isHeatmapOpen
                  ? 'bg-indigo-500 text-white border-indigo-400 shadow-md shadow-indigo-500/30'
                  : 'bg-white/5 hover:bg-white/10 text-[#d0bcff] border-[#d0bcff]/30'
              }`}
              title="Toggle 24-District Societal GIS Heatmap"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">24-District</span> Heatmap
            </button>

            {/* WhatsApp Helpline Simulator */}
            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] sm:text-xs font-bold px-3 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
              title="Offline Rural WhatsApp/SMS Helpline (24x7)"
            >
              <span className="text-emerald-400">💬</span>
              <span className="hidden md:inline">WhatsApp</span> Helpline
            </button>

            {/* Language Selector (EN / HI / MR) */}
            <div className="flex items-center p-1 bg-[#1c182b] border border-[#3d3356] rounded-xl text-xs font-mono">
              <button
                type="button"
                onClick={() => setCurrentLang('en')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  currentLang === 'en'
                    ? 'bg-[#d0bcff] text-[#1e1b4b] shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setCurrentLang('hi')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  currentLang === 'hi'
                    ? 'bg-[#d0bcff] text-[#1e1b4b] shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="हिंदी (Hindi)"
              >
                हिन्दी
              </button>
              <button
                type="button"
                onClick={() => setCurrentLang('mr')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  currentLang === 'mr'
                    ? 'bg-[#d0bcff] text-[#1e1b4b] shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="मराठी (Marathi)"
              >
                मराठी
              </button>
            </div>

            <button
              onClick={() => setIsEasySubmitModalOpen(true)}
              className="bg-[#d0bcff] hover:bg-[#c4a9ff] text-[#1e1b4b] font-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(208,188,255,0.3)] hover:scale-105 cursor-pointer flex items-center gap-1.5"
              title="Easy Submit using Voice, Chatbot, Photo or Video"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.quickReport}</span>
            </button>

            <button
              onClick={onOpenSubmitModal}
              className="bg-white/10 hover:bg-white/15 text-[#d0bcff] border border-[#d0bcff]/30 font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all cursor-pointer hidden md:inline-flex"
            >
              {t.formalForm}
            </button>
          </div>
        </div>
      </header>

      {/* Main Public Portal Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-10">
        
        {/* Hero Section - Optimized for Mobile & Desktop */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1a1429] via-[#120f20] to-[#0d0a17] border border-[#d0bcff]/20 p-5 sm:p-10 overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-3 sm:space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-[11px] sm:text-xs font-mono">
              <Landmark className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{t.heroBadge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {t.heroHeadline}
            </h1>

            <p className="text-xs sm:text-base text-[#cbc3d7] leading-relaxed">
              {t.heroDesc}
            </p>

            {/* Live Stats Row - Responsive 2x2 grid on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-2 sm:pt-4">
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] sm:text-2xs font-mono uppercase text-[#a78bfa]">{t.totalChallenges}</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-0.5 sm:mt-1">{allChallenges.length} Loaded</div>
                <div className="text-[10px] sm:text-[11px] text-emerald-400 font-medium">231 SIH + 38 Local</div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] sm:text-2xs font-mono uppercase text-[#a78bfa]">{t.universityPods}</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-0.5 sm:mt-1">14 Deployed</div>
                <div className="text-[10px] sm:text-[11px] text-indigo-300 font-medium">42 Student Builders</div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] sm:text-2xs font-mono uppercase text-[#a78bfa]">{t.csrGrants}</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-400 mt-0.5 sm:mt-1">₹4,85,000</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Tata Steel &amp; Coal India</div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] sm:text-2xs font-mono uppercase text-[#a78bfa]">{t.beneficiaries}</div>
                <div className="text-lg sm:text-2xl font-black text-[#d0bcff] mt-0.5 sm:mt-1">24,000+</div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Across 14 Districts</div>
              </div>
            </div>

            {/* Non-Tech Quick Problem Intake Cards (Chatbot, Voice, Photos, Video) */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#d0bcff] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.quickIntakeTitle}</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  1-Click Upload
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setIsEasySubmitModalOpen(true)}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#d0bcff]/30 hover:border-[#d0bcff] transition-all text-left flex items-center gap-2.5 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 group-hover:bg-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#d0bcff]">AI Chatbot</div>
                    <div className="text-[10px] text-slate-400">Chat karke batayein</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsEasySubmitModalOpen(true)}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#d0bcff]/30 hover:border-[#d0bcff] transition-all text-left flex items-center gap-2.5 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 group-hover:bg-rose-500/30 text-rose-300 flex items-center justify-center shrink-0">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#d0bcff]">Voice Note</div>
                    <div className="text-[10px] text-slate-400">Bolkar record karein</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsEasySubmitModalOpen(true)}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#d0bcff]/30 hover:border-[#d0bcff] transition-all text-left flex items-center gap-2.5 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 group-hover:bg-amber-500/30 text-amber-300 flex items-center justify-center shrink-0">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#d0bcff]">Photos</div>
                    <div className="text-[10px] text-slate-400">Photo kheenchkar bhejein</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsEasySubmitModalOpen(true)}
                  className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-[#d0bcff]/30 hover:border-[#d0bcff] transition-all text-left flex items-center gap-2.5 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 group-hover:bg-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-[#d0bcff]">Video Clip</div>
                    <div className="text-[10px] text-slate-400">Chhota video upload</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsWhatsAppModalOpen(true)}
                  className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 hover:border-emerald-400 transition-all text-left flex items-center gap-2.5 group cursor-pointer col-span-2 sm:col-span-1"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 group-hover:bg-emerald-500/30 text-emerald-300 flex items-center justify-center shrink-0">
                    💬
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300">WhatsApp</div>
                    <div className="text-[10px] text-emerald-300/80">Gramin Bot 24x7</div>
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive 24-District GIS Heatmap (SIH26043 Mandate) */}
        {isHeatmapOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <JharkhandDistrictHeatmap
              selectedDistrict={selectedDistrict}
              onSelectDistrict={(dist) => {
                setSelectedDistrict(dist);
                setActiveTabMode('LOCAL_JHARKHAND');
              }}
              onClose={() => setIsHeatmapOpen(false)}
            />
          </motion.div>
        )}

        {/* Citizen "Track My Issue" Search Widget - Responsive Form */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#171424] border border-[#d0bcff]/20 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-[#d0bcff] uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
              <span>Citizen Tracker: Check Your Submitted Issue</span>
            </div>
            <span className="text-[11px] text-slate-400">Enter Ticket ID, District, or Village</span>
          </div>

          <form onSubmit={handleTrackTicket} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={trackTicketInput}
              onChange={e => setTrackTicketInput(e.target.value)}
              placeholder="e.g. JH-WATER-2026-081 or Torpa or Khunti"
              className="flex-1 bg-[#0f0d18] border border-[#312a45] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d0bcff]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-bold uppercase transition-colors cursor-pointer shrink-0"
            >
              Track Status
            </button>
          </form>

          {trackedChallenge && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 sm:p-4 rounded-xl bg-[#201c30] border border-indigo-500/40 mt-3 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="text-xs font-bold text-white flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-indigo-300">{trackedChallenge.ticketNo}</span>
                  <span>{trackedChallenge.title}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-2xs font-bold font-mono self-start sm:self-auto">
                  Status: {trackedChallenge.stageName}
                </span>
              </div>
              <p className="text-xs text-slate-300">{trackedChallenge.description}</p>
              <div className="text-[11px] text-[#d0bcff] font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 border-t border-white/10">
                <span>Assigned: {trackedChallenge.assignedPod} ({trackedChallenge.university})</span>
                <span>Mentor: {trackedChallenge.facultyMentor}</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Main 3-Tab Filter Bar (All / Local Jharkhand / SIH 2026 Hackathon Bank) */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#312a45]">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => {
                  setActiveTabMode('ALL');
                  setSelectedDomain('All');
                  setVisibleLimit(24);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTabMode === 'ALL'
                    ? 'bg-[#d0bcff] text-[#1e1b4b] shadow-md shadow-[#d0bcff]/20'
                    : 'bg-[#171424] text-[#cbc3d7] hover:bg-[#231f33] border border-[#312a45]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Challenges ({allChallenges.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTabMode('LOCAL_JHARKHAND');
                  setSelectedDomain('All');
                  setVisibleLimit(24);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTabMode === 'LOCAL_JHARKHAND'
                    ? 'bg-emerald-400 text-[#08070d] shadow-md shadow-emerald-400/20'
                    : 'bg-[#171424] text-[#cbc3d7] hover:bg-[#231f33] border border-[#312a45]'
                }`}
              >
                <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                <span>🏛️ Local Jharkhand ({challengesList.length + userCreatedChallenges.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTabMode('SIH_HACKATHON');
                  setSelectedDomain('All');
                  setVisibleLimit(24);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activeTabMode === 'SIH_HACKATHON'
                    ? 'bg-gradient-to-r from-amber-400 to-indigo-400 text-[#08070d] shadow-md shadow-indigo-500/20'
                    : 'bg-[#171424] text-[#cbc3d7] hover:bg-[#231f33] border border-[#312a45]'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>🏆 SIH 2026 Hackathon Bank (231 PS)</span>
              </button>
            </div>

            {/* Quick Export for Hackathon Organizers */}
            <button
              type="button"
              onClick={handleExportAllHackathonPs}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-[#d0bcff]/30 hover:border-[#d0bcff] text-[#d0bcff] text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 self-start sm:self-auto"
              title="Download entire SIH 2026 problem bank as text for your college hackathon"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportForHackathon} (.txt)</span>
            </button>
          </div>

          {/* Software / Hardware Sub-Filter (Especially relevant for Hackathons) */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400 mr-1">Category:</span>
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('ALL');
                  setVisibleLimit(24);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === 'ALL'
                    ? 'bg-[#d0bcff]/20 text-[#d0bcff] border border-[#d0bcff]/40'
                    : 'text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                All Categories
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('Software');
                  setVisibleLimit(24);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  categoryFilter === 'Software'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                <Code className="w-3 h-3" />
                <span>Software (187)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('Hardware');
                  setVisibleLimit(24);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  categoryFilter === 'Hardware'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                <Cpu className="w-3 h-3" />
                <span>Hardware (44)</span>
              </button>
            </div>

            {activeTabMode === 'SIH_HACKATHON' && (
              <span className="text-[11px] font-mono text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-full">
                💡 Perfect for College Hackathons &amp; Capstone Pods
              </span>
            )}
          </div>
        </div>

        {/* Thematic Domains Bar - Horizontal Scroll on Mobile with smooth touch scroll */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#cbc3d7] flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d0bcff]" />
              <span>
                {activeTabMode === 'SIH_HACKATHON'
                  ? '17 National SIH Hackathon Themes'
                  : '10 Thematic Domains (SIH26043 Mandate)'}
              </span>
            </h3>
            <span className="text-[10px] sm:text-2xs font-mono text-slate-400">Scroll &rarr;</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#312a45] scrollbar-track-transparent">
            {(activeTabMode === 'SIH_HACKATHON'
              ? [
                  { label: 'All Themes', value: 'All' },
                  { label: '🎓 Smart Education', value: 'Smart Education' },
                  { label: '🏥 MedTech / HealthTech', value: 'MedTech / BioTech / HealthTech' },
                  { label: '🌾 Agriculture & Rural', value: 'Agriculture, FoodTech & Rural Development' },
                  { label: '🛡️ Blockchain & Cyber', value: 'Blockchain & Cybersecurity' },
                  { label: '🌱 Clean & Green Energy', value: 'Clean & Green Energy' },
                  { label: '🌪️ Disaster Management', value: 'Disaster Management' },
                  { label: '⚡ Smart Automation', value: 'Smart Automation' },
                  { label: '🤖 Robotics & Drones', value: 'Robotics and Drones' },
                  { label: '🚗 Smart Vehicles', value: 'Smart Vehicles' },
                  { label: '🚚 Logistics', value: 'Transportation & Logistics' },
                  { label: '🏛️ Heritage & Culture', value: 'Heritage & Culture' },
                  { label: '✈️ Travel & Tourism', value: 'Travel & Tourism' }
                ]
              : [
                  { label: 'All Domains', value: 'All' },
                  { label: '💧 Water Resources', value: 'Water Resources & Sanitation' },
                  { label: '🌾 Agriculture', value: 'Agriculture & Irrigation' },
                  { label: '🏥 Healthcare', value: 'Healthcare & Telemedicine' },
                  { label: '🌲 Environment', value: 'Environment & Forestry' },
                  { label: '⚡ Clean Energy', value: 'Renewable Energy & Rural Electrification' },
                  { label: '🤝 Tribal Livelihoods', value: 'Rural Livelihoods & Tribal Development' },
                  { label: '🏙️ Urban Infra', value: 'Urban Infrastructure & Waste Management' }
                ]
            ).map((d) => (
              <button
                key={d.value}
                onClick={() => {
                  setSelectedDomain(d.value);
                  setVisibleLimit(24);
                }}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  selectedDomain === d.value
                    ? 'bg-[#d0bcff] text-[#1e1b4b] shadow-md shadow-[#d0bcff]/20'
                    : 'bg-[#171424] text-[#cbc3d7] hover:bg-[#231f33] border border-[#312a45]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter & Search Bar - Full Width on Mobile */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#171424] border border-[#312a45] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setVisibleLimit(24);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#0f0d18] border border-[#312a45] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d0bcff]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-mono text-slate-400 shrink-0">{t.districtLabel}</span>
            <select
              value={selectedDistrict}
              onChange={e => {
                setSelectedDistrict(e.target.value);
                setVisibleLimit(24);
              }}
              className="flex-1 sm:flex-initial bg-[#0f0d18] border border-[#312a45] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none cursor-pointer"
            >
              <option value="All">{t.allDistricts}</option>
              <option value="Khunti">Khunti District</option>
              <option value="Dumka">Dumka District</option>
              <option value="Palamu">Palamu District</option>
              <option value="Latehar">Latehar District</option>
              <option value="Hazaribagh">Hazaribagh District</option>
              <option value="Ranchi">Ranchi District</option>
              <option value="Dhanbad">Dhanbad District</option>
              <option value="National / All States">National / SIH Hackathons</option>
            </select>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="space-y-3.5 sm:space-y-4">
          <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between gap-1 text-xs font-mono">
            <div className="text-slate-400">
              {t.showingChallenges} <strong className="text-white">{filteredChallenges.length}</strong> {activeTabMode === 'SIH_HACKATHON' ? 'SIH 2026 Hackathon Problem Statements' : 'Active Societal Challenges'}
              {filteredChallenges.length > visibleLimit && (
                <span className="text-indigo-300 ml-1.5">
                  (Showing first {visibleLimit})
                </span>
              )}
            </div>
            <div className="text-emerald-400 flex items-center gap-1.5 text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>{t.liveSynced}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredChallenges.slice(0, visibleLimit).map((ch) => {
              const isUpvoted = upvotedIds[ch.id];
              const totalUpvotes = ch.upvotes + (isUpvoted ? 1 : 0);
              const isCopied = copiedPsId === ch.id;

              return (
                <motion.div
                  key={ch.id}
                  whileHover={{ y: -2 }}
                  className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border shadow-sm space-y-3.5 sm:space-y-4 transition-all ${
                    ch.isNationalSih
                      ? 'bg-gradient-to-br from-[#161224] to-[#0f0d1a] border-[#3a3055] hover:border-indigo-400/50'
                      : 'bg-[#141221] border-[#2b243d] hover:border-[#d0bcff]/40'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        {ch.isNationalSih ? (
                          <span className="font-mono text-[10px] sm:text-2xs font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2 sm:px-2.5 py-0.5 rounded-md flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            <span>SIH 2026 National PS</span>
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] sm:text-2xs text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 sm:px-2.5 py-0.5 rounded-md flex items-center gap-1">
                            <Landmark className="w-3 h-3" />
                            <span>Jharkhand Grassroots</span>
                          </span>
                        )}

                        {priValidatedIds[ch.id] && (
                          <span className="font-mono text-[10px] sm:text-2xs font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-400/40 px-2 sm:px-2.5 py-0.5 rounded-md flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>PRI Validated ✓</span>
                          </span>
                        )}

                        <span className="font-mono text-[10px] sm:text-2xs text-[#d0bcff] bg-[#d0bcff]/10 border border-[#d0bcff]/20 px-2 sm:px-2.5 py-0.5 rounded-md font-bold">
                          {ch.ticketNo}
                        </span>

                        {ch.categoryType && (
                          <span className={`text-[10px] sm:text-2xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                            ch.categoryType === 'Software'
                              ? 'text-indigo-300 bg-indigo-500/20 border border-indigo-400/30'
                              : 'text-amber-300 bg-amber-500/20 border border-amber-400/30'
                          }`}>
                            {ch.categoryType === 'Software' ? <Code className="w-3 h-3" /> : <Cpu className="w-3 h-3" />}
                            <span>{ch.categoryType}</span>
                          </span>
                        )}

                        <span className="text-[10px] sm:text-2xs font-bold text-indigo-300 bg-indigo-500/15 border border-indigo-400/20 px-2 sm:px-2.5 py-0.5 rounded-full">
                          {ch.thematicDomain}
                        </span>

                        {ch.district !== 'National / All States' ? (
                          <span className="text-[10px] sm:text-2xs text-slate-300 bg-white/5 border border-white/10 px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-indigo-400 shrink-0" />
                            <span>{ch.district} &bull; {ch.blockVillage}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] sm:text-2xs text-slate-300 bg-white/5 border border-white/10 px-2 sm:px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <span>🇮🇳 Pan-India Challenge</span>
                          </span>
                        )}

                        {ch.submittedCount && (
                          <span className="text-[10px] sm:text-2xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 sm:px-2.5 py-0.5 rounded-full">
                            {ch.submittedCount} Submissions Nationwide
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                        {ch.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#cbc3d7] leading-relaxed max-w-4xl">
                        {ch.description}
                      </p>
                    </div>

                    {/* Action & Upvote Block */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2.5 sm:gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      {ch.isNationalSih ? (
                        <button
                          type="button"
                          onClick={() => handleCopyPsForHackathon(ch)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                            isCopied
                              ? 'bg-emerald-500 text-[#08070d] shadow-emerald-500/30'
                              : 'bg-gradient-to-r from-[#d0bcff] to-[#a78bfa] text-[#1e1b4b] hover:opacity-95'
                          }`}
                          title={t.takeForHackathon}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{isCopied ? t.copied : t.copyPs}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpvote(ch.id)}
                          className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
                            isUpvoted
                              ? 'bg-emerald-500 text-[#08070d] shadow-md shadow-emerald-500/30'
                              : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white'
                          }`}
                          title="Upvote / Corroborate this community challenge"
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current' : ''}`} />
                          <span>{totalUpvotes} {t.upvotes}</span>
                        </button>
                      )}

                      <div className="text-right">
                        <div className="text-[10px] sm:text-2xs font-mono text-[#a78bfa] uppercase">{t.pilotGrant}</div>
                        <div className="text-xs sm:text-sm font-black text-white">{ch.bounty}</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-400 max-w-[160px] truncate">{ch.csrPartner}</div>

                        <div className="flex items-center gap-1.5 mt-2 justify-end flex-wrap">
                          <button
                            type="button"
                            onClick={() => setPledgeTargetChallenge(ch)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                            title="Pledge CSR Pilot Funding into Escrow"
                          >
                            <Building2 className="w-3 h-3" />
                            <span>Pledge CSR</span>
                          </button>

                          {!ch.isNationalSih && (
                            <button
                              type="button"
                              onClick={() => setPriTargetChallenge(ch)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                              title="Issue Gram Panchayat (PRI) Field Completion Seal"
                            >
                              <Landmark className="w-3 h-3" />
                              <span>PRI Seal</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5-Stage LifeCycle Progress Radar (For Local Jharkhand challenges) */}
                  {!ch.isNationalSih && (
                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#0e0c17] border border-[#262035] space-y-2">
                      <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-mono text-slate-400 gap-1 overflow-x-auto">
                        <span className={ch.stage >= 1 ? 'text-indigo-300 font-bold' : ''}>{t.stage1}</span>
                        <span className={ch.stage >= 2 ? 'text-indigo-300 font-bold' : ''}>{t.stage2}</span>
                        <span className={ch.stage >= 3 ? 'text-indigo-300 font-bold' : ''}>{t.stage3}</span>
                        <span className={ch.stage >= 4 ? 'text-indigo-300 font-bold' : ''}>{t.stage4}</span>
                        <span className={ch.stage >= 5 ? 'text-emerald-400 font-bold' : ''}>{t.stage5}</span>
                      </div>

                      <div className="w-full bg-[#1e1a2e] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(ch.stage / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Ground Beneficiary & University Pod Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2 text-xs text-slate-300">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-[#a78bfa] block">{t.submitter}</span>
                      <strong className="text-white text-xs">{ch.submitterName}</strong>
                      <div className="text-[10px] text-slate-400">({ch.submitterType})</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-[#a78bfa] block">{t.assignedPod}</span>
                      <strong className="text-white text-xs">{ch.assignedPod || 'Open for Student Pod Matching'}</strong>
                      <div className="text-[10px] text-indigo-300 line-clamp-1">{ch.university}</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono uppercase text-[#a78bfa] block">{t.communityImpact}</span>
                      <strong className="text-emerald-400 text-xs">{ch.beneficiaries}</strong>
                      <div className="text-[10px] text-slate-400 line-clamp-1">Evidence: {ch.evidenceSummary}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Load More Pagination Bar */}
          {filteredChallenges.length > visibleLimit && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 pb-2">
              <button
                type="button"
                onClick={() => setVisibleLimit(prev => prev + 24)}
                className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-[#d0bcff]/40 text-[#d0bcff] font-mono text-xs font-bold uppercase transition-all cursor-pointer hover:scale-105 shadow-md"
              >
                Load More Problem Statements (+24)
              </button>
              <button
                type="button"
                onClick={() => setVisibleLimit(filteredChallenges.length)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 font-mono text-xs cursor-pointer hover:text-white"
              >
                Show All ({filteredChallenges.length})
              </button>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};
