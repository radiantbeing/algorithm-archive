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
}

const lineReader = new LineReader();

const solve = () => {
    const N = lineReader.readInt();
    const paintingOriginal = Array.from({ length: N }, () => Array(N));
    const paintingRedGreen = Array.from({ length: N }, () => Array(N));
    const visitedOriginal = Array.from({ length: N }, () => Array(N).fill(false));
    const visitedRedGreen = Array.from({ length: N }, () => Array(N).fill(false));

    for (let r = 0; r < N; r++) {
        const line = lineReader.read();
        for (let c = 0; c < N; c++) {
            paintingOriginal[r][c] = line[c];
            paintingRedGreen[r][c] = line[c];
            if (line[c] === "G")
                paintingRedGreen[r][c] = "R";
        }
    }

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, -1, 1];

    const dfs = (x, y, painting, visited) => {
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (
                nx >= 0 &&
                nx <= N - 1 &&
                ny >= 0 &&
                ny <= N - 1 &&
                !visited[nx][ny] &&
                painting[nx][ny] === painting[x][y]
            ) {
                visited[nx][ny] = true;
                dfs(nx, ny, painting, visited);
            }
        }
    };

    let subAnswerOriginal = 0;
    let subAnswerRedGreen = 0;

    for (let x = 0; x < N; x++) {
        for (let y = 0; y < N; y++) {
            if (!visitedOriginal[x][y]) {
                visitedOriginal[x][y] = true;
                subAnswerOriginal++;
                dfs(x, y, paintingOriginal, visitedOriginal);
            }
            if (!visitedRedGreen[x][y]) {
                visitedRedGreen[x][y] = true;
                subAnswerRedGreen++;
                dfs(x, y, paintingRedGreen, visitedRedGreen);
            }
        }
    }

    return `${subAnswerOriginal} ${subAnswerRedGreen}`;
};

console.log(solve());