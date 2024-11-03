const fs = require("fs");

const reader = {
  data: fs
    .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
    .toString()
    .trim()
    .split("\n"),
  
  cursor: 0,

  read() {
    return this.data[this.cursor++];
  },

  readInt() {
    return parseInt(this.read());
  },

  readIntArray() {
    return this.read().split(" ").map(s => parseInt(s));
  }
};

function solve() {
  const N = reader.readInt();
  const tree = Array.from({ length: N + 1 }, () => []);

  for (let i = 0; i < N - 1; i++) {
    const [node1, node2] = reader.readIntArray();
    tree[node1].push(node2);
    tree[node2].push(node1); 
  }

  let kMax = 0;

  while (1 << kMax <= N) {
    kMax++;
  }

  const depth = Array(N + 1).fill(0);
  const parent = Array.from({ length: kMax + 1 }, () => Array(N + 1).fill(0));
  const visited = Array(N + 1).fill(false);

  const bfs = (node) => {
    const queue = [];
    queue.push(node);
    visited[node] = true;
    
    while (queue.length > 0) {
      const now = queue.shift();
      for (const next of tree[now]) {
        if (!visited[next]) {
          visited[next] = true;
          queue.push(next);
          parent[0][next] = now;
          depth[next] = depth[now] + 1;
        }
      }
    }
  };
 
  bfs(1);

  for (let k = 1; k <= kMax; k++) {
    for (let n = 1; n <= N; n++) {
      parent[k][n] = parent[k - 1][parent[k - 1][n]];
    }
  }

  const getLCA = (a, b) => {
    if (depth[a] > depth[b])
      [a, b] = [b, a];

    for (let k = kMax; k >= 0; k--) {
      if (1 << k <= depth[b] - depth[a])
        b = parent[k][b];
    }

    if (a === b)
      return a;

    for (let k = kMax; k >= 0; k--) {
      if (parent[k][a] !== parent[k][b]) {
        a = parent[k][a];
        b = parent[k][b];
      }
    }

    return parent[0][a];
  };

  const M = reader.readInt();
  let answer = "";

  for (let i = 0; i < M; i++) {
    const [node1, node2] = reader.readIntArray();
    answer += `${getLCA(node1, node2)}\n`;
  }

  return answer;
}

console.log(solve());