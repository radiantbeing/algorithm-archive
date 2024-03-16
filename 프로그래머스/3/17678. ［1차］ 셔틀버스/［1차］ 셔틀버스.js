function solution(n, t, m, timetable) {
    function timeToMinutes(time) {
        const [HH, MM] = time
            .split(':')
            .map(Number);
        return HH * 60 + MM;
    }
    
    function minutesToTime(minutes) {
        const HH = `${Math.floor(minutes / 60)}`.padStart(2, "0");
        const MM = `${minutes % 60}`.padStart(2, "0");
        return `${HH}:${MM}`;
    }
    
    const queue = timetable
        .slice()
        .map((time) => timeToMinutes(time))
        .sort((a, b) => a - b);
    
    const firstShuttle = timeToMinutes('09:00');
    const lastShuttle = firstShuttle + t * (n - 1);
    
    for (let shuttle = firstShuttle; shuttle < lastShuttle; shuttle += t) {
        let count = 0;
        while (
            count < m && 
            (queue.length > 0 && queue[0] <= shuttle)
        ) {
            queue.shift();
            count++;
        }
    }
    
    while (queue.length > 0 && queue[queue.length - 1] > lastShuttle) {
        queue.pop();
    }
    
    if (queue.length < m) {
        return minutesToTime(lastShuttle);
    } else {
        return minutesToTime(queue[m - 1] - 1);
    }
}