## Summary
This issue records the work completed on 2026-05-03 for the `FandomTrivia` app.

## Completed app changes
- Added a new `The Bad Guys` universe/section.
- Added two new quizzes:
  - `The Bad Guys`
  - `The Bad Guys 2`
- Added quiz routing, selector page, title mapping, universe mapping, search mapping, daily challenge routing, and footer navigation.
- Added official movie cover art for the Bad Guys quiz cards.

## Trivia data added
- Added `BAD_GUYS_1_TRIVIA` dataset from `badguys1.md`.
- Added `BAD_GUYS_2_TRIVIA` dataset from `badguys2.md`.

## Blog content added
- Added a new SEO blog post for `The Bad Guys 2 quiz`.
- Included internal CTA links directly to `/trivia-bad-guys-2`.
- Added optimized metadata and keyword-focused content for search traffic.

## Badge work completed
- Added two quiz-specific badges:
  - `Golden Dolphin Crew` for `The Bad Guys`
  - `Bad Girls Target` for `The Bad Guys 2`
- Added exact badge matching support with `targetQuizExact` so `The Bad Guys` does not incorrectly unlock on `The Bad Guys 2`.

## Instruction / onboarding UI updates
- Made the welcome and instruction modal more colorful and more playful.
- Converted plain-text steps into styled step cards.
- Added a highlighted tip block.
- Rewrote the welcome copy and `How it works` copy to be more fun and readable.

## Deployment / domain finding
The code changes are present locally and build successfully, but the custom domain is not serving the same deployment as the Vercel preview/production domain.

### Verified issue
- `fandom-trivia.vercel.app` resolves to Vercel.
- `fandom-trivia.com` currently resolves to `216.198.79.1` and is not pointing to Vercel.
- Result: changes appear on `fandom-trivia.vercel.app` but not on `fandom-trivia.com`.

## Required follow-up
Update DNS for the custom domain so it points to Vercel.

Recommended Vercel DNS setup:
- Apex/root `@` A record -> `76.76.21.21`
- `www` CNAME -> `cname.vercel-dns.com`

Also verify in the Vercel dashboard that `fandom-trivia.com` is attached to the correct `fandom-trivia` project.

## Validation performed
- Ran `npm run build`
- Build passed successfully after all changes

## Files touched
- `src/constants.ts`
- `src/App.tsx`
- `src/blogPosts.ts`
