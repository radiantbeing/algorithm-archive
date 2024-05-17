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
    const N = Number(data.shift());
    const map = Array.from({ length: N }, () => Array(N));

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            map[i][j] = Number(data[i][j]);
        }
    }

    const houseNums = [];

    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const dfs = (i, j) => {
        let house = 1;
        map[i][j] = 0;
        for (let d = 0; d < 4; d++) {
            const nx = i + dx[d];
            const ny = j + dy[d];
            if (nx < 0 || nx > N - 1 || ny < 0 || ny > N - 1 || map[nx][ny] === 0) 
                continue;
            house += dfs(nx, ny);
        }
        return house;
    };

    let houseArray = [];

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (map[i][j] === 1) {
                houseArray.push(dfs(i, j, 1));
            }
        }
    }

    let answer = "";
    houseArray.sort((a, b) => a - b);
    answer += houseArray.length + "\n";
    answer += houseArray.join("\n");
    
    return answer;
};

console.log(solve());
