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
  const graph = Array.from({ length: N + 1 }, () => []);
  const selfBuild = Array(N + 1).fill(0);

  const indegree = Array(N + 1).fill(0);

  for (let i = 1; i <= N; i++) {
    const [time, ...preBuilds] = reader.readIntArray();

    selfBuild[i] = time;

    for (const build of preBuilds) {
      if (build === -1) break;
      graph[build].push(i);
      indegree[i]++;
    }
  }

  const queue = [];

  for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0)
      queue.push(i);
  }

  const answer = Array(N + 1).fill(0);

  while (queue.length > 0) {
    const now = queue.shift();
    for (const next of graph[now]) {
      indegree[next]--;
      answer[next] = Math.max(answer[next], answer[now] + selfBuild[now]);
      if (indegree[next] === 0)
        queue.push(next);
    }
  }

  for (let i = 1; i <= N; i++) {
    answer[i] += selfBuild[i];
  }

  return answer.slice(1).join("\n");
}

console.log(solve());