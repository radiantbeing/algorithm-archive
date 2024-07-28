const fs = require("fs");

class Reader {
  data = fs 
    .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
    .toString()
    .trim()
    .split("\n");

  cursor = 0;

  read() {
    return this.data[this.cursor++];
  }

  readInt() {
    return Number(this.read());
  }

  readIntArray() {
    return this.read().split(" ").map(Number);
  }
}

class PriorityQ {
  constructor(compare) {
    this.heap = new Array(64);
    this.size = 0;
    this.compare = compare;
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
    const compare = this.compare;

    const item = heap[size];
    let index = size;

    while (index > 1) {
      const parentIndex = Math.floor(index / 2);
      const parent = heap[parentIndex];

      if (compare(parent, item) <= 0)
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
    const compare = this.compare;

    const item = heap[1];
    let index = 1;

    while (index * 2 <= size) {
      let childIndex = index * 2 + 1;
      if (childIndex > size || compare(heap[index * 2], heap[childIndex]) < 0)
        childIndex = index * 2;

      const child = heap[childIndex];
      if (compare(item, child) <= 0)
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
  const reader = new Reader();
  const [V, E] = reader.readIntArray();
  const K = reader.readInt();
  const graph = Array.from({ length: V + 1 }, () => []);

  for (let i = 0; i < E; i++) {
    const [u, v, weight] = reader.readIntArray();
    graph[u].push([v, weight]);
  }

  const priorityQ = new PriorityQ((a, b) => a[1] - b[1]);
  const visited = new Array(V + 1).fill(false);
  const distance = new Array(V + 1).fill(Infinity);
  
  distance[K] = 0;
  priorityQ.push([K, 0])
  
  while (!priorityQ.isEmpty()) {
    const [now] = priorityQ.shift();

    if (visited[now])
      continue;
    visited[now] = true;

    for (const [next, weight] of graph[now]) {
      if (distance[next] > distance[now] + weight) {
        distance[next] = distance[now] + weight;
        priorityQ.push([next, distance[next]]);
      }
    }
  }

  return distance
    .slice(1)
    .map((value) => value === Infinity ? "INF" : value.toString())
    .join("\n");
};

console.log(solve());