const fs = require("fs");

const data = fs
    .readFileSync(
        process.platform === "linux" ? 0 : "input.txt",
        "utf-8"
    )
    .toString()
    .trimEnd();

const solve = () => {
    const N = Number(data);
    const DP = Array(N + 1).fill(0);
    
    DP[1] = 1;
    DP[2] = 3;
    for (let i = 3; i < N + 1; i++) {
        DP[i] = (DP[i - 1] + 2 * DP[i - 2]) % 10007;
    }

    return DP[N];
};

console.log(solve());