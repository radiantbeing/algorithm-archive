const fs = require("fs");

const data = fs
    .readFileSync(
        process.platform === "linux" ? 0 : "input.txt",
        "utf-8"
    )
    .toString();

const solve = () => {
    const n = Number(data);
    const dp = Array(n + 1).fill(0);
    
    dp[1] = 1;

    for (let i = 2; i < n + 1; i++) {
        let min = 4;
        for (let j = 1; j < (Math.sqrt(i) | 0) + 1; j++) {
            min = Math.min(min, dp[i - j ** 2] + 1);
        }
        dp[i] = min;
    }
    
    return dp[n];
};

console.log(solve());