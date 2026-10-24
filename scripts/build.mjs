import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const pages = JSON.parse(readFileSync(path.join(root, 'wiki/pages.json'), 'utf8'));
export const nativeWikiFiles = [...pages.map(page => `${page.wiki}.md`), '_Sidebar.md', '_Footer.md'].sort();
const repository = 'https://github.com/haidmoham/rl-gym';
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const slug = text => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const htmlPath = page => page.source === 'index.md' ? 'index.html' : page.source.replace(/\.md$/, '/index.html');
const relative = (from, to) => path.posix.relative(path.posix.dirname(from), to) || path.posix.basename(to);

for (const page of pages) {
  if (!/^[a-z0-9/-]+\.md$/.test(page.source) || page.source.includes('..') || !/^[A-Za-z0-9-]+$/.test(page.wiki)) {
    throw new Error(`Unsafe page identifier: ${JSON.stringify(page)}`);
  }
}
if (new Set(pages.map(page => page.source)).size !== pages.length || new Set(pages.map(page => page.wiki)).size !== pages.length) {
  throw new Error('Duplicate page identifier.');
}

function targetFor(page, href, format) {
  if (/^https:\/\//.test(href)) return href;
  if (href.startsWith('#')) return href;
  const [pathname, fragment] = href.split('#');
  const source = path.posix.normalize(path.posix.join(path.posix.dirname(page.source), pathname));
  const target = pages.find(candidate => candidate.source === source);
  if (!target) throw new Error(`Unknown article link in ${page.source}: ${href}`);
  const suffix = fragment ? `#${fragment}` : '';
  return (format === 'wiki' ? `${repository}/wiki/${target.wiki}` : relative(htmlPath(page), htmlPath(target))) + suffix;
}

function inline(text, page) {
  const tokens = [];
  const hold = html => `\u0000${tokens.push(html) - 1}\u0000`;
  let output = text.replace(/`([^`]+)`/g, (_, code) => hold(`<code>${escape(code)}</code>`));
  output = output.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_, label, href) => hold(`<a href="${escape(targetFor(page, href, 'html'))}">${escape(label)}</a>`));
  output = escape(output).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return output.replace(/\u0000(\d+)\u0000/g, (_, i) => tokens[Number(i)]);
}

const gizmos = {
  uncertainty: `<section class="lab" data-lab="uncertainty" aria-label="Synthetic sampling lab">
<h3>Sampling lab</h3><p class="assumptions">Toy independent win/loss trials. Fixed sample size. No real battle data.</p>
<form><div class="controls">
<label>True win probability <output data-probability>55%</output><input name="probability" type="range" min="0" max="100" value="55"></label>
<label>Trials<input name="count" type="number" min="1" max="10000" step="1" value="100" required></label>
<label>Seed<input name="seed" type="number" min="0" max="4294967295" step="1" value="42" required></label>
</div><button type="submit">Draw sample</button><button type="reset">Reset</button></form>
<p class="result" data-result aria-live="polite"></p>
<div class="axis" aria-hidden="true"><span class="interval" data-interval></span><span class="estimate" data-estimate></span><span class="truth" data-truth></span></div>
<div class="axis-labels" aria-hidden="true"><span>0%</span><span>50%</span><span>100%</span></div>
<p class="legend">Solid bar = 95% interval · Dot = sample estimate · Dashed line = synthetic truth. Numeric results above carry the same information.</p>
<noscript>Enable JavaScript for the sampler. The article and navigation work without it.</noscript></section>`,
  opponents: `<section class="lab" data-lab="opponents" aria-label="Synthetic opponent mixture lab">
<h3>Opponent mixture lab</h3><p class="assumptions">Fixed rock-paper-scissors strategies. Score = (zero-sum payoff + 1) / 2. No learning or Elo.</p>
<div class="table-wrap"><table><caption>Row strategy versus column opponent, plus expected score under the chosen mixture.</caption><thead><tr><th scope="col">Strategy</th><th scope="col">Rock</th><th scope="col">Paper</th><th scope="col">Scissors</th><th scope="col">Expected score</th></tr></thead><tbody>
<tr><th scope="row">Rock</th><td>0.5 tie</td><td>0 loss</td><td>1 win</td><td data-score></td></tr>
<tr><th scope="row">Paper</th><td>1 win</td><td>0.5 tie</td><td>0 loss</td><td data-score></td></tr>
<tr><th scope="row">Scissors</th><td>0 loss</td><td>1 win</td><td>0.5 tie</td><td data-score></td></tr>
</tbody></table></div><form><div class="controls">
<label>Rock weight <output data-weight="Rock">1</output><input name="rock" type="range" min="0" max="10" value="1"></label>
<label>Paper weight <output data-weight="Paper">1</output><input name="paper" type="range" min="0" max="10" value="1"></label>
<label>Scissors weight <output data-weight="Scissors">1</output><input name="scissors" type="range" min="0" max="10" value="1"></label>
</div><button type="reset">Reset mixture</button></form><p class="result" data-result aria-live="polite"></p>
<noscript>Enable JavaScript to change the mixture. The fixed matchup matrix remains readable.</noscript></section>`
};

export function renderMarkdown(source, page) {
  const lines = source.replace(/\r\n/g, '\n').trim().split('\n');
  const html = [];
  const headings = [];
  const headingIds = new Set();
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith('```')) {
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
      if (i === lines.length) throw new Error(`Unclosed code fence in ${page.source}`);
      i++;
      html.push(`<pre><code>${escape(code.join('\n'))}</code></pre>`);
      continue;
    }
    const heading = /^(#{1,3}) (.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const id = slug(heading[2]);
      if (headingIds.has(id)) throw new Error(`Duplicate heading in ${page.source}: ${id}`);
      headingIds.add(id);
      if (level === 2) headings.push({ id, title: heading[2] });
      if (level !== 1) html.push(`<h${level} id="${id}">${inline(heading[2], page)}</h${level}>`);
      i++;
      continue;
    }
    const gizmo = /^\{\{gizmo:([a-z]+)\}\}$/.exec(line);
    if (gizmo) {
      if (!gizmos[gizmo[1]]) throw new Error(`Unknown gizmo: ${gizmo[1]}`);
      html.push(gizmos[gizmo[1]]);
      i++;
      continue;
    }
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        const cells = lines[i++].replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
        if (!cells.every(cell => /^:?-+:?$/.test(cell))) rows.push(cells);
      }
      html.push(`<div class="table-wrap"><table><thead><tr>${rows[0].map(cell => `<th scope="col">${inline(cell, page)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row => `<tr>${row.map(cell => `<td>${inline(cell, page)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }
    const list = /^(?:- |\d+\. )/.exec(line);
    if (list) {
      const tag = line.startsWith('- ') ? 'ul' : 'ol';
      const pattern = tag === 'ul' ? /^- / : /^\d+\. /;
      const items = [];
      while (i < lines.length && pattern.test(lines[i])) items.push(`<li>${inline(lines[i++].replace(pattern, ''), page)}</li>`);
      html.push(`<${tag}>${items.join('')}</${tag}>`);
      continue;
    }
    const paragraph = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,3} |```|\{\{gizmo:|- |\d+\. |\|)/.test(lines[i])) paragraph.push(lines[i++]);
    if (!paragraph.length) throw new Error(`Unsupported Markdown in ${page.source}: ${lines[i]}`);
    html.push(`<p>${inline(paragraph.join(' '), page)}</p>`);
  }
  return { html: html.join('\n'), headings };
}

export function build(output = path.join(root, 'docs')) {
  const groups = [...new Set(pages.map(page => page.group))];
  for (const page of pages) {
    const source = readFileSync(path.join(root, 'wiki/src', page.source), 'utf8');
    if (source.split(/^# /m).length !== 2) throw new Error(`Expected one h1 in ${page.source}`);
    const rendered = renderMarkdown(source, page);
    const current = htmlPath(page);
    const link = target => relative(current, target);
    const tree = `<div class="page-tree">${groups.map(group => `<p>${escape(group)}</p><ul>${pages.filter(item => item.group === group).map(item => `<li><a href="${link(htmlPath(item))}"${item === page ? ' aria-current="page"' : ''}>${escape(item.title)}</a></li>`).join('')}</ul>`).join('')}</div>`;
    const index = pages.indexOf(page);
    const neighbors = [pages[index - 1], pages[index + 1]].filter(Boolean).map(item => `<a href="${link(htmlPath(item))}">${item === pages[index - 1] ? '←' : '→'} ${escape(item.title)}</a>`).join('');
    const result = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escape(page.title)}. An experiment-first RL research wiki with reproducible local examples."><meta name="theme-color" content="#fbfaf6"><title>${escape(page.title)} | rl-gym</title><link rel="stylesheet" href="${link('assets/style.css')}"><script defer src="${link('assets/lab-math.js')}"></script><script defer src="${link('assets/labs.js')}"></script></head>
<body><a class="skip" href="#content">Skip to article</a>
<header><a class="brand" href="${link('index.html')}">rl-gym<small>Research notebook · 01</small></a><nav class="header-links" aria-label="Project"><a href="${repository}">Repository ↗</a><a href="${repository}/wiki">GitHub Wiki ↗</a></nav></header>
<div class="layout"><aside><nav aria-label="Wiki navigation"><details open><summary>On this page</summary><ul>${rendered.headings.map(heading => `<li><a href="#${heading.id}">${escape(heading.title)}</a></li>`).join('')}</ul></details><details><summary>All articles</summary>${tree}</details>${tree}</nav></aside>
<main id="content"><p class="eyebrow">${escape(page.group)} / PokéAgent Challenge</p><h1>${escape(page.title)}</h1><div class="article-tools"><span>Article · Experiment-first wiki</span><a href="${repository}/blob/main/wiki/src/${page.source}">Edit source ↗</a></div><article>${rendered.html}</article><nav class="footer-nav" aria-label="Adjacent articles">${neighbors}</nav><footer>rl-gym · Unrun research scaffold · Local assets, no tracking.<br>External resources require internet. Original examples use synthetic data.</footer></main></div></body></html>
`;
    const target = path.join(output, current);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, result);
  }
  mkdirSync(path.join(output, 'assets'), { recursive: true });
  for (const asset of ['style.css', 'lab-math.js', 'labs.js']) copyFileSync(path.join(root, 'wiki/assets', asset), path.join(output, 'assets', asset));
  return pages.length;
}

