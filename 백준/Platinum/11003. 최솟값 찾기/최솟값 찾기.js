const fs = require("fs");

class Deque {
  count = 0;
  lowestCount = 0;
  items = {};

  push(item) {
    this.items[this.count] = item;
    this.count++;
  }

  unshift(item) {
    if (this.isEmpty()) {
      this.push(item);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = item;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.items[0] = item;
    }
  }

  pop() {
    if (this.isEmpty()) {
      return;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  shift() {
    if (this.isEmpty()) {
      return;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peekFront() {
    if (this.isEmpty()) {
      return;
    }
    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) {
      return;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }
}

const inputReader = {
  data: fs
    .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
    .toString()
    .trim()
    .split("\n"),
  
  cursor: 0,
  
  read() {
    return this.data[this.cursor++];
  },

  readIntArray() {
    return this
      .read()
      .split(" ")
      .map(s => parseInt(s));
  }
};

function solve() {
  const [N, L] = inputReader.readIntArray();
  const numbers = inputReader.readIntArray();

  const deque = new Deque();
  let answers = [];

  numbers.forEach((value, index) => {
    while (deque.size() > 0 && deque.peekBack()[1] >= value) {
      deque.pop();
    }

    deque.push([index, value]);

    if (deque.peekFront()[0] <= index - L) {
      deque.shift();
    }

    answers.push(deque.peekFront()[1]);

    if (answers.length === 10_000) {
      process.stdout.write(answers.join(" ") + " ");
      answers = [];
    }
  });

  process.stdout.write(answers.join(" "));
}

solve();