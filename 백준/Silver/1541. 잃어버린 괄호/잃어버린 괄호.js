const fs = require("fs");

const data = fs
  .readFileSync(
    process.platform === "linux" ? "/dev/stdin" : "input.txt"
  )
  .toString()
  .trim();

const solve = () => {
  const expression = data;
  const operands = [];
  const opcodes = [];

  let temp = "";

  for (let i = 0; i < expression.length; i++) {
    const s = expression[i];
    if (s === "+" || s === "-") {
      operands.push(Number(temp));
      opcodes.push(s);
      temp = "";
    } else {
      temp += s;
    }
  }
  if (temp.length > 0) {
    operands.push(Number(temp));
  }

  const firstSub = opcodes.indexOf("-");

  if (firstSub === -1) {
    return operands.reduce((accu ,val) => accu + val, 0);
  }

  let answer = 0;

  for (let i = 0; i < operands.length; i++) {
    if (i <= firstSub) {
      answer += operands[i];
    } else {
      answer -= operands[i];
    }
  }

  return answer;
};

console.log(solve());