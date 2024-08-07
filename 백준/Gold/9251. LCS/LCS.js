const fs = require('fs');

const data = fs
  .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

function solve() {
  const s1 = [null, ...data[0]],
        s2 = [null, ...data[1]],
        len1 = data[0].length,
        len2 = data[1].length,
        dp = Array.from({ length: len1 + 1 }, () => new Array(len2 + 1).fill(0));
  
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (s1[i] === s2[j])
        dp[i][j] = dp[i - 1][j - 1] + 1;
      else
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
    }
  }

  return dp[len1][len2];
}

console.log(solve());