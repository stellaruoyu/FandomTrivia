export interface ChangelogItem {
  type: 'added' | 'changed' | 'fixed' | 'removed' | 'improved';
  text: string;
  linkText?: string;
  linkUrl?: string;
}

export interface ChangelogEntry {
  version?: string;
  date: string;
  title: string;
  items: ChangelogItem[];
}

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: '1.7.1',
    date: '2026-05-30',
    title: 'Snow White & Cinderella Disneyland Relocation',
    items: [
      {
        type: 'changed',
        text: 'Relocated the Snow White and Cinderella quizzes from Classic Tales to the Disneyland category to match their Disney animated film status.',
        linkText: 'Explore Disneyland',
        linkUrl: '/selector-disneyland'
      },
      {
        type: 'changed',
        text: 'Adjusted grading thresholds and scoring scale for Snow White and Cinderella quizzes to align with DISNEYLAND_GRADES.',
      },
      {
        type: 'changed',
        text: 'Added the "Disney" tag to Snow White and Cinderella metadata, and updated the Classic Tales selector, descriptions, and random challenge mix to exclude them.',
      }
    ]
  },
  {
    version: '1.7.0',
    date: '2026-05-29',
    title: 'Classic Tales Quizzes & Blogs',
    items: [
      {
        type: 'added',
        text: 'Added a new Classic Tales category featuring 5 new fairy tale and legend quizzes: The Wizard of Oz, The Ugly Duckling, Little Red Riding Hood, Robin Hood, and Alice in Wonderland.',
        linkText: 'Explore Classic Tales',
        linkUrl: '/selector-classic-tales'
      },
      {
        type: 'added',
        text: 'Added 7 new highly engaging, SEO-optimized blog posts for classic tales (including Snow White and Cinderella) to drive search engine traffic.',
        linkText: 'Read Blogs',
        linkUrl: '/blog'
      },
      {
        type: 'added',
        text: 'Added the "Fable Explorer" badge, unlocked upon completing any Classic Tales quiz.',
      },
      {
        type: 'added',
        text: 'Added a combined Classic Tales Mixed Challenge that compiles 20 random questions across the 5 fairy tales.',
      }
    ]
  },
  {
    version: '1.6.0',
    date: '2026-05-28',
    title: 'Rabbit Idioms Trivia & React Crash Fix',
    items: [
      {
        type: 'added',
        text: 'Added a new rabbit-themed idiom trivia challenge with 15 bilingual questions.',
        linkText: 'Play Rabbit Idioms',
        linkUrl: '/selector-rabbit'
      },
      {
        type: 'added',
        text: 'Implemented a bilingual toggle button (English/中文) to switch language preferences on the fly.',
      },
      {
        type: 'added',
        text: 'Added the "Rabbit Sage" badge, unlocked upon completing the Rabbit Idioms challenge.',
      },
      {
        type: 'fixed',
        text: 'Resolved a React Hook Violation (Error #310) in MCQuizContent that crashed the game to a black screen after selecting a mode.',
      }
    ]
  },
  {
    version: '1.5.0',
    date: '2026-05-26',
    title: 'Disneyland Classics, Anime Expansion, and SEO Blogs',
    items: [
      {
        type: 'added',
        text: 'Added a new Disneyland category featuring 6 new classic Disney movie quizzes: The Lion King, Aladdin, Beauty and the Beast, The Little Mermaid, Tangled, and Mulan.',
        linkText: 'Explore Disneyland',
        linkUrl: '/selector-disneyland'
      },
      {
        type: 'added',
        text: 'Added a new Anime Fandoms category featuring 6 hot anime quizzes: Attack on Titan, Demon Slayer, Jujutsu Kaisen, One Piece, Naruto, and Death Note.',
        linkText: 'Explore Anime',
        linkUrl: '/selector-anime'
      },
      {
        type: 'added',
        text: 'Added 14 new highly detailed, SEO-optimized blog posts for all classic Disney, Anime, and latest Disney/Pixar sequels (Frozen 2 and Zootopia 2).',
        linkText: 'Read Blogs',
        linkUrl: '/blog'
      },
      {
        type: 'improved',
        text: 'Exposed all 12 individual Disneyland and Anime quizzes as standalone cards on the homepage with custom themed styling, page routes, and search integrations.',
      },
      {
        type: 'improved',
        text: 'Replaced Disney and Anime placeholder card artwork with official theatrical posters and covers.',
      },
      {
        type: 'improved',
        text: 'Expanded the Tangled trivia dataset to fully cover franchise sequels and spin-off series.',
      }
    ]
  },
  {
    version: '1.4.0',
    date: '2026-05-26',
    title: 'Hangman 1v1 Sync Fix, Score Screens, and New Blog Posts',
    items: [
      {
        type: 'added',
        text: 'Added a dedicated, high-fidelity score and completion page for Hangman rounds in both Solo and 1v1 versus modes.',
        linkText: 'Play Hangman',
        linkUrl: '/selector-hangman'
      },
      {
        type: 'added',
        text: 'Added a high-quality, SEO-optimized blog post for USA Songs Trivia targeting top search traffic.',
        linkText: 'Read USA Songs Blog',
        linkUrl: '/blog/usa-songs-trivia'
      },
      {
        type: 'added',
        text: 'Added an SEO-optimized blog post for Hangman Trivia covering play modes and deductive strategies.',
        linkText: 'Read Hangman Blog',
        linkUrl: '/blog/hangman-trivia'
      },
      {
        type: 'fixed',
        text: 'Fixed synchronization issue in multiplayer Hangman where the host screen would not transition to the finish state when the guest finished guessing.',
        linkText: 'Play 1v1 Hangman',
        linkUrl: '/selector-hangman'
      },
      {
        type: 'fixed',
        text: 'Introduced stale closure protection (isHostRef) to guarantee reliable Supabase realtime listeners across matches.',
      },
      {
        type: 'fixed',
        text: 'Restored the original, nostalgic universe cover images for Twilight, Harry Potter, and K-Pop.',
      }
    ]
  },
  {
    version: '1.3.0',
    date: '2026-05-24',
    title: 'USA Songs Quiz Formatting & Link Fix',
    items: [
      {
        type: 'added',
        text: 'Added a post-quiz sharing modal to quickly post results to X/Twitter, Facebook, Reddit, or copy to clipboard.',
      },
      {
        type: 'changed',
        text: 'Updated the USA Songs selector card and page styling to match the rest of the Fandom Trivia categories.',
        linkText: 'Play USA Songs',
        linkUrl: '/selector-usa-songs'
      },
      {
        type: 'changed',
        text: 'Implemented subpath-safe base asset URLs and base-path routing configuration to support customizable deployments.',
      }
    ]
  },
  {
    version: '1.2.0',
    date: '2026-05-03',
    title: 'The Bad Guys Universe, Interactive Onboarding, & Target Badges',
    items: [
      {
        type: 'added',
        text: 'Added "The Bad Guys" universe with two new trivia challenges: The Bad Guys and The Bad Guys 2.',
        linkText: 'Play The Bad Guys',
        linkUrl: '/selector-bad-guys'
      },
      {
        type: 'added',
        text: 'Added a brand-new SEO-optimized blog post targeting fans of The Bad Guys 2.',
        linkText: 'Read Bad Guys 2 Blog',
        linkUrl: '/blog/bad-guys-2-quiz'
      },
      {
        type: 'added',
        text: 'Created two new badges: "Golden Dolphin Crew" (The Bad Guys) and "Bad Girls Target" (The Bad Guys 2) with exact target matching.',
      },
      {
        type: 'improved',
        text: 'Redesigned the onboarding instruction modal with step cards, tip highlights, and a playful welcome layout.',
      }
    ]
  },
  {
    version: '1.1.0',
    date: '2026-03-17',
    title: 'Speed Leaderboards & UI Refinements',
    items: [
      {
        type: 'added',
        text: 'Implemented speed leaderboards to track and rank the fastest completion times for all quizzes.',
        linkText: 'View Leaderboards',
        linkUrl: '/rankings'
      },
      {
        type: 'added',
        text: 'Added real-time quiz timers to track player speed in MCQuizView and display durations in the completion screens.',
      },
      {
        type: 'added',
        text: 'Added an accuracy/speed toggle switch to the global rankings table.',
      },
      {
        type: 'added',
        text: 'Updated HistoryModal to display completion times alongside accuracy scores for past attempts.',
      },
      {
        type: 'changed',
        text: 'Optimized leaderboard tie-breakers using time-based performance statistics.',
      }
    ]
  },
  {
    version: '1.0.0',
    date: '2026-02-24',
    title: 'Supabase Authentication & Leaderboard Migration',
    items: [
      {
        type: 'changed',
        text: 'Replaced local Express/SQLite sessions with Supabase Auth (Google OAuth) for secure, global player accounts.',
      },
      {
        type: 'changed',
        text: 'Migrated leaderboard storage from local SQLite database to Supabase PostgreSQL table.',
      },
      {
        type: 'added',
        text: 'Implemented secure profile tables, database triggers, and Row Level Security (RLS) policies.',
      }
    ]
  },
  {
    version: '0.9.0',
    date: '2026-02-15',
    title: 'MVP Launch & Core Fandom Content',
    items: [
      {
        type: 'added',
        text: 'Launched core quiz engine featuring scoring, badge unlocking, and universe selector screens.',
      },
      {
        type: 'added',
        text: 'Added initial trivia datasets for Twilight, Harry Potter, Percy Jackson, Star Wars, Three-Body Problem, K-Pop Demon Hunters, and Zootopia.',
      }
    ]
  }
];
