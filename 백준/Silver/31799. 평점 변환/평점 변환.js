const fs = require('fs');

const data = fs
    .readFileSync(
      process.platform === 'linux' ? 0 : 'input.txt',
      'utf-8'
    )
    .toString()
    .trim()
    .split('\n');

function solve() {
  function parseHistory(history) {
    const result = [];

    for (let i = 0; i < history.length - 1; i++) {
      const now = history[i];
      const next = history[i + 1];

      if (['+', '-', '0'].includes(next)) {
        result.push(now + next);
        i++;
      } else {
        result.push(now + '0');
      }
    }

    const last = history[history.length - 1];
    if (!['+', '-', '0'].includes(last)) {
      result.push(last + '0');
    }

    return result;
  }

  function getNewGrade(semester, grade) {
    if (['C+', 'C0', 'C-'].includes(grade)) {
      return 'B';
    }

    if (['B0', 'B-'].includes(grade)) {
      if (semester === 0 || ['C+', 'C0', 'C-'].includes(history[semester - 1])) {
        return 'D';
      } else {
        return 'B';
      }
    }
    
    if (['A-', 'B+'].includes(grade)) {
      if (semester === 0 || ['B0', 'B-', 'C+', 'C0', 'C-'].includes(history[semester - 1])) {
        return 'P';
      } else {
        return 'D';
      }
    }

    if ('A0' === grade) {
      if (semester === 0 || ['A-', 'B+', 'B0', 'B-', 'C+', 'C0', 'C-'].includes(history[semester - 1])) {
        return 'E';
      } else {
        return 'P';
      }
    }

    if ('A+' === grade) {
      return 'E';
    }
  }

  const N = parseInt(data[0]);
  const history = parseHistory(data[1]);

  const answer = [];

  Object.entries(history).forEach(([semester, grade]) => {
    semester = parseInt(semester);
    answer.push(getNewGrade(semester, grade));
  });
  
  return answer.join('');
}

console.log(solve());