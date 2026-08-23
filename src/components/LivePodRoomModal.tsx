import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  PhoneOff, 
  MessageSquare, 
  Users, 
  Sparkles, 
  Radio, 
  ShieldCheck, 
  Terminal,
  Send,
  Volume2,
  Settings2,
  FlaskConical
} from 'lucide-react';

interface LivePodRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  podName?: string;
  userRole?: string;
  userName?: string;
}

export const LivePodRoomModal: React.FC<LivePodRoomModalProps> = ({
  isOpen,
  onClose,
  podName = "Pod Apex-2",
  userRole = "student",
  userName = "Dev Patel"
}) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'chat' | 'code'>('video');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: "Sarah Chen (Mentor)", text: "Welcome team! Let's review the API rate-limiting webhook before merging.", time: "10:42 AM", role: "mentor" },
    { sender: "Maya Lin (Pod Lead)", text: "Shared the test suite results. 98.4% pass rate across 140 endpoints.", time: "10:43 AM", role: "student" },
    { sender: "🤖 GURU Co-Pilot", text: "Summary: Sprint 3 milestone coverage is healthy. Ready for Mentor Sign-off Gate.", time: "10:44 AM", role: "ai" }
  ]);

  const [participants] = useState([
    { name: userName, role: `${userRole.toUpperCase()} (You)`, isMuted: !isMicOn, isSpeaking: true, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=dev" },
    { name: "Sarah Chen", role: "STAFF ARCHITECT (MENTOR)", isMuted: false, isSpeaking: false, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=sarah" },
    { name: "Maya Lin", role: "BACKEND LEAD", isMuted: false, isSpeaking: false, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=maya" },
    { name: "Rohan Gupta", role: "AI ENGINEER", isMuted: true, isSpeaking: false, avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=rohan" }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        sender: `${userName} (You)`,
        text: chatInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        role: userRole
      }
    ]);
    setChatInput('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#0d0d14] border border-[#a855f7]/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.3)] flex flex-col h-[90vh] max-h-[800px]"
        >
          {/* Header */}
          <div className="bg-[#151221] px-5 py-3.5 border-b border-white/10 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full animate-pulse">
                <Radio className="w-3 h-3 text-rose-400" />
                <span>LIVE SPRINT ROOM</span>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                <FlaskConical className="w-3 h-3 text-amber-400" />
                <span>🧪 EXPERIMENTAL LABS / TESTING</span>
              </div>

              <h2 className="text-white font-bold text-sm sm:text-base">{podName} &bull; Standup & Pair Programming</h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                WebRTC Mesh &bull; 24ms
              </span>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white text-lg p-1 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Main Stage */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Video Mesh Area */}
            <div className="flex-1 bg-[#09080e] p-4 flex flex-col justify-between overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                {participants.map((p, idx) => (
                  <div 
                    key={idx}
                    className="relative bg-[#171422] rounded-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4 group hover:border-[#a855f7]/50 transition-all min-h-[160px]"
                  >
                    {isVideoOn && idx === 0 ? (
                      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-950/40 to-slate-900">
                        <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-full border-2 border-[#a855f7] shadow-lg animate-pulse" />
                        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <img src={p.avatar} alt={p.name} className="w-14 h-14 rounded-full border border-white/20" />
                        <span className="text-xs text-slate-400">{p.isMuted ? 'Camera & Mic Standby' : 'Audio Stream Active'}</span>
                      </div>
                    )}

                    {/* Participant Badge Overlay */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                      <span className="text-[11px] font-mono font-semibold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                        {p.name} <span className="text-purple-400 text-[10px]">({p.role})</span>
                      </span>
                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/10">
                        {p.isMuted ? (
                          <MicOff className="w-3 h-3 text-rose-400" />
                        ) : (
                          <Volume2 className="w-3 h-3 text-emerald-400 animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notice Banner */}
              <div className="mt-3 bg-purple-950/30 border border-purple-500/20 rounded-xl px-3 py-2 text-[11px] text-purple-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Feature in Active Testing: End-to-end encrypted audio, video, and GURU live transcripts.</span>
                </span>
                <span className="font-mono text-[10px] text-purple-400 uppercase">Status: Testing</span>
              </div>
            </div>

            {/* Right Chat & AI Panel */}
            <div className="w-full md:w-80 bg-[#120f1c] border-t md:border-t-0 md:border-l border-white/10 flex flex-col h-64 md:h-auto">
              <div className="p-3 border-b border-white/10 flex items-center justify-between text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  Sprint Chat & Notes
                </span>
                <span className="text-[10px] text-purple-400">4 Online</span>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-3">
                {messages.map((m, idx) => (
                  <div key={idx} className={`p-2.5 rounded-xl text-xs ${
                    m.role === 'ai' 
                      ? 'bg-purple-950/50 border border-purple-500/30 text-purple-200' 
                      : m.role === 'mentor' 
                      ? 'bg-blue-950/40 border border-blue-500/30 text-blue-100'
                      : 'bg-white/5 border border-white/5 text-slate-200'
                  }`}>
                    <div className="flex items-center justify-between text-[10px] font-mono opacity-70 mb-1">
                      <span className="font-bold">{m.sender}</span>
                      <span>{m.time}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-2.5 border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Type in sprint room..."
                  className="flex-1 bg-[#1a1727] text-white text-xs px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Call Controls Bar */}
          <div className="bg-[#151221] px-5 py-3 border-t border-white/10 flex items-center justify-center sm:justify-between flex-wrap gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>E2E Encrypted Pod Mesh</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-3 rounded-2xl flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all ${
                  isMicOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-rose-500/20 border border-rose-500/50 text-rose-300'
                }`}
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                <span className="hidden sm:inline">{isMicOn ? 'Mute' : 'Unmute'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 rounded-2xl flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all ${
                  isVideoOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-rose-500/20 border border-rose-500/50 text-rose-300'
                }`}
              >
                {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                <span className="hidden sm:inline">{isVideoOn ? 'Stop Cam' : 'Start Cam'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-3 rounded-2xl flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-all ${
                  isScreenSharing ? 'bg-purple-600 text-white' : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">{isScreenSharing ? 'Sharing Screen' : 'Share Screen'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-900/30 transition-all"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Leave Room</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                IN TESTING (V1.2)
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
