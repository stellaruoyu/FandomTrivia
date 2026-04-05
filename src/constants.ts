import { Trophy, Users, Zap, Search, PlayCircle, ArrowRight, Star, ChevronLeft, ChevronRight, Share2, Globe, MessageSquare, ExternalLink, Snowflake, Sparkles } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'Leaderboards', href: '#' },
  { name: 'Categories', href: '#' },
  { name: 'News & Blog', href: '/blog/super-mario-quiz' },
];

export const DASHBOARD_NAV_LINKS = [
  { name: 'Dashboard', href: '#', active: true },
  { name: 'Tournaments', href: '#' },
  { name: 'Pro Rankings', href: '#' },
  { name: 'Marketplace', href: '#' },
];

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  // We'll evaluate conditions dynamically, so we can use a string identifying the requirement type
  targetQuiz?: string;
  targetScore?: number;
  isUniverseCompletion?: boolean; 
  imageUrl?: string;
}

export const BADGES: Badge[] = [
  {
    id: 'first_blood',
    name: 'First Blood',
    description: 'Complete your first quiz.',
    icon: 'Droplets',
    color: 'text-red-400'
  },
  {
    id: 'perfect_score',
    name: 'Perfectionist',
    description: 'Get a 100% perfect score on any quiz.',
    icon: 'Star',
    color: 'text-amber-400'
  },
  {
    id: 'twilight_fan',
    name: 'Forks Resident',
    description: 'Complete any Twilight universe quiz.',
    icon: 'Droplets', // Or moon/apple depending on what's available
    color: 'text-slate-300',
    targetQuiz: 'twilight'
  },
  {
    id: 'potter_head',
    name: 'Hogwarts Student',
    description: 'Complete any Harry Potter universe quiz.',
    icon: 'Wand2',
    color: 'text-amber-500',
    targetQuiz: 'harry-potter'
  },
  {
    id: 'kpop_stan',
    name: 'Demon Hunter',
    description: 'Complete the K-Pop Demon Hunters quiz.',
    icon: 'Zap',
    color: 'text-purple-400',
    targetQuiz: 'kpop'
  },
  {
    id: 'three_body_expert',
    name: 'Wallfacer',
    description: 'Complete any Three-Body Problem quiz.',
    icon: 'Globe',
    color: 'text-indigo-400',
    targetQuiz: 'three-body'
  },
  {
    id: 'zootopia_cop',
    name: 'ZPD Officer',
    description: 'Complete any Zootopia quiz.',
    icon: 'Search',
    color: 'text-green-400',
    targetQuiz: 'zootopia'
  },
  {
    id: 'minion_master',
    name: 'Minion Master',
    description: 'Complete any Despicable Me universe quiz.',
    icon: 'Zap',
    color: 'text-yellow-400',
    targetQuiz: 'despicable-me'
  },
  {
    id: 'zootopia-master',
    name: 'Zootopia Master',
    description: 'Solve all Zootopia 2 mysteries.',
    icon: 'Search',
    color: 'text-blue-400',
    targetQuiz: 'zootopia-2'
  },
  {
    id: 'ice-master',
    name: 'Ice Master',
    description: 'Thaw the frozen heart of Arendelle.',
    icon: 'Star',
    color: 'text-sky-300',
    targetQuiz: 'frozen'
  },
  {
    id: 'riddle_solver',
    name: 'Mystery Solver',
    description: 'Solved the "Who am I?" Daily Riddle.',
    icon: 'Lightbulb',
    color: 'text-indigo-400'
  }
];

export const UNIVERSES = [
  {
    id: 'twilight',
    title: 'Twilight',
    tags: ['Fantasy', 'Mystery'],
    description: 'Misty forests & eternal secrets. Relive the saga of Forks and the Olympic Coven.',
    image: '/images/Cullen Family.jpg',
    seoAlt: 'The Cullen family from the Twilight Saga in a misty forest',
    buttonText: 'Enter Forks',
    icon: 'Droplets'
  },
  {
    id: 'harry-potter',
    title: 'Harry Potter',
    tags: ['Magic', 'Classic'],
    description: "Magic, mystery, and the Wizarding World. Prove you're a true Gryffindor or a cunning Slytherin.",
    image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg',
    seoAlt: 'Harry Potter, Hermione Granger and Ron Weasley at Hogwarts',
    buttonText: 'Begin Spellcasting',
    icon: 'Wand2'
  },
  {
    id: 'kpop',
    title: 'K-Pop: Demon Hunters',
    tags: ['Neon', 'Hot'],
    description: 'High-energy beats & supernatural hunts. Test your rhythm and hunter instincts.',
    image: '/images/Soda Pop and How It\'s Done.jpg',
    buttonText: 'Join the Hunt',
    icon: 'Zap',
    isSpecial: true
  },
  {
    id: 'three-body',
    title: 'The Three-Body Problem',
    tags: ['Sci-Fi', 'Cosmic'],
    description: 'Navigate the Dark Forest, survive the Trisolaran crisis, and explore higher dimensions.',
    image: '/images/threebody.jpg',
    seoAlt: 'Trisolaran cosmic landscape from The Three-Body Problem',
    buttonText: 'Enter the Dark Forest',
    icon: 'Search'
  },
  {
    id: 'zootopia',
    title: 'Zootopia',
    tags: ['Animation', 'Mystery'],
    description: 'Anyone can be anything. Uncover conspiracies and explore the urban jungle.',
    image: '/images/zootopia.jpg',
    seoAlt: 'Judy Hopps and Nick Wilde in Zootopia city',
    buttonText: 'Enter the Urban Jungle',
    icon: 'Search'
  },
  {
    id: 'despicable-me',
    title: 'Despicable Me',
    tags: ['Animation', 'Comedy'],
    description: 'Bello! Join Gru, the Minions, and the girls in their hilarious heist to steal the moon and save the world.',
    image: '/images/despicable-me.jpg',
    seoAlt: 'Gru and the Minions from Despicable Me',
    buttonText: 'Join the Minions',
    icon: 'Zap'
  },
  {
    id: 'frozen',
    title: 'Frozen',
    tags: ['Animation', 'Musical', 'Disney'],
    description: 'Journey to Arendelle and the Enchanted Forest. Test your knowledge on Elsa, Anna, and the elemental spirits.',
    image: '/images/frozen.jpg',
    seoAlt: 'Elsa, Anna and Olaf in the kingdom of Arendelle',
    buttonText: 'Join the Sisters',
    icon: 'Snowflake'
  },
  {
    id: 'super-mario',
    title: 'Super Mario',
    tags: ['Animation', 'Adventure', 'Nintendo'],
    description: 'Enter the Mushroom Kingdom and the Cosmos. Explore the cinematic journey of Mario, Peach, and Rosalina.',
    image: '/images/supermario.jpg', // Placeholder for now, I'll update it in the next step
    buttonText: 'Jump into Action',
    icon: 'Star'
  }
];

export const TOURNAMENTS = [
  {
    id: 1,
    title: 'Twilight: Eternal',
    pool: '$2,500 Pool',
    players: '1,240',
    progress: 65,
    image: '/images/Cullen Family.jpg',
    color: 'primary'
  },
  {
    id: 2,
    title: 'Potter: Master',
    pool: '5,000 Gems',
    players: '3,892',
    progress: 82,
    image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg',
    color: 'accent'
  },
  {
    id: 3,
    title: 'K-Pop: Demon',
    pool: 'Rare NFT Skin',
    players: '814',
    progress: 24,
    image: '/images/Soda Pop and How It\'s Done.jpg',
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
  evidence?: string;
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
    answer: "drop I drink up",
    evidence: "From \"Soda Pop\" by the Saja Boys: \"You're all I can think of / Every drop I drink up.\" The song plays during a key performance scene in the film.",
  },
  {
    id: 6,
    question: "Which member of the Saja Boys wins the Spicy Challenge while appearing on Play Games with Us?",
    options: ["Abby", "Baby", "Romance", "Mystery"],
    answer: "Baby",
    evidence: "During the \"Who Can Chug the Most Hot Sauce?\" segment on Play Games with Us, Baby (the maknae of the Saja Boys) wins by beating the co-host in the hot sauce drinking contest.",
  },
  {
    id: 7,
    question: "When they first meet, what does Derpy Tiger give Rumi?",
    options: ["A bracelet from Jinu", "A plant", "A stuffed animal", "A note from Jinu"],
    answer: "A note from Jinu",
    evidence: "Derpy Tiger serves as a messenger between Jinu and Rumi. When they first meet, Derpy delivers a note from Jinu to Rumi, establishing the tiger as their communication link.",
  },
  {
    id: 8,
    question: "What's depicted on Rumi's pajama pants that Jinu makes fun of?",
    options: ["Smiley faces and penguins", "Hearts and otters", "Elephants and cookies", "Teddy bears and trains"],
    answer: "Teddy bears and trains",
    evidence: "Rumi wears \"Choo Choo Train\" pajama pants featuring teddy bears and trains. Jinu teases her about them when they first interact, played for comedic effect while subtly foreshadowing his personality.",
  },
  {
    id: 9,
    question: "At the signing event, what does a young fan give Jinu?",
    options: ["A drawing", "Homemade cookies", "A bouquet of roses", "A Jinu doll"],
    answer: "A drawing",
    evidence: "A young fan gives Jinu a hand-drawn picture at the signing event, telling him she believes he has a \"beautiful soul.\" This moment is emotionally significant for Jinu's character arc.",
  },
  {
    id: 10,
    question: "Bobby reveals which member of Huntr/x is Mystery shipped with on the internet?",
    options: ["Rumi", "Mira", "Zoey", "Mira and Zoey"],
    answer: "Zoey",
    evidence: "Bobby reveals that fans on the internet ship Mystery with Zoey. Mystery is shown to have a crush on Zoey, and he briefly appears as a love interest for her in the film.",
  },
  {
    id: 11,
    question: "Where did Jinu's bird get its hat?",
    options: ["From The Monkey", "Found it in a forest", "Traded For Berries", "Traded their soul for it", "Found It In Forest", "Took it off of one of Zoey's toys", "Stole it from the tiger"],
    answer: "Stole it from the tiger",
    evidence: "Sussie the Magpie stole the traditional Korean gat hat from Derpy Tiger. Jinu made the hat for the tiger, but Sussie keeps taking it — a reference to the Korean \"Kkachi Horangi\" folk art tradition where the magpie outsmarts the tiger.",
  },
  {
    id: 12,
    question: "Finish these lyrics: \"We dreamin' hard, we came so far _________.\"",
    options: ["We Can't Turn Back", "Now I believe", "We're Reaching Stars", "We'll Never Stop", "Now I can achieve"],
    answer: "Now I believe",
    evidence: "From \"Golden\" by Huntrix (HUNTR/X): \"We dreamin' hard, we came so far / Now I believe.\" This is the pre-chorus of the film's signature anthem.",
  },
  {
    id: 13,
    question: "What's the last thing Jinu tells Rumi?",
    options: ["\"You gave me my soul back.\"", "\"You were right.\"", "\"And now, I give it to you.\"", "\"You were more important.\""],
    answer: "\"And now, I give it to you.\"",
    evidence: "Jinu's final words to Rumi are: \"You gave me my soul back. And now, I give it to you.\" The last sentence — \"And now, I give it to you\" — is the very last thing he says before his sacrifice.",
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
    evidence: '"He bought it in 1984, I think… Well, no. I think it was new in the early sixties or late fifties at the earliest," he admitted sheepishly. — Chapter 1',
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
    evidence: '"Instead, I was ivory-skinned, without even the excuse of blue eyes or red hair, despite the constant sunshine… I didn\'t have the necessary hand-eye coordination to play sports without humiliating myself." — Chapter 1',
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
    evidence: '"They all had very dark eyes despite the range in hair tones. They also had dark shadows under those eyes — purplish, bruiselike shadows." — Chapter 1',
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
    evidence: '"I vividly remembered the flat black color of his eyes the last time he\'d glared at me… Today, his eyes were a completely different color: a strange ocher, darker than butterscotch, but with the same golden tone." — Chapter 5',
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
    evidence: '"I had a small collection of books… the shabbiest volume being a compilation of the works of Jane Austen. I selected that one and headed to the backyard…" — Chapter 7',
  },
  {
    id: 6,
    question: "True or False: Forks, Washington, holds a statistical distinction within the United States for having the highest annual rainfall of any location.",
    options: ["True", "False"],
    answer: "True",
    evidence: '"It rains on this inconsequential town more than any other place in the United States of America." — Chapter 1',
  },
  {
    id: 7,
    question: "True or False: According to the Quileute legends shared by Jacob Black, the tribe claims direct ancestral descent from bears.",
    options: ["True", "False"],
    answer: "False",
    evidence: '"Another legend claims that we descended from wolves — and that the wolves are our brothers still." The tribe descends from wolves, not bears. — Chapter 6',
  },
  {
    id: 8,
    question: "True or False: Bella discovers the term 'Stregoni benefici' through a digital search, which describes an Italian vampire myth focused on goodness.",
    options: ["True", "False"],
    answer: "True",
    evidence: '"Stregoni benefici: An Italian vampire, said to be on the side of goodness, and a mortal enemy of all evil vampires." — Chapter 7',
  },
  {
    id: 9,
    question: "True or False: The specific student population count at Forks High School, including Bella Swan, is exactly 358.",
    options: ["True", "False"],
    answer: "True",
    evidence: '"Forks High School had a frightening total of only three hundred and fifty-seven — now fifty-eight — students." — Chapter 1',
  },
  {
    id: 10,
    question: "True or False: Edward Cullen admits that his presence in Port Angeles was due to his ability to track Bella's physical scent across the city.",
    options: ["True", "False"],
    answer: "False",
    evidence: '"I was just waiting for you, randomly searching through the thoughts of people on the street — to see if anyone had noticed you — so I would know where you were." He used telepathy, not scent tracking. — Chapter 8',
  },
];

// --- Twilight: Book Trivia (from twilight.md) ---

export const TWILIGHT_BOOK_TRIVIA: MCTriviaQuestion[] = [
  { id: 1, question: "According to the opening chapter, what is the exact total of the Forks High School student body immediately following Bella Swan's registration?", options: ["357 students", "358 students", "362 students", "700 students"], answer: "358 students", evidence: "\"Forks High School had a frightening total of only three hundred and fifty-seven — now fifty-eight — students.\" — Chapter 1" },
  { id: 2, question: "Determine the historical era assigned to the red Chevy truck purchased from Billy Black, as admitted by Charlie Swan.", options: ["Late 1940s", "The year 1953", "Early sixties or late fifties", "Exactly 1984"], answer: "Early sixties or late fifties", evidence: "\"I think it was new in the early sixties or late fifties at the earliest,' he admitted sheepishly.\" — Chapter 1" },
  { id: 3, question: "Distinguish the specific olfactory profile Bella identifies within the tan upholstery of her truck's cabin.", options: ["Cedar, moss, and diesel", "Tobacco, gasoline, and peppermint", "Pine, rain, and old leather", "Strawberry shampoo and damp earth"], answer: "Tobacco, gasoline, and peppermint", evidence: "\"Inside the truck, it was nice and dry; the tan upholstered seats still smelled faintly of tobacco, gasoline, and peppermint.\" — Chapter 1" },
  { id: 4, question: "During the initial cafeteria exposition, how does Jessica Stanley classify the biological relationship between the Hales (Rosalie and Jasper) and the Cullens?", options: ["Biological siblings of Edward", "Cousins visiting from Alaska", "Foster children/twins", "Step-siblings by marriage"], answer: "Foster children/twins", evidence: "\"The Hales are brother and sister, twins — the blondes — and they're foster children.\" — Chapter 1" },
  { id: 5, question: "Evaluate the discrepancy in the Biology II lab results: does Edward Cullen explicitly attribute the identification of the majority of the mitosis slides to himself or to Bella Swan?", options: ["Edward Cullen identified all five slides", "Bella Swan identified three of the five slides", "Bella Swan identified all five slides", "Edward Cullen identified three of the five slides"], answer: "Bella Swan identified three of the five slides", evidence: "\"Mr. Banner looked at me now... 'Actually, she identified three of the five,' Edward corrected.\" — Chapter 2" },
  { id: 6, question: "Analyze the sensory details of the Biology lab encounter: which specific scent does Bella verify on her own person to investigate Edward's physical revulsion?", options: ["Lavender", "Peppermint", "Strawberries", "Vanilla"], answer: "Strawberries", evidence: "\"Inconspicuously, I sniffed my hair; it smelled like strawberries, the scent of my favorite shampoo.\" — Chapter 1" },
  { id: 7, question: "Identify the literary work Bella Swan is actively reading for her English curriculum when she first notices Edward Cullen's return to school after his initial absence.", options: ["Macbeth", "Wuthering Heights", "Sense and Sensibility", "The Canterbury Tales"], answer: "Wuthering Heights", evidence: "\"I had decided to read Wuthering Heights — the novel we were currently studying in English — yet again for the fun of it.\" — Chapter 2" },
  { id: 8, question: "Analyze the physical evidence of Edward Cullen's intervention during the van accident: what specific damage is noted on the tan car parked adjacent to Bella?", options: ["A shattered windshield", "A deep dent in the bumper fitting Edward's shoulders", "A broken taillight from Tyler's van", "Scratched paint from the snow chains"], answer: "A deep dent in the bumper fitting Edward's shoulders", evidence: "\"I had seen the deep dent in the tan car's bumper — a very distinct dent that fit the contours of Edward's shoulders.\" — Chapter 3" },
  { id: 9, question: "Identify the specific commercial establishment in Port Angeles where Edward takes Bella to mitigate her physiological shock following the near-assault.", options: ["The Boardwalk Café", "La Bella Italia", "Vampires A-Z", "The Thriftway"], answer: "La Bella Italia", evidence: "\"I looked out the window to see the lights of La Bella Italia, and Jess and Angela just leaving.\" — Chapter 8" },
  { id: 10, question: "Determine the specific geographical location where Edward and Emmett Cullen intend to hike during the 'Girls' Choice' dance weekend to avoid the Forks social environment.", options: ["Olympic National Park", "Goat Rocks Wilderness", "Mount Rainier Summit", "La Push Reservation"], answer: "Goat Rocks Wilderness", evidence: "\"We're going to be hiking in the Goat Rocks Wilderness, just south of Rainier.\" — Chapter 5" },
];

// --- New Moon Trivia ---

export const NEW_MOON_TRIVIA: MCTriviaQuestion[] = [
  { id: 1, question: "In the dream that opens the novel, who does Bella believe she is seeing before realizing she is looking at her own reflection?", options: ["Renée Dwyer", "Esme Cullen", "Her grandmother Marie", "Alice Cullen"], answer: "Her grandmother Marie", evidence: "\"I was seeing my Grandma Marie, who had been dead for six years.\" — Chapter 1" },
  { id: 2, question: "At what physical age did Edward Cullen's growth stop, a fact Bella reflects on during her eighteenth birthday?", options: ["Sixteen", "Seventeen", "Eighteen", "Nineteen"], answer: "Seventeen", evidence: "\"Edward remained at my side without reflecting in the mirror, unbearably beautiful at his seventeen eternal years.\" — Chapter 1" },
  { id: 3, question: "Bella describes Edward's appearance in the school parking lot as a tribute of ivory consecrated to which type of deity?", options: ["A Greek god of war", "A forgotten pagan god of beauty", "A Roman god of the sun", "An Egyptian god of the underworld"], answer: "A forgotten pagan god of beauty", evidence: "\"Edward motionless, leaning against his polished silver Volvo like an ivory tribute consecrated to some forgotten pagan god of beauty.\" — Chapter 1" },
  { id: 4, question: "What is the specific date displayed on the calendar in Bella's room on the morning she turns eighteen?", options: ["September 13", "October 13", "September 17", "June 20"], answer: "September 13", evidence: "\"The small calendar in the corner of the clock showed me that it was still September thirteenth.\" — Chapter 1" },
  { id: 5, question: "Which Cullen family member brings a silver-wrapped box to school, ignoring Bella's 'no gifts' rule?", options: ["Emmett", "Rosalie", "Alice", "Carlisle"], answer: "Alice", evidence: "\"Alice was at his side... with a small square box wrapped in silver paper in her hands.\" — Chapter 1" },
  { id: 6, question: "True or False: Bella skipped breakfast on her eighteenth birthday because she didn't want to pretend to be happy in front of Charlie.", options: ["True", "False"], answer: "True", evidence: "\"I skipped breakfast. I was not in the mood to face my father and have to spend a few minutes pretending to be happy.\" — Chapter 1" },
  { id: 7, question: "Who restrained Jasper during the incident at the party to protect Bella?", options: ["Edward", "Carlisle", "Emmett", "Rosalie"], answer: "Emmett", evidence: "\"Emmett was grabbing Jasper from behind, holding him with his iron embrace.\" — Chapter 1" },
  { id: 8, question: "Edward's biological father died during which wave of the Spanish Flu epidemic?", options: ["The second wave", "The first wave", "The final wave", "The winter peak"], answer: "The first wave", evidence: "\"He died in the first wave of influenza.\" — Chapter 2" },
  { id: 9, question: "What gemstone did Carlisle use to describe the eyes of Edward's biological mother, Elizabeth Masen?", options: ["Diamonds", "Sapphires", "Rubies", "Emeralds"], answer: "Emeralds", evidence: "\"Her eyes were as hard as stones, like emeralds.\" — Chapter 2" },
  { id: 10, question: "What was the verbatim final command Elizabeth Masen gave to Carlisle before she died?", options: ["'Look after him'", "'Save him'", "'Forgive me'", "'Take him'"], answer: "'Save him'", evidence: "\"'Save him!' she ordered me in a hoarse voice.\" — Chapter 2" },
  { id: 11, question: "True or False: Edward believes that vampires have lost their soul.", options: ["True", "False"], answer: "True", evidence: "\"He believes we have lost our soul.\" — Chapter 2" },
  { id: 12, question: "True or False: Alice remained in the kitchen to help Carlisle stitch Bella's arm until the task was finished.", options: ["True", "False"], answer: "False", evidence: "\"I saw when Alice gave up and slipped out of the room. She sketched an apologetic smile and left through the kitchen door.\" — Chapter 2" },
  { id: 13, question: "Which four months are depicted as blank pages in the novel to represent Bella's catatonic state?", options: ["Sept, Oct, Nov, Dec", "Oct, Nov, Dec, Jan", "Nov, Dec, Jan, Feb", "Jan, Feb, Mar, Apr"], answer: "Oct, Nov, Dec, Jan", evidence: "\"October. November. December. January.\" — Chapter 4" },
  { id: 14, question: "Who found Bella in the woods after Edward abandoned her?", options: ["Jacob Black", "Charlie Swan", "Sam Uley", "Billy Black"], answer: "Sam Uley", evidence: "\"The man who finds Bella in the woods identifies himself as Sam Uley and states that Charlie sent him.\" — Chapter 3" },
  { id: 15, question: "What is the title of the zombie movie Bella and Jessica watch in Port Angeles?", options: ["Dead End", "The Living Dead", "Night Walkers", "Final Sunset"], answer: "Dead End", evidence: "\"And my father just saw 'Dead End' and says it's the thing that has scared him the most in years.\" — Chapter 5" },
  { id: 16, question: "Where does Bella find the two old motorcycles that she takes to Jacob Black for repair?", options: ["The Newton's store", "The Marks' house", "The Black's garage", "Charlie's yard"], answer: "The Marks' house", evidence: "\"I noticed a 'For Sale' sign on two motorcycles in the yard of the Marks' house.\" — Chapter 5" },
  { id: 17, question: "True or False: Bella explicitly mentions her promise to not engage in 'temerarious' behavior when contemplating the motorcycles.", options: ["True", "False"], answer: "True", evidence: "\"I had made the promise not to do anything that was stupid or temerarious.\" — Chapter 5" },
  { id: 18, question: "True or False: Charlie threatens to send Bella to Jacksonville to live with her mother.", options: ["True", "False"], answer: "True", evidence: "\"I'm going to send you to Renée, to Jacksonville.\" — Chapter 5" },
  { id: 19, question: "True or False: When Bella approaches the men outside the bar in Port Angeles, she does so because she recognizes one of them.", options: ["True", "False"], answer: "False", evidence: "\"'No, I don't know you.' ... 'I'm sorry, I was mistaken.'\" — Chapter 5" },
];

// --- Eclipse Trivia ---

export const ECLIPSE_TRIVIA: MCTriviaQuestion[] = [
  { id: 1, question: "According to the newspaper Charlie reads, exactly how many unsolved homicides occurred in Seattle over the span of two weeks?", options: ["Three", "Five", "Seven", "Nine"], answer: "Five", evidence: "\"Seattle's making a run for murder capital of the country. Five unsolved homicides in the last two weeks.\" — Chapter 1" },
  { id: 2, question: "Bella notes that Juneau, Alaska, is an ideal location for the Cullens because it averages how many overcast days per year?", options: ["285", "312", "321", "350"], answer: "321", evidence: "\"But it was far away, and Juneau had an average of three hundred twenty-one overcast days per year.\" — Chapter 1" },
  { id: 3, question: "In her human life, what was the full and specific name of the man Rosalie Hale was engaged to in 1933?", options: ["Royce King the First", "Royce King the Second", "Royce King the Third", "Royce King the Fourth"], answer: "Royce King the Second", evidence: "\"That's how his son, Royce King the Second — her mouth twisted around the name... — saw me the first time.\" — Chapter 7" },
  { id: 4, question: "Which physical detail on Jacob's note leads Bella to imagine him 'snapping the pen in his too-big hand'?", options: ["Torn paper edges", "Deeply dented letters", "Ink splatters", "Crinkled corners"], answer: "Ink splatters", evidence: "\"scrawling the angry letters in his rough handwriting, slashing through line after line when the words came out wrong, maybe even snapping the pen in his too-big hand; that would explain the ink splatters.\" — Chapter 1" },
  { id: 5, question: "During Rosalie's retelling of her history, what was the name of her 'very closest friend' who had a son named Henry?", options: ["Vera", "Maureen", "Grace", "Michelle"], answer: "Vera", evidence: "\"My very closest friend was a girl named Vera... She had a son, a beautiful little boy with dimples and curly black hair.\" — Chapter 7" },
  { id: 6, question: "What specific atmospheric cue alerts Bella that Charlie is attempting to cook dinner in the kitchen?", options: ["The smell of burnt sauce", "The scent of a smoking burner", "The sound of the microwave timer", "The clatter of a spoon"], answer: "The scent of a smoking burner", evidence: "\"While I was pondering this, I caught the unmistakable scent of a smoking burner rising from the kitchen.\" — Chapter 1" },
  { id: 7, question: "Edward mentions being accepted to several universities; which school does Charlie believe he should attend instead of the University of Alaska?", options: ["Syracuse", "Harvard", "Princeton", "Yale"], answer: "Harvard", evidence: "\"Harvard? Dartmouth? ...Well that's pretty... that's something. Yeah, but the University of Alaska... you wouldn't really consider that when you could go Ivy League.\" — Chapter 1" },
  { id: 8, question: "Bella identifies several victims of the Seattle murders in the paper; which name makes the deaths feel 'different from considering murder in the abstract'?", options: ["Ronald Albrook", "Maureen Gardiner", "Geoffrey Campbell", "Michelle O'Connell"], answer: "Geoffrey Campbell", evidence: "\"It was different from considering murder in the abstract, reading those names. Maureen Gardiner, Geoffrey Campbell, Grace Razi, Michelle O'Connell, Ronald Albrook.\" — Chapter 1" },
  { id: 9, question: "Edward bribes Alice with a Porsche to watch Bella while he is hunting. What is the specific color of this vehicle?", options: ["Bright Silver", "Crimson Red", "Canary Yellow", "Jet Black"], answer: "Canary Yellow", evidence: "\"a shiny canary yellow Porsche between it and Rosalie's red convertible. Alice hopped out gracefully and went to stroke her hand along the length of her bribe.\" — Chapter 6" },
  { id: 10, question: "What is the primary reason Charlie gives for forbidding Bella from visiting Seattle during her 'parole'?", options: ["He wants her to visit Billy", "High gas prices", "A suspected gang on a killing spree", "Inclement weather warnings"], answer: "A suspected gang on a killing spree", evidence: "\"I told you about that story in the paper—there's some kind of gang on a killing spree in Seattle and I want you to steer clear, okay?\" — Chapter 1" },
  { id: 11, question: "True or False: Rosalie Hale admits to committing a total of seven murders during her quest for revenge against Royce King II and his associates.", options: ["True", "False"], answer: "True", evidence: "\"Oops—seven murders... I forgot about his guards. They only took a second.\" — Chapter 7" },
  { id: 12, question: "True or False: Alice Cullen is unable to see the future of the Quileute wolves because their transformations are involuntary and unpredictable.", options: ["True", "False"], answer: "True", evidence: "\"Because she can't see the wolves, you know... In that instant when they shift from one form to the other, they don't really even exist. The future can't hold them.\" — Chapter 2" },
  { id: 13, question: "True or False: Jacob Black explains to Bella that members of the pack stop aging permanently from the moment they first phase into wolves.", options: ["True", "False"], answer: "False", evidence: "\"When we stop phasing for a solid length of time, we age again.\" — Chapter 5" },
  { id: 14, question: "True or False: The year Rosalie Hale was attacked and subsequently found by Carlisle Cullen was 1933.", options: ["True", "False"], answer: "True", evidence: "\"I lived in a different world than you do, Bella... It was nineteen thirty-three. I was eighteen.\" — Chapter 7" },
  { id: 15, question: "True or False: Jacob Black admits that he never sold Bella's motorcycle, despite her promise to Charlie that it would be gone.", options: ["True", "False"], answer: "True", evidence: "\"'You were supposed to sell that. You promised Charlie you would.' 'Yeah, right. Like I would do that.'\" — Chapter 3" },
];

// --- Breaking Dawn Trivia ---

export const BREAKING_DAWN_TRIVIA: MCTriviaQuestion[] = [
  { id: 1, question: "What are the specific technical capabilities and intended market for the 'before' car Edward provides for Bella?", options: ["A bulletproof BMW designed for high-speed chases in urban Europe.", "A Mercedes Guardian with missile-proof glass and 4,000 pounds of body armor, intended for Middle East diplomats and arms dealers.", "A classic Volvo sedan with reinforced bumpers designed for winter safety in Washington.", "An armored Toyota SUV with tinted windows intended for celebrity transport in Los Angeles."], answer: "A Mercedes Guardian with missile-proof glass and 4,000 pounds of body armor, intended for Middle East diplomats and arms dealers.", evidence: "\"Can't imagine what you'd need missile-proof glass and four thousand pounds of body armor for around here. ... Designed for Middle East diplomats, arms dealers, and drug lords mostly.\" — Chapter 1" },
  { id: 2, question: "What is the genealogical origin and stone composition of the hair combs Bella wears as her 'something old/blue'?", options: ["They were a gift from Esme, made of platinum and aquamarines.", "They belonged to Alice's family and were set with blue topaz.", "They were Grandma Swan's silver combs, with the original paste stones replaced by sapphires.", "They were Renee's wedding combs, modified with blue diamonds."], answer: "They were Grandma Swan's silver combs, with the original paste stones replaced by sapphires.", evidence: "\"They were your Grandma Swan's, Charlie added. We had a jeweler replace the paste stones with sapphires.\" — Chapter 3" },
  { id: 3, question: "Which musical selection and specific guest presence mark the official wedding ceremony?", options: ["Satie's Gymnopédie No. 1 played by Rosalie; attended by the entire Quileute Council.", "A piano lullaby composed by Edward for the processional; attended by the Volturi guards.", "Wagner's traditional march; attended by the Denali clan (Tanya, Kate, Carmen, and Eleazar).", "Pachelbel's 'Canon' for the processional; attended by the Irish coven."], answer: "Wagner's traditional march; attended by the Denali clan (Tanya, Kate, Carmen, and Eleazar).", evidence: "\"The music was familiar, Wagner's traditional march... Tanya, this is my Bella. ... Behind my human friends were my new cousins-in-law, the Denali vampire clan.\" — Chapter 3" },
  { id: 4, question: "True or False: Exactly seventeen days pass between the wedding and the morning Bella realizes her period is five days late.", options: ["True", "False"], answer: "True", evidence: "\"How many days has it been since the wedding? I whispered. Seventeen, he answered automatically. ... I'm trying to tell you that my period is five days late.\" — Chapter 7" },
  { id: 5, question: "True or False: Upon waking the first morning, Bella discovers she is covered in feathers and has large purplish bruises on her arm, shoulder, and ribs.", options: ["True", "False"], answer: "True", evidence: "\"I shook my head, and a cascade of white drifted out of my hair. ... Why am I covered in feathers? ... large purplish bruises were beginning to blossom across the pale skin of my arm.\" — Chapter 5" },
  { id: 6, question: "True or False: According to the legends shared by Kaure, the 'Libishomen' is a blood-drinking demon that preys exclusively on beautiful women.", options: ["True", "False"], answer: "True", evidence: "\"They have their own legends here. The Libishomen—a blood-drinking demon who preys exclusively on beautiful women.\" — Chapter 6" },
  { id: 7, question: "Which imprinting match causes a significant conflict within the Black household?", options: ["Embry imprinting on Rachel Black.", "Paul imprinting on Rachel Black.", "Sam imprinting on Emily Young.", "Quil imprinting on Claire."], answer: "Paul imprinting on Rachel Black.", evidence: "\"Rachel'd come home from Washington State... Bada bing, bada boom—true love! ... And I got Paul as a brother-in-law someday.\" — Chapter 8" },
  { id: 8, question: "What 'rare disease' cover story does Carlisle Cullen use to explain Bella's condition to Charlie Swan?", options: ["A highly contagious strain of South American malaria.", "An unknown viral infection contracted in the Amazon.", "A rare disease picked up in South America that requires strict quarantine.", "Severe food poisoning resulting in a temporary coma."], answer: "A rare disease picked up in South America that requires strict quarantine.", evidence: "\"Carlisle got on and told Charlie that Bella picked up some rare disease in South America. Said she's quarantined.\" — Chapter 8" },
  { id: 9, question: "True or False: When Sam Uley issues a decree as the Alpha, the pack members feel a 'strange double timbre' in his voice that makes it impossible to disobey.", options: ["True", "False"], answer: "True", evidence: "\"Sam's mental voice changed, took on that strange double timbre that we could not disobey. The voice of the Alpha.\" — Chapter 8" },
  { id: 10, question: "True or False: Jacob notes that imprinting is supposed to be rare, but currently, four out of the ten pack members have imprinted.", options: ["True", "False"], answer: "True", evidence: "\"Which was bad enough that yet another member of the pack had imprinted—because, really, that made four of ten now! When would it stop? Stupid myth was supposed to be rare, for crying out loud!\" — Chapter 8" },
];

