const fs = require("fs");

class InputReader {
    data = fs
        .readFileSync(
            process.platform === "linux" ? 0 : "input.txt",
            "utf-8"
        )
        .toString()
        .trimEnd()
        .split("\n");
    cursor = 0;

    read() {
        return this.data[this.cursor++];
    }

    readInt() {
        return Number(this.read());
    }

    readIntArray() {
        return this.read().split(" ").map(Number);
    }
}

const solve = () => {
    const inputReader = new InputReader();

    const N = inputReader.readInt();
    const numbers = inputReader.readIntArray();
    const M = inputReader.readInt();
    const queries = inputReader.readIntArray();

    numbers.sort((a, b) => a - b);
    
    const binarySearch = (target) => {
        let frontIndex = 0,
            rearIndex = N - 1;
        while (frontIndex <= rearIndex) {
            const medianIndex = Math.floor((frontIndex + rearIndex) / 2);
            const median = numbers[medianIndex];
            if (median < target) {
                frontIndex = medianIndex + 1;    
            } else if (median > target) {
                rearIndex = medianIndex - 1;
            } else {
                return true;
            }
        }
        return false;
    };

    let answer = "";

    for (let i = 0; i < M; i++) {
        if (binarySearch(queries[i]))
            answer += 1 + "\n";
        else
            answer += 0 + "\n";
    }

    return answer;
};

console.log(solve());