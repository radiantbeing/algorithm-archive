function increase(count, key) {
    count[key] = (count[key] ?? 0) + 1;
    return count;
}

function decrease(count, key) {
    count[key] = (count[key] ?? 0) - 1;
    return count;
}

function solution(participant, completion) {
    const count = {};
    
    for (const name of participant) {
        increase(count, name);
    }
    
    for (const name of completion) {
        decrease(count, name);
    }
    
    for (const name in count) {
        if (count[name] === 1)
            return name;
    }
}