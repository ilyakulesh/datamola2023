class Node {
  constructor(value) {
    this.next = null;
    this.value = value;
  }
}

class List {
  constructor(rootValue) {
    this.root = new Node(rootValue);
  }

  addNode(value, i = null) {
    if (i === 0) {
      const newNode = new Node(value);
      newNode.next = this.root;
      this.root = newNode;
      return true;
    }

    let current = this.root;
    let index = 0;

    while (current.next !== null && (i === null || index < i - 1)) {
      current = current.next;
      index++;
    }

    if (i !== null && index !== i - 1) {
      return false;
    }

    const newNode = new Node(value);
    current.next = newNode;

    return true;
  }

  removeNode(i) {
    let current = this.root;
    let prev = null;
    let index = 0;

    while (current && index < i) {
      prev = current;
      current = current.next;
      index++;
    }

    if (!current) {
      return false;
    }

    if (!prev) {
      this.root = current.next;
    } else {
      prev.next = current.next;
    }

    return true;
  }

  print() {
    const arr = [];
    let current = this.root;
    while (current != null) {
      arr.push(current.value);
      current = current.next;
    }
    console.log(arr.join(", "));
  }
}

let list = new List(1);
list.addNode(2);
list.addNode(3, 2);
list.removeNode(1);
list.print();
