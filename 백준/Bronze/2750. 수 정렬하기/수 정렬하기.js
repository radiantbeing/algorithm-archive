const fs = require("fs");

class LineReader {
  constructor() {
    this.data = fs
      .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
      .toString()
      .trim()
      .split("\n");
    this.cursor = 0;
  }

  read() {
    return this.data[this.cursor++];
  }

  readInt() {
    return Number(this.read());
  }
}

const solve = () => {
  const lr = new LineReader();
  const N = lr.readInt();
  const numbers = [];

  for (let i = 0; i < N; i++) {
    numbers.push(lr.readInt());
  }
  
  // Bubble Sort
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - i - 1; j++) {
      if (numbers[j] > numbers[j + 1])
        [numbers[j], numbers[j + 1]] = [numbers[j + 1], numbers[j]];
    }
  }

  let answer = "";

  for (let i = 0; i < N; i++) {
    answer += `${numbers[i]}\n`;
  }

  return answer;
};

console.log(solve());