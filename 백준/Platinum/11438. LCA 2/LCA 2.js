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

    const N = reader.readInt();
    const tree = Array.from({ length: N + 1 }, () => []);
    
    for (let i = 0; i < N - 1; i++) {
        const [start, end] = reader.readIntArray();
        tree[start].push(end);
        tree[end].push(start);        
    }
    
    let kMax = 0;
    let temp = 1;

    while (temp <= N) {
        temp = temp << 1;
        kMax += 1
    }

    const depth = Array(N + 1).fill(0);
    const parent = Array.from({ length: kMax + 1 } , () => Array(N + 1));
    const visited = Array(N + 1).fill(false);

    const bfs = (node) => {
        const queue = [];
        queue.push(node);
        visited[node] = true;
        let level = 1;
        let currentSize = 1;
        let count = 0;

        while (queue.length > 0) {
            const now = queue.shift();
            for (const next of tree[now]) {
                if (!visited[next]) {
                    visited[next] = true;
                    queue.push(next);
                    parent[0][next] = now;
                    depth[next] = level;
                }
            }
            count++;
            if (count === currentSize) {
                count = 0;
                currentSize = queue.length;
                level++;
            }
        }
    };

    bfs(1);

    for (let k = 1; k < kMax + 1; k++) {
        for (let n = 1; n < N + 1; n++) {
            parent[k][n] = parent[k - 1][parent[k - 1][n]];
        }
    }

    const getLCA = (a, b) => {
        if (depth[a] > depth[b])
            [a, b] = [b, a];

        for (let k = kMax; k > -1; k--) {
            if (
                2 ** k <= depth[b] - depth[a] && 
                depth[a] <= depth[parent[k][b]]
            ) {
                b = parent[k][b];
            }
        }

        for (let k = kMax; k > -1; k--) {
            if (a === b) break; // 선택된 두 노드의 깊이가 같은 경우 최소 공통 조상
            if (parent[k][a] !== parent[k][b]) {
                a = parent[k][a];
                b = parent[k][b];
            }
        }

        let LCA = a;
        if (a !== b)
            LCA = parent[0][LCA];
        return LCA;
    };

    const M = reader.readInt();
    let answer = "";
    
    for (let i = 0; i < M; i++) {
        const [a, b] = reader.readIntArray();
        answer += `${getLCA(a, b)}\n`;
    }

    return answer;
};

console.log(solve());