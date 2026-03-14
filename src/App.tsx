/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy, Users, Zap, Search, PlayCircle, ArrowRight, Star,
  ChevronLeft, ChevronRight, Share2, Globe, MessageSquare,
  ExternalLink, Droplets, Wand2, Bolt, LayoutDashboard, LogOut, User as UserIcon,
  BookOpen, Check, X, RotateCcw, Eye, EyeOff, ArrowLeft, Settings, Hash, Megaphone, Lightbulb, Send
} from 'lucide-react';
import {
  NAV_LINKS, DASHBOARD_NAV_LINKS, UNIVERSES, TOURNAMENTS,
  KPOP_TRIVIA, TWILIGHT_MC_TRIVIA, TWILIGHT_BOOK_TRIVIA, NEW_MOON_TRIVIA, ECLIPSE_TRIVIA, BREAKING_DAWN_TRIVIA, MIDNIGHT_SUN_TRIVIA, LIFE_AND_DEATH_TRIVIA,
  HARRY_POTTER_TRIVIA, HARRY_POTTER_COS_TRIVIA,
  HARRY_POTTER_POA_TRIVIA, HARRY_POTTER_GOF_TRIVIA, HARRY_POTTER_OOTP_TRIVIA, HARRY_POTTER_HBP_TRIVIA, HARRY_POTTER_DH_TRIVIA,
  THREE_BODY_PROBLEM_TRIVIA, THE_DARK_FOREST_TRIVIA, DEATHS_END_TRIVIA,
  ZOOTOPIA_TRIVIA, ZOOTOPIA_2_TRIVIA,
  MCTriviaQuestion, BADGES, Badge
} from './constants';
import ParticleCanvas from './ParticleCanvas';
import { supabase } from './supabaseClient';

// --- Types ---

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  username: string | null;
}

// --- Components ---

