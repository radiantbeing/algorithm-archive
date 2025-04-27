const fs = require("fs");

function solve() {
  const data = fs
    .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
    .trimEnd();
  const chunks_by_minus = data.split("-");
  const sums = chunks_by_minus.map((chunk) => {
    const chunks_by_plus = chunk.split("+");
    return chunks_by_plus.reduce((sum, element) => sum + parseInt(element), 0);
  });
  return sums.reduce((result, element) => result - element);
}

console.log(solve());
