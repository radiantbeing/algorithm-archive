const fs = require("fs");

const reader = (function () {
  const lines = fs
    .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
    .split("\n");

  let cursor = 0;

  function get_line() {
    return lines[cursor++];
  }

  function get_integers() {
    return get_line()
      .split(" ")
      .map((token) => parseInt(token));
  }

  return Object.freeze({
    get_integers,
  });
})();

function solve() {
  const [N, M] = reader.get_integers();
  const parents = Array.from({ length: N + 1 }, (_, i) => i);
  const answers = [];

  function union(u, v) {
    const parent_u = find(u);
    const parent_v = find(v);
    parents[parent_u] = parent_v;
  }

  function find(v) {
    if (v !== parents[v]) {
      parents[v] = find(parents[v]);
    }
    return parents[v];
  }

  for (let i = 0; i < M; i++) {
    const [operation, u, v] = reader.get_integers();
    if (operation === 0) {
      union(u, v);
    } else if (operation === 1) {
      answers.push(find(u) === find(v) ? "YES" : "NO");
    }
  }

  return answers.join("\n");
}

console.log(solve());
