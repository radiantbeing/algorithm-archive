const fs = require("fs");

const reader = {
  lines: fs
    .readFileSync(process.platform === "linux" ? 0 : "stdin.txt", "utf-8")
    .split("\n"),

  cursor: 0,

  read() {
    return this.lines[this.cursor++];
  },

  readIntegers() {
    return this.read().split(" ").map(element => parseInt(element));
  }
};

function solve() {
  const [N, M] = reader.readIntegers();
  const numbers = [0, ...reader.readIntegers()];
  const prefix_sums = Array(N + 1).fill(0);
  const answer = Array(M);

  for (let i = 1; i <= N; i++) {
    prefix_sums[i] = prefix_sums[i - 1] + numbers[i];
  }

  for (let i = 0; i < M; i++) {
    const [start_nr, end_nr] = reader.readIntegers();
    const range_sum = prefix_sums[end_nr] - prefix_sums[start_nr - 1];
    answer[i] = range_sum;
  }

  return answer.join("\n");
}

console.log(solve());