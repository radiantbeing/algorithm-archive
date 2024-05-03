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
    const N = Number(data[0]);
    const F = Array(21).fill(BigInt(0));
    const S = Array(21).fill(BigInt(0));
    const visited = Array(21).fill(false);
   
    F[0] = BigInt(1);

    for (let i = 1; i < N + 1; i++) {
        F[i] = F[i - 1] * BigInt(i);
    }

    const line = data[1].split(" ").map(BigInt);

    if (line[0] === BigInt(1)) {
        let K = BigInt(line[1]);
        for (let i = 1; i < N + 1; i++) {
            let count = BigInt(1);
            for (j = 1; j < N + 1; j++) {
                if (visited[j]) continue;
                if (K <= count * F[N - i]) {
                    K -= (count - BigInt(1)) * F[N - i];
                    S[i] = j;
                    visited[j] = true;
                    break;
                }
                count++;
            }
        }
        let answer = "";
        for (let i = 1; i < N + 1; i++) {
            answer += `${S[i]} `;
        }
        return answer;
    } else if (line[0] === BigInt(2)) {
        let K = BigInt(1);
        for (let i = 1; i < N + 1; i++) {
            let count = BigInt(0);
            for (let j = 1; j < line[i]; j++) {
                if (!visited[j])
                    count += BigInt(1);
            }
            K += count * F[N - i];
            visited[line[i]] = true;
        }
        return K.toString();
    }
};

console.log(solve());