const fs = require('fs');

const data = fs
  .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

function solve() {
  const N = parseInt(data[0]);
  const A = data[1].split(' ').map(n => parseInt(n));

  const dp = new Array(N + 1).fill(1);
  
  for (let i = 1; i <= N; i++) {
    for (let j = 0; j < i; j++) {
      if (A[i] > A[j])
        dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  
  const answer = Math.max(...dp);
  return answer;
}

console.log(solve());