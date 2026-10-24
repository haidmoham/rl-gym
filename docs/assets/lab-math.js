(function (root) {
  function seededRandom(seed) {
    let state = seed >>> 0;
    return function () {
      state = (state + 0x6D2B79F5) >>> 0;
      let value = Math.imul(state ^ (state >>> 15), 1 | state);
      value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function wilson(wins, count) {
    if (!Number.isInteger(count) || count < 1 || !Number.isInteger(wins) || wins < 0 || wins > count) {
      throw new RangeError('Wilson interval needs integer wins between zero and count.');
    }
    const z = 1.959963984540054;
    const proportion = wins / count;
    const divisor = 1 + z * z / count;
    const center = (proportion + z * z / (2 * count)) / divisor;
    const half = z * Math.sqrt(proportion * (1 - proportion) / count + z * z / (4 * count * count)) / divisor;
    return [Math.max(0, center - half), Math.min(1, center + half)];
  }

  function sampleWins(probability, count, seed) {
    const random = seededRandom(seed);
    let wins = 0;
    for (let i = 0; i < count; i++) if (random() < probability) wins++;
    return wins;
  }

  const rps = Object.freeze([
    Object.freeze([0, -1, 1]),
    Object.freeze([1, 0, -1]),
    Object.freeze([-1, 1, 0])
  ]);

  function opponentScores(weights) {
    if (weights.length !== 3 || weights.some(value => !Number.isFinite(value) || value < 0)) {
      throw new RangeError('Use three nonnegative opponent weights.');
    }
    const total = weights.reduce((sum, value) => sum + value, 0);
    if (total === 0) return null;
    const mixture = weights.map(value => value / total);
    const payoffs = rps.map(row => row.reduce((sum, value, i) => sum + value * mixture[i], 0));
    return { mixture, payoffs, scores: payoffs.map(value => (value + 1) / 2) };
  }

  root.RLGymMath = Object.freeze({ seededRandom, wilson, sampleWins, rps, opponentScores });
})(globalThis);
