const fs = require("fs");

const data = fs
  .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
  .toString()
  .trim();

function solve() {
  const N = parseInt(data);

  const dp = Array.from({ length: N + 1 }, () => new Array(2));

  dp[1][0] = BigInt(0);
  dp[1][1] = BigInt(1);

  for (let i = 2; i <= N; i++) {
    dp[i][0] = dp[i - 1][0] + dp[i - 1][1];
    dp[i][1] = dp[i - 1][0];
  }

  return (dp[N][0] + dp[N][1]).toString();
}

console.log(solve());