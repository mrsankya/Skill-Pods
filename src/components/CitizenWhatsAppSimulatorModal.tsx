import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Mic,
  Paperclip,
  CheckCheck,
  Phone,
  Video,
  Sparkles,
  Bot,
  AlertCircle,
  FileCheck2,
  Clock,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { JharkhandDistrict, ThematicDomain } from '../types';

interface Message {
  id: string;
  sender: 'citizen' | 'bot';
  text: string;
  time: string;
  isAudio?: boolean;
  ticketGenerated?: {
    ticketNo: string;
    domain: ThematicDomain | string;
    district: JharkhandDistrict | string;
    assignedPod: string;
    university: string;
  };
}

interface CitizenWhatsAppSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketCreated?: (ticket: {
    id: string;
    ticketNo: string;
    title: string;
    thematicDomain: string;
    district: string;
    blockVillage: string;
    submitterType: string;
    submitterName: string;
    description: string;
    mediaType: 'voice' | 'text';
  }) => void;
}

export const CitizenWhatsAppSimulatorModal: React.FC<CitizenWhatsAppSimulatorModalProps> = ({
  isOpen,
  onClose,
  onTicketCreated
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: '🙏 Namaste! Jharkhand Sarkar & SkillPods Civic Helpline (+91 9822725265) me aapka swagat hai.\n\nAap direct WhatsApp (+91 9822725265) ya email: sanketbhende0@gmail.com par bhi sampark kar sakte hain.\n\nAap bina kisi technical jhanjhat ke apne gaon ya shahar ki koi bhi samasya (pani, bijli, rasta, swasthya, fasal) yahan text ya voice message me likhkar bhej sakte hain.',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const quickPrompts = [
    {
      label: '💧 Khunti Handpump Fluoride',
      text: 'Hamare Torpa (Khunti) gaon me handpump ka pani laal aur kadwa aa raha hai, bacho ko jod me dard ho raha hai.',
      district: 'Khunti',
      domain: 'Water Resources & Sanitation',
      pod: 'Jal-Rakshak Pod (3 Students)',
      univ: 'IIT (ISM) Dhanbad'
    },
    {
      label: '🌾 Dumka Mahuwa Produce Storage',
      text: 'Dumka me hamare tribal SHG ka mahuwa aur lac barish me sad raha hai, solar drying unit ki jarurat hai.',
      district: 'Dumka',
      domain: 'Rural Livelihoods & Tribal Development',
      pod: 'Van-Sampada Pod',
      univ: 'BIT Mesra / Ranchi University'
    },
    {
      label: '🏥 Chatra PHC Medical Telemetry',
      text: 'Chatra block sub-centre me portable ECG aur BP machine kharab hai, doctor nahi rehte.',
      district: 'Chatra',
      domain: 'Healthcare & Telemedicine',
      pod: 'Aarogya Telemetry Pod',
      univ: 'AIIMS Deoghar / VBU'
    }
  ];

  const handleSend = (overrideText?: string, promptMeta?: any) => {
    const textToSend = (overrideText || inputText).trim();
    if (!textToSend) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'citizen',
      text: textToSend,
      time: timeNow
    };

    setMessages(prev => [...prev, userMsg]);
    if (!overrideText) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      // Automatic Natural Language Triage
      let detectedDistrict: JharkhandDistrict = 'Khunti';
      let detectedDomain: ThematicDomain = 'Water Resources & Sanitation';
      let leadPod = 'Jal-Rakshak Engineering Pod';
      let leadUniv = 'IIT (ISM) Dhanbad';

      const lower = textToSend.toLowerCase();
      if (promptMeta) {
        detectedDistrict = promptMeta.district;
        detectedDomain = promptMeta.domain;
        leadPod = promptMeta.pod;
        leadUniv = promptMeta.univ;
      } else if (lower.includes('dumka') || lower.includes('mahuwa') || lower.includes('forest') || lower.includes('fasal')) {
        detectedDistrict = 'Dumka';
        detectedDomain = 'Rural Livelihoods & Tribal Development';
        leadPod = 'Van-Dhan Innovation Pod';
        leadUniv = 'BIT Mesra';
      } else if (lower.includes('chatra') || lower.includes('doctor') || lower.includes('hospital') || lower.includes('ecg')) {
        detectedDistrict = 'Chatra';
        detectedDomain = 'Healthcare & Telemedicine';
        leadPod = 'Tele-Swasthya Pod';
        leadUniv = 'AIIMS Deoghar';
      } else if (lower.includes('palamu') || lower.includes('sukha') || lower.includes('irrigation')) {
        detectedDistrict = 'Palamu';
        detectedDomain = 'Agriculture & Irrigation';
        leadPod = 'Krishi Telemetry Pod';
        leadUniv = 'Birsa Agricultural University';
      } else if (lower.includes('ranchi') || lower.includes('kachra') || lower.includes('plastic')) {
        detectedDistrict = 'Ranchi';
        detectedDomain = 'Urban Infrastructure & Waste Management';
        leadPod = 'Clean-City Automation Pod';
        leadUniv = 'Central University of Jharkhand';
      }

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const ticketNo = `JH-WA-${detectedDistrict.slice(0, 3).toUpperCase()}-${randomSuffix}`;

      const botReply: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `✅ Dhanyawad! Aapki shikayat safalta-poorvak darj kar li gayi hai.\n\nAI Engine dwara vishleshan sampann hua:\n• Jila: ${detectedDistrict}\n• Kshetra: ${detectedDomain}\n• Aawantit Sansthan: ${leadUniv}\n\nYeh issue turant Public Portal aur Sambandhit BDO Office ko bhej diya gaya hai. SMS update aapke number par aata rahega.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ticketGenerated: {
          ticketNo,
          domain: detectedDomain,
          district: detectedDistrict,
          assignedPod: leadPod,
          university: leadUniv
        }
      };

      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);

      if (onTicketCreated) {
        onTicketCreated({
          id: `wa-${Date.now()}`,
          ticketNo,
          title: textToSend.slice(0, 80) + (textToSend.length > 80 ? '...' : ''),
          thematicDomain: detectedDomain,
          district: detectedDistrict,
          blockVillage: `${detectedDistrict} Ground Sector (WhatsApp Intake)`,
          submitterType: 'Grassroots Citizen (WhatsApp/SMS)',
          submitterName: 'Panchayat Citizen',
          description: textToSend,
          mediaType: 'text'
        });
      }
    }, 1200);
  };

  const handleSimulateVoiceNote = () => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const voiceMsg: Message = {
      id: `usr-voice-${Date.now()}`,
      sender: 'citizen',
      text: '🎙️ Voice Note (0:18s) - "Gaon Torpa me handpump me fluoride ki wajah se bache bimar ho rahe hain..."',
      time: timeNow,
      isAudio: true
    };

    setMessages(prev => [...prev, voiceMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const ticketNo = `JH-VOICE-KHU-${Math.floor(1000 + Math.random() * 9000)}`;
      const botReply: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🎙️ Voice Note AI Transcription Completed (Hindi/Sadri):\n"Gaon Torpa me handpump me fluoride ki wajah se bache bimar ho rahe hain"\n\n✅ Ticket Number: ${ticketNo}\n• District: Khunti\n• Domain: Water Resources & Sanitation\n• Assigned: Jal-Rakshak Pod (IIT Dhanbad)`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ticketGenerated: {
          ticketNo,
          domain: 'Water Resources & Sanitation',
          district: 'Khunti',
          assignedPod: 'Jal-Rakshak Pod (3 Students)',
          university: 'IIT (ISM) Dhanbad'
        }
      };
      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);

      if (onTicketCreated) {
        onTicketCreated({
          id: `wa-voice-${Date.now()}`,
          ticketNo,
          title: 'Fluoride & Heavy Metal Contamination in Handpumps (Voice Note)',
          thematicDomain: 'Water Resources & Sanitation',
          district: 'Khunti',
          blockVillage: 'Torpa Block (Voice Helpline)',
          submitterType: 'Villager (WhatsApp Voice Note)',
          submitterName: 'Ramesh Munda',
          description: 'Citizen audio recording reporting skeletal symptoms in school children from handpump water.',
          mediaType: 'voice'
        });
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-[#0c1317] border border-[#253238] rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[640px] max-h-[92vh]"
      >
        {/* WhatsApp Top Header Bar */}
        <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between border-b border-[#2b3940] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow-md">
                🏛️
              </div>
              <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#202c33] absolute bottom-0 right-0" />
            </div>

            <div>
              <div className="text-sm font-bold flex items-center gap-1.5">
                <span>Jharkhand MIC Sahayata</span>
                <span className="px-1.5 py-0.2 rounded-sm bg-emerald-500/20 text-emerald-300 text-[9px] font-mono">
                  Verified ✓
                </span>
              </div>
              <div className="text-[11px] text-emerald-400 font-mono">Helpline: +91 9822725265</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMessages([
                  {
                    id: 'msg-1',
                    sender: 'bot',
                    text: '🙏 Namaste! Jharkhand Sarkar & SkillPods Civic Helpline (+91 9822725265) me aapka swagat hai.\n\nAap direct WhatsApp (+91 9822725265) ya email: sanketbhende0@gmail.com par bhi sampark kar sakte hain.\n\nAap bina kisi technical jhanjhat ke apne gaon ya shahar ki koi bhi samasya text ya voice message me likhkar bhej sakte hain.',
                    time: 'Just now'
                  }
                ]);
              }}
              title="Reset Chat"
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info Banner with Direct WhatsApp action */}
        <div className="bg-[#182229] px-3.5 py-2 border-b border-[#253238] flex items-center justify-between text-[11px] text-[#8696a0]">
          <a
            href="https://wa.me/919822725265?text=Namaste%20Jharkhand%20MIC%20Civic%20Helpline"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition-colors"
          >
            <span>Chat on WhatsApp: +91 9822725265</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-emerald-400 font-mono font-bold">24 Districts Linked</span>
        </div>

        {/* Quick Prompts Carousel */}
        <div className="p-2.5 bg-[#111b21] border-b border-[#222e35] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[10px] text-[#8696a0] font-mono shrink-0">Try 1-Tap:</span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp.text, qp)}
              className="px-2.5 py-1 rounded-full bg-[#202c33] hover:bg-[#2a3942] border border-[#2d3a43] text-emerald-300 text-[11px] whitespace-nowrap cursor-pointer transition-colors"
            >
              {qp.label}
            </button>
          ))}
          <button
            onClick={handleSimulateVoiceNote}
            className="px-2.5 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 text-[11px] whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1"
          >
            <Mic className="w-3 h-3" />
            <span>🎙️ Send Voice Audio</span>
          </button>
        </div>

        {/* Message Thread Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0b141a] bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${m.sender === 'citizen' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] shadow-md leading-relaxed ${
                  m.sender === 'citizen'
                    ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none'
                    : 'bg-[#202c33] text-[#d1d7db] rounded-tl-none border border-[#2a3942]'
                }`}
              >
                {m.isAudio ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-300">
                      <Mic className="w-4 h-4 text-rose-400 animate-pulse" />
                      <span>Voice Note (Sadri/Hindi)</span>
                    </div>
                    <div className="h-4 flex items-center gap-0.5">
                      {[40, 70, 25, 90, 60, 45, 80, 100, 30, 85, 40, 65, 30, 95].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 bg-emerald-400 rounded-full"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="text-[11px] text-slate-300 pt-1 border-t border-white/10">{m.text}</div>
                  </div>
                ) : (
                  <div className="whitespace-pre-line">{m.text}</div>
                )}

                {/* Ticket Card generated inside chat */}
                {m.ticketGenerated && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-[#111b21] border border-emerald-500/40 text-[11px] space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                      <span>🎫 {m.ticketGenerated.ticketNo}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-emerald-500/20">LIVE ON PORTAL</span>
                    </div>
                    <div className="text-slate-300">
                      <strong>District:</strong> {m.ticketGenerated.district}
                    </div>
                    <div className="text-slate-300">
                      <strong>Pod Assigned:</strong> {m.ticketGenerated.assignedPod}
                    </div>
                    <div className="text-indigo-300">
                      <strong>HEI:</strong> {m.ticketGenerated.university}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#8696a0]">
                  <span>{m.time}</span>
                  {m.sender === 'citizen' && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#202c33] text-slate-400 text-xs w-28">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[10px] font-mono ml-1">AI Typing</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-[#202c33] border-t border-[#2b3940] flex items-center gap-2 shrink-0"
        >
          <button
            type="button"
            onClick={handleSimulateVoiceNote}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#8696a0] hover:text-emerald-400 transition-colors cursor-pointer"
            title="Record Voice Note"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your issue in Hindi or English..."
            className="flex-1 bg-[#2a3942] rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#8696a0] focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-full bg-[#00a884] hover:bg-[#02906f] text-[#111b21] disabled:opacity-40 disabled:hover:bg-[#00a884] transition-all cursor-pointer font-bold shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
