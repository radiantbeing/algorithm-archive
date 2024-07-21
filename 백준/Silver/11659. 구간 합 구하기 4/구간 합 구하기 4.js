const fs = require("fs");

class Reader {
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

  readIntArray() {
    return this.read().split(" ").map(Number);
  }
}

function solve() {
  const reader = new Reader();
  const [N, M] = reader.readIntArray();
  const numbers = [0, ...reader.readIntArray()];

  const prefixSum = new Array(N + 1).fill(0);
  const answer = [];

  for (let i = 1; i <= N; i++) {
    prefixSum[i] = prefixSum[i - 1] + numbers[i];
  }
  
  for (let i = 0; i < M; i++) {
    const [startIndex, endIndex] = reader.readIntArray();
    answer.push(prefixSum[endIndex] - prefixSum[startIndex - 1]);
  }

  return answer.join("\n");
}

console.log(solve());