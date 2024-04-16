const fs = require("fs");

const lines = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let l = 0;

const T = +lines[l++];

let answer = "";

for (let t = 0; t < T; t++) {
  // 입력 정제
  const [N, K] = lines[l++].split(" ").map((v) => +v);
  const times = [0].concat(lines[l++].split(" ").map((v) => +v));

  const graph = Array.from({ length: N + 1 }, () => []);
  const inDegrees = Array.from({ length: N + 1}, () => 0);

  for (let k = 0; k < K; k++) {
    const [source, destination] = lines[l++].split(" ").map((v) => +v);
    graph[source].push(destination);
    inDegrees[destination]++;
  }

  const target = lines[l++];

  // 솔루션
  const queue = [];
  const dp = Array.from({ length: N + 1 }, () => -Infinity);

  for (let i = 1; i < N + 1; i++) {
    if (inDegrees[i] === 0) {
      queue.push(i);
      dp[i] = times[i];
    }
  }

  while (queue.length > 0) {
    const now = queue.shift();

    for (const next of graph[now]) {
      dp[next] = Math.max(dp[next], dp[now] + times[next]);
      inDegrees[next]--;
      if (inDegrees[next] === 0) {
        queue.push(next);
      }
    }
  }

  answer += `${dp[target]}\n`;
}

console.log(answer);