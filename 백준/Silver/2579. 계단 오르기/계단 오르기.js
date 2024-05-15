const fs = require("fs");

const data = fs
    .readFileSync(
        process.platform === "linux" ? 0 : "input.txt",
        "utf-8"
    )
    .toString()
    .trimEnd()
    .split("\n")
    .map(Number);

const solve = () => {
    const N = data.shift();
    const scores = data;

    const DP = Array.from({ length: 2 }, () => Array(N).fill(0));
    DP[0][0] = scores[0];
    DP[0][1] = scores[1];

    for (let i = 0; i < N; i++) {
        if (i + 1 < N) {
            DP[1][i + 1] = DP[0][i] + scores[i + 1];
        }
        if (i + 2 < N) {
            DP[0][i + 2] = Math.max(DP[0][i], DP[1][i]) + scores[i + 2];
        }
    }

    return Math.max(DP[0][N - 1], DP[1][N - 1]);
};

console.log(solve());