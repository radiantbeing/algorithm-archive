const fs = require('fs');

const data = fs
  .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
  .toString()
  .trim();

function solve() {
  const N = parseInt(data);

  const binary = N.toString(2).padStart(32, '0');
  const twosComplement = ((~N + 1) >>> 0).toString(2).padStart(32, '0');
  
  function compare(a, b) {
    let count = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i])
        count++;
    }
    return count;
  }

  return compare(binary, twosComplement);
}

console.log(solve());