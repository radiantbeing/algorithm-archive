const fs = require("fs");

const input = fs
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "stdin")
    .toString()
    .trim()
    .split("\n");

const n = Number(input.shift());
const m = Number(input.shift());
const graph = Array.from({ length: n + 1 }, () => []);

const solution = (n, m, graph) => {
    const visited = Array.from({ length: n + 1 }, () => false);

    for (let i = 0; i < m; i++) {
        const edge = input[i].split(" ");
        const start = Number(edge[0]);
        const end = Number(edge[1]);
        
        graph[start].push(end);
        graph[end].push(start);
    }
    
    const dfs = (now) => {
        for (const next of graph[now]) {
            if (visited[next]) continue;
            visited[next] = true;
            dfs(next);
        }
    }
    
    visited[1] = true;
    dfs(1);

    return visited.filter((value) => value === true).length - 1;
};

console.log(solution(n, m, graph));