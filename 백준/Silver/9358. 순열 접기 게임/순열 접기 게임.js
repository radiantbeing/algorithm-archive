const fs = require('fs');

class Reader {
  data = fs
    .readFileSync(
      process.platform === 'linux' ? 0 : 'input.txt',
      'utf-8'
    )
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

  readIntArr() {
    return this
      .read()
      .split(' ')
      .map(d => parseInt(d));
  }
}

function solve() {
  function fold(arr) {
    const newArr = [];
    for (let s = 0; s < Math.ceil(arr.length / 2); s++) {
      const e = arr.length - s - 1;
      newArr.push(arr[s] + arr[e])
    }

    return newArr;
  }

  function determineWinner(arr) {
    return arr[0] > arr[1] ? 'Alice' : 'Bob';
  }

  const reader = new Reader();
  const T = reader.readInt();

  const answer = [];

  for (let _ = 0; _ < T; _++) {
    const N = reader.readInt();
    
    let sequence = reader.readIntArr();
    while (sequence.length > 2) {
      sequence = fold(sequence);
    }

    const winner = determineWinner(sequence);
    answer.push(winner);
  }

  return answer.reduce((accu, val, idx) => 
    accu + `Case #${idx + 1}: ${val}\n`, '');
}

console.log(solve());