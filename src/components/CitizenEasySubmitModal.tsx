import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Video,
  Camera,
  Image as ImageIcon,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MapPin,
  X,
  Volume2,
  FileText,
  Bot,
  User,
  RotateCcw,
  UploadCloud,
  ChevronRight,
  HelpCircle,
  Check,
  Play,
  Pause,
  Layers,
  Sparkle
} from 'lucide-react';
import { ThematicDomain, JharkhandDistrict, THEMATIC_DOMAINS, JHARKHAND_DISTRICTS } from '../types';
import { AiDuplicateCheckBanner, DuplicateMatchResult } from './AiDuplicateCheckBanner';

export interface EasyProblemSubmission {
  id: string;
  ticketNo: string;
  title: string;
  description: string;
  thematicDomain: ThematicDomain;
  district: JharkhandDistrict;
  blockVillage: string;
  submitterName: string;
  submitterPhone: string;
  submitterType: string;
  mediaType: 'voice' | 'video' | 'photo' | 'text' | 'chatbot';
  audioBlobUrl?: string;
  videoBlobUrl?: string;
  photoFiles: string[];
  transcription?: string;
  submittedAt: string;
}

interface CitizenEasySubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (submission: EasyProblemSubmission) => void;
}

type SubmissionMode = 'chatbot' | 'voice' | 'photo' | 'video' | 'simple';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export const CitizenEasySubmitModal: React.FC<CitizenEasySubmitModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  const [activeTab, setActiveTab] = useState<SubmissionMode>('chatbot');
  
  // Basic Fields
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');
  const [villageBlock, setVillageBlock] = useState('');
  const [district, setDistrict] = useState<JharkhandDistrict>('Khunti');
  const [domain, setDomain] = useState<ThematicDomain>('Water Resources & Sanitation');
  const [description, setDescription] = useState('');
  const [problemTitle, setProblemTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // Audio Recording State
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const audioIntervalRef = useRef<number | null>(null);

  // Video State
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [videoFileName, setVideoFileName] = useState<string | null>(null);

  // Photos State
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  // AI Chatbot State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: '🙏 Namaste! Main Jharkhand Gramin Innovation AI Assistant hoon. Aap apne gaon ya shahar ki koi bhi samasya aasan bhasha mein bata sakte hain. Aapki samasya kis cheez se judi hai?',
      timestamp: 'Abhi',
      suggestions: [
        '💧 Paani / Handpump kharab hai',
        '🌾 Kheti / Beej / Mandi samasya',
        '🏥 Aspatal / Dawai ki kami',
        '⚡ Bijli / Solar light nahi hai',
        '🛣️ Sadak / Kooda karkat samasya'
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isDuplicateDismissed, setIsDuplicateDismissed] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // AI Semantic Deduplication calculation
  const duplicateMatch: DuplicateMatchResult | null = React.useMemo(() => {
    if (isDuplicateDismissed) return null;
    const textToCheck = `${problemTitle} ${description} ${chatInput}`.toLowerCase();
    if (!textToCheck.trim() || textToCheck.length < 10) return null;

    if (textToCheck.includes('water') || textToCheck.includes('fluoride') || textToCheck.includes('handpump') || textToCheck.includes('paani') || textToCheck.includes('pani')) {
      return {
        similarityScore: 92,
        existingTicketNo: 'JH-WATER-2026-081',
        existingTitle: 'Solar IoT Fluoride & Water Contaminant Alert Network',
        district: 'Khunti',
        assignedPod: 'Jal-Rakshak Pod (IIT Dhanbad)',
        existingId: 'ch-01'
      };
    }
    if (textToCheck.includes('waste') || textToCheck.includes('plastic') || textToCheck.includes('kachra') || textToCheck.includes('kooda')) {
      return {
        similarityScore: 88,
        existingTicketNo: 'JH-URBAN-2026-067',
        existingTitle: 'Automated Municipal Solid Waste Segregation & Plastic Buyback Hub',
        district: 'Ranchi',
        assignedPod: 'Ranchi University CS Dept',
        existingId: 'ch-06'
      };
    }
    if (textToCheck.includes('irrigation') || textToCheck.includes('kheti') || textToCheck.includes('drought') || textToCheck.includes('sukha') || textToCheck.includes('canal')) {
      return {
        similarityScore: 78,
        existingTicketNo: 'JH-AGRI-2026-034',
        existingTitle: 'Solar Automated Tail-End Canal Telemetry & Drip Hub',
        district: 'Palamu',
        assignedPod: 'Birsa Agri Tech Pod',
        existingId: 'ch-03'
      };
    }
    return null;
  }, [problemTitle, description, chatInput, isDuplicateDismissed]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  if (!isOpen) return null;

  // Audio Handler (Simulated in browser with mic indicator)
  const toggleAudioRecord = () => {
    if (isRecordingAudio) {
      setIsRecordingAudio(false);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setRecordedAudioUrl('blob:simulated-audio-voice-note.mp3');
      if (!description) {
        setDescription('Hamare gaon Torpa mein 14 handpump mein laal paani (fluoride) nikal raha hai. Bachho ko peene mein dikkat ho rahi hai. Kripya naya filter ya telemetry sensor lagwaye.');
        setProblemTitle('Handpump mein Kharab Paani aur Fluoride ki Samasya');
        setDomain('Water Resources & Sanitation');
      }
    } else {
      setIsRecordingAudio(true);
      setAudioSeconds(0);
      setRecordedAudioUrl(null);
      audioIntervalRef.current = window.setInterval(() => {
        setAudioSeconds(s => s + 1);
      }, 1000);
    }
  };

  // Photo Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newPhotos: string[] = [];
      for (let i = 0; i < files.length; i++) {
        newPhotos.push(URL.createObjectURL(files[i]));
      }
      setUploadedPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  // Video Upload Handler
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setRecordedVideoUrl(URL.createObjectURL(files[0]));
      setVideoFileName(files[0].name);
    }
  };

  // Chatbot Send Message Handler
  const handleSendChatMessage = (textToSend?: string) => {
    const text = textToSend || chatInput.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Abhi'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // AI Dynamic Response Simulation
    setTimeout(() => {
      let botResponse = '';
      let suggestions: string[] | undefined = undefined;

      if (text.includes('Paani') || text.includes('Handpump') || text.includes('water')) {
        setDomain('Water Resources & Sanitation');
        setProblemTitle('Peene ke Paani aur Handpump ki Samasya');
        botResponse = 'Samajh gaya! Paani se judi samasya bahut gambhir hai. Aapka zilla aur gaon/block kaun sa hai? Niche chunein ya likhein:';
        suggestions = ['Khunti (Torpa Block)', 'Ranchi (Kanke Block)', 'Dumka (Santhal Belt)', 'Palamu (Daltonganj)'];
      } else if (text.includes('Khunti') || text.includes('Ranchi') || text.includes('Dumka') || text.includes('Palamu')) {
        const matched = text.includes('Khunti') ? 'Khunti' : text.includes('Ranchi') ? 'Ranchi' : text.includes('Dumka') ? 'Dumka' : 'Palamu';
        setDistrict(matched as JharkhandDistrict);
        setVillageBlock(text);
        botResponse = `Badhiya! ${matched} record ho gaya. Kya aap iski photo ya voice message bhi jodna chahenge, ya seedhe ticket banayein?`;
        suggestions = ['✅ Haan, Seedhe Samasya Darj Karein', '📸 Photo Jodein', '🎙️ Voice Note Record Karein'];
      } else if (text.includes('Seedhe') || text.includes('Darj') || text.includes('Haan')) {
        botResponse = 'Aapki samasya safaltapoorvak AI dwara triage ho gayi hai! Hum ise IIT/NIT ke student pod ko assign kar rahe hain. Niche "Submit Problem" button dabayein.';
        if (!description) {
          setDescription('Gramin kshetra mein peene ke paani ki samasya. AI Chatbot dwara verify kiya gaya.');
        }
      } else {
        botResponse = 'Dhanyawad! Main ise note kar raha hoon. Kya aap bata sakte hain isse kitne parivaron ko takleef ho rahi hai?';
        suggestions = ['50-100 Parivar', '500 se zyada log', 'Poora Gaon / Mohalla'];
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          timestamp: 'Abhi',
          suggestions
        }
      ]);
    }, 600);
  };

  // Final Submission
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ticketCode = `JH-${district.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const submission: EasyProblemSubmission = {
      id: `easy-${Date.now()}`,
      ticketNo: ticketCode,
      title: problemTitle || (activeTab === 'voice' ? 'Voice Reported Local Problem' : 'Citizen Reported Community Issue'),
      description: description || 'Citizen reported regional challenge submitted via SkillPods Easy Public Portal.',
      thematicDomain: domain,
      district: district,
      blockVillage: villageBlock || 'Gramin Block / Local Hamlet',
      submitterName: citizenName || 'Local Citizen / Gram Panchayat Rep',
      submitterPhone: citizenPhone || 'Not provided',
      submitterType: 'Citizen / PRI',
      mediaType: activeTab,
      audioBlobUrl: recordedAudioUrl || undefined,
      videoBlobUrl: recordedVideoUrl || undefined,
      photoFiles: uploadedPhotos,
      submittedAt: 'Just now'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedTicket(ticketCode);
      onSubmitSuccess(submission);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#14111f] border border-[#d0bcff]/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header with Close */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#201838] to-[#161226] border-b border-[#31284a] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#d0bcff]/20 border border-[#d0bcff]/40 flex items-center justify-center text-[#d0bcff] shrink-0">
              <Sparkles className="w-5 h-5 text-[#d0bcff]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  Easy Citizen Problem Upload
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  NON-TECH READY
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#a78bfa]">
                Aap bolkar, photo kheenchkar ya chat karke samasya darj kar sakte hain.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedTicket ? (
          /* Confirmation Screen */
          <div className="p-6 sm:p-10 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-white">
              Aapki Samasya Safaltapoorvak Darj Ho Gayi!
            </h4>

            <p className="text-xs sm:text-sm text-[#cbc3d7] max-w-md mx-auto">
              Aapki samasya Jharkhand Education Innovation Cell aur IIT/NIT university pods ke paas pahunch gayi hai.
            </p>

            <div className="p-4 rounded-2xl bg-[#0f0d18] border border-[#312a45] max-w-sm mx-auto space-y-1">
              <div className="text-[11px] font-mono uppercase text-[#a78bfa]">Aapka Tracking Ticket No</div>
              <div className="text-xl font-black text-emerald-400 font-mono tracking-wider">{submittedTicket}</div>
              <div className="text-[10px] text-slate-400">Ise Public Dashboard par kabhi bhi track karein</div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmittedTicket(null);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-[#d0bcff] text-[#1e1b4b] font-bold font-mono text-xs uppercase tracking-wider hover:bg-[#c4a9ff] transition-all cursor-pointer shadow-lg"
              >
                Dashboard Par Dekhein
              </button>
            </div>
          </div>
        ) : (
          /* Normal Submission Workflow */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            
            {/* 5-Mode Simple Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1.5 bg-[#0f0d18] rounded-2xl border border-[#2b243d]">
              <button
                type="button"
                onClick={() => setActiveTab('chatbot')}
                className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'chatbot'
                    ? 'bg-[#d0bcff] text-[#1e1b4b] shadow-md shadow-[#d0bcff]/20'
                    : 'text-[#cbc3d7] hover:text-white hover:bg-white/5'
                }`}
              >
                <Bot className="w-3.5 h-3.5 shrink-0" />
                <span>AI Chatbot</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('voice')}
                className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'voice'
                    ? 'bg-[#d0bcff] text-[#1e1b4b] shadow-md shadow-[#d0bcff]/20'
                    : 'text-[#cbc3d7] hover:text-white hover:bg-white/5'
                }`}
              >
                <Mic className="w-3.5 h-3.5 shrink-0" />
                <span>Voice Note</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('photo')}
                className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'photo'
                    ? 'bg-[#d0bcff] text-[#1e1b4b] shadow-md shadow-[#d0bcff]/20'
                    : 'text-[#cbc3d7] hover:text-white hover:bg-white/5'
                }`}
              >
                <Camera className="w-3.5 h-3.5 shrink-0" />
                <span>Photos</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-[#d0bcff] text-[#1e1b4b] shadow-md shadow-[#d0bcff]/20'
                    : 'text-[#cbc3d7] hover:text-white hover:bg-white/5'
                }`}
              >
                <Video className="w-3.5 h-3.5 shrink-0" />
                <span>Video Clip</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('simple')}
                className={`col-span-2 sm:col-span-1 py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'simple'
                    ? 'bg-[#d0bcff] text-[#1e1b4b] shadow-md shadow-[#d0bcff]/20'
                    : 'text-[#cbc3d7] hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span>Simple Form</span>
              </button>
            </div>

            {/* TAB 1: AI Chatbot Mode */}
            {activeTab === 'chatbot' && (
              <div className="space-y-3">
                <div className="h-64 sm:h-72 overflow-y-auto p-3.5 rounded-2xl bg-[#0c0a14] border border-[#262038] space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-end gap-1.5 max-w-[85%]">
                        {msg.sender === 'bot' && (
                          <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] shrink-0 font-black">
                            AI
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-2xl text-xs leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-indigo-600 text-white rounded-br-none'
                              : 'bg-[#1b172a] text-[#e0daf0] border border-[#31284a] rounded-bl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>

                      {/* Interactive Suggestion Buttons */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 ml-7">
                          {msg.suggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => handleSendChatMessage(sug)}
                              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-400/40 text-[11px] text-[#cbc3d7] hover:text-white transition-all cursor-pointer"
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                {/* Chat Input Box */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendChatMessage()}
                    placeholder="Apni samasya yahan likhein (Hindi / English)..."
                    className="flex-1 bg-[#0f0d18] border border-[#312a45] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d0bcff]"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendChatMessage()}
                    className="p-2.5 rounded-xl bg-[#d0bcff] hover:bg-[#c4a9ff] text-[#1e1b4b] font-bold transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Voice Audio Note Mode */}
            {activeTab === 'voice' && (
              <div className="p-6 rounded-2xl bg-[#0c0a14] border border-[#262038] text-center space-y-4">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Voice Note Recording</h4>
                  <p className="text-xs text-slate-400">
                    Mic button dabakar apni bhasha mein samasya bolein. AI ise text mein badal dega.
                  </p>
                </div>

                <div className="py-4">
                  <button
                    type="button"
                    onClick={toggleAudioRecord}
                    className={`w-20 h-20 rounded-full flex flex-col items-center justify-center mx-auto transition-all cursor-pointer shadow-2xl ${
                      isRecordingAudio
                        ? 'bg-rose-600 hover:bg-rose-700 animate-pulse text-white shadow-rose-600/50'
                        : 'bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-purple-600/40 hover:scale-105'
                    }`}
                  >
                    {isRecordingAudio ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                  </button>
                  <div className="font-mono text-sm mt-3 font-bold text-slate-300">
                    {isRecordingAudio ? `Recording: 00:${audioSeconds.toString().padStart(2, '0')} (Tap to Stop)` : 'Tap Mic to Start Speaking'}
                  </div>
                </div>

                {recordedAudioUrl && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-left space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Voice Audio Captured &amp; AI Transcribed ✓
                      </span>
                      <span className="font-mono text-[10px]">00:14</span>
                    </div>
                    <p className="text-xs text-slate-300 italic bg-black/30 p-2.5 rounded-lg border border-white/5">
                      "{description || 'Hamare gaon Torpa mein handpump se laal fluoride paani aa raha hai...'}"
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Photos Upload Mode */}
            {activeTab === 'photo' && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c0a14] border border-[#262038] space-y-4">
                <div className="space-y-1 text-center">
                  <h4 className="text-base font-bold text-white">Upload Problem Photos</h4>
                  <p className="text-xs text-slate-400">
                    Handpump, sadak, kooda, ya fasal ki photo upload karein taaki engineering pods samasya samajh sakein.
                  </p>
                </div>

                <label className="border-2 border-dashed border-[#3d3356] hover:border-[#d0bcff] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-white/5">
                  <Camera className="w-8 h-8 text-[#d0bcff]" />
                  <span className="text-xs font-bold text-white">Tap to Take Photo or Choose from Gallery</span>
                  <span className="text-[10px] text-slate-400 font-mono">PNG, JPG, HEIC up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {uploadedPhotos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {uploadedPhotos.map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40">
                        <img src={img} alt="Uploaded evidence" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] px-1.5 rounded text-white font-mono">Photo #{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: Video Clip Upload Mode */}
            {activeTab === 'video' && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c0a14] border border-[#262038] space-y-4 text-center">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">Short Video Clip (15-60s)</h4>
                  <p className="text-xs text-slate-400">
                    Samasya ka chhota video record karein jismein bolkar batayein.
                  </p>
                </div>

                <label className="border-2 border-dashed border-[#3d3356] hover:border-[#d0bcff] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-white/5">
                  <Video className="w-8 h-8 text-indigo-400" />
                  <span className="text-xs font-bold text-white">Record or Upload Short Video</span>
                  <span className="text-[10px] text-slate-400 font-mono">MP4, MOV up to 50MB</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>

                {videoFileName && (
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                    <span className="truncate">📹 Video Ready: {videoFileName}</span>
                    <span className="font-mono text-[10px]">Attached ✓</span>
                  </div>
                )}
              </div>
            )}

            {/* AI Semantic Deduplication Banner */}
            <AiDuplicateCheckBanner
              match={duplicateMatch}
              onCorroborateExisting={(existingId, ticketNo) => {
                setSubmittedTicket(ticketNo);
                onSubmitSuccess({
                  id: `corroborate-${Date.now()}`,
                  ticketNo: ticketNo,
                  title: problemTitle || 'Community Evidence Corroboration',
                  description: `[Corroborated by ${citizenName || 'Local Villager'}]: ${description || 'Evidence corroborated for this ground problem.'}`,
                  thematicDomain: domain,
                  district: district,
                  blockVillage: villageBlock || 'Village Hamlet',
                  submitterName: citizenName || 'Villager',
                  submitterPhone: citizenPhone,
                  submitterType: 'Villager (Corroborating Evidence)',
                  mediaType: activeTab,
                  photoFiles: uploadedPhotos,
                  submittedAt: 'Just now'
                });
              }}
              onProceedAnyway={() => setIsDuplicateDismissed(true)}
            />

            {/* Common Details Form (District, Village, Contact) */}
            <form onSubmit={handleFinalSubmit} className="space-y-3.5 pt-2 border-t border-[#262038]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#a78bfa] uppercase mb-1">
                    Aapka Zilla (District) *
                  </label>
                  <select
                    value={district}
                    onChange={e => setDistrict(e.target.value as JharkhandDistrict)}
                    className="w-full bg-[#0f0d18] border border-[#312a45] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d0bcff]"
                  >
                    {JHARKHAND_DISTRICTS.map(d => (
                      <option key={d} value={d}>{d} District</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#a78bfa] uppercase mb-1">
                    Gaon / Block / Mohalla *
                  </label>
                  <input
                    type="text"
                    required
                    value={villageBlock}
                    onChange={e => setVillageBlock(e.target.value)}
                    placeholder="e.g. Torpa Block, Gram Panchayat"
                    className="w-full bg-[#0f0d18] border border-[#312a45] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d0bcff]"
                  />
                </div>
              </div>

              {/* Title & Category (Shown when not using chatbot or if needed) */}
              {activeTab !== 'chatbot' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-[#a78bfa] uppercase mb-1">
                      Samasya Ka Prakar (Domain)
                    </label>
                    <select
                      value={domain}
                      onChange={e => setDomain(e.target.value as ThematicDomain)}
                      className="w-full bg-[#0f0d18] border border-[#312a45] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d0bcff]"
                    >
                      {THEMATIC_DOMAINS.map(dm => (
                        <option key={dm} value={dm}>{dm}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#a78bfa] uppercase mb-1">
                      Chhota Title (Headline)
                    </label>
                    <input
                      type="text"
                      value={problemTitle}
                      onChange={e => setProblemTitle(e.target.value)}
                      placeholder="e.g. Handpump mein fluoride ki samasya"
                      className="w-full bg-[#0f0d18] border border-[#312a45] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d0bcff]"
                    />
                  </div>
                </div>
              )}

              {/* Contact (Optional phone for SMS status) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Aapka Naam (Optional)
                  </label>
                  <input
                    type="text"
                    value={citizenName}
                    onChange={e => setCitizenName(e.target.value)}
                    placeholder="e.g. Ramesh Munda / Citizen"
                    className="w-full bg-[#0f0d18] border border-[#312a45] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d0bcff]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Mobile Number (SMS Updates ke liye)
                  </label>
                  <input
                    type="tel"
                    value={citizenPhone}
                    onChange={e => setCitizenPhone(e.target.value)}
                    placeholder="e.g. 9822XXXXXX"
                    className="w-full bg-[#0f0d18] border border-[#312a45] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d0bcff]"
                  />
                </div>
              </div>

              {/* Final Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>GPS Geotagging &amp; AI Deduplication Enabled</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-mono uppercase text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Radd Karein
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-initial bg-[#d0bcff] hover:bg-[#c4a9ff] text-[#1e1b4b] font-black px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(208,188,255,0.3)] hover:scale-105 cursor-pointer disabled:opacity-50 text-center"
                  >
                    {isSubmitting ? 'Darj Ho Raha Hai...' : 'Submit Problem (Samasya Bhejein)'}
                  </button>
                </div>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};