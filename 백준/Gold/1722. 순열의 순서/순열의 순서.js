const fs = require("fs");

const reader = {
    data: fs
        .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
        .toString()
        .trim()
        .split("\n"),
    
    cursor: 0,

    read() {
        return this.data[this.cursor++];
    },

    readInt() {
        return parseInt(this.read());
    },

    readStrArray() {
        return this.read().split(" ");
    }
};

function solve() {
  const N = reader.readInt();
  const query = reader.readStrArray();
  const factorial = new Array(N + 1).fill(1n);
  const sequence = new Array(N + 1);
  const visited = new Array(N + 1).fill(false);

  for (let i = 1; i <= N; i++) {
    factorial[i] = BigInt(i) * factorial[i - 1];
  }

  if (query[0] === "1") {
    let K = BigInt(query[1]);
    for (let i = 1; i <= N; i++) {
      let count = 1n;
      for (let j = 1; j <= N; j++) {
        if (visited[j]) continue;
        if (K <= factorial[N - i] * count) {
          K -= factorial[N - i] * (count - 1n);
          sequence[i] = j;
          visited[j] = true;
          break;
        }
        count++;
      }
    }

    return sequence.slice(1).join(" ");
  } else if (query[0] === "2") {
    let K = 1n;

    for (let i = 1; i <= N; i++) {
      let count = 0n;
      for (let j = 1; j < BigInt(query[i]); j++) {
        if (!visited[j]) count++;
      }
      K += factorial[N - i] * count;
      visited[BigInt(query[i])] = true;
    }

    return K.toString();
  }
}

console.log(solve());