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

  readInt() {
    return Number(this.read());
  }

  readIntArray() {
    return this.read().split(" ").map(Number);
  }
}

const solve = () => {
  const lr = new LineReader();
  
  const N = lr.readInt(),
        A = lr.readIntArray(),
        M = lr.readInt(),
        targets = lr.readIntArray();

  A.sort((a, b) => a - b);

  let answer = "";

  for (const target of targets) {
    let start = 0,
        end = N - 1,
        isFound = 0;
    while (start <= end) {
      const mid = ((start + end) / 2) | 0;
      if (A[mid] < target)
        start = mid + 1;
      else if (A[mid] > target)
        end = mid - 1;
      else {
        isFound = 1;
        break;
      }
    }
    answer += `${isFound}\n`;
  }

  return answer;
};

console.log(solve());