const fs = require('fs');

class Reader {
  data = fs
    .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
    .toString()
    .trim()
    .split('\n');

  cursor = 0;

  read() {
    return this.data[this.cursor++];
  }

  readInt() {
    return parseInt(this.read());
  }

  readCharArray() {
    return Array.from(this.read());
  }
}

function solve() {
  function swap(matrix, srcX, srcY, dstX, dstY) {
    [matrix[srcX][srcY], matrix[dstX][dstY]] = 
      [matrix[dstX][dstY], matrix[srcX][srcY]];
  }

  function calcLongestCount(matrix) {
    let maxCount = 1;

    for (let i = 0; i < matrix.length; i++) {
      let count = 1;
      for (let j = 1; j < matrix.length; j++) {
        if (matrix[i][j] === matrix[i][j - 1]) {
          count++;
        } else {
          maxCount = Math.max(maxCount, count);
          count = 1;
        }
      }
      maxCount = Math.max(maxCount, count);
    }

    for (let j = 0; j < matrix.length; j++) {
      let count = 1;
      for (let i = 1; i < matrix.length; i++) {
        if (matrix[i][j] === matrix[i - 1][j]) {
          count++;
        } else {
          maxCount = Math.max(maxCount, count);
          count = 1;
        }
      }
      maxCount = Math.max(maxCount, count);
    }

    return maxCount;
  }

  const reader = new Reader();
  const N = reader.readInt();
  const matrix = new Array(N);

  for (let i = 0; i < N; i++) {
    matrix[i] = reader.readCharArray();
  }

  let answer = calcLongestCount(matrix);

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      if (x + 1 < N && matrix[x][y] !== matrix[x + 1][y]) {
        swap(matrix, x, y, x + 1, y);
        answer = Math.max(answer, calcLongestCount(matrix));
        swap(matrix, x, y, x + 1, y);
      }
      if (y + 1 < N && matrix[x][y] !== matrix[x][y + 1]) {
        swap(matrix, x, y, x, y + 1);
        answer = Math.max(answer, calcLongestCount(matrix));
        swap(matrix, x, y, x, y + 1);
      }
    }
  }

  return answer;
}

console.log(solve());