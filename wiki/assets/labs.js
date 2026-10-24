(() => {
  const math = globalThis.RLGymMath;
  const percent = value => `${(value * 100).toFixed(1)}%`;
  const uncertainty = document.querySelector('[data-lab="uncertainty"]');
  if (uncertainty) {
    const form = uncertainty.querySelector('form');
    const draw = () => {
      const probability = Number(form.elements.probability.value) / 100;
      const count = Number(form.elements.count.value);
      const seed = Number(form.elements.seed.value);
      uncertainty.querySelector('[data-probability]').textContent = percent(probability);
      const wins = math.sampleWins(probability, count, seed);
      const [low, high] = math.wilson(wins, count);
      uncertainty.querySelector('[data-result]').textContent = `${wins} wins / ${count} trials = ${percent(wins / count)}. Wilson 95% interval: ${percent(low)} to ${percent(high)}. Seed ${seed}.`;
      uncertainty.querySelector('[data-interval]').style.left = percent(low);
      uncertainty.querySelector('[data-interval]').style.width = percent(high - low);
      uncertainty.querySelector('[data-estimate]').style.left = percent(wins / count);
      uncertainty.querySelector('[data-truth]').style.left = percent(probability);
    };
    form.addEventListener('submit', event => { event.preventDefault(); if (form.reportValidity()) draw(); });
    form.addEventListener('input', () => {
      uncertainty.querySelector('[data-probability]').textContent = `${form.elements.probability.value}%`;
    });
    form.addEventListener('reset', () => setTimeout(draw, 0));
    draw();
  }

  const opponents = document.querySelector('[data-lab="opponents"]');
  if (opponents) {
    const form = opponents.querySelector('form');
    const names = ['Rock', 'Paper', 'Scissors'];
    const draw = () => {
      const weights = names.map(name => Number(form.elements[name.toLowerCase()].value));
      names.forEach((name, i) => { opponents.querySelector(`[data-weight="${name}"]`).textContent = weights[i]; });
      const result = math.opponentScores(weights);
      const output = opponents.querySelector('[data-result]');
      if (!result) {
        output.textContent = 'Set at least one opponent weight above zero. The mixture is undefined.';
        opponents.querySelectorAll('[data-score]').forEach(cell => { cell.textContent = 'undefined'; });
        return;
      }
      opponents.querySelectorAll('[data-score]').forEach((cell, i) => { cell.textContent = `${percent(result.scores[i])} (payoff ${result.payoffs[i].toFixed(2)})`; });
      const best = Math.max(...result.payoffs);
      const winners = names.filter((_, i) => Math.abs(result.payoffs[i] - best) < 1e-10);
      output.textContent = `Opponent mixture: ${names.map((name, i) => `${name} ${percent(result.mixture[i])}`).join(', ')}. Pure best responses: ${winners.join(', ')}.`;
    };
    form.addEventListener('input', draw);
    form.addEventListener('reset', () => setTimeout(draw, 0));
    draw();
  }
})();
