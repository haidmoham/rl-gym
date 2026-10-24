import { readFileSync, readdirSync, statSync, mkdtempSync, existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { build, exportWiki, root, pages } from './build.mjs';

const scratch = mkdtempSync(path.join(os.tmpdir(), 'rl-gym-check-'));
const fresh = path.join(scratch, 'docs');
build(fresh);
const walk = dir => readdirSync(dir).sort().flatMap(name => {
  const file = path.join(dir, name);
  return statSync(file).isDirectory() ? walk(file) : [file];
});
const files = walk(fresh);
const checkedIn = path.join(root, 'docs');
assert.deepEqual(walk(checkedIn).map(file => path.relative(checkedIn, file)), files.map(file => path.relative(fresh, file)), 'Generated file inventory differs. Rebuild docs/.');
let links = 0;
for (const file of files) {
  const relative = path.relative(fresh, file);
  assert.equal(readFileSync(path.join(checkedIn, relative), 'utf8'), readFileSync(file, 'utf8'), `Generated drift in ${relative}`);
  if (!file.endsWith('.html')) continue;
  const html = readFileSync(file, 'utf8');
  assert.equal((html.match(/<h1>/g) || []).length, 1, `Expected one article title in ${relative}`);
  assert(!/<p>\{\{gizmo:/.test(html), `Unresolved gizmo in ${relative}`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate fragment in ${relative}`);
  for (const [, attribute, url] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (url.startsWith('https://')) {
      assert.equal(attribute, 'href', 'Runtime assets must be local.');
      continue;
    }
    assert(!url.startsWith('/') && !url.includes(':'), `Link is not relative: ${url}`);
    const [pathname, fragment] = url.split('#');
    const target = pathname ? path.resolve(path.dirname(file), pathname) : file;
    assert(target.startsWith(fresh + path.sep), `Link leaves HTML tree: ${url}`);
    assert(existsSync(target) && statSync(target).isFile(), `Missing local target in ${relative}: ${url}`);
    if (fragment) assert(readFileSync(target, 'utf8').includes(`id="${fragment}"`), `Missing fragment in ${relative}: ${url}`);
    links++;
  }
}
const exported = path.join(scratch, 'wiki');
exportWiki(exported, 'test-revision');
const wikiNames = new Set(pages.map(page => page.wiki));
for (const file of walk(exported)) {
  const markdown = readFileSync(file, 'utf8');
  assert(!/^\{\{gizmo:/m.test(markdown));
  for (const [, name] of markdown.matchAll(/https:\/\/github\.com\/haidmoham\/rl-gym\/wiki\/([A-Za-z0-9-]+)/g)) {
    assert(wikiNames.has(name), `Unknown native Wiki cross-link: ${name}`);
  }
}
console.log(`PASS: ${pages.length} reproducible HTML articles, ${links} local links/assets/fragments, ${wikiNames.size + 2} native Wiki export files. External links and training not tested by this check.`);
