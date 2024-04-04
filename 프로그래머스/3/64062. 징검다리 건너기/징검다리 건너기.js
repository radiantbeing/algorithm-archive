function solution(stones, k) {
    let l = 0;
    let r = 200_000_000;
    
    while (l <= r) {
        let m = Math.floor((l + r) / 2);
        let negatives = 0;
        for (const stone of stones) {
            if (stone - m <= 0) {
                negatives++;
            } else {
                negatives = 0;
            }
            if (negatives >= k) {
                break;
            }
        }
        if (negatives >= k) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }
    
    return l;
}