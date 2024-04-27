'use strict'

const fs = require("fs");

const input = fs.readFileSync(process.platform === "linux" ? "/dev/stdin" : "input").toString().trim().split("\n");
const n = Number(input.shift());
const m = Number(input.shift());
const edges = input.map((x) => x.split(" ").map(Number));

function solution(n, m, edges) {
    const distance = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));
    
    for (let i = 1; i < n + 1; i++) {
        distance[i][i] = 0;
    }

    for (let [s, e, weight] of edges) {
        if (distance[s][e] > weight) {
            distance[s][e] = weight;
        }
    }


    for (let k = 1; k < n + 1; k++) {
        for (let s = 1; s < n + 1; s++) {
            for (let e = 1; e < n + 1; e++) {
                distance[s][e] = Math.min(distance[s][e], distance[s][k] + distance[k][e]);
            }
        }
    }

    let answer = "";

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < n + 1; j++) {
            answer += `${distance[i][j] === Infinity ? 0 : distance[i][j]} `;
        }
        answer += "\n";
    }
    
    return answer;
}

const answer = solution(n, m, edges);
console.log(answer);
