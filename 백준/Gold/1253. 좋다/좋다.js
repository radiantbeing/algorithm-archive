const fs = require("fs");

const inputReader = new class InputReader {
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

  readIntArray() {
    return this
      .read()
      .split(" ")
      .map(char => parseInt(char));
  }
}

function solve() {
  const N = inputReader.readInt();
  const numbers = inputReader.readIntArray();

  let answer = 0;

  numbers.sort((a, b) => a - b);

  for (let targetIndex = 0; targetIndex < N; targetIndex++) {
    const targetValue = numbers[targetIndex];

    let startIndex = 0;
    let endIndex = N - 1;

    while (startIndex < endIndex) {
      const startValue = numbers[startIndex];
      const endValue = numbers[endIndex];

      if (startIndex === targetIndex || targetValue > startValue + endValue) {
        startIndex++;
      } else if (endIndex === targetIndex || targetValue < startValue + endValue) {
        endIndex--;
      } else {
        answer++;
        break;
      }
    }
  }

  return answer;
}

console.log(solve());