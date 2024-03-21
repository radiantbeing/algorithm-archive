class Node {
    constructor(isEnd) {
        this.isEnd = isEnd;
        this.expectedWords = 0;
        this.child = {};
    }
}

class Trie {
    constructor() {
        this.parent = new Node(false);
    }
    
    insert(word) {
        let current = this.parent;
        let length = 0;
        for (const char of word) {
            if (!(char in current.child)) {
                current.child[char] = new Node(false);
            }
            current = current.child[char];
            current.expectedWords++;
            length++;
            if (length === word.length) {
                current.isEnd = true;
            }
        }
    }
    
    search(word) {
        let current = this.parent;
        let length = 0;
        for (const char of word) {
            if (char in current.child) {
                current = current.child[char];
                length++;
                if (
                    (length === word.length && current.isEnd === true) ||
                    current.expectedWords === 1
                ) {
                    return length;
                }
            } else {
                return null;
            }
        }
        return null;
    }
}

function solution(words) {
    var answer = 0;
    
    const trie = new Trie();
    
    for (const word of words) {
        trie.insert(word);
    }
    
    for (const word of words) {
        const count = trie.search(word)
        if (count !== null) {
            answer += count;
        }
    }
    
    return answer;
}