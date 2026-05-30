# Changelog

All notable changes to Fandom Trivia will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2026-05-30] - Snow White & Cinderella Disneyland Relocation
### Changed
- **Snow White & Cinderella Quizzes**: Moved the "Snow White" and "Cinderella" quizzes from the Classic Tales section to the Disneyland section, adjusting their scoring/grading scales to `DISNEYLAND_GRADES`.
- **Search Metadata**: Added 'Disney' tags to Snow White and Cinderella universe definitions to align with Disney content search indexing.
- **Classic Tales Universe**: Updated Classic Tales random mix, count descriptions, and metadata to exclude Snow White and Cinderella.

## [2026-05-29] - Classic Tales Quizzes & Blogs
### Added
- **Classic Tales Universe**: Added 5 new classic story quizzes: The Wizard of Oz, The Ugly Duckling, Little Red Riding Hood, Robin Hood, and Alice in Wonderland.
- **Fable Explorer Badge**: Added a new badge awarded upon completing any classic tales trivia challenge.
- **SEO Blog Posts**: Added 7 highly engaging, SEO-optimized blog posts for classic tales (including Snow White and Cinderella) to drive search traffic.
- **Classic Tales Mixed Challenge**: Added a combined random challenge mode containing 20 questions pulled from the 5 classic stories.

## [2026-05-28] - Rabbit Idioms Trivia & React Crash Fix
### Added
- **Rabbit Idioms Quiz**: Added a new rabbit-themed idiom trivia challenge with 15 bilingual questions.
- **Bilingual Toggle**: Implemented a header toggle button to switch between English and Chinese translations for the quiz questions, options, evidence, and results.
- **Rabbit Sage Badge**: Added a new unlockable thematic badge for completing the Rabbit Idioms challenge.

### Fixed
- **React Crash/Black Screen**: Resolved a React Hook Violation (Error #310) in `MCQuizContent` by moving the translated question hooks above conditional early returns.

## [2026-03-17] - Speed Leaderboards & UI Refinements
### Added
- **Speed Leaderboards**: New leaderboard section for tracking and ranking quiz completion times.
- **Quiz Timer**: Implemented `startTime` and `completionTime` logic in `MCQuizView` to accurately track quiz duration.
- **Accuracy/Speed Toggles**: Added a sleek toggle system to the global rankings to switch between accuracy and speed views.
- **Time in History**: Updated `HistoryModal` to display completion times for all past quiz attempts.

### Changed
- **Sorting Logic**: Optimized leaderboard sorting to use completion time as a tie-breaker for accuracy and vice versa.
- **Dashboard Updates**: The "Live Leaderboard" sidebar now displays both score and time for top players.
- **UI Consistency**: Integrated `formatTime` helper and updated entry layouts across Dashboard, Rankings, and History.

## [Unreleased]
### Added
- Comprehensive strategic documentation: `agent.md`, `changelog.md`, and `vision.md`, incorporating insights from `ROADMAP.md` and `TASK_BREAKDOWN.md`.

## [2026-05-24] - USA Songs Quiz Formatting & Link Fix
### Added
- **Trivia Score Sharing**: Added a share button on quiz completion so players can review a prewritten score message and post it to Facebook, X, or Reddit, or copy it to the clipboard.

### Changed
- **Music Quiz Formatting**: Updated the USA Songs selector so it reads more like the other quiz selector pages.
- **Subpath-Safe Assets**: Switched the USA Songs card image usage to the app base path so the music quiz still loads correctly from repo-style deployments.
- **Working `/fandom-trivia/` Links**: Added configurable base-path routing support so the music quiz and related links continue to work when hosted under `/fandom-trivia/`.

## [2026-02-24] - Supabase Authentication Migration
### Changed
- **Auth Overhaul**: Replaced the custom Express/SQLite/session-based authentication system with **Supabase Auth** (Google OAuth).
- Refactored `App.tsx` logic to utilize `supabase.auth.signInWithOAuth`.
- Deprecated and stripped all server-side auth routes from `server.ts`.
- Swapped out local SQLite Leaderboards (`fandom.db`) to lean on Supabase's PostgreSQL implementation.

### Added
- Implemented `profiles` table in Supabase, linked to `auth.users` via database triggers.
- Configured Row Level Security (RLS) policies for user data security.
- Added `@supabase/supabase-js`, `src/supabaseClient.ts`, and environment variable definitions.

## [2026-02-15] (Approx) - MVP & Core Content
### Added
- Expanded trivia content in `constants.ts` to include K-Pop Demon Hunters, Three-Body Problem, Twilight, and Zootopia.
- Established the MVP Trivia UI, scoring system, badge awards, and universe selection screens.
