const fs = require('fs');

const data = fs
    .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
    .toString()
    .trim()
    .split('\n')
    .map(s => s.split(' ').map(n => parseInt(n)));


function solve() {
  const a = Math.min(data[0][1], data[1][0], data[2][1]);
  const b = Math.min(data[0][0], data[1][1], data[2][0]);

  return a === b ? 2 * a : Math.min(a, b) * 2 + 1;
}

console.log(solve());