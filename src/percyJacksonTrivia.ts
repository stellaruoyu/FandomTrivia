import type { MCTriviaQuestion } from './constants';
import lightningThiefRaw from '../percyjackson1.md?raw';
import seaOfMonstersRaw from '../percyjackson2.md?raw';
import titansCurseRaw from '../percyjackson3.md?raw';
import battleOfLabyrinthRaw from '../percyjackson4.md?raw';
import lastOlympianRaw from '../percyjackson5.md?raw';

type PercySourceQuestion = {
  type?: string;
  question: string;
  options?: string[];
  correct_answer?: string;
  answer?: string;
  evidence?: {
    type?: string;
    book?: string;
    chapter?: string;
    context?: string;
  } | string;
};

export type PercyBookGroup =
  | 'Percy Jackson & the Olympians'
  | 'Heroes of Olympus'
  | 'Trials of Apollo'
  | 'The Kane Chronicles'
  | 'Magnus Chase'
  | 'Senior Year Adventures'
  | 'Companion Books'
  | 'Standalone Adventures';

export interface PercyBookQuizMeta {
  id: string;
  title: string;
  shortLabel: string;
  view: string;
  group: PercyBookGroup;
  icon: string;
  gradient: string;
  border: string;
}

type StoryBookMeta = PercyBookQuizMeta & {
  kind: 'story';
  series: string;
  bookNumberLabel: string;
  protagonist: string;
  mythology: string;
  quest: string;
  ally: string;
  antagonist: string;
  setting: string;
  objectOrPower: string;
  truthStatement: string;
};

type CompanionBookMeta = PercyBookQuizMeta & {
  kind: 'companion';
  series: string;
  format: string;
  focus: string;
  audience: string;
  narrator: string;
  contentType: string;
  campOrWorld: string;
  truthStatement: string;
};

type BookMeta = StoryBookMeta | CompanionBookMeta;

const parsePercyTrivia = (raw: string): PercySourceQuestion[] => {
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Unable to locate the Percy Jackson trivia JSON array.');
  }

  return JSON.parse(raw.slice(start, end + 1)) as PercySourceQuestion[];
};

const normalizeQuestion = (question: PercySourceQuestion, id: number): MCTriviaQuestion => ({
  id,
  question: question.question,
  options: question.options ?? (question.type === 'true_false' ? ['True', 'False'] : []),
  answer: question.correct_answer ?? question.answer ?? '',
  evidence: typeof question.evidence === 'string'
    ? question.evidence
    : question.evidence?.context
      ? `${question.evidence.context}${question.evidence.book ? ` - ${question.evidence.book}` : ''}${question.evidence.chapter ? `, ${question.evidence.chapter}` : ''}`
      : ''
});

const shuffle = <T,>(items: T[]): T[] => [...items].sort(() => Math.random() - 0.5);

const buildStoryQuiz = (book: StoryBookMeta): MCTriviaQuestion[] => [
  {
    id: 1,
    question: `Which series does ${book.title} belong to?`,
    options: ['The Kane Chronicles', 'Heroes of Olympus', 'Magnus Chase', book.series],
    answer: book.series,
    evidence: `${book.title} is part of the ${book.series} line in the Riordanverse.`,
  },
  {
    id: 2,
    question: `Who is the main protagonist most closely associated with ${book.title}?`,
    options: ['Annabeth Chase', 'Grover Underwood', book.protagonist, 'Leo Valdez'],
    answer: book.protagonist,
    evidence: `${book.title} centers on ${book.protagonist} as a principal hero.`,
  },
  {
    id: 3,
    question: `Which mythology or divine tradition is the main backbone of ${book.title}?`,
    options: ['Norse mythology', 'Egyptian mythology', book.mythology, 'Arthurian legend'],
    answer: book.mythology,
    evidence: `${book.title} primarily draws from ${book.mythology}.`,
  },
  {
    id: 4,
    question: `What is the central quest, crisis, or plot engine of ${book.title}?`,
    options: [book.quest, 'Recover the Philosopher\'s Stone', 'Stop a robot invasion', 'Win a televised tournament'],
    answer: book.quest,
    evidence: `${book.title} revolves around this major objective: ${book.quest}.`,
  },
  {
    id: 5,
    question: `Which ally or team figure is especially tied to ${book.title}?`,
    options: ['Nico di Angelo', book.ally, 'Tyson', 'Clarisse La Rue'],
    answer: book.ally,
    evidence: `${book.ally} is a key ally or co-hero in ${book.title}.`,
  },
  {
    id: 6,
    question: `Which threat, enemy, or opposing force is most closely tied to ${book.title}?`,
    options: [book.antagonist, 'The White Witch', 'Lord Voldemort', 'Sauron'],
    answer: book.antagonist,
    evidence: `${book.antagonist} is a defining antagonist or threat in ${book.title}.`,
  },
  {
    id: 7,
    question: `Which setting or location is strongly associated with ${book.title}?`,
    options: ['Camp Cretaceous', 'District 12', book.setting, 'The Shire'],
    answer: book.setting,
    evidence: `${book.title} prominently features ${book.setting}.`,
  },
  {
    id: 8,
    question: `Which artifact, power, or symbolic element is tied to ${book.title}?`,
    options: ['The Elder Wand', book.objectOrPower, 'The One Ring', 'Vibranium'],
    answer: book.objectOrPower,
    evidence: `${book.objectOrPower} is strongly connected to the events of ${book.title}.`,
  },
  {
    id: 9,
    question: `Where does ${book.title} fall within its own series?`,
    options: ['It opens the series', 'It closes the series', book.bookNumberLabel, 'It is a stand-alone with no series placement'],
    answer: book.bookNumberLabel,
    evidence: `${book.title} is identified here as ${book.bookNumberLabel.toLowerCase()} in ${book.series}.`,
  },
  {
    id: 10,
    question: `${book.truthStatement}`,
    options: ['True', 'False'],
    answer: 'True',
    evidence: `${book.title}: ${book.truthStatement}`,
  },
];

