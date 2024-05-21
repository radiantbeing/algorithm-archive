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
    const N = Number(data[0]);
    const M = Number(data[1]);
    const S = data[2];

    let answer = 0;
    let count = 0;
    let i = 0;

    while (i < M - 1) {
        if (S[i] === 'I' && S[i + 1] === 'O') {
            let j = i + 1;
            while (j < M - 1 && S[j] === 'O' && S[j + 1] === 'I') {
                j += 2;
                count++;
                if (count >= N) {
                    answer++;
                }
            }
            i = j;
            count = 0;
        } else {
            i++;
        }
    }

    return answer;
};

console.log(solve());
