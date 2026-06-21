# FandomTrivia — Weekly Development Log

> A week-by-week chronicle of how FandomTrivia was built, from blank canvas to full-featured trivia app with Supabase auth, badge system, and a course to teach it all.

---

## Week 1 (Feb 21, 2026) — Project Bootstrap

**Theme:** From zero to a running React + Vite + Tailwind app deployed on Vercel.

**Commits:**
- `Initial commit`
- `Initialize Fandom Trivia Pro application`
- `feat: Implement initial React application structure, core components, styling, and constants, along with a new database file.`
- `Add Vercel deployment configuration`

**What was learned:**
- Scaffolding a Vite + React + TypeScript project with Tailwind CSS
- Setting up a local SQLite database with better-sqlite3 and Express server
- Deploying a React SPA to Vercel with proper configuration
- Structuring a React app with components, constants, and styling

**Key files created:** `package.json`, `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `server.ts`, `vercel.json`

---

## Week 2 (Feb 22–23, 2026) — Quiz Content & UI Polish

**Theme:** Building real quizzes and making the app look good.

**Commits:**
- `UI improvements: branding, smooth scroll, real leaderboard, carousel, fix images`
- `Add K-Pop Demon Hunters multiple-choice quiz (13 questions)`
- `Add Twilight Vol. II multiple-choice quiz (10 questions, refactor MCQuizView generic)`
- `Replace Twilight Vol I with MC quiz, add source evidence, rename to Vol I`
- `feat: add HP Book 1 & Book 2 trivia, fix K-Pop quiz answers`
- `feat: Implement the initial Fandom Trivia application with core UI, navigation, and user authentication.`

**What was learned:**
- Building multiple-choice quiz components with reusable generic views
- Sourcing and structuring real trivia content (K-Pop, Twilight, Harry Potter)
- UI polish: branding, smooth scrolling, carousels, image handling
- Writing test questions with source evidence citations
- Basic navigation and authentication flows

**Key files created:** `src/constants.ts` (trivia data), `MCQuizView` component

---

## Week 3 (Feb 24, 2026) — Supabase Auth Migration

**Theme:** Ripped out the custom Express/SQLite auth and replaced it with Supabase.

**Commits:**
- `feat: Implement core application structure with Supabase integration and initial Harry Potter trivia content.`

**Changelog entry:** `[2026-02-24] - Supabase Authentication Migration`

**What was learned:**
- Integrating Supabase into a React app (`@supabase/supabase-js`, `supabaseClient.ts`)
- Google OAuth flow via `supabase.auth.signInWithOAuth`
- Replacing SQLite with Supabase PostgreSQL: profiles table, auth.users link via DB triggers
- Row Level Security (RLS) policies for per-user data isolation
- Environment variable management for Supabase keys
- Deprecating server-side routes safely

**Key files created:** `src/supabaseClient.ts`, Supabase `profiles` table, RLS policies

---

## Week 4 (Feb 25–28, 2026) — Content Expansion & Routing

**Theme:** Adding more universes, leaderboards, and proper routing.

**Commits:**
- `feat: Add initial application structure, navigation links, universe data, leaderboard functions, and Twilight trivia questions.`
- `feat: implement the core Fandom Trivia application, including user authentication, routing, and game logic.`
- `feat: Initialize Fandom Trivia application and add comprehensive trivia content for Twilight and Three-Body Problem series.`
- `feat: Add threebody.jpg image.`

**What was learned:**
- Building navigation with React Router links
- Universe/tournament data structures in constants
- Leaderboard logic and score tracking
- Adding rich trivia content for new fandoms (Three-Body Problem)
- Game logic: question selection, scoring, progress tracking
- Image assets for universes

**Key files created:** Navigation components, leaderboard functions, Three-Body trivia content

---

## Week 5 (Mar 1–7, 2026) — Iteration Sprint

**Theme:** Rapid iteration — multiple feature attempts, refining the core app architecture.

**Commits:**
- `feat: Add core application constants, leaderboard logic, and initial Twilight and Zootopia content.`
- `feat: Initialize Fandom Trivia application with core UI, authentication, and game components.`
- `feat: Add initial constants for navigation links, universe and tournament data, and Twilight trivia questions.`
- `feat: Implement core React application including user authentication, navigation, and trivia game mechanics.`
- Multiple `Initialize` / `Implement` commits refining App.tsx

**What was learned:**
- Iterating on app architecture: multiple passes at App.tsx to get auth, routing, and game flow right
- Adding new content (Zootopia) while maintaining data consistency in constants
- Refactoring as the app grows — separating concerns
- Balancing client-side routing with auth state

**Key files iterated:** `src/App.tsx`, `src/constants.ts`, auth components

---

## Week 6 (Mar 8–16, 2026) — Stabilization & Feature Complete

**Theme:** Final push — badges, history, modals, docs, and production readiness.

**Commits (18+ commits):**
- Username modal, Navbar, Footer, global styles
- Badge system (evaluation logic + display)
- Quiz history tracking and management
- Notifications and Google Translate integration
- Dashboard and profile management
- Core app finalization with routing, auth, quiz engine, score tracking, badge system
- Documentation: `agent.md`, `changelog.md`, `vision.md`

**What was learned:**
- Building a badge achievement system with evaluation logic
- Quiz history persistence and retrieval
- Global state management for user progress
- Google Translate i18n integration
- Component architecture: Navbar, Footer, UsernameModal as reusable UI
- Writing project documentation (changelog, vision, agent docs)
- Finalizing a React SPA for production

**Key files finalized:** `src/App.tsx` (all features integrated), badge evaluation logic, user dashboard

---

## Week 7 (Jun 21, 2026) — Course Creation

**Theme:** Teaching everything we built.

**Deliverables:**
- `fandom-trivia-course/` — 6-module interactive course
- `doc/weekly.md` — this document
- `doc/week-01.html` through `doc/week-06.html` — per-week learning pages

**What was learned:**
- Turning a codebase into a teachable curriculum
- Writing explanations that connect code to concepts
- Interactive quizzes embedded in learning materials
- How to structure a multi-module course with build tooling
