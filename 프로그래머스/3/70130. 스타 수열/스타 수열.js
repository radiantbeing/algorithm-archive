function solution(a) {
    let answer = -1;
    
    const frequency = {};
    
    for (const number of a) {
        if (frequency[number] === undefined)
            frequency[number] = 0;
        frequency[number]++;
    }
    
    for (let number in frequency) {
        number = Number(number);
        if (frequency[number] <= answer)
            continue;
        let groups = 0;
        for (let i = 0; i < a.length - 1; i++) {
            if (a[i] !== number && a[i + 1] !== number)
                continue;
            if (a[i] === a[i + 1])
                continue;
            i++; groups++;
        }
        answer = Math.max(answer, groups);
    }
    
    return answer * 2;
}