// --- Midnight Sun Trivia ---

export const MIDNIGHT_SUN_TRIVIA: MCTriviaQuestion[] = [
  { id: 1, question: "What does Edward imagine into the cracks of the cafeteria plaster to tune out human voices?", options: ["Maps of Alaska", "Patterns that are not there", "The faces of his family", "Mathematical equations"], answer: "Patterns that are not there", evidence: "\"I stared at the cracks running through the plaster in the far corner of the cafeteria, imagining patterns into them that were not there.\" — Chapter 1" },
  { id: 2, question: "Which sophomore student is the first person to notice Edward's sudden appearance in the office after his failed schedule change?", options: ["Tyler Crowley", "Mike Newton", "D. J. Garrett", "Eric Yorkie"], answer: "D. J. Garrett", evidence: "\"I heard a sophomore, D. J. Garrett, notice and then disregard.... Where did Cullen come from? It was like he just came out of thin air....\" — Chapter 1" },
  { id: 3, question: "When Edward examines Bella's brown eyes, what specific colors does he observe in the flecks near her pupils?", options: ["Obsidian and copper", "Agate green and golden caramel", "Emerald and silver", "Deep violet and mahogany"], answer: "Agate green and golden caramel", evidence: "\"...I stared into those oddly deep brown eyes—the color was like milk chocolate... near her pupils, there were tiny flecks of agate green and golden caramel...\" — Chapter 2" },
  { id: 4, question: "Why does Bella's mother's husband, Phil, move around frequently according to the text?", options: ["He is a high-level corporate recruiter", "He is a minor league ballplayer who doesn't play well", "He is an avid nature photographer", "He is fleeing professional debt"], answer: "He is a minor league ballplayer who doesn't play well", evidence: "\"'Probably not. He doesn't play well.' Another smile. 'Strictly minor league. He moves around a lot.'\" — Chapter 2" },
  { id: 5, question: "True or False: Edward chooses to block his family's thoughts out of distaste for their content.", options: ["True", "False"], answer: "False", evidence: "\"Only four voices did I block out of courtesy rather than distaste: my family...\" — Chapter 1" },
  { id: 6, question: "True or False: Edward Cullen holds two medical degrees at the start of the narrative.", options: ["True", "False"], answer: "True", evidence: "\"It was doubtful Mr. Banner, a man of no more than average intellect, would manage to pull out anything in his lecture that would surprise someone holding two medical degrees.\" — Chapter 1" },
  { id: 7, question: "What does Edward use to specifically rearrange the shape of the dent in the tan car to conceal the evidence of his grip?", options: ["His shoulder", "A tire iron", "The back of his foot", "His palm"], answer: "The back of his foot", evidence: "\"I used the moment of distraction to quietly rearrange the shape of the dent in the tan car with the back of my foot.\" — Chapter 3" },
  { id: 8, question: "What is the specific taxonomy and gender of the spider Edward crushes in Bella's room to protect her?", options: ["Latrodectus, female Black Widow", "Eratigena agrestis, juvenile male hobo spider", "Loxosceles, adult female Brown Recluse", "Atrax robustus, male Funnel-web spider"], answer: "Eratigena agrestis, juvenile male hobo spider", evidence: "\"Eratigena agrestis—a hobo spider, from its size a juvenile male... I reached out with one finger and crushed it silently.\" — Chapter 4" },
  { id: 9, question: "How does Edward compare Tyler Crowley's injury to Bella's immediately after the accident?", options: ["They were equally injured", "Bella was hurt significantly worse", "Tyler looked to be hurt worse than Bella", "Neither student sustained any visible injury"], answer: "Tyler looked to be hurt worse than Bella", evidence: "\"Tyler Crowley, the van's driver, looked to be hurt worse than Bella...\" — Chapter 3" },
  { id: 10, question: "What phrase does Edward use to dismiss Tyler Crowley's apologies in the hospital?", options: ["'Forget about it'", "'No blood, no foul'", "'It was an accident'", "'Don't worry about me'"], answer: "'No blood, no foul'", evidence: "\"'No blood, no foul,' I said wryly. Without thinking, I smiled too widely at my private joke.\" — Chapter 3" },
  { id: 11, question: "True or False: Edward describes the van arcing back toward Bella as though she were a magnet pulling it toward them.", options: ["True", "False"], answer: "True", evidence: "\"It was changing course, arcing, coming for her again as though she were a magnet, pulling it toward us.\" — Chapter 3" },
  { id: 12, question: "True or False: Edward acknowledges his debt to Bella by promising to explain the accident in full later that day.", options: ["True", "False"], answer: "False", evidence: "\"I saved your life—I don't owe you anything.\" — Chapter 3" },
  { id: 13, question: "What is Bella's stated reason for choosing Comic Con as her dream destination during the cafeteria conversation?", options: ["She is an avid comic book collector", "She wanted to visit San Diego", "She wanted to save Eric Yorkie from being teased", "She was interested in Slave Leia costumes"], answer: "She wanted to save Eric Yorkie from being teased", evidence: "\"She'd only chimed in to save Eric from teasing. ...I seemed to be the only one who noticed the light bulb going on over Bella's head.\" — Chapter 5" },
  { id: 14, question: "Which student does Bella invite to her Biology group project specifically because no one else gives her a chance?", options: ["Angela Weber", "Jessica Stanley", "Tara Galvaz", "Beth Daws"], answer: "Tara Galvaz", evidence: "\"Tara was, in fact, failing Biology. ...I could imagine no reason besides kindness for reaching out to her, especially with Bella's shyness in the way.\" — Chapter 5" },
  { id: 15, question: "What specific word does Bella mutter in her sleep that Edward considers an 'unprotected thought'?", options: ["'Vampire'", "'Seattle'", "'Edward'", "'Charlie'"], answer: "'Edward'", evidence: "\"'Edward,' Bella said. I froze, staring at her unopened eyes.\" — Chapter 4" },
  { id: 16, question: "What metaphor does Bella's mother use to describe Bella's supposedly easy-to-read personality?", options: ["A transparent lake", "An open book", "A clear window", "A map without a key"], answer: "An open book", evidence: "\"I'm more annoyed at myself. My face is so easy to read—my mother always calls me her open book.\" — Chapter 5" },
  { id: 17, question: "True or False: Bella tells Mike Newton that she is going to Seattle on the day of the spring dance.", options: ["True", "False"], answer: "True", evidence: "\"'I'm going to Seattle that Saturday,' she answered.\" — Chapter 5" },
  { id: 18, question: "True or False: Bella's mother sent her to Forks so that she could travel with Phil.", options: ["True", "False"], answer: "False", evidence: "\"'No, she did not send me here,' she said, and her voice had a new, hard edge to it. ...'I sent myself.'\" — Chapter 5" },
];

// --- Life and Death Trivia ---

export const LIFE_AND_DEATH_TRIVIA: MCTriviaQuestion[] = [
  { id: 1, question: "In the Foreword, which specific personality traits differentiate Beau Swan from Bella Swan?", options: ["Beau is more extroverted and academics-focused", "Beau is more hot-tempered and physically aggressive", "Beau is more OCD and lacks the 'chip on his shoulder'", "Beau is more flowery with his words and thoughts"], answer: "Beau is more OCD and lacks the 'chip on his shoulder'", evidence: "\"The biggest variations are that he's more OCD, he's not nearly so flowery with his words and thoughts, and he's not as angry—he's totally missing the chip Bella carries around on her shoulder all the time.\" — Foreword" },
  { id: 2, question: "According to the author's Foreword, what year was Beaufort Swan born?", options: ["1984", "1985", "1986", "1987"], answer: "1987", evidence: "\"Here's the reason for that: Beau was born in 1987. It was a rare thing for a father to get primary custody of a child in those days...\" — Foreword" },
  { id: 3, question: "On what exact date does Beau Swan arrive in Forks at the beginning of the novel?", options: ["January 1, 2005", "January 15, 2005", "January 17, 2005", "February 1, 2005"], answer: "January 17, 2005", evidence: "\"January 17, 2005. MY MOM DROVE ME TO THE AIRPORT WITH THE WINDOWS ROLLED DOWN.\" — Chapter 1" },
  { id: 4, question: "What is the mechanical history of the red Chevy truck Charlie buys for Beau?", options: ["It was bought new by Bonnie Black in 1984", "It was bought by Bonnie in 1984 but was new in the late 50s or early 60s", "It was a custom-built 1970s model for fishing", "It was a 1984 model with a replaced engine"], answer: "It was bought by Bonnie in 1984 but was new in the late 50s or early 60s", evidence: "\"'She bought it in 1984, I think.' ... 'I think it was new in the early sixties or late fifties at the earliest,' he admitted sheepishly.\" — Chapter 1" },
  { id: 5, question: "Why did Stephenie Meyer choose to keep Charlie and Renée's original genders?", options: ["To preserve the iconic names of the characters", "Due to 1980s custody biases favoring mothers over transient fathers", "To maintain the specific father-son relationship dynamic", "To avoid altering the mythos of the final chapters"], answer: "Due to 1980s custody biases favoring mothers over transient fathers", evidence: "\"I have a really hard time believing that any judge at that time (or even now) would give a child to a transient, unemployed father over a mother with a steady job and strong ties to her community.\" — Foreword" },
  { id: 6, question: "Which Cullen sibling is described as an 'intense' and 'edgy' type who reminds Beau of a machete-wielding actress?", options: ["Eleanor Cullen", "Jessamine Hale", "Edythe Cullen", "Royal Hale"], answer: "Jessamine Hale", evidence: "\"There was something intense about her, edgy. ... she made me think of this actress I'd seen in an action movie... who took down a dozen guys with a machete. ... Jessamine.\" — Chapter 1" },
  { id: 7, question: "How is Eleanor Cullen visually distinguished during the cafeteria scene?", options: ["As a honey-blonde girl of average height", "As the shortest sibling with pixie-like features", "As a 'star athlete' type who is super tall with dark, curly hair", "As a slender girl with metallic, bronze-y hair"], answer: "As a 'star athlete' type who is super tall with dark, curly hair", evidence: "\"The taller one—who was definitely taller than me—was clearly the school's star athlete.\" — Chapter 1" },
  { id: 8, question: "Where did the Cullens move from two years prior to Beau's arrival in Forks?", options: ["Seattle, Washington", "Denali, Alaska", "Somewhere in Alaska", "Juneau, Alaska"], answer: "Somewhere in Alaska", evidence: "\"'No. They just moved down two years ago from somewhere in Alaska.'\" — Chapter 1" },
  { id: 9, question: "True or False: Dr. Carine Cullen is described as being happily married to her husband, Earnest.", options: ["True", "False"], answer: "True", evidence: "\"'It's a good thing she's happily married. A lot of the hospital staff have a hard time concentrating on their work with her around.'\" — Chapter 2" },
  { id: 10, question: "True or False: Archie Cullen left the cafeteria with an untouched apple and an unopened soda.", options: ["True", "False"], answer: "True", evidence: "\"As I watched, the wiry skinhead guy rose with his tray—unopened soda, untouched apple—and walked away... Archie Cullen.\" — Chapter 1" },
  { id: 11, question: "During the Biology lab, what was the first phase of mitosis identified by Edythe?", options: ["Metaphase", "Anaphase", "Prophase", "Telophase"], answer: "Prophase", evidence: "\"She studied the first slide for a quarter of a second—maybe less. 'Prophase.'\" — Chapter 2" },
  { id: 12, question: "What specific medical term does Beau use to describe his fainting spell?", options: ["Vasovagal collapse", "Neurally mediated syncope", "Orthostatic hypotension", "Hemophobic shock"], answer: "Neurally mediated syncope", evidence: "\"'He's having a neurally mediated syncope,' Edythe explained brightly.\" — Chapter 5" },
  { id: 13, question: "True or False: Beau notices Edythe's eye color has changed from black to a golden honey color between his first day and the Biology lab.", options: ["True", "False"], answer: "True", evidence: "\"Today, her eyes were a completely different color: a strange gold, darker than butterscotch, but with the same warm tone.\" — Chapter 2" },
  { id: 14, question: "What is the name of the 'good' Italian vampires mentioned in the Quileute legends?", options: ["The Volturi", "The Varacolaci", "The Stregoni benefici", "The Nelapsi"], answer: "The Stregoni benefici", evidence: "\"Stregoni benefici: An Italian vampire, said to be on the side of goodness...\" — Chapter 7" },
  { id: 15, question: "According to legend, the Quileute tribe descended from which animal?", options: ["Bears", "Eagles", "Wolves", "Cougars"], answer: "Wolves", evidence: "\"Another legend claims that we descended from wolves and that the wolves are our sisters still.\" — Chapter 6" },
  { id: 16, question: "Who was the tribal elder/great-grandmother who made the original treaty with the Cullens?", options: ["Bonnie Black", "Samantha Uley", "Jules Black's great-grandmother", "Renée Swan"], answer: "Jules Black's great-grandmother", evidence: "\"According to legend, my own great-grandmother knew some of them. She was the one who made the treaty that kept them off our land.\" — Chapter 6" },
];

// --- Harry Potter: Sorcerer's Stone Trivia (Book 1, Chapters 1–6) ---

export const HARRY_POTTER_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "What is the specific product manufactured by Grunnings, the firm where Mr. Dursley is a director?",
    options: ["Screws", "Drills", "Hammers", "Wrenches"],
    answer: "Drills",
    evidence: "\"Mr. Dursley was the director of a firm called Grunnings, which made drills.\" — Chapter 1",
  },
  {
    id: 2,
    question: "What was the first sign of something peculiar that Mr. Dursley noticed on the corner of the street?",
    options: ["An owl in a tree", "A cat reading a map", "A man in a cloak", "A shooting star"],
    answer: "A cat reading a map",
    evidence: "\"It was on the corner of the street that he noticed the first sign of something peculiar — a cat reading a map.\" — Chapter 1",
  },
  {
    id: 3,
    question: "How many times did Dumbledore click the Put-Outer to extinguish the street lamps on Privet Drive?",
    options: ["Seven", "Ten", "Twelve", "Thirteen"],
    answer: "Twelve",
    evidence: "\"Twelve times he clicked the Put-Outer, until the only lights left on the whole street were two tiny pinpricks in the distance...\" — Chapter 1",
  },
  {
    id: 4,
    question: "What Muggle sweet is Albus Dumbledore particularly fond of?",
    options: ["Lemon drops", "Peppermint humbugs", "Chocolate eclairs", "Toffee apples"],
    answer: "Lemon drops",
    evidence: "\"Would you care for a lemon drop? ... A lemon drop. They're a kind of Muggle sweet I'm rather fond of.\" — Chapter 1",
  },
  {
    id: 5,
    question: "True or False: In the news report Mr. Dursley watched, bird-watchers reported owls flying in daylight.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"...bird-watchers everywhere have reported that the nation's owls have been behaving very unusually today... sightings of these birds flying in every direction since sunrise.\" — Chapter 1",
  },
  {
    id: 6,
    question: "How many presents did Dudley count on his birthday before Aunt Petunia pointed out the one from Auntie Marge?",
    options: ["Thirty-five", "Thirty-six", "Thirty-seven", "Thirty-eight"],
    answer: "Thirty-six",
    evidence: "\"Thirty-six, he said, looking up at his mother and father. That's two less than last year.\" — Chapter 2",
  },
  {
    id: 7,
    question: "According to the sign at the zoo, what was the origin of the boa constrictor?",
    options: ["Brazil", "Bred in the zoo", "The Amazon", "Africa"],
    answer: "Bred in the zoo",
    evidence: "\"The boa constrictor jabbed its tail at the sign again and Harry read on: This specimen was bred in the zoo.\" — Chapter 2",
  },
  {
    id: 8,
    question: "When the glass vanished at the zoo, what did Harry swear the snake hissed as it slid past him?",
    options: ["See you later", "Brazil, here I come. . . . Thanksss, amigo.", "I'm free at last", "Watch out, Dudley"],
    answer: "Brazil, here I come. . . . Thanksss, amigo.",
    evidence: "\"As the snake slid swiftly past him, Harry could have sworn a low, hissing voice said, 'Brazil, here I come. . . . Thanksss, amigo.'\" — Chapter 2",
  },
  {
    id: 9,
    question: "What song did Uncle Vernon hum while boarding up the cracks around the doors to stop the letters?",
    options: ["Tiptoe Through the Tulips", "Singin' in the Rain", "Yesterday", "London Bridge is Falling Down"],
    answer: "Tiptoe Through the Tulips",
    evidence: "\"He hummed 'Tiptoe Through the Tulips' as he worked...\" — Chapter 3",
  },
  {
    id: 10,
    question: "What did Uncle Vernon's 'rations' for the family consist of at the shack on the rock?",
    options: ["Sandwiches and tea", "A bag of chips each and four bananas", "Cold tinned tomatoes", "Cornflakes and milk"],
    answer: "A bag of chips each and four bananas",
    evidence: "\"Uncle Vernon's rations turned out to be a bag of chips each and four bananas.\" — Chapter 3",
  },
  {
    id: 11,
    question: "What was the color of the icing on the birthday cake Hagrid gave to Harry?",
    options: ["Pink", "Chocolate", "Green", "White"],
    answer: "Green",
    evidence: "\"Inside was a large, sticky chocolate cake with Happy Birthday Harry written on it in green icing.\" — Chapter 4",
  },
  {
    id: 12,
    question: "What reason did Hagrid give for being unable to write down Voldemort's name?",
    options: ["It was cursed", "He was afraid", "He couldn't spell it", "He had no ink"],
    answer: "He couldn't spell it",
    evidence: "\"Nah — can't spell it. All right — Voldemort.\" — Chapter 4",
  },
  {
    id: 13,
    question: "When Hagrid tells Harry about the night his parents died, what does Harry remember for the first time?",
    options: ["His father's voice", "A high, cold, cruel laugh", "His mother's scream", "The sound of the door breaking"],
    answer: "A high, cold, cruel laugh",
    evidence: "\"...and he remembered something else, for the first time in his life: a high, cold, cruel laugh.\" — Chapter 4",
  },
  {
    id: 14,
    question: "True or False: Hagrid performs magic using a battered pink umbrella.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"...Hagrid leapt from the sofa and drew a battered pink umbrella from inside his coat.\" — Chapter 4",
  },
  {
    id: 15,
    question: "What is the name of the bartender at the Leaky Cauldron?",
    options: ["Dedalus", "Tom", "Doris", "Quirrell"],
    answer: "Tom",
    evidence: "\"The usual, Hagrid? ... Can't, Tom, I'm on Hogwarts business.\" — Chapter 5",
  },
  {
    id: 16,
    question: "How many times, and in what pattern, does Hagrid tap the wall to open the archway to Diagon Alley?",
    options: ["Two times, clockwise", "Three times, three up and two across", "Five times, in an X shape", "Seven times, center brick"],
    answer: "Three times, three up and two across",
    evidence: "\"Three up . . . two across . . . He tapped the wall three times with the point of his umbrella.\" — Chapter 5",
  },
  {
    id: 17,
    question: "What did Hagrid find inside Vault 713?",
    options: ["A pile of gold", "A grubby little package wrapped in brown paper", "A dragon egg", "Nicolas Flamel's wand"],
    answer: "A grubby little package wrapped in brown paper",
    evidence: "\"Then he noticed a grubby little package wrapped up in brown paper lying on the floor.\" — Chapter 5",
  },
  {
    id: 18,
    question: "In what year was Ollivanders wand shop founded?",
    options: ["382 B.C.", "A.D. 1", "1066", "1800"],
    answer: "382 B.C.",
    evidence: "\"Ollivanders: Makers of Fine Wands since 382 B.C.\" — Chapter 5",
  },
  {
    id: 19,
    question: "Where did Harry find the name 'Hedwig' for his snowy owl?",
    options: ["The Standard Book of Spells", "Fantastic Beasts and Where to Find Them", "A History of Magic", "Magical Theory"],
    answer: "A History of Magic",
    evidence: "\"He had decided to call her Hedwig, a name he had found in A History of Magic.\" — Chapter 6",
  },
  {
    id: 20,
    question: "What are the first four words of the 'dud' spell Ron tried to use to turn Scabbers yellow?",
    options: ["Sunshine, daisies, butter mellow", "Yellow, mellow, rat so fat", "Daisies, roses, buttercups, gold", "Rat, rat, turn to yellow"],
    answer: "Sunshine, daisies, butter mellow",
    evidence: "\"Sunshine, daisies, butter mellow, / Turn this stupid, fat rat yellow.\" — Chapter 6",
  },
];

// --- Harry Potter: Chamber of Secrets Trivia (Book 2, Chapters 1–6) ---

export const HARRY_POTTER_COS_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "What is the 'M' word that is strictly forbidden in the Dursley household?",
    options: ["Muggle", "Mudblood", "Magic", "Minister"],
    answer: "Magic",
    evidence: "\"WHAT HAVE I TOLD YOU,' thundered his uncle, 'ABOUT SAYING THE 'M' WORD IN OUR HOUSE?'\" — Chapter 1",
  },
  {
    id: 2,
    question: "What does Dobby use as clothing?",
    options: ["A small suit", "An old pillowcase", "A tattered robe", "A tea cozy"],
    answer: "An old pillowcase",
    evidence: "\"Harry noticed that it was wearing what looked like an old pillowcase, with rips for arm- and leg-holes.\" — Chapter 2",
  },
  {
    id: 3,
    question: "What specific self-punishment does Dobby mention he will have to perform for visiting Harry?",
    options: ["Ironing his fingers", "Shutting his ears in the oven door", "Beating himself with a lamp", "Pulling his own hair"],
    answer: "Shutting his ears in the oven door",
    evidence: "\"Dobby will have to shut his ears in the oven door for this.\" — Chapter 2",
  },
  {
    id: 4,
    question: "Who signed the official warning letter from the Improper Use of Magic Office?",
    options: ["Albus Dumbledore", "Cornelius Fudge", "Mafalda Hopkirk", "Arthur Weasley"],
    answer: "Mafalda Hopkirk",
    evidence: "\"Yours sincerely, Mafalda Hopkirk, IMPROPER USE OF MAGIC OFFICE, Ministry of Magic.\" — Chapter 2",
  },
  {
    id: 5,
    question: "What color is the old Ford Anglia that Ron, Fred, and George use to rescue Harry?",
    options: ["Red", "Turquoise", "Silver", "Green"],
    answer: "Turquoise",
    evidence: "\"Ron was leaning out of the back window of an old turquoise car, which was parked in midair.\" — Chapter 3",
  },
  {
    id: 6,
    question: "What did the kitchen mirror at the Burrow shout at Harry?",
    options: ["'Happy Birthday!'", "'Tuck your shirt in, scruffy!'", "'Watch out for gnomes!'", "'Go to bed!'"],
    answer: "Tuck your shirt in, scruffy!",
    evidence: "\"Harry got a shock the first time he looked in the mirror over the kitchen mantelpiece and it shouted, 'Tuck your shirt in, scruffy!'\" — Chapter 4",
  },
  {
    id: 7,
    question: "What is the 'de-gnoming' process described by Ron?",
    options: ["Spraying them with repellent", "Swinging them in circles and throwing them", "Chasing them with a cat", "Burying them in the garden"],
    answer: "Swinging them in circles and throwing them",
    evidence: "\"He grasped it around the ankles and turned it upside down and started to swing it in great circles like a lasso.\" — Chapter 3",
  },
  {
    id: 8,
    question: "What is the name of the Weasleys' ancient owl?",
    options: ["Hermes", "Hedwig", "Errol", "Pigwidgeon"],
    answer: "Errol",
    evidence: "\"Our owl. He's ancient. It wouldn't be the first time he'd collapsed on a delivery.\" — Chapter 3",
  },
  {
    id: 9,
    question: "What item in Borgin and Burkes is described as the 'best friend of thieves and plunderers'?",
    options: ["The Hand of Glory", "A cursed opal necklace", "A pack of bloodstained cards", "A glass eye"],
    answer: "The Hand of Glory",
    evidence: "\"'Ah, the Hand of Glory!' said Mr. Borgin... 'Best friend of thieves and plunderers!'\" — Chapter 4",
  },
  {
    id: 10,
    question: "Who was signing copies of his autobiography 'Magical Me' at Flourish and Blotts?",
    options: ["Albus Dumbledore", "Gilderoy Lockhart", "Miranda Goshawk", "Lucius Malfoy"],
    answer: "Gilderoy Lockhart",
    evidence: "\"GILDEROY LOCKHART will be signing copies of his autobiography MAGICAL ME today 12:30 p.m. to 4:30 p.m.\" — Chapter 4",
  },
  {
    id: 11,
    question: "What was Mr. Malfoy hit in the eye with during the brawl at the bookstore?",
    options: ["A cauldron", "An Encyclopedia of Toadstools", "A heavy spellbook", "A camera"],
    answer: "An Encyclopedia of Toadstools",
    evidence: "\"Mr. Weasley had a cut lip and Mr. Malfoy had been hit in the eye by an Encyclopedia of Toadstools.\" — Chapter 4",
  },
  {
    id: 12,
    question: "What was the content of the Weasley family vault at Gringotts?",
    options: ["A pile of gold", "A small pile of silver Sickles and one gold Galleon", "Empty", "Only bronze Knuts"],
    answer: "A small pile of silver Sickles and one gold Galleon",
    evidence: "\"There was a very small pile of silver Sickles inside, and just one gold Galleon.\" — Chapter 4",
  },
  {
    id: 13,
    question: "What happened to Ron's wand when the car crashed into the Whomping Willow?",
    options: ["It was lost", "It snapped, almost in two", "It turned into a snake", "It started glowing"],
    answer: "It snapped, almost in two",
    evidence: "\"'My wand,' said Ron, in a shaky voice. 'It had snapped, almost in two.'\" — Chapter 5",
  },
  {
    id: 14,
    question: "Which newspaper headline featured the flying car incident?",
    options: ["Wizards Among Us", "FLYING FORD ANGLIA MYSTIFIES MUGGLES", "The Boy Who Flew", "Ministry in Crisis"],
    answer: "FLYING FORD ANGLIA MYSTIFIES MUGGLES",
    evidence: "\"Snape unrolled today's issue of the Evening Prophet... FLYING FORD ANGLIA MYSTIFIES MUGGLES.\" — Chapter 5",
  },
  {
    id: 15,
    question: "What was the password to enter Gryffindor Tower upon Harry and Ron's arrival?",
    options: ["Fortuna Major", "Wattlebird", "Caput Draconis", "Pig snout"],
    answer: "Wattlebird",
    evidence: "\"'It's 'wattlebird,' ' said Hermione impatiently, 'but that's not the point —'\" — Chapter 5",
  },
  {
    id: 16,
    question: "How many times has Gilderoy Lockhart won Witch Weekly's Most-Charming-Smile Award?",
    options: ["Once", "Three times", "Five times", "He hasn't won it"],
    answer: "Five times",
    evidence: "\"I know, I know — it's not quite as good as winning Witch Weekly's Most-Charming-Smile Award five times in a row, as I have.\" — Chapter 6",
  },
  {
    id: 17,
    question: "What did the Howler do after it finished shouting Mrs. Weasley's message?",
    options: ["It flew away", "It turned into a bird", "It burst into flames and curled into ashes", "It fell silent"],
    answer: "It burst into flames and curled into ashes",
    evidence: "\"The red envelope, which had dropped from Ron's hand, burst into flames and curled into ashes.\" — Chapter 6",
  },
  {
    id: 18,
    question: "What did Ron use to patch up his broken wand?",
    options: ["Magic glue", "Spellotape", "A regular bandage", "A piece of wood"],
    answer: "Spellotape",
    evidence: "\"He had patched up his wand with some borrowed Spellotape, but it seemed to be damaged beyond repair.\" — Chapter 6",
  },
  {
    id: 19,
    question: "In Greenhouse Three, what was Justin Finch-Fletchley's intended school before Hogwarts?",
    options: ["Stonewall High", "Eton", "Smeltings", "Harrow"],
    answer: "Eton",
    evidence: "\"'My name was down for Eton, you know. I can't tell you how glad I am I came here instead.'\" — Chapter 6",
  },
  {
    id: 20,
    question: "True or False: Hermione outlined all of Lockhart's lessons in her schedule with little hearts.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"'Why,' demanded Ron, seizing her schedule, 'have you outlined all Lockhart's lessons in little hearts?'\" — Chapter 6",
  },
];

// --- Harry Potter: Prisoner of Azkaban (Book 3, Chapters 1-9) ---

