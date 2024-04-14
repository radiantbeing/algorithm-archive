const fs = require("fs");

const data = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");
const t = Number(data.shift());
const positions = data.map((item) => item.split(" ").map(Number));

const solution = (t, positions) => {
  let answer = "";

  for (let i = 0; i < t; i++) {
    const [x1, y1, r1, x2, y2, r2] = positions[i];
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    if (r1 === r2) {
      if (distance === 0) {
        answer += "-1\n";
      } else if (distance < r1 + r2) {
        answer += "2\n";
      } else if (distance === r1 + r2) {
        answer += "1\n";
      } else if (distance > r1 + r2) {
        answer += "0\n";
      }
    } else {
      if (distance === 0) {
        answer += "0\n";
      } else if (distance < Math.abs(r1 - r2)) {
        answer += "0\n";
      } else if (distance === Math.abs(r1 - r2)) {
        answer += "1\n";
      } else if (distance < r1 + r2) {
        answer += "2\n";
      } else if (distance === r1 + r2) {
        answer += "1\n";
      } else if (distance > r1 + r2) {
        answer += "0\n";
      }
    }
  }

  return answer;
};

console.log(solution(t, positions));
