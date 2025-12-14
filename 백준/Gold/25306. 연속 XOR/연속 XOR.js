const fs = require("node:fs");

function solve(input) {
  const [A, B] = input.getBigIntegers();

  // 0부터 value까지의 모든 정수에 비트 XOR를 취한 값을 반환한다.
  function getPrefixXOR(value) {
    const remainder = value % 4n;
    switch (remainder) {
      case 0n:
        return value;
      case 1n:
        return 1n;
      case 2n:
        return value + 1n;
      case 3n:
        return 0n;
    }
  }
  return String(getPrefixXOR(A - 1n) ^ getPrefixXOR(B));
}

class InputReader {
  #index = 0;
  #lines;

  constructor(source) {
    this.#lines = source.split("\n");
  }

  getWord() {
    const word = this.#lines[this.#index];
    this.#index += 1;
    return word;
  }

  getWords() {
    return this.getWord()?.split(" ");
  }

  getBigIntegers() {
    return this.getWords()?.map((word) => BigInt(word));
  }
}

const stdin = fs.readFileSync(0, "utf-8");
const input = new InputReader(stdin);

console.log(solve(input));
