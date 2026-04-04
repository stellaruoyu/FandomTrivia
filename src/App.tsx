/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy, Users, Zap, Search, PlayCircle, ArrowRight, Star,
  ChevronLeft, ChevronRight, Share2, Globe, MessageSquare,
  ChevronUp, ChevronDown,
  ExternalLink, Droplets, Wand2, Bolt, LayoutDashboard, LogOut, User as UserIcon,
  BookOpen, Check, X, RotateCcw, Eye, EyeOff, ArrowLeft, Settings, Hash, Megaphone, Lightbulb, Send, Clock, Target, Snowflake,
  Volume2, VolumeX, Sparkles, Car, Lock, Shirt, Scissors, Smile, Palette, Trash2
} from 'lucide-react';
import {
  NAV_LINKS, DASHBOARD_NAV_LINKS, UNIVERSES, TOURNAMENTS, DAILY_QUIZZES,
  KPOP_TRIVIA, TWILIGHT_MC_TRIVIA, TWILIGHT_BOOK_TRIVIA, NEW_MOON_TRIVIA, ECLIPSE_TRIVIA, BREAKING_DAWN_TRIVIA, MIDNIGHT_SUN_TRIVIA, LIFE_AND_DEATH_TRIVIA,

  HARRY_POTTER_TRIVIA, HARRY_POTTER_COS_TRIVIA,
  HARRY_POTTER_POA_TRIVIA, HARRY_POTTER_GOF_TRIVIA, HARRY_POTTER_OOTP_TRIVIA, HARRY_POTTER_HBP_TRIVIA, HARRY_POTTER_DH_TRIVIA,
  THREE_BODY_PROBLEM_TRIVIA, THE_DARK_FOREST_TRIVIA, DEATHS_END_TRIVIA,
  ZOOTOPIA_TRIVIA, ZOOTOPIA_2_TRIVIA,
  DESPICABLE_ME_1_TRIVIA, DESPICABLE_ME_2_TRIVIA, DESPICABLE_ME_3_TRIVIA, DESPICABLE_ME_4_TRIVIA, DESPICABLE_ME_MIXED_TRIVIA,
  FROZEN_1_TRIVIA, FROZEN_2_TRIVIA, FROZEN_MIXED_TRIVIA,
  MCTriviaQuestion, BADGES, Badge
} from './constants';
import ParticleCanvas from './ParticleCanvas';
import { supabase } from './supabaseClient';

const normalizeSlug = (id: string): string => {
  return id.toLowerCase()
    .replace('trivia-', '')
    .replace(/:/g, '')
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/-+/g, '-')
    .trim();
};

const getQuizTitle = (quizId: string): string => {
  const normalizedId = normalizeSlug(quizId);
  const daily = DAILY_QUIZZES.find(q => q.id === normalizedId);
  if (daily) return daily.title;

  const map: Record<string, string> = {
    'twilight-book-1': 'Twilight: Book 1',
    'hp-sorcerers-stone': "HP: Sorcerer's Stone",
    'kpop-demon-hunters': 'K-Pop: Demon Hunters',
    'three-body-problem': 'The Three-Body Problem',
    'zootopia-1': 'Zootopia (Case 1)',
    'despicable-me-1': 'Despicable Me',
    'frozen-1': 'Frozen (Chapter 1)',
    'hp-chamber-of-secrets': 'HP: Chamber of Secrets',
    'hp-prisoner-of-azkaban': 'HP: Prisoner of Azkaban',
    'hp-goblet-of-fire': 'HP: Goblet of Fire',
    'hp-order-of-the-phoenix': 'HP: Order of the Phoenix',
    'hp-half-blood-prince': 'HP: Half-Blood Prince',
    'hp-deathly-hallows': 'HP: Deathly Hallows',
    'three-body': 'The Three-Body Problem',
    'dark-forest': 'The Dark Forest',
    'deaths-end': "Death's End",
    'zootopia': 'Zootopia',
    'zootopia-2': 'Zootopia 2',
    'despicable-me': 'Despicable Me',
    'despicable-me-2': 'Despicable Me 2',
    'despicable-me-3': 'Despicable Me 3',
    'despicable-me-4': 'Despicable Me 2', // User might want this or 4
    'frozen': 'Frozen (2013)',
    'frozen-2': 'Frozen 2'
  };

  return map[normalizedId] || normalizedId;
};

const getUniverseName = (quizId: string): string => {
  const q = quizId.toLowerCase();
  if (q.includes('twilight') || q.includes('moon') || q.includes('eclipse') || q.includes('breaking') || q.includes('midnight') || q.includes('life')) return 'Twilight Saga';
  if (q.includes('hp-') || q.includes('harry') || q.includes('potter')) return 'Wizarding World';
  if (q.includes('kpop') || q.includes('demon')) return 'K-Pop Universe';
  if (q.includes('three-body') || q.includes('dark-forest') || q.includes('deaths-end') || q.includes('forest') || q.includes('death')) return 'Three-Body Universe';
  if (q.includes('zootopia')) return 'Zootopia Universe';
  if (q.includes('despicable')) return 'Despicable Me Universe';
  if (q.includes('frozen')) return 'Frozen Universe';
  return 'Other Challenges';
};

const getQuizImage = (quizId: string): string => {
  const q = quizId.toLowerCase();
  if (q.includes('twilight')) return '/images/Cullen Family.jpg';
  if (q.includes('hp-') || q.includes('harry') || q.includes('potter')) return '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg';
  if (q.includes('kpop')) return '/images/Soda Pop and How It\'s Done.jpg';
  if (q.includes('three-body') || q.includes('dark-forest') || q.includes('deaths-end')) return '/images/threebody.jpg';
  if (q.includes('zootopia')) return '/images/zootopia.jpg';
  return ''; // Default to no image (SimpleAvatar will show initials)
};

const useQuizStats = () => {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.from('scores').select('quiz_id');
        if (error) throw error;
        
        const counts: Record<string, number> = {};
        data?.forEach(row => {
          const rawId = row.quiz_id || '';
          let normalized = normalizeSlug(rawId);
          
          // Manual overrides for common mismatches
          if (normalized.includes('twilight') && (normalized.includes('book-1') || normalized === 'twilight')) normalized = 'twilight-book-1';
          if (normalized === 'frozen-2013' || normalized === 'frozen-chapter-1') normalized = 'frozen-1';
          if (normalized === 'despicable-me-2010') normalized = 'despicable-me-1';
          
          counts[normalized] = (counts[normalized] || 0) + 1;
        });
        setStats(counts);
      } catch (err) {
        console.error('Error fetching quiz stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getQuizCount = (quizId: string) => {
    const normalized = normalizeSlug(quizId);
    return stats[normalized] || 0;
  };
  
  const getUniverseCount = (universeId: string) => {
    return Object.entries(stats).reduce((sum, [id, count]) => {
      const val = count as number;
      const univName = getUniverseName(id).toLowerCase();
      const target = universeId.toLowerCase();
      
      if (target === 'twilight' && (univName.includes('twilight') || id.includes('twilight'))) return sum + val;
      if (target === 'harry-potter' && (univName.includes('wizarding') || id.includes('hp-') || id.includes('potter') || id.includes('harry'))) return sum + val;
      if (target === 'kpop' && (univName.includes('k-pop') || id.includes('kpop'))) return sum + val;
      if (target === 'three-body' && (univName.includes('three-body') || id.includes('three-body') || id.includes('forest') || id.includes('death'))) return sum + val;
      if (target === 'zootopia' && (univName.includes('zootopia') || id.includes('zootopia'))) return sum + val;
      if (target === 'despicable-me' && (univName.includes('despicable') || id.includes('despicable'))) return sum + val;
      if (target === 'frozen' && (univName.includes('frozen') || id.includes('frozen'))) return sum + val;
      
      return sum;
    }, 0);
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  return { getQuizCount, getUniverseCount, formatCount, loading };
};

// --- Types ---

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  username: string | null;
}

// --- Components ---