export const HARRY_POTTER_POA_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "What was the topic of the essay Harry was writing by flashlight at the start of the book?",
    options: ["The History of Shrinking Potions", "The Discovery of the Snitch", "Witch Burning in the Fourteenth Century Was Completely Pointless", "Medieval Muggle Attitudes Toward Magic"],
    answer: "Witch Burning in the Fourteenth Century Was Completely Pointless",
    evidence: "\"Harry moved the tip of his eagle-feather quill down the page... 'Witch Burning in the Fourteenth Century Was Completely Pointless discuss.'\" — Chapter 1",
  },
  {
    id: 2,
    question: "Wendelin the Weird enjoyed being burned so much she allowed herself to be caught 47 times in various disguises.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Wendelin the Weird enjoyed being burned so much that she allowed herself to be caught no less than fortyseven times in various disguises.\" — Chapter 1",
  },
  {
    id: 3,
    question: "Which textbook was Harry using to help write his essay on witch burning?",
    options: ["The Monster Book of Monsters", "A History of Magic by Bathilda Bagshot", "Unfogging the Future", "Intermediate Transfiguration"],
    answer: "A History of Magic by Bathilda Bagshot",
    evidence: "\"(A History of Magic by Bathilda Bagshot) propped open against the pillow.\" — Chapter 1",
  },
  {
    id: 4,
    question: "How did Harry retrieve his spellbooks and wand from the cupboard under the stairs in Chapter 1?",
    options: ["He used the Alohomora charm", "He picked the lock while the Dursleys were admiring a new car", "He convinced Dudley to open it for him", "The door burst open magically"],
    answer: "He picked the lock while the Dursleys were admiring a new car",
    evidence: "\"Harry had crept downstairs, picked the lock on the cupboard under the stairs, grabbed some of his books...\" — Chapter 1",
  },
  {
    id: 5,
    question: "Why did Uncle Vernon answer Ron Weasley's telephone call with 'mingled fury and alarm'?",
    options: ["Because Ron was screaming at the top of his lungs", "Because the phone exploded in his hand", "Because Ron threatened to use magic", "Because Uncle Vernon hated all telephone calls"],
    answer: "Because Ron was screaming at the top of his lungs",
    evidence: "\"Ron was yelling so loudly that Uncle Vernon jumped and held the receiver a foot away from his ear...\" — Chapter 1",
  },
  {
    id: 6,
    question: "Harry realized he had turned thirteen at the exact moment the clock struck midnight.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"He had been thirteen years old, without realizing it, for a whole hour. (At 1:00 AM)\" — Chapter 1",
  },
  {
    id: 7,
    question: "What prize did Arthur Weasley win in the Daily Prophet Grand Prize Galleon Draw?",
    options: ["A trip to France", "Five hundred Galleons", "Seven hundred Galleons", "A new company car"],
    answer: "Seven hundred Galleons",
    evidence: "\"I couldn't believe it when Dad won the Daily Prophet Draw. Seven hundred galleons!\" — Chapter 1",
  },
  {
    id: 8,
    question: "What gift did Ron send Harry for his thirteenth birthday?",
    options: ["A Broomstick Servicing Kit", "A Pocket Sneakoscope", "The Monster Book of Monsters", "A box of dog biscuits"],
    answer: "A Pocket Sneakoscope",
    evidence: "\"Inside was what looked like a miniature glass spinning top... this is a Pocket Sneakoscope.\" — Chapter 1",
  },
  {
    id: 9,
    question: "Hermione purchased Harry's Broomstick Servicing Kit via owl-order while on holiday in France.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"I bought your present by owl-order... it was a sleek black leather case... reading Broomstick Servicing Kit.\" — Chapter 1",
  },
  {
    id: 10,
    question: "Which item is NOT included in Harry's Broomstick Servicing Kit?",
    options: ["Fleetwood’s High-Finish Handle Polish", "Tall-Twig Clippers", "A miniature Snitch", "A tiny brass compass"],
    answer: "A miniature Snitch",
    evidence: "\"There was a large jar of Fleetwood's High-Finish Handle Polish, a pair of gleaming silver Tall-Twig Clippers, a tiny brass compass...\" — Chapter 1",
  },
  {
    id: 11,
    question: "How did Harry finally manage to subdue 'The Monster Book of Monsters'?",
    options: ["He used a Flame Freezing Charm", "He buckled a belt around it", "He stroked its spine", "He put it in a cage"],
    answer: "He buckled a belt around it",
    evidence: "\"Harry... hurried to his chest of drawers, and pulled out a belt, which he buckled tightly around it.\" — Chapter 1",
  },
  {
    id: 12,
    question: "Aunt Marge is a biological blood relative of Harry Potter.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Even though she was not a blood relative of Harry's (whose mother had been Aunt Petunia's sister), he had been forced to call her 'Aunt' all his life.\" — Chapter 2",
  },
  {
    id: 13,
    question: "What is the name of Aunt Marge's favorite bulldog?",
    options: ["Fubster", "Ripper", "Dudders", "Scabbers"],
    answer: "Ripper",
    evidence: "\"Ripper had chased Harry out into the garden and up a tree...\" — Chapter 2",
  },
  {
    id: 14,
    question: "What institution do the Dursleys claim Harry attends to hide his magical education?",
    options: ["St. Brutus's Secure Center for Incurably Criminal Boys", "The London Home for Wayward Youths", "St. Mungo’s School of Correction", "Wool's Orphanage"],
    answer: "St. Brutus's Secure Center for Incurably Criminal Boys",
    evidence: "\"we've told Marge you attend St. Brutus's Secure Center for Incurably Criminal Boys.\" — Chapter 2",
  },
  {
    id: 15,
    question: "Aunt Marge uses canine breeding analogies to insult the quality of Harry’s parents.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"It all comes down to blood, as I was saying the other day. Bad blood will out.\" — Chapter 2",
  },
  {
    id: 16,
    question: "What specific insult about Harry's parents triggers his loss of control and the inflation of Aunt Marge?",
    options: ["She called them 'unemployed scroungers'", "She said they were killed in a car crash because they were drunk", "She called Harry's mother a 'bad egg'", "She said they dumped Harry on her doorstep"],
    answer: "She said they were killed in a car crash because they were drunk",
    evidence: "\"They go and get themselves killed in a car crash (drunk, I expect) --\" — Chapter 2",
  },
  {
    id: 17,
    question: "What magical mishap occurred to Aunt Marge's wineglass on the third day of her visit?",
    options: ["Harry threw it at her", "It exploded in her hand", "Ripper knocked it over", "It turned into a toad"],
    answer: "It exploded in her hand",
    evidence: "\"At that moment, the wineglass Aunt Marge was holding exploded in her hand.\" — Chapter 2",
  },
  {
    id: 18,
    question: "Aunt Marge lives in the country where she specializes in breeding spaniels.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Aunt Marge lived in the country... where she bred bulldogs.\" — Chapter 2",
  },
  {
    id: 19,
    question: "Uncle Vernon agrees to sign Harry's Hogsmeade form on the condition that Harry maintains the 'St. Brutus' story.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"If, at the end of it, you've toed the line and kept to the story, I'll sign your ruddy form.\" — Chapter 2",
  },
  {
    id: 20,
    question: "After fleeing Privet Drive, Harry first stops to catch his breath on Magnolia Crescent.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Harry was several streets away before he collapsed onto a low wall in Magnolia Crescent...\" — Chapter 3",
  },
  {
    id: 21,
    question: "Who serves as the conductor on the Knight Bus?",
    options: ["Ernie Prang", "Stan Shunpike", "Tom the Landlord", "Cornelius Fudge"],
    answer: "Stan Shunpike",
    evidence: "\"My name is Stan Shunpike, and I will be your conductor this eve --\" — Chapter 3",
  },
  {
    id: 22,
    question: "What is the standard price for a basic Knight Bus journey to London?",
    options: ["Seven Sickles", "Eleven Sickles", "Fifteen Sickles", "Two Galleons"],
    answer: "Eleven Sickles",
    evidence: "\"'Eleven Sickles,' said Stan, 'but for fifteen you get 'or chocolate...'\" — Chapter 3",
  },
  {
    id: 23,
    question: "The Knight Bus possesses the magical capability to travel underwater.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Can't do nuffink underwater.\" — Chapter 3",
  },
  {
    id: 24,
    question: "What pseudonym does Harry provide to Stan Shunpike to conceal his identity?",
    options: ["Dudley Dursley", "Neville Longbottom", "Ron Weasley", "Vernon Junior"],
    answer: "Neville Longbottom",
    evidence: "\"'Neville Longbottom,' said Harry, saying the first name that came into his head.\" — Chapter 3",
  },
  {
    id: 25,
    question: "How many individuals was Sirius Black convicted of killing with a single curse twelve years prior?",
    options: ["Twelve", "Thirteen", "Nine", "One"],
    answer: "Thirteen",
    evidence: "\"the magical community lives in fear of a massacre like that of twelve years ago, when Black murdered thirteen people with a single curse.\" — Chapter 3",
  },
  {
    id: 26,
    question: "Stan Shunpike asserts that Muggles 'never notice nuffink' even when magical anomalies occur in their presence.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Never notice nuffink, they don'.\" — Chapter 3",
  },
  {
    id: 27,
    question: "Which high-ranking Ministry official was waiting for Harry at the Leaky Cauldron?",
    options: ["Professor McGonagall", "Albus Dumbledore", "Cornelius Fudge", "Stan Shunpike"],
    answer: "Cornelius Fudge",
    evidence: "\"Harry looked up at the owner of the hand on his shoulder... he had walked right into Cornelius Fudge, the Minister of Magic himself.\" — Chapter 3",
  },
  {
    id: 28,
    question: "What was the official Ministry procedure performed on Aunt Marge following her inflation?",
    options: ["She was sent to St. Brutus's", "She was punctured and her memory was modified", "She was given a potion to stay thin", "She was sent to the Dursleys for Christmas"],
    answer: "She was punctured and her memory was modified",
    evidence: "\"Miss Dursley has been punctured and her memory has been modified.\" — Chapter 3",
  },
  {
    id: 29,
    question: "Cornelius Fudge utilizes his executive power to sign Harry's Hogsmeade permission form.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"'No, I'm sorry, Harry, but rules are rules,' said Fudge flatly.\" — Chapter 3",
  },
  {
    id: 30,
    question: "What is the technical acceleration specification of the Firebolt racing broom?",
    options: ["100 miles an hour in 5 seconds", "150 miles an hour in 10 seconds", "200 miles an hour in 10 seconds", "60 miles an hour in 3 seconds"],
    answer: "150 miles an hour in 10 seconds",
    evidence: "\"THE FIREBOLT HAS AN ACCELERATION OF 150 MILES AN HOUR IN TEN SECONDS...\" — Chapter 4",
  },
  {
    id: 31,
    question: "Which Diagon Alley shopkeeper assisted Harry with his history essays during the summer?",
    options: ["Florean Fortescue", "Madam Malkin", "Tom the Landlord", "Professor Binns"],
    answer: "Florean Fortescue",
    evidence: "\"finishing all his essays with occasional help from Florean Fortescue himself...\" — Chapter 4",
  },
  {
    id: 32,
    question: "Flourish and Blotts once lost significant revenue when they could not locate two hundred copies of the 'Invisible Book of Invisibility'.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"I thought we'd seen the worst when we bought two hundred copies of the Invisible Book of Invisibility -cost a fortune, and we never found them.\" — Chapter 4",
  },
  {
    id: 33,
    question: "What is the title of the required Divination textbook by Cassandra Vablatsky?",
    options: ["Death Omens", "Unfogging the Future", "Predicting the Unpredictable", "Broken Balls"],
    answer: "Unfogging the Future",
    evidence: "\"I need Unfogging the Future by Cassandra Vablatsky.\" — Chapter 4",
  },
  {
    id: 34,
    question: "What creature is depicted on the cover of the book 'Death Omens'?",
    options: ["A black dog large as a bear with gleaming eyes", "A skeletal figure in a cloak", "A pool of blood", "A shattered crystal ball"],
    answer: "A black dog large as a bear with gleaming eyes",
    evidence: "\"it showed a black dog large as a bear, with gleaming eyes.\" — Chapter 4",
  },
  {
    id: 35,
    question: "Hermione chooses to take Muggle Studies to gain a scholarly wizarding perspective on non-magical people.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"But it'll be fascinating to study them from the wizarding point of view.\" — Chapter 4",
  },
  {
    id: 36,
    question: "What is the name of the large ginger cat Hermione purchases in Diagon Alley?",
    options: ["Scabbers", "Crookshanks", "Errol", "Hedwig"],
    answer: "Crookshanks",
    evidence: "\"Her arms were clamped tightly around the enormous ginger cat... 'No, Crookshanks, no!'\" — Chapter 4",
  },
  {
    id: 37,
    question: "What new rank is indicated by the silver badge on Percy Weasley's chest?",
    options: ["Prefect", "Head Boy", "Quidditch Captain", "Minister's Assistant"],
    answer: "Head Boy",
    evidence: "\"P.S. Percy's Head Boy. He got the letter last week.\" — Chapter 4",
  },
  {
    id: 38,
    question: "Mr. Weasley believes that Harry has a right to know the truth about the threat posed by Sirius Black.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Harry's got a right to know. I've tried to tell Fudge, but he insists on treating Harry like a child.\" — Chapter 4",
  },
  {
    id: 39,
    question: "What specific phrase has Sirius Black been observed repeating in his sleep at Azkaban?",
    options: ["I'll get him...", "He's at Hogwarts...", "Voldemort will return...", "It wasn't me..."],
    answer: "He's at Hogwarts...",
    evidence: "\"Black's been talking in his sleep... Always the same words: 'He's at Hogwarts... he's at Hogwarts.'\" — Chapter 4",
  },
  {
    id: 40,
    question: "How many courses are served at the farewell dinner hosted at the Leaky Cauldron?",
    options: ["Three", "Seven", "Five", "Four"],
    answer: "Five",
    evidence: "\"...ate their way through five delicious courses.\" — Chapter 4",
  },
  {
    id: 41,
    question: "Fred and George successfully altered Percy's Head Boy badge to read 'Humongous Bighead'.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"The badge now read Bighead Boy. (They *said* HB stood for Humongous Bighead earlier).\" — Chapter 4",
  },
  {
    id: 42,
    question: "In the *Daily Prophet* excerpt regarding Black's escape, how is his weapon described to Muggles to bridge the gap between magical and non-magical understanding?",
    options: ["A magic wand", "A gun (described as a metal wand)", "A sharpened dagger", "An explosive device"],
    answer: "A gun (described as a metal wand)",
    evidence: "\"While Muggles have been told that Black is carrying a gun (a kind of metal wand that Muggles use to kill each other)...\" — Chapter 3",
  },
  {
    id: 43,
    question: "Stan Shunpike informs Harry that Black was believed to be Voldemort's second-in-command.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"I 'eard he thought 'e'd be second-in-command once You-Know-'Oo 'ad taken over.\" — Chapter 3",
  },
  {
    id: 44,
    question: "Arthur Weasley emphasizes to his wife that Harry must be put on his guard against the threat of Black.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"I don't want to make him miserable, I want to put him on his guard!\" — Chapter 4",
  },
  {
    id: 45,
    question: "According to the accounts Stan tells Harry, Sirius Black laughed after he was cornered by Ministry reinforcements.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Laughed... Jus' stood there an' laughed... still laughing 'is 'ead off.\" — Chapter 3",
  },
  {
    id: 46,
    question: "Which Ministry employees drive the cars that transport the Weasleys and Harry to King's Cross?",
    options: ["Cornelius Fudge", "Furtive-looking wizards in emerald velvet suits", "Arthur Weasley alone", "Stan Shunpike"],
    answer: "Furtive-looking wizards in emerald velvet suits",
    evidence: "\"each of which was driven by a furtive-looking wizard wearing a suit of emerald velvet.\" — Chapter 5",
  },
  {
    id: 47,
    question: "What is Penelope Clearwater's relationship to Percy Weasley?",
    options: ["Sister", "Head Girl", "Girlfriend", "Rival"],
    answer: "Girlfriend",
    evidence: "\"Now he's accusing me of dripping tea on his photo of Penelope Clearwater. You know... his girlfriend.\" — Chapter 5",
  },
  {
    id: 48,
    question: "Professor R. J. Lupin's luggage is a battered case held together by a large quantity of neatly knotted string.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"where there was a small, battered case held together with a large quantity of neatly knotted string.\" — Chapter 5",
  },
  {
    id: 49,
    question: "What item begins to whistle piercingly in Harry's trunk during the train journey?",
    options: ["A Foe-Glass", "A Pocket Sneakoscope", "A Remembrall", "The Monster Book of Monsters"],
    answer: "A Pocket Sneakoscope",
    evidence: "\"A moment later he had pulled the Pocket Sneakoscope out from between Harry's robes. It was spinning very fast...\" — Chapter 5",
  },
  {
    id: 50,
    question: "According to the text in Chapter 5, what is the 'Shrieking Shack' known for?",
    options: ["Being the headquarters of the goblin rebellion", "Being the most severely haunted building in Britain", "Being Sirius Black's hideout", "Being a candy shop"],
    answer: "Being the most severely haunted building in Britain",
    evidence: "\"and the Shrieking Shack supposed to be the most severely haunted building in Britain --\" — Chapter 5",
  },
  {
    id: 51,
    question: "The Dementor's hand is described as glistening, grayish, slimy-looking, and scabbed.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"There was a hand protruding from the cloak and it was glistening, grayish, slimy-looking, and scabbed...\" — Chapter 5",
  },
  {
    id: 52,
    question: "What unique physiological sensation does Harry experience when the Dementor enters the compartment?",
    options: ["A high-pitched ringing", "A rushing in his ears as though of water", "A sharp pain in his lightning scar", "A smell of cold earth"],
    answer: "A rushing in his ears as though of water",
    evidence: "\"There was a rushing in his ears as though of water. He was being dragged downward, the roaring growing louder.\" — Chapter 5",
  },
  {
    id: 53,
    question: "What restorative substance does Professor Lupin provide to the students following the Dementor incident?",
    options: ["A revitalizing potion", "Hot butterbeer", "A slab of chocolate", "A warm blanket"],
    answer: "A slab of chocolate",
    evidence: "\"Professor Lupin was breaking an enormous slab of chocolate into pieces... 'Eat it. It'll help.'\" — Chapter 5",
  },
  {
    id: 54,
    question: "Professor McGonagall pulls Hermione aside specifically to discuss her academic course schedule.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"word with Miss Granger about her course schedule.\" — Chapter 5",
  },
  {
    id: 55,
    question: "What is the new password for Gryffindor Tower for the start of the third year?",
    options: ["Fortuna Major", "Caput Draconis", "Wattlebird", "Mimbulus Mimbletonia"],
    answer: "Fortuna Major",
    evidence: "\"'The new password's 'Fortuna Major'!' (stated by Percy)\" — Chapter 5",
  },
  {
    id: 56,
    question: "Why did Professor Kettleburn retire from his post at Hogwarts?",
    options: ["To go to Egypt", "To spend more time with his remaining limbs", "He was fired for a breach of security", "He was too old to teach"],
    answer: "To spend more time with his remaining limbs",
    evidence: "\"...retired at the end of last year in order to enjoy more time with his remaining limbs.\" — Chapter 5",
  },
  {
    id: 57,
    question: "Dumbledore informs the students that Dementors are not fooled by Invisibility Cloaks.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Dementors are not to be fooled by tricks or disguises -- or even Invisibility Cloaks...\" — Chapter 5",
  },
  {
    id: 58,
    question: "What is the reaction of Ginny Weasley to the Dementor’s presence on the train?",
    options: ["She faints like Harry", "She shakes like mad and sobs", "She laughs uncontrollably", "She tries to fight it"],
    answer: "She shakes like mad and sobs",
    evidence: "\"Ginny was shaking like mad, though.... Ginny... gave a small sob.\" — Chapter 5",
  },
  {
    id: 59,
    question: "Professor Lupin uses the Waddiwasi spell to repel the Dementor on the train.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Lupin muttered something, and a silvery thing shot out of his wand at it... (Waddiwasi is used on Peeves in Chapter 7).\" — Chapter 5",
  },
  {
    id: 60,
    question: "What is the primary color of the Hogwarts Express engine?",
    options: ["Emerald Green", "Scarlet", "Deep Purple", "Pitch Black"],
    answer: "Scarlet",
    evidence: "\"looked up to see the Hogwarts Express, a scarlet steam engine...\" — Chapter 5",
  },
  {
    id: 61,
    question: "To pass through the barrier at King's Cross, Harry and Mr. Weasley lean casually against it.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"With a meaningful look at Harry, he leaned casually against the barrier. Harry imitated him.\" — Chapter 5",
  },
  {
    id: 62,
    question: "Why are Ron, Harry, and Hermione surprised to find an adult in their train compartment?",
    options: ["Adults are usually forbidden on the train", "The train is usually reserved for students only", "The adult looked like Sirius Black", "The adult was a ghost"],
    answer: "The train is usually reserved for students only",
    evidence: "\"The Hogwarts Express was usually reserved for students and they had never seen an adult there before...\" — Chapter 5",
  },
  {
    id: 63,
    question: "Hermione correctly identifies Professor Lupin because his name is stamped on his battered case.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"The name Professor R. J. Lupin was stamped across one corner in peeling letters.\" — Chapter 5",
  },
  {
    id: 64,
    question: "How does the text describe the appearance of the windows as the rain thickens during the journey?",
    options: ["Crystal clear", "Solid, shimmering gray", "Covered in frost", "Streaked with blood"],
    answer: "Solid, shimmering gray",
    evidence: "\"the windows were now a solid, shimmering gray...\" — Chapter 5",
  },
  {
    id: 65,
    question: "Neville Longbottom accidentally sits on Crookshanks in the dark of the train compartment.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Neville had tried to sit on Crookshanks.\" — Chapter 5",
  },
  {
    id: 66,
    question: "Who is the small knight in the painting who guides Harry's group to Divination?",
    options: ["The Fat Lady", "Sir Cadogan", "The Bloody Baron", "Sir Nicholas"],
    answer: "Sir Cadogan",
    evidence: "\"call upon Sir Cadogan! ... and they saw him reappear in front of an alarmed group of women...\" — Chapter 6",
  },
  {
    id: 67,
    question: "Which ailment does Professor Trelawney predict will disrupt her voice in February?",
    options: ["A magical cough", "A nasty bout of flu", "The Grim's shadow", "Laryngitis"],
    answer: "A nasty bout of flu",
    evidence: "\"Unfortunately, classes will be disrupted in February by a nasty bout of flu. I myself will lose my voice.\" — Chapter 6",
  },
  {
    id: 68,
    question: "Professor Trelawney warns Parvati Patil to beware a red-haired man.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"By the way, my dear, ... beware a red-haired man.\" — Chapter 6",
  },
  {
    id: 69,
    question: "In the art of Divination, what is the 'Grim' an omen of?",
    options: ["A windfall of gold", "Great happiness", "Death", "A successful hunt"],
    answer: "Death",
    evidence: "\"The Grim, my dear, the Grim! ... it is an omen -- the worst omen -- of death!\" — Chapter 6",
  },
  {
    id: 70,
    question: "How does Professor McGonagall define an 'Animagus' during her lecture?",
    options: ["A wizard who can speak to animals", "A wizard who can transform at will into an animal", "A wizard who studies ancient runes", "A creature that is half-human, half-horse"],
    answer: "A wizard who can transform at will into an animal",
    evidence: "\"telling them about Animagi (wizards who could transform at will into animals)...\" — Chapter 6",
  },
  {
    id: 71,
    question: "Professor McGonagall claims that Trelawney has predicted a student's death every year without a single fatality.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Sibyll Trelawney has predicted the death of one student a year since she arrived... None of them has died yet.\" — Chapter 6",
  },
  {
    id: 72,
    question: "What color are a Hippogriff's eyes according to the text in Chapter 6?",
    options: ["Steel-gray", "Brilliant orange", "Emerald green", "Pale blue"],
    answer: "Brilliant orange",
    evidence: "\"wings, and heads of what seemed to be giant eagles, with cruel, steel-colored beaks and large, brilliantly, orange eyes.\" — Chapter 6",
  },
  {
    id: 73,
    question: "What is the very first step in proper etiquette when approaching a Hippogriff?",
    options: ["Offer it a dead ferret", "Bow and wait for the creature to return the gesture", "Stroke its wings", "Maintain eye contact and blink rapidly"],
    answer: "Bow and wait for the creature to return the gesture",
    evidence: "\"Yeh always wait fer the hippogriff ter make the firs' move... Yeh walk toward him, and yeh bow...\" — Chapter 6",
  },
  {
    id: 74,
    question: "During his first lesson with Hagrid, Harry rides a Hippogriff named Witherwings.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Good man, Harry! ... let's see how yeh get on with Buckbeak.\" — Chapter 6",
  },
  {
    id: 75,
    question: "What is the length of the talons on a Hippogriff's front legs?",
    options: ["Two inches", "Half a foot", "One foot", "Three inches"],
    answer: "Half a foot",
    evidence: "\"The talons on their front legs were half a foot long and deadly looking.\" — Chapter 6",
  },
  {
    id: 76,
    question: "What specific insult does Draco Malfoy use right before Buckbeak attacks him?",
    options: ["Ugly brute", "Overgrown chicken", "Stupid bird", "Filthy creature"],
    answer: "Ugly brute",
    evidence: "\"Are you, you great ugly brute?\" — Chapter 6",
  },
  {
    id: 77,
    question: "Hagrid expresses regret to the students, wishing he had started with flobberworms.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Shoulda left hippogriffs fer later... done flobberworms or summat...\" — Chapter 6",
  },
  {
    id: 78,
    question: "Which ingredients are part of the Shrinking Solution brewed in Chapter 7?",
    options: ["Dragon blood and nettles", "Daisy roots, shrivelfig, caterpillars, rat spleen, and leech juice", "Bezoar and boomslang skin", "Wolfsbane and moonstone"],
    answer: "Daisy roots, shrivelfig, caterpillars, rat spleen, and leech juice",
    evidence: "\"cut up Malfoy's roots... shrivelfig skinned... slice my caterpillars... rat spleen... leech juice...\" — Chapter 7",
  },
  {
    id: 79,
    question: "What is the color of a correctly brewed Shrinking Solution?",
    options: ["Orange", "Bright, acid green", "Cloudy blue", "Deep purple"],
    answer: "Bright, acid green",
    evidence: "\"His potion, which was supposed to be a bright, acid green, had turned -- Orange...\" — Chapter 7",
  },
  {
    id: 80,
    question: "Professor Snape threatens to test Neville's potion on his pet toad, Trevor.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"at the end of this lesson we will feed a few drops of this potion to your toad and see what happens.\" — Chapter 7",
  },
  {
    id: 81,
    question: "A Boggart’s true form while alone is well-documented in wizarding textbooks.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Nobody knows what a boggart looks like when he is alone...\" — Chapter 7",
  },
  {
    id: 82,
    question: "The Riddikulus charm is the standard magical repellant for a Boggart.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"The charm that repels a boggart is simple... Riddikulus!\" — Chapter 7",
  },
  {
    id: 83,
    question: "What is Neville's Boggart forced to wear when the Riddikulus charm is cast?",
    options: ["A clown suit and red nose", "A vulture-topped hat, a green dress, and a red handbag", "A pair of roller skates", "A giant diaper"],
    answer: "A vulture-topped hat, a green dress, and a red handbag",
    evidence: "\"wearing a long, lace-trimmed dress and a towering hat topped with a moth-eaten vulture, and he was swinging a huge crimson handbag.\" — Chapter 7",
  },
  {
    id: 84,
    question: "The 'logic' behind bowing to a Hippogriff is to show respect to a proud and easily offended creature.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Now, firs' thing yeh gotta know abou' hippogriffs is, they're proud... Yeh walk toward him, and yeh bow...\" — Chapter 6",
  },
  {
    id: 85,
    question: "What form does the Boggart take when it encounters Parvati Patil?",
    options: ["A severed hand", "A bloodstained, bandaged mummy", "A banshee", "A giant spider"],
    answer: "A bloodstained, bandaged mummy",
    evidence: "\"where he had stood was a bloodstained, bandaged mummy; its sightless face was turned to Parvati...\" — Chapter 7",
  },
  {
    id: 86,
    question: "When facing Seamus Finnigan, what does the Boggart transform into?",
    options: ["A snake", "A banshee with a skeletal, green-tinged face", "A cockroach", "A mummy"],
    answer: "A banshee with a skeletal, green-tinged face",
    evidence: "\"Where the mummy had been was... a banshee... with a skeletal, green-tinged face.\" — Chapter 7",
  },
  {
    id: 87,
    question: "In the book, Ron Weasley’s Boggart (a spider) loses its legs rather than gaining roller skates.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Ron bellowed 'Riddikulus!' and the spider's legs vanished; it rolled over and over...\" — Chapter 7",
  },
  {
    id: 88,
    question: "What form does the Boggart take when it faces Professor Lupin?",
    options: ["A Dementor", "A silvery-white orb", "Lord Voldemort", "A crystal ball"],
    answer: "A silvery-white orb",
    evidence: "\"Then they saw a silvery-white orb hanging in the air in front of Lupin...\" — Chapter 7",
  },
  {
    id: 89,
    question: "Which goblin-like creatures lurk in deserted battlefields to bludgeon the lost?",
    options: ["Kappas", "Red Caps", "Grindylows", "Hinkypunks"],
    answer: "Red Caps",
    evidence: "\"studied Red Caps... in the potholes of deserted battlefields, waiting to bludgeon those who had gotten lost.\" — Chapter 8",
  },
  {
    id: 90,
    question: "Lavender Brown's rabbit, Binky, was reported to have been killed by a fox on October 16th.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"It's her rabbit, Binky. He's been killed by a fox.\" — Chapter 8",
  },
  {
    id: 91,
    question: "On what specific date did Professor Trelawney predict Lavender Brown's dread would come to pass?",
    options: ["October 31st", "October 16th", "September 1st", "November 1st"],
    answer: "October 16th",
    evidence: "\"Incidentally, that thing you are dreading -- it will happen on Friday the sixteenth of October.\" — Chapter 6",
  },
  {
    id: 92,
    question: "What creature is delivered to Lupin's office for the students' next practical lesson in Chapter 8?",
    options: ["A Kappa", "A Grindylow", "A Hinkypunk", "A Red Cap"],
    answer: "A Grindylow",
    evidence: "\"I've just taken delivery of a grindylow for our next lesson.\" — Chapter 8",
  },
  {
    id: 93,
    question: "Professor Lupin informs Harry that his fear of Dementors is wise as it means he fears fear itself.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"That suggests that what you fear most of all is -- fear. Very wise, Harry.\" — Chapter 8",
  },
  {
    id: 94,
    question: "What does Professor Snape deliver to Lupin while Harry is in the office in Chapter 8?",
    options: ["Harry's detention notice", "A smoking goblet of potion", "A message from Dumbledore", "A replacement textbook"],
    answer: "A smoking goblet of potion",
    evidence: "\"in came Snape. He was carrying a goblet, which was smoking faintly...\" — Chapter 8",
  },
  {
    id: 95,
    question: "Which entity provides Dumbledore with the first confirmation that Sirius Black attacked the Fat Lady?",
    options: ["Professor McGonagall", "Peeves the Poltergeist", "Argus Filch", "Nearly Headless Nick"],
    answer: "Peeves the Poltergeist",
    evidence: "\"Nasty temper he's got, that Sirius Black. (Peeves telling Dumbledore)\" — Chapter 8",
  },
  {
    id: 96,
    question: "The Fat Lady was discovered hiding within a map of Argyllshire on the castle’s second floor.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Hiding in a map of Argyllshire on the second floor.\" — Chapter 9",
  },
  {
    id: 97,
    question: "Who is appointed as the temporary guardian of Gryffindor Tower following the Fat Lady’s attack?",
    options: ["The Bloody Baron", "Sir Cadogan and his gray pony", "A flowering shrub", "Sir Nicholas"],
    answer: "Sir Cadogan and his gray pony",
    evidence: "\"Replaced with the portrait of Sir Cadogan and his fat gray pony.\" — Chapter 9",
  },
  {
    id: 98,
    question: "Snape conducts a substitute lesson for Lupin focusing on werewolves.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Today we shall discuss -- Werewolves.\" — Chapter 9",
  },
  {
    id: 99,
    question: "On which page of the textbook does Snape instruct the class to find the chapter on werewolves?",
    options: ["394", "290", "400", "100"],
    answer: "394",
    evidence: "\"And I am telling you all to turn to page 394.\" — Chapter 9",
  },
];

// --- Harry Potter: Goblet of Fire (Book 4, Chapters 1-10) ---

