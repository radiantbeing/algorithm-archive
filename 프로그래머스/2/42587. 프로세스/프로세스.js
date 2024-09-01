function mapQueue(priorities, location) {
    return priorities
        .map((val, idx) => ({ priority: val, target: idx === location }));
}

function getMaxPriority(queue) {
    return Math.max(...queue.map(({ priority }) => priority));
}

function solution(priorities, location) {
    const queue = mapQueue(priorities, location);
    
    let maxPriority = getMaxPriority(queue);
    let answer = 0;
    
    while (queue.length > 0) {
        const { priority, target } = queue.shift();
        if (priority >= maxPriority) {
            answer++;
            if (target) break;
            maxPriority = getMaxPriority(queue);
        } else {
            queue.push({ priority, target });
        }
    }
    
    return answer;
}