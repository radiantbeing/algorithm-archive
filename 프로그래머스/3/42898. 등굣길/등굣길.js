function solution(m, n, puddles) {
    const MOD = 1_000_000_007
    const DP = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    
    for (let puddle of puddles) {
        DP[puddle[1]][puddle[0]] = -1;
    }
    
    DP[1][1] = 1;
    
    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < m + 1; j++) {
            if (i === 1 && j === 1) {
                continue;
            }
            if (DP[i][j] === -1) {
                DP[i][j] = 0;
                continue;
            }
            DP[i][j] = (DP[i - 1][j] % MOD + DP[i][j - 1] % MOD) % MOD;
        }
    }
    
    return DP[n][m];
}