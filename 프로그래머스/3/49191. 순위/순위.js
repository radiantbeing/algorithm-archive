function solution(n, results) {
    var answer = 0;
    
    const graph = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    
    for (const [win, lose] of results) {
        graph[win][lose] = 1;
    }
    
    for (let k = 1; k < n + 1; k++) {
        for (let i = 1; i < n + 1; i++) {
            for (let j = 1; j < n + 1; j++) {
                if (graph[i][k] === 1 && graph[k][j]) {
                    graph[i][j] = 1;
                }
            }
        }
    }
    
    for (let i = 1; i < n + 1; i++) {
        let sum = 0;
        for (let j = 1; j < n + 1; j++) {
            sum += graph[i][j] + graph[j][i];
        }
        if (sum === n - 1) answer++;
    }
    
    return answer;
}