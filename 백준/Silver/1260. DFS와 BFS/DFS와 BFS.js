const fs = require("fs");

const reader = new class {
  data = fs
    .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
    .toString()
    .trim()
    .split("\n");
  
  cursor = 0;

  read() {
    return this.data[this.cursor++];
  }

  readIntArray() {
    return this.read().split(" ").map(s => parseInt(s));
  }
}

function solve() {
  const [N, M, source] = reader.readIntArray();

  const graph = Array.from({ length: N + 1 }, () => []);
  let visited = new Array(N + 1).fill(false);
  let order = "";

  for (let _ = 0; _ < M; _++) {
    const [start, end] = reader.readIntArray();
    graph[start].push(end);
    graph[end].push(start);
  }

  for (let i = 1; i <= N; i++) {
    graph[i].sort((a, b) => a - b);
  }

  const clearVisited = () => {
    visited = visited.fill(false);
  };

  const dfs = (now) => {
    order += `${now} `;
    visited[now] = true;
    for (const next of graph[now]) {
      if (!visited[next]) {
        dfs(next);
      }
    }
  };
  
  const bfs = (source) => {
    const queue = [];
    queue.push(source);
    visited[source] = true;
    
    while (queue.length > 0) {
      const now = queue.shift();
      order += `${now} `;
      for (const next of graph[now]) {
        if (!visited[next]) {
          visited[next] = true;
          queue.push(next);
        }
      }
    }
  };
  
  dfs(source);

  order += "\n";
  clearVisited();
  
  bfs(source);

  return order;
}

console.log(solve());