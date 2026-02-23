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
    image: 'https://picsum.photos/seed/kpop-neon/800/1000',
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
    image: 'https://picsum.photos/seed/kpop-demon/600/400',
    color: 'purple-500'
  }
];

// Leaderboard entry type
export interface LeaderboardEntry {
  id: string;
  name: string;
  fandom: string;
  points: string;
  initials: string;
  color: string;
  score: number;
}

const LEADERBOARD_COLORS = [
  'from-amber-400 to-amber-600',
  'from-slate-300 to-slate-500',
  'from-orange-400 to-orange-600',
  'from-purple-400 to-purple-600',
  'from-blue-400 to-blue-600',
];

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem('fandomtrivia_scores');
    if (!raw) return [];
    const scores: { name: string; score: number; total: number; quiz: string; date: string }[] = JSON.parse(raw);
    // Aggregate best score per player
    const best: Record<string, { score: number; quiz: string }> = {};
    for (const s of scores) {
      if (!best[s.name] || s.score > best[s.name].score) {
        best[s.name] = { score: s.score, quiz: s.quiz };
      }
    }
    return Object.entries(best)
      .sort((a, b) => b[1].score - a[1].score)
      .slice(0, 5)
      .map(([name, data], i) => ({
        id: String(i + 1).padStart(2, '0'),
        name,
        fandom: data.quiz,
        points: data.score.toLocaleString(),
        initials: name.slice(0, 2).toUpperCase(),
        color: LEADERBOARD_COLORS[i % LEADERBOARD_COLORS.length],
        score: data.score,
      }));
  } catch {
    return [];
  }
}

export function saveScore(name: string, score: number, total: number, quiz: string) {
  try {
    const raw = localStorage.getItem('fandomtrivia_scores');
    const scores = raw ? JSON.parse(raw) : [];
    scores.push({ name, score, total, quiz, date: new Date().toISOString() });
    localStorage.setItem('fandomtrivia_scores', JSON.stringify(scores));
  } catch {
    // silently fail
  }
}

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

// --- Multiple Choice Trivia Type ---

export interface MCTriviaQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

// --- K-Pop: Demon Hunters Trivia ---

export const KPOP_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "What was the name of the singing (and demon-hunting) group that Celine was part of?",
    options: ["Moonlight Maidens", "Sunlight Sisters", "Starlight Songbirds", "Twilight Trio"],
    answer: "Sunlight Sisters",
  },
  {
    id: 2,
    question: "What did Mira wear to the Met Gala?",
    options: ["Bird cage", "Garbage bag", "Sleeping bag", "Christmas lights"],
    answer: "Sleeping bag",
  },
  {
    id: 3,
    question: "When Jinu tells Gwi-Ma about wanting to form a boyband to take down Huntr/x, what does Jinu want in return?",
    options: ["A Record Contract", "To become mortal", "His memories erased", "His Freedom", "To reunite with his mom and sister", "Fame And Fortune", "The ability to see the future"],
    answer: "His memories erased",
  },
  {
    id: 4,
    question: "When she first drools over the Saja Boys, which of these things do Zoey's eyes NOT turn into?",
    options: ["Waterfall", "Corn", "Abs", "Hearts"],
    answer: "Waterfall",
  },
  {
    id: 5,
    question: "Finish these lyrics: \"You're all I can think of / Every _____________.\"",
    options: ["Day I Wake Up", "Beat Of My Heart", "drop I drink up", "Moment I See You"],
    answer: "???",
  },
  {
    id: 6,
    question: "Which member of the Saja Boys wins the Spicy Challenge while appearing on Play Games with Us?",
    options: ["Abby", "Baby", "Romance", "Mystery"],
    answer: "???",
  },
  {
    id: 7,
    question: "When they first meet, what does Derpy Tiger give Rumi?",
    options: ["A bracelet from Jinu", "A plant", "A stuffed animal", "A note from Jinu"],
    answer: "???",
  },
  {
    id: 8,
    question: "What's depicted on Rumi's pajama pants that Jinu makes fun of?",
    options: ["Smiley faces and penguins", "Hearts and otters", "Elephants and cookies", "Teddy bears and trains"],
    answer: "???",
  },
  {
    id: 9,
    question: "At the signing event, what does a young fan give Jinu?",
    options: ["A drawing", "Homemade cookies", "A bouquet of roses", "A Jinu doll"],
    answer: "???",
  },
  {
    id: 10,
    question: "Bobby reveals which member of Huntr/x is Mystery shipped with on the internet?",
    options: ["Rumi", "Mira", "Zoey", "Mira and Zoey"],
    answer: "???",
  },
  {
    id: 11,
    question: "Where did Jinu's bird get its hat?",
    options: ["From The Monkey", "Found it in a forest", "Traded For Berries", "Traded their soul for it", "Found It In Forest", "Took it off of one of Zoey's toys", "Stole it from the tiger"],
    answer: "???",
  },
  {
    id: 12,
    question: "Finish these lyrics: \"We dreamin' hard, we came so far _________.\"",
    options: ["We Can't Turn Back", "Now I believe", "We're Reaching Stars", "We'll Never Stop", "Now I can achieve"],
    answer: "???",
  },
  {
    id: 13,
    question: "What's the last thing Jinu tells Rumi?",
    options: ["\"You gave me my soul back.\"", "\"You were right.\"", "\"And now, I give it to you.\"", "\"You were more important.\""],
    answer: "???",
  },
];

