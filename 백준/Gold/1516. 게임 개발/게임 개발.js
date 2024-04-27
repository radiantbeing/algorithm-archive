const fs = require("fs");

class LineReader {
  constructor() {
    this.data = fs
      .readFileSync(
        process.platform === "linux" ? 0 : "input.txt",
        "utf-8"
      )
      .toString()
      .trimEnd()
      .split("\n");
    this.cursor = 0;
  }

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
  const lr = new LineReader();

  const N = lr.readInt();
  const graph = Array.from({ length: N + 1 }, () => []);
  const indegree = Array.from({ length: N + 1 }, () => 0);
  const buildTime = Array.from({ length: N + 1 }, () => 0);

  for (let i = 1; i < N + 1; i++) {
    const [time, ...preBuildings] = lr.readIntArray();
    buildTime[i] = time;
    for (const building of preBuildings) {
      if (building === -1) break;
      graph[building].push(i);
      indegree[i]++;
    }
  }

  const queue = [];

  for (let i = 1; i < N + 1; i++) {
    if (indegree[i] === 0)
      queue.push(i);
  }  

  const result = Array.from({ length: N + 1 }, () => 0);

  while(queue.length > 0) {
    const now = queue.shift();
    for (const next of graph[now]) {
        indegree[next]--;
        result[next] = Math.max(result[next], result[now] + buildTime[now]);
        if (indegree[next] === 0)
          queue.push(next);
    }
  }

  let answer = "";

  for (let i = 1; i < N + 1; i++) {
    answer += (result[i] + buildTime[i]) + "\n";
  }

  return answer;
};

console.log(solve());