const buildCompanionQuiz = (book: CompanionBookMeta): MCTriviaQuestion[] => [
  {
    id: 1,
    question: `How is ${book.title} best described?`,
    options: ['A full trilogy finale', book.format, 'A television novelization', 'A screenplay collection'],
    answer: book.format,
    evidence: `${book.title} is best categorized as ${book.format.toLowerCase()}.`,
  },
  {
    id: 2,
    question: `Which broader franchise does ${book.title} connect to most directly?`,
    options: ['The Lunar Chronicles', book.series, 'Skulduggery Pleasant', 'Artemis Fowl'],
    answer: book.series,
    evidence: `${book.title} belongs with ${book.series}.`,
  },
  {
    id: 3,
    question: `What is the main focus of ${book.title}?`,
    options: ['Wizard school classes', 'A superhero census', book.focus, 'A pirate rebellion'],
    answer: book.focus,
    evidence: `${book.title} focuses on ${book.focus.toLowerCase()}.`,
  },
  {
    id: 4,
    question: `Who is ${book.title} especially useful or targeted toward?`,
    options: ['Only gods on Olympus', book.audience, 'Space marines', 'Archaeology professors only'],
    answer: book.audience,
    evidence: `${book.title} is especially aimed at ${book.audience.toLowerCase()}.`,
  },
  {
    id: 5,
    question: `Which narrator, framing voice, or featured point of view is associated with ${book.title}?`,
    options: ['Hades', 'Athena alone', book.narrator, 'No characters are involved at all'],
    answer: book.narrator,
    evidence: `${book.title} is framed through or associated with ${book.narrator}.`,
  },
  {
    id: 6,
    question: `What kind of material does ${book.title} primarily include?`,
    options: [book.contentType, 'Only recipe cards', 'A board game rulebook', 'A pure map atlas with no text'],
    answer: book.contentType,
    evidence: `${book.title} contains ${book.contentType.toLowerCase()}.`,
  },
  {
    id: 7,
    question: `Which camp or mythic world is most tied to ${book.title}?`,
    options: ['Mordor', 'Panem', book.campOrWorld, 'Narnia'],
    answer: book.campOrWorld,
    evidence: `${book.title} is rooted in ${book.campOrWorld}.`,
  },
  {
    id: 8,
    question: `What role does ${book.title} play in the Riordanverse shelf overall?`,
    options: ['It launches an unrelated sci-fi saga', 'It serves as a companion or supplemental volume', 'It is a cookbook', 'It replaces the main novels entirely'],
    answer: 'It serves as a companion or supplemental volume',
    evidence: `${book.title} expands the world as a supplemental companion book rather than replacing the core novels.`,
  },
  {
    id: 9,
    question: `Which statement best matches ${book.title}?`,
    options: ['It is the fifth Magnus Chase novel', book.truthStatement, 'It is a non-Riordan romance novel', 'It avoids mythology completely'],
    answer: book.truthStatement,
    evidence: `${book.title}: ${book.truthStatement}`,
  },
  {
    id: 10,
    question: `${book.truthStatement}`,
    options: ['True', 'False'],
    answer: 'True',
    evidence: `${book.title}: ${book.truthStatement}`,
  },
];

const PERCY_POSTER = 'https://whatsondisneyplus.b-cdn.net/wp-content/uploads/2023/07/percy-jackson-poster-scaled.jpeg';

