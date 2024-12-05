const fs = require("fs");

const reader = {
    lines: fs
        .readFileSync(0, "utf-8")
        .split("\n"),
    
    cursor: 0,

    readLine() {
        return this.lines[this.cursor++];
    },

    readInt() {
        return parseInt(this.readLine());
    },

    readIntArray() {
        return this.readLine().split(" ").map(token => parseInt(token));
    }
};

function solve() {
    const N = reader.readInt();
    const numbers = reader.readIntArray();

    numbers.sort((a, b) => a - b);

    let count = 0;
    
    for (let i = 0; i < N; i++) {
        const target = numbers[i];

        let left = 0;
        let right = N - 1;

        while (left < right) {
            if (i === left) {
                left++;
                continue;
            }
            if (i === right) {
                right--;
                continue;
            }

            const sum = numbers[left] + numbers[right];
            if (sum < target) {
                left++;
            } else if (sum > target) {
                right--;
            } else {
                count++;
                break;
            }
        }
    }
    
    return count;
}

console.log(solve());