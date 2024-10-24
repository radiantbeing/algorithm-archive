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
  const [N, M] = reader.readIntArray();

  const edges = new Array(M).fill(null);

  for (let i = 0; i < M; i++) {
    edges[i] = reader.readIntArray();
  }

  const distance = new Array(N + 1).fill(Infinity);
  distance[1] = 0;

  for (let i = 0; i < N - 1; i++) {
    for (const [start, end, weight] of edges) {
      if (distance[end] > distance[start] + weight) {
        distance[end] = distance[start] + weight;
      }
    }
  }

  for (const [start, end, weight] of edges) {
    if (distance[end] > distance[start] + weight) {
      return -1;
    }
  }

  return distance
    .slice(2)
    .map(value => value === Infinity ? -1 : value)
    .join("\n");
}

console.log(solve());