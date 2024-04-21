const fs = require("fs");

const data = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "input.txt"
  )
  .toString()
  .trim();

const solve = () => {
  const [N, K] = data.split(" ").map(Number);
  const queue = [[N, 0]];
  const visited = Array(100_001).fill(false);
  
  let answer = 0;

  while (queue.length > 0) {
    const [pos, depth] = queue.shift();

    if (pos === K) {
      answer = depth;
      break;
    }

    for (const next of [pos + 1, pos - 1, pos * 2]) {
      const inValidRange = 0 <= next && next <= 100_000;
      const isVisited = visited[next];
      if (inValidRange && !isVisited) {
        visited[next] = true;
        queue.push([next, depth + 1]);
      }
    }
  }

  return answer;
};

console.log(solve());