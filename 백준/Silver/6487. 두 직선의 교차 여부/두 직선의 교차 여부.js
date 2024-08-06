const fs = require('fs');

class Reader {
  data = fs
    .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
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

  readIntArray() {
    return this.read().split(' ').map(n => parseInt(n));
  }
}

function solve() {
  function parsePoints(x1, y1, x2, y2) {
    const a = (y2 - y1) / (x2 - x1),
          b = -x1 * a + y1;
    return {
      '기울기': a,
      'y절편': b,
      '방정식': x => a * x + b
    };
  }

  const reader = new Reader();
  const N = reader.readInt();

  const answer = [];

  for (let i = 0; i < N; i++) {
    const [
      x1, y1, 
      x2, y2, 
      x3, y3, 
      x4, y4
    ] = reader.readIntArray();

    const line1 = parsePoints(x1, y1, x2, y2),
          line2 = parsePoints(x3, y3, x4, y4);

    if (line1['기울기'] === line2['기울기']) {
      if (line1['y절편'] === line2['y절편'])
        answer.push('LINE');
      else
        answer.push('NONE');
    } else {
      let subAnswer;

      if (!isFinite(line1['기울기']) && !isFinite(line2['기울기'])) {
        subAnswer = x1 === x3 ? 'LINE' : 'NONE';
      }
      if (isFinite(line1['기울기']) && isFinite(line2['기울기'])) {
        const x = (line2['y절편'] - line1['y절편']) / (line1['기울기'] - line2['기울기']),
              y = line1['방정식'](x);
        subAnswer = `POINT ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      if (isFinite(line1['기울기']) && !isFinite(line2['기울기'])) {
        const x = x3,
              y = line1['방정식'](x);
        subAnswer = `POINT ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
      if (!isFinite(line1['기울기']) && isFinite(line2['기울기'])) {
        const x = x1,
              y = line2['방정식'](x);
        subAnswer = `POINT ${x.toFixed(2)} ${y.toFixed(2)}`;
      }

      answer.push(subAnswer);
    }
  }

  return answer.join('\n');
}

console.log(solve());