const remainingBooks: BookMeta[] = [
  {
    kind: 'story',
    id: 'percy-jackson-lost-hero',
    title: 'The Lost Hero',
    shortLabel: 'Lost Hero',
    view: 'trivia-percy-jackson-lost-hero',
    group: 'Heroes of Olympus',
    icon: '⚙️',
    gradient: 'from-orange-600/20 to-amber-600/20',
    border: 'border-orange-400/30 hover:border-orange-300/50',
    series: 'Heroes of Olympus',
    bookNumberLabel: 'Book 1 of Heroes of Olympus',
    protagonist: 'Jason Grace',
    mythology: 'Greek and Roman mythology',
    quest: 'Rescue Hera and stop the giant threat from rising',
    ally: 'Piper McLean',
    antagonist: 'Enceladus',
    setting: 'Camp Half-Blood and the quest westward',
    objectOrPower: 'Jason\'s storm powers and Hera\'s rescue mission',
    truthStatement: 'The Lost Hero introduces Jason, Piper, and Leo as a new trio of demigod leads.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-son-of-neptune',
    title: 'The Son of Neptune',
    shortLabel: 'Son of Neptune',
    view: 'trivia-percy-jackson-son-of-neptune',
    group: 'Heroes of Olympus',
    icon: '🐺',
    gradient: 'from-cyan-600/20 to-blue-600/20',
    border: 'border-cyan-400/30 hover:border-cyan-300/50',
    series: 'Heroes of Olympus',
    bookNumberLabel: 'Book 2 of Heroes of Olympus',
    protagonist: 'Percy Jackson',
    mythology: 'Greek and Roman mythology',
    quest: 'Reach Alaska and free Thanatos before Gaea\'s forces overwhelm the camps',
    ally: 'Hazel Levesque',
    antagonist: 'Alcyoneus',
    setting: 'Camp Jupiter and the road to Alaska',
    objectOrPower: 'Percy\'s memory loss and the quest to free Thanatos',
    truthStatement: 'The Son of Neptune is the novel that introduces Percy to Camp Jupiter.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-mark-of-athena',
    title: 'The Mark of Athena',
    shortLabel: 'Mark of Athena',
    view: 'trivia-percy-jackson-mark-of-athena',
    group: 'Heroes of Olympus',
    icon: '🦉',
    gradient: 'from-violet-600/20 to-fuchsia-600/20',
    border: 'border-violet-400/30 hover:border-violet-300/50',
    series: 'Heroes of Olympus',
    bookNumberLabel: 'Book 3 of Heroes of Olympus',
    protagonist: 'Annabeth Chase',
    mythology: 'Greek and Roman mythology',
    quest: 'Follow Athena\'s mark and recover the Athena Parthenos',
    ally: 'The Argo II crew',
    antagonist: 'Arachne',
    setting: 'Rome and the wider Mediterranean quest route',
    objectOrPower: 'The Athena Parthenos',
    truthStatement: 'The Mark of Athena ends with Percy and Annabeth falling into Tartarus.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-house-of-hades',
    title: 'The House of Hades',
    shortLabel: 'House of Hades',
    view: 'trivia-percy-jackson-house-of-hades',
    group: 'Heroes of Olympus',
    icon: '🔥',
    gradient: 'from-red-700/20 to-orange-600/20',
    border: 'border-red-400/30 hover:border-red-300/50',
    series: 'Heroes of Olympus',
    bookNumberLabel: 'Book 4 of Heroes of Olympus',
    protagonist: 'Percy Jackson',
    mythology: 'Greek and Roman mythology',
    quest: 'Survive Tartarus and reach the Doors of Death from both sides',
    ally: 'Annabeth Chase',
    antagonist: 'Tartarus and the forces guarding the Doors of Death',
    setting: 'Tartarus and the mortal-world route toward Epirus',
    objectOrPower: 'The Doors of Death',
    truthStatement: 'The House of Hades splits its action between Tartarus and the Argo II quest team above ground.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-blood-of-olympus',
    title: 'The Blood of Olympus',
    shortLabel: 'Blood of Olympus',
    view: 'trivia-percy-jackson-blood-of-olympus',
    group: 'Heroes of Olympus',
    icon: '🏛️',
    gradient: 'from-amber-600/20 to-yellow-500/20',
    border: 'border-amber-400/30 hover:border-amber-300/50',
    series: 'Heroes of Olympus',
    bookNumberLabel: 'Book 5 of Heroes of Olympus',
    protagonist: 'Jason Grace',
    mythology: 'Greek and Roman mythology',
    quest: 'Stop Gaea from rising fully and unite the Greek and Roman camps',
    ally: 'Reyna Ramírez-Arellano',
    antagonist: 'Gaea',
    setting: 'Athens, Camp Half-Blood, and the final war route',
    objectOrPower: 'The Athena Parthenos and the final anti-Gaea plan',
    truthStatement: 'The Blood of Olympus serves as the finale to Heroes of Olympus.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-hidden-oracle',
    title: 'The Hidden Oracle',
    shortLabel: 'Hidden Oracle',
    view: 'trivia-percy-jackson-hidden-oracle',
    group: 'Trials of Apollo',
    icon: '☀️',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    border: 'border-yellow-400/30 hover:border-yellow-300/50',
    series: 'Trials of Apollo',
    bookNumberLabel: 'Book 1 of Trials of Apollo',
    protagonist: 'Apollo as Lester Papadopoulos',
    mythology: 'Greek and Roman mythology',
    quest: 'Restore the Grove of Dodona and begin fighting the Triumvirate',
    ally: 'Meg McCaffrey',
    antagonist: 'Nero and his network of emperors',
    setting: 'Camp Half-Blood and the Grove of Dodona quest',
    objectOrPower: 'Apollo\'s loss of godhood and the Grove of Dodona',
    truthStatement: 'The Hidden Oracle begins with Apollo punished into mortal form as Lester Papadopoulos.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-dark-prophecy',
    title: 'The Dark Prophecy',
    shortLabel: 'Dark Prophecy',
    view: 'trivia-percy-jackson-dark-prophecy',
    group: 'Trials of Apollo',
    icon: '🎭',
    gradient: 'from-purple-600/20 to-indigo-600/20',
    border: 'border-purple-400/30 hover:border-purple-300/50',
    series: 'Trials of Apollo',
    bookNumberLabel: 'Book 2 of Trials of Apollo',
    protagonist: 'Apollo as Lester Papadopoulos',
    mythology: 'Greek and Roman mythology',
    quest: 'Travel to Indianapolis and pursue the next prophecy tied to the emperors',
    ally: 'Leo Valdez',
    antagonist: 'Commodus',
    setting: 'The American Midwest, especially Indianapolis',
    objectOrPower: 'The dark prophecy and Apollo\'s still-limited mortal state',
    truthStatement: 'The Dark Prophecy reunites Apollo with Leo Valdez during the quest.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-burning-maze',
    title: 'The Burning Maze',
    shortLabel: 'Burning Maze',
    view: 'trivia-percy-jackson-burning-maze',
    group: 'Trials of Apollo',
    icon: '🌵',
    gradient: 'from-rose-600/20 to-red-600/20',
    border: 'border-rose-400/30 hover:border-rose-300/50',
    series: 'Trials of Apollo',
    bookNumberLabel: 'Book 3 of Trials of Apollo',
    protagonist: 'Apollo as Lester Papadopoulos',
    mythology: 'Greek and Roman mythology',
    quest: 'Reach the Labyrinth branch and face another imperial threat in the American Southwest',
    ally: 'Grover Underwood',
    antagonist: 'Caligula',
    setting: 'Southern California and the burning maze',
    objectOrPower: 'The maze route and the battle against Caligula\'s forces',
    truthStatement: 'The Burning Maze is the book in which Jason Grace dies.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-tyrants-tomb',
    title: 'The Tyrant\'s Tomb',
    shortLabel: 'Tyrant\'s Tomb',
    view: 'trivia-percy-jackson-tyrants-tomb',
    group: 'Trials of Apollo',
    icon: '🛡️',
    gradient: 'from-slate-600/20 to-zinc-600/20',
    border: 'border-slate-400/30 hover:border-slate-300/50',
    series: 'Trials of Apollo',
    bookNumberLabel: 'Book 4 of Trials of Apollo',
    protagonist: 'Apollo as Lester Papadopoulos',
    mythology: 'Greek and Roman mythology',
    quest: 'Defend Camp Jupiter and prepare for the final struggle against the emperors',
    ally: 'Reyna Ramírez-Arellano',
    antagonist: 'Tarquin and the undead assault on Camp Jupiter',
    setting: 'Camp Jupiter and the Bay Area war front',
    objectOrPower: 'Camp Jupiter\'s defense and Apollo\'s growing resolve',
    truthStatement: 'The Tyrant\'s Tomb is heavily focused on protecting Camp Jupiter.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-tower-of-nero',
    title: 'The Tower of Nero',
    shortLabel: 'Tower of Nero',
    view: 'trivia-percy-jackson-tower-of-nero',
    group: 'Trials of Apollo',
    icon: '👑',
    gradient: 'from-emerald-600/20 to-lime-600/20',
    border: 'border-emerald-400/30 hover:border-emerald-300/50',
    series: 'Trials of Apollo',
    bookNumberLabel: 'Book 5 of Trials of Apollo',
    protagonist: 'Apollo as Lester Papadopoulos',
    mythology: 'Greek and Roman mythology',
    quest: 'Return to Manhattan and defeat Nero in the final Trials of Apollo showdown',
    ally: 'Meg McCaffrey',
    antagonist: 'Nero',
    setting: 'New York City and Nero\'s tower',
    objectOrPower: 'Apollo\'s possible restoration and the final anti-Nero plan',
    truthStatement: 'The Tower of Nero concludes the Trials of Apollo series.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-red-pyramid',
    title: 'The Red Pyramid',
    shortLabel: 'Red Pyramid',
    view: 'trivia-percy-jackson-red-pyramid',
    group: 'The Kane Chronicles',
    icon: '🔺',
    gradient: 'from-red-600/20 to-amber-600/20',
    border: 'border-red-400/30 hover:border-red-300/50',
    series: 'The Kane Chronicles',
    bookNumberLabel: 'Book 1 of The Kane Chronicles',
    protagonist: 'Carter Kane',
    mythology: 'Egyptian mythology',
    quest: 'Contain the chaos unleashed when ancient Egyptian gods break free',
    ally: 'Sadie Kane',
    antagonist: 'Set',
    setting: 'The modern world through the House of Life and Egyptian magic sites',
    objectOrPower: 'Hosting Egyptian gods and stopping Set',
    truthStatement: 'The Red Pyramid launches Carter and Sadie Kane as dual leads in an Egyptian-mythology saga.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-throne-of-fire',
    title: 'The Throne of Fire',
    shortLabel: 'Throne of Fire',
    view: 'trivia-percy-jackson-throne-of-fire',
    group: 'The Kane Chronicles',
    icon: '🔥',
    gradient: 'from-orange-600/20 to-yellow-600/20',
    border: 'border-orange-400/30 hover:border-orange-300/50',
    series: 'The Kane Chronicles',
    bookNumberLabel: 'Book 2 of The Kane Chronicles',
    protagonist: 'Sadie Kane',
    mythology: 'Egyptian mythology',
    quest: 'Awaken Ra before Apophis can overwhelm the world',
    ally: 'Carter Kane',
    antagonist: 'Apophis',
    setting: 'The global House of Life struggle and quest for Ra',
    objectOrPower: 'The awakening of Ra',
    truthStatement: 'The Throne of Fire centers on the urgent need to awaken Ra.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-serpents-shadow',
    title: 'The Serpent\'s Shadow',
    shortLabel: 'Serpent\'s Shadow',
    view: 'trivia-percy-jackson-serpents-shadow',
    group: 'The Kane Chronicles',
    icon: '🐍',
    gradient: 'from-emerald-600/20 to-green-600/20',
    border: 'border-emerald-400/30 hover:border-emerald-300/50',
    series: 'The Kane Chronicles',
    bookNumberLabel: 'Book 3 of The Kane Chronicles',
    protagonist: 'Carter and Sadie Kane',
    mythology: 'Egyptian mythology',
    quest: 'Defeat Apophis and stop the forces of chaos for good',
    ally: 'Walt Stone',
    antagonist: 'Apophis',
    setting: 'The final global battle between order and chaos',
    objectOrPower: 'The shadow of Apophis and the final Egyptian showdown',
    truthStatement: 'The Serpent\'s Shadow is the finale of The Kane Chronicles.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-sword-of-summer',
    title: 'The Sword of Summer',
    shortLabel: 'Sword of Summer',
    view: 'trivia-percy-jackson-sword-of-summer',
    group: 'Magnus Chase',
    icon: '🗡️',
    gradient: 'from-sky-600/20 to-cyan-600/20',
    border: 'border-sky-400/30 hover:border-sky-300/50',
    series: 'Magnus Chase and the Gods of Asgard',
    bookNumberLabel: 'Book 1 of Magnus Chase',
    protagonist: 'Magnus Chase',
    mythology: 'Norse mythology',
    quest: 'Recover the Sword of Summer and survive a prophecy tied to Ragnarok',
    ally: 'Samirah al-Abbas',
    antagonist: 'Surt',
    setting: 'Boston and the road to Valhalla',
    objectOrPower: 'The Sword of Summer',
    truthStatement: 'The Sword of Summer introduces Magnus as a son of Frey.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-hammer-of-thor',
    title: 'The Hammer of Thor',
    shortLabel: 'Hammer of Thor',
    view: 'trivia-percy-jackson-hammer-of-thor',
    group: 'Magnus Chase',
    icon: '🔨',
    gradient: 'from-zinc-600/20 to-slate-600/20',
    border: 'border-zinc-400/30 hover:border-zinc-300/50',
    series: 'Magnus Chase and the Gods of Asgard',
    bookNumberLabel: 'Book 2 of Magnus Chase',
    protagonist: 'Magnus Chase',
    mythology: 'Norse mythology',
    quest: 'Recover Thor\'s missing hammer before the giants exploit the disaster',
    ally: 'Alex Fierro',
    antagonist: 'The giants and Loki\'s agenda',
    setting: 'The Nine Worlds with a focus on the search for Mjolnir',
    objectOrPower: 'Thor\'s hammer, Mjolnir',
    truthStatement: 'The Hammer of Thor revolves around the disappearance of Mjolnir.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-ship-of-the-dead',
    title: 'The Ship of the Dead',
    shortLabel: 'Ship of the Dead',
    view: 'trivia-percy-jackson-ship-of-the-dead',
    group: 'Magnus Chase',
    icon: '⛵',
    gradient: 'from-indigo-600/20 to-blue-600/20',
    border: 'border-indigo-400/30 hover:border-indigo-300/50',
    series: 'Magnus Chase and the Gods of Asgard',
    bookNumberLabel: 'Book 3 of Magnus Chase',
    protagonist: 'Magnus Chase',
    mythology: 'Norse mythology',
    quest: 'Sail to prevent Loki from triggering the next stage of Ragnarok',
    ally: 'Blitzen and Hearthstone',
    antagonist: 'Loki',
    setting: 'A sea voyage across the Nine Worlds',
    objectOrPower: 'The doomed ship voyage and the threat of Ragnarok',
    truthStatement: 'The Ship of the Dead closes the main Magnus Chase trilogy.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-chalice-of-the-gods',
    title: 'The Chalice of the Gods',
    shortLabel: 'Chalice',
    view: 'trivia-percy-jackson-chalice-of-the-gods',
    group: 'Senior Year Adventures',
    icon: '🏺',
    gradient: 'from-cyan-600/20 to-amber-600/20',
    border: 'border-cyan-400/30 hover:border-cyan-300/50',
    series: 'Senior Year Adventures',
    bookNumberLabel: 'Book 1 of the senior-year trilogy',
    protagonist: 'Percy Jackson',
    mythology: 'Greek and Roman mythology',
    quest: 'Retrieve Ganymede\'s stolen chalice to secure a recommendation letter for college',
    ally: 'Annabeth Chase',
    antagonist: 'A caper-style thief hunt tied to divine politics',
    setting: 'Modern New York and Percy\'s senior-year life',
    objectOrPower: 'Ganymede\'s chalice',
    truthStatement: 'The Chalice of the Gods links Percy\'s new quest to his college recommendation letters from the gods.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-wrath-of-the-triple-goddess',
    title: 'Wrath of the Triple Goddess',
    shortLabel: 'Triple Goddess',
    view: 'trivia-percy-jackson-wrath-of-the-triple-goddess',
    group: 'Senior Year Adventures',
    icon: '🌙',
    gradient: 'from-violet-600/20 to-slate-600/20',
    border: 'border-violet-400/30 hover:border-violet-300/50',
    series: 'Senior Year Adventures',
    bookNumberLabel: 'Book 2 of the senior-year trilogy',
    protagonist: 'Percy Jackson',
    mythology: 'Greek and Roman mythology',
    quest: 'Complete another divine errand tied to Hecate and Percy\'s recommendation-letter streak',
    ally: 'Grover Underwood',
    antagonist: 'The magical fallout from Hecate\'s sphere of influence',
    setting: 'Percy\'s senior-year world with a heavy Hecate angle',
    objectOrPower: 'Hecate\'s triple-goddess magic and another recommendation quest',
    truthStatement: 'Wrath of the Triple Goddess continues Percy\'s college-recommendation quest line.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-sun-and-the-star',
    title: 'The Sun and the Star',
    shortLabel: 'Sun and Star',
    view: 'trivia-percy-jackson-sun-and-the-star',
    group: 'Standalone Adventures',
    icon: '⭐',
    gradient: 'from-yellow-500/20 to-slate-700/20',
    border: 'border-yellow-400/30 hover:border-yellow-300/50',
    series: 'Standalone Adventures',
    bookNumberLabel: 'A stand-alone Riordanverse adventure',
    protagonist: 'Nico di Angelo',
    mythology: 'Greek and Roman mythology',
    quest: 'Journey into Tartarus to rescue Bob and confront the darkness there',
    ally: 'Will Solace',
    antagonist: 'The dangers of Tartarus and Nico\'s inner darkness',
    setting: 'Tartarus',
    objectOrPower: 'Nico\'s shadow powers and Bob\'s rescue',
    truthStatement: 'The Sun and the Star follows Nico di Angelo and Will Solace into Tartarus.',
  },
  {
    kind: 'story',
    id: 'percy-jackson-court-of-the-dead',
    title: 'The Court of the Dead',
    shortLabel: 'Court of the Dead',
    view: 'trivia-percy-jackson-court-of-the-dead',
    group: 'Standalone Adventures',
    icon: '💀',
    gradient: 'from-slate-700/20 to-indigo-700/20',
    border: 'border-slate-400/30 hover:border-slate-300/50',
    series: 'Standalone Adventures',
    bookNumberLabel: 'A stand-alone Riordanverse adventure',
    protagonist: 'Nico di Angelo',
    mythology: 'Greek and Roman mythology',
    quest: 'Face a new underworld-centered crisis tied to Nico and Will\'s expanding story',
    ally: 'Will Solace',
    antagonist: 'A death-court threat rooted in the underworld',
    setting: 'The underworld and Nico\'s darker mythic sphere',
    objectOrPower: 'Underworld politics and Nico\'s death-domain powers',
    truthStatement: 'The Court of the Dead continues the Nico di Angelo and Will Solace adventure line.',
  },
  {
    kind: 'companion',
    id: 'percy-jackson-demigod-files',
    title: 'The Demigod Files',
    shortLabel: 'Demigod Files',
    view: 'trivia-percy-jackson-demigod-files',
    group: 'Companion Books',
    icon: '📁',
    gradient: 'from-sky-600/20 to-blue-600/20',
    border: 'border-sky-400/30 hover:border-sky-300/50',
    series: 'Percy Jackson & the Olympians',
    format: 'A companion story collection',
    focus: 'short adventures and bonus material around Percy Jackson',
    audience: 'readers who want extra Camp Half-Blood stories',
    narrator: 'Percy Jackson and related companion material',
    contentType: 'short stories, interviews, and supplemental extras',
    campOrWorld: 'Camp Half-Blood',
    truthStatement: 'The Demigod Files expands the original Percy Jackson series with bonus adventures.',
  },
  {
    kind: 'companion',
    id: 'percy-jackson-demigod-diaries',
    title: 'The Demigod Diaries',
    shortLabel: 'Demigod Diaries',
    view: 'trivia-percy-jackson-demigod-diaries',
    group: 'Companion Books',
    icon: '📓',
    gradient: 'from-amber-600/20 to-orange-600/20',
    border: 'border-amber-400/30 hover:border-amber-300/50',
    series: 'Heroes of Olympus',
    format: 'A companion story collection',
    focus: 'short stories and bonus scenes tied to Heroes of Olympus',
    audience: 'fans who want extra demigod viewpoints around Heroes of Olympus',
    narrator: 'multiple demigods including Luke and other featured voices',
    contentType: 'short stories and supplemental character material',
    campOrWorld: 'the wider Camp Half-Blood world',
    truthStatement: 'The Demigod Diaries acts as a companion to Heroes of Olympus rather than a numbered main novel.',
  },
  {
    kind: 'companion',
    id: 'percy-jackson-camp-half-blood-confidential',
    title: 'Camp Half-Blood Confidential',
    shortLabel: 'CHB Confidential',
    view: 'trivia-percy-jackson-camp-half-blood-confidential',
    group: 'Companion Books',
    icon: '🏕️',
    gradient: 'from-green-600/20 to-emerald-600/20',
    border: 'border-green-400/30 hover:border-green-300/50',
    series: 'Percy Jackson & Camp Half-Blood',
    format: 'A camp guide companion',
    focus: 'an insider handbook to life at Camp Half-Blood',
    audience: 'new campers and returning Percy Jackson fans',
    narrator: 'Camp Half-Blood insiders and familiar demigod voices',
    contentType: 'guides, profiles, and camp-themed bonus material',
    campOrWorld: 'Camp Half-Blood',
    truthStatement: 'Camp Half-Blood Confidential is built as an in-world guide to Camp Half-Blood.',
  },
  {
    kind: 'companion',
    id: 'percy-jackson-camp-jupiter-classified',
    title: 'Camp Jupiter Classified',
    shortLabel: 'Camp Jupiter',
    view: 'trivia-percy-jackson-camp-jupiter-classified',
    group: 'Companion Books',
    icon: '🦅',
    gradient: 'from-red-600/20 to-stone-600/20',
    border: 'border-red-400/30 hover:border-red-300/50',
    series: 'Heroes of Olympus / Camp Jupiter',
    format: 'A camp guide companion',
    focus: 'classified-style material on Camp Jupiter and Roman demigod life',
    audience: 'readers curious about the Roman side of the demigod world',
    narrator: 'Camp Jupiter-linked companion framing',
    contentType: 'guidebook extras and Roman-camp worldbuilding',
    campOrWorld: 'Camp Jupiter',
    truthStatement: 'Camp Jupiter Classified serves as a Roman-camp companion volume.',
  },
];

