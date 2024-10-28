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
  const M = reader.readInt();

  const distance = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(Infinity));

  for (let i = 1; i <= N; i++) {
    distance[i][i] = 0;
  }

  for (let i = 0; i < M; i++) {
    const [A, B, C] = reader.readIntArray();
    distance[A][B] = Math.min(distance[A][B], C);
  }

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
      }
    }
  }

  let answer = "";

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
      const dist = distance[i][j] === Infinity ? 0 : distance[i][j];
      answer += `${dist} `;
    }
    answer += "\n";
  }

  return answer;
}

console.log(solve());