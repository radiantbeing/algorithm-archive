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
}

function solve() {
  const N = reader.readInt();
  const numbers = reader.readIntArray();
  const M = reader.readInt();
  const targets = reader.readIntArray();

  const binarySearch = (target) => {
    let leftIndex = 0;
    let rightIndex = N - 1;

    while (leftIndex <= rightIndex) {
      const medianIndex = Math.floor((leftIndex + rightIndex) / 2);
      const median = numbers[medianIndex];
      if (median < target) {
        leftIndex = medianIndex + 1;
      } else if (median > target) {
        rightIndex = medianIndex - 1;
      } else {
        return true;
      }
    }

    return false;
  };

  numbers.sort((a, b) => a - b);

  return targets
    .map(target => binarySearch(target) ? 1 : 0)
    .join("\n");
}

console.log(solve());