import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building,
  Search,
  Filter,
  Eye,
  DollarSign,
  Star,
  ExternalLink,
  FolderGit2,
  ShieldCheck,
  Zap,
  ArrowRight,
  GitFork,
  Check,
  CheckCircle2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { MarketplaceProject } from '../types';

interface SmeStudentMarketplaceProps {
  userEmail: string;
}

export const SmeStudentMarketplace: React.FC<SmeStudentMarketplaceProps> = ({
  userEmail
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProjectForInquiry, setSelectedProjectForInquiry] = useState<MarketplaceProject | null>(null);
  const [inquiryType, setInquiryType] = useState<'License' | 'Buyout' | 'Upgrade'>('License');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [offeredAmount, setOfferedAmount] = useState('₹1,15,000');
  const [offerSent, setOfferSent] = useState(false);

  const projects: MarketplaceProject[] = [
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
      licensePrice: "₹1,15,000 ($1,450)",
      buyoutPrice: "₹4,60,000 ($5,800)",
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
      licensePrice: "₹75,000 ($950)",
      buyoutPrice: "₹3,35,000 ($4,200)",
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
      licensePrice: "₹1,40,000 ($1,800)",
      buyoutPrice: "₹5,20,000 ($6,500)",
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
      licensePrice: "₹88,000 ($1,100)",
      buyoutPrice: "₹3,10,000 ($3,900)",
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
  ];

  const categories = ['All', 'AI', 'IoT', 'Logistics', 'Healthcare'];

  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeFilter === 'All' || p.category === activeFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    setOfferSent(true);
    setTimeout(() => {
      setSelectedProjectForInquiry(null);
      setOfferSent(false);
      setInquiryMsg('');
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 text-purple-900 text-xs font-bold border border-purple-200 shadow-2xs">
              <Building className="w-3.5 h-3.5 text-purple-700" />
              <span>SME Student Project Acquisition & Licensing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Pre-Built Verified Student Code & Prototypes
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              Accelerate your time-to-market. Acquire, license, or adopt existing mentor-verified student projects rather than starting development from scratch.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-purple-200/80 shadow-xs flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#261543]">Save 70% Development Time</div>
              <div className="text-2xs text-[#5c4780]">Adopt existing architecture & fund an Upgrade Pod</div>
            </div>
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
            placeholder="Search verified solutions..."
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
            className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-200/80 shadow-sm flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-extrabold text-2xs uppercase tracking-wider">
                    {proj.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-2xs">
                    Mentor Verified ✓
                  </span>
                </div>

                <div className="text-xs font-black text-purple-950 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{proj.rating} ({proj.views} views)</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-[#261543] leading-snug">{proj.title}</h3>
                <p className="text-xs text-[#5c4780] font-semibold mt-0.5">
                  Student Creator: <strong>{proj.creatorStudent}</strong> &bull; {proj.college}
                </p>
              </div>

              <p className="text-xs text-[#261543] font-medium leading-relaxed">
                {proj.description}
              </p>

              {/* Mentor Endorsement Box */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 text-2xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
                  <div>
                    <span className="font-bold text-[#261543]">Verified by {proj.mentorName}</span>
                    <span className="text-[#5c4780] block font-medium">{proj.mentorCompany}</span>
                  </div>
                </div>
                <span className="font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {proj.commercialReadinessScore}% Ready
                </span>
              </div>

              {/* Pricing Breakdown */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-purple-50/60 border border-purple-200">
                  <span className="text-[10px] uppercase font-bold text-purple-900 block">Commercial License</span>
                  <strong className="text-sm font-black text-slate-900 block">{proj.licensePrice}</strong>
                </div>
                <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-200">
                  <span className="text-[10px] uppercase font-bold text-indigo-900 block">Full IP Buyout</span>
                  <strong className="text-sm font-black text-slate-900 block">{proj.buyoutPrice}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-purple-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs font-semibold text-purple-900">
                {proj.liveDemoUrl && (
                  <a href={proj.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Audit Repo</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedProjectForInquiry(proj);
                    setInquiryType('Upgrade');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>Reuse & Upgrade Pod</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedProjectForInquiry(proj);
                    setInquiryType('License');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#3b226e] hover:bg-[#281549] text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  Acquire / License &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= MODAL: SUBMIT ACQUISITION / UPGRADE OFFER ================= */}
      {selectedProjectForInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-2xs font-extrabold uppercase text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  SME Project Acquisition Gate
                </span>
                <h3 className="font-black text-slate-900 text-xl mt-1">{selectedProjectForInquiry.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProjectForInquiry(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendOffer} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-900 block mb-1">Acquisition Model</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'License', label: 'Commercial License' },
                    { id: 'Buyout', label: 'Full IP Buyout' },
                    { id: 'Upgrade', label: 'Fund Upgrade Pod' }
                  ].map(m => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setInquiryType(m.id as any)}
                      className={`py-2 px-2.5 rounded-xl font-bold text-2xs border transition-all cursor-pointer text-center ${
                        inquiryType === m.id
                          ? 'bg-[#3b226e] text-white border-[#3b226e]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Offered Amount / Grant Value</label>
                <input
                  type="text"
                  required
                  value={offeredAmount}
                  onChange={e => setOfferedAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 font-bold border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-900 block mb-1">Message & Customization Requirements</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your company use case, required API customizations, and deployment timeline..."
                  value={inquiryMsg}
                  onChange={e => setInquiryMsg(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-2xs">
                Funds are held securely in SkillPods Escrow and only released upon your final milestone acceptance.
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProjectForInquiry(null)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 font-bold bg-[#3b226e] hover:bg-[#281549] text-white rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
                >
                  {offerSent ? <Check className="w-4 h-4 text-emerald-400" /> : null}
                  <span>{offerSent ? 'Offer Sent to Student & College!' : 'Submit Acquisition Offer'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
