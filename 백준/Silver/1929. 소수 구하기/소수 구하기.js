const fs = require("fs");

const reader = {
  data: fs
    .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
    .toString()
    .trim(),

  read() {
    return this.data;
  },

  readIntArray() {
    return this.read().split(" ").map(s => parseInt(s));
  }
};

function solve() {
  const [M, N] = reader.readIntArray();
  
  const sieve = new Array(N + 1).fill(true);
  sieve[0] = sieve[1] = false;

  for (let i = 2; i <= Math.sqrt(N); i++) {
    if (!sieve[i]) continue;
    for (let j = i + i; j <= N; j += i) {
      sieve[j] = false;
    }
  }

  const answer = [];

  for (let i = M; i <= N; i++) {
    if (sieve[i]) answer.push(i);
  }

  return answer.join("\n");
}

console.log(solve());