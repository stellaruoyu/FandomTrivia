/**
 * MultiplayerQuizView.tsx
 *
 * Real-time multiplayer quiz using Supabase Realtime (Presence + Broadcast).
 *
 * Required Supabase table — run supabase/multiplayer.sql in your Supabase SQL editor
 * before using this feature.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Copy, ArrowLeft, Trophy, Crown, Loader2,
  Play, Check, X, CheckCircle2,
} from 'lucide-react';
import { supabase } from './supabaseClient';
import { MCTriviaQuestion } from './constants';

// ── Types ──────────────────────────────────────────────────────────────────────

interface User {
  id: string;
  username: string | null;
  name: string;
  picture: string;
}

interface PlayerPresence {
  userId: string;
  username: string;
  picture: string;
  progress: number;      // questions answered
  score: number;         // correct count
  finished: boolean;
  completionSecs: number | null;
}

type Phase = 'lobby' | 'joining' | 'waiting' | 'countdown' | 'playing' | 'results';

interface Room {
  id: string;
  code: string;
  hostUserId: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function avatarFallback(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7f13ec&color=fff`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const MultiplayerQuizView = ({
  questions,
  title,
  user,
  onBack,
}: {
  questions: MCTriviaQuestion[];
  title: string;
  user: User | null;
  onBack: () => void;
}) => {
  const [phase, setPhase] = useState<Phase>('lobby');
  const [room, setRoom] = useState<Room | null>(null);
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [players, setPlayers] = useState<PlayerPresence[]>([]);
  const [countdown, setCountdown] = useState(3);
  const [sessionQuestions, setSessionQuestions] = useState<MCTriviaQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<number, 'correct' | 'incorrect'>>({});
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completionSecs, setCompletionSecs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isHost = room?.hostUserId === user?.id;
  const correctCount = Object.values(scores).filter(s => s === 'correct').length;
  const total = sessionQuestions.length;
  const answeredCount = Object.keys(scores).length;

  // ── Presence: push my state whenever it changes during play ──────────────────
  useEffect(() => {
    const ch = channelRef.current;
    if (!ch || !user || (phase !== 'playing' && phase !== 'results')) return;
    ch.track({
      userId: user.id,
      username: user.username ?? user.name,
      picture: user.picture,
      progress: answeredCount,
      score: correctCount,
      finished: phase === 'results',
      completionSecs,
    } satisfies PlayerPresence);
  }, [answeredCount, correctCount, phase, completionSecs, user]);

  // ── Cleanup on unmount ────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, []);

  // ── Game Start Handler (called by host directly + non-hosts via broadcast) ───
  const handleGameStart = (questionOrder: number[]) => {
    const ordered = questionOrder
      .map(i => questions[i])
      .filter(Boolean)
      .map(q => ({ ...q, options: shuffleArray(q.options) }));
    setSessionQuestions(ordered);

    setPhase('countdown');
    setCountdown(3);
    let count = 3;
    countdownTimerRef.current = setInterval(() => {
      count--;
      if (count <= 0) {
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        setCountdown(0); // briefly show "GO!"
        setTimeout(() => {
          setStartTime(Date.now());
          setPhase('playing');
        }, 500);
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  // ── Subscribe to a room channel ───────────────────────────────────────────────
  const subscribeToRoom = async (code: string, roomData: Room) => {
    const ch = supabase.channel(`room:${code}`, {
      config: { presence: { key: user!.id } },
    });

    ch
      .on('presence', { event: 'sync' }, () => {
        const state = ch.presenceState<PlayerPresence>();
        const list = Object.values(state)
          .map(arr => arr[0])
          .filter(Boolean) as PlayerPresence[];
        setPlayers(list);
      })
      .on('broadcast', { event: 'game_start' }, ({ payload }) => {
        // Only non-host players receive this (Supabase doesn't echo broadcasts back)
        handleGameStart(payload.questionOrder as number[]);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await ch.track({
            userId: user!.id,
            username: user!.username ?? user!.name,
            picture: user!.picture,
            progress: 0,
            score: 0,
            finished: false,
            completionSecs: null,
          } satisfies PlayerPresence);
        }
      });

    channelRef.current = ch;
    setRoom(roomData);
    setPhase('waiting');
  };

  // ── Create Room ───────────────────────────────────────────────────────────────
  const handleCreateRoom = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    const code = generateRoomCode();
    try {
      const { data, error: dbErr } = await supabase
        .from('rooms')
        .insert({ code, quiz_id: title, host_user_id: user.id, status: 'waiting' })
        .select()
        .single();
      if (dbErr) throw dbErr;
      await subscribeToRoom(code, {
        id: data.id,
        code: data.code,
        hostUserId: data.host_user_id,
      });
    } catch (e: any) {
      setError(e.message || 'Failed to create room. Make sure the rooms table exists in Supabase.');
    } finally {
      setLoading(false);
    }
  };

  // ── Join Room ─────────────────────────────────────────────────────────────────
  const handleJoinRoom = async () => {
    if (!user || !joinCodeInput.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: dbErr } = await supabase
        .from('rooms')
        .select('*')
        .eq('code', joinCodeInput.toUpperCase().trim())
        .eq('status', 'waiting')
        .single();
      if (dbErr || !data) throw new Error('Room not found or game already started.');
      await subscribeToRoom(data.code, {
        id: data.id,
        code: data.code,
        hostUserId: data.host_user_id,
      });
    } catch (e: any) {
      setError(e.message || 'Failed to join room.');
    } finally {
      setLoading(false);
    }
  };

  // ── Host: Start Game ──────────────────────────────────────────────────────────
  const handleStartGame = async () => {
    if (!isHost || !room || !channelRef.current) return;
    const maxQ = Math.min(20, questions.length);
    const indices = shuffleArray(questions.map((_, i) => i)).slice(0, maxQ);

    // Persist order in DB (so late joiners could theoretically fetch it)
    await supabase
      .from('rooms')
      .update({ status: 'playing', question_order: indices })
      .eq('id', room.id);

    // Broadcast to all other players
    await channelRef.current.send({
      type: 'broadcast',
      event: 'game_start',
      payload: { questionOrder: indices },
    });

    // Host handles start locally (broadcast doesn't echo to sender)
    handleGameStart(indices);
  };

  // ── Answer Handler ────────────────────────────────────────────────────────────
  const handleSelect = (option: string) => {
    if (selected !== null) return;
    setSelected(option);
    const q = sessionQuestions[currentQ];
    const isCorrect = option.toLowerCase() === q.answer.toLowerCase();
    setScores(prev => ({ ...prev, [currentQ]: isCorrect ? 'correct' : 'incorrect' }));
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
    } else {
      const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
      setCompletionSecs(elapsed);
      setPhase('results');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Renders
  // ─────────────────────────────────────────────────────────────────────────────

  // ── Not logged in ─────────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-4 max-w-sm">
          <Users className="size-16 text-slate-600 mx-auto" />
          <h2 className="text-2xl font-black text-white">Login Required</h2>
          <p className="text-slate-400 text-sm">You need to be logged in to play multiplayer.</p>
          <button onClick={onBack} className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm">Go Back</button>
        </div>
      </div>
    );
  }

  // ── Lobby ─────────────────────────────────────────────────────────────────────
  if (phase === 'lobby') {
    return (
      <div className="pt-32 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-5"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm"
          >
            <ArrowLeft className="size-4" /> Back
          </button>

          <div className="bg-card-dark border border-white/10 p-8 rounded-3xl space-y-6">
            <div className="text-center space-y-2">
              <div className="size-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="size-8 text-primary" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">Multiplayer</h2>
              <p className="text-slate-500 text-sm">{title}</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleCreateRoom}
                disabled={loading}
                className="w-full flex items-center gap-4 p-5 bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/20 hover:border-primary/50 rounded-2xl transition-all text-left disabled:opacity-50"
              >
                <div className="size-12 bg-primary/30 rounded-xl flex items-center justify-center shrink-0">
                  {loading ? (
                    <Loader2 className="size-5 text-primary animate-spin" />
                  ) : (
                    <Crown className="size-5 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-white">Create Room</p>
                  <p className="text-xs text-slate-400">Host a game and share the code with friends</p>
                </div>
              </button>

              <button
                onClick={() => { setPhase('joining'); setError(null); }}
                className="w-full flex items-center gap-4 p-5 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/20 hover:border-emerald-500/50 rounded-2xl transition-all text-left"
              >
                <div className="size-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
                  <Users className="size-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold text-white">Join Room</p>
                  <p className="text-xs text-slate-400">Enter a 6-character room code to join friends</p>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Join Room (code input) ────────────────────────────────────────────────────
  if (phase === 'joining') {
    return (
      <div className="pt-32 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full space-y-5"
        >
          <button
            onClick={() => { setPhase('lobby'); setError(null); }}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm"
          >
            <ArrowLeft className="size-4" /> Back
          </button>

          <div className="bg-card-dark border border-white/10 p-8 rounded-3xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white uppercase italic">Enter Room Code</h2>
              <p className="text-slate-500 text-sm">Ask the host for their 6-character code</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <input
                value={joinCodeInput}
                onChange={e => setJoinCodeInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                onKeyDown={e => e.key === 'Enter' && joinCodeInput.length === 6 && handleJoinRoom()}
                placeholder="ABC123"
                maxLength={6}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white text-3xl font-black text-center tracking-[0.6em] placeholder:text-white/15 focus:outline-none focus:ring-2 focus:ring-primary/50 uppercase"
              />
              <button
                onClick={handleJoinRoom}
                disabled={loading || joinCodeInput.length !== 6}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? 'Joining...' : 'Join Game'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Waiting Room ──────────────────────────────────────────────────────────────
  if (phase === 'waiting' && room) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full space-y-4"
        >
          {/* Room Code card */}
          <div className="bg-card-dark border border-white/10 p-6 rounded-3xl text-center space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Room Code</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-5xl font-black text-white tracking-[0.3em]">{room.code}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(room.code).catch(() => {});
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                title="Copy code"
                className="size-10 bg-white/5 hover:bg-white/15 rounded-xl flex items-center justify-center transition-all"
              >
                {copied
                  ? <Check className="size-4 text-emerald-400" />
                  : <Copy className="size-4 text-slate-400" />}
              </button>
            </div>
            <p className="text-slate-500 text-xs">Share this code with friends</p>
          </div>

          {/* Players list */}
          <div className="bg-card-dark border border-white/10 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-white uppercase tracking-wide text-sm flex items-center gap-2">
                <Users className="size-4 text-primary" />
                Players ({players.length})
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Live</span>
              </div>
            </div>

            <div className="min-h-[80px] space-y-2">
              {players.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-4 animate-pulse">Waiting for players to join…</p>
              ) : (
                players.map(p => (
                  <div key={p.userId} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <img
                      src={p.picture || avatarFallback(p.username)}
                      alt={p.username}
                      className="size-8 rounded-full border border-white/10"
                      onError={e => { e.currentTarget.src = avatarFallback(p.username); }}
                    />
                    <span className="font-bold text-white text-sm flex-1">{p.username}</span>
                    {p.userId === room.hostUserId && (
                      <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 rounded-lg px-2 py-0.5">
                        <Crown className="size-3 text-amber-400" />
                        <span className="text-[9px] font-black text-amber-400 uppercase tracking-wider">Host</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {isHost ? (
              <button
                onClick={handleStartGame}
                disabled={players.length < 1}
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-primary/30 disabled:opacity-40 flex items-center justify-center gap-2"
              >
                <Play className="size-4 fill-current" />
                Start Game
              </button>
            ) : (
              <div className="text-center py-2">
                <p className="text-slate-400 text-sm font-medium animate-pulse">
                  Waiting for the host to start the game…
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Countdown ────────────────────────────────────────────────────────────────
  if (phase === 'countdown') {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={countdown}
            initial={{ scale: 2.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`font-black leading-none select-none ${
              countdown === 0
                ? 'text-8xl text-emerald-400'
                : 'text-[12rem] text-primary'
            }`}
          >
            {countdown === 0 ? 'GO!' : countdown}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ── Playing ───────────────────────────────────────────────────────────────────
  if (phase === 'playing' && sessionQuestions.length > 0) {
    const q = sessionQuestions[currentQ];
    const isAnswered = selected !== null || scores[currentQ] !== undefined;
    const isLastQ = currentQ === total - 1;

    return (
      <div className="pt-28 pb-20 px-6 relative">
        {/* Live Race Panel (top-right) */}
        <div className="absolute top-4 right-4 z-[60] w-60 md:w-72 pointer-events-none">
          <div className="bg-black/70 border border-white/10 backdrop-blur-xl rounded-2xl p-3 space-y-2 shadow-2xl">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 text-center pb-1 border-b border-white/5">
              Live Race
            </p>
            {players.map(p => {
              const pct = total > 0 ? Math.min((p.progress / total) * 100, 100) : 0;
              const isMe = p.userId === user.id;
              return (
                <div key={p.userId} className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[9px] font-black uppercase tracking-tight truncate max-w-[6rem] ${isMe ? 'text-primary' : 'text-slate-300'}`}>
                      {isMe ? 'You' : p.username}
                    </span>
                    <span className={`text-[9px] font-bold tabular-nums shrink-0 ${isMe ? 'text-primary' : 'text-slate-400'}`}>
                      {p.score}/{total}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${pct}%` }}
                      transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                      className={`h-full rounded-full ${isMe ? 'bg-primary' : 'bg-red-500'}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiz */}
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold text-slate-400">
              <span>Question {currentQ + 1} of {total}</span>
              <span>{correctCount} correct</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((currentQ + (isAnswered ? 1 : 0)) / total) * 100}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <h2 className="text-xl md:text-2xl font-black text-white leading-tight">{q.question}</h2>

            <div className="grid grid-cols-1 gap-3">
              {q.options.map((opt, i) => {
                const label = ['A', 'B', 'C', 'D'][i] ?? String(i + 1);
                const isSelected = selected === opt;
                const isCorrect = opt.toLowerCase() === q.answer.toLowerCase();

                let cls = 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25 cursor-pointer';
                if (isAnswered) {
                  if (isCorrect) cls = 'bg-emerald-500/20 border-emerald-500/60';
                  else if (isSelected) cls = 'bg-red-500/20 border-red-500/60';
                  else cls = 'bg-white/5 border-white/5 opacity-40 cursor-default';
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    disabled={isAnswered}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${cls}`}
                  >
                    <span className="size-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-black text-white shrink-0">
                      {label}
                    </span>
                    <span className="font-bold text-white text-sm flex-1 leading-snug">{opt}</span>
                    {isAnswered && isCorrect && <Check className="size-4 text-emerald-400 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <X className="size-4 text-red-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Evidence */}
            {isAnswered && q.evidence && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <p className="text-xs text-slate-400 leading-relaxed italic">💡 {q.evidence}</p>
              </motion.div>
            )}

            {isAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <button
                  onClick={handleNext}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-primary/30"
                >
                  {isLastQ ? 'See Results' : 'Next Question'}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Results ───────────────────────────────────────────────────────────────────
  if (phase === 'results') {
    const myTotal = total > 0 ? total : 1;
    const sortedPlayers = [...players].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const aTime = a.completionSecs ?? Infinity;
      const bTime = b.completionSecs ?? Infinity;
      return aTime - bTime;
    });
    const medals = ['🥇', '🥈', '🥉'];

    return (
      <div className="pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto space-y-6"
        >
          <div className="text-center space-y-2">
            <Trophy className="size-14 text-amber-400 mx-auto drop-shadow-lg" />
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tight">Final Results</h2>
            <p className="text-slate-500 text-sm">{title}</p>
          </div>

          {/* My score summary */}
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary/70">Your Score</p>
              <p className="text-3xl font-black text-white">
                {correctCount}
                <span className="text-base text-slate-400">/{myTotal}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Accuracy</p>
              <p className="text-2xl font-black text-primary">{Math.round((correctCount / myTotal) * 100)}%</p>
            </div>
            {completionSecs !== null && (
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Time</p>
                <p className="text-2xl font-black text-white">{formatTime(completionSecs)}</p>
              </div>
            )}
          </div>

          {/* Rankings */}
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">Rankings</p>
            {sortedPlayers.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">
                No player data — presence may have disconnected.
              </p>
            ) : (
              sortedPlayers.map((p, idx) => {
                const isMe = p.userId === user.id;
                return (
                  <div
                    key={p.userId}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                      isMe
                        ? 'bg-primary/10 border-primary/30'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <span className="text-2xl w-8 text-center shrink-0">
                      {medals[idx] ?? `#${idx + 1}`}
                    </span>
                    <img
                      src={p.picture || avatarFallback(p.username)}
                      alt={p.username}
                      className="size-10 rounded-full border border-white/10 shrink-0"
                      onError={e => { e.currentTarget.src = avatarFallback(p.username); }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm truncate ${isMe ? 'text-primary' : 'text-white'}`}>
                        {p.username}{isMe ? ' (You)' : ''}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {p.finished && p.completionSecs !== null
                          ? formatTime(p.completionSecs)
                          : p.finished
                          ? 'Finished'
                          : 'Still playing…'}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-black text-white">
                        {p.score}
                        <span className="text-xs text-slate-500">/{total > 0 ? total : '?'}</span>
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {total > 0 ? Math.round((p.score / total) * 100) : 0}%
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <button
            onClick={onBack}
            className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Mode Selection
          </button>
        </motion.div>
      </div>
    );
  }

  return null;
};
