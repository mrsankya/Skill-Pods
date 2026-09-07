import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Building2,
  Users,
  Award,
  ChevronRight,
  TrendingUp,
  Filter,
  X
} from 'lucide-react';
import { JharkhandDistrict } from '../types';

export interface DistrictHeatmapData {
  name: JharkhandDistrict;
  division: 'South Chotanagpur' | 'North Chotanagpur' | 'Santhal Pargana' | 'Kolhan' | 'Palamu';
  challengesCount: number;
  resolvedCount: number;
  activePodsCount: number;
  severity: 'CRITICAL' | 'ACTIVE_PILOT' | 'RESOLVED';
  topTheme: string;
  leadUniversity: string;
  csrPartner: string;
  grantAmount: string;
  beneficiaries: string;
  keyIssue: string;
}

export const JHARKHAND_HEATMAP_DATA: DistrictHeatmapData[] = [
  {
    name: 'Khunti',
    division: 'South Chotanagpur',
    challengesCount: 9,
    resolvedCount: 3,
    activePodsCount: 4,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Water Resources & Sanitation',
    leadUniversity: 'IIT (ISM) Dhanbad',
    csrPartner: 'Tata Steel CSR',
    grantAmount: '₹75,000',
    beneficiaries: '14,200 villagers',
    keyIssue: 'Groundwater fluoride & heavy metal handpump contamination'
  },
  {
    name: 'Dumka',
    division: 'Santhal Pargana',
    challengesCount: 8,
    resolvedCount: 2,
    activePodsCount: 3,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Rural Livelihoods & Tribal Development',
    leadUniversity: 'BIT Mesra / Ranchi Univ',
    csrPartner: 'Jharkhand Forest Minor Produce Mission',
    grantAmount: '₹60,000',
    beneficiaries: '3,400 tribal SHGs',
    keyIssue: 'Mahuwa & lac perishability during monsoon storage'
  },
  {
    name: 'Palamu',
    division: 'Palamu',
    challengesCount: 7,
    resolvedCount: 1,
    activePodsCount: 2,
    severity: 'CRITICAL',
    topTheme: 'Agriculture & Irrigation',
    leadUniversity: 'Birsa Agricultural University',
    csrPartner: 'Coal India Foundation',
    grantAmount: '₹90,000',
    beneficiaries: '18,500 farmers',
    keyIssue: 'Recurring seasonal drought & lack of micro-drip automation'
  },
  {
    name: 'Latehar',
    division: 'Palamu',
    challengesCount: 6,
    resolvedCount: 2,
    activePodsCount: 2,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Renewable Energy & Rural Electrification',
    leadUniversity: 'National Institute of Technology Jamshedpur',
    csrPartner: 'NTPC Renewable CSR',
    grantAmount: '₹65,000',
    beneficiaries: '8,900 forest dwellers',
    keyIssue: 'Off-grid forest hamlet solar DC micro-grid monitoring'
  },
  {
    name: 'Hazaribagh',
    division: 'North Chotanagpur',
    challengesCount: 5,
    resolvedCount: 1,
    activePodsCount: 2,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Healthcare & Telemedicine',
    leadUniversity: 'Vinoba Bhave University / AIIMS Deoghar',
    csrPartner: 'District Mining Benefit Fund',
    grantAmount: '₹45,000',
    beneficiaries: '11,000 rural patients',
    keyIssue: 'Sub-centre maternal telemetry & telemedicine connectivity'
  },
  {
    name: 'Ranchi',
    division: 'South Chotanagpur',
    challengesCount: 12,
    resolvedCount: 5,
    activePodsCount: 5,
    severity: 'RESOLVED',
    topTheme: 'Urban Infrastructure & Waste Management',
    leadUniversity: 'Central University of Jharkhand',
    csrPartner: 'Ranchi Smart City Council',
    grantAmount: '₹80,000',
    beneficiaries: '45,000 urban citizens',
    keyIssue: 'Automated municipal dry waste sorting & plastic buyback'
  },
  {
    name: 'Dhanbad',
    division: 'North Chotanagpur',
    challengesCount: 11,
    resolvedCount: 4,
    activePodsCount: 4,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Environment & Forestry',
    leadUniversity: 'IIT (ISM) Dhanbad',
    csrPartner: 'Bharat Coking Coal Limited (BCCL)',
    grantAmount: '₹1,20,000',
    beneficiaries: '28,000 mining community members',
    keyIssue: 'Acid mine drainage neutralization & particulate air sensors'
  },
  {
    name: 'East Singhbhum',
    division: 'Kolhan',
    challengesCount: 8,
    resolvedCount: 3,
    activePodsCount: 3,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Smart Education & Foundational Literacy',
    leadUniversity: 'NIT Jamshedpur',
    csrPartner: 'Tata Motors CSR',
    grantAmount: '₹55,000',
    beneficiaries: '6,200 tribal school students',
    keyIssue: 'Offline Santhali/Ho bilingual digital audio flashcards'
  },
  {
    name: 'West Singhbhum',
    division: 'Kolhan',
    challengesCount: 7,
    resolvedCount: 1,
    activePodsCount: 2,
    severity: 'CRITICAL',
    topTheme: 'Water Resources & Sanitation',
    leadUniversity: 'Kolhan University',
    csrPartner: 'SAIL Rungta CSR',
    grantAmount: '₹50,000',
    beneficiaries: '9,400 mining fringe villagers',
    keyIssue: 'Heavy iron sediment filtration in deep tube-wells'
  },
  {
    name: 'Bokaro',
    division: 'North Chotanagpur',
    challengesCount: 6,
    resolvedCount: 2,
    activePodsCount: 2,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Environment & Forestry',
    leadUniversity: 'Guru Gobind Singh Educational Society Tech Campus',
    csrPartner: 'SAIL Bokaro Steel',
    grantAmount: '₹70,000',
    beneficiaries: '16,000 residents',
    keyIssue: 'Damodar river industrial effluent telemetry'
  },
  {
    name: 'Deoghar',
    division: 'Santhal Pargana',
    challengesCount: 5,
    resolvedCount: 2,
    activePodsCount: 2,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Urban Infrastructure & Waste Management',
    leadUniversity: 'AIIMS Deoghar / BIT Deoghar',
    csrPartner: 'Tourism & Pilgrim Mission',
    grantAmount: '₹40,000',
    beneficiaries: '50,000+ pilgrim footfall',
    keyIssue: 'Dynamic crowd flow & medical emergency drone dispatch'
  },
  {
    name: 'Giridih',
    division: 'North Chotanagpur',
    challengesCount: 6,
    resolvedCount: 1,
    activePodsCount: 2,
    severity: 'CRITICAL',
    topTheme: 'Rural Livelihoods & Tribal Development',
    leadUniversity: 'Vinoba Bhave University',
    csrPartner: 'Mineral Area Development Authority',
    grantAmount: '₹50,000',
    beneficiaries: '4,800 mica artisanal workers',
    keyIssue: 'Artisanal mica waste recycling into non-toxic thermal coating'
  },
  {
    name: 'Godda',
    division: 'Santhal Pargana',
    challengesCount: 4,
    resolvedCount: 1,
    activePodsCount: 1,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Agriculture & Irrigation',
    leadUniversity: 'Sido Kanhu Murmu University',
    csrPartner: 'Adani Power CSR',
    grantAmount: '₹45,000',
    beneficiaries: '5,200 pulse farmers',
    keyIssue: 'Solar seed germinator & post-harvest moisture sensor'
  },
  {
    name: 'Gumla',
    division: 'South Chotanagpur',
    challengesCount: 5,
    resolvedCount: 2,
    activePodsCount: 2,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Rural Livelihoods & Tribal Development',
    leadUniversity: 'St. Xavier\'s College Ranchi',
    csrPartner: 'NABARD Rural Fund',
    grantAmount: '₹55,000',
    beneficiaries: '7,100 ragi/millet farmers',
    keyIssue: 'Low-cost solar millet destoner & flour packaging unit'
  },
  {
    name: 'Jamtara',
    division: 'Santhal Pargana',
    challengesCount: 4,
    resolvedCount: 2,
    activePodsCount: 2,
    severity: 'RESOLVED',
    topTheme: 'Public Administration & Citizen Services',
    leadUniversity: 'Indian Institute of Information Technology (IIIT) Ranchi',
    csrPartner: 'Jharkhand Cyber Defense Cell',
    grantAmount: '₹60,000',
    beneficiaries: 'Community digital safety',
    keyIssue: 'Digital cyber literacy & phishing awareness voice bot'
  },
  {
    name: 'Koderma',
    division: 'North Chotanagpur',
    challengesCount: 4,
    resolvedCount: 1,
    activePodsCount: 1,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Environment & Forestry',
    leadUniversity: 'Central University of Jharkhand',
    csrPartner: 'Damodar Valley Corporation (DVC)',
    grantAmount: '₹35,000',
    beneficiaries: '6,000 residents',
    keyIssue: 'Reservoir catchment siltation prediction model'
  },
  {
    name: 'Lohardaga',
    division: 'South Chotanagpur',
    challengesCount: 4,
    resolvedCount: 1,
    activePodsCount: 1,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Agriculture & Irrigation',
    leadUniversity: 'Ranchi Agriculture College',
    csrPartner: 'HINDALCO Bauxite CSR',
    grantAmount: '₹40,000',
    beneficiaries: '4,500 vegetable growers',
    keyIssue: 'Cold storage evaporative cooling chamber for green chillies'
  },
  {
    name: 'Pakur',
    division: 'Santhal Pargana',
    challengesCount: 5,
    resolvedCount: 1,
    activePodsCount: 1,
    severity: 'CRITICAL',
    topTheme: 'Healthcare & Telemedicine',
    leadUniversity: 'SKMU Dumka',
    csrPartner: 'District Health Society',
    grantAmount: '₹48,000',
    beneficiaries: '12,000 Paharia tribe members',
    keyIssue: 'Endemic malaria early biomarker testing kits'
  },
  {
    name: 'Ramgarh',
    division: 'North Chotanagpur',
    challengesCount: 5,
    resolvedCount: 2,
    activePodsCount: 2,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Water Resources & Sanitation',
    leadUniversity: 'BIT Mesra',
    csrPartner: 'Jindal Steel & Power',
    grantAmount: '₹50,000',
    beneficiaries: '15,000 Patratu residents',
    keyIssue: 'Patratu reservoir eco-restoration & micro-algae cleanup'
  },
  {
    name: 'Sahibganj',
    division: 'Santhal Pargana',
    challengesCount: 5,
    resolvedCount: 2,
    activePodsCount: 2,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Urban Infrastructure & Waste Management',
    leadUniversity: 'NIT Patna / SKMU',
    csrPartner: 'Inland Waterways Authority CSR',
    grantAmount: '₹65,000',
    beneficiaries: '22,000 riverfront inhabitants',
    keyIssue: 'Ganga riverbank soil erosion telemetry & early flood beacon'
  },
  {
    name: 'Saraikela Kharsawan',
    division: 'Kolhan',
    challengesCount: 6,
    resolvedCount: 2,
    activePodsCount: 2,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Renewable Energy & Rural Electrification',
    leadUniversity: 'NIT Jamshedpur',
    csrPartner: 'Adityapur Industrial Area Development (AIADA)',
    grantAmount: '₹70,000',
    beneficiaries: '14,000 MSME cluster workers',
    keyIssue: 'Rooftop solar aggregation & shared power bank for auto MSMEs'
  },
  {
    name: 'Simdega',
    division: 'South Chotanagpur',
    challengesCount: 4,
    resolvedCount: 1,
    activePodsCount: 1,
    severity: 'ACTIVE_PILOT',
    topTheme: 'Smart Education & Foundational Literacy',
    leadUniversity: 'Ranchi University',
    csrPartner: 'Jharkhand Sports & Youth Development',
    grantAmount: '₹35,000',
    beneficiaries: '3,800 tribal youth athletes',
    keyIssue: 'Computer-vision posture coaching app for hockey academy'
  },
  {
    name: 'Chatra',
    division: 'North Chotanagpur',
    challengesCount: 4,
    resolvedCount: 1,
    activePodsCount: 1,
    severity: 'CRITICAL',
    topTheme: 'Healthcare & Telemedicine',
    leadUniversity: 'AIIMS Deoghar / VBU',
    csrPartner: 'Central Coalfields Ltd (CCL)',
    grantAmount: '₹40,000',
    beneficiaries: '7,500 rural villagers',
    keyIssue: 'Portable battery-operated ECG & fetal Doppler for ANM workers'
  },
  {
    name: 'Garhwa',
    division: 'Palamu',
    challengesCount: 5,
    resolvedCount: 1,
    activePodsCount: 1,
    severity: 'CRITICAL',
    topTheme: 'Agriculture & Irrigation',
    leadUniversity: 'Birsa Agricultural University',
    csrPartner: 'Ranka Gramin Vikas',
    grantAmount: '₹42,000',
    beneficiaries: '6,800 farmers',
    keyIssue: 'Canal gate solar automated telemetry for tail-end farmers'
  }
];

