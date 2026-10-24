# Watch, play, try

Use one resource when it helps the next experiment. These are optional activities, not a playlist to finish first. External resources require internet and open only when you follow their links. No videos, transcripts, or third-party interactive code are bundled.

## See the target behavior

**Watch · Internet required.** [Metamon Gen 1 gameplay](https://metamon.tech/static/video/gen1ou_vs_pokellmon_updated_compressed.mp4), from the [official project](https://metamon.tech/).

**Try.** Pause before three decisions. Record observable versus hidden information and your own action.

**Question.** What information could explain a switch that first looked wrong?

**Limits.** A selected video is not an evaluation. Metamon's original method uses offline RL and sequence models. PokéChamp is a separate LLM inference/search approach, not evidence for a Gen 1 PPO baseline or extra LLM training.

## Manipulate a policy

**Play · Internet required.** [Arthur Juliani's beginner RL playground](https://awjuliani.github.io/web-rl-playground/).

**Try.** Create a gem, hazard, and wall. Start learning. Compare gamma 0.3 and 0.95 with a reset between runs, then inspect Values and Policy.

**Observe.** Separate rewards, Q-values, and action probabilities. Predict a change before touching epsilon.

**Limits.** Action values are not win probabilities. A visible gridworld is not a partially observed battle.

**Play · Internet required.** [The paths perspective on value learning, Greydanus and Olah](https://distill.pub/2019/paths-perspective-on-value-learning/).

**Try.** Use the bottom Gridworld playground. Add an agent and compare Monte Carlo, Sarsa, Expected Sarsa, and Q-Learning while varying exploration.

**Observe.** How do later outcomes update earlier decisions? Trace one value change.

**Limits.** Bootstrapping can propagate estimation errors. Full article reading is optional; the gridworld does not model hidden opponent teams.

## Implement and debug one change

**Watch · Internet required.** [Costa Huang's PPO implementation, part 1](https://www.youtube.com/watch?v=MEt6rrxH8W4). Use [current CleanRL PPO documentation](https://docs.cleanrl.dev/rl-algorithms/ppo/) for implementation details.

**Try.** After reproduction and separate training authorization, hold the distribution fixed and change advantage normalization only. Inspect KL, clip fraction, entropy, explained variance, and held-out strength across seeds.

**Question.** Did the proposed mechanism change, or only one favorable score?

**Limits.** This teaches PPO implementation. It does not establish that PPO is the right first change to the released offline-RL policy. Current uploader branding is CoreWeave; older references use Weights & Biases.

**Watch · Internet required.** [Peter Whidden, Training AI to Play Pokemon with Reinforcement Learning](https://www.youtube.com/watch?v=DcYLT37ImBY). The technical-challenges chapter starts at 20:26. [Companion code](https://github.com/PWhiddy/PokemonRedExperiments).

**Try.** Add one metric or replay annotation that exposes a failure hidden by scalar reward.

**Question.** What behavior would your reward curve fail to reveal?

**Limits.** This is Pokémon Red navigation, not competitive battling. Do not transfer its task rewards blindly.

**Watch · Internet required.** [John Schulman, Nuts and Bolts of Deep RL Experimentation](https://www.youtube.com/watch?v=8EcdaCk9KaQ), from the [Deep RL Bootcamp](https://sites.google.com/view/deep-rl-bootcamp/lectures).

**Try.** Design a tiny known-answer probe before restoring full battle complexity. [Andy Jones's debugging checklist](https://andyljones.com/posts/rl-debugging.html) is a practical companion.

**Question.** What result would prove that the observation, action, or reward path is broken?

**Limits.** A passing toy probe narrows a bug search; it does not establish competitive strength. No full course is required.

## Test your evaluation intuition locally

**Play · Works offline.** [Draw synthetic battles](../experiments/uncertainty.md).

**Try.** Compare 20 and 500 trials with a fixed seed. **Observe.** Explain the interval width. **Limits.** Independent Bernoulli trials are not paired battle differences.

**Play · Works offline.** [Move the opponent weights](../experiments/opponent-pools.md).

**Try.** Change the leading strategy without changing any matchup. **Observe.** State why opponent weights must be frozen. **Limits.** The synthetic cycle is not a learned Pokémon policy.

## Explore only when a question calls for it

**Play · Internet required.** [Mark Reid's multi-armed bandit demo](https://mark.reid.name/code/bandits/).

**Try.** Create Random and UCB1 agents with Bernoulli arms 0.1, 0.3, and 0.8. Run 500 steps, then move the best arm probabilities closer.

**Observe.** When is exploration worth its short-run cost? **Limits.** These are stationary bandits, not stateful battles. This UI has neither Thompson sampling nor epsilon-greedy.

**Play · Internet required.** [Seeing Theory, Bayesian inference](https://seeing-theory.brown.edu/bayesian-inference/index.html).

**Try.** In Prior to Posterior, compare Beta(1,1) and a stronger prior after 10 flips. **Observe.** Explain how the posterior changes. **Limits.** Coin uncertainty is an analogy, not a full battle belief state. This is an archived site with a working widget.

**Play · Internet required.** [Seeing Theory, frequentist inference](https://seeing-theory.brown.edu/frequentist-inference/index.html).

**Try.** Compare intervals at n=5 and n=50, then use Bootstrap Sample and Resample. **Observe.** Explain the interval procedure. **Limits.** Generic means are not paired battle statistics. Resample the actual independent unit in the real protocol.

**Play · Internet required.** [Christoph Hauert's EvoLudo rock-paper-scissors lab](https://wiki.evoludo.org/index.php?title=EvoLudoLab:_Rock-Paper-Scissors_-_SDE_with_Mutations).

**Try.** Watch the simplex, pause, step, and change the initial mixture. **Observe.** Why can today's winner lose as the population changes? **Limits.** These are evolutionary dynamics, not PPO.

**Play · Internet required.** [EngineersOfAI's REINFORCE playground](https://engineersofai.com/playground/policy-gradient).

**Try.** Train 10 toy episodes with the baseline on. Reset and compare baseline off across several runs. **Observe.** What does baseline subtraction change? **Limits.** This is policy-gradient intuition, not PPO or proof that one run must learn faster. Training occurs on the external page when you choose it, not during this wiki build.

## Consider hidden information and opponent diversity later

**Watch · Internet required.** [Noam Brown's ReBeL talk](https://www.youtube.com/watch?v=-b33wavGOOw), with [Simons talk details](https://simons.berkeley.edu/talks/rebel-combining-deep-reinforcement-learning-search-imperfect-information-games).

**Try.** Design a history-blind versus legal-history-aware comparison on a tiny held-out hidden-state task. **Question.** Which observation would separate the two? **Limits.** ReBeL is not a drop-in Pokémon solver.

**Watch · Internet required.** [AlphaStar exploiter discovery](https://www.youtube.com/watch?v=KPLYhRBCcvk), with [DeepMind's league explanation](https://deepmind.google/blog/alphastar-grandmaster-level-in-starcraft-ii-using-multi-agent-reinforcement-learning/).

**Try.** Propose latest-only versus historical-pool training against the same fixed held-out panel. **Question.** Which opponent-specific regression could a pool average hide? **Limits.** A toy pool does not reproduce AlphaStar.

**Watch · Internet required.** [OpenAI Hide and Seek](https://www.youtube.com/watch?v=kopoLzvh5jY), with the [project explanation](https://openai.com/index/emergent-tool-use/).

**Try.** Compare old and new checkpoint replays for simulator exploits. **Question.** Does reward mean the behavior you intended? **Limits.** This is a different environment and project from OpenAI Five.

## Read the implementation only when needed

**Try · Metamon baseline toolkit · Internet required.** [Inspect the released code](https://github.com/UT-Austin-RPL/metamon). Find the proposed `Minikazam` and `Kakuna` definitions and their artifact identifiers. Record provenance before requesting downloads. This is a reference for the [first baseline](../start/first-baseline.md), not a reason to install or train during wiki setup.

**Try · Official challenge rules · Internet required.** [Inspect the battling guide](https://pokeagentchallenge.com/battling.html). Write down the standard timer and verification requirements. Recheck before future participation. Account registration and official-server play need separate authorization.

## Resource provenance

Companion researchers checked these resources on 2026-10-24. They smoke-tested the seven external interactive widgets with the activities described above. They checked video titles, channels, and official companion sources; full video playback was not reviewed. The direct Metamon clip returned HTTP 200 with video/mp4. External pages can change. Do not invent timestamps or mirror third-party assets. Keep additions tied to an experiment.
