const fs = require("fs");

class LineReader {
  constructor() {
    this.data = fs
      .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
      .toString()
      .trim()
      .split("\n");
    this.line = 0;
  }

  read() {
    return this.data[this.line++];
  }

  readInt() {
    return Number(this.read());
  }

  readIntArray(delimiter = " ") {
    return this.read().split(delimiter).map(Number);
  }
}

const lr = new LineReader();

const solve = () => {
  const N = lr.readInt();

  const paper = [];

  for (let i = 0; i < N; i++) {
    paper.push(lr.readIntArray());
  }

  let white = 0;
  let blue = 0;

  const dfs = (r1, c1, r2, c2) => {
    const first = paper[r1][c1];
    let isSame = true;

    for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        if (paper[r][c] !== first) {
          isSame = false;
          break;
        }    
      }
      if (isSame === false)
        break;
    }

    if (isSame === true) {
      if (paper[r1][c1] === 0) white++;
      else blue++;  
      return;
    }

    const rMid = (r1 + r2) / 2;
    const cMid = (c1 + c2) / 2;

    if (r1 === r2 && c1 === c2) {
      if (paper[r1][c1] === 0) white++;
      else blue++;        
      return;
    }

    dfs(r1, c1, Math.floor(rMid), Math.floor(cMid));
    dfs(r1, Math.ceil(cMid), Math.floor(rMid), c2);
    dfs(Math.ceil(rMid), c1, r2, Math.floor(cMid));
    dfs(Math.ceil(rMid), Math.ceil(cMid), r2, c2);
  };

  dfs(0, 0, N - 1, N - 1);

  return `${white}\n${blue}`;
};

console.log(solve());
