import React, { useState } from 'react';
import { X, Building2, Briefcase, DollarSign, Code, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { SmeProblem } from '../types';

interface SubmitProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProblemSubmitted: (newProblem: SmeProblem) => void;
}

export const SubmitProblemModal: React.FC<SubmitProblemModalProps> = ({
  isOpen,
  onClose,
  onProblemSubmitted
}) => {
  const [smeName, setSmeName] = useState('');
  const [industry, setIndustry] = useState('Logistics & Supply Chain');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bounty, setBounty] = useState('$3,000 Pilot Grant');
  const [skillsInput, setSkillsInput] = useState('React, Node.js, PostgreSQL');
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

    try {
      const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
      const res = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          smeName,
          industry,
          title,
          description,
          bounty,
          skills
        })
      });

      const data = await res.json();
      if (data.success) {
        onProblemSubmitted(data.problem);
        setSuccessMsg(`Problem statement published! Pod matching has initiated.`);
        setTimeout(() => {
          setSuccessMsg('');
          onClose();
        }, 1800);
      } else {
        setErrorMsg(data.error || 'Failed to submit problem.');
      }
    } catch (err) {
      // Fallback local update
      const fallbackProblem: SmeProblem = {
        id: `prob-${Date.now().toString().slice(-4)}`,
        smeName,
        industry,
        title,
        description,
        bounty,
        status: 'Under Review & Pod Matching',
        skills: skillsInput.split(',').map(s => s.trim()),
        submittedAt: 'Just now'
      };
      onProblemSubmitted(fallbackProblem);
      setSuccessMsg(`Problem statement published! Pod matching has initiated.`);
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#1b1b1f] border border-[#d0bcff]/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#958ea0] hover:text-white p-1 rounded-full hover:bg-[#2a292e] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#d0bcff] font-mono text-xs mb-2 uppercase tracking-wider">
          <Building2 className="w-4 h-4" />
          <span>SME INTAKE PIPELINE</span>
        </div>

        <h3 className="font-geist text-2xl font-bold text-white mb-2">
          Submit an SME Problem Statement
        </h3>
        <p className="text-xs sm:text-sm text-[#cbc3d7] mb-6">
          Connect your business challenge with an agile student skill pod and industry-vetted mentor.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Business / Organization Name *
              </label>
              <input
                type="text"
                value={smeName}
                onChange={(e) => setSmeName(e.target.value)}
                placeholder="e.g. Apex Precision Logistics"
                required
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

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
          </div>

          <div>
            <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
              Problem Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Automated OCR & Ledger Auto-Reconciliation"
              required
              className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
              Detailed Description &amp; Bottlenecks *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your current manual process, data volume, and desired functional outcome..."
              required
              className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Pilot Grant / Bounty Budget
              </label>
              <input
                type="text"
                value={bounty}
                onChange={(e) => setBounty(e.target.value)}
                placeholder="e.g. $3,500 Pilot Grant"
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
                placeholder="React, FastAPI, PostgreSQL"
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#494454]/30 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full font-mono text-xs uppercase text-[#cbc3d7] hover:text-white hover:bg-[#2a292e] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#d0bcff] text-[#3c0091] font-bold px-7 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-all glow-bloom cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Submit Statement'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
