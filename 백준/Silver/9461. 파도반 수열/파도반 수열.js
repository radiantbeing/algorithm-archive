const fs = require("fs");

class LineReader {
    constructor() {
        this.data = fs
            .readFileSync(
                process.platform === "linux" ? 0 : "input.txt"
            )
            .toString()
            .trimEnd()
            .split("\n");
        this.cursor = 0;
    }

    read() {
        return this.data[this.cursor++];
    }

    readInt() {
        return Number(this.read());
    }
}

const lineReader = new LineReader();

const solve = () => {
    let answer = "";

    const T = lineReader.readInt();

    for (let t = 0 ; t < T; t++) {
        const N = lineReader.readInt();
        const DP = new Array(N + 1);
        DP[0] = 0;
        DP[1] = 1;
        DP[2] = 1;
        DP[3] = 1;
        DP[4] = 2;
        for (let i = 5; i < N + 1; i++) {
            DP[i] = DP[i - 1] + DP[i - 5];
        }
        answer += DP[N] + "\n";
    }

    return answer;
};

console.log(solve());