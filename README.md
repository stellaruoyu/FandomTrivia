# Fandom Trivia

Fandom Trivia is a React + TypeScript single-page app for franchise-focused trivia. Players can browse universes, play quiz routes, compete on rankings, unlock badges, read SEO blog content, and sign in with Supabase-backed auth.

Production site: `https://www.fandom-trivia.com`

## Current Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- React Router 7
- Motion
- Supabase for auth and app data
- Express + Vite middleware for local development via `server.ts`

## What The App Includes

- Universe selector pages and quiz routes for franchises such as Twilight, Harry Potter, Star Wars, Wicked, Dog Man, Toy Story, Shrek, Avatar, Minecraft, Moana, Frozen, Kung Fu Panda, and more
- Supabase-backed rankings, quiz history, badges, profile data, and multiplayer room state
- Blog and SEO landing pages stored in code
- Static SEO metadata and sitemap generation during `prebuild`
- Legal pages, search, daily challenge logic, and Google Translate embed support

## Local Setup

### Prerequisites

- Node.js 20+
- npm
- A Supabase project with the required tables

### Environment Variables

Create a local `.env` file or copy from `.env.example`.

Required for the current app:

```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-key"
```

Present in config but not currently used by the shipped app flow:

```env
GEMINI_API_KEY="optional-legacy-value"
APP_URL="optional-legacy-value"
SESSION_SECRET="optional-legacy-value"
```

## Run Locally

```bash
npm install
npm run dev
```

The local server runs at `http://localhost:3000`.

`npm run dev` starts `server.ts`, which mounts Vite in middleware mode for SPA development.

## Build

```bash
npm run build
```

Before the Vite build, `npm run prepare:static` runs automatically. That script:

- syncs top-level SEO metadata into `index.html` and `main.bundle.js`
- regenerates `public/sitemap.xml`

Preview the production build with:

```bash
npm run preview
```

## Project Structure

```text
src/
  App.tsx               Main application shell and route definitions
  constants.ts          Universe metadata, badges, and large trivia datasets
  blogPosts.ts          Blog content entries
  siteMeta.ts           Canonical site metadata
  supabaseClient.ts     Supabase client
  components/SEOHead.tsx
scripts/
  prepare-static-assets.ts
public/
  images/
  robots.txt
  sitemap.xml
server.ts               Local Express server for dev/prod static hosting
```

## Data Expectations

The frontend currently reads and writes Supabase data from:

- `profiles`
- `scores`
- `rooms`

If those tables or columns change, quiz completion, rankings, auth-linked profiles, badges, and multiplayer flows can break.

## Notes For Contributors

- `src/App.tsx` is the central route and feature file; check it before adding new quiz flows
- `src/constants.ts` contains universe cards, badges, and much of the quiz content
- Blog content is code-defined in `src/blogPosts.ts`
- If you add or rename routes that should be indexed, update the sitemap inputs in `scripts/prepare-static-assets.ts`
- Do not assume `.env.example` reflects live runtime requirements without checking code paths first

## Available Scripts

- `npm run dev` - run the local app on port 3000
- `npm run build` - generate static metadata, then build with Vite
- `npm run preview` - preview the built app
- `npm run lint` - run TypeScript type-checking with `tsc --noEmit`
- `npm run clean` - remove `dist`
