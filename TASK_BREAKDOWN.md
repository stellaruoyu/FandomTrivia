# FandomTrivia — Task Breakdown (You vs. AI)

> For each roadmap task, here's exactly what **you** need to handle vs. what **I** can do for you.
>
> 👤 = **You** (human decisions, accounts, content sourcing, creative direction)
> 🤖 = **Me** (code, database, config, question generation, implementation)

---

## 📚 Phase 1: Content Expansion

### Harry Potter Books 3–7 (Priority: 17)

| Who | Task |
|-----|------|
| 👤 | Provide or confirm the source material (book text/notes) for Books 3–7 — like you did with `harrypotterbook1.md` and `harrypotterbook2.md` |
| 👤 | Review generated questions for accuracy (you're the fan, I might get details wrong) |
| 🤖 | Generate 20 multiple-choice trivia questions per book from the source material |
| 🤖 | Add questions to `constants.ts` with evidence citations |
| 🤖 | Add new quiz views and book selector entries in `App.tsx` |
| 🤖 | Update the HP Book Selector UI to show Books 3–7 |

### Taylor Swift Eras Trivia (Priority: 16)

| Who | Task |
|-----|------|
| 👤 | Decide which eras/albums to cover (all 11? top 5?) |
| 👤 | Provide any specific facts, Easter eggs, or deep-cuts you want included |
| 👤 | Review questions for accuracy (Swifties will roast wrong answers) |
| 👤 | Source or approve a hero image for the Taylor Swift universe card |
| 🤖 | Research and generate trivia questions per era/album |
| 🤖 | Create a new universe card, quiz view, and routing |
| 🤖 | Add all questions to `constants.ts` |
| 🤖 | Design an era-selector UI (similar to HP Book Selector) |

### Percy Jackson Trivia (Priority: 14)

| Who | Task |
|-----|------|
| 👤 | Provide source material or confirm which books (original 5? Heroes of Olympus?) |
| 👤 | Review generated questions for accuracy |
| 👤 | Source or approve a hero image |
| 🤖 | Generate trivia questions from the books |
| 🤖 | Create universe card, quiz view, routing, and all code |

### BTS Trivia (Priority: 14)

| Who | Task |
|-----|------|
| 👤 | Decide scope: discography? variety shows? members? concert moments? |
| 👤 | Review questions (K-Pop fans are very particular about accuracy) |
| 👤 | Source or approve a hero image |
| 🤖 | Research and generate trivia questions |
| 🤖 | Create universe card, quiz view, and all code |

### ACOTAR Trivia (Priority: 13)

| Who | Task |
|-----|------|
| 👤 | Provide source material or confirm which books to cover |
| 👤 | Review questions for accuracy |
| 👤 | Source or approve a hero image |
| 🤖 | Generate trivia questions from the books |
| 🤖 | Create universe card, quiz view, routing, and all code |

---

## 🎮 Phase 2: Engagement Features

### Share Results Card (Priority: 16)

| Who | Task |
|-----|------|
| 👤 | Approve the visual design of the share card (I'll generate a mockup for you) |
| 👤 | Decide which platforms to target (Instagram Stories, Twitter/X, TikTok, general download) |
| 🤖 | Design and implement the share card (HTML Canvas → image export) |
| 🤖 | Add share buttons to the quiz results screen |
| 🤖 | Implement Web Share API for native mobile sharing |
| 🤖 | Generate branded card templates per fandom |

### Daily Challenge (Priority: 15)

| Who | Task |
|-----|------|
| 👤 | Decide the rules: how many questions per day? Same for everyone or random? Streak rewards? |
| 👤 | Decide if daily challenges should rotate across fandoms or be fandom-specific |
| 🤖 | Create a Supabase `daily_challenges` table and scheduled function |
| 🤖 | Build the Daily Challenge UI with streak counter |
| 🤖 | Implement the streak tracking and reward logic |
| 🤖 | Add push notification support (if PWA is done) |

### Supabase Leaderboard (Priority: 15)

| Who | Task |
|-----|------|
| 👤 | Decide leaderboard rules: per-fandom? all-time + weekly + monthly? Top 10 or top 50? |
| 🤖 | Create Supabase `scores` table with RLS policies |
| 🤖 | Migrate the `saveScore` / `getLeaderboard` functions from localStorage to Supabase |
| 🤖 | Build a global leaderboard page with filters |
| 🤖 | Add real-time updates using Supabase Realtime (optional) |

### Achievement Badges (Priority: 12)

| Who | Task |
|-----|------|
| 👤 | Decide which achievements to include (I'll propose a list, you approve) |
| 👤 | Approve badge icon designs |
| 🤖 | Design badge icons or generate them |
| 🤖 | Create Supabase `achievements` and `user_achievements` tables |
| 🤖 | Implement achievement tracking and unlock logic |
| 🤖 | Build badge display on user profile and results screen |

### Timed Mode (Priority: 11)

| Who | Task |
|-----|------|
| 👤 | Decide time limit per question (10s? 15s? 20s?) and bonus point formula |
| 🤖 | Add timer component to `MCQuizView` |
| 🤖 | Implement speed-based scoring |
| 🤖 | Add a toggle to choose Normal vs. Timed mode before starting |

### "Quiz Me" AI Mode (Priority: 11)

| Who | Task |
|-----|------|
| 👤 | Verify your Gemini API key is active and has sufficient quota |
| 👤 | Test and review AI-generated question quality |
| 🤖 | Build the Gemini API integration for on-the-fly question generation |
| 🤖 | Design prompt engineering for high-quality trivia output |
| 🤖 | Create the UI for selecting topic + difficulty → AI generates quiz |
| 🤖 | Add caching to avoid re-generating the same questions |

---

## 👥 Phase 3: Social & Multiplayer

### Challenge a Friend (Priority: 13)

| Who | Task |
|-----|------|
| 👤 | Decide share format: link? QR code? In-app invite? |
| 👤 | Test with friends and give feedback on the UX |
| 🤖 | Create unique quiz session IDs stored in Supabase |
| 🤖 | Build the shareable link/invite system |
| 🤖 | Build the side-by-side score comparison page |
| 🤖 | Implement the "waiting for opponent" UI |

### Live Multiplayer (Priority: 11)

| Who | Task |
|-----|------|
| 👤 | Decide max players per lobby, game rules, tie-breaking |
| 👤 | Test extensively with multiple devices |
| 👤 | Consider: is this worth the effort at your current user count? (Recommend waiting for 1K+ users) |
| 🤖 | Set up Supabase Realtime channels for lobby sync |
| 🤖 | Build lobby creation, join, countdown, and live scoring |
| 🤖 | Handle disconnect/reconnect edge cases |
| 🤖 | Build the real-time question sync and answer validation |

---

## 💰 Phase 4: Monetization

### Freemium Model (Priority: 13)

| Who | Task |
|-----|------|
| 👤 | Decide pricing ($2.99? $3.99? $4.99/month?) |
| 👤 | Decide what's free vs. premium (daily quiz limit? exclusive fandoms? no ads?) |
| 👤 | Set up a Stripe account for payment processing |
| 👤 | Write terms of service and privacy policy |
| 🤖 | Integrate Stripe Checkout or Supabase + Stripe for subscriptions |
| 🤖 | Build the paywall UI and premium badge |
| 🤖 | Implement quiz-count tracking and gating logic |

### Non-intrusive Ads (Priority: 12)

| Who | Task |
|-----|------|
| 👤 | Create a Google AdSense account (requires domain verification) |
| 👤 | Decide ad placement (between quizzes only? leaderboard page?) |
| 👤 | Monitor ad revenue and user feedback |
| 🤖 | Integrate AdSense or ad network SDK |
| 🤖 | Implement ad slots at natural break points |
| 🤖 | Add ad-free logic for premium subscribers |

### Sponsored Quizzes (Priority: 13)

| Who | Task |
|-----|------|
| 👤 | Reach out to book publishers, movie studios, or streaming platforms |
| 👤 | Negotiate sponsorship deals and content requirements |
| 👤 | Provide branded assets (logos, images) from the sponsor |
| 🤖 | Build a "Sponsored Quiz" template with branding slot |
| 🤖 | Create the quiz content based on sponsor requirements |
| 🤖 | Add analytics tracking for sponsor reporting |

---

## 🛠️ Phase 5: Technical

### PWA (Priority: 14)

| Who | Task |
|-----|------|
| 👤 | Provide app icon (512×512 PNG) or approve one I generate |
| 👤 | Test installing on your phone and give feedback |
| 🤖 | Create `manifest.json` with app metadata |
| 🤖 | Implement service worker for offline caching |
| 🤖 | Add install prompt banner |
| 🤖 | Configure push notifications (if daily challenge is done) |

### SEO Landing Pages (Priority: 15)

| Who | Task |
|-----|------|
| 👤 | Register Google Search Console and verify your domain |
| 👤 | Submit sitemap once generated |
| 👤 | Monitor search traffic and rankings |
| 🤖 | Set up proper routing (`/quiz/harry-potter-sorcerers-stone`) |
| 🤖 | Add meta titles, descriptions, and Open Graph tags per quiz |
| 🤖 | Generate a `sitemap.xml` |
| 🤖 | Add JSON-LD structured data for quizzes |

### Mobile-First Redesign (Priority: 10)

| Who | Task |
|-----|------|
| 👤 | Test on your actual phone(s) and report issues |
| 👤 | Decide if bottom navigation is preferred over the current top nav |
| 🤖 | Audit and fix all touch targets (min 44×44px) |
| 🤖 | Add swipe gestures for question navigation |
| 🤖 | Optimize layout for small screens |
| 🤖 | Test across common screen sizes |

---

## 📊 Summary: Effort Split

| Phase | Your Tasks | My Tasks | Your Time Estimate |
|-------|-----------|----------|-------------------|
| **Content Expansion** | Source material, review questions, approve images | Generate questions, write code, build UI | ~1–2 hrs per fandom |
| **Engagement Features** | Make decisions on rules/format, approve designs | Full implementation | ~30 min per feature |
| **Social Features** | Test with friends, decide rules | Full implementation | ~1 hr per feature |
| **Monetization** | Create accounts (Stripe, AdSense), set pricing, legal docs | Full integration | ~2–3 hrs total |
| **Technical** | Register accounts, test on devices, submit sitemap | Full implementation | ~1 hr total |

> **Bottom line**: For most tasks, your job is **decisions + review + accounts**. My job is **code + implementation + content generation**. The ratio is roughly **80% me, 20% you** — but your 20% is the critical stuff that only a human can do (creative direction, account creation, quality review).
