const fs = require("fs");

const data = fs
  .readFileSync(
    process.platform === "linux" ? 0 : "input.txt",
    "utf-8"
  )
  .toString()
  .trim();

const solve = () => {
  const N = Number(data);

  const dp = Array.from({ length: 2 }, () => Array(N + 1));
  
  dp[0][1] = BigInt(0);
  dp[1][1] = BigInt(1);

  for (let i = 2; i < N + 1; i++) {
    dp[0][i] = dp[0][i - 1] + dp[1][i - 1];
    dp[1][i] = dp[0][i - 1];
  }

  return String(dp[0][N] + dp[1][N]);
};

console.log(solve());