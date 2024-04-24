const fs = require("fs");

class LineReader {
  constructor() {
    this.data = fs
      .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
      .toString()
      .trim()
      .split("\n");
    this.cursor = 0;
  }

  read() {
    return this.data[this.cursor++];
  }

  readIntArray(delimiter = " ") {
    return this.read().split(delimiter).map(Number);
  }
}

const solve = () => {
  const lr = new LineReader();
  const [N, M] = lr.readIntArray();

  const field = Array.from({ length: N }, () => Array(M).fill(null));
  const visited = Array.from({ length: N }, () => Array(M).fill(null));
  const queue = [];


  for (let i = 0; i < N; i++) {
    const row = lr.readIntArray();
    for (let j = 0; j < M; j++) {
      field[i][j] = row[j];
      if (field[i][j] === 0) {
        visited[i][j] = 0;
      }
      if (field[i][j] === 2) {
        visited[i][j] = 0;
        queue.push([i, j]);
      }
    }
  }

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      if (nx < 0 || nx > N - 1 || ny < 0 || ny > M - 1 || visited[nx][ny] !== null)
        continue;
      visited[nx][ny] = visited[x][y] + 1;
      queue.push([nx, ny]);
    }  
  }

  let answer = "";

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      answer += `${visited[i][j] ?? -1} `;
    }
    answer += "\n";
  }

  return answer;
};

console.log(solve());