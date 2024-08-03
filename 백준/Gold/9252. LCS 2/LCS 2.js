const fs = require('fs');

const data = fs
	.readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
	.toString()
	.trim()
	.split('\n');

function solve() {
	const sequence1 = data[0];
	const sequence2 = data[1];

	const length1 = sequence1.length;
	const length2 = sequence2.length;

	const dp = Array.from({ length: length1 + 1 }, () => new Array(length2 + 1).fill(0));

	for (let i = 1; i <= length1; i++) {
		for (let j = 1; j <= length2; j++) {
			if (sequence1[i - 1] === sequence2[j - 1])
				dp[i][j] = dp[i - 1][j - 1] + 1;
			else
				dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
		}
	}

	const LCS = [];

	function getLCS(i, j) {
		if (i === 0 || j === 0)
			return;
		if (sequence1[i - 1] === sequence2[j - 1]) {
			LCS.push(sequence1[i - 1]);
			getLCS(i - 1, j - 1);
		} else {
			if (dp[i][j - 1] > dp[i - 1][j])
				getLCS(i, j - 1);
			else
				getLCS(i - 1, j);
		}
	}

	getLCS(length1, length2);
	LCS.reverse()

	return dp[length1][length2] + '\n' + LCS.join('');
}

console.log(solve());