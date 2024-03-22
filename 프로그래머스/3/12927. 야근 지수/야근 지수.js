class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }
    
    bubbleUp() {
        let current = this.heap.length - 1;
        let parent = Math.floor((current - 1) / 2);
        while (
            this.heap[parent] &&
            this.heap[parent] < this.heap[current]
        ) {
            this.swap(current, parent);    
            current = parent;
            parent = Math.floor((current - 1) / 2);
        }
    }
    
    bubbleDown() {
        let current = 0;
        let left = 2 * current + 1;
        let right = 2 * current + 2;
        
        while (
            (this.heap[left] && this.heap[left] > this.heap[current]) ||
            (this.heap[right] && this.heap[right] > this.heap[current])
        ) {
            let larger = left;
            if (this.heap[right] && this.heap[right] > this.heap[left]) {
                larger = right;
            }
            this.swap(current, larger);
            current = larger;
            left = 2 * current + 1;
            right = 2 * current + 2;
        }
    }
    
    insert(v) {
        this.heap.push(v);
        this.bubbleUp();
    }
    
    pop() {
        if (this.heap.length === 1) {
            return this.heap.pop();
        }        
        const v = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return v;
    }
}

function solution(n, works) {
    const pq = new MaxHeap();
    
    for (const work of works) {
        pq.insert(work);
    }
    
    while (n > 0) {
        const temp = pq.pop();
        pq.insert(temp - 1 > 0 ? temp - 1 : 0);
        n--;
    }
    
    const answer = pq
        .heap
        .reduce((accu, val) => accu + val ** 2, 0);    
    
    return answer;
}