interface JharkhandDistrictHeatmapProps {
  onSelectDistrict: (district: JharkhandDistrict) => void;
  selectedDistrict: string;
  onClose?: () => void;
}

export const JharkhandDistrictHeatmap: React.FC<JharkhandDistrictHeatmapProps> = ({
  onSelectDistrict,
  selectedDistrict,
  onClose
}) => {
  const [activeDivision, setActiveDivision] = useState<string>('All');
  const [selectedDistrictDetail, setSelectedDistrictDetail] = useState<DistrictHeatmapData | null>(null);

  const filteredDistricts = JHARKHAND_HEATMAP_DATA.filter(
    d => activeDivision === 'All' || d.division === activeDivision
  );

  const totalChallenges = JHARKHAND_HEATMAP_DATA.reduce((acc, d) => acc + d.challengesCount, 0);
  const totalResolved = JHARKHAND_HEATMAP_DATA.reduce((acc, d) => acc + d.resolvedCount, 0);
  const totalActivePods = JHARKHAND_HEATMAP_DATA.reduce((acc, d) => acc + d.activePodsCount, 0);
  const criticalCount = JHARKHAND_HEATMAP_DATA.filter(d => d.severity === 'CRITICAL').length;

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-[#120f20] border border-[#3b3254] p-4 sm:p-7 shadow-2xl space-y-5">
      {/* Header with Title and Overview KPIs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300">
              <MapPin className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>Jharkhand 24-District Societal GIS Heatmap</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                SIH26043 Mandate
              </span>
            </h3>
          </div>
          <p className="text-xs text-[#cbc3d7] mt-1 max-w-2xl">
            Live geographic concentration of community problems, university pods deployment, and CSR grants across all 5 administrative divisions of Jharkhand. Click any district to filter.
          </p>
        </div>

        {/* Action button & Close if provided */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#a78bfa]">
            24 / 24 Districts Covered
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="p-3 rounded-xl bg-[#171328] border border-[#352c4e]">
          <div className="text-[10px] font-mono uppercase text-slate-400">Total Reported Issues</div>
          <div className="text-lg sm:text-xl font-black text-white mt-0.5">{totalChallenges} Problems</div>
          <div className="text-[10px] text-indigo-300">Across 24 districts</div>
        </div>

        <div className="p-3 rounded-xl bg-[#171328] border border-[#352c4e]">
          <div className="text-[10px] font-mono uppercase text-slate-400">Active University Pods</div>
          <div className="text-lg sm:text-xl font-black text-indigo-300 mt-0.5">{totalActivePods} Pods Deployed</div>
          <div className="text-[10px] text-slate-400">IIT Dhanbad, BIT, NIT, CUJ</div>
        </div>

        <div className="p-3 rounded-xl bg-[#171328] border border-[#352c4e]">
          <div className="text-[10px] font-mono uppercase text-slate-400">Validated Resolutions</div>
          <div className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5">{totalResolved} Field Pilots</div>
          <div className="text-[10px] text-emerald-400/80">Validated by PRIs</div>
        </div>

        <div className="p-3 rounded-xl bg-[#171328] border border-[#352c4e]">
          <div className="text-[10px] font-mono uppercase text-slate-400">Critical Priority Zones</div>
          <div className="text-lg sm:text-xl font-black text-rose-400 mt-0.5">{criticalCount} Districts</div>
          <div className="text-[10px] text-rose-300/80">Immediate Pod Attention</div>
        </div>
      </div>

      {/* Division Selector Filter Pills */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
          <span className="text-slate-400 mr-1 text-[11px]">Division:</span>
          {['All', 'South Chotanagpur', 'North Chotanagpur', 'Santhal Pargana', 'Kolhan', 'Palamu'].map((div) => (
            <button
              key={div}
              onClick={() => setActiveDivision(div)}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeDivision === div
                  ? 'bg-[#d0bcff] text-[#1e1b4b] shadow-xs'
                  : 'bg-white/5 text-[#cbc3d7] hover:bg-white/10 border border-white/5'
              }`}
            >
              {div}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Critical</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Active Pod</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Resolved</span>
          </span>
        </div>
      </div>

      {/* 24-District Interactive Heatmap Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {filteredDistricts.map((d) => {
          const isSelected = selectedDistrict === d.name;
          const severityColor =
            d.severity === 'CRITICAL'
              ? 'border-rose-500/50 hover:border-rose-400 bg-rose-500/5 hover:bg-rose-500/10'
              : d.severity === 'ACTIVE_PILOT'
              ? 'border-amber-500/50 hover:border-amber-400 bg-amber-500/5 hover:bg-amber-500/10'
              : 'border-emerald-500/50 hover:border-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10';

          return (
            <motion.div
              key={d.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onSelectDistrict(d.name);
                setSelectedDistrictDetail(d);
              }}
              className={`p-3 rounded-xl border transition-all cursor-pointer text-left relative overflow-hidden ${severityColor} ${
                isSelected ? 'ring-2 ring-[#d0bcff] shadow-lg shadow-[#d0bcff]/20' : ''
              }`}
            >
              {/* Severity dot */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white">{d.name}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    d.severity === 'CRITICAL'
                      ? 'bg-rose-500'
                      : d.severity === 'ACTIVE_PILOT'
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`}
                />
              </div>

              <div className="mt-2 space-y-0.5">
                <div className="text-[11px] font-mono text-[#d0bcff] font-bold">
                  {d.challengesCount} Challenges
                </div>
                <div className="text-[10px] text-slate-400 truncate" title={d.keyIssue}>
                  {d.topTheme.split('&')[0]}
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span>{d.activePodsCount} Pods</span>
                <span className="text-emerald-400">{d.grantAmount}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* District Inspection Drawer (When user clicks any district tile) */}
      {selectedDistrictDetail && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 rounded-2xl bg-[#1b162b] border border-indigo-500/40 space-y-3"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-black text-white">
                🏛️ {selectedDistrictDetail.name} District Detail File
              </span>
              <span className="text-[10px] font-mono text-[#a78bfa] bg-[#a78bfa]/15 px-2 py-0.5 rounded-full">
                {selectedDistrictDetail.division} Division
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  selectedDistrictDetail.severity === 'CRITICAL'
                    ? 'bg-rose-500/20 text-rose-300'
                    : selectedDistrictDetail.severity === 'ACTIVE_PILOT'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                Status: {selectedDistrictDetail.severity.replace('_', ' ')}
              </span>
            </div>

            <button
              onClick={() => setSelectedDistrictDetail(null)}
              className="text-xs text-slate-400 hover:text-white font-mono self-start sm:self-auto cursor-pointer"
            >
              ✕ Close District Detail
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] font-mono text-[#a78bfa] uppercase block">Ground Priority Issue:</span>
              <strong className="text-white text-xs leading-snug mt-0.5 block">{selectedDistrictDetail.keyIssue}</strong>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] font-mono text-[#a78bfa] uppercase block">Assigned HEI / University:</span>
              <strong className="text-indigo-300 text-xs leading-snug mt-0.5 block">{selectedDistrictDetail.leadUniversity}</strong>
              <div className="text-[10px] text-slate-400 mt-1">{selectedDistrictDetail.activePodsCount} Active Student Pods</div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] font-mono text-[#a78bfa] uppercase block">CSR Grant Partner:</span>
              <strong className="text-emerald-400 text-xs leading-snug mt-0.5 block">{selectedDistrictDetail.grantAmount} Allocated</strong>
              <div className="text-[10px] text-slate-400 mt-1">{selectedDistrictDetail.csrPartner}</div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] font-mono text-[#a78bfa] uppercase block">Beneficiary Impact:</span>
              <strong className="text-[#d0bcff] text-xs leading-snug mt-0.5 block">{selectedDistrictDetail.beneficiaries}</strong>
              <div className="text-[10px] text-emerald-300 mt-1">PRI Gram Pradhan Corroborated</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
