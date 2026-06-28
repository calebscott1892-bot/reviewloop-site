/**
 * Prerender → static HTML (pure Node, no browser).
 *
 * 1. Renders <App/> to HTML via the SSR build (dist-server/entry-server.js).
 * 2. Injects the rendered markup into <div id="root"> in the client index.html.
 * 3. Injects <title>/meta/OG/Twitter/JSON-LD into <head> from src/lib/seo.js.
 * 4. Overwrites dist/index.html and cleans up the SSR build.
 *
 * Mirrors the intent of C4's scripts/prerender.mjs but, since this site is fully
 * static, uses Vite SSG instead of a Playwright capture — so it runs anywhere,
 * including CI with no browser.
 */
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const { render, renderLanding } = await import(resolve(root, 'dist-server/entry-server.js'));
const { renderHead, landingSchemas } = await import(resolve(root, 'src/lib/seo.js'));
const { seo } = await import(resolve(root, 'src/data/product.js'));
const { landingPages, landingMeta } = await import(resolve(root, 'src/data/landingPages.js'));

const templatePath = resolve(root, 'dist/index.html');
const template = await readFile(templatePath, 'utf8');

/**
 * Inject prerendered markup + head into the Vite client template.
 * `staticPage` marks standalone guide pages so the client entry skips hydration
 * (they ship the homepage <App> bundle but must render their own server markup).
 */
function buildHtml(appHtml, head, staticPage = false) {
  const rootOpen = staticPage ? '<div id="root" data-static="true">' : '<div id="root">';
  let out = template.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `${rootOpen}${appHtml}</div>`
  );
  if (out.includes('<!--app-head-->')) {
    out = out.replace('<!--app-head-->', head);
  } else {
    out = out.replace('</head>', `    ${head}\n  </head>`);
  }
  return out;
}

// ── Homepage ──
const homeHtml = render();
await writeFile(templatePath, buildHtml(homeHtml, renderHead()), 'utf8');

// ── Programmatic-SEO landing pages → dist/<slug>/index.html ──
for (const page of landingPages) {
  const meta = landingMeta(page);
  const head = renderHead({ ...meta, schemas: landingSchemas(meta) });
  const appHtml = renderLanding(page.slug);
  const dir = resolve(root, 'dist', page.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, 'index.html'), buildHtml(appHtml, head, true), 'utf8');
}

// ── robots.txt + sitemap.xml — URLs single-sourced from seo.url + landing data ──
const origin = new URL(seo.url).origin;
await writeFile(
  resolve(root, 'dist/robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
  'utf8'
);

const urls = [
  { loc: seo.url, changefreq: 'weekly', priority: '1.0' },
  ...landingPages.map((p) => ({
    loc: `${seo.url}/${p.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;
await writeFile(resolve(root, 'dist/sitemap.xml'), sitemap, 'utf8');

await rm(resolve(root, 'dist-server'), { recursive: true, force: true });

console.log(
  `✓ Prerendered dist/index.html (${(homeHtml.length / 1024).toFixed(1)}kb) + ` +
    `${landingPages.length} landing pages [${landingPages.map((p) => p.slug).join(', ')}] + robots.txt + sitemap.xml`
);
