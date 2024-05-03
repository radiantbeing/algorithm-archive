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

    readIntArray(delimiter = " ") {
        return this.read().split(delimiter).map(Number);
    }
}

const solve = () => {
    const reader = new LineReader();
    const N = reader.readInt(); // 도시의 수
    const W = Array(N).fill(0); // 도시 u에서 도시 v로 이동하기 위한 비용

    for (let n = 0; n < N; n++) {
        W[n] = reader.readIntArray();
    }

    // 현재 도시 c고 방문한 도시들이 v일 때, 남은 모든 도시들을 경유하는 데 필요한 최소 비용
    const DP = Array.from({ length: 16 }, () => Array(1 << 16).fill(0)); 

    const TSP = (c, v) => {
        if (v === ((1 << N) - 1)) {
            if (W[c][0] === 0) return Infinity;
            else return W[c][0];
        }
        if (DP[c][v] !== 0) return DP[c][v];
        let minValue = Infinity;
        for (let i = 0; i < N; i++) {
            if ((v & (1 << i)) === 0 && W[c][i] !== 0) {
                minValue = Math.min(minValue, TSP(i, (v | (1 << i))) + W[c][i]);
            }
        }
        DP[c][v] = minValue;
        return minValue;
    };

    return TSP(0, 1)
};

console.log(solve());