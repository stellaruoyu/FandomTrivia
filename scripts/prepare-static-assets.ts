import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {BLOG_POSTS} from '../src/blogPosts.ts';
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from '../src/siteMeta.ts';

type SitemapEntry = {
  path: string;
  priority: string;
  changefreq?: string;
};

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const staticHtmlFiles = [
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'main.bundle.js'),
];
const sitemapTimeZone = 'America/Los_Angeles';

const sitemapEntries: SitemapEntry[] = [
  {path: '/', priority: '1.0', changefreq: 'daily'},
  {path: '/rankings', priority: '0.8', changefreq: 'daily'},
  {path: '/blog', priority: '0.7', changefreq: 'weekly'},
  {path: '/changelog', priority: '0.7', changefreq: 'weekly'},
  {path: '/privacy-policy', priority: '0.3', changefreq: 'monthly'},
  {path: '/terms-of-service', priority: '0.3', changefreq: 'monthly'},
  {path: '/cookie-policy', priority: '0.3', changefreq: 'monthly'},
  {path: '/selector-twilight', priority: '0.7'},
  {path: '/selector-harry-potter', priority: '0.7'},
  {path: '/selector-star-wars', priority: '0.7'},
  {path: '/selector-kpop', priority: '0.7'},
  {path: '/selector-wicked', priority: '0.7'},
  {path: '/selector-paw-patrol', priority: '0.7'},
  {path: '/selector-hoppers', priority: '0.7'},
  {path: '/selector-three-body', priority: '0.7'},
  {path: '/selector-zootopia', priority: '0.7'},
  {path: '/selector-despicable-me', priority: '0.7'},
  {path: '/selector-frozen', priority: '0.7'},
  {path: '/selector-moana', priority: '0.7'},
  {path: '/selector-cat-in-the-hat', priority: '0.7'},
  {path: '/selector-how-to-train-your-dragon', priority: '0.7'},
  {path: '/selector-avatar', priority: '0.7'},
  {path: '/selector-minecraft', priority: '0.7'},
  {path: '/selector-goat', priority: '0.7'},
  {path: '/selector-super-mario', priority: '0.7'},
  {path: '/selector-shrek', priority: '0.7'},
  {path: '/selector-bad-guys', priority: '0.7'},
  {path: '/selector-kung-fu-panda', priority: '0.7'},
  {path: '/selector-toy-story', priority: '0.7'},
  {path: '/selector-dog-man', priority: '0.7'},
  {path: '/trivia-kpop', priority: '0.6'},
  {path: '/trivia-wicked-part-1', priority: '0.6'},
  {path: '/trivia-wicked-part-2', priority: '0.6'},
  {path: '/trivia-wicked-random', priority: '0.6'},
  {path: '/trivia-twilight-mc', priority: '0.6'},
  {path: '/trivia-twilight-book', priority: '0.6'},
  {path: '/trivia-newmoon', priority: '0.6'},
  {path: '/trivia-eclipse', priority: '0.6'},
  {path: '/trivia-breakingdawn', priority: '0.6'},
  {path: '/trivia-midnightsun', priority: '0.6'},
  {path: '/trivia-lifeanddeath', priority: '0.6'},
  {path: '/trivia-twilight-random', priority: '0.6'},
  {path: '/trivia-harry-potter', priority: '0.6'},
  {path: '/trivia-harry-potter-cos', priority: '0.6'},
  {path: '/trivia-harry-potter-poa', priority: '0.6'},
  {path: '/trivia-harry-potter-gof', priority: '0.6'},
  {path: '/trivia-harry-potter-ootp', priority: '0.6'},
  {path: '/trivia-harry-potter-hbp', priority: '0.6'},
  {path: '/trivia-harry-potter-dh', priority: '0.6'},
  {path: '/trivia-harry-potter-random', priority: '0.6'},
  {path: '/trivia-star-wars-episode-i', priority: '0.6'},
  {path: '/trivia-star-wars-episode-ii', priority: '0.6'},
  {path: '/trivia-star-wars-episode-iii', priority: '0.6'},
  {path: '/trivia-star-wars-episode-iv', priority: '0.6'},
  {path: '/trivia-star-wars-episode-vi', priority: '0.6'},
  {path: '/trivia-star-wars-episode-vii', priority: '0.6'},
  {path: '/trivia-star-wars-episode-viii', priority: '0.6'},
  {path: '/trivia-star-wars-episode-ix', priority: '0.6'},
  {path: '/trivia-star-wars-episode-ii-expanded', priority: '0.6'},
  {path: '/trivia-star-wars-saga', priority: '0.6'},
  {path: '/trivia-star-wars-random', priority: '0.6'},
  {path: '/trivia-moana-1', priority: '0.6'},
  {path: '/trivia-moana-2', priority: '0.6'},
  {path: '/trivia-moana-random', priority: '0.6'},
  {path: '/trivia-cat-in-the-hat', priority: '0.6'},
  {path: '/trivia-httyd-1', priority: '0.6'},
  {path: '/trivia-httyd-2', priority: '0.6'},
  {path: '/trivia-httyd-3', priority: '0.6'},
  {path: '/trivia-httyd-random', priority: '0.6'},
  {path: '/trivia-avatar-1', priority: '0.6'},
  {path: '/trivia-avatar-2', priority: '0.6'},
  {path: '/trivia-avatar-3', priority: '0.6'},
  {path: '/trivia-avatar-random', priority: '0.6'},
  {path: '/trivia-minecraft', priority: '0.6'},
  {path: '/trivia-goat', priority: '0.6'},
  {path: '/trivia-hoppers', priority: '0.6'},
  {path: '/trivia-bad-guys-1', priority: '0.6'},
  {path: '/trivia-bad-guys-2', priority: '0.6'},
  {path: '/trivia-pawpatrol', priority: '0.6'},
  {path: '/trivia-shrek-1', priority: '0.6'},
  {path: '/trivia-shrek-2', priority: '0.6'},
  {path: '/trivia-shrek-3', priority: '0.6'},
  {path: '/trivia-shrek-4', priority: '0.6'},
  {path: '/trivia-shrek-random', priority: '0.6'},
  {path: '/trivia-three-body-problem', priority: '0.6'},
  {path: '/trivia-the-dark-forest', priority: '0.6'},
  {path: '/trivia-deaths-end', priority: '0.6'},
  {path: '/trivia-three-body-random', priority: '0.6'},
  {path: '/trivia-zootopia', priority: '0.6'},
  {path: '/trivia-zootopia-2', priority: '0.6'},
  {path: '/trivia-zootopia-random', priority: '0.6'},
  {path: '/trivia-despicableme-1', priority: '0.6'},
  {path: '/trivia-despicableme-2', priority: '0.6'},
  {path: '/trivia-despicableme-3', priority: '0.6'},
  {path: '/trivia-despicableme-4', priority: '0.6'},
  {path: '/trivia-despicableme-random', priority: '0.6'},
  {path: '/trivia-kfp-1', priority: '0.6'},
  {path: '/trivia-kfp-2', priority: '0.6'},
  {path: '/trivia-kfp-3', priority: '0.6'},
  {path: '/trivia-kfp-4', priority: '0.6'},
  {path: '/trivia-kfp-random', priority: '0.6'},
  {path: '/trivia-toy-story-1', priority: '0.6'},
  {path: '/trivia-toy-story-2', priority: '0.6'},
  {path: '/trivia-toy-story-3', priority: '0.6'},
  {path: '/trivia-toy-story-4', priority: '0.6'},
  {path: '/trivia-toy-story-random', priority: '0.6'},
  {path: '/trivia-dog-man-book1', priority: '0.6'},
  {path: '/trivia-dog-man-book2', priority: '0.6'},
  {path: '/trivia-dog-man-book3', priority: '0.6'},
  {path: '/trivia-dog-man-book4', priority: '0.6'},
  {path: '/trivia-dog-man-book5', priority: '0.6'},
  {path: '/trivia-dog-man-book6', priority: '0.6'},
  {path: '/trivia-dog-man-book7', priority: '0.6'},
  {path: '/trivia-dog-man-book8', priority: '0.6'},
  {path: '/trivia-dog-man-book9', priority: '0.6'},
  {path: '/trivia-dog-man-book10', priority: '0.6'},
  {path: '/trivia-dog-man-book11', priority: '0.6'},
  {path: '/trivia-dog-man-book12', priority: '0.6'},
  {path: '/trivia-dog-man-book13', priority: '0.6'},
  {path: '/trivia-dog-man-book14', priority: '0.6'},
  {path: '/trivia-dog-man-random', priority: '0.6'},
  {path: '/trivia-mario-2023', priority: '0.6'},
  {path: '/trivia-mario-2026', priority: '0.6'},
  {path: '/trivia-mario-random', priority: '0.6'},
  {path: '/trivia-frozen-1', priority: '0.6'},
  {path: '/trivia-frozen-2', priority: '0.6'},
  {path: '/trivia-frozen-random', priority: '0.6'},
  ...BLOG_POSTS.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
  })),
];

