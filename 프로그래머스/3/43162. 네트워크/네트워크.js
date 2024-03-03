function solution(n, computers) {
    var answer = 0;
    
    // 인접 행렬을 인접 리스트로 변환
    const graph = Array.from({ length: n }, () => []);
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const connected = computers[i][j];
            if (connected === 1) {
                graph[i].push(j);
                graph[j].push(i);
            }
        }
    }
    
    const visited = Array(n).fill(false);
    
    function dfs(v) {
        for (let next of graph[v]) {
            if (!visited[next]) {
                visited[next] = true;
                dfs(next);
            }
        }
    }
    
    visited[0] = true;
    dfs(0);
    answer++;
    
    let index;
    while ((index = visited.indexOf(false)) !== -1) {
        dfs(index);
        answer++;
    }
    
    return answer;
}