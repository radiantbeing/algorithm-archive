const fs = require("fs");

const data = fs
    .readFileSync(
        process.platform === "linux" ? 0 : "input.txt", 
        "utf-8"
    )
    .toString()
    .split("\n");

const solve = () => {
    let answer = 0;
    
    const N = data[0];
    const A = data[1].split(" ").map(Number);

    A.sort((a, b) => a - b);

    for (let i = 0; i < N; i++) {
        let startIndex = 0,
            endIndex = N - 1;
        while (startIndex < endIndex) {
            const now = A[i];
            const sum = A[startIndex] + A[endIndex];
            if (now > sum || i === startIndex)
                startIndex++;
            else if (now < sum || i === endIndex)
                endIndex--;
            else {
                answer++;
                break;
            }
        }
    }

    return answer;
};

console.log(solve());