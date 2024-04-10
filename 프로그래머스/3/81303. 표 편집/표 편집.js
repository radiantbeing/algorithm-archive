class Node {
    constructor(data, prev, next) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

function solution(n, k, cmd) {
    let firstNode = null;
    let lastNode = null;
    let currentNode = null;
    const history = [];
    
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            const newNode = new Node(i, null, null)
            firstNode = newNode;
            lastNode = newNode;
        } else {
            const newNode = new Node(i, lastNode, null);
            lastNode.next = newNode;
            lastNode = newNode;
        }
        if (i === k) {
            currentNode = lastNode;
        }
    }
    
    function up(x) {
        let moved = 0;
        while (moved < x) {
            currentNode = currentNode.prev;
            moved++;
        }
    }
    
    function down(x) {
        let moved = 0;
        while (moved < x) {
            currentNode = currentNode.next;
            moved++;
        }
    }
    
    function remove() {
        history.push(currentNode);
        if (currentNode.prev) {
            currentNode.prev.next = currentNode.next;
        }
        if (currentNode.next) {
            currentNode.next.prev = currentNode.prev;
        }
        if (currentNode.next === null) {
            currentNode = currentNode.prev;
        } else {
            currentNode = currentNode.next;
        }
    }
    
    function restore() {
        const removedNode = history.pop();
        if (removedNode.prev) {
            removedNode.prev.next = removedNode;
        }
        if (removedNode.next) {
            removedNode.next.prev = removedNode;
        }
    }
    
    for (const c of cmd) {
        const op = c.split(" ");
        switch (op[0]) {
            case 'U':
                up(Number(op[1]));
                break;
            case 'D':
                down(Number(op[1]));
                break;
            case 'C':
                remove();
                break;
            case 'Z':
                restore();
        }
    }
    
    const answer = Array(n).fill('O');
    
    for (const node of history) {
        answer[node.data] = 'X';
    }
    
    return answer.join('');
}