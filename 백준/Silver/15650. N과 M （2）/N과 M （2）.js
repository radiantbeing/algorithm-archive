const fs = require('fs');

const data = fs
  .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
  .toString()
  .trim()
  .split(' ')
  .map(n => parseInt(n));

function solve() {
  const [N, M] = data;

  const answer = [];

  function addAnswer(value, sequence, visited) {
    if (sequence.length === M) {
      answer.push(sequence.join(' '));
      return;
    }

    const targets = visited
      .map((val, idx) => (idx > value && !val) ? idx : null)
      .filter(val => val !== null);

    targets.forEach((val, idx) => {
      const newVisited = [...visited];
      newVisited[val] = true;
      addAnswer(val, sequence.concat(val), newVisited);
    })
  }

  for (let i = 1; i <= N; i++) {
    const visited = new Array(N + 1).fill(false);
    visited[i] = true;
    addAnswer(i, [i], visited);
  }

  return answer.join('\n');
}

console.log(solve());