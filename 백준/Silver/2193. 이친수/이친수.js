'use strict'

const fs = require('fs');

function input() {
  const file = fs
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
    .toString()
    .trim();
  
  const n = Number(file);
  return n;
}

function solution(n) {
  let answer = '';
  let dp = Array.from({ length: n + 1 }, () => [BigInt(0), BigInt(0)]);

  dp[1][0] = BigInt(0);
  dp[1][1] = BigInt(1);
  
  for (let i = 2; i < n + 1; i++) {
    dp[i][0] = dp[i - 1][0] + dp[i - 1][1];
    dp[i][1] = dp[i - 1][0];
  }

  answer = (dp[n][0] + dp[n][1]).toString();
  return answer;
}

console.log(solution(input()));