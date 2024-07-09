const fs = require("fs");

class Reader {
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
  const reader = new Reader();
  const [N, T] = reader.readIntArray();
  const ratings = Array(N + 1);
  const answer = [];

  for (let i = 0; i < N; i++) {
    ratings[i + 1] = reader.readInt();
  }
  
  for (let t = 0; t < T; t++) {
    let maxRating = -1,
        songIndex = -1;

    for (let i = 1; i < N + 1; i++) {
      if (ratings[i] > maxRating) {
        maxRating = ratings[i];
        songIndex = i;
      }
    }

    answer.push(songIndex);

    ratings[songIndex] = 0;
    const ratingToDistribute = Math.floor(maxRating / (N - 1));
    let extraRating = maxRating % (N - 1);
    
    for (let i = 1; i < N + 1; i++) {
      if (i === songIndex)  continue;
      ratings[i] += ratingToDistribute;
      if (extraRating > 0) {
        ratings[i]++;
        extraRating--;
      }
    }
  }
  
  return answer.join("\n");
};

console.log(solve());