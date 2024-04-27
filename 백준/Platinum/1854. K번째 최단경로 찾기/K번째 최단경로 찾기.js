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

    readIntArray() {
        return this.read().split(" ").map(Number);
    }
}

class PriorityQueue {
    constructor(comparator) {
        this.heap = new Array(64);
        this.size = 0;
        this.comparator = comparator;
    }

    push(value) {
        const heap = this.heap;
        const size = ++this.size;

        if (size === heap.length)
            heap.length *= 2;

        heap[size] = value;
        this.percolateUp();
    }

    percolateUp() {
        const heap = this.heap;
        const size = this.size;
        const comparator = this.comparator;

        let pos = size;
        const item = heap[pos];

        while (pos > 1) {
            const parent = heap[Math.floor(pos / 2)];
            if (comparator(item, parent) >= 0)
                break;
            heap[pos] = parent;
            pos = Math.floor(pos / 2);
        }
        heap[pos] = item;
    }

    shift() {
        const heap = this.heap;
        const value = heap[1];

        if (value === undefined)
            return;

        const size = --this.size;

        heap[1] = heap[size + 1];
        heap[size + 1] = undefined;
        this.percolateDown();
        return value;
    }

    percolateDown() {
        const heap = this.heap;
        const size = this.size;
        const comparator = this.comparator;

        let pos = 1;
        const item = heap[pos];

        while (pos * 2 <= size) {
            let childIndex = pos * 2 + 1;
            if (childIndex > size || comparator(heap[pos * 2], heap[childIndex]) < 0)
                childIndex = pos * 2;
            const child = heap[childIndex];
            if (comparator(item, child) <= 0)
                break;
            heap[pos] = child;
            pos = childIndex;
        }
        heap[pos] = item;
    }
}

const solve = () => {
    const lr = new LineReader();
    const [N, M, K] = lr.readIntArray();
    const graph = Array.from({ length: N + 1 }, () => []);
    const distance = Array.from({ length: N + 1 }, () => Array(K).fill(Infinity));
    const pq = new PriorityQueue((a, b) => a[0] - b[0]);

    for (let i = 0; i < M; i++) {
        const [u, v, w] = lr.readIntArray();
        graph[u].push([v, w]);
    }
    
    distance[1][0] = 0;
    pq.push([distance[1][0], 1]);

    while (pq.size > 0) {
        const [nowDistance, now] = pq.shift();
        for (const [next, weight] of graph[now]) {
            const newDistance = nowDistance + weight;
            if (distance[next][K - 1] > newDistance) {
                distance[next][K - 1] = newDistance;
                distance[next].sort((a, b) => a - b);
                pq.push([newDistance, next]);
            }
        }
    }

    let answer = "";

    for (let i = 1; i < N + 1; i++) {
        answer += `${distance[i][K - 1] === Infinity ? -1 : distance[i][K - 1]}\n`;
    }

    return answer;
};

console.log(solve());