function solution(maps) {
    var answer = 0;
    
    const rows = maps.length;
    const cols = maps[0].length;
    const queue = [];
    
    function BFS(r, c) {
        maps[r][c] = 0;
        queue.push([r, c, 1]);
        let lastPos = [r, c, 1];
        while (queue.length > 0) {
            const [i, j, depth] = queue.shift();
            lastPos = [i, j, depth];
            if (i === rows - 1 && j === cols - 1) {
                break;
            }
            if (i - 1 >= 0 && maps[i - 1][j] === 1) {
                maps[i - 1][j] = 0;
                queue.push([i - 1, j, depth + 1]);
            }
            if (j - 1 >= 0 && maps[i][j - 1] === 1) {
                maps[i][j - 1] = 0;
                queue.push([i, j - 1, depth + 1]);
            }
            if (i + 1 <= rows - 1 && maps[i + 1][j] === 1) {
                maps[i + 1][j] = 0;
                queue.push([i + 1, j, depth + 1]);
            }
            if (j + 1 <= cols - 1 && maps[i][j + 1] === 1) {
                maps[i][j + 1] = 0;
                queue.push([i, j + 1, depth + 1]);
            }
        }
        return lastPos;
    }
    
    const [r, c, depth] = BFS(0, 0);
    
    if (r === rows - 1 && c == cols - 1) {
        answer = depth;
    } else {
        answer = -1;
    }
    
    return answer;
}