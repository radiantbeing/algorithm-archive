function solution(a) {
    let answer = 0;
    
    const leftArray = Array(a.length).fill(Infinity);
    let leftMin = a[0];
    for (let i = 0; i < a.length; i++) {
        if (leftMin > a[i]) {
            leftMin = a[i];
        }
        leftArray[i] = leftMin;
    }
    
    const rightArray = Array(a.length).fill(Infinity);
    let rightMin = a[a.length - 1];
    for (let i = a.length - 1; i >= 0; i--) {
        if (rightMin > a[i]) {
            rightMin = a[i];
        }
        rightArray[i] = rightMin;
    }

    for (let i = 0; i < a.length; i++) {
        if (
            i === 0 || 
            i === a.length - 1 || 
            a[i] < leftArray[i - 1] || a[i] < rightArray[i + 1]
        ) {
            answer++;
        }
    }
    
    return answer;
}