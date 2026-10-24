# Reproduce the first baseline

Your first outcome is a baseline receipt someone else can rerun. Begin with a released policy. Training waits until the reproduction and evaluation protocol are frozen.

**Run state: not run.** Policy names below are proposed selections. Source commits, checkpoint hashes, battle schedule, resource limits, and approval remain unresolved.

## Select a starting point

Use [Metamon](https://github.com/UT-Austin-RPL/metamon), the RL baseline toolkit linked from the [official battling guide](https://pokeagentchallenge.com/battling.html). Start by inspecting its current pretrained-policy registry and evaluation documentation, not by writing a trainer.

The proposal is `Minikazam`, described upstream as a compact 4.7M-parameter RNN suitable for finetuning. Use `Kakuna` as a proposed strong published rival. These are different roles. The unchanged Minikazam checkpoint is the primary before/after comparator. Kakuna is a fixed external challenge, not a moving leaderboard target. [Upstream policy documentation](https://github.com/UT-Austin-RPL/metamon#pretrained-models) is the authority for available names and capabilities.

## Prepare without consuming training compute

1. Open `experiments/000-baseline/plan.md` in the repository. Write your prediction of one failure mode in your own words.
2. Record the upstream Metamon commit and its Showdown submodule commit. Inspect the pinned installation and evaluation instructions. Upstream targets Linux; this Windows wiki build is not a verified Metamon runtime.
3. Resolve exact checkpoint files, repository revisions, SHA-256 hashes, and licenses. Record a download-size estimate before any download. Do not resolve a name like `latest` during an experiment.
4. Complete the [locked evaluation](../experiments/locked-evaluation.md) and obtain a separate compute authorization. Keep the starting checkpoint read-only.

The [upstream evaluation guide](https://github.com/UT-Austin-RPL/metamon/blob/main/metamon/rl/evaluate/README.md) gives `python -m metamon.rl.evaluate --eval_type heuristic --agent Kakuna --gens 1 --formats ou --total_battles 100` as an interface example. It is not this project's frozen command, a standard-timer guarantee, or an executed result. Inspect `--help` at the pinned commit before recording a command. Loading policies may trigger substantial downloads. Do not run this example as part of wiki setup.

## Run only after the protocol is locked

Run a budgeted local smoke evaluation first. Verify action legality, format, observation boundaries, timeout accounting, log capture, and checkpoint identity. Then evaluate the unchanged starting policy on the frozen schedule. Save the full command, environment lock, hashes, stdout, battle outcomes, decision latencies, and failures.

Apply the standard-timer constraints to the actual evaluator and verify that the deadline is enforced. A fast average alone does not establish compliance. Record tail latency, deadline misses, and first-turn behavior. A local server with no timer is a development check only.

Reproduction means agreement with a named upstream evaluation under matching conditions, with stated tolerance. If the release supplies no directly comparable result, call the output a new baseline measurement rather than claiming reproduction of a published number.

## Stop with a useful receipt

Use `templates/baseline.md` and `templates/compute.md`. Record failures and unknowns. Preserve the untouched checkpoint and the frozen schedule for the candidate comparison. Do not train until the user has reviewed the reproduction, protocol, and budget.

Next, [read the battle loop](battle-loop.md) and [freeze a fair evaluation](../experiments/locked-evaluation.md).
