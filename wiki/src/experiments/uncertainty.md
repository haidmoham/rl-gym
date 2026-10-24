# How certain is a win rate?

A run can win more often by chance. Before seeing a result, decide how much evidence would change your mind. A short winning streak is a question for another experiment, not a performance claim.

## Try the sampling lab

Predict the width of the interval after 20 battles and after 500. Set a synthetic win probability, choose a sample size, and draw a sample. The same seed reproduces the same sample. No real policies or battle logs are involved.

{{gizmo:uncertainty}}

The interval is a two-sided approximate 95% Wilson interval with z = 1.959963984540054. The generator makes independent win/loss trials. Coverage describes repeated experiments under the assumptions and can differ from 95% for finite samples; this is not a 95% posterior probability about this one fixed parameter.

## Know what the example leaves out

This toy has no ties, team clusters, opponent adaptation, selection, or sequential stopping. The interval describes one win rate, not a candidate-minus-baseline difference. Do not infer a significant gain by comparing two separate intervals.

For the real comparison, keep paired outcomes and use the [precommitted analysis](locked-evaluation.md). Treat the unit of resampling as a scientific choice. Do not use a battle-level interval if independent units are actually team or opponent groups. Predeclare sample size rather than stopping at the first favorable interval.

## Record uncertainty as part of the finding

Use `templates/uncertainty.md` to record the estimand, assumptions, method, effect size, interval, exclusions, and limitations. Preserve the full outcome table. A null or inconclusive result can justify a decision when the uncertainty is clear.

Read the [NIST Wilson interval reference](https://www.itl.nist.gov/div898/handbook/prc/section2/prc241.htm) for the interval used here. This online reference requires internet. Return to [opponent pools](opponent-pools.md) to see uncertainty in a different dimension.
