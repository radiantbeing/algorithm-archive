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

    readInt() {
        return Number(this.read());
    }

    readIntArray() {
        return this.read().split(" ").map(Number);
    }
}

const solve = () => {
    const lineReader = new LineReader();

    const N = lineReader.readInt();
    const graph = Array.from({ length: N + 1 }, () => []);
    const inDegree = Array(N + 1).fill(0);
    const build = Array(N + 1).fill(0);

    for (let now = 1; now < N + 1; now++) {
        const [time, ...pres] = lineReader.readIntArray();
        build[now] = time;
        for (const pre of pres) {
            if (pre === -1) break;
            inDegree[now]++;
            graph[pre].push(now);
        }
    }

    const queue = [];
    const answer = Array(N + 1).fill(0);

    for (let now = 1; now < N + 1; now++) {
        if (inDegree[now] === 0) {
            queue.push(now);
            answer[now] = build[now];
        } 
    }

    while (queue.length > 0) {
        const now = queue.shift();
        for (const next of graph[now]) {
            inDegree[next]--;
            answer[next] = Math.max(answer[next], answer[now] + build[next]);
            if (inDegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    return answer.slice(1).join("\n");
};

console.log(solve());