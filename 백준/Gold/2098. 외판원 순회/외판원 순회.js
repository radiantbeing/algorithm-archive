const fs = require('fs');

class Reader {
  data = fs
    .readFileSync(process.platform === 'linux' ? 0 : 'input.txt')
    .toString()
    .trim()
    .split('\n');

  cursor = 0;

  read() {
    return this.data[this.cursor++];
  }

  readInt() {
    return parseInt(this.read());
  }
  
  readIntArray() {
    return this.read().split(' ').map(n => parseInt(n));
  }
}

function solve() {
  const reader = new Reader();
  const N = reader.readInt();
  const weight = [];

  for (let i = 0; i < N; i++) {
    weight.push(reader.readIntArray());
  }

  const dp = Array.from({ length: N }, () => new Array(1 << N).fill(0));

  function getMinCost(c, v) {
    if (v === ((1 << N) - 1)) {
      if (weight[c][0] === 0)
        return Infinity;
      else
        return weight[c][0];
    }
    if (dp[c][v] !== 0)
      return dp[c][v];
    let min = Infinity;
    for (let i = 0; i < N; i++) {
      if ((v & (1 << i)) === 0 && weight[c][i] !== 0)
        min = Math.min(min, getMinCost(i, v | (1 << i)) + weight[c][i]);
    }
    dp[c][v] = min;
    return dp[c][v];
  }

  return getMinCost(0, 1);
}

console.log(solve());