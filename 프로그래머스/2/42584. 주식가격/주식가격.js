function solution(prices) {
    const stack = [];
    const answer = new Array(prices.length);

    prices.forEach((price, tick) => {
        const next = { price, tick };
        
        while (stack.length > 0 && next.price < stack.at(-1).price) {
            const last = stack.pop();
            answer[last.tick] = next.tick - last.tick;
        }
        
        stack.push(next)
    });

    stack.forEach(({ price, tick }) => {
        answer[tick] = prices.length - 1 - tick;
    });
    
    return answer;
}