const fs = require("fs");

class LineScanner {
  constructor() {
    this.data = fs
      .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
      .toString()
      .trim()
      .split('\n');
    this.line = 0;
  }

  read() {
    return this.data[this.line++];
  }

  readIntArray(delimiter = " ") {
    return this.read().split(delimiter).map(Number);
  }
}

const ls = new LineScanner();

const solve = () => {
  const [N, M] = ls.readIntArray();

  const tempSet = new Set();
  const answerSet = new Set();
  
  for (let i = 0; i < N; i++) {
    const person = ls.read();
    tempSet.add(person);
  }

  for (let i = 0; i < M; i++) {
    const person = ls.read();
    if (tempSet.has(person)) {
      answerSet.add(person);
    }
  }

  const answerArray = Array.from(answerSet);
  answerArray.sort();

  let answer = "";
  answer += `${answerSet.size}\n`;
  answer += answerArray.join("\n");

  return answer;
};

console.log(solve());