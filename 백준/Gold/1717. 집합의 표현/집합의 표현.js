const fs = require("fs");

class LineReader {
    data = fs
        .readFileSync(
            process.platform === "linux" ? 0 : "input.txt",
            "utf-8"
        )
        .toString()
        .trim()
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

    const [n, m] = lineReader.readIntArray();
    const parents = Array.from({ length: n + 1}, (_, index) => index);

    const find = (v) => {
        if (v === parents[v])
            return v;
        parents[v] = find(parents[v]);
        return parents[v];
    };

    const union = (u, v) => {
        u = find(u);
        v = find(v);
        parents[v] = u;
    };

    let answer = "";

    for (let i = 0; i < m; i++) {
        const [opcode, operand1, operand2] = lineReader.readIntArray();
        if (opcode === 0) {
            union(operand1, operand2);
        } else if (opcode === 1) {
            answer += find(operand1) === find(operand2) ? "YES\n" : "NO\n";
        }
    }

    return answer;
};

console.log(solve());