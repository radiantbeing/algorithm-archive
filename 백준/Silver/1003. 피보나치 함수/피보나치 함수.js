const fs = require("fs");

const data = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");
const t = Number(data.shift());
const numbers = data.map(Number);

const solution = (t, numbers) => {
  let answer = "";

  numbers.forEach((number) => {
    const dp = Array.from({ length: number + 1 }, () => [0, 0]);
    
    dp[0] = [1, 0]; // [0이 출력된 횟수, 1이 출력된 횟수]
    dp[1] = [0, 1];

    for (let i = 2; i < number + 1; i++) {
      dp[i][0] = dp[i - 2][0] + dp[i - 1][0];
      dp[i][1] = dp[i - 2][1] + dp[i - 1][1];
    }

    answer += `${dp[number][0]} ${dp[number][1]}\n`;
  });

  return answer;
};

console.log(solution(t, numbers));
