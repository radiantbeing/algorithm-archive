function solution(numbers, target) {
    var answer = 0;
    
    function dfs(now, depth) {
        if (depth === numbers.length - 1) {
            if (now === target) answer++;
            return;
        }
        dfs(now + numbers[depth + 1], depth + 1);
        dfs(now - numbers[depth + 1], depth + 1);
    }
    
    dfs(numbers[0], 0);
    dfs(-numbers[0], 0);
    
    return answer;
}