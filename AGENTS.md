# agent contract

Read `instructions.md`, `README.md`, and the relevant experiment plan before making changes. Work only inside this project. Ordinary scoped documentation and build changes may be committed and pushed on `main` after checks. Preserve unrelated changes.

## preserve the learner

- The user owns their reasoning and writing. Ask for their hypothesis, prediction, or interpretation when that is the learning task. Help with plumbing, explanations, and review. Do not ghostwrite their conclusions or silently solve the part they intend to practice.
- Keep user-authored text and agent suggestions distinct. Label an agent draft and preserve the original when editing meaning.
- Separate a hypothesis, an observation, an interpretation, and a decision. Synthetic gizmo output is never a finding about a trained agent.

## evidence before claims

- Never claim reproduction, improvement, statistical significance, leaderboard rank, or tested training without linked artifacts and a matching protocol.
- Lock starting checkpoint, comparator hashes, rival, teams, opponents, seeds, timer, battle count, metric, stopping rule, and analysis before training. Record held-out access. Never silently move a target or discard failed seeds.
- A changed protocol is a new version with a rationale. Keep the old one and disclose exploratory analyses. Report ties, crashes, illegal actions, timeouts, exclusions, and uncertainty.
- Keep the starting checkpoint immutable. Compare the candidate and the unchanged start on the same locked schedule. A win against one rival does not establish universal strength.
- Record exact source commits, URLs, retrieval dates, licenses, data splits, checkpoint hashes, commands, software, hardware, seeds, and raw-log hashes. Keep private or licensed inputs outside the public repository.

## compute and publication boundaries

- This repository is currently an unrun scaffold. Do not launch training, inference battles, large downloads, account creation, credential creation, or official-server participation without separate authorization and a written budget.
- Do not touch another project or use its GPU, models, logs, configs, or checkpoints. Never stop another process to free resources.
- Account for CPU/GPU model, wall time, device hours, storage, network bytes, and external API usage. Use null for unavailable measurements with a reason. Label projections as estimates. Record zero only when known.
- Publish only this project's intended public materials. Inspect the staged file list and diff for credentials, personal data, unrelated artifacts, and licensed assets. Never stage the entire workspace by habit.

## wiki and verification

- `wiki/src/` and `wiki/pages.json` are canonical. Generate `docs/` and the native Wiki export from them. Do not hand-edit generated outputs or author divergent native pages.
- Use online-native videos, interactive explanations, and short practical resources. No textbooks, fabricated links, invented timestamps, copied media, or walls of papers.
- Preserve the article-first layout, readable typography, relative links, and offline gizmos. Pair color with labels or patterns. Never use red/green-only encoding.
- Run `node scripts/build.mjs`, `node scripts/check.mjs`, and `node --test tests/*.test.mjs`. Inspect relevant browser interactions and mobile layout when changing the interface.
- Report pass, fail, blocked, and not-run separately. Verify public visibility and remote commit after pushing. Verify native Wiki readback separately from local HTML. An enabled but uninitialized Wiki is not a published Wiki.
