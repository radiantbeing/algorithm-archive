function solution(arr) {
    return arr
        .filter((val, idx, _arr) => val !== _arr[idx - 1]);
}