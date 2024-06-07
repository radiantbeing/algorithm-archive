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
    let answer = "";
    
    const lineReader = new LineReader();
    
    const [N, M, V] = lineReader.readIntArray();
    const graph = Array.from({ length: N + 1 }, () => []);
    let isVisited = Array(N + 1).fill(false);
    
    for (let i = 0; i < M; i++) {
        const [start, end] = lineReader.readIntArray();
        graph[start].push(end);
        graph[end].push(start);
    }

    for (let i = 1; i < N + 1; i++) {
        graph[i].sort((a, b) => a - b);
    }

    const dfs = (now) => {
        isVisited[now] = true;
        answer += now + " ";
        for (const next of graph[now]) {
            if (!isVisited[next])
                dfs(next);
        }
    }

    dfs(V);

    answer += "\n";
    isVisited = Array(N + 1).fill(false);

    const bfs = () => {
        const queue = [];
        queue.push(V);
        isVisited[V] = true;
        answer += V + " ";
        while (queue.length > 0) {
            const now = queue.shift();
            for (const next of graph[now]) {
                if (!isVisited[next]) {
                    isVisited[next] = true;
                    queue.push(next);
                    answer += next + " ";
                }
            }
        }
    };

    bfs();

    return answer;
};

console.log(solve());