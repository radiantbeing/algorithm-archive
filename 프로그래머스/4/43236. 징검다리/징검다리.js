function solution(distance, rocks, n) {
    var answer = 0;
    
    rocks.sort((a, b) => a - b);
    
    let start = 0;
    let end = distance;
    let mid = Math.floor((start + end) / 2);
    
    while (start <= end) {
        let removedCount = 0;
        let previousPosition = 0;
        
        for (const rock of rocks) {
            if (rock - previousPosition < mid) {
                removedCount++;
            } else {
                previousPosition = rock;
            }
        }
        
        if (distance - previousPosition < mid) {
            removedCount++;
        }
        
        if (removedCount > n) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
        
        mid = Math.floor((start + end) / 2);
        
    }
    
    answer = mid;
    return answer;
}