function solution(sequence) {
    let answer = 0;
    
    const n = sequence.length;
    
    let maxPrefixSum = 0;
    let minPrefixSum = 0;
    
    let temp = 0;
    
    for (let i = 0; i < n; i++) {
        temp += i % 2 === 0 ? sequence[i] : -sequence[i];
        maxPrefixSum = Math.max(maxPrefixSum, temp);
        minPrefixSum = Math.min(minPrefixSum, temp);
    }
    
    return Math.abs(maxPrefixSum - minPrefixSum);
    
    console.log(prefixSum);
}