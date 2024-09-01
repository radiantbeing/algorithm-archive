function solution(s){
    const arr = Array.from(s);
    
    const stack = [];
    arr.forEach((val, idx) => {
        if (idx === 0) {
            stack.push(val);
            return;
        }
        
        const top = stack.at(-1);
        if (top === "(" && val === ")") {
            stack.pop();
        } else {
            stack.push(val);
        }
    });
    
    if (stack.length === 0) {
        return true;
    }
    return false;
}