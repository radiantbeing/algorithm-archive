"use strict";

const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "input";

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(element, priority) {
    const node = { element, priority };
    this.heap.push(node);
    this.heapifyUp();
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const root = this.heap[0];
    const lastNode = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastNode;
      this.heapifyDown();
    }

    return root.element;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const current = this.heap[index];
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (current.priority < parent.priority) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let index = 0;

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallest = index;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex].priority < this.heap[smallest].priority
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].priority < this.heap[smallest].priority
      ) {
        smallest = rightChildIndex;
      }

      if (smallest !== index) {
        this.swap(index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  }

  swap(i, j) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

const input = fs.readFileSync(path).toString().trim().split("\n");

const [V, E] = input.shift().split(" ").map(Number);
const start = Number(input.shift());
const adjacency = Array.from({ length: V + 1 }, () => []);
const distance = Array.from({ length: V + 1 }, () => Infinity);
const visited = Array.from({ length: V + 1 }, () => false);
const pq = new PriorityQueue();

input.forEach((i) => {
  const [s, e, weight] = i.split(" ").map(Number);
  adjacency[s].push([e, weight]);
});

pq.enqueue([start, 0]);
distance[start] = 0;

while (pq.size() > 0) {
  const [current, currentWeight] = pq.dequeue();

  if (visited[current]) {
    continue;
  }

  visited[current] = true;

  for (let [next, nextWeight] of adjacency[current]) {
    if (distance[current] + nextWeight < distance[next]) {
      distance[next] = distance[current] + nextWeight;
      pq.enqueue([next, distance[next]], distance[next]);
    }
  }
}

let result = "";

for (let i of distance.slice(1)) {
  if (i === Infinity) {
    result = result + "INF\n";
  } else {
    result = result + `${i}\n`;
  }
}

console.log(result);
