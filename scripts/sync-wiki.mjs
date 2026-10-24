import { existsSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { root, exportWiki, nativeWikiFiles } from './build.mjs';

const remote = 'https://github.com/haidmoham/rl-gym.wiki.git';
const checkout = path.join(root, '.wiki-checkout');
const generated = path.join(root, '.wiki-export');
const git = (args, cwd = root) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
try {
  if (git(['status', '--porcelain'])) throw new Error('Commit canonical sources and generated docs before syncing the Wiki.');
  const revision = git(['rev-parse', 'HEAD']);
  const publicMain = git(['ls-remote', 'https://github.com/haidmoham/rl-gym.git', 'refs/heads/main']).split(/\s/)[0];
  if (revision !== publicMain) throw new Error('Push the canonical source commit to public main before syncing the Wiki.');
  if (!existsSync(checkout)) git(['clone', remote, checkout]);
  if (git(['remote', 'get-url', 'origin'], checkout) !== remote) throw new Error('Wiki checkout has an unexpected origin.');
  if (git(['status', '--porcelain'], checkout)) throw new Error('Wiki checkout is dirty. Inspect it before syncing.');
  git(['pull', '--ff-only'], checkout);
  exportWiki(generated, revision);
  const files = nativeWikiFiles;
  for (const file of files) copyFileSync(path.join(generated, file), path.join(checkout, file));
  git(['add', '--', ...files], checkout);
  if (git(['diff', '--cached', '--name-only'], checkout)) git(['commit', '-m', `Sync canonical wiki from ${revision}`], checkout);
  git(['push', 'origin', 'HEAD'], checkout);
  const local = git(['rev-parse', 'HEAD'], checkout);
  const remoteHead = git(['ls-remote', 'origin', 'HEAD'], checkout).split(/\s/)[0];
  if (local !== remoteHead) throw new Error('Wiki remote HEAD does not match the local commit.');
  console.log(`PASS: native Wiki ${local}; canonical source ${revision}. Read back Home and First-baseline on GitHub separately.`);
} catch (error) {
  console.error(`Wiki sync failed: ${error.stderr?.toString().trim() || error.message}`);
  console.error('If the wiki is uninitialized, create its first Home page in the repository Wiki tab, then rerun. Local HTML remains available.');
  process.exitCode = 1;
}
