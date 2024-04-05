function solution(board, skill) {
    let answer = 0;
    
    const n = board.length;
    const m = board[0].length;
    const prefixSum = Array.from(
        { length: n + 1 }, 
        () => Array.from({ length: m + 1 }, () => 0)
    );
    
    for (const [type, r1, c1, r2, c2, degree] of skill) {
        if (type === 1) {
            prefixSum[r1][c1] -= degree;
            prefixSum[r1][c2 + 1] += degree;
            prefixSum[r2 + 1][c1] += degree;
            prefixSum[r2 + 1][c2 + 1] -= degree;
        } else {
            prefixSum[r1][c1] += degree;
            prefixSum[r1][c2 + 1] -= degree;
            prefixSum[r2 + 1][c1] -= degree;
            prefixSum[r2 + 1][c2 + 1] += degree;
        }
    }
    
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < m; c++) {
            prefixSum[r][c + 1] += prefixSum[r][c];
        }
    }
    
    for (let c = 0; c < m; c++) {
        for (let r = 0; r < n; r++) {
            prefixSum[r + 1][c] += prefixSum[r][c];
        }
    }
    
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < m; c++) {
            board[r][c] += prefixSum[r][c];
            if (board[r][c] > 0) answer++;
        }
    }
    
    return answer;
}