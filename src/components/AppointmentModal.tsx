import React, { useState } from 'react';
import { X, Calendar, Clock, UserCheck, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow, 2:00 PM EST');
  const [sessionType, setSessionType] = useState<'sme' | 'student' | 'mentor'>('sme');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#141120] border border-[#a87ffb]/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(168,127,251,0.35)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#958ea0] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-[#d0bcff] font-mono text-xs mb-2 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#a87ffb]" />
          <span>SKILL PODS CONSULTATION</span>
        </div>

        <h3 className="font-geist text-2xl sm:text-3xl font-bold text-white mb-2">
          Book an Appointment
        </h3>
        <p className="text-xs sm:text-sm text-[#cbc3d7] mb-6">
          Schedule a 1-on-1 architecture scoping session with our principal engineering directors.
        </p>

        {submitted ? (
          <div className="bg-[#10b981]/15 border border-[#10b981]/40 text-[#10b981] p-6 rounded-2xl text-center font-mono">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[#10b981]" />
            <div className="text-sm font-bold">Appointment Confirmed!</div>
            <div className="text-xs text-white/80 mt-1">
              Calendar invite and private Google Meet link dispatched to {email}.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Consultation Role Switch */}
            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Session Focus
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'sme', label: 'SME Client' },
                  { id: 'student', label: 'Student Pod' },
                  { id: 'mentor', label: 'Mentor Staff' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSessionType(item.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono transition-all ${
                      sessionType === item.id
                        ? 'bg-[#a87ffb]/25 border border-[#a87ffb] text-white font-bold'
                        : 'bg-[#1b172a] border border-white/10 text-[#958ea0] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Thorne"
                required
                className="w-full bg-[#1b172a] border border-white/15 focus:border-[#a87ffb] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@enterprise.com"
                required
                className="w-full bg-[#1b172a] border border-white/15 focus:border-[#a87ffb] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[#cbc3d7] uppercase mb-1.5">
                Select Time Slot
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#1b172a] border border-white/15 focus:border-[#a87ffb] rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none"
              >
                <option value="Tomorrow, 2:00 PM EST">Tomorrow, 2:00 PM EST (15 min scoping)</option>
                <option value="Tomorrow, 4:30 PM EST">Tomorrow, 4:30 PM EST (15 min scoping)</option>
                <option value="Wednesday, 11:00 AM EST">Wednesday, 11:00 AM EST (15 min scoping)</option>
                <option value="Thursday, 3:00 PM EST">Thursday, 3:00 PM EST (15 min scoping)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#d0bcff] text-[#3c0091] font-bold py-3.5 rounded-full font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-all glow-bloom cursor-pointer mt-4 flex items-center justify-center gap-2"
            >
              <span>Confirm Scoping Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
