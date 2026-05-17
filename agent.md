# Agent Guidelines

## Project Reality

Fandom Trivia is a Vite/React SPA with a lightweight Express wrapper for local development and static hosting. The app is not an AI Studio starter anymore, and it is not primarily a Node backend project. Most product behavior lives in the frontend, especially in `src/App.tsx` and `src/constants.ts`.

Current live architecture:

- Frontend: React 19, TypeScript, Vite 6, React Router 7
- Styling: Tailwind CSS 4 utility classes inside TSX and CSS
- Motion/UI: `motion`, `lucide-react`, `react-helmet-async`
- Data/auth: Supabase
- Local server: `server.ts` on port `3000`
- SEO/static generation: `scripts/prepare-static-assets.ts`

## Source Of Truth

When making changes, prefer these files first:

- `src/App.tsx`: app shell, routes, rankings, auth flows, dashboard, badges, multiplayer room flows, blog pages, legal pages
- `src/constants.ts`: universe cards, badges, navigation constants, and a large share of trivia datasets
- `src/blogPosts.ts`: long-form blog entries and metadata
- `src/siteMeta.ts`: canonical site title, URL, description, OG image
- `scripts/prepare-static-assets.ts`: sitemap generation and static meta sync
- `src/supabaseClient.ts`: frontend Supabase wiring

## Operational Rules

1. Treat Supabase as a live dependency, not an optional enhancement.
2. Assume `profiles`, `scores`, and `rooms` are production-critical tables because the current app reads/writes them directly.
3. Check route definitions in `src/App.tsx` before adding, renaming, or deleting quiz pages.
4. If you introduce indexable routes, update `scripts/prepare-static-assets.ts`.
5. If you change `src/siteMeta.ts`, regenerate static outputs through the normal build flow.
6. Do not describe or depend on Gemini features unless you first verify live usage in code. `GEMINI_API_KEY` still appears in config, but there is no active Gemini-driven app flow in the current codebase.

## Adding A New Universe Or Quiz

1. Add or import the trivia dataset.
2. Update `UNIVERSES` in `src/constants.ts` if the universe needs a homepage/select card.
3. Add selector and quiz routes in `src/App.tsx`.
4. Add supporting imagery under `public/images` when needed.
5. Update sitemap coverage in `scripts/prepare-static-assets.ts` for any public route that should be indexed.
6. If the universe needs badge support, update `BADGES` and any title-matching logic that depends on quiz naming.

## Adding Or Updating Blog Content

1. Edit `src/blogPosts.ts`.
2. Keep `slug`, `title`, `metaDescription`, `date`, `image`, and `keywords` coherent.
3. Use real internal quiz links where possible.
4. Ensure new blog slugs remain covered by the generated sitemap.

## Documentation Hygiene

Keep these docs aligned with code:

- `README.md`: real setup, runtime, env requirements, and contributor expectations
- `agent.md`: architecture and maintenance SOP

Do not leave template instructions in place after the product has diverged from them.

## Risk Areas

- `src/App.tsx` is large and tightly coupled; small route or state changes can have wide UI impact
- Quiz IDs, score labels, badge matching, and leaderboard display logic are loosely coupled by strings
- Static SEO output is generated from code; route/content changes can drift from sitemap and meta tags if the script is not updated
- Some assets and metadata reference remote images; avoid breaking those assumptions unintentionally

## Verification Expectations

For documentation-only work, verify:

- setup instructions match `package.json`
- environment variable guidance matches actual code usage
- architecture claims match current imports and runtime flow

For product changes, also run:

```bash
npm run lint
```
