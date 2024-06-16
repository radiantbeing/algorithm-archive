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
  const [problem, ...rest] = data[1].split(" ");
  const factorial = Array(N + 1).fill(BigInt(1));
  const isVisited = Array(N + 1).fill(false);
  const sequence = Array(N + 1);

  for (let i = 1; i < N + 1; i++) {
    factorial[i] = factorial[i - 1] * BigInt(i);
  }
  
  let answer;

  if (problem === "1") {
    let K = BigInt(rest[0]);
    for (let i = 1; i < N + 1; i++) {
      let count = BigInt(1);
      for (let j = 1; j < N + 1; j++) {
        if (isVisited[j]) {
          continue;
        }
        if (K <= factorial[N - i] * count) {
          K -= factorial[N - i] * (count - BigInt(1));
          sequence[i] = j;
          isVisited[j] = true;
          break;
        }
        count++;
      }
    }
    answer = sequence.slice(1).join(" ");
  } else if (problem === "2") {
    const permutation = rest.map(BigInt);
    let K = BigInt(1);
    for (let i = 1; i < N + 1; i++) {
      let count = BigInt(0);
      for (let j = 1; j < permutation[i - 1]; j++) {
        if (!isVisited[j]) {
          count++;
        }
      }
      K += factorial[N - i] * count;
      isVisited[permutation[i - 1]] = true;
    }
    answer = K.toString();
  }
  return answer;
};

console.log(solve());