'use strict'

const fs = require('fs');

const inputs = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input').toString().trim().split('\n');

const n = Number(inputs.shift());
const nodes = Array.from({ length: n + 1 }, () => []);
for (let i = 0; i < n - 1; i++) {
    const [s, e] = inputs.shift().split(' ').map(Number);
    nodes[s].push(e);
    nodes[e].push(s);
}
const m = Number(inputs.shift());
const queries = inputs.map((input) => input.split(' ').map(Number));

function solution(n, m, nodes, queries) {
    let answer = '';

    let depths = Array(n + 1).fill(0);
    let parents = Array(n + 1).fill(0);
    let visited = Array(n + 1).fill(false);


    function BFS(v) {
        const queue = [];
        queue.push(v);
        visited[v] = true;

        let depth = 1;
        let nowSize = 1;
        let count = 0;

        while (queue.length) {
            const now = queue.shift();
            for (let next of nodes[now]) {
                if (visited[next] === false) {
                    queue.push(next);
                    visited[next] = true;
                    parents[next] = now;
                    depths[next] = depth;
                }
            }
            count++;
            if (nowSize === count) {
                count = 0;
                nowSize = queue.length;
                depth++;
            }
        }
    }

    BFS(1);

    function executeLCA(a, b) {
        if (depths[a] < depths[b]) {
            let temp = a;
            a = b;
            b = temp;
        }

        while (depths[a] !== depths[b]) {
            a = parents[a];
        }

        while (a != b) {
            a = parents[a];
            b = parents[b];
        }

        return a;

    }

    for (let i = 0; i < m; i++) {
        const [a, b] = queries[i];
        const lca = executeLCA(a, b);
        answer += `${lca}\n`;
    }

    return answer;
}

console.log(solution(n, m, nodes, queries));
