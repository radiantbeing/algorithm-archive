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

  readIntArray() {
    return this.read().split(" ").map(Number);
  }
}


const solve = () => {
  const lr = new LineReader();

  const [N, M] = lr.readIntArray();
  const groups = Array.from({ length: N + 1 }, (_, i) => i);

  const find = (e) => {
    if (groups[e] === e)
      return e;
    return groups[e] = find(groups[e]);
  };

  const union = (e1, e2) => {
    e1 = find(e1);
    e2 = find(e2);
    groups[e2] = e1;
  };

  let answer = "";

  for (let m = 0; m < M; m++) {
    const [opcode, operand1, operand2] = lr.readIntArray();
    if (opcode === 0)
      union(operand1, operand2);
    else if (opcode === 1)
      answer += find(operand1) === find(operand2) ? "YES\n" : "NO\n";
  }
  
  return answer;
};

console.log(solve());