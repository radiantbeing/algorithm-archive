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

  const peopleMap = new Map();

  for (let i = 0; i < N; i++) {
    const person = ls.read();
    peopleMap.set(person, {
      isHeard: true,
      isSeen: false,
    });
  }

  for (let i = 0; i < M; i++) {
    const person = ls.read();
    if (peopleMap.get(person) === undefined) {
      peopleMap.set(person, {
        isHeard: false,
        isSeen: true,
      });
    }
    peopleMap.set(person, {
      ...peopleMap.get(person),
      isSeen: true,
    });
  }

  const peopleEntries = peopleMap.entries();
  const peopleArray = Array.from(peopleEntries);
  
  const peopleWhoHeardAndSeen = peopleArray
    .filter(([_, { isHeard, isSeen }]) => isHeard && isSeen)
    .map(([name, _]) => name);

  peopleWhoHeardAndSeen.sort();

  let answer = "";

  answer += `${peopleWhoHeardAndSeen.length}\n`;
  answer += peopleWhoHeardAndSeen.join("\n");

  return answer;
};

console.log(solve());