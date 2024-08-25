const fs = require("fs");

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
    let pos = size;

    while (pos > 1) {
      const parentPos = Math.floor(pos / 2);
      const parent = heap[parentPos];

      if (comparator(item, parent) >= 0) {
        break;
      }

      heap[pos] = parent;
      pos = parentPos;
    }

    heap[pos] = item;
  }

  shift() {
    const heap = this.heap;
    const item = heap[1];
    if (item === undefined) {
      return;
    }
    const size = --this.size;

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
    let pos = 1;

    while (pos * 2 <= size) {
      let childPos = pos * 2 + 1;
      if (childPos > size || comparator(heap[pos * 2], heap[childPos]) < 0) {
        childPos = pos * 2;
      }
      const child = heap[childPos];
      
      if (comparator(item, child) <= 0) {
        break;
      }

      heap[pos] = child;
      pos = childPos;
    }

    heap[pos] = item;
  }
}

class InputReader {
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
    return parseInt(this.read());
  }
}


function solve() {
  const reader = new InputReader();
  const N = reader.readInt();
  
  const priorityQueue = new PriorityQueue((a, b) => a - b);
  const answer = [];

  for (let _ = 0; _ < N; _++) {
    const x = reader.readInt();
    if (x === 0) {
      answer.push(priorityQueue.shift() || 0);
    } else {
      priorityQueue.push(x);
    }
  }

  return answer.join("\n");
}

console.log(solve());