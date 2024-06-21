"use strict";

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input")
  .toString()
  .trim();

const [n, m, k] = input.split(' ').map(Number);

const solution = (n, m, k) => {
  let answer = '';

  const dp = Array.from({ length: 202 }, () => Array(202).fill(0));

  for (let i = 0; i < 201; i++) {
    for (let j = 0; j < i + 1; j++) {
      if (j === 0 || j === i) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
        if (dp[i][j] > 1000000000) {
          dp[i][j] = 1000000001;
        }
      }
    }
  }

  if (dp[n + m][m] < k) {
    answer = '-1';
    return answer;
  }

  while (!(n === 0 && m === 0)) {
    if (dp[n - 1 + m][m] >= k) {
      answer += 'a';
      n -= 1;
    } else {
      answer += 'z';
      k -= dp[n - 1 + m][m];
      m -= 1;
    }
  }

  return answer;
};

console.log(solution(n, m, k));