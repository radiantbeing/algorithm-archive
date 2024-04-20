const fs = require("fs");

class LineScanner {
  constructor() {
    this.data = fs
      .readFileSync(
        process.platform === "linux" ? "/dev/stdin" : "input.txt"
      )
      .toString()
      .trim()
      .split("\n");
    this.line = 0;
  }

  read() {
    return this.data[this.line++];
  }
}

const solution = () => {
  const ls = new LineScanner();
  const [N, r, c] = ls
    .read()
    .split(" ")
    .map(Number);
  
  let answer = 0;

  const dfs = (r1, c1, r2, c2, value) => {
    const rowMid = (r1 + r2) / 2;
    const colMid = (c1 + c2) / 2;
    const cells = (r2 - r1 + 1) * (c2 - c1 + 1) / 4;

    if (r1 === r2 && c1 === c2) {
      answer = value;
    }

    if (r < rowMid && c < colMid)
      dfs(r1, c1, Math.floor(rowMid), Math.floor(colMid), value);
    else if (r < rowMid && c > colMid)
      dfs(r1, Math.ceil(colMid), Math.floor(rowMid), c2, value + cells);
    else if (r > rowMid && c < colMid)
      dfs(Math.ceil(rowMid), c1, r2, Math.floor(colMid), value + cells * 2);
    else if (r > rowMid && c > colMid)
      dfs(Math.ceil(rowMid), Math.ceil(colMid), r2, c2, value + cells * 3);
  };

  dfs(0, 0, 2 ** N - 1, 2 ** N - 1, 0);
 
  return answer;
};

console.log(solution());