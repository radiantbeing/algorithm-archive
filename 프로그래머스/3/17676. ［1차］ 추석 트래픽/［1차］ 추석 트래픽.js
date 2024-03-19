function solution(lines) {
    let answer = 0;
    
    function parseLine(line) {
        const [date, time, period] = line.split(' ');
        const end = new Date(`${date} ${time}`).getTime();
        const start = end - Number(period.substring(0, period.length - 1)) * 1000 + 1;
        return [start, end];
    }
    
    for (let i = 0; i < lines.length; i++) {
        const windowStart = parseLine(lines[i])[1];
        const windowEnd = windowStart + 999;
        
        let count = 1;
        
        for (let j = i + 1; j < lines.length; j++) {
            const [logStart, logEnd] = parseLine(lines[j]);
            if (logStart <= windowEnd) {
                count++;
            }
        }
        
        answer = Math.max(answer, count);
    }
    
    return answer;
}