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
    image: '/images/Cullen Family.jpg',
    buttonText: 'Enter Forks',
    icon: 'Droplets'
  },
  {
    id: 'harry-potter',
    title: 'Harry Potter',
    tags: ['Magic', 'Classic'],
    description: "Magic, mystery, and the Wizarding World. Prove you're a true Gryffindor or a cunning Slytherin.",
    image: '/images/Harry Potter, Hermione Granger, and Ron Weseley.jpg',
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
