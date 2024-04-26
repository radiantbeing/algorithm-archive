const fs = require("fs");

class LineReader {
  constructor() {
    this.data = fs
      .readFileSync(
        process.platform === "linux" ? "/dev/stdin" : "input.txt"
      )
      .toString()
      .trim()
      .split("\n");
    this.cursor = 0;
  }

  read() {
    return this.data[this.cursor++];
  }

  readIntArray() {
    return this.read().split(" ").map(Number);
  }
}

const solve = () => {
  const lr = new LineReader();
  const [N, M, V] = lr.readIntArray();
  const graph = Array.from({ length: N + 1 }, () => []);

  for (let i = 0; i < M; i++) {
    const [from, to] = lr.readIntArray();
    graph[from].push(to);
    graph[to].push(from);
  }

  for (let i = 1; i < N + 1; i++) {
    graph[i].sort((a, b) => a - b);
  }

  // DFS
  const visitedDFS = Array(N + 1).fill(false);
  let answerDFS = "";

  const dfs = (now) => {
    answerDFS += `${now} `;
    for (const next of graph[now]) {
      if (!visitedDFS[next]) {
        visitedDFS[next] = true;
        dfs(next);
      }
    }
  };

  visitedDFS[V] = true;
  dfs(V);

  // BFS
  const queue = [];
  const visitedBFS = Array(N + 1).fill(false);

  visitedBFS[V] = true;
  queue.push(V);

  let answerBFS = "";

  while (queue.length > 0) {
    const now = queue.shift();
    answerBFS += `${now} `;
    for (const next of graph[now]) {
      if (!visitedBFS[next]) {
        visitedBFS[next] = true;
        queue.push(next);
      }
    }
  }

  return answerDFS + "\n" + answerBFS;
};

console.log(solve());