export function exportWiki(output = path.join(root, '.wiki-export'), revision) {
  const commit = revision ?? execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  mkdirSync(output, { recursive: true });
  for (const page of pages) {
    const source = readFileSync(path.join(root, 'wiki/src', page.source), 'utf8');
    const article = source.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_, label, href) => `[${label}](${targetFor(page, href, 'wiki')})`)
      .replace(/^\{\{gizmo:([a-z]+)\}\}$/gm, '**Offline interactive example.** GitHub Wiki cannot run this script. Clone the repository, run `node scripts/build.mjs`, and open `docs/' + htmlPath(page) + '`. The complete example, assumptions, and source are in the local HTML edition.');
    writeFileSync(path.join(output, `${page.wiki}.md`), `<!-- Generated from canonical repository sources. Do not edit here. -->\n\n${article.trim()}\n\n---\n\nCanonical source: [${page.source}](${repository}/blob/${commit}/wiki/src/${page.source}) · Source commit: \`${commit}\`.\n`);
  }
  writeFileSync(path.join(output, '_Sidebar.md'), pages.map(page => `- [${page.title}](${repository}/wiki/${page.wiki})`).join('\n') + '\n');
  writeFileSync(path.join(output, '_Footer.md'), `Generated from [canonical sources](${repository}/tree/${commit}/wiki/src). Original interactive examples run in the local HTML edition. External resources require internet.\n`);
  return pages.length + 2;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(`Built ${build()} articles in docs/.`);
  if (process.argv.includes('--wiki')) console.log(`Exported ${exportWiki()} native Wiki files to .wiki-export/.`);
}
