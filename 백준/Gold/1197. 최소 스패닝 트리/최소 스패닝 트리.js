'use strict'

const fs = require('fs');

const input = fs.readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);
const edges = input.map((i) => i.split(' ').map(Number));

function solution(n, m, edges) {
    let answer = 0;

    const parent = Array(n + 1).fill(0).map((_, index) => index);

    function find(v) {
        if (parent[v] === v) {
            return v;
        }

        parent[v] = find(parent[v]);
        return parent[v];
    }

    function union(u, v) {
        const U = find(u);
        const V = find(v);

        parent[V] = U;
    }

    edges.sort((a, b) => a[2] - b[2]);

    for (let [start, end, weight] of edges) {
        const node1 = find(start);
        const node2 = find(end);

        if (node1 === node2) {
            continue;
        }

        union(node1, node2);
        answer += weight;
        
        if (answer === n - 1) {
            break;
        }
    }

    return answer;
}

const answer = solution(n, m, edges);

console.log(answer);