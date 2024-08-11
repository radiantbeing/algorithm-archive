const fs = require('fs');

const data = fs
  .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

function solve() {
  const N = parseInt(data[0]);
  const S = data[1];

  const population = {};
  for (let i = 0; i < N; i++) {
    population[S[i]] = (population[S[i]] ?? 0) + 1;
  }

  const isOdd = N % 2 === 1;
  if (isOdd) {
    const midIdx = Math.floor(N / 2);
    delete population[S[midIdx]];
  }
  
  for (const key in population) {
    if (population[key] % 2 === 1)
      return 'No';
  }
  return 'Yes';
}

console.log(solve());