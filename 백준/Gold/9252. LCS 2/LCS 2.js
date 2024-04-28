const fs = require("fs");

const data = fs
    .readFileSync(
        process.platform === "linux" ? 0 : "input.txt",
        "utf-8"
    )
    .toString()
    .trimEnd()
    .split("\n");

const solve = () => {
    const [sequence1, sequence2] = data;
    const N = sequence1.length;
    const M = sequence2.length;
    const DP = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

    for (let i = 1; i < N + 1; i++) {
        for (let j = 1; j < M + 1; j++) {
            if (sequence1[i - 1] === sequence2[j - 1])
                DP[i][j] = DP[i - 1][j - 1] + 1;
            else
                DP[i][j] = Math.max(DP[i - 1][j], DP[i][j - 1]);
        }
    }

    console.log(DP[N][M]);

    let answer = [];

    const getSubsequence = (i, j) => {
        if (i === 0 || j === 0) return;
        if (sequence1[i - 1] === sequence2[j - 1]) {
            answer.push(sequence1[i - 1]);
            getSubsequence(i - 1, j - 1);
        } else {
            if (DP[i - 1][j] > DP[i][j - 1])
                getSubsequence(i - 1, j);
            else
                getSubsequence(i, j - 1);
        }
    };

    getSubsequence(N, M);

    return answer.reverse().join("")
};

console.log(solve());