function solution(tickets) {
    let answer = [];

    const visited = Array(tickets.length).fill(false);
    
    function DFS(now, path) {
        if (path.length === tickets.length + 1) {
            answer.push([...path]);
            return;
        }
        for (let i = 0; i < tickets.length; i++) {
            if (!visited[i] && tickets[i][0] === now) {
                visited[i] = true;
                DFS(tickets[i][1], [...path, tickets[i][1]]);
                visited[i] = false;
            }
        }
    }
    
    DFS('ICN', ['ICN']);
    
    answer.sort();
    
    return answer[0];
}