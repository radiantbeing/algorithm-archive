const fs = require("fs");

class LineReader {
  #data = fs
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
    .toString()
    .trim()
    .split("\n");
  #line = 0;

  read() {
    return this.#data[this.#line++];
  }

  readInt() {
    return +this.read();
  }
}

class MinHeap {
  #heap = [null];

  size() {
    return this.#heap.length - 1;
  }

  insert(value) {
    const heap = this.#heap;
    heap.push(value);
    this.percolateUp();
  }

  shift() {
    const heap = this.#heap;
    if (this.size() === 0) return undefined;

    const value = heap[1];
    if (this.size() === 1) {
        return heap.pop();
    }

    heap[1] = heap.pop();
    this.percolateDown();

    return value;
  } 

  percolateUp() {
    const heap = this.#heap;
    const size = this.size();
    const item = heap[size];
    let pos = size;

    while (pos > 1) {
      const parent = heap[pos / 2 | 0];
      if (item >= parent)
        break;
      heap[pos] = parent;
      pos = pos / 2 | 0;
    }
    heap[pos] = item;
  }

  percolateDown() {
    const heap = this.#heap;
    let pos = 1;
    let item = heap[pos];
    let childIndex;

    while (pos * 2 <= this.size()) {
        childIndex = pos * 2; // 왼쪽 자식
        if (childIndex < this.size() && heap[childIndex + 1] < heap[childIndex]) {
            childIndex++; // 오른쪽 자식이 더 작으면 오른쪽 자식 선택
        }
        if (heap[childIndex] >= item) break;
        heap[pos] = heap[childIndex];
        pos = childIndex;
    }
    heap[pos] = item;
  }
}

const solve = () => {
  const lr = new LineReader();
  const minHeap = new MinHeap();

  const N = lr.readInt();

  let answer = "";

  for (let i = 0; i < N; i++) {
    const number = lr.readInt();
    if (number === 0) {
      answer += `${minHeap.shift() ?? 0}\n`;
    } else {
      minHeap.insert(number);
    }
  }

  return answer;
};

console.log(solve());