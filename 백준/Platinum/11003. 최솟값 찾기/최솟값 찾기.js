const fs = require("fs");

const data = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const solve = () => {
  const [N, L] = data[0].split(" ").map(Number);
  const numbers = data[1].split(" ").map(Number);

  const deque = [];

  let answer = "";
  let front = 0;

  for (let i = 0; i < N; i++) {
    while (deque.length > front && deque.at(-1)[0] > numbers[i]) {
      deque.pop();
    }

    deque.push([numbers[i], i]);

    if (deque[front][1] <= i - L) {
      front++;
    }

    answer += `${deque[front][0]} `;
    
    if (i % 10000 === 0) {
      process.stdout.write(answer);
      answer = "";
    }
  }
  return answer;
};

console.log(solve());
