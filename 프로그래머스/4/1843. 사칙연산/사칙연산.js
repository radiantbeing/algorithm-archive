function solution(arr) {
    const operations = [];
    const numbers = [];
    
    for (const value of arr) {
        if (value === "+" || value === "-") {
            operations.push(value);
            continue;
        }
        numbers.push(Number(value));
    }
    
    const n = numbers.length;
    const maxDP = Array.from(
        { length: n }, 
        () => Array.from({ length : n }, () => -Infinity)
    );
    const minDP = Array.from(
        { length: n }, 
        () => Array.from({ length: n }, () => Infinity)
    );
    
    for (let gap = 0; gap < n; gap++) {
        for (let s = 0; s < n - gap; s++) {
            const e = s + gap;
            if (gap === 0) {
                maxDP[s][e] = numbers[s];
                minDP[s][e] = numbers[s];
                continue;
            }
            for (let m = s; m < e; m++) {
                if (operations[m] === "+") {
                    maxDP[s][e] = Math.max(maxDP[s][e], maxDP[s][m] + maxDP[m + 1][e]);
                    minDP[s][e] = Math.min(minDP[s][e], minDP[s][m] + minDP[m + 1][e]);
                } else {
                    maxDP[s][e] = Math.max(maxDP[s][e], maxDP[s][m] - minDP[m + 1][e]);
                    minDP[s][e] = Math.min(minDP[s][e], minDP[s][m] - maxDP[m + 1][e]);
                }
            }
        }
    }
    
    return maxDP[0][n - 1];
}