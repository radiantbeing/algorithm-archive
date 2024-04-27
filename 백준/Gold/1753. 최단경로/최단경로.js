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

  readIntArray() {
    return this.read().split(" ").map(Number);
  }
}

class PriorityQueue {
  constructor() {
    this.heap = new Array(64);
    this.size = 0;
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

    let pos = size;
    const item = heap[pos];

    while (pos > 1) {
      const parent = heap[Math.floor(pos / 2)];

      if (item[0] >= parent[0])
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
      return undefined;

    const size = --this.size;
    heap[1] = heap[size + 1];
    heap[size + 1] = undefined;
    this.percolateDown();
    return value;
  }

  percolateDown() {
    const heap = this.heap;
    const size = this.size;

    let pos = 1;
    const item = heap[pos];

    while (pos * 2 <= size) {
      let childIndex = pos * 2 + 1;
      if (childIndex > size || heap[pos * 2][0] < heap[childIndex][0])
        childIndex = pos * 2;
      const child = heap[childIndex];
      if (item[0] <= child[0])
        break;
      heap[pos] = child;
      pos = childIndex;
    }

    heap[pos] = item;
  }
}

const solve = () => {
  const lr = new LineReader();

  const [V, E] = lr.readIntArray();
  const K = lr.readInt();

  const graph = Array.from({ length: V + 1 }, () => []);
  const visited = Array(V + 1).fill(false);
  const distance = Array(V + 1).fill(Infinity);

  const pq = new PriorityQueue();

  distance[K] = 0;
  pq.push([distance[K], K]);

  for (let i = 0; i < E; i++) {
    const [u, v, w] = lr.readIntArray();
    graph[u].push([v, w]);
  }

  while (pq.size > 0) {
    const [_, now] = pq.shift();

    if (visited[now] === true)
      continue;

    visited[now] = true;

    for (const [next, weight] of graph[now]) {
      if (distance[next] > distance[now] + weight) {
        distance[next] = distance[now] + weight;
        pq.push([distance[next], next]);
      }
    }
  }

  let answer = "";

  for (let i = 1; i < V + 1; i++) {
    answer += `${distance[i] === Infinity ? "INF" : distance[i]}\n`;
  }

  return answer;
};

console.log(solve());