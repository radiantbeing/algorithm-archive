function solution(matrix_sizes) {
    const n = matrix_sizes.length;
    const DP = Array.from({ length: n }, () => Array(n).fill(Infinity));
    
    for (let i = 0; i < n; i++) {
        DP[i][i] = 0;
    }
    
    for (let k = 1; k < n; k++) {
        for (let s = 0; s < n - k; s++) {
            const e = s + k;
            for (let m = s; m < e; m++) {
                DP[s][e] = Math.min(
                    DP[s][e], 
                    DP[s][m] + DP[m + 1][e] + (matrix_sizes[s][0] * matrix_sizes[m][1] * matrix_sizes[e][1])
                );
            }
        }
    }
    
    return DP[0][n - 1];
}