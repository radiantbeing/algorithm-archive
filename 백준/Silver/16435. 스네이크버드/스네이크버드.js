const fs = require('fs');

const data = fs
  .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

function solve() {
  function parseIntArray(str) {
    return str.split(' ').map(n => parseInt(n));
  }

  let [N, L] = parseIntArray(data[0]),
      fruits = parseIntArray(data[1]);

  fruits.sort((a, b) => a - b);

  let cursor = 0;
  while (fruits[cursor] <= L) {
    L++;
    cursor++;
  }

  return L;
};

console.log(solve());