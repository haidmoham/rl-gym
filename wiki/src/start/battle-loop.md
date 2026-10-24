# Read a battle as an RL loop

A battle is a sequence of decisions under partial information. The policy sees its legal observation, selects an action, receives a transition and reward, and updates its recurrent state. Training may change parameters; evaluation must not.

## Separate state from observation

The simulator knows more than either player. An observation can include revealed moves and the player's own team while hiding the opponent's unrevealed choices. A spectator replay is not automatically a legal first-person training observation.

Before implementing anything, annotate one turn with what was known at decision time, what was revealed afterward, and what remained hidden. Check [Metamon's project explanation](https://metamon.tech/) for the reconstruction problem. Keep future information out of the policy input.

## Follow one action

Write the legal moves and switches at a chosen turn. Predict what an action mask should exclude. Then inspect the selected action, damage or status outcome, reward, and termination signal. A shaped reward is a training signal; winning the battle is an evaluation outcome. They can disagree.

An illegal action, disconnect, crash, or timeout needs an explicit outcome rule in the [locked protocol](../experiments/locked-evaluation.md). Quietly dropping it changes the measured policy.

## Watch and predict

**Watch · Internet required.** Open the [Metamon Gen 1 OU demonstration](https://metamon.tech/). Pause before a switch. List two plausible opponent actions and say what evidence favors each. The hosted clip is a behavior example, not proof that this repository reproduces it.

**Play · Internet required.** Use [Arthur Juliani's RL playground](https://awjuliani.github.io/web-rl-playground/). Change epsilon while holding the reward map fixed. Predict how the action probabilities change. A visible gridworld has much less hidden information than a battle, so do not carry its assumptions over unchanged.

## Trace a learning target

A return uses future rewards along an episode. A temporal-difference target also uses a value estimate at a later state. Bootstrap error, limited observations, and distribution shift can affect that estimate.

**Try · Internet required.** Play the opening animation in [The paths perspective on value learning](https://distill.pub/2019/paths-perspective-on-value-learning/). Compare how Monte Carlo and temporal-difference estimates use intersecting paths. Then sketch one possible battle trajectory. State where the analogy fails under hidden information.

Write a hypothesis before choosing [one policy improvement](../experiments/improve-policy.md).
