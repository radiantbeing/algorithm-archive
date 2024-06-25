'use strict'

const fs = require('fs');

function input() {
  const file = fs
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input')
    .toString()
    .trim()
    .split('\n');
  const n = Number(file.shift());
  const matrix = [[0, 0], ...file.map((f) => f.split(' ').map(Number))];
  return [n, matrix];
}

function solution(n, matrix) {
  let answer = 0;

  let dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(-1));

  function execute(s, e) {
    let result = Number.MAX_SAFE_INTEGER;

    if (dp[s][e] !== -1) {
      return dp[s][e];
    } 
    if (s === e) {
      return 0;
    }
    if (s + 1 === e) {
      return matrix[s][0] * matrix[s][1] * matrix[e][1];
    }
    for (let i = s; i < e; i++) {
      result = Math.min(result, matrix[s][0] * matrix[i][1] * matrix[e][1] + execute(s, i) + execute(i + 1, e));
    }
    dp[s][e] = result;
    return dp[s][e];
  }

  answer = execute(1, n);
  return answer;
}

console.log(solution(...input()));
