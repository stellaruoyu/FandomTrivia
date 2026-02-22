import { Trophy, Users, Zap, Search, PlayCircle, ArrowRight, Star, ChevronLeft, ChevronRight, Share2, Globe, MessageSquare, ExternalLink } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Leaderboards', href: '#' },
  { name: 'Categories', href: '#' },
];

export const DASHBOARD_NAV_LINKS = [
  { name: 'Dashboard', href: '#', active: true },
  { name: 'Tournaments', href: '#' },
  { name: 'Pro Rankings', href: '#' },
  { name: 'Marketplace', href: '#' },
];

export const UNIVERSES = [
  {
    id: 'twilight',
    title: 'Twilight',
    tags: ['Fantasy', 'Mystery'],
    description: 'Misty forests & eternal secrets. Relive the saga of Forks and the Olympic Coven.',
    image: 'https://picsum.photos/seed/twilight/800/1000',
    buttonText: 'Enter Forks',
    icon: 'Droplets'
  },
  {
    id: 'harry-potter',
    title: 'Harry Potter',
    tags: ['Magic', 'Classic'],
    description: "Magic, mystery, and the Wizarding World. Prove you're a true Gryffindor or a cunning Slytherin.",
    image: 'https://picsum.photos/seed/potter/800/1000',
    buttonText: 'Begin Spellcasting',
    icon: 'Wand2'
  },
  {
    id: 'kpop',
    title: 'K-Pop: Demon Hunters',
    tags: ['Neon', 'Hot'],
    description: 'High-energy beats & supernatural hunts. Test your rhythm and hunter instincts.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9iY-vK6_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S',
    buttonText: 'Join the Hunt',
    icon: 'Zap',
    isSpecial: true
  }
];

export const TOURNAMENTS = [
  {
    id: 1,
    title: 'Twilight: Eternal',
    pool: '$2,500 Pool',
    players: '1,240',
    progress: 65,
    image: 'https://picsum.photos/seed/twilight-t/600/400',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Potter: Master',
    pool: '5,000 Gems',
    players: '3,892',
    progress: 82,
    image: 'https://picsum.photos/seed/potter-t/600/400',
    color: 'accent'
  },
  {
    id: 3,
    title: 'K-Pop: Demon',
    pool: 'Rare NFT Skin',
    players: '814',
    progress: 24,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9iY-vK6_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S1_6S',
    color: 'purple-500'
  }
];

export const LEADERBOARD = [
  { id: '01', name: 'Lazer_Wolf', fandom: 'Hogwarts Legacy', points: '12,842', initials: 'LZ', color: 'from-amber-400 to-amber-600' },
  { id: '02', name: 'Nexus_Player', fandom: 'Cullen Fanatic', points: '11,201', initials: 'NX', color: 'from-slate-300 to-slate-500' },
  { id: '03', name: 'DemonHunter_7', fandom: 'K-Pop Pro', points: '10,559', initials: 'DH', color: 'from-orange-400 to-orange-600' },
  { id: '04', name: 'StarlightVibe', fandom: 'Multi-Stanning', points: '9,820', initials: 'SV', color: 'bg-white/5' },
];
