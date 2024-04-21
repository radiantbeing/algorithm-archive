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

  readIntArray(delimiter = " ") {
    return this.read().split(delimiter).map(Number);
  }
}

const ls = new LineScanner();

const solve = () => {
  const [N, M] = ls.readIntArray();
  
  const pokemonMap = new Map();
  
  for (let i = 1; i < N + 1; i++) {
    const pokemon = ls.read();
    pokemonMap.set("" + i, pokemon);
    pokemonMap.set(pokemon, "" + i);
  }
  
  let answer = "";

  for (let i = 0; i < M; i++) {
    const pokemon = ls.read();
    answer += `${pokemonMap.get(pokemon)}\n`;
  }

  return answer;
};

console.log(solve());