// --- Twilight: Multiple Choice (Preface – Chapter 8) ---

export const TWILIGHT_MC_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "According to Charlie, what is the specific manufacturing history and ownership timeline of Bella's truck?",
    options: [
      "Billy Black bought it new from a dealership in 1984.",
      "Charlie purchased it new in 1984 as a surprise for Bella's arrival.",
      "Billy Black bought it in 1984, but it was manufactured in the late 1950s or early 1960s.",
      "It was a custom-built 1970s model that Billy Black had restored for off-road use."
    ],
    answer: "Billy Black bought it in 1984, but it was manufactured in the late 1950s or early 1960s.",
  },
  {
    id: 2,
    question: "Which of the following best describes Bella's aesthetic and physical self-assessment during her move to Forks?",
    options: [
      "She is a tan, athletic volleyball player who struggles with the sudden drop in humidity.",
      "She is ivory-skinned and lacks hand-eye coordination, despite the constant sunshine of her Phoenix life.",
      "She possesses blue eyes and red hair, making her look healthier in the overcast light of Washington.",
      "She is a former cheerleader whose tan has faded significantly during the four-hour flight."
    ],
    answer: "She is ivory-skinned and lacks hand-eye coordination, despite the constant sunshine of her Phoenix life.",
  },
  {
    id: 3,
    question: "What specific 'anatomical anomaly' does Bella identify as a shared trait among all five Cullen/Hale siblings in the cafeteria?",
    options: [
      "They all possess identical, unnaturally golden-colored hair.",
      "They all exhibit 'purplish, bruiselike shadows' beneath their very dark eyes.",
      "They all have flushed, rosy complexions due to the cold, damp climate.",
      "They all appear to be biologically related despite Jessica's claims of adoption."
    ],
    answer: "They all exhibit 'purplish, bruiselike shadows' beneath their very dark eyes.",
  },
  {
    id: 4,
    question: "During a Biology II lab session, Bella observes a striking change in Edward's eyes compared to their first encounter. What is the nature of this shift?",
    options: [
      "His eyes shifted from a bright, glowing red to a flat, dull gray.",
      "His eyes changed from 'golden honey' to a 'coal black.'",
      "His eyes changed from 'flat black' to a 'strange ocher, darker than butterscotch.'",
      "His eyes shifted from 'pale green' to a 'piercing, electric blue.'"
    ],
    answer: "His eyes changed from 'flat black' to a 'strange ocher, darker than butterscotch.'",
  },
  {
    id: 5,
    question: "While attempting to distract herself in the backyard, Bella selects a specific volume from her collection. Which book does she choose?",
    options: [
      "A pristine, new copy of Wuthering Heights.",
      "A shabbily bound compilation of the works of Jane Austen.",
      "A leather-bound edition of Macbeth annotated by her mother.",
      "A modern paperback regarding Quileute tribal folklore."
    ],
    answer: "A shabbily bound compilation of the works of Jane Austen.",
  },
  {
    id: 6,
    question: "True or False: Forks, Washington, holds a statistical distinction within the United States for having the highest annual rainfall of any location.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    id: 7,
    question: "True or False: According to the Quileute legends shared by Jacob Black, the tribe claims direct ancestral descent from bears.",
    options: ["True", "False"],
    answer: "False",
  },
  {
    id: 8,
    question: "True or False: Bella discovers the term 'Stregoni benefici' through a digital search, which describes an Italian vampire myth focused on goodness.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    id: 9,
    question: "True or False: The specific student population count at Forks High School, including Bella Swan, is exactly 358.",
    options: ["True", "False"],
    answer: "True",
  },
  {
    id: 10,
    question: "True or False: Edward Cullen admits that his presence in Port Angeles was due to his ability to track Bella's physical scent across the city.",
    options: ["True", "False"],
    answer: "False",
  },
];
