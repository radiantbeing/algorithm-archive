"use strict";

const fs = require("fs");

function inputs() {
  const file = fs
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input")
    .toString()
    .trim()
    .split("\n")
    .map((row) => row.split(" ").map(Number));
  const [n, m, k] = file.shift();
  return [n, m, k, file];
}

function solution(n, m, k, matrix) {
  let answer = "";

  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  const depth = Math.floor(Math.min(n, m) / 2);

  function rotate() {
    let newMatrix = Array.from({ length: n }, () => Array(m).fill(null));
    for (let i = 0; i < depth; i++) {
      let r = i;
      let c = i;
      let direction = 0;

      while (direction < 4) {
        if (
          i <= r + dx[direction] &&
          r + dx[direction] < n - i &&
          i <= c + dy[direction] &&
          c + dy[direction] < m - i
        ) {
          newMatrix[r + dx[direction]][c + dy[direction]] = matrix[r][c];
          r = r + dx[direction];
          c = c + dy[direction];
        } else {
          direction++;
        }
      }
    }
    return newMatrix;
  }

  for (let i = 0; i < k; i++) {
    matrix = rotate();
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      answer += `${matrix[i][j]} `;
    }
    answer += "\n";
  }

  return answer;
}

console.log(solution(...inputs()));
