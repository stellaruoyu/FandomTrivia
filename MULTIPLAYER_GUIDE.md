# How to Build Real-Time Multiplayer — A Guide for Young Developers

> **Who is this for?** Anyone around 13 years old who knows a little HTML/JavaScript and wants to understand how multiplayer games work on the internet.

---

## Part 1 — The Simplest Possible Example

Let's forget about code for one second. Imagine this:

You and your friend are both holding **walkie-talkies**. When you press the button and say "I answered Question 3!", your friend hears it immediately. They don't have to call you — they just *hear* it in real time.

That's exactly how **real-time multiplayer** works on the web.

### The "Walkie-Talkie" in Code Is Called a WebSocket

A normal website works like sending a letter:
1. You write a letter (HTTP request)
2. You mail it to the server
3. The server mails one back (HTTP response)
4. Done. The conversation is over.

A **WebSocket** is different:
1. You open a *permanent phone call* with the server
2. Either side can talk *at any time*
3. The call stays open the whole time you're playing

Here's the simplest WebSocket demo you can write:

```javascript
// ---- SERVER (Node.js) ----
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const players = []; // keep track of everyone connected

server.on('connection', (socket) => {
  players.push(socket);
  console.log('A player joined! Total:', players.length);

  // When this player sends a message, forward it to EVERYONE
  socket.on('message', (message) => {
    players.forEach((player) => {
      player.send(message); // broadcast to all
    });
  });
});
```

```javascript
// ---- CLIENT (browser) ----
const socket = new WebSocket('ws://localhost:8080');

// Send my progress to everyone
function sendProgress(questionNumber) {
  socket.send(JSON.stringify({ player: 'Alice', question: questionNumber }));
}

// Listen for other players' progress
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data.player, 'is on question', data.question);
};
```

That's it. **Under 30 lines of code** and you have a working multiplayer system.

---

## Part 2 — Why Is It Actually Hard?

The simple example above breaks the moment real life gets involved. Here are the **5 hardest problems** in multiplayer:

### Problem 1: What if someone disconnects?

Your friend's Wi-Fi drops mid-game. Now their "ghost" is stuck on the leaderboard. You need to detect disconnections and remove them.

### Problem 2: Everyone needs the same questions in the same order

If Alice's browser shuffles questions differently than Bob's browser, they're not really playing the same game. **The host must generate one order and send it to everyone.**

### Problem 3: The "start" must be synchronized

If Alice starts 3 seconds before Bob, she has an unfair advantage. You need a **countdown** that starts for everyone at the exact same moment.

### Problem 4: What if two people create a room with the same code?

Room codes like `"ABC123"` must be **unique**. You need a database to check if the code already exists before creating it.

### Problem 5: Security — can anyone cheat?

