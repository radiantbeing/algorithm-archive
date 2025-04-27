const fs = require("fs");

const reader = (function () {
  const lines = fs
    .readFileSync(process.platform === "linux" ? 0 : "input.txt", "utf-8")
    .trimEnd()
    .split("\n");

  let cursor = 0;

  function get_line() {
    return lines[cursor++];
  }

  function get_integer() {
    return parseInt(get_line());
  }

  function get_integers() {
    return get_line()
      .split(" ")
      .map((token) => parseInt(token));
  }

  return {
    get_integer,
    get_integers,
  };
})();

function solve() {
  const N = reader.get_integer(); // 건물의 종류 수
  const times = Array(N + 1).fill(0); // 건물을 짓는데 걸리는 시간
  const total_times = Array(N + 1).fill(0); // 건물을 짓기 위한 총 시간
  const graph = Array.from({ length: N + 1 }, () => []); // 인접 리스트
  const indegrees = Array(N + 1).fill(0); // 진입 차수

  for (let building_nr = 1; building_nr <= N; building_nr++) {
    const [time, ...building_nrs] = reader.get_integers();
    times[building_nr] = time;
    building_nrs.forEach((pre_building_nr) => {
      if (pre_building_nr > 0) {
        graph[pre_building_nr].push(building_nr);
        indegrees[building_nr]++;
      }
    });
  }

  const queue = [];

  for (let building_nr = 1; building_nr <= N; building_nr++) {
    if (indegrees[building_nr] === 0) {
      queue.push(building_nr);
    }
  }

  while (queue.length > 0) {
    const building_nr = queue.shift();
    for (const next_building_nr of graph[building_nr]) {
      total_times[next_building_nr] = Math.max(
        total_times[next_building_nr],
        total_times[building_nr] + times[building_nr],
      );
      indegrees[next_building_nr]--;
      if (indegrees[next_building_nr] === 0) {
        queue.push(next_building_nr);
      }
    }
  }

  return total_times
    .map((total_time, building_nr) => total_time + times[building_nr])
    .slice(1)
    .join("\n");
}

console.log(solve());
