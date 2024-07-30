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

  readBigInt() {
    return BigInt(this.read());
  }

  readArray() {
    return this.read().split(" ");
  }
}

function solve() {
  const reader = new Reader();
  const [N, M, K] = reader.readArray().map(Number);

  let treeHeight = 0;
  while (treeHeight < Math.log2(N)) {
    treeHeight++;
  }

  const tree = new Array(2 ** treeHeight * 2).fill(BigInt(0));
  for (let i = 2 ** treeHeight; i < 2 ** treeHeight + N; i++) {
    tree[i] = reader.readBigInt();
  }

  for (let i = 2 ** treeHeight - 1; i >= 1; i--) {
    tree[i] = tree[i * 2] + tree[i * 2 + 1];
  }

  const answer = [];
  
  for (let i = 0; i < M + K; i++) {
    let [type, u, v] = reader.readArray();

    if (type === "1") {
      let index = 2 ** treeHeight + Number(u) - 1;
      let value = BigInt(v);
      
      const diff = value - tree[index];
      
      while (index >= 1) {
        tree[index] += diff;
        index = Math.floor(index / 2);
      }
    } else if (type === "2") {
      let startIndex = 2 ** treeHeight + Number(u) - 1;
      let endIndex = 2 ** treeHeight + Number(v) - 1;
      
      let prefixSum = BigInt(0);

      while (startIndex <= endIndex) {
        if (startIndex % 2 === 1)
          prefixSum += tree[startIndex];
        if (endIndex % 2 === 0)
          prefixSum += tree[endIndex]

        startIndex = Math.floor((startIndex + 1) / 2);
        endIndex = Math.floor((endIndex - 1) / 2);
      }
      
      answer.push(prefixSum);
    }
  }

  return answer.join("\n");
}

console.log(solve());