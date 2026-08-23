import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Zap, Bell } from 'lucide-react';
import { ModalView } from '../types';
import { SkillPodsLogo } from './SkillPodsLogo';

interface NavbarProps {
  onOpenModal: (modal: ModalView) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal, activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const getLoggedInUser = () => {
    try {
      const stored = localStorage.getItem('skillpods_user');
      if (stored) return JSON.parse(stored);
    } catch {}
    return null;
  };
  const loggedInUser = getLoggedInUser();

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#08070d]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-center px-5 sm:px-8 md:px-12 h-20 max-w-[1340px] mx-auto">
        
        {/* Brand Logo & Typography (Selected Element) */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2 text-white hover:opacity-90 transition-all cursor-pointer group text-left focus:outline-none"
          id="nav-brand-logo"
        >
          <SkillPodsLogo size={42} showText={true} />
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <button
            onClick={() => onNavigate('about')}
            className={`text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${
              activeSection === 'about'
                ? 'text-white font-bold'
                : 'text-[#a19ba9] hover:text-white'
            }`}
            id="nav-link-about"
          >
            ABOUT
          </button>
          <button
            onClick={() => onNavigate('workflow')}
            className={`text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${
              activeSection === 'workflow'
                ? 'text-white font-bold'
                : 'text-[#a19ba9] hover:text-white'
            }`}
            id="nav-link-how-it-works"
          >
            HOW IT WORKS
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className={`text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${
              activeSection === 'pricing'
                ? 'text-white font-bold'
                : 'text-[#a19ba9] hover:text-white'
            }`}
            id="nav-link-pricing"
          >
            PRICING
          </button>
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-5">
          {/* Notification Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#d0bcff] hover:text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-500 text-white text-[9px] font-mono font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Menu */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-[#13101f] border border-purple-500/40 rounded-2xl p-4 shadow-2xl space-y-3 animate-in fade-in zoom-in-95 duration-150 z-50">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                    <Bell className="w-3.5 h-3.5 text-purple-400" />
                    <span>Live Cohort Alerts</span>
                  </div>
                  <button 
                    onClick={() => setUnreadCount(0)} 
                    className="text-[10px] font-mono text-purple-400 hover:text-purple-300 cursor-pointer"
                  >
                    Mark read
                  </button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs">
                    <p className="font-bold text-emerald-300 text-[11px]">🎉 Milestone #2 Approved!</p>
                    <p className="text-[11px] text-slate-300 mt-0.5">Sarah Chen signed off Sprint 2. ₹12,500 escrow released to Dev Patel.</p>
                    <span className="text-[9px] font-mono text-emerald-400/80 mt-1 block">5 mins ago</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs">
                    <p className="font-bold text-purple-300 text-[11px]">💼 New IP Marketplace Inquiry</p>
                    <p className="text-[11px] text-slate-300 mt-0.5">Kestrel Freight requested a demo for Smart Attendance System.</p>
                    <span className="text-[9px] font-mono text-purple-400/80 mt-1 block">22 mins ago</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs">
                    <p className="font-bold text-blue-300 text-[11px]">🤖 GURU AI Pod Match: 96%</p>
                    <p className="text-[11px] text-slate-300 mt-0.5">You were matched with Pod Apex-2 as Full-Stack Engineer lead.</p>
                    <span className="text-[9px] font-mono text-blue-400/80 mt-1 block">1 hour ago</span>
                  </div>
                </div>

                <div className="pt-1 text-center">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    🧪 REAL-TIME ALERTS &bull; BETA TESTING
                  </span>
                </div>
              </div>
            )}
          </div>

          {loggedInUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('dashboard')}
                className="glow-pill-secondary text-white text-xs font-mono uppercase tracking-widest px-4 py-2.5 rounded-full font-bold border border-[#d0bcff]/40 hover:border-[#d0bcff] hover:text-[#d0bcff] transition-all cursor-pointer shadow-[0_0_20px_rgba(160,120,255,0.25)] flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>DASHBOARD ({loggedInUser.name?.split(' ')[0] || 'PANEL'})</span>
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem('skillpods_token');
                  localStorage.removeItem('skillpods_jwt');
                  localStorage.removeItem('skillpods_user');
                  localStorage.setItem('skillpods_page', 'landing');
                  window.location.reload();
                }}
                className="text-[#a19ba9] hover:text-rose-400 transition-colors text-xs font-mono tracking-widest uppercase cursor-pointer"
                title="Log out of SkillPods"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => onOpenModal('login')}
                className="text-[#a19ba9] hover:text-white transition-colors text-xs font-mono tracking-widest uppercase cursor-pointer"
                id="nav-btn-login"
              >
                LOGIN
              </button>
              
              <button
                onClick={() => onOpenModal('join-cohort')}
                className="glow-pill-secondary text-white text-xs font-mono uppercase tracking-widest px-5 py-2.5 rounded-full font-semibold border border-[#d0bcff]/40 hover:border-[#d0bcff] hover:text-[#d0bcff] transition-all cursor-pointer shadow-[0_0_20px_rgba(160,120,255,0.25)]"
                id="nav-btn-get-started"
              >
                GET STARTED
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => onOpenModal('join-cohort')}
            className="glow-pill-secondary text-white text-[11px] font-mono uppercase px-3.5 py-1.5 rounded-full border border-[#d0bcff]/40"
          >
            START
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#a19ba9] hover:text-white p-1.5 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e0c16] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-widest">
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="text-left text-[#cbc3d7] hover:text-white py-2"
            >
              ABOUT
            </button>
            <button
              onClick={() => { onNavigate('workflow'); setMobileMenuOpen(false); }}
              className="text-left text-[#cbc3d7] hover:text-white py-2"
            >
              HOW IT WORKS
            </button>
            <button
              onClick={() => { onNavigate('pricing'); setMobileMenuOpen(false); }}
              className="text-left text-[#cbc3d7] hover:text-white py-2"
            >
              PRICING
            </button>
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => { onOpenModal('login'); setMobileMenuOpen(false); }}
              className="w-full text-center text-xs font-mono text-white py-2.5 rounded-xl border border-white/10"
            >
              LOGIN
            </button>
            <button
              onClick={() => { onOpenModal('join-cohort'); setMobileMenuOpen(false); }}
              className="w-full text-center text-xs font-mono font-bold text-[#3c0091] bg-[#d0bcff] py-3 rounded-xl shadow-lg"
            >
              GET STARTED
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