const originalFiveRaw = {
  'percy-jackson-lightning-thief': parsePercyTrivia(lightningThiefRaw).map(normalizeQuestion),
  'percy-jackson-sea-of-monsters': parsePercyTrivia(seaOfMonstersRaw).map(normalizeQuestion),
  'percy-jackson-titans-curse': parsePercyTrivia(titansCurseRaw).map(normalizeQuestion),
  'percy-jackson-battle-of-the-labyrinth': parsePercyTrivia(battleOfLabyrinthRaw).map(normalizeQuestion),
  'percy-jackson-last-olympian': parsePercyTrivia(lastOlympianRaw).map(normalizeQuestion),
};

export const PERCY_JACKSON_LIGHTNING_THIEF_TRIVIA = originalFiveRaw['percy-jackson-lightning-thief'];
export const PERCY_JACKSON_SEA_OF_MONSTERS_TRIVIA = originalFiveRaw['percy-jackson-sea-of-monsters'];
export const PERCY_JACKSON_TITANS_CURSE_TRIVIA = originalFiveRaw['percy-jackson-titans-curse'];
export const PERCY_JACKSON_BATTLE_OF_THE_LABYRINTH_TRIVIA = originalFiveRaw['percy-jackson-battle-of-the-labyrinth'];
export const PERCY_JACKSON_LAST_OLYMPIAN_TRIVIA = originalFiveRaw['percy-jackson-last-olympian'];

