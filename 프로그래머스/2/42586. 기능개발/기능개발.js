function solution(progresses, speeds) {
    const answer = [];

    while (progresses.length > 0) {
        let count = 0;
        while (progresses[0] >= 100) {
            progresses.shift();
            speeds.shift();
            count++;
        }
        if (count > 0) {
            answer.push(count);
        }
        
        progresses = progresses
            .map((val, idx) => val + speeds[idx]);
    }
    
    return answer;
}