const fs = require("fs");

class LineReader {
    constructor() {
        this.data = fs
            .readFileSync(
                process.platform === "linux" ? 0 : "input.txt",
                "utf-8"
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

    readIntArray() {
        const line = this.read();
        return line
            .substring(1, line.length - 1)
            .split(",")
            .map(Number);
    }
}

const solve = () => {
    const reader = new LineReader();
    const T = reader.readInt();
    let answer = "";
    for (let t = 0; t < T; t++) {
        const P = reader.read();
        const N = reader.readInt();
        const numbers = reader.readIntArray();

        let c1 = 0;
        let c2 = N - 1;
        let isReversed = false;

        for (const p of P) {
            if (p === "R") {
                isReversed = !isReversed;
            } else if (p === "D" && !isReversed) {
                c1++;
            } else if (p === "D" && isReversed) {
                c2--;
            }
        }

        if (c1 - c2 === 1) {
            answer += "[]\n";
        } else if (c1 - c2 > 1) {
            answer += "error\n"
        } else {
            const temp = numbers.slice(c1, c2 + 1);
            if (isReversed) temp.reverse();
            answer += "[" + temp.join(",") + "]\n";
        }
    }

    return answer;
};

console.log(solve());