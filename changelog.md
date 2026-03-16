# Changelog

All notable changes to Fandom Trivia will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
