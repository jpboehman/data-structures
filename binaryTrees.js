/* eslint-disable complexity */
// Binary Search Trees are made up of nodes
class Node {
	constructor(value) {
		this.value = value;
		this.leftChild = null;
		this.rightChild = null;
	}
}

// Binary Search Tree is made up of nodes
class BinarySearchTree {
	constructor(rootValue) {
		this.root = new Node(rootValue); // Creates a new Node instance
	}
	insert(currentNode, value) {
		// Understanding recursion!
		if (!currentNode) {
			currentNode = new Node(value);
		} else if (value < currentNode.value) {
			currentNode.leftChild = this.insert(currentNode.leftChild, value);
		} else {
			currentNode.rightChild = this.insert(currentNode.rightChild, value);
		}
		return currentNode; // Must return something with recursion
	}
	// Helper function to serve as a starting point
	insertNode(value) {
		if (!this.root) {
			this.root = new Node(value);
		} else {
			this.insert(this.root, value);
		}
	}
	preOrderTraversal(currentNode) {
		// AKA as depth first search!
		// Elements are traversed in a root-left-right order
		// O(n) because a total of n recursive calls occur
		if (currentNode) {
			console.log(currentNode.value);
			this.preOrderTraversal(currentNode.leftChild);
			this.preOrderTraversal(currentNode.rightChild);
		}
	}
	inOrderTraversal(currentNode) {
		if (currentNode) {
			this.inOrderTraversal(currentNode.leftChild);
			console.log(currentNode.value);
			this.inOrderTraversal(currentNode.rightChild);
		}
	}
	postOrderTraversal(currentNode) {
		// The current node will be visited AFTER its children nodes - AKA the root will be visited last
		// left- right - root order
		if (currentNode) {
			this.postOrderTraversal(currentNode.leftChild);
			this.postOrderTraversal(currentNode.rightChild);
			console.log(currentNode.value);
		}
	}
	search(currentNode, value) {
		if (!currentNode) return null;
		if (currentNode.value === value) {
			return currentNode;
		} else if (value < currentNode.value) {
			return this.search(currentNode.leftChild, value);
		} else {
			return this.search(currentNode.rightChild, value);
		}
	}
	searchTreeValue(value) {
		if (this.root.value !== value && this.root) {
			return this.search(this.root, value);
		} else {
			return null;
		}
	}
	// eslint-disable-next-line max-statements
	delete(currentNode, value) {
		//case 1: checking for the empty tree
		// if rootNode equals Null
		if (currentNode === null) {
			return false;
		}
		//start traversing the tree
		//until we find the value to be deleted
		//or end up with a null node
		let parentNode;
		while (currentNode && currentNode.val !== value) {
			//saving the previous node as parentNode before the currentNode is updated
			parentNode = currentNode;
			if (value < currentNode.val) {
				currentNode = currentNode.leftChild;
			} else {
				currentNode = currentNode.rightChild;
			}
		}

		//case 2 : currentNode IS EQUAL to null. Value not found!
		if (currentNode === null) {
			return false;
		} else if (
			currentNode.leftChild === null &&
			currentNode.rightChild === null
		) {
			//case 3: currentNode is a leaf node
			//i.e. right and left EQUAL to null
			//now checking if the node to be deleted
			//is a left or a right child of its parent
			if (currentNode.val === this.root.val) {
				this.root = null;
				return true;
			} else if (currentNode.val < parentNode.val) {
				parentNode.leftChild = null;
				return true;
			} else {
				parentNode.rightChild = null;
				return true;
			}
		} else if (currentNode.rightChild === null) {
			//if the node to be deleted has a left child only
			//we'll link the left child to the parent of
			//the node to be deleted
			if (currentNode.val === this.root.val) {
				this.root = currentNode.leftChild;
				return true;
			} else if (currentNode.leftChild.val < parentNode.val) {
				parentNode.leftChild = currentNode.leftChild;
				return true;
			} else {
				parentNode.rightChild = currentNode.leftChild;
				return true;
			}
		} else if (currentNode.leftChild === null) {
			//if the node to be deleted has a right child only
			//we'll link the right child to the parent of
			//the node to be deleted
			if (currentNode.val === this.root.val) {
				this.root = currentNode.rightChild;
				return true;
			} else if (currentNode.rightChild.val < parentNode.val) {
				parentNode.leftChild = currentNode.rightChild;
				return true;
			} else {
				parentNode.rightChild = currentNode.rightChild;
				return true;
			}
		} else {
			//case where the node to be deleted has 2 children
			//starting point for the right sub tree
			let minRight = currentNode.rightChild;
			//traverse to find the left most node in the right subtree
			while (minRight.leftChild !== null) {
				minRight = minRight.leftChild;
			}
			let temp = minRight.val;
			//delete the left most node in the right subtree
			//by calling in the same delete function
			//to cater for whether it has children or not
			this.delete(this.root, minRight.val);
			//replace the currentNode with left most node in the right subtree
			currentNode.val = temp;

			return true;
		}
	}
}

const bst = new BinarySearchTree(6);
bst.insertNode(4);
bst.insertNode(9);
bst.insertNode(5);
bst.insertNode(2);
bst.insertNode(8);
bst.insertNode(12);
bst.insertNode(10);
bst.insertNode(14);

// console.log(JSON.stringify(bst));
// console.log(bst.preOrderTraversal(bst.root));
// console.log(`-------`);
// console.log(bst.inOrderTraversal(bst.root));
// console.log(`-------`);
// console.log(bst.postOrderTraversal(bst.root));
console.log(`------`);
// console.log(bst.searchTreeValue(12));
// console.log(bst.searchTreeValue(11));
// console.log(bst.delete(bst.root, 4));

const testBst = new BinarySearchTree(0);
testBst.insertNode(1);
testBst.insertNode(2);
testBst.insertNode(5);

// ALGORITHM QUESTIONS
const findMin = (root) => {
	if (!root.leftChild) {
		return root.value;
	} else if (root) {
		return findMin(root.leftChild);
	}
};

console.log(findMin(testBst.root));
