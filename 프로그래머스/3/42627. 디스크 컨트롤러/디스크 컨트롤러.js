class PriorityQueue {
    heap = new Array(64);
    
    size = 0;
    
    constructor(comparator) {
        this.comparator = comparator;
    }
    
    push(item) {
        const heap = this.heap;
        const size = ++this.size;
        if (heap.length === size)
            heap.length *= 2;
        
        heap[size] = item;
        this.percolateUp();
    }
    
    percolateUp() {
        const heap = this.heap;
        const size = this.size;
        const comparator = this.comparator;
        
        let pos = size;
        const item = heap[pos];
        
        while (pos > 1) {
            const parentIndex = Math.floor(pos / 2);
            const parent = heap[parentIndex];
            if (comparator(parent, item) <= 0)
                break;
            heap[pos] = parent;
            pos = parentIndex;
        }
        
        heap[pos] = item;
    }
    
    shift() {
        const heap = this.heap;
        const item = heap[1];
        if (item === undefined)
            return;
        const size = --this.size;
        
        heap[1] = heap[size + 1];
        heap[size + 1] = undefined;
        this.percolateDown();
        return item;
    }
    
    percolateDown() {
        const heap = this.heap;
        const size = this.size;
        const comparator = this.comparator;
        
        let pos = 1;
        const item = heap[pos];
        
        while (pos * 2 <= size) {
            let childIndex = pos * 2 + 1;
            if (childIndex > size || comparator(heap[pos * 2], heap[childIndex]) < 0)
                childIndex = pos * 2;
            const child = heap[childIndex];
            if (comparator(item, child) <= 0)
                break;
            heap[pos] = child;
            pos = childIndex;
        }
        
        heap[pos] = item;
    }
}

function solution(jobs) {
    const priorityQueue = new PriorityQueue((a, b) => a[1] - b[1]);
    const length = jobs.length;
    
    jobs.sort((a, b) => a[0] - b[0]);
    
    let process = null;
    let finishAt = null;
    let answer = 0;
    
    for (let tick = 0; tick <= 10 ** 6; tick++) {
        while (jobs[0] && jobs[0][0] === tick)
            priorityQueue.push(jobs.shift());

        if (process && finishAt === tick) {
            answer += (finishAt - process[0]);
            process = null;
            finishAt = null;
        }
        
        if (!process && priorityQueue.size > 0) {
            process = priorityQueue.shift();
            finishAt = tick + process[1];
        }
    }        
    
    return Math.floor(answer / length);
}