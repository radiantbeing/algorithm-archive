function solution(board) {
    let answer = -1;
    
    const N = board.length;
    const M = board[0].length;
    const visited = Array.from({ length: N }, () => Array(M).fill(0));
    
    let robot;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (board[i][j] === "R") {
                robot = [i, j];
            }
        }
    }

    const bfs = () => {
        const queue = [];
        queue.push(robot);
        visited[robot[0]][robot[1]] = 1;
        
        const dx = [1, -1, 0, 0];
        const dy = [0, 0, 1, -1];
        
        while (queue.length > 0) {
            const [x, y] = queue.shift();
            if (board[x][y] === "G") {
                answer = visited[x][y] - 1;
                break;
            }
            for (let i = 0; i < 4; i++) {
                let nx = x + dx[i];
                let ny = y + dy[i];
                while (true) {
                    if (0 <= nx && nx < N && 0 <= ny && ny < M && board[nx][ny] !== "D") {
                        nx += dx[i];
                        ny += dy[i];
                    } else {
                        nx -= dx[i];
                        ny -= dy[i];
                        break;
                    }
                }
                if (visited[nx][ny] === 0) {
                    queue.push([nx, ny]);
                    visited[nx][ny] = visited[x][y] + 1;
                }
            }
        }
    };
    
    bfs();
    
    return answer;
}