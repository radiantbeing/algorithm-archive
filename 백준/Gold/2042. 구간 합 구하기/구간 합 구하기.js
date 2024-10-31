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

  readStrArray() {
    return this.read().split(" ");
  },

  readIntArray() {
    return this.readStrArray().map(s => parseInt(s));
  },

  readBigInt() {
    return BigInt(this.read());
  },

  readBigIntArray() {
    return this.readStrArray().map(s => BigInt(s));
  }
};

function solve() {
  const [N, M, K] = reader.readIntArray();

  const treeHeight = Math.ceil(Math.log2(N));
  const treeSize = 2 ** (treeHeight + 1);
  const tree = new Array(treeSize).fill(0n);

  for (let i = 0; i < N; i++) {
    const index = 2 ** treeHeight + i;
    tree[index] = reader.readBigInt();
  }

  for (let i = 2 ** treeHeight - 1; i > 0; i--) {
    tree[i] = tree[i * 2] + tree[i * 2 + 1];
  }

  const query = (startIndex, endIndex) => {
    startIndex = 2 ** treeHeight + startIndex - 1;
    endIndex = 2 ** treeHeight + endIndex - 1;

    let accumulator = 0n;
    
    while (startIndex <= endIndex) {
      if (startIndex % 2 === 1)
        accumulator += tree[startIndex];
      if (endIndex % 2 === 0)
        accumulator += tree[endIndex];
      startIndex = Math.floor((startIndex + 1) / 2);
      endIndex = Math.floor((endIndex - 1) / 2);
    }

    return accumulator;
  };

  const update = (index, value) => {
    index = (2 ** treeHeight) + index - 1;
    const diff = value - tree[index];

    while (index > 0) {
      tree[index] += diff;
      index = Math.floor(index / 2);
    }
  };

  let answer = "";

  for (let i = 0; i < M + K; i++) {
    const [a, b, c] = reader.readStrArray();

    if (a === "1") {
      update(parseInt(b), BigInt(c));
    }
    
    if (a === "2") {
      answer += query(parseInt(b), parseInt(c)) + "\n";
    }
  }

  return answer;
}

console.log(solve());