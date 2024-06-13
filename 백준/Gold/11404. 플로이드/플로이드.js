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
  const M = lineReader.readInt();
  const distance = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));

  for (let i = 1; i < N + 1; i++) {
      distance[i][i] = 0;
  }

  for (let i = 0; i < M; i++) {
    const [start, end, weight] = lineReader.readIntArray();
    if (distance[start][end] > weight)
      distance[start][end] = weight;
    }

  for (let k = 1; k < N + 1; k++) {
    for (let i = 1; i < N + 1; i++) {
      for (let j = 1; j < N + 1; j++) {
        distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
      }
    }
  }

  let answer = "";
  
  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      answer += `${distance[i][j] === Infinity ? 0 : distance[i][j]} `;
    }
    answer += "\n";
  }

  return answer;
};

console.log(solve());