import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building,
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Eye,
  MessageSquare,
  Star,
  ExternalLink,
  FolderGit2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  GitFork,
  Copy,
  Check,
  Award,
  ChevronRight,
  Download,
  Flame,
  Zap,
  Clock,
  Briefcase
} from 'lucide-react';
import { MarketplaceProject } from '../types';

interface StudentMarketplaceProps {
  userEmail: string;
  onOpenListModal: () => void;
}

export const StudentMarketplace: React.FC<StudentMarketplaceProps> = ({
  userEmail,
  onOpenListModal
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProjectForInquiries, setSelectedProjectForInquiries] = useState<MarketplaceProject | null>(null);
  const [selectedProjectForUpgrade, setSelectedProjectForUpgrade] = useState<MarketplaceProject | null>(null);
  const [upgradeSuccess, setUpgradeSuccess] = useState<boolean>(false);
  const [acceptedInquiryId, setAcceptedInquiryId] = useState<string | null>(null);

  // Live marketplace data
  const [projects, setProjects] = useState<MarketplaceProject[]>([
    {
      id: "mkt-01",
      title: "DocuQuery AI - Enterprise Multi-Modal RAG Document Search",
      creatorStudent: "Dev Patel",
      studentEmail: "dev.patel@skillpods.io",
      college: "National Institute of Technology",
      category: "AI",
      description: "High-throughput semantic document search with hybrid BM25 + dense embeddings and citation verification. Proven for 500k+ enterprise contracts.",
      techStack: ["FastAPI", "Python", "React 19", "Qdrant", "Docker"],
      monetizationModel: "Commercial License",
      licensePrice: "₹1,15,000 / yr",
      buyoutPrice: "₹4,60,000 full IP",
      views: 342,
      inquiriesCount: 14,
      shortlistedCount: 8,
      offersReceived: 3,
      mentorVerified: true,
      mentorName: "Sarah Chen",
      mentorCompany: "Staff Eng @ Cloudflare",
      verifiedSkills: ["FastAPI", "Vector Search", "Docker", "React 19"],
      liveDemoUrl: "https://demo.docuquery.skillpods.io",
      githubUrl: "https://github.com/skillpods/docuquery-ai",
      rating: 4.9,
      commercialReadinessScore: 94,
      status: "Available",
      upgradeSuggestions: [
        "Upgrade to v2.0 for Kestrel Freight Invoice Pipeline",
        "Add multi-tenant RBAC for enterprise ERPs"
      ],
      inquiries: [
        {
          id: "inq-101",
          companyName: "Kestrel Logistics & Freight",
          contactPerson: "Rajesh Varma (CTO)",
          type: "License",
          message: "Interested in licensing DocuQuery AI for our warehouse customs manifest indexing. Can you deploy on our AWS VPC?",
          offeredAmount: "₹1,15,000 ($1,450)",
          date: "Yesterday"
        },
        {
          id: "inq-102",
          companyName: "AeroPrecision CNC",
          contactPerson: "Vikram Singhania",
          type: "Buyout",
          message: "We want exclusive buyout of the document extraction pipeline for aerospace CAD blueprints.",
          offeredAmount: "₹4,20,000 ($5,200)",
          date: "3 days ago"
        }
      ]
    },
    {
      id: "mkt-02",
      title: "EdgeSensor Mesh & High-Velocity MQTT Gateway",
      creatorStudent: "Elena Rostova",
      studentEmail: "elena.rostova@skillpods.io",
      college: "State College of Engineering",
      category: "IoT",
      description: "Low-latency MQTT sensor ingest broker with automatic backpressure handling and TimescaleDB streaming compression.",
      techStack: ["Go", "TimescaleDB", "MQTT", "WebSockets", "React"],
      monetizationModel: "Full IP Buyout",
      licensePrice: "₹75,000 / deployment",
      buyoutPrice: "₹3,35,000 full IP",
      views: 289,
      inquiriesCount: 11,
      shortlistedCount: 6,
      offersReceived: 2,
      mentorVerified: true,
      mentorName: "Marcus Vance",
      mentorCompany: "Principal Architect @ Datadog",
      verifiedSkills: ["Go", "MQTT", "TimescaleDB", "System Architecture"],
      liveDemoUrl: "https://demo.edgesensor.skillpods.io",
      githubUrl: "https://github.com/skillpods/edgesensor-mesh",
      rating: 4.8,
      commercialReadinessScore: 91,
      status: "Inquiry Received",
      upgradeSuggestions: [
        "Add LoRaWAN gateway support for outdoor cold rooms",
        "Integrate SMS failover alert bridge"
      ],
      inquiries: [
        {
          id: "inq-103",
          companyName: "Verdant Organics Cold Storage",
          contactPerson: "Anita Sharma (Operations Head)",
          type: "Upgrade",
          message: "We want to adopt this project and fund a Pod to upgrade it for our multi-facility cold chain telemetry.",
          offeredAmount: "₹3,20,000 ($4,000) Pilot Grant",
          date: "2 days ago"
        }
      ]
    },
    {
      id: "mkt-03",
      title: "OmniRoute - Dynamic Fleet Dispatch & Geo-Fencing Engine",
      creatorStudent: "Samir Al-Mansoor",
      studentEmail: "samir.mansoor@skillpods.io",
      college: "Institute of Technology & Science",
      category: "Logistics",
      description: "Sub-50ms vehicle routing optimizer with real-time driver telemetry, geo-fenced ETA notifications, and offline fallback.",
      techStack: ["Next.js", "Express", "Redis", "PostGIS", "Tailwind"],
      monetizationModel: "Commercial License",
      licensePrice: "₹1,40,000 / yr",
      buyoutPrice: "₹5,20,000 full IP",
      views: 415,
      inquiriesCount: 18,
      shortlistedCount: 12,
      offersReceived: 4,
      mentorVerified: true,
      mentorName: "David Kim",
      mentorCompany: "VP Eng @ Stripe",
      verifiedSkills: ["Redis", "Distributed Caching", "Geospatial SQL", "Next.js"],
      liveDemoUrl: "https://demo.omniroute.skillpods.io",
      githubUrl: "https://github.com/skillpods/omniroute-dispatch",
      rating: 5.0,
      commercialReadinessScore: 97,
      status: "Licensed",
      upgradeSuggestions: [
        "Multi-depot parcel pooling optimization",
        "EV fleet battery consumption weighting"
      ]
    },
    {
      id: "mkt-04",
      title: "MediScan POS - Optical Prescription & Inventory Tracker",
      creatorStudent: "Maya Lin",
      studentEmail: "maya.lin@skillpods.io",
      college: "University School of Informatics",
      category: "Healthcare",
      description: "Specialized inventory management and optical prescription workflow engine with barcode scanning and supplier invoice sync.",
      techStack: ["React 19", "PostgreSQL", "Node.js", "Tailwind CSS"],
      monetizationModel: "SME Pilot Upgrade",
      licensePrice: "₹88,000 / clinic",
      buyoutPrice: "₹3,10,000 full IP",
      views: 198,
      inquiriesCount: 7,
      shortlistedCount: 4,
      offersReceived: 1,
      mentorVerified: true,
      mentorName: "Julian Thorne",
      mentorCompany: "Staff SRE @ Netflix",
      verifiedSkills: ["PostgreSQL", "React 19", "REST API Design"],
      liveDemoUrl: "https://demo.mediscan.skillpods.io",
      githubUrl: "https://github.com/skillpods/mediscan-pos",
      rating: 4.7,
      commercialReadinessScore: 88,
      status: "Available",
      upgradeSuggestions: [
        "Add lens coating order tracking pipeline",
        "Automated WhatsApp pickup reminders"
      ]
    }
  ]);

  const categories = ['All', 'AI', 'FinTech', 'IoT', 'Logistics', 'Healthcare'];

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeFilter === 'All' || p.category === activeFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreateUpgrade = (project: MarketplaceProject) => {
    setSelectedProjectForUpgrade(project);
    setUpgradeSuccess(false);
  };

  const handleExecuteUpgrade = () => {
    setUpgradeSuccess(true);
    setTimeout(() => {
      setSelectedProjectForUpgrade(null);
      setUpgradeSuccess(false);
    }, 2200);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Metric Badges */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 text-purple-900 text-xs font-bold border border-purple-200 shadow-2xs">
              <Building className="w-3.5 h-3.5 text-purple-700" />
              <span>Student IP & Commercialization Marketplace</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Monetize & Upgrade Student Projects
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              Turn your past capstone, hackathon, and college projects into active revenue streams through Commercial Licensing, Full IP Buyouts, and SME Enterprise v2.0 Upgrades.
            </p>
          </div>

          <button
            onClick={onOpenListModal}
            className="px-6 py-3.5 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white rounded-2xl font-bold text-xs shadow-md active:scale-98 transition-all cursor-pointer flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ List New Project for Licensing</span>
          </button>
        </div>

        {/* Global Marketplace Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-purple-200/50">
          <div className="bg-white/70 p-3.5 rounded-2xl border border-purple-100 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-[#7c6a9b] block">Total Listed Value</span>
            <strong className="text-lg font-black text-[#261543]">₹17,25,000</strong>
            <span className="text-2xs text-emerald-700 font-bold block mt-0.5">Across 4 Active Projects</span>
          </div>
          <div className="bg-white/70 p-3.5 rounded-2xl border border-purple-100 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-[#7c6a9b] block">Total Company Views</span>
            <strong className="text-lg font-black text-[#261543]">1,244 Views</strong>
            <span className="text-2xs text-purple-700 font-bold block mt-0.5">+18% this week</span>
          </div>
          <div className="bg-white/70 p-3.5 rounded-2xl border border-purple-100 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-[#7c6a9b] block">Inquiries Received</span>
            <strong className="text-lg font-black text-[#261543]">50 Inquiries</strong>
            <span className="text-2xs text-indigo-700 font-bold block mt-0.5">From 28 Verified SMEs</span>
          </div>
          <div className="bg-white/70 p-3.5 rounded-2xl border border-purple-100 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-[#7c6a9b] block">Active Buyout Offers</span>
            <strong className="text-lg font-black text-purple-900">10 Offers</strong>
            <span className="text-2xs text-emerald-700 font-bold block mt-0.5">₹8.5L in Escrow Queue</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-[#7c6a9b] mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Domain:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === cat
                  ? 'bg-[#3b226e] text-white shadow-xs'
                  : 'bg-white/70 hover:bg-white text-[#523d77] border border-white/80 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, skills, or stack..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white/80 border border-purple-200/80 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map(proj => (
          <motion.div
            key={proj.id}
            whileHover={{ y: -3 }}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-200/80 shadow-sm flex flex-col justify-between space-y-5 relative overflow-hidden"
          >
            {/* Top Row: Category + Commercial Readiness */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-2xs uppercase tracking-wider">
                    {proj.category}
                  </span>
                  <span className={`text-2xs font-bold px-2.5 py-0.5 rounded-full border ${
                    proj.status === 'Licensed'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : proj.status === 'Inquiry Received'
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-blue-100 text-blue-900 border-blue-300'
                  }`}>
                    {proj.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-emerald-800 text-2xs font-extrabold">
                  <Award className="w-3 h-3 text-emerald-600" />
                  <span>Readiness: {proj.commercialReadinessScore}%</span>
                </div>
              </div>

              {/* Title & Creator */}
              <div>
                <h3 className="text-lg font-black text-[#261543] leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs text-[#5c4780] font-semibold mt-1">
                  Creator: <strong>{proj.creatorStudent}</strong> &bull; {proj.college}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-[#261543] font-medium leading-relaxed">
                {proj.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#7c6a9b]">Tech Stack & Verified Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map(tech => (
                    <span key={tech} className="px-2.5 py-0.5 bg-purple-50 border border-purple-200/70 rounded-md text-2xs font-bold text-purple-900 shadow-2xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mentor Verification Stamp */}
              {proj.mentorVerified && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50/70 border border-purple-200/80 flex items-center justify-between text-2xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
                    <div>
                      <span className="font-bold text-[#261543]">Verified by Mentor {proj.mentorName}</span>
                      <span className="text-[#5c4780] block font-medium">{proj.mentorCompany}</span>
                    </div>
                  </div>
                  <span className="font-black text-purple-900 bg-white px-2 py-0.5 rounded-md border border-purple-200">
                    4.9 ★ Rating
                  </span>
                </div>
              )}

              {/* 📈 Live Interest Analytics Strip */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-around text-center text-xs">
                <div>
                  <div className="text-slate-500 font-semibold text-[10px] uppercase flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" /> Views
                  </div>
                  <strong className="text-slate-900 font-black text-sm">{proj.views}</strong>
                </div>
                <div className="w-px h-6 bg-slate-200" />
                <div>
                  <div className="text-purple-700 font-semibold text-[10px] uppercase flex items-center justify-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Inquiries
                  </div>
                  <strong className="text-purple-900 font-black text-sm">{proj.inquiriesCount}</strong>
                </div>
                <div className="w-px h-6 bg-slate-200" />
                <div>
                  <div className="text-amber-700 font-semibold text-[10px] uppercase flex items-center justify-center gap-1">
                    <Star className="w-3 h-3" /> Shortlisted
                  </div>
                  <strong className="text-amber-900 font-black text-sm">{proj.shortlistedCount}</strong>
                </div>
                <div className="w-px h-6 bg-slate-200" />
                <div>
                  <div className="text-emerald-700 font-semibold text-[10px] uppercase flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3" /> Buyout Offers
                  </div>
                  <strong className="text-emerald-900 font-black text-sm">{proj.offersReceived}</strong>
                </div>
              </div>

              {/* 💰 Monetization Pricing Options */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-200/80">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-purple-900 block">Commercial License</span>
                  <strong className="text-sm font-black text-[#261543] block mt-0.5">{proj.licensePrice}</strong>
                  <span className="text-[9px] text-[#5c4780] font-medium block">Non-exclusive deployment</span>
                </div>
                <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-200/80">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-900 block">Full IP Buyout</span>
                  <strong className="text-sm font-black text-[#261543] block mt-0.5">{proj.buyoutPrice}</strong>
                  <span className="text-[9px] text-[#5c4780] font-medium block">Exclusive IP transfer</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-purple-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs font-semibold text-purple-900">
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Repo</span>
                  </a>
                )}
                {proj.liveDemoUrl && (
                  <a href={proj.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* View Inquiries Button */}
                {proj.inquiries && proj.inquiries.length > 0 && (
                  <button
                    onClick={() => setSelectedProjectForInquiries(proj)}
                    className="px-3.5 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Offers ({proj.inquiries.length})</span>
                  </button>
                )}

                {/* 🔄 Create Enterprise v2.0 Upgrade Button */}
                <button
                  onClick={() => handleCreateUpgrade(proj)}
                  className="px-4 py-2 rounded-xl bg-[#3b226e] hover:bg-[#281549] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-98"
                >
                  <GitFork className="w-3.5 h-3.5 text-purple-300" />
                  <span>Upgrade to v2.0 &rarr;</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= MODAL: INCOMING INQUIRIES & BUYOUT OFFERS ================= */}
      {selectedProjectForInquiries && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-2xs font-extrabold uppercase text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  Inbound Licensing Offers
                </span>
                <h3 className="font-black text-slate-900 text-xl mt-1">{selectedProjectForInquiries.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProjectForInquiries(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {selectedProjectForInquiries.inquiries?.map(inq => (
                <div key={inq.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{inq.companyName}</h4>
                      <p className="text-xs text-slate-500 font-medium">Contact: {inq.contactPerson} &bull; {inq.date}</p>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-900 font-black text-xs">
                      {inq.offeredAmount}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80">
                    "{inq.message}"
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => alert(`Opening negotiation chat room with ${inq.contactPerson} at ${inq.companyName}`)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 cursor-pointer"
                    >
                      Counter / Message
                    </button>
                    <button
                      onClick={() => {
                        setAcceptedInquiryId(inq.id);
                        setTimeout(() => {
                          alert(`Congratulations! You accepted the offer from ${inq.companyName}. Escrow contract generated for ${inq.offeredAmount}.`);
                          setSelectedProjectForInquiries(null);
                        }, 800);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      {acceptedInquiryId === inq.id ? <Check className="w-3.5 h-3.5" /> : null}
                      <span>Accept {inq.type} Offer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: PROJECT REUSE / ENTERPRISE UPGRADE ================= */}
      {selectedProjectForUpgrade && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-2xs font-extrabold uppercase text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  SkillPods Upgrade Engine 🔄
                </span>
                <h3 className="font-black text-slate-900 text-xl mt-1">Create Enterprise v2.0</h3>
              </div>
              <button
                onClick={() => setSelectedProjectForUpgrade(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200">
                <span className="font-bold text-purple-950 block text-xs">Base Project:</span>
                <strong className="text-sm text-slate-900 block">{selectedProjectForUpgrade.title}</strong>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-900 block">Select Matching SME Target Problem Statement:</label>
                <select className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500">
                  <option>Kestrel Freight: Automated PDF & Paper Manifest OCR (₹2.8L Bounty)</option>
                  <option>Verdant Cold Stores: Multi-Zone Telemetry Gateway (₹3.2L Bounty)</option>
                  <option>AeroPrecision CNC: Spindle Maintenance Predictive Engine (₹4.0L Bounty)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-bold text-slate-900 block">Automated Upgrade Spec:</label>
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700">
                  <div className="flex items-center gap-2 text-2xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Fork base React & FastAPI codebase into new enterprise repo</span>
                  </div>
                  <div className="flex items-center gap-2 text-2xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Add multi-tenant PostgreSQL schema migrations & webhook deduplication</span>
                  </div>
                  <div className="flex items-center gap-2 text-2xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Assign Sarah Chen (Staff Eng @ Cloudflare) for Architecture Gate</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProjectForUpgrade(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExecuteUpgrade}
                  className="px-6 py-2.5 text-xs font-bold bg-[#3b226e] hover:bg-[#281549] text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
                >
                  {upgradeSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Enterprise v2.0 Pod Forked! 🚀</span>
                    </>
                  ) : (
                    <>
                      <GitFork className="w-4 h-4 text-purple-300" />
                      <span>Spawn v2.0 Upgrade Pod &rarr;</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
