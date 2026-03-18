# Changelog

All notable changes to Fandom Trivia will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
