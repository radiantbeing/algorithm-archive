function solution(n, times) {
    var answer = 0;
    
    times.sort((a, b) => a - b);
    
    let s = 0;
    let e = times[0] * n;
    let mid = Math.floor((s + e) / 2);
    
    while (s <= e) {
        const target = 
            times
            .map((time) => Math.floor(mid / time))
            .reduce((accu, val) => accu + val, 0);
        if (target >= n) {
            answer = mid;
            e = mid - 1;
        } else if (target < n) {
            s = mid + 1;
        }
        mid = Math.floor((s + e) / 2);
    }

    
    return answer;
}