export const HARRY_POTTER_GOF_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "What is the name of the village pub where the residents of Little Hangleton gathered to discuss the Riddle murders?",
    options: ["The Hanged Man", "The Leaky Cauldron", "The Three Broomsticks", "The Boar's Head"],
    answer: "The Hanged Man",
    evidence: "\"The Hanged Man, the village pub, did a roaring trade that night; the whole village seemed to have turned out to discuss the murders.\" — Chapter 1/The Riddle House",
  },
  {
    id: 2,
    question: "Frank Bryce was approaching which specific birthday when he observed the lights in the Riddle House?",
    options: ["Sixty-fifth", "Seventy-seventh", "Eightieth", "Seventieth"],
    answer: "Seventy-seventh",
    evidence: "\"Frank was nearing his seventy-seventh birthday now, very deaf, his bad leg stiffer than ever...\" — Chapter 1/The Riddle House",
  },
  {
    id: 3,
    question: "Upon waking at Privet Drive, Harry described the sensation in his scar using which specific comparison?",
    options: ["A stinging bee", "A white-hot wire", "A burning coal", "A sharp needle"],
    answer: "A white-hot wire",
    evidence: "\"The old scar on his forehead... was burning beneath his fingers as though someone had just pressed a white-hot wire to his skin.\" — Chapter 2/The Scar",
  },
  {
    id: 4,
    question: "For what specific reasons were the elderly Mr. and Mrs. Riddle considered unpopular in their village?",
    options: ["They were suspected of witchcraft", "They were rich, snobbish, and rude", "They were reclusive and strange", "They were involved in political scandals"],
    answer: "They were rich, snobbish, and rude",
    evidence: "\"Nobody wasted their breath pretending to feel very sad about the Riddles, for they had been most unpopular. Elderly Mr. and Mrs. Riddle had been rich, snobbish, and rude...\" — Chapter 1/The Riddle House",
  },
  {
    id: 5,
    question: "What was the medical conclusion regarding the cause of death for the Riddle family?",
    options: ["Undetectable poisoning", "Sudden cardiac arrest", "No apparent medical cause", "Asphyxiation"],
    answer: "No apparent medical cause",
    evidence: "\"In fact (the report continued, in a tone of unmistakable bewilderment), the Riddles all appeared to be in perfect health — apart from the fact that they were all dead.\" — Chapter 1/The Riddle House",
  },
  {
    id: 6,
    question: "Which member of the Riddle household staff originally discovered the three bodies?",
    options: ["Frank Bryce", "The cook", "The maid", "The butler"],
    answer: "The maid",
    evidence: "\"Fifty years before... a maid had entered the drawing room to find all three Riddles dead.\" — Chapter 1/The Riddle House",
  },
  {
    id: 7,
    question: "What is the name of the twelve-foot-long snake Voldemort communicates with in the Riddle House?",
    options: ["Basilisk", "Nagini", "Aragog", "Maledictus"],
    answer: "Nagini",
    evidence: "\"“Where is Nagini?” said the cold voice.\" — Chapter 1/The Riddle House",
  },
  {
    id: 8,
    question: "Which Quidditch-themed book was Harry reading at Privet Drive before falling asleep?",
    options: ["Quidditch Through the Ages", "The Standard Book of Spells", "Flying with the Cannons", "A History of Magic"],
    answer: "Flying with the Cannons",
    evidence: "\"He placed Flying with the Cannons on his bedside table, crossed to the window...\" — Chapter 2/The Scar",
  },
  {
    id: 9,
    question: "What electronic device did Dudley Dursley throw out of the window during a fit of rage regarding his diet?",
    options: ["A television", "His PlayStation", "A video recorder", "A computer monitor"],
    answer: "His PlayStation",
    evidence: "\"...he got really angry and chucked his PlayStation out of the window.\" — Chapter 2/The Scar",
  },
  {
    id: 10,
    question: "How long did Voldemort claim he had waited to use Harry Potter for his restoration plan?",
    options: ["Ten years", "Twelve years", "Thirteen years", "Fourteen years"],
    answer: "Thirteen years",
    evidence: "\"“I have my reasons for using the boy, as I have already explained to you... I have waited thirteen years.”\" — Chapter 1/The Riddle House",
  },
  {
    id: 11,
    question: "Frank Bryce attempted to contact the police via a telephone before entering the Riddle House.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Frank had no telephone, in any case, he had deeply mistrusted the police ever since they had taken him in for questioning...\" — Chapter 1/The Riddle House",
  },
  {
    id: 12,
    question: "Harry concluded that his scar was hurting because Voldemort was physically hiding in Privet Drive.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"The idea of Voldemort lurking in Privet Drive was absurd, impossible…\" — Chapter 2/The Scar",
  },
  {
    id: 13,
    question: "The Dursleys claimed Harry attended St. Brutus’s Secure Center for Incurably Criminal Boys to explain his absences.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"They had explained away Harry’s long absences at Hogwarts... by telling everyone that he went to St. Brutus’s Secure Center for Incurably Criminal Boys.\" — Chapter 2/The Scar",
  },
  {
    id: 14,
    question: "Frank Bryce was initially released by the police because of a medical report, despite the cook’s suspicion regarding a spare key.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"As there was no proof that the Riddles had been murdered at all, the police were forced to let Frank go.\" — Chapter 1/The Riddle House",
  },
  {
    id: 15,
    question: "Wormtail suggested that the plan to return Voldemort to power could be completed faster if they used a different wizard than Harry.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“It could be done without Harry Potter, My Lord... if we were to use another witch or wizard — any wizard — the thing could be done so much more quickly!”\" — Chapter 1/The Riddle House",
  },
  {
    id: 16,
    question: "Harry considered writing to Professor Dumbledore about his scar but worried the message would sound stupid.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Even inside his head the words sounded stupid. *Dear Professor Dumbledore, Sorry to bother you, but my scar hurt this morning.*\" — Chapter 2/The Scar",
  },
  {
    id: 17,
    question: "The Riddles’ cook publicly defended Frank Bryce’s character at the pub.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“Always thought he was odd,” she told the eagerly listening villagers... “All Frank had to do was creep up to the big house while we was all sleeping…”\" — Chapter 1/The Riddle House",
  },
  {
    id: 18,
    question: "Frank Bryce was a war veteran who returned home with a very stiff leg.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Frank had come back from the war with a very stiff leg and a great dislike of crowds and loud noises...\" — Chapter 1/The Riddle House",
  },
  {
    id: 19,
    question: "Frank Bryce attempted to bluff Voldemort by claiming his wife knew his current location.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“And I’ll tell you this too,” he added, on a sudden inspiration, “my wife knows I’m up here...”\" — Chapter 1/The Riddle House",
  },
  {
    id: 20,
    question: "Frank Bryce died before his body hit the floor after being struck by a flash of green light.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"There was a flash of green light, a rushing sound, and Frank Bryce crumpled. He was dead before he hit the floor.\" — Chapter 1/The Riddle House",
  },
  {
    id: 21,
    question: "How did Molly Weasley’s letter to the Dursleys physically appear when delivered by the postman?",
    options: ["Torn and wet", "Covered in stamps except for a square inch", "In a bright purple envelope", "Hand-delivered by an owl"],
    answer: "Covered in stamps except for a square inch",
    evidence: "\"Every bit of it was covered in stamps except for a square inch on the front, into which Mrs. Weasley had squeezed the Dursleys’ address in minute writing.\" — Chapter 3/The Invitation",
  },
  {
    id: 22,
    question: "The Smeltings school nurse described Dudley’s size and weight as reaching that of what animal?",
    options: ["A baby elephant", "A young killer whale", "A mountain troll", "A giant hippopotamus"],
    answer: "A young killer whale",
    evidence: "\"Dudley had reached roughly the size and weight of a young killer whale.\" — Chapter 3/The Invitation",
  },
  {
    id: 23,
    question: "In which country does Charlie Weasley work with dragons?",
    options: ["Egypt", "Romania", "Albania", "Norway"],
    answer: "Romania",
    evidence: "\"This had to be Charlie, who worked with dragons in Romania.\" — Chapter 5/Weasley's Wizard Wheezes",
  },
  {
    id: 24,
    question: "According to Mr. Weasley, what is the specific term for leaving half of oneself behind during improper Apparition?",
    options: ["Splinching", "Severing", "Snapping", "Fracturing"],
    answer: "Splinching",
    evidence: "\"“This pair I’m talking about went and splinched themselves... They left half of themselves behind,” said Mr. Weasley...\" — Chapter 6/The Portkey",
  },
  {
    id: 25,
    question: "Mr. Weasley’s contact at the Floo Regulation Panel is situated within which specific office of his employment?",
    options: ["The Floo Network Authority", "The Misuse of Muggle Artifacts Office", "The Department of Magical Transportation", "The Committee on Experimental Charms"],
    answer: "The Misuse of Muggle Artifacts Office",
    evidence: "\"Mr. Weasley was a fully qualified wizard who worked in the Misuse of Muggle Artifacts Office at the Ministry of Magic...\" — Chapter 2/The Scar",
  },
  {
    id: 26,
    question: "What kind of practical joke charm was applied to the toffees that Fred Weasley intentionally dropped at Privet Drive?",
    options: ["A Shrinking Charm", "An Engorgement Charm", "A Tongue-Twister Curse", "A Silencing Spell"],
    answer: "An Engorgement Charm",
    evidence: "\"“...it was the toffee — my son Fred — real practical joker — but it’s only an Engorgement Charm —”\" — Chapter 4/Back to the Burrow",
  },
  {
    id: 27,
    question: "What specific object was used as the Portkey at the top of Stoatshead Hill?",
    options: ["An old newspaper", "A moldy-looking old boot", "A punctured football", "An empty drinks can"],
    answer: "A moldy-looking old boot",
    evidence: "\"Mr. Weasley was shaking hands with a ruddy-faced wizard... who was holding a moldy-looking old boot in his other hand.\" — Chapter 6/The Portkey",
  },
  {
    id: 28,
    question: "Which Weasley brother is employed as a curse-breaker at Gringotts?",
    options: ["Charlie", "Percy", "Bill", "Fred"],
    answer: "Bill",
    evidence: "\"Harry knew that he worked for the wizarding bank, Gringotts...\" — Chapter 5/Weasley's Wizard Wheezes",
  },
  {
    id: 29,
    question: "By what method did Mrs. Weasley detect the toffees being smuggled out of the Burrow by the twins?",
    options: ["She used a Revealing Spell", "She used a Summoning Charm", "She checked their rucksacks by hand", "Ron informed on them"],
    answer: "She used a Summoning Charm",
    evidence: "\"“Accio! Accio! Accio!” she shouted, and toffees zoomed from all sorts of unlikely places...\" — Chapter 6/The Portkey",
  },
  {
    id: 30,
    question: "Dudley Dursley's grapefruit theft occurred while Aunt Petunia was occupied with which specific item?",
    options: ["The morning mail", "The kettle", "Straightening cushions", "The toaster"],
    answer: "The kettle",
    evidence: "\"Quick as a flash, while his mother was occupied with the kettle, Dudley stole the rest of Uncle Vernon’s grapefruit.\" — Chapter 3/The Invitation",
  },
  {
    id: 31,
    question: "Mr. Weasley informs Uncle Vernon that he maintains a very large collection of batteries.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“I collect plugs,” he added to Uncle Vernon. “And batteries. Got a very large collection of batteries.”\" — Chapter 4/Back to the Burrow",
  },
  {
    id: 32,
    question: "Hermione's parents sent Harry a box of sugar-free snacks because they are dentists.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Hedwig had returned from Hermione’s house with a large box stuffed full of sugar-free snacks. (Hermione’s parents were dentists.)\" — Chapter 3/The Invitation",
  },
  {
    id: 33,
    question: "Uncle Vernon permitted Harry to attend the World Cup primarily due to fear of Harry's dangerous godfather.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"...but Harry had seen the pupils of his tiny eyes contract with sudden fear. “Well — yeah,” said Harry, casually. “It’s been a while since he heard from me...”\" — Chapter 3/The Invitation",
  },
  {
    id: 34,
    question: "The Weasleys used their old Ford Anglia to drive Harry to Stoatshead Hill.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"They didn’t have a car anymore; the old Ford Anglia they had once owned was currently running wild in the Forbidden Forest...\" — Chapter 4/Back to the Burrow",
  },
  {
    id: 35,
    question: "Harry savored a piece of birthday cake while Dudley was restricted to a quarter of a grapefruit.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Harry still had two of them left, and so, looking forward to a real breakfast when he got back upstairs, he ate his grapefruit without complaint.\" — Chapter 3/The Invitation",
  },
  {
    id: 36,
    question: "Fred and George Weasley personally retrieved Harry’s school trunk from his bedroom at Privet Drive.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“We’ll get it,” said Fred at once. Winking at Harry, he and George left the room.\" — Chapter 4/Back to the Burrow",
  },
  {
    id: 37,
    question: "Charlie Weasley successfully passed his Apparition test on his first attempt.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“Charlie had to take the test twice,” said Fred, grinning. “He failed the first time.”\" — Chapter 6/The Portkey",
  },
  {
    id: 38,
    question: "The Ton-Tongue Toffee caused Dudley’s tongue to grow four feet long before it was shrunk.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“It was four feet long before his parents would let me shrink it!”\" — Chapter 5/Weasley's Wizard Wheezes",
  },
  {
    id: 39,
    question: "Aunt Petunia shielded Dudley from Mr. Weasley’s wand after the toffee incident.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"...but Aunt Petunia screamed worse than ever and threw herself on top of Dudley, shielding him from Mr. Weasley.\" — Chapter 4/Back to the Burrow",
  },
  {
    id: 40,
    question: "Amos Diggory is employed by the Department of Magical Transportation.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“He works for the Department for the Regulation and Control of Magical Creatures.”\" — Chapter 6/The Portkey",
  },
  {
    id: 41,
    question: "What items did Mr. Weasley provide to Harry, Ron, and Hermione for the purpose of collecting water?",
    options: ["Two buckets", "A kettle and saucepans", "Large crystal jars", "Magical flasks"],
    answer: "A kettle and saucepans",
    evidence: "\"“Well, why don’t you, Harry, and Hermione go and get us some water then” — Mr. Weasley handed over the kettle and a couple of saucepans...\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 42,
    question: "Cuthbert Mockridge serves as the Head of which specific Ministry office?",
    options: ["Committee on Experimental Charms", "Goblin Liaison Office", "Accidental Magic Reversal Squad", "Department of Mysteries"],
    answer: "Goblin Liaison Office",
    evidence: "\"“That was Cuthbert Mockridge, Head of the Goblin Liaison Office...”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 43,
    question: "Ludo Bagman achieved sporting fame as a Beater for which Quidditch team?",
    options: ["Puddlemere United", "The Wimbourne Wasps", "Chudley Cannons", "The Holyhead Harpies"],
    answer: "The Wimbourne Wasps",
    evidence: "\"“And he was the best Beater the Wimbourne Wasps ever had.”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 44,
    question: "What did Agatha Timms wager with Ludo Bagman regarding the duration of the match?",
    options: ["Ten Galleons", "Half shares in her eel farm", "Her collection of flying carpets", "A year's supply of gillyweed"],
    answer: "Half shares in her eel farm",
    evidence: "\"“...and little Agatha Timms has put up half shares in her eel farm on a weeklong match.”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 45,
    question: "According to Percy, Barty Crouch is proficient in over how many languages?",
    options: ["Fifty", "One hundred", "Two hundred", "Five hundred"],
    answer: "Two hundred",
    evidence: "\"“Mr. Crouch!” said Percy breathlessly... “He speaks over two hundred! Mermish and Gobbledegook and Troll…”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 46,
    question: "What specific match outcome did Fred and George bet their entire savings on with Ludo Bagman?",
    options: ["Bulgaria wins but Lynch gets the Snitch", "Ireland wins but Krum gets the Snitch", "A draw after five days", "Bulgaria scores first but loses"],
    answer: "Ireland wins but Krum gets the Snitch",
    evidence: "\"“We’ll bet thirty-seven Galleons, fifteen Sickles, three Knuts,” said Fred... “that Ireland wins — but Viktor Krum gets the Snitch.”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 47,
    question: "When Ludo Bagman tested the fake wand provided by the twins, what did it transform into?",
    options: ["A rubber mouse", "A rubber chicken", "A bunch of flowers", "A squeaking rat"],
    answer: "A rubber chicken",
    evidence: "\"...and when the wand gave a loud squawk and turned into a rubber chicken, Bagman roared with laughter.\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 48,
    question: "What is the name of the camp manager responsible for the first field at the World Cup?",
    options: ["Mr. Payne", "Mr. Roberts", "Mr. Basil", "Mr. Diggory"],
    answer: "Mr. Roberts",
    evidence: "\"“Site manager’s called Mr. Roberts.”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 49,
    question: "Percy Weasley is assisting in a report to standardize cauldron thickness for which department?",
    options: ["The Department of International Magical Cooperation", "The Department of Magical Games and Sports", "The Committee on Experimental Charms", "The Misuse of Muggle Artifacts Office"],
    answer: "The Department of International Magical Cooperation",
    evidence: "\"“A report for the Department of International Magical Cooperation,” said Percy smugly. “We’re trying to standardize cauldron thickness.”\" — Chapter 5/Weasley's Wizard Wheezes",
  },
  {
    id: 50,
    question: "What did the banner stretched between the tents of the American witches specifically read?",
    options: ["SALEM WITCH TRIALS REUNION", "THE SALEM WITCHES’ INSTITUTE", "GIRLS' SCHOOL OF MAGIC", "USA QUIDDITCH SUPPORTERS"],
    answer: "THE SALEM WITCHES’ INSTITUTE",
    evidence: "\"...American witches sat gossiping happily beneath a spangled banner stretched between their tents that read: THE SALEM WITCHES’ INSTITUTE.\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 51,
    question: "Mr. Roberts required a Memory Charm ten times a day due to the blatant use of magic by the campers.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Been having a lot of trouble with him. Needs a Memory Charm ten times a day to keep him happy.”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 52,
    question: "Old Archie wore a long flowery nightgown because he preferred a 'healthy breeze' around his privates.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“I’m not putting them on,” said old Archie in indignation. “I like a healthy breeze ‘round my privates, thanks.”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 53,
    question: "The Bulgarian flag consists of the colors white, green, and red.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"...where the Bulgarian flag — white, green, and red — was fluttering in the breeze.\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 54,
    question: "Arnold Peasegood is the Head of the Goblin Liaison Office.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“Arnold Peasegood, he’s an Obliviator — member of the Accidental Magic Reversal Squad...”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 55,
    question: "Officials known as 'Unspeakables' are employed within the Department of Mysteries.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“...and that’s Bode and Croaker... they’re Unspeakables... From the Department of Mysteries...”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 56,
    question: "Ali Bashir attempted to challenge the Ministry's embargo on flying carpets.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Ali Bashir’s on the warpath. He wants a word with you about your embargo on flying carpets.”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 57,
    question: "Ludo Bagman mistakenly referred to Percy Weasley as 'Weatherby' during their interaction.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“Yes — thank you, Weatherby.” (Barty Crouch is the official who misidentifies Percy).\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 58,
    question: "Mr. Weasley placed a bet of one Galleon on Ireland to win the match.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Oh… go on then,” said Mr. Weasley. “Let’s see… a Galleon on Ireland to win?”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 59,
    question: "Stan Shunpike attempted to impress the Veela by claiming he was about to become the youngest ever Minister of Magic.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“I’m about to become the youngest ever Minister of Magic, I am.” Harry snorted with laughter. He recognized the pimply wizard: His name was Stan Shunpike...\" — Chapter 9/The Dark Mark",
  },
  {
    id: 60,
    question: "Ludo Bagman described the Irish front three Chasers as the weakest he had seen in years.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“...considering Ireland’s front three are the strongest I’ve seen in years —”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 61,
    question: "What was the final score of the Quidditch World Cup match between Ireland and Bulgaria?",
    options: ["170–160", "160–150", "390–10", "180–170"],
    answer: "170–160",
    evidence: "\"The scoreboard was flashing BULGARIA: 160, IRELAND: 170 across the crowd...\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 62,
    question: "What is the official price of the Omnioculars sold at the World Cup?",
    options: ["Five Galleons", "Seven Galleons", "Ten Galleons", "Twelve Galleons"],
    answer: "Ten Galleons",
    evidence: "\"“Omnioculars,” said the saleswizard eagerly... “Bargain — ten Galleons each.”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 63,
    question: "Using the Omniocular zoom, how did Harry describe the physical appearance of Viktor Krum?",
    options: ["Broad and muscular", "An overgrown bird of prey", "Small and agile", "Tall and handsome"],
    answer: "An overgrown bird of prey",
    evidence: "\"Viktor Krum was thin, dark... He looked like an overgrown bird of prey.\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 64,
    question: "Which Irish Chaser scored the first goal of the final?",
    options: ["Mullet", "Moran", "Troy", "Lynch"],
    answer: "Troy",
    evidence: "\"“TROY SCORES!” roared Bagman... “Ten zero to Ireland!”\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 65,
    question: "What is the name of the acclaimed Chairwizard from Egypt who refereed the match?",
    options: ["Ali Bashir", "Hassan Mostafa", "Cuthbert Mockridge", "Basil"],
    answer: "Hassan Mostafa",
    evidence: "\"...our referee, acclaimed Chairwizard of the International Association of Quidditch, Hassan Mostafa!\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 66,
    question: "Which technical maneuver describes the three Irish Chasers zooming closely together with Troy in the center?",
    options: ["The Porskoff Ploy", "Hawkshead Attacking Formation", "Wronski Feint", "Bludger Backbeat"],
    answer: "Hawkshead Attacking Formation",
    evidence: "\"HAWKSHEAD ATTACKING FORMATION, he read as he watched the three Irish Chasers zoom closely together...\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 67,
    question: "What did the Leprechaun mascots form in the air to taunt the Veela?",
    options: ["The words 'WE ARE BEST'", "A giant shamrock", "A giant hand making a rude sign", "The words 'HA HA HA'"],
    answer: "A giant hand making a rude sign",
    evidence: "\"...the leprechauns had risen into the air again, and this time, they formed a giant hand, which was making a very rude sign indeed at the veela...\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 68,
    question: "What physical transformation occurs to Veela when they lose their temper?",
    options: ["They turn into transparent ghosts", "Their faces elongate into bird heads and scaly wings burst from their shoulders", "They transform into giant snakes", "They grow to ten feet tall"],
    answer: "Their faces elongate into bird heads and scaly wings burst from their shoulders",
    evidence: "\"...their faces were elongating into sharp, cruelbeaked bird heads, and long, scaly wings were bursting from their shoulders —\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 69,
    question: "Which player successfully captured the Golden Snitch?",
    options: ["Aidan Lynch", "Viktor Krum", "Moran", "Connolly"],
    answer: "Viktor Krum",
    evidence: "\"“KRUM GETS THE SNITCH — BUT IRELAND WINS”\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 70,
    question: "What broomstick model were the Irish National Team players utilizing?",
    options: ["Nimbus 2001", "Cleansweep Eleven", "Firebolt", "Bluebottle"],
    answer: "Firebolt",
    evidence: "\"...read the word “Firebolt” on each of their brooms...\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 71,
    question: "Ireland won the Quidditch World Cup despite Bulgaria catching the Snitch.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“IRELAND WINS!” Bagman shouted...\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 72,
    question: "Viktor Krum is documented as being only eighteen years old.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Only just eighteen or something. He’s a genius...”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 73,
    question: "The Leprechauns served as the official mascots for the Bulgarian National Team.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“...allow me to introduce… the Bulgarian National Team Mascots!” ... “Veela!”\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 74,
    question: "Aidan Lynch impacted the ground with great force on two separate occasions during the match.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Lynch, however, hit the ground with a dull thud... for the second time, Lynch hit the ground with tremendous force...\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 75,
    question: "The official price for a single pair of Omnioculars was twenty Galleons.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“Bargain — ten Galleons each.”\" — Chapter 7/Bagman and Crouch",
  },
  {
    id: 76,
    question: "Viktor Krum ended the match with two spectacular black eyes blooming on his bloody face.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Two black eyes were blooming spectacularly on his bloody face.\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 77,
    question: "The Irish Chasers were listed as Connolly, Ryan, and Quigley.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Presenting — Connolly! Ryan! Troy! Mullet! Moran! Quigley! Aaaaaand — Lynch! (Troy, Mullet, and Moran were the Chasers).\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 78,
    question: "Evidence suggests that Leprechaun gold is a temporary illusion, as campers rummaged through the seats to retrieve it.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“There you go,” Ron yelled happily, stuffing a fistful of gold coins into Harry’s hand, “for the Omnioculars! Now you’ve got to buy me a Christmas present, ha!”\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 79,
    question: "Harry observed that Viktor Krum appeared much more coordinated and graceful on the ground than in the air.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Harry noticed that he seemed much less coordinated on the ground. He was slightly duck-footed and distinctly round-shouldered.\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 80,
    question: "The 'Wronski Defensive Feint' is classified as a dangerous Seeker diversion.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"WRONSKI DEFENSIVE FEINT — DANGEROUS SEEKER DIVERSION read the shining purple lettering...\" — Chapter 8/The Quidditch World Cup",
  },
  {
    id: 81,
    question: "What is the exact incantation used to conjure the Dark Mark into the sky?",
    options: ["Expecto Patronum", "Morsmordre", "Prior Incantato", "Stupefy"],
    answer: "Morsmordre",
    evidence: "\"“MORSMORDRE!” And something vast, green, and glittering erupted from the patch of darkness...\" — Chapter 9/The Dark Mark",
  },
  {
    id: 82,
    question: "What item of Ron’s was used to muffle the hooting of Pigwidgeon on the Hogwarts Express?",
    options: ["A woolen sweater", "His maroon dress robes", "A thick blanket", "A Chudley Cannons towel"],
    answer: "His maroon dress robes",
    evidence: "\"Ron undid his trunk, pulled out his maroon dress robes, and flung them over Pigwidgeon’s cage...\" — Chapter 11/Aboard the Hogwarts Express",
  },
  {
    id: 83,
    question: "Which Ministry official discovered Winky unconscious in the woods while holding Harry’s wand?",
    options: ["Barty Crouch", "Amos Diggory", "Arthur Weasley", "Ludo Bagman"],
    answer: "Amos Diggory",
    evidence: "\"He was carrying a tiny, limp figure in his arms... It was Winky.\" — Chapter 9/The Dark Mark",
  },
  {
    id: 84,
    question: "According to Percy Weasley, what occurs if a Howler is not opened immediately?",
    options: ["It screams twice as loud", "It explodes", "It turns into a rubber mouse", "It incinerates the desk"],
    answer: "It explodes",
    evidence: "\"“...and of course, if you don’t open a Howler straight away, it explodes.”\" — Chapter 10/Mayhem at the Ministry",
  },
  {
    id: 85,
    question: "Why did the Death Eaters at the campsite Disapparate upon seeing the Dark Mark?",
    options: ["They were supporting Voldemort", "They were frightened he was actually back", "The Ministry caught them", "They were finished with their 'fun'"],
    answer: "They were frightened he was actually back",
    evidence: "\"“I don’t reckon he’d be over-pleased with them, do you? ... they worked very hard to keep out of Azkaban when You-Know-Who lost power...”\" — Chapter 9/The Dark Mark",
  },
  {
    id: 86,
    question: "What color are the new dress robes Mrs. Weasley purchased for Harry?",
    options: ["Black", "Maroon", "Bottle green", "Purple"],
    answer: "Bottle green",
    evidence: "\"...except that they were bottle green instead of black.\" — Chapter 10/Mayhem at the Ministry",
  },
  {
    id: 87,
    question: "What was the headline of the Daily Prophet regarding the riot at the World Cup?",
    options: ["VOLDEOMORT RETURNS", "SCENES OF TERROR AT THE QUIDDITCH WORLD CUP", "MINISTRY BLUNDERS AT CUP", "DARK MARK REAPPEARS"],
    answer: "SCENES OF TERROR AT THE QUIDDITCH WORLD CUP",
    evidence: "\"Looking down, Harry saw the headline: SCENES OF TERROR AT THE QUIDDITCH WORLD CUP...\" — Chapter 10/Mayhem at the Ministry",
  },
  {
    id: 88,
    question: "Which Hogwarts entity targeted students with water balloons in the entrance hall?",
    options: ["Nearly Headless Nick", "Peeves the Poltergeist", "The Bloody Baron", "Filch"],
    answer: "Peeves the Poltergeist",
    evidence: "\"Harry looked up and saw... Peeves the Poltergeist... his wide, malicious face contorted with concentration as he took aim again.\" — Chapter 12/The Triwizard Tournament",
  },
  {
    id: 89,
    question: "The spell 'Prior Incantato' is used to reveal which specific data point about a wand?",
    options: ["The wand's owner", "The last spell the wand performed", "If the wand is broken", "The wand's core material"],
    answer: "The last spell the wand performed",
    evidence: "\"“There’s a simple way of discovering the last spell a wand performed... Prior Incantato!”\" — Chapter 9/The Dark Mark",
  },
  {
    id: 90,
    question: "Mad-Eye Moody claimed his house was breached by which everyday objects?",
    options: ["His dustbins", "A garden gnome", "A rogue Bludger", "His own shadow"],
    answer: "His dustbins",
    evidence: "\"“Says he was creeping toward the house, but was ambushed by his dustbins.”\" — Chapter 11/Aboard the Hogwarts Express",
  },
  {
    id: 91,
    question: "Hermione Granger identifies the treatment of house-elves as a form of slavery.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“You know, house-elves get a very raw deal!” said Hermione indignantly. “It’s slavery, that’s what it is!”\" — Chapter 9/The Dark Mark",
  },
  {
    id: 92,
    question: "Winky told Mr. Diggory that she had observed the specific person who conjured the Dark Mark.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“I is seeing no one, sir… no one…”\" — Chapter 9/The Dark Mark",
  },
  {
    id: 93,
    question: "Barty Crouch dismissed Winky by stating, 'This means clothes.'",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“I find that she disobeyed me. This means clothes.”\" — Chapter 9/The Dark Mark",
  },
  {
    id: 94,
    question: "Rita Skeeter is the journalist responsible for the critical Ministry coverage in the Daily Prophet.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Who wrote this? Ah… of course… Rita Skeeter.”\" — Chapter 10/Mayhem at the Ministry",
  },
  {
    id: 95,
    question: "The Weasley family clock contains a status position labeled 'Mortal Peril.'",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"...and, in the position where the number twelve would be on a normal clock, “mortal peril.”\" — Chapter 10/Mayhem at the Ministry",
  },
  {
    id: 96,
    question: "Draco Malfoy claimed his father considered sending him to Beauxbatons Academy.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“...Father actually considered sending me to Durmstrang rather than Hogwarts, you know.”\" — Chapter 11/Aboard the Hogwarts Express",
  },
  {
    id: 97,
    question: "Muggles who view Hogwarts see a moldering old ruin with a danger sign.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“If a Muggle looks at it, all they see is a moldering old ruin with a sign over the entrance saying DANGER, DO NOT ENTER, UNSAFE.”\" — Chapter 11/Aboard the Hogwarts Express",
  },
  {
    id: 98,
    question: "Bill Weasley was called a 'long-haired pillock' in a Rita Skeeter interview of the Gringotts Charm Breakers.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Rita Skeeter never makes anyone look good. Remember, she interviewed all the Gringotts’ Charm Breakers once, and called me ‘a long-haired pillock’?”\" — Chapter 10/Mayhem at the Ministry",
  },
  {
    id: 99,
    question: "Harry's wand was found by Winky within the trees at the campsite.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“I - I is finding it… finding it there, sir…” she whispered, “there… in the trees, sir.\" — Chapter 9/The Dark Mark",
  },
  {
    id: 100,
    question: "Ron Weasley’s dress robes are documented as having a moldy-looking lace frill at the collar and cuffs.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"It had a moldy-looking lace frill at the collar and matching lace cuffs.\" — Chapter 10/Mayhem at the Ministry",
  },
];

// --- Harry Potter: Order of the Phoenix (Book 5, Chapters 1-9) ---

