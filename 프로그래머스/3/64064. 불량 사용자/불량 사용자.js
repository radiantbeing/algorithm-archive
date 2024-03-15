function solution(userIDs, bannedIDs) {
    function getMatchedIndice(bannedID) {
        const indice = [];
        
        for (let i = 0; i < userIDs.length; i++) {
            const userID = userIDs[i];
            if (bannedID.length !== userID.length) continue;
            
            let isMatched = true;
            for (let j = 0; j < bannedID.length; j++) {
                if (bannedID[j] !== '*' && bannedID[j] !== userID[j]) {
                    isMatched = false;
                    break;
                }
            }
            if (isMatched) {
                indice.push(i);
            }
        }
        
        return indice;
    }
    
    const answer = new Set();
    const visited = Array(userIDs.length).fill(false);
    
    function dfs(bannedIDIdx, visitedList) {
        const bannedId = bannedIDs[bannedIDIdx];
        
        if (bannedIDIdx > bannedIDs.length - 1) {
            visitedList.sort();
            answer.add(visitedList.join(''));
            return;
        }
  
        for (const i of getMatchedIndice(bannedId)) {
            if (!visited[i]) {
                visited[i] = true;
                dfs(bannedIDIdx + 1, [...visitedList, userIDs[i]]);
                visited[i] = false;
            }
        }
    }
    
    dfs(0, []);
    
    return answer.size;
}