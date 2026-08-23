import React, { useState } from 'react';
import { X, GraduationCap, Briefcase, CheckCircle2, User, Mail, Sparkles, Send } from 'lucide-react';

interface JoinCohortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplicationSuccess: (msg: string) => void;
}

export const JoinCohortModal: React.FC<JoinCohortModalProps> = ({
  isOpen,
  onClose,
  onApplicationSuccess
}) => {
  const [roleType, setRoleType] = useState<'student' | 'mentor'>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [track, setTrack] = useState('Full-Stack Engineering');
  const [background, setBackground] = useState('');
  const [github, setGithub] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: roleType,
          name,
          email,
          track,
          background,
          githubOrLinkedin: github
        })
      });

      const data = await res.json();
      setSuccess(data.message || 'Application submitted successfully!');
      onApplicationSuccess(`Welcome ${name}! Application registered for the upcoming pod cohort.`);
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 1800);
    } catch (err) {
      setSuccess(`Application received! Welcome to Skill Pods, ${name}.`);
      onApplicationSuccess(`Welcome ${name}! Application registered for the upcoming pod cohort.`);
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#1b1b1f] border border-[#d0bcff]/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#958ea0] hover:text-white p-1 rounded-full hover:bg-[#2a292e] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Role Toggle */}
        <div className="flex bg-[#131317] p-1 rounded-2xl border border-[#494454]/40 mb-6 max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => setRoleType('student')}
            className={`flex-1 py-2 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              roleType === 'student'
                ? 'bg-[#d0bcff] text-[#3c0091] font-bold shadow-md'
                : 'text-[#cbc3d7] hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Builder</span>
          </button>
          <button
            type="button"
            onClick={() => setRoleType('mentor')}
            className={`flex-1 py-2 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              roleType === 'mentor'
                ? 'bg-[#d0bcff] text-[#3c0091] font-bold shadow-md'
                : 'text-[#cbc3d7] hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Industry Mentor</span>
          </button>
        </div>

        <h3 className="font-geist text-2xl font-bold text-white text-center mb-1">
          {roleType === 'student' ? 'Join as a Student Builder' : 'Apply as an Industry Mentor'}
        </h3>
        <p className="text-xs sm:text-sm text-[#cbc3d7] text-center mb-6">
          {roleType === 'student'
            ? 'Collaborate in 4-person multidisciplinary pods to ship real software for verified businesses.'
            : 'Guide elite student pods through architectural design, weekly sprint reviews, and production readiness.'}
        </p>

        {success ? (
          <div className="bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] p-4 rounded-xl mb-5 flex items-center gap-3 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{success}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Thorne"
                required
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@university.edu"
                required
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Primary Engineering Domain
              </label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              >
                <option value="Full-Stack Engineering">Full-Stack (React, Node, TypeScript)</option>
                <option value="Backend & Distributed Systems">Backend &amp; Distributed Systems (Go, Python, Rust)</option>
                <option value="AI & Machine Learning Pipelines">AI &amp; Machine Learning Pipelines</option>
                <option value="DevOps, SRE & Cloud Infra">DevOps, SRE &amp; Cloud Infra (Docker, K8s, AWS)</option>
                <option value="Mobile / IoT Systems">Mobile / IoT Systems (PWA, React Native, MQTT)</option>
                <option value="UI/UX Architecture & Product Specs">UI/UX Architecture &amp; Product Specs</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                GitHub / LinkedIn / Portfolio URL
              </label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/username or linkedin.com/in/profile"
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                {roleType === 'student' ? 'University & Graduation Year' : 'Current Company & Seniority Level'}
              </label>
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder={roleType === 'student' ? 'e.g. Stanford University, Class of 2026' : 'e.g. Staff Software Engineer @ Datadog'}
                className="w-full bg-[#131317] border border-[#494454]/40 focus:border-[#d0bcff] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-4 border-t border-[#494454]/30">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d0bcff] text-[#3c0091] font-bold py-3.5 rounded-full font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-all glow-bloom cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Registering...' : 'Submit Application'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
