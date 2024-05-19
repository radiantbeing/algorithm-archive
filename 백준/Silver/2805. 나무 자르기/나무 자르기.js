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

    const [N, M] = data[0].split(" ").map(BigInt);
    const trees = data[1].split(" ").map(BigInt);

    trees.sort((a, b) => a > b ? 1 : a < b ? -1 : 0);

    let start = 0n,
        end = trees.at(-1);
    
    while (start <= end) {
        const mid = (start + end) / 2n;
        const length = trees.reduce((accu, val) => val > mid ? accu + (val - mid) : accu, 0n);
        if (M > length) {
            end = mid - 1n;
        } else {
            start = mid + 1n;
            answer = mid;
        }
    }

    return answer.toString();
};

console.log(solve());