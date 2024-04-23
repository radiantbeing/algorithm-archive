const fs = require("fs");

class LineReader {
  constructor() {
    this.data = fs
      .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
      .toString()
      .trim()
      .split("\n");
    this.line = 0;
  }

  read() {
    return this.data[this.line++];
  }

  readInt() {
    return Number(this.read());
  }
}

class PriorityQueue {
  constructor() {
    this.heap = new Array(64);
    this.size = 0;
  }

  insert(value) {
    const heap = this.heap;
    const size = ++this.size;

    if (size === heap.length) {
      heap.length *= 2;
    }

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

      if (item >= parent) {
        break;
      }

      heap[pos] = parent;
      pos = Math.floor(pos / 2);
    }
    heap[pos] = item;
  }

  shift() {
    const heap = this.heap;
    const value = heap[1];

    if (value === undefined) {
      return undefined;
    }

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

    while (2 * pos <= size) {
      let childIndex = 2 * pos + 1;
      if (childIndex > size || heap[2 * pos] < heap[childIndex]) {
        childIndex = 2 * pos;
      }
      const child = heap[childIndex];
      if (item <= child) {
        break;
      }
      heap[pos] = child;
      pos = childIndex;
    }
    heap[pos] = item;
  }
}

const solve = () => {
  const lr = new LineReader();
  const pq = new PriorityQueue();
  
  const N = lr.readInt();
  let answer = "";

  for (let i = 0; i < N; i++) {
    const number = lr.readInt();
    if (number === 0) {
      answer += `${-(pq.shift() ?? 0)}\n`
      continue;
    }
    pq.insert(-number);
  }

  return answer;
};

console.log(solve());
