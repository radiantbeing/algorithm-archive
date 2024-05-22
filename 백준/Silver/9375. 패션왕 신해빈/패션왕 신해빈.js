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

    readStrArray() {
        return this.read().split(" ");
    }
}

const solve = () => {
    const reader = new LineReader();
    const T = reader.readInt();
    let answer = "";
    
    for (let t = 0; t < T; t++) {
        const N = reader.readInt();
        const clothes = {}; 
        for (let n = 0; n < N; n++) {
            const [name, type] = reader.readStrArray();
            if (clothes[type] === undefined) {
                clothes[type] = [];
            }
            clothes[type].push(name);
        }
        let subAnswer = 1;
        for (const type in clothes) {
            subAnswer *= clothes[type].length + 1;
        }
        answer += `${subAnswer - 1}\n`;
    }

    return answer;
};

console.log(solve());