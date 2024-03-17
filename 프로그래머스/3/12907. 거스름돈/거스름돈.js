function solution(n, money) {
    money.sort((a, b) => a - b);
    
    const DP = Array(n + 1).fill(0);
    
    DP[0] = 1;
    
    for (const type of money) {
        for (let change = type; change < n + 1; change++) {
            DP[change] += DP[change - type];
        }
    }
    
    return DP[n];
}