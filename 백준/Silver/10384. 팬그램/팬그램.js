const fs = require("fs");

class Reader {
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
}

const solve = () => {
  const reader = new Reader();
  const N = reader.readInt();

  let answer = "";

  for (let n = 0; n < N; n++) {
    const text = reader.read().toLowerCase();
    const charCodeMap = new Map();

    for (let c = 97; c < 123; c++) {
      charCodeMap.set(c, 0);
    }

    for (const char of text) {
      const charCode = char.charCodeAt();
      const isAlphabet = 97 <= charCode && charCode <= 122; // 97: a, 122: z
      if (isAlphabet) {
        charCodeMap.set(charCode, charCodeMap.get(charCode) + 1);
      }
    }

    const pangramType = Math.min(...charCodeMap.values());
    if (pangramType === 0) answer += `Case ${n + 1}: Not a pangram\n`
    else if (pangramType === 1) answer += `Case ${n + 1}: Pangram!\n`
    else if (pangramType === 2) answer += `Case ${n + 1}: Double pangram!!\n`
    else if (pangramType === 3) answer += `Case ${n + 1}: Triple pangram!!!\n`
  }

  return answer;
};

console.log(solve());