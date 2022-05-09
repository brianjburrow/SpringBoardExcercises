/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    if (this.length === 0){
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length ++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    if (this.length === 0){
      // no nodes in the list
      this.push(val)
    } else {
      let newNode = new Node(val);
      newNode.next = this.head;
      this.head = newNode;
      this.length ++;
    }
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 0){
      return null
    } else if (this.length === 1){
      let ans = this.head.val;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return ans;
    } else {
      let currentNode = this.head;
      while (currentNode.next.next){
        currentNode = currentNode.next;
      }
      let ans = currentNode.next.val;
      currentNode.next = null;
      this.tail = currentNode;
      this.length --;
      return ans;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0){
      return null
    } else if (this.length === 1){
      let ans = this.head.val;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return ans;
    } else {
      let ans = this.head.val;
      this.head = this.head.next;
      this.length --;
      return ans;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx, node = false) {
    if (this.length > 0){
      if (idx === 0) {
        return node ? this.head : this.head.val;
      }
      if (idx === this.length - 1) {
        return node ? this.tail : this.tail.val;
      }
      let currentNode = this.head;
      for (let i = 0; i < idx; i++){
        if (!currentNode.next) return null;
      }
      return node ? currentNode.next : currentNode.next.val;
    }
    return null;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx > this.length - 1) throw new Error("Invalid Index")
    let currentNode = this.getAt(idx, true);
    if (!currentNode) throw new Error();
    currentNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */
  insertAt(idx, val) {
    if (this.length > 0){
      if (this.length === idx){
        this.push(val)
      } else {
        let newNode = new Node(val);
        let prevNode = this.getAt(idx - 1, true);
        newNode.next = prevNode.next;
        prevNode.next = newNode;
        this.length ++;
      }
      return undefined;
    } else if (idx === 0){
      this.push(val);
      return undefined;
    }
    throw new Error(`Invalid index ${idx}`);
  }

  /** removeAt(idx): return & remove item at idx, */
  removeAt(idx) {
    if (this.length > 1){
      if (this.length === idx){
        this.pop(val)
      } else {
        let currentNode = this.getAt(idx, true);
        let prevNode = this.getAt(idx - 1, true);
        prevNode.next = currentNode.next;
        this.length --;
      }
      return undefined;
    }else if (idx === 0 || this.length == 1){
      this.pop(idx);
      return undefined;
    }
    throw new Error(`Invalid index ${idx}`);
  }

  /** average(): return an average of all values in the list */
  average() {
    let sum = 0;
    let currentNode = this.head;
    if (this.length == 0) return 0;
    while (currentNode){
      sum += currentNode.val;
      currentNode = currentNode.next;
    }
    console.log(sum, this.length)
    return sum / this.length;
  }
}

module.exports = LinkedList;
