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

    readIntArray() {
        return this.read().split(" ").map(Number);
    }
}

const lineReader = new LineReader();

const solve = () => {
    let answer = 0;

    const [N, M] = lineReader.readIntArray();
    const paper = [];
    
    for (let i = 0; i < N; i++) {
        paper.push(lineReader.readIntArray());
    }

    const tetrominoes = [
        // 1
        [[0, 0],  [0, 1],  [0, 2],  [0, 3]],
        [[0, 0],  [1, 0],  [2, 0],  [3, 0]],
        // 2
        [[0, 0],  [0, 1],  [1, 0],  [1, 1]],
        // 3
        [[0, 0],  [1, 0],  [2, 0],  [2, 1]],
        [[0, 0],  [0, 1],  [0, 2],  [1, 0]],
        [[0, 0],  [0, 1],  [1, 1],  [2, 1]],
        [[0, 2],  [1, 0],  [1, 1],  [1, 2]],
        [[0, 0],  [0, 1],  [1, 0],  [2, 0]],
        [[0, 0],  [0, 1],  [0, 2],  [1, 2]],
        [[0, 0],  [1, 0],  [1, 1],  [1, 2]],
        [[2, 0],  [0, 1],  [1, 1],  [2, 1]],
        [[0, 0],  [1, 0],  [2, 0],  [0, 1]],
        // 4
        [[0, 0],  [0, 1],  [0, 2],  [1, 1]],
        [[0, 1],  [1, 0],  [1, 1],  [2, 1]],
        [[1, 0],  [0, 1],  [1, 1],  [1, 2]],
        [[0, 0],  [1, 0],  [2, 0],  [1, 1]],
        // 5
        [[1, 0],  [1, 1],  [0, 1],  [0, 2]],
        [[0, 0],  [1, 0],  [1, 1],  [2, 1]],
        [[0, 0],  [0, 1],  [1, 1],  [1, 2]],
        [[1, 0],  [0, 1],  [1, 1],  [2, 0]],
        [[0, 0],  [0, 1],  [1, 1],  [1, 2]],
        [[1, 0],  [0, 1],  [1, 1],  [2, 0]],
        [[1, 0],  [1, 1],  [0, 1],  [0, 2]],
        [[0, 0],  [1, 0],  [1, 1],  [2, 1]],
    ];

    const getSum = (x, y, positions) => {
        let sum = 0;
        for (const [dx, dy] of positions) {
            const nx = x + dx;
            const ny = y + dy;
            if (
                nx < 0 ||
                nx >= N ||
                ny < 0 ||
                ny >= M
            ) return 0;
            sum += paper[nx][ny];
        }
        return sum;
    };

    for (let x = 0; x < N; x++) {
        for (let y = 0; y < M; y++) {
            for (const positions of tetrominoes) {
                answer = Math.max(answer, getSum(x, y, positions));
            }
        }
    }

    return answer;
};

console.log(solve());