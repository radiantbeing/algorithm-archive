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
    let line = 0;
    const [M, N, H] = data[line++].split(" ").map(Number);
    const containers = [];

    for (let i = 0; i < H; i++) {
        const container = [];
        for (let j = 0; j < N; j++) {
            container.push(data[line++].split(" ").map(Number));
        }
        containers.push(container);
    }

    const bfs = () => {
        const queue = [];

        for (let h = 0; h < H; h++) {
            for (let i = 0; i < N; i++) {
                for (let j = 0; j < M; j++) {
                    if (containers[h][i][j] === 1)
                        queue.push([h, i, j]);
                }
            }
        }

        const dh = [0, 0, 0, 0, 1, -1];
        const dx = [1, -1, 0, 0, 0, 0];
        const dy = [0, 0, 1, -1, 0, 0];

        let cursor = 0;

        while (cursor < queue.length) {
            const [h, x, y] = queue[cursor++];
            for (let i = 0; i < 6; i++) {
                const nh = h + dh[i];
                const nx = x + dx[i];
                const ny = y + dy[i];
                if (
                    (-1 < nh && nh < H) &&
                    (-1 < nx && nx < N) &&
                    (-1 < ny && ny < M) &&
                    containers[nh][nx][ny] === 0
                ) {
                    containers[nh][nx][ny] = containers[h][x][y] + 1;
                    queue.push([nh, nx, ny]);
                }
            }
        }
    };

    bfs();

    let answer = -1;

    for (let h = 0; h < H; h++) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (containers[h][i][j] === 0)
                    return -1;
                else if (containers[h][i][j] > 0)
                    answer = Math.max(answer, containers[h][i][j]);
            }
        }
    }

    return answer - 1;
};

console.log(solve());