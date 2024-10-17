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

  readIntArray() {
    return this.read().split(" ").map(s => parseInt(s));
  }
}

function solve() {
  const [n, m] = reader.readIntArray();
  
  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  
  const find = (vertex) => {
    if (vertex === parent[vertex])
      return vertex;

    parent[vertex] = find(parent[vertex]);
    return parent[vertex];
  };

  const union = (vertex1, vertex2) => {
    parent[find(vertex1)] = find(vertex2);
  };

  const answer = [];

  for (let i = 0; i < m; i++) {
    const [type, vertex1, vertex2] = reader.readIntArray();
    if (type === 0) {
      union(vertex1, vertex2);
    }
    if (type === 1) {
      const inSameSet = find(vertex1) === find(vertex2);
      answer.push(inSameSet ? "YES" : "NO");
    }
  }

  return answer.join("\n");
}

console.log(solve());