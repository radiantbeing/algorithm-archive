const fs = require("fs");

class LineReader {
  constructor() {
    this.data = fs
      .readFileSync(
        process.platform === "linux" ? "/dev/stdin" : "input.txt"
      )
      .toString()
      .trim()
      .split("\n");
    this.cursor = 0;
  }

  read() {
    return this.data[this.cursor++];
  }

  readIntArray(delimiter = " ") {
    return this.read().split(delimiter).map(Number);
  }
}

const solve = () => {
  const lr = new LineReader();
  const [N, M] = lr.readIntArray();

  const numbers = lr.readIntArray();
  const prefixSum = [...numbers];

  for (let i = 1; i < N; i++) {
    prefixSum[i] = prefixSum[i - 1] + numbers[i];
  }

  let answer = "";

  for (let i = 0; i < M; i++) {
    let [start, end] = lr.readIntArray();
    start--; end--;
    answer += `${prefixSum[end] - (prefixSum[start - 1] ?? 0)}\n`;
  }

  return answer;
};

console.log(solve());