import React, { useState } from 'react';
import { X, Building2, Landmark, CheckCircle2, AlertCircle, MapPin, Upload, Sparkles, ShieldCheck } from 'lucide-react';
import { SmeProblem, ThematicDomain, JharkhandDistrict, SubmitterType } from '../types';

interface SubmitProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProblemSubmitted: (newProblem: SmeProblem) => void;
}

const JHARKHAND_DISTRICTS: JharkhandDistrict[] = [
  'Ranchi', 'Dhanbad', 'East Singhbhum', 'West Singhbhum', 'Bokaro',
  'Hazaribagh', 'Deoghar', 'Dumka', 'Giridih', 'Palamu', 'Ramgarh',
  'Saraikela Kharsawan', 'Chatra', 'Garhwa', 'Godda', 'Gumla',
  'Jamtara', 'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur',
  'Sahibganj', 'Simdega'
];

const THEMATIC_DOMAINS: ThematicDomain[] = [
  'Agriculture & Irrigation',
  'Water Resources & Sanitation',
  'Healthcare & Telemedicine',
  'Environment & Forestry',
  'Renewable Energy & Rural Electrification',
  'Urban Infrastructure & Waste Management',
  'Accessibility & Inclusive Tech',
  'Public Administration & Citizen Services',
  'Rural Livelihoods & Tribal Development',
  'Smart Education & Foundational Literacy'
];

