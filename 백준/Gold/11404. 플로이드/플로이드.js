const fs = require("fs");

class Reader {
  data = fs
    .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
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

function solve() {
  const reader = new Reader();
  const N = reader.readInt();
  const M = reader.readInt();

  // 인접 행렬
  const graph = Array.from(
    { length: N + 1 }, 
    () => new Array(N + 1).fill(Infinity)
  );

  for (let i = 1; i <= N; i++) {
    graph[i][i] = 0;
  }
  
  for (let i = 0; i < M; i++) {
    const [s, e, w] = reader.readIntArray();
    graph[s][e] = Math.min(graph[s][e], w);
  }

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }

  const answer = [];

  for (let i = 1; i <= N; i++) {
    const temp = [];
    for (let j = 1; j <= N; j++) {
      temp.push(graph[i][j] === Infinity ? 0 : graph[i][j]);
    }
    answer.push(temp.join(" "));
  }

  return answer.join("\n");
}

console.log(solve());