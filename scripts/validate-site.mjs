import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const errors = [];

const expectedFiles = [
  'index.html',
  'work/index.html',
  'work/bots-5/index.html',
  'work/organisational-memory/index.html',
  'work/story-audio/index.html',
  'work/road-trip/index.html',
  'work/homelab/index.html',
  'lab/index.html',
  'about/index.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'favicon.svg',
  'CNAME',
];

const excludedRoutes = [
  { route: '/notes/', outputs: ['notes/index.html', 'notes.html'] },
  { route: '/services/', outputs: ['services/index.html', 'services.html'] },
  { route: '/systems/', outputs: ['systems/index.html', 'systems.html'] },
  { route: '/portfolio/', outputs: ['portfolio/index.html', 'portfolio.html'] },
];

const primaryPages = expectedFiles.filter((file) => file.endsWith('.html') && file !== '404.html');
const requiredMetadata = [
  /<title>[^<]+<\/title>/i,
  /<meta name="description" content="[^"]+"/i,
  /<link rel="canonical" href="https:\/\/micksfoundry\.org\/[^"]*"/i,
  /<meta property="og:title" content="[^"]+"/i,
  /<meta property="og:description" content="[^"]+"/i,
  /<meta property="og:url" content="https:\/\/micksfoundry\.org\/[^"]*"/i,
  /<meta name="twitter:card" content="summary"/i,
];

for (const file of expectedFiles) {
  if (!existsSync(join(dist, file))) errors.push(`Missing required output: ${file}`);
}

for (const { route, outputs } of excludedRoutes) {
  for (const output of outputs) {
    if (existsSync(join(dist, output))) {
      errors.push(`Excluded route generated: ${route} (${output})`);
    }
  }
}

for (const file of primaryPages) {
  if (!existsSync(join(dist, file))) continue;
  const html = readFileSync(join(dist, file), 'utf8');
  for (const pattern of requiredMetadata) {
    if (!pattern.test(html)) errors.push(`Missing metadata ${pattern} in ${file}`);
  }
}

function filesUnder(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

function outputTarget(fromFile, rawTarget) {
  const target = rawTarget.split('#')[0].split('?')[0];
  if (!target || /^(?:https?:|mailto:|tel:|data:)/i.test(target)) return null;
  const absolute = target.startsWith('/')
    ? join(dist, target)
    : resolve(dirname(fromFile), target);
  if (extname(absolute)) return normalize(absolute);
  return normalize(target.endsWith('/') ? join(absolute, 'index.html') : absolute);
}

for (const file of filesUnder(dist).filter((path) => path.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gi)) {
    const target = outputTarget(file, match[1]);
    if (!target) continue;
    const candidates = [target, `${target}.html`, join(target, 'index.html')];
    if (!candidates.some(existsSync)) {
      errors.push(`Broken internal reference in ${relative(dist, file)}: ${match[1]}`);
    }
  }
}

if (existsSync(join(dist, 'CNAME'))) {
  const cname = readFileSync(join(dist, 'CNAME'), 'utf8').trim();
  if (cname !== 'micksfoundry.org') errors.push(`Unexpected CNAME: ${cname}`);
}

if (existsSync(join(dist, 'robots.txt'))) {
  const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
  if (!robots.includes('Sitemap: https://micksfoundry.org/sitemap.xml')) {
    errors.push('robots.txt does not reference the canonical sitemap');
  }
}

if (existsSync(join(dist, 'sitemap.xml'))) {
  const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
  const expectedUrls = [
    '/', '/work/', '/work/bots-5/', '/work/organisational-memory/',
    '/work/story-audio/', '/work/road-trip/', '/work/homelab/', '/lab/', '/about/',
  ].map((path) => `https://micksfoundry.org${path}`);
  for (const url of expectedUrls) {
    if (!sitemap.includes(`<loc>${url}</loc>`)) errors.push(`Sitemap missing ${url}`);
  }
}

const bannedTerms = [
  'aihorde.net',
  'MickRocinanteWorker',
  '@supabase/supabase-js',
  'tinacms',
  'react-router-dom',
  'tavern.micksfoundry.org',
  'game.micksfoundry.org',
];
const scanTargets = [join(root, 'package.json'), join(root, 'src'), join(root, 'public'), dist];
for (const file of scanTargets.flatMap((target) => statSync(target).isDirectory() ? filesUnder(target) : [target])) {
  if (!['.html', '.js', '.mjs', '.ts', '.astro', '.md', '.json', '.txt', '.xml', '.svg', ''].includes(extname(file))) continue;
  const content = readFileSync(file, 'utf8');
  for (const term of bannedTerms) {
    if (content.toLowerCase().includes(term.toLowerCase())) {
      errors.push(`Obsolete integration term '${term}' remains in ${relative(root, file)}`);
    }
  }
}

if (errors.length) {
  console.error(`Static-site validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Static-site validation passed: ${expectedFiles.length} required outputs, ${primaryPages.length} metadata-bearing pages, ${excludedRoutes.length} retired routes absent, and all internal references resolved.`);
