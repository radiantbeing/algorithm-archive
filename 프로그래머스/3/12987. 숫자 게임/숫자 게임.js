function solution(A, B) {
    var answer = 0;
    
    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);
    
    for (let i = A.length - 1; i >= 0; i--) {
        if (A[i] < B[B.length - 1]) {
            B.pop();
            answer++;
        } else {
            B.shift();
        }
    }
    
    return answer;
}