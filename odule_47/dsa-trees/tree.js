/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    if (!this.root) return 0;
    let total = this.root.val;

    return this.sumChildren(this.root, total);
  }

  sumChildren(node, total){
    for (let child of node.children){
      total += child.val;
      if (child.children.length > 0){
        total = this.sumChildren(child, total);
      }
    }
    return total;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    if (!this.root) return 0;

    let count = this.root.val % 2 === 0 ? 1 : 0;
    return this.countEvenChildren(this.root, count);
  }

  countEvenChildren(node, total){
    for (let child of node.children){
      total += child.val % 2 === 0 ? 1 : 0;
      if (child.children.length >0 ){
        total = this.countEvenChildren(child, total)
      }
    }
    return total
  }
  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    if (!this.root) return 0;
    let count = this.root.val > lowerBound ? 1 : 0;
    return this.countNumGreater(this.root, count, lowerBound);
  }
  
  countNumGreater(node, total, lowerBound){
    for (let child of node.children){
      total += child.val > lowerBound ? 1 : 0;
      if (child.children.length > 0){
        total = this.countNumGreater(child, total, lowerBound)
      }
    }
    return total;
  }
}

module.exports = { Tree, TreeNode };
