const fs = require("fs");

const data = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "input.txt"
  )
  .toString()
  .trim();

const [M, N] = data.split(" ").map(Number);

const solve = () => {
  const sieve = Array(N + 1).fill(true);
  sieve[0] = sieve[1] = false;

  for (let i = 2; i < N + 1; i++) {
    for (let j = i * 2; j < N + 1; j += i) {
      sieve[j] = false;
    }
  }

  let answer = "";

  for (let i = M; i < N + 1; i++) {
    if (sieve[i] === true)
      answer += `${i}\n`;
  }

  return answer;
};

console.log(solve());