'use strict'

const fs = require("fs");

const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "input").toString().split("\n");

const [n, m] = input.shift().split(" ").map((x) => parseInt(x));
const edges = input.map((x) => x.split(" ").map((y) => parseInt(y)));

function solution(n, m, edges) {
    const distance = Array.from({length: n + 1}, () => Infinity)
    distance[1] = 0
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < m; j++) {
            const [start, end, weight] = edges[j];
            const isVisited = distance[start] !== Infinity;
            if (isVisited && distance[start] + weight < distance[end]) {
                distance[end] = distance[start] + weight
            }
        }
    }

    let isCycle = false
    for (let j = 0; j < m; j++) {
        const [start, end, weight] = edges[j];
        const isVisited = distance[start] !== Infinity;
        if (isVisited && distance[start] + weight < distance[end]) {
            isCycle = true
            break     
        }
    }

    let answer = "";

    if (isCycle) {
        answer += "-1\n"
    } else {
        for (let i = 2; i < n + 1; i++) {
            answer += `${distance[i] === Infinity ? -1 : distance[i]}\n`;
        }
    }

    return answer;
}

const answer = solution(n, m, edges);
console.log(answer);
