const fs = require("fs");

class LineReader {
    data = fs
        .readFileSync(
            process.platform === "linux" ? 0 : "input.txt",
            "utf-8"
        )
        .toString()
        .trimEnd()
        .split("\n");
    cursor = 0;

    read() {
        return this.data[this.cursor++];
    }

    readIntArray() {
        return this.read().split(" ").map(Number);
    }
}

const solve = () => {
    let answer = 0;    
    const lineReader = new LineReader();

    const [N, M] = lineReader.readIntArray();
    const graph = Array.from({ length: N + 1}, () => []);
    const isVisited = Array(N + 1).fill(false);

    for (let m = 0; m < M; m++) {
        const [start, end] = lineReader.readIntArray();
        graph[start].push(end);
        graph[end].push(start);
    }

    const dfs = (now) => {
        for (const next of graph[now]) {
            if (!isVisited[next]) {
                isVisited[next] = true;
                dfs(next);
            }
        }
    };

    for (let i = 1; i < N + 1; i++) {
        if (!isVisited[i]) {
            answer++;
            isVisited[i] = true;
            dfs(i);
        }
    }

    return answer;
};

console.log(solve());