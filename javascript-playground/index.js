const fs = require("node:fs");

// 사용법:
// 1. input.txt에 예제 입력을 복사하여 붙여 넣습니다.
// 2. solve 함수의 내용을 작성합니다.
// 3. npm run start의 출력과 예제 출력을 비교합니다.

function solve(input) {
  // 예시:
  // const [N, M] = input.getIntegers();
  // return ...
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

  getInteger() {
    return this.getWord();
  }

  getIntegers() {
    return this.getWords()?.map((word) => parseInt(word, 10));
  }
}

const stdin = fs.readFileSync(0, "utf-8");
const input = new InputReader(stdin);

console.log(solve(input));