export const HARRY_POTTER_OOTP_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "What was the exact time the Ministry recorded Harry performing the Patronus Charm in Chapter 2?",
    options: ["Nine o'clock sharp", "Twenty-three minutes past nine", "Ten minutes to midnight", "Half past eight"],
    answer: "Twenty-three minutes past nine",
    evidence: "\"We have received intelligence that you performed the Patronus Charm at twenty-three minutes past nine this evening...\" — Chapter Two",
  },
  {
    id: 2,
    question: "Which Ministry office official signed the letter regarding Harry's expulsion and the destruction of his wand?",
    options: ["Cornelius Fudge", "Dolores Umbridge", "Mafalda Hopkirk", "Arthur Weasley"],
    answer: "Mafalda Hopkirk",
    evidence: "\"Yours sincerely, Mafalda Hopkirk, IMPROPER USE OF MAGIC OFFICE\" — Chapter Two",
  },
  {
    id: 3,
    question: "In Chapter 1, what specific news item does Harry wait for as proof of Voldemort's return to the Muggle world?",
    options: ["A mysterious green light", "Death and destruction", "A baggage-handlers' strike", "Escaped zoo animals"],
    answer: "Death and destruction",
    evidence: "\"If anything had happened, it would surely have been the first item on the news; death and destruction were more important than stranded holidaymakers....\" — Chapter One",
  },
  {
    id: 4,
    question: "According to Chapter 1, what was the state of the lawns on Privet Drive due to the hosepipe ban?",
    options: ["Emerald green", "Parched and yellowing", "Overgrown and wild", "Brown and dusty"],
    answer: "Parched and yellowing",
    evidence: "\"...lawns that were once emerald green lay parched and yellowing; the use of hosepipes had been banned due to drought.\" — Chapter One",
  },
  {
    id: 5,
    question: "What cereal jingle does Harry listen to while hiding under the Dursleys' window?",
    options: ["Cheery-Owls", "Fruit ’N Bran", "Magic Munch", "Sugar Snitches"],
    answer: "Fruit ’N Bran",
    evidence: "\"Harry listened to a jingle about Fruit ’N Bran breakfast cereal while he watched Mrs. Figg...\" — Chapter One",
  },
  {
    id: 6,
    question: "What specific news item followed the baggage-handlers' strike on the evening news?",
    options: ["A famous actress's divorce", "A helicopter crash in Surrey", "The drought in the Southeast", "Bungy the budgie"],
    answer: "The drought in the Southeast",
    evidence: "\"...the baggage-handlers’ strike was followed by news on the drought in the Southeast...\" — Chapter One",
  },
  {
    id: 7,
    question: "What is the name of the water-skiing budgerigar mentioned in the 'finally' segment of the news?",
    options: ["Bungy", "Tweety", "Flappy", "Skiddie"],
    answer: "Bungy",
    evidence: "\"And finally, Bungy the budgie has found a novel way of keeping cool this summer.\" — Chapter One",
  },
  {
    id: 8,
    question: "Where does the budgerigar Bungy live?",
    options: ["The Three Broomsticks", "The Five Feathers in Barnsley", "The Leaky Cauldron", "The Hog's Head"],
    answer: "The Five Feathers in Barnsley",
    evidence: "\"Bungy, who lives at the Five Feathers in Barnsley, has learned to water-ski!\" — Chapter One",
  },
  {
    id: 9,
    question: "Which reporter went to find out more about the water-skiing budgerigar?",
    options: ["Rita Skeeter", "Mary Dorkins", "Barnabas Cuffe", "Xenophilius Lovegood"],
    answer: "Mary Dorkins",
    evidence: "\"Mary Dorkins went to find out more. . . .\" — Chapter One",
  },
  {
    id: 10,
    question: "What sound did Harry mistake for a gunshot while hiding in the flower bed?",
    options: ["A car backfire", "A loud, echoing crack", "A window smashing", "A firecracker"],
    answer: "A loud, echoing crack",
    evidence: "\"A loud, echoing crack broke the sleepy silence like a gunshot...\" — Chapter One",
  },
  {
    id: 11,
    question: "Which member of Dudley’s gang said the boy they beat up 'squealed like a pig'?",
    options: ["Piers", "Gordon", "Malcolm", "Dennis"],
    answer: "Malcolm",
    evidence: "\"“. . . squealed like a pig, didn’t he?” Malcolm was saying...\" — Chapter One",
  },
  {
    id: 12,
    question: "What is the name of the ten-year-old boy Dudley beat up two nights before the Dementor attack?",
    options: ["Mark Evans", "Dennis Creevey", "Piers Polkiss", "Malcolm Gordon"],
    answer: "Mark Evans",
    evidence: "\"“I know you did Mark Evans two nights ago —”\" — Chapter One",
  },
  {
    id: 13,
    question: "In the alleyway, what does Dudley accuse Harry of doing in his sleep?",
    options: ["Crying for his mother", "Moaning 'Don't kill Cedric'", "Laughing like a madman", "Singing Celestina Warbeck"],
    answer: "Moaning 'Don't kill Cedric'",
    evidence: "\"“I heard you last night. Talking in your sleep. Moaning. ‘Don’t kill Cedric! Don’t kill Cedric!’”\" — Chapter One",
  },
  {
    id: 14,
    question: "What color was the sky just before the Dementors arrived in Little Whinging?",
    options: ["Deep orange", "Star-strewn indigo", "Pitch black", "Pale violet"],
    answer: "Star-strewn indigo",
    evidence: "\"The star-strewn indigo sky was suddenly pitch-black and lightless...\" — Chapter One",
  },
  {
    id: 15,
    question: "What did Harry's silver stag Patronus do to the first Dementor?",
    options: ["Dissolved it into mist", "Caught it with its antlers", "Trampled it", "Froze it in place"],
    answer: "Caught it with its antlers",
    evidence: "\"...its antlers caught the dementor in the place where the heart should have been...\" — Chapter One",
  },
  {
    id: 16,
    question: "Which of Mrs. Figg’s cats warned her that Mundungus Fletcher had left his post?",
    options: ["Mr. Paws", "Snowy", "Mr. Tibbies", "Tufty"],
    answer: "Mr. Tibbies",
    evidence: "\"“It’s just lucky I put Mr. Tibbies on the case!”\" — Chapter Two",
  },
  {
    id: 17,
    question: "What did the fifth owl bring to the Dursleys' house in Chapter 2?",
    options: ["A letter from Sirius", "A Daily Prophet", "A Howler", "An invoice from Gringotts"],
    answer: "A Howler",
    evidence: "\"The red envelope had begun to smoke. ... “That’s a Howler.”\" — Chapter Two",
  },
  {
    id: 18,
    question: "What were the exact four words spoken by the Howler in the Dursleys' kitchen?",
    options: ["HE IS BACK NOW.", "REMEMBER MY LAST, PETUNIA.", "DUMBLEDORE IS WATCHING YOU.", "DO NOT LEAVE HOUSE."],
    answer: "REMEMBER MY LAST, PETUNIA.",
    evidence: "\"“REMEMBER MY LAST, PETUNIA.”\" — Chapter Two",
  },
  {
    id: 19,
    question: "What excuse did Mundungus Fletcher give for leaving Harry unguarded?",
    options: ["He was hungry", "A business opportunity regarding cauldrons", "He had to meet Sirius", "He was out of tobacco"],
    answer: "A business opportunity regarding cauldrons",
    evidence: "\"“Left to see someone about a batch of cauldrons that fell off the back of a broom!”\" — Chapter Two",
  },
  {
    id: 20,
    question: "What did Mrs. Figg use to hit Mundungus Fletcher when he finally appeared?",
    options: ["A broomstick", "A string bag full of cat food", "Her tartan slippers", "An umbrella"],
    answer: "A string bag full of cat food",
    evidence: "\"Mrs. Figg raised the arm from which her string bag dangled and whacked Mundungus... judging by the clanking noise it made it was full of cat food.\" — Chapter Two",
  },
  {
    id: 21,
    question: "At what time is Harry's disciplinary hearing scheduled at the Ministry of Magic?",
    options: ["8:00 AM", "9:00 AM", "10:00 AM", "Noon"],
    answer: "9:00 AM",
    evidence: "\"...your presence is required at a disciplinary hearing at the Ministry of Magic at 9 a.m. on August 12th.\" — Chapter Two",
  },
  {
    id: 22,
    question: "Who does Aunt Petunia say she heard talking about Dementors 'years ago'?",
    options: ["Lily Potter", "James Potter", "That awful boy", "Albus Dumbledore"],
    answer: "That awful boy",
    evidence: "\"“I heard — that awful boy — telling her about them — years ago,” she said jerkily.\" — Chapter Two",
  },
  {
    id: 23,
    question: "Which specific section of the International Confederation of Wizards' Statute of Secrecy had Harry previously offended?",
    options: ["Section 13", "Section 7", "Section 21", "Section 4"],
    answer: "Section 13",
    evidence: "\"...official warning for a previous offense under section 13 of the International Confederation of Wizards’ Statute of Secrecy...\" — Chapter Two",
  },
  {
    id: 24,
    question: "Where did Aunt Petunia say Dudley was going for tea in Chapter 1?",
    options: ["The Polkiss's", "The Evans's", "The Figg's", "The Dorkins's"],
    answer: "The Polkiss's",
    evidence: "\"“Dudders out for tea?” “At the Polkisses’,” said Aunt Petunia fondly.\" — Chapter One",
  },
  {
    id: 25,
    question: "What did Harry do with the Honeydukes chocolates Ron and Hermione sent him for his birthday?",
    options: ["Ate them all at once", "Shared them with Dudley", "Threw them away unopened", "Saved them for the train"],
    answer: "Threw them away unopened",
    evidence: "\"...he had thrown both their birthday presents of Honeydukes chocolates away unopened...\" — Chapter One",
  },
  {
    id: 26,
    question: "Dudley Dursley is the Junior Heavyweight Inter-School Boxing Champion of the Southeast.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Dudley had recently become the Junior Heavyweight Inter-School Boxing Champion of the Southeast.\" — Chapter One",
  },
  {
    id: 27,
    question: "Mrs. Figg identifies herself to Harry as a witch who never learned to Apparate.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“I’m a Squib, as Mundungus knows full well...”\" — Chapter Two",
  },
  {
    id: 28,
    question: "The fourth owl of the evening in Chapter 2 arrives via the kitchen fireplace.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"With a clattering, a whirring of wings, and a soft fall of dust, a fourth owl came shooting out of the kitchen fireplace.\" — Chapter Two",
  },
  {
    id: 29,
    question: "Uncle Vernon initially believes the Dementors were sent by Lord Voldemort to arrest Harry.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“Oho! They were coming to arrest you!” said Uncle Vernon... “That’s it, isn’t it, boy? You’re on the run from the law!”\" — Chapter Two",
  },
  {
    id: 30,
    question: "Aunt Petunia tells Uncle Vernon that they must keep Harry because if they throw him out, the neighbors will talk.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“If we throw him out, the neighbors will talk,” she said.\" — Chapter Two",
  },
  {
    id: 31,
    question: "Harry hides behind a large rhododendron bush to watch the news in Chapter 1.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"...as he had hidden himself behind a large hydrangea bush this evening...\" — Chapter One",
  },
  {
    id: 32,
    question: "Mundungus Fletcher was clutching a silvery Invisibility Cloak when he materialized in Chapter 2.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"...he was also clutching a silvery bundle that Harry recognized at once as an Invisibility Cloak.\" — Chapter Two",
  },
  {
    id: 33,
    question: "The Improper Use of Magic Office revised its decision to destroy Harry's wand approximately twenty-two minutes after the first letter.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Further to our letter of approximately twenty-two minutes ago...\" — Chapter Two",
  },
  {
    id: 34,
    question: "Dudley Dursley tells his parents that Harry pointed his 'thing' at him and made everything go dark.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Pointed his wand at me,” Dudley mumbled. ... “All dark,” Dudley said hoarsely...\" — Chapter Two",
  },
  {
    id: 35,
    question: "The second owl to arrive in Chapter 2 carries a message written in red ink.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"...a small roll of parchment was tied... written very hastily and blotchily in black ink.\" — Chapter Two",
  },
  {
    id: 36,
    question: "Which member of the Advance Guard has 'silver hair' and a 'wheezy voice'?",
    options: ["Kingsley Shacklebolt", "Elphias Doge", "Dedalus Diggle", "Sturgis Podmore"],
    answer: "Elphias Doge",
    evidence: "\"“...and this is Elphias Doge” — the wheezy-voiced wizard nodded...\" — Chapter Three",
  },
  {
    id: 37,
    question: "What shade of hair does Nymphadora Tonks have when she first meets Harry?",
    options: ["Bubble-gum pink", "Violet", "Emerald green", "Golden yellow"],
    answer: "Violet",
    evidence: "\"...short spiky hair that was a violent shade of violet.\" — Chapter Three",
  },
  {
    id: 38,
    question: "What fake competition did Tonks use to lure the Dursleys away from number four?",
    options: ["The Great British Garden Prize", "The All-England Best-Kept Suburban Lawn Competition", "Surrey's Most Beautiful Flower Bed Award", "The National Cleanest Car Contest"],
    answer: "The All-England Best-Kept Suburban Lawn Competition",
    evidence: "\"Sent a letter by Muggle post telling them they’d been short-listed for the All-England Best-Kept Suburban Lawn Competition.\" — Chapter Three",
  },
  {
    id: 39,
    question: "How does Moody describe the sensation of the Disillusionment Charm?",
    options: ["Like being covered in cold water", "Like an egg being smashed on the head", "Like wearing a wet cloak", "Like a thousand tiny needles"],
    answer: "Like an egg being smashed on the head",
    evidence: "\"...Harry felt a curious sensation as though Moody had just smashed an egg there...\" — Chapter Three",
  },
  {
    id: 40,
    question: "Which member of the Guard is described as a 'stately looking witch in an emerald-green shawl'?",
    options: ["Hestia Jones", "Emmeline Vance", "Nymphadora Tonks", "Minerva McGonagall"],
    answer: "Emmeline Vance",
    evidence: "\"“— Emmeline Vance” — a stately looking witch in an emerald-green shawl inclined her head —\" — Chapter Three",
  },
  {
    id: 41,
    question: "Which member of the Guard has 'thick, straw-colored hair'?",
    options: ["Sturgis Podmore", "Kingsley Shacklebolt", "Remus Lupin", "Dedalus Diggle"],
    answer: "Sturgis Podmore",
    evidence: "\"“— Sturgis Podmore” — a square-jawed wizard with thick, straw-colored hair winked —\" — Chapter Three",
  },
  {
    id: 42,
    question: "What color was the 'first signal' given to the Guard to mount their brooms?",
    options: ["Green", "Blue", "Red", "White"],
    answer: "Red",
    evidence: "\"...a shower of bright red sparks had flared among the stars. ... “Mount your brooms, that’s the first signal!”\" — Chapter Three",
  },
  {
    id: 43,
    question: "What is the specific route instruction given by Moody to avoid being spotted by Muggles?",
    options: ["Bearing North", "Avoiding motorways", "Flying through clouds", "Double back over the sea"],
    answer: "Avoiding motorways",
    evidence: "\"“Turning southwest!” yelled Moody. “We want to avoid the motorway!”\" — Chapter Three",
  },
  {
    id: 44,
    question: "According to the parchment Harry reads, where is the headquarters of the Order of the Phoenix?",
    options: ["Number four, Privet Drive", "Number twelve, Grimmauld Place", "The Leaky Cauldron", "The Burrow"],
    answer: "Number twelve, Grimmauld Place",
    evidence: "\"The headquarters of the Order of the Phoenix may be found at number twelve, Grimmauld Place, London.\" — Chapter Three",
  },
  {
    id: 45,
    question: "Which Guard member was laughing at a potato peeler in the Dursleys' kitchen?",
    options: ["Tonks", "Hestia Jones", "Emmeline Vance", "Sturgis Podmore"],
    answer: "Hestia Jones",
    evidence: "\"...and Hestia Jones was laughing at a potato peeler she had come across while rummaging in the drawers.\" — Chapter Three",
  },
  {
    id: 46,
    question: "Moody tells Harry that he must not put his wand in his back pocket because better wizards than him have lost buttocks.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Don’t put your wand there, boy!” roared Moody. ... “Better wizards than you have lost buttocks, you know!”\" — Chapter Three",
  },
  {
    id: 47,
    question: "Nymphadora Tonks prefers to be called by her first name only.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“Don’t call me Nymphadora, Remus,” said the young witch... “It’s Tonks.”\" — Chapter Three",
  },
  {
    id: 48,
    question: "Moody pops his magical eye into a glass of pumpkin juice to clean it.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“Get me a glass of water, would you, Harry?” asked Moody. ... He dropped the magical eyeball into the water...\" — Chapter Three",
  },
  {
    id: 49,
    question: "Tonks uses the spell 'Locomotor Trunk' to make Harry’s trunk hover and move.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Okay, let’s go. Locomotor Trunk.” Harry’s trunk rose a few inches into the air.\" — Chapter Three",
  },
  {
    id: 50,
    question: "Kingsley Shacklebolt is a high-ranking Auror who wears a single gold hoop in his ear.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"...he had a deep, slow voice and wore a single gold hoop in his ear.\" — Chapter Three",
  },
  {
    id: 51,
    question: "Tonks qualified as an Auror only one year before the extraction of Harry from Privet Drive.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“I only qualified a year ago.”\" — Chapter Three",
  },
  {
    id: 52,
    question: "The device Moody uses to extinguish streetlamps is called the 'Put-Outer'.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"...growled Moody, pocketing the Put-Outer.\" — Chapter Three",
  },
  {
    id: 53,
    question: "Tonks says she nearly failed the Stealth and Tracking portion of her Auror training.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Nearly failed on Stealth and Tracking, I’m dead clumsy...”\" — Chapter Three",
  },
  {
    id: 54,
    question: "The Guard flew through several low clouds to lose anyone who might be following them.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“We’re not going through clouds!” shouted Tonks angrily. “We’ll get soaked, Mad-Eye!”\" — Chapter Three",
  },
  {
    id: 55,
    question: "Moody's magical eye has been sticking ever since 'that scum' wore it.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“...it keeps sticking — ever since that scum wore it —”\" — Chapter Three",
  },
  {
    id: 56,
    question: "What is the shape of the silver door knocker at number twelve, Grimmauld Place?",
    options: ["A lion's head", "A twisted serpent", "A phoenix", "A shrunken elf head"],
    answer: "A twisted serpent",
    evidence: "\"The silver door knocker was in the form of a twisted serpent.\" — Chapter Four",
  },
  {
    id: 57,
    question: "What object in the hall of Grimmauld Place was made from a 'severed troll’s leg'?",
    options: ["A chair", "An umbrella stand", "A coat rack", "A small table"],
    answer: "An umbrella stand",
    evidence: "\"...skirting a large umbrella stand that looked as though it had been made from a severed troll’s leg...\" — Chapter Four",
  },
  {
    id: 58,
    question: "What is the life’s ambition of the house-elf Kreacher?",
    options: ["To be free", "To have his head cut off and stuck on a plaque", "To serve Dumbledore", "To clean the whole house"],
    answer: "To have his head cut off and stuck on a plaque",
    evidence: "\"“His life’s ambition is to have his head cut off and stuck up on a plaque just like his mother...”\" — Chapter Four",
  },
  {
    id: 59,
    question: "What color is the flesh-colored string attached to Fred and George's 'Extendable Ears'?",
    options: ["White", "Flesh-colored", "Pink", "Red"],
    answer: "Flesh-colored",
    evidence: "\"A thin piece of flesh-colored string descended in front of Harry’s eyes.\" — Chapter Four",
  },
  {
    id: 60,
    question: "What is Percy Weasley's new job title in Minister Fudge's office?",
    options: ["Senior Undersecretary", "Junior Assistant to the Minister", "Department Head", "Ministry Spokesperson"],
    answer: "Junior Assistant to the Minister",
    evidence: "\"...told Dad he’d been offered a position in Fudge’s own office... Junior Assistant to the Minister.\" — Chapter Four",
  },
  {
    id: 61,
    question: "What specific charm did Mrs. Weasley put on the kitchen door to stop the Extendable Ears?",
    options: ["Silencio", "Imperturbable Charm", "Muffliato", "Protego"],
    answer: "Imperturbable Charm",
    evidence: "\"“...she’s gone and put an Imperturbable Charm on the kitchen door.”\" — Chapter Four",
  },
  {
    id: 62,
    question: "What did Ginny chuck at the kitchen door to test for the Imperturbable Charm?",
    options: ["Dungbombs", "Extendable Ears", "Rubber balls", "Stink pellets"],
    answer: "Dungbombs",
    evidence: "\"“I’ve been flicking Dungbombs at it from the top of the stairs...”\" — Chapter Four",
  },
  {
    id: 63,
    question: "Which member of the Order is currently in Romania making contacts?",
    options: ["Bill Weasley", "Charlie Weasley", "Remus Lupin", "Kingsley Shacklebolt"],
    answer: "Charlie Weasley",
    evidence: "\"“Charlie’s in the Order too,” said George, “but he’s still in Romania...”\" — Chapter Four",
  },
  {
    id: 64,
    question: "Why did Bill Weasley apply for a desk job and come home from Egypt?",
    options: ["He was fired", "He wanted to work for the Order", "He missed his mother", "He was sick of the heat"],
    answer: "He wanted to work for the Order",
    evidence: "\"“He applied for a desk job so he could come home and work for the Order...”\" — Chapter Four",
  },
  {
    id: 65,
    question: "What insult does Sirius’s mother’s portrait screech at the members of the Order?",
    options: ["Mudblood!", "Blood traitor!", "Thieves!", "Squibs!"],
    answer: "Blood traitor!",
    evidence: "\"“Blood traitor, abomination, shame of my flesh!”\" — Chapter Four",
  },
  {
    id: 66,
    question: "What is the doorknob shaped like on the door to Harry and Ron's bedroom at Grimmauld Place?",
    options: ["A lion's head", "A serpent's head", "A badger's paw", "An eagle's beak"],
    answer: "A serpent's head",
    evidence: "\"...turned the bedroom doorknob, which was shaped like a serpent’s head...\" — Chapter Four",
  },
  {
    id: 67,
    question: "According to Sirius, what did his mother put on the back of her portrait to stop it from being removed?",
    options: ["A Permanent Sticking Charm", "A Shield Charm", "A Dark Curse", "Super Glue"],
    answer: "A Permanent Sticking Charm",
    evidence: "\"“...we think she put a Permanent Sticking Charm on the back of the canvas.”\" — Chapter Five",
  },
  {
    id: 68,
    question: "What spell does Bill use to make the Order's scrolls vanish from the table?",
    options: ["Evanesco!", "Scourgify!", "Relashio!", "Expelliarmus!"],
    answer: "Evanesco!",
    evidence: "\"Bill took out his wand, muttered “Evanesco!” and the scrolls vanished.\" — Chapter Five",
  },
  {
    id: 69,
    question: "Which family crest is embossed on the goblin-wrought silver goblets at Grimmauld Place?",
    options: ["The Malfoy crest", "The Black family crest", "The Potter crest", "The Weasley crest"],
    answer: "The Black family crest",
    evidence: "\"“...embossed with the Black family crest.”\" — Chapter Five",
  },
  {
    id: 70,
    question: "What creature does Mrs. Weasley think is trapped in the drawing room writing desk?",
    options: ["A boggart", "A pixie", "A doxey", "A ghoul"],
    answer: "A boggart",
    evidence: "\"“Of course, it could just be a boggart...”\" — Chapter Five",
  },
  {
    id: 71,
    question: "What pests are filling the curtains in the drawing room?",
    options: ["Pixies", "Doxies", "Spiders", "Moths"],
    answer: "Doxies",
    evidence: "\"“The curtains in there are full of doxies too...”\" — Chapter Five",
  },
  {
    id: 72,
    question: "Which goblin is Bill trying to reach, who is currently feeling 'pretty anti-wizard'?",
    options: ["Griphook", "Ragnok", "Gornuk", "Bogrod"],
    answer: "Ragnok",
    evidence: "\"“Have you still not had any luck with Ragnok, Bill?”\" — Chapter Five",
  },
  {
    id: 73,
    question: "What did Mundungus Fletcher sell back to a wizard named Will for twice the price?",
    options: ["Stolen cauldrons", "Toads", "Extendable Ears", "Invisibility Cloaks"],
    answer: "Toads",
    evidence: "\"“...the gormless gargoyle buys all ’is own toads back orf me for twice what ’e paid...”\" — Chapter Five",
  },
  {
    id: 74,
    question: "According to Kingsley Shacklebolt's false reports, where is Sirius Black currently hiding?",
    options: ["Greenland", "Tibet", "Romania", "Egypt"],
    answer: "Tibet",
    evidence: "\"“...he’s been feeding the Ministry information that Sirius is in Tibet.”\" — Chapter Five",
  },
  {
    id: 75,
    question: "What is the specific thing Sirius says Voldemort is after 'this time'?",
    options: ["The Elder Wand", "A weapon", "Dumbledore's blood", "The Prophecy"],
    answer: "A weapon",
    evidence: "\"“Like a weapon. Something he didn’t have last time.”\" — Chapter Five",
  },
  {
    id: 76,
    question: "How many Galleons is the Ministry's price on Sirius Black's head?",
    options: ["5,000", "10,000", "20,000", "50,000"],
    answer: "10,000",
    evidence: "\"“...the Ministry’s put a ten-thousand-Galleon price on my head...”\" — Chapter Five",
  },
  {
    id: 77,
    question: "What does Dumbledore say he doesn't care about as long as they don't take him off of what?",
    options: ["The Wizengamot", "The Chocolate Frog cards", "The Order of Merlin list", "The Hogwarts payroll"],
    answer: "The Chocolate Frog cards",
    evidence: "\"“...he doesn’t care what they do as long as they don’t take him off the Chocolate Frog cards...”\" — Chapter Five",
  },
  {
    id: 78,
    question: "Which wizard did Will originally steal the toads from?",
    options: ["Warty Harris", "Mundungus Fletcher", "Stan Shunpike", "Ludo Bagman"],
    answer: "Warty Harris",
    evidence: "\"“...Will nicked ’em orf Warty Harris in the first place...”\" — Chapter Five",
  },
  {
    id: 79,
    question: "What is the full name of the organization Hermione founded for elves?",
    options: ["SPEW", "Society for the Promotion of Elfish Welfare", "Elf Rights League", "House-Elf Liberation Front"],
    answer: "Society for the Promotion of Elfish Welfare",
    evidence: "\"“It’s the Society for the Promotion of Elfish Welfare...”\" — Chapter Four",
  },
  {
    id: 80,
    question: "What was Sirius's mother's death date relative to Harry's arrival at headquarters?",
    options: ["Two years ago", "Five years ago", "Ten years ago", "Twenty years ago"],
    answer: "Ten years ago",
    evidence: "\"“No one’s lived here for ten years, not since my dear mother died...”\" — Chapter Five",
  },
  {
    id: 81,
    question: "Sirius Black is the last remaining member of the Black family.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“But I’m the last Black left, so it’s mine now.”\" — Chapter Five",
  },
  {
    id: 82,
    question: "The portrait of Sirius’s mother screams 'Filth! Scum! By-products of dirt and vileness!' at the Order members.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Filth! Scum! By-products of dirt and vileness! Half-breeds, mutants, freaks...”\" — Chapter Four",
  },
  {
    id: 83,
    question: "Mrs. Weasley believes that Sirius thinks he has his best friend James back when he talks to Harry.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Sometimes, the way you talk about him, it’s as though you think you’ve got your best friend back!”\" — Chapter Five",
  },
  {
    id: 84,
    question: "Mundungus Fletcher is a very popular dinner guest with most of the wizarding community.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"“And I’m not a very popular dinner guest with most of the community,” said Lupin.\" — Chapter Five",
  },
  {
    id: 85,
    question: "Dumbledore has been demoted from Chief Warlock on the Wizengamot.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“They’ve demoted him from Chief Warlock on the Wizengamot...”\" — Chapter Five",
  },
  {
    id: 86,
    question: "The Order of the Phoenix is comprised only of wizards who have already left school.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“The Order is comprised only of overage wizards,” he said. “Wizards who have left school...”\" — Chapter Five",
  },
  {
    id: 87,
    question: "Tonks entertains the girls at dinner by making her nose sprout a great deal of hair from each nostril.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"...and then sprouted a great deal of hair from each nostril.\" — Chapter Five",
  },
  {
    id: 88,
    question: "Sirius says that he would have welcomed a Dementor attack to break the monotony of being stuck inside.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“Personally, I’d have welcomed a dementor attack. A deadly struggle for my soul would have broken the monotony nicely.”\" — Chapter Five",
  },
  {
    id: 89,
    question: "The Daily Prophet reported that Dumbledore was voted out of the Chairmanship of the International Confederation of Wizards because he is too young.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"...reported that he’d been voted out... because he’s getting old and losing his grip...\" — Chapter Five",
  },
  {
    id: 90,
    question: "Mrs. Weasley says Harry is 'as good as' a son to her.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"“He’s as good as,” said Mrs. Weasley fiercely.\" — Chapter Five",
  },
];

// --- Harry Potter: Half-Blood Prince (Book 6, Chapters 1-8) ---

