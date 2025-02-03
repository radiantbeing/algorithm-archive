const fs = require('fs');

const reader = {
  lines: fs
    .readFileSync(process.platform === 'linux' ? 0 : "stdin", 'utf-8')
    .split('\n'),

  cursor: 0,

  read() {
    return this.lines[this.cursor++];
  }
};

function solve() {
  const string = reader.read();
  const numbers = string.split('').map(n => parseInt(n));

  const count = [0, 0];
  let current = null;

  for (const next of numbers) {
    if (current !== next) {
      current = next;
      count[next]++;
    }
  }

  return Math.min(...count);
}

console.log(solve());