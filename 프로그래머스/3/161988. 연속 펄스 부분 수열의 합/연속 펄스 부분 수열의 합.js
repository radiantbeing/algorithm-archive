function solution(sequence) {
    let answer = 0;
    
    const n = sequence.length;
    const partialSum1 = [];
    const partialSum2 = [];
    
    for (let i = 0; i < n; i++) {
        partialSum1[i] = 
            (partialSum1[i - 1] || 0) + (i % 2 === 0 ? sequence[i]: -sequence[i]);
        partialSum2[i] = 
            (partialSum2[i - 1] || 0) + (i % 2 === 0 ? -sequence[i]: sequence[i]);
    }
    
    let minPartialSum1 = 0;
    let minPartialSum2 = 0;
    
    for (let i = 0; i < n; i++) {
        answer = Math.max(answer, partialSum1[i] - minPartialSum1, partialSum2[i] - minPartialSum2);
        minPartialSum1 = Math.min(minPartialSum1, partialSum1[i]);
        minPartialSum2 = Math.min(minPartialSum2, partialSum2[i]);
    }
    
    return answer;
}