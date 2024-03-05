function solution(n, edge) {
    var answer = 0;
    
    const graph = Array.from({ length: n + 1 }, () => []);
    const visited = Array(n + 1).fill(0);
    
    // 에지 리스트를 인접 리스트로 변환
    for (const [s, e] of edge) {
        graph[s].push(e);
        graph[e].push(s);
    }
    
    function BFS(v) {
        const queue = [v];
        visited[v]++;
        while (queue.length > 0) {
            const node = queue.shift();
            for (const next of graph[node]) {
                if (!visited[next]) {
                    visited[next] += visited[node] + 1;
                    queue.push(next);
                }
            }
        }
    }
    
    BFS(1);
    
    answer = visited
        .sort((a, b) => b - a)
        .filter((v) => v === visited[0])
        .length;
    
    return answer;
}