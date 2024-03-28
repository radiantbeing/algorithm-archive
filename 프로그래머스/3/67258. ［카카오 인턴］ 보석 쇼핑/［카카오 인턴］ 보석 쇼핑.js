function solution(gems) {
    const gemLength = gems.length;
    const gemTypes = new Set(gems).size;
    const gemMap = new Map();
    
    let answer = [0, gemLength - 1];

    for (let i = 0; i < gemLength; i++) {
        const gem = gems[i];
        gemMap.delete(gem);
        gemMap.set(gem, i);
        if (gemMap.size === gemTypes) {
            const [temp] = gemMap.values()
            const candidate = [temp, i];
            answer = 
                candidate[1] - candidate[0] < answer[1] - answer[0] 
                    ? candidate 
                    : answer;
        }
    }
    
    return [answer[0] + 1, answer[1] + 1];
}