# Publish a reproducible result

A report lets another person reconstruct what ran, judge the evidence, and identify what remains uncertain. This repository currently has no result to report.

## Preserve a complete record

Link the hypothesis, locked protocol commit, baseline receipt, candidate checkpoint hash, source and simulator revisions, environment lock, exact commands, team/opponent manifests, seeds, and analysis code. Publish only inputs you have permission to share. Use content hashes for private or licensed artifacts and state how an authorized reader can obtain them.

Separate measured outcomes, interpretation, and speculation. Include all runs, failed seeds, exclusions, ties, crashes, illegal actions, and deadline misses. Report effect sizes and uncertainty, not only a win percentage. State how selection and repeated testing affect the conclusion.

## Account for the compute

Use `templates/compute.md` for each run. Record CPU/GPU type, device count, wall time, GPU-hours, CPU-hours, storage, network bytes, and any API use. Distinguish training, evaluation, preprocessing, and analysis. State whether costs are measured, estimated, or unavailable. Include failed runs in the total.

A zero means known zero. A missing measurement is null with an explanation. A projected dollar cost is an estimate with a rate source and date. Do not describe this wiki build as evidence that a future policy fits a given hardware budget.

## Request official verification later

The [official submission instructions](https://pokeagentchallenge.com/battling.html) ask for a paper or technical report, official PokéAgent server head-to-head logs, and the agent's ladder name. Recheck the current process before submitting. A local evaluator receipt cannot replace official-server verification.

This scaffold does not register an account, create agent credentials, enter the competition, or play on a human ladder. Future official-server activity needs separate authorization. No ranking or verification is promised.

## Make the claim proportional

If you show a gain only against one fixed rival, say that. If the interval includes practically important losses and gains, report that uncertainty. If the reproduction used different teams or timing, name the difference. If a training run was never executed, say not run.

The [agent contract](https://github.com/haidmoham/rl-gym/blob/main/AGENTS.md) and experiment templates encode these boundaries for future contributors.
