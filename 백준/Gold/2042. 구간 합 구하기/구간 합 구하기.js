const fs = require("fs");

class LineReader {
  data = fs
    .readFileSync(
      process.platform === "linux" ? 0 : "input.txt",
      "utf-8"
    )
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
  
  readBigInt() {
    return BigInt(this.read());
  }

  readStrArray() {
    return this.read().split(" ");
  }

  readIntArray() {
    return this.readStrArray().map(Number);
  }
}

const solve = () => {
  const lineReader = new LineReader();

  const [N, M, K] =  lineReader.readIntArray();
  const treeHeight = Math.ceil(Math.log2(N));
  const tree = Array(2 ** (treeHeight +  1)).fill(BigInt(0));

  for (let i = 0; i < N; i++) {
    tree[(2 ** treeHeight) + i] = lineReader.readBigInt();
  }

  for (let i = 2 ** treeHeight - 1; i > 0; i--) {
    tree[i] = tree[2 * i] + tree[2 * i + 1];
  }

  let answer = "";

  for (let i = 0; i < M + K; i++) {
    let [opcode, operand1, operand2] = lineReader.readStrArray();
    if (opcode === "1") {
      operand1 = Number(operand1);
      operand2 = BigInt(operand2);
      let index = 2 ** treeHeight + operand1 - 1;
      const diff = operand2 - tree[index];
      while (index > 0) {
        tree[index] += diff;
        index = Math.floor(index / 2);
      }
    } else if (opcode === "2") {
      operand1 = Number(operand1);
      operand2 = Number(operand2);
      let sum = BigInt(0);
      let startIndex = 2 ** treeHeight + operand1 - 1;
      let endIndex = 2 ** treeHeight + operand2 - 1;
      while (startIndex <= endIndex) {
        if (startIndex % 2 === 1) {
          sum += tree[startIndex];
        }
        if (endIndex % 2 === 0) {
          sum += tree[endIndex];
        }
        startIndex = Math.floor((startIndex + 1) / 2);
        endIndex = Math.floor((endIndex - 1) / 2);
      }
      answer += `${sum}\n`;
    }
  }

  return answer;
};

console.log(solve());