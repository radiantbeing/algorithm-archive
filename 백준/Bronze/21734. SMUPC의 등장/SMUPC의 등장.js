const fs = require('fs');

const data = fs
  .readFileSync(
    process.platform === 'linux' ? 0 : 'input.txt',
    'utf-8'
  )
  .toString()
  .trim();

function solve() {
  const S = Array.from(data);

  const repeats = [];

  S.forEach((c) => {
    const ascii = Array
      .from(c.charCodeAt(0).toString())
      .map(digit => parseInt(digit));
    const repeat = ascii
      .reduce((sum, digit) => sum + digit, 0);
      repeats.push(repeat);
  });

  let answer = '';
  
  for (let i = 0; i < S.length; i++) {
    const char = S[i];
    const repeat = repeats[i];
    
    let str = '';
    for (let i = 0; i < repeat; i++) {
      str += char;
    }

    answer += str + '\n';
  }

  return answer;
}

console.log(solve());