const originalFiveMeta: PercyBookQuizMeta[] = [
  {
    id: 'percy-jackson-lightning-thief',
    title: 'The Lightning Thief',
    shortLabel: 'Lightning Thief',
    view: 'trivia-percy-jackson-lightning-thief',
    group: 'Percy Jackson & the Olympians',
    icon: '⚡',
    gradient: 'from-yellow-500/20 to-amber-500/20',
    border: 'border-yellow-400/30 hover:border-yellow-300/50',
  },
  {
    id: 'percy-jackson-sea-of-monsters',
    title: 'The Sea of Monsters',
    shortLabel: 'Sea of Monsters',
    view: 'trivia-percy-jackson-sea-of-monsters',
    group: 'Percy Jackson & the Olympians',
    icon: '🌊',
    gradient: 'from-cyan-600/20 to-sky-600/20',
    border: 'border-cyan-400/30 hover:border-cyan-300/50',
  },
  {
    id: 'percy-jackson-titans-curse',
    title: 'The Titan\'s Curse',
    shortLabel: 'Titan\'s Curse',
    view: 'trivia-percy-jackson-titans-curse',
    group: 'Percy Jackson & the Olympians',
    icon: '🏹',
    gradient: 'from-violet-600/20 to-indigo-600/20',
    border: 'border-violet-400/30 hover:border-violet-300/50',
  },
  {
    id: 'percy-jackson-battle-of-the-labyrinth',
    title: 'The Battle of the Labyrinth',
    shortLabel: 'Battle of the Labyrinth',
    view: 'trivia-percy-jackson-battle-of-the-labyrinth',
    group: 'Percy Jackson & the Olympians',
    icon: '🌀',
    gradient: 'from-emerald-600/20 to-teal-600/20',
    border: 'border-emerald-400/30 hover:border-emerald-300/50',
  },
  {
    id: 'percy-jackson-last-olympian',
    title: 'The Last Olympian',
    shortLabel: 'Last Olympian',
    view: 'trivia-percy-jackson-last-olympian',
    group: 'Percy Jackson & the Olympians',
    icon: '🏛️',
    gradient: 'from-rose-600/20 to-orange-600/20',
    border: 'border-rose-400/30 hover:border-rose-300/50',
  },
];