export const HARRY_POTTER_HBP_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "What specific visual detail is present on the frame of the portrait that announces the Minister of Magic in the Prime Minister's office?",
    options: ["A series of silver snakes", "Elaborate, wavy gold or gilded scrollwork", "Simple, straight dark wood", "Engraved names of previous Prime Ministers"],
    answer: "Elaborate, wavy gold or gilded scrollwork",
  },
  {
    id: 2,
    question: "According to the Prime Minister, which specific group of people attempted unsuccessfully to remove the 'ugly little' portrait from his wall?",
    options: ["The SAS and the Secret Service", "Two Aurors and a Curse-Breaker", "Several carpenters, a builder or two, an art historian, and the Chancellor of the Exchequer", "A team of museum conservators and the Minister of Works"],
    answer: "Several carpenters, a builder or two, an art historian, and the Chancellor of the Exchequer",
  },
  {
    id: 3,
    question: "What was the official Muggle explanation for the collapse of the Brockdale Bridge, despite it being fewer than ten years old?",
    options: ["Terrorist activity", "Rusted rigging and corroded expansion joints", "A freak tectonic shift", "Extreme weight from an unauthorized convoy"],
    answer: "Rusted rigging and corroded expansion joints",
  },
  {
    id: 4,
    question: "While under a 'poorly performed' Imperius Curse, what violent act did Junior Minister Herbert Chorley attempt against the Healers at St. Mungo's?",
    options: ["He tried to bite them while quacking", "He attempted to strangle three of them", "He threw them into a magical fireplace", "He tried to peck their eyes out"],
    answer: "He attempted to strangle three of them",
  },
  {
    id: 5,
    question: "True or False: Upon his first meeting with the Prime Minister, Cornelius Fudge turned the Prime Minister’s teacup into a gerbil to prove he was a wizard.",
    options: [],
    answer: "True",
  },
  {
    id: 6,
    question: "What specific animalistic description does the Prime Minister use to characterize Rufus Scrimgeour’s appearance?",
    options: ["An old lion", "A hungry wolf", "A watchful hawk", "A silver fox"],
    answer: "An old lion",
  },
  {
    id: 7,
    question: "According to Fudge, what is the 'unseasonable chilly mist' in July actually caused by?",
    options: ["A failed Ministry weather charm", "Dementors breeding", "Giants moving through the West Country", "The return of the Dark Mark"],
    answer: "Dementors breeding",
  },
  {
    id: 8,
    question: "Who was the Head of the Department of Magical Law Enforcement who was recently murdered in a room locked from the inside?",
    options: ["Emmeline Vance", "Amelia Bones", "Rufus Scrimgeour", "Dirk Cresswell"],
    answer: "Amelia Bones",
  },
  {
    id: 9,
    question: "What is the name of the 'Other Minister' in the Muggle Prime Minister's internal monologue?",
    options: ["Albus Dumbledore", "Cornelius Fudge", "Rufus Scrimgeour", "Kingsley Shacklebolt"],
    answer: "Cornelius Fudge",
  },
  {
    id: 10,
    question: "How many foreign dragons were imported for the Triwizard Tournament, according to Fudge’s past notification?",
    options: ["Two", "Three", "Four", "One"],
    answer: "Three",
  },
  {
    id: 11,
    question: "True or False: Rufus Scrimgeour walks with a slight limp and has keen yellowish eyes.",
    options: [],
    answer: "True",
  },
  {
    id: 12,
    question: "What did Fudge do with his bowler hat when he arrived at the Prime Minister's office after the Azkaban breakout three years prior?",
    options: ["He threw it into the fire", "He tipped a large amount of water out of the rim into his pocket", "He used it to hide his wand", "He placed it on the Prime Minister's desk"],
    answer: "He tipped a large amount of water out of the rim into his pocket",
  },
  {
    id: 13,
    question: "According to the portrait, what specific activity was Scrimgeour engaged in just before his arrival?",
    options: ["Speaking with the Queen", "Arresting a Death Eater", "Finishing a letter to Dumbledore", "Consulting with Kingsley Shacklebolt"],
    answer: "Finishing a letter to Dumbledore",
  },
  {
    id: 14,
    question: "What was the official reason Fudge gave the Prime Minister for the West Country 'hurricane'?",
    options: ["It was a natural climatic anomaly", "It was caused by Death Eaters and suspected giant involvement", "It was a failed Portkey experiment", "It was the result of a mass Dementor migration"],
    answer: "It was caused by Death Eaters and suspected giant involvement",
  },
  {
    id: 15,
    question: "True or False: Kingsley Shacklebolt was placed in the Prime Minister's office as the new secretary for protection.",
    options: [],
    answer: "True",
  },
  {
    id: 16,
    question: "Which Ministry department had teams of 'Obliviators' working to modify Muggle memories in Somerset?",
    options: ["Department of Magical Law Enforcement", "Department for the Regulation and Control of Magical Creatures", "Office of Misinformation", "Muggle Liaison Office"],
    answer: "Office of Misinformation",
  },
  {
    id: 17,
    question: "What was the portrait in the Prime Minister's office doing when caught by Fudge's eye in Chapter 1?",
    options: ["Yawning and leaving the frame", "Digging in his ear with the point of a quill", "Sleeping with a loud snore", "Polishing his silver wig"],
    answer: "Digging in his ear with the point of a quill",
  },
  {
    id: 18,
    question: "What industrial relic dominates the landscape of Spinner's End as Narcissa and Bellatrix arrive?",
    options: ["A disused water tower", "An immense mill chimney", "A collapsed iron bridge", "A rusted clock tower"],
    answer: "An immense mill chimney",
  },
  {
    id: 19,
    question: "True or False: Narcissa Malfoy is described as having long blonde hair and appearing so pale she seemed to shine in the darkness.",
    options: [],
    answer: "True",
  },
  {
    id: 20,
    question: "What animal does Bellatrix kill with a flash of green light near the riverbank in Chapter 2?",
    options: ["A rabbit", "A stray dog", "A fox", "A rat"],
    answer: "A fox",
  },
  {
    id: 21,
    question: "Who does Snape identify as the 'vermin' currently living in his house at Spinner's End?",
    options: ["Peter Pettigrew (Wormtail)", "Fenrir Greyback", "Lucius Malfoy", "A group of Goblins"],
    answer: "Peter Pettigrew (Wormtail)",
  },
  {
    id: 22,
    question: "What beverage does Snape order Wormtail to serve his guests?",
    options: ["Oak-matured mead", "Nettle wine", "Elf-made wine", "Firewhisky"],
    answer: "Elf-made wine",
  },
  {
    id: 23,
    question: "True or False: Snape admits to Bellatrix that he did not return to Voldemort immediately because Dumbledore ordered him to wait two hours.",
    options: [],
    answer: "True",
  },
  {
    id: 24,
    question: "According to Snape, why is Voldemort 'not sorry' that Harry Potter survived until a year ago?",
    options: ["He wanted to kill Harry in a public arena", "He needed Harry's blood to regenerate his body", "He believed Harry was a secret ally", "He wanted to use Harry to find Dumbledore"],
    answer: "He needed Harry's blood to regenerate his body",
  },
  {
    id: 25,
    question: "Whom does Snape give 'full credit' to for 'finishing off' Sirius Black?",
    options: ["Lucius Malfoy", "Lord Voldemort", "Bellatrix Lestrange", "Narcissa Malfoy"],
    answer: "Bellatrix Lestrange",
  },
  {
    id: 26,
    question: "What is the second clause of the Unbreakable Vow sworn by Snape to Narcissa?",
    options: ["To carry out the deed Draco was ordered to do", "To protect Draco from harm to the best of his ability", "To watch over Draco during the school year", "To keep Narcissa's visit a secret from Voldemort"],
    answer: "To protect Draco from harm to the best of his ability",
  },
  {
    id: 27,
    question: "What is the third and final clause Snape accepts during the Unbreakable Vow?",
    options: ["To kill Albus Dumbledore himself", "To carry out the deed the Dark Lord ordered Draco to perform should it prove necessary", "To surrender his life if Draco fails", "To ensure Narcissa is rewarded by the Dark Lord"],
    answer: "To carry out the deed the Dark Lord ordered Draco to perform should it prove necessary",
  },
  {
    id: 28,
    question: "Who acts as the 'Bonder' for the Unbreakable Vow in Chapter 2?",
    options: ["Peter Pettigrew", "Narcissa Malfoy", "Bellatrix Lestrange", "Lord Voldemort"],
    answer: "Bellatrix Lestrange",
  },
  {
    id: 29,
    question: "True or False: Snape describes Harry Potter as 'mediocre to the last degree' and 'obnoxious and self-satisfied'.",
    options: [],
    answer: "True",
  },
  {
    id: 30,
    question: "What physical sensation is described as Snape and Narcissa link hands for the Unbreakable Vow?",
    options: ["A cold, numbing frost", "Thin tongues of brilliant flame winding like a red-hot wire", "A heavy weight pressing on their chests", "A bright silver light emanating from their palms"],
    answer: "Thin tongues of brilliant flame winding like a red-hot wire",
  },
  {
    id: 31,
    question: "What reason does Snape give for why many of the Dark Lord's followers originally believed Harry Potter might be a 'great Dark wizard'?",
    options: ["Because of the way he spoke Parseltongue", "Because he had survived the Dark Lord's attack", "Because they sensed Voldemort's soul within him", "Because Dumbledore had taken such a personal interest in him"],
    answer: "Because he had survived the Dark Lord's attack",
  },
  {
    id: 32,
    question: "True or False: Wormtail’s silver hand is described as looking as though it was 'encased in a bright silver glove'.",
    options: [],
    answer: "True",
  },
  {
    id: 33,
    question: "Which Death Eater's murder does Snape take credit for facilitating through information passed to the Order?",
    options: ["Igor Karkaroff", "Amelia Bones", "Emmeline Vance", "Regulus Black"],
    answer: "Emmeline Vance",
  },
  {
    id: 34,
    question: "What color is the 'elf-made wine' Snape pours for Narcissa and Bellatrix?",
    options: ["Pale gold", "Bloodred", "Deep purple", "Emerald green"],
    answer: "Bloodred",
  },
  {
    id: 35,
    question: "What headline is visible on one of the newspapers in Harry's room at the beginning of Chapter 3?",
    options: ["VOLDEMORT RETURNS", "HARRY POTTER: THE CHOSEN ONE?", "DUMBLEDORE REINSTATED", "SCRIMGEOUR SACKS FUDGE"],
    answer: "HARRY POTTER: THE CHOSEN ONE?",
  },
  {
    id: 36,
    question: "True or False: The front cover of the book depicts Harry Potter and Albus Dumbledore standing together, with Harry holding his wand in his right hand.",
    options: [],
    answer: "True",
  },
  {
    id: 37,
    question: "What specific time does Albus Dumbledore arrive at number four, Privet Drive?",
    options: ["Eleven P.M.", "Midnight", "Seven P.M.", "Nine P.M."],
    answer: "Eleven P.M.",
  },
  {
    id: 38,
    question: "What is the physical description of Dumbledore's injured hand when he arrives at the Dursleys'?",
    options: ["It is covered in a silver glove", "It is blackened and shriveled", "It is missing two fingers", "It is glowing with a faint blue light"],
    answer: "It is blackened and shriveled",
  },
  {
    id: 39,
    question: "True or False: According to Sirius Black's will, ownership of number twelve, Grimmauld Place would pass to Bellatrix Lestrange if Harry could not inherit it.",
    options: [],
    answer: "True",
  },
  {
    id: 40,
    question: "What brand of mead does Dumbledore serve the Dursleys during his visit?",
    options: ["Madam Rosmerta’s finest oak-matured mead", "The Hog's Head Special Reserve", "Madam Puddifoot’s Floral Mead", "Aberforth’s Goat-Matured Brew"],
    answer: "Madam Rosmerta’s finest oak-matured mead",
  },
  {
    id: 41,
    question: "What order does Harry give to Kreacher to prove his ownership of the house-elf?",
    options: ["“Clean the kitchen!”", "“Go to Hogwarts!”", "“Shut up!”", "“Make me some tea!”"],
    answer: "“Shut up!”",
  },
  {
    id: 42,
    question: "Where does Harry ultimately decide to send Kreacher to work?",
    options: ["The Burrow", "The Ministry of Magic", "The Hogwarts kitchens", "Sirius’s old bedroom"],
    answer: "The Hogwarts kitchens",
  },
  {
    id: 43,
    question: "True or False: In the Wizarding world, the age of majority is eighteen.",
    options: [],
    answer: "False",
  },
  {
    id: 44,
    question: "What has the hippogriff Buckbeak been renamed to for his safety?",
    options: ["Beaky", "Silverwing", "Witherwings", "Greyfeather"],
    answer: "Witherwings",
  },
  {
    id: 45,
    question: "According to the Ministry security leaflet, what should you do if the Dark Mark appears over a dwelling?",
    options: ["Enter immediately to provide aid", "Cast a Shield Charm on the building", "DO NOT ENTER, but contact the Auror office immediately", "Wait for a member of the Order of the Phoenix"],
    answer: "DO NOT ENTER, but contact the Auror office immediately",
  },
  {
    id: 46,
    question: "What color is the jar of ink Harry was using at Privet Drive that he had to 'screw the top back on'?",
    options: ["Everlasting Green", "Color-change ink", "Invisible blue", "Gold-flecked black"],
    answer: "Color-change ink",
  },
  {
    id: 47,
    question: "True or False: Dumbledore doffs his hat to the Dursleys before leaving number four, Privet Drive.",
    options: [],
    answer: "True",
  },
  {
    id: 48,
    question: "What item did Dumbledore specifically ask Harry to bring with him 'just in case'?",
    options: ["His Firebolt", "His wand", "His Invisibility Cloak", "The Marauder's Map"],
    answer: "His Invisibility Cloak",
  },
  {
    id: 49,
    question: "Dumbledore tells the Dursleys that the 'best that can be said' is that Harry escaped what?",
    options: ["The Killing Curse of Voldemort", "The 'appalling damage' they inflicted on Dudley", "The influence of his parents' legacy", "The boredom of Muggle life"],
    answer: "The 'appalling damage' they inflicted on Dudley",
  },
  {
    id: 50,
    question: "How many glasses of mead did Dumbledore conjure for the room at the Dursleys'?",
    options: ["Three", "Four", "Five", "Six"],
    answer: "Five",
  },
  {
    id: 51,
    question: "In what village do Harry and Dumbledore find Horace Slughorn?",
    options: ["Ottery St. Catchpole", "Budleigh Babberton", "Godric's Hollow", "Little Hangleton"],
    answer: "Budleigh Babberton",
  },
  {
    id: 52,
    question: "True or False: Horace Slughorn disguised himself as a velvet sofa to hide from intruders.",
    options: [],
    answer: "False",
  },
  {
    id: 53,
    question: "What specific detail betrayed Slughorn's disguise to Dumbledore?",
    options: ["The smell of his cologne", "The absence of the Dark Mark over the house", "A button on the chair that was actually an eye", "A faint wheezing sound"],
    answer: "The absence of the Dark Mark over the house",
  },
  {
    id: 54,
    question: "What kind of blood was spattered over the walls of Slughorn's temporary residence to stage a scene of violence?",
    options: ["Human blood", "Unicorn blood", "Dragon blood", "Giant blood"],
    answer: "Dragon blood",
  },
  {
    id: 55,
    question: "According to the illustration, what specific facial feature is visible on Slughorn's armchair disguise?",
    options: ["A pair of wire-rimmed spectacles", "A vast, walruslike mustache", "A single, unblinking yellowish eye", "A shriveled, blackened hand"],
    answer: "A vast, walruslike mustache",
  },
  {
    id: 56,
    question: "Which former student of Slughorn's is now the editor of the Daily Prophet?",
    options: ["Barnabas Cuffe", "Ambrosius Flume", "Dirk Cresswell", "Ciceron Harkiss"],
    answer: "Barnabas Cuffe",
  },
  {
    id: 57,
    question: "What is Dumbledore's favorite flavor of jam?",
    options: ["Strawberry", "Raspberry", "Blackberry", "Apricot"],
    answer: "Raspberry",
  },
  {
    id: 58,
    question: "What ring is Dumbledore wearing that Harry has never seen before?",
    options: ["A silver ring with a blue sapphire", "A gold ring with a heavy black stone cracked down the middle", "A bronze ring with an eagle's head", "A simple lead band with ancient runes"],
    answer: "A gold ring with a heavy black stone cracked down the middle",
  },
  {
    id: 59,
    question: "How does Dumbledore define an 'Inferius' to Harry?",
    options: ["A spirit that possesses the living", "A dead body that has been bewitched to do a Dark wizard's bidding", "A failed werewolf transformation", "A shadow creature from the Department of Mysteries"],
    answer: "A dead body that has been bewitched to do a Dark wizard's bidding",
  },
  {
    id: 60,
    question: "True or False: Horace Slughorn was the former Head of Slytherin House.",
    options: [],
    answer: "True",
  },
  {
    id: 61,
    question: "What does Ambrosius Flume of Honeydukes send Slughorn every birthday?",
    options: ["A basket of Chocolate Frogs", "A hamper of sweets", "A case of Butterbeer", "Crystallized pineapple"],
    answer: "A hamper of sweets",
  },
  {
    id: 62,
    question: "What is the 'Slug Club'?",
    options: ["A dueling club for elite Slytherins", "A group of Slughorn's favorite students and useful contacts", "A secret society dedicated to Potions research", "A Quidditch fan club for the Holyhead Harpies"],
    answer: "A group of Slughorn's favorite students and useful contacts",
  },
  {
    id: 63,
    question: "What is Slughorn's final demand to Dumbledore before agreeing to return to Hogwarts?",
    options: ["A new office in the dungeons", "A pay rise", "Freedom from teaching first-years", "The Defense Against the Dark Arts post"],
    answer: "A pay rise",
  },
  {
    id: 64,
    question: "True or False: Slughorn tells Harry that his mother, Lily Evans, was one of the brightest students he ever taught.",
    options: [],
    answer: "True",
  },
  {
    id: 65,
    question: "Where do the Weasleys keep their broomsticks at the Burrow?",
    options: ["In the attic", "In the cellar", "In a run-down stone outhouse", "Under the kitchen table"],
    answer: "In a run-down stone outhouse",
  },
  {
    id: 66,
    question: "According to Dumbledore, how many people in the world know the full contents of the prophecy regarding Harry and Voldemort?",
    options: ["Only Dumbledore", "Two", "The entire Order of the Phoenix", "Harry, Ron, and Hermione"],
    answer: "Two",
  },
  {
    id: 67,
    question: "Which former Slytherin student—a brother of Sirius Black—does Slughorn mention he would have liked to have 'the set' of?",
    options: ["Phineas Black", "Regulus Black", "Alphard Black", "Cygnus Black"],
    answer: "Regulus Black",
  },
  {
    id: 68,
    question: "What color is Nymphadora Tonks's hair when Harry first sees her at the Burrow in Chapter 5?",
    options: ["Bubble-gum pink", "Violet", "Mousy brown", "Platinum blonde"],
    answer: "Mousy brown",
  },
  {
    id: 69,
    question: "True or False: Arthur Weasley has been promoted to head the Office for the Detection and Confiscation of Counterfeit Defensive Spells and Protective Objects.",
    options: [],
    answer: "True",
  },
  {
    id: 70,
    question: "What is the security question Molly Weasley asks Arthur, and what is his 'dearest ambition' in response?",
    options: ["“What is my middle name?” / “To retire in Devon.”", "“What is your dearest ambition?” / “To find out how airplanes stay up.”", "“What did we eat on our first date?” / “To collect all the spark plugs.”", "“Where did we meet?” / “To buy a Muggle car.”"],
    answer: "“What is your dearest ambition?” / “To find out how airplanes stay up.”",
  },
  {
    id: 71,
    question: "What nickname does Arthur Weasley use for Molly when they are alone together?",
    options: ["Molly-kins", "Mollywobbles", "My Darling Molly", "The Queen of the Kitchen"],
    answer: "Mollywobbles",
  },
  {
    id: 72,
    question: "True or False: Tonks is having trouble with her Metamorphosing abilities because of shock or depression.",
    options: [],
    answer: "True",
  },
  {
    id: 73,
    question: "Which specific Weasleys' Wizard Wheezes product was hidden inside Harry's pillowcase at the Burrow?",
    options: ["A Skiving Snackbox", "A Puking Pastille", "A Nosebleed Nougat", "A Fainting Fancy"],
    answer: "A Puking Pastille",
  },
  {
    id: 74,
    question: "What nickname do Ginny and Hermione use for Fleur Delacour?",
    options: ["The Veela", "Phlegm", "The Cow", "Silver-locks"],
    answer: "Phlegm",
  },
  {
    id: 75,
    question: "True or False: Fleur Delacour is working part-time at Gringotts to improve her English.",
    options: [],
    answer: "True",
  },
  {
    id: 76,
    question: "What grade did Harry receive on his Defense Against the Dark Arts O.W.L.?",
    options: ["Acceptable", "Exceeds Expectations", "Outstanding", "Dreadful"],
    answer: "Outstanding",
  },
  {
    id: 77,
    question: "What was Harry’s grade for his Potions O.W.L.?",
    options: ["Acceptable", "Exceeds Expectations", "Outstanding", "Poor"],
    answer: "Exceeds Expectations",
  },
  {
    id: 78,
    question: "True or False: Hermione received ten 'Outstandings' and one 'Exceeds Expectations' on her O.W.L. results.",
    options: [],
    answer: "False",
  },
  {
    id: 79,
    question: "Which subject did Harry fail because he collapsed halfway through the examination?",
    options: ["Divination", "Astronomy", "History of Magic", "Ancient Runes"],
    answer: "History of Magic",
  },
  {
    id: 80,
    question: "How many O.W.L.s did Ron Achieve in total?",
    options: ["Five", "Seven", "Nine", "Six"],
    answer: "Seven",
  },
  {
    id: 81,
    question: "What object did Hermione squeeze that resulted in her getting a black eye?",
    options: ["A trick wand", "A Puking Pastille", "A punching telescope", "A Decoy Detonator"],
    answer: "A punching telescope",
  },
  {
    id: 82,
    question: "Where was the Weasley family clock currently being kept when Harry arrived at the Burrow?",
    options: ["On the kitchen wall", "In the washing basket on top of a pile of sheets", "In the living room over the mantle", "In Fred and George's bedroom"],
    answer: "In the washing basket on top of a pile of sheets",
  },
  {
    id: 83,
    question: "According to the O.W.L. results, what does the 'Fail' grade 'T' stand for?",
    options: ["Terrible", "Troll", "Tragic", "Tedious"],
    answer: "Troll",
  },
  {
    id: 84,
    question: "What color smoke vanished behind Hermione after she was punched by the telescope?",
    options: ["Pink smoke", "Green smoke", "Black smoke", "White smoke"],
    answer: "Black smoke",
  },
  {
    id: 85,
    question: "True or False: Hermione believes Tonks feels it is her fault Sirius died because she failed to 'finish off' Bellatrix Lestrange during the battle.",
    options: [],
    answer: "True",
  },
  {
    id: 86,
    question: "Where was the body of Igor Karkaroff found after he deserted the Death Eaters?",
    options: ["In a shack up north", "In the middle of the North Sea", "At Borgin and Burkes", "In the Forbidden Forest"],
    answer: "In a shack up north",
  },
  {
    id: 87,
    question: "True or False: Ollivander’s wand shop was found empty with no sign of a struggle, and it remains unknown if he left voluntarily or was kidnapped.",
    options: [],
    answer: "True",
  },
  {
    id: 88,
    question: "What surprise new title did Harry receive in his Hogwarts letter in Chapter 6?",
    options: ["Prefect", "Head Boy", "Quidditch Captain", "Seeker Emeritus"],
    answer: "Quidditch Captain",
  },
  {
    id: 89,
    question: "What is the slogan for the 'U-No-Poo' product in Fred and George’s shop window?",
    options: ["The laxative sensation that's sweeping the station!", "The constipation sensation that’s gripping the nation!", "Forget your worries with a single flush!", "The bowel-shaking treat that can't be beat!"],
    answer: "The constipation sensation that’s gripping the nation!",
  },
  {
    id: 90,
    question: "True or False: Narcissa Malfoy tells Harry he will be 'reunited with dear Sirius' before she is reunited with Lucius.",
    options: [],
    answer: "True",
  },
  {
    id: 91,
    question: "How long do the 'Patented Daydream Charms' last according to the box instructions?",
    options: ["Ten minutes", "Thirty minutes", "One hour", "A full school day"],
    answer: "Thirty minutes",
  },
  {
    id: 92,
    question: "What is the name of the assistant working in Fred and George’s shop?",
    options: ["Verity", "Madame Malkin", "Fleur", "Gabrielle"],
    answer: "Verity",
  },
  {
    id: 93,
    question: "True or False: Fred and George refuse to let Harry pay for anything because he gave them their start-up loan.",
    options: [],
    answer: "True",
  },
  {
    id: 94,
    question: "Which specific Weasleys' Wizard Wheezes product is used for a 'quick escape' and is imported from Peru?",
    options: ["Decoy Detonators", "Instant Darkness Powder", "Shield Cloaks", "Patented Daydream Charms"],
    answer: "Instant Darkness Powder",
  },
  {
    id: 95,
    question: "What color are the robes worn by the staff at Weasleys' Wizard Wheezes?",
    options: ["Bright Orange", "Magenta", "Royal Purple", "Acid Green"],
    answer: "Magenta",
  },
  {
    id: 96,
    question: "True or False: Hermione buys a love potion from the 'WonderWitch' line in Chapter 6.",
    options: [],
    answer: "False",
  },
  {
    id: 97,
    question: "Who is Ginny Weasley currently dating as of the trip to Diagon Alley in Chapter 6?",
    options: ["Michael Corner", "Dean Thomas", "Harry Potter", "Neville Longbottom"],
    answer: "Dean Thomas",
  },
  {
    id: 98,
    question: "Which upscale clothing shop did Narcissa and Draco Malfoy visit after leaving Madam Malkin's in disgust?",
    options: ["Twilfitt and Tatting’s", "Borgin and Burkes", "Flourish and Blotts", "Gladrags Wizardwear"],
    answer: "Twilfitt and Tatting’s",
  },
  {
    id: 99,
    question: "What do the 'Decoy Detonators' look like as they attempt to scurry out of sight?",
    options: ["Tiny mechanical mice", "Weird-looking black horn-type objects", "Spinning silver coins", "Small, exploding crackers"],
    answer: "Weird-looking black horn-type objects",
  },
  {
    id: 100,
    question: "True or False: The Ministry of Magic placed a massive order for five hundred 'Shield Hats' for its support staff.",
    options: [],
    answer: "True",
  },
  {
    id: 101,
    question: "What is the specific price for the 'Metamorph-Medals' being sold on the street, according to Mr. Weasley?",
    options: ["Five Galleons", "Ten Galleons", "Fifty Galleons", "One hundred Galleons"],
    answer: "Ten Galleons",
  },
];

// --- Harry Potter: Deathly Hallows (Book 7, Chapters 1-9) ---

export const HARRY_POTTER_DH_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "Which scholarly publisher's imprint released the first American hardcover edition of 'The Deathly Hallows'?",
    options: ["Bloomsbury", "Arthur A. Levine Books", "Little, Brown", "Pearson"],
    answer: "Arthur A. Levine Books",
    evidence: "\"Arthur A. Levine Books hardcover edition... published by Arthur A. Levine Books, an imprint of Scholastic Inc., July 2007.\" — Chapter Front Matter",
  },
  {
    id: 2,
    question: "The American edition identifies the illustrator as Mary GrandPré, who currently lives in Sarasota, Florida.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Ms. GrandPré lives in Sarasota, Florida, with her family.\" — Chapter Illustrator Bio",
  },
  {
    id: 3,
    question: "In which month and year was the first Scholastic trade paperback printing of 'The Deathly Hallows'?",
    options: ["July 2007", "July 2008", "July 2009", "September 2007"],
    answer: "July 2009",
    evidence: "\"First Scholastic trade paperback printing, July 2009\" — Chapter Front Matter",
  },
  {
    id: 4,
    question: "What is the ISBN-13 of the American edition cited in the publication data?",
    options: ["978-0-545-13970-0", "978-0-545-01022-5", "978-1-545-13970-1", "978-0-439-06487-3"],
    answer: "978-0-545-13970-0",
    evidence: "\"ISBN-13: 978-0-545-13970-0\" — Chapter Front Matter",
  },
  {
    id: 5,
    question: "The dedication of the book 'The Deathly Hallows' is split seven ways.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"DEDICATION OF THIS BOOK IS SPLIT SEVEN WAYS\" — Chapter Dedication",
  },
  {
    id: 6,
    question: "Who is credited as the art director for the Arthur A. Levine Books edition?",
    options: ["Mary GrandPré", "David Saylor", "Arthur Levine", "J.K. Rowling"],
    answer: "David Saylor",
    evidence: "\"art directed by David Saylor\" — Chapter Front Matter",
  },
  {
    id: 7,
    question: "What is the ISBN-10 listed for the source edition?",
    options: ["0-545-13970-8", "0-545-13970-1", "0-439-06487-2", "0-545-01022-5"],
    answer: "0-545-13970-8",
    evidence: "\"ISBN-10: 0-545-13970-8\" — Chapter Front Matter",
  },
  {
    id: 8,
    question: "The source text notes that Harry Potter publishing rights are owned by J.K. Rowling.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Harry Potter Publishing Rights © J. K. Rowling.\" — Chapter Front Matter",
  },
  {
    id: 9,
    question: "How many books had Mary GrandPré illustrated at the time of publication, according to her biographical note?",
    options: ["More than ten", "More than fifteen", "More than twenty", "More than fifty"],
    answer: "More than twenty",
    evidence: "\"MARY GRANDPRÉ has illustrated more than twenty beautiful books\" — Chapter Illustrator Bio",
  },
  {
    id: 10,
    question: "The hardcover edition of the book was printed in the U.S.A.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Printed in the U.S.A. 10\" — Chapter Front Matter",
  },
  {
    id: 11,
    question: "For what specific crime was Percival Dumbledore convicted and sent to Azkaban?",
    options: ["Practicing Dark Arts", "Murder of a Ministry official", "A savage attack upon three young Muggles", "Theft of a magical artifact"],
    answer: "A savage attack upon three young Muggles",
    evidence: "\"Scarcely a year previously, his father, Percival, had been convicted of a savage and well-publicized attack upon three young Muggles.\" — Chapter Chapter 2: In Memoriam",
  },
  {
    id: 12,
    question: "Percival Dumbledore died while serving his sentence in Azkaban.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"his father (who was to die in Azkaban)\" — Chapter Chapter 2: In Memoriam",
  },
  {
    id: 13,
    question: "Kendra Dumbledore had jet-black hair and a face described as having what quality?",
    options: ["A soft quality", "A carved quality", "A round quality", "A stern quality"],
    answer: "A carved quality",
    evidence: "\"Her face had a carved quality about it. Harry thought of photos of Native Americans he’d seen\" — Chapter Chapter 11: The Bribe",
  },
  {
    id: 14,
    question: "To which village did Kendra move her family after her husband’s imprisonment?",
    options: ["Mould-on-the-Wold", "Godric's Hollow", "Hogsmeade", "Little Hangleton"],
    answer: "Godric's Hollow",
    evidence: "\"She therefore decided to uproot the family and relocate to Godric’s Hollow\" — Chapter Chapter 11: The Bribe",
  },
  {
    id: 15,
    question: "Ariana Dumbledore was barely seven years old when she 'vanished' from public sight.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Ariana was barely seven years old when she vanished from sight\" — Chapter Chapter 11: The Bribe",
  },
  {
    id: 16,
    question: "Rita Skeeter claims that Kendra Dumbledore hid Ariana to avoid the shame of her being what?",
    options: ["An Obscurial", "A Squib", "A Maledictus", "A werewolf"],
    answer: "A Squib",
    evidence: "\"Kendra made a decision to hide her daughter’s existence rather than suffer the shame of admitting that she had produced a Squib.\" — Chapter Chapter 11: The Bribe",
  },
  {
    id: 17,
    question: "Which Dumbledore brother preferred to settle arguments by dueling rather than reasoned discussion?",
    options: ["Albus", "Aberforth", "Percival", "The text does not say"],
    answer: "Aberforth",
    evidence: "\"Aberforth was never bookish and, unlike Albus, preferred to settle arguments by dueling rather than through reasoned discussion.\" — Chapter Chapter 2: In Memoriam",
  },
  {
    id: 18,
    question: "Elphias Doge describes Dumbledore's return to Godric’s Hollow as an act of noble self-sacrifice.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"He represents Kendra’s death as a tragic blow, and Dumbledore’s decision to give up his expedition as an act of noble self-sacrifice.\" — Chapter Chapter 18: The Life and Lies of Albus Dumbledore",
  },
  {
    id: 19,
    question: "What was the only personal question Harry ever asked Dumbledore that he suspected was answered dishonestly?",
    options: ["Where is the Elder Wand?", "Who did you love?", "What do you see when you look in the mirror?", "How did your sister die?"],
    answer: "What do you see when you look in the mirror?",
    evidence: "\"the only personal question he had ever asked his headmaster was also the only one he suspected that Dumbledore had not answered honestly: ‘What do you see when you look in the mirror?’\" — Chapter Chapter 2: In Memoriam",
  },
  {
    id: 20,
    question: "Dumbledore claimed to see himself holding a pair of thick, woolen socks in the Mirror of Erised.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘I? I see myself holding a pair of thick, woolen socks.’\" — Chapter Chapter 2: In Memoriam",
  },
  {
    id: 21,
    question: "In Chapter 16 of Skeeter's book, who claims Dumbledore 'borrowed' their papers on the eight uses of dragon's blood?",
    options: ["Adalbert Waffling", "Bathilda Bagshot", "Nicolas Flamel", "Ivor Dillonsby"],
    answer: "Ivor Dillonsby",
    evidence: "\"As I reveal in chapter sixteen, Ivor Dillonsby claims he had already discovered eight uses of dragon’s blood when Dumbledore ‘borrowed’ his papers.\" — Chapter Chapter 18: The Life and Lies of Albus Dumbledore",
  },
  {
    id: 22,
    question: "Rita Skeeter claims she developed a 'close bond' with Harry Potter during the Triwizard Tournament.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘Oh, yes, we’ve developed a close bond,’ says Skeeter.\" — Chapter Chapter 18: The Life and Lies of Albus Dumbledore",
  },
  {
    id: 23,
    question: "How old was Ariana Dumbledore when she accidentally killed her mother, Kendra?",
    options: ["Seven", "Ten", "Fourteen", "Seventeen"],
    answer: "Fourteen",
    evidence: "\"‘Then, when she was fourteen... it was an accident. Ariana couldn’t control it. But my mother was killed.’\" — Chapter Chapter 28: The Missing Mirror",
  },
  {
    id: 24,
    question: "Which famous alchemist was a regular correspondent of a young Albus Dumbledore?",
    options: ["Nicolas Flamel", "Perenelle Flamel", "Gellert Grindelwald", "Bathilda Bagshot"],
    answer: "Nicolas Flamel",
    evidence: "\"he was soon in regular correspondence with the most notable magical names of the day, including Nicolas Flamel, the celebrated alchemist\" — Chapter Chapter 2: In Memoriam",
  },
  {
    id: 25,
    question: "The phrase 'FOR THE GREATER GOOD' was used by Albus Dumbledore in a letter to Grindelwald.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"We seize control FOR THE GREATER GOOD... Albus\" — Chapter Chapter 18: The Life and Lies of Albus Dumbledore",
  },
  {
    id: 26,
    question: "From which school was Grindelwald expelled before meeting Dumbledore?",
    options: ["Hogwarts", "Beauxbatons", "Durmstrang", "Uagadou"],
    answer: "Durmstrang",
    evidence: "\"This was your mistake at Durmstrang! But I do not complain, because if you had not been expelled, we would never have met.\" — Chapter Chapter 18: The Life and Lies of Albus Dumbledore",
  },
  {
    id: 27,
    question: "Which neighbor of the Dumbledores in Godric's Hollow claims Aberforth used to 'chuck goat dung' at her head?",
    options: ["Bathilda Bagshot", "Enid Smeek", "Muriel", "Hestia Jones"],
    answer: "Enid Smeek",
    evidence: "\"‘He were a head case, that Aberforth,’ says Enid Smeek... ‘only he kept chucking goat dung at my head.’\" — Chapter Chapter 18: The Life and Lies of Albus Dumbledore",
  },
  {
    id: 28,
    question: "Albus Dumbledore's mother, Kendra, had a face described as having a 'carved quality'.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Her face had a carved quality about it.\" — Chapter Chapter 11: The Bribe",
  },
  {
    id: 29,
    question: "What was the name of the historian who lived in Godric's Hollow and was a correspondent of Dumbledore?",
    options: ["Ivor Dillonsby", "Enid Smeek", "Bathilda Bagshot", "Elphias Doge"],
    answer: "Bathilda Bagshot",
    evidence: "\"Bathilda Bagshot, the noted historian\" — Chapter Chapter 2: In Memoriam",
  },
  {
    id: 30,
    question: "What did Albus and Aberforth Dumbledore wear in the old family photograph mentioned in the text?",
    options: ["School robes", "Matching lacy collared jackets", "Muggle suits", "Quidditch uniforms"],
    answer: "Matching lacy collared jackets",
    evidence: "\"Albus and Aberforth wore matching lacy collared jackets and had identical, shoulder-length hairstyles.\" — Chapter Chapter 11: The Bribe",
  },
  {
    id: 31,
    question: "Rita Skeeter claims that Albus Dumbledore's nose was broken at his sister's funeral.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"it’s certainly an open secret that Albus and Aberforth had a most ferocious quarrel at their sister’s funeral... nobody who was there can deny it — Albus’s nose was broken\" — Chapter Chapter 18: The Life and Lies of Albus Dumbledore",
  },
  {
    id: 32,
    question: "In his letters to Elphias Doge, what did Albus rarely mention?",
    options: ["His research", "His day-to-day life", "Grindelwald", "Hogwarts"],
    answer: "His day-to-day life",
    evidence: "\"His letters told me little of his day-to-day life\" — Chapter Chapter 2: In Memoriam",
  },
  {
    id: 33,
    question: "Ariana Dumbledore helped Aberforth feed the goats when she was quiet.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘when she was quiet, she used to help me feed the goats.’\" — Chapter Chapter 28: The Missing Mirror",
  },
  {
    id: 34,
    question: "Who was the only person who could consistently calm Ariana during her 'rages'?",
    options: ["Albus", "Kendra", "Aberforth", "Gellert"],
    answer: "Aberforth",
    evidence: "\"‘I could get her to calm down when she was in one of her rages’\" — Chapter Chapter 28: The Missing Mirror",
  },
  {
    id: 35,
    question: "What village was the Dumbledore family's original home before the attack on the Muggles?",
    options: ["Godric's Hollow", "Little Hangleton", "Mould-on-the-Wold", "Tinworth"],
    answer: "Mould-on-the-Wold",
    evidence: "\"Kendra Dumbledore could not bear to remain in Mould-on-the-Wold after her husband Percival’s well-publicized arrest\" — Chapter Chapter 11: The Bribe",
  },
  {
    id: 36,
    question: "What pseudonym did Harry use while disguised at the wedding of Bill and Fleur?",
    options: ["Barry", "Barny", "Bertie", "Ben"],
    answer: "Barny",
    evidence: "\"‘Er — my name’s Barny,’ said Harry, flummoxed.\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 37,
    question: "Harry's wedding disguise was achieved by affecting the appearance of a 'slightly fatter' boy.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"The Muggle boy whose appearance he was affecting was slightly fatter than him\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 38,
    question: "What accessory did Luna Lovegood wear in her hair at the wedding?",
    options: ["A radish", "A large sunflower", "A golden snitch", "A butterfly"],
    answer: "A large sunflower",
    evidence: "\"Luna was wearing bright yellow robes, which she had accessorized with a large sunflower in her hair.\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 39,
    question: "According to the text, how old is Auntie Muriel?",
    options: ["98", "101", "107", "112"],
    answer: "107",
    evidence: "\"‘I am a hundred and seven and I ought not to be on my feet too long.’\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 40,
    question: "Viktor Krum purchased one of the last wands ever produced by the wandmaker Gregorovitch.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘I vos one of the last to purchase a Gregorovitch vand.’\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 41,
    question: "Why was Viktor Krum angry with Xenophilius Lovegood at the wedding?",
    options: ["He insulted Bulgaria", "He was wearing the mark of Grindelwald", "He stole his seat", "He was talking to Hermione"],
    answer: "He was wearing the mark of Grindelwald",
    evidence: "\"‘who attacked me for sporting the symbol of a well-known Dark wizard!’\" — Chapter Chapter 21: The Tale of the Three Brothers",
  },
  {
    id: 42,
    question: "What did Bill and Fleur give Harry as a seventeenth birthday present?",
    options: ["A Sneakoscope", "An enchanted razor", "A leather rucksack", "A box of chocolates"],
    answer: "An enchanted razor",
    evidence: "\"an enchanted razor from Bill and Fleur\" — Chapter Chapter 7: The Will of Albus Dumbledore",
  },
  {
    id: 43,
    question: "Monsieur Delacour warned Harry that the enchanted razor requires clear instructions.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘but you must tell it clearly what you want . . . ozzerwise you might find you ‘ave a leetle less hair zan you would like’\" — Chapter Chapter 7: The Will of Albus Dumbledore",
  },
  {
    id: 44,
    question: "Which guest at the wedding told Harry that 'Rita Skeeter is a dreadful—'?",
    options: ["Ron", "Auntie Muriel", "Elphias Doge", "Viktor Krum"],
    answer: "Elphias Doge",
    evidence: "\"‘Harry, Rita Skeeter is a dreadful —’ But he was interrupted by a shrill cackle.\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 45,
    question: "Fred Weasley threatened to use which curse on his mother if she interfered with his wedding?",
    options: ["Cruciatus Curse", "Full Body-Bind Curse", "Impediment Jinx", "Stupefy"],
    answer: "Full Body-Bind Curse",
    evidence: "\"‘and I’ll put a full Body-Bind Curse on Mum until it’s all over.’\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 46,
    question: "Hermione's gift to Harry for his seventeenth birthday was a new Sneakoscope.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"She had bought him a new Sneakoscope.\" — Chapter Chapter 7: The Will of Albus Dumbledore",
  },
  {
    id: 47,
    question: "What form did Mr. Weasley’s Patronus take when delivering a message to the wedding?",
    options: ["A lynx", "A silver weasel", "A phoenix", "A stag"],
    answer: "A silver weasel",
    evidence: "\"it resolved itself into a bright silver weasel, which stood on its hind legs and spoke with Mr. Weasley’s voice.\" — Chapter Chapter 7: The Will of Albus Dumbledore",
  },
  {
    id: 48,
    question: "Who was Bill Weasley’s best man at the wedding?",
    options: ["Ron", "Harry", "Charlie", "Fred"],
    answer: "Charlie",
    evidence: "\"Bill would be sharing with Charlie, his best man\" — Chapter Chapter 7: The Will of Albus Dumbledore",
  },
  {
    id: 49,
    question: "The wedding marquee featured a dance floor made of 'molten gold'.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"a pool of molten gold spread from the center of the tent to form a gleaming dance floor\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 50,
    question: "Which character was the 'life and soul of the party' despite going 'loopy' later?",
    options: ["Uncle Bilius", "Arthur Weasley", "Elphias Doge", "Xenophilius Lovegood"],
    answer: "Uncle Bilius",
    evidence: "\"‘But before he went loopy he was the life and soul of the party,’ said Fred.\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 51,
    question: "Uncle Bilius never married.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘Never married, for some reason,’ said Ron.\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 52,
    question: "What did Uncle Bilius pull out of his robes at weddings?",
    options: ["Wands", "Bunches of flowers", "Rabbits", "Chocolate frogs"],
    answer: "Bunches of flowers",
    evidence: "\"‘start pulling bunches of flowers out of his —’\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 53,
    question: "How many people had Harry shown to their seats before meeting Ron at the entrance?",
    options: ["A dozen", "Two dozen", "Fifty", "One hundred"],
    answer: "A dozen",
    evidence: "\"Harry had shown a dozen more people to their places.\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 54,
    question: "Viktor Krum noted that Gregorovitch retired 'several years ago'.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘He retired several years ago.’\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 55,
    question: "What color robes did Xenophilius and Luna Lovegood wear to the wedding?",
    options: ["Bright yellow", "Pale blue", "Deep purple", "Silver"],
    answer: "Bright yellow",
    evidence: "\"Like her father, Luna was wearing bright yellow robes\" — Chapter Chapter 8: The Wedding",
  },
  {
    id: 56,
    question: "What is the gold bounty placed on Harry Potter’s head as 'Undesirable Number One'?",
    options: ["1,000 Galleons", "5,000 Galleons", "10,000 Galleons", "20,000 Galleons"],
    answer: "10,000 Galleons",
    evidence: "\"there was a ten-thousand-Galleon price on his head.\" — Chapter Chapter 15: The Goblin’s Revenge",
  },
  {
    id: 57,
    question: "Following Dumbledore's death, Severus Snape was appointed Headmaster of Hogwarts.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Severus Snape... was today appointed headmaster\" — Chapter Chapter 12: Magic is Might",
  },
  {
    id: 58,
    question: "Which Carrow sibling took over the post of Defense Against the Dark Arts?",
    options: ["Alecto", "Amycus", "Cormac", "Anton"],
    answer: "Amycus",
    evidence: "\"Amycus, fills the position of Defense Against the Dark Arts professor.\" — Chapter Chapter 12: Magic is Might",
  },
  {
    id: 59,
    question: "Alecto Carrow took over which teaching position at Hogwarts?",
    options: ["Muggle Studies", "Potions", "Charms", "History of Magic"],
    answer: "Muggle Studies",
    evidence: "\"Alecto Carrow will take over the post [of Muggle Studies]\" — Chapter Chapter 12: Magic is Might",
  },
  {
    id: 60,
    question: "Remus Lupin’s codename on the secret radio show 'Potterwatch' is Romulus.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘And what would you say to Harry if you knew he was listening, Romulus?’\" — Chapter Chapter 22: The Deathly Hallows",
  },
  {
    id: 61,
    question: "What is the upcoming password for the 'Potterwatch' broadcast announced by Rapier?",
    options: ["Phoenix", "Albus", "Mad-Eye", "Dumbledore"],
    answer: "Mad-Eye",
    evidence: "\"‘The next password will be “Mad-Eye.”’\" — Chapter Chapter 22: The Deathly Hallows",
  },
  {
    id: 62,
    question: "Which 'Potterwatch' contributor uses the codename 'Rapier'?",
    options: ["Fred Weasley", "George Weasley", "Ron Weasley", "Lee Jordan"],
    answer: "Fred Weasley",
    evidence: "\"‘Thank you very much for those wise words, Rapier,’ said Lee.\" — Chapter Chapter 22: The Deathly Hallows",
  },
  {
    id: 63,
    question: "Kingsley Shacklebolt was assigned to protect the Muggle Prime Minister.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘Kingsley is protecting the Mug — I mean, your Prime Minister.’\" — Chapter Chapter 3: The Dursleys Departing",
  },
  {
    id: 64,
    question: "What was the name of the Muggle-born Ministry official murdered with Ted Tonks?",
    options: ["Dirk Cresswell", "Reg Cattermole", "Albert Runcorn", "Pius Thicknesse"],
    answer: "Dirk Cresswell",
    evidence: "\"silence in memory of Ted Tonks, Dirk Cresswell, Bathilda Bagshot\" — Chapter Chapter 22: The Deathly Hallows",
  },
  {
    id: 65,
    question: "According to Lupin, who did the Death Eaters torture for Harry's whereabouts?",
    options: ["Dolores Umbridge", "Rufus Scrimgeour", "Kingsley Shacklebolt", "Arthur Weasley"],
    answer: "Rufus Scrimgeour",
    evidence: "\"‘Arthur heard a rumor that they tried to torture your whereabouts out of Scrimgeour before they killed him’\" — Chapter Chapter 11: The Bribe",
  },
  {
    id: 66,
    question: "After Dumbledore’s death, the Fidelius Charm on Grimmauld Place was diluted among twenty Secret-Keepers.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘And as there are around twenty of us, that greatly dilutes the power of the Fidelius Charm.’\" — Chapter Chapter 6: The Ghoul in Pajamas",
  },
  {
    id: 67,
    question: "Who sent Mr. Weasley the remains of Sirius Black’s flying motorbike?",
    options: ["Harry Potter", "Hagrid", "Ted Tonks", "Remus Lupin"],
    answer: "Ted Tonks",
    evidence: "\"‘Ted Tonks sent me most of what was left of Sirius’s bike’\" — Chapter Chapter 6: The Ghoul in Pajamas",
  },
  {
    id: 68,
    question: "The Ministry Department on Level Four incorporates which office?",
    options: ["Muggle-Born Registration Commission", "Goblin Liaison Office", "Office of Misinformation", "Auror Headquarters"],
    answer: "Goblin Liaison Office",
    evidence: "\"‘incorporating Beast, Being, and Spirit Divisions, Goblin Liaison Office, and Pest Advisory Bureau’\" — Chapter Chapter 12: Magic is Might",
  },
  {
    id: 69,
    question: "Dolores Umbridge used a telescopic attachment on the eye of Mad-Eye Moody to spy on her workers.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Behind Mad-Eye’s eye, a telescopic attachment enabled Umbridge to spy on the workers\" — Chapter Chapter 13: The Muggle-born Registration Commission",
  },
  {
    id: 70,
    question: "What does Xeno Lovegood urge wizards to make their 'number-one priority'?",
    options: ["Capturing Voldemort", "Finding the Hallows", "Helping Harry Potter", "Buying The Quibbler"],
    answer: "Helping Harry Potter",
    evidence: "\"‘any wizard who’s against You-Know-Who ought to make helping Harry Potter their number-one priority.’\" — Chapter Chapter 15: The Goblin’s Revenge",
  },
  {
    id: 71,
    question: "The 'Potterwatch' broadcast includes a minute’s silence for Gornuk the goblin.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"silence in memory of Ted Tonks, Dirk Cresswell, Bathilda Bagshot, Gornuk\" — Chapter Chapter 22: The Deathly Hallows",
  },
  {
    id: 72,
    question: "Which character’s slow, deep voice was 'reassuring' to the Dursleys?",
    options: ["Albus Dumbledore", "Kingsley Shacklebolt", "Remus Lupin", "Dedalus Diggle"],
    answer: "Kingsley Shacklebolt",
    evidence: "\"‘certain reassuring something in his slow, deep voice’\" — Chapter Chapter 3: The Dursleys Departing",
  },
  {
    id: 73,
    question: "What spell does Hermione suggest Ron use to protect his belongings from an Atmospheric Charm?",
    options: ["Stupefy", "Impervius", "Tergeo", "Protego"],
    answer: "Impervius",
    evidence: "\"‘as an interim measure try Impervius to protect his belongings’\" — Chapter Chapter 12: Magic is Might",
  },
  {
    id: 74,
    question: "Phineas Nigellus Black was often shoved back into a beaded bag for asking leading questions.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Hermione shoved him back inside the beaded bag every time he did this\" — Chapter Chapter 15: The Goblin’s Revenge",
  },
  {
    id: 75,
    question: "Which Auror was in St. Mungo's after a failed attempt to capture Neville’s grandmother?",
    options: ["Shacklebolt", "Dawlish", "Savage", "Proudfoot"],
    answer: "Dawlish",
    evidence: "\"‘Anyway,’ Neville laughed, ‘Dawlish is still in St. Mungo’s and Gran’s on the run.’\" — Chapter Chapter 29: The Lost Diadem",
  },
  {
    id: 76,
    question: "What wood was the replacement wand made of that Ron gave to Harry?",
    options: ["Holly", "Blackthorn", "Yew", "Oak"],
    answer: "Blackthorn",
    evidence: "\"had decided was made of blackthorn.\" — Chapter Chapter 20: Xenophilius Lovegood",
  },
  {
    id: 77,
    question: "The Grey Lady hid the diadem of Ravenclaw in a hollow tree in Albania.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘Concealed inside a hollow tree... A forest in Albania.’\" — Chapter Chapter 31: The Battle of Hogwarts",
  },
  {
    id: 78,
    question: "In which book did Hermione find the name 'Peverell' listed in a genealogy?",
    options: ["A History of Magic", "Nature’s Nobility", "The Tales of Beedle the Bard", "Prefects Who Gained Power"],
    answer: "Nature’s Nobility",
    evidence: "\"‘The only place I’ve managed to find the name “Peverell” is Nature’s Nobility: A Wizarding Genealogy.’\" — Chapter Chapter 21: The Tale of the Three Brothers",
  },
  {
    id: 79,
    question: "What does it mean when a family like the Peverells is 'extinct in the male line'?",
    options: ["The name has died out", "They have no magic", "They are all female", "The family is cursed"],
    answer: "The name has died out",
    evidence: "\"‘It means the name’s died out,’ said Hermione\" — Chapter Chapter 21: The Tale of the Three Brothers",
  },
  {
    id: 80,
    question: "Harry realizes that Dumbledore had his Invisibility Cloak the night his parents died.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘Dumbledore had my Cloak the night my parents died!’\" — Chapter Chapter 22: The Deathly Hallows",
  },
  {
    id: 81,
    question: "In Snape's memories, Lily Potter's flower petals open and close like what?",
    options: ["A hungry venus flytrap", "A many-lipped oyster", "A fluttering wing", "A beating heart"],
    answer: "A many-lipped oyster",
    evidence: "\"opening and closing its petals, like some bizarre, many-lipped oyster.\" — Chapter Chapter 33: The Prince’s Tale",
  },
  {
    id: 82,
    question: "What insult did Snape call Lily that she refused to forgive?",
    options: ["Squib", "Blood-traitor", "Mudblood", "Brat"],
    answer: "Mudblood",
    evidence: "\"‘I never meant to call you Mudblood, it just —’\" — Chapter Chapter 33: The Prince’s Tale",
  },
  {
    id: 83,
    question: "Dumbledore told Snape that he had 'less than a year' to live due to a curse.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Snape hesitated, and then said, ‘I cannot tell. Maybe a year.’... Dumbledore smiled. The news that he had less than a year to live seemed a matter of little or no concern to him.\" — Chapter Chapter 33: The Prince’s Tale",
  },
  {
    id: 84,
    question: "During the Battle of Hogwarts, which towers were Flitwick, Sprout, and McGonagall assigned to?",
    options: ["North, South, and West", "Ravenclaw, Astronomy, and Gryffindor", "Hufflepuff, Clock, and Owl", "Slytherin, Dungeons, and Quidditch"],
    answer: "Ravenclaw, Astronomy, and Gryffindor",
    evidence: "\"‘take groups of fighters up to the three highest towers — Ravenclaw, Astronomy, and Gryffindor’\" — Chapter Chapter 30: The Sacking of Severus Snape",
  },
  {
    id: 85,
    question: "What was the name of Voldemort’s snake that Harry told Neville must be killed?",
    options: ["Nagini", "Nero", "Norbert", "Nestor"],
    answer: "Nagini",
    evidence: "\"‘You know Voldemort’s snake, Neville? He’s got a huge snake. . . . Calls it Nagini.. .’ ‘It’s got to be killed.’\" — Chapter Chapter 34: The Forest Again",
  },
  {
    id: 86,
    question: "The Peverell family is buried in the graveyard at Godric's Hollow.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘So that Peverell bloke who’s buried in Godric’s Hollow’\" — Chapter Chapter 16: Godric's Hollow",
  },
  {
    id: 87,
    question: "In the epilogue, what is the specific date for the departure to Hogwarts?",
    options: ["September 1st", "September 2nd", "August 31st", "September 19th"],
    answer: "September 1st",
    evidence: "\"The morning of the first of September was crisp and golden as an apple\" — Chapter Epilogue: Nineteen Years Later",
  },
  {
    id: 88,
    question: "In his final instructions to Neville, what did Harry ask him to do as a 'backup'?",
    options: ["Destroy the locket", "Kill the snake", "Defend the Great Hall", "Find Ron and Hermione"],
    answer: "Kill the snake",
    evidence: "\"‘It’s got to be killed. Ron and Hermione know that, but just in case... make sure there were backups’\" — Chapter Chapter 34: The Forest Again",
  },
  {
    id: 89,
    question: "Harry used the 'Tergeo' spell to clean the dust off photographs in Bathilda Bagshot’s house.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"he muttered ‘Tergeo’: The dust vanished from the photographs\" — Chapter Chapter 17: Bathilda’s Secret",
  },
  {
    id: 90,
    question: "Which knight screamed encouragement to Harry as he rushed through the passages?",
    options: ["Sir Nicholas", "Sir Patrick", "Sir Cadogan", "Sir Lancelot"],
    answer: "Sir Cadogan",
    evidence: "\"the little painted knight, Sir Cadogan... screaming encouragement\" — Chapter Chapter 31: The Battle of Hogwarts",
  },
  {
    id: 91,
    question: "Where did Bill and Fleur live after their wedding?",
    options: ["The Burrow", "Grimmauld Place", "Shell Cottage", "Malfoy Manor"],
    answer: "Shell Cottage",
    evidence: "\"Bill and Fleur’s cottage... It was a lonely and beautiful place.\" — Chapter Chapter 25: Shell Cottage",
  },
  {
    id: 92,
    question: "The Elder Wand was buried with Albus Dumbledore in his marble tomb.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Dumbledore’s hands were folded upon his chest, and there it lay... buried with him.\" — Chapter Chapter 24: The Wandmaker",
  },
  {
    id: 93,
    question: "What did Harry notice after using 'Tergeo' on the photos in Bathilda's house?",
    options: ["The photos were moving", "Half a dozen were missing", "They were of Grindelwald", "They were all burned"],
    answer: "Half a dozen were missing",
    evidence: "\"he saw at once that half a dozen were missing from the largest and most ornate frames.\" — Chapter Chapter 17: Bathilda’s Secret",
  },
  {
    id: 94,
    question: "Who reported Harry as 'engaging' despite Snape's protests in the memories?",
    options: ["Dumbledore", "Other teachers", "The students", "The Prophet"],
    answer: "Other teachers",
    evidence: "\"‘Other teachers report that the boy is modest, likable, and reasonably talented. Personally, I find him an engaging child.’\" — Chapter Chapter 33: The Prince’s Tale",
  },
  {
    id: 95,
    question: "The epilogue describes the morning of September 1st as 'crisp and golden as an apple.'",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"The morning of the first of September was crisp and golden as an apple\" — Chapter Epilogue: Nineteen Years Later",
  },
  {
    id: 96,
    question: "Which character's remains were discovered in Godric's Hollow after several months?",
    options: ["Ted Tonks", "Bathilda Bagshot", "Gornuk", "Dirk Cresswell"],
    answer: "Bathilda Bagshot",
    evidence: "\"‘the remains of Bathilda Bagshot have been discovered in Godric’s Hollow. The evidence is that she died several months ago.’\" — Chapter Chapter 22: The Deathly Hallows",
  },
  {
    id: 97,
    question: "In Snape's memories, what magazine was Dumbledore reading when Snape complained about Harry?",
    options: ["The Quibbler", "The Daily Prophet", "Transfiguration Today", "Nature’s Nobility"],
    answer: "Transfiguration Today",
    evidence: "\"said Dumbledore, without raising his eyes from a copy of Transfiguration Today.\" — Chapter Chapter 33: The Prince’s Tale",
  },
  {
    id: 98,
    question: "Albus Dumbledore's interest in the Invisibility Cloak was because it 'completed the trio'.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘our interest in the Cloak was mainly that it completed the trio’\" — Chapter Chapter 35: King’s Cross",
  },
  {
    id: 99,
    question: "What did Neville's grandmother send him after she went 'on the run'?",
    options: ["A Sneakoscope", "A letter saying she was proud", "A new wand", "A Mimbulus mimbletonia"],
    answer: "A letter saying she was proud",
    evidence: "\"‘She sent me a letter,’ he clapped a hand to the breast pocket... ‘telling me she was proud of me’\" — Chapter Chapter 29: The Lost Diadem",
  },
  {
    id: 100,
    question: "The door knocker of Ravenclaw Tower requires a riddle instead of a password.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"‘What? Isn’t there just a password?’ ‘Oh no, you’ve got to answer a question,’ said Luna.\" — Chapter Chapter 29: The Lost Diadem",
  },
];

