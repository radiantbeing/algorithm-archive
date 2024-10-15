const fs = require("fs");

const reader = {
  data: fs
    .readFileSync(
      process.platform === "linux" ? 0 : "input.txt", 
      "utf-8"
    )
    .toString()
    .trim(),

  read() {
    return this.data;
  },
}

function solve() {
  const computeChunk = chunk => 
    chunk
      .split("+")
      .map(n => parseInt(n))
      .reduce((accu, val) => accu + val, 0)

  const expression = reader.read();
  const chunks = expression.split("-").map(computeChunk);

  return chunks.reduce((accu, val, idx) => 
    idx === 0 ? accu + val : accu - val
  );
}

console.log(solve());