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

## Teaching mode: explain as you go

I (Mohammad) want to learn this material while you implement it with modern tooling. These rules apply to every change in this repository.

### before each change

- Explain in under 150 words what you will change, why, and the underlying concept (for example advantage normalization, the KL penalty, clustered standard errors). Link one primary source when one exists.
- Say plainly when an explanation is a simplification, and name what it leaves out.
- End with one check question for me to answer in my own words. Plumbing may continue; the next design step waits for my answer.

### while changing

- Prefer small, reviewable diffs: one concept per change where possible.
- After the change, walk through the non-obvious lines of the generated code. Never ask me to accept code that has not been explained.

### learning log

- Append each new concept to `docs/learning-log.md`: date, concept, one-line explanation, file and line where it appears, my answer to the check question verbatim, and any gap you saw in my answer.

### stop at research decisions

- Stop and ask me first, without proposing a default, when a change touches the reward design, an eval metric, a hypothesis, a held-out split, a stopping rule, the comparison baseline, the model or dataset choice, or what counts as a result.
- After I give my first instinct, offer 2-3 options with tradeoffs. I decide, and I record the decision and its reason in my own words in `docs/research-log.md` under "Decision:".

### milestone check

- At each milestone (protocol locked, first result, final result), ask me to write 3-5 sentences in `docs/research-log.md` on what happened and why, before I read your summary. Then list gaps or errors in my explanation as questions, not corrections.

### exercises

- The first time we need the GRPO/PPO policy loss or the paired-interval code, do not write it. Give me a stub and tests, grade my attempt, and explain each mismatch with the reference.

### never write my claims

- Never write my research claims, conclusions, interpretations, figure captions, or posts. You never edit `docs/research-log.md`. Put any suggestion in a separate block labeled "Codex suggestion".
- In public files, records I own say "I". Your notes are labeled "Codex".
