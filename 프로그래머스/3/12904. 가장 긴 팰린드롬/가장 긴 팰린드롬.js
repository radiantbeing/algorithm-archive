function solution(s) {
    let answer = 1;

    function isPalindrome(start, end) {
        while (start < end) {
            if (s[start] !== s[end]) {
                return false;
            }
            start++;
            end--;
        }
        return true;
    }

    for (let i = 0; i < s.length; i++) {
        for (let j = s.length - 1; j >= i + answer; j--) {
            if (isPalindrome(i, j)) {
                answer = Math.max(answer, j - i + 1);
                break;
            }
        }
    }

    return answer;
}