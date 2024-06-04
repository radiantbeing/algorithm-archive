const fs = require("fs");

class LineReader {
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

    readIntArray() {
        return this.read().split(" ").map(Number);
    }
}

const solve = () => {
    const lineReader = new LineReader();
    
    let answer = "";

    const [N, L] = lineReader.readIntArray();
    const A = lineReader.readIntArray();

    const deque = [];
    let front = -1;

    deque.push([A[0], 0]);
    front++;
    answer += deque[front][0] + " ";

    for (let i = 1; i < N; i++) {
        while (
            deque.length > front &&
            deque[deque.length - 1][0] > A[i]
        ) {
            deque.pop();
        }
        
        deque.push([A[i], i]);

        while (
            deque[front] && 
            deque[front][1] < i - L + 1
        ) {
            front++;
        }

        answer += deque[front][0] + " ";

        if (i % 10000 === 0) {
            process.stdout.write(answer);
            answer = "";
        }
    }

    return answer;
};

process.stdout.write(solve());