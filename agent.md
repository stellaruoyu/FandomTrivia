# Agent Guidelines & Technical SOP

## Fandom Trivia Architecture
Fandom Trivia is a modern, responsive web application tailored for a premium user experience.

### Tech Stack Details
- **Frontend**: React 19, TypeScript, Vite 6
- **Styling**: Tailwind CSS 4, Lucide React (icons)
- **Animations**: Framer Motion (`motion`)
- **Backend/Database**: Supabase (PostgreSQL, Auth, Realtime)
- **Deployment**: Vercel (`fandom-trivia.vercel.app`)
- **Legacy Components**: `server.ts` remains as a Vite dev server/static file server (previously handled custom SQLite auth, now deprecated in favor of Supabase).

## AI Agent Directives & "You vs. AI" Workflow

**The 80/20 Rule**: AI handles 80% of the execution (code, implementation, content generation). The human user handles the 20% creative direction, decision-making, and account management.

### When Adding New Features:
1. **Consistency**: Adhere to existing component structures (e.g., `constants.ts` for trivia data formats).
2. **Supabase First**: Always default to Supabase for data (leaderboards, profiles) instead of `localStorage` or local SQLite.
3. **Formatting & UX**: Ensure UI additions use existing Tailwind CSS tokens to maintain a premium, polished, dark-mode-ready aesthetic. Avoid generic styling. 
4. **No Breaking Changes**: Be extremely careful amending trivia objects; ensure properties map cleanly to `App.tsx` TS interfaces (`TriviaQuestion`, `MCTriviaQuestion`, `Badge`, `LeaderboardEntry`).

### Content Generation Workflow:
When tasked to add a new fandom (e.g., Taylor Swift, Percy Jackson, Harry Potter Books 3-7):
- **User role**: Provides source text/facts, reviews generated questions, and approves assets.
- **Agent role**: Synthesizes 20+ multiple-choice questions, appends to `constants.ts` with valid evidence tags, updates the UI routing, and configures new "Universe" select cards.

### Important Documentation Maintenance
- Do NOT alter `package.json` or `vite.config.ts` carelessly.
- Keep `changelog.md` updated synchronously with significant feature branches.
- Reference `ROADMAP.md` and `TASK_BREAKDOWN.md` to ensure code implementations align with prioritized commercial goals (e.g., Share Results Card, Daily Challenges).
