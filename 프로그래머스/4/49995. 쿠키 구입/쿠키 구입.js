function solution(cookie) {
    let answer = 0;
    
    const n = cookie.length;
    const pSum = Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
        pSum[i] = (pSum[i - 1] || 0) + cookie[i];
    }
    for (let m = 0; m < n; m++) {
        let l = m;
        let r = m + 1;
        while (true) {
            const lSum = pSum[m] - (pSum[l - 1] || 0);
            const rSum = pSum[r] - pSum[m];
            if (lSum === rSum) {
                answer = Math.max(answer, lSum);
            }
            if (l > 0 && lSum <= rSum) {
                l--;
            } else if (r < n && lSum >= rSum){
                r++;
            } else {
                break;
            }
        }
    }
    
    return answer;
}