export const THREE_BODY_PROBLEM_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "In the 1967 struggle session at Tsinghua University, what was the plaque around Ye Zhetai's neck made of?",
    options: ["A wooden board with red characters", "An iron door taken from a laboratory oven", "A bamboo frame for posters", "A slate of granite from the gates"],
    answer: "An iron door taken from a laboratory oven",
    evidence: "\"And the plaque he wore around his neck wasn’t wooden, like the others, but an iron door taken from a laboratory oven.\" — The Three-Body Problem: 1. The Madness Years"
  },
  {
    id: 2,
    question: "The book 'Silent Spring' was given to Ye Wenjie by her father, Ye Zhetai, to help her understand the nature of human evil.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Bai took a book with a blue cover from his bag... 'Silent Spring,' she read on the cover, by Rachel Carson.\" — The Three-Body Problem: 2. Silent Spring"
  },
  {
    id: 3,
    question: "What specific environmental consequence did the letter written by Bai Mulin warn the central leadership about?",
    options: ["The extinction of the Dahurian larch", "Radioactive fallout from Radar Peak", "Severe ecological consequences from deforestation", "Contamination of the Yellow River by pesticides"],
    answer: "Severe ecological consequences from deforestation",
    evidence: "\"Finally, it concluded that the Inner Mongolia Production and Construction Corps’ actions would lead to severe ecological consequences.\" — The Three-Body Problem: 2. Silent Spring"
  },
  {
    id: 4,
    question: "How did Ye Wenjie’s sister, Ye Wenxue, die during the Cultural Revolution?",
    options: ["She was executed alongside her father", "She died in a war between Red Guard factions", "She committed suicide in the faculty housing", "She was killed by a stray bullet at Red Coast"],
    answer: "She died in a war between Red Guard factions",
    evidence: "\"She had only learned recently that Wenxue had died two years ago in one of the wars between Red Guard factions.\" — The Three-Body Problem: 2. Silent Spring"
  },
  {
    id: 5,
    question: "In the 'Shooter' hypothesis, what 'law' do the two-dimensional creatures believe they have discovered?",
    options: ["The universe is composed of ten-centimeter circles", "There exists a hole in the universe every ten centimeters", "Light only travels in ten-centimeter increments", "The shooter is a god of ten-centimeter steps"],
    answer: "There exists a hole in the universe every ten centimeters",
    evidence: "\"Their scientists, after observing the universe, discover a great law: 'There exists a hole in the universe every ten centimeters.'\" — The Three-Body Problem: 6. The Shooter and the Farmer"
  },
  {
    id: 6,
    question: "According to the 'Farmer' hypothesis, what occurs at eleven o’clock on the morning of Thanksgiving?",
    options: ["The turkeys are given a double portion of food", "The turkeys are set free into the wild", "The farmer comes and kills the entire flock", "The scientist turkey is proven correct"],
    answer: "The farmer comes and kills the entire flock",
    evidence: "\"On the morning of Thanksgiving... at eleven, food doesn’t arrive; instead, the farmer comes and kills the entire flock.\" — The Three-Body Problem: 6. The Shooter and the Farmer"
  },
  {
    id: 7,
    question: "What was the core conclusion regarding the nature of science in Yang Dong's suicide note?",
    options: ["Physics has betrayed the people", "The countdown has reached zero", "Physics has never existed", "The universe is but a dream"],
    answer: "Physics has never existed",
    evidence: "\"All the evidence points to a single conclusion: Physics has never existed, and will never exist.\" — The Three-Body Problem: 4. The Frontiers of Science"
  },
  {
    id: 8,
    question: "Wang Miao's 'countdown' was a personalized psychological attack because of which specific condition?",
    options: ["It only appeared when he was alone", "It only appeared on photographs taken by him", "It moved faster when he worked on nanomaterials", "It was invisible to electronic sensors"],
    answer: "It only appeared on photographs taken by him",
    evidence: "\"The countdown only appeared on the pictures he took!\" — The Three-Body Problem: 6. The Shooter and the Farmer"
  },
  {
    id: 9,
    question: "In the Three-Body game, 'dehydration' is a punitive process used to execute the followers of the tyrant King Zhou.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Of course. You can, too. Otherwise we could not survive the Chaotic Eras.\" — The Three-Body Problem: 7. Three Body: King Wen of Zhou and the Long Night"
  },
  {
    id: 10,
    question: "When observing the sky in the Three-Body simulation, what do 'three flying stars' signify?",
    options: ["The beginning of a long Stable Era", "A period of extreme cold that turns stone into dust", "The arrival of the Great sun", "The successful rehydration of the elite"],
    answer: "A period of extreme cold that turns stone into dust",
    evidence: "\"It indicates the arrival of a long period of extreme cold, cold enough to turn stone into dust.\" — The Three-Body Problem: 7. Three Body: King Wen of Zhou and the Long Night"
  },
  {
    id: 11,
    question: "What is the technical function of '3K glasses' as described by Sha Ruishan?",
    options: ["To see through the walls of Red Coast Base", "To convert 7cm background radiation into visible red light", "To observe nanomaterials at the atomic level", "To decode the countdown in the starry sky"],
    answer: "To convert 7cm background radiation into visible red light",
    evidence: "\"miniaturize it to the size of a pair of glasses... so that seven-centimeter waves are turned into visible red light.\" — The Three-Body Problem: 9. The Universe Flickers"
  },
  {
    id: 12,
    question: "What was the 'microwave oven' cover story for Red Coast's offensive capabilities?",
    options: ["Heating the atmosphere to cause weather disasters", "Destroying or disabling enemy space vessels", "Transmitting propaganda to the Soviet Union", "Melting the ice on Radar Peak"],
    answer: "Destroying or disabling enemy space vessels",
    evidence: "\"Red Coast is a microwave oven, and its heating targets are the enemy’s space vessels.\" — The Three-Body Problem: 12. Red Coast II"
  }
];

export const THE_DARK_FOREST_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "According to Ye Wenjie, what are the two fundamental axioms of cosmic sociology?",
    options: ["Survival is the primary need of civilization; civilization grows while total matter remains constant.", "Communication is the primary need; technology expands as energy remains constant.", "Strategic transparency is necessary; intelligence expands while entropy increases.", "Exploration is the primary need; life expands as space remains constant."],
    answer: "Survival is the primary need of civilization; civilization grows while total matter remains constant.",
    evidence: "\"Ye Wenjie outlines the foundation of her theory: 'First: Survival is the primary need of civilization. Second: Civilization continuously grows and expands, but the total matter in the universe remains constant.'\" — The Dark Forest: Prologue"
  },
  {
    id: 2,
    question: "During the ant's journey across the tombstone, what interaction serves as a metaphor for the Trisolaran view of humanity?",
    options: ["The ant sensing the vibrations of the giant beings.", "A spider being swept away by a bundle of flowers held by a giant being.", "The ant forgetting the home it once knew.", "The ant encountering the off-white troughs of the '1'."],
    answer: "A spider being swept away by a bundle of flowers held by a giant being.",
    evidence: "\"Down below, the spider encountered one such exception when the being... whisked away the spider and web with the stems of a bundle of flowers it held in one limb, causing them to land broken in a pile of weeds.\" — The Dark Forest: Prologue"
  },
  {
    id: 3,
    question: "What specific Chinese character did the ant retain as the only shape in its memory from the tombstone journey?",
    options: ["Mu (Grave)", "Zhi (Possessive modifier)", "Dong (Winter)", "Yang (Poplar)"],
    answer: "Yang (Poplar)",
    evidence: "\"The top one was split into two parts, which together formed the character —yang, meaning \\\"poplar.\\\" This was the last shape the ant remembered, and the only one it retained from its entire journey.\" — The Dark Forest: Prologue"
  },
  {
    id: 4,
    question: "In the story of 'Little Red Riding Hood' told by Evans, the Trisolaran Lord found the wolf's attempt to communicate with the children to be logically incomprehensible.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"This is what’s incomprehensible. In order to achieve its own aims, it shouldn’t have communicated with the children. ... If there was communication between them, the children would have known that the wolf wanted to come in and eat them.\" — The Dark Forest: Prologue"
  },
  {
    id: 5,
    question: "Mike Evans explained to the Lord that the kinship status of the 'Grandmother' was the most important element for understanding the wolf's deceit.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Lord, that is not important. All you need to know is that she and the children have a close relationship. She is one of the only people the children trust.\" — The Dark Forest: Prologue"
  },
  {
    id: 6,
    question: "Why did the Trisolaran Lord ultimately state, 'I am afraid of you,' to Mike Evans?",
    options: ["Because humans possess nuclear technology.", "Because humans can hide their thoughts and engage in deceit.", "Because the ETO had betrayed the Trisolarans.", "Because humans had discovered the Trisolaran home system."],
    answer: "Because humans can hide their thoughts and engage in deceit.",
    evidence: "\"I am afraid of you. ... Your thoughts are completely exposed to the outside world. You can’t hide. ... [Humans] have a biological weakness. ... Direct display of thought is a superior, more efficient form of communication.\" — The Dark Forest: Prologue"
  },
  {
    id: 7,
    question: "Frederick Tyler's strategic focus as a Wallfacer was based on which theory regarding technology?",
    options: ["The use of wooden boat suicide squads.", "Technological progress enhancing the strategic weight of small countries.", "Socialism of the Twenty-First Century.", "The mathematical structure of cosmic sociology."],
    answer: "Technological progress enhancing the strategic weight of small countries.",
    evidence: "\"His ideological focus was expressed in a book titled The Truth of Technology, in which he argued that small countries are the ultimate beneficiaries of technology...\" — The Dark Forest: Part I"
  },
  {
    id: 8,
    question: "Which Wallfacer discovered that brain activity operates on a quantum level?",
    options: ["Frederick Tyler", "Manuel Rey Diaz", "Bill Hines", "Luo Ji"],
    answer: "Bill Hines",
    evidence: "\"He discovered that brain activity for thoughts and memories operated on the quantum level rather than on the molecular level as previously believed.\" — The Dark Forest: Part I"
  },
  {
    id: 9,
    question: "Manuel Rey Diaz was selected as a Wallfacer primarily due to his success in:",
    options: ["Securing the Nobel Prize in Physics.", "Defeating a US invasion with low-cost, high-tech tactics.", "Constructing a space elevator in Venezuela.", "Leading the ETO's Redemptionist faction."],
    answer: "Defeating a US invasion with low-cost, high-tech tactics.",
    evidence: "\"He was a genius at low-cost, high-tech exploits. ... The defeat of the strong at the hands of the weak made Rey Diaz a hero for the twenty-first century.\" — The Dark Forest: Part I"
  },
  {
    id: 10,
    question: "Why was Luo Ji considered the 'greatest gamble' of the Wallfacer Project?",
    options: ["He was suspected of being a high-ranking ETO member.", "He was a seemingly ordinary scholar with no political or military experience.", "He had developed the first functional Space Elevator.", "He was the only candidate to successfully survive a Sophon strike."],
    answer: "He was a seemingly ordinary scholar with no political or military experience.",
    evidence: "\"To tell you the truth, Dr. Luo, we’re baffled by this too. ... Choosing you is the greatest gamble in history.\" — The Dark Forest: Part I"
  },
  {
    id: 11,
    question: "Zhang Beihai advocated for which research path in the Space Force?",
    options: ["Low-Tech", "Mid-Tech", "High-Tech", "Chemical Propulsion"],
    answer: "High-Tech",
    evidence: "\"Just one officer chose high-tech: Zhang Beihai. ... \\\"My choice is the only hope for victory.\\\"\" — The Dark Forest: Part I"
  },
  {
    id: 12,
    question: "The NMD test at Fort Greely successfully destroyed an actual unfolded Sophon in Earth's orbit.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"The latest target was the reflective film discarded from the International Space Station last October.\" — The Dark Forest: Part I"
  }
];

export const DEATHS_END_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "In the secret chamber beneath Hagia Sophia, what specific evidence proved that the magician Helena had successfully accessed the 'openness' of the 4D fragment?",
    options: ["A set of seven fresh grapes left on a stem", "A silver candelabra from the Justinian era", "A bundle of flax cloth containing Ottoman coins", "A stone tablet carved with the name Constantine XI"],
    answer: "A set of seven fresh grapes left on a stem",
    evidence: "\"Helena had claimed to have left a bunch of grapes in the sarcophagus five days ago, and as she had declared, half of the grapes had been eaten, with only seven left on the stem.\" — Death's End: May 1453, C.E. The Death of the Magician"
  },
  {
    id: 2,
    question: "What was the simulated outcome of Earth's oceans in Yang Dong's supercomputer model where the 'life' parameter was unchecked?",
    options: ["The oceans froze into a permanent global ice sheet", "The oceans became a sea of liquid sulfuric acid", "Water vapor was lost to space over time, leaving the Earth dry", "The oceans remained stable due to the planet's distance from the sun"],
    answer: "Water vapor was lost to space over time, leaving the Earth dry",
    evidence: "\"Soon, greenhouse effects would turn the Earth’s atmosphere into a copy of Venus’s, and then water vapor would be lost to space over time. After several billion years, the Earth would be dry.\" — Death's End: Crisis Era, Year 1: The Option for Life"
  },
  {
    id: 3,
    question: "The primary proof of the high-dimensional fragment in 1453 was a minaret in the Blachernae quarter that appeared missing but was later found completely intact.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Under the cold, white light of the newly risen moon, the minaret appeared complete... The spy swore that the last time he had been here, the minaret’s top was missing.\" — Death's End: May 1453, C.E. The Death of the Magician"
  },
  {
    id: 4,
    question: "To achieve the Staircase Program's velocity goal, how many nuclear bombs were distributed along the acceleration leg?",
    options: ["997", "1,000", "1,004", "1,200"],
    answer: "1,004",
    evidence: "\"A total of 1,004 nuclear bombs were distributed along the route, two-thirds of which were fission bombs, the rest fusion.\" — Death's End: Crisis Era, Years 5–7: The Staircase Program"
  },
  {
    id: 5,
    question: "What is the designation of the star that Yun Tianming purchased for Cheng Xin through the 'Stars Our Destination' project?",
    options: ["DX3906", "NH558J2", "187J3X1", "B-Star"],
    answer: "DX3906",
    evidence: "\"Dr. He moved the mouse pointer over the glowing dot, and a string of letters and numbers appeared next to it: DX3906.\" — Death's End: Crisis Era, Year 4: Yun Tianming"
  },
  {
    id: 6,
    question: "Thomas Wade’s 'Military Democracy' test involved asking Cheng Xin if she would sell her mother to a whorehouse to gauge her flexibility regarding ethical norms.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"But the first words out of Wade’s mouth froze her face and entire body. 'Would you sell your mother to a whorehouse?'\" — Death's End: Crisis Era, Years 1–4: Cheng Xin"
  },
  {
    id: 7,
    question: "In the text, 'Hibernation' is technically distinguished from 'Cryopreservation' by its reliance on an external cardiopulmonary bypass system to maintain low-level biological activity.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Relying on an external cardiopulmonary bypass system, the body’s organs maintained an extremely low level of biological activity. [vs] We could flash-freeze a person to minus-two-hundred-degrees Celsius... wouldn’t need life support.\" — Death's End: Crisis Era, Years 1–4: Cheng Xin"
  },
  {
    id: 8,
    question: "What specific charges were leveled against the crew of the Bronze Age upon their disembarkation at the orbital spaceport?",
    options: ["Treason and desertion during the Doomsday Battle", "Theft of Trisolaran technology and state secrets", "Murder in the first degree and crimes against humanity", "Violations of the Solar System Fleet’s code of conduct"],
    answer: "Murder in the first degree and crimes against humanity",
    evidence: "\"You’re under arrest for murder in the first degree and crimes against humanity.\" — Death's End: Deterrence Era, Year 12: Bronze Age"
  },
  {
    id: 9,
    question: "In Deterrence Game Theory, why is the 'degree of deterrence' threshold of 80 percent considered unachievable by humanity as a collective?",
    options: ["The probability of a collective broadcast is near zero because it violates human values and moral principles", "The Trisolaran sophons can interfere with the democratic voting systems of a committee", "A collective body is incapable of making a decision within the 10-minute window required for broadcast", "The feminization of society has made collective action strategically impossible against a non-human threat"],
    answer: "The probability of a collective broadcast is near zero because it violates human values and moral principles",
    evidence: "\"If the authority to carry out the threat in dark forest deterrence is held by humanity as a whole, then the degree of deterrence is close to zero... The decision would violate deeply held moral principles and values.\" — Death's End: Excerpt from A Past Outside of Time: The Ghost of the Wallfacers"
  },
  {
    id: 10,
    question: "Nyctohylophobia was so profound that it resulted in the mandatory, widely-supported, and forcible shutdown of antennas around the world.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"During the first few days, even mobile phone use was forbidden, and antennas around the world were forcibly shut down. Such a move... was widely supported by the populace.\" — Death's End: Excerpt from A Past Outside of Time: Nyctohylophobia"
  }
];

export const ZOOTOPIA_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "To facilitate the realistic movement and shading of the various animal species, which specific fur-controlling software was developed by Disney's IT engineers?",
    options: ["Hyperion", "Bonsai", "iGroom", "Nitro"],
    answer: "iGroom",
    evidence: "\"Therefore, the studio's IT engineers developed the fur-controlling software 'iGroom', which gave character designers precise control over the brushing, shaping, and shading of fur...\" — Zootopia - Wikipedia: Animation"
  },
  {
    id: 2,
    question: "The Disney Story Trust facilitated a major narrative overhaul in November 2014; who was the original lead character before this role reversal?",
    options: ["Judy Hopps", "Nick Wilde", "Mayor Lionheart", "Chief Bogo"],
    answer: "Nick Wilde",
    evidence: "\"...changed the film into a contemporary police procedural in which Nick Wilde was the lead role and Judy Hopps was essentially his sidekick.\" — Zootopia - Wikipedia: Writing"
  },
  {
    id: 3,
    question: "The technical complexity of the film's animation is evidenced by the fact that the two lead characters, Judy Hopps and Nick Wilde, were each created with around 2.5 million individual hairs.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Characters with noteworthy numbers of strands of hair or fur included both of the two lead characters, Judy Hopps and Nick Wilde, who each had around 2.5 million hairs...\" — Zootopia - Wikipedia: Animation"
  },
  {
    id: 4,
    question: "In the German market, the film was released under the alternative title 'Zoomania' to avoid confusion with a 2010 children's book.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"In Germany, the film was titled Zoomania due to a children's book by German author Kay Fischer titled Zootopolis released in 2010...\" — Zootopia - Wikipedia: Alternative titles"
  },
  {
    id: 5,
    question: "The fearsome Tundratown crime boss Mr. Big—a character designed as an homage to Vito Corleone in 'The Godfather'—belongs to which specific animal species?",
    options: ["Arctic Shrew", "Least Weasel", "North American River Otter", "Fennec Fox"],
    answer: "Arctic Shrew",
    evidence: "\"Maurice LaMarche as Mr. Big, a fearsome Arctic shrew crime boss in Tundratown served by a group of polar bears. The character is an homage to Marlon Brando's role as Vito Corleone in The Godfather.\" — Zootopia - Wikipedia: Voice cast"
  },
  {
    id: 6,
    question: "At the Zootopia Department of Mammal Vehicles (DMV), what is the name of the female three-toed sloth who works alongside Flash Slothmore?",
    options: ["Nangi", "Dharma", "Fru Fru", "Priscilla"],
    answer: "Priscilla",
    evidence: "\"Kristen Bell as Priscilla, a three-toed sloth and Flash's co-worker at the DMV.\" — Zootopia - Wikipedia: Voice cast"
  }
];

