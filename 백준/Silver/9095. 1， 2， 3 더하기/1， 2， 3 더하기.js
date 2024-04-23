const fs = require("fs");

const data = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

  
const solve = () => {
  const T = +data[0];

  let answer = "";

  for (let t = 1; t < T + 1; t++) {
    const target = +data[t];

    const dp = Array(target + 1);

    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 2;
    dp[3] = 4;

    for (let i = 4; i <= target; i++) {
      dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    }

    answer += `${dp[target]}\n`;
  }
  
  return answer;
};

console.log(solve());
