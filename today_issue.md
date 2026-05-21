## Summary
This issue records the work completed for GitHub issue `#26` (`add a change log on website`) in the `FandomTrivia` app on 2026-05-20.

Issue source:
- Title: `add a change log on website`
- Request: add an on-site changelog similar to the Boxy SVG style, distinguish feature updates from change updates, and make new website items directly clickable from each release entry.

## Completed app changes
- Added a dedicated website changelog route at `/changelog`.
- Built a visual release-notes page with structured update cards instead of a plain text dump.
- Added labeled release types:
  - `Feature Update`
  - `Change Update`
- Added direct action links inside each release entry so users can click straight into the newly added quiz pages, selector pages, and blog entries.

## Changelog content now included on the website
The new changelog page currently includes release entries for:
- Disneyland hub launch
- GOAT universe launch
- The Bad Guys expansion
- Wicked expansion
- Speed leaderboard updates

## Discovery and navigation updates
- Added a `Changelog` link to the main site navigation.
- Added a `Changelog` link in the site footer.
- Added a `View Changelog` CTA on the News & Blog page.
- Added changelog search support so searches for release/update terms can route users to `/changelog`.
- Added `/changelog` to the generated sitemap.

## Important behavior delivered
- Users can click release CTA buttons and go directly to the newly added content.
- The changelog is now part of the actual product website, not just a repo markdown file.
- Contributor-facing `changelog.md` remains available, while the website uses structured app data for the public-facing release notes UI.

## Validation performed
- Ran `npm run build`
- Ran `npm run lint`
- Both passed successfully

## Files touched
- `src/changelogEntries.ts`
- `src/App.tsx`
- `src/constants.ts`
- `scripts/prepare-static-assets.ts`
- `changelog.md`
