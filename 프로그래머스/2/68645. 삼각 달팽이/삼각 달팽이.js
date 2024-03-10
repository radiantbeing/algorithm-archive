function solution(n) {
    var answer = [];
    
    const snail = Array(n);
    
    for (let i = 0; i < n; i++) {
        snail[i] = Array(i + 1).fill(null);
    }
    
    let idx1 = -1;
    let idx2 = 0;
    let num = 0;
    
    for (let i = n; i > 0; i -= 3) {
        for (let j = 0; j < i; j++) {
            idx1++;
            num++;
            snail[idx1][idx2] = num;
        }
        for (let k = 0; k < i - 1; k++) {
            idx2++;
            num++;
            snail[idx1][idx2] = num;
        }
        for (let l = 0; l < i - 2; l++) {
            idx1--;
            idx2--;
            num++;
            snail[idx1][idx2] = num;
        }
    }
    
    answer = snail.flat();

    return answer;
}