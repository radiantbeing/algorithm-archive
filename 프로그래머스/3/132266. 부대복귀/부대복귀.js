function solution(n, roads, sources, destination) {
    const answer = [];
    
    const graph = Array.from({ length: n + 1 }, () => []);
    const distance = Array.from({ length: n + 1 }, () => Infinity);
    const queue = [];
    
    for (const [s, e] of roads) {
        graph[s].push(e);
        graph[e].push(s);
    }
    
    distance[destination] = 0;
    queue.push(destination);
    
    while (queue.length > 0) {
        const now = queue.shift();
        for (const next of graph[now]) {
            if (distance[next] === Infinity) {
                distance[next] = Math.min(distance[next], distance[now] + 1);
                queue.push(next);
            }
        }
    }
    
    for (const source of sources) {
        if (distance[source] === Infinity) {
            answer.push(-1);
        } else {
            answer.push(distance[source]);
        }
    }    
    
    return answer;
}