If score updates come from the client (the player's own browser), a sneaky player could just send `{ score: 100 }` without actually answering questions. In serious games, the **server must verify answers**, not trust the client.

> In our FandomTrivia app, we accepted this tradeoff — the client tracks its own score. This is fine for a friendly game, but something to think about!

---

## Part 3 — The Three Approaches (From Easy to Advanced)

### Approach A — Supabase Realtime ⭐ (What we built)

**Supabase** is a service that gives you a database + real-time features without running your own server.

It has two tools:
- **Presence** — "Who is in this room right now, and what are they doing?"
- **Broadcast** — "Send a message to everyone in this room instantly"

Think of it like a **shared Google Doc**. When you type, others see it update in real time. Supabase does the same for your game state.

```
[Player A's Browser] ──┐
[Player B's Browser] ──┤── Supabase Realtime ── Database
[Player C's Browser] ──┘
```

**Best for:** Small projects, beginners, apps that already use Supabase.

---

### Approach B — Socket.io on Your Own Server

You run a Node.js server that manages rooms and players yourself.

```
[Player A] ──┐
[Player B] ──┤── Your Node.js Server (in-memory rooms) ── Optional Database
[Player C] ──┘
```

**Best for:** When you want full control, or you're building something big.

---

### Approach C — Hosted Multiplayer Services (Liveblocks, PartyKit)

Companies like **Liveblocks** or **PartyKit** give you multiplayer as a service. You don't run any server at all — you just call their API.

**Best for:** When you want the fastest setup possible.

---

## Part 4 — Core Code Walkthrough

Here is how our actual FandomTrivia multiplayer works, explained step by step.

### Step 1: Create a Room

When the host clicks "Create Room", we:
1. Generate a random 6-character code (like `"X4KP2M"`)
2. Save it to the Supabase `rooms` table
3. Subscribe to a Supabase Realtime channel named `"room:X4KP2M"`

```typescript
// Generate a random room code
function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code; // e.g. "X4KP2M"
}

// Save to database
const { data } = await supabase
  .from('rooms')
  .insert({
    code: 'X4KP2M',
    quiz_id: 'Harry Potter',
    host_user_id: myUserId,
    status: 'waiting'
  })
  .select()
  .single();
```

---

### Step 2: Subscribe to the Room Channel

Everyone who joins the room subscribes to the same Realtime channel. This is like everyone tuning to the same walkie-talkie frequency.

```typescript
const channel = supabase.channel('room:X4KP2M', {
  config: {
    presence: { key: myUserId } // use my ID as my "slot"
  }
});

channel
  // Presence: fires whenever anyone joins, leaves, or updates their state
  .on('presence', { event: 'sync' }, () => {
    const state = channel.presenceState();
    // state looks like:
    // {
    //   "user-123": [{ username: "Alice", progress: 5, score: 3 }],
    //   "user-456": [{ username: "Bob",   progress: 3, score: 2 }]
    // }
    const players = Object.values(state).map(arr => arr[0]);
    updateLeaderboard(players); // re-draw the race track
  })

  // Broadcast: fires when the host sends a "game_start" event
  .on('broadcast', { event: 'game_start' }, ({ payload }) => {
    startGame(payload.questionOrder); // everyone starts at the same time
  })

  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      // Announce yourself to the room
      await channel.track({
        username: 'Alice',
        progress: 0,
        score: 0,
        finished: false
      });
    }
  });
```

---

### Step 3: The Host Starts the Game

When the host clicks "Start Game":
1. Generate a shuffled list of question indices (e.g. `[4, 12, 0, 7, ...]`)
2. Save it to the database (so late joiners can fetch it)
3. **Broadcast** it to all players

```typescript
async function startGame() {
  // Shuffle question indices
  const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // there are 10 questions
  const shuffled = indices.sort(() => Math.random() - 0.5); // shuffle randomly
  // e.g. shuffled = [4, 12, 0, 7, 3, 9, 1, 6, 5, 2]

  // Save to database
  await supabase
    .from('rooms')
    .update({ status: 'playing', question_order: shuffled })
    .eq('id', roomId);

  // Tell everyone to start (Broadcast doesn't echo back to the sender)
  await channel.send({
    type: 'broadcast',
    event: 'game_start',
    payload: { questionOrder: shuffled }
  });

  // The host handles it locally too (since they won't receive their own broadcast)
  startGame(shuffled);
}
```

---

### Step 4: Update Progress in Real Time

Every time a player answers a question, they update their **Presence state**. All other players receive this update automatically.

```typescript
function onAnswerSubmitted(isCorrect: boolean) {
  myProgress++;
  if (isCorrect) myScore++;

  // Push my new state to all other players
  channel.track({
    username: 'Alice',
    progress: myProgress, // how many questions I've answered
    score: myScore,       // how many I got right
    finished: myProgress >= totalQuestions
  });
}
```

On every other player's screen, the Presence sync fires and their race track re-renders with Alice's new progress. ✨

---

### Step 5: Show the Final Results

When everyone finishes, we sort players by score (then by completion time as a tiebreaker):

```typescript
const sortedPlayers = [...players].sort((a, b) => {
  if (b.score !== a.score) return b.score - a.score;      // higher score wins
  return (a.completionSecs ?? 999) - (b.completionSecs ?? 999); // faster time wins
});
```

---

## Part 5 — The Database Table

The `rooms` table in Supabase stores one row per game room:

```sql
CREATE TABLE public.rooms (
  id              UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT    UNIQUE NOT NULL,      -- the 6-char invite code
  quiz_id         TEXT    NOT NULL,             -- which quiz is being played
  host_user_id    UUID    NOT NULL,             -- who created the room
  status          TEXT    DEFAULT 'waiting',    -- waiting | playing | finished
  question_order  JSONB   DEFAULT NULL,         -- [4, 12, 0, 7, ...] after game starts
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

**Row Level Security (RLS)** controls who can do what:
- **Anyone** can read rooms (to look up a code)
- **Logged-in users** can create a room (only for themselves)
- **Only the host** can update a room (to start the game)

---

## Part 6 — Assignment 🎯

Build your own **2-player number guessing game** using Supabase Realtime.

### Rules of the game:
- Player 1 thinks of a number between 1 and 100
- Player 2 tries to guess it
- After each guess, Player 1 broadcasts "higher" or "lower"
- The game ends when Player 2 guesses correctly

### Requirements:
1. Create a Supabase project (free at supabase.com)
2. Create a `games` table with columns: `id`, `code`, `secret_number`, `status`
3. Player 1 creates a game room and secretly stores the number
4. Player 2 joins by entering the room code
5. Use Supabase Broadcast to send "higher" / "lower" / "correct" hints
6. Show the number of guesses it took at the end

### Bonus challenges:
- Add a timer — Player 2 has 60 seconds to guess
- Show both players' cursors moving on a number line in real time (use Presence!)
- Save high scores to a leaderboard

---

## Part 7 — Quiz ❓

Test yourself! Answer these questions after reading this guide.

**Q1.** What is the main difference between a regular HTTP request and a WebSocket connection?

> A) HTTP is faster
> B) WebSocket keeps the connection open so both sides can talk at any time
> C) WebSocket only works on mobile
> D) HTTP is more secure

**Q2.** In our app, why does the HOST generate the question order instead of each player doing it themselves?

> A) The host has a faster computer
> B) So everyone answers the same questions in the same sequence
> C) Because the database only allows the host to write
> D) To make the game harder

**Q3.** What does Supabase **Presence** do?

> A) Stores player scores permanently
> B) Sends one-way push notifications
> C) Tracks who is currently connected and what their live state is
> D) Handles user authentication

**Q4.** Why does the host need to call `startGame()` locally even after broadcasting it?

> A) The broadcast has a delay
> B) Supabase Broadcast does not send messages back to the sender
> C) The database needs to be updated first
> D) The host's internet is usually faster

**Q5.** What is a potential security problem with letting the client report its own score?

> A) It uses too much bandwidth
> B) A cheating player could just send `{ score: 100 }` without actually playing
> C) The score might be rounded incorrectly
> D) It only works with Google accounts

<details>
<summary>Answers (don't peek!)</summary>

1. **B**
2. **B**
3. **C**
4. **B**
5. **B**

</details>

---

## Part 8 — AI Prompts

If you want an AI (like Claude or ChatGPT) to help you build this, here are prompts that actually work.

### Prompt 1 — Build from scratch

```
I'm building a real-time multiplayer trivia game using React and Supabase.
I want players to be able to:
- Create a room and get a shareable 6-character room code
- Join a room by entering the code
- See all other players in a waiting lobby
- Have the host start the game for everyone simultaneously
- See each other's progress in real time during the quiz
- See a final leaderboard when everyone finishes

Tech stack: React 19, TypeScript, Supabase (supabase-js v2), Tailwind CSS.

Please create:
1. The SQL for the rooms table with RLS policies
2. A MultiplayerLobby React component
3. The Supabase Realtime channel subscription logic using Presence and Broadcast

Keep the code clean and explain what each part does.
```

---

### Prompt 2 — Debug a specific problem

```
I'm using Supabase Realtime Presence in React. When a player answers a question,
I call channel.track() to update their progress. But other players don't see
the update until they refresh the page.

Here is my current code:
[paste your code here]

What could be causing this, and how do I fix it?
```

---

### Prompt 3 — Add a feature

```
I have a working multiplayer quiz game using Supabase Realtime.
Right now all players go at their own pace.

I want to add a "Question Timer" mode where:
- Everyone sees the same question at the same time
- There's a 15-second countdown for each question
- When the timer runs out, everyone moves to the next question automatically
- The host's timer controls everyone's timer (synced via Broadcast)

Here is my current MultiplayerQuizView component:
[paste your component here]

How should I modify it to add this feature?
```

---

### Prompt 4 — Explain code to you

```
I'm 13 years old and learning to code. Can you explain this code to me like
I'm a beginner? I don't understand what "Presence" means or why we use it.

[paste the code you don't understand]

Please:
- Use a simple real-world analogy
- Explain each line in plain English
- Tell me what would happen if we removed this part
```

---

### Tips for Getting Better AI Answers

| Do this ✅ | Not this ❌ |
|-----------|-----------|
| Paste your actual code | "fix my multiplayer" |
| Describe the exact bug | "it doesn't work" |
| Say what you've already tried | "help me" |
| Specify your tech stack | "using javascript" |
| Ask for explanations, not just fixes | "just give me the answer" |

---

## Glossary

| Word | What it means |
|------|--------------|
| **WebSocket** | A permanent, two-way connection between browser and server |
| **Presence** | Supabase feature that tracks who is online and their live state |
| **Broadcast** | Supabase feature that sends a message to everyone in a channel |
| **Channel** | A named room that players subscribe to (like a walkie-talkie frequency) |
| **RLS** | Row Level Security — database rules that control who can read/write data |
| **Host** | The player who created the room and controls when the game starts |
| **Latency** | The delay between sending a message and someone receiving it |
| **Race condition** | A bug where two things happen at the same time and break each other |

---

*Built with FandomTrivia — a real-world open source project. All code examples in this guide are taken from the actual codebase.*
