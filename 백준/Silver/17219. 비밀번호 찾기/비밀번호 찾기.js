const fs = require("fs");

class InputReader {
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
    
    readStrArray() {
        return this.read().split(" ");
    }

    readIntArray() {
        return this.readStrArray().map(Number);
    }
}

const solve = () => {
    const inputReader = new InputReader();

    const [N, M] = inputReader.readIntArray();
    const passwordMap = new Map();

    for (let i = 0; i < N; i++) {
        const [hostname, password] = inputReader.readStrArray();
        passwordMap.set(hostname, password);
    }

    let answer = "";

    for (let i = 0; i < M; i++) {
        const hostname = inputReader.read();
        answer += passwordMap.get(hostname) + "\n";
    }

    return answer;
};

console.log(solve());