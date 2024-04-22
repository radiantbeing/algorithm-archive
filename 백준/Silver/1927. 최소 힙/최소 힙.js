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

  peek() {
      return this.#heap[1];
  }
  
  insert(value) {
      const heap = this.#heap;
      heap.push(value);
      this.percolateUp();
  }

  shift() {
      const heap = this.#heap;
      const value = this.#heap[1];
      const size = this.size();
      if (size === 0)
          return;
      if (size === 1)
          return heap.pop();

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
          if (parent <= item)
              break;
          heap[pos] = parent;
          pos = pos / 2 | 0;
      }
      heap[pos] = item;
  }
  
  percolateDown() {
      const heap = this.#heap;
      const size = this.size();
      const item = heap[1];
      let pos = 1;

      while (pos * 2 <= size) {
          let childIndex = pos * 2 + 1;
          if (childIndex > size || heap[pos * 2] < heap[childIndex])
              childIndex = pos * 2;
          const child = heap[childIndex];
          if (item <= child)
              break;
          heap[pos] = child;
          pos = childIndex;
      }
      heap[pos] = item;
  }
  
  size() {
      return this.#heap.length - 1;
  }

  heap() {
      return this.#heap;
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