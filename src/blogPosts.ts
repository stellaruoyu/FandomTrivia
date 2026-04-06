export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  content: string;
  image: string;
  date: string;
  author: string;
  keywords: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'super-mario-galaxy-quiz',
    title: 'Super Mario Galaxy Trivia/Quiz',
    metaDescription: 'Are you a true Star Child? Test your knowledge with the ultimate Super Mario Galaxy quiz! From Rosalina to the Lumas, prove you\'re the master of the cosmos now.',
    date: '2026-04-05',
    author: 'Fandom Trivia Team',
    image: '/images/mario-galaxy-hero.jpg',
    keywords: ['Super Mario Galaxy quiz', 'Nintendo Wii trivia', 'Rosalina back story', 'Luma evolution', 'Comet Observatory lore'],
    content: `
      <p class="lead text-xl text-slate-300 mb-6">Launch into the 2007 Wii masterpiece that redefined the platforming genre. From the sweeping score of the <strong>Comet Observatory</strong> to the mind-bending gravity of the Far-Away Galaxy, <em>Super Mario Galaxy</em> is more than a game—it's a cosmic legend. But how much of the lore do you actually remember?</p>
      
      <div class="my-8 text-center">
        <a href="/trivia-mario-2026" class="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-primary/30">
          Take the Galaxy Quiz Now
        </a>
      </div>

      <h3 class="text-2xl font-bold mt-10 mb-4">Are You a True Star Child?</h3>
      <p>Before you dive into the deep-cut trivia, identify your cosmic counterpart:</p>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <li class="p-4 rounded-xl bg-slate-800/50 border border-slate-700"><strong>The Luma:</strong> Full of potential, ready to transform into a new world.</li>
        <li class="p-4 rounded-xl bg-slate-800/50 border border-slate-700"><strong>Rosalina:</strong> The stoic watcher of the stars with a heartbreaking <strong>Rosalina back story</strong>.</li>
        <li class="p-4 rounded-xl bg-slate-800/50 border border-slate-700"><strong>Mario:</strong> The gravity-defying hero chasing <strong>Grand Stars</strong>.</li>
        <li class="p-4 rounded-xl bg-slate-800/50 border border-slate-700"><strong>Bowser:</strong> The ambitious conqueror building a reactor at the center of the universe.</li>
      </ul>

      <h3 class="text-2xl font-bold mt-10 mb-4">Master the Luma Lore</h3>
      <p>To score 100%, you'll need to know more than just the jump button. Our <strong>Nintendo Wii trivia</strong> challenge dives into the details that separate casual fans from Star Masters:</p>
      <ul class="list-disc list-inside space-y-3 text-slate-300 my-6">
        <li><strong>Luma Evolution:</strong> What do Hungry Lumas eat to create new galaxies?</li>
        <li><strong>Galaxy Secrets:</strong> Where do you find the first Grand Star?</li>
        <li><strong>Forgotten Heroes:</strong> Who is Polari, the oldest Luma?</li>
      </ul>

      <div class="mt-12 p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-900/20 border border-primary/30 text-center">
        <h4 class="text-3xl font-black italic uppercase mb-4">The Ultimate Challenge</h4>
        <p class="text-slate-300 mb-8 max-w-md mx-auto">Can you beat <strong>Bowser's Galaxy Reactor</strong> and collect the 121st Star? Only 5% of fans manage a perfect score on our hardcore difficulty.</p>
        <a href="/trivia-mario-2026" class="inline-block bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-primary/40 scale-105">
          Start the Super Mario Galaxy Quiz
        </a>
      </div>
    `
  }

];
