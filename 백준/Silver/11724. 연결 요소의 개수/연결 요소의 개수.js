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

  readIntArray(delimiter = " ") {
    return this.read().split(delimiter).map(Number);
  }
}

const solve = () => {
  const lr = new LineReader();
  const [N, M] = lr.readIntArray();
  const graph = Array.from({ length: N + 1 }, () => []);
  
  for (let i = 0; i < M; i++) {
    const [from, to] = lr.readIntArray();
    graph[from].push(to);
    graph[to].push(from);
  }

  const visited = Array.from({ length: N + 1 }, () => false);

  visited[0] = true;

  const dfs = (now) => {
    for (const next of graph[now]) {
      if (!visited[next]) {
        visited[next] = true;
        dfs(next);
      }
    }
  }

  let answer = 0;

  for (let i = 1; i <= N; i++) {
    if (visited[i] === false)
      answer++;
    dfs(i);
  }

  return answer;
};

console.log(solve());