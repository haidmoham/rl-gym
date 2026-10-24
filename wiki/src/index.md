# The research gym

This is a working notebook for climbing the PokéAgent Challenge through reproducible experiments. Start with one released policy, understand its failures, and test one change at a time. Learn through videos and things you can manipulate in a browser.

**Status: unrun.** There are no trained policies, baseline results, or performance claims in this repository. Local gizmos use synthetic examples. They require no GPU.

## The summit

The goal is a reproducible improvement in Gen 1 OU under the standard timer, followed by a technical report and official-server battle logs. The comparison has two parts: improve over the unchanged starting checkpoint on held-out teams and opponents, then challenge a strong published Metamon rival chosen before training.

The [official challenge](https://pokeagentchallenge.com/) is an ongoing benchmark. Its [battling guide](https://pokeagentchallenge.com/battling.html) describes 30 released RL baselines and a standard maximum of 8 seconds per turn. Those facts describe the benchmark, not progress in this repository. Rules were checked on 2026-10-24 and must be checked again before a run.

## Begin with a reproduction

Read [reproduce the first baseline](start/first-baseline.md). The first deliverable is a pinned protocol and a budget, followed by a separately authorized baseline run. No model download or training is part of this scaffold.

The proposed starting policy is `Minikazam`. The proposed rival is `Kakuna`. Resolve both to immutable artifacts before freezing the protocol. The learner chooses the first hypothesis. An agent can help build the run plumbing without supplying a conclusion.

## Follow the evidence

1. [Read a battle as an RL loop](start/battle-loop.md). Predict what the policy can and cannot observe.
2. [Freeze a fair evaluation](experiments/locked-evaluation.md). Make the comparison difficult to move after seeing results.
3. [Try sampling uncertainty](experiments/uncertainty.md). See how little a short winning streak establishes.
4. [Change the opponent pool](experiments/opponent-pools.md). Watch a synthetic ranking reverse.
5. [Improve one trained policy](experiments/improve-policy.md). Change one mechanism and keep the starting checkpoint intact.
6. [Publish a reproducible result](reference/report.md). Separate measured evidence from interpretation.

## Watch before reading more

[Watch, play, try](resources/watch-play-try.md) pairs each online resource with a small action. Start with the Metamon Gen 1 demonstration, then play with an RL gridworld. External resources require internet. No media or game artwork is copied here.

## Keep it yours

Write your prediction before moving a slider or viewing a result. Keep your original wording when an agent suggests edits. A failed prediction is useful evidence about your mental model.

This article layout takes inspiration from Wikipedia's contents rail and article hierarchy, with monospaced details inspired by [Paper Mono](https://paper.design/mono). It uses system fonts without bundling a font. This project has no affiliation with Wikipedia or the challenge organizers.

The [local wiki guide](reference/local-wiki.md) explains the source, HTML folder tree, and native Wiki synchronization.
