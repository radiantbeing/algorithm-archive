const fs = require("fs");

const data = fs
  .readFileSync(
    process.platform === "linux" ? 0 : "input.txt",
    "utf-8"
  )
  .toString();

function solve() {
  const formula = data;

  const chunks = formula.split("-");
  let answer = 0;

  let isFirstChunk = true;

  for (const chunk of chunks) {
    if (isFirstChunk) {
      isFirstChunk = false;
      answer += 
        chunk
        .split("+")
        .map(Number)
        .reduce((accumulator, value) => accumulator + value, 0);
      continue;
    }
    answer -=
        chunk
        .split("+")
        .map(Number)
        .reduce((accumulator, value) => accumulator + value, 0);
  }

  return answer;
}

console.log(solve());