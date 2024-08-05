const fs = require('fs');

class Team {
  constructor(univ, name, solved, penalty) {
    this.univ = univ;
    this.name = name;
    this.solved = parseInt(solved);
    this.penalty = parseInt(penalty);
  }
}

const data = fs
  .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

function solve() {
  const [N, K] = data[0].split(' ').map(n => parseInt(n));
  
  const teams = data
    .slice(1)
    .map(t => new Team(...t.split(' ')));
  const univSet = new Set();

  const comparator = (a, b) => 
    a['solved'] === b['solved'] ? a['penalty'] - b['penalty'] : b['solved'] - a['solved'];
  const isValid = (team) => {
    if (!univSet.has(team.univ)) {
      univSet.add(team.univ);
      return true;
    }
    return false;
  }

  return teams
  .sort(comparator)
  .filter(isValid)
  .slice(0, K)
  .map(team => team.name)
  .join('\n');
}

console.log(solve());