const SimpleAvatar = ({ name, picture, size = 40, className = "" }: { name?: string | null, picture?: string | null, size?: number, className?: string }) => {
  if (picture && picture.startsWith('http')) {
    return (
      <img 
        src={picture} 
        alt={name || 'User'} 
        style={{ width: size, height: size }}
        className={`rounded-full border border-white/10 shrink-0 object-cover ${className}`}
        loading="lazy"
      />
    );
  }

  const initials = name ? name.substring(0, 2).toUpperCase() : '??';
  const colors = [
    'bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500', 
    'bg-rose-500', 'bg-indigo-500', 'bg-teal-500'
  ];
  const colorIndex = name ? name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length : 0;
  const bgColor = colors[colorIndex];

  return (
    <div 
      style={{ width: size, height: size }} 
      className={`rounded-full flex items-center justify-center text-white font-bold select-none shrink-0 border border-white/10 ${bgColor} ${className}`}
    >
      <span style={{ fontSize: size * 0.4 }}>{initials}</span>
    </div>
  );
};

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
          .select('id, score, total, quiz_id, created_at, completion_time')
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

  const handleDeleteHistory = async (scoreId: string) => {
    if (!window.confirm('Are you sure you want to remove this quiz from your history? It will also be removed from the leaderboard.')) return;
    
    const { error } = await supabase.from('scores').delete().eq('id', scoreId);
    if (error) {
      alert('Error deleting score: ' + error.message);
    } else {
      setHistory(prev => prev.filter(item => item.id !== scoreId));
    }
  };

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
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                    {new Date(item.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    <span className="size-1 rounded-full bg-slate-700"></span>
                    <span>{formatTime(item.completion_time)}</span>
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
                <button
                  onClick={() => handleDeleteHistory(item.id)}
                  className="size-8 ml-4 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20"
                  title="Remove from History"
                >
                  <Trash2 className="size-4" />
                </button>
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
          <div className="flex items-center gap-2">
            <button 
              onClick={async () => {
                const badgeNames = BADGES.filter(b => unlockedBadgeIds.includes(b.id)).map(b => b.name).join(', ');
                const text = unlockedBadgeIds.length > 0
                  ? `I've unlocked ${unlockedBadgeIds.length} badges on FandomTrivia! (${badgeNames}) Can you beat my score?`
                  : `I haven't unlocked any badges on FandomTrivia yet! Can you beat my score?`;
                try {
                  if (navigator.share) {
                    await navigator.share({ title: 'My FandomTrivia Badges', text });
                  } else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(text);
                    alert('Copied to clipboard!');
                  }
                } catch (e) {
                  console.error('Share failed', e);
                }
              }}
              className="size-8 bg-white/5 hover:bg-primary/20 hover:text-primary rounded-full flex items-center justify-center transition-all cursor-pointer text-slate-300"
              title="Share Badges"
            >
              <Share2 className="size-4" />
            </button>
            <button onClick={onClose} className="size-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors">
              <X className="size-4" />
            </button>
          </div>
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

const Navbar = ({ isDashboard, user, onLogin, onLogout, onResetUsername, onShowHistory, onShowBadges, onShowInfo, soundEnabled, onToggleSound, onTriggerEasterEgg }: {
  isDashboard: boolean,
  user: User | null,
  onLogin: () => void,
  onLogout: () => void,
  onResetUsername?: () => void,
  onShowHistory?: () => void,
  onShowBadges?: () => void,
  onShowInfo?: (title: string, content: string) => void,
  soundEnabled: boolean,
  onToggleSound: () => void,
  onTriggerEasterEgg?: () => void
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const navigate = useNavigate();

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
          onClick={() => {
            const now = Date.now();
            if (now - lastClickTimeRef.current < 800) {
              clickCountRef.current += 1;
            } else {
              clickCountRef.current = 1;
            }
            lastClickTimeRef.current = now;

            if (clickCountRef.current === 3) {
              clickCountRef.current = 0;
              onTriggerEasterEgg?.();
            }
            navigate('/');
          }}
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
                if (link.name === 'Home') navigate('/');
                else if (link.name === 'Leaderboards') navigate('/rankings');
                else if (link.name === 'Categories') {
                  navigate('/');
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
                    <div className="p-1.5 space-y-1">
                      <button
                        onClick={() => { onToggleSound(); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                      >
                        {soundEnabled ? <Volume2 className="size-4 text-primary" /> : <VolumeX className="size-4 text-slate-500" />}
                        {soundEnabled ? 'Turn Sound Off' : 'Turn Sound On'}
                      </button>

                      {onShowHistory && (
                        <button
                          onClick={() => { onShowHistory(); setShowAccountMenu(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                        >
                          <BookOpen className="size-4 text-emerald-400" />
                          Quiz History
                        </button>
                      )}
                      {onShowBadges && (
                        <button
                          onClick={() => { onShowBadges(); setShowAccountMenu(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                        >
                          <Star className="size-4 text-amber-400 fill-amber-400" />
                          My Badges
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

const InfoModal = ({ title, content, onClose }: { title: string, content: string, onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-card-dark border border-white/10 p-8 rounded-3xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl space-y-6"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">{title}</h3>
        <button onClick={onClose} className="size-8 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors">
          <X className="size-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 text-slate-300 text-sm leading-relaxed whitespace-pre-line">
        {content}
      </div>
    </motion.div>
  </div>
);

const LegalPage = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const navigate = useNavigate();
  const description = `Read our ${title} to understand our policies and your rights at Fandom Trivia. Stay informed about how we manage our fandom community.`;
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6 max-w-2xl mx-auto space-y-10">
      <Helmet>
        <title>{title} | Fandom Trivia</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} | Fandom Trivia`} />
        <meta property="og:description" content={description} />
      </Helmet>
      <div className="max-w-3xl mx-auto space-y-8">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-bold mb-4">
          <ArrowLeft className="size-4" /> Back to Home
        </button>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">{title}</h2>
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6 text-slate-300 text-sm leading-relaxed doc-content">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

const PrivacyPolicyView = ({ key }: { key?: string }) => (
  <LegalPage title="Privacy Policy">
    <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Information We Collect</h3>
    <p>We collect information you provide directly to us when you create an account, update your profile, participate in quizzes, or communicate with us. This may include your username, email address, profile picture, and quiz performance data.</p>
    
    <h3 className="text-xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h3>
    <p>We use the information we collect to provide, maintain, and improve our services. This includes calculating leaderboard rankings, awarding badges, and personalizing your experience on FandomTrivia.</p>
    
    <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Data Security</h3>
    <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access. However, no data transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
    
    <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, please contact us at privacy@fandomtrivia.com.</p>
  </LegalPage>
);

const TermsOfServiceView = ({ key }: { key?: string }) => (
  <LegalPage title="Terms of Service">
    <h3 className="text-xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h3>
    <p>By accessing or using FandomTrivia, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
    
    <h3 className="text-xl font-bold text-white mt-8 mb-4">2. User Conduct</h3>
    <p>You agree not to use the service for any unlawful purpose or in any way that interrupts, damages, or impairs the service. Cheating, exploiting bugs, or using automated scripts to complete quizzes is strictly prohibited and will result in account termination.</p>
    
    <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Intellectual Property</h3>
    <p>All trivia content is created by fans and relates to publicly available franchises. We do not claim ownership over the underlying characters or universes, which remain the property of their respective creators and copyright holders.</p>

    <h3 className="text-xl font-bold text-white mt-8 mb-4">4. Modifications to Service</h3>
    <p>We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice.</p>
  </LegalPage>
);

const CookiePolicyView = ({ key }: { key?: string }) => (
  <LegalPage title="Cookie Policy">
    <h3 className="text-xl font-bold text-white mt-8 mb-4">1. What Are Cookies</h3>
    <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience.</p>
    
    <h3 className="text-xl font-bold text-white mt-8 mb-4">2. How We Use Cookies</h3>
    <p>We use essential cookies to maintain your session, keep you logged in, and securely track your quiz progress. Without these cookies, the core functionality of FandomTrivia would not work properly.</p>
    
    <h3 className="text-xl font-bold text-white mt-8 mb-4">3. Managing Cookies</h3>
    <p>Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience and lose the ability to access certain features of FandomTrivia.</p>
  </LegalPage>
);

const Footer = ({ isDashboard, onShowInfo }: { 
  isDashboard: boolean, 
  onShowInfo: (title: string, content: string) => void
}) => {
  const navigate = useNavigate();
  return (
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
          <button 
            type="button"
            onClick={async () => {
              try {
                if (navigator.share) {
                  await navigator.share({ title: 'FandomTrivia', url: window.location.href });
                } else if (navigator.clipboard) {
                  await navigator.clipboard.writeText(window.location.href);
                  alert('Copied link to clipboard!');
                } else {
                  alert('Sharing is not supported on this browser.');
                }
              } catch (e) {
                console.error("Share failed", e);
              }
            }} 
            className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all cursor-pointer"
          >
            <Share2 className="size-5" />
          </button>
          <div className="relative size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all overflow-hidden cursor-pointer group">
            <Globe className="size-5 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 opacity-0 overflow-hidden flex items-center justify-center" id="google_translate_element"></div>
          </div>
          {isDashboard && (
            <a href="#" className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
              <MessageSquare className="size-5" />
            </a>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h5 className="text-sm font-black uppercase tracking-widest text-white">
          Trending Quizzes
        </h5>
        <ul className="space-y-4 text-slate-400 font-semibold text-sm">
          <li><Link to="/selector-harry-potter" className="hover:text-amber-400 transition-colors">Harry Potter World</Link></li>
          <li><Link to="/selector-twilight" className="hover:text-red-400 transition-colors">Twilight Saga</Link></li>
          <li><Link to="/selector-three-body" className="hover:text-indigo-400 transition-colors">Three-Body Problem</Link></li>
          <li><Link to="/trivia-kpop" className="hover:text-purple-400 transition-colors">K-Pop: Demon Hunters</Link></li>
          <li><Link to="/selector-zootopia" className="hover:text-green-400 transition-colors">Zootopia Case Files</Link></li>
          <li><Link to="/selector-frozen" className="hover:text-sky-400 transition-colors">Frozen Arendelle</Link></li>
        </ul>
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
              <li><a href="#" onClick={(e) => { e.preventDefault(); onShowInfo('How It Works', 'Select a universe, test your fan knowledge with our detailed trivia questions, earn points, and unlock exclusive badges to prove you are the ultimate fan!'); }} className="hover:text-primary transition-colors">How it works</a></li>
              <li><Link to="/rankings" className="hover:text-primary transition-colors">Leaderboards</Link></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('universes')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onShowInfo('Rewards', 'Complete quizzes to earn exclusive badges and level up your profile! Competitive seasons will be starting soon.'); }} className="hover:text-primary transition-colors">Rewards</a></li>
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
              <li><Link to="/privacy-policy" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
    <div className={`max-w-${isDashboard ? '[1600px]' : '7xl'} mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest`}>
      <p>© 2026 {isDashboard ? 'PROHUB ESPORTS INC. ALL RIGHTS RESERVED.' : 'FANDOM TRIVIA INC. ALL RIGHTS RESERVED.'}</p>
      <p>CRAFTED WITH <span className="text-primary">♥</span> FOR FANS EVERYWHERE.</p>
    </div>
  </footer>
  );
};

// --- Views ---
// Removed ViewType since we are using React Router now

// --- Twilight Book Selector ---

const TWILIGHT_GRADES = [
  { threshold: 90, label: 'Cullen-Level Expert', color: 'text-amber-400', character: { name: 'Edward Cullen', image: '/images/Cullen Family.jpg', desc: 'You know every detail. You must be able to read minds!' } },
  { threshold: 70, label: 'Forks Insider', color: 'text-purple-400', character: { name: 'Alice Cullen', image: '/images/Cullen Family.jpg', desc: 'Your foresight is impeccable. You saw these answers coming.' } },
  { threshold: 50, label: 'Curious Newcomer', color: 'text-blue-400', character: { name: 'Bella Swan', image: '/images/Cullen Family.jpg', desc: 'You are just starting your supernatural journey into Forks.' } },
  { threshold: 0, label: 'Just Arrived in Forks', color: 'text-slate-400', character: { name: 'Charlie Swan', image: '/images/Cullen Family.jpg', desc: 'You have no idea what is going on out there in the woods.' } },
];

const TwilightBookSelector = ({ key }: { key?: string }) => {
  const navigate = useNavigate();
  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-bold mb-4">
          <ArrowLeft className="size-4" /> Back to Universes
        </button>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-200">Volume</span></h1>
        <Helmet>
          <title>Twilight Saga Trivia & Quizzes | Fandom Trivia</title>
          <meta name="description" content="Ultimate Twilight Saga trivia. Select from Twilight, New Moon, Eclipse, Breaking Dawn, and more. Prove your Cullen-level expertise." />
          <link rel="canonical" href="https://fandom-trivia.vercel.app/selector-twilight" />
          <meta property="og:title" content="Twilight Saga Trivia & Quizzes | Fandom Trivia" />
          <meta property="og:description" content="Test your knowledge of the Twilight Saga. Are you a true Cullen-level expert?" />
          <script type="application/ld+json">
            {getBreadcrumbSchema([
              { name: "Home", item: "https://fandom-trivia.vercel.app/" },
              { name: "Twilight Saga", item: "https://fandom-trivia.vercel.app/selector-twilight" }
            ])}
          </script>
        </Helmet>
        <p className="text-slate-400 font-medium">Select a book to test your knowledge, or try a random mix from all!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          { label: "Book 1", title: "Twilight", desc: `${TWILIGHT_BOOK_TRIVIA.length} questions`, icon: "🍎", view: 'trivia-twilight-book', gradient: 'from-red-600/20 to-rose-600/20', border: 'border-red-500/30 hover:border-red-400/50' },
          { label: "Book 2", title: "New Moon", desc: `${NEW_MOON_TRIVIA.length} questions`, icon: "🌑", view: 'trivia-newmoon', gradient: 'from-amber-600/20 to-yellow-600/20', border: 'border-amber-500/30 hover:border-amber-400/50' },
          { label: "Book 3", title: "Eclipse", desc: `${ECLIPSE_TRIVIA.length} questions`, icon: "🌘", view: 'trivia-eclipse', gradient: 'from-indigo-600/20 to-violet-600/20', border: 'border-indigo-500/30 hover:border-indigo-400/50' },
          { label: "Book 4", title: "Breaking Dawn", desc: `${BREAKING_DAWN_TRIVIA.length} questions`, icon: "🌅", view: 'trivia-breakingdawn', gradient: 'from-orange-600/20 to-red-600/20', border: 'border-orange-500/30 hover:border-orange-400/50' },
          { label: "Companion", title: "Midnight Sun", desc: `${MIDNIGHT_SUN_TRIVIA.length} questions`, icon: "☀️", view: 'trivia-midnightsun', gradient: 'from-sky-600/20 to-blue-600/20', border: 'border-sky-500/30 hover:border-sky-400/50' },
          { label: "Companion", title: "Life and Death", desc: `${LIFE_AND_DEATH_TRIVIA.length} questions`, icon: "🔄", view: 'trivia-lifeanddeath', gradient: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30 hover:border-emerald-400/50' },
          { label: "Random", title: "Mixed Challenge", desc: "20 random from all books", icon: "🎲", view: 'trivia-twilight-random', gradient: 'from-fuchsia-600/20 to-pink-600/20', border: 'border-fuchsia-500/30 hover:border-fuchsia-400/50' },
        ].map(book => (
          <motion.button
            key={book.title}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/${book.view}`)}
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
};

// --- Harry Potter Book Selector ---

const HPBookSelector = ({ key }: { key?: string }) => {
  const navigate = useNavigate();
  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-bold mb-4">
          <ArrowLeft className="size-4" /> Back to Universes
        </button>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">Volume</span></h1>
        <Helmet>
          <title>Harry Potter Trivia & Wizarding Quizzes | Fandom Trivia</title>
          <meta name="description" content="Test your Harry Potter knowledge! From Sorcerer's Stone to Deathly Hallows. Earn your wizarding badges in the ultimate fandom challenge." />
          <link rel="canonical" href="https://fandom-trivia.vercel.app/selector-harry-potter" />
          <meta property="og:title" content="Harry Potter Trivia & Wizarding Quizzes | Fandom Trivia" />
          <meta property="og:description" content="Are you a true Potterhead? Test your magic knowledge in our ultimate Harry Potter quiz series." />
          <script type="application/ld+json">
            {getBreadcrumbSchema([
              { name: "Home", item: "https://fandom-trivia.vercel.app/" },
              { name: "Wizarding World", item: "https://fandom-trivia.vercel.app/selector-harry-potter" }
            ])}
          </script>
        </Helmet>
        <p className="text-slate-400 font-medium">Select a book to test your knowledge, or try a random mix from both!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {[
          { label: "Book 1", title: "Sorcerer's Stone", desc: "20 questions from Chapters 1–6", icon: "⚡", view: 'trivia-harry-potter', gradient: 'from-amber-600/20 to-red-600/20', border: 'border-amber-500/30 hover:border-amber-400/50' },
          { label: "Book 2", title: "Chamber of Secrets", desc: "20 questions from Chapters 1–6", icon: "🐍", view: 'trivia-harry-potter-cos', gradient: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30 hover:border-emerald-400/50' },
          { label: "Book 3", title: "Prisoner of Azkaban", desc: "20 random questions", icon: "🐺", view: 'trivia-harry-potter-poa', gradient: 'from-slate-600/20 to-zinc-600/20', border: 'border-slate-500/30 hover:border-slate-400/50' },
          { label: "Book 4", title: "Goblet of Fire", desc: "20 random questions", icon: "🏆", view: 'trivia-harry-potter-gof', gradient: 'from-red-600/20 to-orange-600/20', border: 'border-red-500/30 hover:border-red-400/50' },
          { label: "Book 5", title: "Order of the Phoenix", desc: "20 random questions", icon: "📜", view: 'trivia-harry-potter-ootp', gradient: 'from-sky-600/20 to-blue-600/20', border: 'border-sky-500/30 hover:border-sky-400/50' },
          { label: "Book 6", title: "Half-Blood Prince", desc: "20 random questions", icon: "🧪", view: 'trivia-harry-potter-hbp', gradient: 'from-green-600/20 to-emerald-600/20', border: 'border-green-500/30 hover:border-green-400/50' },
          { label: "Book 7", title: "Deathly Hallows", desc: "20 random questions", icon: "⏃", view: 'trivia-harry-potter-dh', gradient: 'from-indigo-600/20 to-purple-600/20', border: 'border-indigo-500/30 hover:border-indigo-400/50' },
          { label: "Random", title: "Mixed Challenge", desc: "20 random questions from all 7 books", icon: "🎲", view: 'trivia-harry-potter-random', gradient: 'from-fuchsia-600/20 to-pink-600/20', border: 'border-fuchsia-500/30 hover:border-fuchsia-400/50' },
        ].map(book => (
          <motion.button
            key={book.label}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/${book.view}`)}
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
};

// --- Three-Body Problem Book Selector ---

const THREE_BODY_GRADES = [
  { threshold: 90, label: 'Wallfacer', color: 'text-indigo-400', character: { name: 'Luo Ji', image: '/images/threebody.jpg', desc: 'You have seen through the Dark Forest. The Trisolarans fear your intellect.' } },
  { threshold: 70, label: 'Swordholder', color: 'text-purple-400', character: { name: 'Cheng Xin', image: '/images/threebody.jpg', desc: 'You hold the fate of humanity in your hands with great empathy.' } },
  { threshold: 50, label: 'ETO Member', color: 'text-red-400', character: { name: 'Ye Wenjie', image: '/images/threebody.jpg', desc: 'You are disillusioned with humanity, but you seek the truth.' } },
  { threshold: 0, label: 'Bug', color: 'text-slate-400', character: { name: 'Da Shi', image: '/images/threebody.jpg', desc: 'You may be a bug to them, but bugs have never been truly defeated.' } },
];

const ThreeBodyBookSelector = ({ key }: { key?: string }) => {
  const navigate = useNavigate();
  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-bold mb-4">
          <ArrowLeft className="size-4" /> Back to Universes
        </button>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-200">Era</span></h1>
        <Helmet>
          <title>Three-Body Problem Trivia & Sci-Fi Quizzes | Fandom Trivia</title>
          <meta name="description" content="Test your knowledge of the Trisolaran crisis and the Dark Forest. From the Red Coast to Death's End in the ultimate Three-Body challenge." />
          <link rel="canonical" href="https://fandom-trivia.vercel.app/selector-three-body" />
          <meta property="og:title" content="Three-Body Problem Trivia & Sci-Fi Quizzes | Fandom Trivia" />
          <meta property="og:description" content="Can you survive the Trisolaran crisis? Test your Three-Body Problem knowledge." />
          <script type="application/ld+json">
            {getBreadcrumbSchema([
              { name: "Home", item: "https://fandom-trivia.vercel.app/" },
              { name: "Three-Body Universe", item: "https://fandom-trivia.vercel.app/selector-three-body" }
            ])}
          </script>
        </Helmet>
        <p className="text-slate-400 font-medium">Select a book to test your knowledge, or try a random mix from all!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { label: "Book 1", title: "The Three-Body Problem", desc: `${THREE_BODY_PROBLEM_TRIVIA.length} questions`, icon: "☀️", view: 'trivia-three-body-problem', gradient: 'from-amber-600/20 to-red-600/20', border: 'border-amber-500/30 hover:border-amber-400/50' },
          { label: "Book 2", title: "The Dark Forest", desc: `${THE_DARK_FOREST_TRIVIA.length} questions`, icon: "🌲", view: 'trivia-the-dark-forest', gradient: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30 hover:border-emerald-400/50' },
          { label: "Book 3", title: "Death's End", desc: `${DEATHS_END_TRIVIA.length} questions`, icon: "🌌", view: 'trivia-deaths-end', gradient: 'from-indigo-600/20 to-purple-600/20', border: 'border-indigo-500/30 hover:border-indigo-400/50' },
          { label: "Random", title: "Mixed Challenge", desc: "20 random questions from all 3 books", icon: "🎲", view: 'trivia-three-body-random', gradient: 'from-fuchsia-600/20 to-pink-600/20', border: 'border-fuchsia-500/30 hover:border-fuchsia-400/50' },
        ].map(book => (
          <motion.button
            key={book.label}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/${book.view}`)}
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
};

// --- Zootopia Movie Selector ---

const ZOOTOPIA_GRADES = [
  { threshold: 90, label: 'Chief of Police', color: 'text-blue-400', character: { name: 'Chief Bogo', image: '/images/zootopia.jpg', desc: 'Outstanding! You command the respect of the entire ZPD.' } },
  { threshold: 70, label: 'Star Detective', color: 'text-purple-400', character: { name: 'Judy Hopps', image: '/images/zootopia.jpg', desc: 'You never give up and it shows. Case closed!' } },
  { threshold: 50, label: 'Hustler', color: 'text-amber-400', character: { name: 'Nick Wilde', image: '/images/zootopia.jpg', desc: 'You know your way around the city, but might need to study the fine print.' } },
  { threshold: 0, label: 'DMV Sloth', color: 'text-slate-400', character: { name: 'Flash Slothmore', image: '/images/zootopia.jpg', desc: 'You... might... need... more... time...' } },
];

const ZootopiaSelector = ({ key }: { key?: string }) => {
  const navigate = useNavigate();
  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-bold mb-4">
          <ArrowLeft className="size-4" /> Back to Universes
        </button>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">Investigation</span></h1>
        <Helmet>
          <title>Zootopia Trivia & Mystery Quizzes | Fandom Trivia</title>
          <meta name="description" content="Solve cases from Zootopia and Zootopia 2. Test your knowledge of the city where anyone can be anything in our detective quizzes." />
          <link rel="canonical" href="https://fandom-trivia.vercel.app/selector-zootopia" />
          <meta property="og:title" content="Zootopia Trivia & Mystery Quizzes | Fandom Trivia" />
          <meta property="og:description" content="Become a ZPD detective! Test your Zootopia knowledge in the ultimate fan quiz." />
          <script type="application/ld+json">
            {getBreadcrumbSchema([
              { name: "Home", item: "https://fandom-trivia.vercel.app/" },
              { name: "Zootopia Universe", item: "https://fandom-trivia.vercel.app/selector-zootopia" }
            ])}
          </script>
        </Helmet>
        <p className="text-slate-400 font-medium">Select a movie case file or test your luck with a random mix!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Case 1", title: "Zootopia", desc: `${ZOOTOPIA_TRIVIA.length} questions`, icon: "🐰", view: 'trivia-zootopia', gradient: 'from-blue-600/20 to-sky-600/20', border: 'border-blue-500/30 hover:border-blue-400/50' },
          { label: "Case 2", title: "Zootopia 2", desc: `${ZOOTOPIA_2_TRIVIA.length} questions`, icon: "🐍", view: 'trivia-zootopia-2', gradient: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30 hover:border-emerald-400/50' },
          { label: "Random", title: "Mixed Case File", desc: "15 random questions from both", icon: "🎲", view: 'trivia-zootopia-random', gradient: 'from-fuchsia-600/20 to-pink-600/20', border: 'border-fuchsia-500/30 hover:border-fuchsia-400/50' },
        ].map(movie => (
          <motion.button
            key={movie.label}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/${movie.view}`)}
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
};

// --- Utils ---

/**
 * Generates JSON-LD for a trivia quiz
 */
const getQuizSchema = (title: string, description: string, url: string) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": title,
    "description": description,
    "about": {
      "@type": "Thing",
      "name": "Trivia"
    },
    "url": url,
    "educationalLevel": "Intermediate"
  });
};

/**
 * Generates Breadcrumb Structured Data
 */
const getBreadcrumbSchema = (crumbs: { name: string, item: string }[]) => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": crumb.name,
      "item": crumb.item
    }))
  });
};

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * Returns a new shuffled array.
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// --- Multiple Choice Quiz View (Generic) ---

const playCorrectSound = () => {
  if (localStorage.getItem('soundEnabled') === 'false') return;
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
  if (localStorage.getItem('soundEnabled') === 'false') return;
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

const RaceTrack = ({ 
  mode, 
  total, 
  teamAScore,
  teamBScore,
  teamANames,
  teamBNames,
  teamAPictures = [],
  teamBPictures = [],
  myTeamId,
  scoreLabel,
  isVersus = false
}: { 
  mode: 'bot' | 'versus' | 'team', 
  total: number, 
  teamAScore: number,
  teamBScore: number,
  teamANames: string[],
  teamBNames: string[],
  teamAPictures?: (string | null | undefined)[],
  teamBPictures?: (string | null | undefined)[],
  myTeamId?: 'A' | 'B' | null,
  scoreLabel: string,
  isVersus?: boolean
}) => {
  const teamAProgress = (teamAScore / total) * 100;
  const teamBProgress = (teamBScore / total) * 100;
  const quizImage = getQuizImage(scoreLabel);

  return (
    <div className="absolute top-4 right-4 z-[60] w-64 space-y-2 pointer-events-none md:w-80">
      <div className="relative h-20 bg-black/40 border border-white/20 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-around opacity-20 pointer-events-none">
          {[...Array(8)].map((_, i) => <div key={i} className="w-px h-full bg-white/50 border-r border-dotted border-white/20" />)}
        </div>
        
        {/* Team A Car - RED (Top) */}
        <motion.div 
          animate={{ left: `${Math.min(teamAProgress, 85)}%` }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="absolute top-1 flex flex-col items-center gap-0.5"
        >
          <div className="bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] px-2 py-0.5 rounded-full mb-0.5 z-10">
            <p className="text-[8px] font-black text-white whitespace-nowrap uppercase tracking-tighter shadow-sm">
              {teamANames.length > 0 ? teamANames.join(' & ') : 'Rival'}{myTeamId === 'A' ? ' (You)' : ''}
            </p>
          </div>
          <div className="relative p-1 bg-white/10 rounded-lg border border-red-500/50 shadow-xl backdrop-blur-sm pointer-events-auto">
            <SimpleAvatar 
              name={teamANames[0] || 'Rival'} 
              picture={teamAPictures[0] || quizImage} 
              size={28} 
            />
            <div className="absolute -right-1 -bottom-1 bg-red-500 size-2 rounded-full border border-white/20" />
          </div>
        </motion.div>

        {/* Team B Car - BLUE (Bottom) */}
        <motion.div 
          animate={{ left: `${Math.min(teamBProgress, 85)}%` }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="absolute bottom-1 flex flex-col items-center gap-0.5"
        >
          <div className="relative p-1 bg-white/10 rounded-lg border border-primary/50 shadow-xl backdrop-blur-sm pointer-events-auto">
             <SimpleAvatar 
               name={teamBNames[0] || 'You'} 
               picture={teamBPictures[0] || null} 
               size={28} 
             />
             <div className="absolute -right-1 -top-1 bg-primary size-2 rounded-full border border-white/20" />
          </div>
          <div className="bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)] px-2 py-0.5 rounded-full mt-0.5 z-10">
            <p className="text-[8px] font-black text-white whitespace-nowrap uppercase tracking-tighter shadow-sm">
              {teamBNames.length > 0 ? teamBNames.join(' & ') : (mode === 'bot' ? 'Bot' : 'You')}{myTeamId === 'B' || (mode === 'bot' && !myTeamId) ? ' (You)' : ''}
            </p>
          </div>
        </motion.div>
      </div>
      
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-1.5 bg-red-500/10 px-2 py-0.5 rounded-md border border-red-500/20">
          <div className={`size-1 rounded-full bg-red-500 ${myTeamId === 'A' ? 'animate-pulse' : ''}`} />
          <span className="text-[8px] font-black text-red-400 uppercase tracking-widest opacity-80">{isVersus ? 'Opponent' : 'Team A'}{myTeamId === 'A' ? ' (You)' : ''}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
          <div className={`size-1 rounded-full bg-primary ${myTeamId === 'B' || mode === 'bot' ? 'animate-pulse' : ''}`} />
          <span className="text-[8px] font-black text-white uppercase tracking-widest opacity-80">{isVersus ? 'You' : 'Team B'}{myTeamId === 'B' || mode === 'bot' ? ' (You)' : ''}</span>
        </div>
      </div>
    </div>
  );
};

const MCQuizView = (props: {
  questions: MCTriviaQuestion[],
  title: string,
  scoreLabel: string,
  grades: { threshold: number, label: string, color: string, character: { name: string, image: string, desc: string } }[],
  user: User | null,
  isDaily?: boolean,
  onQuizComplete?: (quizId: string, scorePct: number, isDaily: boolean) => void,
  key?: any
}) => {
  const currentUrl = window.location.href;
  const description = `Test your knowledge on ${props.title}. Play the ultimate fan trivia challenge for ${props.title} and climb the global leaderboard.`;
  const universeName = getUniverseName(props.title);
  
  return (
    <>
      <Helmet>
        <title>{props.title} Quiz | Fandom Trivia</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={`${props.title} Quiz | Fandom Trivia`} />
        <meta property="og:description" content={description} />
        <script type="application/ld+json">
          {getQuizSchema(props.title, description, currentUrl)}
        </script>
        <script type="application/ld+json">
          {getBreadcrumbSchema([
            { name: "Home", item: "https://fandom-trivia.vercel.app/" },
            { name: universeName, item: currentUrl.split('/').slice(0, -1).join('/') },
            { name: props.title, item: currentUrl }
          ])}
        </script>
      </Helmet>
      <MCQuizContent {...props} />
    </>
  );
};

const MCQuizContent = ({ questions, title, scoreLabel, grades, user, onQuizComplete, isDaily }: {
  questions: MCTriviaQuestion[],
  title: string,
  scoreLabel: string,
  grades: { threshold: number; label: string; color: string; character?: { name: string; image: string; desc: string } }[],
  user: User | null,
  onQuizComplete?: (quizId: string, scorePct: number, isDaily: boolean) => void,
  isDaily?: boolean,
  key?: any
}) => {
  const [gameState, setGameState] = useState<'mode_selection' | 'lobby' | 'playing'>('mode_selection');
  const [gameMode, setGameMode] = useState<'single' | 'bot' | 'versus' | 'team' | null>(null);
  const [matchRoomId, setMatchRoomId] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [lobbyError, setLobbyError] = useState('');
  const [lobbyPlayers, setLobbyPlayers] = useState<{id: string, name: string, isHost: boolean}[]>([]);
  const [lobbyLogs, setLobbyLogs] = useState<{id: string, text: string, type: 'join' | 'leave' | 'info'}[]>([]);
  const [hostLeft, setHostLeft] = useState(false);
  const lobbyPlayersRef = useRef<{id: string, name: string, isHost: boolean}[]>([]);
  const [hostQuestionCount, setHostQuestionCount] = useState(questions.length);
  const [showSpecificQuestions, setShowSpecificQuestions] = useState(false);
  const [hostSelectedIndices, setHostSelectedIndices] = useState<number[]>(questions.map((_, i) => i));
  const hostLeftTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [opponentScore, setOpponentScore] = useState(0);
  const [teamScore, setTeamScore] = useState(0); // My team's overall score
  const [opponentTeamScore, setOpponentTeamScore] = useState(0); // Enemy team's overall score
  const [myTeamId, setMyTeamId] = useState<'A'|'B'|null>(null);
  const [matchParticipants, setMatchParticipants] = useState<any[]>([]);
  const [playerScores, setPlayerScores] = useState<Record<string, {score: number, team: 'A'|'B'|null}>>({});
  const [opponentNames, setOpponentNames] = useState<string[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<number, 'correct' | 'incorrect'>>({});
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [botAnswers, setBotAnswers] = useState<Record<number, string>>({});
  const [botResults, setBotResults] = useState<Record<number, 'correct' | 'incorrect'>>({});
  const [playerAnswers, setPlayerAnswers] = useState<Record<string, Record<number, string>>>({});
  const [finished, setFinished] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sessionUnlocks, setSessionUnlocks] = useState<string[]>([]);
  const [sessionQuestions, setSessionQuestions] = useState<MCTriviaQuestion[]>([]);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completionTime, setCompletionTime] = useState<number | null>(null);
  const [sessionId] = useState(() => {
    const key = `fandom_trivia_session_${scoreLabel}`;
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem(key, id);
    }
    return id;
  });

  const correctCount = Object.values(scores).filter(s => s === 'correct').length;
  const answeredCount = Object.keys(scores).length;

  // Initialize and shuffle questions for this session
  useEffect(() => {
    const shuffled = shuffle(questions).map(q => ({
      ...q,
      options: shuffle(q.options)
    }));
    setSessionQuestions(shuffled);
  }, [shuffleKey, questions]);

  // Bot Simulation Logic
  useEffect(() => {
    if (gameMode !== 'bot' || gameState !== 'playing' || finished || sessionQuestions.length === 0) return;

    let timeoutId: any;
    const total = sessionQuestions.length;

    const nextBotAction = (botIdx: number) => {
      if (botIdx >= total) return;

      const delay = 3000 + Math.random() * 4000; // 3-7 seconds
      timeoutId = setTimeout(() => {
        const question = sessionQuestions[botIdx];
        if (!question) return;

        const isCorrect = Math.random() > 0.3; // 70% chance to score
        let pickedAnswer = question.answer;

        if (!isCorrect) {
          // Pick a random incorrect option
          const incorrectOptions = question.options.filter(opt => opt.toLowerCase() !== question.answer.toLowerCase());
          pickedAnswer = incorrectOptions.length > 0 
            ? incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)]
            : question.options[Math.floor(Math.random() * question.options.length)];
        }
        
        setBotAnswers(prev => ({ ...prev, [botIdx]: pickedAnswer }));
        setBotResults(prev => ({ 
          ...prev, 
          [botIdx]: isCorrect ? 'correct' : 'incorrect' 
        }));
        
        if (isCorrect) {
          setOpponentScore(prev => prev + 1);
        }

        if (!finished && botIdx + 1 < total) {
          nextBotAction(botIdx + 1);
        }
      }, delay);
    };

    nextBotAction(0);
    return () => clearTimeout(timeoutId);
  }, [gameMode, gameState, finished, sessionQuestions.length]);

  // Room Creation & Joining Handlers
  const createRoom = async () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { error } = await supabase.from('rooms').insert({
      code, host_id: user?.id || null, status: 'waiting', quiz_id: scoreLabel
    });
    if (error) { setLobbyError('Failed to create room.'); return; }
    setIsHost(true);
    setRoomCode(code);
    setLobbyError('');
  };

  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = joinCodeInput.toUpperCase();
    const { data, error } = await supabase.from('rooms').select('*').eq('code', code).single();
    if (error || !data) { 
      console.error('Room lookup failed:', error);
      setLobbyError('Room not found.'); 
      return; 
    }
    if (data.status !== 'waiting') { setLobbyError('Game has already started!'); return; }
    if (data.quiz_id !== scoreLabel) { setLobbyError('This room is for a different quiz!'); return; }
    setIsHost(false);
    setRoomCode(code);
    setLobbyError('');
  };

  const startRoomGame = async () => {
    let finalQuestions = [];
    if (showSpecificQuestions) {
      if (hostSelectedIndices.length === 0) { setLobbyError('Please select at least one question!'); return; }
      finalQuestions = hostSelectedIndices.map(i => questions[i]).map(q => ({ ...q, options: shuffle(q.options) }));
    } else {
      finalQuestions = shuffle(questions).map(q => ({ ...q, options: shuffle(q.options) })).slice(0, hostQuestionCount);
    }

    setSessionQuestions(finalQuestions);

    await supabase.from('rooms').update({ status: 'playing' }).eq('code', roomCode);
    supabase.channel(`room:${roomCode}`).send({
      type: 'broadcast', event: 'game_start', payload: { message: 'Go!', questions: finalQuestions }
    });
    setMatchRoomId(`room:${roomCode}`);
    setGameState('playing');
  };

  // Realtime Lobby Logic
  useEffect(() => {
    if (gameState !== 'lobby' || !roomCode) return;

    const channel = supabase.channel(`room:${roomCode}`, {
       config: { presence: { key: user?.id || sessionId } }
    });

    const handleBeforeUnload = () => {
      if (isHost) {
        channel.send({
          type: 'broadcast',
          event: 'host_closing',
          payload: { name: user?.username || user?.name || 'Host' }
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const active: {id: string, name: string, isHost: boolean, picture?: string}[] = [];
        for (const [key, presences] of Object.entries(state)) {
           const pData = presences[0] as any;
           if (pData) {
             active.push({ id: key, name: pData.name, isHost: pData.isHost, picture: pData.picture });
           }
        }
        
        // Detect Joins and Leaves
        const prev = lobbyPlayersRef.current;
        const currentId = user?.id || sessionId;
        
        active.forEach(p => {
          if (!prev.find(px => px.id === p.id)) {
            if (p.id !== currentId) {
              setLobbyLogs(logs => [...logs, { id: Math.random().toString(36), text: `${p.name} joined the room`, type: 'join' }]);
            }
          }
        });
        
        prev.forEach(p => {
          if (!active.find(ax => ax.id === p.id)) {
            if (p.id !== currentId) {
              setLobbyLogs(l => [...l, { id: Math.random().toString(36), text: `${p.name} left the room`, type: 'leave' }]);
            }
          }
        });

        // Host Reconnection / Leave Detection
        const hostExists = active.some(ax => ax.isHost);
        if (hostExists) {
          if (hostLeftTimeoutRef.current) {
            clearTimeout(hostLeftTimeoutRef.current);
            hostLeftTimeoutRef.current = null;
          }
          setHostLeft(false);
        } else {
          if (!hostLeftTimeoutRef.current) {
            hostLeftTimeoutRef.current = setTimeout(() => {
               setHostLeft(true);
               setLobbyLogs(l => [...l, { id: Math.random().toString(36), text: `The host has left the room`, type: 'info' }]);
               hostLeftTimeoutRef.current = null;
            }, 3000);
          }
        }

        lobbyPlayersRef.current = active;
        setLobbyPlayers(active);
        
        // Auto-assign teams for all multiplayer modes (Versus/Team)
        if (['versus', 'team'].includes(gameMode)) {
           const myIndex = active.findIndex(px => px.id === currentId);
           if (myIndex !== -1) {
             const autoTeam = myIndex % 2 === 0 ? 'A' : 'B';
             if (myTeamId !== autoTeam) setMyTeamId(autoTeam);
           }
        }
      })
      .on('broadcast', { event: 'host_closing' }, () => {
         setHostLeft(true);
         setLobbyLogs(l => [...l, { id: Math.random().toString(36), text: `The host is closing the tab...`, type: 'info' }]);
      })
      .on('broadcast', { event: 'game_start' }, ({ payload }) => {
        if (!isHost && payload.questions) {
          setSessionQuestions(payload.questions);
          setMatchRoomId(`room:${roomCode}`);
          setGameState('playing');
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            name: user?.username || user?.name || 'Guest Fan',
            isHost: isHost,
            picture: user?.picture
          });
        }
      });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (hostLeftTimeoutRef.current) clearTimeout(hostLeftTimeoutRef.current);
      channel.untrack().then(() => supabase.removeChannel(channel));
    };
  }, [gameState, roomCode, isHost, user, gameMode]);

  useEffect(() => {
    if (gameState !== 'playing' || !matchRoomId || (gameMode !== 'versus' && gameMode !== 'team')) return;

    const gameChannel = supabase.channel(matchRoomId, {
      config: { presence: { key: user?.id || sessionId } }
    });
    
    const handleBeforeUnload = () => {
      if (isHost) {
        gameChannel.send({
          type: 'broadcast',
          event: 'host_closing',
          payload: { name: user?.username || user?.name || 'Host' }
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    gameChannel
      .on('presence', { event: 'sync' }, () => {
        const state = gameChannel.presenceState();
        const active: {id: string, name: string, isHost: boolean, picture?: string}[] = [];
        for (const [key, presences] of Object.entries(state)) {
           const pData = presences[0] as any;
           if (pData) { active.push({ id: key, name: pData.name, isHost: pData.isHost, picture: pData.picture }); }
        }
        
        const hostExists = active.some(ax => ax.isHost);
        if (hostExists) {
          if (hostLeftTimeoutRef.current) {
            clearTimeout(hostLeftTimeoutRef.current);
            hostLeftTimeoutRef.current = null;
          }
          setHostLeft(false);
        } else {
          if (!hostLeftTimeoutRef.current) {
             hostLeftTimeoutRef.current = setTimeout(() => {
                setHostLeft(true);
                hostLeftTimeoutRef.current = null;
             }, 5000); // 5 second grace period during active play
          }
        }

        lobbyPlayersRef.current = active;
        setLobbyPlayers(active);
      })
      .on('broadcast', { event: 'host_closing' }, () => {
         setHostLeft(true);
      })
      .on('broadcast', { event: 'score_update' }, ({ payload }) => {
        const { userId, score, team } = payload;
        const currentId = user?.id || sessionId;
        if (userId === currentId) return;

        if (gameMode === 'versus') {
          setOpponentScore(score);
        } else if (gameMode === 'team') {
          setPlayerScores(prev => ({
            ...prev,
            [userId]: { score, team }
          }));
        }
      })
      .on('broadcast', { event: 'answer_update' }, ({ payload }) => {
        const { userId, questionIndex, answer } = payload;
        const currentId = user?.id || sessionId;
        if (userId === currentId) return;
        
        setPlayerAnswers(prev => ({
          ...prev,
          [userId]: { ...(prev[userId] || {}), [questionIndex]: answer }
        }));
      })
      .on('broadcast', { event: 'final_results' }, ({ payload }) => {
        const { userId, allAnswers } = payload;
        const currentId = user?.id || sessionId;
        if (userId === currentId) return;
        
        setPlayerAnswers(prev => ({
          ...prev,
          [userId]: { ...(prev[userId] || {}), ...allAnswers }
        }));
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await gameChannel.track({
            name: user?.username || user?.name || 'Guest Fan',
            isHost: isHost,
            picture: user?.picture
          });
        }
      });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (hostLeftTimeoutRef.current) clearTimeout(hostLeftTimeoutRef.current);
      gameChannel.untrack().then(() => supabase.removeChannel(gameChannel));
    };
  }, [gameState, matchRoomId, gameMode, user, isHost]);

  // Broadcast our own score whenever it changes
  useEffect(() => {
    if (gameState === 'playing' && matchRoomId && (gameMode === 'versus' || gameMode === 'team')) {
      const currentId = user?.id || sessionId;
      supabase.channel(matchRoomId).send({
        type: 'broadcast',
        event: 'score_update',
        payload: { userId: currentId, score: correctCount, team: myTeamId }
      });
    }
  }, [correctCount, gameState, matchRoomId, gameMode, myTeamId, user]);

  // Handle startTime initialization when game starts
  useEffect(() => {
    if (gameState === 'playing' && !startTime) {
      setStartTime(Date.now());
    }
  }, [gameState, startTime]);

  const navigate = useNavigate();

  // Mode Selection Screen
  if (gameState === 'mode_selection') {
    return (
      <div className="pt-32 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full space-y-8 p-10 bg-card-dark border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
          <div className="relative z-10 space-y-6">
            <div className="flex justify-center">
              <div className="size-20 bg-primary/20 rounded-2xl flex items-center justify-center animate-pulse">
                <Trophy className="size-10 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">Choose Your Mode</h2>
              <p className="text-slate-400 font-medium">How would you like to tackle the <span className="text-primary">{title}</span> universe?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 pt-4">
              {[
                { id: 'single', name: 'Single Playing', desc: 'Face the challenge alone and top the leaderboards.', icon: UserIcon, color: 'from-blue-600/20 to-indigo-600/20', border: 'hover:border-blue-400/50' },
                { id: 'bot', name: 'You vs Bot', desc: 'Can you beat our AI fan? no waiting required.', icon: Zap, color: 'from-purple-600/20 to-pink-600/20', border: 'hover:border-purple-400/50' },
                { id: 'versus', name: '1v1 Mode', desc: 'Face off against another real player in a battle of wits.', icon: Target, color: 'from-orange-600/20 to-amber-600/20', border: 'hover:border-orange-400/50' },
                { id: 'team', name: 'Team Mode', desc: 'Join forces in a 2v2 trivia showdown.', icon: Users, color: 'from-emerald-600/20 to-green-600/20', border: 'hover:border-emerald-400/50' },
              ].map((mode) => {
                const Icon = mode.icon;
                const isSelected = gameMode === mode.id;
                
                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      if (mode.id === 'single') {
                        setGameMode('single');
                        setGameState('playing');
                      } else if (mode.id === 'bot') {
                        setGameMode('bot');
                        setOpponentNames(['Trivia Bot']);
                        setGameState('playing');
                      } else if (mode.id === 'versus' || mode.id === 'team') {
                        setGameMode(mode.id as 'versus' | 'team');
                        setGameState('lobby');
                      }
                    }}
                    className={`flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br ${mode.color} border transition-all duration-300 text-left group ${
                      isSelected 
                        ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Icon className="size-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-none">{mode.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">{mode.desc}</p>
                    </div>
                    <ArrowRight className="size-4 ml-auto text-white/30 group-hover:text-white transition-all group-hover:translate-x-1" />
                  </button>
                );
              })}
            </div>

            {/* Private Match Code Input (Removed) */}
          </div>
        </motion.div>
      </div>
    );
  }

  // Lobby Screen
  if (gameState === 'lobby') {
    if (!roomCode) {
      return (
        <div className="pt-32 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full p-10 bg-card-dark border border-white/10 rounded-3xl shadow-2xl space-y-8">
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Private Match</h2>
            <p className="text-slate-400 font-medium">Create a new room or join an existing one using a 6-character code.</p>

            <button onClick={createRoom} className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-xl shadow-lg border border-primary/50 uppercase tracking-widest transition-all">
              Create New Room
            </button>
            
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-slate-500 font-bold text-xs uppercase tracking-widest">OR</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <form onSubmit={joinRoom} className="space-y-4">
              <input 
                type="text" 
                placeholder="ENTER 6-CHAR CODE" 
                maxLength={6}
                value={joinCodeInput}
                onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                className="w-full bg-white/5 border border-white/20 text-white placeholder-slate-500 px-6 py-4 rounded-xl text-center font-black text-2xl tracking-[0.5em] uppercase focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              <button disabled={joinCodeInput.length !== 6} type="submit" className="w-full bg-white/10 hover:bg-white/20 text-white font-black py-4 rounded-xl border border-white/20 uppercase tracking-widest transition-all disabled:opacity-50">
                Join Room
              </button>
            </form>

            <button onClick={() => { setRoomCode(''); setGameState('mode_selection'); setJoinCodeInput(''); setLobbyLogs([]); setHostLeft(false); }} className="text-slate-400 font-bold hover:text-white transition-colors text-sm uppercase tracking-widest pt-2">
              Cancel
            </button>

            {lobbyError && (
              <p className="text-red-400 font-bold text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">{lobbyError}</p>
            )}
          </motion.div>
        </div>
      );
    }

    const maxPlayers = gameMode === 'versus' ? 2 : 4;

    return (
      <div className="pt-32 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full p-10 bg-card-dark border border-primary/30 rounded-3xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]">
          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Room Code</h2>
          <p className="text-5xl font-black text-primary tracking-[0.2em] mb-8">{roomCode}</p>
          
          <div className="space-y-4 mb-6 text-left">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
              <span>Players ({lobbyPlayers.length}/{maxPlayers})</span>
              {gameMode === 'team' && myTeamId && <span className="text-primary">You are on Team {myTeamId}</span>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lobbyPlayers.map(p => (
                <div key={p.id} className="flex items-center justify-between bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="font-bold text-white text-sm truncate mr-2">{p.name} {p.id === (user?.id || sessionId) && <span className="text-primary">(You)</span>}</span>
                  {p.isHost && <span className="text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Host</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Lobby Feed */}
          <div className="bg-black/20 border border-white/5 rounded-2xl p-4 mb-8 text-left space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
            {lobbyLogs.length === 0 ? (
              <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest text-center py-2">Waiting for activity...</p>
            ) : (
              lobbyLogs.map(log => (
                <div key={log.id} className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300">
                  <div className={`size-1.5 rounded-full ${log.type === 'join' ? 'bg-green-500' : log.type === 'leave' ? 'bg-red-500' : 'bg-primary'}`} />
                  <p className={`text-[10px] font-bold ${log.type === 'join' ? 'text-green-400' : log.type === 'leave' ? 'text-red-400' : 'text-slate-400'} uppercase tracking-tight`}>
                    {log.text}
                  </p>
                </div>
              ))
            )}
          </div>

          {isHost && (
            <div className="bg-black/30 border border-white/10 p-5 rounded-2xl space-y-5 mb-8 text-left">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">Match Settings</h3>
                <button 
                  onClick={() => setShowSpecificQuestions(!showSpecificQuestions)} 
                  className="text-[10px] text-primary hover:text-white font-black uppercase tracking-widest transition-colors border border-primary/30 px-3 py-1.5 rounded-full"
                >
                  {showSpecificQuestions ? 'Use Random' : 'Pick Specific'}
                </button>
              </div>

              {showSpecificQuestions ? (
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Questions ({hostSelectedIndices.length})</p>
                  <div className="max-h-48 overflow-y-auto space-y-1.5 border border-white/5 rounded-xl p-2 bg-white/5 custom-scrollbar">
                    {questions.map((q, i) => (
                      <label key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
                        <input 
                          type="checkbox" 
                          checked={hostSelectedIndices.includes(i)}
                          onChange={(e) => {
                            if (e.target.checked) setHostSelectedIndices([...hostSelectedIndices, i]);
                            else setHostSelectedIndices(hostSelectedIndices.filter(idx => idx !== i));
                          }}
                          className="size-4 accent-primary cursor-pointer border-white/20 rounded"
                        />
                        <span className="text-xs font-bold text-slate-300 group-hover:text-white truncate flex-1">{q.question}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                  <label className="text-slate-400 font-bold text-[10px] uppercase tracking-widest pl-2">Number of Questions</label>
                  <input 
                    type="number" 
                    min={1} 
                    max={questions.length} 
                    value={hostQuestionCount} 
                    onChange={(e) => {
                       const val = Number(e.target.value);
                       setHostQuestionCount(val < 1 ? 1 : val > questions.length ? questions.length : val);
                    }}
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white w-24 text-center font-black outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              )}
            </div>
          )}

          {isHost ? (
            <div className="space-y-4">
              <button 
                onClick={startRoomGame} 
                disabled={
                  gameMode === 'versus' 
                    ? lobbyPlayers.length < 2 
                    : (lobbyPlayers.length < 4 || lobbyPlayers.length % 2 !== 0)
                }
                className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg border border-primary/50 text-lg mb-2"
              >
                Start Game
              </button>
              {gameMode === 'team' && (lobbyPlayers.length < 4 || lobbyPlayers.length % 2 !== 0) && (
                <p className="text-red-400 font-bold text-xs uppercase tracking-tight animate-pulse">
                  {lobbyPlayers.length < 4 
                    ? `Waiting for more players (need at least 4 for ${gameMode} mode)` 
                    : `Need an even number of players for ${gameMode} mode`}
                </p>
              )}
              {gameMode === 'versus' && lobbyPlayers.length < 2 && (
                <p className="text-blue-400 font-bold text-xs uppercase tracking-tight animate-pulse">
                  Waiting for an opponent (need 2 players for 1v1)
                </p>
              )}
            </div>
          ) : (
            <div className="w-full p-4 border border-blue-500/30 bg-blue-500/10 rounded-xl mb-4">
              <p className="text-blue-400 font-bold animate-pulse">Waiting for host to start...</p>
            </div>
          )}

          {hostLeft && (
            <div className="w-full p-4 border border-red-500/30 bg-red-500/10 rounded-xl mb-6 animate-pulse">
              <p className="text-red-400 font-black uppercase tracking-widest text-xs">The host has left the room!</p>
            </div>
          )}

          <button onClick={() => { setRoomCode(''); setGameState('mode_selection'); setJoinCodeInput(''); setLobbyLogs([]); setHostLeft(false); }} className="text-slate-400 font-bold hover:text-white transition-colors text-sm uppercase tracking-widest">
            Leave Room
          </button>
        </motion.div>
      </div>
    );
  }

  // Wait for session questions to be initialized
  if (sessionQuestions.length === 0) {
    return (
      <div className="pt-28 pb-20 px-6 flex items-center justify-center">
        <div className="text-slate-400 font-bold animate-pulse">Initializing Quiz...</div>
      </div>
    );
  }

  const q = sessionQuestions[currentQ];
  const total = sessionQuestions.length;

  if (!q || !q.options) {
    return (
      <div className="pt-28 pb-20 px-6 flex items-center justify-center">
        <div className="text-slate-400 font-bold">Question data missing. Returning home...</div>
      </div>
    );
  }
  const isUnknown = q.answer === '???';

  const handleSelect = (option: string) => {
    if (selected) return; // already answered
    setSelected(option);
    
    // Start timer on first answer
    if (startTime === null) {
      setStartTime(Date.now());
    }

    if (isUnknown) {
      // No known answer — auto-mark correct (fun mode)
      setScores(prev => ({ ...prev, [currentQ]: 'correct' }));
      setUserAnswers(prev => ({ ...prev, [currentQ]: option }));
      playCorrectSound();
    } else {
      const isCorrect = option.toLowerCase() === q.answer.toLowerCase();
      setScores(prev => ({ ...prev, [currentQ]: isCorrect ? 'correct' : 'incorrect' }));
      setUserAnswers(prev => ({ ...prev, [currentQ]: option }));
      if (isCorrect) {
        playCorrectSound();
      } else {
        playIncorrectSound();
      }
    }

    // Broadcast answer to other players
    if (gameState === 'playing' && matchRoomId && (gameMode === 'versus' || gameMode === 'team')) {
      const currentId = user?.id || sessionId;
      supabase.channel(matchRoomId).send({
        type: 'broadcast',
        event: 'answer_update',
        payload: { userId: currentId, questionIndex: currentQ, answer: option }
      });
    }
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
      const endTime = Date.now();
      const durationSeconds = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
      setCompletionTime(durationSeconds);

      // Final synchronization for multiplayer results
      if (matchRoomId && (gameMode === 'versus' || gameMode === 'team')) {
        const currentId = user?.id || sessionId;
        supabase.channel(matchRoomId).send({
          type: 'broadcast',
          event: 'final_results',
          payload: { 
            userId: currentId, 
            allAnswers: userAnswers,
            isFinished: true 
          }
        });
      }

      if (onQuizComplete) {
        onQuizComplete(scoreLabel, Math.round((correctCount / total) * 100), !!isDaily);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScores({});
    setUserAnswers({});
    setBotAnswers({});
    setBotResults({});
    setPlayerAnswers({});
    setFinished(false);
    setScoreSaved(false);
    setStartTime(null);
    setCompletionTime(null);
    setShuffleKey(prev => prev + 1); // Trigger re-shuffle
    setGameState('mode_selection');
    setGameMode(null);
    setOpponentScore(0);
  };

  const handleSaveScore = async () => {
    if (!user) {
      alert("You must be logged in to save your score.");
      return;
    }
    setSaving(true);
    const pct = Math.round((correctCount / total) * 100);
    try {
      const { error } = await supabase
        .from('scores')
        .insert({
          user_id: user.id,
          quiz_id: scoreLabel,
          score: correctCount,
          total: total,
          completion_time: completionTime,
          is_daily_challenge: !!isDaily
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

  // Calculate coordinated team scores (car only moves if BOTH teammates are correct)
  const getTeamProgress = (teamId: 'A' | 'B' | null) => {
    if (!teamId) return 0;
    let count = 0;
    for (let i = 0; i < total; i++) {
      const playersOnTeam = lobbyPlayers.filter((p, idx) => {
        const pTeam = idx % 2 === 0 ? 'A' : 'B';
        return pTeam === teamId;
      });
      
      // Check if all players on this team have answered this question correctly
      const everyoneCorrect = playersOnTeam.length > 0 && playersOnTeam.every(p => {
        const currentId = user?.id || sessionId;
        if (p.id === currentId) {
          return scores[i] === 'correct';
        } else {
          return (playerAnswers[p.id]?.[i] || '').toString().toLowerCase() === (sessionQuestions[i]?.correctAnswer || '').toString().toLowerCase();
        }
      });
      
      if (everyoneCorrect) count++;
    }
    return count;
  };

  // Sync match participants once when the quiz starts
  useEffect(() => {
    if (quiz && lobbyPlayers.length > 0 && matchParticipants.length === 0) {
      setMatchParticipants(lobbyPlayers);
    }
  }, [quiz, lobbyPlayers]);

  const calculateUserScore = (pId: string) => {
    let score = 0;
    sessionQuestions.forEach((q, idx) => {
      const correctAns = (q.correctAnswer || '').toString().toLowerCase();
      const playerAns = (playerAnswers[pId]?.[idx] || '').toString().toLowerCase();
      if (playerAns && playerAns === correctAns) score++;
    });
    return score;
  };

  const currentId = user?.id || sessionId;
  const activeParticipants = matchParticipants.length > 0 ? matchParticipants : lobbyPlayers;
  const opponents = activeParticipants.filter(p => {
    if (p.id === currentId) return false; 
    if (gameMode === 'versus') return true;
    if (gameMode === 'team') {
      const pIndex = activeParticipants.findIndex(lp => lp.id === p.id);
      const pTeam = pIndex % 2 === 0 ? 'A' : 'B';
      return pTeam !== myTeamId;
    }
    return false;
  });
  const teammate = gameMode === 'team' ? activeParticipants.find(p => {
    const pIndex = activeParticipants.findIndex(lp => lp.id === p.id);
    const pTeam = pIndex % 2 === 0 ? 'A' : 'B';
    return p.id !== currentId && pTeam === myTeamId;
  }) : null;

  const derivedTeamScore = gameMode === 'team' ? getTeamProgress(myTeamId) : correctCount;
  const derivedOpponentTeamScore = gameMode === 'team' ? getTeamProgress(myTeamId === 'A' ? 'B' : 'A') : (gameMode === 'bot' ? opponentScore : (opponents[0] ? calculateUserScore(opponents[0].id) : 0));

  // Determine who goes to which track line
  // If myTeamId is 'A', then I am Team A. Otherwise (null, 'B', etc.), I am Team B.
  const isTeamA = myTeamId === 'A';
  const teamAScore = isTeamA ? derivedTeamScore : derivedOpponentTeamScore;
  const teamBScore = isTeamA ? derivedOpponentTeamScore : derivedTeamScore;
  
  const teamANames = isTeamA 
    ? [user?.username || user?.name || 'You', teammate?.name].filter(Boolean) as string[]
    : (gameMode === 'bot' ? ['Trivia Bot'] : opponents.map(o => o.name));
    
  const teamBNames = !isTeamA 
    ? [user?.username || user?.name || 'You', teammate?.name].filter(Boolean) as string[]
    : (gameMode === 'bot' ? ['Trivia Bot'] : opponents.map(o => o.name));

  const teamAPictures = isTeamA
    ? [user?.picture, teammate?.picture].filter(Boolean) as string[]
    : (gameMode === 'bot' ? ['https://fandom-trivia.vercel.app/bot.png'] : opponents.map(o => o.picture).filter(Boolean) as string[]);

  const teamBPictures = !isTeamA
    ? [user?.picture, teammate?.picture].filter(Boolean) as string[]
    : (gameMode === 'bot' ? ['https://fandom-trivia.vercel.app/bot.png'] : opponents.map(o => o.picture).filter(Boolean) as string[]);

  if (finished) {
    const pct = Math.round((correctCount / total) * 100);
    const gradeEntry = grades.find(g => pct >= g.threshold) || grades[grades.length - 1];
    const grade = gradeEntry.label;
    const gradeColor = gradeEntry.color;
    const character = gradeEntry.character;

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative pt-28 pb-20 px-6 overflow-hidden">
        <Helmet>
          <title>{title} Quiz Complete | Fandom Trivia</title>
          <meta name="description" content={`You've completed the ${title} quiz! See your score and common rank in Fandom Trivia.`} />
        </Helmet>
        <ParticleCanvas mode="celebration" colors={
          title.toLowerCase().includes('twilight') ? ['rgba(148,197,233,', 'rgba(200,220,240,', 'rgba(180,200,220,', 'rgba(255,255,255,', 'rgba(100,150,200,']
            : title.toLowerCase().includes('k-pop') ? ['rgba(255,0,200,', 'rgba(180,0,255,', 'rgba(255,100,200,', 'rgba(0,255,200,', 'rgba(255,255,255,']
              : ['rgba(255,215,0,', 'rgba(255,180,50,', 'rgba(168,140,255,', 'rgba(255,255,255,', 'rgba(255,100,100,']
        } />
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="space-y-6">
            {gameMode === 'bot' && (
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`inline-block px-6 py-2 rounded-full border-2 font-black text-xs uppercase tracking-[0.2em] mb-4 shadow-xl backdrop-blur-md
                  ${correctCount > opponentScore 
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-emerald-500/10' 
                    : correctCount < opponentScore 
                      ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-red-500/10' 
                      : 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-amber-500/10'}`}
              >
                {correctCount > opponentScore ? '🏆 You Won!' : correctCount < opponentScore ? '💀 Bot Won!' : '🤝 It\'s a Tie!'}
              </motion.div>
            )}

            {(gameMode === 'versus' || gameMode === 'team') && (
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`inline-block px-6 py-2 rounded-full border-2 font-black text-xs uppercase tracking-[0.2em] mb-4 shadow-xl backdrop-blur-md
                  ${derivedTeamScore > derivedOpponentTeamScore 
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-emerald-500/10' 
                    : derivedTeamScore < derivedOpponentTeamScore 
                      ? 'bg-red-500/20 border-red-500/50 text-red-400 shadow-red-500/10' 
                      : 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-amber-500/10'}`}
              >
                {derivedTeamScore > derivedOpponentTeamScore 
                  ? (gameMode === 'team' ? '🏆 Your Team Won!' : '🏆 You Won!') 
                  : derivedTeamScore < derivedOpponentTeamScore 
                    ? (gameMode === 'team' ? '💀 Rival Team Won!' : '💀 Rival Won!') 
                    : '🤝 It\'s a Tie!'}
              </motion.div>
            )}
            <div className="flex justify-center mb-6">
              <div className="flex items-center -space-x-8 md:-space-x-12">
                {/* User Avatar */}
                <div className="relative group hover:scale-105 transition-transform">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                  <div className="relative p-6 bg-white/5 rounded-full border-2 border-primary/30 shadow-2xl backdrop-blur-md">
                    <SimpleAvatar 
                      name={user?.name || user?.username || 'Guest'} 
                      picture={user?.picture} 
                      size={120} 
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                      You
                    </div>
                  </div>
                </div>

                {/* Connection Line/Decorator */}
                <div className="relative z-10 size-12 rounded-full bg-slate-900 border-2 border-white/20 flex items-center justify-center shadow-2xl">
                  <span className="text-white font-black text-xs uppercase italic drop-shadow-lg">VS</span>
                </div>

                {/* Second Participant Avatar (Opponent or Quiz Picture) */}
                <div className="relative group hover:scale-105 transition-transform">
                  <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full"></div>
                  <div className="relative p-6 bg-white/5 rounded-full border-2 border-purple-500/30 shadow-2xl backdrop-blur-md">
                    <SimpleAvatar 
                      name={gameMode === 'bot' ? 'Bot' : (opponents[0]?.name || 'Opponent')} 
                      picture={gameMode === 'bot' ? 'https://fandom-trivia.vercel.app/bot.png' : (opponents[0]?.picture || getQuizImage(scoreLabel))} 
                      size={120} 
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xl whitespace-nowrap">
                      {gameMode === 'bot' ? 'Bot' : (opponents[0]?.name || 'Opponent')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Quiz Complete!</h2>

            {character && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md max-w-md mx-auto transform hover:scale-105 transition-transform">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Your Result Character</p>
                <h3 className={`text-3xl font-black italic uppercase tracking-tight ${gradeColor}`}>{character.name}</h3>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed font-medium">{character.desc}</p>
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-2">
              <div className="space-y-1">
                <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-300">
                  {gameMode === 'team' ? derivedTeamScore : correctCount}/{total}
                </p>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                  {gameMode === 'team' ? 'Team Coordinated Score' : 'Your Score'} ({gameMode === 'team' ? Math.round((derivedTeamScore / total) * 100) : pct}%)
                </p>
              </div>
              
              <div className="hidden md:block w-px h-16 bg-white/10"></div>
              
              {(gameMode === 'bot' || gameMode === 'versus' || gameMode === 'team') && (
                <>
                  <div className="space-y-1">
                    <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-300">
                      { (gameMode !== 'bot' && (opponents[0] ? (Object.keys(playerAnswers[opponents[0].id] || {}).length === 0) : true)) 
                        ? (opponents.length > 0 ? '0' : '...') 
                        : `${gameMode === 'bot' ? opponentScore : (opponents[0] ? calculateUserScore(opponents[0].id) : 0)}/${total}`}
                    </p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">
                      {gameMode === 'team' ? 'Rival Team Coordinated' : 'Rival Score'} 
                      { (gameMode !== 'bot' && (opponents[0] ? (Object.keys(playerAnswers[opponents[0].id] || {}).length === 0) : true))
                        ? (opponents.length > 0 ? '' : ' (Waiting...)')
                        : ` (${Math.round(((gameMode === 'bot' ? opponentScore : (opponents[0] ? calculateUserScore(opponents[0].id) : 0)) / total) * 100)}%)`}
                    </p>
                  </div>
                  <div className="hidden md:block w-px h-16 bg-white/10"></div>
                </>
              )}

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-3 text-blue-400">
                  <Clock className="size-8" />
                  <p className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                    {formatTime(completionTime)}
                  </p>
                </div>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Total Time Spent</p>
              </div>
            </div>

            {/* Rewards Section */}
            {(sessionUnlocks.length > 0) && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-6 shadow-xl backdrop-blur-md max-w-md mx-auto"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Trophy className="size-5 text-amber-400" />
                  <h3 className="text-xl font-black uppercase italic tracking-tight text-white">Rewards Unlocked!</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {sessionUnlocks.map(item => (
                    <div key={item} className="flex flex-col items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10 min-w-[100px]">
                      <Sparkles className="size-6 text-amber-300 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {gameMode === 'bot' && (
              <div className="w-full max-w-md mx-auto space-y-2">
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500" style={{ width: `${(correctCount/total)*100}%` }} />
                  <div className="h-full bg-gradient-to-r from-red-500 to-rose-400 transition-all duration-500" style={{ width: `${(opponentScore/total)*100}%` }} />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-green-400">You ({correctCount})</span>
                  <span className="text-red-400">Bot ({opponentScore})</span>
                </div>
              </div>
            )}

            {!character && (
              <p className={`text-2xl font-black italic uppercase tracking-tight ${gradeColor}`}>{grade}</p>
            )}

            <div className="w-full max-w-md mx-auto space-y-2">
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500" style={{ width: `${gameMode === 'team' ? (derivedTeamScore/total)*100 : pct}%` }} />
                <div className="h-full bg-gradient-to-r from-red-500 to-rose-400 transition-all duration-500" style={{ width: `${100 - (gameMode === 'team' ? (derivedTeamScore/total)*100 : pct)}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-green-400">{gameMode === 'team' ? derivedTeamScore : correctCount} Correct</span>
                <span className="text-red-400">{total - (gameMode === 'team' ? derivedTeamScore : correctCount)} Incorrect</span>
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

          <div className="mt-12 space-y-6 pt-12 border-t border-white/10">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-2xl font-black italic uppercase tracking-tight text-white">Match Breakdown</h3>
              <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="size-2 rounded-full bg-primary" />
                  You
                </div>
                {gameMode === 'bot' && (
                  <div className="flex items-center gap-1.5 text-red-500">
                    <span className="size-2 rounded-full bg-red-500" />
                    Bot
                  </div>
                )}
                {teammate && (
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="size-2 rounded-full bg-emerald-400" />
                    Teammate
                  </div>
                )}
                {opponents.length > 0 && (
                  <div className="flex items-center gap-1.5 text-red-500">
                    <span className="size-2 rounded-full bg-red-500" />
                    {gameMode === 'team' ? 'Opponents' : 'Opponent'}
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4 text-left max-w-xl mx-auto">
              {sessionQuestions.map((question, idx) => {
                const userRes = scores[idx];
                const botRes = botResults[idx];
                const userChoice = userAnswers[idx];
                const botChoice = botAnswers[idx];
                const isCorrect = userRes === 'correct';
                const isBotCorrect = botRes === 'correct';
                
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <span className="shrink-0 size-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-slate-400">
                          {idx + 1}
                        </span>
                        <p className="text-sm font-bold text-white leading-relaxed">{question.question}</p>
                      </div>
                    </div>

                    <div className={`grid ${gameMode === 'bot' ? 'grid-cols-2' : (teammate || opponents.length > 0) ? `grid-cols-1 sm:grid-cols-2 ${gameMode === 'team' ? 'lg:grid-cols-4' : ''}` : 'grid-cols-1'} gap-3 pt-2`}>
                      {/* Player Result */}
                      <div className={`flex flex-col gap-1 p-3 rounded-xl border ${isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">You</span>
                          {isCorrect ? <Check className="size-3 text-green-400" /> : <X className="size-3 text-red-400" />}
                        </div>
                        <p className={`text-xs font-bold leading-tight ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                          {userChoice || 'Skipped'}
                        </p>
                      </div>

                      {/* Bot Result - Only show if bot is playing */}
                      {gameMode === 'bot' && (
                        <div className={`flex flex-col gap-1 p-3 rounded-xl border ${isBotCorrect ? 'bg-green-500/5 border-green-500/20' : botRes === 'incorrect' ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-white/10'}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Bot</span>
                            {isBotCorrect ? <Check className="size-3 text-green-400" /> : botRes === 'incorrect' ? <X className="size-3 text-red-400" /> : <Clock className="size-3 text-slate-500" />}
                          </div>
                          <p className={`text-xs font-bold leading-tight ${isBotCorrect ? 'text-green-400' : botRes === 'incorrect' ? 'text-red-400' : 'text-slate-500'}`}>
                            {botChoice || (botRes === 'incorrect' ? 'Wrong' : 'Thinking...')}
                          </p>
                        </div>
                      )}

                      {/* Other Real Players' Results */}
                      {(gameMode === 'versus' || gameMode === 'team') && (
                        <>
                          {teammate && (() => {
                            const ans = playerAnswers[teammate.id]?.[idx];
                            const isWaiting = !ans;
                            const isCorrectAns = ans?.toLowerCase() === question.answer.toLowerCase();
                            return (
                              <div className={`flex flex-col gap-1 p-3 rounded-xl border ${isWaiting ? 'bg-white/5 border-white/10' : isCorrectAns ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Teammate ({teammate.name})</span>
                                  {!isWaiting && (isCorrectAns ? <Check className="size-3 text-green-400" /> : <X className="size-3 text-red-400" />)}
                                  {isWaiting && <Clock className="size-3 text-slate-500" />}
                                </div>
                                <p className={`text-xs font-bold leading-tight ${isWaiting ? 'text-slate-500' : isCorrectAns ? 'text-green-400' : 'text-red-400'}`}>
                                  {ans || 'Waiting...'}
                                </p>
                              </div>
                            );
                          })()}

                          {opponents.map(op => {
                            const opChoice = playerAnswers[op.id]?.[idx];
                            const isWaiting = !opChoice;
                            const isOpCorrect = opChoice?.toLowerCase() === question.answer.toLowerCase();
                            return (
                              <div key={op.id} className={`flex flex-col gap-1 p-3 rounded-xl border ${isWaiting ? 'bg-white/5 border-white/10' : isOpCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Opponent ({op.name})</span>
                                  {!isWaiting && (isOpCorrect ? <Check className="size-3 text-green-400" /> : <X className="size-3 text-red-400" />)}
                                  {isWaiting && <Clock className="size-3 text-slate-500" />}
                                </div>
                                <p className={`text-xs font-bold leading-tight ${isWaiting ? 'text-slate-500' : isOpCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                  {opChoice || 'Waiting...'}
                                </p>
                              </div>
                            );
                          })}
                        </>
                      )}
                    </div>

                    {((!isCorrect && question.answer) || (gameMode === 'bot' && !isBotCorrect && botRes === 'incorrect' && question.answer)) && (
                      <div className="px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                        <Check className="size-3 text-emerald-400" />
                        <p className="text-[10px] font-bold text-emerald-400">Correct: <span className="uppercase">{question.answer}</span></p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button onClick={handleRestart} className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-primary/30"><RotateCcw className="size-4" /> Play Again</button>
            <button onClick={() => navigate('/')} className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"><ArrowLeft className="size-4" /> Back to Home</button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6 relative">
      {hostLeft && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-6"
        >
          <div className="bg-red-500 text-white p-4 rounded-2xl shadow-2xl border border-white/20 flex flex-col items-center gap-3">
             <div className="flex items-center gap-2">
               <X className="size-5" />
               <p className="font-black uppercase tracking-widest text-xs">The host has left the room!</p>
             </div>
             <button 
               onClick={handleRestart}
               className="bg-white text-red-500 px-6 py-2 rounded-xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform"
             >
               Return to Home
             </button>
          </div>
        </motion.div>
      )}

      {lobbyLogs.slice(-1).map(log => log.type === 'leave' && (
        <motion.div 
          key={log.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-10 right-10 z-[100] bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-3"
        >
           <div className="size-2 rounded-full bg-red-500 animate-pulse" />
           <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">{log.text}</p>
        </motion.div>
      ))}
      {/* Race Mode UI shown during quiz if multiplayer or bot */}
      {(gameMode && ['bot', 'versus', 'team'].includes(gameMode)) && (
        <RaceTrack 
          mode={gameMode as 'bot' | 'versus' | 'team'}
          total={total}
          teamAScore={teamAScore}
          teamBScore={teamBScore}
          teamANames={teamANames}
          teamBNames={teamBNames}
          teamAPictures={teamAPictures}
          teamBPictures={teamBPictures}
          myTeamId={myTeamId}
          scoreLabel={scoreLabel}
          isVersus={gameMode === 'versus' || gameMode === 'bot'}
        />
      )}
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
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
          {sessionQuestions.map((_, i) => (
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

// --- Frozen Movie Selector ---

const FROZEN_GRADES = [
  { threshold: 90, label: 'Snow Queen', color: 'text-sky-300', character: { name: 'Elsa', image: '/images/frozen.jpg', desc: 'The cold never bothered you anyway! You are a master of Arendelle’s history.' } },
  { threshold: 70, label: 'Fearless Optimist', color: 'text-fuchsia-400', character: { name: 'Anna', image: '/images/frozen.jpg', desc: 'You have a heart of gold. Your knowledge of the sisterhood is impressive!' } },
  { threshold: 50, label: 'Warm Hug Expert', color: 'text-blue-200', character: { name: 'Olaf', image: '/images/frozen.jpg', desc: 'Some people are worth melting for. You know a fair bit, but keep exploring!' } },
  { threshold: 0, label: 'Ice Harvester', color: 'text-slate-400', character: { name: 'Sven', image: '/images/frozen.jpg', desc: 'Reindeer are better than people. You might need to spend more time in the castle!' } },
];

const FrozenSelector = () => {
  const navigate = useNavigate();
  const { getQuizCount, formatCount } = useQuizStats();
  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-bold mb-4">
          <ArrowLeft className="size-4" /> Back to Universes
        </button>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Enter <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300">Arendelle</span></h1>
        <Helmet>
          <title>Frozen Trivia & Arendelle Quizzes | Fandom Trivia</title>
          <meta name="description" content="Test your knowledge on Frozen and Frozen 2. From Elsa's magic to Anna's adventures. Prove you're the ultimate Snow Master in our trivia challenge." />
          <link rel="canonical" href="https://fandom-trivia.vercel.app/selector-frozen" />
          <meta property="og:title" content="Frozen Trivia & Arendelle Quizzes | Fandom Trivia" />
          <meta property="og:description" content="Do you know everything about Elsa, Anna, and Olaf? Test your Frozen knowledge now!" />
          <script type="application/ld+json">
            {getBreadcrumbSchema([
              { name: "Home", item: "https://fandom-trivia.vercel.app/" },
              { name: "Frozen Universe", item: "https://fandom-trivia.vercel.app/selector-frozen" }
            ])}
          </script>
        </Helmet>
        <p className="text-slate-400 font-medium">Select a chapter to test your knowledge, or take the Ultimate Challenge!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Chapter 1", title: "Frozen (2013)", desc: `${FROZEN_1_TRIVIA.length} questions`, icon: "❄️", view: 'trivia-frozen-1', gradient: 'from-blue-600/20 to-sky-600/20', border: 'border-sky-500/30 hover:border-sky-400/50' },
          { label: "Chapter 2", title: "Frozen 2 (2019)", desc: `${FROZEN_2_TRIVIA.length} questions`, icon: "🍂", view: 'trivia-frozen-2', gradient: 'from-fuchsia-600/20 to-purple-600/20', border: 'border-fuchsia-500/30 hover:border-fuchsia-400/50' },
          { label: "Random", title: "Mixed Challenge", desc: "15 random questions from both films", icon: "🎲", view: 'trivia-frozen-random', gradient: 'from-indigo-600/20 to-blue-600/20', border: 'border-indigo-500/30 hover:border-indigo-400/50' },
        ].map(film => (
          <motion.button
            key={film.title}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/${film.view}`)}
            className={`text-left p-6 rounded-2xl bg-gradient-to-br ${film.gradient} border ${film.border} transition-all duration-300 space-y-4 group`}
          >
            <div className="text-4xl">{film.icon}</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{film.label}</p>
              <h3 className="text-xl font-black text-white tracking-tight">{film.title}</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">{film.desc}</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Thaw Quiz <ArrowRight className="size-3" />
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 border border-white/5 px-2.5 py-1 rounded-lg">
                <span className="text-[10px] font-black text-white">{formatCount(getQuizCount(film.view))}</span>
                <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter ml-0.5">takes</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
  );
};

// --- Despicable Me Movie Selector ---

const DESPICABLE_ME_GRADES = [
  { threshold: 90, label: 'Anti-Villain Legend', color: 'text-yellow-400', character: { name: 'Felonious Gru', image: '/images/despicable-me.jpg', desc: 'Bello! You are the mastermind. Even the Bank of Evil would be impressed.' } },
  { threshold: 70, label: 'Super Agent', color: 'text-blue-400', character: { name: 'Lucy Wilde', image: '/images/despicable-me.jpg', desc: 'Lipstick taser! Your instincts are sharp and your knowledge is vast.' } },
  { threshold: 50, label: 'Minion in Training', color: 'text-yellow-300', character: { name: 'Stuart', image: '/images/despicable-me.jpg', desc: 'Banana! You are getting there, but you might need more jelly.' } },
  { threshold: 0, label: 'Fresh Recruit', color: 'text-slate-400', character: { name: 'Jerry', image: '/images/despicable-me.jpg', desc: 'Whaaat? You are still figuring out which end is up. Keep practicing!' } },
];

const DespicableMeSelector = () => {
  const navigate = useNavigate();
  const { getQuizCount, formatCount } = useQuizStats();
  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
    <div className="max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors font-bold mb-4">
          <ArrowLeft className="size-4" /> Back to Universes
        </button>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">Mission</span></h1>
        <Helmet>
          <title>Despicable Me Trivia & Minion Quizzes | Fandom Trivia</title>
          <meta name="description" content="Test your knowledge on Despicable Me 1, 2, 3, and 4. From Gru's moon heist to the Anti-Villain League. Prove you're the ultimate Minion Master." />
          <link rel="canonical" href="https://fandom-trivia.vercel.app/selector-despicable-me" />
          <meta property="og:title" content="Despicable Me Trivia & Minion Quizzes | Fandom Trivia" />
          <meta property="og:description" content="Bello! Are you a true Minion expert? Test your Despicable Me knowledge in our ultimate quiz." />
          <script type="application/ld+json">
            {getBreadcrumbSchema([
              { name: "Home", item: "https://fandom-trivia.vercel.app/" },
              { name: "Despicable Me Universe", item: "https://fandom-trivia.vercel.app/selector-despicable-me" }
            ])}
          </script>
        </Helmet>
        <p className="text-slate-400 font-medium">Select a film to test your knowledge, or try the Mixed Challenge!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Film 1", title: "Despicable Me", desc: `${DESPICABLE_ME_1_TRIVIA.length} questions`, icon: "🌙", view: 'trivia-despicableme-1', gradient: 'from-blue-600/20 to-indigo-600/20', border: 'border-blue-500/30 hover:border-blue-400/50' },
          { label: "Film 2", title: "Despicable Me 2", desc: `${DESPICABLE_ME_2_TRIVIA.length} questions`, icon: "🧪", view: 'trivia-despicableme-2', gradient: 'from-purple-600/20 to-indigo-600/20', border: 'border-purple-500/30 hover:border-purple-400/50' },
          { label: "Film 3", title: "Despicable Me 3", desc: `${DESPICABLE_ME_3_TRIVIA.length} questions`, icon: "💎", view: 'trivia-despicableme-3', gradient: 'from-pink-600/20 to-rose-600/20', border: 'border-pink-500/30 hover:border-pink-400/50' },
          { label: "Film 4", title: "Despicable Me 4", desc: `${DESPICABLE_ME_4_TRIVIA.length} questions`, icon: "🪳", view: 'trivia-despicableme-4', gradient: 'from-yellow-600/20 to-amber-600/20', border: 'border-yellow-500/30 hover:border-yellow-400/50' },
          { label: "Random", title: "Mixed Challenge", desc: "20 random questions from all 4 films", icon: "🎲", view: 'trivia-despicableme-random', gradient: 'from-fuchsia-600/20 to-pink-600/20', border: 'border-fuchsia-500/30 hover:border-fuchsia-400/50' },
        ].map(film => (
          <motion.button
            key={film.title}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/${film.view}`)}
            className={`text-left p-6 rounded-2xl bg-gradient-to-br ${film.gradient} border ${film.border} transition-all duration-300 space-y-4 group`}
          >
            <div className="text-4xl">{film.icon}</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{film.label}</p>
              <h3 className="text-xl font-black text-white tracking-tight">{film.title}</h3>
              <p className="text-sm text-slate-400 font-medium mt-1">{film.desc}</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-2 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Start Quiz <ArrowRight className="size-3" />
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 border border-white/5 px-2.5 py-1 rounded-lg">
                <span className="text-[10px] font-black text-white">{formatCount(getQuizCount(film.view))}</span>
                <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter ml-0.5">takes</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  </motion.div>
  );
};


// --- Daily Mystery Quiz Component ---


const DailyMysteryQuiz = ({ setUser }: { 
  setUser: React.Dispatch<React.SetStateAction<User | null>>, 
  key?: string
}) => {
  const navigate = useNavigate();
  const { getQuizCount, formatCount } = useQuizStats();
  
  const dailyQuiz = useMemo(() => {
    const today = new Date();
    // Use local date for the seed (YYYY-MM-DD format as a string)
    const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    
    // Simple deterministic hash for better "randomness" than a cycle
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    
    const index = Math.abs(hash) % DAILY_QUIZZES.length;
    return DAILY_QUIZZES[index];
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-6 mb-20"
    >
      <div className="relative overflow-hidden rounded-3xl bg-card-dark border border-white/10 shadow-2xl group">
        {/* Background Decorative Elements */}
        <div className={`absolute inset-0 bg-gradient-to-br ${dailyQuiz.color} opacity-30 transition-opacity duration-700 group-hover:opacity-40`}></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-8 md:p-12 lg:p-16">
          {/* Image Container */}
          <div className="w-full lg:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
            <img 
              src={dailyQuiz.image} 
              alt={dailyQuiz.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                Today's Challenge
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-xs">
                <Sparkles className="size-4 animate-pulse" />
                Featured Challenge
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight">
                Today's Daily <br /> Challenge is... <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">{dailyQuiz.title}</span>
              </h2>
            </div>
            
            <p className="text-lg text-slate-400 font-medium max-w-2xl">
              {dailyQuiz.description}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <button
                onClick={() => navigate(dailyQuiz.path)}
                className="bg-gradient-to-r from-primary to-purple-600 text-white font-black italic uppercase px-12 py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 group shadow-xl shadow-primary/30"
              >
                Start Quiz Now! <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-slate-500 font-black text-[10px] uppercase tracking-widest">
                  <Clock className="size-3" />
                  Ends at Midnight
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                  <span className="text-sm font-black text-white">{formatCount(getQuizCount(dailyQuiz.id))}</span>
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider ml-1">takes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const LandingView = ({ setUser }: { 
  setUser: React.Dispatch<React.SetStateAction<User | null>>, 
  key?: string
}) => {
  const { getUniverseCount, formatCount } = useQuizStats();
  const navigate = useNavigate();
  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Helmet>
      <title>Fandom Trivia | The Ultimate Fan Experience</title>
      <meta name="description" content="The world's leading community for fandom trivia. Test your knowledge in Harry Potter, Twilight, Frozen, K-Pop, and more. Join thousands of fans on the global leaderboard." />
      <link rel="canonical" href="https://fandom-trivia.vercel.app/" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Fandom Trivia",
          "operatingSystem": "Web",
          "applicationCategory": "GameApplication",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1240"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://fandom-trivia.vercel.app/",
          "name": "Fandom Trivia",
          "description": "Premium multi-universe trivia platform for superfans.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://fandom-trivia.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
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
            Build v1.1.0 • Join 12.5K Active Players
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-[1.1]"
          >
            The Ultimate <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Fandom Trivia</span>
          </motion.h1>
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
            <button onClick={() => navigate('/rankings')} className="w-full sm:w-auto bg-white/5 border border-white/10 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
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


      <DailyMysteryQuiz setUser={setUser} />

      {/* Universe Grid */}

      <section id="universes" className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <h3 className="text-3xl font-extrabold text-white">Choose Your Universe</h3>
            <p className="text-slate-400 font-medium">Select a category to begin your journey into fandom trivia.</p>
          </div>

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
                role="img"
                aria-label={universe.title + " Trivia Universe Background"}
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
                
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (universe.id === 'twilight') navigate('/selector-twilight');
                      if (universe.id === 'kpop') navigate('/trivia-kpop');
                      if (universe.id === 'harry-potter') navigate('/selector-harry-potter');
                      if (universe.id === 'three-body') navigate('/selector-three-body');
                      if (universe.id === 'zootopia') navigate('/selector-zootopia');
                      if (universe.id === 'despicable-me') navigate('/selector-despicable-me');
                      if (universe.id === 'frozen') navigate('/selector-frozen');
                    }}
                    className={`flex-1 py-3 ${universe.isSpecial ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20'} rounded-xl text-white font-bold transition-all`}
                  >
                    {universe.buttonText}
                  </button>
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-3 rounded-xl min-w-fit">
                    <span className="text-sm font-black text-white">{formatCount(getUniverseCount(universe.id))}</span>
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider ml-0.5">takes</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                {universe.icon === 'Droplets' && <Droplets className="text-white/50 size-10" />}
                {universe.icon === 'Wand2' && <Wand2 className="text-white/50 size-10" />}
                {universe.icon === 'Zap' && <Zap className="text-primary/70 size-10 fill-current" />}
                {universe.icon === 'Search' && <Search className="text-white/50 size-10" />}
                {universe.icon === 'Snowflake' && <Snowflake className="text-sky-300/50 size-10" />}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  </motion.div>
  );
};

const formatTime = (seconds: number | null) => {
  if (seconds === null || seconds === undefined) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const DashboardView = ({ user }: { user: User | null, key?: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopScores = async () => {
      const { data } = await supabase
        .from('scores')
        .select('id, score, total, quiz_id, user_id, completion_time, profiles(username)')
        .order('score', { ascending: false })
        .order('completion_time', { ascending: true })
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
            completion_time: row.completion_time,
            userId: row.user_id,
            realId: row.id
          };
        }));
      }
    };
    fetchTopScores();
  }, []);

  const handleDeleteRanking = async (scoreId: string) => {
    if (!window.confirm('Are you sure you want to remove this score from the leaderboard?')) return;
    
    const { error } = await supabase.from('scores').delete().eq('id', scoreId);
    if (error) {
      alert('Error deleting score: ' + error.message);
    } else {
      setLeaderboard(prev => prev.filter(item => item.realId !== scoreId));
    }
  };

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
      <Helmet>
        <title>Pro Hub Dashboard | Fandom Trivia</title>
        <meta name="description" content="View your stats, achievements, and the latest tournament rankings." />
      </Helmet>
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
                ) : leaderboard.map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl hover:bg-white/[0.05] transition-all group border border-transparent hover:border-white/10`}>
                    <div className={`size-8 flex items-center justify-center font-black italic ${idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-slate-400' : idx === 2 ? 'text-orange-400' : 'text-slate-600 text-xs'}`}>
                      #{idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors truncate">{item.name}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter truncate">{getQuizTitle(item.fandom)}</p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <p className={`text-xs font-black ${idx === 0 ? 'text-amber-400' : 'text-white'}`}>
                          {item.points}
                        </p>
                        <div className="size-1 rounded-full bg-slate-700"></div>
                        <p className="text-[10px] font-bold text-slate-500">{formatTime(item.completion_time)}</p>
                      </div>
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none">Score & Time</p>
                    </div>
                    {user && item.userId === user.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRanking(item.realId);
                        }}
                        className="ml-2 p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                        title="Remove from Leaderboard"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    )}
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
const RankingsView = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rankingType, setRankingType] = useState<'accuracy' | 'speed'>('accuracy');
  const [expandedQuizzes, setExpandedQuizzes] = useState<Set<string>>(new Set());

  const toggleExpand = (quizId: string) => {
    setExpandedQuizzes(prev => {
      const next = new Set(prev);
      if (next.has(quizId)) next.delete(quizId);
      else next.add(quizId);
      return next;
    });
  };

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('scores')
          .select(`
          id,
          score,
          total,
          quiz_id,
          created_at,
          user_id,
          completion_time,
          profiles(username)
          `);

        if (rankingType === 'speed') {
          query = query.not('completion_time', 'is', null);
        }

        if (rankingType === 'accuracy') {
          query = query
            .order('score', { ascending: false })
            .order('completion_time', { ascending: true, nullsFirst: false });
        } else {
          query = query
            .order('completion_time', { ascending: true, nullsFirst: false })
            .order('score', { ascending: false });
        }

        const { data, error } = await query;

        if (error) throw error;

        // Group by Universe -> quiz_id
        const universeGroups: Record<string, Record<string, any[]>> = {};

        if (data) {
          data.forEach(row => {
            // NORMALIZE ID for merging (e.g. twilight and twilight-book-1)
            const rowId = row.quiz_id.toLowerCase();
            const isTwilight1 = rowId.includes('twilight') && (rowId.includes('book 1') || rowId.includes('book-1') || rowId === 'twilight');
            const canonicalId = isTwilight1 ? 'twilight-book-1' : rowId;
            
            const universe = getUniverseName(canonicalId);
            const qid = canonicalId;
            
            if (!universeGroups[universe]) {
              universeGroups[universe] = {};
            }
            if (!universeGroups[universe][qid]) {
              universeGroups[universe][qid] = [];
            }

            // Only add if this user doesn't already have a higher/equal score in this quiz list
            const existingUserScoreIndex = universeGroups[universe][qid].findIndex(s => s.user_id === row.user_id);
            if (existingUserScoreIndex === -1) {
              universeGroups[universe][qid].push(row);
            } else if (rankingType === 'speed') {
                const existingTime = universeGroups[universe][qid][existingUserScoreIndex].completion_time;
                if (existingTime === null || (row.completion_time !== null && row.completion_time < existingTime)) {
                    universeGroups[universe][qid][existingUserScoreIndex] = row;
                }
            } else {
                if (row.score > universeGroups[universe][qid][existingUserScoreIndex].score) {
                    universeGroups[universe][qid][existingUserScoreIndex] = row;
                } else if (row.score === universeGroups[universe][qid][existingUserScoreIndex].score) {
                    const existingTime = universeGroups[universe][qid][existingUserScoreIndex].completion_time;
                    if (existingTime === null || (row.completion_time !== null && row.completion_time < existingTime)) {
                        universeGroups[universe][qid][existingUserScoreIndex] = row;
                    }
                }
            }
          });
        }

        // Convert to nested array structure
        const finalRankings = Object.entries(universeGroups).map(([universe, quizzes]) => ({
          universe,
          quizzes: Object.entries(quizzes).map(([quiz_id, userScores]) => ({
            quiz_id,
            scores: userScores // Keep ALL scores here, we'll slice in rendering
          }))
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
  }, [rankingType]);

  const handleDeleteRanking = async (scoreId: string) => {
    if (!window.confirm('Are you sure you want to remove this score?')) return;
    const { error } = await supabase.from('scores').delete().eq('id', scoreId);
    if (error) {
      alert('Error deleting score: ' + error.message);
    } else {
      // Re-fetch to update the grouped structure
      window.location.reload(); 
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-20 px-6">
      <Helmet>
        <title>Global Rankings | Fandom Trivia (V2.0)</title>
        <meta name="description" content="See who the ultimate fans are. Check top scores for Twilight, Three-Body, Harry Potter, and more." />
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
              <ArrowLeft className="size-4" />
            </button>
            <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <Trophy className="size-8 text-amber-400" />
              Global Rankings
            </h2>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setRankingType('accuracy')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                rankingType === 'accuracy'
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <Target className="size-3.5" />
              Accuracy
            </button>
            <button
              onClick={() => setRankingType('speed')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                rankingType === 'speed'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock className="size-3.5" />
              Speed
            </button>
          </div>
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
          <div className="space-y-20">
            {scores.map((universeGroup) => (
              <div key={universeGroup.universe} className="space-y-8">
                <div className="flex items-center gap-4 border-b-2 border-primary/20 pb-4">
                  <div className="px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
                    Universe
                  </div>
                  <h3 className="text-3xl font-black text-white italic tracking-tight uppercase">
                    {universeGroup.universe}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-12">
                  {universeGroup.quizzes.map((quizData: any) => {
                    const isExpanded = expandedQuizzes.has(quizData.quiz_id);
                    const scoresToShow = isExpanded ? quizData.scores : quizData.scores.slice(0, 10);
                    const hasMore = quizData.scores.length > 10;

                    return (
                      <div key={quizData.quiz_id} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 flex items-center gap-2">
                            <Hash className="size-4 text-primary" /> {getQuizTitle(quizData.quiz_id)}
                          </h4>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                            {isExpanded ? `All ${quizData.scores.length} Rankings` : 'Top 10 Rankings'}
                          </span>
                        </div>
                        <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-md shadow-2xl">
                          {scoresToShow.map((scoreRow: any, idx: number) => (
                            <div key={scoreRow.id} className="flex items-center justify-between p-5 border-b border-white/5 last:border-0 hover:bg-white/10 transition-all group relative overflow-hidden">
                              {idx === 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 shadow-[2px_0_10px_rgba(245,158,11,0.5)]"></div>}
                              <div className="flex items-center gap-5">
                                <div className={`size-10 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg rotate-3 group-hover:rotate-0 transition-transform ${
                                  idx === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black' : 
                                  idx === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-black' : 
                                  idx === 2 ? 'bg-gradient-to-br from-amber-700 to-amber-900 text-white' : 
                                  'bg-white/5 text-slate-400 border border-white/10'
                                }`}>
                                  {idx + 1}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-extrabold text-white text-lg group-hover:text-primary transition-colors flex items-center gap-2 truncate">
                                    {scoreRow.profiles?.username || 'Unknown User'}
                                    {idx === 0 && <Trophy className="size-4 text-amber-500 animate-bounce flex-shrink-0" />}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5 whitespace-nowrap">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-0.5 rounded">Player</span>
                                    <div className="size-1 rounded-full bg-slate-700"></div>
                                    <p className="text-[10px] text-slate-500 font-bold">{new Date(scoreRow.created_at).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0 flex items-center">
                                <div className="flex flex-col items-end gap-1">
                                  <p className={`text-2xl font-black italic tracking-tighter leading-none ${rankingType === 'accuracy' ? 'text-primary' : 'text-blue-400'}`}>
                                    {rankingType === 'accuracy' ? `${Math.round((scoreRow.score / scoreRow.total) * 100)}%` : formatTime(scoreRow.completion_time)}
                                  </p>
                                  <div className="flex items-center gap-2 whitespace-nowrap">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                                      {rankingType === 'accuracy' ? `Score: ${scoreRow.score}/${scoreRow.total}` : `${Math.round((scoreRow.score / scoreRow.total) * 100)}% Acc`}
                                    </p>
                                    {(rankingType === 'accuracy' && scoreRow.completion_time) && (
                                      <>
                                        <div className="size-1 rounded-full bg-slate-700"></div>
                                        <p className="text-[10px] font-black text-slate-500">
                                          {formatTime(scoreRow.completion_time)}
                                        </p>
                                      </>
                                    )}
                                  </div>
                                </div>
                                {user && scoreRow.user_id === user.id && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteRanking(scoreRow.id);
                                    }}
                                    className="ml-4 p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all border border-red-500/20 group-hover:scale-110 shadow-lg shadow-red-500/10"
                                    title="Remove from Leaderboard"
                                  >
                                    <Trash2 className="size-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {hasMore && (
                          <button
                            onClick={() => toggleExpand(quizData.quiz_id)}
                            className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2"
                          >
                            {isExpanded ? (
                              <><ChevronUp className="size-4" /> Show Top 10 Only</>
                            ) : (
                              <><ChevronDown className="size-4" /> See All {quizData.scores.length} Rankings</>
                            )}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Easter Egg Component ---

const EMOJIS = ['❄️', '🪄', '⚡', '🧛', '🍌', '🚀', '🐰'];

const EmojiRain = ({ onComplete }: { onComplete: () => void }) => {
  const items = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      size: 30 + Math.random() * 40,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 720 * (Math.random() > 0.5 ? 1 : -1)
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(onComplete, 8000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: '-10vh', x: 0, rotate: item.rotateStart, opacity: 0 }}
          animate={{ 
            y: '110vh', 
            rotate: item.rotateEnd,
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: item.duration, 
            delay: item.delay,
            ease: "easeIn",
            opacity: { times: [0, 0.1, 0.9, 1], duration: item.duration }
          }}
          style={{ 
            fontSize: `${item.size}px`, 
            position: 'absolute',
            left: `${item.left}vw`,
            textShadow: '0 0 10px rgba(0,0,0,0.5)' 
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<{title: string, content: string} | null>(null);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>([]);
  const [badgeQueue, setBadgeQueue] = useState<Badge[]>([]);
  const [showEmojiRain, setShowEmojiRain] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });


  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('soundEnabled', JSON.stringify(next));
      return next;
    });
  };

  const twilightRandomQuestions = useMemo(() => 
    [...TWILIGHT_BOOK_TRIVIA, ...NEW_MOON_TRIVIA, ...ECLIPSE_TRIVIA, ...BREAKING_DAWN_TRIVIA, ...MIDNIGHT_SUN_TRIVIA, ...LIFE_AND_DEATH_TRIVIA].sort(() => 0.5 - Math.random()).slice(0, 20),
  []);

  const hpRandomQuestions = useMemo(() => 
    [...HARRY_POTTER_TRIVIA, ...HARRY_POTTER_COS_TRIVIA, ...HARRY_POTTER_POA_TRIVIA, ...HARRY_POTTER_GOF_TRIVIA, ...HARRY_POTTER_OOTP_TRIVIA, ...HARRY_POTTER_HBP_TRIVIA, ...HARRY_POTTER_DH_TRIVIA].sort(() => 0.5 - Math.random()).slice(0, 20),
  []);

  const threeBodyRandomQuestions = useMemo(() => 
    [...THREE_BODY_PROBLEM_TRIVIA, ...THE_DARK_FOREST_TRIVIA, ...DEATHS_END_TRIVIA].sort(() => 0.5 - Math.random()).slice(0, 20),
  []);

  const zootopiaRandomQuestions = useMemo(() => 
    [...ZOOTOPIA_TRIVIA, ...ZOOTOPIA_2_TRIVIA].sort(() => 0.5 - Math.random()).slice(0, 15),
  []);

  const despicableMeRandomQuestions = useMemo(() => 
    [...DESPICABLE_ME_1_TRIVIA, ...DESPICABLE_ME_2_TRIVIA, ...DESPICABLE_ME_3_TRIVIA, ...DESPICABLE_ME_4_TRIVIA].sort(() => 0.5 - Math.random()).slice(0, 20),
  []);

  const frozenRandomQuestions = useMemo(() => 
    [...FROZEN_1_TRIVIA, ...FROZEN_2_TRIVIA].sort(() => 0.5 - Math.random()).slice(0, 15),
  []);

  useEffect(() => {
    document.title = "Fandom Trivia | The Ultimate Fan Experience";
  }, []);

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
    navigate('/');
  };

  const evaluateBadges = async (quizId: string, scorePct: number, isDaily: boolean = false) => {
    const newlyUnlocked: Badge[] = [];
    
    // Check if user is logged in for streak calculation
    if (isDaily && user) {
      try {
        const { data: dailyScores, error } = await supabase
          .from('scores')
          .select('created_at')
          .eq('user_id', user.id)
          .eq('is_daily_challenge', true)
          .order('created_at', { ascending: false });

        if (!error && dailyScores) {
          // Get unique days (YYYY-MM-DD)
          const distinctDays = Array.from(new Set(dailyScores.map(s => 
            new Date(s.created_at).toISOString().split('T')[0]
          )));

          // Current streak calculation
          let streak = 0;
          const todayStr = new Date().toISOString().split('T')[0];
          
          // Check if today is in the list (it should be since we just saved it)
          if (distinctDays[0] === todayStr) {
            streak = 1;
            for (let i = 0; i < distinctDays.length - 1; i++) {
              const current = new Date(distinctDays[i]);
              const previous = new Date(distinctDays[i+1]);
              const diffTime = Math.abs(current.getTime() - previous.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              if (diffDays === 1) {
                streak++;
              } else {
                break;
              }
            }
          }

          // Streak Milestone Unlocks
          if (streak >= 1 && !unlockedBadgeIds.includes('streak_1')) newlyUnlocked.push(BADGES.find(b => b.id === 'streak_1')!);
          if (streak >= 5 && !unlockedBadgeIds.includes('streak_5')) newlyUnlocked.push(BADGES.find(b => b.id === 'streak_5')!);
          if (streak >= 10 && !unlockedBadgeIds.includes('streak_10')) newlyUnlocked.push(BADGES.find(b => b.id === 'streak_10')!);
          if (streak >= 30 && !unlockedBadgeIds.includes('streak_30')) newlyUnlocked.push(BADGES.find(b => b.id === 'streak_30')!);
        }
      } catch (err) {
        console.error('Error calculating streak:', err);
      }
    }

    BADGES.forEach(badge => {
      // Skip the ones we just added manually via streak logic
      if (newlyUnlocked.some(nb => nb.id === badge.id)) return;
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
      <Helmet>
        <title>Fandom Trivia</title>
        <meta name="description" content="Test your fan knowledge in Twilight, Harry Potter, K-Pop, and more. Join the global leaderboard and prove you are the ultimate fan." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fandom-trivia.vercel.app/" />
        <meta property="og:title" content="Fandom Trivia | The Ultimate Fan Experience" />
        <meta property="og:description" content="The ultimate destination for superfans. Play interactive quizzes and climb the ranks." />
        <meta property="og:image" content="https://fandom-trivia.vercel.app/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://fandom-trivia.vercel.app/" />
        <meta property="twitter:title" content="Fandom Trivia | The Ultimate Fan Experience" />
        <meta property="twitter:description" content="The ultimate destination for superfans. Play interactive quizzes and climb the ranks." />
        <meta property="twitter:image" content="https://fandom-trivia.vercel.app/og-image.jpg" />
      </Helmet>

      <Navbar
        isDashboard={location.pathname === '/dashboard'}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onResetUsername={() => setShowUsernameModal(true)}
        onShowHistory={() => setShowHistoryModal(true)}
        onShowBadges={() => setShowBadgesModal(true)}
        onShowInfo={(title, content) => setModalInfo({title, content})}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onTriggerEasterEgg={() => {
          if (location.pathname === '/') {
            setShowEmojiRain(true);
          }
        }}
      />

      <AnimatePresence>
        {showEmojiRain && <EmojiRain onComplete={() => setShowEmojiRain(false)} />}
      </AnimatePresence>

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


      <main>
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/rankings" element={<RankingsView user={user} />} />
            <Route path="/" element={<LandingView setUser={setUser} />} />
            <Route path="/trivia-kpop" element={<MCQuizView key="trivia-kpop" questions={KPOP_TRIVIA} title="K-Pop: Demon Hunters" scoreLabel="K-Pop: Demon Hunters" grades={[
              { threshold: 90, label: 'Demon Hunter Elite', color: 'text-amber-400', character: { name: 'Master Saja', image: "/images/Soda Pop and How It's Done.jpg", desc: 'You have mastered the supernatural rhythm. The shadows fear your precision.' } },
              { threshold: 70, label: 'Saja Superfan', color: 'text-purple-400', character: { name: 'Lead Hunter', image: "/images/Soda Pop and How It's Done.jpg", desc: 'Your instincts are sharp and your beats are lethal.' } },
              { threshold: 50, label: 'K-Pop Casual', color: 'text-blue-400', character: { name: 'Rookie Trainee', image: "/images/Soda Pop and How It's Done.jpg", desc: 'You have potential, but the demons are still faster.' } },
              { threshold: 0, label: 'Trainee', color: 'text-slate-400', character: { name: 'Civilian Fan', image: "/images/Soda Pop and How It's Done.jpg", desc: 'Keep practicing your moves before entering the supernatural zone.' } },
            ]} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-twilight-mc" element={<MCQuizView key="trivia-twilight-mc" questions={TWILIGHT_MC_TRIVIA} title="Twilight MC Trivia" scoreLabel="Twilight MC Trivia" grades={TWILIGHT_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-twilight-book" element={<MCQuizView key="trivia-twilight-book" questions={TWILIGHT_BOOK_TRIVIA} title="Twilight: Book 1" scoreLabel="Twilight: Book 1" grades={TWILIGHT_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-newmoon" element={<MCQuizView key="trivia-newmoon" questions={NEW_MOON_TRIVIA} title="New Moon" scoreLabel="New Moon" grades={TWILIGHT_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-eclipse" element={<MCQuizView key="trivia-eclipse" questions={ECLIPSE_TRIVIA} title="Eclipse" scoreLabel="Eclipse" grades={TWILIGHT_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-breakingdawn" element={<MCQuizView key="trivia-breakingdawn" questions={BREAKING_DAWN_TRIVIA} title="Breaking Dawn" scoreLabel="Breaking Dawn" grades={TWILIGHT_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-midnightsun" element={<MCQuizView key="trivia-midnightsun" questions={MIDNIGHT_SUN_TRIVIA} title="Midnight Sun" scoreLabel="Midnight Sun" grades={TWILIGHT_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-lifeanddeath" element={<MCQuizView key="trivia-lifeanddeath" questions={LIFE_AND_DEATH_TRIVIA} title="Life and Death" scoreLabel="Life and Death" grades={TWILIGHT_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-twilight-random" element={<MCQuizView 
              key="trivia-twilight-random" 
              questions={twilightRandomQuestions} 
              title="Twilight Mixed Challenge" 
              scoreLabel="Twilight Mixed Challenge" 
              grades={TWILIGHT_GRADES} 
              user={user} 
              onQuizComplete={evaluateBadges} 
            />} />
            <Route path="/trivia-harry-potter" element={<MCQuizView key="trivia-harry-potter" questions={HARRY_POTTER_TRIVIA} title="Harry Potter: Sorcerer's Stone" scoreLabel="Harry Potter: Sorcerer's Stone" grades={[
              { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Albus Dumbledore', image: '/images/dumbledore.jpg', desc: 'Your wisdom is legendary. Even the restricted section has no secrets from you.' } },
              { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Hermione Granger', image: '/images/hermione.jpg', desc: 'Impressive! You have clearly spent your time in the library wisely.' } },
              { threshold: 50, label: 'Muggle-Born Learner', color: 'text-blue-400', character: { name: 'Harry Potter', image: '/images/harry.jpg', desc: 'You have potential, but you might need some more practice with your wand-work.' } },
              { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Dudley Dursley', image: '/images/dudley.jpg', desc: 'Is there a bit of magic in you? It does not seem like it yet.' } },
            ]} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-harry-potter-cos" element={<MCQuizView key="trivia-harry-potter-cos" questions={HARRY_POTTER_COS_TRIVIA} title="Harry Potter: Chamber of Secrets" scoreLabel="Harry Potter: Chamber of Secrets" grades={[
              { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Albus Dumbledore', image: '/images/dumbledore.jpg', desc: 'Your wisdom is legendary. Even the restricted section has no secrets from you.' } },
              { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Hermione Granger', image: '/images/hermione.jpg', desc: 'Impressive! You have clearly spent your time in the library wisely.' } },
              { threshold: 50, label: 'Muggle-Born Learner', color: 'text-blue-400', character: { name: 'Harry Potter', image: '/images/harry.jpg', desc: 'You have potential, but you might need some more practice with your wand-work.' } },
              { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Dudley Dursley', image: '/images/dudley.jpg', desc: 'Is there a bit of magic in you? It does not seem like it yet.' } },
            ]} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-harry-potter-poa" element={<MCQuizView key="trivia-harry-potter-poa" questions={HARRY_POTTER_POA_TRIVIA} title="HP: Prisoner of Azkaban" scoreLabel="HP: Prisoner of Azkaban" grades={[
              { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Albus Dumbledore', image: '/images/dumbledore.jpg', desc: 'Your wisdom is legendary. Even the restricted section has no secrets from you.' } },
              { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Hermione Granger', image: '/images/hermione.jpg', desc: 'Impressive! You have clearly spent your time in the library wisely.' } },
              { threshold: 50, label: 'O.W.L. Candidate', color: 'text-blue-400', character: { name: 'Harry Potter', image: '/images/harry.jpg', desc: 'You have potential, but you might need some more practice with your wand-work.' } },
              { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Dudley Dursley', image: '/images/dudley.jpg', desc: 'Is there a bit of magic in you? It does not seem like it yet.' } },
            ]} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-harry-potter-gof" element={<MCQuizView key="trivia-harry-potter-gof" questions={HARRY_POTTER_GOF_TRIVIA} title="HP: Goblet of Fire" scoreLabel="HP: Goblet of Fire" grades={[
              { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Albus Dumbledore', image: '/images/dumbledore.jpg', desc: 'Your wisdom is legendary. Even the restricted section has no secrets from you.' } },
              { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Hermione Granger', image: '/images/hermione.jpg', desc: 'Impressive! You have clearly spent your time in the library wisely.' } },
              { threshold: 50, label: 'O.W.L. Candidate', color: 'text-blue-400', character: { name: 'Harry Potter', image: '/images/harry.jpg', desc: 'You have potential, but you might need some more practice with your wand-work.' } },
              { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Dudley Dursley', image: '/images/dudley.jpg', desc: 'Is there a bit of magic in you? It does not seem like it yet.' } },
            ]} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-harry-potter-ootp" element={<MCQuizView key="trivia-harry-potter-ootp" questions={HARRY_POTTER_OOTP_TRIVIA} title="HP: Order of the Phoenix" scoreLabel="HP: Order of the Phoenix" grades={[
              { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Albus Dumbledore', image: '/images/dumbledore.jpg', desc: 'Your wisdom is legendary. Even the restricted section has no secrets from you.' } },
              { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Hermione Granger', image: '/images/hermione.jpg', desc: 'Impressive! You have clearly spent your time in the library wisely.' } },
              { threshold: 50, label: 'O.W.L. Candidate', color: 'text-blue-400', character: { name: 'Harry Potter', image: '/images/harry.jpg', desc: 'You have potential, but you might need some more practice with your wand-work.' } },
              { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Dudley Dursley', image: '/images/dudley.jpg', desc: 'Is there a bit of magic in you? It does not seem like it yet.' } },
            ]} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-harry-potter-hbp" element={<MCQuizView key="trivia-harry-potter-hbp" questions={HARRY_POTTER_HBP_TRIVIA} title="HP: Half-Blood Prince" scoreLabel="HP: Half-Blood Prince" grades={[
              { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Albus Dumbledore', image: '/images/dumbledore.jpg', desc: 'Your wisdom is legendary. Even the restricted section has no secrets from you.' } },
              { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Hermione Granger', image: '/images/hermione.jpg', desc: 'Impressive! You have clearly spent your time in the library wisely.' } },
              { threshold: 50, label: 'O.W.L. Candidate', color: 'text-blue-400', character: { name: 'Harry Potter', image: '/images/harry.jpg', desc: 'You have potential, but you might need some more practice with your wand-work.' } },
              { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Dudley Dursley', image: '/images/dudley.jpg', desc: 'Is there a bit of magic in you? It does not seem like it yet.' } },
            ]} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-harry-potter-dh" element={<MCQuizView key="trivia-harry-potter-dh" questions={HARRY_POTTER_DH_TRIVIA} title="HP: Deathly Hallows" scoreLabel="HP: Deathly Hallows" grades={[
              { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Albus Dumbledore', image: '/images/dumbledore.jpg', desc: 'Your wisdom is legendary. Even the restricted section has no secrets from you.' } },
              { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Hermione Granger', image: '/images/hermione.jpg', desc: 'Impressive! You have clearly spent your time in the library wisely.' } },
              { threshold: 50, label: 'O.W.L. Candidate', color: 'text-blue-400', character: { name: 'Harry Potter', image: '/images/harry.jpg', desc: 'You have potential, but you might need some more practice with your wand-work.' } },
              { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Dudley Dursley', image: '/images/dudley.jpg', desc: 'Is there a bit of magic in you? It does not seem like it yet.' } },
            ]} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-harry-potter-random" element={<MCQuizView 
              key="trivia-harry-potter-random" 
              questions={hpRandomQuestions} 
              title="Harry Potter Mixed Challenge" 
              scoreLabel="Harry Potter Mixed Challenge" 
              grades={[
                { threshold: 90, label: 'Dumbledore-Level Genius', color: 'text-amber-400', character: { name: 'Albus Dumbledore', image: '/images/dumbledore.jpg', desc: 'Your wisdom is legendary. Even the restricted section has no secrets from you.' } },
                { threshold: 70, label: 'Prefect Material', color: 'text-purple-400', character: { name: 'Hermione Granger', image: '/images/hermione.jpg', desc: 'Impressive! You have clearly spent your time in the library wisely.' } },
                { threshold: 50, label: 'O.W.L. Candidate', color: 'text-blue-400', character: { name: 'Harry Potter', image: '/images/harry.jpg', desc: 'You have potential, but you might need some more practice with your wand-work.' } },
                { threshold: 0, label: 'Muggle', color: 'text-slate-400', character: { name: 'Dudley Dursley', image: '/images/dudley.jpg', desc: 'Is there a bit of magic in you? It does not seem like it yet.' } },
              ]} 
              user={user} 
              isDaily={location.state?.isDaily} 
              onQuizComplete={evaluateBadges} 
            />} />
            <Route path="/trivia-three-body-problem" element={<MCQuizView key="trivia-three-body-problem" questions={THREE_BODY_PROBLEM_TRIVIA} title="The Three-Body Problem" scoreLabel="The Three-Body Problem" grades={THREE_BODY_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-the-dark-forest" element={<MCQuizView key="trivia-the-dark-forest" questions={THE_DARK_FOREST_TRIVIA} title="The Dark Forest" scoreLabel="The Dark Forest" grades={THREE_BODY_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-deaths-end" element={<MCQuizView key="trivia-deaths-end" questions={DEATHS_END_TRIVIA} title="Death's End" scoreLabel="Death's End" grades={THREE_BODY_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-three-body-random" element={<MCQuizView 
              key="trivia-three-body-random" 
              questions={threeBodyRandomQuestions} 
              title="Three-Body Mixed Challenge" 
              scoreLabel="Three-Body Mixed Challenge" 
              grades={THREE_BODY_GRADES} 
              user={user} 
              isDaily={location.state?.isDaily} 
              onQuizComplete={evaluateBadges} 
            />} />
            <Route path="/trivia-zootopia" element={<MCQuizView key="trivia-zootopia" questions={ZOOTOPIA_TRIVIA} title="Zootopia" scoreLabel="Zootopia" grades={ZOOTOPIA_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-zootopia-2" element={<MCQuizView key="trivia-zootopia-2" questions={ZOOTOPIA_2_TRIVIA} title="Zootopia 2" scoreLabel="Zootopia 2" grades={ZOOTOPIA_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-zootopia-random" element={<MCQuizView 
              key="trivia-zootopia-random" 
              questions={zootopiaRandomQuestions} 
              title="Zootopia Mixed Case File" 
              scoreLabel="Zootopia Mixed Case File" 
              grades={ZOOTOPIA_GRADES} 
              user={user} 
              isDaily={location.state?.isDaily} 
              onQuizComplete={evaluateBadges} 
            />} />
            <Route path="/trivia-despicableme-1" element={<MCQuizView key="trivia-despicableme-1" questions={DESPICABLE_ME_1_TRIVIA} title="Despicable Me" scoreLabel="Despicable Me" grades={DESPICABLE_ME_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-despicableme-2" element={<MCQuizView key="trivia-despicableme-2" questions={DESPICABLE_ME_2_TRIVIA} title="Despicable Me 2" scoreLabel="Despicable Me 2" grades={DESPICABLE_ME_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-despicableme-3" element={<MCQuizView key="trivia-despicableme-3" questions={DESPICABLE_ME_3_TRIVIA} title="Despicable Me 3" scoreLabel="Despicable Me 3" grades={DESPICABLE_ME_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-despicableme-4" element={<MCQuizView key="trivia-despicableme-4" questions={DESPICABLE_ME_4_TRIVIA} title="Despicable Me 4" scoreLabel="Despicable Me 4" grades={DESPICABLE_ME_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-despicableme-random" element={<MCQuizView key="trivia-despicableme-random" questions={despicableMeRandomQuestions} title="Despicable Me Mixed Challenge" scoreLabel="Despicable Me Mixed Challenge" grades={DESPICABLE_ME_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />


            {/* Selectors */}
            <Route path="/selector-twilight" element={<TwilightBookSelector key="selector-twilight" />} />
            <Route path="/selector-harry-potter" element={<HPBookSelector key="selector-harry-potter" />} />
            <Route path="/selector-three-body" element={<ThreeBodyBookSelector key="selector-three-body" />} />
            <Route path="/selector-zootopia" element={<ZootopiaSelector />} />
            <Route path="/selector-despicable-me" element={<DespicableMeSelector />} />
            <Route path="/selector-frozen" element={<FrozenSelector />} />
            
            {/* Frozen Trivia */}
            <Route path="/trivia-frozen-1" element={<MCQuizView key="trivia-frozen-1" questions={FROZEN_1_TRIVIA} title="Frozen (2013)" scoreLabel="Frozen" grades={FROZEN_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-frozen-2" element={<MCQuizView key="trivia-frozen-2" questions={FROZEN_2_TRIVIA} title="Frozen 2" scoreLabel="Frozen 2" grades={FROZEN_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />
            <Route path="/trivia-frozen-random" element={<MCQuizView key="trivia-frozen-random" questions={frozenRandomQuestions} title="Frozen Mixed Challenge" scoreLabel="Frozen Mixed Challenge" grades={FROZEN_GRADES} user={user} isDaily={location.state?.isDaily} onQuizComplete={evaluateBadges} />} />

            <Route path="/dashboard" element={user ? <DashboardView user={user} key="dashboard" /> : <LandingView key="auth-redirect" setUser={setUser} />} />
            
            {/* Legal */}
            <Route path="/privacy-policy" element={<PrivacyPolicyView key="privacy" />} />
            <Route path="/terms-of-service" element={<TermsOfServiceView key="terms" />} />
            <Route path="/cookie-policy" element={<CookiePolicyView key="cookie" />} />
          </Routes>
        </AnimatePresence>
      </main>

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

      <AnimatePresence>
        {modalInfo && (
          <InfoModal
            title={modalInfo.title}
            content={modalInfo.content}
            onClose={() => setModalInfo(null)}
          />
        )}
      </AnimatePresence>

      <FeedbackWidget user={user} />
      <Footer 
        isDashboard={location.pathname === '/dashboard'} 
        onShowInfo={(title, content) => setModalInfo({title, content})} 
      />
    </div>
  );
}
