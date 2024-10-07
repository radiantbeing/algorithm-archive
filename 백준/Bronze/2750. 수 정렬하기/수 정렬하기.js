const fs = require("fs");

const reader = new class {
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
    return parseInt(this.read());
  }
};

function solve() {
  const N = reader.readInt();
  const numbers = new Array(N);

  for (let i = 0; i < N; i++) {
    numbers[i] = reader.readInt();
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - i - 1; j++) {
      if (numbers[j] > numbers[j + 1]) {
        [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
      }
    }
  }

  return numbers.join("\n");
}

console.log(solve());