const HistoryModal = ({ user, onClose }: { user: User, onClose: () => void }) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('scores')
          .select('id, score, total, quiz_id, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setHistory(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user.id]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card-dark border border-white/10 p-8 rounded-3xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl space-y-6"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="size-6 text-emerald-400" />
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">Quiz History</h3>
          </div>
          <button onClick={onClose} className="size-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {loading ? (
            <div className="text-center py-10 text-slate-400 font-bold animate-pulse">Loading history...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-400 font-bold">Error: {error}</div>
          ) : history.length === 0 ? (
            <div className="text-center py-10 text-slate-400 flex flex-col items-center gap-3">
              <Trophy className="size-10 text-slate-600" />
              <p className="font-bold">No quizzes taken yet.</p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors">
                <div>
                  <h4 className="font-bold text-white text-lg">{item.quiz_id}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {new Date(item.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                    {item.score} / {item.total}
                  </p>
                  <p className="text-[10px] uppercase font-bold text-slate-400">
                    {Math.round((item.score / item.total) * 100)}%
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

const BadgesModal = ({ unlockedBadgeIds, onClose }: { unlockedBadgeIds: string[], onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card-dark border border-white/10 p-8 rounded-3xl max-w-4xl w-full max-h-[80vh] flex flex-col shadow-2xl space-y-6"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Star className="size-6 text-amber-400 fill-amber-400" />
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">Your Badges</h3>
          </div>
          <button onClick={onClose} className="size-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {BADGES.map((badge) => {
              const isUnlocked = unlockedBadgeIds.includes(badge.id);
              return (
                <div 
                  key={badge.id} 
                  className={`relative p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center gap-3
                    ${isUnlocked 
                      ? 'bg-white/5 border-white/20 hover:bg-white/10 shadow-lg' 
                      : 'bg-black/40 border-white/5 opacity-60 grayscale hover:grayscale-0'
                    }`}
                >
                  <div className={`size-16 rounded-full flex items-center justify-center shadow-inner
                    ${isUnlocked ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-white/5'}
                  `}>
                    {/* Render matching lucide icon dynamically based on string if possible, or fallback manually. 
                        For simplicity in this app, we hardcode the mapping. */}
                    {badge.icon === 'Droplets' && <Droplets className={`size-8 ${isUnlocked ? badge.color : 'text-slate-600'}`} />}
                    {badge.icon === 'Star' && <Star className={`size-8 ${isUnlocked ? badge.color + ' fill-current' : 'text-slate-600'}`} />}
                    {badge.icon === 'Wand2' && <Wand2 className={`size-8 ${isUnlocked ? badge.color : 'text-slate-600'}`} />}
                    {badge.icon === 'Zap' && <Zap className={`size-8 ${isUnlocked ? badge.color + ' fill-current' : 'text-slate-600'}`} />}
                    {badge.icon === 'Globe' && <Globe className={`size-8 ${isUnlocked ? badge.color : 'text-slate-600'}`} />}
                    {badge.icon === 'Search' && <Search className={`size-8 ${isUnlocked ? badge.color : 'text-slate-600'}`} />}
                  </div>
                  
                  <div>
                    <h4 className="font-black tracking-tight text-white text-sm">{badge.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium leading-tight mt-1">{badge.description}</p>
                  </div>
                  
                  {!isUnlocked && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-black/60 rounded-full p-1 border border-white/10">
                        {/* Assuming a Lock icon isn't imported, using an X or just a small dark circle */}
                        <div className="size-3 rounded-full bg-slate-700 flex items-center justify-center">
                          <div className="w-1 h-1.5 border-t border-l border-r border-slate-400 rounded-t-sm mb-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BadgeNotification = ({ badge, onClose }: { badge: Badge, onClose: () => void, key?: string | number }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0, scale: 0.9 }}
      animate={{ y: 20, opacity: 1, scale: 1 }}
      exit={{ y: -100, opacity: 0, scale: 0.9 }}
      className="fixed top-0 left-0 right-0 z-[110] flex justify-center pointer-events-none px-4"
    >
      <div className="bg-card-dark border border-amber-500/30 p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm w-full pointer-events-auto backdrop-blur-md">
        <div className={`size-12 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-white/10 to-white/5 shadow-inner`}>
          {badge.icon === 'Droplets' && <Droplets className={`size-6 ${badge.color}`} />}
          {badge.icon === 'Star' && <Star className={`size-6 ${badge.color} fill-current`} />}
          {badge.icon === 'Wand2' && <Wand2 className={`size-6 ${badge.color}`} />}
          {badge.icon === 'Zap' && <Zap className={`size-6 ${badge.color} fill-current`} />}
          {badge.icon === 'Globe' && <Globe className={`size-6 ${badge.color}`} />}
          {badge.icon === 'Search' && <Search className={`size-6 ${badge.color}`} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-0.5">Badge Unlocked!</p>
          <h4 className="font-bold text-white text-sm truncate">{badge.name}</h4>
          <p className="text-xs text-slate-400 truncate">{badge.description}</p>
        </div>
        <button onClick={onClose} className="size-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors shrink-0">
          <X className="size-4 text-slate-400" />
        </button>
      </div>
    </motion.div>
  );
};

const UsernameModal = ({ onComplete }: { onComplete: (username: string) => void }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Not authenticated');
        return;
      }

      const { error: upsertError } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user.id);

      if (upsertError) {
        if (upsertError.message.includes('duplicate') || upsertError.code === '23505') {
          setError('Username already taken');
        } else {
          setError(upsertError.message || 'Failed to set username');
        }
      } else {
        onComplete(username);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card-dark border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-6"
      >
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">Choose Your Handle</h3>
          <p className="text-slate-400 text-sm">Every legend needs a name. Pick your unique username to start competing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. shadow_slayer"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold"
              disabled={loading}
            />
            {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-primary/30 disabled:opacity-50"
          >
            {loading ? 'Confirming...' : 'Set Username'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Navbar = ({ isDashboard, setView, user, onLogin, onLogout, onResetUsername, onShowHistory, onShowBadges }: {
  isDashboard: boolean,
  setView: (v: ViewType) => void,
  user: User | null,
  onLogin: () => void,
  onLogout: () => void,
  onResetUsername?: () => void,
  onShowHistory?: () => void,
  onShowBadges?: () => void
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/10">
      <div className={`max-w-${isDashboard ? '[1600px]' : '7xl'} mx-auto px-6 h-20 flex items-center justify-between`}>
        <div
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => setView('landing')}
        >
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-[0_0_20px_rgba(127,19,236,0.5)]">
            <Zap className="size-6 fill-current" />
          </div>
          <h1 className={`text-xl font-bold tracking-tight text-white ${isDashboard ? 'uppercase italic font-black' : ''}`}>
            Fandom<span className="text-primary">Trivia</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          {(isDashboard ? DASHBOARD_NAV_LINKS : NAV_LINKS).map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                if (link.name === 'Home') setView('landing');
                else if (link.name === 'Leaderboards') setView('rankings');
                else if (link.name === 'Categories') {
                  setView('landing');
                  setTimeout(() => document.getElementById('universes')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }
              }}
              className={`text-sm font-semibold hover:text-primary transition-colors ${isDashboard ? 'uppercase tracking-widest text-xs' : ''} ${(link as any).active ? 'text-primary border-b-2 border-primary pb-1' : ''}`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isDashboard && (
            <div className="hidden lg:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <Star className="size-4 text-amber-400 fill-amber-400" />
              <span className="text-xs font-black">2,450 XP</span>
            </div>
          )}
          
          {/* Always show badges button if callback is provided, even if logged out */}
          {onShowBadges && (
            <button
              onClick={onShowBadges}
              className="flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 px-4 py-2 rounded-lg font-bold text-sm transition-all"
            >
              <Star className="size-4 fill-amber-500" />
              <span className="hidden sm:inline">My Badges</span>
            </button>
          )}

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowAccountMenu(prev => !prev)}
                className="flex items-center gap-3 bg-white/5 border border-white/10 pl-2 pr-4 py-1.5 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                <img src={user.picture} alt={user.name} className="size-8 rounded-full border border-white/20" />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-white tracking-tight leading-none">@{user.username || 'new_fan'}</span>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{user.name}</span>
                </div>
              </button>

              <AnimatePresence>
                {showAccountMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-[#141414] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-3 border-b border-white/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Settings className="size-3" />
                        Account Settings
                      </p>
                    </div>
                    <div className="p-1.5">

                      {onShowHistory && (
                        <button
                          onClick={() => { onShowHistory(); setShowAccountMenu(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                        >
                          <BookOpen className="size-4 text-emerald-400" />
                          Quiz History
                        </button>
                      )}
                      {onResetUsername && (
                        <button
                          onClick={() => { onResetUsername(); setShowAccountMenu(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                        >
                          <RotateCcw className="size-4 text-primary" />
                          Change Username
                        </button>
                      )}
                      <button
                        onClick={() => { onLogout(); setShowAccountMenu(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all"
                      >
                        <LogOut className="size-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <UserIcon className="size-4" />
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};


const Footer = ({ isDashboard, setView }: { isDashboard: boolean, setView: (v: ViewType) => void }) => (
  <footer className={`border-t border-white/10 py-20 px-6 ${isDashboard ? 'bg-card-dark' : ''}`}>
    <div className={`max-w-${isDashboard ? '[1600px]' : '7xl'} mx-auto grid grid-cols-1 md:grid-cols-4 gap-12`}>
      <div className="col-span-1 md:col-span-2 space-y-6">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Zap className="size-5 fill-current" />
          </div>
          <h1 className={`text-lg font-bold tracking-tight text-white ${isDashboard ? 'uppercase italic font-black' : ''}`}>
            Fandom<span className="text-primary">Trivia</span>
          </h1>
        </div>
        <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
          The premier destination for fandom enthusiasts. Competitive trivia for the stories you love most.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
            <Share2 className="size-5" />
          </a>
          <a href="#" className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
            <Globe className="size-5" />
          </a>
          {isDashboard && (
            <a href="#" className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
              <MessageSquare className="size-5" />
            </a>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h5 className="text-sm font-black uppercase tracking-widest text-white">
          {isDashboard ? 'Circuit' : 'Platform'}
        </h5>
        <ul className="space-y-4 text-slate-400 font-semibold text-sm">
          {isDashboard ? (
            <>
              <li><a href="#" className="hover:text-primary transition-colors">Quick Match</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tournaments</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Team Rankings</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sponsorships</a></li>
            </>
          ) : (
            <>
              <li><a href="#" className="hover:text-primary transition-colors">How it works</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setView('rankings'); }} className="hover:text-primary transition-colors">Leaderboards</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setView('landing'); setTimeout(() => document.getElementById('universes')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Rewards</a></li>
            </>
          )}
        </ul>
      </div>

      <div className="space-y-6">
        <h5 className="text-sm font-black uppercase tracking-widest text-white">
          {isDashboard ? 'Account' : 'Legal'}
        </h5>
        <ul className="space-y-4 text-slate-400 font-semibold text-sm">
          {isDashboard ? (
            <>
              <li><a href="#" className="hover:text-primary transition-colors">Pro Profile</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Earnings</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Access</a></li>
            </>
          ) : (
            <>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </>
          )}
        </ul>
      </div>
    </div>
    <div className={`max-w-${isDashboard ? '[1600px]' : '7xl'} mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest`}>
      <p>© 2024 {isDashboard ? 'PROHUB ESPORTS INC.' : 'Fandom Trivia Inc. All rights reserved.'}</p>
      <p>Crafted with <span className="text-primary">♥</span> for fans everywhere.</p>
    </div>
  </footer>
);

// --- Views ---

type ViewType = 'landing' | 'dashboard' | 'rankings' | 'trivia-twilight-mc' | 'trivia-twilight-select' | 'trivia-twilight-book' | 'trivia-newmoon' | 'trivia-eclipse' | 'trivia-breakingdawn' | 'trivia-midnightsun' | 'trivia-lifeanddeath' | 'trivia-twilight-random' | 'trivia-kpop' | 'trivia-harry-potter' | 'trivia-harry-potter-cos' | 'trivia-harry-potter-poa' | 'trivia-harry-potter-gof' | 'trivia-harry-potter-ootp' | 'trivia-harry-potter-hbp' | 'trivia-harry-potter-dh' | 'trivia-harry-potter-select' | 'trivia-harry-potter-random' | 'trivia-three-body-select' | 'trivia-three-body-problem' | 'trivia-the-dark-forest' | 'trivia-deaths-end' | 'trivia-three-body-random' | 'trivia-zootopia-select' | 'trivia-zootopia' | 'trivia-zootopia-2' | 'trivia-zootopia-random';


// --- Twilight Book Selector ---

const TWILIGHT_GRADES = [
  { threshold: 90, label: 'Cullen-Level Expert', color: 'text-amber-400', character: { name: 'Edward Cullen', image: '/images/Cullen Family.jpg', desc: 'You know every detail. You must be able to read minds!' } },
  { threshold: 70, label: 'Forks Insider', color: 'text-purple-400', character: { name: 'Alice Cullen', image: '/images/Cullen Family.jpg', desc: 'Your foresight is impeccable. You saw these answers coming.' } },
  { threshold: 50, label: 'Curious Newcomer', color: 'text-blue-400', character: { name: 'Bella Swan', image: '/images/Cullen Family.jpg', desc: 'You are just starting your supernatural journey into Forks.' } },
  { threshold: 0, label: 'Just Arrived in Forks', color: 'text-slate-400', character: { name: 'Charlie Swan', image: '/images/Cullen Family.jpg', desc: 'You have no idea what is going on out there in the woods.' } },
];

const TwilightBookSelector = ({ setView }: { setView: (v: ViewType) => void, key?: string }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <button onClick={() => setView('landing')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-bold mb-4">
          <ArrowLeft className="size-4" /> Back to Universes
        </button>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-200">Volume</span></h2>
        <p className="text-slate-400 font-medium">Select a book to test your knowledge, or try a random mix from all!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          { label: "Book 1", title: "Twilight", desc: `${TWILIGHT_BOOK_TRIVIA.length} questions`, icon: "🍎", view: 'trivia-twilight-book' as ViewType, gradient: 'from-red-600/20 to-rose-600/20', border: 'border-red-500/30 hover:border-red-400/50' },
          { label: "Book 2", title: "New Moon", desc: `${NEW_MOON_TRIVIA.length} questions`, icon: "🌑", view: 'trivia-newmoon' as ViewType, gradient: 'from-amber-600/20 to-yellow-600/20', border: 'border-amber-500/30 hover:border-amber-400/50' },
          { label: "Book 3", title: "Eclipse", desc: `${ECLIPSE_TRIVIA.length} questions`, icon: "🌘", view: 'trivia-eclipse' as ViewType, gradient: 'from-indigo-600/20 to-violet-600/20', border: 'border-indigo-500/30 hover:border-indigo-400/50' },
          { label: "Book 4", title: "Breaking Dawn", desc: `${BREAKING_DAWN_TRIVIA.length} questions`, icon: "🌅", view: 'trivia-breakingdawn' as ViewType, gradient: 'from-orange-600/20 to-red-600/20', border: 'border-orange-500/30 hover:border-orange-400/50' },
          { label: "Companion", title: "Midnight Sun", desc: `${MIDNIGHT_SUN_TRIVIA.length} questions`, icon: "☀️", view: 'trivia-midnightsun' as ViewType, gradient: 'from-sky-600/20 to-blue-600/20', border: 'border-sky-500/30 hover:border-sky-400/50' },
          { label: "Companion", title: "Life and Death", desc: `${LIFE_AND_DEATH_TRIVIA.length} questions`, icon: "🔄", view: 'trivia-lifeanddeath' as ViewType, gradient: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30 hover:border-emerald-400/50' },
          { label: "Random", title: "Mixed Challenge", desc: "20 random from all books", icon: "🎲", view: 'trivia-twilight-random' as ViewType, gradient: 'from-fuchsia-600/20 to-pink-600/20', border: 'border-fuchsia-500/30 hover:border-fuchsia-400/50' },
        ].map(book => (
          <motion.button
            key={book.title}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView(book.view)}
            className={`text-left p-6 rounded-2xl bg-gradient-to-br ${book.gradient} border ${book.border} transition-all duration-300 space-y-4 group`}
          >
            <div className="text-4xl">{book.icon}</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{book.label}</p>
              <h3 className="text-xl font-black text-white tracking-tight">{book.title}</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">{book.desc}</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Start Quiz <ArrowRight className="size-3" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Harry Potter Book Selector ---

const HPBookSelector = ({ setView }: { setView: (v: ViewType) => void, key?: string }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <button onClick={() => setView('landing')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-bold mb-4">
          <ArrowLeft className="size-4" /> Back to Universes
        </button>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">Volume</span></h2>
        <p className="text-slate-400 font-medium">Select a book to test your knowledge, or try a random mix from both!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          { label: "Book 1", title: "Sorcerer's Stone", desc: "20 questions from Chapters 1–6", icon: "⚡", view: 'trivia-harry-potter' as ViewType, gradient: 'from-amber-600/20 to-red-600/20', border: 'border-amber-500/30 hover:border-amber-400/50' },
          { label: "Book 2", title: "Chamber of Secrets", desc: "20 questions from Chapters 1–6", icon: "🐍", view: 'trivia-harry-potter-cos' as ViewType, gradient: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30 hover:border-emerald-400/50' },
          { label: "Book 3", title: "Prisoner of Azkaban", desc: "20 random questions", icon: "🐺", view: 'trivia-harry-potter-poa' as ViewType, gradient: 'from-slate-600/20 to-zinc-600/20', border: 'border-slate-500/30 hover:border-slate-400/50' },
          { label: "Book 4", title: "Goblet of Fire", desc: "20 random questions", icon: "🏆", view: 'trivia-harry-potter-gof' as ViewType, gradient: 'from-red-600/20 to-orange-600/20', border: 'border-red-500/30 hover:border-red-400/50' },
          { label: "Book 5", title: "Order of the Phoenix", desc: "20 random questions", icon: "📜", view: 'trivia-harry-potter-ootp' as ViewType, gradient: 'from-sky-600/20 to-blue-600/20', border: 'border-sky-500/30 hover:border-sky-400/50' },
          { label: "Book 6", title: "Half-Blood Prince", desc: "20 random questions", icon: "🧪", view: 'trivia-harry-potter-hbp' as ViewType, gradient: 'from-green-600/20 to-emerald-600/20', border: 'border-green-500/30 hover:border-green-400/50' },
          { label: "Book 7", title: "Deathly Hallows", desc: "20 random questions", icon: "⏃", view: 'trivia-harry-potter-dh' as ViewType, gradient: 'from-indigo-600/20 to-purple-600/20', border: 'border-indigo-500/30 hover:border-indigo-400/50' },
          { label: "Random", title: "Mixed Challenge", desc: "20 random questions from all 7 books", icon: "🎲", view: 'trivia-harry-potter-random' as ViewType, gradient: 'from-fuchsia-600/20 to-pink-600/20', border: 'border-fuchsia-500/30 hover:border-fuchsia-400/50' },
        ].map(book => (
          <motion.button
            key={book.label}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView(book.view)}
            className={`text-left p-6 rounded-2xl bg-gradient-to-br ${book.gradient} border ${book.border} transition-all duration-300 space-y-4 group`}
          >
            <div className="text-4xl">{book.icon}</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{book.label}</p>
              <h3 className="text-xl font-black text-white tracking-tight">{book.title}</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">{book.desc}</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Start Quiz <ArrowRight className="size-3" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Three-Body Problem Book Selector ---

const THREE_BODY_GRADES = [
  { threshold: 90, label: 'Wallfacer', color: 'text-indigo-400', character: { name: 'Luo Ji', image: '/images/threebody.jpg', desc: 'You have seen through the Dark Forest. The Trisolarans fear your intellect.' } },
  { threshold: 70, label: 'Swordholder', color: 'text-purple-400', character: { name: 'Cheng Xin', image: '/images/threebody.jpg', desc: 'You hold the fate of humanity in your hands with great empathy.' } },
  { threshold: 50, label: 'ETO Member', color: 'text-red-400', character: { name: 'Ye Wenjie', image: '/images/threebody.jpg', desc: 'You are disillusioned with humanity, but you seek the truth.' } },
  { threshold: 0, label: 'Bug', color: 'text-slate-400', character: { name: 'Da Shi', image: '/images/threebody.jpg', desc: 'You may be a bug to them, but bugs have never been truly defeated.' } },
];

const ThreeBodyBookSelector = ({ setView }: { setView: (v: ViewType) => void, key?: string }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <button onClick={() => setView('landing')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-bold mb-4">
          <ArrowLeft className="size-4" /> Back to Universes
        </button>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-200">Era</span></h2>
        <p className="text-slate-400 font-medium">Select a book to test your knowledge, or try a random mix from all!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { label: "Book 1", title: "The Three-Body Problem", desc: `${THREE_BODY_PROBLEM_TRIVIA.length} questions`, icon: "☀️", view: 'trivia-three-body-problem' as ViewType, gradient: 'from-amber-600/20 to-red-600/20', border: 'border-amber-500/30 hover:border-amber-400/50' },
          { label: "Book 2", title: "The Dark Forest", desc: `${THE_DARK_FOREST_TRIVIA.length} questions`, icon: "🌲", view: 'trivia-the-dark-forest' as ViewType, gradient: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30 hover:border-emerald-400/50' },
          { label: "Book 3", title: "Death's End", desc: `${DEATHS_END_TRIVIA.length} questions`, icon: "🌌", view: 'trivia-deaths-end' as ViewType, gradient: 'from-indigo-600/20 to-purple-600/20', border: 'border-indigo-500/30 hover:border-indigo-400/50' },
          { label: "Random", title: "Mixed Challenge", desc: "20 random questions from all 3 books", icon: "🎲", view: 'trivia-three-body-random' as ViewType, gradient: 'from-fuchsia-600/20 to-pink-600/20', border: 'border-fuchsia-500/30 hover:border-fuchsia-400/50' },
        ].map(book => (
          <motion.button
            key={book.label}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView(book.view)}
            className={`text-left p-6 rounded-2xl bg-gradient-to-br ${book.gradient} border ${book.border} transition-all duration-300 space-y-4 group`}
          >
            <div className="text-4xl">{book.icon}</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{book.label}</p>
              <h3 className="text-xl font-black text-white tracking-tight">{book.title}</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">{book.desc}</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Start Quiz <ArrowRight className="size-3" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Zootopia Movie Selector ---

const ZOOTOPIA_GRADES = [
  { threshold: 90, label: 'Chief of Police', color: 'text-blue-400', character: { name: 'Chief Bogo', image: '/images/zootopia.jpg', desc: 'Outstanding! You command the respect of the entire ZPD.' } },
  { threshold: 70, label: 'Star Detective', color: 'text-purple-400', character: { name: 'Judy Hopps', image: '/images/zootopia.jpg', desc: 'You never give up and it shows. Case closed!' } },
  { threshold: 50, label: 'Hustler', color: 'text-amber-400', character: { name: 'Nick Wilde', image: '/images/zootopia.jpg', desc: 'You know your way around the city, but might need to study the fine print.' } },
  { threshold: 0, label: 'DMV Sloth', color: 'text-slate-400', character: { name: 'Flash Slothmore', image: '/images/zootopia.jpg', desc: 'You... might... need... more... time...' } },
];

const ZootopiaSelector = ({ setView }: { setView: (v: ViewType) => void, key?: string }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <button onClick={() => setView('landing')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-bold mb-4">
          <ArrowLeft className="size-4" /> Back to Universes
        </button>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">Investigation</span></h2>
        <p className="text-slate-400 font-medium">Select a movie case file or test your luck with a random mix!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Case 1", title: "Zootopia", desc: `${ZOOTOPIA_TRIVIA.length} questions`, icon: "🐰", view: 'trivia-zootopia' as ViewType, gradient: 'from-blue-600/20 to-sky-600/20', border: 'border-blue-500/30 hover:border-blue-400/50' },
          { label: "Case 2", title: "Zootopia 2", desc: `${ZOOTOPIA_2_TRIVIA.length} questions`, icon: "🐍", view: 'trivia-zootopia-2' as ViewType, gradient: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30 hover:border-emerald-400/50' },
          { label: "Random", title: "Mixed Case File", desc: "15 random questions from both", icon: "🎲", view: 'trivia-zootopia-random' as ViewType, gradient: 'from-fuchsia-600/20 to-pink-600/20', border: 'border-fuchsia-500/30 hover:border-fuchsia-400/50' },
        ].map(movie => (
          <motion.button
            key={movie.label}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView(movie.view)}
            className={`text-left p-6 rounded-2xl bg-gradient-to-br ${movie.gradient} border ${movie.border} transition-all duration-300 space-y-4 group`}
          >
            <div className="text-4xl">{movie.icon}</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{movie.label}</p>
              <h3 className="text-xl font-black text-white tracking-tight">{movie.title}</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">{movie.desc}</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Start Quiz <ArrowRight className="size-3" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
);

// --- Multiple Choice Quiz View (Generic) ---

const playCorrectSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Use a softer sine wave tone and lower the frequencies.
    // Happy double-hop! (like "da-ding!")
    osc.type = 'sine';
    
    // First soft, low note
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    // Quick jump to a higher note
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
    
    // Lower volume and smoother envelope
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05); // softer peak
    // dip for the hop
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1); 
    // peak for the second note
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.15); 
    // fade out
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    console.error('Audio playback failed:', e);
  }
};

const playIncorrectSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Deep bell-like "dong" sound
    osc.type = 'sine';
    
    // Lower frequency for the "dong"
    osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
    
    // Volume envelope: sharp attack, long decay
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05); 
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {
    console.error('Audio playback failed:', e);
  }
};

const MCQuizView = ({ setView, questions, title, scoreLabel, grades, user, onQuizComplete }: {
  setView: (v: ViewType) => void,
  questions: MCTriviaQuestion[],
  title: string,
  scoreLabel: string,
  grades: { threshold: number; label: string; color: string; character?: { name: string; image: string; desc: string } }[],
  user: User | null,
  onQuizComplete?: (quizId: string, scorePct: number) => void,
  key?: string
}) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<number, 'correct' | 'incorrect'>>({});
  const [finished, setFinished] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const q = questions[currentQ];
  const total = questions.length;
  const correctCount = Object.values(scores).filter(s => s === 'correct').length;
  const answeredCount = Object.keys(scores).length;
  const isUnknown = q.answer === '???';

  const handleSelect = (option: string) => {
    if (selected) return; // already answered
    setSelected(option);
    if (isUnknown) {
      // No known answer — auto-mark correct (fun mode)
      setScores(prev => ({ ...prev, [currentQ]: 'correct' }));
      playCorrectSound();
    } else {
      const isCorrect = option.toLowerCase() === q.answer.toLowerCase();
      setScores(prev => ({ ...prev, [currentQ]: isCorrect ? 'correct' : 'incorrect' }));
      if (isCorrect) {
        playCorrectSound();
      } else {
        playIncorrectSound();
      }
    }
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
      if (onQuizComplete) {
        onQuizComplete(scoreLabel, Math.round((correctCount / total) * 100));
      }
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScores({});
    setFinished(false);
    setScoreSaved(false);
  };

  const handleSaveScore = async () => {
    if (!user) {
      alert("You must be logged in to save your score.");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase
        .from('scores')
        .insert({
          user_id: user.id,
          quiz_id: scoreLabel,
          score: correctCount,
          total: total
        });
      if (error) throw error;
      setScoreSaved(true);
    } catch (err: any) {
      console.error(err);
      alert('Failed to save score: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (finished) {
    const pct = Math.round((correctCount / total) * 100);
    const gradeEntry = grades.find(g => pct >= g.threshold) || grades[grades.length - 1];
    const grade = gradeEntry.label;
    const gradeColor = gradeEntry.color;
    const character = gradeEntry.character;

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative pt-28 pb-20 px-6 overflow-hidden">
        <ParticleCanvas mode="celebration" colors={
          title.toLowerCase().includes('twilight') ? ['rgba(148,197,233,', 'rgba(200,220,240,', 'rgba(180,200,220,', 'rgba(255,255,255,', 'rgba(100,150,200,']
            : title.toLowerCase().includes('k-pop') ? ['rgba(255,0,200,', 'rgba(180,0,255,', 'rgba(255,100,200,', 'rgba(0,255,200,', 'rgba(255,255,255,']
              : ['rgba(255,215,0,', 'rgba(255,180,50,', 'rgba(168,140,255,', 'rgba(255,255,255,', 'rgba(255,100,100,']
        } />
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="space-y-6">
            <div className="inline-flex items-center justify-center size-24 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-500/30 border border-white/10 mx-auto overflow-hidden shadow-2xl">
              {character ? (
                <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
              ) : (
                <Trophy className="size-12 text-amber-400" />
              )}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Quiz Complete!</h2>

            {character && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md max-w-md mx-auto transform hover:scale-105 transition-transform">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Your Result Character</p>
                <h3 className={`text-3xl font-black italic uppercase tracking-tight ${gradeColor}`}>{character.name}</h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed font-medium">{character.desc}</p>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-300">
                {correctCount}/{total}
              </p>
              <p className="text-slate-400 font-medium">Questions Correct ({pct}%)</p>
            </div>

            {!character && (
              <p className={`text-2xl font-black italic uppercase tracking-tight ${gradeColor}`}>{grade}</p>
            )}

            <div className="w-full max-w-md mx-auto space-y-2">
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500" style={{ width: `${pct}%` }} />
                <div className="h-full bg-gradient-to-r from-red-500 to-rose-400 transition-all duration-500" style={{ width: `${100 - pct}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-green-400">{correctCount} Correct</span>
                <span className="text-red-400">{total - correctCount} Incorrect</span>
              </div>
            </div>
          </motion.div>

          {!scoreSaved ? (
            <button
              onClick={handleSaveScore}
              disabled={saving}
              className="mx-auto flex items-center justify-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-amber-500/20 transition-all disabled:opacity-50"
            >
              <Star className="size-4" />
              {saving ? 'Saving...' : 'Save to Leaderboard'}
            </button>
          ) : (
            <p className="text-green-400 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2">
              <Check className="size-4" /> Score saved!
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button onClick={handleRestart} className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-primary/30"><RotateCcw className="size-4" /> Play Again</button>
            <button onClick={() => setView('landing')} className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"><ArrowLeft className="size-4" /> Back to Home</button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setView('landing')} className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
              <ArrowLeft className="size-4" />
            </button>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight italic uppercase">{title}</h2>
              <p className="text-xs text-slate-500 font-bold">Question {currentQ + 1} of {total}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-black text-white">{answeredCount}/{total}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Answered</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-purple-400 transition-all duration-300 rounded-full" style={{ width: `${((currentQ + 1) / total) * 100}%` }} />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="bg-card-dark rounded-2xl border border-white/10 p-8 shadow-2xl space-y-6">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 size-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-sm">
                {currentQ + 1}
              </span>
              <h3 className="text-xl font-bold text-white leading-relaxed pt-1">{q.question}</h3>
            </div>

            {isUnknown && !selected && (
              <div className="px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                ⚡ Fun mode — no confirmed answer. Pick your best guess!
              </div>
            )}

            {/* Options */}
            <div className="grid gap-3">
              {q.options.map((option, i) => {
                let optionStyle = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white';
                if (selected) {
                  if (!isUnknown && option.toLowerCase() === q.answer.toLowerCase()) {
                    optionStyle = 'bg-green-500/10 border-green-500/30 text-green-400';
                  } else if (option === selected && !isUnknown && option.toLowerCase() !== q.answer.toLowerCase()) {
                    optionStyle = 'bg-red-500/10 border-red-500/30 text-red-400';
                  } else if (option === selected && isUnknown) {
                    optionStyle = 'bg-primary/10 border-primary/30 text-primary';
                  } else {
                    optionStyle = 'bg-white/[0.02] border-white/5 text-slate-600';
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(option)}
                    disabled={!!selected}
                    className={`w-full text-left px-6 py-4 rounded-xl border font-bold transition-all flex items-center gap-4 ${optionStyle} disabled:cursor-default`}
                  >
                    <span className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-black shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                    {selected && !isUnknown && option.toLowerCase() === q.answer.toLowerCase() && <Check className="size-4 ml-auto text-green-400" />}
                    {selected && option === selected && !isUnknown && option.toLowerCase() !== q.answer.toLowerCase() && <X className="size-4 ml-auto text-red-400" />}
                  </button>
                );
              })}
            </div>

            {/* Evidence after answering */}
            {selected && q.evidence && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">📖 Source Evidence</p>
                <p className="text-sm text-slate-300 leading-relaxed italic">{q.evidence}</p>
              </motion.div>
            )}

            {/* Next button after selecting */}
            {selected && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleNext}
                className="w-full py-4 bg-primary text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                {currentQ === total - 1 ? 'See Results' : 'Next Question'}
                <ChevronRight className="size-4" />
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Question dots */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrentQ(i); setSelected(scores[i] !== undefined ? 'locked' : null); }}
              className={`size-2.5 rounded-full transition-all ${i === currentQ
                ? 'bg-primary scale-150'
                : scores[i] === 'correct'
                  ? 'bg-green-500'
                  : scores[i] === 'incorrect'
                    ? 'bg-red-500'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeedbackWidget = ({ user }: { user: User | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userEmail = user?.email || 'Unlogged in user';
    const emailBody = `From: ${userEmail}\n\n${message}`;

    // Using mailto to simulate sending for now
    window.location.href = `mailto:ruoyu.zheng2016@gmail.com?subject=From%20FandomTrivia&body=${encodeURIComponent(emailBody)}`;

    setSent(true);
    setTimeout(() => {
      setIsOpen(false);
      setSent(false);
      setMessage('');
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 bg-card-dark border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Megaphone className="size-4 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-black italic text-sm leading-none">Feedback</h4>
                  <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest mt-0.5">We're listening</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="size-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 bg-card-dark relative">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center space-y-3"
                >
                  <div className="size-12 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                    <Check className="size-6" />
                  </div>
                  <div>
                    <p className="font-black text-white italic tracking-tight">Thanks for reaching out!</p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">Your feedback makes us better.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Have an idea for a new feature? Found a bug? Let us know!
                  </p>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you think..."
                    className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 resize-none font-medium transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    Send Feedback
                    <Send className="size-3" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="size-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_20px_rgba(127,19,236,0.5)] border border-white/10 z-50 transition-all hover:bg-primary/90"
      >
        <Lightbulb className="size-6" />
      </motion.button>
    </div>
  );
};

const LandingView = ({ setView }: { setView: (v: ViewType) => void, key?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="pt-20">
      {/* Hero */}
      <section className="relative w-full py-20 px-6 overflow-hidden">
        <ParticleCanvas mode="ambient" className="opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Join 12.4K Active Players
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-[1.1]"
          >
            The Ultimate <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Fandom Trivia</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed font-medium"
          >
            Test your knowledge across the multiverse. Prove you're the ultimate fan in Twilight, Harry Potter, K-Pop: Demon Hunters, The 3 Body Problem, and Zootopia.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => document.getElementById('universes')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
            >
              <PlayCircle className="size-6" />
              Start Quiz Now
            </button>
            <button onClick={() => setView('rankings')} className="w-full sm:w-auto bg-white/5 border border-white/10 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              View Rankings
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Users, label: 'Active Players', value: '12,482', color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { icon: Trophy, label: 'Quizzes Taken', value: '1.2M+', color: 'text-primary', bg: 'bg-primary/10' },
            { icon: Star, label: 'Global Rankings', value: '#1 Hub', color: 'text-amber-500', bg: 'bg-amber-500/10' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl flex items-center gap-6"
            >
              <div className={`size-14 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="size-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Universe Grid */}
      <section id="universes" className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <h3 className="text-3xl font-extrabold text-white">Choose Your Universe</h3>
            <p className="text-slate-400 font-medium">Select a category to begin your journey into fandom trivia.</p>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-2 text-primary font-bold hover:underline">
            View All Categories
            <ArrowRight className="size-5" />
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {UNIVERSES.map((universe, i) => (
            <motion.div
              key={universe.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="fandom-card group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 shadow-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${universe.image}")` }}
              ></div>
              <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-colors duration-300"></div>
              <div className="absolute bottom-0 left-0 p-8 space-y-4 w-full">
                <div className="flex items-center gap-2">
                  {universe.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest border border-white/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className={`text-4xl font-extrabold text-white tracking-tight ${universe.isSpecial ? 'leading-none' : ''}`}>
                  {universe.isSpecial ? (
                    <>K-Pop: <br /><span className="text-primary">Demon Hunters</span></>
                  ) : universe.title}
                </h4>
                <p className="text-slate-300 font-medium line-clamp-2">{universe.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (universe.id === 'twilight') setView('trivia-twilight-select');
                    if (universe.id === 'kpop') setView('trivia-kpop');
                    if (universe.id === 'harry-potter') setView('trivia-harry-potter-select');
                    if (universe.id === 'three-body') setView('trivia-three-body-select');
                    if (universe.id === 'zootopia') setView('trivia-zootopia-select');
                  }}
                  className={`w-full py-3 ${universe.isSpecial ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20'} rounded-xl text-white font-bold transition-all`}
                >
                  {universe.buttonText}
                </button>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                {universe.icon === 'Droplets' && <Droplets className="text-white/50 size-10" />}
                {universe.icon === 'Wand2' && <Wand2 className="text-white/50 size-10" />}
                {universe.icon === 'Zap' && <Zap className="text-primary/70 size-10 fill-current" />}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  </motion.div>
);

const DashboardView = ({ key }: { key?: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopScores = async () => {
      const { data } = await supabase
        .from('scores')
        .select('id, score, total, quiz_id, user_id, profiles(username)')
        .order('score', { ascending: false })
        .limit(5);

      if (data) {
        setLeaderboard(data.map((row, i) => {
          // Type casting to handle Supabase's generated typs for foreign relations
          const profile = row.profiles as unknown as { username: string } | null;
          return {
            id: String(i + 1).padStart(2, '0'),
            name: profile?.username || 'Unknown',
            fandom: row.quiz_id,
            points: row.score.toLocaleString(),
            initials: (profile?.username || 'U').slice(0, 2).toUpperCase(),
            color: [
              'from-amber-400 to-amber-600',
              'from-slate-300 to-slate-500',
              'from-orange-400 to-orange-600',
              'from-emerald-400 to-emerald-600',
              'from-purple-400 to-purple-600',
              'from-blue-400 to-blue-600',
            ][i % 6],
            score: row.score,
          };
        }));
      }
    };
    fetchTopScores();
  }, []);

  const scrollTournaments = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-20"
    >
      <section className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-card-dark border border-white/5 p-8 md:p-12 shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent -z-0"></div>
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  Live Circuit Active
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase italic">
                  Season 4: <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent">Legends Rise</span>
                </h2>
                <p className="max-w-xl text-slate-400 font-medium leading-relaxed">
                  Compete in high-stakes trivia battles across the multiverse. Climb the global MMR and earn exclusive digital collectibles.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="bg-primary text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-primary/30 flex items-center gap-2">
                    <Bolt className="size-5 fill-current" />
                    Quick Match
                  </button>
                  <button className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all text-white">
                    All Tournaments
                  </button>
                </div>
              </div>
            </div>

            {/* Active Tournaments Header */}
            <div className="flex items-center justify-between pt-4">
              <h3 className="text-xl font-black uppercase tracking-widest italic flex items-center gap-3">
                <span className="w-8 h-[2px] bg-primary"></span>
                Active Tournaments
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollTournaments('left')}
                  className="size-8 rounded border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => scrollTournaments('right')}
                  className="size-8 rounded border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Tournament Cards */}
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
              {TOURNAMENTS.map((t) => (
                <div key={t.id} className={`group relative bg-card-dark rounded-2xl overflow-hidden border border-white/5 p-1 transition-all hover:border-${t.color}/50 min-w-[300px] flex-shrink-0 snap-start`}>
                  <div className="relative h-48 rounded-xl overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url("${t.image}")` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-card-dark via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[9px] font-black text-white uppercase tracking-widest border border-white/10">
                      {t.pool}
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xl font-black text-white italic tracking-tight">{t.title}</h4>
                      <div className="flex items-center gap-1 text-slate-500">
                        <Users className="size-3" />
                        <span className="text-[10px] font-bold">{t.players}</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <span>Progress</span>
                        <span className={`text-${t.color}`}>{t.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${t.color} rounded-full`}
                          style={{ width: `${t.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className={`w-full py-2.5 bg-white/5 hover:bg-${t.color} transition-all rounded-lg text-[10px] font-black uppercase tracking-widest text-white border border-white/10 group-hover:border-${t.color}`}>
                      Join Lobby
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-card-dark rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                  <LayoutDashboard className="size-4 text-primary" />
                  Live Leaderboard
                </h3>
                <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[9px] font-black">SEASON 4</span>
              </div>
              <div className="p-2 space-y-1">
                {leaderboard.length === 0 ? (
                  <div className="p-6 text-center space-y-2">
                    <p className="text-slate-500 text-xs font-bold">No scores yet</p>
                    <p className="text-slate-600 text-[10px]">Complete a quiz to appear here!</p>
                  </div>
                ) : leaderboard.map((user) => (
                  <div key={user.id} className={`flex items-center gap-4 p-4 rounded-xl ${user.id === '01' ? 'bg-white/[0.03] border border-white/5' : 'hover:bg-white/[0.02] transition-colors group'}`}>
                    <div className={`size-8 flex items-center justify-center font-black italic ${user.id === '01' ? 'text-amber-400' : user.id === '02' ? 'text-slate-400' : user.id === '03' ? 'text-orange-400' : 'text-slate-600 text-xs'}`}>
                      {user.id}
                    </div>
                    <div className={`size-10 rounded-full bg-gradient-to-br ${user.color} p-0.5`}>
                      <div className="w-full h-full rounded-full bg-card-dark flex items-center justify-center font-bold text-xs">
                        {user.initials}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{user.name}</p>
                      <p className="text-[10px] font-bold text-slate-500">{user.fandom}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-black ${user.id === '01' ? 'text-amber-400' : 'text-white'}`}>{user.points}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase">Points</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white/[0.02] border-t border-white/10">
                <button className="w-full py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                  View Full Standings
                  <ExternalLink className="size-3" />
                </button>
              </div>
            </div>

            <div className="bg-card-dark rounded-2xl border border-white/10 p-6 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Feed</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="size-2 rounded-full bg-green-500 mt-1.5 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                  <p className="text-[11px] leading-relaxed"><span className="font-black text-white">@Jin_Solo</span> just achieved <span className="text-accent italic">Perfect Clear</span> in BTS Quest</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-2 rounded-full bg-primary mt-1.5 shadow-[0_0_8px_rgba(127,19,236,0.5)]"></div>
                  <p className="text-[11px] leading-relaxed"><span className="font-black text-white">Team_Slytherin</span> has entered the Top 10 in HP Circuit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-[1600px] mx-auto px-6 mt-12 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Global Users', value: '2.4M', color: 'text-white' },
            { label: 'Prize Paid', value: '$150K', color: 'text-primary' },
            { label: 'Active Lobbies', value: '1,402', color: 'text-accent' },
            { label: 'Avg MMR', value: '1,250', color: 'text-white' },
          ].map((stat, i) => (
            <div key={i} className="bg-card-dark border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center gap-2 stats-gradient">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className={`text-4xl font-black ${stat.color} tracking-tighter italic`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ready CTA */}
      <section className="max-w-[1600px] mx-auto px-6 mb-20">
        <div className="relative bg-primary rounded-3xl p-10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          <div className="relative z-10 space-y-2 text-center md:text-left">
            <h3 className="text-3xl font-black text-white italic uppercase leading-none">Ready for the Pro-League?</h3>
            <p className="text-white/70 text-sm font-medium">Join 50,000+ competitive players in the Season 5 qualifier.</p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button className="bg-white text-primary px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-2xl">Create Account</button>
            <button className="bg-transparent border border-white/30 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Read Rules</button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// --- Rankings View ---
const RankingsView = ({ setView }: { setView: (v: ViewType) => void, key?: string }) => {
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('scores')
          .select(`
          id,
          score,
          total,
          quiz_id,
          created_at,
          user_id,
          profiles(username)
          `)
          .order('score', { ascending: false });

        if (error) throw error;

        // Group by quiz_id
        const groupedByQuiz: Record<string, any[]> = {};

        if (data) {
          data.forEach(row => {
            const qid = row.quiz_id;
            if (!groupedByQuiz[qid]) {
              groupedByQuiz[qid] = [];
            }

            // Only add if this user doesn't already have a higher/equal score in this quiz list
            const existingUserScoreIndex = groupedByQuiz[qid].findIndex(s => s.user_id === row.user_id);
            if (existingUserScoreIndex === -1) {
              groupedByQuiz[qid].push(row);
            }
          });
        }

        // Convert to an array of quizzes with their top scores
        const finalRankings = Object.entries(groupedByQuiz).map(([quiz_id, userScores]) => ({
          quiz_id,
          scores: userScores.slice(0, 10) // Top 10 per quiz
        }));

        setScores(finalRankings);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
          <button onClick={() => setView('landing')} className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
            <ArrowLeft className="size-4" />
          </button>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Trophy className="size-8 text-amber-400" />
            Global Rankings
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-400 font-bold animate-pulse">
            Loading top scores...
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400 font-bold">
            Failed to load rankings: {error}
          </div>
        ) : scores.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-bold">
            No scores recorded yet. Be the first!
          </div>
        ) : (
          <div className="space-y-12">
            {scores.map((quizData) => (
              <div key={quizData.quiz_id} className="space-y-4">
                <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 flex items-center gap-2">
                  <Hash className="size-5" /> {quizData.quiz_id}
                </h3>
                <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm">
                  {quizData.scores.map((scoreRow: any, idx: number) => (
                    <div key={scoreRow.id} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`size-8 rounded-full flex items-center justify-center font-black text-sm ${idx === 0 ? 'bg-amber-500 text-black' : idx === 1 ? 'bg-slate-300 text-black' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-white/10 text-white'}`}>
                          #{idx + 1}
                        </div>
                        <div>
                          <p className="font-bold text-white">{scoreRow.profiles?.username || 'Unknown User'}</p>
                          <p className="text-xs text-slate-500 font-medium">#{scoreRow.user_id.substring(0, 8)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                          {scoreRow.score} / {scoreRow.total}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          {Math.round((scoreRow.score / scoreRow.total) * 100)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewType>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>([]);
  const [badgeQueue, setBadgeQueue] = useState<Badge[]>([]);

  // Load user profile from Supabase
  const loadUserProfile = async (supabaseUser: any) => {
    try {
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert([{
            id: supabaseUser.id,
            email: supabaseUser.user_metadata.email || supabaseUser.email,
            name: supabaseUser.user_metadata.full_name || supabaseUser.email?.split('@')[0],
            picture: supabaseUser.user_metadata.avatar_url || 'https://via.placeholder.com/150'
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        data = newProfile;
      } else if (error) {
        throw error;
      }

      // Map the fetched profile data to the User type
      const appUser: User = {
        id: data.id,
        email: data.email || '',
        name: data.display_name || data.name || '', // Use display_name if available, otherwise name
        picture: data.avatar_url || data.picture || '',
        username: data.username || null,
      };

      setUser(appUser);

      if (!appUser.username) {
        setShowUsernameModal(true);
      }
    } catch (err: any) {
      console.error('Error loading profile:', err.message);
      setUser(null); // Ensure user is null if profile loading fails
    }
  };

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user);
      }
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Retroactively load badges based on past quizzes
  useEffect(() => {
    if (!user) {
      setUnlockedBadgeIds([]);
      return;
    }

    const loadPastBadges = async () => {
      try {
        const { data, error } = await supabase
          .from('scores')
          .select('score, total, quiz_id')
          .eq('user_id', user.id);

        if (error) throw error;
        
        if (data && data.length > 0) {
          const preEarnedIds = new Set<string>();
          
          data.forEach(item => {
             const scorePct = Math.round((item.score / item.total) * 100);
             
             BADGES.forEach(badge => {
                if (preEarnedIds.has(badge.id)) return;
                
                let unlocked = false;
                if (badge.id === 'first_blood') {
                  unlocked = true; 
                }
                if (badge.id === 'perfect_score' && scorePct === 100) {
                  unlocked = true;
                }
                
                if (badge.targetQuiz) {
                  const titleLower = item.quiz_id.toLowerCase();
                  if (titleLower.includes(badge.targetQuiz.replace('-', ' '))) {
                    unlocked = true;
                  } else if (badge.targetQuiz === 'harry-potter' && titleLower.includes('harry potter')) {
                    unlocked = true;
                  } else if (badge.targetQuiz === 'twilight' && (titleLower.includes('twilight') || titleLower.includes('eclipse') || titleLower.includes('new moon') || titleLower.includes('breaking dawn') || titleLower.includes('midnight sun') || titleLower.includes('life and death'))) {
                    unlocked = true;
                  } else if (badge.targetQuiz === 'three-body' && (titleLower.includes('three-body') || titleLower.includes('dark forest') || titleLower.includes('death\'s end'))) {
                    unlocked = true;
                  } else if (badge.targetQuiz === 'zootopia' && titleLower.includes('zootopia')) {
                    unlocked = true;
                  } else if (badge.targetQuiz === 'kpop' && titleLower.includes('k-pop')) {
                    unlocked = true;
                  }
                }

                if (unlocked) {
                  preEarnedIds.add(badge.id);
                }
             });
          });
          setUnlockedBadgeIds(Array.from(preEarnedIds));
        }
      } catch (err) {
        console.error('Failed to load past badge history', err);
      }
    };

    loadPastBadges();
  }, [user?.id]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout failed:', error.message);
    }
    setUser(null);
    setUnlockedBadgeIds([]);
    setView('landing');
  };

  const evaluateBadges = (quizId: string, scorePct: number) => {
    const newlyUnlocked: Badge[] = [];

    BADGES.forEach(badge => {
      if (unlockedBadgeIds.includes(badge.id)) return; // Already unlocked

      let unlocked = false;

      // First quiz
      if (badge.id === 'first_blood') {
        unlocked = true; 
      }
      
      // Perfect score
      if (badge.id === 'perfect_score' && scorePct === 100) {
        unlocked = true;
      }

      // Universe completion badges
      if (badge.targetQuiz) {
        const titleLower = quizId.toLowerCase();
        if (titleLower.includes(badge.targetQuiz.replace('-', ' '))) {
          unlocked = true;
        } else if (badge.targetQuiz === 'harry-potter' && titleLower.includes('harry potter')) {
          unlocked = true;
        } else if (badge.targetQuiz === 'twilight' && (titleLower.includes('twilight') || titleLower.includes('eclipse') || titleLower.includes('new moon') || titleLower.includes('breaking dawn') || titleLower.includes('midnight sun') || titleLower.includes('life and death'))) {
          unlocked = true;
        } else if (badge.targetQuiz === 'three-body' && (titleLower.includes('three-body') || titleLower.includes('dark forest') || titleLower.includes('death\'s end'))) {
          unlocked = true;
        } else if (badge.targetQuiz === 'zootopia' && titleLower.includes('zootopia')) {
          unlocked = true;
        } else if (badge.targetQuiz === 'kpop' && titleLower.includes('k-pop')) {
          unlocked = true;
        }
      }

      if (unlocked) {
        newlyUnlocked.push(badge);
      }
    });

    if (newlyUnlocked.length > 0) {
      setUnlockedBadgeIds(prev => [...prev, ...newlyUnlocked.map(b => b.id)]);
      
      // Add newly unlocked badges to the queue
      setBadgeQueue(prev => [...prev, ...newlyUnlocked]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-slate-100 selection:bg-primary selection:text-white">
      <Navbar
        isDashboard={view === 'dashboard'}
        setView={setView}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onResetUsername={() => setShowUsernameModal(true)}
        onShowHistory={() => setShowHistoryModal(true)}
        onShowBadges={() => setShowBadgesModal(true)}
      />

      <AnimatePresence>
        {badgeQueue.length > 0 && (
          <BadgeNotification 
            key={badgeQueue[0].id}
            badge={badgeQueue[0]} 
            onClose={() => setBadgeQueue(prev => prev.slice(1))} 
          />
        )}
      </AnimatePresence>

      {showHistoryModal && user && (
        <HistoryModal user={user} onClose={() => setShowHistoryModal(false)} />
      )}

      {showBadgesModal && (
        <BadgesModal unlockedBadgeIds={unlockedBadgeIds} onClose={() => setShowBadgesModal(false)} />
      )}

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <LandingView key="landing" setView={setView} />
        ) : view === 'rankings' ? (
          <RankingsView key="rankings" setView={setView} />
        ) : view === 'trivia-kpop' ? (
          <MCQuizView key="trivia-kpop" setView={setView} questions={KPOP_TRIVIA} title="K-Pop: Demon Hunters" scoreLabel="K-Pop: Demon Hunters" grades={[
            { threshold: 90, label: 'Demon Hunter Elite', color: 'text-amber-400', character: { name: 'Master Saja', image: '/images/Soda Pop and How It\'s Done.jpg', desc: 'You have mastered the supernatural rhythm. The shadows fear your precision.' } },
            { threshold: 70, label: 'Saja Superfan', color: 'text-purple-400', character: { name: 'Lead Hunter', image: '/images/Soda Pop and How It\'s Done.jpg', desc: 'Your instincts are sharp and your beats are lethal.' } },
            { threshold: 50, label: 'K-Pop Casual', color: 'text-blue-400', character: { name: 'Rookie Trainee', image: '/images/Soda Pop and How It\'s Done.jpg', desc: 'You have potential, but the demons are still faster.' } },
            { threshold: 0, label: 'Trainee', color: 'text-slate-400', character: { name: 'Civilian Fan', image: '/images/Soda Pop and How It\'s Done.jpg', desc: 'Keep practicing your moves before entering the supernatural zone.' } },
          ]} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-twilight-select' ? (
          <TwilightBookSelector key="twilight-select" setView={setView} />
        ) : view === 'trivia-twilight-mc' ? (
          <MCQuizView key="trivia-twilight-mc" setView={setView} questions={TWILIGHT_MC_TRIVIA} title="Twilight: Vol. I" scoreLabel="Twilight Vol. I" grades={TWILIGHT_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-twilight-book' ? (
          <MCQuizView key="trivia-twilight-book" setView={setView} questions={TWILIGHT_BOOK_TRIVIA} title="Twilight" scoreLabel="Twilight" grades={TWILIGHT_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-newmoon' ? (
          <MCQuizView key="trivia-newmoon" setView={setView} questions={NEW_MOON_TRIVIA} title="New Moon" scoreLabel="New Moon" grades={TWILIGHT_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-eclipse' ? (
          <MCQuizView key="trivia-eclipse" setView={setView} questions={ECLIPSE_TRIVIA} title="Eclipse" scoreLabel="Eclipse" grades={TWILIGHT_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-breakingdawn' ? (
          <MCQuizView key="trivia-breakingdawn" setView={setView} questions={BREAKING_DAWN_TRIVIA} title="Breaking Dawn" scoreLabel="Breaking Dawn" grades={TWILIGHT_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-midnightsun' ? (
          <MCQuizView key="trivia-midnightsun" setView={setView} questions={MIDNIGHT_SUN_TRIVIA} title="Midnight Sun" scoreLabel="Midnight Sun" grades={TWILIGHT_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-lifeanddeath' ? (
          <MCQuizView key="trivia-lifeanddeath" setView={setView} questions={LIFE_AND_DEATH_TRIVIA} title="Life and Death" scoreLabel="Life and Death" grades={TWILIGHT_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-twilight-random' ? (
          <MCQuizView key={`trivia-twilight-random-${Date.now()}`} setView={setView} questions={[...TWILIGHT_MC_TRIVIA, ...TWILIGHT_BOOK_TRIVIA, ...NEW_MOON_TRIVIA, ...ECLIPSE_TRIVIA, ...BREAKING_DAWN_TRIVIA, ...MIDNIGHT_SUN_TRIVIA, ...LIFE_AND_DEATH_TRIVIA].sort(() => Math.random() - 0.5).slice(0, 20).map((q, i) => ({ ...q, id: i + 1 }))} title="Twilight: Random Mix" scoreLabel="Twilight: Random Mix" grades={TWILIGHT_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-harry-potter' ? (
          <MCQuizView key="trivia-harry-potter" setView={setView} questions={HARRY_POTTER_TRIVIA} title="Harry Potter: Sorcerer's Stone" scoreLabel="Harry Potter: Sorcerer's Stone" grades={[
            { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400' },
            { threshold: 70, label: 'Prefect Material', color: 'text-purple-400' },
            { threshold: 50, label: 'Muggle-Born Learner', color: 'text-blue-400' },
            { threshold: 0, label: 'Muggle', color: 'text-slate-400' },
          ]} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-harry-potter-cos' ? (
          <MCQuizView key="trivia-harry-potter-cos" setView={setView} questions={HARRY_POTTER_COS_TRIVIA} title="Harry Potter: Chamber of Secrets" scoreLabel="Harry Potter: Chamber of Secrets" grades={[
            { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400' },
            { threshold: 70, label: 'Prefect Material', color: 'text-purple-400' },
            { threshold: 50, label: 'Muggle-Born Learner', color: 'text-blue-400' },
            { threshold: 0, label: 'Muggle', color: 'text-slate-400' },
          ]} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-harry-potter-poa' ? (
          <MCQuizView key={`trivia-harry-potter-poa-${Date.now()}`} setView={setView} questions={[...HARRY_POTTER_POA_TRIVIA].sort(() => Math.random() - 0.5).slice(0, 20).map((q, i) => ({ ...q, id: i + 1 }))} title="Harry Potter: Prisoner of Azkaban" scoreLabel="Harry Potter: Prisoner of Azkaban" grades={[
            { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Hermione Granger', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Brilliant! You probably read Hogwarts: A History in your spare time.' } },
            { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Harry Potter', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Excellent instincts! You have a natural talent for defense and history.' } },
            { threshold: 50, label: 'Muggle-Born Learner', color: 'text-blue-400', character: { name: 'Ron Weasley', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Not bad, but you might want to borrow Hermione\'s notes.' } },
            { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Neville Longbottom', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Did you forget to use your Remembrall?' } },
          ]} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-harry-potter-gof' ? (
          <MCQuizView key={`trivia-harry-potter-gof-${Date.now()}`} setView={setView} questions={[...HARRY_POTTER_GOF_TRIVIA].sort(() => Math.random() - 0.5).slice(0, 20).map((q, i) => ({ ...q, id: i + 1 }))} title="Harry Potter: Goblet of Fire" scoreLabel="Harry Potter: Goblet of Fire" grades={[
            { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Hermione Granger', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Brilliant! You probably read Hogwarts: A History in your spare time.' } },
            { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Harry Potter', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Excellent instincts! You have a natural talent for defense and history.' } },
            { threshold: 50, label: 'Muggle-Born Learner', color: 'text-blue-400', character: { name: 'Ron Weasley', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Not bad, but you might want to borrow Hermione\'s notes.' } },
            { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Neville Longbottom', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Did you forget to use your Remembrall?' } },
          ]} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-harry-potter-ootp' ? (
          <MCQuizView key={`trivia-harry-potter-ootp-${Date.now()}`} setView={setView} questions={[...HARRY_POTTER_OOTP_TRIVIA].sort(() => Math.random() - 0.5).slice(0, 20).map((q, i) => ({ ...q, id: i + 1 }))} title="Harry Potter: Order of the Phoenix" scoreLabel="Harry Potter: Order of the Phoenix" grades={[
            { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Hermione Granger', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Brilliant! You probably read Hogwarts: A History in your spare time.' } },
            { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Harry Potter', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Excellent instincts! You have a natural talent for defense and history.' } },
            { threshold: 50, label: 'Muggle-Born Learner', color: 'text-blue-400', character: { name: 'Ron Weasley', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Not bad, but you might want to borrow Hermione\'s notes.' } },
            { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Neville Longbottom', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Did you forget to use your Remembrall?' } },
          ]} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-harry-potter-hbp' ? (
          <MCQuizView key={`trivia-harry-potter-hbp-${Date.now()}`} setView={setView} questions={[...HARRY_POTTER_HBP_TRIVIA].sort(() => Math.random() - 0.5).slice(0, 20).map((q, i) => ({ ...q, id: i + 1 }))} title="Harry Potter: Half-Blood Prince" scoreLabel="Harry Potter: Half-Blood Prince" grades={[
            { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Hermione Granger', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Brilliant! You probably read Hogwarts: A History in your spare time.' } },
            { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Harry Potter', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Excellent instincts! You have a natural talent for defense and history.' } },
            { threshold: 50, label: 'Muggle-Born Learner', color: 'text-blue-400', character: { name: 'Ron Weasley', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Not bad, but you might want to borrow Hermione\'s notes.' } },
            { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Neville Longbottom', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Did you forget to use your Remembrall?' } },
          ]} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-harry-potter-dh' ? (
          <MCQuizView key={`trivia-harry-potter-dh-${Date.now()}`} setView={setView} questions={[...HARRY_POTTER_DH_TRIVIA].sort(() => Math.random() - 0.5).slice(0, 20).map((q, i) => ({ ...q, id: i + 1 }))} title="Harry Potter: Deathly Hallows" scoreLabel="Harry Potter: Deathly Hallows" grades={[
            { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Hermione Granger', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Brilliant! You probably read Hogwarts: A History in your spare time.' } },
            { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Harry Potter', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Excellent instincts! You have a natural talent for defense and history.' } },
            { threshold: 50, label: 'Muggle-Born Learner', color: 'text-blue-400', character: { name: 'Ron Weasley', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Not bad, but you might want to borrow Hermione\'s notes.' } },
            { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Neville Longbottom', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Did you forget to use your Remembrall?' } },
          ]} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-harry-potter-select' ? (
          <HPBookSelector key="hp-select" setView={setView} />
        ) : view === 'trivia-harry-potter-random' ? (
          <MCQuizView key={`trivia-harry-potter-random-${Date.now()}`} setView={setView} questions={[...HARRY_POTTER_TRIVIA, ...HARRY_POTTER_COS_TRIVIA, ...HARRY_POTTER_POA_TRIVIA, ...HARRY_POTTER_GOF_TRIVIA, ...HARRY_POTTER_OOTP_TRIVIA, ...HARRY_POTTER_HBP_TRIVIA, ...HARRY_POTTER_DH_TRIVIA].sort(() => Math.random() - 0.5).slice(0, 20).map((q, i) => ({ ...q, id: i + 1 }))} title="Harry Potter: Random Mix" scoreLabel="Harry Potter: Random Mix" grades={[
            { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Hermione Granger', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Brilliant! You probably read Hogwarts: A History in your spare time.' } },
            { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Harry Potter', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Excellent instincts! You have a natural talent for defense and history.' } },
            { threshold: 50, label: 'Muggle-Born Learner', color: 'text-blue-400', character: { name: 'Ron Weasley', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Not bad, but you might want to borrow Hermione\'s notes.' } },
            { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Neville Longbottom', image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg', desc: 'Did you forget to use your Remembrall?' } },
          ]} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-three-body-select' ? (
          <ThreeBodyBookSelector key="three-body-select" setView={setView} />
        ) : view === 'trivia-three-body-problem' ? (
          <MCQuizView key="trivia-three-body-problem" setView={setView} questions={THREE_BODY_PROBLEM_TRIVIA} title="The Three-Body Problem" scoreLabel="The Three-Body Problem" grades={THREE_BODY_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-the-dark-forest' ? (
          <MCQuizView key="trivia-the-dark-forest" setView={setView} questions={THE_DARK_FOREST_TRIVIA} title="The Dark Forest" scoreLabel="The Dark Forest" grades={THREE_BODY_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-deaths-end' ? (
          <MCQuizView key="trivia-deaths-end" setView={setView} questions={DEATHS_END_TRIVIA} title="Death's End" scoreLabel="Death's End" grades={THREE_BODY_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-three-body-random' ? (
          <MCQuizView key={`trivia-three-body-random-${Date.now()}`} setView={setView} questions={[...THREE_BODY_PROBLEM_TRIVIA, ...THE_DARK_FOREST_TRIVIA, ...DEATHS_END_TRIVIA].sort(() => Math.random() - 0.5).slice(0, 20).map((q, i) => ({ ...q, id: i + 1 }))} title="Three-Body: Random Mix" scoreLabel="Three-Body: Random Mix" grades={THREE_BODY_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-zootopia-select' ? (
          <ZootopiaSelector key="zootopia-select" setView={setView} />
        ) : view === 'trivia-zootopia' ? (
          <MCQuizView key="trivia-zootopia" setView={setView} questions={ZOOTOPIA_TRIVIA} title="Zootopia" scoreLabel="Zootopia" grades={ZOOTOPIA_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-zootopia-2' ? (
          <MCQuizView key="trivia-zootopia-2" setView={setView} questions={ZOOTOPIA_2_TRIVIA} title="Zootopia 2" scoreLabel="Zootopia 2" grades={ZOOTOPIA_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : view === 'trivia-zootopia-random' ? (
          <MCQuizView key={`trivia-zootopia-random-${Date.now()}`} setView={setView} questions={[...ZOOTOPIA_TRIVIA, ...ZOOTOPIA_2_TRIVIA].sort(() => Math.random() - 0.5).slice(0, 15).map((q, i) => ({ ...q, id: i + 1 }))} title="Zootopia: Mixed Case" scoreLabel="Zootopia: Mixed Case" grades={ZOOTOPIA_GRADES} user={user} onQuizComplete={evaluateBadges} />
        ) : (
          <DashboardView key="dashboard" />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUsernameModal && (
          <UsernameModal
            onComplete={(username) => {
              setUser(prev => prev ? { ...prev, username } : null);
              setShowUsernameModal(false);
            }}
          />
        )}
      </AnimatePresence>

      <FeedbackWidget user={user} />
      <Footer isDashboard={view === 'dashboard'} setView={setView} />
    </div>
  );
}
