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
  Download,
  Building2,
  ExternalLink,
  Award,
  FileCheck2,
  Layers,
  Heart
} from 'lucide-react';
import { ThematicDomain, JharkhandDistrict } from '../types';

interface SocietalProjectItem {
  id: string;
  title: string;
  thematicDomain: ThematicDomain;
  district: JharkhandDistrict;
  blockVillage: string;
  podName: string;
  studentMembers: string[];
  facultyLead: string;
  industryCsrPartner: string;
  csrGrantAmount: string;
  status: 'Deployed & Validated' | 'Field Pilot Testing' | 'Lab Prototyping' | 'AI Triaged';
  beneficiaries: string;
  priValidationSignOff: boolean;
  description: string;
}

interface CollegeSocietalImpactViewProps {
  userEmail?: string;
  onOpenNaacModal?: () => void;
}

export const CollegeSocietalImpactView: React.FC<CollegeSocietalImpactViewProps> = ({
  userEmail,
  onOpenNaacModal
}) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const societalProjects: SocietalProjectItem[] = [
    {
      id: "soc-proj-01",
      title: "Jal-Rakshak: Solar IoT Fluoride & Water Contaminant Alert Network",
      thematicDomain: "Water Resources & Sanitation",
      district: "Khunti",
      blockVillage: "Torpa Block (14 Tribal Villages)",
      podName: "Jal-Rakshak Pod (CSE + Biotech + ECE)",
      studentMembers: ["Dev Patel (Pod Lead)", "Maya Lin", "Rohan Gupta"],
      facultyLead: "Dr. Rajeshwar Soren (IIT ISM Dhanbad / Env Eng)",
      industryCsrPartner: "Tata Steel CSR & Water Health Mission",
      csrGrantAmount: "₹50,000",
      status: "Deployed & Validated",
      beneficiaries: "6,200+ villagers in fluoride-affected tribal belt",
      priValidationSignOff: true,
      description: "Automated solar sensor nodes transmitting real-time fluoride and iron levels to Gram Panchayat dashboard and SMS alerts to PHC medical officers."
    },
    {
      id: "soc-proj-02",
      title: "Aranya: Santhal Minor Forest Produce (Lac/Millets) Traceability",
      thematicDomain: "Rural Livelihoods & Tribal Development",
      district: "Dumka",
      blockVillage: "Santhal Pargana Cluster",
      podName: "Aranya Livelihoods Pod (IT + Agri)",
      studentMembers: ["Elena Rostova (Lead)", "Aarav Sharma", "Kavita Marandi"],
      facultyLead: "Prof. Sunil Besra (Birsa Agricultural University)",
      industryCsrPartner: "Jharkhand State Livelihood Promotion Society (JSLPS)",
      csrGrantAmount: "₹65,000",
      status: "Field Pilot Testing",
      beneficiaries: "850+ tribal women Self-Help Groups (SHGs)",
      priValidationSignOff: true,
      description: "Decentralized fair-price mobile ledger with digital Bluetooth weigh-scale sync and direct bank transfer, preventing middleman price exploitation."
    },
    {
      id: "soc-proj-03",
      title: "Swasthya-Vahini: Rural Telemedicine & Cold-Chain Vaccine Telemetry",
      thematicDomain: "Healthcare & Telemedicine",
      district: "Palamu",
      blockVillage: "Daltonganj Sub-Divisional Belt",
      podName: "Swasthya Tech Pod (CSE + BioMed)",
      studentMembers: ["Samir Al-Mansoor (Lead)", "Tanya Sen", "Ankit Verma"],
      facultyLead: "Dr. Arvind Sinha (AIIMS Deoghar / Health Informatics)",
      industryCsrPartner: "National Health Mission Jharkhand & Coal India CSR",
      csrGrantAmount: "₹55,000",
      status: "Field Pilot Testing",
      beneficiaries: "22 Sub-Health Centers across remote terrain",
      priValidationSignOff: true,
      description: "Real-time temperature and battery monitoring for vaccine carrier boxes with automated SMS emergency alerts to District Immunization Officers."
    },
    {
      id: "soc-proj-04",
      title: "Vidyut-Kavach: Micro-Grid Solar Telemetry & Rural Load Balancing",
      thematicDomain: "Renewable Energy & Rural Electrification",
      district: "Latehar",
      blockVillage: "Mahuadanr Valley Off-Grid Hamlets",
      podName: "Urja Innovation Pod (Electrical + CSE)",
      studentMembers: ["Vikramaditya Roy (Lead)", "Neha Tirkey"],
      facultyLead: "Dr. S. K. Mahato (BIT Mesra / Electrical Eng)",
      industryCsrPartner: "NTPC CSR & JREDA",
      csrGrantAmount: "₹75,000",
      status: "Lab Prototyping",
      beneficiaries: "350 off-grid households in forest corridors",
      priValidationSignOff: false,
      description: "Low-cost LoRa telemetry monitors decentralized solar micro-grid battery health and prevents inverter burnout during peak agrarian demand."
    },
    {
      id: "soc-proj-05",
      title: "Van-Raksha: Drone & Edge-AI Forest Fire & Sal Borer Detection",
      thematicDomain: "Environment & Forestry",
      district: "Hazaribagh",
      blockVillage: "National Park Buffer Zone",
      podName: "Eco-Aero Pod (AI/DS + Mechanical)",
      studentMembers: ["Aman Deep (Lead)", "Pooja Kumari", "Shubham Jha"],
      facultyLead: "Dr. R. P. Singh (Jharkhand Forest Dept Technical Advisor)",
      industryCsrPartner: "BCCL & District Forest Authority",
      csrGrantAmount: "₹80,000",
      status: "Lab Prototyping",
      beneficiaries: "12,000 hectares of dense sal forest cover",
      priValidationSignOff: false,
      description: "Thermal edge-AI processing on custom UAV drones alerting range officers to smoke plumes within 90 seconds of ignition."
    }
  ];

  const filteredProjects = societalProjects.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.blockVillage.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.facultyLead.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = selectedDomain === 'All' || item.thematicDomain === selectedDomain;
    const matchesDistrict = selectedDistrict === 'All' || item.district === selectedDistrict;
    return matchesSearch && matchesDomain && matchesDistrict;
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner */}
      <div className="lavender-glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-950 text-[11px] sm:text-xs font-bold border border-indigo-200">
              <Landmark className="w-3.5 h-3.5 text-indigo-700" />
              <span>SIH26043 &bull; Govt of Jharkhand &amp; MIC Societal Innovation Hub</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-[#261543] tracking-tight">
              Crowdsourced Societal Innovation &amp; Regional Impact
            </h2>
            <p className="text-xs sm:text-sm text-[#5c4780] font-medium max-w-2xl">
              Connecting community problems across Jharkhand's 24 districts with collegiate multidisciplinary student pods, faculty mentors, and corporate CSR funding partners.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenNaacModal && onOpenNaacModal()}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-indigo-900 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-indigo-950 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export NAAC 3.5.1 Report</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Metrics - Responsive 2x2 grid on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-purple-200/50">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 border border-purple-100 space-y-1">
            <div className="text-[10px] sm:text-2xs font-extrabold uppercase tracking-wider text-[#5c4780]">Community Problems</div>
            <div className="text-lg sm:text-2xl font-black text-[#261543]">38 Triaged</div>
            <div className="text-[10px] sm:text-[11px] text-emerald-700 font-bold">✓ Across 14 Districts</div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 border border-purple-100 space-y-1">
            <div className="text-[10px] sm:text-2xs font-extrabold uppercase tracking-wider text-[#5c4780]">Active Student Pods</div>
            <div className="text-lg sm:text-2xl font-black text-indigo-900">14 Deployed</div>
            <div className="text-[10px] sm:text-[11px] text-indigo-700 font-bold">42 Student Builders</div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 border border-purple-100 space-y-1">
            <div className="text-[10px] sm:text-2xs font-extrabold uppercase tracking-wider text-[#5c4780]">CSR Grants Mobilized</div>
            <div className="text-lg sm:text-2xl font-black text-emerald-800">₹4,85,000</div>
            <div className="text-[10px] sm:text-[11px] text-emerald-700 font-bold">Tata Steel &amp; JSLPS</div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 border border-purple-100 space-y-1">
            <div className="text-[10px] sm:text-2xs font-extrabold uppercase tracking-wider text-[#5c4780]">NAAC 3.5.1 Standing</div>
            <div className="text-lg sm:text-2xl font-black text-purple-900">98 / 100</div>
            <div className="text-[10px] sm:text-[11px] text-purple-700 font-bold">Exemplary Tier</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-purple-200/80 shadow-2xs space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project, village block, or faculty mentor..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-[#261543] shrink-0">District:</span>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="flex-1 sm:flex-initial bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-indigo-950 focus:outline-none cursor-pointer"
            >
              <option value="All">All 24 Districts</option>
              <option value="Khunti">Khunti District</option>
              <option value="Dumka">Dumka District</option>
              <option value="Palamu">Palamu District</option>
              <option value="Latehar">Latehar District</option>
              <option value="Hazaribagh">Hazaribagh District</option>
              <option value="Ranchi">Ranchi District</option>
              <option value="Dhanbad">Dhanbad District</option>
            </select>
          </div>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="space-y-3.5 sm:space-y-4">
        {filteredProjects.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -2 }}
            className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-purple-200/80 shadow-sm space-y-3.5 sm:space-y-4 transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 sm:gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="px-2.5 sm:px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-950 font-extrabold text-[10px] sm:text-2xs uppercase tracking-wider">
                    {item.thematicDomain}
                  </span>
                  <span className="px-2.5 sm:px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] sm:text-2xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-indigo-600 shrink-0" />
                    <span>{item.district} &bull; {item.blockVillage}</span>
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] sm:text-2xs ${
                    item.status === 'Deployed & Validated'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-indigo-100 text-indigo-950 border border-indigo-200'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#261543]">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </div>

              {/* Bounty / CSR Grant Pill - Responsive */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-indigo-50/80 border border-indigo-100 text-left sm:text-right shrink-0 self-start sm:self-auto">
                <div className="text-[10px] sm:text-2xs font-extrabold uppercase text-indigo-900">CSR Grant Funded</div>
                <div className="text-base sm:text-xl font-black text-indigo-950">{item.csrGrantAmount}</div>
                <div className="text-[10px] text-indigo-700 font-semibold">{item.industryCsrPartner}</div>
              </div>
            </div>

            {/* Pod & Stakeholder Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-purple-100 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#5c4780] block mb-0.5">Assigned Pod:</span>
                <strong className="text-indigo-950">{item.podName}</strong>
                <div className="text-[11px] text-slate-500 mt-0.5">{item.studentMembers.join(', ')}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#5c4780] block mb-0.5">Faculty Lead / Guide:</span>
                <strong className="text-slate-900">{item.facultyLead}</strong>
                <div className="text-[11px] text-slate-500 mt-0.5">Milestone Stage Gate Supervisor</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#5c4780] block mb-0.5">Community Beneficiaries:</span>
                <strong className="text-emerald-900">{item.beneficiaries}</strong>
                <div className="text-[11px] text-emerald-700 mt-0.5">
                  {item.priValidationSignOff ? '✓ Gram Panchayat Validated' : '⏳ Pilot in Progress'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
