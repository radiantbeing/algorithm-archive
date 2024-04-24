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

  readIntArray(delimiter = " ") {
    return this.read().split(delimiter).map(Number);
  }
}

const solve = () => {
  const lr = new LineReader();
  const [M, N] = lr.readIntArray();

  const container = [];

  for (let i = 0; i < N; i++) {
    container.push(lr.readIntArray());
  }

  const queue = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (container[i][j] === 1) {
        queue.push([i, j]);
      }
    }
  }

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  let index = 0;

  while (index < queue.length) {
    const [x, y] = queue[index++];
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx > N - 1 || ny < 0 || ny > M - 1 || container[nx][ny] !== 0)
        continue;
      container[nx][ny] = container[x][y] + 1;
      queue.push([nx, ny]);
    }
  }

  let answer = 0;
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (container[i][j] === 0)
        return -1;
      answer = Math.max(answer, container[i][j]);
    }
  }

  return answer - 1;
};

console.log(solve());