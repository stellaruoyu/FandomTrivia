# 🧛 Twilight Multiple-Choice Quiz — Task Checklist

## Goal

Add a **multiple-choice** Twilight quiz (separate from the existing open-ended Vol. I) using the same MCQuizView format as K-Pop: Demon Hunters.

---

## 🧑 Your Tasks (User)

- [ ] **Write 15–30 multiple-choice questions** in this format:
  ```json
  {
    "question": "Your question here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option B"
  }
  ```
- [ ] **Decide the label** — e.g., "Twilight Vol. II" or "Twilight: Multiple Choice"
- [ ] **Send questions to AI** (paste JSON, text, or any format)
- [ ] **Review on Vercel** after deploy — use the checklist below

### Data You Need to Provide

| Field | Required | Notes |
|-------|----------|-------|
| Questions (15–30) | ✅ | Any format works, AI will convert |
| 4+ answer options per question | ✅ | Must include the correct one |
| Correct answer per question | ✅ | Use `null` if unsure (becomes "Fun Mode") |
| Quiz label / volume name | ✅ | e.g., "Vol. II — Multiple Choice" |

---

## 🤖 AI Tasks

- [ ] Add `TWILIGHT_MC_TRIVIA` array to `constants.ts`
- [ ] Add `'trivia-twilight-mc'` to `ViewType` in `App.tsx`
- [ ] Wire a new `MCQuizView` instance with Twilight data + theming
- [ ] Connect to universe card (add button or second quiz option on Twilight card)
- [ ] Set `saveScore()` label to new quiz name
- [ ] `npm run build` → verify → commit → push

---

## ✅ Your Review Checklist (After Deploy)

### Questions
- [ ] All questions display correctly
- [ ] All answers are factually correct
- [ ] Option count per question looks right (no missing/extra options)

### Quiz Flow
- [ ] Clicking an option highlights it correctly (green = right, red = wrong)
- [ ] "Fun Mode" banner shows for questions without a set answer
- [ ] "Next Question" button appears after selecting an answer
- [ ] Progress bar and question dots update properly
- [ ] "See Results" appears on the last question

### Results & Leaderboard
- [ ] Score and percentage are accurate
- [ ] "Save to Leaderboard" works and score appears in dashboard
- [ ] "Play Again" resets everything
- [ ] "Back to Home" navigates to landing page

### Deployment
- [ ] Live at [fandom-trivia.vercel.app](https://fandom-trivia.vercel.app)
- [ ] No console errors

---

## 📌 Status

> **Waiting on:** Your multiple-choice questions. Send them whenever ready!
