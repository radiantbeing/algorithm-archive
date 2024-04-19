const fs = require("fs");

class LineScanner {
  #data;
  #line = 0;

  constructor() {
    this.#data = fs
      .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
      .toString()
      .trim()
      .split("\n");
  }

  read() {
    return this.#data[this.#line++];
  }
}

const solution = () => {
  const ls = new LineScanner();

  let answer = "";

  const T = +ls.read();

  for (let t = 0; t < T; t++) {
    const [M, N, K] = ls.
      read()
      .split(" ")
      .map(Number);

    const ground = Array.from(
      { length: M },
      () => Array(N).fill(0)
    );

    for (let k = 0; k < K; k++) {
      const [i, j] = ls
        .read()
        .split(" ")
        .map(Number); 
      ground[i][j] = 1;
    }

    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];

    const percolate = (x, y) => {
      if (ground[x][y] !== 1) return;
      ground[x][y] = 0;
      for (let i = 0; i < 4; i++) {
        if (
          x + dx[i] < 0 ||
          x + dx[i] > M - 1 ||
          y + dy[i] < 0 ||
          y + dy[i] > N - 1
        ) continue;
        percolate(x + dx[i], y + dy[i]);
      }
    }

    let groups = 0;

    for (let x = 0; x < M; x++) {
      for (let y = 0; y < N; y++) {
        if (ground[x][y] === 0) continue;
        percolate(x, y);
        groups++;
      }
    }

    answer += `${groups}\n`;
  }

  return answer;
};

console.log(solution());