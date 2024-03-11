function solution(n, words) {
    const used = {};
    let latestWord = words[0][0];
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const isUsed = used[word];
        const isDiff = word[0] !== latestWord[latestWord.length - 1];
        if (isUsed || isDiff) {
            return [i % n + 1, Math.floor(i / n) + 1];
        }
        used[word] = true;
        latestWord = word;
    }
    
    return [0, 0];
}