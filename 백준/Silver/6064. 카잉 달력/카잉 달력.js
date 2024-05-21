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
        return this.read().split(" ").map(Number);
    }
}

function solve() {
    const reader = new LineReader();
    const T = reader.readInt();

    function GCD(a, b) { // 최대공약수
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    function LCM(a, b) { // 최소공배수
        return (a * b) / GCD(a, b);
    }

    let answer = "";
    
    for (let t = 0; t < T; t++) {
        let temp = -1;
        let [M, N, x, y] = reader.readIntArray();

        const lcm = LCM(M, N);
        
        while (x <= lcm && y <= lcm) {
            if (x < y) {
                x += M;
            } else if (x > y) {
                y += N;
            } else {
                temp = x;
                break;
            }
        }
        answer += temp + "\n";
    }

    return answer;
}

console.log(solve());