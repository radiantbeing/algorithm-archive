function solution(enroll, referral, seller, amount) {
    var answer = Array(enroll.length).fill(0);
    
    const indexMap = {};
    
    function getIndexOf(name) {
        if (indexMap[name] === undefined) {
            indexMap[name] = enroll.indexOf(name);
        }
        return indexMap[name];
    }
    
    function DFS(index, fee, balance) {
        answer[index] += balance;
        if (fee > 0) {
            const indexOfReferral = getIndexOf(referral[index]);
            DFS(indexOfReferral, Math.floor(fee * 0.1), fee - Math.floor(fee * 0.1));
        }
    }
    
    for (let i = 0; i < seller.length; i++) {
        const income = amount[i] * 100;
        const indexOfSeller = getIndexOf(seller[i]);
        DFS(indexOfSeller, Math.floor(income * 0.1), income - Math.floor(income * 0.1));
    }
    
    return answer;
}