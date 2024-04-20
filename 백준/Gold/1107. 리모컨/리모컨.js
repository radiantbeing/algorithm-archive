const fs = require("fs");

class LineScanner {
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
}

const solve = () => {
  const ls = new LineScanner();
  let answer = Infinity;

  const N = +ls.read();
  const M = +ls.read();

  const broken = ls
    .read()
    ?.split(" ")
    .map(Number) ?? [];
  const brokenSet = new Set(broken);

  for (let channel = 0; channel <= 999_999; channel++) {
    const channelStr = String(channel);
    let isValidChannel = true;

    for (const channelChar of channelStr) {
      if (brokenSet.has(+channelChar)) {
        isValidChannel = false;
        break;
      }
    }

    if (isValidChannel) {
      answer = Math.min(
        answer, 
        Math.abs(N - channel) + channelStr.length
      );
    }
  }

  answer = Math.min(answer, Math.abs(N - 100));

  return answer;
};

console.log(solve());