export const ZOOTOPIA_2_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "What specific species is Gary De'Snake, the individual pursued by Judy and Nick throughout the film?",
    options: ["Plumed basilisk", "Pit viper", "Green iguana", "Giant anteater"],
    answer: "Pit viper",
    evidence: "\"a hooded creature infiltrates the party and reveals himself to be a pit viper named Gary De'Snake.\" — Zootopia 2 Wikipedia: Plot"
  },
  {
    id: 2,
    question: "What is the name of the specialized ZPD unit headed by Captain Fern Hoggbottom?",
    options: ["T.U.S.K. unit", "Marsh Market Task Force", "Zootennial Security", "The Zebros"],
    answer: "T.U.S.K. unit",
    evidence: "\"Michelle Gomez as Captain Fern Hoggbottom, a razorback who is the head of the ZPD's T.U.S.K. unit\" — Zootopia 2 Wikipedia: Voice cast"
  },
  {
    id: 3,
    question: "According to the historical revelations in the film, the original founder and weather wall engineer of Zootopia was Ebenezer Lynxley.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Gary and Pawbert reveal to Judy that Gary's great-grandmother, Agnes, was not only the original author of the journal, but also the true founder of Zootopia, and the engineer behind the weather walls.\" — Zootopia 2 Wikipedia: Plot"
  },
  {
    id: 4,
    question: "The 'Zebros' ZPD officers, Gene Zebraxton and Gene Zebrowski, are identified as a pair of plains zebras.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Joe 'Roman Reigns' Anoa'i and Phil 'CM Punk' Brooks as Gene Zebraxton and Gene Zebrowski, a pair of plains zebra ZPD cops known as the 'Zebros'\" — Zootopia 2 Wikipedia: Voice cast"
  },
  {
    id: 5,
    question: "Where do Judy and Nick encounter the hidden community of reptiles led by the basilisk named Jesús?",
    options: ["Tundratown", "Sahara Square", "Marsh Market", "Mystic Springs Oasis"],
    answer: "Marsh Market",
    evidence: "\"Nibbles leads them to Marsh Market, a secluded area of Zootopia where reptiles hide. There, they meet a basilisk named Jesús\" — Zootopia 2 Wikipedia: Plot"
  },
  {
    id: 6,
    question: "What is the professional role of the character Dr. Fuzzby?",
    options: ["ZPD Captain", "Quokka psychotherapist", "News reporter", "Climate engineer"],
    answer: "Quokka psychotherapist",
    evidence: "\"Quinta Brunson as Dr. Fuzzby, a quokka psychotherapist at partners' therapy\" — Zootopia 2 Wikipedia: Voice cast"
  },
  {
    id: 7,
    question: "A prison scene reference to 'Silence of the Lambs' was cut down from its original four-minute length to avoid slowing the film's pacing.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Originally, the Silence of the Lambs prison scene reference was four minutes long and taken verbatim from that film but was cut down because children were considered unlikely to understand the reference, and because it slowed the pacing.\" — Zootopia 2 Wikipedia: Production"
  }
];

// --- Despicable Me Trivia ---

export const DESPICABLE_ME_1_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "Which individual is credited with the 'Original Story' for the 2010 foundational film Despicable Me?",
    options: ["Cinco Paul", "Ken Daurio", "Sergio Pablos", "Chris Renaud"],
    answer: "Sergio Pablos",
    evidence: "\"Despicable Me... based on an original story by Sergio Pablos.\" — Despicable Me (2010): Production/Crew"
  },
  {
    id: 2,
    question: "In the narrative of the first film, who serves as the primary technical antagonist to Gru?",
    options: ["Mr. Perkins", "Vector", "Dr. Nefario", "Balthazar Bratt"],
    answer: "Vector",
    evidence: "\"Victor 'Vector' Perkins is the main antagonist of the 2010 animated film Despicable Me.\" — Despicable Me (2010): Characters"
  },
  {
    id: 3,
    question: "What is the specific amount of money Gru requests as a loan from the Bank of Evil for his moon heist?",
    options: ["5 million dollars", "10 million dollars", "50 million dollars", "100 million dollars"],
    answer: "10 million dollars",
    evidence: "\"Gru goes to the Bank of Evil... and asks Mr. Perkins for a loan of 10 million dollars.\" — Despicable Me (2010): Plot"
  },
  {
    id: 4,
    question: "Vector's introductory villainous feat involved the theft of which iconic monument?",
    options: ["The Eiffel Tower", "The Great Pyramid of Giza", "The Statue of Liberty", "The Golden Gate Bridge"],
    answer: "The Great Pyramid of Giza",
    evidence: "\"Vector manages to steal the Great Pyramid of Giza and replaces it with an inflatable replica.\" — Despicable Me (2010): Plot"
  },
  {
    id: 5,
    question: "Which of the three orphan girls famously asks 'Can I drink this?' regarding a mysterious liquid in Gru's lab?",
    options: ["Margo", "Edith", "Agnes", "Lucy"],
    answer: "Edith",
    evidence: "\"Edith: 'Can I drink this?' *Nefario: 'Do you want to explode?'*\" — Despicable Me (2010): Dialogue"
  },
  {
    id: 6,
    question: "What specific commercial product does Gru use as a 'Trojan Horse' to infiltrate Vector's fortress?",
    options: ["Vacuum cleaners", "Box of cookies", "Pizza delivery", "Magazine subscriptions"],
    answer: "Box of cookies",
    evidence: "\"Gru decides to adopt the girls so they can sell cookies to Vector and help him infiltrate the fortress.\" — Despicable Me (2010): Plot"
  },
  {
    id: 7,
    question: "Gru's plan to steal the moon was inspired by his childhood dream of being an astronaut.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Flashbacks show young Gru dreaming of going to the moon and being an astronaut.\" — Despicable Me (2010): Backstory"
  },
  {
    id: 8,
    question: "The architectural design of Gru's airship is loosely inspired by which real-world reconnaissance aircraft?",
    options: ["U-2", "SR-71 Blackbird", "B-2 Spirit", "F-117 Nighthawk"],
    answer: "SR-71 Blackbird",
    evidence: "\"The design of Gru's airship... takes inspiration from the sleek, dark aesthetic of the SR-71 Blackbird.\" — Despicable Me (2010): Design"
  },
  {
    id: 9,
    question: "Vector is revealed to be the son of Mr. Perkins, the head of the Bank of Evil.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Mr. Perkins reveals that Vector is his son, Victor.\" — Despicable Me (2010): Plot"
  },
  {
    id: 10,
    question: "The shrink ray technology was originally stolen by Gru from a top-secret laboratory in South America.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Gru steals a shrink ray from a secret lab in East Asia, only for Vector to steal it from him immediately after.\" — Despicable Me (2010): Plot"
  },
  {
    id: 11,
    question: "Gru's mother is portrayed as a retired martial artist who is highly critical of her son.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Gru's mother is shown practicing karate and dismissively judging Gru's accomplishments.\" — Despicable Me (2010): Characters"
  },
  {
    id: 12,
    question: "Vector's real name is Victor Perkins.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Victor is 'Vector's' birth name.\" — Despicable Me (2010): Characters"
  },
  {
    id: 13,
    question: "The three orphan sisters are named Margo, Edith, and Alice.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"The girls are Margo, Edith, and Agnes.\" — Despicable Me (2010): Characters"
  },
  {
    id: 14,
    question: "Dr. Nefario is the elderly gadget-man who assists Gru in his villainous endeavors.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Dr. Nefario is Gru's long-time associate and scientist.\" — Despicable Me (2010): Characters"
  },
  {
    id: 15,
    question: "The Minions were originally designed to be large, human-like henchmen before their design was simplified into the iconic yellow capsules.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Early concept art for the Minions showed them as much more human-looking before they evolved into the yellow creatures we know today.\" — Despicable Me (2010): Production"
  }
];

export const DESPICABLE_ME_2_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "What is the designation of the potent chemical mutagen stolen from the secret lab in the Arctic?",
    options: ["PX-41", "VX-9", "Compound V", "Serum 7"],
    answer: "PX-41",
    evidence: "\"A secret laboratory in the Arctic is stolen by a mysterious ship using a giant magnet... the lab contained a mutagen known as PX-41.\" — Despicable Me 2 (2013): Plot"
  },
  {
    id: 2,
    question: "Which Anti-Villain League (AVL) agent is responsible for 'kidnapping' Gru into their headquarters?",
    options: ["Lucy Wilde", "Valerie Da Vinci", "Jillian", "Shannon"],
    answer: "Lucy Wilde",
    evidence: "\"Agent Lucy Wilde of the AVL 'kidnaps' Gru and takes him to their underwater base.\" — Despicable Me 2 (2013): Plot"
  },
  {
    id: 3,
    question: "What is the true identity of Eduardo Perez, the owner of Salsa & Salsa?",
    options: ["El Macho", "The Scarlet Overkill", "Vector", "Balthazar Bratt"],
    answer: "El Macho",
    evidence: "\"Gru becomes convinced that Eduardo is a supervillain named El Macho, who was presumed dead.\" — Despicable Me 2 (2013): Plot"
  },
  {
    id: 4,
    question: "In the mall mission, which undercover business does Gru operate alongside Lucy?",
    options: ["Bake My Day", "The Cookie Jar", "Eagle Hair Club", "Salsa & Salsa"],
    answer: "Bake My Day",
    evidence: "\"Gru and Lucy go undercover at a cupcake shop called 'Bake My Day' in the Paradise Mall.\" — Despicable Me 2 (2013): Plot"
  },
  {
    id: 5,
    question: "Who is the director of the Anti-Villain League?",
    options: ["Silas Ramsbottom", "Nick Fury", "Valerie Da Vinci", "Arthur Perkins"],
    answer: "Silas Ramsbottom",
    evidence: "\"Silas Ramsbottom is the director of the AVL.\" — Despicable Me 2 (2013): Characters"
  },
  {
    id: 6,
    question: "Dr. Nefario leaves Gru's employment because he misses working for a more 'evil' boss.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Dr. Nefario decides to leave Gru to return to evil work, eventually joining El Macho.\" — Despicable Me 2 (2013): Plot"
  },
  {
    id: 7,
    question: "The mutated Minions (Evil Minions) are characterized by their purple color and wild, frizzy hair.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"The PX-41 serum transforms the yellow minions into indestructible, purple, wild creatures.\" — Despicable Me 2 (2013): Plot"
  },
  {
    id: 8,
    question: "Gru's primary love interest in the second film is a neighbor named Jillian.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Jillian is the neighbor who tries to set Gru up on dates, but his true love interest is Lucy Wilde.\" — Despicable Me 2 (2013): Plot"
  },
  {
    id: 9,
    question: "El Macho's pet is a highly aggressive chicken named Pollito.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Pollito is El Macho's guard chicken who attacks Gru in the shop.\" — Despicable Me 2 (2013): Characters"
  },
  {
    id: 10,
    question: "The film concludes with the wedding of Gru and Lucy Wilde.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"The film ends with Gru and Lucy's wedding and the girls finally having a mother.\" — Despicable Me 2 (2013): Plot"
  }
];

export const DESPICABLE_ME_3_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "Who is the 1980s-themed villain who attempts to steal the world's largest diamond?",
    options: ["Balthazar Bratt", "Maxime Le Mal", "El Macho", "Vector"],
    answer: "Balthazar Bratt",
    evidence: "\"Balthazar Bratt, a former child star of the 80s, is the main antagonist.\" — Despicable Me 3 (2017): Plot"
  },
  {
    id: 2,
    question: "What is Balthazar Bratt's signature catchphrase used throughout his career and crimes?",
    options: ["'I've been a bad boy!'", "'Bello!'", "'Vector!'", "'Freeze Ray!'"],
    answer: "'I've been a bad boy!'",
    evidence: "\"Bratt frequently says his child-star catchphrase: 'I've been a bad boy!'\" — Despicable Me 3 (2017): Dialogue"
  },
  {
    id: 3,
    question: "What is the name of Gru's long-lost twin brother?",
    options: ["Dru", "Bru", "Gruff", "Gryff"],
    answer: "Dru",
    evidence: "\"Gru discovers he has a twin brother named Dru, who lives in Freedonia.\" — Despicable Me 3 (2017): Plot"
  },
  {
    id: 4,
    question: "In which fictional country does Gru's twin brother reside?",
    options: ["Freedonia", "Genovia", "Latveria", "Sokovia"],
    answer: "Freedonia",
    evidence: "\"The family travels to Freedonia to meet Dru.\" — Despicable Me 3 (2017): Plot"
  },
  {
    id: 5,
    question: "Agnes becomes obsessed with finding which mythical creature in the forests of Freedonia?",
    options: ["A unicorn", "A dragon", "A phoenix", "A yeti"],
    answer: "A unicorn",
    evidence: "\"Agnes goes on a quest to find a real unicorn in the forest.\" — Despicable Me 3 (2017): Plot"
  },
  {
    id: 6,
    question: "Balthazar Bratt was essentially a child star who became a villain after his show was cancelled during puberty.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Bratt was the star of 'Evil Bratt' until he hit puberty and the show was cancelled, leading to his villainy.\" — Despicable Me 3 (2017): Backstory"
  },
  {
    id: 7,
    question: "Gru and Dru's father was revealed to be a highly successful world-class villain known as 'The Bald Terror'.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Dru reveals to Gru that their father was a legendary villain who was proud of Gru but disappointed in Dru.\" — Despicable Me 3 (2017): Backstory"
  },
  {
    id: 8,
    question: "Clive is a human henchman who serves as Balthazar Bratt's choreographer.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Clive is a robot who helps Bratt with his gadgets and music.\" — Despicable Me 3 (2017): Characters"
  },
  {
    id: 9,
    question: "The Minions collectively decide to leave Gru and eventually end up in a high-security prison.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"The Minions quit working for Gru and are later arrested for trespassing at a talent show.\" — Despicable Me 3 (2017): Plot"
  },
  {
    id: 10,
    question: "Balthazar Bratt utilizes a specialized combat suit and high-tech bubble gum as his primary weapons.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Bratt uses pink expanding bubble gum to trap his enemies and lift buildings.\" — Despicable Me 3 (2017): Plot"
  }
];

export const DESPICABLE_ME_4_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "Who is the primary antagonist of Despicable Me 4, a former school rival of Gru?",
    options: ["Maxime Le Mal", "Balthazar Bratt", "Vector", "El Macho"],
    answer: "Maxime Le Mal",
    evidence: "\"Maxime Le Mal is the villain who seeks revenge on Gru.\" — Despicable Me 4 (2024): Plot"
  },
  {
    id: 2,
    question: "What is the name of the villainous academy where Gru and his rival were educated?",
    options: ["Lycée Pas Bon", "Villain High", "Evil Institute", "Pas de Chance"],
    answer: "Lycée Pas Bon",
    evidence: "\"Gru and Maxime attended a school for villains called Lycée Pas Bon.\" — Despicable Me 4 (2024): Plot"
  },
  {
    id: 3,
    question: "Which character comes out of 'retirement' to lead the AVL once again in response to the new threat?",
    options: ["Silas Ramsbottom", "Lucy Wilde", "Dr. Nefario", "Arthur Perkins"],
    answer: "Silas Ramsbottom",
    evidence: "\"Silas Ramsbottom returns to lead the AVL when Maxime escapes prison.\" — Despicable Me 4 (2024): Plot"
  },
  {
    id: 4,
    question: "What is the collective name given to the five Minions who are enhanced with superpowers by the AVL?",
    options: ["Mega Minions", "Super Minions", "Ultra Minions", "Marvelous Minions"],
    answer: "Mega Minions",
    evidence: "\"Five minions—Dave, Mel, Gus, Tim, and Jerry—are given powers to become 'Mega Minions'.\" — Despicable Me 4 (2024): Plot"
  },
  {
    id: 5,
    question: "Into which idyllic, safe-house town is Gru's family relocated by the AVL?",
    options: ["Mayflower", "Springfield", "Pleasantville", "Sunnydale"],
    answer: "Mayflower",
    evidence: "\"The family is moved to a safe house in the town of Mayflower.\" — Despicable Me 4 (2024): Plot"
  },
  {
    id: 6,
    question: "Maxime Le Mal undergoes a physical transformation into a human-cockroach hybrid using his own technology.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Maxime enhances himself with cockroach DNA, giving him super strength and abilities.\" — Despicable Me 4 (2024): Plot"
  },
  {
    id: 7,
    question: "Gru Jr. is the newborn biological son of Gru and Lucy Wilde.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"The film introduces Gru Jr., the infant son of Gru and Lucy.\" — Despicable Me 4 (2024): Characters"
  },
  {
    id: 8,
    question: "Poppy Prescott is revealed to be a double agent working for the Anti-Villain League.",
    options: ["True", "False"],
    answer: "False",
    evidence: "\"Poppy is an aspiring villain and a neighbor who blackmails Gru into helping her with a heist.\" — Despicable Me 4 (2024): Plot"
  },
  {
    id: 9,
    question: "The Mega Minions story arc serves as a direct parody of modern superhero team films like The Avengers and Fantastic Four.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"The Mega Minions' powers and actions directly lampoon tropes from superhero movies.\" — Despicable Me 4 (2024): Production"
  },
  {
    id: 10,
    question: "The rivalry between Maxime and Gru originated when Gru stole Maxime's talent show act in school.",
    options: ["True", "False"],
    answer: "True",
    evidence: "\"Maxime has held a grudge since school when Gru stole his performance act.\" — Despicable Me 4 (2024): Backstory"
  }
];

export const DESPICABLE_ME_MIXED_TRIVIA: MCTriviaQuestion[] = [
  ...DESPICABLE_ME_1_TRIVIA,
  ...DESPICABLE_ME_2_TRIVIA,
  ...DESPICABLE_ME_3_TRIVIA,
  ...DESPICABLE_ME_4_TRIVIA
];

export const FROZEN_1_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "Which specific software tool was developed by Disney engineers to allow artists to sculpt Elsa's 420,000 hair strands?",
    options: ["Matterhorn", "Flourish", "Tonic", "Snow Batcher"],
    answer: "Tonic",
    evidence: "Tonic was a specialized program enabling artists to sculpt characters' hair, accommodating Elsa's high strand count."
  },
  {
    id: 2,
    question: "What was the estimated rendering time for a single frame of the ice palace construction sequence?",
    options: ["12 hours", "30 hours", "48 hours", "120 hours"],
    answer: "30 hours",
    evidence: "It required 30 hours to render each frame, with 4,000 computers rendering one frame at a time."
  },
  {
    id: 3,
    question: "How much was Phase 4 Films required to pay Disney for retitling 'The Legend of Sarila' to 'Frozen Land'?",
    options: ["$50,000", "$100,000", "$250,000", "$500,000"],
    answer: "$100,000",
    evidence: "Phase 4 was required to pay Disney $100,000 in a legal settlement following the trademark-infringement lawsuit."
  },
  {
    id: 4,
    question: "Which musical number did Robert Lopez identify as the 'structural linchpin' composed just five months before release?",
    options: ["Let It Go", "Do You Want to Build a Snowman?", "For the First Time in Forever", "Love is an Open Door"],
    answer: "For the First Time in Forever",
    evidence: "Lopez described 'For the First Time in Forever' as the linchpin that finally made the film's narrative flow gel."
  },
  {
    id: 5,
    question: "Who provided the singing voice for the 5-year-old Princess Anna?",
    options: ["Livvy Stubenrauch", "Agatha Lee Monn", "Katie Lopez", "Eva Bella"],
    answer: "Katie Lopez",
    evidence: "While Livvy Stubenrauch voiced young Anna, Katie Lopez provided her singing voice."
  },
  {
    id: 6,
    question: "At the start of the main narrative journey, what is the established age of Princess Anna?",
    options: ["16", "18", "21", "19"],
    answer: "18",
    evidence: "Anna is introduced as a fearless and optimistic 18-year-old princess."
  },
  {
    id: 7,
    question: "The 'Matterhorn' snow-simulator tool utilized the Material Point Method with assistance from researchers at which university?",
    options: ["MIT", "Stanford", "UCLA", "Caltech"],
    answer: "UCLA",
    evidence: "Disney engineers collaborated with mathematics researchers from UCLA to develop the Matterhorn simulator."
  },
  {
    id: 8,
    question: "True or False: The visual design of Arendelle was primarily based on Norwegian cultural research.",
    options: ["True", "False"],
    answer: "True",
    evidence: "Art director Michael Giaimo focused on Norway, as 80 percent of the appealing visuals were from that country."
  },
  {
    id: 9,
    question: "True or False: In early script versions, Elsa kidnapped Anna from her own wedding to freeze her heart.",
    options: ["True", "False"],
    answer: "True",
    evidence: "Early drafts depicted Elsa as an explicitly evil character who kidnapped Anna."
  },
  {
    id: 10,
    question: "True or False: 2D artwork was used for specific magical elements like snow sculptures and freezing fountains.",
    options: ["True", "False"],
    answer: "True",
    evidence: "In addition to 3D effects, filmmakers used 2D artwork for Elsa's magic and snow sculptures."
  }
];

export const FROZEN_2_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "What primary catalyst initiates Elsa's journey into the unknown in the 2019 sequel?",
    options: ["Ancient scrolls", "A melodious voice only she can hear", "A warning from Pabbie", "A diplomatic request"],
    answer: "A melodious voice only she can hear",
    evidence: "A mysterious voice invites Elsa to the Enchanted Forest, serving as the sequel's main catalyst."
  },
  {
    id: 2,
    question: "To what destination does the 'secret siren' lead Elsa and her companions?",
    options: ["North Mountain", "Kingdom of Weselton", "Enchanted Forest", "Valley of the Living Rock"],
    answer: "Enchanted Forest",
    evidence: "Elsa follows the voice into the unknown Enchanted Forest, a perpetually misty realm."
  },
  {
    id: 3,
    question: "Which group of people does the royal party encounter living in the Enchanted Forest?",
    options: ["Weseltonians", "Northuldra", "Rock Trolls", "Southern Isles Navy"],
    answer: "Northuldra",
    evidence: "The party encounters the Northuldra tribe, who live in harmony with the forest spirits."
  },
  {
    id: 4,
    question: "Who is the salamander-like spirit of fire introduced in the Enchanted Forest?",
    options: ["Gale", "Bruni", "Nokk", "Pabbie"],
    answer: "Bruni",
    evidence: "Bruni is the adorable salamander-like fire spirit that Elsa befriends."
  },
  {
    id: 5,
    question: "Which four entities represent the elemental spirits of nature in Frozen 2?",
    options: ["Trolls and Wolves", "Nokk, Gale, Earth Giants, and Bruni", "Oaken and Sven", "Marshmallow and Snowgies"],
    answer: "Nokk, Gale, Earth Giants, and Bruni",
    evidence: "The four elemental spirits are the Nokk (water), Gale (wind), Earth Giants (earth), and Bruni (fire)."
  },
  {
    id: 6,
    question: "True or False: Frozen 2 outgrossed the original 2013 film at the global box office.",
    options: ["True", "False"],
    answer: "True",
    evidence: "Frozen 2 became the highest-grossing animated film at the time, surpassing the original."
  },
  {
    id: 7,
    question: "True or False: Elsa's character model in the sequel features 420,000 computer-generated hair strands.",
    options: ["True", "False"],
    answer: "True",
    evidence: "Elsa's hair model was upgraded and maintained its high fidelity with 420k strands."
  },
  {
    id: 8,
    question: "True or False: Disney has announced that both Frozen 3 and Frozen 4 are in development.",
    options: ["True", "False"],
    answer: "True",
    evidence: "CEO Bob Iger confirmed that Frozen 3 is slated for 2027 and a fourth film is planned."
  }
];

export const FROZEN_MIXED_TRIVIA: MCTriviaQuestion[] = [
  ...FROZEN_1_TRIVIA,
  ...FROZEN_2_TRIVIA
];

export const MARIO_2023_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "At the 81st Golden Globe Awards, 'The Super Mario Bros. Movie' was nominated in which newly introduced category?",
    options: ["Best Video Game Adaptation", "Cinematic Box Office Achievement", "Innovation in Animated Storytelling", "Global Animation Excellence"],
    answer: "Cinematic Box Office Achievement",
    evidence: "At the 81st Golden Globe Awards, the movie received a nomination for Cinematic Box Office Achievement, a category introduced at that ceremony."
  },
  {
    id: 2,
    question: "What was the reported production budget for the 2023 film 'The Super Mario Bros. Movie'?",
    options: ["$75 million", "$100 million", "$125 million", "$150 million"],
    answer: "$100 million",
    evidence: "The film had a reported production budget of $100 million."
  },
  {
    id: 3,
    question: "True or False: Shigeru Miyamoto's interest in a new film was partly driven by the time required to bring older games to the Virtual Console.",
    options: ["True", "False"],
    answer: "True",
    evidence: "Miyamoto stated that bringing older games to the Virtual Console took a lot of time, which sparked the idea for a new movie."
  },
  {
    id: 4,
    question: "Regarding its commercial legacy, which record did 'The Super Mario Bros. Movie' set for the video game adaptation genre?",
    options: ["First to gross $1 billion", "Highest-grossing film based on a video game", "Longest theatrical run for an animation", "Most translated video game film"],
    answer: "Highest-grossing film based on a video game",
    evidence: "It grossed $1.36 billion worldwide, becoming the highest-grossing film based on a video game."
  },
  {
    id: 5,
    question: "True or False: During the climax in Brooklyn, both Mario and Luigi grab the Super Star to achieve invincibility.",
    options: ["True", "False"],
    answer: "True",
    evidence: "In the film's climax, both brothers grab the Super Star together to defeat Bowser's army."
  },
  {
    id: 6,
    question: "Which power-up does Mario utilize to defeat Donkey Kong in the Jungle Kingdom?",
    options: ["Fire Flower", "Tanooki Suit", "Cat Suit", "Mini Mushroom"],
    answer: "Cat Suit",
    evidence: "Mario uses the Cat Suit to overcome Donkey Kong's strength during their duel."
  },
  {
    id: 7,
    question: "Where does Luigi arrive after being separated from Mario in the Warp Pipe?",
    options: ["The Dark Lands", "The Jungle Kingdom", "Brooklyn", "The Mushroom Kingdom"],
    answer: "The Dark Lands",
    evidence: "Luigi is separated and lands in the Dark Lands, which are ruled by Bowser."
  },
  {
    id: 8,
    question: "Who appears on the Brooklyn news broadcast discussing the sudden plumbing emergency?",
    options: ["Mayor Pauline", "Foreman Spike", "Mayor Toad", "Cranky Kong"],
    answer: "Mayor Pauline",
    evidence: "Mayor Pauline is seen on the news addressing the massive plumbing crisis happening in Brooklyn."
  },
  {
    id: 9,
    question: "Inside the Punch-Out Pizzeria, which character is seen playing the 'Jump Man' arcade game?",
    options: ["Foreman Spike", "Giuseppe", "Mario's Father", "Uncle Arthur"],
    answer: "Giuseppe",
    evidence: "The character Giuseppe is seen playing the arcade game that resembles the original Donkey Kong."
  },
  {
    id: 10,
    question: "Who is the primary composer for 'The Super Mario Bros. Movie' (2023)?",
    options: ["Koji Kondo", "Brian Tyler", "Grant Kirkhope", "John Spiker"],
    answer: "Brian Tyler",
    evidence: "Brian Tyler composed the score, working closely with industry legend Koji Kondo."
  }
];

export const MARIO_2026_TRIVIA: MCTriviaQuestion[] = [
  {
    id: 1,
    question: "How did Shigeru Miyamoto categorize the 2026 sequel within the context of the franchise's history?",
    options: ["The 'Main Event' of the 40th Anniversary", "A cinematic expansion of the SNES era", "The first entry in a 'Universe' trilogy", "A experimental spin-off"],
    answer: "The 'Main Event' of the 40th Anniversary",
    evidence: "Miyamoto described the sequel as the 'main event' of the Super Mario Bros. 40th Anniversary celebration."
  },
  {
    id: 2,
    question: "In the 2026 sequel, what is the canonical relationship between Princess Peach and Rosalina?",
    options: ["Mother and Daughter", "Sisters", "Cousins", "Guardian and Protégé"],
    answer: "Sisters",
    evidence: "The film reveals that Rosalina and Princess Peach are sisters born from star dust."
  },
  {
    id: 3,
    question: "While shrunken and living in a miniature castle, what activities does Bowser engage in?",
    options: ["Singing ballads and playing piano", "Painting and dealing with anger issues", "Training Mini Goombas", "Reading nihilistic poetry"],
    answer: "Painting and dealing with anger issues",
    evidence: "A shrunken Bowser is seen painting and working on his anger issues in a miniature castle."
  },
  {
    id: 4,
    question: "Where is Yoshi first discovered by Mario and Luigi in 'The Super Mario Galaxy Movie'?",
    options: ["Inside an Inverted Pyramid", "In the sewers of Brooklyn", "On Yoshi’s Island", "In the Jungle Kingdom"],
    answer: "Inside an Inverted Pyramid",
    evidence: "The brothers find Yoshi inside an Inverted Pyramid in Tostarena Town."
  },
  {
    id: 5,
    question: "What is the primary motivation for Bowser Jr. in 'The Super Mario Galaxy Movie'?",
    options: ["To find the Boomsday Weapon", "To restore honor to the Bowser name", "To capture Lumas", "To build a space casino"],
    answer: "To restore honor to the Bowser name",
    evidence: "Bowser Jr.'s primary goal is to restore honor to his family name and free his father."
  },
  {
    id: 6,
    question: "What signature accessory does Bowser Jr. wear that helps conceal his identity?",
    options: ["A red spiked collar", "A white bandana with a drawn mouth", "A pair of flying goggles", "A golden crown"],
    answer: "A white bandana with a drawn mouth",
    evidence: "Like in the games, Bowser Jr. wears a white bandana adorned with a sinister drawn-on mouth."
  },
  {
    id: 7,
    question: "What power-up does Mario utilize to burrow underground while fighting Dry Bowser?",
    options: ["Cloud Flower", "Red Star", "Drill Mushroom", "Cape Feather"],
    answer: "Drill Mushroom",
    evidence: "Mario uses a Drill Mushroom to tunnel through the ground during the fight with Dry Bowser."
  },
  {
    id: 8,
    question: "Peach and Toad must defeat Birdo and Wart at which specific location?",
    options: ["The Comet Observatory", "Planet Bowser", "Wart's Casino", "The Space Junk Galaxy"],
    answer: "Wart's Casino",
    evidence: "The duo confronts Wart at his casino in the Gateway Underground."
  },
  {
    id: 9,
    question: "What object does Bowser Jr. use to turn Mario and Luigi into babies?",
    options: ["Magic Brush", "Super Scope", "Mini Mushroom", "Super Star"],
    answer: "Super Scope",
    evidence: "A blue Super Scope is revealed to have the power to de-age targets into babies."
  },
  {
    id: 10,
    question: "True or False: A post-credits scene features Princess Daisy rescuing a Whittle from a Ukiki.",
    options: ["True", "False"],
    answer: "True",
    evidence: "The post-credits scene depicts Princess Daisy intervening to save a Whittle."
  }
];

export const MARIO_MIXED_TRIVIA: MCTriviaQuestion[] = [
  ...MARIO_2023_TRIVIA,
  ...MARIO_2026_TRIVIA
];

export const DAILY_QUIZZES = [
  {
    id: "twilight-book-1",
    title: "Twilight: Book 1",
    description: "Test your knowledge of the beginning of the Cullen saga. How well do you know Bella's move to Forks?",
    path: "/trivia-twilight-book",
    image: "/images/Cullen Family.jpg",
    color: "from-red-600/20 to-rose-600/20"
  },
  {
    id: "harry-potter-sorcerers-stone",
    title: "HP: Sorcerer's Stone",
    description: "Enter the Wizarding World. Test your memory of Harry's first year at Hogwarts.",
    path: "/trivia-harry-potter",
    image: "/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg",
    color: "from-amber-600/20 to-red-600/20"
  },
  {
    id: "k-pop-demon-hunters",
    title: "K-Pop: Demon Hunters",
    description: "High-energy beats & supernatural hunts. Can you keep up with the Saja Boys?",
    path: "/trivia-kpop",
    image: "/images/Soda Pop and How It's Done.jpg",
    color: "from-purple-600/20 to-pink-600/20"
  },
  {
    id: "the-three-body-problem",
    title: "The Three-Body Problem",
    description: "Navigate the Trisolaran crisis. Prove you're a true Wallfacer in this cosmic challenge.",
    path: "/trivia-three-body-problem",
    image: "/images/threebody.jpg",
    color: "from-indigo-600/20 to-purple-600/20"
  },
  {
    id: "zootopia",
    title: "Zootopia (Case 1)",
    description: "Anyone can be anything. Crack the case of the missing mammals with Judy and Nick.",
    path: "/trivia-zootopia",
    image: "/images/zootopia.jpg",
    color: "from-blue-600/20 to-sky-600/20"
  },
  {
    id: "despicable-me",
    title: "Despicable Me",
    description: "Bello! Join Gru and the Minions in their hilariously despicable heist.",
    path: "/trivia-despicableme-1",
    image: "/images/despicable-me.jpg",
    color: "from-yellow-600/20 to-amber-600/20"
  },
  {
    id: "frozen",
    title: "Frozen (Chapter 1)",
    description: "Journey to Arendelle. Test your knowledge of Elsa, Anna, and the power of sisterhood.",
    path: "/trivia-frozen-1",
    image: "/images/frozen.jpg",
    color: "from-sky-600/20 to-blue-600/20"
  }
];

export const DAILY_RIDDLES = [
  {
    id: "riddle-1",
    clue: "I live in a dark forest, my skin sparkles in the sun, and I play baseball during thunderstorms.",
    answer: "Edward Cullen",
    image: "/images/riddles/edward.png"
  },
  {
    id: "riddle-2",
    clue: "I survived a curse that left a scar, I speak to snakes, and I once lived in a cupboard under the stairs.",
    answer: "Harry Potter",
    image: "/images/riddles/harry.png"
  },
  {
    id: "riddle-3",
    clue: "I am small, yellow, and love bananas. I served the most \"despicable\" masters throughout history.",
    answer: "Minion",
    image: "/images/riddles/minion.png"
  },
  {
    id: "riddle-4",
    clue: "I am a fast-talking fox from Zootopia. I once tried to sell a \"Pawpsicle\" made from wood-chip-flavored juice.",
    answer: "Nick Wilde",
    image: "/images/riddles/nick.png"
  },
  {
    id: "riddle-5",
    clue: "I build castles out of ice, my sister is my best friend, and I finally learned to let it go.",
    answer: "Elsa",
    image: "/images/riddles/elsa.png"
  },
  {
    id: "riddle-6",
    clue: "I am a space traveler who is actually a futuristic cat. I have a 4D pocket with infinite gadgets.",
    answer: "Doraemon",
    image: "/images/riddles/doraemon.png"
  },
  {
    id: "riddle-7",
    clue: "I am the \"Chosen One\" who brought balance to the Force, but first I had to fall to the Dark Side.",
    answer: "Anakin Skywalker",
    image: "/images/riddles/anakin.png"
  }
];