const remainingQuizMap: Record<string, MCTriviaQuestion[]> = Object.fromEntries(
  remainingBooks.map((book) => [
    book.id,
    book.kind === 'story' ? buildStoryQuiz(book) : buildCompanionQuiz(book),
  ]),
);

export const PERCY_JACKSON_BOOKS: PercyBookQuizMeta[] = [
  ...originalFiveMeta,
  ...remainingBooks.map(({ id, title, shortLabel, view, group, icon, gradient, border }) => ({
    id,
    title,
    shortLabel,
    view,
    group,
    icon,
    gradient,
    border,
  })),
  {
    id: 'percy-jackson-random',
    title: 'Riordanverse Mixed Challenge',
    shortLabel: 'Mixed Challenge',
    view: 'trivia-percy-jackson-random',
    group: 'Standalone Adventures',
    icon: '🎲',
    gradient: 'from-fuchsia-600/20 to-pink-600/20',
    border: 'border-fuchsia-400/30 hover:border-fuchsia-300/50',
  },
];

export const PERCY_JACKSON_QUIZ_MAP: Record<string, MCTriviaQuestion[]> = {
  ...originalFiveRaw,
  ...remainingQuizMap,
};

export const PERCY_JACKSON_GROUP_ORDER: PercyBookGroup[] = [
  'Percy Jackson & the Olympians',
  'Heroes of Olympus',
  'Trials of Apollo',
  'The Kane Chronicles',
  'Magnus Chase',
  'Senior Year Adventures',
  'Companion Books',
  'Standalone Adventures',
];

export const PERCY_JACKSON_MIXED_TRIVIA: MCTriviaQuestion[] = shuffle(
  Object.values(PERCY_JACKSON_QUIZ_MAP).flat(),
).slice(0, 20);

export const PERCY_JACKSON_COVER_IMAGE = PERCY_POSTER;
