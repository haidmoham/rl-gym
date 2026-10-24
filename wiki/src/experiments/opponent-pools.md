# Why opponent pools matter

An agent can beat one rival and lose to another that the first rival beats. A single scalar ranking can hide these cycles. Use a held-out opponent pool as well as a fixed published rival.

## Try a non-transitive tournament

This synthetic rock-paper-scissors tournament has three strategies. Each table entry is the row strategy's score against the column strategy: 1 for a win, 0.5 for a tie, and 0 for a loss. The cycle is Rock beats Scissors, Scissors beats Paper, and Paper beats Rock.

{{gizmo:opponents}}

Move the opponent weights. The row scores change while the matchup matrix stays fixed. Predict which strategy benefits when Paper becomes common. A score change caused by a changed opponent mixture is not evidence that a strategy learned anything.

## Carry the lesson into battles

Gen 1 OU is richer than this toy. Policies can specialize in particular teams, tactics, or opponent habits. A candidate can improve the pool average while losing badly in a prespecified slice. Record both the aggregate and the planned opponent/team slices.

Freeze opponent identities, checkpoint hashes, team splits, weights, and seeds in the [evaluation protocol](locked-evaluation.md). Keep the fixed rival unchanged. Adding a new diagnostic opponent after looking at failures is useful exploration; it is not the original confirmatory test.

## Choose the next experiment

If a candidate only beats the start against one opponent, write a hypothesis about that interaction. Test it on development opponents first. Do not retune the holdout mixture until the headline number rises.

Continue to [one policy improvement](improve-policy.md).
