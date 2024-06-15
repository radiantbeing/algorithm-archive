const fs = require("fs");

class LineReader {
  data = fs
    .readFileSync(
      process.platform === "linux" ? 0 : "input.txt",
      "utf-8"
    )
    .toString()
    .trim()
    .split("\n");
  cursor = 0;

  read() {
    return this.data[this.cursor++];
  }

  readInt() {
    return Number(this.read());
  }

  readIntArray() {
    return this.read().split(" ").map(Number);
  }
}

const solve = () => {
  const lineReader = new LineReader();
  const N = lineReader.readInt();
  const graph = Array.from({ length: N + 1 }, () => []);

  for (let i = 0; i < N - 1; i++) {
    const [u, v] = lineReader.readIntArray();
    graph[u].push(v);
    graph[v].push(u);
  }

  let kMax = 0;

  while (2 ** kMax <= N) {
    kMax++;
  }
  
  const depth = Array(N + 1).fill(0);
  const visited = Array(N + 1).fill(false);
  const parent = Array.from({ length: kMax + 1 }, () => Array(N + 1).fill(0));

  const bfs = () => {
    const queue = [];
    queue.push(1);
    visited[1] = true;
    while (queue.length > 0) {
      const now = queue.shift();
      for (const next of graph[now]) {
        if (!visited[next]) {
          visited[next] = true;
          depth[next] = depth[now] + 1;
          parent[0][next] = now;
          queue.push(next);
        }
      }
    }
  };

  bfs();
  
  for (let k = 1; k <= kMax; k++) {
    for (let i = 0; i < N + 1; i++) {
      parent[k][i] = parent[k - 1][parent[k - 1][i]]
    }
  }

  const getLCA = (u, v) => {
    if (depth[u] > depth[v]) {
      [u, v] = [v, u];
    }
  
    for (let k = kMax; k >= 0; k--) {
      if (depth[v] - depth[u] >= (1 << k)) {
        v = parent[k][v];
      }
    }
  
    if (u === v) return u;
  
    for (let k = kMax; k >= 0; k--) {
      if (parent[k][u] !== parent[k][v]) {
        u = parent[k][u];
        v = parent[k][v];
      }
    }
  
    return parent[0][u];
  };

  const M = lineReader.readInt();

  let answer = "";

  for (let i = 0; i < M; i++) {
    const [u, v] = lineReader.readIntArray();
    const LCA = getLCA(u, v);
    answer += `${LCA}\n`;
  }

  return answer;
};

console.log(solve());