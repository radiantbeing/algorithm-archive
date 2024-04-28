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
        return BigInt(this.read());
    }

    readIntArray(delimiter = " ") {
        return this.read().split(delimiter).map(BigInt);
    }
}

const solve = () => {
    const reader = new LineReader();
    const [N, M, K] = reader.readIntArray().map(Number);

    let k = 0;

    while (!(2 ** k >= N)) {
        k++;
    }

    const tree = Array(2 ** k * 2).fill(BigInt(0));

    for (let i = 0; i < N; i++) {
        tree[2 ** k + i] = reader.readInt();
    }

    for (let pos = 2 ** k * 2 - 1; pos > 1; pos--) {
        const parentIndex = Math.floor(pos / 2);
        tree[parentIndex] += tree[pos];
    }
    
    const getPrefixSum = (index1, index2) => {
        let start = 2 ** k - 1 + index1,
            end = 2 ** k - 1 + index2,
            sum = BigInt(0);
        while (start <= end) {
            if (start % 2 === 1)
                sum += tree[start];
            if (end % 2 === 0)
                sum += tree[end];
            start = Math.floor((start + 1) / 2);
            end = Math.floor((end - 1) / 2);
        }
        return sum;
    };

    const update = (index, value) => {
        let pos = 2 ** k - 1 + index;
        const diff = value - tree[pos];
        while (pos >= 1) {
            tree[pos] += diff;
            pos = Math.floor(pos / 2);
        }
    };

    let answer = "";

    for (let i = 0; i < M + K; i++) {
        let [opcode, operand1, operand2] = reader.readIntArray();
        opcode = Number(opcode);
        operand1 = Number(operand1);
        if (opcode === 1) {
            update(operand1, operand2);
        } else if (opcode === 2) {
            operand2 = Number(operand2);
            answer += getPrefixSum(operand1, operand2) + "\n";
        }
    }
    
    return answer;
};

console.log(solve());