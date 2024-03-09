function solution(n) {
    var answer = [];
    
    function hanoi(n, start, mid, end) {
        if (n <= 0) return;
        hanoi(n - 1, start, end, mid);
        answer.push([start, end]);
        hanoi(n - 1, mid, start, end);
    }
    
    hanoi(n, 1, 2, 3);
    
    return answer;
}