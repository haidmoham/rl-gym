# Improve one trained policy

Begin only after a baseline receipt and locked protocol exist. The first training experiment should have one mechanism you can explain and one outcome that could falsify your hypothesis.

## Write the prediction yourself

Complete `templates/hypothesis.md`. Name the suspected failure, the evidence that motivated it, the single change, and the observation that would count against it. Agent suggestions belong in a separate section. Do not rewrite a prediction after seeing the result.

Candidate questions include whether a data filter changes a specific development failure, whether a reward change increases wins rather than shaped return, or whether memory matters on a defined hidden-information slice. These are hypotheses, not recommendations or findings.

## Preserve the control

Copy or hash the starting checkpoint and keep it immutable. Record the training code commit, full command, input manifests, RNG seeds, optimizer state, resume policy, and [compute ledger](../reference/report.md). Train only within a separately authorized budget. A simulator bug fix requires re-establishing the baseline under the changed environment.

## Select without the final holdout

Choose a candidate on development data using the rule you froze. Include all training seeds and failed runs in the record. Do not choose whichever seed wins the final evaluation. Account for every tried configuration, not just the successful one.

## Evaluate and decide

Compare the selected candidate and unchanged start on the [locked schedule](locked-evaluation.md). Then test the fixed rival. Report effect sizes, uncertainty, failures, latency, and compute. A win in one matchup is not evidence of universal or state-of-the-art strength.

Use `templates/decision-log.md` to accept, reject, or defer the change. Link the evidence and keep alternative explanations visible. An inconclusive result is a valid reason to collect more evidence under a new explicit plan.

Finish with a [reproducible report](../reference/report.md).
