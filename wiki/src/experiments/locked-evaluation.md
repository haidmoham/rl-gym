# Freeze a fair evaluation

A policy can look better because the teams, opponents, seeds, deadline, or stopping rule changed. Freeze the protocol before training so the final comparison answers the question you started with.

## Define the comparison

The primary comparison is candidate versus unchanged starting checkpoint on the same held-out team and opponent schedule. Include direct head-to-head as a separate comparison if useful. The strong published rival is a second, fixed test. Neither a ladder snapshot nor one favorable matchup replaces the primary comparison.

The proposed start is `Minikazam`; the proposed rival is `Kakuna`. Both identities remain unbound until their source revisions and checkpoint hashes are recorded. Never silently replace the rival with a newer or weaker model.

## Lock the protocol

Complete `templates/locked-evaluation.md` and commit it before training. It must specify the following:

- Source and simulator commits, dependency lock, checkpoint revisions and hashes, observation/action interfaces, and inference mode.
- Gen 1 OU rules, standard timer behavior, concurrency, hardware, and decision-time measurement boundary.
- Training, development, and final holdout team manifests with hashes and an overlap policy. Do the same for opponents and seeds. Near-duplicate teams need a stated treatment.
- A battle schedule that pairs candidate and starting-checkpoint conditions. Define how sides and team assignments are balanced.
- Primary metric, minimum meaningful effect, number of battles and independent seed groups, uncertainty method, and stopping rule.
- Tie scoring, timeout/crash/illegal-action handling, excluded-run rules, and all planned slices.
- A fixed rival identity, compute budget, held-out access rule, and report location.

## Respect the deadline

The [official timer](https://pokeagentchallenge.com/battling.html) starts at 30 seconds, adds 3 seconds per turn, caps ordinary turns at 8 seconds, and allows 30 seconds for the first turn. A local evaluator must represent those rules explicitly. Record wall-clock observation-to-action latency and deadline misses. Measure actual deployment hardware before making timer claims.

## Analyze without moving the target

Use the same schedule for both policies. Preserve per-battle outcomes so paired or clustered uncertainty methods can respect shared teams and opponents. Report all seed groups and failure counts. If the protocol changes, create a new version and label any new analysis exploratory.

The [sampling gizmo](uncertainty.md) assumes independent Bernoulli trials. Real battles sharing an opponent, team, or seed can be correlated. Use the correct resampling unit in the actual analysis and explain it in the report.

## Unlock the holdout once

Use development opponents for iteration. Evaluate a final candidate on the locked holdout only after its checkpoint is selected. Repeatedly selecting on holdout scores turns the holdout into development data. Log every access and decide whether a new holdout is needed.

Next, try [opponent non-transitivity](opponent-pools.md) before picking the pool.
