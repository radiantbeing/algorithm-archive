const MAX = 2 * 51;
const BORDER = 'BORDER';
const FILL = 'FILL';
const NONE = 'NONE';

function solution(rectangle, characterX, characterY, itemX, itemY) {
    let answer = 0;
    
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    
    const graph = Array.from({ length: MAX }, () => Array(MAX).fill(NONE));
    const visited = Array.from({ length: MAX }, () => Array(MAX).fill(1));
    
    for (let [x1, y1, x2, y2] of rectangle) {
        [x1, y1, x2, y2] = [2 * x1, 2 * y1, 2 * x2, 2 * y2];
        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                if (
                    (x1 < x && x < x2) &&
                    (y1 < y && y < y2)
                ) {
                    graph[x][y] = FILL;
                } else if (graph[x][y] !== FILL) {
                    graph[x][y] = BORDER;
                }
            }
        }
    }
    
    [characterX, characterY, itemX, itemY] = 
        [2 * characterX, 2 * characterY, 2 * itemX, 2 * itemY]
    
    function BFS() {
        const queue = [[characterX, characterY]];
        
        while (queue.length > 0) {
            const [x, y] = queue.shift();
            if (x === itemX && y === itemY) {
                answer = Math.floor(visited[x][y] / 2);
                break;
            }
            for (let i = 0; i < 4; i++) {
                const _x = x + dx[i];
                const _y = y + dy[i];
                if (_x >= 0 && _y >= 0 && _x < MAX && _y < MAX) {
                    if (graph[_x][_y] === BORDER && visited[_x][_y] === 1) {
                        visited[_x][_y] += visited[x][y];
                        queue.push([_x, _y]);
                    }
                }
            }
        }
    }
    
    BFS();
    
    return answer;
}