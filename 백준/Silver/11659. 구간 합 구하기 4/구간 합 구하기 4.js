const fs = require("fs");

const inputReader = new class InputReader {
  data = fs
    .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
    .toString()
    .split("\n");
  
  cursor = 0;

  read() {
    return this.data[this.cursor++];
  }

  readIntArray() {
    return this
      .read()
      .split(" ")
      .map(s => parseInt(s));
  }
}

function solve() {
  const [numberCount, queryCount] = inputReader.readIntArray();
  const numbers = [0, ...inputReader.readIntArray()];

  const prefixSum = new Array(numberCount + 1).fill(0);
  for (let i = 1; i <= numberCount; i++) {
    prefixSum[i] = prefixSum[i - 1] + numbers[i];
  }

  const answers = [];
  for (let i = 0; i < queryCount; i++) {
    const [start, end] = inputReader.readIntArray();
    answers.push(prefixSum[end] - prefixSum[start - 1]);
  }

  return answers.join("\n");
}

console.log(solve());