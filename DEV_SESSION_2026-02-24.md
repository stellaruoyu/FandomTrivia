# Dev Session Summary — Feb 24, 2026

## 🎯 Goal

Integrate **Supabase Auth** (Google OAuth) into the FandomTrivia app, replacing the old custom Express/SQLite/session-based authentication system.

---

## 📋 What We Did

### 1. Analyzed the Existing Auth System
- The app had a **custom Google OAuth** flow built into `server.ts` using Express
- User data was stored in a local **SQLite** database (`fandom.db`) via `better-sqlite3`
- Sessions were managed with `express-session` + `cookie-parser`
- The frontend opened a **popup window** for Google login and listened for `postMessage` events

### 2. Created a New Supabase Project
- **Project Name**: FandomTrivia
- **Project ID**: `yurfplpwpdayemyxpbxr`
- **Region**: `us-west-1`
- **Cost**: Free tier ($0/month)

### 3. Set Up the Database Schema
- Created a `profiles` table linked to `auth.users` with columns: `id`, `username`, `display_name`, `avatar_url`, `created_at`
- Enabled **Row Level Security (RLS)** with policies:
  - Anyone can read profiles (for leaderboards)
  - Users can only insert/update their own profile
- Created a **trigger** (`handle_new_user`) that auto-creates a profile row when a new user signs up
- Fixed a security advisory about mutable `search_path` on the trigger function

### 4. Installed & Configured Supabase Client
- Installed `@supabase/supabase-js` npm package
- Created `src/supabaseClient.ts` — thin wrapper using `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Created `src/vite-env.d.ts` — TypeScript type definitions for `import.meta.env`
- Created `.env` with actual project credentials

### 5. Refactored `App.tsx` Auth Logic
| Before (Custom) | After (Supabase) |
|---|---|
| `fetch('/api/auth/google/url')` → popup window | `supabase.auth.signInWithOAuth({ provider: 'google' })` → redirect |
| `fetch('/api/auth/logout')` | `supabase.auth.signOut()` |
| `fetch('/api/user/me')` + `postMessage` listener | `supabase.auth.onAuthStateChange()` + `getSession()` |
| `fetch('/api/user/set-username')` | `supabase.from('profiles').update({ username })` |

### 6. Cleaned Up `server.ts`
- Removed all auth routes (`/api/auth/google/url`, `/auth/callback`, `/api/user/me`, `/api/user/set-username`, `/api/auth/logout`)
- Removed `better-sqlite3`, `express-session`, `cookie-parser`, `dotenv` imports
- Server is now just a Vite dev server / static file server

### 7. Deployment Configuration
- Updated `.env.example` with Supabase vars
- Added `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to Vercel environment variables
- Configured redirect URLs for both `localhost:3000` and `fandom-trivia.vercel.app`

---

## ❌ Problems Encountered

### 1. "Unsupported provider: provider is not enabled"
- **Cause**: Google provider was not yet enabled in Supabase Dashboard
- **Solution**: Had to go to Supabase Dashboard → Auth → Providers → Google, toggle it ON, and paste the Client ID and Client Secret
- **Lesson**: Supabase doesn't auto-enable providers — you must manually enable each one

### 2. Confusion About Vercel Access Tokens vs. Supabase Anon Key
- **Cause**: The Vercel env var setup asked for a value, and "Access Token" sounded like the Supabase anon key but they're completely different things
- **Solution**: Clarified that the Supabase anon key (starts with `eyJ...`) goes into `VITE_SUPABASE_ANON_KEY`, and Vercel Access Tokens are unrelated
- **Lesson**: These are two separate systems — Vercel tokens are for Vercel's API, Supabase keys are for Supabase's API

### 3. Google OAuth Redirect URI Configuration
- **Cause**: Need to configure redirect URIs in **three places** (Supabase, Google Cloud Console, and Vercel)
- **Solution**: Added the Supabase callback URL (`https://yurfplpwpdayemyxpbxr.supabase.co/auth/v1/callback`) to Google Cloud Console's authorized redirect URIs
- **Lesson**: OAuth always requires matching redirect URIs on both the identity provider side AND the relying party side

---

## 📁 Files Changed

| Action | File |
|--------|------|
| ✨ Created | `src/supabaseClient.ts` |
| ✨ Created | `src/vite-env.d.ts` |
| ✨ Created | `.env` |
| ✏️ Modified | `src/App.tsx` (auth logic) |
| ✏️ Modified | `server.ts` (stripped auth) |
| ✏️ Modified | `.env.example` |
| ✏️ Modified | `package.json` (added @supabase/supabase-js) |

---

## 💡 Tips for Next Time (Faster Supabase Auth Setup)

### Before Starting
1. **Create the Supabase project first** — it takes a minute to initialize
2. **Have your Google OAuth credentials ready** — download the JSON from Google Cloud Console beforehand
3. **Know your deployment URLs** upfront (e.g., `localhost:3000`, `your-app.vercel.app`)

### Configuration Checklist (Do All at Once)
Save time by doing all the config in one pass instead of hitting errors one by one:

- [ ] Create Supabase project
- [ ] Enable Google provider in **Supabase Dashboard → Auth → Providers**
- [ ] Paste Client ID + Secret
- [ ] Set **Site URL** and **Redirect URLs** in Supabase Dashboard → Auth → URL Configuration
- [ ] Add Supabase callback URL to **Google Cloud Console → Authorized redirect URIs**
- [ ] Add your app URLs to **Google Cloud Console → Authorized JavaScript origins**
- [ ] Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your hosting platform (Vercel, etc.)

### Code Pattern (Copy-Paste Ready)
The Supabase Auth pattern is always the same:
```typescript
// Login
supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } })

// Logout
supabase.auth.signOut()

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => { /* update UI */ })

// Check existing session
supabase.auth.getSession()
```

### Key Insight
> **Supabase Auth is 100% client-side.** You don't need any server-side auth routes. The Supabase JS client handles OAuth redirects, token storage, and session management entirely in the browser. This makes your server much simpler.

---

## ⏱️ Time Spent

- **Total session**: ~45 minutes
- **Planning & analysis**: ~15 minutes
- **Implementation**: ~15 minutes
- **Configuration & debugging**: ~15 minutes (mostly OAuth provider setup)

Most of the "debugging" time was spent on **configuration** (enabling the provider, setting redirect URIs). With the checklist above, this could be cut down to ~5 minutes next time.
