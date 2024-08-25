function solution(arr) {
    return arr.reduce((answer, now) => {
        const top = answer[answer.length - 1];
        
        if (top !== now) {
            answer.push(now);
        }
        
        return answer;
    }, []);
}