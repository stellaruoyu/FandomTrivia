export type ChangelogLink = {
  label: string;
  href: string;
};

export type ChangelogEntry = {
  id: string;
  date: string;
  title: string;
  summary: string;
  type: 'feature' | 'change';
  highlights: string[];
  links: ChangelogLink[];
};

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    id: 'disneyland-hub',
    date: '2026-05-20',
    title: 'Disneyland Hub Added',
    summary: 'A new Disneyland section now groups the Disney and Pixar quiz universes already live in the app.',
    type: 'feature',
    highlights: [
      'Added a dedicated Disneyland universe card on the homepage.',
      'Created a new selector page that links fans directly into Disney and Pixar quiz sections.',
      'Grouped Moana, Frozen, Zootopia, Toy Story, and Hoppers under one hub.'
    ],
    links: [
      { label: 'Open Disneyland', href: '/selector-disneyland' },
      { label: 'Play Moana', href: '/selector-moana' },
      { label: 'Play Frozen', href: '/selector-frozen' }
    ]
  },
  {
    id: 'goat-launch',
    date: '2026-05-04',
    title: 'GOAT Universe Launched',
    summary: 'The new GOAT movie universe arrived with a dedicated selector, quiz route, and SEO article.',
    type: 'feature',
    highlights: [
      'Added the GOAT universe card and selector flow.',
      'Published the GOAT (2026) trivia challenge.',
      'Added a matching GOAT blog article with direct quiz CTAs.'
    ],
    links: [
      { label: 'Open GOAT', href: '/selector-goat' },
      { label: 'Play GOAT Quiz', href: '/trivia-goat' },
      { label: 'Read GOAT Article', href: '/blog/goat-quiz' }
    ]
  },
  {
    id: 'bad-guys-expansion',
    date: '2026-05-03',
    title: 'The Bad Guys Expansion',
    summary: 'The Bad Guys entered the app with a new universe hub, two quizzes, custom badges, and a sequel-focused blog post.',
    type: 'feature',
    highlights: [
      'Added The Bad Guys universe selector.',
      'Published both The Bad Guys and The Bad Guys 2 quiz routes.',
      'Created badge support and an SEO article for the sequel.'
    ],
    links: [
      { label: 'Open The Bad Guys', href: '/selector-bad-guys' },
      { label: 'Play Bad Guys 1', href: '/trivia-bad-guys-1' },
      { label: 'Play Bad Guys 2', href: '/trivia-bad-guys-2' }
    ]
  },
  {
    id: 'wicked-expansion',
    date: '2026-04-30',
    title: 'Wicked Universe Expanded',
    summary: 'Wicked now includes multiple movie-era quiz routes and a matching fandom article for discovery.',
    type: 'feature',
    highlights: [
      'Expanded the Wicked universe with multiple quiz paths.',
      'Added a mixed challenge route for broader replay value.',
      'Published a Wicked article that links fans back into the quiz flow.'
    ],
    links: [
      { label: 'Open Wicked', href: '/selector-wicked' },
      { label: 'Play Part 1', href: '/trivia-wicked-part-1' },
      { label: 'Read Wicked Article', href: '/blog/wicked-quiz' }
    ]
  },
  {
    id: 'speed-leaderboards',
    date: '2026-03-17',
    title: 'Speed Leaderboards & Ranking Upgrades',
    summary: 'Rankings now track both accuracy and completion time so fast, high-quality runs get proper credit.',
    type: 'change',
    highlights: [
      'Added speed leaderboard support.',
      'Updated quiz history and ranking displays with completion time.',
      'Improved sorting logic between score and speed.'
    ],
    links: [
      { label: 'View Rankings', href: '/rankings' }
    ]
  }
];
