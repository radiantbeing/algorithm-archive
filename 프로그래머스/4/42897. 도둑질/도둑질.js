function solution(money) {
    let answer = 0;

    const n = money.length;
    
    function getMaxMoney(DP, startIdx, endIdx) {
        for (let i = startIdx; i <= endIdx; i++) {
            DP[i] = Math.max(DP[i - 2] + money[i], DP[i - 1]);
        }
        return DP[endIdx];
    }
    
    let DP = Array(n).fill(0);
    DP[0] = money[0];
    DP[1] = money[0];
    answer = Math.max(answer, getMaxMoney(DP, 2, n - 2));
    
    DP[0] = 0;
    DP[1] = money[1];
    answer = Math.max(answer, getMaxMoney(DP, 2, n - 1));

    return answer;
}