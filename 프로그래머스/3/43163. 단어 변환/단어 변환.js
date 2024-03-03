function solution(begin, target, words) {
    var answer = 0;
    
    function isChangable(str1, str2) {
        let diffCount = 0;
        for (let i = 0; i < str1.length; i++) {
            if (str1[i] !== str2[i]) {
                if (++diffCount === 2) return false;
            }
        }
        return true;
    }
    
    let firstStr;
    const visited = {};
    
    for (let word of words) {
        if (isChangable(begin, word)) firstStr = word;
        visited[word] = false;
    }
    
    function BFS(str) {
        const queue = [];
        visited[str] = true;
        queue.push([str, 1]);
        let lastStr = str;
        let lastDepth = 1;
        while (queue.length > 0) {
            const [s, depth] = queue.shift();
            lastStr = s;
            lastDepth = depth;
            if (s === target) {
                break;               
            }
            for (let i = 0; i < words.length; i++) {
                if (!visited[words[i]] && isChangable(s, words[i])) {
                    visited[words[i]] = true;
                    queue.push([words[i], depth + 1]);
                }
            }
        }
        return [lastStr, lastDepth];
    }
    
    
    const [lastStr, lastDepth] = BFS(firstStr);
    
    if (lastStr === target) {
        answer = lastDepth;
    } else {
        answer = 0;
    }
    
    return answer;
}