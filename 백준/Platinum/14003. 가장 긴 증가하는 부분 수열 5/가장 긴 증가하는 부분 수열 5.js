const fs = require("fs");

const data = fs
  .readFileSync(
    process.platform === "linux" ? 0 : "input.txt",
    "utf-8"
  )
  .toString()
  .trim()
  .split("\n");

const solve = () => {
  const N = Number(data[0]);
  const A = data[1].split(" ").map(Number);
  A.unshift(0);
  
  let index = 0,
      maxLength = 1;
  const B = Array(1000001).fill(0);
  const D = Array(1000001).fill(0);
  const result = Array(1000001).fill(0);
  B[maxLength] = A[1];
  D[1] = 1;

  const binarySearch = (l, r, now) => {
    while (l < r) {
      const mid = Math.floor((l + r) / 2);
      if (B[mid] < now) {
        l = mid + 1;
      } else {
        r = mid;
      }
    }
    return l;
  }

  for (let i = 2; i < N + 1; i++) {
    if (B[maxLength] < A[i]) {
      maxLength += 1;
      B[maxLength] = A[i];
      D[i] = maxLength;
    } else {
      const index = binarySearch(1, maxLength, A[i]);
      B[index] = A[i];
      D[i] = index;
    }
  }

  let answer = "";
  answer += `${maxLength}\n`;
  index = maxLength;
  const x = B[maxLength] + 1;

  for (let i = N; i > -1; i--) {
    if (D[i] === index) {
      result[index] = A[i];
      index -= 1;
    }
  }

  for (let i = 1; i < maxLength + 1; i++) {
    answer += `${result[i]} `;
  }

  return answer;
};

console.log(solve());