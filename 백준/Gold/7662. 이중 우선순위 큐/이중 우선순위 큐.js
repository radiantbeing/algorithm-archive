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

    readStringArray() {
        return this.read().split(" ");
    }
}

class PriorityQueue {
    constructor(compare) {
        this.heap = new Array(64);
        this.size = 0;
        this.compare = (a, b) => a - b;
        
        if (compare) {
            this.compare = compare;
        }
    }

    insert(item) {
        const heap = this.heap;
        const size = ++this.size;

        if (heap.length === size) {
            heap.length *= 2;
        }

        heap[size] = item;
        this.percolateUp();
    }

    percolateUp() {
        const heap = this.heap;
        const size = this.size;
        const compare = this.compare;

        let pos = size;
        const item = heap[pos];

        while (pos > 1) {
            const parent = heap[Math.floor(pos / 2)];
            if (compare(item, parent) >= 0) {
                break;
            }
            heap[pos] = parent;
            pos = Math.floor(pos / 2);
        }

        heap[pos] = item;
    }

    shift() {
        const heap = this.heap;
        const size = --this.size;

        const item = heap[1];

        if (item === undefined) {
            return;
        }

        heap[1] = heap[size + 1];
        heap[size + 1] = undefined;
        this.percolateDown();
        return item;
    }

    percolateDown() {
        const heap = this.heap;
        const size = this.size;
        const compare = this.compare;

        let pos = 1;
        const item = heap[pos];

        while (pos * 2 <= size) {
            let childIndex = pos * 2 + 1;
            if (childIndex > size || compare(heap[pos * 2], heap[childIndex]) < 0) {
                childIndex = pos * 2;
            }
            const child = heap[childIndex];
            if (compare(item, child) <= 0) {
                break;
            }
            heap[pos] = child;
            pos = childIndex;
        }
        heap[pos] = item;
    }

    peek() {
        return this.heap[1];
    }
}

const lineReader = new LineReader();

const solve = () => {
    let answer = "";
    
    const T = lineReader.readInt();

    for (let t = 0; t < T; t++) {
        const K = lineReader.readInt();

        const minPQ = new PriorityQueue((a, b) => a - b);
        const maxPQ = new PriorityQueue((a, b) => b - a);
        const entryMap = new Map();

        for (let k = 0; k < K; k++) {
            const [opcode, operand] = lineReader.readStringArray();
            
            if (opcode === "I") {
                const item = Number(operand);
                minPQ.insert(item);
                maxPQ.insert(item);
                entryMap.set(item, (entryMap.get(item) || 0) + 1);
            } else if (opcode === "D" && operand === "1") {
                while (maxPQ.size > 0 && entryMap.get(maxPQ.peek()) === 0) {
                    maxPQ.shift();
                }
                if (maxPQ.size > 0) {
                    const item = maxPQ.shift();
                    entryMap.set(item, entryMap.get(item) - 1);
                }
            } else if (opcode === "D" && operand === "-1") {
                while (minPQ.size > 0 && entryMap.get(minPQ.peek()) === 0) {
                    minPQ.shift();
                }
                if (minPQ.size > 0) {
                    const item = minPQ.shift();
                    entryMap.set(item, entryMap.get(item) - 1);
                }
            }
        }

        while (maxPQ.size > 0 && entryMap.get(maxPQ.peek()) === 0) {
            maxPQ.shift();
        }
        while (minPQ.size > 0 && entryMap.get(minPQ.peek()) === 0) {
            minPQ.shift();
        }

        const min = minPQ.shift();
        const max = maxPQ.shift();

        answer += (min === undefined || max === undefined) ? "EMPTY\n" : `${max} ${min}\n`;
    }

    return answer;
};

console.log(solve());