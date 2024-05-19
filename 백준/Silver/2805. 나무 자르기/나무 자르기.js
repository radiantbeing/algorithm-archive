const fs = require("fs");

const data = fs
    .readFileSync(
        process.platform === "linux" ? 0 : "input.txt",
        "utf-8"
    )
    .toString()
    .trimEnd()
    .split("\n");

const solve = () => {
    let answer = 0;

    const [N, M] = data[0].split(" ").map(Number);
    const trees = data[1].split(" ").map(Number);

    trees.sort((a, b) => a - b);

    let start = 0,
        end = trees[trees.length - 1];
    
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);

        let total = 0;
        for (let i = 0; i < N; i++) {
            if (trees[i] > mid) {
                total += trees[i] - mid;
            }
            if (total > M) {
                break;
            }
        }
        
        if (total >= M) {
            start = mid + 1;
            answer = mid;
        } else {
            end = mid - 1;
        }
    }

    return answer;
};

console.log(solve());