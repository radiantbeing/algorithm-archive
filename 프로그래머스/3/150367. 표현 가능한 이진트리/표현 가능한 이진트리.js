function solution(numbers) {
    const answer = [];
    
    function getMaxTreeNodes(binary) {
        let treeNodes = 0;
        let i = 0;
        while (treeNodes < binary.length) {
            treeNodes += 2 ** i;
            i++;
        }
        return treeNodes;
    }
    
    function isPossibleTree(binary, start, end) {
        const mid = (start + end) / 2;
        const left = (start + (mid - 1)) / 2;
        const right = ((mid + 1) + end) / 2;
        if (start === end) return true;
        if (
            (binary[mid] === '0' && binary[left] === '1') || 
            (binary[mid] === '0' && binary[right] === '1')
        ) return false;
        return isPossibleTree(binary, start, mid - 1) && isPossibleTree(binary, mid + 1, end);
    }
    
    for (const decimal of numbers) {
        let binary = decimal.toString(2);
        binary = binary.padStart(getMaxTreeNodes(binary), '0');
        
        const start = 0;
        const end = binary.length - 1;
        if (isPossibleTree(binary, start, end)) {
            answer.push(1);
        } else {
            answer.push(0);
        }
    }
    
    return answer;
}