function replaceMeta(html: string): string {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${SITE_TITLE}</title>`)
    .replace(
      /<meta name="description" content="[\s\S]*?" \/>/,
      `<meta name="description" content="${SITE_DESCRIPTION}" />`,
    )
    .replace(
      /<meta name="keywords" content="[\s\S]*?" \/>/,
      `<meta name="keywords" content="${SITE_KEYWORDS}" />`,
    )
    .replace(
      /<meta property="og:url" content="[\s\S]*?" \/>/,
      `<meta property="og:url" content="${SITE_URL}/" />`,
    )
    .replace(
      /<meta property="og:title" content="[\s\S]*?" \/>/,
      `<meta property="og:title" content="${SITE_TITLE}" />`,
    )
    .replace(
      /<meta property="og:description" content="[\s\S]*?" \/>/,
      `<meta property="og:description" content="${SITE_DESCRIPTION}" />`,
    )
    .replace(
      /<meta property="og:image" content="[\s\S]*?" \/>/,
      `<meta property="og:image" content="${SITE_OG_IMAGE}" />`,
    )
    .replace(
      /<meta property="twitter:url" content="[\s\S]*?" \/>/,
      `<meta property="twitter:url" content="${SITE_URL}/" />`,
    )
    .replace(
      /<meta property="twitter:title" content="[\s\S]*?" \/>/,
      `<meta property="twitter:title" content="${SITE_TITLE}" />`,
    )
    .replace(
      /<meta property="twitter:description" content="[\s\S]*?" \/>/,
      `<meta property="twitter:description" content="${SITE_DESCRIPTION}" />`,
    )
    .replace(
      /<meta property="twitter:image" content="[\s\S]*?" \/>/,
      `<meta property="twitter:image" content="${SITE_OG_IMAGE}" />`,
    );
}

function syncStaticHtml(): void {
  for (const file of staticHtmlFiles) {
    const current = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, replaceMeta(current), 'utf8');
  }
}

function buildSitemapXml(): string {
  const lastmod = new Intl.DateTimeFormat('en-CA', {
    timeZone: sitemapTimeZone,
  }).format(new Date());
  const xmlEntries = sitemapEntries
    .map(({path: routePath, priority, changefreq}) => {
      const lines = [
        '  <url>',
        `    <loc>${SITE_URL}${routePath}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
      ];

      if (changefreq) {
        lines.push(`    <changefreq>${changefreq}</changefreq>`);
      }

      lines.push(`    <priority>${priority}</priority>`);
      lines.push('  </url>');
      return lines.join('\n');
    })
    .join('\n');

  return ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', xmlEntries, '</urlset>', ''].join('\n');
}

function writeSitemap(): void {
  const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, buildSitemapXml(), 'utf8');
}

syncStaticHtml();
writeSitemap();
