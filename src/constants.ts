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

// --- Trivia Types ---

export interface TriviaQuestion {
  id: number;
  question: string;
  answer: string;
  insight: string;
}

// --- Twilight Trivia: Volume I (Chapters 1-8) ---

export const TWILIGHT_TRIVIA: TriviaQuestion[] = [
  {
    id: 1,
    question: 'What is the total student population of Forks High School upon Bella\'s arrival?',
    answer: '358 (357 plus Bella).',
    insight: 'The microscopic school size amplifies Bella\'s status as a "curiosity" and a "freak."',
  },
  {
    id: 2,
    question: 'What specific shirt did Bella wear as a "farewell gesture" to Phoenix?',
    answer: 'A sleeveless, white eyelet lace shirt.',
    insight: 'This highlights the physiological and logistical impracticality of her Arizona life for the Washington climate.',
  },
  {
    id: 3,
    question: 'What is Bella\'s specific height as recorded in the text?',
    answer: 'Five feet four inches.',
    insight: 'This detail establishes her physical stature relative to the more "statuesque" Rosalie or the "pixielike" Alice.',
  },
  {
    id: 4,
    question: 'Who sold the 1953 Chevrolet truck to Charlie Swan?',
    answer: 'Billy Black from La Push.',
    insight: 'The truck\'s origin establishes the foundational link between the Swan family and the Quileute tribe.',
  },
  {
    id: 5,
    question: 'What three scents define the interior of Bella\'s truck?',
    answer: 'Tobacco, gasoline, and peppermint.',
    insight: 'These olfactory markers ground the vehicle in a lived-in, human history, contrasting with the Cullens\' "shiny" silver Volvo.',
  },
  {
    id: 6,
    question: 'What were the three specific slides identified by Bella and Edward in the mitosis lab?',
    answer: 'Prophase, Anaphase, and Interphase.',
    insight: 'Their intellectual compatibility is confirmed as they finish the lab before any other student pairs.',
  },
  {
    id: 7,
    question: 'What physical sensation does Bella describe when Edward\'s hand accidentally touches hers during the lab?',
    answer: 'It stings like an electric current.',
    insight: 'This physiological reaction hints at the intense and potentially volatile energy between the two species.',
  },
  {
    id: 8,
    question: 'What does Bella smell when she is in the presence of blood?',
    answer: 'Rust and salt.',
    insight: 'This sensory detail explains her visceral, near-fainting reaction during the blood-typing lab.',
  },
  {
    id: 9,
    question: 'Which Jane Austen novels does Bella read in her backyard to pass the time?',
    answer: 'Sense and Sensibility and Mansfield Park.',
    insight: 'Bella\'s preference for Austen highlights her internal focus on complex romantic and social dynamics.',
  },
  {
    id: 10,
    question: 'Where specifically do the Cullens go "camping" to avoid human observation on sunny days?',
    answer: 'Goat Rocks Wilderness, south of Rainier.',
    insight: 'Charlie notes this is a poor camping spot due to bears, unwittingly identifying the Cullens\' hunting preferences.',
  },
  {
    id: 11,
    question: 'What is the first name of Bella\'s mother\'s new husband, the minor-league baseball player?',
    answer: 'Phil.',
    insight: 'Phil\'s career is the "strategic" reason for Bella\'s move to Forks, as she wanted her mother to be happy traveling with him.',
  },
  {
    id: 12,
    question: 'What color was the van that nearly hit Bella in the school parking lot?',
    answer: 'Dark blue.',
    insight: 'This vehicle is the primary instrument of the first major supernatural display in the narrative.',
  },
  {
    id: 13,
    question: 'How does Bella metaphorically describe her heavy rain jacket?',
    answer: 'Her "biohazard suit."',
    insight: 'This vocabulary choice emphasizes her intense distaste for the "geographical exile" of the rain-soaked environment.',
  },
  {
    id: 14,
    question: 'In Chapter 5, how does Bella describe her own transparency to Edward?',
    answer: 'She calls herself an "open book."',
    insight: 'This quote is ironic, as Edward finds her the only mind he cannot read—the one book he cannot open.',
  },
  {
    id: 15,
    question: 'What is Edward\'s assessment of Bella when she claims she isn\'t a "magnet for accidents"?',
    answer: 'He calls her a "magnet for trouble."',
    insight: 'This defines the predator\'s view of the subject as someone who attracts danger across a ten-mile radius.',
  },
  {
    id: 16,
    question: 'What "hypothetical" framework does Edward use to explain his presence in Port Angeles?',
    answer: 'He suggests a hypothetical person named "Joe" who can read minds.',
    insight: 'This allows Edward to confess his telepathy while maintaining a thin veneer of "hypothetical" deniability.',
  },
  {
    id: 17,
    question: 'What is the name of the teacher who conducts the blood typing lab?',
    answer: 'Mr. Banner.',
    insight: 'This lab serves as a critical stress test for Bella\'s physical reactions and Edward\'s self-control.',
  },
  {
    id: 18,
    question: 'What does Edward call his decision to stop ignoring Bella and sit with her?',
    answer: '"Giving up trying to be good."',
    insight: 'This indicates a strategic shift in his behavior, prioritizing his desires over the safety of isolation.',
  },
  {
    id: 19,
    question: 'What specific mythological term does Jacob Black use for vampires?',
    answer: 'The "Cold Ones."',
    insight: 'This terminology reflects the Quileute perspective on the physiological marker of the Cullens\' ice-cold skin.',
  },
  {
    id: 20,
    question: 'Which Cullen sibling is described as "pixielike" with "lithe" movements?',
    answer: 'Alice Cullen.',
    insight: 'Alice\'s description as a "dancer" emphasizes the inhuman grace common to the Cullen "pack."',
  },
  {
    id: 21,
    question: 'What did Bella order to eat at La Bella Italia?',
    answer: 'Mushroom ravioli.',
    insight: 'Bella consumes fungi-based nutrients while Edward drinks only liquid (Coke/water), emphasizing the predator-prey metabolic divide.',
  },
  {
    id: 22,
    question: 'Who was the tribal elder who originally made the treaty with the Cullens?',
    answer: 'Jacob Black\'s great-grandfather.',
    insight: 'This lineage makes Jacob the primary gatekeeper of the "Source Context" regarding the Cullens\' true nature.',
  },
  {
    id: 23,
    question: 'What color were Edward\'s eyes on the day of the van accident?',
    answer: 'A golden butterscotch or ocher.',
    insight: 'The shift from black to gold is a physiological marker of the vampire\'s dietary status (recent feeding).',
  },
  {
    id: 24,
    question: 'What does Bella say to Edward when he insists that "life isn\'t fair"?',
    answer: 'She laughs without humor and notes that she\'s heard that somewhere before.',
    insight: 'This exchange establishes their shared cynical worldview, further bonding the human and the vampire.',
  },
  {
    id: 25,
    question: 'What music does Edward play in his Volvo on the drive back from Port Angeles?',
    answer: 'Debussy\'s "Clair de Lune."',
    insight: 'This shared appreciation for classical complexity serves to "humanize" the predator in Bella\'s eyes.',
  },
  {
    id: 26,
    question: 'What does Edward use as a "normal" alibi for being near the office when Bella fainted?',
    answer: 'He claimed he was in his car "listening to a CD."',
    insight: 'This is a calculated, mundane excuse used to mask his vigilant monitoring of her thoughts and safety.',
  },
  {
    id: 27,
    question: 'What did Charlie put on Bella\'s truck to help with the "black ice"?',
    answer: 'Snow chains.',
    insight: 'This act of paternal care provides Bella with a rare sense of being "taken care of," contrasting with her role as the "adult" in Phoenix.',
  },
  {
    id: 28,
    question: 'What were the names of the two "Hale" siblings who are foster children to the Cullens?',
    answer: 'Rosalie and Jasper.',
    insight: 'The Hale surname is a strategic social construct to explain why these two do not resemble the other "adopted" children.',
  },
  {
    id: 29,
    question: 'What does Edward tell Bella is "all about who you know" regarding her release from the hospital?',
    answer: 'Getting "sprung" from the ER.',
    insight: 'This highlights the Cullens\' influence within the Forks community, as Dr. Cullen is a "brilliant surgeon."',
  },
  {
    id: 30,
    question: 'What is the specific location where Mike Newton\'s group meets before the beach trip?',
    answer: 'Newton\'s Olympic Outfitters.',
    insight: 'This setting reinforces Mike\'s "golden retriever" identity as a child of the local business class.',
  },
];
