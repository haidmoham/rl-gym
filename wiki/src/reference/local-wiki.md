# Maintain the local wiki

The canonical articles are version-controlled Markdown in `wiki/src/`. `wiki/pages.json` defines their titles, order, navigation groups, and native Wiki names. `wiki/assets/` contains the local stylesheet and original gizmos.

## Build and open

Use Node.js 22 or later. No package install is needed.

```sh
node scripts/build.mjs
node scripts/check.mjs
node --test tests/*.test.mjs
```

Double-click `docs/index.html`. On Windows, run `Start-Process .\docs\index.html`. On macOS, run `open docs/index.html`. On a Linux desktop, run `xdg-open docs/index.html`.

Every article has a nested `index.html`, including `docs/experiments/uncertainty/index.html`. All internal links name actual files, not server-only directory routes. Assets use relative paths. The gizmos are classic scripts with no fetch, imports, analytics, remote fonts, or service worker. They work through `file://`. Outside links and hosted videos require internet.

## Edit one source

Edit Markdown, then rebuild. The small renderer supports the subset documented in the repository README. Source text is escaped; arbitrary inline HTML is not supported. Use `{{gizmo:uncertainty}}` and `{{gizmo:opponents}}` to embed the original labs. Native Wiki exports replace them with links and offline-build instructions because GitHub does not execute JavaScript in articles.

Run the checks before committing both source and `docs/`. The check verifies reproducibility, local targets and fragments, local assets, and native Wiki cross-links. It does not claim external links or training are tested.

## Synchronize the native Wiki

```sh
node scripts/build.mjs --wiki
node scripts/sync-wiki.mjs
```

The sync command requires a clean source checkout at the exact commit on public `main`. It clones `https://github.com/haidmoham/rl-gym.wiki.git` into the ignored `.wiki-checkout/` folder and publishes only this project's manifest-listed pages, sidebar, and footer. It preserves unknown native pages and rejects a dirty Wiki checkout. Each page records the canonical source commit. The command uses existing Git credentials and does not read or create tokens.

If GitHub reports that the wiki repository does not exist, open the repository's Wiki tab while signed in and create its first Home page. Then rerun sync. Wiki enablement alone does not initialize the Git repository. If initialization is unavailable, keep the generated local HTML and report the native Wiki as blocked.

After sync, compare `git -C .wiki-checkout rev-parse HEAD` with `git -C .wiki-checkout ls-remote origin HEAD`. Read the Home and First-baseline pages on GitHub to confirm rendering and cross-links. Never claim that a local export proves native publication.

## Design and accessibility

The article layout is inspired by [Wikipedia](https://en.wikipedia.org/wiki/Reinforcement_learning) and typographic details by [Paper Mono](https://paper.design/mono). No Wikipedia branding or third-party font files are bundled. A system monospace stack provides the local fallback. Blue links, neutral rules, text labels, and signed matrix values avoid red/green-only information. The contents rail collapses above the article on narrow screens. Keyboard focus stays visible.
