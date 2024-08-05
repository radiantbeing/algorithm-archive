const fs = require('fs');

const reader = (() => {
  const data = fs
    .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
    .toString()
    .trim()
    .split('\n');
  let cursor = 0;

  return {
    read() {
      return data[cursor++];
    },
    readInt() {
      return parseInt(this.read());
    }
  }
})();

function solve() {
  const N = reader.readInt();
  const answer = [];

  for (let i = 0; i < N; i++) {
    const V = reader.readInt();
    const S = []
    
    for (let j = 0; j < V; j++)
      S.push(reader.readInt());

    S.sort((a, b) => a - b);

    const population = S.reduce((accu, val) => {
      if (accu[val] === undefined)
        accu[val] = 0;
      accu[val]++;
      return accu;
    }, {});
    
    const keyOfMaxPopultation = Object
      .entries(population)
      .sort((a, b) => a[1] === b[1] ? a[0] - b[0] : b[1] - a[1])
      .at(0)
      .at(0);

    answer.push(keyOfMaxPopultation);
  }

  return answer.join('\n');
}

console.log(solve());