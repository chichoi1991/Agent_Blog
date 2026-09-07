#!/usr/bin/env node
// Audit rendered HTML, not Markdown: Liquid, relative paths and both languages matter.
// node tools/check-images.mjs --site _site [--page en/chapters/example/index.html] [--remote]
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    site: { type: 'string', default: '_site' },
    baseurl: { type: 'string', default: '/Agent_Blog' },
    remote: { type: 'boolean', default: false },
    report: { type: 'string' },
    page: { type: 'string', multiple: true },
    offset: { type: 'string', default: '0' },
    limit: { type: 'string', default: 'Infinity' },
  },
});
const root = resolve(values.site);
const baseurl = values.baseurl.replace(/\/$/, '');
const origin = 'https://chichoi1991.github.io';
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else files.push(relative(root, path).split(sep).join('/'));
  }
}
walk(root);
const fileSet = new Set(files);
const images = new Map();
const errors = [];
const decode = (text) => text.replace(
  /&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi,
  (entity) => {
    const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>' };
    const lower = entity.toLowerCase();
    if (named[lower]) return named[lower];
    return String.fromCodePoint(parseInt(lower.slice(lower[2] === 'x' ? 3 : 2, -1), lower[2] === 'x' ? 16 : 10));
  },
);
function record(src, page) {
  if (/^(data:|blob:)/i.test(src)) return;
  if (!src.trim()) {
    errors.push({ page, src, problem: 'Empty image URL' });
    return;
  }
  const pageUrl = `${origin}${baseurl}/${page.replace(/index\.html$/, '')}`;
  const url = new URL(decode(src), pageUrl);
  url.hash = '';
  if (!images.has(url.href)) images.set(url.href, { url: url.href, pages: [] });
  const item = images.get(url.href);
  if (!item.pages.includes(page)) item.pages.push(page);
}
const pages = values.page ?? files.filter((file) => file.endsWith('.html'));
for (const page of pages) {
  if (!fileSet.has(page) || !page.endsWith('.html')) throw new Error(`Rendered page not found: ${page}`);
}
for (const page of pages) {
  const html = readFileSync(resolve(root, page), 'utf8')
    .replace(/<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  for (const match of html.matchAll(/<(?:img|source|image)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi)) {
    const attrs = new Map();
    for (const attr of match[0].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
      attrs.set(attr[1].toLowerCase(), attr[2] ?? attr[3] ?? attr[4]);
    }
    const src = attrs.get('src') ?? attrs.get('href') ?? attrs.get('xlink:href');
    // The lightbox is created without src and receives one only when opened.
    if (src !== undefined) record(src, page);
    const srcset = attrs.get('srcset');
    if (srcset && !srcset.startsWith('data:')) {
      for (const candidate of srcset.split(',')) record(candidate.trim().split(/\s+/)[0], page);
    }
  }
}
let localCount = 0;
const remote = [];
for (const image of images.values()) {
  const url = new URL(image.url);
  if (url.origin !== origin) {
    remote.push(image);
    continue;
  }
  localCount++;
  const path = decodeURIComponent(url.pathname);
  if (!path.startsWith(`${baseurl}/`)) {
    errors.push({ ...image, problem: 'Image URL escapes the configured baseurl' });
  } else if (!fileSet.has(path.slice(baseurl.length + 1))) {
    errors.push({ ...image, problem: 'Missing local image (case-sensitive)' });
  } else if (statSync(resolve(root, path.slice(baseurl.length + 1))).size === 0) {
    errors.push({ ...image, problem: 'Empty local image file' });
  }
}
const results = [];
if (values.remote) {
  const selected = remote.slice(Number(values.offset), Number(values.offset) + Number(values.limit));
  for (const image of selected) {
    let result;
    try {
      // GitHub attachments may reject HEAD even when GET succeeds.
      let response;
      for (let attempt = 0; attempt < 3; attempt++) {
        response = await fetch(image.url, { signal: AbortSignal.timeout(30000) });
        if (![429, 500, 502, 503, 504].includes(response.status) || attempt === 2) break;
        await response.body?.cancel();
        await new Promise((done) => setTimeout(done, 1000 * (attempt + 1)));
      }
      const type = response.headers.get('content-type') ?? '';
      const bytes = (await response.arrayBuffer()).byteLength;
      result = { ...image, status: response.status, type, bytes };
      if (!response.ok || !type.startsWith('image/') || !bytes) {
        errors.push({ ...result, problem: 'Remote URL does not return an image' });
      }
    } catch (error) {
      result = { ...image, problem: `Request failed: ${error.message}` };
      errors.push(result);
    }
    results.push(result);
    console.log(`${results.length}/${selected.length} ${result.status ?? 'ERROR'} ${image.url}`);
  }
}
const report = { pages: pages.length, uniqueImages: images.size, localImages: localCount, remoteImages: remote.length, errors, remote, results };
if (values.report) writeFileSync(values.report, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ...report, remote: undefined, results: undefined }, null, 2));
process.exitCode = errors.length ? 1 : 0;
