# rl-gym

An experiment-first research gym for the [PokéAgent Challenge](https://pokeagentchallenge.com/). Learn with browser gizmos, videos, and small experiments. No textbooks.

## The summit

Reproduce a released baseline in Gen 1 OU under the standard decision timer. Improve a trained policy against its unchanged starting checkpoint on held-out opponents and teams. Test against a strong published Metamon rival fixed before training. Publish a reproducible technical report and official-server battle logs for verification.

**Current state: scaffold only.** No baseline has run, no evaluation target is locked, and no policy has trained. There are no measured gains, rankings, or official submissions. Building this wiki uses no GPU. The original gizmos contain synthetic teaching data.

## Start with one baseline

Open [reproduce the first baseline](wiki/src/start/first-baseline.md). The proposed starting policy is Metamon's `Minikazam`, a compact released RNN. Proposed fixed rival: `Kakuna`. These names are choices for the first protocol, not results or immutable artifact identifiers. Resolve upstream commits and checkpoint hashes before locking them. Start with [issue 1](https://github.com/haidmoham/rl-gym/issues/1), then complete `experiments/000-baseline/plan.md`. Stop before downloads or execution until a separate compute budget is authorized.

## Read the wiki

- [Read the native GitHub Wiki](https://github.com/haidmoham/rl-gym/wiki): 10 articles with a shared sidebar and footer, generated from the canonical sources below.
- [Canonical Markdown articles](wiki/src/index.md).
- Rebuild the complete local folder tree with Node.js 22 or later. No package installation, network, server, or hosted docs platform is required.

```sh
git clone https://github.com/haidmoham/rl-gym.git
cd rl-gym
node scripts/build.mjs
node scripts/check.mjs
node --test tests/*.test.mjs
```

Open `docs/index.html` by double-clicking it, or run the command for your shell:

```powershell
# Windows PowerShell
Start-Process .\docs\index.html
```

```sh
# macOS
open docs/index.html
# Linux desktop
xdg-open docs/index.html
```

The generated `docs/` tree is committed. For example, `docs/start/first-baseline/index.html` is a real file. Local articles, navigation, CSS, JS, and gizmos work through `file://`. External resource cards are labeled **Internet required**. No third-party media or fonts are downloaded by the build.

## Edit and synchronize

Edit `wiki/src/**/*.md`, update `wiki/pages.json` when adding a page, then run the build and checks above. The renderer supports headings, paragraphs, flat numbered/bullet lists, fenced code, Markdown links, inline code, bold text, and tables. Gizmos use the named `{{gizmo:...}}` markers. Unsupported Markdown features are not a general-purpose parser contract.

```sh
node scripts/build.mjs --wiki
node scripts/sync-wiki.mjs
```

The second command publishes generated Markdown to this project's native Wiki using your existing Git credentials. It needs an initialized Wiki and a clean wiki checkout. It does not create credentials. See [maintain the wiki](wiki/src/reference/local-wiki.md) for initialization, synchronization, and readback. Native Wiki pages link to the canonical source; HTML gizmos run in the local copy because GitHub Wiki does not execute scripts.

## Work here

Read [instructions.md](instructions.md) and [AGENTS.md](AGENTS.md) before research or code changes. `templates/` contains experiment records. `experiments/000-baseline/` contains an explicitly unrun plan. There is no trainer in this repository.

The [official battling page](https://pokeagentchallenge.com/battling.html) is the source for the timer and submission process. Recheck current rules before a future run. This scaffold does not authorize human-ladder play, account registration, credentials, competition entry, model downloads, or training. Pokémon and related names belong to their respective owners. No licensed game assets are bundled.
