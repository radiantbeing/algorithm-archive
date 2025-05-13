const fs = require("fs");

const reader = fs
    .readFileSync(
        process.platform === "linux"
            ? 0
            : "input.txt", "utf-8"
    );

function solve() {
    const number = Number.parseInt(reader);

    function factorial(n, result = 1) {

        // 꼬리 호출을 적용하였다.

        if (n < 2) {
            return result;
        }
        return factorial(n - 1, n * result);
    }

    return factorial(number);
}

console.log(solve());
