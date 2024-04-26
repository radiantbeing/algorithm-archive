const fs = require("fs");

const data = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "input.txt"
  )
  .toString()
  .trim()
  .split("\n");

const solve = () => {
  const N = data[0];
  const numbers = data[1].split(" ").map(Number);
  
  numbers.sort((a, b) => a - b);
  
  let answer = 0;

  for (let i = 0; i < N; i++) {
    let start = 0;
    let end = N - 1;

    while (start < end) {
      const sum = numbers[start] + numbers[end];

      if (sum < numbers[i]) {
        start++;
        continue;
      }

      if (sum > numbers[i]) {
        end--;
        continue;
      }

      if (start !== i && end !== i) {
        answer++;
        break;
      }

      if (start === i) {
        start++;
        continue;
      }

      if (end === i) {
        end--;
        continue;
      }
    }
  }

  return answer;
};

console.log(solve());