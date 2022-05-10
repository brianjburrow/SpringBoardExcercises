/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    const newNode = new Node(val);
    if (this.isEmpty()){
      this.first = newNode;
      this.first.next = newNode;
      this.last = newNode;
    } else {
      // link new node to the previous last node in the queue
      this.last.next = newNode;
      // set the last node in the queue to the new node
      this.last = newNode;
    }
    this.size++
    return undefined;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if (this.isEmpty()) throw new Error("Queue is empty");
    const value = this.first.val;
    if (this.size == 1){
      // reset to empty;
      this.first = null;
      this.last = null;
    } else {
      // remove the first element
      this.first =  this.first.next;
    }
    this.size--;
    return value
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return this.size > 0 ? false : true;
  }
}

module.exports = Queue;
