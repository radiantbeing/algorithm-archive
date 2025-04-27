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

function priority_queue_constructor(compare) {
  const heap = Array(64);

  let size = 0;

  function push(item) {
    size++;
    if (heap.length === size) {
      heap.length *= 2;
    }
    heap[size] = item;
    percolate_up();
  }

  function percolate_up() {
    const item = heap[size];
    let index = size;
    while (index > 1) {
      const parent_index = Math.floor(index / 2);
      const parent_value = heap[parent_index];
      if (compare(item, parent_value) >= 0) {
        break;
      }
      heap[index] = parent_value;
      index = parent_index;
    }
    heap[index] = item;
  }

  function shift() {
    const item = heap[1];
    if (item === undefined) {
      return null;
    }
    size--;
    heap[1] = heap[size + 1];
    heap[size + 1] = undefined;
    percolate_down();
    return item;
  }

  function percolate_down() {
    const item = heap[1];
    let index = 1;
    while (index * 2 <= size) {
      let child_index = index * 2 + 1;
      if (
        child_index > size ||
        compare(heap[index * 2], heap[child_index]) < 0
      ) {
        child_index = index * 2;
      }
      const child_value = heap[child_index];
      if (compare(item, child_value) <= 0) {
        break;
      }
      heap[index] = child_value;
      index = child_index;
    }
    heap[index] = item;
  }

  function get_size() {
    return size;
  }

  return Object.freeze({
    push,
    shift,
    get_size,
  });
}

function solve() {
  const [V, E] = reader.get_integers(); // 노드 개수, 에지 개수
  const K = reader.get_integer(); // 출발 노드 번호
  const graph = Array.from({ length: V + 1 }, () => []); // 인접 리스트
  const visited = Array(V + 1).fill(false); // 방문 여부 배열
  const distance = Array(V + 1).fill(Infinity); // 최단 거리 배열
  const priority_queue = priority_queue_constructor(function (first, second) {
    return first[0] - second[0];
  });

  for (let i = 0; i < E; i++) {
    const [u, v, w] = reader.get_integers();
    graph[u].push([v, w]);
  }

  distance[K] = 0;
  priority_queue.push([0, K]);

  while (priority_queue.get_size() > 0) {
    const [_, node_nr] = priority_queue.shift();
    if (visited[node_nr]) {
      continue;
    }
    visited[node_nr] = true;
    for (const [next_node_nr, next_node_weight] of graph[node_nr]) {
      if (distance[next_node_nr] > distance[node_nr] + next_node_weight) {
        distance[next_node_nr] = distance[node_nr] + next_node_weight;
        priority_queue.push([distance[next_node_nr], next_node_nr]);
      }
    }
  }

  return distance
    .slice(1)
    .map((element) => (element === Infinity ? "INF" : element))
    .join("\n");
}

console.log(solve());
