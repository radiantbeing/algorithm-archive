const fs = require("fs");

class LineReader {
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
    return this.read().split(" ").map(Number);
  }
}

const solve = () => {
  const lineReader = new LineReader();

  const [V, E] = lineReader.readIntArray();
  const edges = [];

  for (let i = 0; i < E; i++) {
    edges.push(lineReader.readIntArray());
  }

  const parents = Array.from({ length: V + 1 }, (_, i) => i);

  const find = (v) => {
    if (parents[v] === v) return v;
    return (parents[v] = find(parents[v]));
  };

  const union = (u, v) => {
    parents[find(u)] = find(v);
  };

  let count = 0;
  let sum = 0;

  edges.sort((a, b) => a[2] - b[2]);
    
  for (const [start, end, weight] of edges) {
    if (find(start) === find(end)) {
      continue;
    }
    union(start, end);
    count++;
    sum += weight;
    if (count === V - 1) {
      break;
    }
  }

  return sum;
};

console.log(solve());
