const fs = require("fs");

const data = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const t = Number(data.shift());
const cases = [];

for (let i = 0; i < t; i++) {
  const [x1, y1, x2, y2] = data
    .shift()
    .split(" ")
    .map(Number);
  const n = Number(data.shift());
  const circles = [];

  for (let j = 0; j < n; j++) {
    const circle = data
      .shift()
      .split(" ")
      .map(Number);
    circles.push(circle);
  }

  cases.push([[x1, y1], [x2, y2], circles]);
}


const solution = (t, cases) => {
  let answer = "";

  cases.forEach(([[x1, y1], [x2, y2], circles]) => {
    let temp = 0;

    for (const [a, b, r] of circles) {
      const isStartIncluded = (x1 - a) ** 2 + (y1 - b) ** 2 < r ** 2;
      const isEndIncluded = (x2 - a) ** 2 + (y2 - b) ** 2 < r ** 2;

      if (isStartIncluded !== isEndIncluded) {
        temp++;
      }
    }

    answer += `${temp}\n`;
  });

  return answer;
};

console.log(solution(t, cases));
