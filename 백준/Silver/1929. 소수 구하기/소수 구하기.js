const fs = require("fs");

const solve = () => {
    const [M, N] = fs
        .readFileSync(
            process.platform === "linux" ? 0 : "input.txt", 
            "utf-8"
        )
        .toString()
        .trim()
        .split(" ")
        .map(Number);
    
    const isPrime = Array(N + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 0; i <= Math.floor(N ** (1 / 2)); i++) {
        if (!isPrime[i]) 
            continue;
        for (let j = i + i; j < N + 1; j += i)
            isPrime[j] = false;
    }

    let answer = "";

    for (let i = M; i < N + 1; i++) {
        if (isPrime[i]) 
            answer += i + "\n";
    }

    return answer;
};

console.log(solve());