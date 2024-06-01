const fs = require("fs");

class FileReader {
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

const fileReader = new FileReader();

const solve = () => {
    const [N, M] = fileReader.readIntArray();

    const board = Array.from({ length: 10 }, () => Array(10));
    const visited = Array.from({ length: 10 }, () => Array(10).fill(Infinity));

    const getPositionFrom = (number) => {
        return [Math.floor(number / 10), number % 10];
    }

    let temp = 0;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            board[i][j] = temp++;
        }
    }
    
    for (let i = 0; i < N + M; i++) {
        const [src, dst] = fileReader.readIntArray();
        const [x, y] = getPositionFrom(src - 1);
        board[x][y] = dst - 1;
    }
    
    const bfs = () => {
        const queue = [];

        queue.push(0);
        visited[0][0] = 0;

        while (queue.length > 0) {
            const now = queue.shift();
            const [nowX, nowY] = getPositionFrom(now);

            if (now === 99) return visited[9][9];

            for (let i = 1; i <= 6; i++) {
                if (now + i > 99) break; 
                const temp = getPositionFrom(now + i);
                const next = board[temp[0]][temp[1]];
                const [nextX, nextY] = getPositionFrom(next);
                if (
                    visited[nextX][nextY] === Infinity
                ) {
                    queue.push(next);
                    visited[nextX][nextY] = Math.min(visited[nextX][nextY], visited[nowX][nowY] + 1);
                }
            }
        }
    };
    
    return bfs();
};

console.log(solve());