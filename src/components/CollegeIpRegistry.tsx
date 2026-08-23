import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building,
  ShieldCheck,
  Award,
  DollarSign,
  TrendingUp,
  FileCheck2,
  ExternalLink,
  FolderGit2,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import { CollegeIPRegistryItem } from '../types';

interface CollegeIpRegistryProps {
  userEmail: string;
}

export const CollegeIpRegistry: React.FC<CollegeIpRegistryProps> = ({
  userEmail
}) => {
  const [items, setItems] = useState<CollegeIPRegistryItem[]>([
    {
      id: "ip-01",
      title: "DocuQuery AI - Enterprise Multi-Modal RAG Document Search",
      department: "Computer Science & Engineering",
      studentAuthors: ["Dev Patel (Lead)", "Maya Lin", "Rohan Gupta"],
      mentorSupervisor: "Sarah Chen (Staff Eng @ Cloudflare)",
      ipStatus: "Commercialized",
      commercialValue: "₹1,15,000 ($1,450)",
      licenseeCompany: "Kestrel Freight & Logistics",
      dateRegistered: "Jul 15, 2026",
      techSummary: "High-throughput semantic document search with hybrid BM25 + dense embeddings and citation verification.",
      codeRepository: "https://github.com/skillpods/docuquery-ai"
    },
    {
      id: "ip-02",
      title: "EdgeSensor Mesh & High-Velocity MQTT Gateway",
      department: "Information Technology",
      studentAuthors: ["Elena Rostova (Lead)", "Aarav Sharma"],
      mentorSupervisor: "Marcus Vance (Principal Architect @ Datadog)",
      ipStatus: "Inquiry Received",
      commercialValue: "₹3,35,000 ($4,200)",
      licenseeCompany: "Verdant Cold Stores (Evaluating Buyout)",
      dateRegistered: "Aug 02, 2026",
      techSummary: "Low-latency MQTT sensor ingest broker with automatic backpressure handling and TimescaleDB streaming compression.",
      codeRepository: "https://github.com/skillpods/edgesensor-mesh"
    },
    {
      id: "ip-03",
      title: "OmniRoute - Dynamic Fleet Dispatch & Geo-Fencing Engine",
      department: "Computer Science & Engineering",
      studentAuthors: ["Samir Al-Mansoor (Lead)", "Tanya Sen"],
      mentorSupervisor: "David Kim (VP Eng @ Stripe)",
      ipStatus: "Licensed",
      commercialValue: "₹1,40,000 ($1,800)",
      licenseeCompany: "QuickDrop Delivery",
      dateRegistered: "Jun 28, 2026",
      techSummary: "Sub-50ms vehicle routing optimizer with real-time driver telemetry, geo-fenced ETA notifications, and offline fallback.",
      codeRepository: "https://github.com/skillpods/omniroute-dispatch"
    },
    {
      id: "ip-04",
      title: "CropScan Vision - Autonomous Aerial Crop Disease Classifier",
      department: "AI & Data Science",
      studentAuthors: ["Priya Nair", "Aditya Verma"],
      mentorSupervisor: "Julian Thorne (Staff SRE @ Netflix)",
      ipStatus: "Listed",
      commercialValue: "₹95,000 ($1,200)",
      dateRegistered: "Aug 10, 2026",
      techSummary: "Edge Vision Transformer model for real-time multispectral drone footage inferencing with 96.4% precision.",
      codeRepository: "https://github.com/skillpods/cropscan-vision"
    }
  ]);

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const stats = {
    totalIPs: items.length,
    commercializedCount: items.filter(i => i.ipStatus === 'Commercialized' || i.ipStatus === 'Licensed').length,
    totalValuation: '₹6,85,000',
    universityRoyaltyShare: '₹1,37,000 (20% College Fund)'
  };

  const filteredItems = items.filter(i => {
    const matchesFilter = activeFilter === 'All' || i.ipStatus === activeFilter;
    const matchesSearch = i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          i.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          i.studentAuthors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="lavender-glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold border border-purple-200 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-purple-700" />
              <span>University Innovation & Intellectual Property Registry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Institutional IP & Commercialization Pipeline
            </h2>
            <p className="text-sm text-[#5c4780] font-medium max-w-2xl">
              Track student project software assets from classroom capstones to commercial corporate licenses, institutional royalty sharing, and industry patents.
            </p>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-purple-200/80 shadow-xs flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#261543]">Active IP Portfolio</div>
              <div className="text-2xs text-[#5c4780]">{stats.commercializedCount} Commercialized Software Assets</div>
            </div>
          </div>
        </div>

        {/* 4-Card Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-purple-200/50">
          <div className="bg-white/80 p-4 rounded-2xl border border-purple-100 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-[#7c6a9b] block">Registered IP Assets</span>
            <strong className="text-2xl font-black text-[#261543] block mt-0.5">{stats.totalIPs}</strong>
            <span className="text-2xs text-purple-900 font-bold block mt-1">Across 3 Departments</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-emerald-800 font-bold block">Commercialized</span>
            <strong className="text-2xl font-black text-emerald-700 block mt-0.5">{stats.commercializedCount}</strong>
            <span className="text-2xs text-emerald-800 font-medium block mt-1">Generating Corporate Royalties</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-indigo-200 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-indigo-800 font-bold block">Portfolio Valuation</span>
            <strong className="text-2xl font-black text-indigo-900 block mt-0.5">{stats.totalValuation}</strong>
            <span className="text-2xs text-slate-600 font-medium block mt-1">SME Buyout & Licensing Pool</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-purple-200 shadow-2xs">
            <span className="text-2xs font-extrabold uppercase text-purple-900 font-bold block">College Innovation Share</span>
            <strong className="text-2xl font-black text-purple-900 block mt-0.5">{stats.universityRoyaltyShare.split(' ')[0]}</strong>
            <span className="text-2xs text-purple-700 font-bold block mt-1">Reinvested in Student Pods</span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-[#7c6a9b] mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          {['All', 'Commercialized', 'Licensed', 'Inquiry Received', 'Listed'].map(st => (
            <button
              key={st}
              onClick={() => setActiveFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === st
                  ? 'bg-[#3b226e] text-white shadow-xs'
                  : 'bg-white/70 hover:bg-white text-[#523d77] border border-white/80'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search IP titles or authors..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white/80 border border-purple-200/80 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
        </div>
      </div>

      {/* IP Registry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(ip => (
          <motion.div
            key={ip.id}
            whileHover={{ y: -3 }}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-200/80 shadow-sm flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-2xs font-extrabold uppercase text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  {ip.department}
                </span>

                <span className={`text-xs font-black px-3 py-0.5 rounded-full border ${
                  ip.ipStatus === 'Commercialized' || ip.ipStatus === 'Licensed'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : ip.ipStatus === 'Inquiry Received'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-purple-100 text-purple-900 border-purple-300'
                }`}>
                  {ip.ipStatus} ✓
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-[#261543] leading-snug">{ip.title}</h3>
                <p className="text-xs text-[#5c4780] font-medium mt-1">
                  Student Inventors: <strong className="text-slate-900">{ip.studentAuthors.join(', ')}</strong>
                </p>
              </div>

              <p className="text-xs text-[#261543] font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                {ip.techSummary}
              </p>

              {/* Mentor Supervisor Box */}
              <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200 text-2xs space-y-0.5">
                <span className="font-bold text-[#261543] block">Mentor Supervisor: {ip.mentorSupervisor}</span>
                {ip.licenseeCompany && (
                  <span className="text-emerald-800 font-semibold block">Commercial Licensee: {ip.licenseeCompany}</span>
                )}
              </div>

              {/* Valuation Strip */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Commercial Value</span>
                  <strong className="text-base font-black text-slate-900 block">{ip.commercialValue}</strong>
                </div>
                <span className="text-2xs text-slate-500 font-semibold">Registered {ip.dateRegistered}</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
              {ip.codeRepository && (
                <a
                  href={ip.codeRepository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-purple-900 hover:underline"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Audited Codebase</span>
                </a>
              )}

              <button
                onClick={() => alert(`Institutional licensing deed & copyright certificate downloaded for ${ip.title}`)}
                className="px-4 py-2 bg-[#3b226e] hover:bg-[#281549] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Download IP Deed &rarr;
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
