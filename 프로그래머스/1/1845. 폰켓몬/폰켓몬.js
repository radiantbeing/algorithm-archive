function increase(count, key) {
    count[key] = (count[key] ?? 0) + 1;
    return count;
}

function solution(nums) {
    const count = {};

    for (const num of nums) {
        increase(count, num);
    }
    
    const keys = Object.keys(count);
    return Math.min((nums.length / 2) | 0, keys.length);
}