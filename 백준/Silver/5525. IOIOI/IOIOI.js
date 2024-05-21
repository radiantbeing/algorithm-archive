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

    const getP = () => {
        let str = "I";
        for (let i = 0; i < N; i++) {
            str += "OI";
        }
        return str;
    };

    const P = getP();
    let answer = 0;

    for (let i = 0; i < M; i++) {
        if (S.substring(i, i + P.length) === P) {
            answer++;
        }
    }

    return answer;
};

console.log(solve());