export const SubmitProblemModal: React.FC<SubmitProblemModalProps> = ({
  isOpen,
  onClose,
  onProblemSubmitted
}) => {
  const [problemMode, setProblemMode] = useState<'SME' | 'SOCIETAL'>('SOCIETAL');

  // Common & SME state
  const [smeName, setSmeName] = useState('');
  const [industry, setIndustry] = useState('Logistics & Supply Chain');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bounty, setBounty] = useState('₹45,000 Govt / CSR Pilot Grant');
  const [skillsInput, setSkillsInput] = useState('React, IoT Sensors, Python');

  // SIH26043 Societal State
  const [submitterType, setSubmitterType] = useState<SubmitterType>('Gram Panchayat (PRI)');
  const [thematicDomain, setThematicDomain] = useState<ThematicDomain>('Water Resources & Sanitation');
  const [district, setDistrict] = useState<JharkhandDistrict>('Khunti');
  const [blockVillage, setBlockVillage] = useState('Torpa Block, Village Karra');
  const [csrPartner, setCsrPartner] = useState('Tata Steel CSR / District Innovation Fund');
  const [hasEvidenceAttachment, setHasEvidenceAttachment] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smeName.trim() || !title.trim() || !description.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const newProb: SmeProblem = {
      id: `prob-${Date.now().toString().slice(-4)}`,
      smeName: smeName.trim(),
      industry: problemMode === 'SOCIETAL' ? thematicDomain : industry,
      title: title.trim(),
      description: description.trim(),
      bounty: bounty.trim() || (problemMode === 'SOCIETAL' ? '₹50,000 CSR Grant' : '$3,000 Pilot Grant'),
      status: 'Under Review & Pod Matching',
      skills: skills.length > 0 ? skills : ['React', 'Node.js', 'Python'],
      submittedAt: 'Just now',
      problemType: problemMode,
      thematicDomain: problemMode === 'SOCIETAL' ? thematicDomain : undefined,
      district: problemMode === 'SOCIETAL' ? district : undefined,
      blockVillage: problemMode === 'SOCIETAL' ? blockVillage : undefined,
      submitterType: problemMode === 'SOCIETAL' ? submitterType : 'SME',
      csrPartner: problemMode === 'SOCIETAL' ? csrPartner : undefined,
      communityUpvotes: problemMode === 'SOCIETAL' ? 14 : undefined,
      impactMetric: problemMode === 'SOCIETAL' ? 'Estimated 2,400+ Villagers Impacted' : undefined
    };

    try {
      const res = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProb)
      });
      const data = await res.json();
      if (data.success && data.problem) {
        onProblemSubmitted(data.problem);
      } else {
        onProblemSubmitted(newProb);
      }
    } catch {
      onProblemSubmitted(newProb);
    } finally {
      setIsSubmitting(false);
      setSuccessMsg(
        problemMode === 'SOCIETAL'
          ? `Societal Challenge published! Triaged into ${thematicDomain} for university pods.`
          : `Problem statement published! Pod matching has initiated.`
      );
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#1b1b1f] border border-[#d0bcff]/30 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[#958ea0] hover:text-white p-1.5 rounded-full hover:bg-[#2a292e] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mode Selector Tabs - Responsive Stack on Mobile */}
        <div className="flex flex-col xs:flex-row sm:flex-row items-stretch gap-1.5 sm:gap-2 mb-4 bg-[#131317] p-1.5 rounded-2xl border border-[#494454]/40">
          <button
            type="button"
            onClick={() => {
              setProblemMode('SOCIETAL');
              if (!smeName) setSmeName('Gram Panchayat Torpa / Citizen Rep');
              if (!title) setTitle('Groundwater Fluoride & Heavy Metal Alert Telemetry Mesh');
              if (!description) setDescription('High levels of fluoride and iron detected in 14 village hand-pumps. Require a solar-powered IoT sensor network with mobile SMS alert dispatch to PHC.');
              setBounty('₹50,000 CSR Grant / Govt Pilot');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              problemMode === 'SOCIETAL'
                ? 'bg-[#d0bcff] text-[#1e1b4b] font-bold shadow-lg shadow-[#d0bcff]/20'
                : 'text-[#cbc3d7] hover:text-white hover:bg-[#25232d]'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">🏛️ Societal (SIH26043)</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setProblemMode('SME');
              if (smeName.includes('Gram Panchayat')) setSmeName('');
              if (title.includes('Fluoride')) setTitle('');
              setBounty('$3,500 Pilot Grant');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              problemMode === 'SME'
                ? 'bg-[#d0bcff] text-[#1e1b4b] font-bold shadow-lg shadow-[#d0bcff]/20'
                : 'text-[#cbc3d7] hover:text-white hover:bg-[#25232d]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">🏢 SME Enterprise</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[#d0bcff] font-mono text-xs mb-1 uppercase tracking-wider">
          {problemMode === 'SOCIETAL' ? (
            <>
              <Landmark className="w-4 h-4 text-[#a78bfa]" />
              <span className="text-[#a78bfa]">SIH26043 &bull; GOVT OF JHARKHAND &amp; MIC INTAKE</span>
            </>
          ) : (
            <>
              <Building2 className="w-4 h-4 text-[#d0bcff]" />
              <span>SME INTAKE PIPELINE</span>
            </>
          )}
        </div>

        <h3 className="font-geist text-2xl font-bold text-white mb-2">
          {problemMode === 'SOCIETAL'
            ? 'Submit a Societal / Community Challenge'
            : 'Submit an SME Business Problem'}
        </h3>
        <p className="text-xs sm:text-sm text-[#cbc3d7] mb-5">
          {problemMode === 'SOCIETAL'
            ? 'Crowdsource your regional community challenge to university student pods and industry CSR partners across Jharkhand.'
            : 'Connect your business software challenge with an agile student skill pod and industry-vetted mentor.'}
        </p>

        {successMsg && (
          <div className="bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] p-4 rounded-xl mb-5 flex items-center gap-3 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-[#ef4444]/15 border border-[#ef4444]/40 text-[#ef4444] p-4 rounded-xl mb-5 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Submitter & Domain Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                {problemMode === 'SOCIETAL' ? 'Submitter / Community Rep *' : 'Business / Organization Name *'}
              </label>
              <input
                type="text"
                value={smeName}
                onChange={(e) => setSmeName(e.target.value)}
                placeholder={problemMode === 'SOCIETAL' ? 'e.g. Gram Panchayat Torpa / Ramesh Munda' : 'e.g. Apex Precision Logistics'}
                required
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            {problemMode === 'SOCIETAL' ? (
              <div>
                <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                  Submitter Authority Type
                </label>
                <select
                  value={submitterType}
                  onChange={(e) => setSubmitterType(e.target.value as SubmitterType)}
                  className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                >
                  <option value="Gram Panchayat (PRI)">Gram Panchayat (PRI)</option>
                  <option value="Urban Local Body (ULB)">Urban Local Body (ULB / Nagar Nigam)</option>
                  <option value="Citizen">Individual Citizen / Youth</option>
                  <option value="Govt Agency">Government Agency / Block Office</option>
                  <option value="NGO / Community Group">NGO / Self-Help Group (SHG)</option>
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                  Industry Sector
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                >
                  <option value="Logistics & Supply Chain">Logistics &amp; Supply Chain</option>
                  <option value="Food Safety & Agriculture">Food Safety &amp; Agriculture</option>
                  <option value="Healthcare & Clinical Ops">Healthcare &amp; Clinical Ops</option>
                  <option value="Precision Manufacturing">Precision Manufacturing</option>
                  <option value="Retail & Inventory Systems">Retail &amp; Inventory Systems</option>
                  <option value="Fintech & Ledger Systems">Fintech &amp; Ledger Systems</option>
                </select>
              </div>
            )}
          </div>

          {/* Societal Specific: Thematic Domain & District */}
          {problemMode === 'SOCIETAL' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#231f33]/60 p-3.5 rounded-2xl border border-[#d0bcff]/20">
              <div>
                <label className="block text-xs font-mono text-[#a78bfa] uppercase mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Thematic Domain (10 SIH Domains) *
                </label>
                <select
                  value={thematicDomain}
                  onChange={(e) => setThematicDomain(e.target.value as ThematicDomain)}
                  className="w-full bg-[#171424] border border-[#d0bcff]/40 focus:border-[#d0bcff] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  {THEMATIC_DOMAINS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#a78bfa] uppercase mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Jharkhand District (24 Districts) *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value as JharkhandDistrict)}
                  className="w-full bg-[#171424] border border-[#d0bcff]/40 focus:border-[#d0bcff] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  {JHARKHAND_DISTRICTS.map(dist => (
                    <option key={dist} value={dist}>{dist} District</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1">
                  Block / Village / Ward Location
                </label>
                <input
                  type="text"
                  value={blockVillage}
                  onChange={(e) => setBlockVillage(e.target.value)}
                  placeholder="e.g. Torpa Block, Village Karra (Near Water Reservoir)"
                  className="w-full bg-[#171424] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
              Challenge / Problem Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={problemMode === 'SOCIETAL' ? 'e.g. Solar IoT Fluoride & Water Contaminant Warning Telemetry' : 'e.g. Automated OCR & Ledger Auto-Reconciliation'}
              required
              className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
              Detailed Description &amp; Local Impact *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={problemMode === 'SOCIETAL' ? 'Describe the local ground reality, affected population, current failures, and desired technological solution...' : 'Describe your current manual process, data volume, and desired functional outcome...'}
              required
              className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                {problemMode === 'SOCIETAL' ? 'CSR Grant / Govt Pilot Bounty' : 'Pilot Grant / Bounty Budget'}
              </label>
              <input
                type="text"
                value={bounty}
                onChange={(e) => setBounty(e.target.value)}
                placeholder="e.g. ₹50,000 Pilot Grant"
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Target Tech Stack / Keywords
              </label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="IoT Sensors, React, Python, LoRaWAN"
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          {problemMode === 'SOCIETAL' && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#131317] border border-[#494454]/30 text-xs text-[#cbc3d7]">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#a78bfa]" />
                <span>Field Evidence Attached: <span className="text-white font-mono">3 Photos &amp; Water Sample Report</span></span>
              </div>
              <button
                type="button"
                onClick={() => setHasEvidenceAttachment(!hasEvidenceAttachment)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono cursor-pointer transition-colors ${
                  hasEvidenceAttachment ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40' : 'bg-[#2a292e] text-gray-400'
                }`}
              >
                {hasEvidenceAttachment ? '✓ Verified Attached' : '+ Add Files'}
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-[#494454]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-[#958ea0]">
              <ShieldCheck className="w-4 h-4 text-[#a78bfa] shrink-0" />
              <span>Gated by 3-Student Pod &bull; Mentor Verified</span>
            </div>

            <div className="flex items-center justify-end gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 sm:px-4 py-2 rounded-full font-mono text-xs uppercase text-[#cbc3d7] hover:text-white hover:bg-[#2a292e] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-initial bg-[#d0bcff] text-[#3c0091] font-bold px-4 sm:px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider hover:opacity-90 transition-all glow-bloom cursor-pointer disabled:opacity-50 text-center"
              >
                {isSubmitting ? 'Publishing...' : problemMode === 'SOCIETAL' ? 'Submit Challenge' : 'Submit Problem'}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

