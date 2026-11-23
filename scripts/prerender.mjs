// Prerenders every route to static HTML with its own <head>, then writes sitemap.xml.
// Runs after `vite build` (client) and `vite build --ssr` (server entry).
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const { render, ROUTES, resolveRoute, getHead, renderHeadTags, SITE_URL } = ssr;

let template = await readFile(path.join(dist, 'index.html'), 'utf-8');

// Inline the (small) CSS bundle so first paint does not wait on an extra request.
const cssLink = template.match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/);
if (cssLink) {
  const css = await readFile(path.join(dist, cssLink[1]), 'utf-8');
  template = template.replace(cssLink[0], `<style>${css}</style>`);
}
// Move the app script to the end of <body> at low fetch priority: the page is
// fully prerendered, so text and the hero image should load before hydration JS.
const appScript = template.match(/<script type="module" crossorigin src="[^"]+"><\/script>/);
if (appScript) {
  template = template
    .replace(appScript[0], '')
    .replace('</body>', `  ${appScript[0].replace('<script ', '<script fetchpriority="low" ')}
  </body>`);
}
for (const marker of ['<!--app-head-->', '<div id="root"></div>']) {
  if (!template.includes(marker)) throw new Error(`Marker ${marker} missing from dist/index.html`);
}

const heroPreload =
  '<link rel="preload" as="image" href="/images/hero-lab-960.webp" imagesrcset="/images/hero-lab-640.webp 640w, /images/hero-lab-960.webp 960w, /images/hero-lab.webp 1376w" imagesizes="(min-width: 1024px) 560px, calc(100vw - 32px)" fetchpriority="high" />';

const outFile = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`);

async function writePage(url, file) {
  const route = resolveRoute(url);
  const head = renderHeadTags(getHead(route)) + (route.type === 'home' ? `\n    ${heroPreload}` : '');
  const html = template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`);
  const dest = path.join(dist, file);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, html);
  return html.length;
}

for (const url of ROUTES) {
  const size = await writePage(url, outFile(url));
  console.log(`  ✓ ${url.padEnd(36)} ${(size / 1024).toFixed(1)} KB`);
}
await writePage('/404', '404.html');

const today = new Date().toISOString().slice(0, 10);
const urls = [
  ...ROUTES.map((u) => ({ loc: `${SITE_URL}${u === '/' ? '/' : u}`, priority: u === '/' ? '1.0' : u.startsWith('/packages') ? '0.8' : '0.6' })),
  { loc: `${SITE_URL}/privacy-policy`, priority: '0.2' },
  { loc: `${SITE_URL}/terms-of-service`, priority: '0.2' },
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Prerendered ${ROUTES.length} routes + 404, sitemap with ${urls.length} URLs`);
