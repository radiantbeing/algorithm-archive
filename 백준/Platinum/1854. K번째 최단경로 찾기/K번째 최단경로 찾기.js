const fs = require("fs");

const reader = {
  data: fs 
  .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
  .toString()
  .trim()
  .split("\n"),

  cursor: 0,

  read() {
    return this.data[this.cursor++];
  },

  readInt() {
    return parseInt(this.read());
  },

  readIntArray() {
    return this.read().split(" ").map(s => parseInt(s));
  }
};

class PriorityQueue {
  heap = new Array(64);
  
  size = 0;

  constructor(comparator) {
    this.comparator = comparator;
  }

  push(item) {
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
    const comparator = this.comparator;

    const item = heap[size];
    let index = size;

    while (index > 1) {
      const parentIndex = Math.floor(index / 2);
      const parent = heap[parentIndex];

      if (comparator(parent, item) <= 0)
        break;

      heap[index] = parent;
      index = parentIndex;
    }

    heap[index] = item;
  }

  shift() {
    const heap = this.heap;

    if (heap[1] === undefined)
      return;

    const size = --this.size;
    const item = heap[1];
    heap[1] = heap[size + 1];
    heap[size + 1] = undefined;
    this.percolateDown();
    return item;
  }

  percolateDown() {
    const heap = this.heap;
    const size = this.size;
    const comparator = this.comparator;

    const item = heap[1];
    let index = 1;

    while (index * 2 <= size) {
      let childIndex = index * 2 + 1;
      if (childIndex > size || comparator(heap[index * 2], heap[childIndex]) < 0)
        childIndex = index * 2;

      const child = heap[childIndex];
      if (comparator(item, child) <= 0)
        break;

      heap[index] = child;
      index = childIndex;
    }

    heap[index] = item;
  }

  isEmpty() {
    return this.size === 0;
  }
}

function solve() {
  const [N, M, K] = reader.readIntArray();
  const graph = Array.from({ length: N + 1 }, () => []);

  for (let i = 0; i < M; i++) {
    const [u, v, weight] = reader.readIntArray();
    graph[u].push([v, weight]);
  }

  const pq = new PriorityQueue((a, b) => a[1] - b[1]);
  const distance = Array.from({ length: N + 1 }, () => new Array(K).fill(Infinity));
  
  distance[1][0] = 0;
  pq.push([1, 0])
  
  while (!pq.isEmpty()) {
    const [now, nowWeight] = pq.shift();

    for (const [next, nextWeight] of graph[now]) {
      const newWeight = nowWeight + nextWeight;
      if (distance[next][K - 1] > newWeight) {
        distance[next][K - 1] = newWeight;
        distance[next].sort((a, b) => a - b);
        pq.push([next, newWeight]);
      }
    }
  }

  return distance
    .slice(1)
    .map((arr) => arr[K - 1] === Infinity ? -1 : arr[K - 1])
    .join("\n");
};

console.log(solve());