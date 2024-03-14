function solution(n, s, a, b, fares) {
    const graph = Array.from(
        { length: n + 1 }, 
        () => Array(n + 1).fill(Infinity)
    );
    
    for (let i = 1; i < n + 1; i++) {
        graph[i][i] = 0;
    }
    
    for (const [v1, v2, cost] of fares) {
        graph[v1][v2] = cost;
        graph[v2][v1] = cost;
    }
    
    for (let k = 1; k < n + 1; k++) {
        for (let i = 1; i < n + 1; i++) {
            for (let j = 1; j < n + 1; j++) {
                graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
            }
        }
    }
    
    let answer = Infinity;
    
    for (let k = 1; k < n + 1; k++) {
        answer = Math.min(answer, graph[s][k] + graph[k][a] + graph[k][b]);    
    }
    
    return answer;
}