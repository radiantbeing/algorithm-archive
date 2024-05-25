const fs = require("fs");

class LineReader {
    constructor() {
        this.data = fs
            .readFileSync(
                process.platform === "linux" ? 0 : "input.txt",
                "utf-8"
            )
            .toString()
            .trimEnd()
            .split("\n");
        this.cursor = 0;
    }

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

class Queue {
    constructor(initialArray) {
        this.q = initialArray;
        this.cursor = 0;
    }

    size() {
        return this.q.length;
    }

    push(value) {
        this.q.push(value);
    }

    shift() {
        return this.q[this.cursor++];
    }
}

const lineReader = new LineReader();

const solve = () => {
    let answer = "";

    const T = lineReader.readInt();
    
    const getDigits = (register) => {
        const d1 = Math.floor(register / 1_000 % 10);
        const d2 = Math.floor(register / 100 % 10);
        const d3 = Math.floor(register / 10 % 10);
        const d4 = Math.floor(register / 1 % 10);
        return [d1, d2, d3, d4];
    }

    const computeD = (register) => {
        return (register * 2) % 10_000;
    };

    const computeS = (register) => {
        return ((register - 1) + 10_000) % 10_000;
    };

    const computeL = (register) => {
        const [d1, d2, d3, d4] = getDigits(register);
        return d2 * (10 ** 3) + d3 * (10 ** 2) + d4 * 10 + d1;
    };

    const computeR = (register) => {
        const [d1, d2, d3, d4] = getDigits(register);
        return d4 * (10 ** 3) + d1 * (10 ** 2) + d2 * 10 + d3;
    };

    for (let t = 0; t < T; t++) {
        let [src, dest] = lineReader.readIntArray();

        const queue = new Queue([src]);
        const visited = new Array(10000);

        visited[src] = "";

        while (queue.size() > 0) {
            const item = queue.shift();

            if (item === dest) {
                answer += visited[item] + "\n";
                break;
            }

            const iters = [
                [computeD(item), "D"],
                [computeS(item), "S"],
                [computeL(item), "L"],
                [computeR(item), "R"]
            ];

            for (const [value, name] of iters) {
                if (visited[value] === undefined) {
                    queue.push(value);
                    visited[value] = visited[item] + name;
                }
            }
        }
    }

    return answer;
};

console.log(solve());