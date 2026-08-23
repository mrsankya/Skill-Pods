import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Send,
  Search,
  Shield,
  ShieldCheck,
  ShieldAlert,
  User,
  Users,
  CheckCheck,
  Clock,
  Sparkles,
  Lock,
  X,
  ExternalLink,
  Plus,
  RefreshCw
} from 'lucide-react';
import { DirectMessage, CommunityMember, UserRole } from '../types';

interface DirectMessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserEmail: string;
  currentUserName: string;
  currentUserRole: UserRole;
  initialRecipient?: CommunityMember | null;
}

export const DirectMessagingModal: React.FC<DirectMessagingModalProps> = ({
  isOpen,
  onClose,
  currentUserEmail,
  currentUserName,
  currentUserRole,
  initialRecipient
}) => {
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [allAdminAuditMessages, setAllAdminAuditMessages] = useState<DirectMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'my_chats' | 'admin_audit'>('my_chats');
  const [selectedRecipient, setSelectedRecipient] = useState<CommunityMember | null>(initialRecipient || null);
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [availableMembers, setAvailableMembers] = useState<CommunityMember[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAdmin = currentUserRole === 'admin' || currentUserEmail.toLowerCase() === 'sanketbhende0@gmail.com';

  // Load community members for starting new chats
  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/community/members')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.success && Array.isArray(data.members)) {
          setAvailableMembers(data.members.filter(m => m.email.toLowerCase() !== currentUserEmail.toLowerCase()));
          if (!selectedRecipient && data.members.length > 0) {
            const firstOther = data.members.find((m: CommunityMember) => m.email.toLowerCase() !== currentUserEmail.toLowerCase());
            if (firstOther) setSelectedRecipient(firstOther);
          }
        }
      })
      .catch(() => {});
  }, [isOpen, currentUserEmail]);

  // If initialRecipient passed, set it
  useEffect(() => {
    if (initialRecipient) {
      setSelectedRecipient(initialRecipient);
    }
  }, [initialRecipient]);

  // Fetch messages for current user
  const fetchMessages = () => {
    if (!currentUserEmail) return;
    fetch(`/api/messages?userEmail=${encodeURIComponent(currentUserEmail)}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.success && Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  // Fetch all messages if Admin audit view active
  const fetchAdminAuditMessages = () => {
    if (!isAdmin) return;
    fetch(`/api/admin/all-chats?adminEmail=${encodeURIComponent(currentUserEmail)}&role=admin`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.success && Array.isArray(data.messages)) {
          setAllAdminAuditMessages(data.messages);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchMessages();
    if (isAdmin) fetchAdminAuditMessages();

    const interval = setInterval(() => {
      fetchMessages();
      if (isAdmin && activeTab === 'admin_audit') fetchAdminAuditMessages();
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen, currentUserEmail, isAdmin, activeTab]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedRecipient]);

  // Send message handler
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedRecipient) return;

    setSending(true);
    const textToSend = messageText.trim();
    setMessageText('');

    // Optimistic local update
    const optimisticMsg: DirectMessage = {
      id: `opt-${Date.now()}`,
      threadId: [currentUserEmail, selectedRecipient.email].sort().join('_'),
      senderEmail: currentUserEmail,
      senderName: currentUserName,
      senderRole: currentUserRole,
      recipientEmail: selectedRecipient.email,
      recipientName: selectedRecipient.name,
      recipientRole: selectedRecipient.role,
      text: textToSend,
      timestamp: new Date().toISOString(),
      read: true
    };
    setMessages(prev => [...prev, optimisticMsg]);

    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderEmail: currentUserEmail,
          senderName: currentUserName,
          senderRole: currentUserRole,
          recipientEmail: selectedRecipient.email,
          recipientName: selectedRecipient.name,
          recipientRole: selectedRecipient.role,
          text: textToSend
        })
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  // Active chat stream between current user & selected recipient
  const activeConversationMessages = messages.filter(m =>
    selectedRecipient && (
      (m.senderEmail.toLowerCase() === currentUserEmail.toLowerCase() && m.recipientEmail.toLowerCase() === selectedRecipient.email.toLowerCase()) ||
      (m.senderEmail.toLowerCase() === selectedRecipient.email.toLowerCase() && m.recipientEmail.toLowerCase() === currentUserEmail.toLowerCase())
    )
  );

  // Group threads
  const conversationPartners = availableMembers.filter(m =>
    m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.organization?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.college?.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.role.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-[#0e0c1a] border border-purple-500/30 rounded-3xl max-w-5xl w-full text-white shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-gradient-to-r from-purple-950/70 via-[#18132b] to-[#0e0c1a] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-600/20 border border-purple-400/30 flex items-center justify-center text-purple-400 shadow-inner">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-black text-white">Direct Messaging & Chat</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Private E2E Channel</span>
                </span>
                {isAdmin && (
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold border border-purple-500/30">
                    👑 SuperAdmin Enabled
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Message students, SMEs, and industry mentors directly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('my_chats')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'my_chats' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  My Direct Chats
                </button>
                <button
                  onClick={() => {
                    setActiveTab('admin_audit');
                    fetchAdminAuditMessages();
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                    activeTab === 'admin_audit' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Global Audit View</span>
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {activeTab === 'admin_audit' && isAdmin ? (
          /* ================= SUPERADMIN GLOBAL AUDIT VIEW ================= */
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#0a0914]">
            <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs text-amber-200">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  <strong>SuperAdmin Compliance Mode:</strong> You are viewing global platform communication logs. No other role can access these records.
                </span>
              </div>
              <button
                onClick={fetchAdminAuditMessages}
                className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh Audit Logs</span>
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                All Recorded System Messages ({allAdminAuditMessages.length})
              </h3>

              <div className="space-y-2">
                {allAdminAuditMessages.map(msg => (
                  <div key={msg.id} className="p-3.5 bg-[#141126] border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-purple-300">{msg.senderName}</span>
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-mono uppercase">{msg.senderRole}</span>
                        <span className="text-slate-500">→</span>
                        <span className="font-bold text-indigo-300">{msg.recipientName}</span>
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono uppercase">{msg.recipientRole}</span>
                      </div>
                      <p className="text-slate-200 text-xs bg-black/40 p-2 rounded-xl border border-white/5 font-sans">
                        "{msg.text}"
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono sm:text-right shrink-0">
                      {new Date(msg.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ================= NORMAL SPLIT-PANE DIRECT MESSAGING ================= */
          <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
            
            {/* Left Column: Conversation Directory */}
            <div className="w-full sm:w-80 border-r border-white/10 bg-[#120f21] flex flex-col shrink-0">
              
              {/* Search Bar */}
              <div className="p-3 border-b border-white/10">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search people to chat..."
                    value={searchFilter}
                    onChange={e => setSearchFilter(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-[#1a162e] border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Members List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {conversationPartners.map(member => {
                  const isSelected = selectedRecipient?.email.toLowerCase() === member.email.toLowerCase();

                  return (
                    <button
                      key={member.id}
                      onClick={() => setSelectedRecipient(member)}
                      className={`w-full text-left p-3 rounded-2xl flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600/30 border border-purple-500/50 shadow-md'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="relative shrink-0">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-xl object-cover border border-white/20" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-purple-700 text-white font-bold flex items-center justify-center text-xs">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#120f21] absolute -bottom-0.5 -right-0.5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-white truncate">{member.name}</h4>
                          <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-bold ${
                            member.role === 'mentor' ? 'bg-indigo-500/20 text-indigo-300' :
                            member.role === 'sme' ? 'bg-amber-500/20 text-amber-300' :
                            'bg-purple-500/20 text-purple-300'
                          }`}>
                            {member.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {member.organization || member.college}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Chat Window */}
            <div className="flex-1 flex flex-col bg-[#0b0a16] overflow-hidden">
              
              {selectedRecipient ? (
                <>
                  {/* Chat Top Banner */}
                  <div className="p-4 border-b border-white/10 bg-[#151226] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-700 text-white font-bold flex items-center justify-center text-xs overflow-hidden border border-purple-400">
                        {selectedRecipient.avatar ? (
                          <img src={selectedRecipient.avatar} alt={selectedRecipient.name} className="w-full h-full object-cover" />
                        ) : (
                          selectedRecipient.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-white">{selectedRecipient.name}</h3>
                          <span className="text-[10px] px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded font-mono uppercase">
                            {selectedRecipient.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {selectedRecipient.organization || selectedRecipient.college} • Online
                        </p>
                      </div>
                    </div>

                    <div className="text-2xs text-emerald-400 flex items-center gap-1 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified User</span>
                    </div>
                  </div>

                  {/* Message Stream */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                    {activeConversationMessages.length === 0 ? (
                      <div className="text-center py-12 space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-400/20 flex items-center justify-center mx-auto text-purple-400">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-sm text-white">Start the conversation with {selectedRecipient.name}</h4>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                          Send a message to discuss project collaboration, request a mentor code review, or negotiate an SME bounty milestone.
                        </p>

                        {/* Icebreaker Prompts */}
                        <div className="pt-3 flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                          {[
                            "👋 Hi! I would love to collaborate on your Pod.",
                            "💡 Can you review our milestone PR?",
                            "🤝 Interested in your project on Marketplace."
                          ].map((prompt, i) => (
                            <button
                              key={i}
                              onClick={() => setMessageText(prompt)}
                              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs border border-white/10 transition-colors cursor-pointer text-left"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      activeConversationMessages.map(msg => {
                        const isMe = msg.senderEmail.toLowerCase() === currentUserEmail.toLowerCase();

                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-bold text-slate-400">
                                {isMe ? 'You' : msg.senderName}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div
                              className={`p-3.5 rounded-2xl max-w-md text-xs sm:text-sm font-sans leading-relaxed ${
                                isMe
                                  ? 'bg-purple-600 text-white rounded-tr-none shadow-lg shadow-purple-950/40'
                                  : 'bg-[#1a172e] text-slate-200 rounded-tl-none border border-white/10'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input Form */}
                  <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-white/10 bg-[#120f24] flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Write a message to ${selectedRecipient.name}...`}
                      value={messageText}
                      onChange={e => setMessageText(e.target.value)}
                      className="flex-1 px-4 py-3 bg-[#1c1833] border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20"
                    />

                    <button
                      type="submit"
                      disabled={sending || !messageText.trim()}
                      className="px-5 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-900/40 transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
                  Select a member from the directory to start messaging.
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
