# 📋 Quiz Bank Update — Standard Operating Procedure

## Overview

This document divides responsibilities for adding new trivia quizzes to FandomTrivia and provides a step-by-step checklist.

---

## 🧑 Your Responsibilities (User)

1. **Write the trivia questions** — 15–30 questions per quiz
2. **Provide each question** in this format:
   ```
   Q: [Your question here]
   A: [The answer]
   Insight: [A fun fact or context about why this answer matters]
   Source Evidence: [Direct quote or reference backing your answer
                     — e.g., book page number, chapter, episode, etc.]
   ```

   **Source Evidence Example (Twilight):**
   ```
   Q: What year was Edward's Volvo manufactured?
   A: Late 1950s or early 1960s
   Insight: Edward's car history is a fun detail that hints at his age.
   Source Evidence: "He bought it in 1984, I think… Well, no. I think it
                     was new in the early sixties or late fifties at the
                     earliest," he admitted sheepishly. — Chapter 1
   ```
3. **Decide the quiz metadata**:
   - Quiz name (e.g., "Harry Potter")
   - Universe ID (e.g., `harry-potter`) — must match one in `UNIVERSES`
   - Tags (e.g., `['Magic', 'Classic']`)
   - Volume label (e.g., "Vol. II" if adding to an existing universe)
4. **Review the final result** on the Vercel preview deploy

---

## 🤖 My Responsibilities (AI)

1. **Format your questions** into the `TriviaQuestion[]` TypeScript array in `constants.ts`
2. **Register the quiz** — add a new exported array (e.g., `HARRY_POTTER_TRIVIA`)
3. **Create the view route** — add the new `ViewType` and wire it into `App.tsx`
4. **Connect the universe card** — make the button on the landing page navigate to the new quiz
5. **Update the score label** — set the quiz name used in `saveScore()` for leaderboard tracking
6. **Build & push** — verify the build passes and push to `main` for auto-deploy

---

## 📝 Detailed SOP

### Step 1 — Prepare Questions (You)

Write your questions in **any format** (Google Doc, plain text, message). Minimum info per question:

| Field | Required | Example |
|-------|----------|---------|
| Question | ✅ | "What is the name of Dumbledore's phoenix?" |
| Answer | ✅ | "Fawkes" |
| Insight | ✅ | "Fawkes saved Harry in the Chamber of Secrets by healing him with his tears." |

> [!TIP]
> Aim for 20–30 questions for a good quiz length. You can always add more volumes later.

### Step 2 — Hand Off to Me (You → AI)

Send me:
1. Your list of questions (in any format)
2. Which universe this is for (existing or new)
3. If new universe: name, description, tags, and an image URL (or I'll use a placeholder)

### Step 3 — I Add the Quiz (AI)

I will edit these two files:

| File | What I Do |
|------|-----------|
| `src/constants.ts` | Add the new `TriviaQuestion[]` array |
| `src/App.tsx` | Add new `ViewType`, route, quiz view reference, and universe card click handler |

### Step 4 — Build & Deploy (AI)

1. Run `npm run build` to verify
2. Commit & push to `main`
3. Vercel auto-deploys within ~60 seconds

### Step 5 — Review (You)

Open [fandom-trivia.vercel.app](https://fandom-trivia.vercel.app) and verify.

---

## ✅ Your Review Checklist

Use this checklist **each time** a new quiz is added:

### Questions
- [ ] All questions display correctly (no typos, no missing text)
- [ ] All answers are factually correct
- [ ] All insights make sense and add value
- [ ] Question count matches what you sent

### Navigation
- [ ] Universe card on the landing page has the correct title, description, and tags
- [ ] Clicking the universe card button opens the correct quiz
- [ ] "Back" button returns to the landing page
- [ ] Quiz header shows the correct universe name and volume

### Quiz Flow
- [ ] "Reveal Answer" button shows the answer and insight
- [ ] "I Knew It" / "Didn't Know" buttons work and advance to the next question
- [ ] Progress bar updates correctly
- [ ] Question dots at the bottom reflect answered status (green/red/neutral)
- [ ] Previous/Next buttons work

### Results Screen
- [ ] Score shows correct count out of total
- [ ] Percentage and grade label are accurate
- [ ] "Save to Leaderboard" prompts for name and saves
- [ ] "Play Again" resets the quiz
- [ ] "Back to Home" returns to landing page

### Deployment
- [ ] Site loads at [fandom-trivia.vercel.app](https://fandom-trivia.vercel.app)
- [ ] No console errors in browser DevTools
- [ ] Images load for all universe cards

---

## 🗂 Current Quiz Status

| Universe | Quiz | Questions | Status |
|----------|------|-----------|--------|
| Twilight | Vol. I — Open-Ended | 30 | ✅ Live |
| Twilight | Vol. II — Multiple Choice | 10 | ✅ Live |
| K-Pop: Demon Hunters | Multiple Choice | 13 | ✅ Live |
| Harry Potter: Sorcerer's Stone | Multiple Choice | 20 | ✅ Live |
| Harry Potter: Chamber of Secrets | Multiple Choice | 20 | ✅ Live |
| Harry Potter | — | — | ⬜ Not started |

---

## 📁 File Reference

| File | Purpose |
|------|---------|
| [`src/constants.ts`](file:///c:/Users/ruoyu/OneDrive/Documents/Project/FandomTrivia/FandomTrivia/src/constants.ts) | All quiz data, universe metadata, leaderboard logic |
| [`src/App.tsx`](file:///c:/Users/ruoyu/OneDrive/Documents/Project/FandomTrivia/FandomTrivia/src/App.tsx) | Views, routing, quiz UI components |

> [!NOTE]
> The `MCQuizView` component is fully generic — it accepts `questions`, `title`, `scoreLabel`, and `grades` as props. Adding a new MC quiz only requires adding the data and one route line.
