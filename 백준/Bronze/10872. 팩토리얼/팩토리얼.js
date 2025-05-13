const fs = require("fs");

const reader = fs
    .readFileSync(
        process.platform === "linux"
            ? 0
            : "input.txt", "utf-8"
    );

function solve() {
    const number = Number.parseInt(reader);

    function factorial(n) {
        if (n < 2) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    return factorial(number);
}

console.log(solve());
