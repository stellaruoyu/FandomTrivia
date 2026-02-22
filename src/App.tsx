/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Users, Zap, Search, PlayCircle, ArrowRight, Star, 
  ChevronLeft, ChevronRight, Share2, Globe, MessageSquare, 
  ExternalLink, Droplets, Wand2, Bolt, LayoutDashboard, LogOut, User as UserIcon
} from 'lucide-react';
import { 
  NAV_LINKS, DASHBOARD_NAV_LINKS, UNIVERSES, TOURNAMENTS, LEADERBOARD 
} from './constants';

// --- Types ---

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  username: string | null;
}

// --- Components ---

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
      const res = await fetch('/api/user/set-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok) {
        onComplete(username);
      } else {
        setError(data.error || 'Failed to set username');
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
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
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

const Navbar = ({ isDashboard, setView, user, onLogin, onLogout }: { 
  isDashboard: boolean, 
  setView: (v: 'landing' | 'dashboard') => void,
  user: User | null,
  onLogin: () => void,
  onLogout: () => void
}) => (
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
          Fandom<span className="text-primary">{isDashboard ? 'Hub' : 'Trivia'}</span>
        </h1>
      </div>
      
      <nav className="hidden md:flex items-center gap-10">
        {(isDashboard ? DASHBOARD_NAV_LINKS : NAV_LINKS).map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
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
        <button className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors mr-4">
          <Search className="size-5" />
        </button>
        
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 pl-2 pr-4 py-1.5 rounded-full">
              <img src={user.picture} alt={user.name} className="size-8 rounded-full border border-white/20" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white uppercase tracking-tight leading-none">@{user.username || 'new_fan'}</span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{user.name}</span>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-500 transition-all"
            >
              <LogOut className="size-5" />
            </button>
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

const Footer = ({ isDashboard }: { isDashboard: boolean }) => (
  <footer className={`border-t border-white/10 py-20 px-6 ${isDashboard ? 'bg-card-dark' : ''}`}>
    <div className={`max-w-${isDashboard ? '[1600px]' : '7xl'} mx-auto grid grid-cols-1 md:grid-cols-4 gap-12`}>
      <div className="col-span-1 md:col-span-2 space-y-6">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <Zap className="size-5 fill-current" />
          </div>
          <h1 className={`text-lg font-bold tracking-tight text-white ${isDashboard ? 'uppercase italic font-black' : ''}`}>
            Fandom<span className="text-primary">{isDashboard ? 'Hub' : 'Trivia'}</span>
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
              <li><a href="#" className="hover:text-primary transition-colors">Leaderboards</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Categories</a></li>
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

const LandingView = ({ setView }: { setView: (v: 'landing' | 'dashboard') => void, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="pt-20"
  >
    {/* Hero */}
    <section className="relative w-full py-20 px-6 overflow-hidden">
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
          Test your knowledge across the multiverse. Prove you're the ultimate fan in Twilight, Harry Potter, and K-Pop: Demon Hunters.
        </motion.p>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => setView('dashboard')}
            className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30 flex items-center justify-center gap-2"
          >
            <PlayCircle className="size-6" />
            Start Quiz Now
          </button>
          <button className="w-full sm:w-auto bg-white/5 border border-white/10 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
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
    <section className="max-w-7xl mx-auto px-6 pb-32">
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
              style={{ backgroundImage: `url(${universe.image})` }}
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
              <button className={`w-full py-3 ${universe.isSpecial ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20'} rounded-xl text-white font-bold transition-all`}>
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

    {/* Newsletter */}
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="relative bg-primary rounded-3xl p-12 overflow-hidden flex flex-col items-center text-center gap-6">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <h3 className="text-4xl font-black text-white leading-tight">Think you're a Super Fan?</h3>
        <p className="text-white/80 text-lg max-w-xl font-medium">Join our community to get notified about new trivia drops, special limited-time events, and global tournaments.</p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input 
            type="email" 
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 font-medium" 
            placeholder="Enter your email" 
          />
          <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors">Join Now</button>
        </div>
      </div>
    </section>
  </motion.div>
);

const DashboardView = ({ key }: { key?: string }) => (
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
              <button className="size-8 rounded border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <ChevronLeft className="size-4" />
              </button>
              <button className="size-8 rounded border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Tournament Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOURNAMENTS.map((t) => (
              <div key={t.id} className={`group relative bg-card-dark rounded-2xl overflow-hidden border border-white/5 p-1 transition-all hover:border-${t.color}/50`}>
                <div className="relative h-48 rounded-xl overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                    style={{ backgroundImage: `url(${t.image})` }}
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
              {LEADERBOARD.map((user) => (
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

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/user/me');
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        if (!data.user.username) {
          setShowUsernameModal(true);
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        fetchUser();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth/google/url');
      const { url } = await res.json();
      window.open(url, 'google_auth', 'width=500,height=600');
    } catch (err) {
      console.error('Failed to get auth URL:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setView('landing');
    } catch (err) {
      console.error('Logout failed:', err);
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
      />
      
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <LandingView key="landing" setView={setView} />
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

      <Footer isDashboard={view === 'dashboard'} />
    </div>
  );
}
