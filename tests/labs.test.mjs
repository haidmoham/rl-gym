import test from 'node:test';
import assert from 'node:assert/strict';
import '../wiki/assets/lab-math.js';

const { sampleWins, wilson, opponentScores, rps } = globalThis.RLGymMath;

test('seeded sampling reproduces a sample and respects certain outcomes', () => {
  assert.equal(sampleWins(.55, 100, 42), sampleWins(.55, 100, 42));
  assert.equal(sampleWins(0, 100, 42), 0);
  assert.equal(sampleWins(1, 100, 42), 100);
});

test('Wilson interval matches known values and reflects complementary outcomes', () => {
  const [low, high] = wilson(50, 100);
  assert(Math.abs(low - .4038315304) < 1e-9);
  assert(Math.abs(high - .5961684696) < 1e-9);
  const a = wilson(30, 100);
  const b = wilson(70, 100);
  assert(Math.abs(a[0] - (1 - b[1])) < 1e-12);
  assert(Math.abs(a[1] - (1 - b[0])) < 1e-12);
  assert(wilson(0, 10)[0] < 1e-12);
  assert(wilson(10, 10)[1] > 1 - 1e-12);
  assert.throws(() => wilson(0, 0), RangeError);
  assert.throws(() => wilson(11, 10), RangeError);
});

test('more trials narrow the balanced interval', () => {
  const short = wilson(10, 20);
  const long = wilson(250, 500);
  assert(long[1] - long[0] < short[1] - short[0]);
});

test('RPS is a genuine three-strategy zero-sum cycle', () => {
  assert.equal(rps[0][2], 1);
  assert.equal(rps[2][1], 1);
  assert.equal(rps[1][0], 1);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) assert.equal(rps[i][j] + rps[j][i], 0);
});

test('uniform opponents pay zero to every pure strategy; changing only weights reverses the best response', () => {
  assert.deepEqual(opponentScores([1, 1, 1]).payoffs, [0, 0, 0]);
  assert.deepEqual(opponentScores([1, 1, 1]).scores, [.5, .5, .5]);
  assert.deepEqual(opponentScores([1, 0, 0]).scores, [.5, 1, 0]);
  assert.deepEqual(opponentScores([0, 1, 0]).scores, [0, .5, 1]);
  assert.deepEqual(opponentScores([0, 0, 1]).scores, [1, 0, .5]);
  assert.deepEqual(opponentScores([10, 0, 0]), opponentScores([1, 0, 0]));
  assert.equal(opponentScores([0, 0, 0]), null);
  assert.throws(() => opponentScores([-1, 2, 3]), RangeError);
});
